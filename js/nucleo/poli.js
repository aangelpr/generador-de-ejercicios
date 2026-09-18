/* Polinomios representados como arreglo de coeficientes en orden DESCENDENTE.
   [3,0,-2,1] significa 3x^3 - 2x + 1. Lo usan varios temas (algebra y calculo). */
(function (global) {
  'use strict';
  var EJ = global.EJ = global.EJ || {};
  var F = EJ.fmt;

  function limpia(p) {
    var i = 0;
    while (i < p.length - 1 && Math.abs(p[i]) < 1e-12) i++;
    return p.slice(i);
  }

  function suma(p, q) {
    var n = Math.max(p.length, q.length), out = [];
    for (var i = 0; i < n; i++) {
      out[n - 1 - i] = (p[p.length - 1 - i] || 0) + (q[q.length - 1 - i] || 0);
    }
    return limpia(out);
  }

  function resta(p, q) { return suma(p, q.map(function (c) { return -c; })); }

  function escala(p, k) { return p.map(function (c) { return c * k; }); }

  function multiplica(p, q) {
    var out = new Array(p.length + q.length - 1).fill(0);
    for (var i = 0; i < p.length; i++) {
      for (var j = 0; j < q.length; j++) out[i + j] += p[i] * q[j];
    }
    return limpia(out);
  }

  function potencia(p, n) {
    var out = [1];
    for (var i = 0; i < n; i++) out = multiplica(out, p);
    return out;
  }

  function evalua(p, x) {
    var v = 0;
    for (var i = 0; i < p.length; i++) v = v * x + p[i];
    return v;
  }

  function derivada(p) {
    var g = p.length - 1, out = [];
    for (var i = 0; i < p.length - 1; i++) out.push(p[i] * (g - i));
    return out.length ? out : [0];
  }

  /* Integral con constante 0. */
  function integral(p) {
    var g = p.length - 1, out = [];
    for (var i = 0; i < p.length; i++) out.push(p[i] / (g - i + 1));
    out.push(0);
    return out;
  }

  /* Division larga: devuelve {cociente, residuo} (ambos arreglos). */
  function divide(p, q) {
    p = p.slice(); q = limpia(q.slice());
    var salida = [];
    while (p.length >= q.length) {
      var c = p[0] / q[0];
      salida.push(c);
      for (var i = 0; i < q.length; i++) p[i] -= c * q[i];
      p.shift();
      if (!p.length) break;
    }
    return { cociente: salida.length ? salida : [0], residuo: limpia(p.length ? p : [0]) };
  }

  /* Texto bonito para pantalla. */
  function texto(p, v) { return F.poli(p, v || 'x'); }

  /* Texto plano para el comparador de expresiones. */
  function expr(p, v) {
    v = v || 'x';
    var g = p.length - 1, partes = [];
    for (var i = 0; i < p.length; i++) {
      if (Math.abs(p[i]) < 1e-12) continue;
      partes.push('(' + p[i] + ')*' + v + '^(' + (g - i) + ')');
    }
    return partes.length ? partes.join('+') : '0';
  }

  /* Polinomio a partir de raices enteras: (x - r1)(x - r2)... */
  function deRaices(raices, lider) {
    var p = [lider === undefined ? 1 : lider];
    raices.forEach(function (r) { p = multiplica(p, [1, -r]); });
    return p;
  }

  EJ.poli = {
    limpia: limpia, suma: suma, resta: resta, escala: escala, multiplica: multiplica,
    potencia: potencia, evalua: evalua, derivada: derivada, integral: integral,
    divide: divide, texto: texto, expr: expr, deRaices: deRaices
  };
})(window);
