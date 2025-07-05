// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Add smooth scrolling behavior to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth < 768) {
                    mobileMenu.classList.add('hidden');
                    updateMobileMenuIcon(false);
                }
            }
        });
    });
    
    // Mobile menu toggle functionality
    let mobileMenuOpen = false;
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenuOpen = !mobileMenuOpen;
        
        if (mobileMenuOpen) {
            mobileMenu.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
        }
        
        updateMobileMenuIcon(mobileMenuOpen);
    });
    
    function updateMobileMenuIcon(isOpen) {
        const icon = mobileMenuButton.querySelector('i');
        if (isOpen) {
            icon.className = 'fas fa-times text-xl';
        } else {
            icon.className = 'fas fa-bars text-xl';
        }
    }
    
    // Active navigation highlighting
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.querySelector('nav').offsetHeight;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update navigation links
        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === currentSection) {
                link.classList.add('text-blue-600', 'font-semibold');
            } else {
                link.classList.remove('text-blue-600', 'font-semibold');
            }
        });
    }
    
    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Initial call to set active navigation
    updateActiveNavigation();
    
    // Download Resume button functionality
    const downloadButton = document.querySelector('button:has(i.fa-download)');
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            // Placeholder functionality - would typically trigger actual resume download
            alert('Resume download functionality would be implemented here. Please contact for resume.');
        });
    }
    
    // Add scroll animations for cards and sections
    function addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);
        
        // Observe all cards and sections for animation
        const animatedElements = document.querySelectorAll('.bg-white, .bg-gray-50, .bg-gradient-to-br');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Initialize scroll animations
    addScrollAnimations();
    
    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            mobileMenu.classList.add('hidden');
            mobileMenuOpen = false;
            updateMobileMenuIcon(false);
        }
    });
    
    // Add hover effects to skill items
    const skillItems = document.querySelectorAll('.space-y-3 li');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('transform', 'translate-x-2', 'transition-transform', 'duration-200');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('transform', 'translate-x-2');
        });
    });
    
    // Add typing effect to main heading (optional enhancement)
    function addTypingEffect() {
        const heading = document.querySelector('h1');
        if (heading && heading.textContent === 'Sarfaraz Alam') {
            const text = heading.textContent;
            heading.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heading.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Start typing effect after a short delay
            setTimeout(typeWriter, 500);
        }
    }
    
    // Uncomment to enable typing effect
    // addTypingEffect();
});

// Add scroll-to-top functionality
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        if (!document.getElementById('scroll-to-top')) {
            const scrollButton = document.createElement('button');
            scrollButton.id = 'scroll-to-top';
            scrollButton.className = 'fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 z-50';
            scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
            
            scrollButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            document.body.appendChild(scrollButton);
        }
    } else {
        const scrollButton = document.getElementById('scroll-to-top');
        if (scrollButton) {
            scrollButton.remove();
        }
    }
});
