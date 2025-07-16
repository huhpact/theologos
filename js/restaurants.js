class RestaurantsPageManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupBackToTop();
        this.setupSmoothScrolling();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('restaurant-item')) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, 100);
                    } else {
                        entry.target.classList.add('visible');
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .feature-card');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (backToTopBtn) {
            let lastScrollTop = 0;
            
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 500) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
                
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    backToTopBtn.style.transform = 'translateY(0) scale(0.9)';
                } else {
                    backToTopBtn.style.transform = 'translateY(0) scale(1)';
                }
                
                lastScrollTop = scrollTop;
            });

            backToTopBtn.addEventListener('click', () => {
                backToTopBtn.style.transform = 'translateY(-8px) scale(1.1) rotate(5deg)';
                
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    backToTopBtn.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                }, 200);
            });
        }
    }

    setupSmoothScrolling() {
        window.scrollToSection = (sectionId) => {
            const target = document.getElementById(sectionId);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        };

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href').substring(1);
                if (targetId && document.getElementById(targetId)) {
                    e.preventDefault();
                    scrollToSection(targetId);
                }
            });
        });
    }
}

class AdvancedImageLoader {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupProgressiveLoading();
    }

    setupIntersectionObserver() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImageWithAnimation(img);
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px 0px',
                threshold: 0.01
            });
            
            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            images.forEach(img => this.loadImageWithAnimation(img));
        }
    }

    loadImageWithAnimation(img) {
        const placeholder = this.createPlaceholder(img);
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
            img.style.filter = 'blur(0px)';
            
            if (placeholder && placeholder.parentNode) {
                setTimeout(() => {
                    placeholder.remove();
                }, 300);
            }
        });

        img.addEventListener('error', () => {
            img.style.opacity = '0.5';
            img.style.filter = 'grayscale(100%)';
            console.warn('Failed to load image:', img.src);
        });

        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.filter = 'blur(5px)';
        img.style.transition = 'opacity 0.6s ease, transform 0.6s ease, filter 0.6s ease';
    }

    createPlaceholder(img) {
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
                        linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
                        linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
                        linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
            animation: shimmer 2s infinite linear;
            z-index: 1;
        `;
        
        img.parentNode.style.position = 'relative';
        img.parentNode.insertBefore(placeholder, img);
        
        return placeholder;
    }

    setupProgressiveLoading() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shimmer {
                0% { background-position: 0 0, 0 10px, 10px -10px, -10px 0px; }
                100% { background-position: 20px 20px, 20px 30px, 30px 10px, 10px 20px; }
            }
        `;
        document.head.appendChild(style);
    }
}

class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        this.monitorScrollPerformance();
        this.optimizeAnimations();
    }

    monitorScrollPerformance() {
        let ticking = false;
        
        function updateScrollEffects() {
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }, { passive: true });
    }

    optimizeAnimations() {
        const animatedElements = document.querySelectorAll('.restaurant-item, .restaurant-image img, .feature-card');
        
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
        
        setTimeout(() => {
            animatedElements.forEach(element => {
                element.style.willChange = 'auto';
            });
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new RestaurantsPageManager();
    new AdvancedImageLoader();
    new PerformanceMonitor();
    
    console.log('🏛️ Restaurants page initialized with advanced animations');
});