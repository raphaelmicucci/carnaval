#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para gerar visualização agrupada por data
Uso: python gerar_agrupado.py
Gera: blocos_por_data.json
"""

import json
from datetime import datetime

# Ler arquivo principal
with open('blocos_favoritos.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Agrupar por data
blocos_por_data = {}
for bloco in data['blocos']:
    data_key = bloco['data']
    if data_key not in blocos_por_data:
        blocos_por_data[data_key] = []
    blocos_por_data[data_key].append(bloco)

# Ordenar por data
blocos_ordenados = {}
datas_ordenadas = sorted(blocos_por_data.keys(), key=lambda x: datetime.strptime(x, '%d/%m/%Y'))
for data_key in datas_ordenadas:
    blocos_ordenados[data_key] = blocos_por_data[data_key]

# Criar estrutura agrupada
nova_estrutura = {
    "fonte": data["fonte"],
    "cidade": data["cidade"],
    "ano": data["ano"],
    "total_blocos": data["total_blocos"],
    "blocos_por_data": blocos_ordenados
}

# Salvar
with open('blocos_por_data.json', 'w', encoding='utf-8') as f:
    json.dump(nova_estrutura, f, ensure_ascii=False, indent=3)

# Exibir resumo
print("✓ Arquivo gerado: blocos_por_data.json\n")
print(f"Total: {data['total_blocos']} blocos\n")
for data_key in datas_ordenadas:
    dia_semana = blocos_ordenados[data_key][0]['dia_da_semana']
    qtd = len(blocos_ordenados[data_key])
    print(f"  {data_key} ({dia_semana}): {qtd} bloco(s)")
