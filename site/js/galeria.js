// ========================================
// GALERIA.JS - Swiper Gallery
// ========================================

// Lista de fotos (Opção B - Manual)
const fotos = [
    'assets/fotos/IMG_2727.jpg',
    'assets/fotos/IMG_2729.jpg',
    'assets/fotos/IMG_2741.jpg',
    'assets/fotos/IMG_2744.jpg',
    'assets/fotos/IMG_6042.jpg',
    'assets/fotos/IMG_6046.jpg'
];

// Inicializar Swiper
const gallerySwiper = new Swiper('.gallerySwiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 500
});

// Preencher slides com as fotos
function renderGallerySlides() {
    const wrapper = document.querySelector('.swiper-wrapper');
    wrapper.innerHTML = '';
    
    fotos.forEach(foto => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `<img src="${foto}" alt="Carnaval" loading="lazy">`;
        wrapper.appendChild(slide);
    });
    
    // Reinitializar após adicionar slides
    gallerySwiper.update();
}

// Render ao carregar página
document.addEventListener('DOMContentLoaded', () => {
    renderGallerySlides();
    feather.replace();
    initScrollToTopButton();
});
