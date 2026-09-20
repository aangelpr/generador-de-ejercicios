/* Excentricidad */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  var extra = {};

  extra.comparar = function (r) {
    var a1 = r.entero(5, 15), b1 = r.entero(2, a1 - 1);
    var a2 = r.entero(5, 15), b2 = r.entero(2, a2 - 1);
    var e1 = Math.sqrt(a1 * a1 - b1 * b1) / a1;
    var e2 = Math.sqrt(a2 * a2 - b2 * b2) / a2;
    while (Math.abs(e1 - e2) < 0.05) { b2 = r.entero(2, a2 - 1); e2 = Math.sqrt(a2 * a2 - b2 * b2) / a2; }
    return {
      enunciado: 'Dos elipses:<br>' +
        'A: ' + F.frac('x&sup2;', a1 * a1) + ' + ' + F.frac('y&sup2;', b1 * b1) + ' = 1<br>' +
        'B: ' + F.frac('x&sup2;', a2 * a2) + ' + ' + F.frac('y&sup2;', b2 * b2) + ' = 1<br>' +
        'Calcula las dos excentricidades y di cual elipse se parece mas a una circunferencia (4 decimales).',
      respuesta: R.varios([
        { etiqueta: 'e de A', resp: R.numero(e1, { dec: 4, tol: 0.005 }) },
        { etiqueta: 'e de B', resp: R.numero(e2, { dec: 4, tol: 0.005 }) },
        { etiqueta: 'Mas circular', resp: R.opcion(['Elipse A', 'Elipse B'], e1 < e2 ? 0 : 1) }
      ]),
      pistas: ['Para cada una: c = &radic;<span class="rad">a&sup2; &minus; b&sup2;</span> y luego e = c/a.',
        'Mientras mas CERCA de 0 este la excentricidad, mas redonda es la elipse.'],
      solucion: ['Elipse A: c = &radic;<span class="rad">' + (a1 * a1 - b1 * b1) + '</span> &rArr; e = <b>' + F.n(e1, 4) + '</b>',
        'Elipse B: c = &radic;<span class="rad">' + (a2 * a2 - b2 * b2) + '</span> &rArr; e = <b>' + F.n(e2, 4) + '</b>',
        'La mas circular es la de menor excentricidad: <b>elipse ' + (e1 < e2 ? 'A' : 'B') + '</b>']
    };
  };

  EJ.tema({
    id: 'excentricidad',
    materia: 'matematicas',
    grupo: 'Geometria analitica',
    nombre: 'Excentricidad',
    descripcion: 'Calcular e interpretar la excentricidad de las conicas.',
    formulario: 'e = c/a<br>' +
      'Circunferencia: e = 0 &nbsp;&middot;&nbsp; Elipse: 0 &lt; e &lt; 1 &nbsp;&middot;&nbsp; Parabola: e = 1 &nbsp;&middot;&nbsp; Hiperbola: e &gt; 1<br>' +
      'Elipse: c&sup2; = a&sup2; &minus; b&sup2; &nbsp;&middot;&nbsp; Hiperbola: c&sup2; = a&sup2; + b&sup2;',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, a, b, c, e;

      if (dif === 'facil') {
        var t = r.subtema([
          ['elipseAC', 'Excentricidad con a y c'],
          ['concepto', 'Casos especiales (circulo y parabola)'],
          ['clasifica', 'Clasificar segun e']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'elipseAC') {
          a = r.entero(5, 20); c = r.entero(1, a - 1);
          e = c / a;
          enun = 'Una elipse tiene a = ' + a + ' y c = ' + c + '.<br>Calcula su excentricidad (2 decimales).';
          resp = R.numero(e, { dec: 4, tol: 0.01 });
          pistas = ['La excentricidad siempre es e = c/a.',
            'e = ' + c + '/' + a + '.'];
          sol = ['e = c/a', 'e = ' + c + ' / ' + a + ' = <b>' + F.n(e, 4) + '</b>',
            'Como 0 &lt; e &lt; 1, se confirma que es una elipse'];
        } else if (t === 'concepto') {
          var conicas = [
            { n: 'una circunferencia', e: 0, txt: '0' },
            { n: 'una parabola', e: 1, txt: '1' }
          ];
          var cn = r.elige(conicas);
          enun = '&iquest;Cuanto vale la excentricidad de ' + cn.n + '?';
          resp = R.numero(cn.e, { dec: 2 });
          pistas = ['Piensa en que tan "estirada" esta la curva respecto a un circulo.',
            cn.e === 0 ? 'En la circunferencia los dos focos coinciden en el centro, asi que c = 0.' : 'En la parabola la distancia al foco y a la directriz siempre es la misma.'];
          sol = [cn.e === 0 ? 'En la circunferencia c = 0, asi que e = 0/a = <b>0</b>' : 'Por definicion la parabola cumple e = <b>1</b>'];
        } else {
          var val = r.elige([0, 0.3, 0.55, 0.8, 1, 1.4, 2.2, 3]);
          var tipo = val === 0 ? 'Circunferencia' : val < 1 ? 'Elipse' : val === 1 ? 'Parabola' : 'Hiperbola';
          enun = 'Una conica tiene excentricidad e = ' + val + '. &iquest;De que conica se trata?';
          resp = R.opcion(['Circunferencia', 'Elipse', 'Parabola', 'Hiperbola'], ['Circunferencia', 'Elipse', 'Parabola', 'Hiperbola'].indexOf(tipo));
          pistas = ['e = 0 circunferencia, 0 &lt; e &lt; 1 elipse, e = 1 parabola, e &gt; 1 hiperbola.',
            'Compara ' + val + ' con 0 y con 1.'];
          sol = ['e = ' + val + (val === 0 ? ' es exactamente 0' : val < 1 ? ' esta entre 0 y 1' : val === 1 ? ' es exactamente 1' : ' es mayor que 1'),
            'Se trata de una <b>' + tipo + '</b>'];
        }
      } else if (dif === 'medio') {
        var tm = r.subtema([
          ['elipseEcuacion', 'Excentricidad de una elipse'],
          ['hiperbolaEcuacion', 'Excentricidad de una hiperbola'],
          ['comparar', 'Comparar dos elipses']
        ]);
        if (extra[tm]) return extra[tm](r, dif);
        if (tm === 'elipseEcuacion') {
          a = r.entero(3, 10); b = r.entero(2, a - 1);
          c = Math.sqrt(a * a - b * b); e = c / a;
          guiaDelPaso = EJ.guia.excentricidadElipse(a, b);
          enun = 'Calcula la excentricidad de la elipse <span class="big">' +
            F.frac('x&sup2;', a * a) + ' + ' + F.frac('y&sup2;', b * b) + ' = 1</span> (4 decimales).';
          resp = R.numero(e, { dec: 4, tol: 0.005 });
          pistas = ['Primero saca a y b de los denominadores, luego c&sup2; = a&sup2; &minus; b&sup2;.',
            'c = &radic;<span class="rad">' + (a * a) + ' &minus; ' + (b * b) + '</span> = ' + F.n(c, 4) + '.'];
          sol = ['a&sup2; = ' + (a * a) + ', b&sup2; = ' + (b * b),
            'c&sup2; = ' + (a * a) + ' &minus; ' + (b * b) + ' = ' + (a * a - b * b) + ' &rArr; c = ' + F.n(c, 4),
            'e = c/a = ' + F.n(c, 4) + '/' + a + ' = <b>' + F.n(e, 4) + '</b>'];
        } else {
          a = r.entero(2, 9); b = r.entero(2, 9);
          c = Math.sqrt(a * a + b * b); e = c / a;
          enun = 'Calcula la excentricidad de la hiperbola <span class="big">' +
            F.frac('x&sup2;', a * a) + ' &minus; ' + F.frac('y&sup2;', b * b) + ' = 1</span> (4 decimales).';
          resp = R.numero(e, { dec: 4, tol: 0.005 });
          pistas = ['En la hiperbola c&sup2; = a&sup2; + b&sup2; (se suman).',
            'c = &radic;<span class="rad">' + (a * a) + ' + ' + (b * b) + '</span> = ' + F.n(c, 4) + '.'];
          sol = ['a&sup2; = ' + (a * a) + ', b&sup2; = ' + (b * b),
            'c&sup2; = ' + (a * a + b * b) + ' &rArr; c = ' + F.n(c, 4),
            'e = c/a = <b>' + F.n(e, 4) + '</b> (mayor que 1, como toda hiperbola)'];
        }
      } else {
        var t2 = r.subtema([
          ['despejaC', 'Hallar c y b en una elipse'],
          ['despejaB', 'Hallar c y b en una hiperbola'],
          ['planeta', 'Orbitas (aplicacion)'],
          ['comparar', 'Comparar dos elipses']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'despejaC') {
          a = r.entero(6, 20);
          e = r.elige([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8]);
          c = a * e;
          b = Math.sqrt(a * a - c * c);
          enun = 'Una elipse tiene a = ' + a + ' y excentricidad e = ' + e + '.<br>Encuentra c y b (4 decimales).';
          resp = R.varios([
            { etiqueta: 'c', resp: R.numero(c, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'b', resp: R.numero(b, { dec: 4, tol: 0.01 }) }
          ]);
          pistas = ['De e = c/a despeja c = a&middot;e.',
            'c = ' + a + ' &middot; ' + e + ' = ' + F.n(c, 4) + '. Ahora b&sup2; = a&sup2; &minus; c&sup2;.'];
          sol = ['c = a&middot;e = ' + a + '(' + e + ') = <b>' + F.n(c, 4) + '</b>',
            'b&sup2; = a&sup2; &minus; c&sup2; = ' + (a * a) + ' &minus; ' + F.n(c * c, 4) + ' = ' + F.n(a * a - c * c, 4),
            'b = <b>' + F.n(b, 4) + '</b>'];
        } else if (t2 === 'despejaB') {
          a = r.entero(4, 12);
          e = r.elige([1.25, 1.5, 2, 2.5]);
          c = a * e;
          b = Math.sqrt(c * c - a * a);
          enun = 'Una hiperbola tiene a = ' + a + ' y excentricidad e = ' + e + '.<br>Encuentra c y b (4 decimales).';
          resp = R.varios([
            { etiqueta: 'c', resp: R.numero(c, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'b', resp: R.numero(b, { dec: 4, tol: 0.01 }) }
          ]);
          pistas = ['c = a&middot;e igual que siempre; lo que cambia es la relacion con b.',
            'En la hiperbola b&sup2; = c&sup2; &minus; a&sup2;.'];
          sol = ['c = ' + a + '(' + e + ') = <b>' + F.n(c, 4) + '</b>',
            'b&sup2; = c&sup2; &minus; a&sup2; = ' + F.n(c * c, 4) + ' &minus; ' + (a * a) + ' = ' + F.n(c * c - a * a, 4),
            'b = <b>' + F.n(b, 4) + '</b>'];
        } else {
          var rmax = r.entero(120, 900) / 10;
          var rmin = r.entero(50, Math.floor(rmax * 10) - 20) / 10;
          a = (rmax + rmin) / 2;
          c = a - rmin;
          e = c / a;
          enun = 'La orbita de un planeta es una elipse con el Sol en un foco.<br>' +
            'Su distancia maxima al Sol es ' + F.n(rmax, 1) + ' millones de km y la minima es ' + F.n(rmin, 1) + ' millones de km.<br>' +
            'Calcula a, c y la excentricidad de la orbita (4 decimales).';
          resp = R.varios([
            { etiqueta: 'a', resp: R.numero(a, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'c', resp: R.numero(c, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'e', resp: R.numero(e, { dec: 4, tol: 0.005 }) }
          ]);
          pistas = ['La distancia maxima es a + c y la minima es a &minus; c.',
            'Sumando las dos distancias obtienes 2a; restandolas obtienes 2c.'];
          sol = ['a + c = ' + F.n(rmax, 1) + ' y a &minus; c = ' + F.n(rmin, 1),
            'Sumando: 2a = ' + F.n(rmax + rmin, 2) + ' &rArr; a = <b>' + F.n(a, 4) + '</b>',
            'Restando: 2c = ' + F.n(rmax - rmin, 2) + ' &rArr; c = <b>' + F.n(c, 4) + '</b>',
            'e = c/a = <b>' + F.n(e, 4) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
