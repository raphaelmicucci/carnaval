#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para verificar campos vazios
Uso: python verificar_campos.py
"""

import json

with open('blocos_favoritos.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Total de blocos: {data['total_blocos']}\n")
print("=" * 80)

# Campos obrigatórios
campos_obrigatorios = ['nome', 'data', 'periodo', 'subprefeitura', 'itinerario', 'horarios', 'dia_da_semana', 'coordenadas', 'bairro']
campos_opcionais = ['lotacao', 'recomendacao']

vazios_por_campo = {campo: [] for campo in campos_obrigatorios + campos_opcionais}

for bloco in data['blocos']:
    # Verificar campos obrigatórios
    for campo in campos_obrigatorios:
        if not bloco.get(campo):
            vazios_por_campo[campo].append(bloco['nome'])
    
    # Verificar campos opcionais
    for campo in campos_opcionais:
        if bloco.get(campo) == "":
            vazios_por_campo[campo].append(bloco['nome'])

# Exibir relatório
print("\n📋 CAMPOS COM VALORES VAZIOS:\n")

for campo, blocos_vazios in vazios_por_campo.items():
    if blocos_vazios:
        obrigatorio = "⚠️  OBRIGATÓRIO" if campo in campos_obrigatorios else "ℹ️  Opcional"
        print(f"{obrigatorio} | {campo.upper()} ({len(blocos_vazios)}):")
        for nome in blocos_vazios:
            print(f"    • {nome}")
        print()

# Resumo
total_vazios = sum(len(blocos) for blocos in vazios_por_campo.values())
print("=" * 80)
print(f"Total de células vazias: {total_vazios}")
