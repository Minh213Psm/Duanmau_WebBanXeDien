// ===== 3D CAR MODEL - KHÔNG ĐỘNG VÀO PHẦN NÀY =====
let scene, camera, renderer, car, controls;
let wheelSpeedLines = [];
let roadLines = [];

function init() {
    const container = document.getElementById('car-container');
    if (!container) return;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 10, 80);

    camera = new THREE.PerspectiveCamera(40, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.set(18, 5, 22);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0.5, 0);

    setupLighting();
    createEnvironment();
    loadCarModel();

    window.addEventListener('resize', onWindowResize, false);
    animate();
}

function setupLighting() {
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(10, 20, 10);
    scene.add(mainLight);

    const rimLight = new THREE.SpotLight(0xffffff, 1.5);
    rimLight.position.set(-20, 10, 0);
    scene.add(rimLight);
}

function createWheelSpeedEffect(parent) {
    const wheelPositions = [
        { x: 3.55, y: 0.947, z: 6.215 },
        { x: -3.55, y: 0.947, z: 6.215 },
        { x: 3.55, y: 0.95, z: -4.35 },
        { x: -3.55, y: 0.95, z: -4.35 }
    ];

    wheelPositions.forEach(pos => {
        const group = new THREE.Group();
        group.position.set(pos.x, pos.y, pos.z);
        group.rotation.y = Math.PI / 2;

        const ringConfigs = [
            { inner: 1.35, outer: 1.38, op: 0.7 },
            { inner: 0.99, outer: 1.01, op: 0.3 }
        ];

        ringConfigs.forEach(conf => {
            const geo = new THREE.RingGeometry(conf.inner, conf.outer, 64);
            const mat = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: conf.op,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            const ring = new THREE.Mesh(geo, mat);
            group.add(ring);
            wheelSpeedLines.push(ring);
        });
        parent.add(group);
    });
}

function createEnvironment() {
    const floorGeo = new THREE.PlaneGeometry(1000, 1000);
    const floorMat = new THREE.MeshStandardMaterial({
        color: 0x020202,
        metalness: 0.0,
        roughness: 1.0
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    for (let i = 0; i < 20; i++) {
        const line = new THREE.Mesh(
            new THREE.PlaneGeometry(0.3, 15),
            new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 })
        );
        line.rotation.x = -Math.PI / 2;
        line.position.set(0, 0.01, i * 20 - 150);
        scene.add(line);
        roadLines.push(line);
    }
}

function loadCarModel() {
    const loader = new THREE.GLTFLoader();
    loader.load('./models/vinfast_vf9_model_no_interior.glb', function (gltf) {
        car = gltf.scene;

        car.traverse((node) => {
            if (node.isMesh) {
                if (node.material.name.includes("body") || node.material.name.includes("paint")) {
                    node.material.metalness = 0.7;
                    node.material.roughness = 0.2;
                }
            }
        });

        const box = new THREE.Box3().setFromObject(car);
        const size = box.getSize(new THREE.Vector3());
        const scaleFactor = 22 / size.z;
        car.scale.set(scaleFactor, scaleFactor, scaleFactor);
        car.position.y = -box.min.y * scaleFactor;

        createWheelSpeedEffect(car);

        car.rotation.y = Math.PI;
        scene.add(car);
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (controls) controls.update();

    roadLines.forEach(l => {
        l.position.z += 8.0;
        if (l.position.z > 50) l.position.z = -250;
    });

    wheelSpeedLines.forEach((ring) => {
        ring.rotation.z += 0.8;
        ring.material.opacity = (0.3 + Math.random() * 0.4);
    });

    if (car) {
        car.position.y += Math.sin(Date.now() * 0.05) * 0.005;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.getElementById('car-container');
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
}

// ===== ENHANCED FEATURES =====

// Navbar scroll effect - Fixed
let lastScroll = 0;
let ticking = false;

function updateNavbar() {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateNavbar();
        });
        ticking = true;
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (this.classList.contains('nav-link')) {
                this.classList.add('active');
            }
        }
    });
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString();
}

// Intersection Observer for animations - Fixed
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');

            // Animate stats counter when visible
            if (entry.target.classList.contains('stat-box')) {
                const numberElement = entry.target.querySelector('.stat-number');
                if (numberElement && !numberElement.classList.contains('counted')) {
                    const target = parseInt(numberElement.getAttribute('data-target'));
                    animateCounter(numberElement, target);
                    numberElement.classList.add('counted');
                }
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });

    // Initialize 3D scene
    init();
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;

        // Show success message (you can customize this)
        alert(`Cảm ơn bạn đã đăng ký! Email: ${email}`);
        newsletterForm.reset();
    });
}

// Add hover effect for vehicle cards
document.querySelectorAll('.vehicle-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function () {
        this.style.zIndex = '1';
    });
});

// Performance optimization: Debounce resize events
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

const debouncedResize = debounce(() => {
    onWindowResize();
}, 250);

window.addEventListener('resize', debouncedResize);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Preload images for better performance
function preloadImages() {
    const images = [
        'img/vf3.png',
        'img/vf8.png',
        'img/vf9.png',
        'img/tech_bg.png',
        'img/Lifestyle & Charging.png'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();

    // Add entrance animation delay to elements
    document.querySelectorAll('[data-aos]').forEach((element, index) => {
        const delay = element.getAttribute('data-aos-delay');
        if (delay) {
            element.style.animationDelay = `${delay}ms`;
        }
    });
});

console.log('🚗 VinFast Website Loaded Successfully!');