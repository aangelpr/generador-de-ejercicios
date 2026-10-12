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


def svg(w, h, cuerpo, ident='', escala=1):
    return ('<svg width="%s" height="%s" viewBox="0 0 %s %s" xmlns="http://www.w3.org/2000/svg" '
            'font-family="DejaVu Sans" font-size="10">%s</svg>' % (n(w * escala), n(h * escala), w, h, cuerpo))


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

    def ejes(self, ident, xt=(), yt=(), xn='x', yn='y', rejilla=False, etiquetas_x=None, etiquetas_y=None, abajo=False):
        if rejilla:
            for x in range(math.ceil(self.xmin), math.floor(self.xmax) + 1):
                self.add(linea(self.px(x), self.py(self.ymin), self.px(x), self.py(self.ymax), '#e3e7ee', 1))
            for y in range(math.ceil(self.ymin), math.floor(self.ymax) + 1):
                self.add(linea(self.px(self.xmin), self.py(y), self.px(self.xmax), self.py(y), '#e3e7ee', 1))
        y0 = 0 if (self.ymin <= 0 <= self.ymax and not abajo) else self.ymin
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


# ================================================================ FISICA
def anidar(ancho, alto, *partes, extra=''):
    """Pone varios <svg> lado a lado dentro de uno solo. partes = (x, y, svg)."""
    cuerpo = ''
    for x, y, sv in partes:
        cuerpo += sv.replace('<svg ', '<svg x="%s" y="%s" ' % (x, y), 1)
    return svg(ancho, alto, cuerpo + extra)

def flecha(x1, y1, x2, y2, color, ident, ancho=2.2):
    return ('<defs><marker id="fl%s" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">'
            '<path d="M0,0 L9,4.5 L0,9 z" fill="%s"/></marker></defs>' % (ident, color) +
            '<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="%s" marker-end="url(#fl%s)"/>' % (
                n(x1), n(y1), n(x2), n(y2), color, ancho, ident))


def fig_triangulo_formula():
    b = ''
    datos = [('d', 'v', 't', 'd = v · t', A), ('F', 'm', 'a', 'F = m · a', O), ('V', 'I', 'R', 'V = I · R', V)]
    for i, (arriba, izq, der, nombre, c) in enumerate(datos):
        x0 = 20 + i * 150
        b += poligono([(x0 + 55, 10), (x0, 100), (x0 + 110, 100)], c, '#fff', 2)
        b += linea(x0 + 22, 62, x0 + 88, 62, c, 1.6)
        b += linea(x0 + 55, 62, x0 + 55, 100, c, 1.6)
        b += texto(x0 + 55, 50, arriba, c, 'middle', 18, True, ital=True, serif=True)
        b += texto(x0 + 33, 90, izq, c, 'middle', 16, True, ital=True, serif=True)
        b += texto(x0 + 77, 90, der, c, 'middle', 16, True, ital=True, serif=True)
        b += texto(x0 + 55, 120, nombre, T, 'middle', 10, True)
    return svg(460, 128, b)


def fig_mru_mua():
    p1 = Plano(230, 180, 0, 6, 0, 13, 26)
    p1.ejes('m1', xt=(1, 2, 3, 4, 5), yt=(4, 8, 12), xn='t (s)', yn='d (m)')
    p1.curva(lambda t: 2 * t, 0, 5.8, A, 2.4)
    p1.segmento(2, 0, 2, 4, G, 1, '3 3')
    p1.segmento(0, 4, 2, 4, G, 1, '3 3')
    p1.segmento(2, 4, 4, 4, V, 1.6)
    p1.segmento(4, 4, 4, 8, O, 1.6)
    p1.texto(3, 4, 'Δt = 2 s', V, 'middle', dy=12, tam=8.5, neg=True)
    p1.texto(4, 6, 'Δd = 4 m', O, dx=4, tam=8.5, neg=True)
    p2 = Plano(230, 180, 0, 6, 0, 13, 26)
    pts = 'M%s,%s L%s,%s L%s,%s L%s,%s Z' % (n(p2.px(0)), n(p2.py(0)), n(p2.px(0)), n(p2.py(2)),
                                            n(p2.px(5)), n(p2.py(12)), n(p2.px(5)), n(p2.py(0)))
    p2.add(camino(pts, 'none', 0, FV))
    p2.ejes('m2', xt=(1, 2, 3, 4, 5), yt=(2, 4, 8, 12), xn='t (s)', yn='v (m/s)')
    p2.curva(lambda t: 2 + 2 * t, 0, 5.4, O, 2.4)
    p2.punto(0, 2, O, 3.5)
    p2.texto(2.5, 2.5, 'área = distancia', V, 'middle', tam=8.5, neg=True)
    extra = texto(115, 14, 'MRU: pendiente = v = 2 m/s', A, 'middle', 9.5, True)
    extra += texto(355, 14, 'MUA: pendiente = a = 2 m/s²', O, 'middle', 9.5, True)
    return anidar(470, 200, (0, 20, p1.svg()), (240, 20, p2.svg()), extra=extra)

def fig_fuerzas():
    b = rect(10, 150, 300, 6, G, '#d9dee6', 0, 1)
    b += rect(115, 90, 90, 60, A, FA, 4, 2)
    b += texto(160, 125, '5 kg', A, 'middle', 12, True)
    b += flecha(205, 112, 290, 112, O, 'fa')
    b += texto(250, 104, 'F = 40 N', O, 'middle', 10, True)
    b += flecha(115, 132, 45, 132, M, 'ff')
    b += texto(72, 124, 'fricción 10 N', M, 'middle', 9, True)
    b += flecha(160, 150, 160, 205, V, 'fp')
    b += texto(168, 200, 'peso W = mg', V, tam=9, neg=True)
    b += flecha(140, 90, 140, 40, T, 'fn')
    b += texto(146, 50, 'normal N', T, tam=9, neg=True)
    b += texto(160, 228, 'fuerza neta = 40 N − 10 N = 30 N →', T, 'middle', 10, True)
    return svg(320, 236, b)

def fig_tiro_vertical():
    b = linea(20, 222, 310, 222, G, 1.6)
    b += linea(30, 46, 300, 46, G, 1, '4 3')
    b += texto(34, 40, 'altura máxima: v = 0', O, tam=9, neg=True)
    ys = [205, 160, 120, 86]
    vs = [46, 36, 26, 15]
    for i, (y, v) in enumerate(zip(ys, vs)):
        b += circulo(100, y, 7, A, FA, 1.6)
        b += flecha(116, y + v / 2, 116, y - v / 2, A, 'tv%d' % i, 1.8)
        b += circulo(200, y, 7, M, FM, 1.6)
        b += flecha(216, y - v / 2, 216, y + v / 2, M, 'tb%d' % i, 1.8)
    b += circulo(150, 56, 7, O, FO, 1.6)
    b += texto(100, 240, 'sube: v disminuye', A, 'middle', 9, True)
    b += texto(200, 240, 'baja: v aumenta', M, 'middle', 9, True)
    b += flecha(270, 120, 270, 170, V, 'tg', 2.2)
    b += texto(278, 150, 'g', V, tam=12, neg=True, ital=True, serif=True)
    return svg(320, 248, b)

def fig_kepler():
    cx, cy, a, bb = 195, 100, 120, 95
    c = math.sqrt(a * a - bb * bb)
    sol = (cx + c, cy)
    def pto(E):
        return (cx + a * math.cos(E), cy - bb * math.sin(E))
    elipse = 'M' + ' L'.join('%s,%s' % (n(x), n(y)) for x, y in (pto(math.radians(k)) for k in range(0, 361, 3))) + ' Z'
    def sector(E1, E2, color):
        pts = [pto(E1 + (E2 - E1) * k / 30) for k in range(31)]
        d = 'M%s,%s L' % (n(sol[0]), n(sol[1])) + ' L'.join('%s,%s' % (n(x), n(y)) for x, y in pts) + ' Z'
        return camino(d, color, 1.2, color + '55')
    b = sector(-0.5, 0.5, '#2e7d4f')
    d = 0.1288
    b += sector(math.pi - d, math.pi + d, '#6b4fa3')
    b += camino(elipse, A, 2)
    b += circulo(sol[0], sol[1], 11, '#d4a017', '#ffd34d', 1.5)
    b += texto(sol[0] - 4, sol[1] + 28, 'Sol (en un foco)', '#8a6400', 'middle', 9, True)
    b += punto(cx - c, cy, G, 2.5)
    b += texto(cx + a + 6, cy - 30, 'perihelio:', V, tam=9, neg=True)
    b += texto(cx + a + 6, cy - 18, 'va más rápido', V, tam=9)
    b += texto(cx - a - 6, cy - 30, 'afelio:', M, 'end', 9, True)
    b += texto(cx - a - 6, cy - 18, 'va más lento', M, 'end', 9)
    b += texto(cx, 214, 'Las dos áreas sombreadas son iguales: se recorren en el mismo tiempo', T, 'middle', 9, True)
    return svg(400, 222, b)

def onda(x1, y1, x2, y2, color, ancho=1.8):
    dx, dy = x2 - x1, y2 - y1
    L = math.hypot(dx, dy)
    ux, uy = dx / L, dy / L
    nx, ny = -uy, ux
    pts = []
    for k in range(0, 41):
        t = k / 40
        s = math.sin(t * 4 * 2 * math.pi) * 4
        pts.append((x1 + dx * t + nx * s, y1 + dy * t + ny * s))
    return camino('M' + ' L'.join('%s,%s' % (n(x), n(y)) for x, y in pts), color, ancho)


def fig_calor():
    b = ''
    # conduccion
    b += rect(20, 60, 120, 14, G, '#c9ced6', 3, 1.2)
    b += poligono([(14, 96), (26, 72), (38, 96)], O, '#f6b38a', 1.2)
    for k in range(3):
        b += flecha(50 + k * 30, 54, 70 + k * 30, 54, O, 'cc%d' % k, 1.6)
    b += texto(80, 116, 'Conducción', A, 'middle', 10, True)
    b += texto(80, 130, 'por contacto, en sólidos', G, 'middle', 8.5)
    # conveccion
    b += rect(185, 40, 90, 60, A, '#dbeefa', 4, 1.6)
    b += poligono([(218, 120), (230, 102), (242, 120)], O, '#f6b38a', 1.2)
    b += camino('M205,90 C200,60 215,50 225,55 C240,62 235,85 230,90', O, 1.8)
    b += camino('M255,90 C260,60 245,50 237,55', V, 1.8)
    b += texto(230, 116 + 14, 'Convección', A, 'middle', 10, True)
    b += texto(230, 144, 'el fluido caliente sube', G, 'middle', 8.5)
    # radiacion
    b += circulo(345, 60, 16, '#d4a017', '#ffd34d', 1.5)
    for ang in range(0, 360, 45):
        r1, r2 = 20, 26
        b += linea(345 + r1 * math.cos(math.radians(ang)), 60 - r1 * math.sin(math.radians(ang)),
                   345 + r2 * math.cos(math.radians(ang)), 60 - r2 * math.sin(math.radians(ang)), '#d4a017', 1.4)
    b += onda(372, 60, 432, 60, O)
    b += circulo(446, 60, 12, A, FA, 1.5)
    b += texto(395, 116, 'Radiación', A, 'middle', 10, True)
    b += texto(395, 130, 'ondas, aun en el vacío', G, 'middle', 8.5)
    return svg(470, 150, b)


def fig_sistemas():
    b = ''
    titulos = [('Abierto', 'materia y energía'), ('Cerrado', 'solo energía'), ('Aislado', 'nada')]
    for i, (t, s) in enumerate(titulos):
        x0 = 20 + i * 155
        if i == 0:
            b += camino('M%s,30 L%s,100 L%s,100 L%s,30' % (x0, x0, x0 + 90, x0 + 90), A, 2)
        elif i == 1:
            b += rect(x0, 30, 90, 70, A, 'none', 4, 2)
        else:
            b += rect(x0 - 4, 26, 98, 78, T, 'none', 6, 3)
            b += rect(x0, 30, 90, 70, T, 'none', 4, 1.4)
        b += rect(x0 + 2, 62, 86, 36, 'none', '#cfe6f5', 0, 0)
        if i == 0:
            b += flecha(x0 + 30, 50, x0 + 30, 8, O, 'sa1', 1.8)
            b += texto(x0 + 36, 14, 'vapor', O, tam=8.5)
            b += onda(x0 + 120, 70, x0 + 96, 70, '#d4a017', 1.5)
        if i == 1:
            b += onda(x0 + 122, 66, x0 + 96, 66, '#d4a017', 1.5)
            b += texto(x0 + 100, 52, 'calor', '#8a6400', tam=8.5)
        if i == 2:
            b += linea(x0 + 104, 50, x0 + 124, 80, O, 2)
            b += linea(x0 + 124, 50, x0 + 104, 80, O, 2)
        b += texto(x0 + 45, 124, t, A, 'middle', 10, True)
        b += texto(x0 + 45, 138, s, G, 'middle', 8.5)
    return svg(480, 146, b)


def fig_boyle():
    p = Plano(250, 200, 0, 6.5, 0, 6.5, 26)
    p.ejes('by', xt=(1, 2, 3, 4, 5, 6), yt=(1, 2, 3, 4, 5, 6), xn='V', yn='P')
    p.curva(lambda v: 6 / v, 0.95, 6.3, A, 2.4)
    for v, pr in ((2, 3), (3, 2)):
        p.segmento(v, 0, v, pr, G, 1, '3 3')
        p.segmento(0, pr, v, pr, G, 1, '3 3')
        p.punto(v, pr, O, 4)
    p.texto(2, 3, '2 × 3 = 6', O, dx=6, dy=-6, tam=9, neg=True)
    p.texto(3, 2, '3 × 2 = 6', O, dx=6, dy=-6, tam=9, neg=True)
    p.texto(6.3, 5.8, 'P · V = constante', A, 'end', tam=9.5, neg=True)
    return p.svg()


def resorte(x, y1, y2, vueltas=8, ancho=12, color=G):
    pts = [(x, y1), (x, y1 + 6)]
    paso = (y2 - y1 - 12) / (vueltas * 2)
    for k in range(vueltas * 2):
        pts.append((x + (ancho if k % 2 == 0 else -ancho), y1 + 6 + paso * (k + 0.5)))
    pts += [(x, y2 - 6), (x, y2)]
    return camino('M' + ' L'.join('%s,%s' % (n(a), n(c)) for a, c in pts), color, 1.6)


def fig_hooke():
    b = rect(20, 14, 160, 8, G, '#c9ced6', 0, 1)
    b += resorte(60, 22, 90)
    b += texto(60, 108, 'sin peso', G, 'middle', 8.5)
    b += resorte(135, 22, 140)
    b += rect(115, 140, 40, 30, A, FA, 3, 1.8)
    b += texto(135, 160, 'm', A, 'middle', 12, True, ital=True, serif=True)
    b += linea(160, 90, 178, 90, O, 1, '3 2') + linea(160, 140, 178, 140, O, 1, '3 2')
    b += flecha(172, 100, 172, 136, O, 'hx', 1.6)
    b += texto(182, 120, 'x', O, tam=12, neg=True, ital=True, serif=True)
    b += flecha(135, 172, 135, 200, V, 'hw', 2)
    b += texto(142, 198, 'F = mg', V, tam=9, neg=True)
    p = Plano(200, 200, 0, 5, 0, 5, 26)
    p.ejes('hk', xt=(1, 2, 3, 4), yt=(1, 2, 3, 4), xn='x', yn='F')
    p.curva(lambda x: x, 0, 4.6, A, 2.4)
    p.texto(2.2, 3.4, 'pendiente = k', A, 'end', tam=9, neg=True)
    return anidar(420, 210, (0, 0, svg(210, 210, b)), (215, 5, p.svg()))


def fig_prensa():
    b = camino('M30,60 L30,170 L250,170 L250,40 L170,40 L170,140 L80,140 L80,60', G, 2)
    b += camino('M32,92 L32,168 L248,168 L248,72 L172,72 L172,142 L78,142 L78,92 Z', 'none', 0, '#cfe6f5')
    b += rect(30, 82, 50, 10, T, '#9aa3b2', 1, 1.2)
    b += rect(170, 62, 80, 10, T, '#9aa3b2', 1, 1.2)
    b += flecha(55, 30, 55, 78, O, 'pr1', 2.2)
    b += texto(62, 40, 'F₁ (chica)', O, tam=9.5, neg=True)
    b += flecha(210, 58, 210, 14, V, 'pr2', 3)
    b += texto(224, 30, 'F₂ (grande)', V, tam=9.5, neg=True)
    b += texto(55, 110, 'A₁', T, 'middle', 11, True)
    b += texto(210, 100, 'A₂', T, 'middle', 11, True)
    b += texto(140, 160, 'la presión se transmite igual', A, 'middle', 9, True)
    return svg(300, 182, b)


def fig_arquimedes():
    b = rect(40, 50, 200, 140, G, 'none', 2, 2)
    b += rect(42, 80, 196, 108, 'none', '#cfe6f5', 0, 0)
    b += linea(42, 80, 238, 80, A, 1.4)
    b += texto(234, 74, 'agua', A, 'end', 9)
    b += rect(110, 105, 60, 50, T, '#d8c3a5', 2, 1.6)
    b += flecha(140, 130, 140, 182, O, 'aw', 2.4)
    b += texto(146, 178, 'peso W', O, tam=9.5, neg=True)
    b += flecha(126, 130, 126, 66, V, 'ae', 2.4)
    b += texto(114, 70, 'empuje E', V, 'end', 9.5, True)
    b += texto(140, 210, 'E = peso del agua desalojada = ρ·g·V', T, 'middle', 9.5, True)
    return svg(280, 218, b)


def fig_circuito():
    b = rect(40, 30, 220, 120, T, 'none', 2, 2)
    b += rect(30, 70, 20, 40, '#fff', '#fff', 0, 0)
    b += linea(26, 80, 54, 80, T, 2.4) + linea(32, 92, 48, 92, T, 4)
    b += linea(26, 102, 54, 102, T, 2.4) + linea(32, 114, 48, 114, T, 4)
    b += texto(22, 98, 'V', O, 'end', 13, True, ital=True, serif=True)
    b += texto(22, 112, 'pila', G, 'end', 8.5)
    zig = 'M110,30 L118,20 L130,40 L142,20 L154,40 L166,20 L178,40 L190,30'
    b += rect(108, 18, 84, 24, '#fff', '#fff', 0, 0)
    b += camino(zig, M, 2)
    b += texto(150, 14, 'resistencia R', M, 'middle', 9.5, True)
    b += flecha(190, 150, 120, 150, A, 'ci', 2.2)
    b += texto(155, 168, 'corriente I', A, 'middle', 9.5, True)
    return svg(290, 176, b)


def fig_snell():
    b = rect(10, 10, 280, 100, 'none', '#f4f8fb', 0, 0)
    b += rect(10, 110, 280, 100, 'none', '#dbeefa', 0, 0)
    b += linea(10, 110, 290, 110, A, 1.6)
    b += linea(150, 15, 150, 205, G, 1.2, '5 4')
    b += texto(154, 24, 'normal', G, tam=8.5)
    t1, t2 = math.radians(50), math.radians(30)
    x1, y1 = 150 - 95 * math.sin(t1), 110 - 95 * math.cos(t1)
    x2, y2 = 150 + 95 * math.sin(t2), 110 + 95 * math.cos(t2)
    b += flecha(x1, y1, 147, 107, O, 'sn1', 2.2)
    b += linea(150, 110, x2, y2, O, 2.2)
    b += camino('M150,80 A30,30 0 0 0 %s,%s' % (n(150 - 30 * math.sin(t1)), n(110 - 30 * math.cos(t1))), M, 1.6)
    b += texto(132, 76, 'θ₁', M, 'middle', 11, True)
    b += camino('M150,140 A30,30 0 0 0 %s,%s' % (n(150 + 30 * math.sin(t2)), n(110 + 30 * math.cos(t2))), V, 1.6)
    b += texto(160, 158, 'θ₂', V, 'middle', 11, True)
    b += texto(20, 28, 'medio 1: aire (n₁)', T, tam=9.5, neg=True)
    b += texto(20, 200, 'medio 2: vidrio o agua (n₂)', T, tam=9.5, neg=True)
    b += texto(286, 100, 'la luz se acerca a la normal', O, 'end', 8.5)
    return svg(300, 216, b)


# ================================================================ QUIMICA
def fig_bohr():
    cx, cy = 120, 110
    b = ''
    for r in (34, 62, 90):
        b += circulo(cx, cy, r, G, 'none', 1.2, '4 3')
    b += circulo(cx, cy, 16, O, FO, 1.6)
    b += texto(cx, cy + 4, 'p⁺ n', O, 'middle', 9, True)
    for r, angs in ((34, (90, 270)), (62, (20, 110, 200, 290)), (90, (60, 150))):
        for ang in angs:
            b += circulo(cx + r * math.cos(math.radians(ang)), cy - r * math.sin(math.radians(ang)), 4, A, A, 1)
    b += texto(cx + 18, cy + 34 + 12, 'n = 1', G, tam=8)
    b += texto(cx + 30, cy + 62 + 8, 'n = 2', G, tam=8)
    b += texto(cx + 50, cy + 90 + 4, 'n = 3', G, tam=8)
    b += onda(270, 50, cx + 70, cy - 52, '#d4a017', 1.6)
    b += texto(272, 44, 'absorbe un fotón:', T, tam=8.5, neg=True)
    b += texto(272, 56, 'sube de nivel', T, tam=8.5)
    b += onda(cx + 64, cy + 30, 270, 170, M, 1.6)
    b += texto(272, 182, 'emite un fotón:', T, tam=8.5, neg=True)
    b += texto(272, 194, 'baja de nivel', T, tam=8.5)
    b += texto(190, 214, 'núcleo: protones y neutrones · electrones en niveles', T, 'middle', 8.5, True)
    return svg(380, 220, b)


PERIODOS = {1: [1, 18], 2: [1, 2] + list(range(13, 19)), 3: [1, 2] + list(range(13, 19)),
            4: list(range(1, 19)), 5: list(range(1, 19)), 6: list(range(1, 19)), 7: list(range(1, 19))}


def fig_tabla_bloques():
    s = 17
    x0, y0 = 30, 26
    b = ''
    colores = {'s': (FO, O), 'p': (FV, V), 'd': (FA, A), 'f': (FM, M)}
    def bloque(g):
        if g <= 2:
            return 's'
        if g >= 13:
            return 'p'
        return 'd'
    for per, grupos in PERIODOS.items():
        for g in grupos:
            blq = 's' if (per == 1 and g == 18) else bloque(g)
            if per == 1 and g == 18:
                blq = 's'
            f, c = colores[blq]
            b += rect(x0 + (g - 1) * s, y0 + (per - 1) * s, s - 1, s - 1, c, f, 1, 0.8)
        b += texto(x0 - 6, y0 + (per - 1) * s + 12, str(per), G, 'end', 8.5)
    for fila in range(2):
        for k in range(14):
            f, c = colores['f']
            b += rect(x0 + (3 + k) * s, y0 + (8 + fila) * s - 6, s - 1, s - 1, c, f, 1, 0.8)
    b += texto(x0 + s, y0 - 8, 's', O, 'middle', 11, True)
    b += texto(x0 + 7.5 * s, y0 - 8, 'd', A, 'middle', 11, True)
    b += texto(x0 + 15.5 * s, y0 - 8, 'p', V, 'middle', 11, True)
    b += texto(x0 + 2.5 * s, y0 + 9 * s, 'f', M, 'middle', 11, True)
    return svg(x0 + 18 * s + 10, y0 + 10 * s, b)


def fig_tabla_tipos():
    s = 18
    x0, y0 = 20, 20
    nometal = {(1, 1), (2, 14), (2, 15), (2, 16), (2, 17), (3, 15), (3, 16), (3, 17), (4, 16), (4, 17), (5, 17)}
    metaloide = {(2, 13), (3, 14), (4, 14), (4, 15), (5, 15), (5, 16), (6, 17)}
    simbolos = {(1, 1): 'H', (1, 18): 'He', (2, 1): 'Li', (2, 6 + 8): 'C', (2, 15): 'N', (2, 16): 'O', (2, 17): 'F',
                (2, 18): 'Ne', (3, 1): 'Na', (3, 17): 'Cl', (4, 8): 'Fe', (4, 12): 'Zn', (4, 11): 'Cu', (3, 14): 'Si',
                (6, 11): 'Au', (4, 2): 'Ca', (3, 13): 'Al', (2, 13): 'B'}
    b = ''
    for per, grupos in PERIODOS.items():
        for g in grupos:
            if g == 18:
                f, c = '#fff3c4', '#b8860b'
            elif (per, g) in nometal:
                f, c = FV, V
            elif (per, g) in metaloide:
                f, c = FM, M
            else:
                f, c = FA, A
            b += rect(x0 + (g - 1) * s, y0 + (per - 1) * s, s - 1, s - 1, c, f, 1, 0.8)
            if (per, g) in simbolos:
                b += texto(x0 + (g - 1) * s + s / 2 - 0.5, y0 + (per - 1) * s + 12, simbolos[(per, g)], T, 'middle', 7.5, True)
    ly = y0 + 7 * s + 16
    for i, (f, c, t) in enumerate(((FA, A, 'metales'), (FV, V, 'no metales'), (FM, M, 'metaloides'), ('#fff3c4', '#b8860b', 'gases nobles'))):
        b += rect(x0 + i * 85, ly, 12, 12, c, f, 1, 0.8)
        b += texto(x0 + i * 85 + 16, ly + 10, t, T, tam=9)
    return svg(x0 + 18 * s + 10, ly + 22, b)


def fig_moeller():
    b = ''
    cols = 's p d f'.split()
    filas = {1: 1, 2: 2, 3: 3, 4: 4, 5: 4, 6: 3, 7: 2}
    pos = {}
    for nn, k in filas.items():
        for j in range(k):
            x, y = 40 + j * 52, 22 + (nn - 1) * 26
            pos[(nn, j)] = (x, y)
            b += texto(x, y + 4, '%d%s' % (nn, cols[j]), T, 'middle', 11, True)
    for suma in range(1, 9):
        cel = sorted([(nn, j) for (nn, j) in pos if nn + j == suma], key=lambda q: q[0])
        if not cel:
            continue
        xa, ya = pos[cel[0]]
        xb, yb = pos[cel[-1]]
        if len(cel) == 1:
            xa, ya = xa + 14, ya - 10
            xb, yb = xb - 14, yb + 10
        else:
            xa, ya = xa + 12, ya - 10
            xb, yb = xb - 12, yb + 10
        b += flecha(xa, ya, xb, yb, O, 'mo%d' % suma, 1.4)
    b += texto(260, 30, 'Sigue las flechas', A, tam=9.5, neg=True)
    b += texto(260, 44, 'de arriba hacia abajo:', A, tam=9.5, neg=True)
    b += texto(260, 64, '1s 2s 2p 3s 3p 4s', T, tam=9.5)
    b += texto(260, 78, '3d 4p 5s 4d 5p 6s', T, tam=9.5)
    b += texto(260, 92, '4f 5d 6p 7s 5f 6d 7p', T, tam=9.5)
    b += texto(260, 118, 'Capacidad:', A, tam=9.5, neg=True)
    b += texto(260, 132, 's = 2, p = 6,', T, tam=9.5)
    b += texto(260, 146, 'd = 10, f = 14', T, tam=9.5)
    return svg(400, 204, b)


def fig_estados():
    S_, L_, G_ = (60, 170), (300, 170), (180, 40)
    b = ''
    for (x, y), t, c, f in ((S_, 'SÓLIDO', A, FA), (L_, 'LÍQUIDO', V, FV), (G_, 'GAS', O, FO)):
        b += rect(x - 45, y - 16, 90, 32, c, f, 8, 1.8)
        b += texto(x, y + 5, t, c, 'middle', 11, True)
    b += flecha(108, 162, 252, 162, '#b5542a', 'e1', 1.8)
    b += texto(180, 155, 'fusión', '#b5542a', 'middle', 9, True)
    b += flecha(252, 182, 108, 182, A, 'e2', 1.8)
    b += texto(180, 198, 'solidificación', A, 'middle', 9, True)
    b += flecha(282, 150, 210, 60, '#b5542a', 'e3', 1.8)
    b += texto(258, 98, 'evaporación', '#b5542a', tam=9, neg=True)
    b += flecha(196, 62, 266, 150, A, 'e4', 1.8)
    b += texto(224, 104, 'condensación', A, 'end', 9, True)
    b += flecha(76, 150, 150, 60, '#b5542a', 'e5', 1.8)
    b += texto(98, 92, 'sublimación', '#b5542a', 'end', 9, True)
    b += flecha(164, 62, 94, 150, A, 'e6', 1.8)
    b += texto(128, 128, 'deposición', A, tam=9, neg=True)
    b += texto(180, 224, 'naranja: absorbe calor · azul: libera calor', G, 'middle', 9)
    return svg(360, 232, b)

def fig_curva_calentamiento():
    p = Plano(330, 220, 0, 165, -45, 145, 30)
    p.ejes('cc', xt=(50, 100, 150), yt=(-20, 0, 20, 40, 60, 80, 100, 120), xn='tiempo', yn='T (°C)', abajo=True)
    p.segmento(0, 0, 165, 0, '#c9ced6', 1, '3 3')
    pts = [(0, -30), (20, 0), (50, 0), (90, 100), (130, 100), (150, 130)]
    d = 'M' + ' L'.join('%s,%s' % (n(p.px(x)), n(p.py(y))) for x, y in pts)
    p.add(camino(d, O, 2.6))
    for (x, y), et in zip(pts, 'ABCDEF'):
        p.punto(x, y, T, 3)
        p.texto(x, y, et, T, dx=-4, dy=-7, tam=9, neg=True)
    p.texto(13, -22, 'hielo', A, tam=8.5, neg=True)
    p.texto(35, 0, 'fusión', V, 'middle', dy=14, tam=8.5, neg=True)
    p.texto(72, 50, 'agua líquida', A, tam=8.5, neg=True)
    p.texto(110, 100, 'ebullición', V, 'middle', dy=14, tam=8.5, neg=True)
    p.texto(146, 122, 'vapor', A, 'end', tam=8.5, neg=True)
    return p.svg()


def fig_mezclas():
    b = ''
    def caja(x, y, w, h, t1, t2, c, f):
        s = rect(x, y, w, h, c, f, 6, 1.6)
        s += texto(x + w / 2, y + 15, t1, c, 'middle', 10, True)
        if t2:
            s += texto(x + w / 2, y + 29, t2, T, 'middle', 8.5)
        return s
    b += caja(170, 8, 120, 26, 'MATERIA', '', T, '#f4f6f8')
    b += linea(230, 34, 230, 46, G, 1.4) + linea(110, 46, 350, 46, G, 1.4)
    b += linea(110, 46, 110, 56, G, 1.4) + linea(350, 46, 350, 56, G, 1.4)
    b += caja(30, 56, 160, 40, 'Sustancias puras', 'composición fija', A, FA)
    b += caja(270, 56, 160, 40, 'Mezclas', 'se separan por medios físicos', O, FO)
    b += linea(110, 96, 110, 106, G, 1.4) + linea(60, 106, 160, 106, G, 1.4)
    b += linea(60, 106, 60, 116, G, 1.4) + linea(160, 106, 160, 116, G, 1.4)
    b += caja(10, 116, 100, 40, 'Elementos', 'Fe, O₂, Au', A, '#fff')
    b += caja(115, 116, 100, 40, 'Compuestos', 'H₂O, NaCl, CO₂', A, '#fff')
    b += linea(350, 96, 350, 106, G, 1.4) + linea(290, 106, 410, 106, G, 1.4)
    b += linea(290, 106, 290, 116, G, 1.4) + linea(410, 106, 410, 116, G, 1.4)
    b += caja(232, 116, 116, 40, 'Homogéneas', 'una sola fase', O, '#fff')
    b += caja(355, 116, 110, 40, 'Heterogéneas', 'fases distintas', O, '#fff')
    b += texto(290, 172, 'disoluciones: agua salada,', T, 'middle', 8.5)
    b += texto(290, 184, 'aire, vinagre, latón', T, 'middle', 8.5)
    b += texto(410, 172, 'suspensiones, arena y', T, 'middle', 8.5)
    b += texto(410, 184, 'agua (los coloides, en medio)', T, 'middle', 8.5)
    return svg(476, 192, b, escala=1.2)


def fig_ph():
    b = ''
    colores = ['#d7263d', '#e8492f', '#f26b2a', '#f8962e', '#f9c22e', '#e6d63a', '#b9d84a', '#5cb85c',
               '#3fae8f', '#3a9bb7', '#3b7dc4', '#4560bd', '#5a4bb0', '#6a3ea1', '#5b2a86']
    w = 30
    for k in range(15):
        b += rect(15 + k * w, 70, w, 26, 'none', colores[k], 0, 0)
        b += texto(15 + k * w + w / 2, 87, str(k), '#fff' if k not in (4, 5, 6) else T, 'middle', 10, True)
    arriba = [(1.5, 'jugo gástrico'), (3, 'refresco'), (5, 'café'), (7, 'agua pura')]
    abajo = [(7.4, 'sangre'), (8.3, 'bicarbonato'), (11, 'amoniaco'), (12.5, 'cloro (lejía)'), (14, 'sosa')]
    def x(ph):
        return 15 + ph * w + w / 2 if ph < 14 else 15 + 14 * w + w / 2
    for i, (ph, t) in enumerate(arriba):
        b += linea(x(ph), 66, x(ph), 54 - (i % 2) * 14, G, 1)
        b += texto(x(ph), 50 - (i % 2) * 14, t, T, 'middle', 8.5)
    for i, (ph, t) in enumerate(abajo):
        b += linea(x(ph), 100, x(ph), 112 + (i % 2) * 14, G, 1)
        b += texto(x(ph), 122 + (i % 2) * 14, t, T, 'middle', 8.5)
    b += texto(15, 12, '← ÁCIDO (más H⁺)', '#d7263d', tam=10, neg=True)
    b += texto(15 + 7.5 * w, 12, 'NEUTRO', '#2e7d4f', 'middle', 10, True)
    b += texto(15 + 15 * w, 12, 'BÁSICO (alcalino) →', '#5a4bb0', 'end', 10, True)
    return svg(15 + 15 * w + 15, 146, b, escala=1.2)


def lewis(x, y, simbolo, ne, color=T):
    """Simbolo con sus electrones de valencia como puntos (arriba, derecha, abajo, izquierda)."""
    b = texto(x, y + 6, simbolo, color, 'middle', 16, True)
    h = 16 + 5 * (len(simbolo) - 1)
    lados = [(0, -16), (h, 0), (0, 16), (-h, 0)]
    cuenta = [0, 0, 0, 0]
    for k in range(ne):
        cuenta[k % 4] += 1
    for (dx, dy), c in zip(lados, cuenta):
        if c == 0:
            continue
        offs = [0] if c == 1 else [-4, 4]
        for o in offs:
            px = x + dx + (o if dx == 0 else 0)
            py = y + dy + (o if dy == 0 else 0) + (1 if dy == 0 else 0)
            b += punto(px, py, O, 2.2)
    return b

def fig_lewis():
    b = ''
    datos = [('Li', 1), ('Be', 2), ('B', 3), ('C', 4), ('N', 5), ('O', 6), ('F', 7), ('Ne', 8)]
    for i, (s, ne) in enumerate(datos):
        x = 32 + i * 58
        b += lewis(x, 34, s, ne)
        b += texto(x, 72, '%d e⁻' % ne, G, 'middle', 9)
        b += texto(x, 86, 'grupo %d' % (i + 1 if i < 2 else i + 11), G, 'middle', 8)
    b += texto(240, 106, 'electrones de valencia: los del último nivel', A, 'middle', 9.5, True)
    return svg(480, 114, b, escala=1.15)


def fig_redox():
    b = flechas('rx', T)
    def px(v):
        return 40 + (v + 3) * 46
    b += linea(20, 70, 430, 70, T, 1.4, ini='rx', fin='rx')
    for v in range(-3, 6):
        b += linea(px(v), 64, px(v), 76, T, 1)
        b += texto(px(v), 92, ('+%d' % v) if v > 0 else menos(v), T, 'middle', 10, True)
    b += flecha(px(-1), 46, px(2), 46, O, 'ox', 2.4)
    b += texto(px(0.5), 36, 'OXIDACIÓN: el número aumenta (pierde e⁻)', O, 'middle', 9.5, True)
    b += flecha(px(4), 112, px(1), 112, A, 'rd', 2.4)
    b += texto(px(2.5), 130, 'REDUCCIÓN: el número disminuye (gana e⁻)', A, 'middle', 9.5, True)
    return svg(450, 140, b, escala=1.15)


def par(x, y, vertical=False, color=O):
    """Par de electrones solitario."""
    if vertical:
        return punto(x, y - 4, color, 2.2) + punto(x, y + 4, color, 2.2)
    return punto(x - 4, y, color, 2.2) + punto(x + 4, y, color, 2.2)


def fig_lewis_moleculas():
    b = ''
    # agua
    b += texto(30, 60, 'H', T, 'middle', 18, True) + linea(42, 54, 66, 54, T, 2)
    b += texto(80, 60, 'O', T, 'middle', 18, True) + linea(94, 54, 118, 54, T, 2)
    b += texto(130, 60, 'H', T, 'middle', 18, True)
    b += par(80, 34) + par(80, 74)
    b += texto(80, 100, 'H₂O: covalente polar', A, 'middle', 9.5, True)
    b += texto(80, 114, '2 pares compartidos y 2 solitarios', G, 'middle', 8.5)
    # nitrogeno
    x0 = 205
    b += par(x0 - 2, 54, True)
    b += texto(x0 + 14, 60, 'N', T, 'middle', 18, True)
    for dy in (-6, 0, 6):
        b += linea(x0 + 28, 54 + dy, x0 + 56, 54 + dy, T, 1.8)
    b += texto(x0 + 70, 60, 'N', T, 'middle', 18, True)
    b += par(x0 + 86, 54, True)
    b += texto(x0 + 42, 100, 'N₂: covalente no polar', A, 'middle', 9.5, True)
    b += texto(x0 + 42, 114, 'enlace triple (3 pares)', G, 'middle', 8.5)
    # NaCl
    x1 = 350
    b += texto(x1, 60, 'Na⁺', T, 'middle', 18, True)
    b += texto(x1 + 38, 62, '[', T, 'middle', 26)
    b += texto(x1 + 66, 60, 'Cl', T, 'middle', 18, True)
    b += par(x1 + 66, 34) + par(x1 + 66, 74) + par(x1 + 46, 54, True) + par(x1 + 88, 54, True)
    b += texto(x1 + 96, 62, ']', T, 'middle', 26) + texto(x1 + 106, 46, '−', T, 'middle', 14, True)
    b += texto(x1 + 50, 100, 'NaCl: iónico', A, 'middle', 9.5, True)
    b += texto(x1 + 50, 114, 'el Na le cede 1 e⁻ al Cl', G, 'middle', 8.5)
    return svg(480, 122, b, escala=1.15)


def fig_modelos_atomicos():
    import random
    b = ''
    cy = 50
    datos = [('Dalton (1808)', 'esfera sólida', 'indivisible'),
             ('Thomson (1897)', 'esfera positiva con', 'electrones incrustados'),
             ('Rutherford (1911)', 'núcleo diminuto;', 'casi todo es vacío'),
             ('Bohr (1913)', 'electrones en niveles', 'de energía fijos'),
             ('Cuántico (1926)', 'orbitales: nubes', 'de probabilidad')]
    for i, (t1, t2, t3) in enumerate(datos):
        cx = 56 + i * 108
        if i == 0:
            b += circulo(cx, cy, 30, A, FA, 1.8)
            b += circulo(cx - 9, cy - 10, 7, 'none', '#ffffff', 0)
        elif i == 1:
            b += circulo(cx, cy, 32, O, FO, 1.8)
            for dx, dy in ((-16, -12), (4, -12), (20, -4), (-8, 4), (6, 20), (-22, 12)):
                b += texto(cx + dx, cy + dy + 3.5, '+', O, 'middle', 9, True)
            for dx, dy in ((-6, -18), (14, -20), (-20, -4), (4, 2), (18, 14), (-10, 18)):
                b += circulo(cx + dx, cy + dy, 3.6, A, A, 1)
        elif i == 2:
            for ang in (0, 60, 120):
                b += ('<ellipse cx="%s" cy="%s" rx="32" ry="11" stroke="%s" fill="none" stroke-width="1" '
                      'transform="rotate(%s %s %s)"/>' % (cx, cy, G, ang, cx, cy))
            b += punto(cx, cy, O, 3.5)
            for ang, fase in ((0, 30), (60, 200), (120, 300)):
                x = 32 * math.cos(math.radians(fase))
                y = 11 * math.sin(math.radians(fase))
                c, s = math.cos(math.radians(ang)), math.sin(math.radians(ang))
                b += circulo(cx + x * c - y * s, cy + x * s + y * c, 3.2, A, A, 1)
        elif i == 3:
            for r in (13, 23, 33):
                b += circulo(cx, cy, r, G, 'none', 1)
            b += punto(cx, cy, O, 5)
            for r, angs in ((13, (40, 220)), (23, (100, 190, 280, 10)), (33, (60, 240))):
                for ang in angs:
                    b += circulo(cx + r * math.cos(math.radians(ang)), cy - r * math.sin(math.radians(ang)), 3.2, A, A, 1)
        else:
            rnd = random.Random(7)
            for k in range(260):
                r = 34 * rnd.random() ** 1.15
                ang = rnd.random() * 2 * math.pi
                b += '<circle cx="%s" cy="%s" r="1.2" fill="%s" fill-opacity="0.55"/>' % (
                    n(cx + r * math.cos(ang)), n(cy + r * math.sin(ang)), A)
            b += punto(cx, cy, O, 3.5)
        b += texto(cx, 102, t1, T, 'middle', 9, True)
        b += texto(cx, 115, t2, G, 'middle', 8)
        b += texto(cx, 126, t3, G, 'middle', 8)
    return svg(544, 132, b, escala=1.2)


def fig_tyndall():
    b = ''
    datos = [('Disolución', 'el haz no se ve', 'partículas < 1 nm', '#e6f2f6'),
             ('Coloide', 'el haz se ve: efecto Tyndall', 'partículas medianas', '#f1eee6'),
             ('Suspensión', 'partículas visibles', 'que se asientan', '#f3ebdc')]
    for i, (t1, t2, t3, color) in enumerate(datos):
        x, y, w, h = 52 + i * 160, 26, 86, 90
        b += rect(x + 2, y + 16, w - 4, h - 18, 'none', color, 0, 0)
        if i < 2:
            b += rect(x - 40, 66, 22, 10, T, T, 2, 1)
            b += linea(x - 18, 71, x, 71, '#d7263d', 2)
            b += linea(x + w, 71, x + w + 18, 71, '#d7263d', 2)
        if i == 1:
            b += '<line x1="%s" y1="71" x2="%s" y2="71" stroke="#ff8a8a" stroke-width="7" stroke-opacity="0.55"/>' % (x, x + w)
            b += linea(x, 71, x + w, 71, '#d7263d', 2)
        if i == 2:
            import random
            rnd = random.Random(3)
            for k in range(70):
                px = x + 6 + rnd.random() * (w - 12)
                py = y + h - 5 - (rnd.random() ** 3) * 26
                b += punto(px, py, '#8a6a3a', 2.1)
            for k in range(7):
                b += punto(x + 10 + rnd.random() * (w - 20), y + 24 + rnd.random() * 30, '#8a6a3a', 1.8)
        b += camino('M%s,%s L%s,%s L%s,%s L%s,%s' % (x, y, x, y + h, x + w, y + h, x + w, y), G, 2)
        b += texto(x + w / 2, y + h + 18, t1, A, 'middle', 10, True)
        b += texto(x + w / 2, y + h + 31, t2, T, 'middle', 8.5)
        b += texto(x + w / 2, y + h + 43, t3, G, 'middle', 8.5)
    return svg(480, 164, b, escala=1.15)


def fig_conjugados():
    b = ''
    y = 64
    piezas = [(62, 'HCOOH'), (122, '+'), (178, 'H₂O'), (240, '⇌'), (304, 'H₃O⁺'), (362, '+'), (420, 'HCOO⁻')]
    for x, s in piezas:
        b += texto(x, y, s, T, 'middle', 15, True)
    for x, s, c in ((62, 'ácido', O), (178, 'base', A), (304, 'ácido conjugado', A), (420, 'base conjugada', O)):
        b += texto(x, y + 20, s, c, 'middle', 9, True)
    b += flechas('cj1', O) + flechas('cj2', A)
    b += camino('M62,44 C62,8 420,8 420,44', O, 1.6).replace('/>', ' marker-end="url(#fdcj1)"/>')
    b += texto(241, 35, 'pierde un H⁺', O, 'middle', 9)
    b += camino('M178,92 C178,130 304,130 304,92', A, 1.6).replace('/>', ' marker-end="url(#fdcj2)"/>')
    b += texto(241, 134, 'gana un H⁺', A, 'middle', 9)
    return svg(484, 142, b, escala=1.2)


def fig_tres_enlaces():
    b = ''
    # ionico: cristal de Na+ y Cl-
    for fila in range(3):
        for col in range(4):
            x, y = 34 + col * 30, 26 + fila * 30
            if (fila + col) % 2 == 0:
                b += circulo(x, y, 13, V, FV, 1.4) + texto(x, y + 4, '−', V, 'middle', 11, True)
            else:
                b += circulo(x, y, 8.5, A, FA, 1.4) + texto(x, y + 4, '+', A, 'middle', 10, True)
    b += texto(79, 118, 'Iónico', T, 'middle', 10, True)
    b += texto(79, 131, 'iones + y − que se atraen', G, 'middle', 8.5)
    b += texto(79, 143, 'y forman un cristal', G, 'middle', 8.5)
    # covalente: dos atomos que comparten un par
    cx = 250
    b += circulo(cx - 20, 56, 30, V, FV, 1.4) + circulo(cx + 20, 56, 30, V, FV, 1.4)
    b += texto(cx - 32, 61, 'Cl', T, 'middle', 13, True) + texto(cx + 32, 61, 'Cl', T, 'middle', 13, True)
    b += punto(cx, 50, O, 2.8) + punto(cx, 62, O, 2.8)
    b += texto(250, 118, 'Covalente', T, 'middle', 10, True)
    b += texto(250, 131, 'los átomos comparten', G, 'middle', 8.5)
    b += texto(250, 143, 'pares de electrones', G, 'middle', 8.5)
    # metalico: cationes en un mar de electrones
    b += rect(352, 8, 142, 96, '#9cc3d3', '#eef6f9', 10, 1.2)
    import random
    rnd = random.Random(5)
    for fila in range(3):
        for col in range(4):
            x, y = 372 + col * 34, 26 + fila * 30
            b += circulo(x, y, 10, G, '#f4f4f8', 1.3) + texto(x, y + 4, '+', G, 'middle', 10, True)
    cationes = [(372 + col * 34, 26 + fila * 30) for fila in range(3) for col in range(4)]
    for gx in range(355, 495, 17):
        for gy in range(13, 104, 15):
            x, y = gx + rnd.uniform(-2, 2), gy + rnd.uniform(-2, 2)
            if 357 <= x <= 489 and 12 <= y <= 100 and min(math.hypot(x - a, y - c) for a, c in cationes) > 13.5 and rnd.random() < 0.62:
                b += punto(x, y, O, 1.8)
    b += texto(423, 118, 'Metálico', T, 'middle', 10, True)
    b += texto(423, 131, 'cationes en un “mar”', G, 'middle', 8.5)
    b += texto(423, 143, 'de electrones libres', G, 'middle', 8.5)
    return svg(500, 150, b, escala=1.2)


def fig_electronegatividad():
    valores = {1: [('H', 2.1)],
               2: [('Li', 1.0), ('Be', 1.5), ('B', 2.0), ('C', 2.5), ('N', 3.0), ('O', 3.5), ('F', 4.0)],
               3: [('Na', 0.9), ('Mg', 1.2), ('Al', 1.5), ('Si', 1.8), ('P', 2.1), ('S', 2.5), ('Cl', 3.0)],
               4: [('K', 0.8), ('Ca', 1.0), ('Ga', 1.6), ('Ge', 1.8), ('As', 2.0), ('Se', 2.4), ('Br', 2.8)]}
    x0, y0, w, h = 40, 34, 48, 32
    def color(v):
        t = (v - 0.7) / 3.3
        c1, c2 = (238, 246, 249), (31, 111, 139)
        return '#%02x%02x%02x' % tuple(int(a + (b_ - a) * t) for a, b_ in zip(c1, c2))
    b = flechas('en', O)
    for k, g in enumerate(('IA', 'IIA', 'IIIA', 'IVA', 'VA', 'VIA', 'VIIA')):
        b += texto(x0 + k * w + w / 2, y0 - 6, g, G, 'middle', 8)
    for per, fila in valores.items():
        y = y0 + (per - 1) * h
        b += texto(x0 - 8, y + 20, str(per), G, 'end', 8.5)
        for k, (s, v) in enumerate(fila):
            x = x0 + k * w
            claro = v >= 2.9
            b += rect(x, y, w - 2, h - 2, '#ffffff', color(v), 3, 1)
            b += texto(x + w / 2 - 1, y + 13, s, '#ffffff' if claro else T, 'middle', 10, True)
            b += texto(x + w / 2 - 1, y + 25, ('%.1f' % v), '#ffffff' if claro else T, 'middle', 8.5)
    b += linea(x0, 12, x0 + 7 * w - 2, 12, O, 1.6, fin='en')
    b += texto(x0 + 3.5 * w, 9, 'aumenta hacia la derecha', O, 'middle', 8.5, True)
    xa = x0 + 7 * w + 14
    b += linea(xa, y0 + 4 * h - 4, xa, y0 + 4, O, 1.6, fin='en')
    b += '<text x="%s" y="%s" fill="%s" text-anchor="middle" font-size="8.5" font-weight="bold" transform="rotate(-90 %s %s)">aumenta hacia arriba</text>' % (
        xa + 13, y0 + 2 * h, O, xa + 13, y0 + 2 * h)
    b += texto(x0 + 3.5 * w, y0 + 4 * h + 16, 'el flúor (F) es el que más jala electrones; los metales alcalinos, los que menos', G, 'middle', 8.5)
    return svg(x0 + 7 * w + 44, y0 + 4 * h + 24, b, escala=1.25)


def hexagono(cx, cy, r, color=T, aromatico=False):
    pts = [(cx + r * math.cos(math.radians(90 + 60 * k)), cy - r * math.sin(math.radians(90 + 60 * k))) for k in range(6)]
    s = poligono(pts, color, 'none', 1.6)
    if aromatico:
        s += circulo(cx, cy, r * 0.55, color, 'none', 1.2)
    return s


def cadena(xs, y, etiquetas, color=T, tam=10.5):
    s = ''
    for x, e in zip(xs, etiquetas):
        s += texto(x, y + 4, e, color, 'middle', tam, True)
    for x1, x2 in zip(xs, xs[1:]):
        s += linea(x1 + 13, y, x2 - 13, y, color, 1.4)
    return s


def fig_hidrocarburos():
    b = ''
    b += texto(132, 14, 'ACÍCLICOS (cadena abierta)', A, 'middle', 9.5, True)
    b += linea(20, 20, 244, 20, A, 1)
    b += texto(400, 14, 'CÍCLICOS (anillos)', A, 'middle', 9.5, True)
    b += linea(300, 20, 500, 20, A, 1)
    b += cadena([30, 62, 94, 126], 66, ['CH₃', 'CH₂', 'CH₂', 'CH₃'])
    b += texto(78, 108, 'Lineal', T, 'middle', 9.5, True)
    b += texto(78, 121, 'butano, C₄H₁₀', G, 'middle', 8.5)
    b += cadena([174, 206, 238], 74, ['CH₃', 'CH', 'CH₃'])
    b += linea(206, 64, 206, 50, T, 1.4) + texto(206, 46, 'CH₃', T, 'middle', 10.5, True)
    b += texto(206, 108, 'Ramificado', T, 'middle', 9.5, True)
    b += texto(206, 121, 'metilpropano, C₄H₁₀', G, 'middle', 8.5)
    b += hexagono(340, 62, 25, T, True)
    b += texto(340, 108, 'Monocíclico', T, 'middle', 9.5, True)
    b += texto(340, 121, 'benceno, C₆H₆', G, 'middle', 8.5)
    r = 23
    b += hexagono(436, 62, r, T, True) + hexagono(436 + r * math.sqrt(3), 62, r, T, True)
    b += texto(456, 108, 'Policíclico', T, 'middle', 9.5, True)
    b += texto(456, 121, 'naftaleno, C₁₀H₈', G, 'middle', 8.5)
    return svg(510, 128, b, escala=1.2)


def fig_grupos_funcionales():
    b = ''
    def at(x, y, s, c):
        return texto(x, y + 5, s, c, 'middle', 12, True)
    def enl(x1, x2, y, c=T):
        return linea(x1 + 9, y, x2 - 9, y, c, 1.4)
    def doble(x, y, c):
        return linea(x - 2.5, y - 9, x - 2.5, y - 21, c, 1.4) + linea(x + 2.5, y - 9, x + 2.5, y - 21, c, 1.4) + at(x, y - 30, 'O', c)
    celdas = []
    # (dibujo, nombre del grupo, familia)
    def alcohol(x, y):
        return at(x + 22, y, 'R', G) + enl(x + 22, x + 52, y) + at(x + 52, y, 'O', O) + enl(x + 52, x + 82, y, O) + at(x + 82, y, 'H', O)
    def eter(x, y):
        return at(x + 22, y, 'R', G) + enl(x + 22, x + 52, y) + at(x + 52, y, 'O', O) + enl(x + 52, x + 82, y) + at(x + 84, y, "R'", G)
    def aldehido(x, y):
        return at(x + 22, y, 'R', G) + enl(x + 22, x + 52, y) + at(x + 52, y, 'C', O) + doble(x + 52, y, O) + enl(x + 52, x + 82, y, O) + at(x + 82, y, 'H', O)
    def cetona(x, y):
        return at(x + 22, y, 'R', G) + enl(x + 22, x + 52, y) + at(x + 52, y, 'C', O) + doble(x + 52, y, O) + enl(x + 52, x + 82, y) + at(x + 84, y, "R'", G)
    def acido(x, y):
        return at(x + 18, y, 'R', G) + enl(x + 18, x + 46, y) + at(x + 46, y, 'C', O) + doble(x + 46, y, O) + enl(x + 46, x + 74, y, O) + at(x + 74, y, 'O', O) + enl(x + 74, x + 100, y, O) + at(x + 100, y, 'H', O)
    def ester(x, y):
        return at(x + 18, y, 'R', G) + enl(x + 18, x + 46, y) + at(x + 46, y, 'C', O) + doble(x + 46, y, O) + enl(x + 46, x + 74, y, O) + at(x + 74, y, 'O', O) + enl(x + 74, x + 100, y) + at(x + 102, y, "R'", G)
    def amina(x, y):
        return at(x + 30, y, 'R', G) + enl(x + 30, x + 60, y) + at(x + 66, y, 'NH₂', O)
    datos = [(alcohol, 'Alcohol', 'grupo hidroxilo', '-ol'),
             (eter, 'Éter', 'grupo alcoxi', '… éter'),
             (aldehido, 'Aldehído', 'carbonilo al final', '-al'),
             (cetona, 'Cetona', 'carbonilo en medio', '-ona'),
             (acido, 'Ácido carboxílico', 'grupo carboxilo', 'ácido …-oico'),
             (ester, 'Éster', 'grupo –COO–', '…-ato de …-ilo'),
             (amina, 'Amina', 'grupo amino', '-amina')]
    for k, (f, t1, t2, t3) in enumerate(datos):
        fila, col = divmod(k, 4)
        x, y = 6 + col * 124, 6 + fila * 104
        b += rect(x, y, 118, 98, '#d6dbe3', '#fbfcfd', 6, 1)
        b += f(x + 4, y + 46)
        b += texto(x + 59, y + 70, t1, A, 'middle', 9.5, True)
        b += texto(x + 59, y + 82, t2, G, 'middle', 8)
        b += texto(x + 59, y + 93, 'nombre: ' + t3, T, 'middle', 8)
    x, y = 6 + 3 * 124, 6 + 104
    b += texto(x + 59, y + 36, 'R y R’ = cadenas', G, 'middle', 8.5, True)
    b += texto(x + 59, y + 49, 'de carbonos', G, 'middle', 8.5, True)
    b += texto(x + 59, y + 62, '(el “resto” de', G, 'middle', 8.5)
    b += texto(x + 59, y + 75, 'la molécula)', G, 'middle', 8.5)
    b += texto(x + 59, y + 92, 'en naranja: el grupo', O, 'middle', 8.5, True)
    return svg(504, 216, b, escala=1.2)


# ================================================================ BIOLOGIA
def mosca(x, y):
    return ('<ellipse cx="%s" cy="%s" rx="4" ry="2.4" fill="#ffffff" stroke="#9aa3b2" stroke-width="0.8" transform="rotate(-25 %s %s)"/>'
            '<ellipse cx="%s" cy="%s" rx="4" ry="2.4" fill="#ffffff" stroke="#9aa3b2" stroke-width="0.8" transform="rotate(25 %s %s)"/>'
            % (n(x - 3), n(y - 3), n(x - 3), n(y - 3), n(x + 3), n(y - 3), n(x + 3), n(y - 3))) + \
        '<ellipse cx="%s" cy="%s" rx="3.2" ry="2.2" fill="%s"/>' % (n(x), n(y), T)


def larva(x, y):
    return camino('M%s,%s q3,-4 6,0 q3,4 6,0' % (n(x), n(y)), '#c9b27c', 2.6)


def fig_redi_pasteur():
    titulos = texto(130, 14, 'Redi (1668): carne en tres frascos', A, 'middle', 10, True)
    titulos += texto(415, 14, 'Pasteur (1862): matraces de cuello de cisne', A, 'middle', 10, True)
    b = ''
    datos = [('abierto', 'moscas y larvas', 'en la carne'), ('tapado con gasa', 'larvas sobre la gasa,', 'no en la carne'),
             ('sellado', 'no aparece', 'nada')]
    for i, (t1, t2, t3) in enumerate(datos):
        x = 18 + i * 82
        b += rect(x + 3, 92, 58, 18, 'none', '#c97b63', 6, 0)
        b += camino('M%s,%s L%s,%s Q%s,%s %s,%s L%s,%s Q%s,%s %s,%s L%s,%s' % (
            x, 38, x, 108, x, 116, x + 8, 116, x + 56, 116, x + 64, 116, x + 64, 108, x + 64, 38), G, 1.8)
        if i == 0:
            b += larva(x + 12, 96) + larva(x + 34, 98)
            b += mosca(x + 20, 30) + mosca(x + 46, 22) + mosca(x + 40, 70)
        elif i == 1:
            b += linea(x - 2, 38, x + 66, 38, '#9aa3b2', 2.4, '2 2')
            b += larva(x + 14, 35) + larva(x + 38, 35)
            b += mosca(x + 18, 20) + mosca(x + 48, 24)
        else:
            b += rect(x - 3, 32, 70, 7, T, '#6b7280', 2, 1)
        b += texto(x + 32, 134, t1, T, 'middle', 8.8, True)
        b += texto(x + 32, 146, t2, G, 'middle', 8.3)
        b += texto(x + 32, 157, t3, G, 'middle', 8.3)
    # Pasteur
    x0 = 300
    for j, (t1, t2, t3) in enumerate((('cuello intacto', 'el caldo sigue limpio:', 'el polvo se atora en la curva'),
                                      ('cuello roto', 'entran microbios del aire', 'y el caldo se echa a perder'))):
        cx = x0 + 55 + j * 125
        b += circulo(cx, 92, 26, G, '#ffffff', 1.8)
        b += camino('M%s,%s A26,26 0 0 0 %s,%s Z' % (n(cx - 24.5), 101, n(cx + 24.5), 101), 'none', 0,
                    '#f3e3b0' if j == 0 else '#c9b27c')
        b += circulo(cx, 92, 26, G, 'none', 1.8)
        if j == 0:
            b += camino('M%s,%s C%s,%s %s,%s %s,%s C%s,%s %s,%s %s,%s' % (
                cx - 4, 67, cx - 6, 40, cx + 30, 52, cx + 30, 70, cx + 30, 86, cx + 52, 84, cx + 56, 60), G, 5)
            b += camino('M%s,%s C%s,%s %s,%s %s,%s C%s,%s %s,%s %s,%s' % (
                cx - 4, 67, cx - 6, 40, cx + 30, 52, cx + 30, 70, cx + 30, 86, cx + 52, 84, cx + 56, 60), '#ffffff', 2.4)
            for px, py in ((cx + 54, 50), (cx + 60, 44), (cx + 47, 42)):
                b += punto(px, py, '#8a6a3a', 1.6)
            b += punto(cx + 30, 78, '#8a6a3a', 1.6) + punto(cx + 32, 74, '#8a6a3a', 1.6)
        else:
            b += rect(cx - 5, 50, 10, 18, G, '#ffffff', 1, 1.8)
            for px, py in ((cx - 2, 40), (cx + 4, 33), (cx - 6, 28), (cx + 1, 46)):
                b += punto(px, py, '#8a6a3a', 1.6)
            for px, py in ((cx - 10, 106), (cx + 6, 108), (cx - 2, 112), (cx + 14, 104)):
                b += punto(px, py, M, 1.8)
        b += texto(cx, 134, t1, T, 'middle', 8.8, True)
        b += texto(cx, 146, t2, G, 'middle', 8.3)
        b += texto(cx, 157, t3, G, 'middle', 8.3)
    return svg(560, 176, titulos + '<g transform="translate(0,14)">' + b + '</g>', escala=1.05)


def fig_adn():
    b = ''
    # nucleotido
    b += texto(100, 14, 'Un nucleótido', A, 'middle', 10, True)
    b += circulo(30, 58, 14, O, FO, 1.6) + texto(30, 62, 'P', O, 'middle', 11, True)
    b += linea(44, 58, 78, 58, T, 1.6)
    pent = [(98 + 20 * math.cos(math.radians(90 + 72 * k)), 60 - 20 * math.sin(math.radians(90 + 72 * k))) for k in range(5)]
    b += poligono(pent, V, FV, 1.6) + texto(98, 64, 'azúcar', V, 'middle', 7.5, True)
    b += linea(118, 58, 146, 58, T, 1.6)
    b += rect(146, 46, 40, 24, M, FM, 3, 1.6) + texto(166, 62, 'base', M, 'middle', 8.5, True)
    b += texto(30, 92, 'fosfato', O, 'middle', 8.5)
    b += texto(98, 92, 'azúcar de', V, 'middle', 8.5) + texto(98, 103, '5 carbonos', V, 'middle', 8.5)
    b += texto(166, 92, 'base', M, 'middle', 8.5) + texto(166, 103, 'nitrogenada', M, 'middle', 8.5)
    b += texto(100, 126, 'ADN: desoxirribosa · ARN: ribosa', G, 'middle', 8.5)
    # escalera
    b += texto(320, 14, 'El ADN: una escalera de pares de bases', A, 'middle', 10, True)
    pares = [('A', 'T'), ('G', 'C'), ('T', 'A'), ('C', 'G'), ('A', 'T')]
    colores = {'A': '#d9534f', 'T': '#f0ad4e', 'G': '#5cb85c', 'C': '#5bc0de'}
    b += linea(240, 26, 240, 126, G, 4) + linea(400, 26, 400, 126, G, 4)
    for k, (a, c) in enumerate(pares):
        y = 34 + k * 20
        b += rect(242, y - 6, 78, 12, 'none', colores[a], 2, 0) + rect(320, y - 6, 78, 12, 'none', colores[c], 2, 0)
        b += texto(281, y + 4, a, '#ffffff', 'middle', 9.5, True) + texto(359, y + 4, c, '#ffffff', 'middle', 9.5, True)
    b += texto(320, 140, 'A siempre con T y G siempre con C', G, 'middle', 8.5)
    b += texto(320, 152, '(en el ARN, la U reemplaza a la T)', G, 'middle', 8.5)
    return svg(430, 158, b, escala=1.15)


def fig_taxonomia():
    filas = [('Dominio', 'Eukarya'), ('Reino', 'Animalia'), ('Filo', 'Chordata'), ('Clase', 'Mammalia'),
             ('Orden', 'Carnivora'), ('Familia', 'Canidae'), ('Género', '<tspan font-style="italic">Canis</tspan>'),
             ('Especie', '<tspan font-style="italic">Canis familiaris</tspan>')]
    b = ''
    for k, (cat, ej) in enumerate(filas):
        w = 300 - k * 20
        x = 190 - w / 2
        y = 8 + k * 26
        t = k / 7
        c1, c2 = (230, 242, 246), (31, 111, 139)
        col = '#%02x%02x%02x' % tuple(int(a + (b_ - a) * t) for a, b_ in zip(c1, c2))
        claro = k >= 4
        b += rect(x, y, w, 22, '#ffffff', col, 4, 1)
        b += texto(190, y + 15, '<tspan font-weight="bold">%s</tspan>: %s' % (cat, ej), '#ffffff' if claro else T, 'middle', 9.5)
    b += flechas('tx', G) + linea(16, 12, 16, 210, G, 1.4, fin='tx')
    b += '<text x="9" y="111" fill="%s" text-anchor="middle" font-size="8.5" transform="rotate(-90 9 111)">de lo general a lo específico</text>' % G
    return svg(350, 220, b)


def mitocondria(x, y, ang=0, rx=16, ry=8):
    s = ('<g transform="rotate(%s %s %s)"><ellipse cx="%s" cy="%s" rx="%s" ry="%s" fill="#fbe3d6" stroke="%s" stroke-width="1.4"/>'
         % (ang, n(x), n(y), n(x), n(y), rx, ry, O))
    d = 'M%s,%s' % (n(x - rx + 4), n(y))
    for k in range(5):
        d += ' l%s,%s' % (n((2 * rx - 8) / 10), -4 if k % 2 == 0 else 4)
        d += ' l%s,%s' % (n((2 * rx - 8) / 10), 4 if k % 2 == 0 else -4)
    return s + camino(d, O, 1) + '</g>'


def cloroplasto(x, y, ang=0):
    s = ('<g transform="rotate(%s %s %s)"><ellipse cx="%s" cy="%s" rx="14" ry="7.5" fill="#9ed49f" stroke="%s" stroke-width="1.3"/>'
         % (ang, n(x), n(y), n(x), n(y), V))
    for dx in (-7, 0, 7):
        s += rect(x + dx - 2, y - 4, 4, 8, V, '#4e9a52', 0.5, 0.6)
    return s + '</g>'


def etiqueta(x, y, s, x2, y2, anc='end'):
    return linea(x + (3 if anc == 'start' else -3) * 0 , y - 3, x2, y2, '#8a93a3', 0.9) + \
        texto(x + (-3 if anc == 'end' else 3), y, s, T, anc, 8.8)


def fig_celula():
    b = ''
    # celula animal
    cx, cy = 175, 122
    b += '<ellipse cx="%s" cy="%s" rx="105" ry="82" fill="#fdf6ec" stroke="%s" stroke-width="2"/>' % (cx, cy, O)
    b += circulo(165, 122, 30, M, FM, 1.6) + circulo(171, 116, 9, M, '#c9b6e6', 1)
    for k in range(3):
        r = 38 + k * 7
        b += arco(165, 122, r, -50, 20, '#8a6db8', 1.4)
    for ang in (-40, -25, -10, 5):
        for k in range(3):
            r = 38 + k * 7
            b += punto(165 + r * math.cos(math.radians(ang)), 122 - r * math.sin(math.radians(ang)), T, 1.3)
    for k in range(4):
        b += camino('M%s,%s q12,-8 24,0' % (226 - k * 2, 70 + k * 6), '#2f8f6a', 2.2)
    b += mitocondria(112, 72, -20) + mitocondria(208, 182, 15)
    b += circulo(103, 165, 8, '#c2185b', '#f8d7e3', 1.3)
    b += rect(146, 56, 5, 13, G, '#d6dbe3', 1, 1) + rect(154, 60, 13, 5, G, '#d6dbe3', 1, 1)
    for px, py in ((95, 112), (122, 180), (140, 160), (250, 128), (232, 150), (90, 140), (200, 60)):
        b += punto(px, py, T, 1.6)
    b += etiqueta(62, 54, 'membrana', 95, 66)
    b += etiqueta(62, 80, 'mitocondria', 98, 76)
    b += etiqueta(62, 124, 'núcleo', 136, 124)
    b += etiqueta(62, 168, 'lisosoma', 95, 166)
    b += etiqueta(62, 196, 'ribosomas', 120, 181)
    b += linea(150, 30, 152, 55, '#8a93a3', 0.9) + texto(150, 26, 'centriolos', T, 'middle', 8.8)
    b += linea(250, 30, 238, 64, '#8a93a3', 0.9) + texto(250, 26, 'aparato de Golgi', T, 'middle', 8.8)
    b += linea(262, 222, 214, 116, '#8a93a3', 0.9) + texto(262, 232, 'retículo endoplásmico', T, 'middle', 8.8)
    b += texto(150, 248, 'Célula animal', A, 'middle', 10.5, True)
    # celula vegetal
    b += rect(330, 35, 220, 168, V, '#f1f8ec', 4, 6)
    b += rect(337, 42, 206, 154, '#7fb77e', 'none', 3, 1.2)
    b += rect(362, 66, 116, 104, A, '#dceef7', 14, 1.4)
    b += circulo(512, 78, 19, M, FM, 1.6) + circulo(516, 74, 6, M, '#c9b6e6', 1)
    for (x, y, a) in ((358, 54, 0), (430, 54, 0), (520, 138, 80), (500, 182, 0), (380, 184, 0), (348, 120, 90)):
        b += cloroplasto(x, y, a)
    b += mitocondria(450, 184, 0, 13, 7)
    b += etiqueta(568, 40, 'pared celular', 551, 44, 'start')
    b += etiqueta(568, 62, 'membrana', 543, 62, 'start')
    b += etiqueta(568, 84, 'núcleo', 531, 82, 'start')
    b += etiqueta(568, 112, 'vacuola', 478, 112, 'start')
    b += etiqueta(568, 140, 'cloroplasto', 528, 140, 'start')
    b += etiqueta(568, 190, 'mitocondria', 464, 186, 'start')
    b += texto(440, 248, 'Célula vegetal', V, 'middle', 10.5, True)
    return svg(650, 256, b)


def cromosoma(x, y, color, ang=0):
    return ('<g transform="rotate(%s %s %s)" stroke="%s" stroke-width="3" stroke-linecap="round">'
            '<line x1="%s" y1="%s" x2="%s" y2="%s"/><line x1="%s" y1="%s" x2="%s" y2="%s"/></g>'
            % (ang, n(x), n(y), color, n(x - 3), n(y - 7), n(x + 3), n(y + 7), n(x + 3), n(y - 7), n(x - 3), n(y + 7)))


def fig_mitosis():
    b = flechas('mi', G)
    fases = [('Profase', 'se forman los cromosomas;', 'se deshace el núcleo'),
             ('Metafase', 'los cromosomas se', 'alinean en el centro'),
             ('Anafase', 'las cromátidas se separan', 'hacia los polos'),
             ('Telofase', 'se forman dos núcleos y', 'la célula se divide')]
    for i, (t1, t2, t3) in enumerate(fases):
        cx, cy = 66 + i * 142, 66
        if i < 3:
            b += circulo(cx, cy, 48, O, '#fdf6ec', 1.8)
        if i == 0:
            b += circulo(cx, cy, 28, M, 'none', 1.2, '4 3')
            for (dx, dy, c, a) in ((-10, -8, O, 20), (8, -12, M, -30), (12, 8, O, 60), (-8, 12, M, -10)):
                b += cromosoma(cx + dx, cy + dy, c, a)
            b += rect(cx - 40, cy - 30, 4, 9, G, '#d6dbe3', 1, 1) + rect(cx + 34, cy + 22, 4, 9, G, '#d6dbe3', 1, 1)
        elif i == 1:
            for dy in (-24, -8, 8, 24):
                b += linea(cx - 40, cy, cx - 4, cy + dy, '#b9c0cc', 0.9) + linea(cx + 40, cy, cx + 4, cy + dy, '#b9c0cc', 0.9)
            for k, dy in enumerate((-24, -8, 8, 24)):
                b += cromosoma(cx, cy + dy, O if k % 2 == 0 else M, 90)
            b += rect(cx - 44, cy - 4, 4, 9, G, '#d6dbe3', 1, 1) + rect(cx + 40, cy - 4, 4, 9, G, '#d6dbe3', 1, 1)
        elif i == 2:
            for dy in (-18, -6, 6, 18):
                b += linea(cx - 40, cy, cx - 20, cy + dy, '#b9c0cc', 0.9) + linea(cx + 40, cy, cx + 20, cy + dy, '#b9c0cc', 0.9)
            for k, dy in enumerate((-18, -6, 6, 18)):
                c = O if k % 2 == 0 else M
                for lado in (-1, 1):
                    x = cx + lado * 20
                    b += camino('M%s,%s l%s,-5 M%s,%s l%s,5' % (n(x), n(cy + dy), lado * 7, n(x), n(cy + dy), lado * 7), c, 2.6)
        else:
            b += '<path d="M%s,%s C%s,%s %s,%s %s,%s C%s,%s %s,%s %s,%s C%s,%s %s,%s %s,%s C%s,%s %s,%s %s,%s Z" fill="#fdf6ec" stroke="%s" stroke-width="1.8"/>' % (
                cx, cy - 22, cx - 20, cy - 48, cx - 62, cy - 40, cx - 62, cy,
                cx - 62, cy + 40, cx - 20, cy + 48, cx, cy + 22,
                cx + 20, cy + 48, cx + 62, cy + 40, cx + 62, cy,
                cx + 62, cy - 40, cx + 20, cy - 48, cx, cy - 22, O)
            for lado in (-1, 1):
                b += circulo(cx + lado * 34, cy, 15, M, FM, 1.3)
                b += camino('M%s,%s q4,6 0,12 M%s,%s q-4,6 0,12' % (n(cx + lado * 34 - 4), cy - 6, n(cx + lado * 34 + 4), cy - 6), O, 2)
        if i < 3:
            b += linea(cx + 52, cy, cx + 86, cy, G, 1.4, fin='mi')
        b += texto(cx, 136, t1, A, 'middle', 10, True)
        b += texto(cx, 149, t2, G, 'middle', 8.3)
        b += texto(cx, 160, t3, G, 'middle', 8.3)
    return svg(560, 166, b, escala=1.15)


def fig_foto_resp():
    b = flechas('fr1', V) + flechas('fr2', O)
    b += rect(14, 40, 210, 76, V, FV, 10, 1.6)
    b += texto(119, 60, 'Cloroplasto: fotosíntesis', V, 'middle', 10, True)
    b += texto(119, 82, '6CO₂ + 6H₂O + luz', T, 'middle', 9.5)
    b += texto(119, 98, '→ C₆H₁₂O₆ + 6O₂', T, 'middle', 9.5)
    b += rect(336, 40, 210, 76, O, FO, 10, 1.6)
    b += texto(441, 60, 'Mitocondria: respiración', O, 'middle', 10, True)
    b += texto(441, 82, 'C₆H₁₂O₆ + 6O₂', T, 'middle', 9.5)
    b += texto(441, 98, '→ 6CO₂ + 6H₂O + ATP', T, 'middle', 9.5)
    b += camino('M224,58 C270,30 290,30 334,58', V, 1.8).replace('/>', ' marker-end="url(#fdfr1)"/>')
    b += texto(280, 28, 'glucosa y O₂', V, 'middle', 9, True)
    b += camino('M336,100 C290,128 270,128 226,100', O, 1.8).replace('/>', ' marker-end="url(#fdfr2)"/>')
    b += texto(280, 140, 'CO₂ y H₂O', O, 'middle', 9, True)
    b += circulo(30, 20, 9, '#d4a017', '#ffe08a', 1.4)
    for k in range(8):
        a = math.radians(k * 45)
        b += linea(30 + 12 * math.cos(a), 20 + 12 * math.sin(a), 30 + 16 * math.cos(a), 20 + 16 * math.sin(a), '#d4a017', 1.4)
    b += texto(52, 24, 'energía de la luz', '#8a6400', tam=8.5)
    b += texto(441, 134, 'energía para la célula (ATP)', O, 'middle', 8.5)
    return svg(560, 146, b, escala=1.15)


def fig_piramide_trofica():
    niveles = [('Consumidores terciarios', '10 kcal', '#c2185b'), ('Consumidores secundarios', '100 kcal', O),
               ('Consumidores primarios (herbívoros)', '1 000 kcal', '#b8860b'), ('Productores (plantas)', '10 000 kcal', V)]
    b = flechas('pt', G) + flechas('ps', '#b8860b')
    base_y = 186
    for k, (t, e, c) in enumerate(reversed(niveles)):
        y = base_y - (k + 1) * 38
        w = 360 - k * 70
        x = 250 - w / 2
        b += rect(x, y, w, 34, '#ffffff', c, 3, 1)
        b += texto(250, y + 15, t, '#ffffff', 'middle', 8.6, True)
        b += texto(250, y + 28, e, '#ffffff', 'middle', 8.3)
    for k in range(3):
        y = base_y - (k + 1) * 38 + 4
        b += camino('M%s,%s q16,-19 0,-38' % (446, y + 26), G, 1.2).replace('/>', ' marker-end="url(#fdpt)"/>')
        b += texto(464, y + 10, 'solo pasa', G, tam=8.3) + texto(464, y + 21, 'el 10 %', G, tam=8.3, neg=True)
    b += circulo(26, 120, 9, '#d4a017', '#ffe08a', 1.4)
    for k in range(8):
        a = math.radians(k * 45)
        b += linea(26 + 12 * math.cos(a), 120 + 12 * math.sin(a), 26 + 16 * math.cos(a), 120 + 16 * math.sin(a), '#d4a017', 1.4)
    b += texto(26, 98, 'Sol', '#8a6400', 'middle', 9.5, True)
    b += camino('M30,140 Q40,166 64,168', '#b8860b', 1.4).replace('/>', ' marker-end="url(#fdps)"/>')
    return svg(530, 194, b, escala=1.1)


def fig_crecimiento():
    p = Plano(300, 200, 0, 10, 0, 10, 28)
    p.ejes('cr', xn='tiempo', yn='individuos')
    p.curva(lambda x: 0.4 * math.exp(0.36 * x), 0, 8.8, O, 2.4)
    p.curva(lambda x: 7 / (1 + 16 * math.exp(-0.9 * x)), 0, 10, A, 2.4)
    p.segmento(0, 7, 10, 7, G, 1, '4 3')
    p.texto(0.3, 7, 'capacidad de carga (K)', G, dy=-5, tam=8)
    p.texto(6.2, 8.6, 'curva J', O, 'end', tam=9, neg=True)
    p.texto(6.4, 5.3, 'curva S', A, tam=9, neg=True)
    return p.svg()


def fig_ciclo_carbono():
    b = flechas('cc1', V) + flechas('cc2', O) + flechas('cc3', M) + flechas('cc4', G)
    def caja(x, y, w, t, c, f):
        return rect(x, y, w, 28, c, f, 8, 1.5) + texto(x + w / 2, y + 18, t, c, 'middle', 9.5, True)
    b += caja(180, 8, 140, 'CO₂ en el aire', A, FA)
    b += caja(20, 150, 110, 'Plantas', V, FV)
    b += caja(190, 150, 120, 'Animales', O, FO)
    b += caja(370, 150, 120, 'Descomponedores', M, FM)
    b += caja(380, 60, 110, 'Combustibles', G, '#f1f2f4')
    def fl(d, c, ident):
        return camino(d, c, 1.6).replace('/>', ' marker-end="url(#fd%s)"/>' % ident)
    b += fl('M190,36 C120,50 80,100 70,146', V, 'cc1') + texto(92, 80, 'fotosíntesis', V, 'end', 8.8, True)
    b += fl('M98,148 C112,100 150,60 198,38', O, 'cc2') + texto(150, 112, 'respiración', O, tam=8.8, neg=True)
    b += fl('M250,148 L250,40', O, 'cc2') + texto(244, 132, 'respiración', O, 'end', 8.8, True)
    b += fl('M132,164 L186,164', V, 'cc1') + texto(159, 190, 'alimento', V, 'middle', 8.5)
    b += fl('M312,164 L366,164', M, 'cc3') + texto(339, 190, 'restos', M, 'middle', 8.5)
    b += fl('M392,148 C380,100 340,60 304,38', M, 'cc3') + texto(262, 104, 'descomposición', M, tam=8.8, neg=True)
    b += fl('M404,58 C390,34 360,24 324,22', G, 'cc4') + texto(440, 50, 'combustión', G, 'middle', 8.8, True)
    return svg(500, 198, b, escala=1.1)


# ================================================================ GEOGRAFIA
def fig_sistema_solar():
    b = '<circle cx="-50" cy="86" r="96" fill="#ffd54f" stroke="#f0a500" stroke-width="2"/>'
    b += texto(14, 90, 'Sol', '#8a6400', tam=10, neg=True)
    planetas = [('Mercurio', 72, 3.5, '#9e9e9e'), ('Venus', 104, 6, '#e3c16f'), ('Tierra', 138, 6.5, '#3b7dc4'),
                ('Marte', 170, 4.5, '#c1440e'), ('Júpiter', 252, 21, '#d8a35d'), ('Saturno', 326, 16, '#e8cf8a'),
                ('Urano', 394, 11, '#8fd3e0'), ('Neptuno', 446, 10.5, '#3f6fd8')]
    import random
    rnd = random.Random(11)
    for k in range(40):
        b += punto(192 + rnd.random() * 24, 86 + (rnd.random() - 0.5) * 60, '#8a8f99', 1.1)
    b += texto(204, 132, 'cinturón de', G, 'middle', 8) + texto(204, 142, 'asteroides', G, 'middle', 8)
    for nom, x, r, c in planetas:
        if nom == 'Saturno':
            b += '<ellipse cx="%s" cy="86" rx="31" ry="7" fill="none" stroke="#c9a85a" stroke-width="2.4" transform="rotate(-18 %s 86)"/>' % (x, x)
        b += circulo(x, 86, r, '#00000033', c, 0.8)
        if nom == 'Júpiter':
            b += linea(x - 19, 80, x + 19, 80, '#b5793a', 1.6) + linea(x - 20, 90, x + 20, 90, '#b5793a', 1.6)
        if nom == 'Tierra':
            b += circulo(x - 1.5, 84, 2.5, 'none', '#4caf50', 0)
        y_et = {'Mercurio': 110, 'Venus': 122, 'Tierra': 110, 'Marte': 122}.get(nom, 124)
        b += texto(x, y_et, nom, T, 'middle', 8.5, True)
    b += linea(60, 46, 184, 46, A, 1.4) + texto(122, 40, 'Rocosos (interiores)', A, 'middle', 9, True)
    b += linea(226, 46, 462, 46, O, 1.4) + texto(344, 40, 'Gaseosos (exteriores)', O, 'middle', 9, True)
    b += rect(476, 30, 156, 112, '#d6dbe3', '#fbfcfd', 8, 1)
    b += texto(554, 48, 'Planetas enanos', M, 'middle', 9, True)
    b += texto(554, 62, 'Plutón, Ceres, Eris…', T, 'middle', 8.5)
    b += texto(554, 84, 'Rocosos: pequeños, densos,', T, 'middle', 8)
    b += texto(554, 96, 'superficie sólida, sin anillos', T, 'middle', 8)
    b += texto(554, 116, 'Gaseosos: enormes, de H y He,', T, 'middle', 8)
    b += texto(554, 128, 'con anillos y muchas lunas', T, 'middle', 8)
    b += texto(240, 160, 'Representación sin escala: los tamaños y las distancias reales son muy distintos', G, 'middle', 8)
    return svg(640, 166, b)


def fig_coordenadas():
    cx, cy, r, t = 98, 122, 86, math.radians(18)
    def proy(lat, lon):
        f, l = math.radians(lat), math.radians(lon)
        x = cx + r * math.cos(f) * math.sin(l)
        y = cy - r * (math.sin(f) * math.cos(t) - math.cos(f) * math.cos(l) * math.sin(t))
        vis = math.cos(f) * math.cos(l) * math.cos(t) + math.sin(f) * math.sin(t)
        return x, y, vis
    def trazo(puntos, color, ancho, guion=None):
        s, actual = '', []
        for x, y, v in puntos:
            if v > 0:
                actual.append((x, y))
            else:
                if len(actual) > 1:
                    s += camino('M' + ' L'.join('%s,%s' % (n(a), n(c)) for a, c in actual), color, ancho, guion=guion)
                actual = []
        if len(actual) > 1:
            s += camino('M' + ' L'.join('%s,%s' % (n(a), n(c)) for a, c in actual), color, ancho, guion=guion)
        return s
    b = circulo(cx, cy, r, A, '#eef6f9', 1.6)
    for lat in (-60, -30, 30, 60):
        b += trazo([proy(lat, l) for l in range(-180, 181, 3)], '#9cc3d3', 1)
    for lon in (-90, -60, -30, 30, 60, 90):
        b += trazo([proy(f, lon) for f in range(-90, 91, 3)], '#9cc3d3', 1)
    b += trazo([proy(0, l) for l in range(-180, 181, 2)], O, 2.2)
    b += trazo([proy(f, 0) for f in range(-90, 91, 2)], V, 2.2)
    px, py, _ = proy(20, -50)
    b += punto(px, py, '#c2185b', 4)
    b += texto(px - 6, py - 8, 'P', '#c2185b', 'end', 10, True)
    nx, ny, _ = proy(90, 0)
    b += punto(nx, ny, T, 2.5) + texto(nx, ny - 6, 'Polo Norte', T, 'middle', 8.5, True)
    sx, sy, _ = proy(-90, 0)
    b += texto(cx, cy + r + 14, 'Polo Sur', T, 'middle', 8.5, True)
    ex, ey, _ = proy(0, 88)
    b += texto(cx + r + 4, ey + 4, 'Ecuador (0°)', O, tam=9, neg=True)
    gx, gy, _ = proy(48, 0)
    b += linea(gx + 2, gy - 2, 196, 26, '#8a93a3', 0.9) + texto(198, 24, 'Meridiano de', V, tam=9, neg=True) + texto(198, 36, 'Greenwich (0°)', V, tam=9, neg=True)
    lx, ly, _ = proy(30, 70)
    b += linea(lx + 2, ly, 200, 70, '#8a93a3', 0.9) + texto(204, 74, 'paralelos (latitud)', '#4a7f95', tam=8.5)
    mx, my, _ = proy(-40, 60)
    b += linea(mx + 2, my, 200, 206, '#8a93a3', 0.9) + texto(204, 210, 'meridianos (longitud)', '#4a7f95', tam=8.5)
    b += texto(204, 154, 'P: 20° N, 50° O', '#c2185b', tam=9, neg=True)
    b += texto(204, 167, '20° al norte del ecuador', T, tam=8.5)
    b += texto(204, 179, 'y 50° al oeste', T, tam=8.5)
    return svg(345, 226, b)


def fig_mapa_elementos():
    b = flechas('ma', O)
    b += rect(150, 8, 220, 22, A, FA, 11, 1.2) + texto(260, 23, 'Estado de Ejemplo: relieve y ciudades', A, 'middle', 9, True)
    b += rect(70, 40, 300, 190, G, '#dceef7', 0, 1.4)
    b += camino('M70,60 C120,50 160,90 210,70 C260,50 300,80 330,110 C350,130 340,170 370,190 L370,230 L70,230 Z', 'none', 0, '#e3f1df')
    b += camino('M70,60 C120,50 160,90 210,70 C260,50 300,80 330,110 C350,130 340,170 370,190', '#7fb77e', 1.2)
    b += camino('M120,225 C140,190 170,180 180,150 C190,120 220,110 250,96', '#3b7dc4', 2)
    b += linea(100, 200, 300, 160, '#8a6a3a', 1.4, '5 3')
    for (x, y) in ((160, 182), (292, 162)):
        b += punto(x, y, T, 4)
    b += poligono([(230, 142), (222, 156), (238, 156)], '#8a6a3a', '#c9a27c', 1)
    for k, lat in enumerate(('21° N', '20° N', '19° N')):
        y = 40 + 40 + k * 60
        b += linea(64, y, 70, y, G, 1) + texto(60, y + 3, lat, G, 'end', 8)
    for k, lon in enumerate(('100° O', '99° O', '98° O')):
        x = 70 + 60 + k * 90
        b += linea(x, 230, x, 236, G, 1) + texto(x, 246, lon, G, 'middle', 8)
    b += poligono([(346, 52), (340, 74), (346, 68), (352, 74)], T, T, 1) + texto(346, 88, 'N', T, 'middle', 9, True)
    b += rect(84, 208, 30, 6, T, T, 0, 1) + rect(114, 208, 30, 6, T, '#ffffff', 0, 1)
    b += texto(84, 204, '0', T, 'middle', 7.5) + texto(114, 204, '10', T, 'middle', 7.5) + texto(146, 204, '20 km', T, tam=7.5)
    b += texto(84, 224, '1 : 500 000', T, tam=7.5)
    b += rect(384, 40, 128, 120, G, '#ffffff', 4, 1.2)
    b += texto(448, 56, 'Simbología', T, 'middle', 9, True)
    b += punto(398, 72, T, 4) + texto(410, 75, 'ciudad', T, tam=8.5)
    b += linea(392, 90, 404, 90, '#3b7dc4', 2) + texto(410, 93, 'río', T, tam=8.5)
    b += linea(392, 108, 404, 108, '#8a6a3a', 1.4, '5 3') + texto(410, 111, 'carretera', T, tam=8.5)
    b += poligono([(398, 120), (392, 131), (404, 131)], '#8a6a3a', '#c9a27c', 1) + texto(410, 130, 'volcán', T, tam=8.5)
    b += rect(392, 140, 12, 9, '#7fb77e', '#e3f1df', 0, 1) + texto(410, 148, 'tierra firme', T, tam=8.5)
    def nota(x, y, s, x2, y2):
        return linea(x, y, x2, y2, O, 1.1, fin='ma') + texto(x, y - 3, s, O, 'middle', 8.5, True)
    b += nota(118, 20, 'título', 148, 20)
    b += nota(36, 66, 'coordenadas', 46, 80)
    b += nota(200, 256, 'escala', 136, 230)
    b += nota(440, 24, 'orientación', 356, 50)
    b += nota(448, 186, 'simbología', 448, 164)
    return svg(520, 262, b, escala=1.1)


def fig_capas_tierra():
    cx, cy = 170, 238
    capas = [(168, '#8d6e63', 'Corteza: de 5 a 70 km de grosor'), (160, '#e57348', 'Manto: roca caliente que fluye muy lento'),
             (86, '#f4a236', 'Núcleo externo: hierro y níquel líquidos'), (40, '#ffd54f', 'Núcleo interno: sólido, unos 5 000 °C')]
    b = ''
    for r, c, _ in capas:
        b += '<path d="M%s,%s A%s,%s 0 0 1 %s,%s Z" fill="%s" stroke="#ffffff" stroke-width="1"/>' % (cx - r, cy, r, r, cx + r, cy, c)
    b += linea(cx - 170, cy, cx + 170, cy, G, 1)
    destinos = [(cx - 40, cy - 164), (cx - 70, cy - 120), (cx + 30, cy - 62), (cx + 10, cy - 20)]
    for k, ((r, c, t), (x2, y2)) in enumerate(zip(capas, destinos)):
        y = 30 + k * 44
        b += linea(352, y - 3, x2, y2, '#8a93a3', 0.9)
        b += texto(356, y, t.split(':')[0], T, tam=9.5, neg=True)
        b += texto(356, y + 13, t.split(': ')[1], G, tam=8.5)
    return svg(560, 244, b)


def fig_placas():
    b = flechas('pl', T) + flechas('pm', '#d7263d')
    # divergente
    b += rect(14, 70, 78, 20, '#8d6e63', '#bca393', 2, 1) + rect(108, 70, 78, 20, '#8d6e63', '#bca393', 2, 1)
    b += camino('M100,128 C96,110 104,96 100,72', '#d7263d', 3).replace('/>', ' marker-end="url(#fdpm)"/>')
    b += linea(70, 58, 30, 58, T, 1.6, fin='pl') + linea(130, 58, 170, 58, T, 1.6, fin='pl')
    b += rect(14, 90, 172, 44, 'none', '#f7d9c4', 0, 0)
    b += texto(100, 156, 'Divergente', A, 'middle', 10, True)
    b += texto(100, 169, 'se separan y sale magma', G, 'middle', 8.3)
    b += texto(100, 180, '(dorsales oceánicas)', G, 'middle', 8.3)
    # convergente (subduccion)
    x0 = 214
    b += rect(x0, 90, 186, 44, 'none', '#f7d9c4', 0, 0)
    b += camino('M%s,72 L%s,72 L%s,128 L%s,128 L%s,92 L%s,92 Z' % (x0, x0 + 96, x0 + 150, x0 + 132, x0 + 90, x0), '#41545e', 1, '#7d97a8')
    b += camino('M%s,62 L%s,62 L%s,46 L%s,46 L%s,62 L%s,62 L%s,100 L%s,96 L%s,74 Z' % (
        x0 + 100, x0 + 128, x0 + 136, x0 + 148, x0 + 156, x0 + 186, x0 + 186, x0 + 150, x0 + 104), '#8d6e63', 1, '#bca393')
    b += camino('M%s,104 C%s,84 %s,66 %s,48' % (x0 + 150, x0 + 146, x0 + 144, x0 + 142), '#d7263d', 2)
    b += linea(x0 + 20, 58, x0 + 60, 58, T, 1.6, fin='pl') + linea(x0 + 186, 30, x0 + 166, 30, T, 1.6, fin='pl')
    b += texto(x0 + 112, 108, '★', '#c2185b', 'middle', 13)
    b += texto(x0 + 36, 84, 'oceánica', '#ffffff', 'middle', 8, True)
    b += texto(x0 + 168, 76, 'continental', T, 'middle', 7.5, True)
    b += texto(x0 + 93, 156, 'Convergente', A, 'middle', 10, True)
    b += texto(x0 + 93, 169, 'chocan: una se hunde bajo la otra', G, 'middle', 8.3)
    b += texto(x0 + 93, 180, '(subducción: sismos ★ y volcanes)', G, 'middle', 8.3)
    # transformante (vista desde arriba)
    x0 = 428
    b += rect(x0, 40, 76, 96, '#8d6e63', '#bca393', 2, 1) + rect(x0 + 80, 40, 76, 96, '#8d6e63', '#cdb7a8', 2, 1)
    b += linea(x0 + 78, 36, x0 + 78, 140, '#d7263d', 2, '5 3')
    b += linea(x0 + 38, 120, x0 + 38, 60, T, 1.8, fin='pl') + linea(x0 + 118, 60, x0 + 118, 120, T, 1.8, fin='pl')
    b += texto(x0 + 78, 156, 'Transformante', A, 'middle', 10, True)
    b += texto(x0 + 78, 169, 'se deslizan una junto a otra', G, 'middle', 8.3)
    b += texto(x0 + 78, 180, '(falla de San Andrés)', G, 'middle', 8.3)
    return svg(590, 186, b, escala=1.1)


def fig_volcan():
    b = ''
    b += rect(0, 200, 430, 50, 'none', '#d7ccc8', 0, 0)
    b += '<ellipse cx="200" cy="236" rx="70" ry="12" fill="#e2504a" stroke="#a83232" stroke-width="1.4"/>'
    b += poligono([(40, 200), (184, 72), (200, 84), (216, 72), (360, 200)], '#6d4c41', '#a1887f', 1.6)
    b += camino('M200,226 L200,86', '#e2504a', 9) + camino('M200,226 L200,86', '#f28b50', 4)
    b += camino('M214,78 C230,100 236,120 262,136 C280,148 290,170 300,198', '#f28b50', 6)
    import random
    rnd = random.Random(4)
    for k in range(16):
        x = 200 + (rnd.random() - 0.5) * 70 + k * 2
        y = 52 - rnd.random() * 40
        b += circulo(x, y, 9 + rnd.random() * 8, 'none', '#9e9e9e', 0).replace('fill="#9e9e9e"', 'fill="#9e9e9e" fill-opacity="0.55"')
    def et(x, y, s, x2, y2, anc='start'):
        return linea(x2, y2, x + (-4 if anc == 'end' else 4) * 0, y - 3, '#5a6375', 0.9) + texto(x + (2 if anc == 'start' else -2), y, s, T, anc, 9, True)
    b += et(300, 22, 'nube de ceniza y gases', 236, 30)
    b += et(300, 70, 'cráter', 212, 78)
    b += et(330, 120, 'lava', 266, 140)
    b += et(78, 120, 'cono', 120, 140, 'end')
    b += et(78, 168, 'chimenea', 198, 168, 'end')
    b += et(300, 246, 'cámara magmática', 262, 238)
    return svg(430, 252, b)


def fig_sismo():
    b = rect(0, 46, 300, 140, 'none', '#efe6dd', 0, 0)
    b += linea(0, 46, 300, 46, '#6d4c41', 2)
    b += linea(110, 46, 190, 186, '#8d6e63', 1.6, '6 4')
    for r in (14, 30, 48, 68):
        b += circulo(150, 116, r, '#e2504a', 'none', 1.1).replace('/>', ' stroke-opacity="0.7"/>')
    b += texto(150, 121, '★', '#c2185b', 'middle', 15)
    b += punto(150, 46, '#c2185b', 4)
    b += linea(150, 46, 150, 108, '#c2185b', 1, '3 3')
    b += texto(158, 24, 'Epicentro: punto de la superficie', T, tam=8.5, neg=True)
    b += texto(158, 36, 'justo arriba del foco', T, tam=8.5)
    b += texto(204, 150, 'Hipocentro o foco:', T, tam=8.5, neg=True)
    b += texto(204, 162, 'donde se rompe la roca', T, tam=8.5)
    b += texto(16, 176, 'falla', '#6d4c41', tam=8.5, neg=True)
    b += texto(16, 70, 'ondas sísmicas', '#e2504a', tam=8.5, neg=True)
    return svg(330, 190, b)


def fig_climogramas():
    meses = 'EFMAMJJASOND'
    datos = [('f: llueve todo el año', [110, 95, 100, 105, 120, 140, 150, 145, 160, 150, 120, 115], A),
             ('w: lluvias en verano, invierno seco', [10, 6, 4, 6, 25, 150, 210, 200, 230, 110, 20, 12], O)]
    b = ''
    for k, (titulo, lluvias, c) in enumerate(datos):
        x0 = 20 + k * 270
        b += texto(x0 + 120, 16, titulo, c, 'middle', 9.5, True)
        b += linea(x0, 140, x0 + 240, 140, G, 1.2) + linea(x0, 140, x0, 28, G, 1.2)
        b += texto(x0 + 4, 34, 'lluvia', G, tam=8, ital=True)
        for i, v in enumerate(lluvias):
            h = v * 0.45
            b += rect(x0 + 8 + i * 19, 140 - h, 14, h, 'none', c, 1, 0)
            b += texto(x0 + 15 + i * 19, 152, meses[i], G, 'middle', 8)
    b += texto(275, 172, 'Ejemplos ilustrativos (no son datos de una ciudad en particular)', G, 'middle', 8)
    return svg(560, 178, b)


def fig_piramides_poblacion():
    formas = [('Progresiva (joven)', 'mucha natalidad: base ancha', [70, 62, 54, 46, 38, 30, 22, 14, 8]),
              ('Estacionaria (madura)', 'natalidad y mortalidad parejas', [46, 46, 45, 44, 42, 38, 32, 24, 12]),
              ('Regresiva (envejecida)', 'poca natalidad: base angosta', [30, 34, 38, 42, 44, 44, 40, 32, 20])]
    b = ''
    for k, (t1, t2, anchos) in enumerate(formas):
        cx = 90 + k * 180
        for i, w in enumerate(anchos):
            y = 130 - (i + 1) * 12
            b += rect(cx - w, y, w - 1, 11, 'none', '#3b7dc4', 0, 0) + rect(cx + 1, y, w - 1, 11, 'none', '#e8749a', 0, 0)
        b += texto(cx, 148, t1, A, 'middle', 9.5, True)
        b += texto(cx, 160, t2, G, 'middle', 8.3)
    b += texto(20, 14, 'hombres', '#3b7dc4', tam=8.5, neg=True) + texto(160, 14, 'mujeres', '#e8749a', 'end', 8.5, True)
    b += texto(530, 14, 'arriba: los más viejos · abajo: los niños', G, 'end', 8.3)
    return svg(540, 166, b, escala=1.1)


def fig_zonas_maritimas():
    b = flechas('zm', G)
    b += rect(0, 40, 60, 90, 'none', '#e3f1df', 0, 0) + texto(30, 90, 'tierra', V, 'middle', 9, True)
    zonas = [(60, 170, '#7fb3d5', 'Mar territorial', '12 mn (22.2 km)'), (170, 290, '#a9cce3', 'Zona contigua', 'hasta 24 mn (44.4 km)'),
             (290, 560, '#d4e6f1', 'Zona económica exclusiva', 'hasta 200 mn (370.4 km)')]
    for x1, x2, c, t1, t2 in zonas:
        b += rect(x1, 40, x2 - x1, 90, 'none', c, 0, 0)
        b += texto((x1 + x2) / 2, 80, t1, T, 'middle', 9, True)
        b += texto((x1 + x2) / 2, 94, t2, T, 'middle', 8.5)
    b += rect(560, 40, 60, 90, 'none', '#ffffff', 0, 0) + texto(590, 90, 'alta mar', G, 'middle', 8.5, True)
    b += camino('M318,40 L326,130', '#ffffff', 6) + camino('M318,40 L326,130', '#9cc3d3', 1)
    b += texto(425, 108, '(ZEE)', T, 'middle', 8.5, True)
    b += linea(60, 140, 170, 140, A, 1.2, ini='zm', fin='zm')
    b += texto(115, 156, 'soberanía plena', A, 'middle', 8.5, True)
    b += linea(290, 140, 560, 140, A, 1.2, ini='zm', fin='zm')
    b += texto(425, 156, 'derechos sobre los recursos; otros barcos pasan libres', A, 'middle', 8.5, True)
    b += texto(310, 26, 'distancias desde la costa · mn = millas náuticas (1 mn = 1.852 km) · sin escala', G, 'middle', 8.3)
    return svg(620, 162, b, escala=1.1)


FIGURAS = {k[4:]: v for k, v in globals().items() if k.startswith('fig_')}
