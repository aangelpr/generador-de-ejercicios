/* Utilidades de formato matematico. Todo se imprime como HTML sencillo
   (sup, sub y fracciones con CSS) para no depender de MathJax ni de internet. */
(function (global) {
  'use strict';
  var EJ = global.EJ = global.EJ || {};

  function redondea(x, dec) {
    var f = Math.pow(10, dec === undefined ? 4 : dec);
    return Math.round(x * f) / f;
  }

  /* Numero legible: quita ceros sobrantes y usa "-" normal. */
  function n(x, dec) {
    if (x === null || x === undefined || (typeof x === 'number' && !isFinite(x))) return String(x);
    var v = redondea(x, dec === undefined ? 4 : dec);
    if (Object.is(v, -0)) v = 0;
    var s = String(v);
    if (s.indexOf('e') !== -1) s = v.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
    return s;
  }

  function sup(x) { return '<sup>' + x + '</sup>'; }
  function sub(x) { return '<sub>' + x + '</sub>'; }

  function frac(a, b) {
    return '<span class="frac"><span class="num">' + a + '</span><span class="den">' + b + '</span></span>';
  }

  function fracTxt(a, b) { return b === 1 ? String(a) : a + '/' + b; }

  function mcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { var t = b; b = a % b; a = t; }
    return a || 1;
  }

  function mcm(a, b) { return Math.abs(a * b) / mcd(a, b); }

  /* Simplifica a/b dejando el signo en el numerador. Devuelve [num, den]. */
  function simplifica(a, b) {
    if (b === 0) return [a, 0];
    var g = mcd(a, b);
    a = a / g; b = b / g;
    if (b < 0) { a = -a; b = -b; }
    return [a, b];
  }

  /* Fraccion ya simplificada como HTML; si el denominador es 1 imprime el entero. */
  function fracSimp(a, b) {
    var s = simplifica(a, b);
    if (s[1] === 1) return String(s[0]);
    if (s[0] < 0) return '-' + frac(Math.abs(s[0]), s[1]);
    return frac(s[0], s[1]);
  }

  /* Un termino: coeficiente * variable^exp  ->  "-3x²", "x", "5" */
  function term(coef, v, exp) {
    if (coef === 0) return '';
    v = v === undefined ? 'x' : v;
    exp = exp === undefined ? 1 : exp;
    if (exp === 0) return n(coef);
    var base = exp === 1 ? v : v + sup(exp);
    if (coef === 1) return base;
    if (coef === -1) return '-' + base;
    return n(coef) + base;
  }

  /* Une terminos ya formateados cuidando los signos: ["3x²","-2x","5"] -> "3x² - 2x + 5" */
  function une(partes) {
    var out = '';
    for (var i = 0; i < partes.length; i++) {
      var p = String(partes[i]).trim();
      if (!p || p === '0') continue;
      if (out === '') { out = p; continue; }
      if (p.charAt(0) === '-') out += ' - ' + p.slice(1);
      else out += ' + ' + p;
    }
    return out === '' ? '0' : out;
  }

  /* Polinomio a partir de coeficientes en orden DESCENDENTE: [1,-2,3] -> x² - 2x + 3 */
  function poli(coefs, v) {
    var g = coefs.length - 1, partes = [];
    for (var i = 0; i < coefs.length; i++) partes.push(term(coefs[i], v, g - i));
    return une(partes);
  }

  /* Polinomio a partir de coeficientes ASCENDENTES: [3,-2,1] -> x² - 2x + 3 */
  function poliAsc(coefs, v) { return poli(coefs.slice().reverse(), v); }

  function raiz(x, indice) {
    if (indice && indice !== 2) return sup(indice) + '&radic;<span class="rad">' + x + '</span>';
    return '&radic;<span class="rad">' + x + '</span>';
  }

  /* Raiz cuadrada exacta simplificada: 12 -> "2√3". Devuelve HTML. */
  function raizSimp(x) {
    if (x < 0) return raiz(x);
    var fuera = 1, dentro = x;
    for (var d = 2; d * d <= dentro; d++) {
      while (dentro % (d * d) === 0) { dentro /= (d * d); fuera *= d; }
    }
    if (dentro === 1) return String(fuera);
    return (fuera === 1 ? '' : fuera) + raiz(dentro);
  }

  function par(x, y) { return '(' + n(x) + ', ' + n(y) + ')'; }

  /* Envuelve en parentesis si hace falta (para productos). */
  function pare(s) {
    s = String(s);
    return /[+\-]/.test(s.replace(/^-/, '')) ? '(' + s + ')' : s;
  }

  /* Grados con simbolo. */
  function grados(x, dec) { return n(x, dec === undefined ? 2 : dec) + '&deg;'; }

  function escapaHtml(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* Convierte lo que escribe el usuario en algo que se lee como matematicas:
     x^2 -> x2 en chiquito, sqrt(5) -> raiz, pi -> simbolo, * -> punto.
     Solo es para MOSTRAR: la respuesta se sigue revisando con el texto original. */
  function vistaPrevia(texto) {
    var s = escapaHtml(texto);
    s = s.replace(/\^\s*\(([^()]*)\)/g, '<sup>$1</sup>');                 // x^(-2)
    s = s.replace(/\^\s*(-?[0-9]+(?:\.[0-9]+)?|[A-Za-z])/g, '<sup>$1</sup>'); // x^2, 2^n
    s = s.replace(/\bsqrt\s*/gi, '&radic;').replace(/\braiz\s*/gi, '&radic;');
    s = s.replace(/\bpi\b/gi, '&pi;');
    s = s.replace(/\*/g, '&middot;');
    return s;
  }

  /* true cuando la vista previa aporta algo (o sea, cuando cambia el texto). */
  function conviene(texto) {
    var t = String(texto || '').trim();
    if (!t) return false;
    return vistaPrevia(t) !== escapaHtml(t);
  }

  /* Figura SVG sencilla. Usa currentColor para verse bien en claro y oscuro. */
  function svg(w, h, contenido) {
    return '<svg class="fig" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" ' +
      'xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linejoin="round" stroke-linecap="round">' + contenido + '</svg>';
  }
  function txtSvg(x, y, texto, clase) {
    return '<text x="' + x + '" y="' + y + '" class="' + (clase || '') + '" stroke="none" fill="currentColor" ' +
      'font-size="13" font-family="inherit">' + texto + '</text>';
  }

  EJ.fmt = {
    svg: svg, txtSvg: txtSvg,
    escapaHtml: escapaHtml, vistaPrevia: vistaPrevia, convieneVistaPrevia: conviene,
    redondea: redondea, n: n, sup: sup, sub: sub, frac: frac, fracTxt: fracTxt,
    mcd: mcd, mcm: mcm, simplifica: simplifica, fracSimp: fracSimp,
    term: term, une: une, poli: poli, poliAsc: poliAsc,
    raiz: raiz, raizSimp: raizSimp, par: par, pare: pare, grados: grados
  };
})(window);
