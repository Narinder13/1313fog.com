/**
 * FOG - Fashion of Generations
 * Main JavaScript File
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initScrollToTop();
    initAnimations();
    initGalleryFilter();
    initAboutPageAnimations();
    initLocationCards(); // Initialize location card animations
    initContactPage(); // Initialize contact page elements
});

/**
 * Handle navbar functionality
 */
function initNavbar() {
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Add hover animation effect
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateY(-2px)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            link.style.transform = 'translateY(0)';
        });
        
        // Close mobile menu when clicking links
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Add additional check for active state based on URL path segments
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        // Get the href value from the link
        const href = link.getAttribute('href');
        
        // Only check links that have an href attribute
        if (href) {
            // Extract the path from the URL (handle both absolute and relative URLs)
            let linkPath = href;
            
            // If it's an absolute URL, extract just the path part
            if (href.includes('://')) {
                try {
                    const url = new URL(href);
                    linkPath = url.pathname;
                } catch (e) {
                    // If URL parsing fails, keep the original href
                }
            }
            
            // Check if the current path matches this link path (including deeper paths)
            if (currentPath === linkPath || 
                (linkPath !== '/' && currentPath.startsWith(linkPath))) {
                link.classList.add('active');
            }
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        // Check if menu is active and click is outside menu and toggle button
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Change header style on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Handle scroll to top button
 */
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    if (scrollBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicking button
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize animations on scroll
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    // Function to handle scroll events
    function handleScroll() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animate-fade-up')) {
                element.classList.add('animate-fade-up');
            }
        });
    }
    
    // Check elements on initial load
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
}

/**
 * Initialize animations for the about page
 */
function initAboutPageAnimations() {
    // Check if we're on the About page
    if (document.querySelector('.about-section')) {
        // Add scroll reveal animations
        const aboutIntro = document.querySelector('.about-intro');
        const aboutStory = document.querySelector('.about-story');
        const storeLocations = document.querySelector('.store-locations');
        const aboutContact = document.querySelector('.about-contact');
        const managerProfile = document.querySelector('.manager-profile');
        const storyParagraphs = document.querySelectorAll('.story-content p');
        const locationCards = document.querySelectorAll('.location-card');
        
        // Simple reveal animation function
        function reveal(element, delay = 0) {
            if (!element) return;
            
            // Initial state - hidden
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            // Trigger animation after delay
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay);
        }
        
        // Reveal elements with staggered delays
        reveal(aboutIntro, 300);
        reveal(managerProfile, 600);
        reveal(aboutStory, 900);
        
        // Animate paragraphs with staggered delay
        storyParagraphs.forEach((paragraph, index) => {
            reveal(paragraph, 900 + (index * 150));
        });
        
        // Animate location cards with staggered delay
        reveal(storeLocations, 1500);
        locationCards.forEach((card, index) => {
            reveal(card, 1800 + (index * 200));
        });
        
        // Animate contact section
        reveal(aboutContact, 2400);
    }
}

/**
 * Initialize gallery filtering functionality
 */
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(button => button.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get filter value
                const filterValue = btn.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        
                        // Add animation
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

/**
 * Initialize smooth animations for location cards
 */
function initLocationCards() {
    const locationCards = document.querySelectorAll('.location-card');
    
    if (locationCards.length) {
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const locationObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const card = entry.target;
                        const delay = card.dataset.delay || 0;
                        
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, parseInt(delay));
                        
                        // Stop observing once animation is triggered
                        observer.unobserve(card);
                    }
                });
            }, {
                threshold: 0.2  // Trigger when 20% of the card is visible
            });
            
            // Observe each location card
            locationCards.forEach(card => {
                locationObserver.observe(card);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            locationCards.forEach(card => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, 200);
            });
        }
        
        // Add hover effect with JavaScript for smoother transitions
        locationCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.backgroundColor = 'var(--primary)';
                this.style.color = 'white';
                
                // Find child elements and update their styles
                const heading = this.querySelector('h3');
                const paragraph = this.querySelector('p');
                const icon = this.querySelector('.location-icon');
                const link = this.querySelector('.location-link');
                
                if (heading) heading.style.color = 'white';
                if (paragraph) paragraph.style.color = 'rgba(255, 255, 255, 0.8)';
                if (icon) {
                    icon.style.backgroundColor = 'white';
                    icon.style.color = 'var(--primary)';
                }
                if (link) {
                    link.style.backgroundColor = 'white';
                    link.style.color = 'var(--primary)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.backgroundColor = 'var(--gray-100)';
                this.style.color = '';
                
                // Reset child elements styles
                const heading = this.querySelector('h3');
                const paragraph = this.querySelector('p');
                const icon = this.querySelector('.location-icon');
                const link = this.querySelector('.location-link');
                
                if (heading) heading.style.color = 'var(--primary)';
                if (paragraph) paragraph.style.color = 'var(--gray-600)';
                if (icon) {
                    icon.style.backgroundColor = 'var(--primary)';
                    icon.style.color = 'white';
                }
                if (link) {
                    link.style.backgroundColor = 'var(--primary-light)';
                    link.style.color = 'white';
                }
            });
        });
    }
}

/**
 * Initialize animations and interactive elements for the contact page
 */
function initContactPage() {
    // Form input focus effects
    const contactFormInputs = document.querySelectorAll('.contact-form-container input, .contact-form-container textarea');
    if (contactFormInputs) {
        contactFormInputs.forEach(input => {
            // Check for pre-filled fields
            if (input.value.trim() !== '') {
                input.parentElement.classList.add('focused');
            }
            
            // Focus and blur events
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // Contact page map customization
    const storeMap = document.getElementById('storeMap');
    if (storeMap && typeof L !== 'undefined') {
        // Add custom styling for map popups
        const mapPopups = document.querySelectorAll('.leaflet-popup-content-wrapper');
        if (mapPopups) {
            mapPopups.forEach(popup => {
                popup.style.borderRadius = '10px';
                popup.style.overflow = 'hidden';
            });
        }
    }

    // Add hover effects for store cards
    const storeCards = document.querySelectorAll('.store-card');
    if (storeCards) {
        storeCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const cardInner = this.querySelector('.store-card-inner');
                if (cardInner) {
                    cardInner.style.transform = 'translateY(-5px)';
                    cardInner.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const cardInner = this.querySelector('.store-card-inner');
                if (cardInner) {
                    cardInner.style.transform = '';
                    cardInner.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
                }
            });
        });
    }
}

/**
 * Smooth scrolling for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});
