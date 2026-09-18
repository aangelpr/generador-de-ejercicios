/* Probabilidad y teoria de conjuntos */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function comb(n, k) {
    if (k < 0 || k > n) return 0;
    var res = 1;
    for (var i = 1; i <= k; i++) res = res * (n - k + i) / i;
    return Math.round(res);
  }

  var extra = {};

  function factorial(n) { var f = 1; for (var i = 2; i <= n; i++) f *= i; return f; }

  extra.conteo = function (r) {
    var n = r.entero(5, 9), k = r.entero(2, 4);
    var perm = factorial(n) / factorial(n - k);
    var comb2 = comb(n, k);
    return {
      enunciado: 'De un grupo de ' + n + ' personas:<br>' +
        '&iquest;de cuantas formas se pueden formar una fila de ' + k + ' personas (importa el orden)<br>' +
        'y de cuantas se puede escoger un equipo de ' + k + ' (no importa el orden)?',
      respuesta: R.varios([
        { etiqueta: 'Fila (permutaciones)', resp: R.numero(perm, { dec: 0 }) },
        { etiqueta: 'Equipo (combinaciones)', resp: R.numero(comb2, { dec: 0 }) }
      ]),
      pistas: ['Si el orden importa son permutaciones: P(n, k) = n!/(n &minus; k)!.',
        'Si el orden NO importa son combinaciones: C(n, k) = n!/(k!(n &minus; k)!), que es P(n,k) dividido entre ' + k + '!.'],
      solucion: ['P(' + n + ', ' + k + ') = ' + n + '!/' + (n - k) + '! = <b>' + perm + '</b>',
        'C(' + n + ', ' + k + ') = P(' + n + ', ' + k + ') / ' + k + '! = ' + perm + '/' + factorial(k),
        'C(' + n + ', ' + k + ') = <b>' + comb2 + '</b>']
    };
  };

  extra.bayes = function (r) {
    var p1 = r.elige([40, 50, 60, 70]) / 100;
    var p2 = 1 - p1;
    var d1 = r.entero(2, 8) / 100;
    var d2 = r.entero(2, 8) / 100;
    while (Math.abs(d1 - d2) < 0.005) d2 = r.entero(2, 8) / 100;
    var total = p1 * d1 + p2 * d2;
    var post = p1 * d1 / total;
    return {
      enunciado: 'Una fabrica tiene dos maquinas. La maquina A produce el ' + F.n(p1 * 100) + '% de las piezas y la B el ' + F.n(p2 * 100) + '%.<br>' +
        'El ' + F.n(d1 * 100) + '% de las piezas de A salen defectuosas y el ' + F.n(d2 * 100) + '% de las de B.<br>' +
        'Se toma una pieza al azar: &iquest;cual es la probabilidad de que sea defectuosa,<br>' +
        'y si resulto defectuosa, cual es la probabilidad de que venga de la maquina A? (4 decimales)',
      respuesta: R.varios([
        { etiqueta: 'P(defectuosa)', resp: R.numero(total, { dec: 4, tol: 0.001 }) },
        { etiqueta: 'P(A | defectuosa)', resp: R.numero(post, { dec: 4, tol: 0.001 }) }
      ]),
      pistas: ['Probabilidad total: P(D) = P(A)P(D|A) + P(B)P(D|B).',
        'Bayes: P(A|D) = P(A)P(D|A) / P(D).'],
      solucion: ['P(D) = ' + p1 + '(' + d1 + ') + ' + F.n(p2, 2) + '(' + d2 + ')',
        'P(D) = ' + F.n(p1 * d1, 5) + ' + ' + F.n(p2 * d2, 5) + ' = <b>' + F.n(total, 4) + '</b>',
        'P(A|D) = ' + F.n(p1 * d1, 5) + ' / ' + F.n(total, 5),
        'P(A|D) = <b>' + F.n(post, 4) + '</b>']
    };
  };

  EJ.tema({
    id: 'probabilidad',
    materia: 'matematicas',
    grupo: 'Probabilidad y estadistica',
    nombre: 'Probabilidad y teoria de conjuntos',
    descripcion: 'Probabilidad clasica, union e interseccion, complemento, condicional e independencia.',
    formulario: 'P(A) = casos favorables / casos totales &nbsp;&middot;&nbsp; P(A<sup>c</sup>) = 1 &minus; P(A)<br>' +
      'P(A &cup; B) = P(A) + P(B) &minus; P(A &cap; B)<br>' +
      'Condicional: P(A|B) = P(A &cap; B)/P(B) &nbsp;&middot;&nbsp; Independientes: P(A &cap; B) = P(A)P(B)<br>' +
      'Combinaciones: C(n, k) = n! / (k!(n &minus; k)!)',

    generar: function (dif, r) {
      var enun, resp, pistas, sol, a, b, c, n, k;

      if (dif === 'facil') {
        var t = r.subtema([
          ['dado', 'Lanzamiento de un dado'],
          ['urna', 'Canicas en una urna'],
          ['baraja', 'Cartas de una baraja']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'dado') {
          var evento = r.elige([
            { txt: 'salga un numero par', fav: 3 },
            { txt: 'salga un numero mayor que 4', fav: 2 },
            { txt: 'salga un numero primo', fav: 3 },
            { txt: 'salga un multiplo de 3', fav: 2 },
            { txt: 'no salga el 6', fav: 5 }
          ]);
          enun = 'Se lanza un dado de 6 caras. &iquest;Cual es la probabilidad de que ' + evento.txt + '?';
          resp = R.fraccion(evento.fav, 6);
          pistas = ['Cuenta cuantos resultados cumplen la condicion de los 6 posibles.',
            'Hay ' + evento.fav + ' casos favorables de 6.'];
          sol = ['Casos totales: 6',
            'Casos favorables: ' + evento.fav,
            'P = ' + F.frac(evento.fav, 6) + ' = <b>' + F.fracSimp(evento.fav, 6) + '</b>'];
        } else if (t === 'urna') {
          a = r.entero(2, 8); b = r.entero(2, 8); c = r.entero(2, 8);
          var total = a + b + c;
          var color = r.elige([{ n: 'rojas', v: a }, { n: 'azules', v: b }, { n: 'verdes', v: c }]);
          enun = 'Una urna tiene ' + a + ' canicas rojas, ' + b + ' azules y ' + c + ' verdes.<br>' +
            'Se saca una al azar. &iquest;Cual es la probabilidad de que sea ' + color.n + '?';
          resp = R.fraccion(color.v, total);
          pistas = ['El total de canicas es ' + a + ' + ' + b + ' + ' + c + ' = ' + total + '.',
            'Favorables: ' + color.v + '.'];
          sol = ['Total = ' + total + ' canicas',
            'Favorables = ' + color.v,
            'P = ' + F.frac(color.v, total) + ' = <b>' + F.fracSimp(color.v, total) + '</b>'];
        } else {
          var ev = r.elige([
            { txt: 'sea un as', fav: 4 },
            { txt: 'sea de corazones', fav: 13 },
            { txt: 'sea una figura (J, Q o K)', fav: 12 },
            { txt: 'sea roja', fav: 26 },
            { txt: 'sea el as de picas', fav: 1 }
          ]);
          enun = 'De una baraja inglesa de 52 cartas se saca una al azar.<br>&iquest;Cual es la probabilidad de que ' + ev.txt + '?';
          resp = R.fraccion(ev.fav, 52);
          pistas = ['La baraja tiene 52 cartas: 4 palos de 13 cartas cada uno.',
            'Casos favorables: ' + ev.fav + '.'];
          sol = ['Casos totales: 52',
            'Casos favorables: ' + ev.fav,
            'P = ' + F.frac(ev.fav, 52) + ' = <b>' + F.fracSimp(ev.fav, 52) + '</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['union', 'Union de eventos'],
          ['conjuntos', 'Diagrama de Venn'],
          ['complemento', 'Complemento'],
          ['dosDados', 'Dos dados'],
          ['conteo', 'Permutaciones y combinaciones']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'union') {
          var pa = r.entero(2, 6) / 10, pb = r.entero(2, 6) / 10;
          var pab = r.entero(1, Math.round(Math.min(pa, pb) * 10)) / 10;
          var pu = pa + pb - pab;
          enun = 'Si P(A) = ' + pa + ', P(B) = ' + pb + ' y P(A &cap; B) = ' + pab + ',<br>calcula P(A &cup; B) (4 decimales).';
          resp = R.numero(pu, { dec: 4, tol: 0.001 });
          pistas = ['P(A &cup; B) = P(A) + P(B) &minus; P(A &cap; B).',
            'Se resta la interseccion porque si no se cuenta dos veces.'];
          sol = ['P(A &cup; B) = ' + pa + ' + ' + pb + ' &minus; ' + pab,
            'P(A &cup; B) = <b>' + F.n(pu, 4) + '</b>'];
        } else if (t2 === 'conjuntos') {
          var soloA = r.entero(3, 15), soloB = r.entero(3, 15), ambos = r.entero(2, 10), ninguno = r.entero(1, 8);
          var N = soloA + soloB + ambos + ninguno;
          enun = 'En un grupo de ' + N + ' estudiantes: ' + (soloA + ambos) + ' llevan matematicas, ' +
            (soloB + ambos) + ' llevan fisica y ' + ambos + ' llevan las dos.<br>' +
            '&iquest;Cuantos llevan solo matematicas, cuantos solo fisica y cuantos ninguna de las dos?';
          resp = R.varios([
            { etiqueta: 'Solo matematicas', resp: R.numero(soloA, { dec: 0 }) },
            { etiqueta: 'Solo fisica', resp: R.numero(soloB, { dec: 0 }) },
            { etiqueta: 'Ninguna', resp: R.numero(ninguno, { dec: 0 }) }
          ]);
          pistas = ['Dibuja un diagrama de Venn y empieza SIEMPRE por la interseccion.',
            'Solo matematicas = ' + (soloA + ambos) + ' &minus; ' + ambos + '.'];
          sol = ['Interseccion: ' + ambos,
            'Solo matematicas = ' + (soloA + ambos) + ' &minus; ' + ambos + ' = <b>' + soloA + '</b>',
            'Solo fisica = ' + (soloB + ambos) + ' &minus; ' + ambos + ' = <b>' + soloB + '</b>',
            'Al menos una: ' + soloA + ' + ' + soloB + ' + ' + ambos + ' = ' + (soloA + soloB + ambos),
            'Ninguna = ' + N + ' &minus; ' + (soloA + soloB + ambos) + ' = <b>' + ninguno + '</b>'];
        } else if (t2 === 'complemento') {
          a = r.entero(2, 9); b = r.entero(3, 12);
          var totalC = a + b;
          enun = 'En una caja hay ' + a + ' focos defectuosos y ' + b + ' buenos.<br>' +
            'Se saca uno al azar. &iquest;Cual es la probabilidad de que NO sea defectuoso?';
          resp = R.fraccion(b, totalC);
          pistas = ['Puedes contar los buenos directamente, o usar P(no A) = 1 &minus; P(A).',
            'P(defectuoso) = ' + F.frac(a, totalC) + '.'];
          sol = ['P(defectuoso) = ' + F.frac(a, totalC),
            'P(no defectuoso) = 1 &minus; ' + F.frac(a, totalC) + ' = ' + F.frac(b, totalC),
            'P = <b>' + F.fracSimp(b, totalC) + '</b>'];
        } else {
          var suma = r.entero(4, 10);
          var favorables = 0;
          for (var i = 1; i <= 6; i++) for (var j = 1; j <= 6; j++) if (i + j === suma) favorables++;
          enun = 'Se lanzan dos dados. &iquest;Cual es la probabilidad de que la suma sea ' + suma + '?';
          resp = R.fraccion(favorables, 36);
          pistas = ['Hay 6 &times; 6 = 36 resultados posibles.',
            'Cuenta las parejas que suman ' + suma + ': hay ' + favorables + '.'];
          sol = ['Casos totales: 36',
            'Parejas que suman ' + suma + ': ' + favorables,
            'P = ' + F.frac(favorables, 36) + ' = <b>' + F.fracSimp(favorables, 36) + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['condicional', 'Probabilidad condicional'],
          ['independencia', 'Eventos independientes'],
          ['combinaciones', 'Con combinaciones'],
          ['sinReemplazo', 'Extracciones sin reemplazo'],
          ['bayes', 'Probabilidad total y Bayes'],
          ['conteo', 'Permutaciones y combinaciones']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'condicional') {
          var nAB = r.entero(5, 20), nB = nAB + r.entero(5, 25), N2 = nB + r.entero(10, 40);
          enun = 'En un grupo de ' + N2 + ' personas, ' + nB + ' usan lentes y ' + nAB + ' usan lentes y ademas son zurdas.<br>' +
            'Si se elige a alguien que usa lentes, &iquest;cual es la probabilidad de que sea zurda? (4 decimales)';
          resp = R.numero(nAB / nB, { dec: 4, tol: 0.001 });
          pistas = ['Es probabilidad condicional: P(zurdo | lentes) = P(zurdo &cap; lentes)/P(lentes).',
            'Como ya sabemos que usa lentes, el nuevo total es ' + nB + '.'];
          sol = ['P(A|B) = P(A &cap; B)/P(B)',
            'Trabajando con conteos: ' + nAB + '/' + nB,
            'P = <b>' + F.n(nAB / nB, 4) + '</b>'];
        } else if (t3 === 'independencia') {
          var p1 = r.entero(2, 8) / 10, p2 = r.entero(2, 8) / 10;
          enun = 'Dos eventos independientes tienen P(A) = ' + p1 + ' y P(B) = ' + p2 + '.<br>' +
            'Calcula P(A &cap; B) y P(A &cup; B) (4 decimales).';
          resp = R.varios([
            { etiqueta: 'P(A &cap; B)', resp: R.numero(p1 * p2, { dec: 4, tol: 0.001 }) },
            { etiqueta: 'P(A &cup; B)', resp: R.numero(p1 + p2 - p1 * p2, { dec: 4, tol: 0.001 }) }
          ]);
          pistas = ['Si son independientes, la interseccion es simplemente el producto.',
            'Luego usa P(A &cup; B) = P(A) + P(B) &minus; P(A &cap; B).'];
          sol = ['P(A &cap; B) = ' + p1 + ' &times; ' + p2 + ' = <b>' + F.n(p1 * p2, 4) + '</b>',
            'P(A &cup; B) = ' + p1 + ' + ' + p2 + ' &minus; ' + F.n(p1 * p2, 4) + ' = <b>' + F.n(p1 + p2 - p1 * p2, 4) + '</b>'];
        } else if (t3 === 'combinaciones') {
          var rojas = r.entero(4, 8), azules = r.entero(4, 8);
          n = rojas + azules;
          k = r.entero(2, 3);
          var favC = comb(rojas, k), totC = comb(n, k);
          enun = 'De una bolsa con ' + rojas + ' canicas rojas y ' + azules + ' azules se sacan ' + k + ' canicas a la vez.<br>' +
            '&iquest;Cual es la probabilidad de que las ' + k + ' sean rojas? (4 decimales)';
          resp = R.numero(favC / totC, { dec: 4, tol: 0.001 });
          pistas = ['Usa combinaciones: C(' + rojas + ', ' + k + ') casos favorables entre C(' + n + ', ' + k + ') totales.',
            'C(' + rojas + ', ' + k + ') = ' + favC + ' y C(' + n + ', ' + k + ') = ' + totC + '.'];
          sol = ['Casos favorables: C(' + rojas + ', ' + k + ') = ' + favC,
            'Casos totales: C(' + n + ', ' + k + ') = ' + totC,
            'P = ' + favC + '/' + totC + ' = <b>' + F.n(favC / totC, 4) + '</b>'];
        } else {
          var bu = r.entero(4, 9), ma = r.entero(2, 6);
          var tot = bu + ma;
          var pSin = (bu / tot) * ((bu - 1) / (tot - 1));
          enun = 'Un lote tiene ' + bu + ' piezas buenas y ' + ma + ' defectuosas.<br>' +
            'Se sacan dos piezas SIN reemplazo. &iquest;Cual es la probabilidad de que las dos sean buenas? (4 decimales)';
          resp = R.numero(pSin, { dec: 4, tol: 0.001 });
          pistas = ['Sin reemplazo: despues de sacar la primera cambian el total y los favorables.',
            'P = (' + bu + '/' + tot + ') &times; (' + (bu - 1) + '/' + (tot - 1) + ').'];
          sol = ['Primera pieza buena: ' + F.frac(bu, tot),
            'Segunda buena (ya sin la primera): ' + F.frac(bu - 1, tot - 1),
            'Multiplico: <b>' + F.n(pSin, 4) + '</b>'];
        }
      }

      return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
