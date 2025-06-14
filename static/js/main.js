document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');    // Highlight active navigation link
    const currentPath = window.location.pathname;
    const homePath = ['/', '/home', ''];
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if ((homePath.includes(currentPath) && href === '/') || 
            (currentPath === href)) {
            link.classList.add('active');
        }
    });
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });
      // Scroll to top button functionality
    const scrollTopButton = document.getElementById('scroll-to-top');
    
    if (scrollTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopButton.style.display = 'block';
            } else {
                scrollTopButton.style.display = 'none';
            }
        });
        
        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize special countdown timer if it exists
    function initializeCountdown() {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if(daysEl && hoursEl && minutesEl && secondsEl) {
            // Set the date we're counting down to - 7 days from now
            const countdownDate = new Date();
            countdownDate.setDate(countdownDate.getDate() + 7);
            
            function updateCountdown() {
                // Get today's date and time
                const now = new Date().getTime();
                
                // Find the distance between now and the countdown date
                const distance = countdownDate.getTime() - now;
                
                // Time calculations
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Display the result
                daysEl.textContent = days.toString().padStart(2, '0');
                hoursEl.textContent = hours.toString().padStart(2, '0');
                minutesEl.textContent = minutes.toString().padStart(2, '0');
                secondsEl.textContent = seconds.toString().padStart(2, '0');
                
                // If the countdown is over
                if (distance < 0) {
                    clearInterval(countdownTimer);
                    daysEl.textContent = "00";
                    hoursEl.textContent = "00";
                    minutesEl.textContent = "00";
                    secondsEl.textContent = "00";
                }
            }
            
            // Call once immediately
            updateCountdown();
            
            // Update every second
            const countdownTimer = setInterval(updateCountdown, 1000);
        }
    }
    
    // Call the countdown function
    initializeCountdown();
    
    // Animate on scroll effect
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.category-card, .collection, .location-card, .about-text, .about-image');
        
        if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            animatedElements.forEach(el => {
                el.classList.add('pre-animate');
                animationObserver.observe(el);
            });
        }
    }
    
    // Initialize scroll animations if supported
    initScrollAnimations();
    
    // Timeline Animation Handler
    function initTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (timelineItems.length === 0) return;
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on item position
                    setTimeout(() => {
                        entry.target.classList.add('in-view');
                    }, index * 200);
                    
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
    
    // Initialize timeline animation
    initTimelineAnimation();
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.card, .section-title, .timeline-item');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
                
                // Add fade-in class for timeline items
                if (element.classList.contains('timeline-item') && !element.classList.contains('in-view')) {
                    element.classList.add('in-view');
                }
            }
        });
    }
    
    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .card, .section-title, .timeline-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize timeline items with staggered animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Initial check and listen for scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
    
    // Form validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Create error message if it doesn't exist
                    let errorMsg = field.parentElement.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('small');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#e74c3c';
                        errorMsg.textContent = 'This field is required';
                        field.insertAdjacentElement('afterend', errorMsg);
                    }
                } else {
                    field.classList.remove('error');
                    const errorMsg = field.parentElement.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
            
            // Email validation
            const emailField = form.querySelector('[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                    
                    let errorMsg = emailField.parentElement.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('small');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#e74c3c';
                        errorMsg.textContent = 'Please enter a valid email address';
                        emailField.insertAdjacentElement('afterend', errorMsg);
                    } else {
                        errorMsg.textContent = 'Please enter a valid email address';
                    }
                }
            }
            
            if (!isValid) {
                e.preventDefault();
            } else {
                // Simulating form submission for demo purposes
                if (form.classList.contains('newsletter-form')) {
                    e.preventDefault();
                    alert('Thank you for subscribing to our newsletter!');
                    form.reset();
                } else if (form.closest('.contact-form')) {
                    e.preventDefault();
                    alert('Thank you for your message. We will get back to you soon!');
                    form.reset();
                }
            }
        });
        
        // Real-time validation
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', function() {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    field.classList.add('error');
                    
                    let errorMsg = field.parentElement.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('small');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#e74c3c';
                        errorMsg.textContent = 'This field is required';
                        field.insertAdjacentElement('afterend', errorMsg);
                    }
                } else {
                    field.classList.remove('error');
                    const errorMsg = field.parentElement.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
        });
    });    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
      // ABOUT PAGE TESTIMONIALS - Function moved to unified implementation below
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Auto-rotate slides
        setInterval(nextSlide, 5000);
    }      // Hero slider for homepage
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 0) {
        const indicators = document.querySelectorAll('.indicator');
        const nextBtn = document.querySelector('.next-slide');
        const prevBtn = document.querySelector('.prev-slide');
        let currentSlide = 0;
        let autoSlideInterval;
        
        function showSlide(index) {
            // Hide all slides
            heroSlides.forEach((slide) => {
                slide.classList.remove('active');
            });
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Show current slide
            heroSlides[index].classList.add('active');
            indicators[index].classList.add('active');
            currentSlide = index;
        }
        
        function nextHeroSlide() {
            let next = currentSlide + 1;
            if (next >= heroSlides.length) next = 0;
            showSlide(next);
        }
        
        function prevHeroSlide() {
            let prev = currentSlide - 1;
            if (prev < 0) prev = heroSlides.length - 1;
            showSlide(prev);
        }
        
        // Set up event listeners
        if (nextBtn) nextBtn.addEventListener('click', function() {
            nextHeroSlide();
            resetAutoSlide();
        });
        
        if (prevBtn) prevBtn.addEventListener('click', function() {
            prevHeroSlide();
            resetAutoSlide();
        });
          // Set up indicator clicks
        if (indicators) {
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    showSlide(index);
                    resetAutoSlide();
                });
            });
        }
        
        // Function to start auto-sliding
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextHeroSlide, 5000);
        }
        
        // Function to reset auto-slide timer
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
        
        // Start auto-sliding
        startAutoSlide();
    }
    
    // Animation on scroll for homepage
    const animatedElements = document.querySelectorAll('.category-card, .about-text, .about-image, .collection, .location-card, .gallery-item');
    
    if (animatedElements.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            element.classList.add('pre-animate');
            observer.observe(element);
        });
    }

    // Log that scripts are loaded
    console.log('Scripts loaded successfully');
    
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // GALLERY PAGE FUNCTIONALITY
    // Filter gallery items
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains('filter-' + filterValue)) {
                        item.style.display = 'block';
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
    
    // Lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);
    
    if (galleryImages.length > 0) {
        let currentIndex = 0;
        const images = Array.from(galleryImages);
        
        lightbox.innerHTML = `
            <div class="lightbox-close"><i class="fas fa-times"></i></div>
            <div class="lightbox-prev"><i class="fas fa-chevron-left"></i></div>
            <div class="lightbox-next"><i class="fas fa-chevron-right"></i></div>
            <img src="" class="lightbox-content">
        `;
        
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        const lightboxPrev = lightbox.querySelector('.lightbox-prev');
        const lightboxNext = lightbox.querySelector('.lightbox-next');
        
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', function() {
                currentIndex = index;
                updateLightboxImage();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        function updateLightboxImage() {
            lightboxContent.src = images[currentIndex].src;
        }
        
        lightboxClose.addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        lightboxPrev.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        });
        
        lightboxNext.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % images.length;
            updateLightboxImage();
        });
        
        // Allow keyboard navigation in lightbox
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % images.length;
                updateLightboxImage();
            }
        });
    }
    
    // ABOUT PAGE FUNCTIONALITY
    // Animation on scroll for timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        function checkTimelineInView() {
            timelineItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const isInView = (rect.top <= window.innerHeight * 0.8);
                
                if (isInView) {
                    item.classList.add('in-view');
                }
            });
        }
        
        window.addEventListener('scroll', checkTimelineInView);
        checkTimelineInView(); // Check on initial load
    }    // ABOUT PAGE TESTIMONIALS
    // Enhanced testimonial slider with navigation and auto-advance
    const testimonialSlider = document.getElementById('testimonial-slider');
    if (testimonialSlider) {
        const testimonialSlides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');
        const dotsContainer = document.getElementById('testimonial-dots');
        let currentIndex = 0;
        let autoAdvanceInterval;
        
        // Create dots if container exists
        if (dotsContainer) {
            // Clear any existing dots
            dotsContainer.innerHTML = '';
            
            testimonialSlides.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(i);
                    resetAutoAdvance();
                });
                dotsContainer.appendChild(dot);
            });
        }
        
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];        // Get progress indicator element
        const progressIndicator = document.getElementById('testimonial-progress');
        
        function showSlide(index) {
            // Store direction for animation
            const direction = index > currentIndex ? 'right' : 'left';
            
            // Hide all slides
            testimonialSlides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.display = 'none';
                // Remove any animation classes
                slide.classList.remove('slide-in-right', 'slide-in-left');
            });
            
            if (dots.length > 0) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
            }
            
            // Update progress indicator if it exists
            if (progressIndicator) {
                const progressPercentage = ((index + 1) / testimonialSlides.length) * 100;
                progressIndicator.style.width = progressPercentage + '%';
            }
            
            // Show current slide with direction-based animation
            testimonialSlides[index].classList.add('active');
            testimonialSlides[index].style.display = 'block';
            testimonialSlides[index].style.animation = direction === 'right' ? 
                'fadeInRight 0.5s ease forwards' : 'fadeInLeft 0.5s ease forwards';
        }
        
        function goToSlide(index) {
            currentIndex = index;
            showSlide(currentIndex);
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % testimonialSlides.length;
            showSlide(currentIndex);
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentIndex);
        }
        
        function resetAutoAdvance() {
            // Clear the existing interval and start a new one
            clearInterval(autoAdvanceInterval);
            autoAdvanceInterval = setInterval(nextSlide, 6000);
        }
        
        // Add button event listeners if they exist
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoAdvance();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoAdvance();
            });
        }
        
        // Initial setup
        testimonialSlides.forEach((slide, i) => {
            if (i === 0) {
                slide.classList.add('active');
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
        
        // Initialize auto-advance
        resetAutoAdvance();
    }
    
    // OFFERS PAGE FUNCTIONALITY
    // Offers page category tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    const offerCards = document.querySelectorAll('.offer-card');
    
    if (categoryTabs.length > 0 && offerCards.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                categoryTabs.forEach(tab => tab.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                offerCards.forEach(card => {
                    if (category === 'all' || card.classList.contains(category)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Special offer countdown timer
    function updateCountdown() {
        const countdownElement = document.getElementById('countdown-timer');
        if (!countdownElement) return;
        
        // Set end date - June 31, 2025 (example)
        const endDate = new Date('June 31, 2025 23:59:59').getTime();
        const now = new Date().getTime();
        const timeLeft = endDate - now;
        
        if (timeLeft <= 0) {
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">0</span>
                    <span class="countdown-label">days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">0</span>
                    <span class="countdown-label">hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">0</span>
                    <span class="countdown-label">mins</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">0</span>
                    <span class="countdown-label">secs</span>
                </div>
            `;
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">mins</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">secs</span>
            </div>
        `;
    }
    
    if (document.getElementById('countdown-timer')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // CONTACT PAGE FUNCTIONALITY
    // Initialize Google Maps
    function initMap() {
        const mapElement = document.getElementById('map');
        
        if (mapElement) {
            // Set default location (if API key is not available)
            let lat = 30.2084, lng = 74.9455; // Default coordinates for Bathinda, Punjab
            
            // Create map
            const map = new google.maps.Map(mapElement, {
                center: { lat, lng },
                zoom: 14,
                styles: [
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [{"color": "#444444"}]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [{"color": "#f2f2f2"}]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [{"visibility": "off"}]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [{"saturation": -100}, {"lightness": 45}]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [{"visibility": "simplified"}]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [{"visibility": "off"}]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [{"visibility": "off"}]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [{"color": "#4ecdc4"}, {"visibility": "on"}]
                    }
                ]
            });
            
            // Add marker
            const marker = new google.maps.Marker({
                position: { lat, lng },
                map: map,
                title: '1313 FOG Main Store',
                animation: google.maps.Animation.DROP
            });
            
            // Add info window
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="padding: 10px; max-width: 200px;">
                        <h3 style="margin-top: 0; color: #ff6b6b;">1313 FOG</h3>
                        <p style="margin-bottom: 5px;">123 Fashion Street, City Center</p>
                        <p style="margin-bottom: 5px;">Phone: +1-123-456-7890</p>
                        <a href="mailto:info@1313fog.com" style="color: #4ecdc4;">info@1313fog.com</a>
                    </div>
                `
            });
            
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
        }
    }
    
    // If Google Maps API is loaded, initialize map
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
        initMap();
    } else {
        // Map will be initialized by the callback in the script tag
        window.initMap = initMap;
    }
    
    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '';
                }
                
                // Email validation
                if (field.type === 'email' && field.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        field.style.borderColor = '#e74c3c';
                    }
                }
            });
            
            if (isValid) {
                // In a real application, you would submit the form data to a server
                // For demo purposes, show success message
                const formContainer = contactForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="check-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Message Sent!</h3>
                    <p>Thank you for contacting us. We will get back to you soon.</p>
                    <button class="btn-primary" id="reset-form">Send Another Message</button>
                `;
                
                formContainer.innerHTML = '';
                formContainer.appendChild(successMessage);
                
                // Reset form functionality
                document.getElementById('reset-form').addEventListener('click', function() {
                    formContainer.innerHTML = '';
                    formContainer.appendChild(contactForm);
                    contactForm.reset();
                });
            } else {
                // Show error message at the top of the form
                let errorMessage = contactForm.querySelector('.error-message');
                if (!errorMessage) {
                    errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.innerHTML = 'Please fill in all required fields correctly';
                    errorMessage.style.color = '#e74c3c';
                    errorMessage.style.marginBottom = '20px';
                    contactForm.insertBefore(errorMessage, contactForm.firstChild);
                }
            }
        });
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (elementPosition.top < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    // Admin page tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                tabContents.forEach(content => content.classList.remove('active'));
                const tabId = btn.getAttribute('data-tab');
                const active = document.getElementById(`${tabId}-tab`);
                if (active) active.classList.add('active');
            });
        });
    }

    // Font Awesome fallback
    (function() {
        const span = document.createElement('span');
        span.className = 'fas fa-check';
        span.style.display = 'none';
        document.body.appendChild(span);
        const loaded = window.getComputedStyle(span, ':before').getPropertyValue('content') !== '';
        document.body.removeChild(span);
        if (!loaded) {
            document.body.classList.add('use-svg-fallback');
        }
        document.querySelectorAll('.fas, .fab, .fa, [class^="fa-"], [class*=" fa-"]').forEach(icon => {
            icon.style.display = 'none';
            void icon.offsetHeight;
            icon.style.display = 'inline-block';
        });
    })();
    animateOnScroll(); // Check on initial load
});
