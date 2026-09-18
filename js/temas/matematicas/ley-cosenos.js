/* Ley de cosenos */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function rad(g) { return g * Math.PI / 180; }
  function deg(x) { return x * 180 / Math.PI; }

  function figura(a, b, c, C) {
    return F.svg(260, 150,
      '<path d="M30 125 L230 125 L95 25 Z"/>' +
      F.txtSvg(125, 142, c) + F.txtSvg(45, 70, b) + F.txtSvg(175, 70, a) +
      (C ? F.txtSvg(86, 45, C) : ''));
  }

  var extra = {};

  extra.paralelogramo = function (r) {
    var a = r.entero(4, 18), b = r.entero(4, 18);
    var ang = r.elige([40, 50, 60, 70, 80, 110, 120]);
    var menor = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(ang)));
    var mayor = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(180 - ang)));
    return {
      enunciado: 'Un paralelogramo tiene lados de ' + a + ' y ' + b + ' cm, y uno de sus angulos mide ' + ang + '&deg;.<br>' +
        'Calcula sus dos diagonales (2 decimales).',
      respuesta: R.varios([
        { etiqueta: 'Diagonal frente a ' + ang + '&deg;', resp: R.numero(menor, { dec: 2, tol: 0.03 }) },
        { etiqueta: 'La otra diagonal', resp: R.numero(mayor, { dec: 2, tol: 0.03 }) }
      ]),
      pistas: ['Cada diagonal parte el paralelogramo en dos triangulos: aplica la ley de cosenos en cada uno.',
        'Los angulos consecutivos de un paralelogramo suman 180&deg;, asi que el otro mide ' + (180 - ang) + '&deg;.'],
      solucion: ['Primera diagonal: d&sup2; = ' + (a * a) + ' + ' + (b * b) + ' &minus; 2(' + a + ')(' + b + ')cos ' + ang + '&deg;',
        'd = <b>' + F.n(menor, 2) + ' cm</b>',
        'El otro angulo es ' + (180 - ang) + '&deg;',
        'Segunda diagonal: D = <b>' + F.n(mayor, 2) + ' cm</b>']
    };
  };

  extra.clasifica = function (r) {
    var a = r.entero(4, 15), b = r.entero(4, 15);
    var c = r.entero(Math.max(2, Math.abs(a - b) + 1), a + b - 1);
    var lados = [a, b, c].sort(function (x, y) { return x - y; });
    var suma = lados[0] * lados[0] + lados[1] * lados[1], mayor2 = lados[2] * lados[2];
    var idx = mayor2 === suma ? 1 : (mayor2 < suma ? 0 : 2);
    var cosMayor = (suma - mayor2) / (2 * lados[0] * lados[1]);
    return {
      enunciado: 'Un triangulo tiene lados ' + a + ', ' + b + ' y ' + c + '.<br>&iquest;Como se clasifica por sus angulos?',
      respuesta: R.opcion(['Acutangulo (todos sus angulos son agudos)', 'Rectangulo (tiene un angulo de 90&deg;)', 'Obtusangulo (tiene un angulo mayor de 90&deg;)'], idx),
      pistas: ['Compara el cuadrado del lado MAYOR con la suma de los cuadrados de los otros dos.',
        'Lado mayor: ' + lados[2] + ', su cuadrado es ' + mayor2 + '; la suma de los otros cuadrados es ' + suma + '.'],
      solucion: ['c&sup2; = ' + mayor2 + ' y a&sup2; + b&sup2; = ' + suma,
        'Como cos del angulo mayor = (' + suma + ' &minus; ' + mayor2 + ')/' + (2 * lados[0] * lados[1]) + ' = ' + F.n(cosMayor, 4),
        idx === 1 ? 'El coseno da 0 &rArr; angulo de 90&deg;: es <b>rectangulo</b>'
          : idx === 0 ? 'El coseno es positivo &rArr; el angulo mayor es agudo: es <b>acutangulo</b>'
            : 'El coseno es negativo &rArr; el angulo mayor pasa de 90&deg;: es <b>obtusangulo</b>']
    };
  };

  EJ.tema({
    id: 'ley-cosenos',
    materia: 'matematicas',
    grupo: 'Geometria y trigonometria',
    nombre: 'Ley de cosenos',
    descripcion: 'Tercer lado con dos lados y el angulo entre ellos, y angulos conociendo los tres lados.',
    formulario: 'c&sup2; = a&sup2; + b&sup2; &minus; 2ab&middot;cos C<br>' +
      'cos C = (a&sup2; + b&sup2; &minus; c&sup2;) / (2ab)<br>' +
      'Se usa con: dos lados y el angulo entre ellos (LAL) o los tres lados (LLL). Si C = 90&deg; se reduce a Pitagoras.',

    generar: function (dif, r) {
      var enun, resp, pistas, sol, a, b, c, C, A;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['tercerLado', 'Tercer lado (dos lados y su angulo)'],
          ['paralelogramo', 'Diagonales de un paralelogramo']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        a = r.entero(4, 20); b = r.entero(4, 20);
        C = r.elige([30, 45, 60, 70, 80, 100, 120, 135]);
        c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(C)));
        enun = 'En un triangulo a = ' + a + ' cm, b = ' + b + ' cm y el angulo entre ellos C = ' + C + '&deg;.<br>' +
          'Calcula el lado c (2 decimales).' + figura('a=' + a, 'b=' + b, 'c=?', C + '&deg;');
        resp = R.numero(c, { dec: 2, tol: 0.02, unidad: 'cm' });
        pistas = ['Usa c&sup2; = a&sup2; + b&sup2; &minus; 2ab&middot;cos C.',
          'a&sup2; + b&sup2; = ' + (a * a + b * b) + ' y 2ab&middot;cos C = ' + F.n(2 * a * b * Math.cos(rad(C)), 3) + '.'];
        sol = ['c&sup2; = ' + a + '&sup2; + ' + b + '&sup2; &minus; 2(' + a + ')(' + b + ')cos ' + C + '&deg;',
          'c&sup2; = ' + (a * a) + ' + ' + (b * b) + ' &minus; ' + F.n(2 * a * b * Math.cos(rad(C)), 3),
          'c&sup2; = ' + F.n(c * c, 3),
          'c = <b>' + F.n(c, 2) + ' cm</b>'];
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['angulo', 'Angulo con los tres lados'],
          ['mayorAngulo', 'Angulo mayor'],
          ['clasifica', 'Clasificar el triangulo'],
          ['paralelogramo', 'Diagonales de un paralelogramo']
        ]);
        if (extra[t]) return extra[t](r, dif);
        a = r.entero(5, 18); b = r.entero(5, 18);
        var cc = r.entero(Math.max(2, Math.abs(a - b) + 1), a + b - 1);
        c = cc;
        var cosC = (a * a + b * b - c * c) / (2 * a * b);
        C = deg(Math.acos(cosC));
        if (t === 'angulo') {
          enun = 'Un triangulo tiene lados a = ' + a + ', b = ' + b + ' y c = ' + c + ' cm.<br>' +
            'Calcula el angulo C (el opuesto al lado c), en grados con 2 decimales.';
          resp = R.numero(C, { dec: 2, tol: 0.05, unidad: 'grados' });
          pistas = ['Despeja el coseno: cos C = (a&sup2; + b&sup2; &minus; c&sup2;)/(2ab).',
            'cos C = (' + (a * a) + ' + ' + (b * b) + ' &minus; ' + (c * c) + ')/(2&middot;' + a + '&middot;' + b + ') = ' + F.n(cosC, 4) + '.'];
          sol = ['cos C = (a&sup2; + b&sup2; &minus; c&sup2;)/(2ab)',
            'cos C = (' + (a * a) + ' + ' + (b * b) + ' &minus; ' + (c * c) + ')/' + (2 * a * b) + ' = ' + F.n(cosC, 4),
            'C = arccos(' + F.n(cosC, 4) + ') = <b>' + F.n(C, 2) + '&deg;</b>'];
        } else {
          var lados = [a, b, c];
          var mayor = Math.max(a, b, c);
          var otros = lados.slice(); otros.splice(lados.indexOf(mayor), 1);
          var cosM = (otros[0] * otros[0] + otros[1] * otros[1] - mayor * mayor) / (2 * otros[0] * otros[1]);
          var angM = deg(Math.acos(cosM));
          enun = 'Un triangulo tiene lados ' + a + ', ' + b + ' y ' + c + ' cm.<br>' +
            'Calcula su angulo mayor (2 decimales).';
          resp = R.numero(angM, { dec: 2, tol: 0.05, unidad: 'grados' });
          pistas = ['El angulo mayor siempre se opone al lado mayor, que aqui es ' + mayor + '.',
            'cos = (' + (otros[0] * otros[0]) + ' + ' + (otros[1] * otros[1]) + ' &minus; ' + (mayor * mayor) + ')/(2&middot;' + otros[0] + '&middot;' + otros[1] + ').'];
          sol = ['El lado mayor es ' + mayor + ', asi que busco el angulo opuesto a el',
            'cos = (' + (otros[0] * otros[0]) + ' + ' + (otros[1] * otros[1]) + ' &minus; ' + (mayor * mayor) + ')/' + (2 * otros[0] * otros[1]) + ' = ' + F.n(cosM, 4),
            'Angulo = <b>' + F.n(angM, 2) + '&deg;</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['navegacion', 'Problema de navegacion'],
          ['completo', 'Resolver el triangulo completo'],
          ['heron', 'Angulo y area (Heron)'],
          ['clasifica', 'Clasificar el triangulo']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'navegacion') {
          var v1 = r.entero(20, 90), v2 = r.entero(20, 90);
          var ang = r.elige([40, 50, 60, 75, 110, 120, 135]);
          var d = Math.sqrt(v1 * v1 + v2 * v2 - 2 * v1 * v2 * Math.cos(rad(ang)));
          enun = 'Dos barcos salen del mismo puerto al mismo tiempo. Uno recorre ' + v1 + ' km y el otro ' + v2 + ' km,<br>' +
            'y el angulo entre sus rutas es de ' + ang + '&deg;.<br>&iquest;A que distancia estan uno del otro? (2 decimales)';
          resp = R.numero(d, { dec: 2, tol: 0.05, unidad: 'km' });
          pistas = ['Las dos rutas y la distancia entre los barcos forman un triangulo con el angulo ' + ang + '&deg; entre los lados conocidos.',
            'd&sup2; = ' + (v1 * v1) + ' + ' + (v2 * v2) + ' &minus; 2(' + v1 + ')(' + v2 + ')cos ' + ang + '&deg;.'];
          sol = ['d&sup2; = ' + v1 + '&sup2; + ' + v2 + '&sup2; &minus; 2(' + v1 + ')(' + v2 + ')cos ' + ang + '&deg;',
            'd&sup2; = ' + (v1 * v1 + v2 * v2) + ' &minus; ' + F.n(2 * v1 * v2 * Math.cos(rad(ang)), 3) + ' = ' + F.n(d * d, 3),
            'd = <b>' + F.n(d, 2) + ' km</b>'];
        } else if (t2 === 'completo') {
          a = r.entero(6, 18); b = r.entero(6, 18);
          C = r.elige([35, 48, 62, 75, 105, 128]);
          c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(C)));
          A = deg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
          var B = 180 - A - C;
          enun = 'En un triangulo a = ' + a + ', b = ' + b + ' y C = ' + C + '&deg;.<br>' +
            'Encuentra el lado c y los angulos A y B (2 decimales).';
          resp = R.varios([
            { etiqueta: 'c', resp: R.numero(c, { dec: 2, tol: 0.02 }) },
            { etiqueta: 'A (&deg;)', resp: R.numero(A, { dec: 2, tol: 0.05 }) },
            { etiqueta: 'B (&deg;)', resp: R.numero(B, { dec: 2, tol: 0.05 }) }
          ]);
          pistas = ['Primero c con la ley de cosenos; despues A con la ley de cosenos o de senos.',
            'c = ' + F.n(c, 2) + '. Ahora cos A = (b&sup2; + c&sup2; &minus; a&sup2;)/(2bc).'];
          sol = ['c&sup2; = ' + (a * a) + ' + ' + (b * b) + ' &minus; ' + F.n(2 * a * b * Math.cos(rad(C)), 3) + ' &rArr; c = <b>' + F.n(c, 2) + '</b>',
            'cos A = (b&sup2; + c&sup2; &minus; a&sup2;)/(2bc) &rArr; A = <b>' + F.n(A, 2) + '&deg;</b>',
            'B = 180&deg; &minus; A &minus; C = <b>' + F.n(B, 2) + '&deg;</b>'];
        } else {
          a = r.entero(6, 20); b = r.entero(6, 20);
          var c2 = r.entero(Math.max(3, Math.abs(a - b) + 2), a + b - 2);
          c = c2;
          var s = (a + b + c) / 2;
          var area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
          var cosA = (b * b + c * c - a * a) / (2 * b * c);
          A = deg(Math.acos(cosA));
          enun = 'Un terreno triangular mide ' + a + ', ' + b + ' y ' + c + ' metros por lado.<br>' +
            'Calcula el angulo A (opuesto al lado de ' + a + ' m) y el area del terreno (2 decimales).';
          resp = R.varios([
            { etiqueta: 'A (&deg;)', resp: R.numero(A, { dec: 2, tol: 0.05 }) },
            { etiqueta: 'Area (m&sup2;)', resp: R.numero(area, { dec: 2, tol: 0.1 }) }
          ]);
          pistas = ['Para el angulo usa la ley de cosenos; para el area puedes usar Heron o &frac12;bc&middot;sen A.',
            'Semiperimetro s = ' + F.n(s, 2) + '.'];
          sol = ['cos A = (' + (b * b) + ' + ' + (c * c) + ' &minus; ' + (a * a) + ')/' + (2 * b * c) + ' = ' + F.n(cosA, 4),
            'A = <b>' + F.n(A, 2) + '&deg;</b>',
            'Heron: s = ' + F.n(s, 2) + ', Area = &radic;<span class="rad">s(s&minus;a)(s&minus;b)(s&minus;c)</span>',
            'Area = <b>' + F.n(area, 2) + ' m&sup2;</b>'];
        }
      }

      return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
