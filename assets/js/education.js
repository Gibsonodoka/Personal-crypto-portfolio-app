document.addEventListener('DOMContentLoaded', function() {
    // Course enrollment click handler
    const courseCards = document.querySelectorAll('.course-card');
    const enrollButtons = document.querySelectorAll('.course-card .btn');
    const paymentModal = document.getElementById('paymentModal');
    const modalClose = document.querySelector('.modal-close');
    const copyBtn = document.querySelector('.copy-btn');
    const cryptoMethods = document.querySelectorAll('.crypto-method');
    
    // Course data with multiple payment options
    const courses = {
        foundations: {
            title: "Crypto Foundations",
            prices: {
                eth: "0.05 ETH",
                btc: "0.002 BTC",
                usdt: "150 USDT",
                sol: "3.5 SOL"
            },
            addresses: {
                eth: "0x7f268357A8c2552623316e2562D90e642bB538E3",
                btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
                usdt: "TNPeeaaFB7K6ToQY5eH6qTp27QkU7RofXz",
                sol: "HN5XQ7BZ6X2X2Q7X2X2Q7X2X2Q7X2X2Q7X2X2Q7"
            }
        },
        technical: {
            title: "Technical Analysis Pro",
            prices: {
                eth: "0.1 ETH",
                btc: "0.004 BTC",
                usdt: "300 USDT",
                sol: "7 SOL"
            },
            addresses: {
                eth: "0x7f268357A8c2552623316e2562D90e642bB538E3",
                btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
                usdt: "TNPeeaaFB7K6ToQY5eH6qTp27QkU7RofXz",
                sol: "HN5XQ7BZ6X2X2Q7X2X2Q7X2X2Q7X2X2Q7X2X2Q7"
            }
        },
        algo: {
            title: "Algorithmic Trading",
            prices: {
                eth: "0.15 ETH",
                btc: "0.006 BTC",
                usdt: "450 USDT",
                sol: "10.5 SOL"
            },
            addresses: {
                eth: "0x7f268357A8c2552623316e2562D90e642bB538E3",
                btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
                usdt: "TNPeeaaFB7K6ToQY5eH6qTp27QkU7RofXz",
                sol: "HN5XQ7BZ6X2X2Q7X2X2Q7X2X2Q7X2X2Q7X2X2Q7"
            }
        },
        mentorship: {
            title: "1-on-1 Mentorship",
            prices: {
                eth: "0.5 ETH",
                btc: "0.02 BTC",
                usdt: "1500 USDT",
                sol: "35 SOL"
            },
            addresses: {
                eth: "0x7f268357A8c2552623316e2562D90e642bB538E3",
                btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
                usdt: "TNPeeaaFB7K6ToQY5eH6qTp27QkU7RofXz",
                sol: "HN5XQ7BZ6X2X2Q7X2X2Q7X2X2Q7X2X2Q7X2X2Q7"
            }
        }
    };
    
    // Function to open modal with course data
    function openModal(courseId) {
        const course = courses[courseId];
        const currentMethod = document.querySelector('.crypto-method.active')?.getAttribute('data-method') || 'eth';
        
        document.getElementById('modalCourseTitle').textContent = course.title;
        document.getElementById('modalCoursePrice').textContent = course.prices[currentMethod];
        document.getElementById('cryptoAddress').textContent = course.addresses[currentMethod];
        document.querySelector('.copy-btn').setAttribute('data-address', course.addresses[currentMethod]);
        
        // Update QR code
        document.getElementById('qrCodeImage').src = 
            `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${course.addresses[currentMethod]}`;
        
        paymentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Open modal when course card or button is clicked
    courseCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn')) {
                const courseId = this.getAttribute('data-course');
                openModal(courseId);
            }
        });
    });
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseId = this.closest('.course-card').getAttribute('data-course');
            openModal(courseId);
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', function() {
        paymentModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Click outside modal to close
    paymentModal.addEventListener('click', function(e) {
        if (e.target === this) {
            paymentModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Switch between crypto methods
    cryptoMethods.forEach(method => {
        method.addEventListener('click', function() {
            cryptoMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            const courseTitle = document.getElementById('modalCourseTitle').textContent;
            const courseId = Object.keys(courses).find(key => courses[key].title === courseTitle);
            
            if (courseId) {
                const methodType = this.getAttribute('data-method');
                const course = courses[courseId];
                
                document.getElementById('modalCoursePrice').textContent = course.prices[methodType];
                document.getElementById('cryptoAddress').textContent = course.addresses[methodType];
                document.querySelector('.copy-btn').setAttribute('data-address', course.addresses[methodType]);
                
                // Update QR code
                document.getElementById('qrCodeImage').src = 
                    `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${course.addresses[methodType]}`;
            }
        });
    });
    
    // Copy address functionality
    copyBtn.addEventListener('click', function() {
        const address = this.getAttribute('data-address');
        navigator.clipboard.writeText(address).then(() => {
            const icon = this.querySelector('i');
            icon.classList.remove('fa-copy');
            icon.classList.add('fa-check');
            
            setTimeout(() => {
                icon.classList.remove('fa-check');
                icon.classList.add('fa-copy');
            }, 2000);
        });
    });
    
    // Form submission
    document.getElementById('verifyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Payment verification submitted! You will receive an email with course access shortly.');
        paymentModal.classList.remove('active');
        document.body.style.overflow = '';
        this.reset();
    });
});