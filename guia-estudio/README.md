# Guías de estudio del EXACER

Guías en PDF que explican, tema por tema y como en clase, el temario oficial
(`temas_fundamentales_bibliografia.pdf`) y resuelven los reactivos de la
`Version_práctica.pdf`. Los PDF terminados están en la raíz del repositorio:

- `Guia_estudio_Matematicas_EXACER.pdf`
- `Guia_estudio_Fisica_EXACER.pdf`
- `Guia_estudio_Quimica_EXACER.pdf`
- `Guia_estudio_Biologia_EXACER.pdf`
- `Guia_estudio_Geografia_EXACER.pdf`

## Cómo están hechas

- `matematicas/`, `fisica/`, `quimica/`, `biologia/`, `geografia/`: el contenido de cada guía, en partes
  HTML que se juntan en orden alfabético.
- `estilo.css`: el diseño compartido (recuadros de colores, tablas, etc.).
- `figuras.py`: las gráficas y dibujos en SVG. En el HTML se insertan con
  marcadores como `<!--FIG:parabola-->`.
- `build.py`: junta las partes, inserta las figuras y genera
  `guia-<materia>.html` y el PDF.
- `pdf.js`: imprime el HTML a PDF con Chromium (Playwright).

## Regenerar un PDF

Necesita Python 3, Node y Playwright con Chromium:

```bash
cd guia-estudio
python3 build.py matematicas        # HTML y PDF
python3 build.py fisica quimica     # varias a la vez
python3 build.py matematicas --html # solo el HTML, sin PDF
```
