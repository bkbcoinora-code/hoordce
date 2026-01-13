// ==========================================
// InvestWise - Stock Landing Page JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initFormSubmit();
    initNavbarScroll();
});

// ==========================================
// Mobile Menu Toggle
// ==========================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// ==========================================
// Smooth Scroll Navigation
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// Scroll Reveal Animation
// ==========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.market-card, .feature-item, .insight-card, .section-header'
    );

    // Add scroll-reveal class to elements
    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 100;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('revealed');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                revealOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ==========================================
// Form Submission Handler
// ==========================================
function initFormSubmit() {
    const ctaForm = document.getElementById('ctaForm');

    if (ctaForm) {
        ctaForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const email = emailInput.value;

            if (validateEmail(email)) {
                // Simulate form submission
                submitBtn.textContent = 'กำลังดำเนินการ...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.textContent = 'สำเร็จ! ✓';
                    submitBtn.style.background = '#4CAF50';
                    emailInput.value = '';

                    setTimeout(() => {
                        submitBtn.textContent = 'สมัครเลย';
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);
                }, 1500);
            } else {
                emailInput.style.border = '2px solid #e74c3c';
                emailInput.focus();

                setTimeout(() => {
                    emailInput.style.border = '';
                }, 3000);
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==========================================
// Navbar Scroll Effect
// ==========================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(93, 78, 55, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(93, 78, 55, 0.08)';
        }

        lastScroll = currentScroll;
    });
}

// ==========================================
// Card Hover Effect (3D Tilt)
// ==========================================
document.querySelectorAll('.market-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function () {
        card.style.transform = '';
    });
});

// ==========================================
// Counter Animation for Stats
// ==========================================
function animateCounter(element, target, suffix = '') {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        element.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                // Only animate if not already animated
                if (!stat.dataset.animated) {
                    stat.dataset.animated = 'true';
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}
