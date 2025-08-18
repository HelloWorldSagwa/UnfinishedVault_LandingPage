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
                <a href="index.html#features" class="mobile-link">기능</a>
                <a href="index.html#how-it-works" class="mobile-link">사용법</a>
                <a href="index.html#stories" class="mobile-link">스토리</a>
                <a href="blog.html" class="mobile-link active">개발블로그</a>
                <a href="index.html#download" class="mobile-link mobile-cta">다운로드</a>
            `;
            navbar.appendChild(mobileMenu);
            
            // Animate hamburger to X
            mobileToggle.classList.add('active');
            
            // Add click listeners to mobile links
            document.querySelectorAll('.mobile-link').forEach(link => {
                link.addEventListener('click', () => {
                    if (!link.getAttribute('href').startsWith('#')) {
                        // Don't close menu for external links
                        return;
                    }
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

// Add Mobile Menu Styles
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
    
    .mobile-link:hover,
    .mobile-link.active {
        background: var(--secondary-off-white);
        border-radius: 8px;
    }
    
    .mobile-link.active {
        color: var(--primary-purple);
        font-weight: 600;
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
`;

document.head.appendChild(style);

// Page Load Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});