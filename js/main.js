class CookieManager {
    constructor() {
        this.cookieName = 'knossos_cookie_preferences';
        this.acceptedCookieName = 'knossos_cookies_accepted';
        this.init();
    }

    init() {
        if (!this.getCookie(this.acceptedCookieName)) {
            this.showCookieBanner();
        }
        this.setupEventListeners();
    }

    showCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            setTimeout(() => {
                banner.classList.add('show');
            }, 1500);
        }
    }

    hideCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('show');
        }
    }

    setupEventListeners() {
        const essentialBtn = document.getElementById('cookie-essential');
        const analyticsBtn = document.getElementById('cookie-analytics');
        const allBtn = document.getElementById('cookie-all');
        const settingsLink = document.getElementById('cookie-settings');

        if (essentialBtn) {
            essentialBtn.addEventListener('click', () => {
                this.setCookiePreferences({ essential: true, analytics: false, marketing: false });
                this.hideCookieBanner();
            });
        }

        if (analyticsBtn) {
            analyticsBtn.addEventListener('click', () => {
                this.setCookiePreferences({ essential: true, analytics: true, marketing: false });
                this.hideCookieBanner();
                this.loadAnalytics();
            });
        }

        if (allBtn) {
            allBtn.addEventListener('click', () => {
                this.setCookiePreferences({ essential: true, analytics: true, marketing: true });
                this.hideCookieBanner();
                this.loadAnalytics();
                this.loadMarketing();
            });
        }

        if (settingsLink) {
            settingsLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCookieBanner();
            });
        }
    }

    setCookiePreferences(preferences) {
        this.setCookie(this.acceptedCookieName, 'true', 365);
        this.setCookie(this.cookieName, JSON.stringify(preferences), 365);
    }

    getCookiePreferences() {
        const prefs = this.getCookie(this.cookieName);
        return prefs ? JSON.parse(prefs) : null;
    }

    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    loadAnalytics() {
        console.log('Analytics loaded');
    }

    loadMarketing() {
        console.log('Marketing tools loaded');
    }
}

class NavigationManager {
    constructor() {
        this.header = document.getElementById('header');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.logo = document.getElementById('logo');
        this.mobileNavOverlay = document.getElementById('mobile-nav-overlay');
        this.mobileNavSidebar = document.getElementById('mobile-nav-sidebar');
        this.mobileNavClose = document.getElementById('mobile-nav-close');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-links .nav-link');
        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveStates();
        this.setupLogoAnimation();
    }

    setupScrollEffects() {
        let lastScrollTop = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > scrollThreshold) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }

            lastScrollTop = scrollTop;
        });
    }

    setupMobileMenu() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.openMobileNav();
            });
        }

        if (this.mobileNavClose) {
            this.mobileNavClose.addEventListener('click', () => {
                this.closeMobileNav();
            });
        }

        if (this.mobileNavOverlay) {
            this.mobileNavOverlay.addEventListener('click', () => {
                this.closeMobileNav();
            });
        }

        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileNav();
            });
        });
    }

    openMobileNav() {
        this.hamburger.classList.add('active');
        this.mobileNavOverlay.classList.add('active');
        this.mobileNavSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMobileNav() {
        this.hamburger.classList.remove('active');
        this.mobileNavOverlay.classList.remove('active');
        this.mobileNavSidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    setupSmoothScrolling() {
        const allNavLinks = [...this.navLinks, ...this.mobileNavLinks];
        
        allNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 100;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    setupActiveStates() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 150;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    this.mobileNavLinks.forEach(link => link.classList.remove('active'));
                    
                    const activeLink = document.querySelector(`.nav-link[href="/${sectionId}.html"]`);
                    const activeMobileLink = document.querySelector(`.mobile-nav-links .nav-link[href="/${sectionId}.html"]`);

                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                    if (activeMobileLink) {
                        activeMobileLink.classList.add('active');
                    }
                }
            });
        });
    }

    setupLogoAnimation() {
        if (this.logo) {
            this.logo.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}

class HeroSlideshow {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.currentSlide = 0;
        this.slideInterval = 5000;
        this.init();
    }

    init() {
        if (this.slides.length > 1) {
            this.startSlideshow();
        }
    }

    startSlideshow() {
        setInterval(() => {
            this.nextSlide();
        }, this.slideInterval);
    }

    nextSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
    }
}

class AnimationController {
    constructor() {
        this.animatedElements = [];
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.addAnimationClasses();
        this.setupDelayedAnimations();
    }

    addAnimationClasses() {
        const sections = document.querySelectorAll('section');
        sections.forEach((section, sectionIndex) => {
            const elements = section.querySelectorAll('h2, h3, h4, p, .btn-primary, .btn-secondary, .menu-category-card, .gallery-item, .stat-item, .info-card, .text-block');
            elements.forEach((element, elementIndex) => {
                const animationClass = this.getAnimationClass(sectionIndex, elementIndex);
                element.classList.add(animationClass);
                this.animatedElements.push(element);
            });
        });
    }

    getAnimationClass(sectionIndex, elementIndex) {
        const animations = ['fade-in', 'slide-in-left', 'slide-in-right', 'scale-in', 'rotate-in', 'flip-in'];
        return animations[(sectionIndex + elementIndex) % animations.length];
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);

        const observeElements = () => {
            this.animatedElements.forEach(element => {
                if (!element.classList.contains('observed')) {
                    observer.observe(element);
                    element.classList.add('observed');
                }
            });
        };

        setTimeout(observeElements, 100);
    }

    setupDelayedAnimations() {
        const delayedElements = document.querySelectorAll('[data-delay]');
        delayedElements.forEach(element => {
            const delay = parseInt(element.getAttribute('data-delay'));
            element.style.animationDelay = `${delay}ms`;
        });
    }
}

class GutscheinManager {
    constructor() {
        this.amountDisplay = document.getElementById('gutschein-amount');
        this.amountOptions = document.querySelectorAll('.amount-option');
        this.init();
    }

    init() {
        this.setupAmountSelection();
    }

    setupAmountSelection() {
        this.amountOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.amountOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                const amount = option.getAttribute('data-amount');
                
                if (amount === 'custom') {
                    this.handleCustomAmount();
                } else {
                    this.updateAmountDisplay(amount + '€');
                }
            });
        });
    }

    handleCustomAmount() {
        const customAmount = prompt('Bitte geben Sie den gewünschten Betrag ein (nur Zahl):', '75');
        if (customAmount && !isNaN(customAmount) && customAmount > 0) {
            this.updateAmountDisplay(customAmount + '€');
        } else {
            this.amountOptions.forEach(opt => opt.classList.remove('active'));
            this.amountOptions[1].classList.add('active'); 
            this.updateAmountDisplay('50€');
        }
    }

    updateAmountDisplay(amount) {
        if (this.amountDisplay) {
            this.amountDisplay.textContent = amount;

            this.amountDisplay.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.amountDisplay.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

class ReservationManager {
    constructor() {
        this.widgetContainer = document.getElementById('reservation-widget');
        this.init();
    }

    init() {
        this.setupReservationWidget();
    }

    setupReservationWidget() {
        if (typeof window.DishReservation !== 'undefined') {
            try {
                window.DishReservation.init({
                    container: '#reservation-widget',
                    restaurantId: 'knossos-palast',
                    language: 'de',
                    theme: {
                        primaryColor: '#1B365D',
                        secondaryColor: '#B8860B',
                        backgroundColor: '#FFFFFF',
                        textColor: '#2D3748',
                        borderRadius: '12px'
                    },
                    onSuccess: (reservation) => {
                        console.log('Reservation successful:', reservation);
                        this.showSuccessMessage();
                    },
                    onError: (error) => {
                        console.error('Reservation error:', error);
                        this.showErrorMessage();
                    }
                });
            } catch (error) {
                console.error('Error initializing reservation widget:', error);
                this.showFallbackWidget();
            }
        } else {
            setTimeout(() => {
                if (typeof window.DishReservation === 'undefined') {
                    this.showFallbackWidget();
                } else {
                    this.setupReservationWidget();
                }
            }, 3000);
        }
    }

    showFallbackWidget() {
        if (this.widgetContainer) {
            this.widgetContainer.innerHTML = `
                <div class="widget-fallback" style="text-align: center; padding: 2rem;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #B8860B, #8B6914); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.5rem;">
                        <i class="fas fa-phone"></i>
                    </div>
                    <h4 style="color: #5C0F14; margin-bottom: 1rem; font-family: 'Skranji', cursive;">Online-Reservierung temporär nicht verfügbar</h4>
                    <p style="color: #B22222; margin-bottom: 1.5rem;">Bitte rufen Sie uns direkt an für Ihre Reservierung:</p>
                    <a href="tel:03315506743" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #400A0D; color: white; padding: 1rem 2rem; border-radius: 12px; text-decoration: none; font-weight: 600; transition: all 0.3s ease;">
                        <i class="fas fa-phone"></i>
                        <span>0331 5506743</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;
        }
    }

    showSuccessMessage() {
        this.showNotification('Reservierung erfolgreich! Sie erhalten eine Bestätigung per E-Mail.', 'success');
    }

    showErrorMessage() {
        this.showNotification('Fehler bei der Reservierung. Bitte versuchen Sie es erneut oder rufen Sie uns an.', 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: ${type === 'success' ? '#38A169' : '#E53E3E'}; color: white; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 10px 15px rgba(0,0,0,0.1); z-index: 1001; max-width: 400px;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
                    <span>${message}</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

class GalleryManager {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.init();
    }

    init() {
        this.setupLightbox();
    }

    setupLightbox() {
        this.galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    this.openLightbox(img.src, img.alt);
                }
            });
        });
    }

    openLightbox(imageSrc, imageAlt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-container">
                <img src="${imageSrc}" alt="${imageAlt}" class="lightbox-image">
                <button class="lightbox-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        this.addLightboxStyles();
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => lightbox.classList.add('show'), 10);

        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => this.closeLightbox(lightbox));
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox(lightbox);
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox(lightbox);
            }
        });
    }

    addLightboxStyles() {
        if (!document.getElementById('lightbox-styles')) {
            const style = document.createElement('style');
            style.id = 'lightbox-styles';
            style.textContent = `
                .lightbox-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .lightbox-overlay.show {
                    opacity: 1;
                }
                
                .lightbox-container {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .lightbox-image {
                    max-width: 100%;
                    max-height: 90vh;
                    object-fit: contain;
                    border-radius: 8px;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                }
                
                .lightbox-close {
                    position: absolute;
                    top: -15px;
                    right: -15px;
                    width: 40px;
                    height: 40px;
                    background: #B8860B;
                    border: none;
                    border-radius: 50%;
                    color: white;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
                    transition: all 0.3s ease;
                    z-index: 2001;
                }
                
                .lightbox-close:hover {
                    background: #8B6914;
                    transform: scale(1.1);
                }
                
                @media (max-width: 768px) {
                    .lightbox-close {
                        top: 10px;
                        right: 10px;
                        width: 35px;
                        height: 35px;
                        font-size: 0.9rem;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    closeLightbox(lightbox) {
        lightbox.classList.remove('show');
        setTimeout(() => {
            document.body.style.overflow = 'auto';
            lightbox.remove();
        }, 300);
    }
}

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.preloadCriticalImages();
        this.optimizeScrollPerformance();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }

    preloadCriticalImages() {
        const criticalImages = [
            '/images/main-slide1.jpg',
            '/images/main-slide2.jpg',
            '/images/main-slide3.jpg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = src;
            link.as = 'image';
            document.head.appendChild(link);
        });
    }

    optimizeScrollPerformance() {
        let ticking = false;
        
        function updateScrollEffects() {
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }
}

function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const offsetTop = target.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function openReservation() {
    const reservationSection = document.querySelector('.reservation');
    if (reservationSection) {
        const offsetTop = reservationSection.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function openGalleryPage() {
    scrollToSection('gallery');
    
    setTimeout(() => {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: #5C0F14; color: white; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 10px 15px rgba(0,0,0,0.1); z-index: 1001; max-width: 400px;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-info-circle"></i>
                    <span>Vollständige Galerie wird in Kürze verfügbar sein!</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    new CookieManager();
    new NavigationManager();
    new HeroSlideshow();
    new AnimationController();
    new GutscheinManager();
    new ReservationManager();
    new GalleryManager();
    new PerformanceOptimizer();

    window.scrollToSection = scrollToSection;
    window.openReservation = openReservation;
    window.openGalleryPage = openGalleryPage;

    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    console.log('🏛️ Knossos Palast Website initialized successfully');
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

class ReservationFormValidator {
    constructor() {
        this.form = document.getElementById('reservationForm');
        this.toastContainer = document.getElementById('toast-container');
        this.errors = {};
        this.isSubmitting = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setMinDate();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
        
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('toast-close')) {
                this.closeToast(e.target.closest('.toast'));
            }
        });
    }
    
    setMinDate() {
        const dateInput = document.getElementById('date');
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;
        
        const isValid = this.validateForm();
        
        if (!isValid) {
            this.showToast('error', 'Formular unvollständig', 'Bitte korrigieren Sie die markierten Felder.');
            return;
        }
        
        this.setSubmitLoading(true);
        
        try {
            const formData = new FormData(this.form);
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                this.showToast('success', 'Reservierung erfolgreich!', 'Wir haben Ihre Reservierung erhalten und werden Sie kontaktieren.');
                this.form.reset();
                this.clearAllErrors();
            } else {
                throw new Error('Fehler beim Senden der Reservierung');
            }
            
        } catch (error) {
            this.showToast('error', 'Fehler beim Senden', 'Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.');
        } finally {
            this.setSubmitLoading(false);
        }
    }
    
    validateForm() {
        let isValid = true;
        this.errors = {};

        const fields = [
            { id: 'name', validator: this.validateName },
            { id: 'email', validator: this.validateEmail },
            { id: 'phone', validator: this.validatePhone },
            { id: 'guests', validator: this.validateGuests },
            { id: 'date', validator: this.validateDate },
            { id: 'time', validator: this.validateTime }
        ];
        
        fields.forEach(field => {
            const input = document.getElementById(field.id);
            if (!field.validator.call(this, input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(input) {
        const validators = {
            'name': this.validateName,
            'email': this.validateEmail,
            'phone': this.validatePhone,
            'guests': this.validateGuests,
            'date': this.validateDate,
            'time': this.validateTime
        };
        
        const validator = validators[input.id];
        if (validator) {
            return validator.call(this, input);
        }
        
        return true;
    }
    
    validateName(input) {
        const value = input.value.trim();
        
        if (!value) {
            this.setFieldError(input, 'Name ist erforderlich');
            return false;
        }
        
        if (value.length < 2) {
            this.setFieldError(input, 'Name muss mindestens 2 Zeichen lang sein');
            return false;
        }
        
        if (!/^[a-zA-ZäöüÄÖÜß\s-]+$/.test(value)) {
            this.setFieldError(input, 'Name darf nur Buchstaben, Leerzeichen und Bindestriche enthalten');
            return false;
        }
        
        this.clearFieldError(input);
        return true;
    }
    
    validateEmail(input) {
        const value = input.value.trim();
        
        if (!value) {
            this.setFieldError(input, 'E-Mail-Adresse ist erforderlich');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            this.setFieldError(input, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
            return false;
        }
        
        this.clearFieldError(input);
        return true;
    }
    
    validatePhone(input) {
        const value = input.value.trim();
        
        if (!value) {
            this.setFieldError(input, 'Telefonnummer ist erforderlich');
            return false;
        }
        
        const numericValue = value.replace(/[^\d]/g, '');
        
        if (numericValue.length < 10) {
            this.setFieldError(input, 'Telefonnummer muss mindestens 10 Ziffern haben');
            return false;
        }
        
        if (numericValue.length > 15) {
            this.setFieldError(input, 'Telefonnummer darf maximal 15 Ziffern haben');
            return false;
        }
        
        const phoneRegex = /^(\+49|0049|0)[1-9][0-9]{8,14}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            this.setFieldError(input, 'Bitte geben Sie eine gültige deutsche Telefonnummer ein');
            return false;
        }
        
        this.clearFieldError(input);
        return true;
    }
    
    validateGuests(input) {
        const value = parseInt(input.value);
        
        if (!value || isNaN(value)) {
            this.setFieldError(input, 'Anzahl der Personen ist erforderlich');
            return false;
        }
        
        if (value < 1) {
            this.setFieldError(input, 'Mindestens 1 Person erforderlich');
            return false;
        }
        
        if (value > 20) {
            this.setFieldError(input, 'Maximal 20 Personen möglich');
            return false;
        }
        
        this.clearFieldError(input);
        return true;
    }
    
    validateDate(input) {
        const value = input.value;
        
        if (!value) {
            this.setFieldError(input, 'Datum ist erforderlich');
            return false;
        }
        
        const selectedDate = new Date(value);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        today.setHours(0, 0, 0, 0);
        tomorrow.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);
        
        if (selectedDate < tomorrow) {
            this.setFieldError(input, 'Reservierung ist erst ab morgen möglich');
            return false;
        }
        
        const maxDate = new Date(today);
        maxDate.setMonth(maxDate.getMonth() + 3);
        
        if (selectedDate > maxDate) {
            this.setFieldError(input, 'Reservierung ist maximal 3 Monate im Voraus möglich');
            return false;
        }
        
        this.clearFieldError(input);
        return true;
    }
    
    validateTime(input) {
        const value = input.value;
        
        if (!value) {
            this.setFieldError(input, 'Uhrzeit ist erforderlich');
            return false;
        }
        
        const [hours, minutes] = value.split(':').map(Number);
        
        if (hours < 12 || hours > 22) {
            this.setFieldError(input, 'Reservierung nur zwischen 12:00 und 22:00 Uhr möglich');
            return false;
        }
        
        if (hours === 21 && minutes > 30) {
            this.setFieldError(input, 'Letzte Reservierung um 21:30 Uhr');
            return false;
        }
        
        this.clearFieldError(input);
        return true;
    }
    
    setFieldError(input, message) {
        const errorElement = document.getElementById(input.id + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        
        input.classList.add('error');
        this.errors[input.id] = message;
    }
    
    clearFieldError(input) {
        const errorElement = document.getElementById(input.id + '-error');
        if (errorElement) {
            errorElement.classList.remove('show');
            errorElement.textContent = '';
        }
        
        input.classList.remove('error');
        delete this.errors[input.id];
    }
    
    clearAllErrors() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            this.clearFieldError(input);
        });
    }
    
    showToast(type, title, message) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconClass = {
            'success': 'fas fa-check-circle',
            'error': 'fas fa-exclamation-circle',
            'warning': 'fas fa-exclamation-triangle'
        };
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="${iconClass[type]}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" type="button">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        this.toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            this.closeToast(toast);
        }, 5000);
    }
    
    closeToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
    
    setSubmitLoading(loading) {
        const submitButton = this.form.querySelector('.knossos-form-submit');
        const submitIcon = submitButton.querySelector('i');
        
        if (loading) {
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            submitIcon.className = 'fas fa-spinner fa-spin';
            this.isSubmitting = true;
        } else {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            submitIcon.className = 'fas fa-calendar-check';
            this.isSubmitting = false;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ReservationFormValidator();
});

function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.startsWith('49')) {
        value = '+49 ' + value.slice(2);
    } else if (value.startsWith('0')) {
        value = '+49 ' + value.slice(1);
    }
    
    const formatted = value.replace(/(\+49\s?)(\d{3})(\d{4})(\d{4})/, '$1$2 $3 $4');
    input.value = formatted;
}

document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            formatPhoneNumber(e.target);
        });
    }
});