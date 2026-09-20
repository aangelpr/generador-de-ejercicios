/* Sucesiones */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function lista(v) { return v.join(', ') + ', &hellip;'; }

  var extra = {};

  extra.figuras = function (r) {
    var inicio = r.entero(3, 8), paso = r.entero(2, 6), k = r.entero(7, 20);
    var objeto = r.elige(['palillos', 'cuadritos', 'puntos', 'fichas']);
    var val = inicio + (k - 1) * paso;
    return {
      enunciado: 'Con ' + objeto + ' se forma una sucesion de figuras: la figura 1 usa ' + inicio + ' ' + objeto + ',<br>' +
        'y cada figura nueva usa ' + paso + ' mas que la anterior.<br>&iquest;Cuantos ' + objeto + ' usa la figura ' + k + '?',
      respuesta: R.numero(val, { dec: 0 }),
      pistas: ['Es una sucesion aritmetica: el primer termino es ' + inicio + ' y la diferencia es ' + paso + '.',
        'Usa a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d con n = ' + k + '.'],
      solucion: ['a<sub>1</sub> = ' + inicio + ', d = ' + paso,
        'a<sub>' + k + '</sub> = ' + inicio + ' + (' + k + ' &minus; 1)(' + paso + ') = ' + inicio + ' + ' + ((k - 1) * paso),
        'Resultado: <b>' + val + '</b>']
    };
  };

  extra.faltante = function (r) {
    var a1 = r.entero(-6, 12), d = r.enteroNoCero(-8, 9);
    var v = [];
    for (var i = 0; i < 5; i++) v.push(a1 + i * d);
    var hueco = r.entero(1, 3);
    var mostrados = v.map(function (x, i) { return i === hueco ? '__' : String(x); });
    return {
      enunciado: 'Encuentra el termino que falta:<br><span class="big">' + mostrados.join(', ') + '</span>',
      respuesta: R.numero(v[hueco], { dec: 0 }),
      pistas: ['Saca la diferencia con dos terminos consecutivos que si conozcas.',
        'La diferencia es ' + d + '.'],
      solucion: ['Diferencia: ' + v[4] + ' &minus; ' + v[3] + ' = ' + d,
        'El termino que falta es el anterior mas ' + d,
        'Resultado: <b>' + v[hueco] + '</b>']
    };
  };

  EJ.tema({
    id: 'sucesiones',
    materia: 'matematicas',
    grupo: 'Sucesiones y series',
    nombre: 'Sucesiones',
    descripcion: 'Detectar el patron, calcular el siguiente termino y encontrar el termino general.',
    formulario: 'Diferencia constante &rArr; a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d (lineal en n)<br>' +
      'Razon constante &rArr; a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup><br>' +
      'Segunda diferencia constante &rArr; a<sub>n</sub> es de segundo grado en n',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, v = [], i;

      if (dif === 'facil') {
        var t = r.subtema([
          ['aritmetica', 'Siguiente termino (aritmetica)'],
          ['geometrica', 'Siguiente termino (geometrica)'],
          ['cuadrados', 'Patron de cuadrados'],
          ['faltante', 'Termino que falta'],
          ['figuras', 'Sucesion de figuras']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'aritmetica') {
          var a1 = r.entero(-9, 12), d = r.enteroNoCero(-7, 9);
          for (i = 0; i < 5; i++) v.push(a1 + i * d);
          guiaDelPaso = EJ.guia.siguienteTermino(v, d);
          enun = 'Escribe el siguiente termino de la sucesion:<br><span class="big">' + lista(v) + '</span>';
          resp = R.numero(a1 + 5 * d, { dec: 0 });
          pistas = ['Fijate en la diferencia entre terminos consecutivos.',
            'La diferencia siempre es ' + d + ', asi que suma ' + d + ' al ultimo termino.'];
          sol = ['Diferencia: ' + v[1] + ' &minus; ' + v[0] + ' = ' + d + ' (constante)',
            'Siguiente: ' + v[4] + ' + (' + d + ') = <b>' + (a1 + 5 * d) + '</b>'];
        } else if (t === 'geometrica') {
          var g1 = r.elige([1, 2, 3, 5]), q = r.elige([2, 3, -2]);
          for (i = 0; i < 5; i++) v.push(g1 * Math.pow(q, i));
          enun = 'Escribe el siguiente termino de la sucesion:<br><span class="big">' + lista(v) + '</span>';
          resp = R.numero(g1 * Math.pow(q, 5), { dec: 0 });
          pistas = ['Aqui no se suma: se multiplica. Divide un termino entre el anterior.',
            'La razon es ' + q + '. Multiplica el ultimo termino por ' + q + '.'];
          sol = ['Razon: ' + v[1] + ' &divide; ' + v[0] + ' = ' + q,
            'Siguiente: ' + v[4] + ' &middot; (' + q + ') = <b>' + (g1 * Math.pow(q, 5)) + '</b>'];
        } else {
          var k = r.entero(0, 3);
          for (i = 1; i <= 5; i++) v.push(i * i + k);
          enun = 'Escribe el siguiente termino de la sucesion:<br><span class="big">' + lista(v) + '</span>';
          resp = R.numero(36 + k, { dec: 0 });
          pistas = ['Las diferencias no son constantes: crecen de 2 en 2. Piensa en cuadrados.',
            'Son los cuadrados 1, 4, 9, 16, 25' + (k ? ' sumandoles ' + k : '') + '.'];
          sol = ['Cada termino es n' + F.sup(2) + (k ? ' + ' + k : ''),
            'Para n = 6: 6' + F.sup(2) + (k ? ' + ' + k : '') + ' = <b>' + (36 + k) + '</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['generalLineal', 'Termino general lineal'],
          ['alternada', 'Signos alternados'],
          ['recursiva', 'Regla recursiva'],
          ['figuras', 'Sucesion de figuras']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'generalLineal') {
          var m = r.enteroNoCero(-6, 8), b = r.entero(-8, 10);
          for (i = 1; i <= 5; i++) v.push(m * i + b);
          enun = 'Encuentra el termino general a<sub>n</sub> de la sucesion:<br><span class="big">' + lista(v) + '</span>';
          resp = R.expresion('(' + m + ')*n+(' + b + ')', {
            vars: ['n'], enteros: true, mostrar: 'a<sub>n</sub> = ' + F.poli([m, b], 'n'),
            ayuda: 'Escribe la formula en terminos de n, por ejemplo 3n-1.'
          });
          pistas = ['La diferencia es constante, asi que a<sub>n</sub> es de la forma mn + b.',
            'La diferencia es ' + m + ', asi que a<sub>n</sub> = ' + m + 'n + b. Usa a<sub>1</sub> = ' + v[0] + ' para hallar b.'];
          sol = ['Diferencia constante d = ' + m + ' &rArr; a<sub>n</sub> = ' + m + 'n + b',
            'Con n = 1: ' + m + '(1) + b = ' + v[0] + ' &rArr; b = ' + b,
            'Termino general: <b>a<sub>n</sub> = ' + F.poli([m, b], 'n') + '</b>'];
        } else if (t2 === 'alternada') {
          var base = r.elige([1, 2, 3]), paso = r.entero(2, 5);
          for (i = 0; i < 6; i++) v.push(Math.pow(-1, i) * (base + i * paso));
          enun = 'Escribe los dos siguientes terminos de la sucesion:<br><span class="big">' + lista(v) + '</span>';
          var s6 = Math.pow(-1, 6) * (base + 6 * paso), s7 = Math.pow(-1, 7) * (base + 7 * paso);
          resp = R.lista([s6, s7], { ayuda: 'Escribe los dos valores separados por coma.' });
          pistas = ['Separa el problema en dos: el signo por un lado y el valor absoluto por otro.',
            'Los valores absolutos van de ' + paso + ' en ' + paso + ' y el signo se alterna.'];
          sol = ['Valores absolutos: ' + base + ', ' + (base + paso) + ', ' + (base + 2 * paso) + ', &hellip; suben de ' + paso + ' en ' + paso,
            'El signo se alterna empezando en ' + (v[0] > 0 ? '+' : '&minus;'),
            'Siguientes: <b>' + s6 + '</b> y <b>' + s7 + '</b>'];
        } else {
          var p = r.entero(1, 4), q2 = r.entero(1, 4);
          v = [p, q2];
          for (i = 2; i < 6; i++) v.push(v[i - 1] + v[i - 2]);
          enun = 'En esta sucesion cada termino es la suma de los dos anteriores:<br><span class="big">' + lista(v) + '</span><br>&iquest;Cual es el siguiente termino?';
          resp = R.numero(v[4] + v[5], { dec: 0 });
          pistas = ['Suma los dos ultimos terminos que ves.',
            v[4] + ' + ' + v[5] + ' = ?'];
          sol = ['Regla: a<sub>n</sub> = a<sub>n&minus;1</sub> + a<sub>n&minus;2</sub>',
            v[4] + ' + ' + v[5] + ' = <b>' + (v[4] + v[5]) + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['cuadratica', 'Termino general cuadratico'],
          ['generalGeom', 'Termino general geometrico'],
          ['mixta', 'Sucesion recursiva']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'cuadratica') {
          var A = r.elige([1, 2, 3]), B = r.entero(-4, 4), C = r.entero(-6, 6);
          for (i = 1; i <= 5; i++) v.push(A * i * i + B * i + C);
          enun = 'Encuentra el termino general a<sub>n</sub> de la sucesion:<br><span class="big">' + lista(v) + '</span>';
          resp = R.expresion('(' + A + ')*n^2+(' + B + ')*n+(' + C + ')', {
            vars: ['n'], enteros: true, mostrar: 'a<sub>n</sub> = ' + F.poli([A, B, C], 'n')
          });
          pistas = ['Calcula las primeras diferencias y luego las diferencias de esas diferencias.',
            'La segunda diferencia es ' + (2 * A) + ', y siempre vale 2a, asi que a = ' + A + '. Plantea a<sub>n</sub> = ' + A + 'n&sup2; + bn + c.'];
          sol = ['Primeras diferencias: ' + [v[1] - v[0], v[2] - v[1], v[3] - v[2], v[4] - v[3]].join(', '),
            'Segundas diferencias: ' + (2 * A) + ' (constante) &rArr; es cuadratica con a = ' + (2 * A) + '/2 = ' + A,
            'Con n = 1 y n = 2 se despejan b = ' + B + ' y c = ' + C,
            'Termino general: <b>a<sub>n</sub> = ' + F.poli([A, B, C], 'n') + '</b>'];
        } else if (t3 === 'generalGeom') {
          var g = r.elige([2, 3, 5]), rz = r.elige([2, 3]);
          for (i = 0; i < 5; i++) v.push(g * Math.pow(rz, i));
          enun = 'Encuentra el termino general a<sub>n</sub> (con n = 1 para el primer termino) de:<br><span class="big">' + lista(v) + '</span>';
          resp = R.expresion(g + '*' + rz + '^(n-1)', {
            vars: ['n'], enteros: true, mostrar: 'a<sub>n</sub> = ' + g + '&middot;' + rz + F.sup('n&minus;1')
          });
          pistas = ['Cada termino se obtiene multiplicando por una razon fija r.',
            'a<sub>1</sub> = ' + g + ' y r = ' + rz + '. La formula es a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup>.'];
          sol = ['Razon: r = ' + v[1] + '/' + v[0] + ' = ' + rz,
            'a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup>',
            'Resultado: <b>a<sub>n</sub> = ' + g + '&middot;' + rz + F.sup('n&minus;1') + '</b>'];
        } else {
          var c0 = r.entero(1, 5), mm = r.entero(2, 4), bb = r.entero(1, 6);
          v = [c0];
          for (i = 1; i < 5; i++) v.push(mm * v[i - 1] + bb);
          enun = 'La sucesion cumple a<sub>n</sub> = ' + mm + 'a<sub>n&minus;1</sub> + ' + bb + ' con a<sub>1</sub> = ' + c0 + ':<br><span class="big">' + lista(v) + '</span><br>Calcula a<sub>7</sub>.';
          var a6 = mm * v[4] + bb, a7 = mm * a6 + bb;
          resp = R.numero(a7, { dec: 0 });
          pistas = ['Aplica la regla paso a paso: primero a<sub>6</sub> y luego a<sub>7</sub>.',
            'a<sub>6</sub> = ' + mm + '(' + v[4] + ') + ' + bb + ' = ' + a6 + '.'];
          sol = ['a<sub>6</sub> = ' + mm + '(' + v[4] + ') + ' + bb + ' = ' + a6,
            'a<sub>7</sub> = ' + mm + '(' + a6 + ') + ' + bb + ' = <b>' + a7 + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
