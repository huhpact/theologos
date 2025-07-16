
class ModernGalleryManager {
    constructor() {
        this.currentFilter = 'all';
        this.currentLightboxIndex = 0;
        this.galleryItems = [];
        this.visibleItems = 12;
        this.itemsPerLoad = 6;
        this.isLoading = false;
        this.scrollAnimationObserver = null;
        
        this.lightboxModal = null;
        this.lightboxClose = null;
        this.lightboxPrev = null;
        this.lightboxNext = null;
        this.lightboxImage = null;
        this.lightboxTitle = null;
        this.lightboxDescription = null;
        
        this.init();
    }

    init() {
        this.setupFilterTabs();
        this.setupGalleryItems();
        this.setupLightbox();
        this.setupLoadMore();
        this.setupBackToTop();
        this.setupKeyboardNavigation();
        this.setupScrollAnimations();
        this.loadInitialItems();
        
        console.log('🎨 Ultra Modern Gallery with Scroll Animations initialized');
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.scrollAnimationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');

                        if (entry.target.matches(':nth-child(12n+1)')) {
                            entry.target.style.animationDuration = '1.2s';
                        }
                    }, index * 100);
      
                    this.scrollAnimationObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        this.observeGalleryItems();
    }

    observeGalleryItems() {
        this.galleryItems.forEach(item => {
            if (!item.classList.contains('animate-in')) {
                this.scrollAnimationObserver.observe(item);
            }
        });
    }

    setupFilterTabs() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const filter = tab.getAttribute('data-filter');
                this.setActiveFilter(tab, filter);
                this.filterGalleryWithAdvancedAnimation(filter);
            });
        });
    }

    setActiveFilter(activeTab, filter) {
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        activeTab.classList.add('active');
        this.currentFilter = filter;
    }

    setupGalleryItems() {
        this.galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        
        this.galleryItems.forEach((item, index) => {
            const imageContainer = item.querySelector('.image-container');
            
            const openLightbox = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openLightboxWithAnimation(index);
            };
            
            if (imageContainer) {
                imageContainer.addEventListener('click', openLightbox);
            }

            const img = item.querySelector('img');
            if (img) {
                img.addEventListener('load', () => {
                    item.classList.remove('loading');
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                });
                
                if (!img.complete) {
                    item.classList.add('loading');
                    img.style.opacity = '0';
                    img.style.transform = 'scale(0.95)';
                    img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                }
            }
        });
    }

    filterGalleryWithAdvancedAnimation(filter) {
        const visibleItems = this.getVisibleItems();
        
        visibleItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(30px) scale(0.95)';
                item.style.opacity = '0';
                item.classList.remove('animate-in');
            }, index * 30);
        });
        
        setTimeout(() => {
            this.galleryItems.forEach((item) => {
                const category = item.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
                
                item.style.transform = '';
                item.style.opacity = '';
            });

            this.visibleItems = 12;

            setTimeout(() => {
                this.observeGalleryItems();
            }, 100);

            this.updateLoadMoreButton();
        }, visibleItems.length * 30 + 200);
    }

    setupLightbox() {
        this.lightboxModal = document.getElementById('lightbox-modal');
        this.lightboxClose = document.getElementById('lightbox-close');
        this.lightboxPrev = document.getElementById('lightbox-prev');
        this.lightboxNext = document.getElementById('lightbox-next');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.lightboxTitle = document.getElementById('lightbox-title');
        this.lightboxDescription = document.getElementById('lightbox-description');
        
        const lightboxOverlay = this.lightboxModal.querySelector('.lightbox-overlay');

        this.lightboxClose.addEventListener('click', () => this.closeLightboxWithAnimation());
        lightboxOverlay.addEventListener('click', () => this.closeLightboxWithAnimation());
        this.lightboxPrev.addEventListener('click', () => this.previousImageWithAnimation());
        this.lightboxNext.addEventListener('click', () => this.nextImageWithAnimation());
    }

    openLightboxWithAnimation(index) {
        this.currentLightboxIndex = index;
        const item = this.galleryItems[index];
        const img = item.querySelector('img');
        const title = item.querySelector('.overlay-content h3').textContent;
        const description = item.querySelector('.overlay-content p').textContent;

        this.lightboxImage.src = img.src.replace('w=800', 'w=1200');
        this.lightboxImage.alt = img.alt;
        this.lightboxTitle.textContent = title;
        this.lightboxDescription.textContent = description;

        this.lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        const lightboxContent = this.lightboxModal.querySelector('.lightbox-content');
        lightboxContent.style.transform = 'scale(0.8) rotate(-2deg)';
        lightboxContent.style.opacity = '0';
        
        setTimeout(() => {
            lightboxContent.style.transform = 'scale(1) rotate(0deg)';
            lightboxContent.style.opacity = '1';
        }, 100);

        const controls = [this.lightboxClose, this.lightboxPrev, this.lightboxNext];
        controls.forEach((control, index) => {
            control.style.transform = 'scale(0) rotate(180deg)';
            control.style.opacity = '0';
            setTimeout(() => {
                control.style.transform = 'scale(1) rotate(0deg)';
                control.style.opacity = '1';
            }, 200 + index * 50);
        });
    }

    closeLightboxWithAnimation() {
        const lightboxContent = this.lightboxModal.querySelector('.lightbox-content');
        const controls = [this.lightboxClose, this.lightboxPrev, this.lightboxNext];
        
        controls.forEach((control, index) => {
            setTimeout(() => {
                control.style.transform = 'scale(0) rotate(-90deg)';
                control.style.opacity = '0';
            }, index * 30);
        });
        
        setTimeout(() => {
            lightboxContent.style.transform = 'scale(0.8) rotate(2deg)';
            lightboxContent.style.opacity = '0';
        }, 100);
        
        setTimeout(() => {
            this.lightboxModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            lightboxContent.style.transform = '';
            lightboxContent.style.opacity = '';
            controls.forEach(control => {
                control.style.transform = '';
                control.style.opacity = '';
            });
        }, 300);
    }

    previousImageWithAnimation() {
        const visibleItems = this.getVisibleItems();
        if (visibleItems.length === 0) return;
        
        let currentIndex = visibleItems.indexOf(this.galleryItems[this.currentLightboxIndex]);
        currentIndex = currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1;
        
        const actualIndex = this.galleryItems.indexOf(visibleItems[currentIndex]);
        this.switchImageWithAnimation(actualIndex, 'left');
    }

    nextImageWithAnimation() {
        const visibleItems = this.getVisibleItems();
        if (visibleItems.length === 0) return;
        
        let currentIndex = visibleItems.indexOf(this.galleryItems[this.currentLightboxIndex]);
        currentIndex = currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0;
        
        const actualIndex = this.galleryItems.indexOf(visibleItems[currentIndex]);
        this.switchImageWithAnimation(actualIndex, 'right');
    }

    switchImageWithAnimation(newIndex, direction) {
        const lightboxContent = document.querySelector('.lightbox-content');
        const slideDirection = direction === 'left' ? '-50px' : '50px';
        const rotateDirection = direction === 'left' ? '-3deg' : '3deg';
        
        lightboxContent.style.transform = `translateX(${slideDirection}) scale(0.95) rotate(${rotateDirection})`;
        lightboxContent.style.opacity = '0.7';
        
        setTimeout(() => {
            this.currentLightboxIndex = newIndex;
            const item = this.galleryItems[newIndex];
            const img = item.querySelector('img');
            const title = item.querySelector('.overlay-content h3').textContent;
            const description = item.querySelector('.overlay-content p').textContent;

            this.lightboxImage.src = img.src.replace('w=800', 'w=1200');
            this.lightboxImage.alt = img.alt;
            this.lightboxTitle.textContent = title;
            this.lightboxDescription.textContent = description;
            
            const oppositeDirection = direction === 'left' ? '50px' : '-50px';
            const oppositeRotation = direction === 'left' ? '3deg' : '-3deg';
            lightboxContent.style.transform = `translateX(${oppositeDirection}) scale(0.95) rotate(${oppositeRotation})`;
            
            setTimeout(() => {
                lightboxContent.style.transform = 'translateX(0) scale(1) rotate(0deg)';
                lightboxContent.style.opacity = '1';
            }, 50);
        }, 150);
    }

    getVisibleItems() {
        return this.galleryItems.filter(item => {
            const category = item.getAttribute('data-category');
            const isVisible = this.currentFilter === 'all' || category === this.currentFilter;
            return isVisible && !item.classList.contains('hidden');
        });
    }

    setupLoadMore() {
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreItemsWithAnimation();
            });
        }
    }

    loadInitialItems() {
        this.galleryItems.forEach((item, index) => {
            if (index >= this.visibleItems) {
                item.style.display = 'none';
            }
        });
        this.updateLoadMoreButton();
    }

    loadMoreItemsWithAnimation() {
        if (this.isLoading) return;
        this.isLoading = true;
        
        const loadMoreBtn = document.getElementById('load-more');
        const originalText = loadMoreBtn.querySelector('span').textContent;
        
        loadMoreBtn.querySelector('span').textContent = 'Lädt weitere Bilder...';
        loadMoreBtn.style.transform = 'scale(0.95)';
        loadMoreBtn.style.opacity = '0.8';
        
        loadMoreBtn.style.animation = 'pulse 1.5s infinite';
        
        const visibleItems = this.getVisibleItems();
        const nextItems = visibleItems.slice(this.visibleItems, this.visibleItems + this.itemsPerLoad);
        
        setTimeout(() => {
            nextItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(40px) scale(0.9)';
                    
                    this.scrollAnimationObserver.observe(item);
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                }, index * 120);
            });

            this.visibleItems += this.itemsPerLoad;
            
            setTimeout(() => {
                this.updateLoadMoreButton();
                loadMoreBtn.querySelector('span').textContent = originalText;
                loadMoreBtn.style.transform = 'scale(1)';
                loadMoreBtn.style.opacity = '1';
                loadMoreBtn.style.animation = '';
                this.isLoading = false;
                
                if (nextItems.length > 0) {
                    const targetPosition = nextItems[0].offsetTop - 120;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, nextItems.length * 120 + 300);
        }, 500);
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more');
        if (!loadMoreBtn) return;
        
        const visibleItems = this.getVisibleItems();
        
        if (this.visibleItems >= visibleItems.length) {
            loadMoreBtn.style.opacity = '0';
            loadMoreBtn.style.transform = 'translateY(20px) scale(0.9)';
            setTimeout(() => {
                loadMoreBtn.style.display = 'none';
            }, 300);
        } else {
            loadMoreBtn.style.display = 'inline-flex';
            loadMoreBtn.style.opacity = '1';
            loadMoreBtn.style.transform = 'translateY(0) scale(1)';
            
            const remaining = visibleItems.length - this.visibleItems;
            const btnText = loadMoreBtn.querySelector('span');
            if (btnText && !this.isLoading) {
                btnText.textContent = `${remaining} weitere Bilder laden`;
            }
        }
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;
        
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

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.lightboxModal && this.lightboxModal.classList.contains('active')) {
                switch (e.key) {
                    case 'Escape':
                        this.closeLightboxWithAnimation();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.previousImageWithAnimation();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextImageWithAnimation();
                        break;
                    case ' ':
                        e.preventDefault();
                        this.nextImageWithAnimation();
                        break;
                }
            }
        });
    }
}
class GalleryPerformanceMonitor {
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
        const animatedElements = document.querySelectorAll('.gallery-item, .image-container img, .overlay-content');
        
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
    new ModernGalleryManager();
    new AdvancedImageLoader();
    new GalleryPerformanceMonitor();
    
    console.log('🚀  Gallery loaded');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});