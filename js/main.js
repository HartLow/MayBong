// Main JavaScript file for Mây Bồng website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialize Vanilla Tilt for 3D hover effect
    VanillaTilt.init(document.querySelectorAll(".img-tilt"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounter = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounter, 1);
            } else {
                counter.innerText = target.toLocaleString();
            }
        });
    };

    // Start counter animation when in viewport
    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounter();
                observer.unobserve(counterSection);
            }
        }, { threshold: 0.5 });
        
        observer.observe(counterSection);
    }

    // Mobile menu toggle
    const setupMobileMenu = () => {
        const header = document.querySelector('header');
        if (!header) return;

        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-btn')) {
            const nav = document.querySelector('nav');
            const mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn';
            mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            header.querySelector('.container').insertBefore(mobileBtn, nav);

            mobileBtn.addEventListener('click', function() {
                nav.classList.toggle('active');
                this.innerHTML = nav.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
        }
    };

    // Smooth scrolling for anchor links
    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Parallax effect for hero section
    const setupParallax = () => {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    };

    // Sticky header on scroll with animation
    const setupStickyHeader = () => {
        const header = document.querySelector('header');
        if (!header) return;

        const sticky = header.offsetTop;

        const makeHeaderSticky = () => {
            if (window.pageYOffset > 100) {
                header.classList.add('sticky');
                header.style.padding = '10px 0';
            } else {
                header.classList.remove('sticky');
                header.style.padding = '15px 0';
            }
        };

        window.addEventListener('scroll', makeHeaderSticky);
    };

    // Newsletter form submission with animation
    const setupNewsletterForm = () => {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Create success message with animation
                const formContainer = this.closest('.newsletter-section');
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3 animate__animated animate__fadeIn';
                successMessage.innerHTML = 'Cảm ơn bạn đã đăng ký nhận thông tin từ Mây Bồng!';
                
                this.appendChild(successMessage);
                emailInput.value = '';
                
                // Remove message after 3 seconds
                setTimeout(() => {
                    successMessage.classList.remove('animate__fadeIn');
                    successMessage.classList.add('animate__fadeOut');
                    
                    setTimeout(() => {
                        successMessage.remove();
                    }, 1000);
                }, 3000);
            }
        });
    };

    // Add hover effects to product cards
    const setupProductCardEffects = () => {
        const cards = document.querySelectorAll('.product-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.querySelector('.card-overlay').style.opacity = '1';
                this.querySelector('.overlay-content').style.transform = 'translateY(0)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.querySelector('.card-overlay').style.opacity = '0';
                this.querySelector('.overlay-content').style.transform = 'translateY(20px)';
            });
        });
    };

    // Bubble animation for hero section
    const setupBubbleAnimation = () => {
        const bubbles = document.querySelectorAll('.bubble');
        
        bubbles.forEach(bubble => {
            // Random starting position
            const randomX = Math.random() * 100;
            bubble.style.left = `${randomX}%`;
            
            // Random animation duration
            const randomDuration = 5 + Math.random() * 10;
            bubble.style.animationDuration = `${randomDuration}s`;
            
            // Random delay
            const randomDelay = Math.random() * 5;
            bubble.style.animationDelay = `${randomDelay}s`;
        });
    };

    // Initialize all functionality
    setupMobileMenu();
    setupSmoothScroll();
    setupParallax();
    setupProductCardEffects();
    setupStickyHeader();
    setupNewsletterForm();
    setupBubbleAnimation();
});
