 document.addEventListener('DOMContentLoaded', function() {
            // Animation observer
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            // Observe all animated elements
            document.querySelectorAll('.gallery-fade-in, .gallery-slide-left, .gallery-slide-right, .gallery-scale-in').forEach(el => {
                observer.observe(el);
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('.gallery-nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all links
                    document.querySelectorAll('.gallery-nav-link').forEach(l => l.classList.remove('active'));
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    // Smooth scroll to section
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    const navHeight = document.querySelector('.gallery-nav').offsetHeight;
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - navHeight,
                        behavior: 'smooth'
                    });
                });
            });

            // Update active navigation link on scroll
            window.addEventListener('scroll', function() {
                const navHeight = document.querySelector('.gallery-nav').offsetHeight;
                const sections = document.querySelectorAll('.gallery-section');
                const navLinks = document.querySelectorAll('.gallery-nav-link');
                
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - navHeight - 100;
                    const sectionHeight = section.offsetHeight;
                    
                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });
            });

            
            // Add staggered animation delays
            document.querySelectorAll('.gallery-item').forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
        });