// ==========================================================================
// Fantastic Navigation JavaScript
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.fantastic-nav');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const allNavItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
    
    // Scroll effect for navigation
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileToggle && mobileOverlay) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Mobile menu close
    if (mobileClose && mobileOverlay) {
        mobileClose.addEventListener('click', () => {
            closeMenu();
        });
    }
    
    // Close menu when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay) {
                closeMenu();
            }
        });
    }
    
    // Close menu when clicking nav items
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    // Close menu function
    function closeMenu() {
        if (mobileToggle) mobileToggle.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Smooth scroll for anchor links
    allNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navHeight = nav.offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(link => {
                    link.classList.remove('active');
                    
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}` || href === `index.html#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});
