// Language data: data-lang="en|ar|ro"
const translations = {
    // This is handled via data attributes in HTML
};

// Languages config
const languages = ['en', 'ar', 'ro'];
let currentLang = localStorage.getItem('lang') || 'en';
let currentTheme = localStorage.getItem('theme') || 'dark';

// DOM Elements
const langSelect = document.getElementById('lang-select');
const themeToggle = document.getElementById('theme-toggle');
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.getElementById('nav-menu');
const scrollTop = document.getElementById('scroll-top');
const contactForm = document.getElementById('contact-form');

// Init on load
document.addEventListener('DOMContentLoaded', init);

function init() {
    setLanguage(currentLang);
    setTheme(currentTheme);
    setupEventListeners();
    observeAnimations();
    startCounters();
}

function setupEventListeners() {
    // Language switch
    langSelect.value = currentLang;
    langSelect.addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('lang', currentLang);
        setLanguage(currentLang);
    });

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Navbar scroll effect
    window.addEventListener('scroll', handleScroll);

    // Hamburger menu
    hamburger.addEventListener('click', toggleMobileMenu);

    // Nav links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Form submit
    contactForm.addEventListener('submit', handleFormSubmit);

    // Scroll top
    scrollTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
}

function setLanguage(lang) {
    // Update HTML lang and dir
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update all translatable elements
    document.querySelectorAll('[data-lang]').forEach(el => {
        const texts = el.getAttribute('data-lang').split('|');
        el.textContent = texts[languages.indexOf(lang)];
    });

    // Update lang select
    langSelect.value = lang;
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
    localStorage.setItem('theme', theme);

    // Toggle icons
    const sun = themeToggle.querySelector('.sun-icon');
    const moon = themeToggle.querySelector('.moon-icon');
    if (theme === 'dark') {
        sun.style.display = 'block';
        moon.style.display = 'none';
    } else {
        sun.style.display = 'none';
        moon.style.display = 'block';
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
}

function handleScroll() {
    // Navbar background
    if (window.scrollY > 50) {
        navbar.style.background = currentTheme === 'dark' 
            ? 'rgba(10,10,10,0.98)' 
            : 'rgba(255,255,255,0.98)';
    } else {
        navbar.style.background = currentTheme === 'dark' 
            ? 'rgba(10,10,10,0.95)' 
            : 'rgba(255,255,255,0.95)';
    }

    // Scroll top button
    if (window.scrollY > 500) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

function observeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-in').forEach(el => {
        observer.observe(el);
    });

    // Skills progress bars
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.progress').forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelector('.skills').addEventListener('mouseenter', () => skillsObserver.observe(document.querySelector('.skills')));
}

function startCounters() {
    const counters = document.querySelectorAll('.num');
    const speed = 200;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(() => startCounters(), 10);
                    } else {
                        counter.innerText = target;
                    }
                });
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counterObserver.observe(document.querySelector('.about-stats'));
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Simple validation
    const formData = new FormData(contactForm);
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const message = formData.get('message')?.trim();

    if (!name || !email || !message) {
        alert('Please fill all fields');
        return;
    }

    // Simulate send (replace with EmailJS or backend)
    alert('Thank you! Your message has been sent. (Demo)');
    
    // Reset form
    contactForm.reset();
    
    // Note: Integrate EmailJS for real functionality:
    // emailjs.send('service_id', 'template_id', {name, email, message})
    // .then(() => alert('Sent!'), () => alert('Error'));
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        closeMobileMenu();
    });
});

// Typing effect for hero (optional bonus)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Hero typing animation
const heroTitle = document.querySelector('.hero-content h2');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 100);
}

// Project modal
const projectLinks = document.querySelectorAll('.project-links a');
projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = link.href;
        const projectName = link.closest('.project-card').querySelector('h3').textContent;
        showProjectModal(url, projectName);
    });
});

function showProjectModal(url, projectName) {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    `;
    modal.innerHTML = `
        <div style="background: var(--bg-tertiary); border-radius: 20px; padding: 2rem; max-width: 90%; max-height: 90%; position: relative;">
            <h3 style="color: var(--accent-primary); margin-bottom: 1rem;">${projectName}</h3>
            <iframe src="${url}" style="width: 100%; height: 500px; border: none; border-radius: 12px;" loading="lazy"></iframe>
            <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-primary); font-size: 2rem; cursor: pointer;">×</button>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

console.log('Portfolio loaded! Lang:', currentLang, 'Theme:', currentTheme);
