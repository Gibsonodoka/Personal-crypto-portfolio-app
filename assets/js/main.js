document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const html = document.documentElement;
    const header = document.querySelector('.header');
    const contactForm = document.querySelector('.contact-form');
    
    // Mobile Menu Functionality
    function toggleMobileMenu() {
        navList.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.toggle('fa-times');
        icon.classList.toggle('fa-bars');
        
        // Toggle body scroll when menu is open
        if (navList.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (navList.classList.contains('active')) {
                toggleMobileMenu();
            }
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });
    
    // Theme Management
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
    
    // Initialize theme
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme(systemPrefersDark ? 'dark' : 'light');
        }
    }
    
    initTheme();
    
    // Theme toggle event
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    // Header scroll effect
    function updateHeader() {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow)';
        } else {
            header.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Initialize on load
    
    // Copyright year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Form submission handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message (in a real app, you'd want to handle errors too)
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Intersection Observer for scroll animations
    const animateElements = () => {
        const elements = document.querySelectorAll(
            '.hero-content, .hero-image, .service-card, .about-image, .about-content, .contact-info, .contact-form'
        );
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    };
    
    // CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize animations
    animateElements();
    
    // Rotating Text Animation for Hero Section
    function initRotatingText() {
        const textElement = document.getElementById('rotating-text');
        const cursor = document.querySelector('.typewriter-cursor');
        
        if (!textElement) return;
        
        const messages = [
            {
                text: "Welcome, I'm <span class='text-highlight'>Selena Marte, a Crypto trader</span>",
                speed: 110,
                pause: 2000
            },
            {
                text: "Crypto Trading <span class='text-highlight'>Perfected</span>",
                speed: 100,
                pause: 2500
            },
            {
                text: "Algorithmic <span class='text-highlight'>Strategies</span>",
                speed: 90,
                pause: 2000
            },
            {
                text: "Smart <span class='text-highlight'>Risk Management</span>",
                speed: 90,
                pause: 2000
            }
        ];
        
        let currentMessage = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let text = '';
        let pauseComplete = false;
        
        function type() {
            const fullText = messages[currentMessage].text;
            typingSpeed = isDeleting ? 50 : messages[currentMessage].speed;
            
            if (isDeleting) {
                text = fullText.substring(0, text.length - 1);
            } else {
                text = fullText.substring(0, text.length + 1);
            }
            
            textElement.innerHTML = text;
            
            if (!isDeleting && text === fullText) {
                typingSpeed = messages[currentMessage].pause;
                isDeleting = true;
                pauseComplete = true;
            } else if (isDeleting && text === '') {
                isDeleting = false;
                currentMessage = (currentMessage + 1) % messages.length;
                typingSpeed = 500; // pause before starting next message
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start the animation after a small delay
        setTimeout(type, 1000);
        
        // Hide cursor when not typing (during pauses)
        setInterval(() => {
            cursor.style.visibility = pauseComplete ? 'hidden' : 'visible';
            pauseComplete = false;
        }, 100);
    }
    
    // Initialize rotating text
    initRotatingText();
    
    // Debounce function for scroll/resize events
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

        // TradingView Charts
    function loadTradingViewWidgets() {
        // Bitcoin Chart
        new TradingView.widget({
            "autosize": true,
            "symbol": "BINANCE:BTCUSDT",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": html.getAttribute('data-theme'),
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "hide_top_toolbar": true,
            "hide_side_toolbar": false,
            "allow_symbol_change": true,
            "container_id": "btc-chart"
        });

        // Ethereum Chart
        new TradingView.widget({
            "autosize": true,
            "symbol": "BINANCE:ETHUSDT",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": html.getAttribute('data-theme'),
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "hide_top_toolbar": true,
            "hide_side_toolbar": false,
            "allow_symbol_change": true,
            "container_id": "eth-chart"
        });

        // Market Overview
        new TradingView.widget({
            "autosize": true,
            "symbolsGroups": [
                {
                    "name": "Cryptocurrencies",
                    "originalName": "Cryptocurrencies",
                    "symbols": [
                        { "name": "BITSTAMP:BTCUSD" },
                        { "name": "BINANCE:ETHUSDT" },
                        { "name": "BINANCE:BNBUSDT" },
                        { "name": "BINANCE:SOLUSDT" },
                        { "name": "BINANCE:XRPUSDT" }
                    ]
                }
            ],
            "colorTheme": html.getAttribute('data-theme'),
            "isTransparent": false,
            "showSymbolLogo": true,
            "locale": "en",
            "container_id": "market-overview"
        });
    }

    // Load TradingView script dynamically
    function loadTradingView() {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.onload = () => {
            loadTradingViewWidgets();
            // Update theme when changed
            themeToggle.addEventListener('click', () => {
                setTimeout(loadTradingViewWidgets, 300);
            });
        };
        document.head.appendChild(script);
    }

    // Fetch market data
    async function fetchMarketData() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/global');
            const data = await response.json();
            
            document.getElementById('btc-dominance').textContent = 
                data.data.market_cap_percentage.btc.toFixed(1) + '%';
            document.getElementById('total-marketcap').textContent = 
                Math.round(data.data.total_market_cap.usd / 1000000000);
            
            // Fetch Ethereum gas price
            const ethResponse = await fetch('https://api.etherscan.io/api?module=gastracker&action=gasoracle');
            const ethData = await ethResponse.json();
            document.getElementById('eth-gas').textContent = ethData.result.ProposeGasPrice;
        } catch (error) {
            console.error('Error fetching market data:', error);
        }
    }

    // Initialize charts and market data
    loadTradingView();
    fetchMarketData();


    // Timeline animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(item);
    });
}

animateTimeline();

// Animate skills progress bars
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-width');
                progressBar.style.width = targetWidth;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}


animateSkills();
    
    // Handle window resize
    window.addEventListener('resize', debounce(function() {
        // Close mobile menu if screen is resized to desktop
        if (window.innerWidth > 768 && navList.classList.contains('active')) {
            toggleMobileMenu();
        }
    }));
});