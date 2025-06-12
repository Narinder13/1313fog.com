<?php
// Proxy script to forward requests to Flask app
// This allows Flask to run in cPanel shared hosting environments

// Target URL (your Flask app running internally)
$targetURL = "http://localhost:5000";

// Get the request URI
$requestURI = $_SERVER['REQUEST_URI'];
if (strpos($requestURI, '/5000_proxy.php') === 0) {
    $requestURI = substr($requestURI, strlen('/5000_proxy.php'));
}
if (empty($requestURI)) {
    $requestURI = '/';
}

// Initialize cURL
$ch = curl_init($targetURL . $requestURI);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// Pass through request method
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD']);

// Pass through request headers
$headers = [];
foreach (getallheaders() as $name => $value) {
    if ($name != 'Host' && $name != 'X-Forwarded-For' && $name != 'X-Forwarded-Host') {
        $headers[] = "$name: $value";
    }
}
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// Pass through POST data if present
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents('php://input'));
}

// Execute cURL request
$response = curl_exec($ch);

// Get response info
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

// Split header and body
$header = substr($response, 0, $headerSize);
$body = substr($response, $headerSize);

// Forward status code
http_response_code($httpCode);

// Forward headers
foreach (explode("\r\n", $header) as $line) {
    if (
        strlen($line) > 0 &&
        strpos($line, ':') !== false &&
        !preg_match('/^(Transfer-Encoding|Content-Length|Connection):/i', $line)
    ) {
        header($line);
    }
}

// Output the response
echo $body;
?>
