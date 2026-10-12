#!/usr/bin/env python3
"""Arma una guia de estudio y la imprime a PDF.

Uso:
    python3 build.py matematicas          # HTML y PDF
    python3 build.py fisica quimica --html  # solo el HTML

Cada guia es una carpeta con partes HTML (se juntan en orden alfabetico).
Los marcadores <!--FIG:nombre--> se cambian por las figuras de figuras.py.
"""
import glob
import os
import re
import subprocess
import sys

import figuras

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)

GUIAS = {
    'matematicas': ('Guía de estudio de Matemáticas — EXACER', 'Guia_estudio_Matematicas_EXACER.pdf'),
    'fisica': ('Guía de estudio de Física — EXACER', 'Guia_estudio_Fisica_EXACER.pdf'),
    'quimica': ('Guía de estudio de Química — EXACER', 'Guia_estudio_Quimica_EXACER.pdf'),
    'biologia': ('Guía de estudio de Biología — EXACER', 'Guia_estudio_Biologia_EXACER.pdf'),
    'geografia': ('Guía de estudio de Geografía — EXACER', 'Guia_estudio_Geografia_EXACER.pdf'),
}

PLANTILLA = '''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>%s</title>
<style>
%s</style>
</head>
<body>
%s
</body>
</html>
'''


def figura(m):
    clave = m.group(1)
    if clave not in figuras.FIGURAS:
        raise SystemExit('No existe la figura: ' + clave)
    return figuras.FIGURAS[clave]()


def cortas(m):
    """Las formulas cortas no se parten de renglon; las largas si pueden."""
    texto = re.sub(r'<[^>]+>', '', m.group(1))
    clase = 'm nw' if len(texto) <= 32 else 'm'
    return '<span class="%s">%s</span>' % (clase, m.group(1))


def armar(nombre):
    titulo, pdf = GUIAS[nombre]
    partes = sorted(glob.glob(os.path.join(AQUI, nombre, '*.html')))
    if not partes:
        raise SystemExit('No hay partes en ' + nombre)
    cuerpo = ''.join(open(p, encoding='utf-8').read() for p in partes)
    cuerpo = re.sub(r'<!--FIG:([a-z_0-9]+)-->', figura, cuerpo)
    cuerpo = re.sub(r'<span class="m">((?:(?!<span|</span>).){1,200}?)</span>', cortas, cuerpo)
    css = open(os.path.join(AQUI, 'estilo.css'), encoding='utf-8').read()
    salida = os.path.join(AQUI, 'guia-%s.html' % nombre)
    with open(salida, 'w', encoding='utf-8') as f:
        f.write(PLANTILLA % (titulo, css, cuerpo))
    return salida, os.path.join(RAIZ, pdf), titulo.replace(' — ', ' · ')


def imprimir(html, pdf, pie):
    entorno = dict(os.environ)
    try:
        global_node = subprocess.run(['npm', 'root', '-g'], capture_output=True, text=True).stdout.strip()
        entorno['NODE_PATH'] = global_node
    except OSError:
        pass
    subprocess.run(['node', os.path.join(AQUI, 'pdf.js'), html, pdf, pie], check=True, env=entorno)


if __name__ == '__main__':
    nombres = [a for a in sys.argv[1:] if not a.startswith('--')] or list(GUIAS)
    for nombre in nombres:
        html, pdf, pie = armar(nombre)
        print('HTML:', os.path.relpath(html, RAIZ))
        if '--html' not in sys.argv:
            imprimir(html, pdf, pie)
            print('PDF: ', os.path.relpath(pdf, RAIZ))
