/* Teorema de Pitagoras */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  var TERNAS = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 40, 41], [20, 21, 29], [6, 8, 10], [9, 12, 15], [10, 24, 26], [12, 16, 20]];

  /* Triangulo rectangulo con etiquetas en los tres lados. */
  function figura(ca, cb, hip) {
    return F.svg(230, 150,
      '<path d="M30 120 L190 120 L30 25 Z"/>' +
      '<path d="M30 105 L45 105 L45 120" stroke-width="1.5"/>' +
      F.txtSvg(100, 140, cb) +
      F.txtSvg(8, 80, ca) +
      F.txtSvg(120, 65, hip));
  }

  var extra = {};

  extra.cuadradoDiagonal = function (r) {
    var L = r.entero(3, 25);
    var d = L * Math.SQRT2;
    return {
      enunciado: 'Un cuadrado tiene lados de ' + L + ' cm.<br>&iquest;Cuanto mide su diagonal? (2 decimales)',
      respuesta: R.numero(d, { dec: 2, tol: 0.01, unidad: 'cm' }),
      pistas: ['La diagonal parte el cuadrado en dos triangulos rectangulos de catetos ' + L + ' y ' + L + '.',
        'd&sup2; = ' + (L * L) + ' + ' + (L * L) + ' = ' + (2 * L * L) + '.'],
      solucion: ['d&sup2; = ' + L + '&sup2; + ' + L + '&sup2; = ' + (2 * L * L),
        'd = &radic;<span class="rad">' + (2 * L * L) + '</span> = ' + L + '&radic;<span class="rad">2</span>',
        'd = <b>' + F.n(d, 2) + ' cm</b>']
    };
  };

  extra.equilatero = function (r) {
    var L = r.entero(4, 24);
    var h = L * Math.sqrt(3) / 2;
    var area = L * h / 2;
    return {
      enunciado: 'Un triangulo equilatero tiene lados de ' + L + ' cm.<br>Calcula su altura y su area (2 decimales).',
      respuesta: R.varios([
        { etiqueta: 'Altura (cm)', resp: R.numero(h, { dec: 2, tol: 0.02 }) },
        { etiqueta: 'Area (cm&sup2;)', resp: R.numero(area, { dec: 2, tol: 0.2 }) }
      ]),
      pistas: ['La altura divide al equilatero en dos triangulos rectangulos con catetos h y ' + (L / 2) + '.',
        'h&sup2; = ' + L + '&sup2; &minus; ' + (L / 2) + '&sup2; = ' + (L * L - (L / 2) * (L / 2)) + '.'],
      solucion: ['Medio lado: ' + (L / 2),
        'h&sup2; = ' + (L * L) + ' &minus; ' + ((L / 2) * (L / 2)) + ' = ' + (L * L - (L / 2) * (L / 2)),
        'h = <b>' + F.n(h, 2) + ' cm</b> (formula rapida: h = L&radic;<span class="rad">3</span>/2)',
        'Area = base &middot; h / 2 = ' + L + ' &middot; ' + F.n(h, 2) + ' / 2 = <b>' + F.n(area, 2) + ' cm&sup2;</b>']
    };
  };

  EJ.tema({
    id: 'pitagoras',
    materia: 'matematicas',
    grupo: 'Geometria y trigonometria',
    nombre: 'Teorema de Pitagoras',
    descripcion: 'Calcular hipotenusa y catetos, distancias y alturas en triangulos rectangulos.',
    formulario: 'c&sup2; = a&sup2; + b&sup2; (c es la hipotenusa)<br>' +
      'c = &radic;<span class="rad">a&sup2; + b&sup2;</span> &nbsp;&middot;&nbsp; a = &radic;<span class="rad">c&sup2; &minus; b&sup2;</span><br>' +
      'Distancia entre puntos: d = &radic;<span class="rad">(x&#8322;&minus;x&#8321;)&sup2; + (y&#8322;&minus;y&#8321;)&sup2;</span>',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, t, a, b, c;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['hipotenusa', 'Calcular la hipotenusa'],
          ['cateto', 'Calcular un cateto']
        ]);
        t = r.elige(TERNAS);
        a = t[0]; b = t[1]; c = t[2];
        if (tf === 'hipotenusa') {
          guiaDelPaso = EJ.guia.pitagoras(a, b);
          enun = 'Calcula la hipotenusa del triangulo rectangulo:' + figura(a + ' cm', b + ' cm', '?');
          resp = R.numero(c, { dec: 2, tol: 0.01, unidad: 'cm' });
          pistas = ['La hipotenusa es el lado mas largo, opuesto al angulo recto: c&sup2; = a&sup2; + b&sup2;.',
            a + '&sup2; + ' + b + '&sup2; = ' + (a * a) + ' + ' + (b * b) + ' = ' + (a * a + b * b) + '. Falta sacar la raiz.'];
          sol = ['c&sup2; = ' + a + '&sup2; + ' + b + '&sup2;',
            'c&sup2; = ' + (a * a) + ' + ' + (b * b) + ' = ' + (a * a + b * b),
            'c = &radic;<span class="rad">' + (a * a + b * b) + '</span> = <b>' + c + ' cm</b>'];
        } else {
          enun = 'En un triangulo rectangulo la hipotenusa mide ' + c + ' cm y un cateto mide ' + a + ' cm.<br>Calcula el otro cateto.' + figura(a + ' cm', '?', c + ' cm');
          resp = R.numero(b, { dec: 2, tol: 0.01, unidad: 'cm' });
          pistas = ['Despeja el cateto: b&sup2; = c&sup2; &minus; a&sup2;.',
            c + '&sup2; &minus; ' + a + '&sup2; = ' + (c * c) + ' &minus; ' + (a * a) + ' = ' + (c * c - a * a) + '.'];
          sol = ['b&sup2; = c&sup2; &minus; a&sup2;',
            'b&sup2; = ' + (c * c) + ' &minus; ' + (a * a) + ' = ' + (c * c - a * a),
            'b = &radic;<span class="rad">' + (c * c - a * a) + '</span> = <b>' + b + ' cm</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['noEntero', 'Hipotenusa con decimales'],
          ['rectangulo', 'Diagonal de un rectangulo'],
          ['distancia', 'Distancia entre dos puntos'],
          ['cuadradoDiagonal', 'Diagonal de un cuadrado']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'noEntero') {
          a = r.entero(3, 18); b = r.entero(3, 18);
          c = Math.sqrt(a * a + b * b);
          guiaDelPaso = EJ.guia.pitagoras(a, b);
          enun = 'Los catetos de un triangulo rectangulo miden ' + a + ' m y ' + b + ' m.<br>Calcula la hipotenusa (redondea a 2 decimales).' + figura(a + ' m', b + ' m', '?');
          resp = R.numero(c, { dec: 2, tol: 0.01, unidad: 'm' });
          pistas = ['c = &radic;<span class="rad">a&sup2; + b&sup2;</span>.',
            'a&sup2; + b&sup2; = ' + (a * a) + ' + ' + (b * b) + ' = ' + (a * a + b * b) + '.'];
          sol = ['c&sup2; = ' + (a * a) + ' + ' + (b * b) + ' = ' + (a * a + b * b),
            'c = &radic;<span class="rad">' + (a * a + b * b) + '</span>',
            'c = <b>' + F.n(c, 2) + ' m</b>' + (Math.abs(c - Math.round(c)) < 1e-9 ? '' : ' (valor exacto: ' + F.raizSimp(a * a + b * b) + ')')];
        } else if (t2 === 'rectangulo') {
          a = r.entero(4, 20); b = r.entero(4, 20);
          c = Math.sqrt(a * a + b * b);
          enun = 'Un rectangulo mide ' + a + ' cm de base y ' + b + ' cm de altura.<br>&iquest;Cuanto mide su diagonal? (redondea a 2 decimales)';
          resp = R.numero(c, { dec: 2, tol: 0.01, unidad: 'cm' });
          pistas = ['La diagonal parte el rectangulo en dos triangulos rectangulos cuyos catetos son la base y la altura.',
            'd = &radic;<span class="rad">' + (a * a) + ' + ' + (b * b) + '</span>.'];
          sol = ['La diagonal es la hipotenusa de un triangulo de catetos ' + a + ' y ' + b,
            'd&sup2; = ' + (a * a) + ' + ' + (b * b) + ' = ' + (a * a + b * b),
            'd = <b>' + F.n(c, 2) + ' cm</b>'];
        } else {
          var x1 = r.entero(-8, 8), y1 = r.entero(-8, 8);
          var x2 = r.entero(-8, 8), y2 = r.entero(-8, 8);
          while (x2 === x1 && y2 === y1) { x2 = r.entero(-8, 8); y2 = r.entero(-8, 8); }
          var dx = x2 - x1, dy = y2 - y1;
          c = Math.sqrt(dx * dx + dy * dy);
          enun = 'Calcula la distancia entre los puntos A(' + x1 + ', ' + y1 + ') y B(' + x2 + ', ' + y2 + ').<br>(redondea a 2 decimales)';
          resp = R.numero(c, { dec: 2, tol: 0.01 });
          pistas = ['La distancia es la hipotenusa de un triangulo con catetos &Delta;x y &Delta;y.',
            '&Delta;x = ' + dx + ' y &Delta;y = ' + dy + '.'];
          sol = ['&Delta;x = ' + x2 + ' &minus; (' + x1 + ') = ' + dx + ', &Delta;y = ' + y2 + ' &minus; (' + y1 + ') = ' + dy,
            'd = &radic;<span class="rad">(' + dx + ')&sup2; + (' + dy + ')&sup2;</span> = &radic;<span class="rad">' + (dx * dx + dy * dy) + '</span>',
            'd = <b>' + F.n(c, 2) + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['escalera', 'Problema de la escalera'],
          ['isosceles', 'Triangulo isosceles'],
          ['equilatero', 'Triangulo equilatero'],
          ['verificar', 'Comprobar si es rectangulo'],
          ['cubo', 'Diagonal de una caja']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'escalera') {
          var L = r.entero(5, 15);
          var base = r.entero(2, L - 1);
          var alt = Math.sqrt(L * L - base * base);
          enun = 'Una escalera de ' + L + ' m esta apoyada en una pared y su base esta a ' + base + ' m de la pared.<br>&iquest;A que altura llega la escalera? (2 decimales)';
          resp = R.numero(alt, { dec: 2, tol: 0.01, unidad: 'm' });
          pistas = ['La escalera es la hipotenusa; la distancia a la pared y la altura son los catetos.',
            'altura&sup2; = ' + (L * L) + ' &minus; ' + (base * base) + ' = ' + (L * L - base * base) + '.'];
          sol = ['h&sup2; = L&sup2; &minus; base&sup2; = ' + (L * L) + ' &minus; ' + (base * base),
            'h = &radic;<span class="rad">' + (L * L - base * base) + '</span>',
            'h = <b>' + F.n(alt, 2) + ' m</b>'];
        } else if (t3 === 'isosceles') {
          var lado = r.entero(6, 20);
          var bas = r.entero(4, 2 * lado - 2);
          while (bas >= 2 * lado) bas = r.entero(4, 2 * lado - 2);
          var h = Math.sqrt(lado * lado - (bas / 2) * (bas / 2));
          var area = bas * h / 2;
          enun = 'Un triangulo isosceles tiene lados iguales de ' + lado + ' cm y base de ' + bas + ' cm.<br>Calcula su altura y su area (2 decimales).';
          resp = R.varios([
            { etiqueta: 'Altura (cm)', resp: R.numero(h, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'Area (cm&sup2;)', resp: R.numero(area, { dec: 2, tol: 0.02 }) }
          ]);
          pistas = ['La altura de un isosceles cae en el punto medio de la base y forma dos triangulos rectangulos.',
            'Los catetos son h y ' + (bas / 2) + '; la hipotenusa es ' + lado + '.'];
          sol = ['Medio base = ' + (bas / 2),
            'h&sup2; = ' + lado + '&sup2; &minus; ' + (bas / 2) + '&sup2; = ' + (lado * lado) + ' &minus; ' + ((bas / 2) * (bas / 2)) + ' = ' + (lado * lado - (bas / 2) * (bas / 2)),
            'h = <b>' + F.n(h, 2) + ' cm</b>',
            'Area = base &middot; h / 2 = ' + bas + ' &middot; ' + F.n(h, 2) + ' / 2 = <b>' + F.n(area, 2) + ' cm&sup2;</b>'];
        } else if (t3 === 'verificar') {
          var esRecto = r.bool();
          var tt = r.elige(TERNAS);
          a = tt[0]; b = tt[1]; c = esRecto ? tt[2] : tt[2] + r.elige([1, -1, 2]);
          enun = 'Un triangulo tiene lados ' + a + ', ' + b + ' y ' + c + '.<br>&iquest;Es un triangulo rectangulo?';
          resp = R.opcion(['Si, es rectangulo', 'No es rectangulo'], esRecto ? 0 : 1);
          pistas = ['Comprueba si el cuadrado del lado mayor es igual a la suma de los cuadrados de los otros dos.',
            'Lado mayor: ' + Math.max(a, b, c) + '. Su cuadrado vale ' + Math.pow(Math.max(a, b, c), 2) + '.'];
          var otros = [a, b, c].filter(function (x, i) { return i !== [a, b, c].indexOf(Math.max(a, b, c)); });
          sol = ['Lado mayor al cuadrado: ' + Math.max(a, b, c) + '&sup2; = ' + Math.pow(Math.max(a, b, c), 2),
            'Suma de los otros dos al cuadrado: ' + otros[0] + '&sup2; + ' + otros[1] + '&sup2; = ' + (otros[0] * otros[0] + otros[1] * otros[1]),
            esRecto ? 'Son iguales, asi que <b>si</b> es rectangulo' : 'No son iguales, asi que <b>no</b> es rectangulo'];
        } else {
          var L1 = r.entero(2, 12), L2 = r.entero(2, 12), L3 = r.entero(2, 12);
          var diag = Math.sqrt(L1 * L1 + L2 * L2 + L3 * L3);
          enun = 'Una caja mide ' + L1 + ' &times; ' + L2 + ' &times; ' + L3 + ' cm.<br>&iquest;Cual es la diagonal interior de la caja? (2 decimales)';
          resp = R.numero(diag, { dec: 2, tol: 0.01, unidad: 'cm' });
          pistas = ['Aplica Pitagoras dos veces: primero en la base, luego con la altura.',
            'Diagonal de la base: &radic;<span class="rad">' + (L1 * L1) + ' + ' + (L2 * L2) + '</span> = ' + F.n(Math.sqrt(L1 * L1 + L2 * L2), 3) + '.'];
          sol = ['Diagonal de la base: d&sub1;&sup2; = ' + (L1 * L1) + ' + ' + (L2 * L2) + ' = ' + (L1 * L1 + L2 * L2),
            'Ahora con la altura: D&sup2; = d&sub1;&sup2; + ' + (L3 * L3) + ' = ' + (L1 * L1 + L2 * L2 + L3 * L3),
            'D = &radic;<span class="rad">' + (L1 * L1 + L2 * L2 + L3 * L3) + '</span> = <b>' + F.n(diag, 2) + ' cm</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
