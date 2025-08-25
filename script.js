// Blog Features JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM fully loaded');
    
    // IMMEDIATE SCROLL FIX - Ensure scrolling works from page load
    ensureInitialScrolling();
    
    // CREATE WORKING TOGGLE
    createSimpleWorkingToggle();
    
    console.log('✅ Toggle initialized');
    
    // Mobile optimizations
    initializeMobileOptimizations();
    
    // Initialize navigation
    initializeNavigation();
    // Skip complex dark mode, toggle handles it
    initializeNotificationSystem();
    
    // Test notification to ensure system is working
    setTimeout(() => {
        if (typeof showNotification === 'function') {
            showNotification('Welcome to Riky Rabha\'s Blog! 🎉', 'success', 4000);
        }
    }, 1000);
    
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
    initializeSkillsBars();
    initializeTimelineAnimations();
    initializeNewsletterForm();
});

// Ensure initial scrolling works properly
function ensureInitialScrolling() {
    // Force enable scrolling immediately
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.overflowY = 'auto';
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflow = 'auto';
    document.body.style.overflowY = 'auto';
    document.body.style.overflowX = 'hidden';
    
    // Remove any potential scroll blocking styles
    document.documentElement.style.position = 'relative';
    document.body.style.position = 'relative';
    
    // Enhanced mobile scroll enablement
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Force momentum scrolling
        document.documentElement.style.webkitOverflowScrolling = 'touch';
        document.body.style.webkitOverflowScrolling = 'touch';
        
        // Disable scroll-behavior auto on mobile for better performance
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Add CSS for ultra-smooth mobile scrolling
        const mobileScrollCSS = document.createElement('style');
        mobileScrollCSS.innerHTML = `
            @media (max-width: 768px) {
                html, body {
                    scroll-behavior: auto !important;
                    -webkit-overflow-scrolling: touch !important;
                    overflow-y: auto !important;
                    transform: translateZ(0) !important;
                    -webkit-transform: translateZ(0) !important;
                    will-change: scroll-position !important;
                }
                
                /* Smooth scrolling for all elements */
                * {
                    -webkit-backface-visibility: hidden !important;
                    backface-visibility: hidden !important;
                    -webkit-perspective: 1000px !important;
                    perspective: 1000px !important;
                }
                
                /* Optimize sections for smooth scrolling */
                section, article, nav, main, header, div {
                    -webkit-transform: translateZ(0) !important;
                    transform: translateZ(0) !important;
                    will-change: transform !important;
                }
            }
        `;
        document.head.appendChild(mobileScrollCSS);
    }
    
    // Force a reflow to apply changes
    document.body.offsetHeight;
    
    console.log('🔓 Enhanced initial scrolling enabled');
}

// Mobile optimizations
function initializeMobileOptimizations() {
    // Prevent zoom on input focus (mobile)
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type !== 'file') {
            input.style.fontSize = '16px';
        }
        
        // Touch optimizations
        input.addEventListener('touchstart', function() {
            const isDarkMode = document.body.classList.contains('dark-mode');
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Theme-aware touch feedback
            if (isDarkMode) {
                this.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.4), 0 0 30px rgba(0, 255, 255, 0.2)';
                this.style.borderColor = '#00ffff';
            } else {
                this.style.boxShadow = '0 0 15px rgba(52, 152, 219, 0.4), 0 0 30px rgba(52, 152, 219, 0.2)';
                this.style.borderColor = '#3498db';
            }
            
            // Haptic feedback if available
            if (navigator.vibrate) {
                navigator.vibrate(25);
            }
        }, { passive: true });
        
        input.addEventListener('touchend', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.borderColor = '';
            this.style.transition = '';
        }, { passive: true });
    });

    // Viewport height management
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Theme-aware viewport optimizations
        const isDarkMode = document.body.classList.contains('dark-mode');
        const root = document.documentElement;
        
        if (isDarkMode) {
            root.style.setProperty('--scroll-accent', '#00ffff');
            root.style.setProperty('--mobile-glow', 'rgba(0, 255, 255, 0.3)');
            root.style.setProperty('--theme-transition', '0.4s cubic-bezier(0.4, 0, 0.2, 1)');
        } else {
            root.style.setProperty('--scroll-accent', '#3498db');
            root.style.setProperty('--mobile-glow', 'rgba(52, 152, 219, 0.3)');
            root.style.setProperty('--theme-transition', '0.3s cubic-bezier(0.4, 0, 0.2, 1)');
        }
        
        // Update mobile CSS properties
        root.style.setProperty('--mobile-nav-height', '60px');
        root.style.setProperty('--mobile-safe-area', 'env(safe-area-inset-bottom, 0px)');
    }
    
    // Set initial viewport height
    setViewportHeight();
    
    // Viewport change handling
    let resizeTimeout;
    let orientationTimeout;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setViewportHeight();
            // Trigger scroll performance update
            if (typeof optimizeScrollPerformance === 'function') {
                optimizeScrollPerformance();
            }
        }, 150);
    }, { passive: true });
    
    window.addEventListener('orientationchange', () => {
        clearTimeout(orientationTimeout);
        orientationTimeout = setTimeout(() => {
            setViewportHeight();
            // Force layout recalculation
            document.body.style.height = '100.1%';
            setTimeout(() => {
                document.body.style.height = '';
            }, 100);
        }, 200);
    }, { passive: true });

    // Scroll performance for mobile
    let ticking = false;
    function optimizeScrollPerformance() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Theme-aware scroll optimizations
                const isDarkMode = document.body.classList.contains('dark-mode');
                const scrollableElements = document.querySelectorAll('section, nav, main, article, header');
                
                scrollableElements.forEach(element => {
                    // Force hardware acceleration
                    element.style.willChange = 'transform, opacity';
                    element.style.transform = 'translateZ(0)';
                    element.style.backfaceVisibility = 'hidden';
                    element.style.webkitBackfaceVisibility = 'hidden'; // iOS Safari
                    
                    // Theme-specific performance optimizations
                    if (isDarkMode) {
                        element.style.perspective = '1000px';
                        element.style.transformStyle = 'preserve-3d';
                    } else {
                        element.style.perspective = '1200px';
                        element.style.transformStyle = 'preserve-3d';
                    }
                    
                    // Apply smooth transitions
                    element.style.transition = `all ${isDarkMode ? '0.4s' : '0.3s'} cubic-bezier(0.4, 0, 0.2, 1)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Make function globally available
    window.optimizeScrollPerformance = optimizeScrollPerformance;
    
    window.addEventListener('scroll', optimizeScrollPerformance, { passive: true });

    // Overscroll prevention for mobile
    document.body.addEventListener('touchmove', function(e) {
        if (e.target === document.body) {
            e.preventDefault();
        }
    }, { passive: false });

    // Mobile navigation auto-hide
    const mobileNav = document.querySelector('.nav-container');
    if (mobileNav) {
        let lastScrollTop = 0;
        let scrollTimeout;
        let isNavVisible = true;
        
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const isDarkMode = document.body.classList.contains('dark-mode');
                const scrollDiff = Math.abs(scrollTop - lastScrollTop);
                
                // Only trigger if scroll difference is significant
                if (scrollDiff > 5) {
                    if (scrollTop > lastScrollTop && scrollTop > 100 && isNavVisible) {
                        // Scrolling down - hide nav
                        mobileNav.style.transform = 'translateY(-100%)';
                        mobileNav.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        isNavVisible = false;
                        
                        if (isDarkMode) {
                            mobileNav.style.boxShadow = '0 2px 30px rgba(0, 255, 255, 0.1)';
                        } else {
                            mobileNav.style.boxShadow = '0 2px 30px rgba(52, 152, 219, 0.1)';
                        }
                    } else if ((scrollTop < lastScrollTop || scrollTop <= 100) && !isNavVisible) {
                        // Scrolling up - show nav
                        mobileNav.style.transform = 'translateY(0)';
                        mobileNav.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        isNavVisible = true;
                        
                        if (isDarkMode) {
                            mobileNav.style.boxShadow = '0 2px 30px rgba(0, 255, 255, 0.3)';
                        } else {
                            mobileNav.style.boxShadow = '0 2px 30px rgba(52, 152, 219, 0.3)';
                        }
                    }
                }
                lastScrollTop = scrollTop;
            }, 15); // Reduced delay for responsiveness
        }, { passive: true });
    }

    // Mobile Chrome smooth scroll polyfill
    if (/Android.*Chrome/i.test(navigator.userAgent) && /Mobile/i.test(navigator.userAgent)) {
        // Override native scrollIntoView for better mobile performance
        Element.prototype.smoothScrollIntoView = function(options = {}) {
            const targetElement = this;
            const targetPosition = targetElement.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition - (options.offset || 80);
            const duration = options.duration || 1000;
            const isDarkMode = document.body.classList.contains('dark-mode');
            let start = null;

            // Easing function with theme-specific behavior
            function enhancedEasing(t) {
                if (isDarkMode) {
                    // Smoother easing for dark mode
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                } else {
                    // More responsive for light mode
                    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
                }
            }

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                const easedProgress = enhancedEasing(progress);
                
                const newPosition = startPosition + distance * easedProgress;
                
                // Use documentElement.scrollTop for better mobile performance
                document.documentElement.scrollTop = newPosition;
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                } else {
                    document.documentElement.scrollTop = targetPosition - (options.offset || 80);
                    
                    // Callback when animation completes
                    if (options.onComplete) {
                        options.onComplete();
                    }
                }
            }

            requestAnimationFrame(animation);
        };
    }
    
    // Initialize optimizations
    optimizeScrollPerformance();
    
    // Enhanced Mobile Scroll Performance Optimization
    initializeEnhancedMobileScrolling();
    
    console.log('📱 Mobile optimizations initialized');
}

// Enhanced Mobile Scrolling Performance Function
function initializeEnhancedMobileScrolling() {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (!isMobile) return;
    
    // Force hardware acceleration on all scrollable elements
    const scrollableElements = document.querySelectorAll('body, html, section, nav, main, header, article, .content, .container');
    scrollableElements.forEach(element => {
        element.style.webkitTransform = 'translateZ(0)';
        element.style.transform = 'translateZ(0)';
        element.style.webkitBackfaceVisibility = 'hidden';
        element.style.backfaceVisibility = 'hidden';
        element.style.willChange = 'scroll-position, transform';
    });
    
    // iOS specific optimizations
    if (isIOS) {
        document.body.style.webkitOverflowScrolling = 'touch';
        document.documentElement.style.webkitOverflowScrolling = 'touch';
        
        // Improved elastic bounce scrolling prevention - less aggressive
        let touchStartY = 0;
        let touchMoveY = 0;
        let allowScroll = true;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            allowScroll = true;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (!allowScroll) return;
            
            touchMoveY = e.touches[0].clientY;
            const touchDelta = touchMoveY - touchStartY;
            const scrollTop = window.pageYOffset;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            
            // Only prevent overscroll at extreme boundaries with tolerance
            const tolerance = 5;
            const isAtTop = scrollTop <= tolerance;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - tolerance;
            const isScrollingUp = touchDelta > 0;
            const isScrollingDown = touchDelta < 0;
            
            // Only prevent if we're at the boundary AND trying to scroll beyond
            if ((isAtTop && isScrollingUp && Math.abs(touchDelta) > 10) || 
                (isAtBottom && isScrollingDown && Math.abs(touchDelta) > 10)) {
                e.preventDefault();
                allowScroll = false;
            }
        }, { passive: false });
        
        // Reset allow scroll on touch end
        document.addEventListener('touchend', () => {
            allowScroll = true;
        }, { passive: true });
    }
    
    // Android specific optimizations
    if (isAndroid) {
        // Optimize scroll behavior for Android
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Custom smooth scroll implementation for Android
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                // Trigger reflow for smoother scrolling
                document.body.offsetHeight;
            });
        }, { passive: true });
    }
    
    // Universal mobile scroll optimization - ultra-aggressive approach for smoothness
    const optimizeScrollCSS = document.createElement('style');
    optimizeScrollCSS.textContent = `
        @media (max-width: 768px) {
            html {
                -webkit-overflow-scrolling: touch !important;
                overscroll-behavior: none !important;
                scroll-behavior: auto !important;
                overflow-y: auto !important;
                overflow-x: hidden !important;
                -webkit-transform: translateZ(0) !important;
                transform: translateZ(0) !important;
                will-change: scroll-position !important;
                -webkit-backface-visibility: hidden !important;
                backface-visibility: hidden !important;
            }
            
            body {
                -webkit-overflow-scrolling: touch !important;
                overscroll-behavior: none !important;
                overflow-y: auto !important;
                overflow-x: hidden !important;
                -webkit-transform: translateZ(0) !important;
                transform: translateZ(0) !important;
                will-change: scroll-position !important;
                -webkit-backface-visibility: hidden !important;
                backface-visibility: hidden !important;
            }
            
            /* Ultra-smooth scrolling for all elements */
            *, *:before, *:after {
                -webkit-backface-visibility: hidden !important;
                backface-visibility: hidden !important;
                -webkit-perspective: 1000px !important;
                perspective: 1000px !important;
                -webkit-transform: translateZ(0) !important;
                transform: translateZ(0) !important;
            }
            
            /* Performance boost for main sections */
            section, article, nav, main, header, div, p, h1, h2, h3, h4, h5, h6 {
                will-change: transform !important;
                -webkit-transform: translateZ(0) !important;
                transform: translateZ(0) !important;
                -webkit-backface-visibility: hidden !important;
                backface-visibility: hidden !important;
            }
            
            /* Disable smooth scrolling on mobile for better performance */
            .nav-link, a[href^="#"] {
                scroll-behavior: auto !important;
            }
        }
    `;
    document.head.appendChild(optimizeScrollCSS);
    
    console.log('🚀 Enhanced mobile scrolling optimizations applied');
}

// Navigation Menu
function initializeNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    console.log('🧭 Initializing navigation...');
    console.log('📱 Mobile toggle found:', !!mobileToggle);
    console.log('🔗 Nav links found:', !!navLinks);
    
    if (mobileToggle && navLinks) {
        // Mobile toggle with touch optimization
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('📱 Mobile menu toggle clicked');
            
            const isActive = navLinks.classList.contains('active');
            
            if (isActive) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.style.overflow = '';
                console.log('📱 Mobile menu closed');
            } else {
                navLinks.classList.add('active');
                mobileToggle.classList.add('active');
                body.style.overflow = 'hidden'; // Prevent background scrolling
                console.log('📱 Mobile menu opened');
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
                    console.log('📱 Mobile menu closed via link click');
                }
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
    } else {
        console.warn('⚠️ Mobile navigation elements not found');
    }

    // Active nav link highlighting
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
    
    console.log('✅ Navigation initialized successfully');
}

// Dark Mode Toggle
function initializeDarkMode() {
    let darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    console.log('🌙 Dark mode initialization started');
    console.log('🔍 Dark mode toggle element found:', !!darkModeToggle);
    console.log('🎯 Toggle element:', darkModeToggle);
    
    // Visibility check - check if button is actually visible
    function isElementVisible(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && 
               style.visibility !== 'hidden' && 
               style.opacity !== '0' &&
               style.display !== 'none';
    }
    
    // If toggle not found or not visible, create it
    if (!darkModeToggle || !isElementVisible(darkModeToggle)) {
        console.log('⚠️ Dark mode toggle not found or not visible, creating it...');
        createDarkModeToggle();
        // Get the newly created toggle
        darkModeToggle = document.querySelector('.dark-mode-toggle');
        if (!darkModeToggle) {
            console.error('❌ Failed to create dark mode toggle');
            return;
        }
    }
    
    // Check if CSS is loaded properly
    const testElement = document.createElement('div');
    testElement.style.cssText = 'background: var(--bg-color); position: absolute; visibility: hidden;';
    document.body.appendChild(testElement);
    const computedStyle = window.getComputedStyle(testElement);
    const cssLoaded = computedStyle.background.includes('gradient') || computedStyle.background !== '';
    document.body.removeChild(testElement);
    console.log('🎨 CSS Variables loaded:', cssLoaded);
    
    // Toggle icon update
    function updateToggleIcon(isDark, animate = true) {
        console.log('🎨 Updating toggle icon, isDark:', isDark);
        if (darkModeToggle) {
            const icon = darkModeToggle.querySelector('.theme-icon');
            console.log('🎯 Theme icon element:', icon);
            if (icon) {
                if (animate) {
                    // Add rotation animation
                    icon.style.transform = 'rotate(180deg) scale(0.8)';
                    icon.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    setTimeout(() => {
                        const newIcon = isDark ? '☀️' : '🌙';
                        icon.textContent = newIcon;
                        icon.style.transform = 'rotate(0deg) scale(1)';
                        console.log('✨ Icon updated to:', newIcon);
                    }, 150);
                } else {
                    const newIcon = isDark ? '☀️' : '🌙';
                    icon.textContent = newIcon;
                    console.log('✨ Icon updated to:', newIcon);
                }
                
                darkModeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
                
                // Add visual feedback for PC hover and mobile touch
                darkModeToggle.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            } else {
                console.error('❌ Theme icon element not found inside toggle button');
            }
        } else {
            console.error('❌ Dark mode toggle not available for icon update');
        }
    }
    
    // Theme detection
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = prefersDark.matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;
    
    console.log('💾 Saved theme:', savedTheme);
    console.log('🖥️ System theme:', systemTheme);
    console.log('✅ Current theme:', currentTheme);
    
    // Apply the theme with smooth transition
    function applyTheme(isDark, animate = false) {
        if (animate) {
            body.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        
        if (isDark) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        
        updateToggleIcon(isDark, animate);
        
        // Update CSS custom properties for theming
        const root = document.documentElement;
        if (isDark) {
            root.style.setProperty('--scroll-accent', '#00ffff');
            root.style.setProperty('--theme-transition', '0.4s cubic-bezier(0.4, 0, 0.2, 1)');
        } else {
            root.style.setProperty('--scroll-accent', '#3498db');
            root.style.setProperty('--theme-transition', '0.4s cubic-bezier(0.4, 0, 0.2, 1)');
        }
        
        if (animate) {
            setTimeout(() => {
                body.style.transition = '';
            }, 400);
        }
    }
    
    // Initial theme application
    applyTheme(currentTheme === 'dark', false);
    
    // Toggle functionality
    if (darkModeToggle) {
        console.log('🎛️ Adding click event listener to dark mode toggle');
        
        // PC hover effects
        darkModeToggle.addEventListener('mouseenter', function() {
            if (!('ontouchstart' in window)) { // Only on non-touch devices
                this.style.transform = 'scale(1.1)';
                this.style.boxShadow = '0 0 20px rgba(var(--accent-color-rgb), 0.3)';
            }
        });
        
        darkModeToggle.addEventListener('mouseleave', function() {
            if (!('ontouchstart' in window)) {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            }
        });
        
        // Mobile touch feedback
        if ('ontouchstart' in window) {
            darkModeToggle.addEventListener('touchstart', function(e) {
                this.style.transform = 'scale(0.95)';
                this.style.opacity = '0.8';
                
                // Haptic feedback if available
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }, { passive: true });
            
            darkModeToggle.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.style.opacity = '1';
                }, 100);
            }, { passive: true });
        }
        
        // Main click handler
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🖱️ Dark mode toggle clicked!');
            
            // Prevent rapid clicking
            if (this.disabled) return;
            this.disabled = true;
            
            const wasDark = body.classList.contains('dark-mode');
            const willBeDark = !wasDark;
            
            console.log('🌓 Theme switching from:', wasDark ? 'dark' : 'light', 'to:', willBeDark ? 'dark' : 'light');
            
            // Apply theme with animation
            applyTheme(willBeDark, true);
            
            // Save preference
            localStorage.setItem('theme', willBeDark ? 'dark' : 'light');
            console.log('💾 Theme preference saved:', willBeDark ? 'dark' : 'light');
            
            // Show notification
            if (typeof showNotification === 'function') {
                const message = `Switched to ${willBeDark ? 'dark' : 'light'} mode ${willBeDark ? '🌙' : '☀️'}`;
                showNotification(message, 'success', 2500);
            }
            
            // Update smooth scrolling performance
            setTimeout(() => {
                updateScrollPerformanceForTheme();
            }, 200);
            
            // Re-enable button
            setTimeout(() => {
                this.disabled = false;
            }, 500);
        });
        
        // Keyboard accessibility
        darkModeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
    } else {
        console.error('❌ Dark mode toggle button not found! Selector: .dark-mode-toggle');
        console.log('🔍 Available buttons:', document.querySelectorAll('button'));
    }
    
    // System theme change detection
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            console.log('🖥️ System theme changed to:', e.matches ? 'dark' : 'light');
            applyTheme(e.matches, true);
            
            if (typeof showNotification === 'function') {
                showNotification(`Automatically switched to ${e.matches ? 'dark' : 'light'} mode`, 'info', 3000);
            }
        }
    });
    
    // Theme-aware performance optimization
    function updateScrollPerformanceForTheme() {
        const isDarkMode = body.classList.contains('dark-mode');
        const scrollableElements = document.querySelectorAll('section, article, nav, main');
        
        scrollableElements.forEach(element => {
            element.style.willChange = 'transform';
            element.style.backfaceVisibility = 'hidden';
            
            if (isDarkMode) {
                element.style.transform = 'translateZ(0)';
            } else {
                element.style.transform = 'translate3d(0, 0, 0)';
            }
        });
    }
    
    // Initial performance optimization
    updateScrollPerformanceForTheme();
}

// Create working toggle
function createSimpleWorkingToggle() {
    console.log('🎨 Creating toggle near welcome text...');
    
    // Remove ALL existing toggles
    const allExistingToggles = document.querySelectorAll('[id*="toggle"], [class*="toggle"], [id*="Toggle"], [class*="Toggle"]');
    allExistingToggles.forEach(toggle => {
        if (toggle) {
            toggle.remove();
            console.log('🗑️ Removed existing toggle:', toggle.className || toggle.id);
        }
    });
    
    // Find the welcome text element
    const welcomeElement = document.querySelector('.typewriter');
    if (!welcomeElement) {
        console.error('❌ Could not find welcome text element');
        return;
    }
    
    // Create the toggle HTML - GOLDEN/BLACK/ORANGE THEME
    const toggleHTML = `
        <div id="themeSwitchContainer" style="
            position: relative;
            margin: 10px 0 30px 0;
            padding: 15px;
            background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(51,51,51,0.95) 100%);
            border: 2px solid #FF8C00;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            z-index: 1000;
            box-shadow: 0 8px 25px rgba(255,140,0,0.3), 0 4px 15px rgba(0,0,0,0.4);
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
        ">
            <span id="themeLabel" style="
                font-size: 16px;
                font-weight: 700;
                color: #FFD700;
                margin-right: 12px;
                text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            ">🌙 Dark Mode</span>
            
            <label id="themeSwitch" style="
                position: relative;
                display: inline-block;
                width: 75px;
                height: 38px;
                cursor: pointer;
            ">
                <input type="checkbox" id="themeSwitchInput" style="
                    opacity: 0;
                    width: 0;
                    height: 0;
                ">
                <span id="switchSlider" style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
                    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 38px;
                    box-shadow: inset 0 2px 8px rgba(0,0,0,0.5), 0 4px 15px rgba(255,140,0,0.2);
                    border: 1px solid #444;
                ">
                    <span id="switchButton" style="
                        position: absolute;
                        content: '';
                        height: 32px;
                        width: 32px;
                        left: 3px;
                        bottom: 2.5px;
                        background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
                        transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                        border-radius: 50%;
                        box-shadow: 0 4px 12px rgba(255,140,0,0.4), 0 2px 6px rgba(0,0,0,0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 16px;
                        border: 2px solid #FF8C00;
                    ">🌙</span>
                </span>
            </label>
        </div>
    `;
    
    // Make the header-content relative positioned to contain the toggle
    const headerContent = welcomeElement.closest('.header-content');
    if (headerContent) {
        headerContent.style.position = 'relative';
    }
    
    // Insert the toggle BEFORE the welcome text (above it, won't block)
    welcomeElement.insertAdjacentHTML('beforebegin', toggleHTML);
    
    const toggleInput = document.getElementById('themeSwitchInput');
    const switchSlider = document.getElementById('switchSlider');
    const switchButton = document.getElementById('switchButton');
    const themeLabel = document.getElementById('themeLabel');
    
    console.log('✅ Switch-style toggle created');
    
    if (!toggleInput || !switchSlider || !switchButton) {
        console.error('❌ Failed to create switch toggle elements');
        return;
    }
    
    // Add click functionality
    toggleInput.addEventListener('change', function() {
        console.log('🖱️ Switch toggle clicked!');
        
        const body = document.body;
        const isChecked = this.checked;
        
        if (isChecked) {
            // Switch to LIGHT mode
            body.classList.remove('dark-mode');
            body.style.background = '#ffffff';
            body.style.color = '#333333';
            switchSlider.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
            switchSlider.style.border = '1px solid #FF8C00';
            switchButton.style.transform = 'translateX(37px)';
            switchButton.style.background = 'linear-gradient(135deg, #FFF8DC 0%, #FFFACD 100%)';
            switchButton.style.border = '2px solid #DAA520';
            switchButton.innerHTML = '☀️';
            themeLabel.innerHTML = '☀️ Light Mode';
            themeLabel.style.color = '#FF8C00';
            localStorage.setItem('theme', 'light');
            console.log('☀️ Switched to LIGHT mode');
        } else {
            // Switch to DARK mode
            body.classList.add('dark-mode');
            body.style.background = '#2c3e50';
            body.style.color = '#ffffff';
            switchSlider.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)';
            switchSlider.style.border = '1px solid #444';
            switchButton.style.transform = 'translateX(0px)';
            switchButton.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
            switchButton.style.border = '2px solid #FF8C00';
            switchButton.innerHTML = '🌙';
            themeLabel.innerHTML = '🌙 Dark Mode';
            themeLabel.style.color = '#FFD700';
            localStorage.setItem('theme', 'dark');
            console.log('🌙 Switched to DARK mode');
        }
    });
    
    // Add hover effects with golden glow
    switchSlider.addEventListener('mouseenter', function() {
        this.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.5), 0 6px 20px rgba(255,140,0,0.5), 0 0 15px rgba(255,215,0,0.3)';
    });
    
    switchSlider.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.5), 0 4px 15px rgba(255,140,0,0.2)';
    });
    
    // Apply saved theme with golden/black/orange styling
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        toggleInput.checked = true;
        document.body.classList.remove('dark-mode');
        document.body.style.background = '#ffffff';
        document.body.style.color = '#333333';
        switchSlider.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
        switchSlider.style.border = '1px solid #FF8C00';
        switchButton.style.transform = 'translateX(37px)';
        switchButton.style.background = 'linear-gradient(135deg, #FFF8DC 0%, #FFFACD 100%)';
        switchButton.style.border = '2px solid #DAA520';
        switchButton.innerHTML = '☀️';
        themeLabel.innerHTML = '☀️ Light Mode';
        themeLabel.style.color = '#FF8C00';
    } else {
        toggleInput.checked = false;
        document.body.classList.add('dark-mode');
        document.body.style.background = '#2c3e50';
        document.body.style.color = '#ffffff';
        switchSlider.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)';
        switchSlider.style.border = '1px solid #444';
        switchButton.style.transform = 'translateX(0px)';
        switchButton.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
        switchButton.style.border = '2px solid #FF8C00';
        switchButton.innerHTML = '🌙';
        themeLabel.innerHTML = '🌙 Dark Mode';
        themeLabel.style.color = '#FFD700';
    }
    
    console.log('✅ Switch-style toggle setup complete!');
    return document.getElementById('themeSwitchContainer');
}

// Notification System for better user feedback
function initializeNotificationSystem() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }
}

// Show notification function
function showNotification(message, type = 'success', duration = 3000) {
    const container = document.getElementById('notification-container');
    if (!container) {
        console.warn('Notification container not found');
        return;
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    container.appendChild(notification);
    
    console.log('📢 Notification created:', message, type);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        console.log('📢 Notification animated in');
    }, 100);

    // Auto remove
    const removeTimeout = setTimeout(() => {
        removeNotification(notification);
    }, duration);

    // Click to dismiss
    notification.addEventListener('click', () => {
        clearTimeout(removeTimeout);
        removeNotification(notification);
        console.log('📢 Notification dismissed by click');
    });
}

// Remove notification function
function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 400);
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

// Like System with Global Storage
function initializeLikeSystem() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    // GitHub Gist storage configuration for global likes
    const GIST_ID = 'global-blog-likes';
    const GITHUB_TOKEN = null; // Public read access
    
    // Initialize global like counts from a simple JSON API
    initializeGlobalLikes();
    
    likeButtons.forEach(btn => {
        const postId = btn.getAttribute('data-post');
        const likeCount = btn.querySelector('.like-count');
        const heart = btn.querySelector('.heart');
        
        // Check if user has already liked this post locally
        const isLiked = localStorage.getItem(`post-${postId}-liked`) === 'true';
        
        if (isLiked) {
            btn.classList.add('liked');
            heart.style.color = '#e74c3c';
        }

        btn.addEventListener('click', function() {
            // Prevent spam clicking
            if (this.disabled) return;
            this.disabled = true;
            
            const currentLikes = parseInt(likeCount.textContent);
            
            // Add updating animation
            likeCount.classList.add('updating');
            
            if (this.classList.contains('liked')) {
                // Unlike - prevent multiple unlikes
                updateLikeCount(postId, currentLikes - 1, likeCount);
                this.classList.remove('liked');
                heart.style.color = '';
                localStorage.setItem(`post-${postId}-liked`, 'false');
                showNotification('Post unliked', 'info', 2000);
            } else {
                // Like - prevent multiple likes from same user
                updateLikeCount(postId, currentLikes + 1, likeCount);
                this.classList.add('liked');
                heart.style.color = '#e74c3c';
                heart.classList.add('pulse');
                localStorage.setItem(`post-${postId}-liked`, 'true');
                showNotification('Thanks for liking this post! ❤️', 'success', 3000);
                
                // Remove pulse animation after completion
                setTimeout(() => {
                    heart.classList.remove('pulse');
                }, 600);
            }
            
            // Remove updating animation and re-enable button
            setTimeout(() => {
                likeCount.classList.remove('updating');
                this.disabled = false;
            }, 300);
        });
    });
}

// Initialize global like counts from localStorage with starting values
function initializeGlobalLikes() {
    const defaultLikes = {
        '1': 12,  // First Blog Post
        '2': 8,   // Web Development Journey
        '3': 15   // Musical Journey
    };
    
    // Load existing global likes or use defaults
    let globalLikes = JSON.parse(localStorage.getItem('global-likes')) || defaultLikes;
    
    // Initialize like counts on page load
    Object.keys(globalLikes).forEach(postId => {
        const likeCount = document.querySelector(`.like-btn[data-post="${postId}"] .like-count`);
        if (likeCount) {
            likeCount.textContent = globalLikes[postId];
        }
    });
    
    // Save to localStorage
    localStorage.setItem('global-likes', JSON.stringify(globalLikes));
    
    // Update total likes display
    updateTotalLikesDisplay();
}

// Update the total likes display
function updateTotalLikesDisplay() {
    const globalLikes = JSON.parse(localStorage.getItem('global-likes')) || {};
    const totalLikes = Object.values(globalLikes).reduce((sum, likes) => sum + likes, 0);
    
    const totalLikesElement = document.querySelector('.total-likes-count');
    if (totalLikesElement) {
        // Animate the count change
        const currentCount = parseInt(totalLikesElement.textContent) || 0;
        animateCounter(totalLikesElement, currentCount, totalLikes, 500);
    }
}

// Animate counter changes
function animateCounter(element, start, end, duration) {
    const startTime = Date.now();
    const difference = end - start;
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smooth animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(start + difference * easedProgress);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Update like count with global persistence
function updateLikeCount(postId, newCount, likeCountElement) {
    // Update display immediately
    likeCountElement.textContent = newCount;
    
    // Update global storage
    let globalLikes = JSON.parse(localStorage.getItem('global-likes')) || {};
    globalLikes[postId] = newCount;
    localStorage.setItem('global-likes', JSON.stringify(globalLikes));
    
    // Update total likes display
    updateTotalLikesDisplay();
    
    // Simulate network sync (for future API integration)
    setTimeout(() => {
        console.log(`✅ Like count synced for post ${postId}: ${newCount}`);
    }, 500);
    
    // Broadcast to other tabs/windows
    broadcastLikeUpdate(postId, newCount);
}

// Broadcast like updates to other open tabs
function broadcastLikeUpdate(postId, newCount) {
    // Use localStorage events to sync across tabs
    const updateEvent = {
        type: 'like-update',
        postId: postId,
        count: newCount,
        timestamp: Date.now()
    };
    
    localStorage.setItem('like-broadcast', JSON.stringify(updateEvent));
    localStorage.removeItem('like-broadcast'); // Trigger storage event
}

// Listen for like updates from other tabs
function initializeCrossTabSync() {
    window.addEventListener('storage', function(e) {
        if (e.key === 'like-broadcast' && e.newValue) {
            const update = JSON.parse(e.newValue);
            if (update.type === 'like-update') {
                const likeCountElement = document.querySelector(`.like-btn[data-post="${update.postId}"] .like-count`);
                if (likeCountElement) {
                    likeCountElement.textContent = update.count;
                    likeCountElement.classList.add('updating');
                    setTimeout(() => {
                        likeCountElement.classList.remove('updating');
                    }, 300);
                }
                // Update total likes as well
                updateTotalLikesDisplay();
            }
        }
    });
}

// Initialize cross-tab synchronization
document.addEventListener('DOMContentLoaded', function() {
    initializeCrossTabSync();
});

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
                }).then(() => {
                    showNotification('Post shared successfully! 🎉', 'success');
                }).catch((error) => {
                    if (error.name !== 'AbortError') {
                        console.log('Share failed:', error);
                        // Fallback to clipboard
                        copyToClipboard(url);
                    }
                });
            } else {
                // Fallback: copy to clipboard
                copyToClipboard(url);
            }
        });
    });

    // Clipboard copy function
    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Link copied to clipboard! 📋', 'success');
            }).catch(() => {
                // Fallback for older browsers
                fallbackCopyToClipboard(text);
            });
        } else {
            fallbackCopyToClipboard(text);
        }
    }

    // Fallback clipboard copy for older browsers
    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification('Link copied to clipboard! 📋', 'success');
        } catch (err) {
            showNotification('Could not copy link. Please copy manually.', 'error');
        }
        
        document.body.removeChild(textArea);
    }
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

// Enhanced Contact Form with Email System Fix
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Check if form has proper email configuration
        const checkEmailConfig = () => {
            const action = contactForm.action;
            const hasValidFormspree = action && 
                                    action.includes('formspree.io') && 
                                    action.includes('meozgndw'); // Check for specific form ID
            
            if (!hasValidFormspree) {
                console.warn('⚠️ Email system not configured properly!');
                // Notification removed - no longer showing setup guide info
            } else {
                console.log('✅ Email system configured correctly with Formspree ID: meozgndw');
            }
            
            return hasValidFormspree;
        };

        // Check configuration on load
        setTimeout(() => {
            checkEmailConfig();
            // Test Formspree endpoint
            testFormspreeEndpoint();
        }, 1000);

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Always prevent default to handle via JavaScript
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            const isConfigured = checkEmailConfig();
            
            if (isConfigured) {
                // Enhanced form validation
                const formData = new FormData(this);
                const name = formData.get('name')?.trim();
                const email = formData.get('email')?.trim();
                const message = formData.get('message')?.trim();
                
                if (!name || name.length < 2) {
                    showNotification('❌ Please enter your full name (at least 2 characters)', 'error', 4000);
                    return;
                }
                
                if (!email || !isValidEmail(email)) {
                    showNotification('❌ Please enter a valid email address', 'error', 4000);
                    return;
                }
                
                if (!message || message.length < 10) {
                    showNotification('❌ Please enter a message (at least 10 characters)', 'error', 4000);
                    return;
                }
                
                // Show sending state
                submitBtn.innerHTML = '<span>📧 Sending...</span>';
                submitBtn.disabled = true;
                showNotification('📧 Sending your message...', 'info', 3000);
                
                // Submit to Formspree via fetch API for better error handling
                fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        showNotification('✅ Message sent successfully! 🎉', 'success', 8000);
                        showNotification('📧 Riky will reply to your email address soon!', 'info', 6000);
                        this.reset();
                    } else {
                        response.json().then(data => {
                            if (data.errors && data.errors.length > 0) {
                                showNotification(`❌ Error: ${data.errors[0].message}`, 'error', 6000);
                            } else {
                                showNotification('❌ Failed to send message. Please try again.', 'error', 6000);
                            }
                        });
                    }
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                    showNotification('❌ Network error. Please check your connection and try again.', 'error', 6000);
                })
                .finally(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
                
            } else {
                // Form needs setup - prevent submission but don't show notification
                submitBtn.innerHTML = '<span>Setup Required</span>';
                submitBtn.disabled = true;
                
                // Email setup notification removed
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 6000);
            }
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Test Formspree endpoint function
    function testFormspreeEndpoint() {
        const formAction = contactForm.action;
        if (formAction && formAction.includes('formspree.io')) {
            // Test with a HEAD request to check if endpoint exists
            fetch(formAction, {
                method: 'HEAD'
            })
            .then(response => {
                if (response.ok) {
                    console.log('✅ Formspree endpoint is accessible');
                } else if (response.status === 405) {
                    // Method not allowed is expected for HEAD request, but endpoint exists
                    console.log('✅ Formspree endpoint exists (405 expected for HEAD)');
                } else {
                    console.warn(`⚠️ Formspree endpoint issue: ${response.status}`);
                    // Email setup guide notification removed
                }
            })
            .catch(error => {
                console.warn('⚠️ Could not test Formspree endpoint:', error);
                showNotification('⚠️ Network issue detected. Check your internet connection.', 'warning', 6000);
            });
        }
    }
}

// Enhanced Smooth Scrolling with Superior PC and Mobile Optimization
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Detect device type for optimal scrolling
    function getDeviceType() {
        const userAgent = navigator.userAgent;
        return {
            isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
            isMobileChrome: /Android.*Chrome/i.test(userAgent) && /Mobile/i.test(userAgent),
            isIOS: /iPad|iPhone|iPod/.test(userAgent),
            isDesktop: !(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent))
        };
    }
    
    const device = getDeviceType();
    console.log('📱 Device detection:', device);
    
    // Ultra-smooth scrolling function optimized for all devices
    function ultraSmoothScrollTo(targetElement, options = {}) {
        const targetPosition = targetElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition - (options.offset || 80);
        const duration = options.duration || (device.isMobile ? 1000 : 800);
        let start = null;
        
        // Enhanced easing functions for different devices
        const easings = {
            desktop: function(t) {
                // Cubic bezier for desktop - smooth and professional
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            },
            mobile: function(t) {
                // Optimized for mobile touch - more responsive
                return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
            },
            ios: function(t) {
                // iOS specific - matches native feel
                return 1 - Math.pow(1 - t, 4);
            }
        };
        
        const easing = device.isIOS ? easings.ios : 
                      device.isMobile ? easings.mobile : 
                      easings.desktop;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const easedProgress = easing(progress);
            
            const newPosition = startPosition + distance * easedProgress;
            
            // Use the most appropriate scroll method for the device
            if (device.isMobileChrome) {
                // Force GPU acceleration on mobile Chrome
                document.documentElement.scrollTop = newPosition;
            } else {
                window.scrollTo(0, newPosition);
            }
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                // Ensure exact final position
                const finalPosition = targetPosition - (options.offset || 80);
                if (device.isMobileChrome) {
                    document.documentElement.scrollTop = finalPosition;
                } else {
                    window.scrollTo(0, finalPosition);
                }
                
                // Callback when animation completes
                if (options.onComplete) {
                    options.onComplete();
                }
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // Enhanced scroll performance optimization
    function optimizeScrollPerformance() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const elements = document.querySelectorAll('section, article, nav, main, header');
        
        elements.forEach(element => {
            // Force hardware acceleration
            element.style.willChange = 'transform';
            element.style.backfaceVisibility = 'hidden';
            element.style.perspective = '1000px';
            
            // Theme-aware and device-specific optimizations
            if (device.isMobile) {
                element.style.transform = 'translateZ(0)';
                element.style.webkitTransform = 'translateZ(0)'; // iOS Safari
            } else {
                element.style.transform = 'translate3d(0, 0, 0)';
            }
            
            // Apply smooth transitions based on theme
            element.style.transition = `all ${isDarkMode ? '0.4s' : '0.3s'} cubic-bezier(0.4, 0, 0.2, 1)`;
        });
    }
    
    // Enhanced navigation link handling
    navLinks.forEach(link => {
        // Visual feedback for both PC and mobile
        function addHoverEffect() {
            if (!device.isMobile) {
                link.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                    this.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
                });
                
                link.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            }
        }
        
        // Enhanced touch feedback for mobile
        function addTouchFeedback() {
            if (device.isMobile) {
                link.addEventListener('touchstart', function(e) {
                    this.style.transform = 'scale(0.98)';
                    this.style.transition = 'transform 0.1s ease';
                    
                    const isDarkMode = document.body.classList.contains('dark-mode');
                    this.style.backgroundColor = isDarkMode ? 
                        'rgba(255, 255, 255, 0.1)' : 
                        'rgba(0, 0, 0, 0.1)';
                        
                    // Haptic feedback if available
                    if (navigator.vibrate) {
                        navigator.vibrate(30);
                    }
                }, { passive: true });
                
                link.addEventListener('touchend', function(e) {
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                        this.style.backgroundColor = '';
                    }, 100);
                }, { passive: true });
            }
        }
        
        addHoverEffect();
        addTouchFeedback();
        
        // Main click handler with enhanced scrolling
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                console.log(`🎯 Scrolling to section: ${targetId}`);
                
                // Add loading state for visual feedback
                this.style.opacity = '0.7';
                
                // Optimize performance before scrolling
                optimizeScrollPerformance();
                
                // Choose scroll method based on device capability
                if (device.isMobile) {
                    // Use native scrolling on mobile for best performance
                    targetSection.scrollIntoView({
                        behavior: 'auto', // Use auto for mobile performance
                        block: 'start',
                        inline: 'nearest'
                    });
                    
                    // Reset opacity immediately for mobile
                    this.style.opacity = '1';
                } else if (device.isDesktop && 'scrollBehavior' in document.documentElement.style) {
                    // Use native smooth scrolling on capable desktop browsers
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                    
                    // Reset opacity after estimated scroll time
                    setTimeout(() => {
                        this.style.opacity = '1';
                    }, 800);
                } else {
                    // Use our enhanced custom scrolling for other cases
                    ultraSmoothScrollTo(targetSection, {
                        offset: 80,
                        duration: device.isMobile ? 1200 : 900,
                        onComplete: () => {
                            this.style.opacity = '1';
                            console.log(`✅ Scroll to ${targetId} completed`);
                        }
                    });
                }
                
                // Enhanced mobile menu handling
                handleMobileMenuClose();
            }
        });
        
        // Keyboard accessibility enhancement
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Enhanced mobile menu closing with smooth animation
    function handleMobileMenuClose() {
        const navLinksContainer = document.querySelector('.nav-links');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const body = document.body;
        
        if (navLinksContainer && navLinksContainer.classList.contains('active')) {
            // Smooth closing animation
            navLinksContainer.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            navLinksContainer.classList.remove('active');
            
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            
            // Restore body scroll with enhanced animation
            const scrollY = body.dataset.scrollY;
            setTimeout(() => {
                body.style.overflow = '';
                body.style.position = '';
                body.style.top = '';
                body.style.width = '';
                
                if (scrollY) {
                    // Smooth restoration of scroll position
                    const targetScroll = parseInt(scrollY);
                    const currentScroll = window.pageYOffset;
                    
                    if (Math.abs(targetScroll - currentScroll) > 10) {
                        ultraSmoothScrollTo({ offsetTop: targetScroll }, {
                            offset: 0,
                            duration: 300
                        });
                    } else {
                        window.scrollTo(0, targetScroll);
                    }
                }
            }, 100);
        }
    }
    
    // Handle all anchor links in content
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]:not(.nav-link)');
    allAnchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                e.preventDefault();
                ultraSmoothScrollTo(targetSection, {
                    offset: 100,
                    duration: device.isMobile ? 1000 : 700
                });
            }
        });
    });
    
    // Smooth scroll to top enhancement for back-to-top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Enhanced smooth scroll to top
            ultraSmoothScrollTo({ offsetTop: 0 }, {
                offset: 0,
                duration: device.isMobile ? 800 : 600,
                onComplete: () => {
                    console.log('✅ Smooth scroll to top completed');
                }
            });
        });
    }
    
    // Initialize performance optimizations
    optimizeScrollPerformance();
    
    // Update optimizations when theme changes
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            setTimeout(optimizeScrollPerformance, 100);
        });
    }
    
    // Optimize on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(optimizeScrollPerformance, 200);
    }, { passive: true });
    
    console.log('✅ Enhanced smooth scrolling initialized for', device.isMobile ? 'mobile' : 'desktop');
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

// Skills Progress Bars Animation
function initializeSkillsBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBar = (bar) => {
        const level = bar.getAttribute('data-level');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = level + '%';
        }, 300);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Timeline Animations
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });
}

// Newsletter Form Functionality
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.newsletter-btn');
            const emailInput = this.querySelector('.newsletter-email');
            const originalText = submitBtn.innerHTML;
            const email = emailInput.value.trim();
            
            // Validate email
            if (!email || !isValidEmail(email)) {
                showNotification('❌ Please enter a valid email address', 'error', 4000);
                return;
            }
            
            // Show sending state
            submitBtn.innerHTML = '<span>Subscribing...</span>';
            submitBtn.disabled = true;
            showNotification('📧 Subscribing you to updates...', 'info', 3000);
            
            // Submit to Formspree
            const formData = new FormData(this);
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showNotification('🎉 Successfully subscribed! Welcome to the community!', 'success', 8000);
                    showNotification('📧 Check your email for a confirmation message', 'info', 6000);
                    emailInput.value = '';
                    
                    // Update stats (visual only)
                    updateNewsletterStats();
                } else {
                    response.json().then(data => {
                        if (data.errors && data.errors.length > 0) {
                            showNotification(`❌ Error: ${data.errors[0].message}`, 'error', 6000);
                        } else {
                            showNotification('❌ Failed to subscribe. Please try again.', 'error', 6000);
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Newsletter subscription error:', error);
                showNotification('❌ Network error. Please check your connection and try again.', 'error', 6000);
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
}

// Update newsletter stats (visual enhancement)
function updateNewsletterStats() {
    const statNumbers = document.querySelectorAll('.newsletter-stats .stat-number');
    
    statNumbers.forEach(stat => {
        if (stat.textContent.includes('+')) {
            const currentNum = parseInt(stat.textContent);
            const newNum = currentNum + 1;
            animateCounter(stat, currentNum, newNum, 1000);
        }
    });
}

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== ULTRA-FUTURISTIC SCI-FI ENHANCEMENTS =====

// Quantum Particle System
function createQuantumParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'quantum-particles';
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${['#00ffff', '#8a2be2', '#39ff14', '#ff1493'][Math.floor(Math.random() * 4)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 ${Math.random() * 20 + 10}px currentColor;
            animation: quantum-drift ${Math.random() * 10 + 10}s linear infinite;
            opacity: ${Math.random() * 0.8 + 0.2};
        `;
        particleContainer.appendChild(particle);
    }
}

// Holographic Status Bar
function createStatusBar() {
    const statusBar = document.createElement('div');
    statusBar.className = 'status-bar';
    document.body.appendChild(statusBar);
}

// Futuristic Cursor Tracking
function initializeFuturisticCursor() {
    let cursor = document.querySelector('.futuristic-cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'futuristic-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #00ffff, transparent);
            border: 2px solid #00ffff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);
    }

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Enhanced cursor interactions
    document.querySelectorAll('button, a, input, textarea').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, #39ff14, transparent)';
            cursor.style.borderColor = '#39ff14';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, #00ffff, transparent)';
            cursor.style.borderColor = '#00ffff';
        });
    });
}

// Neural Network Effect
function createNeuralNetwork() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -8;
        opacity: 0.3;
    `;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const nodes = [];
    
    // Create nodes
    for (let i = 0; i < 50; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            color: ['#00ffff', '#8a2be2', '#39ff14', '#ff1493'][Math.floor(Math.random() * 4)]
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        nodes.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = node.color;
            ctx.fill();
            
            // Draw connections
            nodes.slice(i + 1).forEach(otherNode => {
                const dx = node.x - otherNode.x;
                const dy = node.y - otherNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(otherNode.x, otherNode.y);
                    ctx.strokeStyle = node.color;
                    ctx.globalAlpha = (150 - distance) / 150 * 0.5;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -9;
        opacity: 0.1;
    `;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const chars = '01010101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()';
    const columns = canvas.width / 20;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#39ff14';
        ctx.font = '15px Courier New';
        
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * 20, drops[i] * 20);
            
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);
}

// Holographic Glitch Effect for Headers
function addGlitchEffects() {
    const headers = document.querySelectorAll('h1, h2, h3');
    headers.forEach(header => {
        header.addEventListener('mouseenter', () => {
            header.style.animation = 'glitch-effect 0.3s ease-in-out';
        });
        
        header.addEventListener('animationend', () => {
            header.style.animation = '';
        });
    });
    
    // Add glitch keyframes if not exists
    if (!document.querySelector('#glitch-styles')) {
        const glitchStyles = document.createElement('style');
        glitchStyles.id = 'glitch-styles';
        glitchStyles.textContent = `
            @keyframes glitch-effect {
                0%, 100% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
            }
        `;
        document.head.appendChild(glitchStyles);
    }
}

// Initialize all futuristic effects
function initializeFuturisticEffects() {
    console.log('🚀 Initializing refined futuristic effects...');
    
    setTimeout(() => {
        // Removed overwhelming effects for cleaner look:
        // createQuantumParticles(); // Too distracting
        // createNeuralNetwork(); // Overwhelming visual noise
        // createMatrixRain(); // Too much animation
        
        // Keep only subtle futuristic elements:
        createStatusBar();
        initializeFuturisticCursor(); // Keep cursor effect as it's subtle
        addGlitchEffects(); // Keep glitch as it's minimal
        
        console.log('✨ Refined futuristic effects loaded!');
    }, 1000);
}

// Initialize futuristic effects when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFuturisticEffects);
} else {
    initializeFuturisticEffects();
}
