/**
 * LandSellerPro - Main JavaScript
 * Handles all interactive functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
    initRotatingText();
    initFAQ();
    initTestimonialSlider();
    initScrollReveal();
    initSmoothScroll();
    initContactForm();
});

/**
 * Navbar scroll effect with banner handling
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const topBanner = document.querySelector('.top-banner');
    
    if (topBanner) {
        navbar.classList.add('has-banner');
    }
    
    function handleScroll() {
        const scrollThreshold = topBanner ? 44 : 0;
        
        if (window.scrollY > scrollThreshold + 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    // Create mobile menu container
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <div class="mobile-menu-content">
            <ul>${navLinks.innerHTML}</ul>
            <a href="#contact" class="btn btn-primary">Get Your Offer</a>
        </div>
    `;
    document.body.appendChild(mobileMenu);
    
    // Toggle menu
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Rotating text animation
 */
function initRotatingText() {
    const textItems = document.querySelectorAll('.text-item');
    if (textItems.length === 0) return;
    
    let currentIndex = 0;
    
    function rotateText() {
        textItems.forEach(item => item.classList.remove('active'));
        currentIndex = (currentIndex + 1) % textItems.length;
        textItems[currentIndex].classList.add('active');
    }
    
    // Start rotation
    setInterval(rotateText, 2500);
}

/**
 * FAQ Accordion
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/**
 * Testimonial Slider with arrows and dots
 */
function initTestimonialSlider() {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (cards.length === 0) return;
    
    let currentIndex = 0;
    let autoplayInterval;
    
    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `dot${index === 0 ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.addEventListener('click', () => {
            stopAutoplay();
            showTestimonial(index);
            startAutoplay();
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.dot');
    
    function showTestimonial(index) {
        // Handle wrapping
        if (index < 0) index = cards.length - 1;
        if (index >= cards.length) index = 0;
        
        cards.forEach((card, i) => {
            card.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });
        
        cards[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        currentIndex = index;
    }
    
    function nextTestimonial() {
        showTestimonial(currentIndex + 1);
    }
    
    function prevTestimonial() {
        showTestimonial(currentIndex - 1);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextTestimonial, 5000);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Arrow buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoplay();
            nextTestimonial();
            startAutoplay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoplay();
            prevTestimonial();
            startAutoplay();
        });
    }
    
    // Pause on hover
    if (track) {
        track.addEventListener('mouseenter', stopAutoplay);
        track.addEventListener('mouseleave', startAutoplay);
    }
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (track) {
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoplay();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextTestimonial();
            } else {
                prevTestimonial();
            }
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const testimonialSection = document.querySelector('.testimonials-section');
        const rect = testimonialSection?.getBoundingClientRect();
        
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
            if (e.key === 'ArrowRight') {
                stopAutoplay();
                nextTestimonial();
                startAutoplay();
            } else if (e.key === 'ArrowLeft') {
                stopAutoplay();
                prevTestimonial();
                startAutoplay();
            }
        }
    });
    
    // Start autoplay
    startAutoplay();
}

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.promise-card, .step, .benefit-card, .why-card, .faq-item, .reason-card'
    );
    
    // Add reveal class with staggered delays
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    });
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal();
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle plain # links (go to top)
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            // Handle anchor links to sections
            try {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const topBanner = document.querySelector('.top-banner');
                    const bannerHeight = topBanner ? topBanner.offsetHeight : 0;
                    
                    // Calculate offset based on scroll position
                    const totalOffset = window.scrollY > bannerHeight ? navbarHeight : navbarHeight + bannerHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - totalOffset - 20;
                    
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                // Invalid selector, let browser handle it
                console.warn('Invalid anchor:', href);
            }
        });
    });
}

/**
 * Contact Form Handler - Formspree Integration
 * 
 * SETUP: Replace 'YOUR_FORMSPREE_ID' below with your actual Formspree form ID
 * Get your ID at: https://formspree.io
 */
const FORMSPREE_ID = 'xlgnyzka';

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Get form data
        const formData = {
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            message: form.querySelector('#message').value
        };
        
        // Validate
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(formData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Submit to Formspree
        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                showNotification('Thank you! We\'ll be in touch soon.', 'success');
                form.reset();
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Form submission failed');
            }
        } catch (error) {
            console.error('Form error:', error);
            showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


/**
 * Show notification
 */
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close" aria-label="Close">&times;</button>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 24px;
                padding: 16px 24px;
                border-radius: 12px;
                background: white;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                gap: 16px;
                z-index: 10000;
                animation: notificationSlideIn 0.3s ease;
                font-family: var(--font-family);
            }
            .notification-success {
                border-left: 4px solid #10b981;
            }
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #64748b;
                padding: 0;
                line-height: 1;
            }
            .notification-close:hover {
                color: #1e293b;
            }
            @keyframes notificationSlideIn {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

/**
 * Parallax effect for hero (subtle)
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = hero.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });
}

// Initialize parallax after DOM load
document.addEventListener('DOMContentLoaded', initParallax);
