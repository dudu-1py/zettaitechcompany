// ==========================================
// ZETTAI TECH - JAVASCRIPT
// ==========================================

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
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

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

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

// ==========================================
// CONTACT FORM HANDLING
// ==========================================

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector('textarea').value;

    // Simple validation
    if (!name || !email || !message) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, digite um email válido.', 'error');
        return;
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <p>${message}</p>
        <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 4000);
}

// Add notification styles dynamically
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        max-width: 400px;
        padding: 15px 20px;
        background: #333;
        color: white;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease-out;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .notification-success {
        background: linear-gradient(135deg, #00d9ff, #0099cc);
        border-left: 4px solid #00d9ff;
    }

    .notification-error {
        background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
        border-left: 4px solid #ff6b6b;
    }

    .notification-info {
        background: linear-gradient(135deg, #4ecdc4, #44a08d);
        border-left: 4px solid #4ecdc4;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .notification p {
        margin: 0;
        flex: 1;
    }

    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @media (max-width: 480px) {
        .notification {
            bottom: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(notificationStyle);

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item, .tech-category').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==========================================
// PARALLAX EFFECT ON HERO
// ==========================================

window.addEventListener('scroll', () => {
    const scrollAmount = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPosition = `0px ${scrollAmount * 0.5}px`;
    }
});

// ==========================================
// NUMBER COUNTER ANIMATION
// ==========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Start counter animation when stats section is visible
const statsSection = document.querySelector('.hero-stats');
let countersStarted = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            document.querySelectorAll('.stat h3').forEach((element, index) => {
                const targets = [10, 3, 1];
                setTimeout(() => {
                    animateCounter(element, targets[index], 2000);
                }, index * 200);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==========================================
// INTERACTIVE HOVER EFFECTS
// ==========================================

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ==========================================
// TYPING ANIMATION FOR HERO TEXT
// ==========================================

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Animate hero title on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment below to enable typing animation
        // heroTitle.textContent = '';
        // typeWriter(heroTitle, originalText);
    }
});

// ==========================================
// DYNAMIC BACKGROUND COLOR CHANGE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Add scroll event listener for dynamic effects
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // Update color based on scroll position (optional effect)
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Reset or add effects here
        }, 100);
    });
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy load images when they come into view
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// SERVICE LINK INTERACTIVITY
// ==========================================

document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'translateX(5px)';
        }
    });
    
    link.addEventListener('mouseleave', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'translateX(0)';
        }
    });
});

// ==========================================
// PORTFOLIO ITEM CLICK HANDLERS
// ==========================================

document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        const projectName = this.querySelector('h3').textContent;
        showNotification(`Projeto: ${projectName} - Em breve com mais detalhes!`, 'info');
    });
});

// ==========================================
// DEBOUNCE FUNCTION FOR PERFORMANCE
// ==========================================

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

// ==========================================
// WINDOW RESIZE HANDLER
// ==========================================

const handleResize = debounce(() => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
}, 250);

window.addEventListener('resize', handleResize);

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Zettai Tech website loaded successfully!');
    
    // Add any initialization code here
    initializePage();
});

function initializePage() {
    // Smooth scroll behavior
    if (!CSS.supports('scroll-behavior', 'smooth')) {
        console.log('Smooth scroll not supported, using polyfill');
    }
    
    // Add focus visible styles for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

// ==========================================
// ACCESSIBILITY IMPROVEMENTS
// ==========================================

const accessibilityStyle = document.createElement('style');
accessibilityStyle.textContent = `
    body.keyboard-nav *:focus {
        outline: 2px solid #00d9ff;
        outline-offset: 2px;
    }
    
    .btn:focus,
    input:focus,
    textarea:focus,
    select:focus {
        outline: 2px solid #00d9ff;
        outline-offset: 2px;
    }
`;
document.head.appendChild(accessibilityStyle);

// ==========================================
// LOG VERSION INFO
// ==========================================

console.log('%cZettai Tech Website', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cVersion 1.0.0', 'color: #c0a962; font-size: 12px;');
console.log('%cBuilt with passion and modern web technologies', 'color: #b0b0b0; font-size: 12px;');
