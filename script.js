/* ============================================
   CLAIRÉZA WEAR - JavaScript
   Lightweight & optimized for low-end devices
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- LOADING SCREEN ----------
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 400);
    });
    // Fallback: hide loader after 3s even if assets slow
    setTimeout(() => loader.classList.add('hidden'), 3000);

    // ---------- NAVBAR SCROLL EFFECT ----------
    const navbar = document.getElementById('navbar');
    const backTop = document.getElementById('backTop');
    let lastScroll = 0;
    let ticking = false;

    const onScroll = () => {
        const y = window.scrollY;
        if (y > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        if (y > 400) backTop.classList.add('show');
        else backTop.classList.remove('show');

        lastScroll = y;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    // ---------- MOBILE MENU ----------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    // ---------- BACK TO TOP ----------
    backTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- REVEAL ON SCROLL (Intersection Observer - lightweight) ----------
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // stop observing once revealed
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all
        revealElements.forEach(el => el.classList.add('active'));
    }

    // ---------- COUNTER ANIMATION (stats) ----------
    const counters = document.querySelectorAll('.stat-num');
    const animateCounter = (el) => {
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || '+';
        const duration = 1500;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                el.textContent = target + suffix;
            } else {
                el.textContent = Math.floor(current) + (current >= target ? suffix : '');
            }
        }, stepTime);
    };

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObserver.observe(c));
    } else {
        counters.forEach(c => {
            c.textContent = c.dataset.target + (c.dataset.suffix || '+');
        });
    }

    // ---------- NEWSLETTER FORM ----------
    const form = document.getElementById('newsletterForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        alert(`Terima kasih! ${email} telah terdaftar di newsletter Clairéza Wear 💕`);
        form.reset();
    });

    // ---------- SMOOTH SCROLL (fallback for older browsers) ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 70;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});