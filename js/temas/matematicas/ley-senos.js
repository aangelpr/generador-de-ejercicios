/* Ley de senos */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function rad(g) { return g * Math.PI / 180; }
  function deg(x) { return x * 180 / Math.PI; }

  function figura(A, B, C, a, b, c) {
    return F.svg(260, 150,
      '<path d="M30 125 L230 125 L95 25 Z"/>' +
      F.txtSvg(20, 138, A) + F.txtSvg(228, 138, B) + F.txtSvg(90, 18, C) +
      F.txtSvg(125, 142, c) + F.txtSvg(50, 70, b) + F.txtSvg(175, 70, a));
  }

  var extra = {};

  extra.tercerAngulo = function (r) {
    var A = r.entero(20, 100), B = r.entero(20, 150 - A);
    var C = 180 - A - B;
    var a = r.entero(5, 20);
    var c = a * Math.sin(rad(C)) / Math.sin(rad(A));
    return {
      enunciado: 'En un triangulo A = ' + A + '&deg; y B = ' + B + '&deg;, con el lado a = ' + a + ' cm.<br>' +
        'Calcula el angulo C y el lado c (2 decimales).',
      respuesta: R.varios([
        { etiqueta: 'C (&deg;)', resp: R.numero(C, { dec: 2, tol: 0.05 }) },
        { etiqueta: 'c (cm)', resp: R.numero(c, { dec: 2, tol: 0.02 }) }
      ]),
      pistas: ['Los tres angulos de un triangulo suman 180&deg;.',
        'C = 180&deg; &minus; ' + A + '&deg; &minus; ' + B + '&deg; = ' + C + '&deg;. Despues usa c = a&middot;sen C / sen A.'],
      solucion: ['C = 180&deg; &minus; ' + A + '&deg; &minus; ' + B + '&deg; = <b>' + C + '&deg;</b>',
        'c = a &middot; sen C / sen A = ' + a + ' &middot; ' + F.n(Math.sin(rad(C)), 4) + ' / ' + F.n(Math.sin(rad(A)), 4),
        'c = <b>' + F.n(c, 2) + ' cm</b>']
    };
  };

  extra.area = function (r) {
    var a = r.entero(5, 20), b = r.entero(5, 20);
    var C = r.elige([25, 35, 42, 55, 68, 75, 100, 115, 130]);
    var area = 0.5 * a * b * Math.sin(rad(C));
    return {
      enunciado: 'Un triangulo tiene lados a = ' + a + ' cm y b = ' + b + ' cm con un angulo de ' + C + '&deg; entre ellos.<br>' +
        'Calcula su area (2 decimales).',
      respuesta: R.numero(area, { dec: 2, tol: 0.05, unidad: 'cm&sup2;' }),
      pistas: ['Cuando conoces dos lados y el angulo ENTRE ellos: Area = &frac12; a b sen C.',
        'sen ' + C + '&deg; = ' + F.n(Math.sin(rad(C)), 4) + '.'],
      solucion: ['Area = &frac12; &middot; a &middot; b &middot; sen C',
        'Area = &frac12; &middot; ' + a + ' &middot; ' + b + ' &middot; ' + F.n(Math.sin(rad(C)), 4),
        'Area = <b>' + F.n(area, 2) + ' cm&sup2;</b>']
    };
  };

  extra.casoAmbiguo = function (r) {
    var A = r.elige([25, 30, 35, 40]);
    var b = r.entero(10, 20);
    /* para que haya dos soluciones: b sen A < a < b */
    var minimo = b * Math.sin(rad(A));
    var a = F.redondea(minimo + (b - minimo) * r.real(0.25, 0.75), 2);
    var B1 = deg(Math.asin(b * Math.sin(rad(A)) / a));
    var B2 = 180 - B1;
    return {
      enunciado: 'En un triangulo a = ' + a + ', b = ' + b + ' y A = ' + A + '&deg;.<br>' +
        'Este es el caso ambiguo (LLA): encuentra los DOS valores posibles del angulo B (2 decimales).',
      respuesta: R.lista([F.redondea(B1, 2), F.redondea(B2, 2)], {
        tol: 0.1, ayuda: 'Escribe los dos angulos separados por coma.'
      }),
      pistas: ['sen B = b &middot; sen A / a. La calculadora te da el angulo agudo, pero el obtuso tiene el mismo seno.',
        'sen B = ' + F.n(b * Math.sin(rad(A)) / a, 4) + ' &rArr; B = arcsen(&hellip;) y tambien 180&deg; &minus; ese valor.'],
      solucion: ['sen B = ' + b + ' &middot; sen ' + A + '&deg; / ' + a + ' = ' + F.n(b * Math.sin(rad(A)) / a, 4),
        'Primera solucion (agudo): B = <b>' + F.n(B1, 2) + '&deg;</b>',
        'Segunda solucion (obtuso): B = 180&deg; &minus; ' + F.n(B1, 2) + '&deg; = <b>' + F.n(B2, 2) + '&deg;</b>',
        'Las dos sirven porque A + B sigue siendo menor que 180&deg;']
    };
  };

  EJ.tema({
    id: 'ley-senos',
    materia: 'matematicas',
    grupo: 'Geometria y trigonometria',
    nombre: 'Ley de senos',
    descripcion: 'Resolver triangulos oblicuangulos cuando se conocen angulos y un lado opuesto.',
    formulario: 'a / sen A = b / sen B = c / sen C<br>' +
      'Se usa cuando conoces: dos angulos y un lado (AAL/ALA), o dos lados y un angulo opuesto (LLA).<br>' +
      'Recuerda que A + B + C = 180&deg;.',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, A, B, C, a, b, c;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['ladoOpuesto', 'Calcular un lado'],
          ['tercerAngulo', 'Tercer angulo y su lado']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        A = r.entero(30, 80); B = r.entero(30, 180 - A - 25);
        C = 180 - A - B;
        a = r.entero(5, 30);
        b = a * Math.sin(rad(B)) / Math.sin(rad(A));
        guiaDelPaso = EJ.guia.leySenosLado(A, B, a);
        enun = 'En un triangulo A = ' + A + '&deg;, B = ' + B + '&deg; y el lado a = ' + a + ' cm.<br>' +
          'Calcula el lado b (2 decimales).' + figura('A=' + A + '&deg;', 'B=' + B + '&deg;', '', 'a=' + a, 'b=?', '');
        resp = R.numero(b, { dec: 2, tol: 0.01, unidad: 'cm' });
        pistas = ['Usa a/sen A = b/sen B y despeja b.',
          'b = a &middot; sen B / sen A = ' + a + ' &middot; sen ' + B + '&deg; / sen ' + A + '&deg;.'];
        sol = ['a / sen A = b / sen B',
          'b = ' + a + ' &middot; sen ' + B + '&deg; / sen ' + A + '&deg;',
          'b = ' + a + ' &middot; ' + F.n(Math.sin(rad(B)), 4) + ' / ' + F.n(Math.sin(rad(A)), 4),
          'b = <b>' + F.n(b, 2) + ' cm</b>'];
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['angulo', 'Calcular un angulo'],
          ['tercerLado', 'Tercer angulo y lado'],
          ['area', 'Area con dos lados y su angulo']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'angulo') {
          A = r.entero(35, 75);
          B = r.entero(25, 180 - A - 30);
          C = 180 - A - B;
          a = r.entero(8, 25);
          b = a * Math.sin(rad(B)) / Math.sin(rad(A));
          enun = 'En un triangulo a = ' + a + ' cm, b = ' + F.n(b, 2) + ' cm y A = ' + A + '&deg;.<br>' +
            'Calcula el angulo B (2 decimales, toma el angulo agudo).';
          /* el lado b se da redondeado a 2 decimales, asi que el angulo que
             calcule el alumno puede desviarse un poco: tolerancia mas amplia */
          resp = R.numero(B, { dec: 2, tol: 0.25, unidad: 'grados' });
          pistas = ['De a/sen A = b/sen B despeja sen B = b &middot; sen A / a.',
            'sen B = ' + F.n(b, 2) + ' &middot; sen ' + A + '&deg; / ' + a + ' = ' + F.n(Math.sin(rad(B)), 4) + '. Ahora usa arcsen.'];
          sol = ['sen B = b &middot; sen A / a',
            'sen B = ' + F.n(b, 2) + ' &middot; ' + F.n(Math.sin(rad(A)), 4) + ' / ' + a + ' = ' + F.n(Math.sin(rad(B)), 4),
            'B = arcsen(' + F.n(Math.sin(rad(B)), 4) + ') = <b>' + F.n(B, 2) + '&deg;</b>',
            'Nota: el caso LLA puede tener una segunda solucion obtusa (' + F.n(180 - B, 2) + '&deg;) si el triangulo lo permite.'];
        } else {
          A = r.entero(30, 70); B = r.entero(30, 180 - A - 30);
          C = 180 - A - B;
          a = r.entero(6, 24);
          c = a * Math.sin(rad(C)) / Math.sin(rad(A));
          enun = 'En un triangulo A = ' + A + '&deg;, B = ' + B + '&deg; y a = ' + a + ' cm.<br>' +
            'Calcula el angulo C y el lado c (2 decimales).';
          resp = R.varios([
            { etiqueta: 'C (grados)', resp: R.numero(C, { dec: 2, tol: 0.05 }) },
            { etiqueta: 'c (cm)', resp: R.numero(c, { dec: 2, tol: 0.01 }) }
          ]);
          pistas = ['Los angulos de un triangulo suman 180&deg;: de ahi sale C.',
            'C = 180&deg; &minus; ' + A + '&deg; &minus; ' + B + '&deg; = ' + C + '&deg;. Luego c = a &middot; sen C / sen A.'];
          sol = ['C = 180&deg; &minus; ' + A + '&deg; &minus; ' + B + '&deg; = <b>' + C + '&deg;</b>',
            'c = a &middot; sen C / sen A = ' + a + ' &middot; ' + F.n(Math.sin(rad(C)), 4) + ' / ' + F.n(Math.sin(rad(A)), 4),
            'c = <b>' + F.n(c, 2) + ' cm</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['resolver', 'Resolver el triangulo completo'],
          ['aplicacion', 'Problema aplicado'],
          ['casoAmbiguo', 'Caso ambiguo (LLA)']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'resolver') {
          A = r.entero(28, 70); B = r.entero(28, 180 - A - 30);
          C = 180 - A - B;
          a = r.entero(7, 22);
          b = a * Math.sin(rad(B)) / Math.sin(rad(A));
          c = a * Math.sin(rad(C)) / Math.sin(rad(A));
          var area = 0.5 * a * b * Math.sin(rad(C));
          enun = 'Resuelve el triangulo: A = ' + A + '&deg;, B = ' + B + '&deg;, a = ' + a + ' cm.<br>' +
            'Da C, b, c y el area (2 decimales).';
          resp = R.varios([
            { etiqueta: 'C (&deg;)', resp: R.numero(C, { dec: 2, tol: 0.05 }) },
            { etiqueta: 'b (cm)', resp: R.numero(b, { dec: 2, tol: 0.02 }) },
            { etiqueta: 'c (cm)', resp: R.numero(c, { dec: 2, tol: 0.02 }) },
            { etiqueta: 'Area (cm&sup2;)', resp: R.numero(area, { dec: 2, tol: 0.05 }) }
          ]);
          pistas = ['Empieza por C = 180&deg; &minus; A &minus; B y luego aplica la ley de senos dos veces.',
            'Para el area usa Area = (1/2)&middot;a&middot;b&middot;sen C.'];
          sol = ['C = 180&deg; &minus; ' + A + '&deg; &minus; ' + B + '&deg; = <b>' + C + '&deg;</b>',
            'b = a&middot;sen B/sen A = <b>' + F.n(b, 2) + '</b>',
            'c = a&middot;sen C/sen A = <b>' + F.n(c, 2) + '</b>',
            'Area = &frac12; &middot; ' + a + ' &middot; ' + F.n(b, 2) + ' &middot; sen ' + C + '&deg; = <b>' + F.n(area, 2) + ' cm&sup2;</b>'];
        } else {
          var ang1 = r.entero(25, 50), ang2 = r.entero(55, 80);
          var base = r.entero(20, 120);
          // dos observadores separados `base`, miden angulos de elevacion ang1 y ang2 al mismo punto
          var Aint = ang1, Bint = 180 - ang2, Cint = 180 - Aint - Bint;
          var dist = base * Math.sin(rad(Bint)) / Math.sin(rad(Cint));
          var altura = dist * Math.sin(rad(ang1));
          enun = 'Dos personas estan alineadas con la base de una torre y separadas ' + base + ' m.<br>' +
            'La mas lejana ve la punta con un angulo de elevacion de ' + ang1 + '&deg; y la mas cercana con ' + ang2 + '&deg;.<br>' +
            '&iquest;Cual es la altura de la torre? (2 decimales)';
          resp = R.numero(altura, { dec: 2, tol: 0.05, unidad: 'm' });
          pistas = ['Forma el triangulo con los dos observadores y la punta de la torre.',
            'En ese triangulo un angulo es ' + ang1 + '&deg;, otro es 180&deg; &minus; ' + ang2 + '&deg; = ' + Bint + '&deg; y el tercero ' + Cint + '&deg;.'];
          sol = ['Angulos del triangulo: ' + Aint + '&deg;, ' + Bint + '&deg; y ' + Cint + '&deg;',
            'Ley de senos para el lado que va del observador cercano a la punta: d = ' + base + ' &middot; sen ' + Aint + '&deg; / sen ' + Cint + '&deg;',
            'Con ese lado, altura = d &middot; sen ' + ang2 + '&deg;',
            'Altura = <b>' + F.n(altura, 2) + ' m</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
