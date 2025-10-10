document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-out'
    });

    // Initialize all videos
    const allVideos = document.querySelectorAll('video');

    // Setup all videos to autoplay
    allVideos.forEach(video => {
        // Configurar vídeo
        video.muted = true;
        
        // Tentar reproduzir quando carregar
        video.addEventListener('loadedmetadata', () => {
            video.play().catch(error => {
                console.log("Video autoplay failed:", error);
            });
        });

        // Se já estiver carregado, tentar reproduzir
        if (video.readyState >= 2) {
            video.play().catch(error => {
                console.log("Video autoplay failed:", error);
            });
        }

        // Loop quando terminar
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });

        // Aguardar o delay antes de iniciar
        setTimeout(() => {
            // Try to play when video is loaded
            if (video.readyState >= 2) {
                startVideo();
            } else {
                video.addEventListener('loadedmetadata', startVideo);
            }
        }, delay);

        // Loop the video when it ends
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
        });
    });

    // Fixed Contact Button animation
    const fixedContactBtn = document.getElementById('fixed-contact-btn');
    if (fixedContactBtn) {
        setTimeout(() => {
            fixedContactBtn.style.display = 'inline-flex';
        }, 500);
    }

    // Smooth scroll for navigation links
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
});