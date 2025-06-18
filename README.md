# FOG - Fashion of Generations Website

This is a modern, responsive rebuild of the www.1313fog.com website. The new version maintains all the original text content but features a visually modern and professional design that matches 2025 web standards.

## Project Overview

FOG (Fashion of Generations) is an Indian multi-brand chain store firm with multiple stores in Punjab. They deal in Men, Women, and Kids ready-made garments and accessories. This website serves as their online presence, showcasing their products, offers, and store locations.

## Features

- Modern, responsive design built with HTML5, CSS3, and JavaScript
- Mobile-first approach that works on all devices
- Smooth transitions and animations
- Interactive elements like gallery filters, lightbox, and countdown timers
- Contact form with validation
- Store locations with interactive map
- Optimized for performance and SEO
- Sticky navbar and floating contact buttons
- Animated counters and statistics
- SEO-friendly meta tags

## Project Structure

```
├── /static
│   ├── /css
│   │   └── style.css (Modern, modular CSS with variables)
│   ├── /js
│   │   └── main.js (Vanilla JavaScript for interactivity)
│   └── /images
│       ├── /banners (Banner images for homepage and offers)
│       └── /gallery (Product images organized by category)
├── /templates
│   └── base.html (Base template for Flask version)
├── index.html (Homepage with hero, offers, collections)
├── about.html (Company story, mission, achievements)
├── contact.html (Contact form, store locations, interactive map)
├── gallery.html (Image showcase with filters and lightbox)
├── offers.html (Special offers and discounts)
├── policies.html (Business policies, refund, exchange)
├── app.py (Flask backend with routes and form handling)
├── requirements.txt (Python dependencies)
├── run_flask.bat (Script to run Flask version)
├── run_static.bat (Script to run static version)
└── README.md (This file)
```

## Setup Instructions

### Option 1: Static HTML Site

1. Clone the repository or download the files
2. Run the `run_static.bat` file to start a Python HTTP server
3. Or simply open any of the HTML files directly in a web browser

### Option 2: With Flask (Backend Support)

1. Clone the repository or download the files
2. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```
3. Run the `run_flask.bat` file, or manually start the Flask server:
   ```
   python -m flask run
   ```
4. Open your browser and navigate to `http://127.0.0.1:5000`

## Features Implementation

1. **Responsive Design**: 
   - Mobile-first approach with breakpoints for tablets and desktops
   - Flexbox and CSS Grid layouts for modern design

2. **Interactive Features**:
   - Sticky navbar that changes on scroll
   - Smooth scrolling between sections
   - Product gallery with category filters
   - Lightbox for image viewing
   - Animated counters for statistics
   - Interactive map for store locations

3. **Contact Features**:
   - Working contact form (saves submissions to JSON in Flask version)
   - Store locations with links to maps
   - Floating WhatsApp and Call buttons

4. **Performance Optimizations**:
   - Minified CSS and JS
   - Optimized images with lazy loading
   - Browser caching headers

## Credits

- Developed by GitHub Copilot
- Original content from www.1313fog.com
- Placeholder images created programmatically

If you want to use the Flask implementation:

1. Clone the repository or download the files
2. Make sure you have Python installed (Python 3.7 or later recommended)
3. Install Flask:
   ```
   pip install -r requirements.txt
   ```
4. Run the Flask application:
   ```
   python app.py
   ```
5. Open a web browser and go to `http://localhost:5000` to view the website

## Image Credits

The website uses placeholder images that should be replaced with actual FOG product images before deployment. The current images are royalty-free images used for demonstration purposes only.

## Browser Support

The website is compatible with the following browsers:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Safari (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Recent Updates

### Index Page Improvements (Latest Update)

The index page has been completely redesigned to match the exact structure and content of the original www.1313fog.com site:

1. **Restructured Layout**: Reorganized sections to match the original site order and content flow
2. **Added Fashion Collection Sections**: 
   - Added "Discover Latest Women Fashion" section
   - Added "Discover Latest Men Fashion" section
   - Added "Discover Latest Kids Fashion" section
   - Each section includes detailed descriptions and images
3. **Improved Winter Collection**: Updated layout and styles for better visual appeal
4. **Simplified Contact Information**: Streamlined the contact section to match the original site
5. **Fixed Content Duplication**: Removed redundant sections and consolidated similar information
6. **Responsive Design Fixes**: Improved mobile responsiveness and fixed display issues

All text content matches the original site exactly, with the visual design modernized for better user experience.

## Future Improvements

- Add e-commerce functionality
- Implement user accounts and wishlist feature
- Add a blog section for fashion tips and news
- Create a virtual try-on feature using AR technology

## License

This project is private and proprietary to FOG (Fashion of Generations).

## Contact

For any questions or support, please contact:
- Email: 1313fog@gmail.com
- Phone: +91 98584 00013
