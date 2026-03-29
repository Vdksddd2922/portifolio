document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    
    createParticles();
    initNavbar();
    initHeroAnimations();
    initServicesDrag();
    initTimeline();
    initAboutSection();
    initDifferentials();
    initContactSection();
    initSectionHeaders();
    initHelmet3D();
});

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${15 + Math.random() * 15}s`;
        
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        if (Math.random() > 0.5) {
            particle.style.background = '#ff2e2e';
        }
        
        particlesContainer.appendChild(particle);
    }
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function initHeroAnimations() {
    const chars = document.querySelectorAll('.char');
    const subtitle = document.querySelector('.hero-subtitle');
    const btn = document.querySelector('.hero-btn');
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(chars, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.05,
        ease: 'power4.out'
    })
    .to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .to(btn, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .to(scrollIndicator, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.3');
    
    gsap.to('.hero::before', {
        opacity: 0.6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

function initServicesDrag() {
    const container = document.querySelector('.services-horizontal');
    const track = document.getElementById('servicesTrack');
    const slides = document.querySelectorAll('.service-slide');
    const servicesSection = document.querySelector('.services');
    
    if (!container || !track || slides.length === 0) return;
    
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
    }, { passive: false });
    
    slides.forEach((slide, index) => {
        gsap.from(slide, {
            opacity: 0,
            x: 100,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.services',
                start: 'top 60%'
            }
        });
    });
}

function initTimeline() {
    const timelineLine = document.querySelector('.timeline-line');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    gsap.to(timelineLine, {
        opacity: 1,
        height: '100%',
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.trajectory',
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1
        }
    });
    
    timelineItems.forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            duration: 0.8,
            delay: index * 0.3,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.trajectory',
                start: 'top 50%'
            }
        });
    });
}

function initAboutSection() {
    const aboutContent = document.querySelector('.about-content');
    const aboutLabel = document.querySelector('.about-label');
    const aboutTitle = document.querySelector('.about-title');
    const aboutTexts = document.querySelectorAll('.about-text');
    const stats = document.querySelectorAll('.stat-item');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    gsap.to(aboutContent, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%'
        }
    });
    
    gsap.to(aboutLabel, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about',
            start: 'top 75%'
        }
    });
    
    gsap.to(aboutTitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about',
            start: 'top 75%'
        }
    });
    
    aboutTexts.forEach((text, index) => {
        gsap.to(text, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.about',
                start: 'top 70%'
            }
        });
    });
    
    stats.forEach((stat, index) => {
        gsap.to(stat, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.5 + index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.about',
                start: 'top 60%'
            }
        });
    });
    
    statNumbers.forEach(num => {
        const target = parseInt(num.dataset.target);
        
        gsap.to(num, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.about',
                start: 'top 60%'
            },
            onUpdate: function() {
                num.innerText = Math.round(this.targets()[0].innerText);
            }
        });
    });
}

function initDifferentials() {
    const cards = document.querySelectorAll('.differential-card');
    
    cards.forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.differentials',
                start: 'top 60%'
            }
        });
    });
}

function initContactSection() {
    const contactInfo = document.querySelector('.contact-info');
    const zapBtn = document.querySelector('.zap-btn');
    
    gsap.to(contactInfo, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 60%'
        }
    });
    
    if (zapBtn) {
        gsap.to(zapBtn, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 60%'
            }
        });
    }
}

function initSectionHeaders() {
    const headers = document.querySelectorAll('.section-header');
    
    headers.forEach(header => {
        const title = header.querySelector('.section-title');
        const subtitle = header.querySelector('.section-subtitle');
        
        if (title) {
            gsap.to(title, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 70%'
                }
            });
        }
        
        if (subtitle) {
            gsap.to(subtitle, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 70%'
                }
            });
        }
    });
}

let helmetScene, helmetCamera, helmetRenderer, helmetGroup;
let scrollProgress = 0;

function initHelmet3D() {
    const canvas = document.getElementById('helmetCanvas');
    if (!canvas) return;
    
    const container = canvas.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    helmetScene = new THREE.Scene();
    
    helmetCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    helmetCamera.position.z = 5;
    
    helmetRenderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true,
        antialias: true 
    });
    helmetRenderer.setSize(width, height);
    helmetRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    helmetScene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    helmetScene.add(mainLight);
    
    const fillLight = new THREE.DirectionalLight(0xff5a1f, 0.5);
    fillLight.position.set(-5, 0, 5);
    helmetScene.add(fillLight);
    
    const rimLight = new THREE.DirectionalLight(0xff2e2e, 0.3);
    rimLight.position.set(0, -5, -5);
    helmetScene.add(rimLight);
    
    helmetGroup = new THREE.Group();
    
    const shellGeometry = new THREE.SphereGeometry(1.2, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.7);
    const shellMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.8,
        roughness: 0.3,
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    shell.rotation.x = Math.PI;
    helmetGroup.add(shell);
    
    const visorGeometry = new THREE.SphereGeometry(1.15, 64, 32, -Math.PI * 0.4, Math.PI * 0.8, Math.PI * 0.25, Math.PI * 0.35);
    const visorMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.9,
    });
    const visor = new THREE.Mesh(visorGeometry, visorMaterial);
    visor.position.y = -0.1;
    visor.position.z = 0.3;
    helmetGroup.add(visor);
    
    const stripeGeometry = new THREE.TorusGeometry(1.18, 0.03, 16, 100);
    const redStripeMaterial = new THREE.MeshStandardMaterial({
        color: 0xff2e2e,
        emissive: 0xff2e2e,
        emissiveIntensity: 0.3,
    });
    const redStripe = new THREE.Mesh(stripeGeometry, redStripeMaterial);
    redStripe.position.y = 0.35;
    redStripe.rotation.x = Math.PI / 2;
    helmetGroup.add(redStripe);
    
    const yellowStripeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffc107,
        emissive: 0xffc107,
        emissiveIntensity: 0.2,
    });
    const yellowStripe = new THREE.Mesh(stripeGeometry, yellowStripeMaterial);
    yellowStripe.position.y = 0.25;
    yellowStripe.rotation.x = Math.PI / 2;
    yellowStripe.scale.set(0.85, 0.85, 0.85);
    helmetGroup.add(yellowStripe);
    
    const lightGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 32);
    const lightMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.9,
        roughness: 0.2,
    });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(0.9, 0.9, 0);
    light.rotation.z = Math.PI / 2;
    helmetGroup.add(light);
    
    const glowGeometry = new THREE.CircleGeometry(0.08, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff5a1f,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(0.98, 0.9, 0);
    glow.rotation.y = -Math.PI / 2;
    helmetGroup.add(glow);
    
    const strapGeometry = new THREE.BoxGeometry(0.15, 0.6, 0.05);
    const strapMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.8,
    });
    
    const leftStrap = new THREE.Mesh(strapGeometry, strapMaterial);
    leftStrap.position.set(-0.4, -0.8, 0);
    leftStrap.rotation.z = -0.2;
    helmetGroup.add(leftStrap);
    
    const rightStrap = new THREE.Mesh(strapGeometry, strapMaterial);
    rightStrap.position.set(0.4, -0.8, 0);
    rightStrap.rotation.z = 0.2;
    helmetGroup.add(rightStrap);
    
    const bottomGeometry = new THREE.CylinderGeometry(0.9, 1, 0.3, 64);
    const bottomMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.7,
        roughness: 0.4,
    });
    const bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
    bottom.position.y = -1.05;
    helmetGroup.add(bottom);
    
    helmetGroup.rotation.x = 0.2;
    helmetGroup.position.y = 0.2;
    helmetScene.add(helmetGroup);
    
    createFireParticles();
    
    animate();
    
    window.addEventListener('resize', onWindowResize);
}

function createFireParticles() {
    const fireGeometry = new THREE.BufferGeometry();
    const fireCount = 50;
    const positions = new Float32Array(fireCount * 3);
    const colors = new Float32Array(fireCount * 3);
    
    for (let i = 0; i < fireCount; i++) {
        const i3 = i * 3;
        const angle = Math.random() * Math.PI * 2;
        const radius = 1.5 + Math.random() * 0.5;
        
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = -1 + Math.random() * 2;
        positions[i3 + 2] = Math.sin(angle) * radius - 1;
        
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
            colors[i3] = 1;
            colors[i3 + 1] = 0.35;
            colors[i3 + 2] = 0.12;
        } else if (colorChoice < 0.66) {
            colors[i3] = 1;
            colors[i3 + 1] = 0.18;
            colors[i3 + 2] = 0.12;
        } else {
            colors[i3] = 1;
            colors[i3 + 1] = 0.76;
            colors[i3 + 2] = 0.03;
        }
    }
    
    fireGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    fireGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const fireMaterial = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
    });
    
    const fireParticles = new THREE.Points(fireGeometry, fireMaterial);
    fireParticles.name = 'fireParticles';
    helmetScene.add(fireParticles);
}

function animate() {
    requestAnimationFrame(animate);
    
    if (helmetGroup) {
        helmetGroup.rotation.y += 0.008;
        helmetGroup.rotation.x = 0.2 + Math.sin(Date.now() * 0.001) * 0.05;
    }
    
    const fireParticles = helmetScene.getObjectByName('fireParticles');
    if (fireParticles) {
        const positions = fireParticles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += 0.02;
            if (positions[i + 1] > 1.5) {
                positions[i + 1] = -1;
            }
        }
        fireParticles.geometry.attributes.position.needsUpdate = true;
        fireParticles.rotation.y += 0.005;
    }
    
    helmetRenderer.render(helmetScene, helmetCamera);
}

function onWindowResize() {
    const canvas = document.getElementById('helmetCanvas');
    if (!canvas) return;
    
    const container = canvas.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    helmetCamera.aspect = width / height;
    helmetCamera.updateProjectionMatrix();
    helmetRenderer.setSize(width, height);
}

window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

window.addEventListener('load', () => {
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
});
