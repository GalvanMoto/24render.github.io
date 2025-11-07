// ==========================================================================
// Work Page JavaScript - Portfolio filtering and animations
// ==========================================================================

class WorkPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFiltering();
        this.setupAnimations();
        this.setupNavigation();
    }

    // ==========================================================================
    // Event Listeners Setup
    // ==========================================================================
    setupEventListeners() {
        // Window events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('load', () => this.handleLoad());

        // Filter button events
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterClick(e));
        });
    }

    // ==========================================================================
    // Portfolio Filtering
    // ==========================================================================
    setupFiltering() {
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.currentFilter = 'all';
    }

    handleFilterClick(e) {
        const filter = e.target.getAttribute('data-filter');
        
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Filter portfolio items
        this.filterPortfolio(filter);
        this.currentFilter = filter;
    }

    filterPortfolio(filter) {
        this.portfolioItems.forEach((item, index) => {
            const categories = item.getAttribute('data-category');
            
            if (filter === 'all' || categories.includes(filter)) {
                // Show item with animation
                item.classList.remove('hidden');
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = `portfolioItemIn 0.6s ease-out ${index * 0.1}s forwards`;
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                }, 50);
            } else {
                // Hide item
                item.classList.add('hidden');
            }
        });
    }

    // ==========================================================================
    // Animations and Visual Effects
    // ==========================================================================
    setupAnimations() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe portfolio items and sections
        const animatedElements = document.querySelectorAll('.portfolio-item, .work-hero-content, .filter-controls, .cta-content');
        animatedElements.forEach(el => {
            this.scrollObserver.observe(el);
        });
    }

    setupHoverEffects() {
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        
        portfolioCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => this.handleCardHover(e, true));
            card.addEventListener('mouseleave', (e) => this.handleCardHover(e, false));
        });
    }

    handleCardHover(e, isEntering) {
        const card = e.currentTarget;
        const videoContainer = card.querySelector('.video-container');
        const tags = card.querySelectorAll('.tag');
        
        if (isEntering) {
            // Add hover animations
            tags.forEach((tag, index) => {
                tag.style.transitionDelay = `${index * 0.05}s`;
            });
            
            // Subtle parallax effect on video
            if (videoContainer) {
                videoContainer.style.transform = 'translateY(-5px)';
            }
        } else {
            // Reset animations
            tags.forEach(tag => {
                tag.style.transitionDelay = '0s';
            });
            
            if (videoContainer) {
                videoContainer.style.transform = 'translateY(0)';
            }
        }
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

    scrollToSection(href) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            this.scrollToElement(targetElement);
        }
    }

    scrollToElement(element) {
        const headerHeight = this.header?.offsetHeight || 80;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }

    // ==========================================================================
    // Scroll Handling
    // ==========================================================================
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Header scroll effect
        if (this.header) {
            if (scrollY > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }
    }

    // ==========================================================================
    // Resize Handling
    // ==========================================================================
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 992) {
            this.closeMobileMenu();
        }

        // Recalculate animations if needed
        this.portfolioItems.forEach(item => {
            if (!item.classList.contains('hidden')) {
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = '';
                }, 50);
            }
        });
    }

    // ==========================================================================
    // Load Handling
    // ==========================================================================
    handleLoad() {
        // Trigger initial animations
        const heroContent = document.querySelector('.work-hero-content');
        if (heroContent) {
            heroContent.classList.add('loaded');
        }

        // Lazy load YouTube iframes for better performance
        this.setupLazyLoading();
    }

    setupLazyLoading() {
        const iframes = document.querySelectorAll('iframe[src*="youtube"]');
        
        const iframeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    // Add autoplay parameter when iframe comes into view
                    const src = iframe.getAttribute('src');
                    if (!src.includes('autoplay')) {
                        iframe.setAttribute('src', src + '&autoplay=0&mute=1');
                    }
                    iframeObserver.unobserve(iframe);
                }
            });
        }, {
            threshold: 0.5
        });

        iframes.forEach(iframe => {
            iframeObserver.observe(iframe);
        });
    }
}

// ==========================================================================
// Search Functionality (Optional Enhancement)
// ==========================================================================
class PortfolioSearch {
    constructor() {
        this.setupSearch();
    }

    setupSearch() {
        // This could be expanded to include a search functionality
        // for filtering portfolio items by title or description
    }

    searchPortfolio(query) {
        const items = document.querySelectorAll('.portfolio-item');
        const lowerQuery = query.toLowerCase();

        items.forEach(item => {
            const title = item.querySelector('.portfolio-title').textContent.toLowerCase();
            const description = item.querySelector('.portfolio-description').textContent.toLowerCase();
            const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());

            const isMatch = title.includes(lowerQuery) || 
                          description.includes(lowerQuery) || 
                          tags.some(tag => tag.includes(lowerQuery));

            if (isMatch) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }
}

// ==========================================================================
// Initialize on DOM Load
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    new WorkPage();
    
    // Optional: Initialize search functionality
    // new PortfolioSearch();
});

// ==========================================================================
// Export for potential module usage
// ==========================================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WorkPage, PortfolioSearch };
}