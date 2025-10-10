document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-out'
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu functionality
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            const nav = document.querySelector('nav');
            nav.classList.toggle('menu-open');
        });
    }
});

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
const magneticElements = document.querySelectorAll('.magnetic');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

magneticElements.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        cursor.classList.add('hover');
    });

    elem.addEventListener('mouseleave', () => {
        elem.style.transform = '';
        cursor.classList.remove('hover');
    });
});

// Progress bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.progress-bar').style.transform = `scaleX(${scrolled / 100})`;
});

// Parallax effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(elem => {
        const speed = elem.dataset.speed || 0.5;
        elem.style.setProperty('--parallax-offset', `${window.scrollY * speed}px`);
    });
});

// Split text animation
const splitTextElements = document.querySelectorAll('.split-text');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

splitTextElements.forEach(elem => {
    const text = elem.textContent;
    elem.textContent = '';
    [...text].forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        elem.appendChild(span);
    });
    observer.observe(elem);
});

// Gallery items data
const galleryItems = [
    {
        image: 'placeholder1.jpg',
        title: 'Natureza',
        description: 'Fotografia de paisagem',
        category: 'landscape'
    },
    {
        image: 'placeholder2.jpg',
        title: 'Retratos',
        description: 'Ensaio fotográfico',
        category: 'portrait'
    },
    {
        image: 'placeholder3.jpg',
        title: 'Eventos',
        description: 'Cobertura de eventos',
        category: 'event'
    },
    // Add more items as needed
];

// Populate gallery with animation
const gallery = document.getElementById('gallery');

if (gallery) {
    galleryItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item bg-glass backdrop-blur-sm rounded-lg overflow-hidden';
        galleryItem.setAttribute('data-aos', 'fade-up');
        galleryItem.setAttribute('data-aos-delay', `${index * 100}`);
        galleryItem.innerHTML = `
            <img src="${item.image}" 
                 alt="${item.title}" 
                 class="w-full h-80 object-cover lazy"
                 loading="lazy">
            <div class="p-6">
                <h3 class="text-2xl font-display mb-2 text-gold">${item.title}</h3>
                <p class="text-gray-300">${item.description}</p>
            </div>
        `;
        gallery.appendChild(galleryItem);
    });
}

// Mobile menu with animation
const menuBtn = document.getElementById('menu-btn');
const nav = document.querySelector('nav');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu fixed w-full bg-glass backdrop-blur-md py-4 px-6 top-[72px] left-0 md:hidden';
        mobileMenu.innerHTML = `
            <a href="#portfolio" class="block py-3 hover:text-gold transition-colors">Portfólio</a>
            <a href="#showreel" class="block py-3 hover:text-gold transition-colors">Showreel</a>
            <a href="#about" class="block py-3 hover:text-gold transition-colors">Sobre</a>
            <a href="#contact" class="block py-3 hover:text-gold transition-colors">Contato</a>
        `;

        const existingMenu = document.querySelector('.mobile-menu');
        if (existingMenu) {
            existingMenu.remove();
        } else {
            document.body.appendChild(mobileMenu);
            setTimeout(() => mobileMenu.classList.add('active'), 0);
        }
    });
}

// Enhanced contact form
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Clear form
            contactForm.reset();
            
            // Show success message
            submitBtn.textContent = 'Mensagem Enviada!';
            submitBtn.classList.add('bg-green-500');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('bg-green-500');
                submitBtn.disabled = false;
            }, 2000);
            
        } catch (error) {
            submitBtn.textContent = 'Erro ao enviar';
            submitBtn.classList.add('bg-red-500');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('bg-red-500');
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

// Lazy loading with animation
const lazyImages = document.querySelectorAll('img.lazy');

const lazyLoad = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.disconnect();
            }
        });
    });

    io.observe(target);
};

lazyImages.forEach(lazyLoad);

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});