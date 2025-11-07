// ==========================================================================
// 24Render Website - Main JavaScript
// Modern, cinematic VFX studio website with smooth animations
// ==========================================================================

class Website {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupNavigation();
        this.setupHero();
        this.setupWork();
        this.setupTestimonials();
        this.setupFAQ();
        this.setupContactForm();
        this.setupSmoothScroll();
        this.setupParallax();
    }

    // ==========================================================================
    // Event Listeners Setup
    // ==========================================================================
    setupEventListeners() {
        // Window events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('load', () => this.handleLoad());

        // Navigation events
        document.addEventListener('click', (e) => this.handleGlobalClick(e));
    }

    // ==========================================================================
    // Navigation Setup
    // ==========================================================================
    setupNavigation() {
        this.header = document.querySelector('.header');
        this.menuBtn = document.querySelector('.menuBtn');
        this.mainMenu = document.querySelector('.mainMenu');
        // Select both mobile and desktop navigation links
        this.navLinks = document.querySelectorAll('.mainMenu a, .nav-link');

        // Mobile menu toggle
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        // Active link highlighting for both mobile and desktop navigation
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Only prevent default for internal anchor links
                if (href.startsWith('#')) {
                    e.preventDefault();
                    this.scrollToSection(href);
                    this.setActiveLink(link);
                }
                
                // Close mobile menu when clicking mobile nav links
                if (link.closest('.mainMenu')) {
                    this.closeMobileMenu();
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.menuBtn?.contains(e.target) && !this.mainMenu?.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.menuBtn?.classList.toggle('open');
        this.mainMenu?.classList.toggle('active');
        document.body.style.overflow = this.mainMenu?.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.menuBtn?.classList.remove('open');
        this.mainMenu?.classList.remove('active');
        document.body.style.overflow = '';
    }

    setActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    // ==========================================================================
    // Hero Section
    // ==========================================================================
    setupHero() {
        this.createHeroBackground();
        this.setupHeroScrollIndicator();
    }

    createHeroBackground() {
        const heroBackground = document.querySelector('.hero-background');
        if (!heroBackground) return;

        // Create animated background particles
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'hero-particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
        `;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255, 107, 53, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                animation: float ${Math.random() * 10 + 10}s infinite linear;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            particlesContainer.appendChild(particle);
        }

        heroBackground.appendChild(particlesContainer);

        // Add floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    setupHeroScrollIndicator() {
        const scrollIndicator = document.querySelector('.hero-scroll-indicator');
        scrollIndicator?.addEventListener('click', () => {
            this.scrollToSection('#work');
        });
    }

    // ==========================================================================
    // Work/Portfolio Section
    // ==========================================================================
    setupWork() {
        this.setupWorkFilters();
        this.setupWorkLightbox();
        this.createWorkPlaceholders();
    }

    createWorkPlaceholders() {
        const workItems = document.querySelectorAll('.work-item img');
        workItems.forEach((img, index) => {
            // Create placeholder gradients for images
            const gradients = [
                'linear-gradient(135deg, #ff6b35, #f7931e)',
                'linear-gradient(135deg, #00d4aa, #007991)',
                'linear-gradient(135deg, #667eea, #764ba2)',
                'linear-gradient(135deg, #f093fb, #f5576c)',
                'linear-gradient(135deg, #4facfe, #00f2fe)',
                'linear-gradient(135deg, #43e97b, #38f9d7)'
            ];
            
            img.style.background = gradients[index % gradients.length];
            img.alt = `Project ${index + 1} - ${img.alt}`;
            
            // Placeholder image (colored rectangle)
            img.src = `data:image/svg+xml,${encodeURIComponent(`
                <svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:${index % 2 === 0 ? '#ff6b35' : '#00d4aa'};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${index % 2 === 0 ? '#f7931e' : '#007991'};stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grad${index})" />
                    <text x="50%" y="50%" font-family="Inter, sans-serif" font-size="24" font-weight="bold" 
                          fill="white" text-anchor="middle" dy=".3em">PROJECT ${index + 1}</text>
                </svg>
            `)}`;
        });
    }

    setupWorkFilters() {
        // This would be expanded for actual filtering functionality
        const workItems = document.querySelectorAll('.work-item');
        workItems.forEach(item => {
            item.addEventListener('click', () => {
                this.openLightbox(item);
            });
        });
    }

    setupWorkLightbox() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxClose = this.lightbox?.querySelector('.lightbox-close');
        this.lightboxMediaContainer = document.getElementById('lightbox-media-container');

        this.lightboxClose?.addEventListener('click', () => this.closeLightbox());
        this.lightbox?.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // ESC key to close lightbox
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox?.classList.contains('active')) {
                this.closeLightbox();
            }
        });
    }

    openLightbox(workItem) {
        const videoUrl = workItem.getAttribute('data-video');
        if (!videoUrl) return;

        // Clear previous media
        this.lightboxMediaContainer.innerHTML = '';

        let embedHtml = '';
        // YouTube short or long URL handling
        const ytMatch = videoUrl.match(/(?:youtu.be\/(.+)|v=([^&]+))/);
        let videoId = '';
        if (ytMatch) {
            videoId = ytMatch[1] || ytMatch[2];
        }
        if (videoId) {
            embedHtml = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="YouTube video" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
        }

        if (!embedHtml) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'lightbox-embed-wrapper';
        wrapper.style.cssText = 'position:relative;width:100%;padding-top:56.25%;';
        const inner = document.createElement('div');
        inner.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
        inner.innerHTML = embedHtml;
        wrapper.appendChild(inner);
        this.lightboxMediaContainer.appendChild(wrapper);

        this.lightbox?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        if (!this.lightbox) return;
        this.lightbox.classList.remove('active');
        if (this.lightboxMediaContainer) {
            this.lightboxMediaContainer.innerHTML = '';
        }
        document.body.style.overflow = '';
    }

    // ==========================================================================
    // Testimonials Slider
    // ==========================================================================
    setupTestimonials() {
        this.testimonials = document.querySelectorAll('.testimonial-item');
        this.testimonialPrev = document.querySelector('.testimonial-prev');
        this.testimonialNext = document.querySelector('.testimonial-next');
        this.currentTestimonial = 0;

        this.testimonialPrev?.addEventListener('click', () => this.prevTestimonial());
        this.testimonialNext?.addEventListener('click', () => this.nextTestimonial());

        // Auto-rotate testimonials
        this.startTestimonialAutoRotate();
    }

    nextTestimonial() {
        this.testimonials[this.currentTestimonial]?.classList.remove('active');
        this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
        this.testimonials[this.currentTestimonial]?.classList.add('active');
    }

    prevTestimonial() {
        this.testimonials[this.currentTestimonial]?.classList.remove('active');
        this.currentTestimonial = this.currentTestimonial === 0 ? this.testimonials.length - 1 : this.currentTestimonial - 1;
        this.testimonials[this.currentTestimonial]?.classList.add('active');
    }

    startTestimonialAutoRotate() {
        setInterval(() => {
            this.nextTestimonial();
        }, 5000);
    }

    // ==========================================================================
    // FAQ Section
    // ==========================================================================
    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        });
    }

    // ==========================================================================
    // Contact Form
    // ==========================================================================
    setupContactForm() {
        this.contactForm = document.getElementById('contactForm');
        this.setupFormValidation();
        this.setupFormSubmission();
        this.setupFloatingLabels();
    }

    setupFormValidation() {
        const inputs = this.contactForm?.querySelectorAll('input, textarea');
        inputs?.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Validate based on field type
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            case 'text':
            case 'textarea':
                if (value.length < 2) {
                    errorMessage = 'This field must be at least 2 characters long';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = '#ff4444';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ff4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: block;
        `;
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorDiv = field.parentNode.querySelector('.field-error');
        errorDiv?.remove();
    }

    setupFormSubmission() {
        this.contactForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(this.contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate all fields
            const inputs = this.contactForm.querySelectorAll('input, textarea');
            let isFormValid = true;
            
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) return;

            // Show loading state
            const submitBtn = this.contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Success
                this.showFormSuccess();
                this.contactForm.reset();
                
            } catch (error) {
                this.showFormError('Failed to send message. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    showFormSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.textContent = 'Message sent successfully! We\'ll get back to you soon.';
        successMessage.style.cssText = `
            color: #00d4aa;
            font-size: 1rem;
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(0, 212, 170, 0.1);
            border-radius: 8px;
            text-align: center;
        `;
        
        this.contactForm.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    showFormError(message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error';
        errorMessage.textContent = message;
        errorMessage.style.cssText = `
            color: #ff4444;
            font-size: 1rem;
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(255, 68, 68, 0.1);
            border-radius: 8px;
            text-align: center;
        `;
        
        this.contactForm.appendChild(errorMessage);
        
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }

    setupFloatingLabels() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                input.addEventListener('focus', () => {
                    label.style.transform = 'translateY(-2.5rem) scale(0.9)';
                    label.style.color = 'var(--color-primary)';
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        label.style.transform = '';
                        label.style.color = '';
                    }
                });
            }
        });
    }

    // ==========================================================================
    // Smooth Scrolling
    // ==========================================================================
    setupSmoothScroll() {
        // Smooth scroll is handled by CSS scroll-behavior, but can be enhanced here
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                this.scrollToSection(targetId);
            });
        });
    }

    scrollToSection(targetId) {
        // Validate targetId before using as selector
        if (!targetId || targetId === '#' || targetId.length <= 1) {
            return;
        }
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        const headerHeight = this.header?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // ==========================================================================
    // Intersection Observer for Animations
    // ==========================================================================
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger specific animations based on element
                    this.handleElementAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll(`
            .fade-in, .slide-in-left, .slide-in-right, .scale-in,
            .service-card, .work-item, .process-step, .testimonial-content
        `);

        animatableElements.forEach(el => {
            el.classList.add('fade-in');
            this.observer.observe(el);
        });
    }

    handleElementAnimation(element) {
        // Add staggered animations for grids
        if (element.closest('.services-grid')) {
            const siblings = Array.from(element.parentNode.children);
            const index = siblings.indexOf(element);
            element.style.animationDelay = `${index * 0.1}s`;
        }

        if (element.closest('.work-grid')) {
            const siblings = Array.from(element.parentNode.children);
            const index = siblings.indexOf(element);
            element.style.animationDelay = `${index * 0.15}s`;
        }

        if (element.closest('.process-timeline')) {
            const siblings = Array.from(element.parentNode.children);
            const index = siblings.indexOf(element);
            element.style.animationDelay = `${index * 0.2}s`;
        }
    }

    // ==========================================================================
    // Scroll Handling
    // ==========================================================================
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Header scroll effect
        if (scrollY > 100) {
            this.header?.classList.add('scrolled');
        } else {
            this.header?.classList.remove('scrolled');
        }

        // Update active navigation link
        this.updateActiveNavLink();
        
        // Parallax effects
        this.handleParallax(scrollY);
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    this.setActiveLink(activeLink);
                }
            }
        });
    }

    // ==========================================================================
    // Parallax Effects
    // ==========================================================================
    setupParallax() {
        this.parallaxElements = document.querySelectorAll('.hero-background, .about-image img');
    }

    handleParallax(scrollY) {
        this.parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // ==========================================================================
    // Global Event Handlers
    // ==========================================================================
    handleGlobalClick(e) {
        // Handle any global click events here
        if (e.target.matches('.work-play')) {
            e.stopPropagation();
            const workItem = e.target.closest('.work-item');
            this.openLightbox(workItem);
        }
    }

    handleResize() {
        // Handle window resize
        this.closeMobileMenu();
    }

    handleLoad() {
        // Handle window load
        document.body.classList.add('loaded');
    }

    // ==========================================================================
    // Utility Methods
    // ==========================================================================
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ==========================================================================
// Initialize Website
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    new Website();
});

// ==========================================================================
// Additional Enhancements
// ==========================================================================

// Cursor enhancement for desktop
if (window.innerWidth > 1024) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(255, 107, 53, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Enhance cursor on hover
    document.addEventListener('mouseenter', (e) => {
        if (e.target && typeof e.target.matches === 'function' && e.target.matches('a, button, .work-item')) {
            cursor.style.transform = 'scale(2)';
        }
    }, true);

    document.addEventListener('mouseleave', (e) => {
        if (e.target && typeof e.target.matches === 'function' && e.target.matches('a, button, .work-item')) {
            cursor.style.transform = 'scale(1)';
        }
    }, true);
}

// Performance optimization
if ('IntersectionObserver' in window) {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Service Worker for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                // Service Worker registered successfully
            })
            .catch((registrationError) => {
                // Service Worker registration failed
            });
    });
}