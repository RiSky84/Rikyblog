// Advanced Blog Features JavaScript with Mobile Chrome Optimizations

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Chrome specific optimizations
    initializeMobileOptimizations();
    
    // Initialize all features
    initializeNavigation();
    initializeDarkMode();
    initializeTypewriter();
    initializeStats();
    initializeSearch();
    initializeBlogFilters();
    initializeLikeSystem();
    initializeShareButtons();
    initializeBackToTop();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeScrollAnimations();
});

// Mobile Chrome specific optimizations
function initializeMobileOptimizations() {
    // Prevent zoom on input focus (mobile Chrome)
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type !== 'file') {
            input.style.fontSize = '16px';
        }
    });

    // Handle viewport height changes on mobile Chrome
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });

    // Optimize touch interactions
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
        const touchY = e.touches[0].clientY;
        const touchDiff = touchStartY - touchY;
        
        // Prevent bounce scrolling on iOS Safari and mobile Chrome
        if (touchDiff > 0 && window.scrollY === 0) {
            e.preventDefault();
        }
    }, { passive: false });

    // Optimize for mobile Chrome's address bar
    const mobileNav = document.querySelector('.nav-container');
    if (mobileNav) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down - hide nav
                mobileNav.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show nav
                mobileNav.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        }, { passive: true });
    }
}

// Navigation Menu with mobile Chrome optimizations
function initializeNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open on mobile Chrome
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
                body.style.position = 'fixed';
                body.style.width = '100%';
            } else {
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
            }
        });

        // Close menu on link click (mobile)
        const navLinksArray = document.querySelectorAll('.nav-link');
        navLinksArray.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    body.style.overflow = '';
                    body.style.position = '';
                    body.style.width = '';
                }
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
            }
        });
    }

    // Active nav link highlighting with throttling for mobile performance
    const navLinksArray = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, header');
    let ticking = false;

    function updateActiveNav() {
        if (!ticking) {
            requestAnimationFrame(() => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (scrollY >= (sectionTop - 200)) {
                        current = section.getAttribute('id');
                    }
                });

                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (current && link.getAttribute('href').includes(current)) {
                        link.classList.add('active');
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
}

// Dark Mode Toggle
function initializeDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = prefersDark.matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;
    
    // Apply the theme
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        updateToggleIcon(true);
    }
    
    // Toggle functionality
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            
            // Save preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Update toggle icon with animation
            updateToggleIcon(isDark);
            
            // Add smooth transition for theme change
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    }
    
    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                body.classList.add('dark-mode');
                updateToggleIcon(true);
            } else {
                body.classList.remove('dark-mode');
                updateToggleIcon(false);
            }
        }
    });
    
    function updateToggleIcon(isDark) {
        if (darkModeToggle) {
            const icon = darkModeToggle.querySelector('.theme-icon');
            if (icon) {
                icon.textContent = isDark ? '☀️' : '🌙';
                darkModeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            }
        }
    }
}

// Typewriter Effect
function initializeTypewriter() {
    const typewriter = document.querySelector('.typewriter');
    if (!typewriter) return;

    const text = typewriter.textContent;
    typewriter.textContent = '';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            typewriter.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    
    setTimeout(type, 1000);
}

// Animated Statistics
function initializeStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const current = parseInt(stat.textContent);
            const increment = target / 50;
            
            if (current < target) {
                stat.textContent = Math.ceil(current + increment);
                setTimeout(animateStats, 50);
            } else {
                stat.textContent = target;
            }
        });
    };

    // Trigger when stats come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsContainer = document.querySelector('.header-stats');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const blogPosts = document.querySelectorAll('.blog-post');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            blogPosts.forEach(post => {
                const title = post.querySelector('h2').textContent.toLowerCase();
                const content = post.querySelector('.post-content p').textContent.toLowerCase();
                const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                
                const isVisible = title.includes(searchTerm) || 
                                content.includes(searchTerm) || 
                                tags.some(tag => tag.includes(searchTerm));
                
                post.style.display = isVisible ? 'block' : 'none';
            });
        });
    }
}

// Blog Filter System
function initializeBlogFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const blogPosts = document.querySelectorAll('.blog-post');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            
            blogPosts.forEach(post => {
                if (filter === 'all' || post.getAttribute('data-category') === filter) {
                    post.style.display = 'block';
                    post.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
}

// Like System
function initializeLikeSystem() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(btn => {
        const postId = btn.getAttribute('data-post');
        const likeCount = btn.querySelector('.like-count');
        const heart = btn.querySelector('.heart');
        
        // Load saved likes from localStorage
        const savedLikes = localStorage.getItem(`post-${postId}-likes`) || 0;
        const isLiked = localStorage.getItem(`post-${postId}-liked`) === 'true';
        
        likeCount.textContent = savedLikes;
        if (isLiked) {
            btn.classList.add('liked');
            heart.style.color = '#e74c3c';
        }

        btn.addEventListener('click', function() {
            let currentLikes = parseInt(likeCount.textContent);
            
            if (this.classList.contains('liked')) {
                // Unlike
                currentLikes--;
                this.classList.remove('liked');
                heart.style.color = '';
                localStorage.setItem(`post-${postId}-liked`, 'false');
            } else {
                // Like
                currentLikes++;
                this.classList.add('liked');
                heart.style.color = '#e74c3c';
                heart.style.animation = 'heartPulse 0.6s ease';
                localStorage.setItem(`post-${postId}-liked`, 'true');
            }
            
            likeCount.textContent = currentLikes;
            localStorage.setItem(`post-${postId}-likes`, currentLikes);
        });
    });
}

// Share Functionality
function initializeShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const url = window.location.href;
            
            if (navigator.share) {
                navigator.share({
                    title: title,
                    url: url
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(url).then(() => {
                    this.innerHTML = '<span>✓ Copied!</span>';
                    setTimeout(() => {
                        this.innerHTML = '<span>📤 Share</span>';
                    }, 2000);
                });
            }
        });
    });
}

// Back to Top Button with enhanced smooth scrolling
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    let ticking = false;
    
    if (!backToTopBtn) return;

    function updateBackToTopButton() {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', updateBackToTopButton, { passive: true });

    // Enhanced smooth scroll to top function
    function smoothScrollToTop() {
        const startPosition = window.pageYOffset;
        const duration = 600;
        let start = null;

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            
            window.scrollTo(0, startPosition * (1 - easedProgress));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Use enhanced smooth scrolling for consistent experience across devices
        if ('scrollBehavior' in document.documentElement.style && !(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
            // Use native smooth scrolling on desktop browsers that support it well
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Use custom smooth scrolling for mobile devices and older browsers
            smoothScrollToTop();
        }
    });

    // Add touch feedback for mobile with improved performance
    let touchTimeout;
    backToTopBtn.addEventListener('touchstart', function() {
        clearTimeout(touchTimeout);
        this.style.transform = 'scale(0.95)';
    }, { passive: true });

    backToTopBtn.addEventListener('touchend', function() {
        const btn = this;
        touchTimeout = setTimeout(() => {
            btn.style.transform = '';
        }, 150);
    }, { passive: true });

    // Prevent double-tap zoom on mobile
    backToTopBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<span>✓ Sent!</span>';
                this.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }
}

// Smooth Scrolling with enhanced mobile and desktop support
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Enhanced smooth scrolling function with mobile optimization
    function smoothScrollTo(targetElement) {
        const targetPosition = targetElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition - 70; // Account for fixed nav
        const duration = 800; // Slightly longer for smoother feel
        let start = null;

        // Easing function for smooth animation
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const easedProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * easedProgress);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Check if browser supports native smooth scrolling
                if ('scrollBehavior' in document.documentElement.style) {
                    // Use native smooth scrolling for better performance on modern browsers
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                } else {
                    // Use custom smooth scrolling for older browsers and better mobile compatibility
                    smoothScrollTo(targetSection);
                }

                // Close mobile menu if open
                const navLinksContainer = document.querySelector('.nav-links');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                const body = document.body;
                
                if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    body.style.overflow = '';
                    body.style.position = '';
                    body.style.width = '';
                }
            }
        });
    });

    // Add smooth scrolling to any anchor links in the page content
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    allAnchorLinks.forEach(link => {
        if (!link.classList.contains('nav-link')) { // Avoid duplicate listeners
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    e.preventDefault();
                    
                    if ('scrollBehavior' in document.documentElement.style) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                            inline: 'nearest'
                        });
                    } else {
                        smoothScrollTo(targetSection);
                    }
                }
            });
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('section, article, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Floating Shapes Animation
function createFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const duration = 3 + index;
        const delay = index * 0.5;
        
        shape.style.animationDuration = `${duration}s`;
        shape.style.animationDelay = `${delay}s`;
    });
}

// Initialize floating shapes
setTimeout(createFloatingShapes, 1000);
