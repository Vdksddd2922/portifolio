// GSAP and ScrollTrigger Registration
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorFollower.style.left = followerX - 15 + 'px';
    cursorFollower.style.top = followerY - 15 + 'px';
    
    requestAnimationFrame(updateCursor);
}
updateCursor();

// Cursor hover effect on links and buttons
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .projeto-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        cursorFollower.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        cursorFollower.classList.remove('hovered');
    });
});

// Particles Canvas
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 207, 255, ${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    // Draw connections
    particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(0, 207, 255, ${0.1 * (1 - distance / 150)})`;
                ctx.stroke();
            }
        });
    });
    
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hero Animations
function initHeroAnimations() {
    // Greeting animation
    gsap.fromTo('.hero-greeting', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
    );
    
    // Name lines with split effect
    const nameLines = document.querySelectorAll('.name-line');
    nameLines.forEach((line, index) => {
        gsap.fromTo(line, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, delay: 0.7 + index * 0.2, ease: 'power3.out' }
        );
    });
    
    // Subtitle typewriter effect
    const subtitle = document.querySelector('.typewriter-text');
    const subtitleText = subtitle.textContent;
    subtitle.textContent = '';
    
    gsap.to(subtitle, {
        opacity: 1,
        duration: 0.5,
        delay: 1.2
    });
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < subtitleText.length) {
            subtitle.textContent += subtitleText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 80);
        }
    }
    setTimeout(typeWriter, 1.2);
    
    // Description
    gsap.fromTo('.hero-description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.8 }
    );
    
    // CTA Buttons
    gsap.fromTo('.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2 }
    );
    
    // Profile image
    gsap.fromTo('.profile-container',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, delay: 1, ease: 'back.out(1.7)' }
    );
    
    // Scroll indicator
    gsap.fromTo('.scroll-indicator',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2.5 }
    );
}

// Magnetic effect for hero elements
const magneticElements = document.querySelectorAll('[data-magnetic]');
magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    el.addEventListener('mouseleave', () => {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// Hero mouse parallax
document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    gsap.to('.gradient-orb', {
        x: x,
        y: y,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.to('.hero-text', {
        x: -x * 0.5,
        y: -y * 0.5,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.to('.hero-visual', {
        x: x * 0.8,
        y: y * 0.8,
        duration: 1,
        ease: 'power2.out'
    });
});

// Section Animations with ScrollTrigger
function initScrollAnimations() {
    // About section
    gsap.fromTo('.sobre .section-header', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.sobre', start: 'top 80%' }
    });
    
    gsap.fromTo('.info-card', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.sobre-content', start: 'top 80%' }
    });
    
    gsap.fromTo('.sobre-descricao', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: '.sobre-content', start: 'top 70%' }
    });
    
    // Stats counter animation
    gsap.fromTo('.stat-number', 
        { textContent: 0 },
        { textContent: 2, duration: 2, ease: 'power2.out', snap: { textContent: 1 },
        onUpdate: function() { this.targets()[0].textContent = Math.round(this.targets()[0].textContent); },
        scrollTrigger: { trigger: '.sobre-stats', start: 'top 85%' }
    });
    
    // Skills section
    gsap.fromTo('.habilidades .section-header', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.habilidades', start: 'top 80%' }
    });
    
    gsap.fromTo('.skill-card', 
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.habilidades-grid', start: 'top 80%' }
    });
    
    // Skill bars animation
    document.querySelectorAll('.skill-card').forEach(card => {
        const skillPercent = card.dataset.skill;
        const progressBar = card.querySelector('.skill-progress');
        
        ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(progressBar, {
                    width: skillPercent + '%',
                    duration: 1.5,
                    ease: 'power3.out'
                });
            }
        });
    });
    
    // Projects section
    gsap.fromTo('.projetos .section-header', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.projetos', start: 'top 80%' }
    });
    
    gsap.fromTo('.projeto-card', 
        { opacity: 0, y: 80, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.2, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.projetos-grid', start: 'top 80%' }
    });
    
    // Contact section
    gsap.fromTo('.contato .section-header', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contato', start: 'top 80%' }
    });
    
    gsap.fromTo('.contato-texto', 
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contato-content', start: 'top 80%' }
    });
    
    gsap.fromTo('.contato-cta', 
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: '.contato-content', start: 'top 80%' }
    });
    
    // Parallax effects
    gsap.to('.gradient-orb.orb-1', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200
    });
    
    gsap.to('.gradient-orb.orb-2', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -150
    });
    
    // Section background fade
    gsap.to('section', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        }
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: 'power3.inOut'
            });
        }
    });
});

// Add ScrollToPlugin dynamically
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js';
script.onload = () => {
    gsap.registerPlugin(ScrollToPlugin);
};
document.head.appendChild(script);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    
    // Wait a bit for ScrollToPlugin to load
    setTimeout(() => {
        initScrollAnimations();
    }, 100);
});

// Menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        
        if (!navLinks.classList.contains('mobile')) {
            navLinks.classList.add('mobile');
            navLinks.style.cssText = `
                position: fixed;
                top: 80px;
                left: 0;
                width: 100%;
                background: rgba(10, 10, 10, 0.98);
                flex-direction: column;
                padding: 2rem;
                gap: 1.5rem;
                border-bottom: 1px solid rgba(0, 207, 255, 0.1);
            `;
        } else {
            navLinks.classList.remove('mobile');
            navLinks.style.cssText = '';
        }
    });
}

// Intersection Observer for reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

document.querySelectorAll('.section-header, .info-card, .skill-card, .projeto-card').forEach(el => {
    observer.observe(el);
});
