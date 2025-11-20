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

document.addEventListener('DOMContentLoaded', function () {
    initAll();
});

function initAll() {
    // Detect touch device
    state.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Initialize all modules
    initBIOSBoot(); // Replaces initPreloader
    initSoundFX();
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
    initCyberTerminal();
    initAIChat();
    initEasterEggs();
    initGlitchEffect();

    console.log('%c✨ Portfolio Loaded', 'font-size: 20px; font-weight: bold; color: #4361EE;');
}

// ===================================
// PRELOADER
// ===================================

function initPreloader() {
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', function () {
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
        anchor.addEventListener('click', function (e) {
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
        el.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const strength = 0.3;
            this.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });

        el.addEventListener('mouseleave', function () {
            this.style.transform = 'translate(0, 0)';
        });

        // Add touch feedback for mobile
        el.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.95)';
        });

        el.addEventListener('touchend', function () {
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

        el.addEventListener('mouseenter', function () {
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
        btn.addEventListener('click', function () {
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

    themeToggle.addEventListener('click', function () {
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
    return function () {
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

document.addEventListener('keydown', function (e) {
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
    window.addEventListener('load', function () {
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
console.log('%cbikramtamang293@gmail.com', 'font-size: 14px; color: #4361EE; font-weight: bold;');
console.log('%c🔒 SYSTEM LOCKED: Hidden protocol active. Check source code for access keys.', 'font-size: 12px; color: #ff0000; background: #000; padding: 5px;');

// ===================================
// CYBER TERMINAL
// ===================================

function initCyberTerminal() {
    const modal = document.getElementById('cyberTerminal');
    const input = document.getElementById('terminalInput');
    const output = document.getElementById('terminalOutput');
    const closeBtn = modal.querySelector('.terminal-close');

    if (!modal || !input || !output) return;

    // Command History
    let history = [];
    let historyIndex = -1;

    // Commands
    const commands = {
        'help': 'Available commands: <span class="highlight">about, skills, projects, contact, clear, exit, date, whoami, sudo</span>',
        'about': 'Bikram Tamang - Cyber-AI Cloud Architect. 10+ years of experience in building secure, intelligent systems.',
        'skills': 'AI/ML (TensorFlow, PyTorch), Cybersecurity (CEH, Burp Suite), Cloud (AWS Solutions Architect, Kubernetes).',
        'projects': 'Check out the "Projects" section for my latest work in AI and Security.',
        'contact': 'Email: bikramtamang293@gmail.com | Phone: +977 9813464612 | Facebook: Bikram Tamang',
        'clear': 'clear',
        'exit': 'exit',
        'date': new Date().toString(),
        'whoami': 'guest@elite-system',
        'sudo': '<span class="error">Permission denied: You are not root.</span>'
    };

    // Open Terminal (Ctrl + `)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '`') {
            modal.classList.toggle('active');
            if (modal.classList.contains('active')) {
                setTimeout(() => input.focus(), 100);
            }
        }
    });

    // Close Terminal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Handle Input
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();

            if (command) {
                // Add to history
                history.push(command);
                historyIndex = history.length;

                // Echo command
                addToOutput(`root@elite:~$ ${command}`);

                // Process command
                if (commands[command]) {
                    if (command === 'clear') {
                        output.innerHTML = '';
                    } else if (command === 'exit') {
                        modal.classList.remove('active');
                    } else {
                        addToOutput(commands[command]);
                    }
                } else if (command.startsWith('decrypt ') || command.startsWith('unlock ')) {
                    const key = command.split(' ')[1];
                    if (key === '0x1337_CYBER_GHOST') {
                        addToOutput('<span class="highlight">ACCESS GRANTED. INITIALIZING HACKER MODE...</span>');
                        enableHackerMode();
                    } else {
                        addToOutput('<span class="error">ACCESS DENIED. INVALID KEY.</span>');
                    }
                } else {
                    addToOutput(`<span class="error">Command not found: ${command}</span>. Type 'help' for list.`);
                }
            } else {
                addToOutput('root@elite:~$');
            }

            input.value = '';
            scrollToBottom();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = history[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                historyIndex++;
                input.value = history[historyIndex];
            } else {
                historyIndex = history.length;
                input.value = '';
            }
        }
    });

    function addToOutput(html) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = html;
        output.appendChild(line);
    }

    function scrollToBottom() {
        output.scrollTop = output.scrollHeight;
    }
}

// ===================================
// AI ASSISTANT CHAT
// ===================================

function initAIChat() {
    const toggle = document.getElementById('aiToggle');
    const chatWindow = document.getElementById('aiChatWindow');
    const closeBtn = chatWindow.querySelector('.ai-close');
    const input = document.getElementById('aiInput');
    const sendBtn = document.getElementById('aiSend');
    const messages = document.getElementById('aiMessages');

    if (!toggle || !chatWindow) return;

    // Toggle Chat
    toggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            setTimeout(() => input.focus(), 300);
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Send Message
    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        // Add User Message
        addMessage(text, 'user-message');
        input.value = '';

        // Simulate AI Thinking
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message ai-message';
        typingIndicator.innerHTML = '...';
        messages.appendChild(typingIndicator);
        scrollToBottom();

        setTimeout(() => {
            messages.removeChild(typingIndicator);
            const response = getAIResponse(text);
            addMessage(response, 'ai-message');
        }, 1000 + Math.random() * 1000);
    }

    sendBtn.addEventListener('click', sendMessage);

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function addMessage(text, className) {
        const msg = document.createElement('div');
        msg.className = `message ${className}`;
        msg.innerHTML = text;
        messages.appendChild(msg);
        scrollToBottom();
    }

    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }

    // Simple Rule-Based AI
    function getAIResponse(input) {
        input = input.toLowerCase();

        if (input.includes('hello') || input.includes('hi')) {
            return "Hello! I'm ready to assist you with information about Bikram's expertise.";
        } else if (input.includes('skill') || input.includes('stack')) {
            return "Bikram is an expert in <strong>AI/ML</strong> (TensorFlow, PyTorch), <strong>Cybersecurity</strong> (Pen Testing, Zero Trust), and <strong>Cloud Architecture</strong> (AWS, Kubernetes).";
        } else if (input.includes('project') || input.includes('work')) {
            return "He has worked on amazing projects like a <strong>Computer Vision AI Platform</strong>, a <strong>Zero-Trust Network Scanner</strong>, and <strong>Serverless Cloud Architectures</strong>.";
        } else if (input.includes('contact') || input.includes('email')) {
            return "You can reach him at <strong>bikramtamang293@gmail.com</strong>, call <strong>+977 9813464612</strong>, or connect on Facebook.";
        } else if (input.includes('cert')) {
            return "He holds the <strong>AWS Certified Solutions Architect</strong> and <strong>Certified Ethical Hacker (CEH)</strong> credentials.";
        } else {
            return "I'm tuned to answer questions about Bikram's professional background. Try asking about his skills, projects, or certifications!";
        }
    }
}

// ===================================
// EASTER EGGS (Matrix Rain)
// ===================================

function initEasterEggs() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // Konami Code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateMatrix();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    window.addEventListener('resize', () => {
        if (canvas.classList.contains('active')) {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
    });

    function activateMatrix() {
        canvas.classList.add('active');
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        const columns = Math.floor(width / 20);
        const drops = Array(columns).fill(1);

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#0F0';
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = String.fromCharCode(Math.floor(Math.random() * 128));
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            if (canvas.classList.contains('active')) {
                requestAnimationFrame(draw);
            }
        }

        draw();

        // Deactivate on click
        canvas.addEventListener('click', () => {
            canvas.classList.remove('active');
            ctx.clearRect(0, 0, width, height);
        });
    }
}

// ===================================
// SOUND FX (Web Audio API)
// ===================================

let soundFX;

function initSoundFX() {
    class SoundSystem {
        constructor() {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.muted = false;
            this.masterGain = this.ctx.createGain();
            this.masterGain.connect(this.ctx.destination);
            this.masterGain.gain.value = 0.1; // Low volume by default
        }

        toggleMute() {
            this.muted = !this.muted;
            this.masterGain.gain.value = this.muted ? 0 : 0.1;
            return this.muted;
        }

        playTone(freq, type, duration) {
            if (this.muted) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            gain.gain.setValueAtTime(1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        }

        playHover() {
            this.playTone(440, 'sine', 0.1);
        }

        playClick() {
            this.playTone(880, 'square', 0.05);
        }

        playType() {
            // Random pitch for typing
            const freq = 200 + Math.random() * 100;
            this.playTone(freq, 'triangle', 0.03);
        }

        playNotification() {
            this.playTone(600, 'sine', 0.2);
            setTimeout(() => this.playTone(800, 'sine', 0.4), 100);
        }
    }

    soundFX = new SoundSystem();

    // UI Toggle
    const toggle = document.getElementById('soundToggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const isMuted = soundFX.toggleMute();
            toggle.classList.toggle('muted', isMuted);
            if (!isMuted) soundFX.playNotification();
        });
    }

    // Attach to elements
    const interactive = document.querySelectorAll('a, button, .magnetic-btn, input');
    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => soundFX.playHover());
        el.addEventListener('click', () => soundFX.playClick());
    });

    // Attach to inputs for typing sound
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(el => {
        el.addEventListener('input', () => soundFX.playType());
    });
}

// ===================================
// BIOS BOOT SEQUENCE
// ===================================

// ===================================
// BIOS BOOT SEQUENCE
// ===================================

function initBIOSBoot() {
    const preloader = document.getElementById('preloader');
    const log = document.getElementById('biosLog');

    if (!preloader) return;

    // Safety Timeout: Force hide after 5 seconds max
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }, 5000);

    if (!log) {
        // If log missing, hide immediately
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        return;
    }

    const lines = [
        "Initializing Elite Cyber-AI Protocol v2.5...",
        "Loading Kernel Modules... [OK]",
        "Mounting File System... [OK]",
        "Verifying Security Certificates... [OK]",
        "Connecting to Neural Network... [CONNECTED]",
        "Loading User Interface... [DONE]",
        "Welcome, Guest."
    ];

    let delay = 0;

    lines.forEach((line, index) => {
        delay += Math.random() * 300 + 100;
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = 'bios-line';
            div.textContent = `> ${line}`;
            log.appendChild(div);

            // Play typing sound if sound system is ready
            if (typeof soundFX !== 'undefined' && soundFX) {
                soundFX.playType();
            }

            // Scroll to bottom
            log.scrollTop = log.scrollHeight;

            // Finish
            if (index === lines.length - 1) {
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    document.body.style.overflow = '';
                    // Play startup sound
                    if (typeof soundFX !== 'undefined' && soundFX) {
                        soundFX.playNotification();
                    }
                }, 800);
            }
        }, delay);
    });
}

// ===================================
// HOLOGRAPHIC GLITCH EFFECT
// ===================================

function initGlitchEffect() {
    const headings = document.querySelectorAll('h1, h2');

    headings.forEach(el => {
        el.classList.add('glitch-effect');
        el.setAttribute('data-text', el.textContent);

        // Random glitch trigger
        setInterval(() => {
            if (Math.random() > 0.95) {
                el.style.animation = 'none';
                el.offsetHeight; /* trigger reflow */
                el.style.animation = null;
            }
        }, 3000);
    });
}

// ===================================
// HACKER MODE (CTF REWARD)
// ===================================

function enableHackerMode() {
    document.body.classList.add('hacker-theme');

    // Create Modal
    const modal = document.createElement('div');
    modal.className = 'access-granted-modal active';
    modal.innerHTML = `
        <div class="access-content">
            <div class="access-title">Access Granted</div>
            <p>Welcome to the Neural Network, Admin.</p>
            <p>System Override: COMPLETE</p>
        </div>
    `;
    document.body.appendChild(modal);

    // Sound
    if (typeof soundFX !== 'undefined' && soundFX) {
        soundFX.playNotification();
    }

    // Remove modal after 3s
    setTimeout(() => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 500);
    }, 3000);
}
