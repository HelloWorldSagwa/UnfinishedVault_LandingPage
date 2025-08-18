// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.nav-mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
let isMenuOpen = false;

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            // Create mobile menu
            const mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <a href="#features" class="mobile-link">기능</a>
                <a href="#how-it-works" class="mobile-link">사용법</a>
                <a href="#stories" class="mobile-link">스토리</a>
                <a href="#download" class="mobile-link mobile-cta">다운로드</a>
            `;
            navbar.appendChild(mobileMenu);
            
            // Animate hamburger to X
            mobileToggle.classList.add('active');
            
            // Add click listeners to mobile links
            document.querySelectorAll('.mobile-link').forEach(link => {
                link.addEventListener('click', () => {
                    closeMobileMenu();
                });
            });
        } else {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.remove();
    }
    mobileToggle.classList.remove('active');
    isMenuOpen = false;
}

// Animated Counter for Stats
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const value = stat.textContent.replace(/,/g, '');
                const isDecimal = value.includes('.');
                
                if (isDecimal) {
                    // For ratings like 4.8
                    const finalValue = parseFloat(value);
                    let currentValue = 0;
                    const increment = finalValue / 50;
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            currentValue = finalValue;
                            clearInterval(timer);
                        }
                        stat.textContent = currentValue.toFixed(1);
                    }, 30);
                } else {
                    // For whole numbers
                    animateValue(stat, 0, parseInt(value), 2000);
                }
            });
        }
    });
}, observerOptions);

// Observe hero stats
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Typing Animation for Hero Title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    heroTitle.style.opacity = '1';
}

// Parallax Effect for Floating Cards
const floatingCards = document.querySelectorAll('.floating-card');

if (floatingCards.length > 0) {
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        floatingCards.forEach((card, index) => {
            const depth = (index + 1) * 0.5;
            const moveX = mouseX * depth * 20;
            const moveY = mouseY * depth * 20;
            
            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Collaboration Animation Enhancement
const collabAnimation = document.querySelector('.collab-animation');
if (collabAnimation) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(collabAnimation);
}

// Add Mobile Menu Styles Dynamically
const style = document.createElement('style');
style.textContent = `
    .mobile-menu {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: white;
        padding: var(--spacing-lg);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        animation: slideDown 0.3s ease;
        z-index: 999;
    }
    
    .mobile-link {
        color: var(--text-dark);
        text-decoration: none;
        font-weight: 500;
        padding: var(--spacing-sm);
        transition: var(--transition-fast);
    }
    
    .mobile-link:hover {
        background: var(--secondary-off-white);
        border-radius: 8px;
    }
    
    .mobile-cta {
        background: var(--primary-purple);
        color: white;
        text-align: center;
        border-radius: 8px;
    }
    
    .mobile-cta:hover {
        background: var(--primary-purple-light);
    }
    
    .nav-mobile-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-mobile-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-mobile-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .collab-animation.active .writer-1 {
        animation: slideInLeft 0.8s ease forwards;
    }
    
    .collab-animation.active .writer-2 {
        animation: slideInRight 0.8s ease 0.3s forwards;
    }
    
    .collab-animation.active .completed-work {
        animation: fadeInUp 0.8s ease 0.6s forwards;
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
`;

document.head.appendChild(style);

// Handle Download Button Clicks
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Track download attempt (you can add analytics here)
        console.log('App Store download clicked');
        
        // Redirect to App Store (replace with actual App Store URL when available)
        // window.location.href = 'https://apps.apple.com/app/unfinishedvault';
        
        // For now, show a message
        const message = document.createElement('div');
        message.className = 'download-message';
        message.textContent = '앱 스토어 페이지 준비 중입니다';
        message.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary-dark);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 10000;
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    });
});

// Add slideUp animation
const slideUpStyle = document.createElement('style');
slideUpStyle.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
`;
document.head.appendChild(slideUpStyle);

// Lazy Loading Images (Performance Optimization)
const images = document.querySelectorAll('img');
const imageOptions = {
    threshold: 0,
    rootMargin: '0px 0px 50px 0px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        }
    });
}, imageOptions);

images.forEach(img => {
    if (img.dataset.src) {
        imageObserver.observe(img);
    }
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});