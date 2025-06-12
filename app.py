import os
from flask import Flask, render_template, send_from_directory
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-key-for-testing')

# Routes for main pages
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/offers')
def offers():
    return render_template('offers.html')

@app.route('/contact')
def contact():
    google_maps_api_key = os.getenv('GOOGLE_MAPS_API_KEY', '')
    return render_template('contact.html', google_maps_api_key=google_maps_api_key)

@app.route('/admin')
def admin():
    # In a real application, you would add authentication here
    return render_template('admin.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

# Routes for SEO files
@app.route('/robots.txt')
def robots():
    return send_from_directory(app.static_folder, 'robots.txt')

@app.route('/sitemap.xml')
def sitemap():
    return send_from_directory(app.static_folder, 'sitemap.xml')

# Error handlers
@app.errorhandler(404)
def page_not_found(e):
    return render_template('error.html', error_code=404, error_message="Page not found"), 404

@app.errorhandler(500)
def server_error(e):
    return render_template('error.html', error_code=500, error_message="Server error"), 500

if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_ENV', 'development') == 'development'
    app.run(debug=debug_mode)
