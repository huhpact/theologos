class MenuManager {
    constructor() {
        this.currentMenu = 'hauptspeisekarte';
        this.init();
    }

    init() {
        this.setupMenuTabs();
        this.setupIngredientsToggles();
        this.setupBackToTop();
        this.setupMobileNavigation();
        this.setupCookieBanner();
    }

    setupMenuTabs() {
        const tabs = document.querySelectorAll('.menu-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const menuType = tab.getAttribute('data-menu');
                this.switchMenu(menuType);
            });
        });
    }

    setupIngredientsToggles() {
        const toggles = document.querySelectorAll('.ingredients-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const content = toggle.nextElementSibling;
                
                toggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        otherToggle.classList.remove('active');
                        otherToggle.nextElementSibling.classList.remove('active');
                    }
                });
                
                toggle.classList.toggle('active');
                content.classList.toggle('active');
            });
            
            toggle.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle.click();
            });
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

    setupMobileNavigation() {
        const hamburger = document.getElementById('hamburger');
        const mobileNavSidebar = document.getElementById('mobile-nav-sidebar');
        const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
        const mobileNavClose = document.getElementById('mobile-nav-close');

        const openMobileNav = () => {
            mobileNavSidebar.classList.add('active');
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeMobileNav = () => {
            mobileNavSidebar.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (hamburger) {
            hamburger.addEventListener('click', openMobileNav);
        }
        
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', closeMobileNav);
        }
        
        if (mobileNavOverlay) {
            mobileNavOverlay.addEventListener('click', closeMobileNav);
        }

        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links .nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });
    }

    setupCookieBanner() {
        const cookieBanner = document.getElementById('cookie-banner');
        const cookieButtons = document.querySelectorAll('.cookie-btn');

        if (!localStorage.getItem('cookiePreference')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }

        cookieButtons.forEach(button => {
            button.addEventListener('click', () => {
                const preference = button.id.replace('cookie-', '');
                localStorage.setItem('cookiePreference', preference);
                cookieBanner.classList.remove('show');
            });
        });

        const cookieSettings = document.getElementById('cookie-settings');
        if (cookieSettings) {
            cookieSettings.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('cookiePreference');
                cookieBanner.classList.add('show');
            });
        }
    }

    switchMenu(menuType) {
        const banner = document.getElementById('tageskarte-banner');
        if (menuType === 'tageskarte') {
            banner.style.display = 'block';
        } else {
            banner.style.display = 'none';
        }
        
        document.querySelectorAll('.menu-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-menu="${menuType}"]`).classList.add('active');

        document.querySelectorAll('.menu-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(menuType).classList.add('active');

        this.currentMenu = menuType;
        
        const toggles = document.querySelectorAll('.ingredients-toggle');
        const contents = document.querySelectorAll('.ingredients-content');
        
        toggles.forEach(toggle => toggle.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    new MenuManager();
});


