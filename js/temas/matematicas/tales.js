/* Teorema de Tales */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  /* Dos rectas cortadas por tres paralelas. */
  function figuraParalelas(a, b, c, d) {
    return F.svg(260, 160,
      '<line x1="20" y1="20" x2="150" y2="140"/>' +
      '<line x1="240" y1="20" x2="150" y2="140"/>' +
      '<line x1="30" y1="30" x2="232" y2="30" stroke-dasharray="4 3"/>' +
      '<line x1="70" y1="75" x2="205" y2="75" stroke-dasharray="4 3"/>' +
      '<line x1="110" y1="120" x2="178" y2="120" stroke-dasharray="4 3"/>' +
      F.txtSvg(24, 58, a) + F.txtSvg(60, 105, b) +
      F.txtSvg(225, 58, c) + F.txtSvg(200, 105, d));
  }

  /* Triangulos semejantes encajados. */
  function figuraTriangulo(a, b, c, d) {
    return F.svg(250, 160,
      '<path d="M20 140 L230 140 L20 20 Z"/>' +
      '<line x1="20" y1="80" x2="125" y2="80" stroke-dasharray="4 3"/>' +
      F.txtSvg(4, 55, a) + F.txtSvg(4, 115, b) +
      F.txtSvg(60, 74, c) + F.txtSvg(110, 155, d));
  }

  var extra = {};

  extra.tercerSegmento = function (r) {
    var k = r.elige([1.5, 2, 2.5, 3]);
    var ad = r.entero(2, 10), ae = r.entero(2, 10);
    var db = ad * k, ec = ae * k;
    while (Math.abs(db - Math.round(db)) > 1e-9) { ad = r.entero(2, 10); db = ad * k; }
    return {
      enunciado: 'En un triangulo ABC se traza DE paralela a la base BC.<br>' +
        'Si AD = ' + ad + ', DB = ' + F.n(db) + ' y AE = ' + ae + ', &iquest;cuanto mide EC? (2 decimales)' +
        figuraTriangulo('AD=' + ad, 'DB=' + F.n(db), 'AE=' + ae, 'EC=?'),
      respuesta: R.numero(ec, { dec: 2, tol: 0.01 }),
      pistas: ['Por el teorema de Tales: AD/DB = AE/EC.',
        F.frac(ad, F.n(db)) + ' = ' + F.frac(ae, 'EC') + '; despeja multiplicando en cruz.'],
      solucion: ['AD/DB = AE/EC',
        'EC = (DB &middot; AE) / AD = (' + F.n(db) + ' &middot; ' + ae + ') / ' + ad,
        'EC = <b>' + F.n(ec, 2) + '</b>']
    };
  };

  extra.perimetros = function (r) {
    var a = r.entero(2, 6), b = a + r.entero(1, 5);
    var perimetroChico = r.entero(3, 20) * a;
    var perimetroGrande = perimetroChico * b / a;
    return {
      enunciado: 'Dos poligonos son semejantes con razon ' + a + ' : ' + b + '.<br>' +
        'El perimetro del menor es ' + perimetroChico + ' cm. &iquest;Cuanto mide el perimetro del mayor? (2 decimales)',
      respuesta: R.numero(perimetroGrande, { dec: 2, tol: 0.01, unidad: 'cm' }),
      pistas: ['En figuras semejantes los perimetros estan en la MISMA razon que los lados.',
        F.frac(a, b) + ' = ' + F.frac(perimetroChico, 'P') + '.'],
      solucion: ['Los perimetros guardan la razon ' + a + ':' + b,
        'P = ' + perimetroChico + ' &middot; ' + b + ' / ' + a,
        'P = <b>' + F.n(perimetroGrande, 2) + ' cm</b>']
    };
  };

  extra.razonAreas = function (r) {
    var a = r.entero(2, 5), b = a + r.entero(1, 4);
    var areaChica = r.entero(4, 40);
    var areaGrande = areaChica * (b * b) / (a * a);
    return {
      enunciado: 'Dos figuras son semejantes con razon de semejanza ' + a + ' : ' + b + '.<br>' +
        'Si el area de la menor es ' + areaChica + ' cm&sup2;, &iquest;cual es el area de la mayor? (2 decimales)',
      respuesta: R.numero(areaGrande, { dec: 2, tol: 0.02, unidad: 'cm&sup2;' }),
      pistas: ['Cuidado: las areas NO estan en la razon k, sino en k&sup2;.',
        'k = ' + b + '/' + a + ', asi que k&sup2; = ' + (b * b) + '/' + (a * a) + '.'],
      solucion: ['Razon de semejanza k = ' + b + '/' + a,
        'Las areas van como k&sup2; = ' + (b * b) + '/' + (a * a),
        'Area mayor = ' + areaChica + ' &middot; ' + (b * b) + '/' + (a * a) + ' = <b>' + F.n(areaGrande, 2) + ' cm&sup2;</b>']
    };
  };

  EJ.tema({
    id: 'tales',
    materia: 'matematicas',
    grupo: 'Geometria y trigonometria',
    nombre: 'Teorema de Tales',
    descripcion: 'Segmentos proporcionales entre paralelas y triangulos semejantes.',
    formulario: 'Si dos rectas son cortadas por paralelas: a/b = c/d<br>' +
      'En triangulos semejantes los lados correspondientes son proporcionales y los angulos son iguales.',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, a, b, c, x, k;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['paralelas', 'Segmentos entre paralelas'],
          ['tercerSegmento', 'Paralela dentro de un triangulo']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        k = r.elige([1.5, 2, 2.5, 3]);
        a = r.entero(2, 12); b = r.entero(2, 12);
        c = a * k; x = b * k;
        while (Math.abs(c - Math.round(c)) > 1e-9) { a = r.entero(2, 12); c = a * k; }
        guiaDelPaso = EJ.guia.tales(a, b, c);
        enun = 'Tres rectas paralelas cortan a dos rectas. Encuentra el valor de x:' +
          figuraParalelas(a, b, F.n(c), 'x');
        resp = R.numero(x, { dec: 2, tol: 0.01 });
        pistas = ['Por el teorema de Tales los segmentos correspondientes son proporcionales: ' + a + '/' + b + ' = ' + F.n(c) + '/x.',
          'Multiplica en cruz: ' + a + 'x = ' + b + ' &middot; ' + F.n(c) + '.'];
        sol = ['Planteo la proporcion: ' + F.frac(a, b) + ' = ' + F.frac(F.n(c), 'x'),
          'Producto cruzado: ' + a + 'x = ' + b + ' &middot; ' + F.n(c) + ' = ' + F.n(b * c),
          'x = ' + F.n(b * c) + ' / ' + a + ' = <b>' + F.n(x, 2) + '</b>'];
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['semejantes', 'Triangulos semejantes'],
          ['sombra', 'Problema de sombras'],
          ['perimetros', 'Perimetros de figuras semejantes'],
          ['tercerSegmento', 'Paralela dentro de un triangulo']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'semejantes') {
          a = r.entero(3, 10); b = r.entero(2, 9);
          k = r.elige([1.5, 2, 2.5, 3]);
          c = a * k;
          while (Math.abs(c - Math.round(c)) > 1e-9) { a = r.entero(3, 10); c = a * k; }
          x = b * k;
          enun = 'En la figura, la linea punteada es paralela a la base. Si los segmentos miden lo indicado, encuentra x:' +
            figuraTriangulo(a, F.n(c - a), b, 'x');
          resp = R.numero(x, { dec: 2, tol: 0.01 });
          pistas = ['La paralela crea un triangulo semejante al grande: los lados guardan la misma razon.',
            'Razon = lado grande / lado chico = ' + F.n(c) + '/' + a + ' = ' + F.n(k) + '.'];
          sol = ['Los dos triangulos son semejantes (tienen los mismos angulos)',
            'Razon de semejanza: ' + F.n(c) + ' / ' + a + ' = ' + F.n(k),
            'x = ' + b + ' &middot; ' + F.n(k) + ' = <b>' + F.n(x, 2) + '</b>'];
        } else {
          var hPersona = r.elige([1.5, 1.6, 1.7, 1.8]);
          var sPersona = r.entero(2, 5);
          var sArbol = r.entero(6, 25);
          x = hPersona * sArbol / sPersona;
          enun = 'Una persona de ' + hPersona + ' m proyecta una sombra de ' + sPersona + ' m.<br>' +
            'A la misma hora, un arbol proyecta una sombra de ' + sArbol + ' m.<br>&iquest;Cuanto mide el arbol? (2 decimales)';
          resp = R.numero(x, { dec: 2, tol: 0.01, unidad: 'm' });
          pistas = ['Los rayos del sol forman triangulos semejantes: altura/sombra es la misma para los dos.',
            F.frac(hPersona, sPersona) + ' = ' + F.frac('h', sArbol) + '.'];
          sol = ['Proporcion: altura/sombra es constante',
            F.frac(hPersona, sPersona) + ' = ' + F.frac('h', sArbol),
            'h = ' + hPersona + ' &middot; ' + sArbol + ' / ' + sPersona + ' = <b>' + F.n(x, 2) + ' m</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['algebraico', 'Proporcion con incognita'],
          ['dosIncognitas', 'Resolver un triangulo semejante'],
          ['razonAreas', 'Razon de areas']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'algebraico') {
          // (x + p)/(x + q) = m/n  con solucion entera
          var sol0 = r.entero(2, 12);
          var p = r.entero(1, 8), q = r.entero(1, 8);
          while (q === p) q = r.entero(1, 8);
          var m = sol0 + p, n = sol0 + q;
          var g = F.mcd(m, n);
          enun = 'Dos rectas son cortadas por paralelas y los segmentos correspondientes cumplen:<br>' +
            '<span class="big">' + F.frac('x + ' + p, 'x + ' + q) + ' = ' + F.frac(m / g, n / g) + '</span><br>Encuentra x.';
          resp = R.numero(sol0, { dec: 2, tol: 0.01 });
          pistas = ['Multiplica en cruz para quitar las fracciones.',
            (n / g) + '(x + ' + p + ') = ' + (m / g) + '(x + ' + q + ').'];
          sol = ['Producto cruzado: ' + (n / g) + '(x + ' + p + ') = ' + (m / g) + '(x + ' + q + ')',
            (n / g) + 'x + ' + (n / g * p) + ' = ' + (m / g) + 'x + ' + (m / g * q),
            'Agrupo: ' + (n / g - m / g) + 'x = ' + (m / g * q - n / g * p),
            'x = <b>' + sol0 + '</b>'];
        } else {
          k = r.elige([2, 3, 1.5]);
          a = r.entero(3, 9); b = r.entero(3, 9); c = r.entero(3, 9);
          var A2 = a * k, B2 = b * k, C2 = c * k;
          while (Math.abs(A2 - Math.round(A2)) > 1e-9 || Math.abs(B2 - Math.round(B2)) > 1e-9) {
            a = r.entero(3, 9); b = r.entero(3, 9); A2 = a * k; B2 = b * k;
          }
          enun = 'Dos triangulos son semejantes. El primero tiene lados ' + a + ', ' + b + ' y ' + c + ' cm.<br>' +
            'El lado del segundo que corresponde al de ' + a + ' cm mide ' + F.n(A2) + ' cm.<br>' +
            'Encuentra los otros dos lados del segundo triangulo y el perimetro.';
          resp = R.varios([
            { etiqueta: 'Lado ~' + b, resp: R.numero(B2, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'Lado ~' + c, resp: R.numero(C2, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'Perimetro', resp: R.numero(A2 + B2 + C2, { dec: 2, tol: 0.02 }) }
          ]);
          pistas = ['Primero halla la razon de semejanza dividiendo los lados correspondientes conocidos.',
            'Razon = ' + F.n(A2) + ' / ' + a + ' = ' + F.n(k) + '. Multiplica los demas lados por ella.'];
          sol = ['Razon de semejanza: k = ' + F.n(A2) + '/' + a + ' = ' + F.n(k),
            'Lado correspondiente a ' + b + ': ' + b + ' &middot; ' + F.n(k) + ' = <b>' + F.n(B2, 2) + '</b>',
            'Lado correspondiente a ' + c + ': ' + c + ' &middot; ' + F.n(k) + ' = <b>' + F.n(C2, 2) + '</b>',
            'Perimetro: ' + F.n(A2) + ' + ' + F.n(B2) + ' + ' + F.n(C2) + ' = <b>' + F.n(A2 + B2 + C2, 2) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
