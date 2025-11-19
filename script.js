// ===================================
// EXTREME PORTFOLIO - 2025 EDITION
// Advanced Interactions & Animations
// ===================================

'use strict';

// ===================================
// GLOBAL STATE
// ===================================

const state = {
    scrollY: 0,
    cursorX: 0,
    cursorY: 0,
    isTouch: false
};

// ===================================
// DOM CONTENT LOADED
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initAll();
});

function initAll() {
    // Detect touch device
    state.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Initialize all modules
    initPreloader();
    initCursor();
    initNavigation();
    initScrollProgress();
    initRevealAnimations();
    initMeshBackground();
    initMagneticButtons();
    initTextScramble();
    initProjectFilters();
    initTestimonialsCarousel();
    initContactForm();
    initScrollToTop();
    initSkillsRadar();
    initLazyLoading();
    initThemeToggle();
    initParallax();
    
    console.log('%c✨ Portfolio Loaded', 'font-size: 20px; font-weight: bold; color: #4361EE;');
}

// ===================================
// PRELOADER
// ===================================

function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 1200);
    });
}

// ===================================
// CUSTOM CURSOR
// ===================================

function initCursor() {
    if (state.isTouch) {
        // Hide cursor elements on touch devices
        const cursorDot = document.querySelector('[data-cursor-dot]');
        const cursorOutline = document.querySelector('[data-cursor-outline]');
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
        return;
    }
    
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    if (!cursorDot || !cursorOutline) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        state.cursorX = mouseX;
        state.cursorY = mouseY;
        
        cursorDot.classList.add('active');
        cursorOutline.classList.add('active');
        
        // Dot follows immediately
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth follow for outline
    function animateCursor() {
        const distX = mouseX - outlineX;
        const distY = mouseY - outlineY;
        
        outlineX += distX * 0.35;
        outlineY += distY * 0.35;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .magnetic-btn');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });
}

// ===================================
// NAVIGATION
// ===================================

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            const isExpanded = menuToggle.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Navbar scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', throttle(() => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.boxShadow = 'var(--shadow-lg)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    }, 100));
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function activateNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', throttle(activateNavLink, 100));
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// SCROLL PROGRESS
// ===================================

function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight);
        scrollProgress.style.transform = `scaleX(${scrolled})`;
    });
}

// ===================================
// REVEAL ANIMATIONS
// ===================================

function initRevealAnimations() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

// ===================================
// MESH BACKGROUND
// ===================================

function initMeshBackground() {
    const canvas = document.getElementById('meshCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Reduce particle count on mobile for better performance
    const isMobile = window.innerWidth <= 768 || state.isTouch;
    const particleCount = isMobile ? 20 : 50;
    
    // Particles
    const particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5);
            this.vy = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5);
            this.size = Math.random() * (isMobile ? 2 : 3) + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(67, 97, 238, 0.3)';
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop with performance optimization
    let animationId;
    let lastTime = 0;
    
    function animate(currentTime) {
        // Limit to 30fps on mobile for battery saving
        const targetFrameTime = isMobile ? 1000 / 30 : 1000 / 60;
        
        if (currentTime - lastTime < targetFrameTime) {
            animationId = requestAnimationFrame(animate);
            return;
        }
        
        lastTime = currentTime;
        
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections with reduced complexity on mobile
        const maxDistance = isMobile ? 100 : 150;
        
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(67, 97, 238, ${0.2 * (1 - distance / maxDistance)})`;
                    ctx.lineWidth = isMobile ? 0.5 : 1;
                    ctx.stroke();
                }
            });
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate(0);
    
    // Resize handler
    window.addEventListener('resize', debounce(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }, 250));
    
    // Pause animation when tab is not visible for battery saving
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationId) cancelAnimationFrame(animationId);
        } else {
            animate(0);
        }
    });
}

// ===================================
// MAGNETIC BUTTONS
// ===================================

function initMagneticButtons() {
    if (state.isTouch) return; // Disable magnetic effects on touch devices for better performance
    
    const magneticElements = document.querySelectorAll('.magnetic-btn');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = 0.3;
            this.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
        
        // Add touch feedback for mobile
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        el.addEventListener('touchend', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// ===================================
// TEXT SCRAMBLE EFFECT
// ===================================

function initTextScramble() {
    const scrambleElements = document.querySelectorAll('.scramble-text');
    
    scrambleElements.forEach(el => {
        const originalText = el.getAttribute('data-value') || el.textContent;
        
        el.addEventListener('mouseenter', function() {
            scrambleText(this, originalText);
        });
    });
}

function scrambleText(element, finalText) {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let iteration = 0;
    
    const interval = setInterval(() => {
        element.textContent = finalText
            .split('')
            .map((char, index) => {
                if (index < iteration) {
                    return finalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        if (iteration >= finalText.length) {
            clearInterval(interval);
        }
        
        iteration += 1 / 3;
    }, 30);
}

// ===================================
// PROJECT FILTERS
// ===================================

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card-modern');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 500);
                }
            });
        });
    });
}

// ===================================
// TESTIMONIALS CAROUSEL
// ===================================

function initTestimonialsCarousel() {
    const carousel = document.getElementById('testimonialsCarousel');
    if (!carousel) return;
    
    const track = carousel.querySelector('.testimonials-track');
    const cards = track.querySelectorAll('.testimonial-card-modern');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    // Create dots
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto-play
    let autoplay = setInterval(nextSlide, 6000);
    
    carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', () => {
        autoplay = setInterval(nextSlide, 6000);
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const deltaX = touchStartX - touchEndX;
        const deltaY = Math.abs(touchStartY - touchEndY);
        
        // Only trigger swipe if horizontal movement is greater than vertical
        if (Math.abs(deltaX) > 50 && deltaY < 100) {
            handleSwipe();
        }
    }, { passive: true });
    
    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    }
}

// ===================================
// CONTACT FORM (Google Forms)
// ===================================

function initContactForm() {
    // Contact form is now handled by Google Forms iframe
    // No custom JavaScript validation needed
    console.log('Google Forms embedded successfully');
}

// ===================================
// SCROLL TO TOP
// ===================================

function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }, 100));
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// SKILLS RADAR
// ===================================

function initSkillsRadar() {
    const canvas = document.getElementById('skillsRadar');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 120;
    
    const skills = [
        { name: 'AI/ML Engineering', value: 98 },
        { name: 'Deep Learning', value: 95 },
        { name: 'Penetration Testing', value: 92 },
        { name: 'Zero Trust Security', value: 90 },
        { name: 'AWS Architecture', value: 96 },
        { name: 'DevSecOps', value: 88 }
    ];
    
    const numSkills = skills.length;
    const angleStep = (Math.PI * 2) / numSkills;
    
    // Get theme colors
    const styles = getComputedStyle(document.documentElement);
    const primaryColor = styles.getPropertyValue('--primary-500').trim() || '#4361EE';
    const neutralColor = styles.getPropertyValue('--neutral-300').trim() || '#D1D5DB';
    const textColor = styles.getPropertyValue('--text-secondary').trim() || '#4B5563';
    
    // Draw grid
    ctx.strokeStyle = neutralColor;
    ctx.lineWidth = 1;
    
    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        const gridRadius = (radius / 5) * i;
        
        for (let j = 0; j <= numSkills; j++) {
            const angle = angleStep * j - Math.PI / 2;
            const x = centerX + gridRadius * Math.cos(angle);
            const y = centerY + gridRadius * Math.sin(angle);
            
            if (j === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }
    
    // Draw axes
    for (let i = 0; i < numSkills; i++) {
        const angle = angleStep * i - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + radius * Math.cos(angle),
            centerY + radius * Math.sin(angle)
        );
        ctx.stroke();
    }
    
    // Animate data
    let progress = 0;
    
    function animateRadar() {
        if (progress < 1) {
            progress += 0.02;
            requestAnimationFrame(animateRadar);
        }
        
        // Clear previous data
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Redraw grid
        ctx.strokeStyle = neutralColor;
        ctx.lineWidth = 1;
        
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            const gridRadius = (radius / 5) * i;
            
            for (let j = 0; j <= numSkills; j++) {
                const angle = angleStep * j - Math.PI / 2;
                const x = centerX + gridRadius * Math.cos(angle);
                const y = centerY + gridRadius * Math.sin(angle);
                
                if (j === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
        
        // Redraw axes
        for (let i = 0; i < numSkills; i++) {
            const angle = angleStep * i - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + radius * Math.cos(angle),
                centerY + radius * Math.sin(angle)
            );
            ctx.stroke();
        }
        
        // Draw data with animation
        ctx.beginPath();
        ctx.fillStyle = primaryColor + '40';
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 2;
        
        for (let i = 0; i <= numSkills; i++) {
            const skill = skills[i % numSkills];
            const angle = angleStep * i - Math.PI / 2;
            const skillRadius = (skill.value / 100) * radius * progress;
            const x = centerX + skillRadius * Math.cos(angle);
            const y = centerY + skillRadius * Math.sin(angle);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Draw points
        for (let i = 0; i < numSkills; i++) {
            const skill = skills[i];
            const angle = angleStep * i - Math.PI / 2;
            const skillRadius = (skill.value / 100) * radius * progress;
            const x = centerX + skillRadius * Math.cos(angle);
            const y = centerY + skillRadius * Math.sin(angle);
            
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = primaryColor;
            ctx.fill();
        }
        
        // Draw labels
        ctx.fillStyle = textColor;
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        for (let i = 0; i < numSkills; i++) {
            const skill = skills[i];
            const angle = angleStep * i - Math.PI / 2;
            const labelRadius = radius + 30;
            const x = centerX + labelRadius * Math.cos(angle);
            const y = centerY + labelRadius * Math.sin(angle);
            
            ctx.fillText(skill.name, x, y);
        }
    }
    
    // Start animation when visible
    const radarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateRadar();
                radarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    radarObserver.observe(canvas);
}

// ===================================
// LAZY LOADING
// ===================================

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ===================================
// THEME TOGGLE
// ===================================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        html.setAttribute('data-theme', 'dark');
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animate theme change
        document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// ===================================
// PARALLAX EFFECT
// ===================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('.floating-orbs .orb');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.1 * (index + 1);
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }, 10));
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// KEYBOARD NAVIGATION
// ===================================

document.addEventListener('keydown', function(e) {
    // ESC closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.getElementById('menuToggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// ===================================
// PERFORMANCE MONITORING
// ===================================

if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    });
    
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    
    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
            console.log('FID:', entry.processingStart - entry.startTime);
        });
    });
    
    fidObserver.observe({ entryTypes: ['first-input'] });
}

// ===================================
// SERVICE WORKER (PWA)
// ===================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(err => console.log('SW registration failed:', err));
    });
}

// ===================================
// CONSOLE ART
// ===================================

console.log('%c', 'font-size: 1px; padding: 100px 150px; background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzQzNjFFRSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5BTTwvdGV4dD48L3N2Zz4=) no-repeat;');
console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #4361EE;');
console.log('%cLooking to work together? Let\'s chat!', 'font-size: 14px; color: #4B5563;');
console.log('%calex@alexmorgan.design', 'font-size: 14px; color: #4361EE; font-weight: bold;');
