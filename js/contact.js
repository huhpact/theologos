// Contact Page JavaScript - Modern Implementation

class ContactPageManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupBackToTop();
        this.setupContactInteractions();
        this.setupReservationWidget();
        this.setupHeroSlideshow();
        this.setupSmoothScrolling();
        this.setupParallaxEffects();
    }

    setupHeroSlideshow() {
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length > 1) {
            let currentSlide = 0;
            
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 5000);
        }
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.05,
            rootMargin: '0px 0px -10px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 50);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupSmoothScrolling() {
        document.documentElement.style.scrollBehavior = 'smooth';
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-slide');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    setupContactInteractions() {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Phone contact initiated');
                this.showNotification('Telefonnummer wird gewählt...', 'info');
            });
        });

        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Email contact initiated');
                this.showNotification('E-Mail-Programm wird geöffnet...', 'info');
            });
        });

        const socialLinks = document.querySelectorAll('.social-link, .social-icon');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = this.getSocialPlatform(link);
                this.showSocialNotification(platform);
            });
        });

        const mapLinks = document.querySelectorAll('a[href*="maps.google.com"]');
        mapLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Map interaction');
                this.showNotification('Google Maps wird geöffnet...', 'info');
            });
        });

        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    getSocialPlatform(link) {
        if (link.classList.contains('facebook') || link.querySelector('.fa-facebook-f')) return 'Facebook';
        if (link.classList.contains('instagram') || link.querySelector('.fa-instagram')) return 'Instagram';
        if (link.classList.contains('google') || link.querySelector('.fa-google')) return 'Google';
        if (link.querySelector('.fa-tripadvisor')) return 'TripAdvisor';
        return 'Social Media';
    }

    setupReservationWidget() {
        const widgetContainer = document.getElementById('reservation-form');

        this.showEnhancedFallbackWidget();
  
        setTimeout(() => {
            if (typeof window.DishReservation !== 'undefined') {
                try {
                    window.DishReservation.init({
                        container: '#reservation-form',
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
                            this.showSuccessMessage();
                        },
                        onError: (error) => {
                            this.showErrorMessage();
                        }
                    });
                } catch (error) {
                    console.error('Error initializing reservation widget:', error);
                }
            }
        }, 2000);
    }

    showEnhancedFallbackWidget() {
        const widgetContainer = document.getElementById('reservation-form');
        if (widgetContainer) {
            widgetContainer.innerHTML = `
                <div style="text-align: center; padding: var(--space-2xl); background: linear-gradient(135deg, var(--white), var(--cream)); border-radius: var(--radius-xl); border: 2px solid rgba(184, 134, 11, 0.1);">
                    <div style="width: 100px; height: 100px; background: linear-gradient(135deg, var(--primary-gold), var(--dark-gold)); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto var(--space-xl); box-shadow: 0 15px 30px rgba(184, 134, 11, 0.3); animation: pulse 2s infinite;">
                        <i class="fas fa-phone"></i>
                    </div>
                    <h4 style="color: var(--deep-blue); margin-bottom: var(--space-lg); font-family: var(--font-heading); font-size: 1.75rem; font-weight: 600;">Telefonische Reservierung</h4>
                    <p style="color: var(--medium-gray); margin-bottom: var(--space-xl); font-size: 1.125rem; line-height: 1.6; max-width: 300px; margin-left: auto; margin-right: auto;">Rufen Sie uns an für Ihre Reservierung.<br>Wir sind täglich von 11:00 - 23:00 Uhr für Sie da.</p>
                    <a href="tel:+491234567890" class="btn-primary" style="display: inline-flex; align-items: center; gap: var(--space-sm); text-decoration: none; margin-bottom: var(--space-lg); font-size: 1.125rem; padding: var(--space-lg) var(--space-xl);">
                        <i class="fas fa-phone"></i>
                        <span>+49 123 456 7890</span>
                    </a>
                    <div style="margin-top: var(--space-lg); padding: var(--space-md); background: rgba(184, 134, 11, 0.1); border-radius: var(--radius-lg); border-left: 4px solid var(--primary-gold);">
                        <p style="color: var(--medium-gray); font-size: 1rem; margin: 0; display: flex; align-items: center; justify-content: center; gap: var(--space-sm);">
                            <i class="fas fa-info-circle" style="color: var(--primary-gold);"></i>
                            Online-Reservierung wird bald verfügbar sein
                        </p>
                    </div>
                </div>
            `;
        }
    }

    showSocialNotification(platform) {
        const messages = {
            Facebook: `${platform}-Seite wird bald verfügbar sein!`,
            Instagram: `${platform}-Profil wird bald verfügbar sein!`,
            Google: `${platform}-Bewertungen werden bald verfügbar sein!`,
            TripAdvisor: `${platform}-Bewertungen werden bald verfügbar sein!`
        };

        this.showNotification(messages[platform] || `${platform} wird bald verfügbar sein!`, 'info');
    }

    showSuccessMessage() {
        this.showNotification('Reservierung erfolgreich! Sie erhalten eine Bestätigung per E-Mail.', 'success');
    }

    showErrorMessage() {
        this.showNotification('Fehler bei der Reservierung. Bitte versuchen Sie es erneut oder rufen Sie uns an.', 'error');
    }

    showNotification(message, type) {
        const colors = {
            success: '#38A169',
            error: '#E53E3E',
            info: '#1B365D'
        };

        const icons = {
            success: 'check-circle',
            error: 'exclamation-triangle',
            info: 'info-circle'
        };

        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: var(--space-lg) var(--space-xl);
            border-radius: var(--radius-xl);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            max-width: 400px;
            animation: slideInRight 0.4s ease;
            font-family: var(--font-primary);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: var(--space-md);">
                <i class="fas fa-${icons[type]}" style="font-size: 1.25rem;"></i>
                <span style="font-size: 1rem; line-height: 1.4; font-weight: 500;">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => notification.remove(), 400);
        }, 4500);
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

document.addEventListener('DOMContentLoaded', () => {
    new ContactPageManager();
    
    window.scrollToSection = scrollToSection;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        html {
            scroll-behavior: smooth;
        }
        
        /* Enhanced hover effects */
        .contact-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .contact-card:hover {
            transform: translateY(-10px) scale(1.02);
        }
        
        .detail-item:hover,
        .info-item:hover {
            transform: translateY(-8px) scale(1.01);
        }
        
        .social-link:hover {
            transform: translateY(-8px) scale(1.05);
        }
        
        /* Loading animation for images */
        img {
            transition: opacity 0.3s ease;
        }
        
        img[loading="lazy"] {
            opacity: 0;
        }
        
        img[loading="lazy"].loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
    
    console.log('📞 Contact page initialized with modern enhancements');
});