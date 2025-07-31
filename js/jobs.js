// DOM Elements
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
const mobileNavSidebar = document.getElementById('mobile-nav-sidebar');
const mobileNavClose = document.getElementById('mobile-nav-close');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links .nav-link');

// Global variables
let heroSlideIndex = 0;
const heroSlides = document.querySelectorAll('.hero-slide');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initScrollEffects();
    initSmoothScrolling();
    initScrollAnimations();
    initPhoneCallHandlers();
});

// Header scroll effects
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}
// Smooth scrolling
function initSmoothScrolling() {
    // Handle navigation links
    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                scrollToSection(targetId);
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = header.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavLink(activeLink) {
    // Remove active class from all nav links
    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    activeLink.classList.add('active');
    
    // Also update the corresponding link in the other navigation
    const href = activeLink.getAttribute('href');
    [...navLinks, ...mobileNavLinks].forEach(link => {
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in, .flip-in');
    animatedElements.forEach(el => observer.observe(el));
}

// Phone call handlers
function initPhoneCallHandlers() {
    const reservationBtns = document.querySelectorAll('.reservation-btn');
    reservationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'tel:+49331123456778';
        });
    });
}

// Toast notification system
function showToast(message, type = 'success', title = '') {
    const toastContainer = document.getElementById('toast-container');
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Set icon based on type
    let icon = '';
    switch (type) {
        case 'success':
            icon = 'fas fa-check-circle';
            break;
        case 'error':
            icon = 'fas fa-exclamation-circle';
            break;
        case 'warning':
            icon = 'fas fa-exclamation-triangle';
            break;
        default:
            icon = 'fas fa-info-circle';
    }
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icon}"></i>
        </div>
        <div class="toast-content">
            ${title ? `<div class="toast-title">${title}</div>` : ''}
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add close functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => removeToast(toast), 5000);
}

function removeToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// Utility functions
function debounce(func, wait) {
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

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile nav on resize to larger screen
    if (window.innerWidth > 768) {
        closeMobileNav();
    }
}, 250));

// Handle form submissions (if any forms are added later)
function handleFormSubmission(form, successMessage = 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.') {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                showToast('Bitte füllen Sie alle Pflichtfelder aus.', 'error', 'Fehler');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Simulate form submission
            showToast(successMessage, 'success', 'Erfolgreich gesendet!');
            form.reset();
        }
    });
}

// Export functions for use in HTML onclick handlers
window.scrollToSection = scrollToSection;
window.showToast = showToast;