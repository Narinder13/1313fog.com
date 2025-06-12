# 1313 FOG Website

A premium, modern website built using Flask for 1313 FOG clothing store.

## Features

- Modern, responsive design with elegant UI elements
- Mobile-friendly with a collapsible hamburger menu
- Premium animations and transitions
- Instagram gallery integration
- Customer testimonials slider
- WhatsApp business integration
- Google Maps location integration
- Newsletter subscription form
- Contact form with validation

## Project Structure

```
1313fog.com/
├── app.py                  # Main Flask application
├── deploy.py               # Deployment script for FTP/cPanel
├── requirements.txt        # Python dependencies
├── static/                 # Static assets
│   ├── assets/             # Images and icons
│   │   ├── favicon.ico
│   │   ├── hero.jpg
│   │   ├── men.jpg
│   │   ├── women.jpg
│   │   └── kids.jpg
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   └── js/
│       └── main.js         # JavaScript functionality
└── templates/              # Jinja2 HTML templates
    ├── about.html          # About us page
    ├── base.html           # Base template with header/footer
    ├── contact.html        # Contact page with map
    ├── home.html           # Homepage with hero and categories
    └── offers.html         # Current offers/promotions
```

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/1313fog-com.git
   cd 1313fog-com
   ```

2. Create and activate a virtual environment (recommended):
   ```
   python -m venv venv
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # macOS/Linux
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the development server:
   ```
   python app.py
   ```

5. Access the website at `http://localhost:5000`

## Deployment

### Option 1: cPanel Deployment

1. Update the FTP credentials in `deploy.py` with your cPanel/hosting information
2. Run the deployment script:
   ```
   python deploy.py
   ```

3. Configure your domain in cPanel to point to the uploaded files
4. The included `5000_proxy.php` file will redirect requests to your Flask application

### Option 2: Heroku Deployment

1. Make sure you have the Heroku CLI installed
2. Login to Heroku:
   ```
   heroku login
   ```

3. Create a new Heroku app:
   ```
   heroku create your-app-name
   ```

4. Push your code to Heroku:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

5. Open your deployed application:
   ```
   heroku open
   ```

### Option 3: Manual Deployment

1. Zip the entire project folder
2. Upload to your hosting service via cPanel File Manager
3. Extract the files in your public_html directory
4. Set up a WSGI configuration (refer to hosting provider's documentation)

## Customization

### Updating Images

1. Replace the placeholder images in the `static/assets/` directory with your own images
2. Make sure to maintain the same filenames or update the references in the HTML templates

### Updating Content

1. Edit the HTML templates in the `templates/` directory to update the content
2. Modify the CSS in `static/css/style.css` to update the styling
3. Update the JavaScript functionality in `static/js/main.js` as needed

### Adding Google Maps API Key

1. Register for a Google Maps API key at [Google Cloud Console](https://console.cloud.google.com/)
2. Replace `YOUR_API_KEY` in the `contact.html` template with your actual API key

## Maintenance

- Regularly update the Flask dependencies using `pip install --upgrade -r requirements.txt`
- Test the website on various devices and browsers to ensure compatibility
- Update the offers and promotions in the `offers.html` template as needed
- Add new images to the Instagram gallery section in `home.html` to keep it fresh

## License

© 2024 1313 FOG. All rights reserved.

---

For questions or support, contact info@1313fog.com
