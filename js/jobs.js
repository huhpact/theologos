const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
const mobileNavSidebar = document.getElementById('mobile-nav-sidebar');
const mobileNavClose = document.getElementById('mobile-nav-close');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links .nav-link');

let heroSlideIndex = 0;
const heroSlides = document.querySelectorAll('.hero-slide');

document.addEventListener('DOMContentLoaded', function() {
    initScrollEffects();
    initSmoothScrolling();
    initScrollAnimations();
    initPhoneCallHandlers();
});

function initScrollEffects() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}
function initSmoothScrolling() {
    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                scrollToSection(targetId);
                
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
    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.classList.remove('active');
    });
    
    activeLink.classList.add('active');
    
    const href = activeLink.getAttribute('href');
    [...navLinks, ...mobileNavLinks].forEach(link => {
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

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

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in, .flip-in');
    animatedElements.forEach(el => observer.observe(el));
}

function initPhoneCallHandlers() {
    const reservationBtns = document.querySelectorAll('.reservation-btn');
    reservationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'tel:03315506743';
        });
    });
}

function showToast(message, type = 'success', title = '') {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
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
    
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
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

window.addEventListener('resize', debounce(function() {
    if (window.innerWidth > 768) {
        closeMobileNav();
    }
}, 250));

function handleFormSubmission(form, successMessage = 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.') {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
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
            showToast(successMessage, 'success', 'Erfolgreich gesendet!');
            form.reset();
        }
    });
}

window.scrollToSection = scrollToSection;
window.showToast = showToast;