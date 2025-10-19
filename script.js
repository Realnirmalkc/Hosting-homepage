// =======================
//   JavaScript (script.js)
// =======================

document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Functionality ---
    const navbarContainer = document.querySelector('.navbar-container');
    const navLinks = document.querySelector('.nav-links');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const allNavLinks = document.querySelectorAll('.nav-link');

    // Toggle Mobile Menu
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Optional: prevent scrolling when menu is open
    });

    // Close mobile menu when a link is clicked
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
            // Remove 'active' from all links and add to clicked one
            allNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });


    // Navbar sticky and background change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adjust scroll threshold as needed
            navbarContainer.classList.add('scrolled');
        } else {
            navbarContainer.classList.remove('scrolled');
        }

        // Highlight active nav link based on scroll position
        highlightActiveNavLink();
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animated-element');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Testimonial Carousel Functionality ---
    const carousel = document.querySelector('.testimonial-carousel');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentIndex = 0;

    // Create navigation buttons (optional, can be in HTML)
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('carousel-nav-btn', 'prev');
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    carousel.parentElement.insertBefore(prevBtn, carousel); // Insert before carousel element

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('carousel-nav-btn', 'next');
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    carousel.parentElement.appendChild(nextBtn); // Insert after carousel element

    function showTestimonial(index) {
        testimonialItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
        // For actual sliding, you'd adjust `carousel.style.transform = translateX(-${index * 100}%)`
        // and ensure `testimonial-carousel` has `display: flex` and `overflow: hidden`.
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialItems.length - 1;
        showTestimonial(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < testimonialItems.length - 1) ? currentIndex + 1 : 0;
        showTestimonial(currentIndex);
    });

    // Initial show
    showTestimonial(currentIndex);

    // Auto-advance carousel (optional)
    setInterval(() => {
        currentIndex = (currentIndex < testimonialItems.length - 1) ? currentIndex + 1 : 0;
        showTestimonial(currentIndex);
    }, 8000); // Change testimonial every 8 seconds

    // --- Active Nav Link on Scroll ---
    function highlightActiveNavLink() {
        const scrollPos = window.scrollY + 100; // Offset for fixed header
        document.querySelectorAll('section').forEach(section => {
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    // Call once on load
    highlightActiveNavLink();


    // --- Hero Section Particle Animation (Conceptual) ---
    // For actual implementation, you would use a library like particles.js, Three.js, or write custom canvas drawing code here.
    // Example: (simplified concept)
    const heroCanvas = document.querySelector('.hero-animation-canvas');
    if (heroCanvas) {
        // const ctx = heroCanvas.getContext('2d');
        // heroCanvas.width = window.innerWidth;
        // heroCanvas.height = window.innerHeight;

        // Function to draw particles, update positions, etc.
        // let particles = [];
        // function animateParticles() {
        //     ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
        //     // Draw and update each particle
        //     particles.forEach(p => {
        //         p.x += p.vx;
        //         p.y += p.vy;
        //         // ... boundary checks, color changes ...
        //         // ctx.beginPath();
        //         // ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        //         // ctx.fillStyle = p.color;
        //         // ctx.fill();
        //     });
        //     requestAnimationFrame(animateParticles);
        // }
        // // Initialize particles
        // // animateParticles();

        console.log("Hero section animation canvas ready. (Requires dedicated JS for drawing animation)");
    }

});
