"""Figuras SVG de las guias de estudio.

Cada funcion fig_* devuelve un <svg> listo para incrustar. build.py reemplaza
los marcadores <!--FIG:nombre--> del HTML por estas figuras.
"""
import math

A = '#1f6f8b'   # acento (azul)
O = '#b5542a'   # naranja
V = '#2e7d4f'   # verde
M = '#6b4fa3'   # morado
G = '#5a6375'   # gris
T = '#1d2330'   # tinta
FA = '#e6f2f6'  # fondos claros
FO = '#fbefe8'
FV = '#e9f5ee'
FM = '#f3effa'


def n(v):
    """Numero corto para coordenadas."""
    return ('%.1f' % v).rstrip('0').rstrip('.')


def menos(s):
    return str(s).replace('-', '−')


def svg(w, h, cuerpo, ident=''):
    return ('<svg width="%s" height="%s" viewBox="0 0 %s %s" xmlns="http://www.w3.org/2000/svg" '
            'font-family="DejaVu Sans" font-size="10">%s</svg>' % (w, h, w, h, cuerpo))


def flechas(ident, color=G):
    return ('<defs><marker id="fd%s" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">'
            '<path d="M0,0 L8,4 L0,8 z" fill="%s"/></marker>'
            '<marker id="fi%s" markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto">'
            '<path d="M8,0 L0,4 L8,8 z" fill="%s"/></marker></defs>' % (ident, color, ident, color))


def texto(x, y, s, color=T, anc='start', tam=None, neg=False, ital=False, serif=False):
    extra = ''
    if tam:
        extra += ' font-size="%s"' % tam
    if neg:
        extra += ' font-weight="bold"'
    if ital:
        extra += ' font-style="italic"'
    if serif:
        extra += ' font-family="DejaVu Serif"'
    return '<text x="%s" y="%s" fill="%s" text-anchor="%s"%s>%s</text>' % (n(x), n(y), color, anc, extra, s)


def linea(x1, y1, x2, y2, color=G, ancho=1.4, guion=None, ini=None, fin=None):
    extra = ''
    if guion:
        extra += ' stroke-dasharray="%s"' % guion
    if ini:
        extra += ' marker-start="url(#fi%s)"' % ini
    if fin:
        extra += ' marker-end="url(#fd%s)"' % fin
    return '<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="%s"%s/>' % (
        n(x1), n(y1), n(x2), n(y2), color, ancho, extra)


def circulo(cx, cy, r, trazo=G, relleno='none', ancho=1.6, guion=None):
    extra = ' stroke-dasharray="%s"' % guion if guion else ''
    return '<circle cx="%s" cy="%s" r="%s" stroke="%s" fill="%s" stroke-width="%s"%s/>' % (
        n(cx), n(cy), n(r), trazo, relleno, ancho, extra)


def punto(x, y, color=T, r=3, hueco=False):
    if hueco:
        return circulo(x, y, r + 0.5, trazo=color, relleno='#fff', ancho=1.6)
    return '<circle cx="%s" cy="%s" r="%s" fill="%s"/>' % (n(x), n(y), r, color)


def rect(x, y, w, h, trazo=G, relleno='none', rx=0, ancho=1.4):
    return '<rect x="%s" y="%s" width="%s" height="%s" rx="%s" stroke="%s" fill="%s" stroke-width="%s"/>' % (
        n(x), n(y), n(w), n(h), rx, trazo, relleno, ancho)


def poligono(pts, trazo=A, relleno='none', ancho=1.8):
    return '<polygon points="%s" stroke="%s" fill="%s" stroke-width="%s"/>' % (
        ' '.join('%s,%s' % (n(x), n(y)) for x, y in pts), trazo, relleno, ancho)


def camino(d, trazo=A, ancho=2, relleno='none', guion=None):
    extra = ' stroke-dasharray="%s"' % guion if guion else ''
    return '<path d="%s" stroke="%s" fill="%s" stroke-width="%s"%s/>' % (d, trazo, relleno, ancho, extra)


def arco(cx, cy, r, a1, a2, color=O, ancho=1.6):
    """Arco en sentido antihorario (como en matematicas) de a1 a a2 grados."""
    x1 = cx + r * math.cos(math.radians(a1))
    y1 = cy - r * math.sin(math.radians(a1))
    x2 = cx + r * math.cos(math.radians(a2))
    y2 = cy - r * math.sin(math.radians(a2))
    grande = 1 if (a2 - a1) % 360 > 180 else 0
    return camino('M%s,%s A%s,%s 0 %d 0 %s,%s' % (n(x1), n(y1), n(r), n(r), grande, n(x2), n(y2)),
                  trazo=color, ancho=ancho)


class Plano:
    """Sistema de coordenadas: convierte datos a pixeles."""

    def __init__(self, w, h, xmin, xmax, ymin, ymax, pad=26):
        self.w, self.h = w, h
        self.xmin, self.xmax, self.ymin, self.ymax = xmin, xmax, ymin, ymax
        self.pad = pad
        self.cuerpo = ''

    def px(self, x):
        return self.pad + (x - self.xmin) / (self.xmax - self.xmin) * (self.w - 2 * self.pad)

    def py(self, y):
        return self.h - self.pad - (y - self.ymin) / (self.ymax - self.ymin) * (self.h - 2 * self.pad)

    def add(self, s):
        self.cuerpo += s

    def ejes(self, ident, xt=(), yt=(), xn='x', yn='y', rejilla=False, etiquetas_x=None, etiquetas_y=None):
        if rejilla:
            for x in range(math.ceil(self.xmin), math.floor(self.xmax) + 1):
                self.add(linea(self.px(x), self.py(self.ymin), self.px(x), self.py(self.ymax), '#e3e7ee', 1))
            for y in range(math.ceil(self.ymin), math.floor(self.ymax) + 1):
                self.add(linea(self.px(self.xmin), self.py(y), self.px(self.xmax), self.py(y), '#e3e7ee', 1))
        y0 = 0 if self.ymin <= 0 <= self.ymax else self.ymin
        x0 = 0 if self.xmin <= 0 <= self.xmax else self.xmin
        self.add(flechas(ident))
        self.add(linea(self.px(self.xmin), self.py(y0), self.px(self.xmax), self.py(y0), G, 1.2, fin=ident))
        self.add(linea(self.px(x0), self.py(self.ymin), self.px(x0), self.py(self.ymax), G, 1.2, fin=ident))
        self.add(texto(self.px(self.xmax) - 2, self.py(y0) - 6, xn, G, 'end', ital=True))
        self.add(texto(self.px(x0) + 6, self.py(self.ymax) + 8, yn, G, ital=True))
        for i, x in enumerate(xt):
            et = etiquetas_x[i] if etiquetas_x else menos(x)
            self.add(linea(self.px(x), self.py(y0) - 3, self.px(x), self.py(y0) + 3, G, 1))
            self.add(texto(self.px(x), self.py(y0) + 14, et, G, 'middle', 9))
        for i, y in enumerate(yt):
            et = etiquetas_y[i] if etiquetas_y else menos(y)
            self.add(linea(self.px(x0) - 3, self.py(y), self.px(x0) + 3, self.py(y), G, 1))
            self.add(texto(self.px(x0) - 6, self.py(y) + 3, et, G, 'end', 9))

    def curva(self, f, x0, x1, color=A, ancho=2, guion=None, pasos=240):
        trozos, actual = [], []
        for i in range(pasos + 1):
            x = x0 + (x1 - x0) * i / pasos
            try:
                y = f(x)
            except (ValueError, ZeroDivisionError):
                y = None
            if y is None or not (self.ymin - 0.5 <= y <= self.ymax + 0.5):
                if len(actual) > 1:
                    trozos.append(actual)
                actual = []
                continue
            actual.append((self.px(x), self.py(y)))
        if len(actual) > 1:
            trozos.append(actual)
        for t in trozos:
            d = 'M' + ' L'.join('%s,%s' % (n(a), n(b)) for a, b in t)
            self.add(camino(d, color, ancho, guion=guion))

    def segmento(self, x1, y1, x2, y2, color=G, ancho=1.4, guion=None):
        self.add(linea(self.px(x1), self.py(y1), self.px(x2), self.py(y2), color, ancho, guion))

    def punto(self, x, y, color=T, r=3, hueco=False):
        self.add(punto(self.px(x), self.py(y), color, r, hueco))

    def texto(self, x, y, s, color=T, anc='start', dx=0, dy=0, tam=None, neg=False):
        self.add(texto(self.px(x) + dx, self.py(y) + dy, s, color, anc, tam, neg))

    def svg(self):
        return svg(self.w, self.h, self.cuerpo)


# ---------------------------------------------------------------- 1.1
def fig_conjuntos():
    b = rect(4, 4, 232, 186, G, '#f7f7f9', 10)
    b += texto(12, 20, 'ℂ  complejos', G, neg=True)
    b += texto(228, 20, '3 + 2i', G, 'end', 9)
    b += rect(14, 28, 212, 154, A, '#eef6f9', 8)
    b += texto(22, 43, 'ℝ  reales', A, neg=True)
    b += rect(22, 50, 132, 124, V, FV, 8)
    b += texto(30, 65, 'ℚ  racionales', V, neg=True)
    b += texto(148, 65, '½, 0.75', V, 'end', 9)
    b += rect(30, 72, 116, 94, M, FM, 8)
    b += texto(38, 87, 'ℤ  enteros', M, neg=True)
    b += texto(38, 100, '… −3, −2, −1', M, tam=9)
    b += rect(38, 106, 100, 52, O, FO, 8)
    b += texto(46, 122, 'ℕ  naturales', O, neg=True)
    b += texto(46, 140, '0, 1, 2, 3, …', O, tam=9)
    b += rect(162, 50, 56, 124, T, '#fff', 8)
    b += texto(190, 66, 'irracio-', T, 'middle', 8.5, True)
    b += texto(190, 77, 'nales', T, 'middle', 8.5, True)
    b += texto(190, 104, '√2', T, 'middle', 11)
    b += texto(190, 126, 'π', T, 'middle', 12)
    b += texto(190, 148, 'e', T, 'middle', 12)
    return svg(240, 194, b)


def fig_recta_numerica():
    b = flechas('rn')
    def px(v):
        return 210 + v * 38
    b += linea(12, 38, 408, 38, T, 1.4, ini='rn', fin='rn')
    for k in range(-5, 6):
        b += linea(px(k), 33, px(k), 43, T, 1)
        b += texto(px(k), 57, menos(k), G, 'middle', 9)
    for v, et, c in ((-2, '−2', O), (0.5, '½', V), (2 ** 0.5, '√2', M), (math.pi, 'π', A)):
        b += punto(px(v), 38, c, 4)
        b += texto(px(v), 26, et, c, 'middle', 10, True)
    b += texto(14, 14, '← menores', G, tam=9)
    b += texto(406, 14, 'mayores →', G, 'end', 9)
    return svg(420, 64, b)


# ---------------------------------------------------------------- 1.6
def fig_binomio_cuadrado():
    a, c, x0, y0 = 90, 50, 24, 22
    b = rect(x0, y0, a, a, O, FO)
    b += rect(x0 + a, y0, c, a, M, FM)
    b += rect(x0, y0 + a, a, c, M, FM)
    b += rect(x0 + a, y0 + a, c, c, V, FV)
    b += texto(x0 + a / 2, y0 + a / 2 + 5, 'a²', O, 'middle', 16, ital=True, serif=True)
    b += texto(x0 + a + c / 2, y0 + a / 2 + 5, 'ab', M, 'middle', 14, ital=True, serif=True)
    b += texto(x0 + a / 2, y0 + a + c / 2 + 5, 'ab', M, 'middle', 14, ital=True, serif=True)
    b += texto(x0 + a + c / 2, y0 + a + c / 2 + 5, 'b²', V, 'middle', 14, ital=True, serif=True)
    b += texto(x0 + a / 2, y0 - 7, 'a', T, 'middle', 12, ital=True, serif=True)
    b += texto(x0 + a + c / 2, y0 - 7, 'b', T, 'middle', 12, ital=True, serif=True)
    b += texto(x0 - 8, y0 + a / 2 + 4, 'a', T, 'middle', 12, ital=True, serif=True)
    b += texto(x0 - 8, y0 + a + c / 2 + 4, 'b', T, 'middle', 12, ital=True, serif=True)
    b += texto(x0 + (a + c) / 2, y0 + a + c + 20, '(a + b)² = a² + 2ab + b²', T, 'middle', 11, serif=True, ital=True)
    return svg(190, 200, b)


# ---------------------------------------------------------------- 1.7 / 1.8
def fig_circunferencia():
    cx, cy, r = 95, 88, 60
    b = circulo(cx, cy, r, A, 'none', 2)
    b += punto(cx, cy, T, 2.5)
    b += texto(cx - 4, cy + 14, 'O', T, 'end')
    b += linea(cx - r, cy, cx + r, cy, M, 1.6)
    b += texto(cx + 30, cy - 5, 'diámetro', M, 'middle', 9)
    rx, ry = cx + r * math.cos(math.radians(-55)), cy - r * math.sin(math.radians(-55))
    b += linea(cx, cy, rx, ry, O, 1.8)
    b += texto(rx - 2, ry - 18, 'radio', O, 'end', 9)
    b += linea(48, 51, 139, 47, V, 1.6)
    b += texto(70, 43, 'cuerda', V, tam=9)
    b += linea(20, cy - r, 200, cy - r, G, 1.4)
    b += texto(198, cy - r - 5, 'tangente', G, 'end', 9)
    b += linea(8, 168, 205, 112, G, 1.4, '4 3')
    b += texto(200, 138, 'secante', G, 'end', 9)
    return svg(210, 176, b)


def fig_lineas():
    b = flechas('ln')
    b += linea(20, 20, 170, 20, A, 2)
    b += punto(20, 20, T, 3) + punto(170, 20, T, 3)
    b += texto(14, 36, 'A') + texto(166, 36, 'B')
    b += texto(95, 13, 'segmento AB (se puede medir)', A, 'middle', 9)
    b += linea(10, 64, 205, 64, O, 2, ini='ln', fin='ln')
    b += texto(105, 56, 'recta ℓ (no empieza ni termina)', O, 'middle', 9)
    b += linea(30, 106, 205, 106, V, 2, fin='ln')
    b += punto(30, 106, T, 3)
    b += texto(24, 122, 'O')
    b += texto(115, 98, 'semirrecta Oℓ (empieza en O)', V, 'middle', 9)
    return svg(215, 128, b)


# ---------------------------------------------------------------- 1.9
def fig_tipos_angulo():
    datos = [(40, 'agudo', 'menor que 90°'), (90, 'recto', '90°'), (130, 'obtuso', 'entre 90° y 180°'),
             (180, 'llano', '180°'), (250, 'cóncavo', 'entre 180° y 360°')]
    b = ''
    for i, (ang, nom, med) in enumerate(datos):
        cx, cy = 48 + i * 96, 60
        b += linea(cx, cy, cx + 34, cy, T, 1.8)
        ex, ey = cx + 34 * math.cos(math.radians(ang)), cy - 34 * math.sin(math.radians(ang))
        b += linea(cx, cy, ex, ey, T, 1.8)
        if ang == 90:
            b += rect(cx, cy - 10, 10, 10, O, 'none', 0, 1.4)
        else:
            b += arco(cx, cy, 13, 0, ang, O)
        b += punto(cx, cy, T, 2.5)
        b += texto(cx, 108, nom, A, 'middle', 10, True)
        b += texto(cx, 121, med, G, 'middle', 8.5)
    return svg(480, 128, b)


# ---------------------------------------------------------------- 1.10
def fig_transversal():
    b = linea(10, 45, 230, 45, A, 2) + linea(10, 115, 230, 115, A, 2)
    b += texto(226, 39, 'ℓ₁', A, 'end') + texto(226, 109, 'ℓ₂', A, 'end')
    b += linea(70, 155, 150, 5, O, 2)
    b += texto(152, 14, 'ℓ (transversal)', O, tam=9)
    pos = {1: (120.5, 35), 2: (142.4, 40.5), 3: (115, 57), 4: (136.9, 62.4),
           5: (83.1, 105), 6: (105, 110.5), 7: (77.6, 127), 8: (99.5, 132.4)}
    for k, (x, y) in pos.items():
        b += texto(x, y, str(k), M, 'middle', 10, True)
    return svg(240, 160, b)


# ---------------------------------------------------------------- 1.11
def fig_suma_triangulo():
    A_, B_, C_ = (30, 140), (200, 140), (120, 40)
    b = poligono([A_, B_, C_], A, FA, 2)
    b += linea(18, 40, 222, 40, G, 1.4, '5 3')
    b += texto(220, 33, 'paralela a AB', G, 'end', 8.5)
    b += arco(30, 140, 18, 0, 48, O) + texto(53, 133, 'α', O, tam=11)
    b += arco(200, 140, 18, 128.7, 180, V) + texto(173, 133, 'β', V, tam=11)
    b += arco(120, 40, 18, 228, 308.7, M) + texto(120, 72, 'γ', M, 'middle', 11)
    b += arco(120, 40, 26, 180, 228, O) + texto(90, 55, 'α', O, tam=11)
    b += arco(120, 40, 26, 308.7, 360, V) + texto(143, 55, 'β', V, tam=11)
    b += texto(24, 155, 'A') + texto(200, 155, 'B') + texto(124, 32, 'C')
    return svg(232, 162, b)


def fig_pitagoras():
    P, Q, R = (70, 150), (130, 150), (70, 105)
    b = poligono([R, Q, (175, 90), (115, 45)], A, FA, 1.6)
    b += poligono([P, Q, (130, 210), (70, 210)], V, FV, 1.6)
    b += poligono([R, P, (25, 150), (25, 105)], O, FO, 1.6)
    b += poligono([P, Q, R], T, '#fff', 2)
    b += rect(70, 142, 8, 8, T, 'none', 0, 1)
    b += texto(122.5, 101, '25 = 5²', A, 'middle', 10, True)
    b += texto(100, 184, '16 = 4²', V, 'middle', 10, True)
    b += texto(47.5, 131, '9 = 3²', O, 'middle', 9, True)
    b += texto(100, 228, '9 + 16 = 25', T, 'middle', 11, True)
    return svg(190, 236, b)


# ---------------------------------------------------------------- 1.12
def fig_tales():
    A_, B_, C_ = (120, 15), (30, 150), (210, 150)
    D_, E_ = (79.5, 75.75), (160.5, 75.75)
    b = poligono([A_, B_, C_], A, '#fff', 2)
    b += poligono([A_, D_, E_], A, FA, 1.2)
    b += linea(D_[0], D_[1], E_[0], E_[1], O, 2)
    b += texto(120, 12, 'A', T, 'middle') + texto(22, 160, 'B') + texto(212, 160, 'C')
    b += texto(70, 76, 'D', T, 'end') + texto(170, 76, 'E')
    b += texto(120, 92, 'DE ∥ BC', O, 'middle', 9, True)
    return svg(232, 166, b)


# ---------------------------------------------------------------- 1.13
def fig_pentagono():
    cx, cy, r = 80, 82, 62
    v = [(cx + r * math.cos(math.radians(a)), cy + r * math.sin(math.radians(a))) for a in (-90, -18, 54, 126, 198)]
    b = poligono(v, A, FA, 2)
    b += linea(v[0][0], v[0][1], v[2][0], v[2][1], O, 1.4, '4 3')
    b += linea(v[0][0], v[0][1], v[3][0], v[3][1], O, 1.4, '4 3')
    b += texto(46, 92, '1', O, 'middle', 12, True) + texto(80, 116, '2', O, 'middle', 12, True)
    b += texto(114, 92, '3', O, 'middle', 12, True)
    b += texto(80, 162, '3 triángulos × 180° = 540°', T, 'middle', 10, True)
    return svg(170, 170, b)


# ---------------------------------------------------------------- 1.14
def fig_triangulo_rect():
    b = poligono([(20, 120), (190, 120), (190, 25)], A, FA, 2)
    b += rect(178, 108, 12, 12, A, 'none', 0, 1)
    b += arco(20, 120, 30, 0, 29.2, O)
    b += texto(56, 114, 'α', O, tam=11)
    b += texto(105, 136, 'cateto adyacente (CA)', T, 'middle', 9)
    b += texto(196, 70, 'cateto', T, tam=9) + texto(196, 82, 'opuesto', T, tam=9) + texto(196, 94, '(CO)', T, tam=9)
    b += texto(90, 58, 'hipotenusa (HIP)', T, 'middle', 9)
    b += texto(10, 132, 'O', G) + texto(194, 132, 'B', G) + texto(194, 22, 'A', G)
    return svg(250, 142, b)


def fig_circulo_unitario():
    cx, cy, r = 100, 100, 75
    b = flechas('cu')
    b += linea(15, cy, 190, cy, G, 1.2, fin='cu') + linea(cx, 185, cx, 15, G, 1.2, fin='cu')
    b += circulo(cx, cy, r, A, 'none', 1.8)
    px, py = cx + r * math.cos(math.radians(35)), cy - r * math.sin(math.radians(35))
    b += linea(cx, cy, px, py, T, 1.8)
    b += linea(px, py, px, cy, O, 2, '4 2')
    b += linea(cx, cy, px, cy, V, 3)
    b += punto(px, py, T, 3.5)
    b += arco(cx, cy, 18, 0, 35, M)
    b += texto(122, 95, 'α', M, tam=11)
    b += texto(126, 70, '1', T, tam=11)
    b += texto(px + 5, 82, 'sin α', O, tam=9.5, neg=True)
    b += texto(130, 114, 'cos α', V, 'middle', 9.5, True)
    b += texto(px + 4, py - 8, '(cos α, sin α)', T, tam=9)
    b += texto(cx + r + 3, cy + 13, '1', G, tam=9) + texto(cx - 6, cy - r - 3, '1', G, 'end', 9)
    return svg(240, 190, b)


# ---------------------------------------------------------------- 1.15
def fig_ondas():
    p = Plano(360, 150, 0, 380, -1.35, 1.35, 30)
    p.ejes('on', xt=(90, 180, 270, 360), yt=(1, -1), xn='', yn='',
           etiquetas_x=('90°', '180°', '270°', '360°'))
    p.curva(lambda x: math.sin(math.radians(x)), 0, 360, A, 2.2)
    p.curva(lambda x: math.cos(math.radians(x)), 0, 360, O, 2, '6 4')
    p.texto(95, 1.08, 'sin x', A, neg=True)
    p.texto(300, 1.12, 'cos x', O, neg=True)
    return p.svg()


# ---------------------------------------------------------------- 1.5
def fig_proporcional_lineal():
    p = Plano(300, 200, 0, 6, 0, 10, 28)
    p.ejes('pl', xt=(1, 2, 3, 4, 5), yt=(2, 4, 6, 8), xn='x (independiente)', yn='y (dependiente)')
    p.curva(lambda x: 1.5 * x, 0, 5.8, V, 2.2)
    p.curva(lambda x: x + 3, 0, 5.8, O, 2.2)
    p.punto(0, 0, V, 3.5)
    p.punto(0, 3, O, 3.5)
    p.texto(3.6, 5.0, 'y = 1.5x', V, neg=True)
    p.texto(3.6, 4.2, 'proporcional: pasa por (0, 0)', V, tam=8.5)
    p.texto(1.1, 7.6, 'y = x + 3', O, neg=True)
    p.texto(1.1, 6.8, 'lineal: empieza en b = 3', O, tam=8.5)
    return p.svg()


# ---------------------------------------------------------------- 1.17 / 1.18
def fig_cuadrantes():
    p = Plano(240, 220, -4.5, 4.5, -4, 4, 18)
    p.ejes('cq', xn='x', yn='y')
    for x, y, s, c in ((2.6, 3.5, 'I (+, +)', A), (-2.4, 3.5, 'II (−, +)', O),
                       (-2.4, -3.2, 'III (−, −)', V), (2.6, -3.2, 'IV (+, −)', M)):
        p.texto(x, y, s, c, 'middle', neg=True)
    p.segmento(0, 0, 3, 2, T, 1.8)
    p.punto(3, 2, T, 3.5)
    p.texto(3, 2, 'P(3, 2)', T, dx=6, dy=12, tam=9)
    p.texto(1.5, 1.0, 'r', T, dx=-10, dy=-2, neg=True)
    p.add(arco(p.px(0), p.py(0), 22, 0, math.degrees(math.atan2(2, 3)), O))
    p.texto(0.9, 0.18, 'θ', O, tam=11)
    return p.svg()


def fig_distancia():
    p = Plano(250, 200, 0, 6.5, 0, 5.2, 24)
    p.ejes('ds', xt=(1, 2, 3, 4, 5, 6), yt=(1, 2, 3, 4, 5), rejilla=True)
    p.segmento(1, 1, 5, 1, V, 2)
    p.segmento(5, 1, 5, 4, O, 2)
    p.segmento(1, 1, 5, 4, A, 2.4)
    p.punto(1, 1, T, 3.5)
    p.punto(5, 4, T, 3.5)
    p.punto(3, 2.5, M, 3.5)
    p.texto(1, 1, 'P(1, 1)', T, 'end', dx=-4, dy=-6, tam=9)
    p.texto(5, 4, 'Q(5, 4)', T, dx=6, dy=-4, tam=9)
    p.texto(3, 1, 'Δx = 4', V, 'middle', dy=13, tam=9, neg=True)
    p.texto(5, 2.5, 'Δy = 3', O, dx=6, tam=9, neg=True)
    p.texto(2.7, 2.9, 'd = 5', A, 'end', tam=10, neg=True)
    p.texto(3, 2.5, 'M(3, 2.5)', M, dx=6, dy=12, tam=9)
    return p.svg()


# ---------------------------------------------------------------- 1.19 / 1.20
def fig_recta():
    p = Plano(240, 230, -1.5, 4.5, -4.5, 5.5, 22)
    p.ejes('rc', xt=(-1, 1, 2, 3, 4), yt=(-4, -3, -2, -1, 1, 2, 3, 4, 5), rejilla=True)
    p.curva(lambda x: 2 * x - 3, -0.6, 4.2, A, 2.4)
    p.punto(0, -3, O, 4)
    p.segmento(0, -3, 1, -3, V, 2.4)
    p.segmento(1, -3, 1, -1, M, 2.4)
    p.punto(1, -1, T, 3.5)
    p.texto(0.5, -3, 'avanza 1', V, 'middle', dy=15, tam=8.5, neg=True)
    p.texto(1, -2, 'sube 2', M, dx=5, tam=8.5, neg=True)
    p.texto(0, -3, 'b = −3', O, 'end', dx=-24, dy=4, tam=9, neg=True)
    p.texto(2.9, 3.6, 'y = 2x − 3', A, 'end', tam=10, neg=True)
    return p.svg()


def fig_sistema():
    p = Plano(240, 210, -0.5, 5.5, -1.5, 6.5, 22)
    p.ejes('st', xt=(1, 2, 3, 4, 5), yt=(1, 2, 3, 4, 5, 6), rejilla=True)
    p.curva(lambda x: 2 * x - 1, -0.2, 3.7, A, 2.2)
    p.curva(lambda x: -x + 5, -0.2, 5.4, O, 2.2)
    p.punto(2, 3, T, 4)
    p.texto(2, 3, 'solución (2, 3)', T, dx=8, dy=4, tam=9, neg=True)
    p.texto(3.2, 5.6, 'y = 2x − 1', A, 'end', tam=9, neg=True)
    p.texto(4.6, 0.75, 'y = −x + 5', O, 'middle', dy=-6, tam=9, neg=True)
    return p.svg()


# ---------------------------------------------------------------- 1.21
def fig_parabola():
    p = Plano(240, 200, -1, 5, -1.6, 5.2, 22)
    p.ejes('pb', xt=(1, 2, 3, 4), yt=(1, 2, 3, 4))
    p.segmento(2, -1.4, 2, 5, G, 1.2, '4 3')
    p.curva(lambda x: -(x - 2) ** 2 + 4, -0.3, 4.3, A, 2.4)
    p.punto(2, 4, O, 4)
    p.punto(0, 0, V, 4)
    p.punto(4, 0, V, 4)
    p.texto(2, 4, 'vértice (2, 4)', O, dx=8, dy=-4, tam=9, neg=True)
    p.texto(0, 0, 'raíz', V, 'end', dx=-5, dy=-6, tam=9)
    p.texto(4, 0, 'raíz', V, dx=7, dy=-8, tam=9)
    p.texto(2, -1.35, 'eje de simetría', G, 'end', dx=-5, tam=8.5)
    p.texto(3.4, 2.6, 'a < 0', A, tam=9)
    return p.svg()


# ---------------------------------------------------------------- 1.22
def fig_elipse():
    p = Plano(300, 204, -6.5, 6.5, -4, 4, 24)
    p.ejes('el', xn='x', yn='y')
    pts = []
    for i in range(0, 361, 3):
        t = math.radians(i)
        pts.append((p.px(5 * math.cos(t)), p.py(3 * math.sin(t))))
    p.add(camino('M' + ' L'.join('%s,%s' % (n(a), n(b)) for a, b in pts) + ' Z', A, 2.2))
    p.segmento(0, 0, 4, 0, O, 2.6)
    p.segmento(0, 0, 0, 3, V, 2.6)
    p.segmento(0, 3, 4, 0, M, 1.8, '5 3')
    for x, y in ((-4, 0), (4, 0)):
        p.punto(x, y, O, 4)
    for x, y in ((-5, 0), (5, 0), (0, 3), (0, -3)):
        p.punto(x, y, T, 3)
    p.texto(2, 0, 'c', O, 'middle', dy=13, neg=True)
    p.texto(0, 1.5, 'b', V, dx=-10, neg=True)
    p.texto(2.2, 1.7, 'a', M, neg=True)
    p.texto(-4, 0, 'F₁', O, 'middle', dy=13, tam=9, neg=True)
    p.texto(4, 0, 'F₂', O, 'middle', dy=-7, tam=9, neg=True)
    p.texto(-5, 0, 'V₁', T, 'end', dx=-3, dy=-5, tam=9)
    p.texto(5, 0, 'V₂', T, dx=3, dy=-5, tam=9)
    p.texto(0, 3, 'B₂', T, dx=5, dy=-4, tam=9)
    p.texto(0, -3, 'B₁', T, dx=5, dy=11, tam=9)
    return p.svg()


# ---------------------------------------------------------------- 1.23
def fig_paridad():
    b = linea(5, 60, 105, 60, G, 1.2) + linea(55, 5, 55, 105, G, 1.2)
    b += camino('M15,10 Q55,110 95,10', A, 2)
    b += texto(55, 120, 'par: espejo en el eje y', A, 'middle', 8.5, True)
    b += linea(125, 60, 225, 60, G, 1.2) + linea(175, 5, 175, 105, G, 1.2)
    b += camino('M135,100 C160,40 190,80 215,20', O, 2)
    b += texto(175, 120, 'impar: giro de 180°', O, 'middle', 8.5, True)
    return svg(232, 126, b)


def fig_exp_log():
    p = Plano(240, 240, -3, 5, -3, 5, 22)
    p.ejes('ex', xt=(-2, 1, 2, 3, 4), yt=(-2, 1, 2, 3, 4), rejilla=True)
    p.curva(lambda x: x, -3, 5, G, 1.2, '5 4')
    p.curva(lambda x: 2 ** x, -3, 2.4, A, 2.2)
    p.curva(lambda x: math.log2(x) if x > 0 else None, 0.13, 5, O, 2.2)
    p.punto(0, 1, A, 3.5)
    p.punto(1, 0, O, 3.5)
    p.texto(1.6, 4.4, 'y = 2ˣ', A, 'end', tam=10, neg=True)
    p.texto(4.6, 2.55, 'y = log₂ x', O, 'end', tam=10, neg=True)
    p.texto(4.2, 4.6, 'y = x', G, 'end', tam=9)
    return p.svg()


# ---------------------------------------------------------------- 1.24
def fig_limite():
    p = Plano(250, 210, 0, 5, 0, 9, 26)
    p.ejes('lm', xt=(1, 2, 3, 4), yt=(2, 4, 6, 8))
    p.segmento(3, 0, 3, 6, G, 1.2, '4 3')
    p.segmento(0, 6, 3, 6, G, 1.2, '4 3')
    p.curva(lambda x: x + 3, 0.2, 4.8, A, 2.4)
    p.punto(3, 6, A, 4, hueco=True)
    p.texto(3, 6, 'hueco en x = 3', A, dx=10, dy=12, tam=9, neg=True)
    p.texto(0.3, 8.2, 'f(x) = (x² − 9)/(x − 3)', T, tam=9)
    return p.svg()


# ---------------------------------------------------------------- 1.25
def fig_secante():
    f = lambda x: x * x / 2 + 1
    p = Plano(260, 210, 0, 4, 0, 8.5, 26)
    p.ejes('sc', xt=(1, 3), yt=(), etiquetas_x=('c', 'c + h'))
    p.curva(f, 0, 3.75, A, 2.4)
    p.curva(lambda x: 1.5 + 2 * (x - 1), 0.1, 3.9, O, 1.6, '6 4')
    p.curva(lambda x: 1.5 + (x - 1), 0, 4, V, 2)
    p.punto(1, 1.5, T, 4)
    p.punto(3, 5.5, T, 4)
    p.segmento(1, 1.5, 3, 1.5, G, 1, '3 3')
    p.segmento(3, 1.5, 3, 5.5, G, 1, '3 3')
    p.texto(2, 1.5, 'h', G, 'middle', dy=12, neg=True)
    p.texto(3.9, 7.3, 'secante', O, 'end', tam=9, neg=True)
    p.texto(3.95, 3.4, 'tangente', V, 'end', tam=9, neg=True)
    return p.svg()


# ---------------------------------------------------------------- 1.26
def fig_maxmin():
    g = lambda x: x ** 3 - 6 * x ** 2 + 9 * x + 1
    p = Plano(270, 210, -0.4, 4.4, -1.3, 7.3, 26)
    p.ejes('mm', xt=(1, 2, 3, 4), yt=(1, 3, 5, 7))
    p.curva(g, -0.25, 4.25, A, 2.4)
    p.segmento(0.45, 5, 1.55, 5, O, 2.2)
    p.segmento(2.45, 1, 3.55, 1, V, 2.2)
    p.punto(1, 5, O, 4)
    p.punto(3, 1, V, 4)
    p.texto(1, 5, 'máximo (1, 5)', O, 'middle', dy=-10, tam=9, neg=True)
    p.texto(3, 1, 'mínimo (3, 1)', V, 'middle', dy=16, tam=9, neg=True)
    return p.svg()


# ---------------------------------------------------------------- 1.27
def fig_area():
    f = lambda x: 0.25 * x * x + 1
    p = Plano(270, 200, 0, 4.6, 0, 5.6, 26)
    for i in range(8):
        x0 = i * 0.5
        h = f(x0)
        p.add(rect(p.px(x0), p.py(h), p.px(0.5) - p.px(0), p.py(0) - p.py(h), A, FA, 0, 1))
    p.ejes('ar', xt=(1, 2, 3, 4), yt=(1, 2, 3, 4, 5), etiquetas_x=('1', '2', '3', 'b = 4'))
    p.curva(f, 0, 4.4, O, 2.4)
    p.texto(2.6, 4.6, 'f(x)', O, 'end', tam=10, neg=True)
    return p.svg()


# ---------------------------------------------------------------- 1.29
def fig_venn():
    b = '<defs><clipPath id="clipA"><circle cx="100" cy="82" r="56"/></clipPath></defs>'
    b += rect(6, 6, 248, 150, G, '#fafbfc', 6)
    b += texto(14, 22, 'E = {1, 2, 3, 4, 5, 6}', G, tam=9, neg=True)
    b += circulo(160, 84, 56, O, FO, 2)
    b += circulo(100, 82, 56, A, 'none', 2)
    b += '<circle cx="160" cy="84" r="56" fill="#d9c6ec" clip-path="url(#clipA)"/>'
    b += circulo(100, 82, 56, A, 'none', 2) + circulo(160, 84, 56, O, 'none', 2)
    b += texto(42, 52, 'A', A, 'middle', 13, True) + texto(224, 52, 'B', O, 'middle', 13, True)
    b += texto(76, 88, '2', T, 'middle', 13, True)
    b += texto(130, 80, '4  6', T, 'middle', 13, True)
    b += texto(130, 96, 'A ∩ B', M, 'middle', 8.5, True)
    b += texto(188, 90, '5', T, 'middle', 13, True)
    b += texto(234, 142, '1  3', T, 'end', 12, True)
    return svg(260, 162, b)


def fig_arbol():
    b = ''
    raiz = (20, 92)
    n1 = {'C': (95, 48), 'X': (95, 136)}
    n2 = {'CC': (175, 22), 'CX': (175, 70), 'XC': (175, 114), 'XX': (175, 162)}
    for k, (x, y) in n1.items():
        b += linea(raiz[0], raiz[1], x - 8, y, A, 1.6)
        b += texto((raiz[0] + x) / 2 - 4, (raiz[1] + y) / 2 + (-4 if y < 92 else 12), '½', A, 'middle', 9, True)
        b += texto(x, y + 4, k, T, 'middle', 11, True)
    for k, (x, y) in n2.items():
        px, py = n1[k[0]]
        b += linea(px + 8, py, x - 12, y, O, 1.6)
        b += texto((px + x) / 2, (py + y) / 2 + (-3 if y < py else 11), '½', O, 'middle', 9, True)
        b += texto(x, y + 4, k, T, 'middle', 11, True)
        b += texto(x + 22, y + 4, 'P = ½ · ½ = ¼', G, tam=9)
    b += punto(raiz[0], raiz[1], T, 3.5)
    b += texto(95, 186, '1.er lanzamiento', G, 'middle', 8.5) + texto(175, 186, '2.º lanzamiento', G, 'middle', 8.5)
    return svg(300, 192, b)


FIGURAS = {k[4:]: v for k, v in globals().items() if k.startswith('fig_')}
