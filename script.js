// Smooth scrolling for navigation links with enhanced easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Add active state to nav links
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Smooth scroll with cubic-bezier easing
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;
            const duration = 800; // ms
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = cubicBezier(0.25, 0.1, 0.25, 1, progress);
                
                window.scrollTo(0, startPosition + distance * ease);
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            // Cubic bezier function for smooth easing
            function cubicBezier(p0, p1, p2, p3, t) {
                const term1 = Math.pow(1 - t, 3) * p0;
                const term2 = 3 * Math.pow(1 - t, 2) * t * p1;
                const term3 = 3 * (1 - t) * Math.pow(t, 2) * p2;
                const term4 = Math.pow(t, 3) * p3;
                return term1 + term2 + term3 + term4;
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Enhanced navbar scroll effect with transition
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollY = window.scrollY;
    
    // Apply scrolled class with threshold
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
        // Reduce navbar height slightly when scrolled
        navbar.style.padding = '0.7rem 0';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.padding = '1rem 0';
    }
    
    // Highlight active section in navbar
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href="#' + sectionId + '"]')?.classList.add('active');
        } else {
            document.querySelector('.nav-menu a[href="#' + sectionId + '"]')?.classList.remove('active');
        }
    });
});

// Enhanced scroll progress indicator with gradient animation
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    
    scrollIndicator.style.width = scrollPercent + '%';
    // Animate the gradient based on scroll position
    scrollIndicator.style.background = `linear-gradient(90deg, #667eea ${scrollPercent * 0.8}%, #764ba2 ${scrollPercent + 20}%)`;
});

// Enhanced Intersection Observer with different animation types
const observeElements = () => {
    // Animation variations
    const animations = {
        'fade-up': 'animate__fadeInUp',
        'fade-down': 'animate__fadeInDown',
        'fade-left': 'animate__fadeInLeft',
        'fade-right': 'animate__fadeInRight',
        'zoom-in': 'animate__zoomIn',
        'flip': 'animate__flipInX'
    };
    
    // Apply different animations based on data attributes
    document.querySelectorAll('.section').forEach((section, index) => {
        const animationType = index % 2 === 0 ? 'fade-up' : 'fade-down';
        section.setAttribute('data-animation', animationType);
    });
    
    // Separate observers for different types of elements
    const observeSections = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Apply animation type if specified
                const animationType = entry.target.getAttribute('data-animation');
                if (animationType && animations[animationType]) {
                    entry.target.classList.add(animations[animationType]);
                }
                
                // Only animate once
                observeSections.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observer for smaller elements with staggered animations
    const observeItems = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, i * 100);
                
                // Only animate once
                observeItems.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements
    document.querySelectorAll('.section').forEach(section => {
        observeSections.observe(section);
    });
    
    document.querySelectorAll('.fade-in').forEach(element => {
        observeItems.observe(element);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // Add animate.css classes for enhanced animations
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .animate__fadeInUp {
            animation: fadeInUp 1s ease forwards;
        }
        .animate__fadeInDown {
            animation: fadeInDown 1s ease forwards;
        }
        .animate__fadeInLeft {
            animation: fadeInLeft 1s ease forwards;
        }
        .animate__fadeInRight {
            animation: fadeInRight 1s ease forwards;
        }
        .animate__zoomIn {
            animation: zoomIn 1s ease forwards;
        }
        .animate__flipInX {
            animation: flipInX 1s ease forwards;
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translate3d(0, -50px, 0);
            }
            to {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        }
        
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translate3d(-50px, 0, 0);
            }
            to {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        }
        
        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translate3d(50px, 0, 0);
            }
            to {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        }
        
        @keyframes zoomIn {
            from {
                opacity: 0;
                transform: scale3d(0.3, 0.3, 0.3);
            }
            to {
                opacity: 1;
                transform: scale3d(1, 1, 1);
            }
        }
        
        @keyframes flipInX {
            from {
                transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
                animation-timing-function: ease-in;
                opacity: 0;
            }
            40% {
                transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
                animation-timing-function: ease-in;
            }
            60% {
                transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
                opacity: 1;
            }
            80% {
                transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
            }
            to {
                transform: perspective(400px);
                opacity: 1;
            }
        }
        
        .nav-menu a.active::after {
            width: 100%;
        }
        
        .nav-menu a.active {
            color: #667eea;
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Initialize observers
    observeElements();
    
    // Apply staggered animations to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.1}s`;
    });

    // Apply staggered animations to project cards with hover states
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Apply typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Improved parallax effect for hero section with throttling
let lastScrollTime = 0;
window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollTime > 20) { // throttle to 50 FPS
        lastScrollTime = now;
        
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && scrolled < window.innerHeight) {
            // Apply parallax effect with hardware acceleration
            hero.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
            
            // Create countermovement for content
            if (heroContent) {
                heroContent.style.transform = `translate3d(0, ${-scrolled * 0.2}px, 0)`;
                // Add subtle opacity change
                heroContent.style.opacity = 1 - (scrolled * 0.002);
            }
        }
    }
});

// Enhanced typing effect with cursor animation
const typeWriter = (element, text, speed = 100) => {
    // Add cursor element
    const cursor = document.createElement('span');
    cursor.classList.add('typing-cursor');
    cursor.innerHTML = '|';
    cursor.style.animation = 'cursor-blink 1s infinite';
    
    // Create style for cursor animation
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        @keyframes cursor-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        .typing-cursor {
            color: #fff;
            font-weight: normal;
            animation: cursor-blink 1s infinite;
        }
    `;
    document.head.appendChild(cursorStyle);
    
    element.innerHTML = '';
    element.appendChild(cursor);
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            cursor.insertAdjacentText('beforebegin', text.charAt(i));
            i++;
        } else {
            clearInterval(timer);
            
            // Remove cursor after typing completes (optional)
            setTimeout(() => {
                cursor.style.display = 'none';
            }, 2000);
        }
    }, speed);
};

// Enhanced hover effects for all interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Handle preloader
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        // Simulate loading time (remove in production and use real loading)
        setTimeout(() => {
            preloader.classList.add('fade-out');
            
            // Trigger page entrance animation after preloader fades
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 500);
        }, 1500);
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Add animation to menu items when opened
            if (navMenu.classList.contains('active')) {
                document.querySelectorAll('.nav-menu li').forEach((item, index) => {
                    item.style.animation = `fadeNavItems 0.5s forwards ${index * 0.1}s`;
                });
            } else {
                document.querySelectorAll('.nav-menu li').forEach(item => {
                    item.style.animation = '';
                });
            }
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }
    
    // Add page transition for smooth navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Add page transition effect for section changes
            const transitionOverlay = document.querySelector('.page-transition');
            
            if (transitionOverlay && this.getAttribute('href') !== '#home') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    // Quick flash transition effect
                    transitionOverlay.classList.add('active');
                    
                    setTimeout(() => {
                        // Scroll to target
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'instant'
                        });
                        
                        // Hide transition
                        setTimeout(() => {
                            transitionOverlay.classList.remove('active');
                        }, 200);
                    }, 300);
                }
            }
        });
    });
    
    // Project cards with advanced hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            
            // Animate border gradient
            this.style.setProperty('--gradient-position', '100%');
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            
            // Reset border gradient
            this.style.setProperty('--gradient-position', '0%');
        });
    });
    
    // Skill category hover animations
    document.querySelectorAll('.skill-category').forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.querySelectorAll('.skill-tag').forEach((tag, index) => {
                tag.style.transition = 'all 0.3s ease';
                tag.style.transitionDelay = `${index * 0.05}s`;
                tag.style.transform = 'translateY(-5px)';
            });
        });
        
        category.addEventListener('mouseleave', function() {
            this.querySelectorAll('.skill-tag').forEach(tag => {
                tag.style.transitionDelay = '0s';
                tag.style.transform = 'translateY(0)';
            });
        });
    });
    
    // Add ripple effect to buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add style for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .cta-button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Add counter animation to stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target, duration) => {
        const start = 0;
        const end = parseFloat(target.replace(/[^\d.-]/g, ''));
        const isInteger = Number.isInteger(end);
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Use easeOutQuart for natural counting
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            let currentValue = start + (end - start) * easeProgress;
            
            // Format the value correctly
            if (isInteger) {
                currentValue = Math.floor(currentValue);
                element.textContent = currentValue;
            } else {
                element.textContent = currentValue.toFixed(2);
            }
            
            // Add "+" if the original had it
            if (target.includes('+') && progress === 1) {
                element.textContent += '+';
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    // Observer for stat counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const originalText = element.textContent;
                
                // Animate the counter
                animateCounter(element, originalText, 1500);
                
                // Only animate once
                counterObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
});