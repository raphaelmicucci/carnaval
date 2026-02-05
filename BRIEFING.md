# BRIEFING - Website Carnaval São Paulo

## Tipo de Projeto
Website estático para GitHub Pages | Digital Brutalist | Mobile First

---

## PALETA DE CORES
- **3 cores principais** (a definir)
- **Branco & Preto** (suporte)
- Aplicados em: backgrounds, textos, modais, botões

---

## HOMEPAGE

### Conteúdo
1. **Galeria de fotos** (topo)
   - Scroll manual com setas `<` e `>` evidentes
   - Fotos locais de carnavais passados
   
2. **Texto introdutório** (após galeria)
   - Descrição breve do projeto/evento

3. **Dois botões CTA** (stack vertical, mesmas dimensões)
   - `[LISTA DE BLOCOS]`
   - `[MAPA]`

---

## TIPOGRAFIA
- **Font**: Serif
- **Tamanho**: Normal (não grandes)
- **Abordagem**: Minimalista brutalista, sem excessos

---

## ESPAÇAMENTO
- Meio termo entre tight e generous
- Respiração visual, mas compacto

---

## PÁGINA: LISTA DE BLOCOS

### Layout
- **Cards** (altura adaptada, com scroll)
- **Apresentação**: Expandida (conteúdo visível)
- **Ordem padrão**: Por data

### Filtros
- **Localização**: Nesta página (sidebar ou topo)
- **Filtros disponíveis**:
  - Período (Pré-Carnaval, Carnaval, Pós-Carnaval)
  - Data
  - Bairro
  - Lotação

### Interação
- Clique em card = expandir/detalhar (se colapsado)
- Botão voltar = retorna à homepage

---

## PÁGINA: MAPA

### Mapa Base
- Leaflet.js + OpenStreetMap
- Centro: São Paulo
- Markers: Localização de cada bloco (via coordenadas)

### Filtros
- **Localização**: Floating panel (modal)
- **Mesmos filtros** da página de lista
- Atualização em tempo real ao filtrar

### Informações dos Blocos
- **Popups** ao clicar em marker
- Conteúdo: Nome, data, horário, bairro, lotação
- Sem fotos (apenas informações textuais)

### Interação
- Botão voltar = retorna à homepage

---

## ESTRUTURA TÉCNICA

### Stack
- HTML5 + CSS3 + JavaScript (Vanilla)
- **Mapas**: Leaflet.js + MarkerCluster (CDN)
- **Design**: Digital Brutalist (sem frameworks CSS)
- **Data**: JSON estático (blocos_por_data.json)

### Arquivos de Mídia
- `/assets/fotos/` - fotos locais (carnavais passados)
- Nomeação: `carnaval_YYYY_NN.jpg` (exemplo)

### Estrutura de Pastas
```
/index.html (homepage)
/lista.html (página de blocos)
/mapa.html (página de mapa)
/css/
  - style.css (design brutalist)
/js/
  - app.js (lógica geral)
  - lista.js (filtros & cards)
  - mapa.js (leaflet & interação)
/data/
  - blocos_por_data.json
/assets/
  - fotos/ (imagens locais)
```

### Compatibilidade
- GitHub Pages (estático)
- Mobile-first responsive
- Navegadores modernos (ES6 support)

---

## PENDÊNCIAS DO USUÁRIO
- [ ] Definir 3 cores principais
- [ ] Fornecer fotos de carnavais passados
- [ ] Revisar dados dos blocos (adicionar/validar)

---

## PRÓXIMOS PASSOS
1. ✅ Briefing pronto
2. ⏳ Iniciar prototipagem com HTML/CSS brutalist
3. ⏳ Integrar dados JSON
4. ⏳ Implementar filtros (lista)
5. ⏳ Integrar Leaflet (mapa)
6. ⏳ Testar responsividade mobile
7. ⏳ Deploy no GitHub Pages

---

**Data**: 05 de fevereiro de 2026  
**Status**: Briefing definido, pronto para desenvolvimento
