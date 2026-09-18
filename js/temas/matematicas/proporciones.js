/* Proporciones y variacion lineal */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  var OBJETOS = ['lapices', 'cuadernos', 'panes', 'litros de pintura', 'kilos de arroz', 'boletos'];
  var TAREAS = ['pintar una barda', 'cosechar el campo', 'llenar el tanque', 'armar los pedidos'];

  var extra = {};

  extra.porcentaje = function (r) {
    var directo = r.bool();
    var pct = r.elige([5, 10, 12, 15, 20, 25, 30, 40, 45, 60, 75, 80]);
    var base = r.entero(2, 40) * 10;
    if (directo) {
      return {
        enunciado: '&iquest;Cuanto es el ' + pct + '% de ' + base + '?',
        respuesta: R.numero(base * pct / 100, { dec: 4 }),
        pistas: ['Un porcentaje es una fraccion con denominador 100: ' + pct + '% = ' + F.frac(pct, 100) + '.',
          'Multiplica ' + base + ' por ' + (pct / 100) + '.'],
        solucion: [pct + '% = ' + pct + '/100 = ' + (pct / 100),
          (pct / 100) + ' &middot; ' + base + ' = <b>' + F.n(base * pct / 100, 4) + '</b>']
      };
    }
    var parte = base * pct / 100;
    return {
      enunciado: '&iquest;Que porcentaje representa ' + F.n(parte, 2) + ' de ' + base + '?',
      respuesta: R.numero(pct, { dec: 4, unidad: '%' }),
      pistas: ['Divide la parte entre el total y multiplica por 100.',
        '(' + F.n(parte, 2) + ' / ' + base + ') &middot; 100'],
      solucion: [F.n(parte, 2) + ' &divide; ' + base + ' = ' + F.n(parte / base, 4),
        'Multiplico por 100: <b>' + pct + '%</b>']
    };
  };

  extra.escala = function (r) {
    var escala = r.elige([1000, 2500, 5000, 10000, 25000, 50000]);
    var cm = r.entero(2, 40) / 2;
    var metros = cm * escala / 100;
    return {
      enunciado: 'Un mapa esta a escala 1 : ' + escala + '.<br>' +
        'Dos ciudades aparecen separadas ' + cm + ' cm en el mapa. &iquest;Cuantos metros hay en la realidad?',
      respuesta: R.numero(metros, { dec: 2, unidad: 'm' }),
      pistas: ['La escala dice que 1 cm del mapa son ' + escala + ' cm reales.',
        cm + ' cm &times; ' + escala + ' = ' + F.n(cm * escala) + ' cm; ahora pasalo a metros dividiendo entre 100.'],
      solucion: ['Distancia real en cm: ' + cm + ' &times; ' + escala + ' = ' + F.n(cm * escala),
        'Paso a metros: ' + F.n(cm * escala) + ' &divide; 100',
        'Resultado: <b>' + F.n(metros, 2) + ' m</b>']
    };
  };

  extra.compuesta = function (r) {
    var o1 = r.entero(3, 10), h1 = r.entero(4, 10), d1 = r.entero(4, 15);
    var o2 = r.entero(3, 12), h2 = r.entero(4, 10);
    var trabajo = o1 * h1 * d1;
    var d2 = trabajo / (o2 * h2);
    return {
      enunciado: 'Si ' + o1 + ' trabajadores, trabajando ' + h1 + ' horas diarias, terminan una obra en ' + d1 + ' dias,<br>' +
        '&iquest;en cuantos dias la terminarian ' + o2 + ' trabajadores que trabajen ' + h2 + ' horas diarias? (4 decimales)',
      respuesta: R.numero(d2, { dec: 4, tol: 0.001, unidad: 'dias' }),
      pistas: ['Calcula el trabajo total en horas-trabajador: se conserva.',
        'Trabajo = ' + o1 + ' &times; ' + h1 + ' &times; ' + d1 + ' = ' + trabajo + ' horas-trabajador.'],
      solucion: ['Trabajo total: ' + o1 + ' &middot; ' + h1 + ' &middot; ' + d1 + ' = ' + trabajo + ' horas-trabajador',
        'Con las nuevas condiciones se avanzan ' + o2 + ' &middot; ' + h2 + ' = ' + (o2 * h2) + ' horas-trabajador por dia',
        'Dias = ' + trabajo + ' &divide; ' + (o2 * h2) + ' = <b>' + F.n(d2, 4) + '</b>']
    };
  };

  EJ.tema({
    id: 'proporciones',
    materia: 'matematicas',
    grupo: 'Aritmetica y algebra basica',
    nombre: 'Proporciones y variacion lineal',
    descripcion: 'Regla de tres directa e inversa, constante de proporcionalidad y funcion lineal.',
    formulario: 'Directa: a/b = c/d &rArr; ad = bc, y = kx con k = y/x<br>' +
      'Inversa: x&middot;y = k &rArr; x<sub>1</sub>y<sub>1</sub> = x<sub>2</sub>y<sub>2</sub><br>' +
      'Variacion lineal: y = mx + b, con m = (y<sub>2</sub> &minus; y<sub>1</sub>)/(x<sub>2</sub> &minus; x<sub>1</sub>)',

    generar: function (dif, r) {
      var a, b, c, d, enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['proporcion', 'Resolver una proporcion'],
          ['reglaDeTres', 'Regla de tres directa'],
          ['porcentaje', 'Porcentajes']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        if (tf === 'proporcion') {
          b = r.entero(2, 12); d = r.entero(2, 12);
          var k = r.entero(2, 9);
          a = b * k; c = d * k;   // a/b = c/d = k
          enun = 'Encuentra el valor de x en la proporcion: ' + F.frac(a, b) + ' = ' + F.frac('x', d);
          resp = R.numero(c, { dec: 0 });
          pistas = ['En una proporcion el producto cruzado es igual: a&middot;d = b&middot;x.',
            'Entonces x = (' + a + ' &middot; ' + d + ') / ' + b + '.'];
          sol = ['Producto cruzado: ' + a + ' &middot; ' + d + ' = ' + b + ' &middot; x',
            'x = ' + (a * d) + ' / ' + b,
            'x = <b>' + c + '</b>'];
        } else {
          var obj = r.elige(OBJETOS);
          var n1 = r.entero(2, 9);
          var precioU = r.entero(3, 25);
          var n2 = r.entero(2, 15);
          enun = 'Si ' + n1 + ' ' + obj + ' cuestan $' + (n1 * precioU) + ', &iquest;cuanto cuestan ' + n2 + ' ' + obj + '?';
          resp = R.numero(n2 * precioU, { unidad: 'pesos', dec: 2 });
          pistas = ['Es una regla de tres directa: mas ' + obj + ', mas dinero.',
            'Precio de uno solo: ' + (n1 * precioU) + ' / ' + n1 + ' = ' + precioU + '.'];
          sol = ['Costo unitario: ' + (n1 * precioU) + ' &divide; ' + n1 + ' = ' + precioU,
            'Para ' + n2 + ': ' + n2 + ' &middot; ' + precioU + ' = <b>$' + (n2 * precioU) + '</b>'];
        }
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['inversa', 'Proporcion inversa'],
          ['constante', 'Variacion directa y constante k'],
          ['escala', 'Escalas'],
          ['porcentaje', 'Porcentajes']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'inversa') {
          var tarea = r.elige(TAREAS);
          var o1 = r.elige([2, 3, 4, 6, 8, 12]);
          var dias = r.elige([6, 8, 12, 18, 24]);
          var total = o1 * dias;
          var o2 = r.elige([2, 3, 4, 6, 8, 12].filter(function (x) { return x !== o1 && total % x === 0; }));
          if (o2 === undefined) o2 = o1 * 2;
          enun = 'Si ' + o1 + ' trabajadores tardan ' + dias + ' dias en ' + tarea + ', &iquest;cuantos dias tardarian ' + o2 + ' trabajadores al mismo ritmo?';
          resp = R.numero(total / o2, { unidad: 'dias', dec: 2 });
          pistas = ['Es proporcion inversa: mas trabajadores, menos dias. El producto trabajadores &times; dias es constante.',
            'k = ' + o1 + ' &middot; ' + dias + ' = ' + total + ' dias-trabajador.'];
          sol = ['Trabajo total: ' + o1 + ' &middot; ' + dias + ' = ' + total + ' dias-trabajador',
            'Con ' + o2 + ' trabajadores: ' + total + ' &divide; ' + o2,
            'Resultado: <b>' + F.n(total / o2, 2) + ' dias</b>'];
        } else {
          var kk = r.enteroNoCero(-6, 9);
          var x1 = r.entero(2, 9);
          var x2 = r.entero(2, 12);
          while (x2 === x1) x2 = r.entero(2, 12);
          enun = 'y varia directamente con x. Si y = ' + (kk * x1) + ' cuando x = ' + x1 + ', encuentra la constante k y el valor de y cuando x = ' + x2 + '.';
          resp = R.varios([
            { etiqueta: 'k', resp: R.numero(kk, { dec: 3 }) },
            { etiqueta: 'y', resp: R.numero(kk * x2, { dec: 3 }) }
          ]);
          pistas = ['Variacion directa significa y = kx, asi que k = y/x.',
            'k = ' + (kk * x1) + ' / ' + x1 + ' = ' + kk + '. Ahora sustituye x = ' + x2 + '.'];
          sol = ['y = kx &rArr; k = y/x = ' + (kk * x1) + '/' + x1 + ' = <b>' + kk + '</b>',
            'La relacion es y = ' + kk + 'x',
            'Para x = ' + x2 + ': y = ' + kk + ' &middot; ' + x2 + ' = <b>' + (kk * x2) + '</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['lineal', 'Variacion lineal (y = mx + b)'],
          ['reparto', 'Reparto proporcional'],
          ['compuesta', 'Regla de tres compuesta']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'lineal') {
          var m = r.enteroNoCero(-5, 6);
          var bb = r.entero(-9, 9);
          a = r.entero(1, 6); b = a + r.entero(1, 5);
          var y1 = m * a + bb, y2 = m * b + bb;
          var x0 = r.entero(7, 15);
          enun = 'y varia linealmente con x. Se sabe que y = ' + y1 + ' cuando x = ' + a + ', y que y = ' + y2 + ' cuando x = ' + b + '.<br>' +
            'Encuentra la pendiente m, la ordenada al origen b y el valor de y cuando x = ' + x0 + '.';
          resp = R.varios([
            { etiqueta: 'm', resp: R.numero(m, { dec: 3 }) },
            { etiqueta: 'b', resp: R.numero(bb, { dec: 3 }) },
            { etiqueta: 'y(' + x0 + ')', resp: R.numero(m * x0 + bb, { dec: 3 }) }
          ]);
          pistas = ['La pendiente es el cambio de y entre el cambio de x: m = (y&#8322; &minus; y&#8321;)/(x&#8322; &minus; x&#8321;).',
            'm = (' + y2 + ' &minus; ' + y1 + ')/(' + b + ' &minus; ' + a + ') = ' + m + '. Con m sustituye un punto para hallar b.'];
          sol = ['m = (' + y2 + ' &minus; ' + y1 + ') / (' + b + ' &minus; ' + a + ') = ' + (y2 - y1) + '/' + (b - a) + ' = <b>' + m + '</b>',
            'Sustituyo el punto (' + a + ', ' + y1 + '): ' + y1 + ' = ' + m + '(' + a + ') + b &rArr; b = <b>' + bb + '</b>',
            'La recta es y = ' + F.poli([m, bb], 'x'),
            'y(' + x0 + ') = ' + m + '(' + x0 + ') + ' + bb + ' = <b>' + (m * x0 + bb) + '</b>'];
        } else {
          var p1 = r.entero(2, 6), p2 = r.entero(2, 6), p3 = r.entero(2, 6);
          var u = r.entero(50, 400);
          var T = (p1 + p2 + p3) * u;
          enun = 'Se reparten $' + T + ' entre tres personas de forma directamente proporcional a ' + p1 + ', ' + p2 + ' y ' + p3 + '.<br>&iquest;Cuanto le toca a cada una?';
          resp = R.varios([
            { etiqueta: 'Parte de ' + p1, resp: R.numero(p1 * u, { dec: 2 }) },
            { etiqueta: 'Parte de ' + p2, resp: R.numero(p2 * u, { dec: 2 }) },
            { etiqueta: 'Parte de ' + p3, resp: R.numero(p3 * u, { dec: 2 }) }
          ]);
          pistas = ['Suma las partes y divide el total entre esa suma: eso vale cada parte.',
            'Suma = ' + (p1 + p2 + p3) + ', asi que cada parte vale ' + T + ' / ' + (p1 + p2 + p3) + ' = ' + u + '.'];
          sol = ['Suma de las partes: ' + p1 + ' + ' + p2 + ' + ' + p3 + ' = ' + (p1 + p2 + p3),
            'Valor de cada parte: ' + T + ' &divide; ' + (p1 + p2 + p3) + ' = ' + u,
            'Reparto: ' + p1 + '&middot;' + u + ' = <b>' + (p1 * u) + '</b>, ' + p2 + '&middot;' + u + ' = <b>' + (p2 * u) + '</b>, ' + p3 + '&middot;' + u + ' = <b>' + (p3 * u) + '</b>'];
        }
      }

      return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
