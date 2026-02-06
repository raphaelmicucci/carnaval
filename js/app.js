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
    initCountdown();
    initCreditosModal();
    initMacetandoButton();
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

// Função: Inicializar Botão Macetando
function initMacetandoButton() {
    const btnMacetando = document.getElementById('btnMacetando');
    const spotifyEmbed = document.getElementById('spotifyEmbed');
    
    if (!btnMacetando || !spotifyEmbed) return;

    btnMacetando.addEventListener('click', () => {
        spotifyEmbed.classList.toggle('hidden');
    });
}

// Função: Inicializar Countdown
function initCountdown() {
    const container = document.getElementById('countdown-container');
    if (!container) return;

    // Data alvo: 7 de fevereiro de 2026 às 09:00 (horário de Brasília - BRT/UTC-3)
    const targetDate = new Date('2026-02-07T09:00:00-03:00').getTime();
    
    let countdownInterval;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Countdown terminou
            container.innerHTML = `
                <div class="countdown-pre-text">O carnaval</div>
                <div class="countdown-ended">começou!!</div>
            `;
            clearInterval(countdownInterval);
            return;
        }

        // Calcular tempo restante (total de horas, sem dias)
        const totalHours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Montar HTML do countdown
        container.innerHTML = `
            <div class="countdown-pre-text">Faltam</div>
            <div class="countdown-display">
                <div class="countdown-unit">
                    <span class="countdown-number">${String(totalHours).padStart(2, '0')}</span>
                    <span class="countdown-label">Horas</span>
                </div>
                <div class="countdown-unit">
                    <span class="countdown-number">${String(minutes).padStart(2, '0')}</span>
                    <span class="countdown-label">Minutos</span>
                </div>
                <div class="countdown-unit">
                    <span class="countdown-number">${String(seconds).padStart(2, '0')}</span>
                    <span class="countdown-label">Segundos</span>
                </div>
            </div>
            <div class="countdown-post-text">para começar!!</div>
        `;
    }

    // Atualizar countdown imediatamente e depois a cada segundo
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
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
