// ========================================
// APP.JS - Lógica Geral & Utilitários
// ========================================

let blocos = [];

// Carregar dados dos blocos
async function loadBlocos() {
    try {
        const response = await fetch('data/blocos_por_data.json');
        const data = await response.json();
        
        // Flatten blocos_por_data em um array único
        blocos = [];
        for (const data_key in data.blocos_por_data) {
            blocos = blocos.concat(data.blocos_por_data[data_key]);
        }
        
        // Sort automático: primeiro por data, depois por favorito (true primeiro)
        blocos.sort((a, b) => {
            const dateA = new Date(a.data.split('/').reverse().join('-'));
            const dateB = new Date(b.data.split('/').reverse().join('-'));
            
            // Primeiro ordena por data
            if (dateA !== dateB) {
                return dateA - dateB;
            }
            
            // Se a data for igual, ordena por favorito (true first)
            return b.favorito - a.favorito;
        });
        
        return blocos;
    } catch (error) {
        console.error('Erro ao carregar blocos:', error);
        return [];
    }
}

// Utilitário: Extrair valores únicos de um campo
function getUnique(field) {
    const unique = new Set();
    blocos.forEach(bloco => {
        if (bloco[field]) {
            unique.add(bloco[field]);
        }
    });
    return Array.from(unique).sort();
}

// Utilitário: Filtrar blocos por critérios
function filterBlocos(filters = {}) {
    return blocos.filter(bloco => {
        // Filtro: período
        if (filters.periodo && filters.periodo.length > 0) {
            if (!filters.periodo.includes(bloco.periodo)) return false;
        }

        // Filtro: data
        if (filters.data && filters.data.length > 0) {
            if (!filters.data.includes(bloco.data)) return false;
        }

        // Filtro: bairro
        if (filters.bairro && filters.bairro.length > 0) {
            if (!filters.bairro.includes(bloco.bairro)) return false;
        }

        // Filtro: lotação
        if (filters.lotacao && filters.lotacao.length > 0) {
            if (!filters.lotacao.includes(bloco.lotacao)) return false;
        }

        return true;
    });
}

// Inicializar ao carregar página
document.addEventListener('DOMContentLoaded', async () => {
    await loadBlocos();
    initScrollToTopButton();
    initCreditosModal();
});

// Função: Inicializar Modal de Créditos
function initCreditosModal() {
    const btnCreditos = document.getElementById('btnCreditos');
    const modalCreditos = document.getElementById('modalCreditos');
    const btnCloseModal = document.getElementById('btnCloseModal');

    if (!btnCreditos || !modalCreditos || !btnCloseModal) return;

    // Abrir modal
    btnCreditos.addEventListener('click', () => {
        modalCreditos.classList.add('active');
    });

    // Fechar modal ao clicar no botão de fechar
    btnCloseModal.addEventListener('click', () => {
        modalCreditos.classList.remove('active');
    });

    // Fechar modal ao clicar fora do conteúdo (apenas uma vez)
    const handleOutsideClick = (event) => {
        if (event.target === modalCreditos) {
            modalCreditos.classList.remove('active');
        }
    };
    window.addEventListener('click', handleOutsideClick);
}

// Função: Controlar visibilidade do botão scroll-to-top
function initScrollToTopButton() {
    const btnScrollTop = document.getElementById('btnScrollTop');
    if (!btnScrollTop) return;

    if (window.feather) {
        feather.replace();
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btnScrollTop.classList.add('show');
        } else {
            btnScrollTop.classList.remove('show');
        }
    });
}

// Função: Scroll para o topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
