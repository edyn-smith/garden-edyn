// ===================================
// Mobile Navigation Toggle
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// ===================================
// Lightbox Functionality
// ===================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');
const prevLightbox = document.querySelector('.prev-lightbox');
const nextLightbox = document.querySelector('.next-lightbox');

let currentImageIndex = 0;
let imageElements = [];

// Get all photo items on the page
const photoItems = document.querySelectorAll('.photo-item');

if (photoItems.length > 0) {
    imageElements = Array.from(photoItems);

    // Add click event to each photo
    photoItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    const img = imageElements[index].querySelector('img');
    const caption = imageElements[index].querySelector('.photo-caption');
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    
    if (caption) {
        lightboxCaption.textContent = caption.textContent;
    }
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightboxFunc() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + imageElements.length) % imageElements.length;
    openLightbox(currentImageIndex);
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageElements.length;
    openLightbox(currentImageIndex);
}

// Event listeners for lightbox controls
if (closeLightbox) {
    closeLightbox.addEventListener('click', closeLightboxFunc);
}

if (prevLightbox) {
    prevLightbox.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevImage();
    });
}

if (nextLightbox) {
    nextLightbox.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });
}

// Close lightbox when clicking on the background
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightboxFunc();
    } else if (e.key === 'ArrowLeft') {
        showPrevImage();
    } else if (e.key === 'ArrowRight') {
        showNextImage();
    }
});

// ===================================
// Smooth Scroll Enhancement
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Enhanced Scroll Animation for Elements
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay based on element position
            const delay = index * 0.1;
            entry.target.style.transitionDelay = `${delay}s`;
            entry.target.classList.add('visible');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.photo-item, .category-card, .about-text').forEach(el => {
    animateOnScroll.observe(el);
});

// ===================================
// Navbar Scroll Effect
// ===================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Parallax Effect for Hero
// ===================================
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            // Limit parallax range to prevent showing edges
            const parallaxSpeed = 0.3;
            const maxOffset = 150; // Maximum pixels to shift
            const offset = Math.min(scrolled * parallaxSpeed, maxOffset);
            hero.style.backgroundPosition = `center calc(30% + ${offset}px)`;
        }
    });
}

// ===================================
// Image Lazy Loading with Fade-in
// ===================================
const images = document.querySelectorAll('img');
images.forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    }
});

// ===================================
// Add loading animation
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations after page load
    setTimeout(() => {
        document.querySelectorAll('.photo-item, .category-card').forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.08}s`;
        });
    }, 100);
});

// ===================================
// Smooth hover sound effect (optional enhancement)
// ===================================
document.querySelectorAll('.category-card, .photo-item, .cta-button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.willChange = 'transform';
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.willChange = 'auto';
    });
});

console.log('🌿 Garden of Edyn Photography - Website loaded successfully!');
