// ========================================
// MAPA.JS - Página de Mapa
// ========================================

let map;
let markersLayer;
let currentMapFilters = {
    periodo: [],
    data: [],
    bairro: [],
    lotacao: []
};

document.addEventListener('DOMContentLoaded', async () => {
    await loadBlocos();
    initializeMapa();
    populateMapFilters();
    feather.replace();
    renderMarkers();
    initScrollToTopButton();
});

function initializeMapa() {
    // Centro em São Paulo
    const spCenter = [-23.550520, -46.633309];
    
    map = L.map('map').setView(spCenter, 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    markersLayer = L.markerClusterGroup();
    map.addLayer(markersLayer);
}

function populateMapFilters() {
    // Período
    const periodos = getUnique('periodo');
    const periodosOrdenados = ['Pré-Carnaval', 'Carnaval', 'Pós-Carnaval'].filter(p => periodos.includes(p));
    const mapFilterPeriodoDiv = document.getElementById('mapFilterPeriodo');
    periodosOrdenados.forEach(p => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = p;
        input.addEventListener('change', onMapFilterChange);
        label.appendChild(input);
        label.appendChild(document.createTextNode(p));
        mapFilterPeriodoDiv.appendChild(label);
    });

    // Data
    const datas = getUnique('data');
    const mapFilterDataDiv = document.getElementById('mapFilterData');
    datas.forEach(d => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = d;
        input.addEventListener('change', onMapFilterChange);
        label.appendChild(input);
        label.appendChild(document.createTextNode(d));
        mapFilterDataDiv.appendChild(label);
    });

    // Bairro
    const bairros = getUnique('bairro');
    const mapFilterBairroDiv = document.getElementById('mapFilterBairro');
    bairros.forEach(b => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = b;
        input.addEventListener('change', onMapFilterChange);
        label.appendChild(input);
        label.appendChild(document.createTextNode(b));
        mapFilterBairroDiv.appendChild(label);
    });

    // Lotação
    const lotacoes = getUnique('lotacao');
    const mapFilterLotacaoDiv = document.getElementById('mapFilterLotacao');
    lotacoes.forEach(l => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = l;
        input.addEventListener('change', onMapFilterChange);
        label.appendChild(input);
        label.appendChild(document.createTextNode(l));
        mapFilterLotacaoDiv.appendChild(label);
    });

    // Botão limpar
    document.getElementById('mapBtnLimpar').addEventListener('click', clearMapFilters);
}

function onMapFilterChange(e) {
    const filterType = e.target.parentElement.parentElement.id.replace('mapFilter', '').toLowerCase();
    
    if (e.target.checked) {
        currentMapFilters[filterType].push(e.target.value);
    } else {
        currentMapFilters[filterType] = currentMapFilters[filterType].filter(v => v !== e.target.value);
    }
    
    renderMarkers();
}

function createCustomMarkerIcon(color = '#bd3871') {
    const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="${color}" stroke="black" stroke-width="1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path></svg>`;
    return L.icon({
        iconUrl: 'data:image/svg+xml;base64,' + btoa(svgIcon),
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40]
    });
}

function renderMarkers() {
    const filtered = filterBlocos(currentMapFilters);
    
    // Limpar markers anteriores
    markersLayer.clearLayers();
    
    const colors = ['#bd3871', '#6acdca', '#c4642d'];
    let colorIndex = 0;

    filtered.forEach(bloco => {
        if (!bloco.coordenadas) return;

        const coords = bloco.coordenadas.split(',').map(c => parseFloat(c.trim()));
        const mapsUrl = `https://www.google.com/maps/search/${coords[0]},${coords[1]}`;
        const customIcon = createCustomMarkerIcon(colors[colorIndex % colors.length]);
        colorIndex++;
        
        const marker = L.marker([coords[0], coords[1]], { icon: customIcon }).bindPopup(`
            <div style="font-family: 'Courier New', monospace; font-size: 0.9rem;">
                <strong>${bloco.nome}</strong><br>
                <strong>${bloco.data}</strong> - ${bloco.dia_da_semana}<br>
                <strong>Período:</strong> ${bloco.periodo}<br>
                <strong>Bairro:</strong> ${bloco.bairro}<br>
                <strong>Horários:</strong><br>
                Concentração: ${bloco.horarios.concentracao}<br>
                Início: ${bloco.horarios.inicio_desfile}<br>
                <strong>Lotação:</strong> ${bloco.lotacao}<br>
                <strong>Recomendação:</strong> ${bloco.recomendacao}<br>
                <div style="text-align: right; margin-top: 0.75rem;">
                    <a href="${mapsUrl}" target="_blank" class="btn-maps">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> Ver no Maps
                    </a>
                </div>
            </div>
        `);

        markersLayer.addLayer(marker);
    });
}

function toggleFilterModal() {
    const modal = document.getElementById('filterModal');
    modal.classList.toggle('active');
    feather.replace();
}

function clearMapFilters() {
    currentMapFilters = {
        periodo: [],
        data: [],
        bairro: [],
        lotacao: []
    };

    // Desmarcar todos os checkboxes
    document.querySelectorAll('#filterModal input[type="checkbox"]').forEach(input => {
        input.checked = false;
    });

    renderMarkers();
}
