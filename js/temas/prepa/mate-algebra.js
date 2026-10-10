/* Modo prepa - Matematicas: numeros, algebra, sucesiones y variacion
   (los reactivos 1 a 8 de la version de practica)

   Cada subtema se pregunta de varias formas (enfoques): la de la guia y otras
   que piden lo mismo desde otro lado, como lo haria otro examen. */
(function () {
  'use strict';
  var F = EJ.fmt, P = EJ.prepa;

  var VECES = { 2: 'doble', 3: 'triple', 4: 'cu&aacute;druple', 5: 'qu&iacute;ntuple' };
  var PARTE = { 2: 'un medio', 3: 'un tercio', 4: 'un cuarto', 5: 'un quinto' };

  /* factor (x - k) bien escrito */
  function fx(k) { return k === 0 ? 'x' : '(x ' + (k > 0 ? '&minus; ' + k : '+ ' + (-k)) + ')'; }
  /* numero con el signo menos tipografico */
  function m(v) { return F.n(v).replace(/^-/, '&minus;'); }
  /* fraccion simplificada; si es entera, el entero */
  function fr(a, b) {
    var s = F.simplifica(a, b);
    if (s[1] === 1) return m(s[0]);
    return (s[0] < 0 ? '&minus;' : '') + F.frac(Math.abs(s[0]), s[1]);
  }
  /* polinomio con el signo inicial tipografico */
  function pol(c, v) { return P.poli(c, v).replace(/^-/, '&minus;'); }
  function suma(l) { return l.reduce(function (a, b) { return a + b; }, 0); }
  /* para incisos que pueden ser negativos */
  function m2(v) { return m(F.redondea(v, 2)); }

  var casos = {};

  /* ---------------- 1. Numeros racionales ---------------- */
  casos.racionales = [
    /* la de la guia: ordenar tres fracciones */
    function (r) {
      var fs = [], vals = [];
      while (fs.length < 3) {
        var d = r.elige([3, 4, 5, 6, 7, 8, 9, 10, 12]), n = r.entero(1, d - 1);
        var s = F.simplifica(n, d), v = s[0] / s[1];
        if (vals.some(function (w) { return Math.abs(w - v) < 0.02; })) continue;
        fs.push(s); vals.push(v);
      }
      var orden = [0, 1, 2].sort(function (a, b) { return vals[a] - vals[b]; });
      function txt(o) { return o.map(function (i) { return i + 1; }).join(', '); }
      var bien = txt(orden);
      var malas = [txt(orden.slice().reverse()), txt([0, 1, 2]), txt([orden[1], orden[0], orden[2]]),
        txt([orden[0], orden[2], orden[1]]), txt([2, 1, 0])];
      var lista = fs.map(function (s, i) { return (i + 1) + '. &nbsp;' + F.frac(s[0], s[1]); }).join('<br>');
      return P.ejercicio(
        'Del siguiente listado de n&uacute;meros racionales, ordene de menor a mayor.<br><div class="lista-num">' + lista + '</div>',
        P.opciones(r, bien, malas),
        ['Pasa cada fraccion a decimal (divide numerador entre denominador) o ponlas con el mismo denominador.',
          'No te fijes solo en el denominador: 1/5 es mas chico que 1/3 aunque 5 sea mas grande.'],
        fs.map(function (s, i) { return (i + 1) + '. ' + F.frac(s[0], s[1]) + ' = ' + F.n(vals[i], 3); })
          .concat(['De menor a mayor: <b>' + bien + '</b>']));
    },

    /* fracciones, decimales y negativos en la misma lista */
    function (r) {
      var items, vals;
      do {
        items = []; vals = [];
        while (items.length < 4) {
          var tipo = r.entero(0, 2), v, t;
          if (tipo === 0) {
            var d = r.elige([2, 3, 4, 5, 6, 8]), n = r.enteroNoCero(-2 * d + 1, 2 * d - 1);
            if (n % d === 0) continue;
            v = n / d; t = fr(n, d);
          } else if (tipo === 1) {
            v = r.enteroNoCero(-25, 25) / 10; t = m(v);
          } else {
            var c = r.entero(-199, 199);
            if (c % 10 === 0) continue;
            v = c / 100; t = m(v);
          }
          if (vals.some(function (w) { return Math.abs(w - v) < 0.04 || Math.abs(Math.abs(w) - Math.abs(v)) < 0.04; })) continue;
          items.push(t); vals.push(v);
        }
      } while (!vals.some(function (v) { return v < 0; }) || !vals.some(function (v) { return v > 0; }));
      var asc = r.bool();
      function por(f) { return [0, 1, 2, 3].sort(function (a, b) { return asc ? f(vals[a]) - f(vals[b]) : f(vals[b]) - f(vals[a]); }); }
      function txt(o) { return o.map(function (i) { return i + 1; }).join(', '); }
      var orden = por(function (v) { return v; });
      var bien = txt(orden);
      var malas = [txt(orden.slice().reverse()), txt(por(Math.abs)), txt([0, 1, 2, 3]),
        txt([orden[0], orden[2], orden[1], orden[3]]), txt([orden[1], orden[0], orden[3], orden[2]])];
      var lista = items.map(function (t, i) { return (i + 1) + '. &nbsp;' + t; }).join('<br>');
      return P.ejercicio(
        'Del siguiente listado de n&uacute;meros, ordene de ' + (asc ? 'menor a mayor' : 'mayor a menor') + '.<br><div class="lista-num">' + lista + '</div>',
        P.opciones(r, bien, malas),
        ['Pasa todo a decimal para compararlos.',
          'Con negativos, el que esta mas lejos del cero es el MAS CHICO: &minus;2.5 &lt; &minus;0.5.'],
        items.map(function (t, i) { return (i + 1) + '. ' + t + ' = ' + m(F.redondea(vals[i], 3)); })
          .concat(['De ' + (asc ? 'menor a mayor' : 'mayor a menor') + ': <b>' + bien + '</b>']));
    },

    /* cual es el mayor (o el menor) */
    function (r) {
      var mayor = r.bool(), fs = [], vals = [];
      while (fs.length < 4) {
        var d = r.entero(3, 12), n = r.entero(1, d - 1), s = F.simplifica(n, d), v = s[0] / s[1];
        if (vals.some(function (w) { return Math.abs(w - v) < 0.02; })) continue;
        fs.push(s); vals.push(v);
      }
      var ext = mayor ? Math.max.apply(null, vals) : Math.min.apply(null, vals), i = vals.indexOf(ext);
      return P.ejercicio('&iquest;Cu&aacute;l de los siguientes n&uacute;meros es el ' + (mayor ? 'mayor' : 'menor') + '?',
        P.opciones(r, F.frac(fs[i][0], fs[i][1]), fs.filter(function (_, k) { return k !== i; }).map(function (s) { return F.frac(s[0], s[1]); })),
        ['Divide numerador entre denominador y compara los decimales.',
          'Con el mismo numerador, la fraccion mas grande es la de denominador mas chico.'],
        fs.map(function (s, k) { return F.frac(s[0], s[1]) + ' = ' + F.n(vals[k], 3); })
          .concat(['El ' + (mayor ? 'mayor' : 'menor') + ' es <b>' + F.frac(fs[i][0], fs[i][1]) + '</b>']));
    },

    /* un numero que esta entre otros dos */
    function (r) {
      var a, b;
      do {
        var d1 = r.entero(2, 9), n1 = r.entero(1, d1 - 1), d2 = r.entero(2, 9), n2 = r.entero(1, d2 - 1);
        a = F.simplifica(n1, d1); b = F.simplifica(n2, d2);
        if (a[0] / a[1] > b[0] / b[1]) { var t = a; a = b; b = t; }
      } while (b[0] / b[1] - a[0] / a[1] < 0.15);
      var va = a[0] / a[1], vb = b[0] / b[1], dentro = [], fuera = [];
      for (var d = 2; d <= 12; d++) {
        for (var n = 1; n < 2 * d; n++) {
          var s = F.simplifica(n, d), v = s[0] / s[1];
          if (s[1] !== d) continue;
          if (v > va && v < vb) dentro.push(s);
          else if (Math.abs(v - va) > 0.01 && Math.abs(v - vb) > 0.01 && v < 1.6) fuera.push(s);
        }
      }
      var bien = r.elige(dentro);
      var malas = r.muestra(fuera, 5).map(function (s) { return F.frac(s[0], s[1]); });
      return P.ejercicio('&iquest;Cu&aacute;l de los siguientes n&uacute;meros se encuentra entre ' + F.frac(a[0], a[1]) + ' y ' + F.frac(b[0], b[1]) + '?',
        P.opciones(r, F.frac(bien[0], bien[1]), malas),
        ['Convierte los dos extremos a decimal: ' + F.frac(a[0], a[1]) + ' = ' + F.n(va, 3) + ' y ' + F.frac(b[0], b[1]) + ' = ' + F.n(vb, 3) + '.',
          'Despues convierte cada inciso y busca el que quede en medio.'],
        [F.n(va, 3) + ' &lt; ' + F.n(bien[0] / bien[1], 3) + ' &lt; ' + F.n(vb, 3), 'El numero es <b>' + F.frac(bien[0], bien[1]) + '</b>']);
    },

    /* operaciones con fracciones */
    function (r) {
      var a, b, c, d, op = r.elige(['+', '&minus;', '&times;', '&divide;']), res, err;
      do {
        b = r.entero(2, 9); d = r.entero(2, 9); a = r.entero(1, b + 2); c = r.entero(1, d + 2);
      } while (b === d || F.mcd(a, b) !== 1 || F.mcd(c, d) !== 1 || (op === '&minus;' && a * d === c * b));
      if (op === '+') { res = [a * d + c * b, b * d]; err = [[a + c, b + d], [a + c, b * d], [a * c, b * d], [a * d + c * b, b + d]]; }
      else if (op === '&minus;') { res = [a * d - c * b, b * d]; err = [[a - c, b - d], [a * d + c * b, b * d], [c * b - a * d, b * d], [a - c, b * d]]; }
      else if (op === '&times;') { res = [a * c, b * d]; err = [[a * d, b * c], [a + c, b + d], [a * c, b + d], [a * c + 1, b * d]]; }
      else { res = [a * d, b * c]; err = [[a * c, b * d], [b * c, a * d], [a + d, b + c], [a * d, b * c * 2]]; }
      err.push([res[0] + 1, res[1]], [res[0] * 2, res[1]], [res[0], res[1] + 1]);
      var vRes = res[0] / res[1];
      var malas = err.filter(function (e) { return e[1] !== 0 && Math.abs(e[0] / e[1] - vRes) > 1e-9; })
        .map(function (e) { return fr(e[0], e[1]); });
      var nombre = { '+': 'Se busca el comun denominador: ' + F.frac('a&middot;d + c&middot;b', 'b&middot;d') + '.',
        '&minus;': 'Se busca el comun denominador: ' + F.frac('a&middot;d &minus; c&middot;b', 'b&middot;d') + '.',
        '&times;': 'Se multiplica numerador por numerador y denominador por denominador.',
        '&divide;': 'Se multiplica la primera por la segunda volteada: ' + F.frac('a', 'b') + ' &times; ' + F.frac('d', 'c') + '.' }[op];
      return P.ejercicio('&iquest;Cu&aacute;l es el resultado de ' + F.frac(a, b) + ' ' + op + ' ' + F.frac(c, d) + '?',
        P.opciones(r, fr(res[0], res[1]), malas),
        [nombre, 'Al final simplifica dividiendo arriba y abajo entre el mismo numero.'],
        [F.frac(a, b) + ' ' + op + ' ' + F.frac(c, d) + ' = ' + F.frac(m(res[0]), res[1]) + ' = <b>' + fr(res[0], res[1]) + '</b>']);
    }
  ];

  /* ---------------- 2. Polinomios: grado ---------------- */
  casos.grado = [
    /* la de la guia: grado de un polinomio */
    function (r) {
      var terminos = [], grados = [];
      var g = r.entero(3, 6), mixto = r.bool(0.5);
      if (mixto) {
        var ex = r.entero(1, g - 1);
        terminos.push({ c: r.entero(2, 9), t: 'x' + (ex > 1 ? F.sup(ex) : '') + 'y' + (g - ex > 1 ? F.sup(g - ex) : '') });
      } else {
        terminos.push({ c: r.entero(2, 9), t: 'x' + F.sup(g) });
      }
      grados.push(g);
      var n = r.entero(3, 5), vistos = [], intentos = 0;
      while (terminos.length < n + 1 && intentos++ < 50) {
        var gx = r.entero(1, g - 1), vb = r.elige(['x', 'y']), lit = vb + (gx > 1 ? F.sup(gx) : '');
        if (vistos.indexOf(lit) !== -1) continue;
        vistos.push(lit);
        terminos.push({ c: r.enteroNoCero(-12, 12), t: lit });
        grados.push(gx);
      }
      var cte = r.entero(5, 20);
      terminos = [terminos[0]].concat(r.baraja(terminos.slice(1)));
      var txt = '';
      terminos.forEach(function (tm, k) {
        var c = tm.c, abs = Math.abs(c) === 1 ? '' : Math.abs(c);
        txt += (k === 0 ? (c < 0 ? '&minus;' : '') : (c < 0 ? ' &minus; ' : ' + ')) + abs + tm.t;
      });
      txt += ' + ' + cte;
      var coefs = terminos.map(function (tm) { return Math.abs(tm.c); });
      return P.ejercicio(
        '&iquest;Cu&aacute;l es el grado de la siguiente expresi&oacute;n?<br><span class="expr">' + txt + '</span>',
        P.opciones(r, g, [terminos.length + 1, Math.max.apply(null, coefs), cte, g - 1, g + 1]),
        ['El grado de un termino es la suma de los exponentes de sus variables; el del polinomio es el mayor de esos.',
          'No es el numero de terminos ni el coeficiente mas grande.' + (mixto ? ' En un termino como x' + F.sup(2) + 'y' + F.sup(3) + ' el grado es 2 + 3.' : '')],
        ['Grados de cada termino: ' + grados.join(', ') + ' (el ' + cte + ' es de grado 0)', 'El mayor es <b>' + g + '</b>']);
    },

    /* grado de un monomio con varias variables */
    function (r) {
      var vars = r.muestra(['a', 'b', 'x', 'y', 'z'], r.entero(2, 3)).sort();
      var exps = vars.map(function () { return r.entero(1, 6); });
      var c = r.enteroNoCero(-15, 15), g = suma(exps);
      var t = (c < 0 ? '&minus;' : '') + (Math.abs(c) === 1 ? '' : Math.abs(c)) +
        vars.map(function (v, i) { return v + (exps[i] > 1 ? F.sup(exps[i]) : ''); }).join('');
      return P.ejercicio('&iquest;Cu&aacute;l es el grado del siguiente monomio?<br><span class="expr">' + t + '</span>',
        P.opciones(r, g, [Math.max.apply(null, exps), vars.length, Math.abs(c), g + 1, g - 1]),
        ['El grado de un monomio es la SUMA de los exponentes de todas sus variables.',
          'Una letra sin exponente tiene exponente 1; el coeficiente no cuenta.'],
        ['Exponentes: ' + exps.join(' + ') + ' = <b>' + g + '</b>']);
    },

    /* grado del producto de dos polinomios */
    function (r) {
      var g1 = r.entero(2, 5), g2 = r.entero(2, 4);
      function poliDe(g) {
        var c = [r.entero(1, 6)];
        for (var i = 1; i <= g; i++) c.push(i === g ? r.enteroNoCero(-9, 9) : (r.bool(0.4) ? r.enteroNoCero(-9, 9) : 0));
        return pol(c);
      }
      return P.ejercicio('&iquest;Cu&aacute;l es el grado del polinomio que resulta de la multiplicaci&oacute;n?<br><span class="expr">(' + poliDe(g1) + ')(' + poliDe(g2) + ')</span>',
        P.opciones(r, g1 + g2, [g1 * g2, Math.max(g1, g2), g1 + g2 + 1, g1 + g2 - 1]),
        ['No hace falta multiplicar todo: basta con el termino de mayor grado de cada parentesis.',
          'Al multiplicar potencias de la misma base los exponentes se SUMAN: x' + F.sup(g1) + ' &middot; x' + F.sup(g2) + ' = x' + F.sup(g1 + g2) + '.'],
        ['Termino de mayor grado del producto: x' + F.sup(g1) + ' &middot; x' + F.sup(g2) + ' = x' + F.sup(g1 + g2), 'Grado: <b>' + (g1 + g2) + '</b>']);
    },

    /* clasificar por numero de terminos y grado */
    function (r) {
      var NOMBRES = ['Monomio', 'Binomio', 'Trinomio', 'Polinomio de cuatro t&eacute;rminos'];
      var t = r.entero(2, 4), g = r.entero(Math.max(2, t - 1), 6), coefs = [], usados = [g];
      while (usados.length < t) { var e = r.entero(0, g - 1); if (usados.indexOf(e) === -1) usados.push(e); }
      for (var k = g; k >= 0; k--) coefs.push(usados.indexOf(k) === -1 ? 0 : (k === g ? r.enteroNoCero(-9, 9) : r.enteroNoCero(-12, 12)));
      function nombre(n, gg) { return NOMBRES[n - 1] + ' de grado ' + gg; }
      var bien = nombre(t, g);
      var malas = [nombre(t, g + 1), nombre(t, g - 1), nombre(t === 4 ? 3 : t + 1, g), nombre(t - 1, g), nombre(t, t)];
      return P.ejercicio('&iquest;C&oacute;mo se clasifica la siguiente expresi&oacute;n algebraica?<br><span class="expr">' + pol(coefs) + '</span>',
        P.opciones(r, bien, malas),
        ['Por el numero de terminos: 1 monomio, 2 binomio, 3 trinomio.', 'El grado es el exponente mas grande de la variable.'],
        ['Tiene ' + t + ' terminos y el mayor exponente es ' + g, 'Es un <b>' + bien.toLowerCase() + '</b>']);
    },

    /* grado relativo a una variable */
    function (r) {
      var terms = [], n = r.entero(3, 4), ok;
      do {
        terms = [];
        for (var i = 0; i < n; i++) terms.push({ c: r.enteroNoCero(-9, 9), x: r.entero(0, 5), y: r.entero(0, 5) });
        var gx = Math.max.apply(null, terms.map(function (t) { return t.x; }));
        var gy = Math.max.apply(null, terms.map(function (t) { return t.y; }));
        var ga = Math.max.apply(null, terms.map(function (t) { return t.x + t.y; }));
        ok = gx !== gy && ga !== gx && ga !== gy && gx > 0 && gy > 0 && terms.every(function (t) { return t.x + t.y > 0; });
      } while (!ok);
      var pide = r.bool() ? 'y' : 'x', rel = pide === 'y' ? gy : gx, otro = pide === 'y' ? gx : gy;
      var txt = '';
      terms.forEach(function (t, k) {
        var abs = Math.abs(t.c) === 1 ? '' : Math.abs(t.c);
        var lit = (t.x ? 'x' + (t.x > 1 ? F.sup(t.x) : '') : '') + (t.y ? 'y' + (t.y > 1 ? F.sup(t.y) : '') : '');
        txt += (k === 0 ? (t.c < 0 ? '&minus;' : '') : (t.c < 0 ? ' &minus; ' : ' + ')) + abs + lit;
      });
      return P.ejercicio('&iquest;Cu&aacute;l es el grado del siguiente polinomio con respecto a la variable ' + pide + '?<br><span class="expr">' + txt + '</span>',
        P.opciones(r, rel, [ga, otro, n, rel + 1]),
        ['El grado relativo a una variable es el MAYOR exponente con que aparece esa variable.',
          'No sumes los exponentes de x y de y: eso seria el grado absoluto.'],
        ['Exponentes de ' + pide + ': ' + terms.map(function (t) { return pide === 'y' ? t.y : t.x; }).join(', '), 'El mayor es <b>' + rel + '</b>']);
    },

    /* valor numerico */
    function (r) {
      var a = r.enteroNoCero(-4, 5), b = r.enteroNoCero(-5, 5), c = r.enteroNoCero(-4, 4);
      var x = r.enteroNoCero(-3, 4), y = r.enteroNoCero(-4, 3);
      if (y > 0 && x > 0) y = -y;
      var v = a * x * x + b * x * y + c * y * y;
      var e1 = a * x * x - b * x * y + c * y * y, e2 = a * a * x * x + b * x * y + c * y * y, e3 = a * x * x + b * x * y - c * y * y;
      var expr = (a === 1 ? '' : a === -1 ? '&minus;' : m(a)) + 'x' + F.sup(2) +
        (b < 0 ? ' &minus; ' : ' + ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'xy' +
        (c < 0 ? ' &minus; ' : ' + ') + (Math.abs(c) === 1 ? '' : Math.abs(c)) + 'y' + F.sup(2);
      return P.ejercicio('Si x = ' + m(x) + ' y y = ' + m(y) + ', &iquest;cu&aacute;l es el valor num&eacute;rico de la expresi&oacute;n?<br><span class="expr">' + expr + '</span>',
        P.opciones(r, v, [e1, e2, e3, v + 2 * a], { conSigno: true, fmt: m2 }),
        ['Sustituye cada letra por su valor entre parentesis: x = (' + m(x) + '), y = (' + m(y) + ').',
          'Primero las potencias, luego las multiplicaciones y al final las sumas. Un negativo al cuadrado es positivo.'],
        [m(a) + '(' + m(x) + ')' + F.sup(2) + ' + ' + P.np(b) + '(' + m(x) + ')(' + m(y) + ') + ' + P.np(c) + '(' + m(y) + ')' + F.sup(2),
          '= ' + m(a * x * x) + ' + ' + P.np(b * x * y) + ' + ' + P.np(c * y * y) + ' = <b>' + m(v) + '</b>']);
    }
  ];

  /* ---------------- 3. Lenguaje algebraico ---------------- */
  casos.lenguaje = [
    /* la de la guia: del texto a la expresion */
    function (r) {
      var forma = r.entero(0, 2), enun, bien, malas;
      var k1 = r.entero(2, 5), k2 = r.entero(2, 5), q = r.entero(2, 4);
      while (k2 === k1) k2 = r.entero(2, 5);
      var fq = F.frac(1, q);
      if (forma === 0) {
        enun = 'El ' + VECES[k1] + ' producto de un n&uacute;mero es igual al ' + VECES[k2] +
          ' producto del mismo n&uacute;mero m&aacute;s ' + PARTE[q] + ' de otro n&uacute;mero.';
        bien = k1 + 'a = ' + k2 + 'a + ' + fq + 'b';
        malas = [k1 + 'a = ' + k2 + 'b + ' + fq + 'a', k1 + 'b = ' + k2 + 'a + ' + fq + 'a', k1 + 'b = ' + k2 + 'a + ' + fq + 'b',
          k1 + 'a = ' + k2 + '(a + ' + fq + 'b)'];
      } else if (forma === 1) {
        var n = r.entero(10, 60);
        enun = 'La suma de un n&uacute;mero y el ' + VECES[k1] + ' de otro n&uacute;mero es igual a ' + n + '.';
        bien = 'a + ' + k1 + 'b = ' + n;
        malas = [k1 + '(a + b) = ' + n, k1 + 'a + b = ' + n, 'a + b = ' + k1 + ' &middot; ' + n, 'a + b' + F.sup(k1) + ' = ' + n];
      } else {
        enun = 'El cuadrado de un n&uacute;mero disminuido en el ' + VECES[k2] + ' de otro n&uacute;mero es igual a ' + PARTE[q] + ' del primero.';
        bien = 'a' + F.sup(2) + ' &minus; ' + k2 + 'b = ' + fq + 'a';
        malas = ['(a &minus; ' + k2 + 'b)' + F.sup(2) + ' = ' + fq + 'a', '2a &minus; ' + k2 + 'b = ' + fq + 'a',
          'a' + F.sup(2) + ' &minus; ' + k2 + 'b = ' + fq + 'b', 'a' + F.sup(2) + ' &minus; b' + F.sup(k2) + ' = ' + fq + 'a'];
      }
      return P.ejercicio(
        'Seleccione la opci&oacute;n que represente algebraicamente el siguiente texto.<br><div class="lectura">' + enun + '</div>',
        P.opciones(r, bien, malas),
        ['Ponle nombre a cada numero: el primero es a y el otro es b.',
          'Fijate bien a cual numero le pasa cada cosa: "el mismo numero" es a otra vez; "otro numero" es b.'],
        ['Primer numero: a; otro numero: b', 'Traduccion: <b>' + bien + '</b>']);
    },

    /* al reves: de la expresion al texto */
    function (r) {
      var k = r.entero(2, 5), n = r.entero(8, 60), q = r.entero(2, 4), c;
      var formas = [
        { e: k + '(a + b) = ' + n, b: 'El ' + VECES[k] + ' de la suma de dos n&uacute;meros es igual a ' + n,
          m: ['La suma del ' + VECES[k] + ' de un n&uacute;mero y otro n&uacute;mero es igual a ' + n,
            'La suma de dos n&uacute;meros es igual al ' + VECES[k] + ' de ' + n,
            'El ' + VECES[k] + ' de un n&uacute;mero es igual a la suma de otro n&uacute;mero y ' + n] },
        { e: 'a' + F.sup(2) + ' + b' + F.sup(2) + ' = ' + n, b: 'La suma de los cuadrados de dos n&uacute;meros es igual a ' + n,
          m: ['El cuadrado de la suma de dos n&uacute;meros es igual a ' + n, 'El doble de la suma de dos n&uacute;meros es igual a ' + n,
            'La suma de los cuadrados de dos n&uacute;meros es igual al cuadrado de ' + n] },
        { e: 'a &minus; b = ' + F.frac('b', q), b: 'La diferencia de dos n&uacute;meros es igual a ' + PARTE[q] + ' del segundo',
          m: ['La diferencia de dos n&uacute;meros es igual a ' + PARTE[q] + ' del primero',
            'La diferencia de dos n&uacute;meros es igual al ' + VECES[q] + ' del segundo',
            'El segundo n&uacute;mero disminuido en el primero es igual a ' + PARTE[q] + ' del segundo'] },
        { e: F.frac('a + b', 2) + ' = ' + n, b: 'La mitad de la suma de dos n&uacute;meros es igual a ' + n,
          m: ['La mitad de un n&uacute;mero m&aacute;s otro n&uacute;mero es igual a ' + n, 'La suma de dos n&uacute;meros es igual a la mitad de ' + n,
            'El doble de la suma de dos n&uacute;meros es igual a ' + n] }
      ];
      c = r.elige(formas);
      return P.ejercicio('&iquest;Qu&eacute; enunciado corresponde a la siguiente expresi&oacute;n algebraica?<br><span class="expr">' + c.e + '</span>',
        P.opciones(r, c.b, c.m),
        ['Lee la expresion por partes: primero lo que esta entre parentesis o arriba de la fraccion.',
          '"El doble de la suma" (2(a + b)) no es lo mismo que "la suma del doble" (2a + b).'],
        ['Se lee: <b>' + c.b + '</b>']);
    },

    /* plantear la ecuacion de un problema */
    function (r) {
      var c = r.entero(0, 3), enun, bien, malas;
      if (c === 0) {
        var k = r.entero(2, 5), x = r.entero(6, 20), S = x + k * x;
        var quien = r.elige([['Ana', 'Luis'], ['Marta', 'Pedro'], ['Sof&iacute;a', 'Diego']]);
        enun = 'La edad de ' + quien[0] + ' es el ' + VECES[k] + ' de la edad de ' + quien[1] + ' y entre los dos suman ' + S +
          ' a&ntilde;os. Si x es la edad de ' + quien[1] + ', &iquest;qu&eacute; ecuaci&oacute;n permite encontrarla?';
        bien = 'x + ' + k + 'x = ' + S;
        malas = [k + 'x = ' + S, 'x + ' + k + ' = ' + S, 'x + ' + F.frac('x', k) + ' = ' + S, k + '(x + ' + S + ') = x'];
      } else if (c === 1) {
        var d = r.entero(2, 9), w = r.entero(3, 15), per = 2 * w + 2 * (w + d);
        enun = 'El largo de un rect&aacute;ngulo mide ' + d + ' cm m&aacute;s que su ancho x, y su per&iacute;metro es de ' + per +
          ' cm. &iquest;Qu&eacute; ecuaci&oacute;n permite encontrar el ancho?';
        bien = '2x + 2(x + ' + d + ') = ' + per;
        malas = ['x + (x + ' + d + ') = ' + per, 'x(x + ' + d + ') = ' + per, '2x + (x + ' + d + ') = ' + per, '4x + ' + d + ' = ' + per];
      } else if (c === 2) {
        var a = r.entero(10, 40), par = r.bool(), S2 = par ? 3 * (2 * a) + 6 : 3 * a + 3;
        enun = 'La suma de tres n&uacute;meros enteros ' + (par ? 'pares ' : '') + 'consecutivos es ' + S2 +
          '. Si x es el menor de ellos, &iquest;qu&eacute; ecuaci&oacute;n permite encontrarlos?';
        bien = par ? 'x + (x + 2) + (x + 4) = ' + S2 : 'x + (x + 1) + (x + 2) = ' + S2;
        malas = par ? ['x + (x + 1) + (x + 2) = ' + S2, 'x + 2x + 4x = ' + S2, 'x(x + 2)(x + 4) = ' + S2, '2x + 4x + 6x = ' + S2]
          : ['x + 2x + 3x = ' + S2, 'x + (x + 2) + (x + 4) = ' + S2, 'x(x + 1)(x + 2) = ' + S2, '3x = ' + S2 + ' + 1'];
      } else {
        var v1 = r.elige([2, 5]), v2 = v1 === 2 ? r.elige([5, 10]) : 10, N = r.entero(15, 40), x5 = r.entero(4, N - 4), T = v1 * x5 + v2 * (N - x5);
        enun = 'En una alcanc&iacute;a hay ' + N + ' monedas, unas de $' + v1 + ' y otras de $' + v2 + ', que suman $' + T +
          '. Si x es el n&uacute;mero de monedas de $' + v1 + ', &iquest;qu&eacute; ecuaci&oacute;n lo representa?';
        bien = v1 + 'x + ' + v2 + '(' + N + ' &minus; x) = ' + T;
        malas = [v1 + 'x + ' + v2 + 'x = ' + T, v1 + 'x + ' + v2 + '(x &minus; ' + N + ') = ' + T, v2 + 'x + ' + v1 + '(' + N + ' &minus; x) = ' + T,
          v1 + 'x + ' + v2 + ' = ' + T];
      }
      return P.ejercicio(enun, P.opciones(r, bien, malas),
        ['Escribe con x lo que no conoces y con expresiones lo demas (por ejemplo, "3 mas que x" es x + 3).',
          'La ecuacion junta todo lo que dice el problema; comprueba el inciso con un numero que lo cumpla.'],
        ['Ecuacion: <b>' + bien + '</b>']);
    }
  ];

  /* ---------------- 4. Progresion aritmetica ---------------- */
  casos.progAritmetica = [
    /* la de la guia: la suma con un contexto */
    function (r) {
      var n = r.entero(12, 30), a1 = r.entero(2, 10), d = r.entero(2, 8);
      var an = a1 + (n - 1) * d, S = n * (a1 + an) / 2;
      function sumaN(k) { return k * (2 * a1 + (k - 1) * d) / 2; }
      var ctx = r.entero(0, 2), enun, unidad = '', antes = '';
      if (ctx === 0) {
        enun = 'Hace ' + n + ' d&iacute;as, un ni&ntilde;o decidi&oacute; ahorrar $' + a1 + ' y cada d&iacute;a posterior ahorra $' + d +
          ' m&aacute;s que el anterior. Contando hoy, &iquest;cu&aacute;nto lleva ahorrado?';
        antes = '$';
      } else if (ctx === 1) {
        enun = 'Un auditorio tiene ' + n + ' filas. La primera fila tiene ' + a1 + ' butacas y cada fila tiene ' + d +
          ' butacas m&aacute;s que la anterior. &iquest;Cu&aacute;ntas butacas tiene el auditorio?';
        unidad = 'butacas';
      } else {
        enun = 'Una corredora entrena ' + n + ' d&iacute;as. El primer d&iacute;a corre ' + a1 + ' km y cada d&iacute;a corre ' + d +
          ' km m&aacute;s que el anterior. &iquest;Cu&aacute;ntos kil&oacute;metros corri&oacute; en total?';
        unidad = 'km';
      }
      var op = { unidad: unidad, fmt: antes ? function (v) { return P.pesos(v).slice(1); } : null, antes: antes };
      return P.ejercicio(enun + P.considere('a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)r &nbsp;y&nbsp; S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>) / 2.'),
        P.opciones(r, S, [sumaN(n - 1), sumaN(n + 1), n * an / 2, n * a1 + n * d], op),
        ['Primero calcula el ultimo termino: a<sub>' + n + '</sub> = ' + a1 + ' + (' + n + ' &minus; 1)(' + d + ').',
          'Luego suma todo con S = n(a<sub>1</sub> + a<sub>n</sub>)/2 con n = ' + n + '.'],
        ['a<sub>' + n + '</sub> = ' + a1 + ' + ' + (n - 1) + ' &times; ' + d + ' = ' + an,
          'S<sub>' + n + '</sub> = ' + n + '(' + a1 + ' + ' + an + ') / 2 = <b>' + F.n(S) + '</b>']);
    },

    /* el termino n-esimo */
    function (r) {
      var a1 = r.entero(-5, 12), d = r.enteroNoCero(-6, 9), n = r.entero(15, 40), an = a1 + (n - 1) * d;
      var terms = [a1, a1 + d, a1 + 2 * d, a1 + 3 * d].map(m).join(', ');
      return P.ejercicio('&iquest;Cu&aacute;l es el t&eacute;rmino n&uacute;mero ' + n + ' de la sucesi&oacute;n ' + terms + ', &hellip;?' +
        P.considere('a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d.'),
        P.opciones(r, an, [a1 + n * d, a1 + (n - 2) * d, n * d, a1 * n + d], { conSigno: true, fmt: m2 }),
        ['La diferencia d es lo que se suma de un termino al siguiente: d = ' + m(d) + '.',
          'Del primero al termino ' + n + ' hay ' + (n - 1) + ' saltos, no ' + n + '.'],
        ['a<sub>' + n + '</sub> = ' + m(a1) + ' + (' + n + ' &minus; 1)(' + m(d) + ') = ' + m(a1) + ' + ' + P.np((n - 1) * d) + ' = <b>' + m(an) + '</b>']);
    },

    /* la diferencia a partir de dos terminos */
    function (r) {
      var d = r.enteroNoCero(-7, 9), p = r.entero(2, 6), q = p + r.entero(4, 12), a1 = r.entero(-10, 15);
      var ap = a1 + (p - 1) * d, aq = a1 + (q - 1) * d;
      return P.ejercicio('En una progresi&oacute;n aritm&eacute;tica el t&eacute;rmino ' + p + ' es ' + m(ap) + ' y el t&eacute;rmino ' + q + ' es ' + m(aq) +
        '. &iquest;Cu&aacute;l es la diferencia de la progresi&oacute;n?',
        P.opciones(r, d, [(aq - ap) / (q - p + 1), aq - ap, (aq - ap) / q, (aq + ap) / (q - p)], { conSigno: true, dec: 2, fmt: m2 }),
        ['Entre el termino ' + p + ' y el ' + q + ' hay ' + (q - p) + ' saltos de tamano d.',
          'Asi que d = (a<sub>' + q + '</sub> &minus; a<sub>' + p + '</sub>) / ' + (q - p) + '.'],
        ['d = (' + m(aq) + ' &minus; ' + P.np(ap) + ') / (' + q + ' &minus; ' + p + ') = ' + m(aq - ap) + ' / ' + (q - p) + ' = <b>' + m(d) + '</b>']);
    },

    /* cuantos terminos tiene */
    function (r) {
      var a1 = r.entero(1, 15), d = r.entero(2, 9), n = r.entero(15, 45), an = a1 + (n - 1) * d;
      var terms = [a1, a1 + d, a1 + 2 * d].join(', ');
      return P.ejercicio('&iquest;Cu&aacute;ntos t&eacute;rminos tiene la sucesi&oacute;n ' + terms + ', &hellip;, ' + an + '?',
        P.opciones(r, n, [n - 1, n + 1, Math.round(an / d), Math.round((an + a1) / d)]),
        ['Despeja n de a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d.', 'No olvides sumar 1 al final: los saltos son uno menos que los terminos.'],
        [an + ' = ' + a1 + ' + (n &minus; 1)(' + d + ') &rarr; n &minus; 1 = ' + (an - a1) + ' / ' + d + ' = ' + (n - 1), 'n = <b>' + n + '</b>']);
    },

    /* el termino general */
    function (r) {
      var a1 = r.entero(-4, 12), d = r.enteroNoCero(-5, 7), c = a1 - d;
      function gen(dd, cc) {
        var t = (dd === 1 ? '' : dd === -1 ? '&minus;' : m(dd)) + 'n';
        return 'a<sub>n</sub> = ' + t + (cc === 0 ? '' : cc > 0 ? ' + ' + cc : ' &minus; ' + (-cc));
      }
      var terms = [a1, a1 + d, a1 + 2 * d, a1 + 3 * d].map(m).join(', ');
      var malas = [gen(d, a1), gen(a1 === 0 ? 2 : a1, d), gen(d, -c), gen(d + 1, c - 1), gen(c === 0 ? 1 : c, d),
        gen(d, c - 1), gen(2 * d, c), gen(d, c + 2)];
      return P.ejercicio('&iquest;Cu&aacute;l es el t&eacute;rmino general de la sucesi&oacute;n ' + terms + ', &hellip;?',
        P.opciones(r, gen(d, c), malas),
        ['El numero que acompana a n es la diferencia: d = ' + m(d) + '.',
          'Comprueba con n = 1: el resultado debe ser el primer termino, ' + m(a1) + '.'],
        ['a<sub>n</sub> = ' + m(a1) + ' + (n &minus; 1)(' + m(d) + ') = <b>' + gen(d, c).replace('a<sub>n</sub> = ', '') + '</b>',
          'Comprobacion: n = 1 da ' + m(d + c) + ', n = 2 da ' + m(2 * d + c)]);
    },

    /* una cantidad que disminuye lo mismo cada vez */
    function (r) {
      var ini = r.entero(20, 60) * 50, baja = r.entero(3, 12) * 5, t = r.entero(5, 20);
      while (ini - baja * t <= 0) t--;
      var ctx = r.elige([
        ['Un tinaco tiene ' + P.num(ini, 0) + ' litros de agua y pierde ' + baja + ' litros cada hora por una fuga.', '&iquest;Cu&aacute;ntos litros tendr&aacute; despu&eacute;s de ' + t + ' horas?', 'L'],
        ['Una persona debe $' + P.num(ini, 0).replace(' ', ',') + ' y cada semana paga $' + baja + '.', '&iquest;Cu&aacute;nto deber&aacute; despu&eacute;s de ' + t + ' semanas?', 'pesos'],
        ['Un auto tiene ' + P.num(ini, 0) + ' km en el od&oacute;metro de su viaje pendiente y cada d&iacute;a avanza ' + baja + ' km.', '&iquest;Cu&aacute;ntos kil&oacute;metros le faltar&aacute;n despu&eacute;s de ' + t + ' d&iacute;as?', 'km']
      ]);
      var v = ini - baja * t;
      return P.ejercicio(ctx[0] + ' ' + ctx[1],
        P.opciones(r, v, [ini - baja * (t - 1), ini - baja * (t + 1), baja * t, ini + baja * t], { unidad: ctx[2], fmt: function (x) { return P.num(x, 0); } }),
        ['Es una progresion aritmetica con diferencia negativa: cada vez se resta ' + baja + '.',
          'Despues de ' + t + ' periodos se resto ' + t + ' veces.'],
        [P.num(ini, 0) + ' &minus; ' + t + ' &times; ' + baja + ' = <b>' + P.num(v, 0) + ' ' + ctx[2] + '</b>']);
    }
  ];

  /* ---------------- 5. Progresion geometrica ---------------- */
  casos.progGeometrica = [
    /* la de la guia: suma de contagios o mensajes */
    function (r) {
      var q = r.elige([2, 3, 4]), n = q === 2 ? r.entero(8, 14) : q === 3 ? r.entero(6, 10) : r.entero(5, 8);
      var an = Math.pow(q, n - 1), S = (q * an - 1) / (q - 1);
      var ctx = r.entero(0, 1), enun;
      if (ctx === 0) {
        enun = 'Una persona enferma de gripe contagi&oacute; a ' + q + ' personas. Al d&iacute;a siguiente, cada una de &eacute;stas contagi&oacute; a otras ' + q +
          ' y as&iacute; sucesivamente. Si cada persona se aisl&oacute; al d&iacute;a siguiente de contagiar, &iquest;cu&aacute;ntas personas se contagiaron en ' + n + ' d&iacute;as?';
      } else {
        enun = 'Una cadena de mensajes empieza el primer d&iacute;a con 1 mensaje. Cada d&iacute;a, cada mensaje del d&iacute;a anterior se reenv&iacute;a a ' + q +
          ' personas nuevas. &iquest;Cu&aacute;ntos mensajes se habr&aacute;n enviado en total al terminar el d&iacute;a ' + n + '?';
      }
      return P.ejercicio(enun + P.considere('a<sub>n</sub> = r<sup>n&minus;1</sup> &nbsp;y&nbsp; S<sub>n</sub> = (r&middot;a<sub>n</sub> &minus; a<sub>1</sub>) / (r &minus; 1).'),
        P.opciones(r, S, [an, an + 1, S * (q - 1), q * an], { fmt: function (v) { return P.num(v, 0); } }),
        ['Es una progresion geometrica con a<sub>1</sub> = 1 y razon r = ' + q + '.',
          'No te pide solo lo del ultimo dia (a<sub>n</sub>): pide el TOTAL, o sea la suma S<sub>n</sub>.'],
        ['a<sub>' + n + '</sub> = ' + q + '<sup>' + (n - 1) + '</sup> = ' + P.num(an, 0),
          'S<sub>' + n + '</sub> = (' + q + ' &times; ' + P.num(an, 0) + ' &minus; 1) / ' + (q - 1) + ' = <b>' + P.num(S, 0) + '</b>']);
    },

    /* el termino n-esimo */
    function (r) {
      var a1 = r.entero(1, 6), q = r.elige([2, 3, -2]), n = r.entero(5, q === 2 || q === -2 ? 10 : 7);
      var an = a1 * Math.pow(q, n - 1);
      var terms = [0, 1, 2, 3].map(function (k) { return m(a1 * Math.pow(q, k)); }).join(', ');
      return P.ejercicio('&iquest;Cu&aacute;l es el t&eacute;rmino ' + n + ' de la progresi&oacute;n geom&eacute;trica ' + terms + ', &hellip;?' +
        P.considere('a<sub>n</sub> = a<sub>1</sub> &middot; r<sup>n&minus;1</sup>.'),
        P.opciones(r, an, [a1 * Math.pow(q, n), a1 * Math.pow(q, n - 2), Math.pow(q, n - 1), a1 * q * (n - 1)], { conSigno: true, fmt: function (v) { return m(v).replace(/(\d)(?=(\d{3})+$)/g, '$1 '); } }),
        ['La razon r es lo que se MULTIPLICA de un termino al siguiente: r = ' + m(q) + '.',
          'Del primero al termino ' + n + ' se multiplica ' + (n - 1) + ' veces por r.'],
        ['a<sub>' + n + '</sub> = ' + a1 + ' &middot; (' + m(q) + ')<sup>' + (n - 1) + '</sup> = ' + a1 + ' &middot; ' + m(Math.pow(q, n - 1)) + ' = <b>' + m(an) + '</b>']);
    },

    /* la razon a partir de dos terminos */
    function (r) {
      var a1 = r.entero(1, 5), q = r.elige([2, 3, 4, 5]), k = r.elige([3, 4]);
      var ak = a1 * Math.pow(q, k - 1), cociente = ak / a1;
      return P.ejercicio('En una progresi&oacute;n geom&eacute;trica, el primer t&eacute;rmino es ' + a1 + ' y el t&eacute;rmino ' + k + ' es ' + P.num(ak, 0) +
        '. &iquest;Cu&aacute;l es la raz&oacute;n de la progresi&oacute;n?',
        P.opciones(r, q, [cociente, cociente / (k - 1), (ak - a1) / (k - 1), q + 1], { dec: 2 }),
        ['a<sub>' + k + '</sub> = a<sub>1</sub> &middot; r<sup>' + (k - 1) + '</sup>, asi que r<sup>' + (k - 1) + '</sup> = ' + P.num(ak, 0) + ' / ' + a1 + '.',
          'Luego saca raiz ' + (k === 3 ? 'cuadrada' : 'cubica') + '.'],
        ['r<sup>' + (k - 1) + '</sup> = ' + P.num(ak, 0) + ' / ' + a1 + ' = ' + cociente, 'r = <b>' + q + '</b> (porque ' + q + '<sup>' + (k - 1) + '</sup> = ' + cociente + ')']);
    },

    /* crecimiento: algo que se duplica o triplica */
    function (r) {
      var q = r.elige([2, 2, 3]), ini = r.elige([100, 200, 250, 300, 500]), t = r.entero(3, q === 2 ? 8 : 5);
      var v = ini * Math.pow(q, t);
      var cosa = r.elige(['Una colonia de bacterias', 'Un cultivo de levaduras', 'La cantidad de seguidores de una cuenta nueva']);
      var unidad = cosa.indexOf('bacterias') !== -1 ? 'bacterias' : cosa.indexOf('levaduras') !== -1 ? 'c&eacute;lulas' : 'seguidores';
      var cuantos = unidad === 'seguidores' ? 'cu&aacute;ntos' : 'cu&aacute;ntas';
      return P.ejercicio(cosa + ' se ' + (q === 2 ? 'duplica' : 'triplica') + ' cada hora. Si al inicio hay ' + ini + ' ' + unidad +
        ', &iquest;' + cuantos + ' habr&aacute; despu&eacute;s de ' + t + ' horas?',
        P.opciones(r, v, [ini * Math.pow(q, t - 1), ini * q * t, ini * Math.pow(q, t + 1), ini + Math.pow(q, t)], { fmt: function (x) { return P.num(x, 0); } }),
        ['Cada hora se multiplica por ' + q + ': despues de t horas es ' + ini + ' &middot; ' + q + '<sup>t</sup>.',
          'No es ' + ini + ' &times; ' + q + ' &times; ' + t + ': el crecimiento es multiplicativo, no se suma lo mismo cada hora.'],
        [ini + ' &middot; ' + q + '<sup>' + t + '</sup> = ' + ini + ' &middot; ' + Math.pow(q, t) + ' = <b>' + P.num(v, 0) + '</b>']);
    },

    /* una pelota que rebota */
    function (r) {
      var c = r.elige([[64, 1, 2], [81, 2, 3], [256, 3, 4], [128, 1, 2], [243, 2, 3]]), k = r.entero(2, 4);
      var h = c[0] * Math.pow(c[1] / c[2], k);
      return P.ejercicio('Una pelota se deja caer desde ' + c[0] + ' m de altura y en cada rebote sube ' + F.frac(c[1], c[2]) +
        ' de la altura anterior. &iquest;Qu&eacute; altura alcanza en el rebote n&uacute;mero ' + k + '?',
        P.opciones(r, h, [c[0] * Math.pow(c[1] / c[2], k - 1), c[0] * Math.pow(c[1] / c[2], k + 1), c[0] - k * c[0] * (1 - c[1] / c[2]), c[0] * c[1] / c[2] / k], { unidad: 'm', dec: 2 }),
        ['Cada rebote multiplica la altura anterior por ' + F.frac(c[1], c[2]) + '.',
          'Despues de ' + k + ' rebotes: ' + c[0] + ' &middot; (' + c[1] + '/' + c[2] + ')<sup>' + k + '</sup>.'],
        [c[0] + ' &middot; (' + c[1] + '/' + c[2] + ')<sup>' + k + '</sup> = <b>' + F.n(h, 2) + ' m</b>']);
    },

    /* suma de los primeros terminos */
    function (r) {
      var a1 = r.entero(1, 5), q = r.elige([2, 3]), n = r.entero(5, q === 2 ? 9 : 7);
      var S = a1 * (Math.pow(q, n) - 1) / (q - 1), an = a1 * Math.pow(q, n - 1);
      var terms = [0, 1, 2].map(function (k) { return a1 * Math.pow(q, k); }).join(', ');
      return P.ejercicio('Calcule la suma de los primeros ' + n + ' t&eacute;rminos de la progresi&oacute;n ' + terms + ', &hellip;' +
        P.considere('S<sub>n</sub> = a<sub>1</sub>(r<sup>n</sup> &minus; 1) / (r &minus; 1).'),
        P.opciones(r, S, [an, a1 * (Math.pow(q, n - 1) - 1) / (q - 1), a1 * Math.pow(q, n), a1 * (Math.pow(q, n + 1) - 1) / (q - 1)], { fmt: function (x) { return P.num(x, 0); } }),
        ['a<sub>1</sub> = ' + a1 + ' y la razon es r = ' + q + '.', 'Pide la SUMA, no solo el ultimo termino.'],
        ['S<sub>' + n + '</sub> = ' + a1 + '(' + q + '<sup>' + n + '</sup> &minus; 1) / ' + (q - 1) + ' = <b>' + P.num(S, 0) + '</b>']);
    }
  ];

  /* ---------------- 6. Proporcionalidad inversa ---------------- */
  casos.proporcionInversa = [
    /* la de la guia: alimento que alcanza para menos dias */
    function (r) {
      var a, d, k, nd;
      do { a = r.entero(8, 40); d = r.entero(6, 30); k = r.entero(2, 15); nd = a * d / (a + k); }
      while (nd !== Math.round(nd) || nd === d);
      var ctx = r.elige([
        'Un albergue tiene a su cuidado ' + a + ' gatos y cuenta con alimento para ' + d + ' d&iacute;as. Si el albergue adopta ' + k +
          ' gatos m&aacute;s, &iquest;para cu&aacute;ntos d&iacute;as habr&aacute; alimento suficiente?',
        'Un campamento de ' + a + ' scouts tiene v&iacute;veres para ' + d + ' d&iacute;as. Si llegan ' + k +
          ' scouts m&aacute;s, &iquest;para cu&aacute;ntos d&iacute;as alcanzar&aacute;n los v&iacute;veres?'
      ]);
      return P.ejercicio(ctx,
        P.opciones(r, nd, [d * (a + k) / a, d - k, d, Math.round(d * a / k)].map(function (x) { return Math.round(x * 10) / 10; }), { dec: 1 }),
        ['A MAS animales, MENOS dias: es proporcionalidad inversa.', 'La comida total en "raciones-dia" no cambia: ' + a + ' &times; ' + d + ' = ' + (a * d) + '.'],
        ['Total de raciones: ' + a + ' &times; ' + d + ' = ' + (a * d), 'Ahora son ' + (a + k) + ': ' + (a * d) + ' &divide; ' + (a + k) + ' = <b>' + nd + ' d&iacute;as</b>']);
    },

    /* trabajadores y dias */
    function (r) {
      var a, d, b, x;
      do { a = r.entero(3, 15); d = r.entero(6, 40); b = r.entero(2, 24); x = a * d / b; }
      while (b === a || x !== Math.round(x));
      var ctx = r.elige([['obreros', 'construyen una barda'], ['pintores', 'pintan una escuela'], ['jardineros', 'arreglan un parque']]);
      return P.ejercicio(a + ' ' + ctx[0] + ' ' + ctx[1] + ' en ' + d + ' d&iacute;as. &iquest;Cu&aacute;ntos d&iacute;as tardar&iacute;an ' + b + ' ' + ctx[0] +
        ' trabajando al mismo ritmo?',
        P.opciones(r, x, [d * b / a, d + (a - b), d - (b - a) * 2, d * a / (b + a)].map(function (v) { return Math.round(v * 10) / 10; }), { dec: 1, unidad: 'd&iacute;as' }),
        ['Mas trabajadores terminan en MENOS dias: es inversa.', 'El trabajo total (trabajador-dias) se conserva: ' + a + ' &times; ' + d + ' = ' + (a * d) + '.'],
        [a + ' &times; ' + d + ' = ' + (a * d) + ' trabajador-dias', (a * d) + ' &divide; ' + b + ' = <b>' + x + ' d&iacute;as</b>']);
    },

    /* velocidad y tiempo */
    function (r) {
      var v1, t1, v2, t2;
      do { v1 = r.elige([40, 50, 60, 75, 80, 90, 100]); t1 = r.entero(2, 9); v2 = r.elige([40, 50, 60, 75, 80, 90, 100, 120]); t2 = v1 * t1 / v2; }
      while (v1 === v2 || t2 * 2 !== Math.round(t2 * 2));
      var horas = function (h) { return F.n(h, 2) + (h === 1 ? ' hora' : ' horas'); };
      return P.ejercicio('Un autob&uacute;s tarda ' + horas(t1) + ' en ir de una ciudad a otra a una velocidad constante de ' + v1 +
        ' km/h. &iquest;Cu&aacute;nto tardar&iacute;a en el mismo recorrido a ' + v2 + ' km/h?',
        P.opciones(r, t2, [t1 * v2 / v1, t1 * (1 - (v2 - v1) / v1), t1 + (v1 - v2) / 10].map(function (v) { return Math.round(v * 100) / 100; }), { fmt: horas }),
        ['La distancia no cambia: d = v &times; t = ' + v1 + ' &times; ' + t1 + ' = ' + (v1 * t1) + ' km.', 'Si va mas rapido tarda menos (inversa): t = d / v.'],
        ['d = ' + (v1 * t1) + ' km', 't = ' + (v1 * t1) + ' / ' + v2 + ' = <b>' + horas(t2) + '</b>']);
    },

    /* reconocer la proporcionalidad inversa */
    function (r) {
      var inversas = ['El n&uacute;mero de llaves abiertas y el tiempo en que se llena un tinaco',
        'La velocidad de un auto y el tiempo que tarda en recorrer una distancia fija',
        'El n&uacute;mero de personas que se reparten una pizza y el tama&ntilde;o de la porci&oacute;n de cada una',
        'El n&uacute;mero de trabajadores y los d&iacute;as que tardan en terminar una obra'];
      var directas = ['Los kilos de tortilla que se compran y lo que se paga por ellos',
        'El lado de un cuadrado y su per&iacute;metro',
        'Las horas trabajadas y el sueldo de quien cobra por hora',
        'Los litros de gasolina y los kil&oacute;metros que puede recorrer un auto',
        'El n&uacute;mero de boletos comprados y el costo total'];
      var ninguna = ['La edad de una persona y su estatura', 'El n&uacute;mero de calzado de una persona y su calificaci&oacute;n en matem&aacute;ticas'];
      var pideInversa = r.bool(0.6);
      var bien = r.elige(pideInversa ? inversas : directas);
      var malas = r.muestra(pideInversa ? directas : inversas, 3).concat(r.muestra(ninguna, 1));
      return P.ejercicio('&iquest;Cu&aacute;l de las siguientes situaciones representa una proporcionalidad ' + (pideInversa ? 'inversa' : 'directa') + '?',
        P.opciones(r, bien, malas),
        ['Directa: si una cantidad se duplica, la otra tambien se duplica (y = kx).',
          'Inversa: si una se duplica, la otra se reduce a la mitad (x &middot; y = k).'],
        ['Es <b>' + bien + '</b>']);
    },

    /* completar una tabla de proporcionalidad inversa */
    function (r) {
      var k = r.elige([60, 72, 90, 120, 144, 180, 240]);
      var divs = []; for (var d = 2; d <= 30; d++) if (k % d === 0) divs.push(d);
      var xs = r.muestra(divs, 4).sort(function (a, b) { return a - b; });
      var oculto = r.entero(1, 3), y = k / xs[oculto];
      var filaX = xs.map(String), filaY = xs.map(function (x, i) { return i === oculto ? '?' : String(k / x); });
      var tabla = '<table class="tabla"><tr><th>x</th>' + filaX.map(function (t) { return '<td>' + t + '</td>'; }).join('') + '</tr>' +
        '<tr><th>y</th>' + filaY.map(function (t) { return '<td>' + t + '</td>'; }).join('') + '</tr></table>';
      var y0 = k / xs[0];
      return P.ejercicio('La siguiente tabla representa una relaci&oacute;n de proporcionalidad inversa entre x y y. &iquest;Qu&eacute; valor falta?' + tabla,
        P.opciones(r, y, [y0 * xs[oculto] / xs[0], k / (xs[oculto] + 1), y0 - (xs[oculto] - xs[0]), k * xs[oculto] / 100].map(function (v) { return Math.round(v * 100) / 100; }), { dec: 2 }),
        ['En la proporcionalidad inversa el PRODUCTO x &middot; y siempre es el mismo.', 'Calcula ese producto con una columna completa.'],
        ['k = ' + xs[0] + ' &times; ' + y0 + ' = ' + k, 'y = ' + k + ' &divide; ' + xs[oculto] + ' = <b>' + F.n(y) + '</b>']);
    }
  ];

  /* ---------------- 7. Variacion lineal y proporcional ---------------- */
  var COBROS = [
    { q: 'Un taxi cobra $%f de banderazo m&aacute;s $%v por cada kil&oacute;metro recorrido.', x: 'kil&oacute;metros', f: [9, 13, 15, 20], v: [6, 8, 9, 10] },
    { q: 'Un plomero cobra $%f por la visita m&aacute;s $%v por cada hora de trabajo.', x: 'horas', f: [150, 200, 250, 300], v: [120, 150, 180] },
    { q: 'Un gimnasio cobra $%f de inscripci&oacute;n m&aacute;s $%v por cada mes.', x: 'meses', f: [200, 300, 350, 500], v: [250, 300, 400] },
    { q: 'El servicio de agua cobra una cuota fija de $%f m&aacute;s $%v por cada metro c&uacute;bico consumido.', x: 'metros c&uacute;bicos', f: [45, 60, 80], v: [7, 9, 12] }
  ];
  function cobro(r) {
    var c = r.elige(COBROS), f = r.elige(c.f), v = r.elige(c.v);
    return { txt: c.q.replace('%f', f).replace('%v', v), x: c.x, f: f, v: v };
  }

  casos.variacion = [
    /* la de la guia: completar lineal / proporcional */
    function (r) {
      var ctx = r.elige([
        { a: 'a un campesino le pagan $' + r.elige([150, 200, 250]) + ' por d&iacute;a m&aacute;s $' + r.elige([30, 40, 50]) + ' por cada caja de producto recolectado',
          b: 'Otro campesino recibe dinero s&oacute;lo por las cajas recolectadas', x: 'las cajas recolectadas', y: 'el dinero que recibe' },
        { a: 'un taxi cobra $' + r.elige([9, 13, 15]) + ' de banderazo m&aacute;s $' + r.elige([6, 8, 9]) + ' por cada kil&oacute;metro',
          b: 'Una aplicaci&oacute;n de bicicletas cobra s&oacute;lo por kil&oacute;metro recorrido', x: 'los kil&oacute;metros', y: 'el costo del viaje' },
        { a: 'un plomero cobra $' + r.elige([200, 250, 300]) + ' por la visita m&aacute;s $' + r.elige([120, 150]) + ' por hora de trabajo',
          b: 'Otro plomero cobra s&oacute;lo por hora trabajada', x: 'las horas trabajadas', y: 'el pago' }
      ]);
      var alReves = r.bool();
      var t1 = alReves ? ctx.b : 'Si ' + ctx.a;
      var t2 = alReves ? 'Si ' + ctx.a : ctx.b;
      var bien = alReves ? ['proporcional', 'lineal'] : ['lineal', 'proporcional'];
      var todas = [['lineal', 'lineal'], ['lineal', 'proporcional'], ['proporcional', 'lineal'], ['proporcional', 'proporcional']];
      var texto = t1 + ', se habla de una variaci&oacute;n ___ entre ' + ctx.x + ' y ' + ctx.y + '. ' + t2 +
        ', entonces se habla de una variaci&oacute;n ___ entre ' + ctx.x + ' y ' + ctx.y + '.';
      texto = texto.charAt(0).toUpperCase() + texto.slice(1);
      return P.complete(r, texto, bien, todas.filter(function (c) { return c.join() !== bien.join(); }),
        ['Proporcional: y = kx (si x vale 0, y vale 0 y al doble de x le toca el doble de y).',
          'Lineal: y = mx + b con una parte fija b; ya no es el doble al doble.'],
        ['Con cobro fijo + cobro por unidad: y = mx + b &rarr; lineal', 'Solo cobro por unidad: y = kx &rarr; proporcional']);
    },

    /* que tipo de variacion muestra una tabla */
    function (r) {
      var tipo = r.entero(0, 3), xs = r.elige([[1, 2, 3, 4], [2, 4, 6, 8], [1, 3, 5, 7], [2, 3, 4, 6]]), ys;
      var k = r.entero(2, 9), b = r.enteroNoCero(-8, 15);
      if (tipo === 0) ys = xs.map(function (x) { return k * x; });
      else if (tipo === 1) ys = xs.map(function (x) { return k * x + b; });
      else if (tipo === 2) { var K = r.elige([24, 36, 48, 72, 120]); xs = [2, 3, 4, 6]; ys = xs.map(function (x) { return K / x; }); }
      else ys = xs.map(function (x) { return k * x * x; });
      var NOM = ['Proporcional directa', 'Lineal, pero no proporcional', 'Proporcional inversa', 'Cuadr&aacute;tica'];
      var tabla = '<table class="tabla"><tr><th>x</th>' + xs.map(function (x) { return '<td>' + x + '</td>'; }).join('') + '</tr>' +
        '<tr><th>y</th>' + ys.map(function (y) { return '<td>' + m(y) + '</td>'; }).join('') + '</tr></table>';
      var exp = [
        'Cada y / x da lo mismo (' + k + '): y = ' + k + 'x, pasa por el origen.',
        'Por cada unidad que aumenta x, y aumenta ' + k + ', pero y / x no es constante: y = ' + pol([k, b]) + '.',
        'El producto x &middot; y siempre da ' + (xs[0] * ys[0]) + ': y = ' + (xs[0] * ys[0]) + '/x.',
        'Las diferencias de y no son iguales y y / x crece: y = ' + k + 'x' + F.sup(2) + '.'
      ];
      return P.ejercicio('&iquest;Qu&eacute; tipo de variaci&oacute;n representa la siguiente tabla?' + tabla,
        P.opciones(r, NOM[tipo], NOM.filter(function (_, i) { return i !== tipo; })),
        ['Calcula y / x en cada columna: si siempre da lo mismo, es proporcional directa.',
          'Si lo que se mantiene es x &middot; y, es inversa; si y sube parejo pero y / x cambia, es lineal.'],
        [exp[tipo], 'Es <b>' + NOM[tipo].toLowerCase() + '</b>']);
    },

    /* la expresion de un cobro fijo mas uno por unidad */
    function (r) {
      var c = cobro(r);
      var bien = 'y = ' + c.v + 'x + ' + c.f;
      var malas = ['y = ' + c.f + 'x + ' + c.v, 'y = ' + (c.f + c.v) + 'x', 'y = ' + c.v + 'x', 'y = ' + c.v + '(x + ' + c.f + ')'];
      return P.ejercicio(c.txt + ' &iquest;Qu&eacute; expresi&oacute;n representa lo que se paga (y) por x ' + c.x + '?',
        P.opciones(r, bien, malas),
        ['Lo que se cobra por cada unidad multiplica a x; lo que se cobra una sola vez va sumado aparte.',
          'Comprueba con x = 1: debe dar ' + c.f + ' + ' + c.v + ' = ' + (c.f + c.v) + '.'],
        ['Parte variable: ' + c.v + 'x; parte fija: ' + c.f, 'Expresion: <b>' + bien + '</b>']);
    },

    /* cuanto se paga con el modelo lineal */
    function (r) {
      var c = cobro(r), x = r.entero(3, 15), y = c.v * x + c.f;
      return P.ejercicio(c.txt + ' &iquest;Cu&aacute;nto se paga por ' + x + ' ' + c.x + '?',
        P.opciones(r, y, [c.f * x + c.v, c.v * x, (c.f + c.v) * x, c.v * (x + 1)], { antes: '$', fmt: function (v) { return P.pesos(v).slice(1); } }),
        ['Modelo: y = ' + c.v + 'x + ' + c.f + '.', 'Sustituye x = ' + x + ' y suma la parte fija UNA sola vez.'],
        ['y = ' + c.v + '(' + x + ') + ' + c.f + ' = ' + (c.v * x) + ' + ' + c.f + ' = <b>' + P.pesos(y) + '</b>']);
    },

    /* proporcionalidad directa con regla de tres */
    function (r) {
      var precio = r.entero(12, 45), a = r.entero(2, 6), b = r.entero(3, 12);
      while (b === a) b = r.entero(3, 12);
      var cosa = r.elige([['kg de naranja', 'kg'], ['metros de tela', 'metros'], ['litros de pintura', 'litros']]);
      var pa = precio * a, pb = precio * b;
      return P.ejercicio('En una tienda, ' + a + ' ' + cosa[0] + ' cuestan $' + pa + '. Si el precio es proporcional a la cantidad, &iquest;cu&aacute;nto cuestan ' + b + ' ' + cosa[1] + '?',
        P.opciones(r, pb, [pa + (b - a), pa * a / b, pa + b, precio + b], { antes: '$', fmt: function (v) { return P.pesos(v).slice(1); } }),
        ['Proporcional: primero saca cuanto cuesta 1 (la constante k = y / x).', 'Luego multiplica por la nueva cantidad.'],
        ['k = ' + pa + ' / ' + a + ' = ' + precio, b + ' &times; ' + precio + ' = <b>' + P.pesos(pb) + '</b>']);
    },

    /* reconocer la grafica */
    function (r) {
      var k = r.entero(1, 3) / 2, b = r.entero(1, 3);
      var graf = {
        directa: P.miniGrafica(function (x) { return k * x; }, { x: [-1, 6], y: [-1, 6] }),
        lineal: P.miniGrafica(function (x) { return k * x + b; }, { x: [-1, 6], y: [-1, 6] }),
        baja: P.miniGrafica(function (x) { return 5 - k * x; }, { x: [-1, 6], y: [-1, 6] }),
        inversa: P.miniGrafica(function (x) { return x > 0.05 ? 4 / x : NaN; }, { x: [-1, 6], y: [-1, 6] })
      };
      var pide = r.elige([['directa', 'una variaci&oacute;n proporcional directa'], ['lineal', 'una variaci&oacute;n lineal que no es proporcional'],
        ['inversa', 'una proporcionalidad inversa']]);
      return P.ejercicio('&iquest;Cu&aacute;l de las siguientes gr&aacute;ficas representa ' + pide[1] + '?',
        P.opciones(r, graf[pide[0]], Object.keys(graf).filter(function (g) { return g !== pide[0]; }).map(function (g) { return graf[g]; })),
        ['Proporcional directa: una recta que PASA POR EL ORIGEN (0, 0).',
          'Lineal no proporcional: recta que corta el eje y arriba o abajo del origen. Inversa: una curva que baja y nunca toca los ejes.'],
        ['La grafica correcta es la de ' + pide[1] + '.']);
    }
  ];

  /* ---------------- 8. Factorizacion ---------------- */
  /* (px + q)(sx + t) bien escrito */
  function binom(p, q, v) { return '(' + (p === 1 ? '' : p) + (v || 'x') + (q < 0 ? ' &minus; ' + (-q) : ' + ' + q) + ')'; }

  casos.factorizacion = [
    /* la de la guia: completar los pasos con una raiz */
    function (r) {
      var p, q, s;
      do { p = r.enteroNoCero(-4, 4); q = r.enteroNoCero(-6, 6); s = r.enteroNoCero(-6, 6); }
      while (p === q || p === s || q === s || q === -s);
      var c2 = -(p + q + s), c1 = p * q + p * s + q * s, c0 = -p * q * s;
      var cuad = P.poli([1, -(q + s), q * s]);
      var bien = [fx(p), cuad, fx(q), fx(s)];
      var malas = [[fx(-p), cuad, fx(q), fx(s)], [fx(p), cuad, fx(-q), fx(-s)],
        [fx(p), P.poli([1, q + s, q * s]), fx(-q), fx(-s)], [fx(-p), P.poli([1, q + s, q * s]), fx(-q), fx(-s)]];
      var texto = 'Al evaluar el polinomio P(x) = ' + P.poli([1, c2, c1, c0]) + ' en x = ' + p + ' se obtiene 0, por lo que ___ es un factor. ' +
        'Al dividir P(x) entre ese factor se obtiene ___. Este &uacute;ltimo se factoriza con ___ y ___ como factores.';
      return P.complete(r, texto, bien, malas,
        ['Si P(' + p + ') = 0, el factor es (x &minus; ' + P.np(p) + '): el signo dentro del parentesis es el contrario.',
          'Para la cuadratica busca dos numeros que multiplicados den ' + (q * s) + ' y sumados den ' + (-(q + s)) + '.'],
        ['P(' + p + ') = 0 &rarr; factor ' + fx(p), 'P(x) &divide; ' + fx(p) + ' = ' + cuad, cuad + ' = ' + fx(q) + fx(s)]);
    },

    /* trinomio x^2 + bx + c */
    function (r) {
      var p, q;
      do { p = r.enteroNoCero(-9, 9); q = r.enteroNoCero(-9, 9); } while (p === q || p === -q);
      var tri = pol([1, -(p + q), p * q]);
      return P.ejercicio('&iquest;Cu&aacute;l es la factorizaci&oacute;n del trinomio <span class="expr">' + tri + '</span>?',
        P.opciones(r, fx(p) + fx(q), [fx(-p) + fx(-q), fx(p) + fx(-q), fx(-p) + fx(q)]),
        ['Busca dos numeros que MULTIPLICADOS den ' + m(p * q) + ' y SUMADOS den ' + m(-(p + q)) + '.',
          'Comprueba multiplicando los binomios del inciso.'],
        ['Los numeros son ' + m(-p) + ' y ' + m(-q) + ': (' + m(-p) + ')(' + m(-q) + ') = ' + m(p * q) + ' y ' + m(-p) + ' + ' + P.np(-q) + ' = ' + m(-(p + q)),
          tri + ' = <b>' + fx(p) + fx(q) + '</b>']);
    },

    /* diferencia de cuadrados */
    function (r) {
      var a = r.entero(2, 7), b = r.entero(1, 9);
      while (F.mcd(a, b) !== 1) b = r.entero(1, 9);
      var expr = (a * a) + 'x' + F.sup(2) + ' &minus; ' + (b * b);
      var bien = binom(a, -b) + binom(a, b);
      return P.ejercicio('Factorice la expresi&oacute;n <span class="expr">' + expr + '</span>.',
        P.opciones(r, bien, [binom(a, -b) + F.sup(2), binom(a, b) + F.sup(2), binom(a * a, -b) + binom(1, b), binom(a, -(b * b)) + binom(a, b * b)]),
        ['Es una diferencia de cuadrados: A' + F.sup(2) + ' &minus; B' + F.sup(2) + ' = (A &minus; B)(A + B).',
          'A es la raiz de ' + (a * a) + 'x' + F.sup(2) + ' y B la raiz de ' + (b * b) + '.'],
        ['A = ' + a + 'x, B = ' + b, expr + ' = <b>' + bien + '</b>']);
    },

    /* factor comun */
    function (r) {
      var g = r.entero(2, 6), a = r.entero(1, 5), b = r.enteroNoCero(-6, 6), c = r.enteroNoCero(-6, 6);
      while (F.mcd(F.mcd(a, b), c) !== 1) c = r.enteroNoCero(-6, 6);
      var expr = pol([g * a, g * b, g * c, 0]);
      var bien = g + 'x(' + pol([a, b, c]) + ')';
      var malas = [g + 'x(' + pol([a, b, 0]) + ')', g + 'x(' + pol([a, -b, c]) + ')', g + 'x' + F.sup(2) + '(' + pol([a, b, c]) + ')',
        g + 'x(' + pol([a, g * b, c]) + ')', (2 * g) + 'x(' + pol([a, b, c]) + ')'];
      return P.ejercicio('Factorice completamente por factor com&uacute;n: <span class="expr">' + expr + '</span>.',
        P.opciones(r, bien, malas),
        ['El factor comun es el maximo comun divisor de los coeficientes y la x con el menor exponente.',
          'Divide CADA termino entre el factor comun; ningun termino se pierde.'],
        ['Factor comun: ' + g + 'x', expr + ' = <b>' + bien + '</b>']);
    },

    /* trinomio ax^2 + bx + c con a distinto de 1 */
    function (r) {
      var p, q, s, t;
      do {
        p = r.entero(2, 3); s = r.entero(1, 3); q = r.enteroNoCero(-7, 7); t = r.enteroNoCero(-7, 7);
      } while (F.mcd(p, Math.abs(q)) !== 1 || F.mcd(s, Math.abs(t)) !== 1 || p * t === s * q || p * t === -s * q);
      var A = p * s, B = p * t + q * s, C = q * t;
      function mismo(pp, qq, ss, tt) { return pp * ss === A && pp * tt + qq * ss === B && qq * tt === C; }
      var cand = [[p, t, s, q], [p, -q, s, -t], [p, q, s, -t], [p, -q, s, t], [s, q, p, t]];
      var malas = cand.filter(function (c) { return !mismo(c[0], c[1], c[2], c[3]); }).map(function (c) { return binom(c[0], c[1]) + binom(c[2], c[3]); });
      var tri = pol([A, B, C]);
      return P.ejercicio('&iquest;Cu&aacute;l es la factorizaci&oacute;n de <span class="expr">' + tri + '</span>?',
        P.opciones(r, binom(p, q) + binom(s, t), malas),
        ['Multiplica cada inciso: el primer termino debe dar ' + A + 'x' + F.sup(2) + ', el ultimo ' + m(C) + ' y el de en medio ' + m(B) + 'x.',
          'El termino de en medio sale de sumar los productos cruzados.'],
        [binom(p, q) + binom(s, t) + ' = ' + A + 'x' + F.sup(2) + ' + ' + P.np(p * t) + 'x + ' + P.np(q * s) + 'x + ' + P.np(C) + ' = ' + tri,
          'Factorizacion: <b>' + binom(p, q) + binom(s, t) + '</b>']);
    },

    /* trinomio cuadrado perfecto */
    function (r) {
      var k = r.enteroNoCero(-9, 9), tri = pol([1, 2 * k, k * k]);
      var bien = binom(1, k) + F.sup(2);
      return P.ejercicio('Factorice el trinomio cuadrado perfecto <span class="expr">' + tri + '</span>.',
        P.opciones(r, bien, [binom(1, -k) + F.sup(2), binom(1, k) + binom(1, -k), binom(1, 2 * k) + F.sup(2), binom(1, k * k) + F.sup(2)]),
        ['x' + F.sup(2) + ' + 2kx + k' + F.sup(2) + ' = (x + k)' + F.sup(2) + '.', 'El signo del binomio es el del termino de en medio.'],
        ['k = ' + m(k) + ' porque 2(' + m(k) + ') = ' + m(2 * k) + ' y (' + m(k) + ')' + F.sup(2) + ' = ' + (k * k), tri + ' = <b>' + bien + '</b>']);
    },

    /* las raices de una ecuacion cuadratica */
    function (r) {
      var p, q;
      do { p = r.enteroNoCero(-9, 9); q = r.enteroNoCero(-9, 9); } while (p === q || p === -q);
      var ec = pol([1, -(p + q), p * q]) + ' = 0';
      function sol(a, b) { var l = [a, b].sort(function (u, v) { return u - v; }); return 'x = ' + m(l[0]) + ' y x = ' + m(l[1]); }
      var pq = p * q, otros = [];
      for (var d = 1; d <= Math.abs(pq); d++) if (pq % d === 0 && d !== Math.abs(p) && d !== Math.abs(q)) otros.push([d, pq / d]);
      var malas = [sol(-p, -q), sol(p, -q), sol(-p, q)];
      if (otros.length) { var o = r.elige(otros); malas.push(sol(o[0], o[1])); }
      return P.ejercicio('&iquest;Cu&aacute;les son las soluciones de la ecuaci&oacute;n <span class="expr">' + ec + '</span>?',
        P.opciones(r, sol(p, q), malas),
        ['Factoriza: busca dos numeros que multiplicados den ' + m(p * q) + ' y sumados ' + m(-(p + q)) + '.',
          'Si (x &minus; a)(x &minus; b) = 0, entonces x = a o x = b: los signos se invierten al despejar.'],
        [pol([1, -(p + q), p * q]) + ' = ' + fx(p) + fx(q), 'Soluciones: <b>' + sol(p, q) + '</b>']);
    }
  ];

  /* ================= temas de la guia de estudio =================
     Formas extra para cubrir todo el temario (1.1 Concepto y uso de los
     numeros, 1.2 Algebra basica y 1.6 Procedimientos algebraicos), no solo
     lo que trae la version de practica. */

  /* 1.1 conjuntos numericos */
  function conjuntosNumericos(r) {
    var nums = [
      ['7', 'Naturales'], ['15', 'Naturales'], ['0', 'Naturales'], ['&minus;4', 'Enteros'], ['&minus;12', 'Enteros'],
      [F.frac(3, 4), 'Racionales'], ['&minus;' + F.frac(2, 5), 'Racionales'], ['0.25', 'Racionales'], ['0.333&hellip; (peri&oacute;dico)', 'Racionales'],
      ['&radic;2', 'Irracionales'], ['&pi;', 'Irracionales'], ['&radic;5', 'Irracionales'], ['e (n&uacute;mero de Euler)', 'Irracionales']];
    if (r.bool()) {
      var x = r.elige(nums);
      var CON = ['Naturales', 'Enteros', 'Racionales', 'Irracionales'];
      return P.ejercicio('&iquest;Cu&aacute;l es el conjunto num&eacute;rico m&aacute;s peque&ntilde;o al que pertenece el n&uacute;mero <span class="expr">' + x[0] + '</span>?',
        P.opciones(r, x[1], CON.filter(function (c) { return c !== x[1]; })),
        ['Naturales: 0, 1, 2, 3... Enteros: tambien los negativos. Racionales: los que se escriben como p/q (incluye decimales finitos y periodicos).',
          'Irracionales: decimales infinitos que no se repiten, como &pi; o &radic;2.'],
        [x[0] + ' pertenece a los <b>' + x[1].toLowerCase() + '</b>']);
    }
    var irr = r.elige(nums.filter(function (n) { return n[1] === 'Irracionales'; }));
    var otros = r.muestra(nums.filter(function (n) { return n[1] !== 'Irracionales'; }).concat([['&radic;9', 'Naturales'], ['&radic;16', 'Naturales']]), 3);
    return P.ejercicio('&iquest;Cu&aacute;l de los siguientes n&uacute;meros es irracional?',
      P.opciones(r, irr[0], otros.map(function (n) { return n[0]; })),
      ['Un irracional no se puede escribir como fraccion: su parte decimal es infinita y no se repite.', 'Cuidado: &radic;9 = 3 y &radic;16 = 4 son enteros.'],
      ['<b>' + irr[0] + '</b> es irracional']);
  }

  /* 1.1 propiedades de los numeros reales */
  function propiedadesReales(r) {
    var a = r.entero(2, 9), b = r.entero(2, 9), c = r.entero(2, 9);
    var props = [
      [a + ' + (' + b + ' + ' + c + ') = (' + a + ' + ' + b + ') + ' + c, 'Asociativa de la adici&oacute;n'],
      [a + ' + ' + b + ' = ' + b + ' + ' + a, 'Conmutativa de la adici&oacute;n'],
      [a + ' &middot; (' + b + ' &middot; ' + c + ') = (' + a + ' &middot; ' + b + ') &middot; ' + c, 'Asociativa de la multiplicaci&oacute;n'],
      [a + ' &middot; ' + b + ' = ' + b + ' &middot; ' + a, 'Conmutativa de la multiplicaci&oacute;n'],
      [a + ' &middot; (' + b + ' + ' + c + ') = ' + a + ' &middot; ' + b + ' + ' + a + ' &middot; ' + c, 'Distributiva'],
      [a + ' + 0 = ' + a, 'Elemento neutro de la adici&oacute;n'],
      [a + ' &middot; 1 = ' + a, 'Elemento neutro de la multiplicaci&oacute;n'],
      [a + ' + (&minus;' + a + ') = 0', 'Inverso aditivo'],
      [a + ' &middot; ' + F.frac(1, a) + ' = 1', 'Inverso multiplicativo']];
    var p = r.elige(props);
    return P.ejercicio('&iquest;Qu&eacute; propiedad de los n&uacute;meros reales se aplica en la siguiente igualdad?<br><span class="expr">' + p[0] + '</span>',
      P.opciones(r, p[1], r.muestra(props.filter(function (x) { return x !== p; }), 5).map(function (x) { return x[1]; })),
      ['Conmutativa: cambia el ORDEN. Asociativa: cambia la forma de AGRUPAR (los parentesis).',
        'Distributiva: un numero multiplica a una suma. Neutro: no cambia nada (0 al sumar, 1 al multiplicar). Inverso: da el neutro.'],
      ['Es la propiedad <b>' + p[1].toLowerCase() + '</b>']);
  }

  /* 1.1 leyes de los exponentes */
  function leyesExponentes(r) {
    var tipo = r.entero(0, 4), a = r.entero(2, 9), b = r.entero(2, 9), c = r.entero(2, 5), k = r.entero(2, 5), enun, bien, malas, sol;
    function x(n) { return n === 0 ? '1' : n === 1 ? 'x' : 'x<sup>' + m(n) + '</sup>'; }
    if (tipo === 0) {
      enun = 'x<sup>' + a + '</sup> &middot; x<sup>' + b + '</sup>'; bien = x(a + b); malas = [x(a * b), x(a + b + 1), '2' + x(a + b), x(Math.abs(a - b) || 1)];
      sol = 'Misma base que se multiplica: se SUMAN los exponentes, ' + a + ' + ' + b + ' = ' + (a + b);
    } else if (tipo === 1) {
      var s = a + b;
      enun = F.frac('x<sup>' + s + '</sup>', 'x<sup>' + b + '</sup>'); bien = x(a); malas = [x(s * b), x(s + b), x(F.redondea(s / b, 2)), x(b), x(-a), x(a + 1), '1'];
      sol = 'Misma base que se divide: se RESTAN los exponentes, ' + s + ' &minus; ' + b + ' = ' + a;
    } else if (tipo === 2) {
      enun = '(' + k + 'x<sup>' + a + '</sup>)<sup>' + c + '</sup>'; bien = Math.pow(k, c) + x(a * c);
      malas = [k * c + x(a * c), k + x(a * c), Math.pow(k, c) + x(a + c), k * c + x(a + c), Math.pow(k, c) + x(a), (Math.pow(k, c) + k) + x(a * c)];
      sol = 'Potencia de un producto: (' + k + ')<sup>' + c + '</sup> = ' + Math.pow(k, c) + ' y (x<sup>' + a + '</sup>)<sup>' + c + '</sup> = x<sup>' + (a * c) + '</sup>';
    } else if (tipo === 3) {
      enun = 'x<sup>&minus;' + a + '</sup>'; bien = F.frac(1, x(a)); malas = ['&minus;' + x(a), F.frac(1, x(-a)), '&minus;' + F.frac(1, x(a)), x(F.redondea(1 / a, 2))];
      sol = 'Exponente negativo: x<sup>&minus;n</sup> = 1 / x<sup>n</sup>';
    } else {
      enun = '&radic;(x<sup>' + a + '</sup>)'; var fe = F.simplifica(a, 2);
      bien = 'x<sup>' + (fe[1] === 1 ? fe[0] : fe[0] + '/' + fe[1]) + '</sup>'; malas = [x(2 * a), 'x<sup>2/' + a + '</sup>', x(a - 2), F.frac(x(a), 2)];
      sol = 'Raiz cuadrada = exponente 1/2: x<sup>' + a + '/2</sup>';
    }
    return P.ejercicio('Aplicando las leyes de los exponentes, &iquest;a qu&eacute; es igual <span class="expr">' + enun + '</span>?',
      P.opciones(r, bien, malas.filter(function (t) { return t && t !== bien; })),
      ['x<sup>a</sup> &middot; x<sup>b</sup> = x<sup>a+b</sup>, x<sup>a</sup>/x<sup>b</sup> = x<sup>a&minus;b</sup>, (x<sup>a</sup>)<sup>b</sup> = x<sup>ab</sup>.', 'x<sup>&minus;b</sup> = 1/x<sup>b</sup> y la raiz b-esima de x<sup>a</sup> es x<sup>a/b</sup>.'],
      [sol, 'Resultado: <b>' + bien + '</b>']);
  }

  /* 1.1 notacion cientifica */
  function notacionCientifica(r) {
    function cientifico(mant, exp) { return F.n(mant) + ' &times; 10<sup>' + m(exp) + '</sup>'; }
    if (r.bool()) {
      var dig = r.entero(11, 99), e = r.elige([-6, -5, -4, -3, 3, 4, 5, 6, 7]);
      var mant = dig / 10, valor = mant * Math.pow(10, e);
      var txt = e < 0 ? '0.' + '0'.repeat(-e - 1) + String(dig) : P.num(valor, 0).replace(/ /g, ',');
      return P.ejercicio('&iquest;C&oacute;mo se escribe en notaci&oacute;n cient&iacute;fica el n&uacute;mero ' + txt + '?',
        P.opciones(r, cientifico(mant, e), [cientifico(mant, -e), cientifico(dig, e - 1 === 0 ? 2 : e - 1), cientifico(mant, e + (e < 0 ? -1 : 1)), cientifico(mant / 10, e + 1)]),
        ['En notacion cientifica queda un solo digito (distinto de 0) antes del punto: ' + F.n(mant) + '.', 'El exponente cuenta cuantos lugares se movio el punto: negativo si el numero es menor que 1.'],
        [txt + ' = <b>' + cientifico(mant, e) + '</b>']);
    }
    var a = r.entero(2, 9), b = r.entero(1, 4), e1 = r.entero(-5, 8), e2 = r.entero(-6, 6);
    var prod = a * b, exp = e1 + e2, mant = prod, ex = exp;
    if (prod >= 10) { mant = prod / 10; ex = exp + 1; }
    return P.ejercicio('&iquest;Cu&aacute;l es el resultado de <span class="expr">(' + cientifico(a, e1) + ')(' + cientifico(b, e2) + ')</span> en notaci&oacute;n cient&iacute;fica?',
      P.opciones(r, cientifico(mant, ex), [cientifico(mant, e1 * e2 === ex ? ex + 2 : e1 * e2), cientifico(a + b, exp), cientifico(prod >= 10 ? prod : mant, prod >= 10 ? exp : ex - 1),
        cientifico(mant, ex + 1), cientifico(mant, ex - 2), cientifico(a + b, e1 * e2)]),
      ['Multiplica las partes decimales y SUMA los exponentes de 10.', 'Si la parte decimal queda de 10 o mas, recorre el punto y suma 1 al exponente.'],
      [a + ' &times; ' + b + ' = ' + prod + ' y 10<sup>' + m(e1) + '</sup> &times; 10<sup>' + m(e2) + '</sup> = 10<sup>' + m(exp) + '</sup>', 'Resultado: <b>' + cientifico(mant, ex) + '</b>']);
  }

  /* 1.2 suma y resta de polinomios */
  function sumaPolinomios(r) {
    var A = [r.enteroNoCero(-6, 6), r.enteroNoCero(-9, 9), r.entero(-9, 9)], B = [r.enteroNoCero(-6, 6), r.enteroNoCero(-9, 9), r.entero(-9, 9)];
    var resta = r.bool();
    var res = A.map(function (v, i) { return resta ? v - B[i] : v + B[i]; });
    if (res[0] === 0) { A[0] += 1; res[0] = resta ? A[0] - B[0] : A[0] + B[0]; if (res[0] === 0) { A[0] += 1; res[0] += 1; } }
    var mal1 = A.map(function (v, i) { return resta ? v + B[i] : v - B[i]; });
    var mal2 = A.map(function (v, i) { return i === 0 ? v - B[i] * (resta ? 1 : -1) : (resta ? v + B[i] : v - B[i]); });
    var mal3 = [res[0], res[1], resta ? A[2] - (-B[2]) : A[2] - B[2]];
    var mal4 = [A[0] * B[0], res[1], res[2]];
    var mal5 = [res[0], resta ? A[1] + B[1] : A[1] - B[1], res[2]];   // signo equivocado solo en x
    var mal6 = [res[0], A[1] * B[1], res[2]];                           // multiplica en lugar de sumar
    return P.ejercicio('&iquest;Cu&aacute;l es el resultado de <span class="expr">(' + pol(A) + ') ' + (resta ? '&minus;' : '+') + ' (' + pol(B) + ')</span>?',
      P.opciones(r, pol(res), [pol(mal1), pol(mal2), pol(mal3), pol(mal4), pol(mal5), pol(mal6)].filter(function (t) { return t !== pol(res); })),
      ['Solo se suman (o restan) los terminos SEMEJANTES: misma variable con el mismo exponente.', resta ? 'El signo menos antes del parentesis cambia el signo de TODOS los terminos del segundo polinomio.' : 'Suma los coeficientes de x' + F.sup(2) + ', luego los de x y al final los numeros.'],
      ['x' + F.sup(2) + ': ' + m(A[0]) + (resta ? ' &minus; ' : ' + ') + P.np(B[0]) + ' = ' + m(res[0]) + '; x: ' + m(A[1]) + (resta ? ' &minus; ' : ' + ') + P.np(B[1]) + ' = ' + m(res[1]) +
        '; numeros: ' + m(A[2]) + (resta ? ' &minus; ' : ' + ') + P.np(B[2]) + ' = ' + m(res[2]), 'Resultado: <b>' + pol(res) + '</b>']);
  }

  /* 1.6 productos notables */
  function productosNotables(r) {
    var a = r.entero(1, 5), b = r.entero(1, 9), tipo = r.entero(0, 3), sg = r.bool() ? 1 : -1, enun, bien, malas, nombre;
    var ax = (a === 1 ? '' : a) + 'x';
    if (tipo === 0) {
      enun = '(' + ax + (sg > 0 ? ' + ' : ' &minus; ') + b + ')' + F.sup(2); nombre = 'cuadrado de un binomio: (a &plusmn; b)' + F.sup(2) + ' = a' + F.sup(2) + ' &plusmn; 2ab + b' + F.sup(2);
      bien = pol([a * a, 2 * a * b * sg, b * b]); malas = [pol([a * a, 0, b * b]), pol([a * a, a * b * sg, b * b]), pol([a * a, -2 * a * b * sg, b * b]), pol([a * a, 2 * a * b * sg, -b * b])];
    } else if (tipo === 1) {
      enun = '(' + ax + ' + ' + b + ')(' + ax + ' &minus; ' + b + ')'; nombre = 'binomios conjugados: (a + b)(a &minus; b) = a' + F.sup(2) + ' &minus; b' + F.sup(2);
      bien = pol([a * a, 0, -b * b]); malas = [pol([a * a, 0, b * b]), pol([a * a, -2 * a * b, -b * b]), pol([a * a, 2 * a * b, -b * b]), pol([a, 0, -b])];
    } else if (tipo === 2) {
      var c = r.enteroNoCero(-9, 9), d = r.enteroNoCero(-9, 9);
      while (c === d || c === -d) d = r.enteroNoCero(-9, 9);
      enun = '(x ' + (c > 0 ? '+ ' + c : '&minus; ' + (-c)) + ')(x ' + (d > 0 ? '+ ' + d : '&minus; ' + (-d)) + ')'; nombre = 'binomios con un termino comun: (x + a)(x + b) = x' + F.sup(2) + ' + (a + b)x + ab';
      bien = pol([1, c + d, c * d]); malas = [pol([1, c * d, c + d]), pol([1, 0, c * d]), pol([1, c + d, -c * d]), pol([1, -(c + d), c * d])];
    } else {
      if (b === 1) b = r.entero(2, 5);
      enun = '(x ' + (sg > 0 ? '+ ' : '&minus; ') + b + ')' + F.sup(3); nombre = 'cubo de un binomio: (a &plusmn; b)' + F.sup(3) + ' = a' + F.sup(3) + ' &plusmn; 3a' + F.sup(2) + 'b + 3ab' + F.sup(2) + ' &plusmn; b' + F.sup(3);
      bien = pol([1, 3 * b * sg, 3 * b * b, b * b * b * sg]); malas = [pol([1, 0, 0, b * b * b * sg]), pol([1, b * sg, b * b, b * b * b * sg]), pol([1, 3 * b * sg, 3 * b * b * sg, b * b * b]), pol([1, 3 * b * sg, 3 * b, b * b * b * sg])];
    }
    return P.ejercicio('Desarrolle el producto notable <span class="expr">' + enun + '</span>.',
      P.opciones(r, bien, malas.filter(function (t) { return t !== bien; })),
      ['Es un ' + nombre + '.', 'Puedes comprobar multiplicando termino a termino.'],
      [enun + ' = <b>' + bien + '</b>']);
  }

  /* 1.6 suma o diferencia de cubos */
  function sumaCubos(r) {
    var a = r.entero(1, 3), b = r.entero(1, 5), suma = r.bool();
    var ax = (a === 1 ? '' : a) + 'x', a3 = a * a * a, b3 = b * b * b;
    var expr = (a3 === 1 ? '' : a3) + 'x' + F.sup(3) + (suma ? ' + ' : ' &minus; ') + b3;
    function tri(s1) { return '(' + (a * a === 1 ? '' : a * a) + 'x' + F.sup(2) + (s1 > 0 ? ' + ' : ' &minus; ') + (a * b === 1 ? '' : a * b) + 'x + ' + (b * b) + ')'; }
    var bien = '(' + ax + (suma ? ' + ' : ' &minus; ') + b + ')' + tri(suma ? -1 : 1);
    var malas = ['(' + ax + (suma ? ' + ' : ' &minus; ') + b + ')' + tri(suma ? 1 : -1), '(' + ax + (suma ? ' &minus; ' : ' + ') + b + ')' + tri(suma ? -1 : 1),
      '(' + ax + (suma ? ' + ' : ' &minus; ') + b + ')' + F.sup(3), '(' + ax + (suma ? ' &minus; ' : ' + ') + b + ')' + tri(suma ? 1 : -1)];
    return P.ejercicio('Factorice la ' + (suma ? 'suma' : 'diferencia') + ' de cubos <span class="expr">' + expr + '</span>.',
      P.opciones(r, bien, malas),
      ['a' + F.sup(3) + ' &plusmn; b' + F.sup(3) + ' = (a &plusmn; b)(a' + F.sup(2) + ' &#8723; ab + b' + F.sup(2) + '): el binomio lleva el MISMO signo y el ab el contrario.',
        'Aqui a = ' + ax + ' (porque (' + ax + ')' + F.sup(3) + ' = ' + (a3 === 1 ? '' : a3) + 'x' + F.sup(3) + ') y b = ' + b + '.'],
      [expr + ' = <b>' + bien + '</b>']);
  }

  /* 1.6 factorizacion por agrupacion de cuatro terminos */
  function agrupacion(r) {
    var p, q, s, t;
    do { p = r.entero(1, 5); q = r.enteroNoCero(-6, 6); s = r.entero(1, 4); t = r.enteroNoCero(-6, 6); }
    while (F.mcd(p, Math.abs(q)) !== 1 || F.mcd(s, Math.abs(t)) !== 1);
    /* (p x + q)(s y + t) = ps xy + pt x + qs y + qt */
    function bin(c1, v, c2) { return '(' + (c1 === 1 ? '' : c1) + v + (c2 < 0 ? ' &minus; ' + (-c2) : ' + ' + c2) + ')'; }
    function term(c, v, primero) { return (primero ? (c < 0 ? '&minus;' : '') : (c < 0 ? ' &minus; ' : ' + ')) + (Math.abs(c) === 1 && v ? '' : Math.abs(c)) + v; }
    var expr = term(p * s, 'xy', true) + term(p * t, 'x') + term(q * s, 'y') + term(q * t, '');
    var bien = bin(p, 'x', q) + bin(s, 'y', t);
    var malas = [bin(p, 'x', t) + bin(s, 'y', q), bin(p, 'x', -q) + bin(s, 'y', -t), bin(p, 'x', q) + bin(s, 'y', -t), bin(p, 'y', q) + bin(s, 'x', t)];
    return P.ejercicio('Factorice por agrupaci&oacute;n de t&eacute;rminos: <span class="expr">' + expr + '</span>.',
      P.opciones(r, bien, malas.filter(function (x) { return x !== bien; })),
      ['Agrupa de dos en dos: (' + term(p * s, 'xy', true) + term(p * t, 'x') + ') + (' + term(q * s, 'y', true) + term(q * t, '') + ').', 'Saca el factor comun de cada grupo; debe quedar el mismo binomio en los dos.'],
      [(p === 1 ? '' : p) + 'x' + bin(s, 'y', t) + ' ' + (q < 0 ? '&minus; ' : '+ ') + Math.abs(q) + bin(s, 'y', t), '= <b>' + bien + '</b>']);
  }

  /* 1.6 teorema del binomio */
  function coefBinomial(r) {
    var n = r.entero(4, 7), k = r.entero(1, n - 1);
    function C(nn, kk) { var x = 1; for (var i = 1; i <= kk; i++) x = x * (nn - kk + i) / i; return Math.round(x); }
    var v = C(n, k);
    var termino = 'x' + (n - k > 1 ? '<sup>' + (n - k) + '</sup>' : '') + 'y' + (k > 1 ? '<sup>' + k + '</sup>' : '');
    return P.ejercicio('Al desarrollar <span class="expr">(x + y)<sup>' + n + '</sup></span> con el teorema del binomio, &iquest;cu&aacute;l es el coeficiente del t&eacute;rmino ' + termino + '?' +
      P.considere('(' + n + ' sobre ' + k + ') = ' + F.frac('n!', 'k!(n &minus; k)!') + '.'),
      P.opciones(r, v, [n * k, C(n, k - 1) === v ? n + k : C(n, k - 1), n, Math.pow(2, n)]),
      ['El coeficiente es el numero combinatorio (n sobre k) con n = ' + n + ' y k = ' + k + '.', 'Tambien sale del triangulo de Pascal, renglon ' + n + '.'],
      ['(' + n + ' sobre ' + k + ') = ' + n + '! / (' + k + '! &middot; ' + (n - k) + '!) = <b>' + v + '</b>']);
  }

  /* las formas de la guia de estudio se suman a las del reactivo mas cercano */
  casos.racionales = casos.racionales.concat([conjuntosNumericos, propiedadesReales, leyesExponentes, notacionCientifica]);
  casos.grado = casos.grado.concat([sumaPolinomios, leyesExponentes]);
  casos.factorizacion = casos.factorizacion.concat([productosNotables, productosNotables, sumaCubos, agrupacion, coefBinomial]);

  var SUB_ALGEBRA = [
    ['racionales', 'Numeros racionales', 'facil'],
    ['grado', 'Polinomios y grado', 'facil'],
    ['lenguaje', 'Lenguaje algebraico', 'facil'],
    ['progAritmetica', 'Progresion aritmetica', 'medio'],
    ['progGeometrica', 'Progresion geometrica', 'dificil'],
    ['proporcionInversa', 'Proporcionalidad inversa', 'medio'],
    ['variacion', 'Variacion lineal y proporcional', 'medio'],
    ['factorizacion', 'Factorizacion', 'dificil']
  ];

  EJ.tema({
    id: 'prepa-algebra',
    materia: 'prepa',
    grupo: 'Matematicas',
    nombre: 'Numeros, algebra y variacion',
    descripcion: 'Racionales, polinomios, lenguaje algebraico, progresiones, proporcionalidad, variacion y factorizacion, cada uno preguntado de varias formas. Reactivos 1 a 8 de la guia.',
    etiquetas: ['racionales', 'fracciones', 'grado', 'lenguaje algebraico', 'progresion', 'proporcionalidad', 'factorizacion', 'trinomio'],
    dificultades: P.registrarSubtemas('prepa-algebra', SUB_ALGEBRA),
    formulario: 'Aritmetica: a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d, S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>)/2<br>' +
      'Geometrica: a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup>, S<sub>n</sub> = a<sub>1</sub>(r<sup>n</sup> &minus; 1)/(r &minus; 1)<br>' +
      'Proporcional: y = kx &nbsp;&middot;&nbsp; Lineal: y = mx + b &nbsp;&middot;&nbsp; Inversa: x&middot;y = k<br>' +
      'a' + F.sup(2) + ' &minus; b' + F.sup(2) + ' = (a &minus; b)(a + b) &nbsp;&middot;&nbsp; (a &plusmn; b)' + F.sup(2) + ' = a' + F.sup(2) + ' &plusmn; 2ab + b' + F.sup(2),

    generar: function (dif, r) {
      var t = P.subtemaDe(r, dif, 'prepa-algebra', SUB_ALGEBRA);
      return P.enfoque(r, casos[t]);
    }
  });
})();
