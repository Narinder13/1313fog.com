from flask import Flask, render_template, request, redirect, url_for, flash
import os
import json
from datetime import datetime

app = Flask(__name__, 
            static_url_path='/static',
            static_folder='static',
            template_folder='templates')  # Use the templates folder

app.config['SECRET_KEY'] = 'fog123456789fashion'  # Used for session

# Route for home page
@app.route('/')
def home():
    return render_template('index.html')

# Route for about page
@app.route('/about')
def about():
    return render_template('about.html')

# Also support .html extension for compatibility with static site
@app.route('/about.html')
def about_html():
    return render_template('about.html')

# Route for contact page
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Process contact form submission
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        subject = request.form.get('subject')
        message = request.form.get('message')
        
        # In a real application, you would:
        # 1. Validate the data
        # 2. Send an email or save to database
        # 3. Send confirmation email to user
        
        # For now, let's just save to a JSON file
        contact_data = {
            'name': name,
            'email': email,
            'phone': phone,
            'subject': subject,
            'message': message,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        # Create a 'contacts' directory if it doesn't exist
        os.makedirs('contacts', exist_ok=True)
        
        # Save to a JSON file
        filename = f"contacts/{datetime.now().strftime('%Y%m%d%H%M%S')}.json"
        with open(filename, 'w') as f:
            json.dump(contact_data, f, indent=4)
        
        # Flash a success message (requires a template with flash message support)
        flash("Thank you for your message. We'll get back to you soon!", 'success')
        return redirect(url_for('contact'))
        
    return render_template('contact.html')

# Also support .html extension
@app.route('/contact.html', methods=['GET', 'POST'])
def contact_html():
    if request.method == 'POST':
        return contact()
    return render_template('contact.html')

# Route for gallery page
@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

# Also support .html extension
@app.route('/gallery.html')
def gallery_html():
    return render_template('gallery.html')

# Route for offers page
@app.route('/offers')
def offers():
    return render_template('offers.html')

# Also support .html extension
@app.route('/offers.html')
def offers_html():
    return render_template('offers.html')

# Route for policies page
@app.route('/policies')
def policies():
    return render_template('policies.html')

# Also support .html extension
@app.route('/policies.html')
def policies_html():
    return render_template('policies.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
