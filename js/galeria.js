// ========================================
// GALERIA.JS - Swiper Gallery
// ========================================

// Lista de fotos (Opção B - Manual)
const fotos = [
    'assets/fotos/0f3019de-9ceb-4abd-90fa-b496424032ab.jpg',
    'assets/fotos/0fc75b03-3883-4ef7-a311-7bdea3565242.jpg',
    'assets/fotos/1efe31e6-2e21-486e-b4fb-8b87387132a4.jpg',
    'assets/fotos/232beb3b-b9a4-4b52-a92c-e5dd60c0730d.jpg',
    'assets/fotos/2e41c66d-e0cb-45c9-b32c-c675af907af4.jpg',
    'assets/fotos/748e698a-530b-42b8-827c-77790d60649e.jpg',
    'assets/fotos/82e2e00b-1a23-4cec-86fe-0e8ae4648964.jpg',
    'assets/fotos/8773f8f8-11ce-4b5b-9ceb-20b0fa56c460.jpg',
    'assets/fotos/93d3d706-89e9-40c4-ac4d-945f22d6c90b.jpg',
    'assets/fotos/982be06c-d89e-4ee0-bd2b-4d9ee95f8502.jpg',
    'assets/fotos/c5da9126-f469-454b-868f-31a9a90ec4c6.jpg',
    'assets/fotos/f33f57d9-525e-4b78-bd77-36d75719d6c0.jpg',
    'assets/fotos/f7a79349-0c62-459f-9321-399d8a31edcb.jpg'
];

// Inicializar Swiper
const gallerySwiper = new Swiper('.gallerySwiper', {
    loop: true,
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
