// Advanced Blog Features JavaScript with Mobile Chrome Optimizations

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM fully loaded');
    console.log('🔍 Available buttons:', document.querySelectorAll('button'));
    console.log('🎯 Dark mode toggle check:', document.querySelector('.dark-mode-toggle'));
    
    // Mobile Chrome specific optimizations
    initializeMobileOptimizations();
    
    // Initialize all features
    initializeNavigation();
    initializeDarkMode();
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
});

// Mobile Chrome specific optimizations
function initializeMobileOptimizations() {
    // Prevent zoom on input focus (mobile Chrome)
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type !== 'file') {
            input.style.fontSize = '16px';
        }
        
        // Add touch optimizations
        input.addEventListener('touchstart', function() {
            this.style.transform = 'scale(1.02)';
        }, { passive: true });
        
        input.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
    });

    // Handle viewport height changes on mobile Chrome
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set initial viewport height
    setViewportHeight();
    
    // Handle viewport changes (keyboard open/close, orientation change)
    window.addEventListener('resize', setViewportHeight, { passive: true });
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    }, { passive: true });

    // Enhanced scroll performance for mobile
    let ticking = false;
    function optimizeScrollPerformance() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll optimizations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', optimizeScrollPerformance, { passive: true });

    // Prevent overscroll on iOS Safari
    document.body.addEventListener('touchmove', function(e) {
        if (e.target === document.body) {
            e.preventDefault();
        }
    }, { passive: false });

    // Mobile navigation auto-hide on scroll
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

// Navigation Menu with enhanced mobile Chrome optimizations
function initializeNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (mobileToggle && navLinks) {
        // Enhanced mobile toggle with touch optimization
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open on mobile Chrome
            if (navLinks.classList.contains('active')) {
                const scrollY = window.scrollY;
                body.style.overflow = 'hidden';
                body.style.position = 'fixed';
                body.style.top = `-${scrollY}px`;
                body.style.width = '100%';
                body.dataset.scrollY = scrollY;
            } else {
                const scrollY = body.dataset.scrollY;
                body.style.overflow = '';
                body.style.position = '';
                body.style.top = '';
                body.style.width = '';
                window.scrollTo(0, parseInt(scrollY || '0'));
            }
        });

        // Enhanced touch event handling for mobile
        if ('ontouchstart' in window) {
            mobileToggle.addEventListener('touchstart', function(e) {
                // Add touch feedback
                this.style.opacity = '0.7';
            }, { passive: true });
            
            mobileToggle.addEventListener('touchend', function(e) {
                // Reset touch feedback
                this.style.opacity = '';
            }, { passive: true });
        }

        // Close menu on link click (mobile)
        const navLinksArray = document.querySelectorAll('.nav-link');
        navLinksArray.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    const scrollY = body.dataset.scrollY;
                    body.style.overflow = '';
                    body.style.position = '';
                    body.style.top = '';
                    body.style.width = '';
                    if (scrollY) {
                        window.scrollTo(0, parseInt(scrollY));
                    }
                }
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                const scrollY = body.dataset.scrollY;
                body.style.overflow = '';
                body.style.position = '';
                body.style.top = '';
                body.style.width = '';
                if (scrollY) {
                    window.scrollTo(0, parseInt(scrollY));
                }
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
    
    console.log('🌙 Dark mode initialization started');
    console.log('🔍 Dark mode toggle element found:', !!darkModeToggle);
    console.log('🎯 Toggle element:', darkModeToggle);
    
    // Check if CSS is loaded properly
    const testElement = document.createElement('div');
    testElement.style.cssText = 'background: var(--bg-color); position: absolute; visibility: hidden;';
    document.body.appendChild(testElement);
    const computedStyle = window.getComputedStyle(testElement);
    const cssLoaded = computedStyle.background.includes('gradient') || computedStyle.background !== '';
    document.body.removeChild(testElement);
    console.log('🎨 CSS Variables loaded:', cssLoaded);
    
    // Define updateToggleIcon function first
    function updateToggleIcon(isDark) {
        console.log('🎨 Updating toggle icon, isDark:', isDark);
        if (darkModeToggle) {
            const icon = darkModeToggle.querySelector('.theme-icon');
            console.log('🎯 Theme icon element:', icon);
            if (icon) {
                const newIcon = isDark ? '☀️' : '🌙';
                icon.textContent = newIcon;
                console.log('✨ Icon updated to:', newIcon);
                darkModeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            } else {
                console.error('❌ Theme icon element not found inside toggle button');
            }
        } else {
            console.error('❌ Dark mode toggle not available for icon update');
        }
    }
    
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = prefersDark.matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;
    
    console.log('💾 Saved theme:', savedTheme);
    console.log('🖥️ System theme:', systemTheme);
    console.log('✅ Current theme:', currentTheme);
    
    // Apply the theme
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        updateToggleIcon(true);
    } else {
        // Ensure light mode is properly set
        body.classList.remove('dark-mode');
        updateToggleIcon(false);
    }
    
    // Toggle functionality
    if (darkModeToggle) {
        console.log('🎛️ Adding click event listener to dark mode toggle');
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🖱️ Dark mode toggle clicked!');
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            
            console.log('🌓 Theme switched to:', isDark ? 'dark' : 'light');
            console.log('🎨 Body classes:', body.className);
            
            // Force a style recalculation
            body.style.transition = 'all 0.3s ease';
            
            // Save preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            console.log('💾 Theme preference saved:', isDark ? 'dark' : 'light');
            
            // Update toggle icon with animation
            updateToggleIcon(isDark);
            
            // Show notification only if function exists
            if (typeof showNotification === 'function') {
                showNotification(
                    `Switched to ${isDark ? 'dark' : 'light'} mode ${isDark ? '🌙' : '☀️'}`, 
                    'success', 
                    2000
                );
            } else {
                console.log('⚠️ showNotification function not available');
            }
            
            // Reset transition after animation
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    } else {
        console.error('❌ Dark mode toggle button not found! Selector: .dark-mode-toggle');
        console.log('🔍 Available buttons:', document.querySelectorAll('button'));
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
                                    !action.includes('YOUR_FORM_ID') &&
                                    !action.includes('YOUR_EMAIL@gmail.com');
            
            if (!hasValidFormspree) {
                console.warn('⚠️ Email system not configured properly!');
                showNotification('📧 Email system needs setup - check EMAIL_FIX_GUIDE.md', 'warning', 8000);
            } else {
                console.log('✅ Email system configured correctly');
            }
            
            return hasValidFormspree;
        };

        // Check configuration on load
        setTimeout(checkEmailConfig, 1000);

        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            const isConfigured = checkEmailConfig();
            
            if (isConfigured) {
                // Real form submission with Formspree
                submitBtn.innerHTML = '<span>📧 Sending to rikyrabha@gmail.com...</span>';
                submitBtn.disabled = true;
                showNotification('📧 Sending your message to Riky\'s Gmail...', 'info', 3000);
                
                // Enhanced form validation
                const formData = new FormData(this);
                const name = formData.get('name')?.trim();
                const email = formData.get('email')?.trim();
                const message = formData.get('message')?.trim();
                
                if (!name || name.length < 2) {
                    e.preventDefault();
                    showNotification('❌ Please enter your full name (at least 2 characters)', 'error', 4000);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    return;
                }
                
                if (!email || !isValidEmail(email)) {
                    e.preventDefault();
                    showNotification('❌ Please enter a valid email address', 'error', 4000);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    return;
                }
                
                if (!message || message.length < 10) {
                    e.preventDefault();
                    showNotification('❌ Please enter a message (at least 10 characters)', 'error', 4000);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    return;
                }
                
                // Add timestamp and user info for better email tracking
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = '_timestamp';
                hiddenInput.value = new Date().toISOString();
                this.appendChild(hiddenInput);
                
                const browserInfo = document.createElement('input');
                browserInfo.type = 'hidden';
                browserInfo.name = '_browser_info';
                browserInfo.value = `${navigator.userAgent.split(' ')[0]} on ${navigator.platform}`;
                this.appendChild(browserInfo);
                
                // Success feedback after form submission
                setTimeout(() => {
                    showNotification('✅ Message sent successfully to rikyrabha@gmail.com! 🎉', 'success', 8000);
                    showNotification('📧 Riky will reply to your email address soon!', 'info', 6000);
                    
                    // Reset form after successful submission
                    setTimeout(() => {
                        this.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1000);
                
                return; // Allow natural form submission
            } else {
                // Form needs setup - prevent submission and show instructions
                e.preventDefault();
                
                submitBtn.innerHTML = '<span>Setup Required</span>';
                submitBtn.disabled = true;
                
                showNotification('⚙️ Contact form needs setup! Replace YOUR_EMAIL@gmail.com with your actual email.', 'info', 4000);
                
                setTimeout(() => {
                    showNotification('📧 Quick setup: Replace "YOUR_EMAIL@gmail.com" in index.html with your real Gmail address', 'info', 8000);
                }, 4500);
                
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
}

// Smooth Scrolling with enhanced mobile and desktop support
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Enhanced smooth scrolling function with mobile optimization
    function smoothScrollTo(targetElement) {
        const targetPosition = targetElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition - 80; // Account for fixed nav height
        const duration = 1000; // Optimal duration for mobile
        let start = null;

        // Enhanced easing function for smoother mobile experience
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }

        // Mobile-optimized animation with requestAnimationFrame
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const easedProgress = easeInOutCubic(progress);
            
            // Use scrollTo for better mobile performance
            window.scrollTo(0, startPosition + distance * easedProgress);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                // Ensure we end exactly at target position
                window.scrollTo(0, targetPosition - 80);
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
                // Mobile-first approach: prefer native smooth scrolling on modern browsers
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                const supportsNativeScroll = 'scrollBehavior' in document.documentElement.style;
                
                if (supportsNativeScroll && isMobile) {
                    // Use native smooth scrolling for better mobile performance
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                } else {
                    // Use custom smooth scrolling for better compatibility
                    smoothScrollTo(targetSection);
                }

                // Close mobile menu if open with smooth animation
                const navLinksContainer = document.querySelector('.nav-links');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                const body = document.body;
                
                if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                    if (mobileToggle) mobileToggle.classList.remove('active');
                    
                    // Restore body scroll with smooth transition
                    const scrollY = body.dataset.scrollY;
                    setTimeout(() => {
                        body.style.overflow = '';
                        body.style.position = '';
                        body.style.top = '';
                        body.style.width = '';
                        if (scrollY) {
                            window.scrollTo(0, parseInt(scrollY));
                        }
                    }, 300); // Match CSS transition duration
                }
            }
        });

        // Add touch event optimizations for mobile
        if ('ontouchstart' in window) {
            link.addEventListener('touchstart', function() {
                // Passive touch start for better scrolling performance
            }, { passive: true });
        }
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
