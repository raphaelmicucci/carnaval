// ========================================
// LISTA.JS - Página de Lista de Blocos
// ========================================

let currentFilters = {
    periodo: [],
    data: [],
    bairro: [],
    lotacao: []
};

document.addEventListener('DOMContentLoaded', async () => {
    await loadBlocos();
    populateFilters();
    renderBlocos();
    initializeFilterToggle();
    feather.replace();  // Inicializar ícones Feather
    initScrollToTopButton();
});

function populateFilters() {
    // Período
    const periodos = getUnique('periodo');
    const periodosOrdenados = ['Pré-Carnaval', 'Carnaval', 'Pós-Carnaval'].filter(p => periodos.includes(p));
    const filterPeriodoDiv = document.getElementById('filterPeriodo');
    periodosOrdenados.forEach(p => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = p;
        input.addEventListener('change', onFilterChange);
        label.appendChild(input);
        label.appendChild(document.createTextNode(p));
        filterPeriodoDiv.appendChild(label);
    });

    // Data
    const datas = getUnique('data');
    const filterDataDiv = document.getElementById('filterData');
    datas.forEach(d => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = d;
        input.addEventListener('change', onFilterChange);
        label.appendChild(input);
        label.appendChild(document.createTextNode(d));
        filterDataDiv.appendChild(label);
    });

    // Bairro
    const bairros = getUnique('bairro');
    const filterBairroDiv = document.getElementById('filterBairro');
    bairros.forEach(b => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = b;
        input.addEventListener('change', onFilterChange);
        label.appendChild(input);
        label.appendChild(document.createTextNode(b));
        filterBairroDiv.appendChild(label);
    });

    // Lotação
    const lotacoes = getUnique('lotacao');
    const filterLotacaoDiv = document.getElementById('filterLotacao');
    lotacoes.forEach(l => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = l;
        input.addEventListener('change', onFilterChange);
        label.appendChild(input);
        label.appendChild(document.createTextNode(l));
        filterLotacaoDiv.appendChild(label);
    });

    // Botão limpar
    document.getElementById('btnLimparFiltros').addEventListener('click', clearFilters);
}

function onFilterChange(e) {
    const filterType = e.target.parentElement.parentElement.id.replace('filter', '').toLowerCase();
    
    if (e.target.checked) {
        currentFilters[filterType].push(e.target.value);
    } else {
        currentFilters[filterType] = currentFilters[filterType].filter(v => v !== e.target.value);
    }
    
    renderBlocos();
}

function initializeFilterToggle() {
    const toggleBtn = document.getElementById('toggleFilters');
    const filtersContent = document.getElementById('filtersContent');
    
    if (!toggleBtn) return;
    
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        filtersContent.classList.toggle('collapsed');
        const icon = toggleBtn.querySelector('svg');
        if (filtersContent.classList.contains('collapsed')) {
            toggleBtn.innerHTML = '<i data-feather="chevron-down" class="icon-small"></i>';
        } else {
            toggleBtn.innerHTML = '<i data-feather="chevron-up" class="icon-small"></i>';
        }
        feather.replace();
    });
}
function renderBlocos() {
    const filtered = filterBlocos(currentFilters);
    const container = document.getElementById('blocosList');
    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = '<p>Nenhum bloco encontrado com os filtros selecionados.</p>';
        return;
    }

    // Ordenar por data, depois por favorito (true primeiro)
    filtered.sort((a, b) => {
        const dateA = new Date(a.data.split('/').reverse().join('-'));
        const dateB = new Date(b.data.split('/').reverse().join('-'));
        
        // Primeiro ordena por data
        if (dateA !== dateB) {
            return dateA - dateB;
        }
        
        // Se a data for igual, ordena por favorito (true first)
        return b.favorito - a.favorito;
    });

    filtered.forEach((bloco, index) => {
        const hasPhoto = bloco.foto ? true : false;
        const isFavorito = bloco.favorito ? true : false;
        const card = document.createElement('div');
        card.className = `bloco-card ${hasPhoto ? 'with-photo' : 'without-photo'} ${isFavorito ? 'favorito' : ''}`;
        
        let photoHTML = '';
        if (hasPhoto) {
            photoHTML = `<img src="${bloco.foto}" alt="${bloco.nome}" class="bloco-photo">`;
        }
        
        // Remover "-feira" dos dias da semana
        const diaAbreviado = bloco.dia_da_semana.replace('-feira', '');
        
        // Gerar coordenadas para Google Maps
        const coords = bloco.coordenadas.split(',').map(c => c.trim());
        const googleMapsUrl = `https://www.google.com/maps/search/${coords[0]},${coords[1]}`;
        
        card.innerHTML = `
            ${photoHTML}
            <div class="bloco-header-wrapper">
                <div class="bloco-header" onclick="toggleBloco(${index})">
                    <div class="bloco-header-left">
                        <h3>${bloco.nome}</h3>
                        <div class="bloco-meta">
                            <strong>${bloco.data}</strong> • ${diaAbreviado} • ${bloco.bairro}
                        </div>
                    </div>
                    <div class="bloco-recomendacao">${renderStars(bloco.recomendacao)}</div>
                </div>
                <div class="bloco-content" id="bloco-${index}">
                    <div class="bloco-field">
                        <strong>Período:</strong>
                        <span>${bloco.periodo}</span>
                    </div>
                    <div class="bloco-field">
                        <strong>Horários:</strong>
                        <span>
                            Concentração: ${bloco.horarios.concentracao}<br>
                            Início: ${bloco.horarios.inicio_desfile}<br>
                            Término: ${bloco.horarios.termino_desfile}
                        </span>
                    </div>
                    <div class="bloco-field">
                        <strong>Bairro:</strong>
                        <span>${bloco.bairro}</span>
                    </div>
                    <div class="bloco-field">
                        <strong>Itinerário:</strong>
                        <span>${bloco.itinerario}</span>
                    </div>
                    <div class="bloco-field">
                        <strong>Lotação:</strong>
                        <span>${bloco.lotacao}</span>
                    </div>
                    <a href="${googleMapsUrl}" target="_blank" class="btn-maps">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="inline"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        Ver no Google Maps
                    </a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function toggleBloco(index) {
    const content = document.getElementById(`bloco-${index}`);
    content.classList.toggle('active');
}

function clearFilters() {
    currentFilters = {
        periodo: [],
        data: [],
        bairro: [],
        lotacao: []
    };

    // Desmarcar todos os checkboxes
    document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(input => {
        input.checked = false;
    });

    renderBlocos();
}

function getStarRating(recomendacao) {
    const starCount = (recomendacao.match(/⭐/g) || []).length;
    return starCount;
}

function renderStars(recomendacao) {
    const count = getStarRating(recomendacao);
    let stars = '';
    for (let i = 0; i < count; i++) {
        stars += '<svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="2" class="star-icon"><polygon points="12 2 15.09 10.26 23 10.26 17.55 15.04 19.64 23.26 12 18.48 4.36 23.26 6.45 15.04 1 10.26 8.91 10.26 12 2"></polygon></svg>';
    }
    return stars;
}