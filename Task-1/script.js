
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});


function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

updateActiveNavLink();


function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});


const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validate form
        if (!name.trim() || !email.trim() || !message.trim()) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show success message
        alert(`Thank you ${name}! Your message has been received. I'll get back to you soon!`);
        
        // Reset form
        contactForm.reset();
    });
}


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and list items
document.querySelectorAll('.skill-card, .project-card, .cert-item, .interest-item, .strength-item, .goal-item, .experience-item').forEach(el => {
    el.style.opacity = '0';
    el.style.animation = 'none';
    observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow to navbar on scroll
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroBeforeElement = hero.querySelector('::before');
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    });
}

 
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #6366f1;
        font-weight: 700;
    }
`;
document.head.appendChild(style);
 
function createScrollToTopButton() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        color: white;
        border: none;
        padding: 12px 15px;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 999;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
        transition: all 0.3s ease;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'scale(1)';
    });
}

createScrollToTopButton();

 
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.animation = 'fadeIn 0.5s ease';
});

 
function printPortfolio() {
    window.print();
}

 
function downloadResume() {
    alert('Resume download feature coming soon!');
}

 
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    
    // Add initial load animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'slideInUp 0.8s ease';
    }
});

 
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (placeholder for future feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search feature coming soon');
    }
    
    // Ctrl/Cmd + P to print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printPortfolio();
    }
});
 
const socialLinks = {
    github: 'https://github.com/AkshayaMallapureddy',
    linkedin: 'https://www.linkedin.com/in/akshaya-mallapureddy-0b0715301/',
    email: 'akshaya.mallapureddy421@gmail.com'
};

document.querySelectorAll('.social-icon').forEach((icon, index) => {
    const links = [socialLinks.github, socialLinks.linkedin, socialLinks.twitter, socialLinks.email];
    if (links[index]) {
        icon.href = links[index];
        icon.target = '_blank';
        icon.rel = 'noopener noreferrer';
    }
});

 
function updateContactInfo() {
    const contactEmail = 'akshaya.mallapureddy421@gmail.com'; // Update with actual email
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.href = `mailto:${contactEmail}`;
    });
}

updateContactInfo();

// ===========================
// Dark Mode Toggle (Optional Feature)
// ===========================
function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') !== 'false';
    
    if (!isDarkMode) {
        document.body.classList.add('light-mode');
    }
}

// ===========================
// Performance Optimization
// ===========================
if ('IntersectionObserver' in window) {
    console.log('IntersectionObserver supported');
} else {
    console.log('IntersectionObserver not supported, using fallback');
}

// ===========================
// Log Portfolio Info
// ===========================
console.log('%c Akshaya Mallapureddy ', 'font-size: 16px; font-weight: bold; color: #6366f1;');
console.log('%c AI/ML Enthusiast | Full Stack Developer', 'font-size: 12px; color: #14b8a6;');
