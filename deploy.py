import os
import ftplib
from pathlib import Path

def deploy_website():
    """
    Deploy website files to a server via FTP
    This script uploads all files from the current directory to the FTP server
    Usage: python deploy.py
    """
    # FTP server details - replace with your actual credentials
    FTP_HOST = "your-ftp-server.com"
    FTP_USER = "your-username"
    FTP_PASS = "your-password"
    FTP_DIR = "/public_html"  # Remote directory, typically /public_html for cPanel
    
    # Connect to FTP server
    print(f"Connecting to {FTP_HOST}...")
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    
    # Navigate to the target directory
    try:
        ftp.cwd(FTP_DIR)
        print(f"Changed to directory {FTP_DIR}")
    except ftplib.error_perm:
        print(f"Creating directory {FTP_DIR}")
        ftp.mkd(FTP_DIR)
        ftp.cwd(FTP_DIR)
    
    # Local directory paths
    base_dir = Path('.')
    templates_dir = base_dir / 'templates'
    static_dir = base_dir / 'static'
    
    # Make sure remote directories exist
    ensure_remote_dir(ftp, "templates")
    ensure_remote_dir(ftp, "static")
    ensure_remote_dir(ftp, "static/css")
    ensure_remote_dir(ftp, "static/js")
    ensure_remote_dir(ftp, "static/assets")
      # Upload Python files, requirements, and other root files
    upload_files_in_dir(ftp, base_dir, ['*.py', '*.txt', '*.md', '.htaccess', '.env*'], FTP_DIR)
    
    # Upload templates
    upload_directory(ftp, templates_dir, f"{FTP_DIR}/templates")
    
    # Upload static files
    upload_directory(ftp, static_dir / 'css', f"{FTP_DIR}/static/css")
    upload_directory(ftp, static_dir / 'js', f"{FTP_DIR}/static/js")
    upload_directory(ftp, static_dir / 'assets', f"{FTP_DIR}/static/assets")
    
    # Upload special static files
    upload_files_in_dir(ftp, static_dir, ['robots.txt', 'sitemap.xml', '.htaccess', '5000_proxy.php'], f"{FTP_DIR}/static")
    
    # Close FTP connection
    ftp.quit()
    print("Deployment complete!")

def ensure_remote_dir(ftp, dir_name):
    """Create remote directory if it doesn't exist"""
    try:
        ftp.cwd(dir_name)
        ftp.cwd("..")  # Go back to parent
    except ftplib.error_perm:
        ftp.mkd(dir_name)

def upload_files_in_dir(ftp, local_dir, patterns, remote_dir):
    """Upload files matching patterns in the local directory to remote directory"""
    # Store current remote directory
    original_remote_dir = ftp.pwd()
    
    # Change to target remote directory
    if remote_dir != original_remote_dir:
        ftp.cwd(remote_dir)
    
    # Upload files matching patterns
    for pattern in patterns:
        for file_path in local_dir.glob(pattern):
            if file_path.is_file():
                print(f"Uploading {file_path.name}...")
                with open(file_path, 'rb') as file:
                    ftp.storbinary(f"STOR {file_path.name}", file)
    
    # Restore original remote directory
    if remote_dir != original_remote_dir:
        ftp.cwd(original_remote_dir)

def upload_directory(ftp, local_dir, remote_dir):
    """Upload all files in a local directory to a remote directory"""
    # Store current remote directory
    original_remote_dir = ftp.pwd()
    
    # Change to target remote directory (create if necessary)
    try:
        ftp.cwd(remote_dir)
    except ftplib.error_perm:
        # Create the directory structure recursively
        parts = remote_dir.split('/')
        current_path = ""
        for part in parts:
            if not part:
                continue
            current_path += f"/{part}"
            try:
                ftp.cwd(current_path)
            except ftplib.error_perm:
                ftp.mkd(current_path)
                ftp.cwd(current_path)
        
    # Upload all files in the directory
    for file_path in local_dir.glob('*'):
        if file_path.is_file():
            print(f"Uploading {file_path}...")
            with open(file_path, 'rb') as file:
                ftp.storbinary(f"STOR {file_path.name}", file)
    
    # Restore original remote directory
    ftp.cwd(original_remote_dir)

if __name__ == "__main__":
    deploy_website()
