const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navOverlay = document.getElementById('nav-overlay');

function openMenu() {
    if (navMenu && navOverlay) {
        navMenu.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMenu() {
    if (navMenu && navOverlay) {
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', openMenu);
}

if (navClose) {
    navClose.addEventListener('click', closeMenu);
}

if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
}

if (navMenu) {
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

const accordionToggles = document.querySelectorAll('.accordion-toggle');
accordionToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        const content = this.nextElementSibling;
        content.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-chevron-up');
        icon.classList.toggle('fa-chevron-down');
    });
});

const servicesToggle = document.querySelector('.accordion-toggle-services');
if (servicesToggle) {
    servicesToggle.addEventListener('click', function() {
        const content = this.nextElementSibling;
        content.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-chevron-up');
        icon.classList.toggle('fa-chevron-down');
    });
}

const carouselSlides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;

function showSlide(index) {
    carouselSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselSlides.length;
    showSlide(currentSlide);
}

let carouselInterval = setInterval(nextSlide, 5000);

const heroCarousel = document.querySelector('.hero-carousel');
if (heroCarousel) {
    heroCarousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    heroCarousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextSlide, 5000);
    });
}

if (window.innerWidth <= 768) {
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        const cards = servicesGrid.querySelectorAll('.service-card');
        if (cards.length > 0) {
            let currentIndex = 0;
            const cardWidth = cards[0].offsetWidth + 20; 
            let servicesInterval = setInterval(slideNext, 3000);
            let idleTimer;

            function slideNext() {
                currentIndex++;
                if (currentIndex >= cards.length) {
                    currentIndex = 0;
                    servicesGrid.scrollTo({ left: 0, behavior: 'auto' });
                } else {
                    servicesGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
                }
            }

            function pauseAutoScroll() {
                clearInterval(servicesInterval);
                clearTimeout(idleTimer);
                idleTimer = setTimeout(() => {
                    servicesInterval = setInterval(slideNext, 3000);
                }, 5000); // Resume after 5 seconds of idle
            }

            servicesGrid.addEventListener('scroll', pauseAutoScroll);
            servicesGrid.addEventListener('touchstart', pauseAutoScroll);
            servicesGrid.addEventListener('touchmove', pauseAutoScroll);
            servicesGrid.addEventListener('touchend', pauseAutoScroll);
            servicesGrid.addEventListener('mousedown', pauseAutoScroll);
            servicesGrid.addEventListener('mousemove', pauseAutoScroll);
            servicesGrid.addEventListener('mouseup', pauseAutoScroll);
        }
    }
}

AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const form = document.getElementById('booking-form');
    const formData = new FormData(form);

    const name = formData.get('name');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');

    if (!name || !phone || !service || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    const whatsappMessage = `New Contact Request:\n\nName: ${name}\nPhone: ${phone}\nService Needed: ${service}\nMessage: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = '233547317781';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    console.log('Form Data:', { name, phone, service, message });
    console.log('WhatsApp URL:', whatsappURL);

    window.open(whatsappURL, '_blank');

    const formMessage = document.getElementById('form-message');
    formMessage.classList.add('success');
    formMessage.innerText = 'Form submitted! Redirecting to WhatsApp...';
    
    form.reset();
    
    setTimeout(() => {
      formMessage.innerText = '';
      formMessage.classList.remove('success');
    }, 3000);
});