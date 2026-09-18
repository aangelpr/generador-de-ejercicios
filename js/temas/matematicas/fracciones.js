/* Reglas para fracciones */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function fr(a, b) { return a < 0 ? '-' + F.frac(-a, b) : F.frac(a, b); }

  var extra = {};

  extra.simplificar = function (r) {
    var k = r.entero(2, 12);
    var a = r.entero(1, 11), b = r.entero(2, 12);
    while (F.mcd(a, b) !== 1) { a = r.entero(1, 11); b = r.entero(2, 12); }
    var num = a * k, den = b * k;
    return {
      enunciado: 'Simplifica hasta su minima expresion: ' + F.frac(num, den),
      respuesta: R.fraccion(a, b),
      pistas: ['Busca el maximo comun divisor del numerador y el denominador.',
        'El m.c.d. de ' + num + ' y ' + den + ' es ' + k + '.'],
      solucion: ['m.c.d.(' + num + ', ' + den + ') = ' + k,
        'Divido arriba y abajo entre ' + k,
        'Resultado: <b>' + F.frac(a, b) + '</b>']
    };
  };

  extra.comparar = function (r) {
    var a = r.entero(1, 9), b = r.entero(2, 12), c = r.entero(1, 9), d = r.entero(2, 12);
    while (a * d === b * c) { c = r.entero(1, 9); d = r.entero(2, 12); }
    var primeraMayor = a * d > b * c;
    return {
      enunciado: '&iquest;Cual fraccion es mayor?<br><span class="big">' + F.frac(a, b) + ' &nbsp; o &nbsp; ' + F.frac(c, d) + '</span>',
      respuesta: R.opcion([F.frac(a, b), F.frac(c, d)], primeraMayor ? 0 : 1),
      pistas: ['Puedes igualar denominadores, o comparar los productos cruzados.',
        'Producto cruzado: ' + a + '&middot;' + d + ' = ' + (a * d) + ' contra ' + c + '&middot;' + b + ' = ' + (b * c) + '.'],
      solucion: ['Comparo productos cruzados: ' + (a * d) + ' contra ' + (b * c),
        'Como ' + (a * d) + (primeraMayor ? ' &gt; ' : ' &lt; ') + (b * c) + ', la mayor es <b>' + (primeraMayor ? F.frac(a, b) : F.frac(c, d)) + '</b>',
        'En decimales: ' + F.n(a / b, 4) + ' y ' + F.n(c / d, 4)]
    };
  };

  extra.mixtas = function (r) {
    var e1 = r.entero(1, 6), n1 = r.entero(1, 5), d1 = r.entero(n1 + 1, 9);
    var e2 = r.entero(1, 6), n2 = r.entero(1, 5), d2 = r.entero(n2 + 1, 9);
    var i1 = e1 * d1 + n1, i2 = e2 * d2 + n2;
    var m = F.mcm(d1, d2);
    var num = i1 * (m / d1) + i2 * (m / d2);
    var s = F.simplifica(num, m);
    return {
      enunciado: 'Suma estos numeros mixtos y da el resultado como fraccion impropia simplificada:<br>' +
        '<span class="big">' + e1 + ' ' + F.frac(n1, d1) + ' + ' + e2 + ' ' + F.frac(n2, d2) + '</span>',
      respuesta: R.fraccion(s[0], s[1]),
      pistas: ['Primero convierte cada mixto a fraccion impropia: entero &times; denominador + numerador.',
        e1 + ' ' + F.frac(n1, d1) + ' = ' + F.frac(i1, d1) + ' y ' + e2 + ' ' + F.frac(n2, d2) + ' = ' + F.frac(i2, d2) + '.'],
      solucion: ['Convierto a impropias: ' + F.frac(i1, d1) + ' y ' + F.frac(i2, d2),
        'm.c.m.(' + d1 + ', ' + d2 + ') = ' + m,
        'Sumo: ' + F.frac(num, m),
        'Simplifico: <b>' + F.fracSimp(num, m) + '</b>']
    };
  };

  extra.deCantidad = function (r) {
    var b = r.elige([2, 3, 4, 5, 6, 8]);
    var a = r.entero(1, b - 1);
    var k = r.entero(2, 20) * b;
    return {
      enunciado: '&iquest;Cuanto es ' + F.frac(a, b) + ' de ' + k + '?',
      respuesta: R.numero(a * k / b, { dec: 4 }),
      pistas: ['"De" significa multiplicar: ' + F.frac(a, b) + ' &middot; ' + k + '.',
        'Divide ' + k + ' entre ' + b + ' y multiplica por ' + a + '.'],
      solucion: [k + ' &divide; ' + b + ' = ' + (k / b),
        (k / b) + ' &middot; ' + a + ' = ' + (a * k / b),
        'Resultado: <b>' + F.n(a * k / b, 4) + '</b>']
    };
  };

  EJ.tema({
    id: 'fracciones',
    materia: 'matematicas',
    grupo: 'Aritmetica y algebra basica',
    nombre: 'Reglas para fracciones',
    descripcion: 'Suma, resta, multiplicacion, division y simplificacion de fracciones.',
    formulario: 'a/b + c/d = (ad + bc)/bd &nbsp;&middot;&nbsp; (a/b)(c/d) = ac/bd &nbsp;&middot;&nbsp; (a/b) &divide; (c/d) = (a/b)(d/c) = ad/bc',

    generar: function (dif, r) {
      var a, b, c, d, num, den, enun, pistas, sol, s;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['sumaResta', 'Suma y resta'],
          ['simplificar', 'Simplificar'],
          ['comparar', 'Comparar fracciones'],
          ['deCantidad', 'Fraccion de una cantidad']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        b = r.elige([2, 3, 4, 5, 6, 8, 10, 12]);
        d = r.elige([2, 3, 4, 5, 6, 8, 10, 12]);
        a = r.entero(1, b * 2 - 1);
        c = r.entero(1, d * 2 - 1);
        var op = r.elige(['+', '-']);
        var m = F.mcm(b, d);
        num = op === '+' ? a * (m / b) + c * (m / d) : a * (m / b) - c * (m / d);
        den = m;
        s = F.simplifica(num, den);
        enun = 'Resuelve y simplifica: ' + fr(a, b) + ' ' + (op === '+' ? '+' : '&minus;') + ' ' + fr(c, d);
        pistas = [
          'Para sumar o restar necesitas el mismo denominador: usa el minimo comun multiplo de ' + b + ' y ' + d + '.',
          'El m.c.m. es ' + m + '. Convierte: ' + fr(a, b) + ' = ' + fr(a * (m / b), m) + ' y ' + fr(c, d) + ' = ' + fr(c * (m / d), m) + '.'
        ];
        sol = [
          'm.c.m.(' + b + ', ' + d + ') = ' + m,
          'Convierto: ' + fr(a * (m / b), m) + ' ' + (op === '+' ? '+' : '&minus;') + ' ' + fr(c * (m / d), m),
          'Opero los numeradores: ' + fr(num, den),
          'Simplifico dividiendo entre ' + F.mcd(num, den) + ': <b>' + F.fracSimp(num, den) + '</b>'
        ];
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['producto', 'Multiplicacion'],
          ['cociente', 'Division'],
          ['tres', 'Tres fracciones'],
          ['mixtas', 'Numeros mixtos'],
          ['simplificar', 'Simplificar']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'producto') {
          a = r.entero(1, 9); b = r.entero(2, 12); c = r.entero(1, 9); d = r.entero(2, 12);
          num = a * c; den = b * d;
          enun = 'Multiplica y simplifica: ' + fr(a, b) + ' &middot; ' + fr(c, d);
          pistas = ['En el producto se multiplican numerador con numerador y denominador con denominador.',
            'Queda ' + fr(num, den) + '; ahora simplifica con el m.c.d.'];
          sol = ['Numeradores: ' + a + ' &middot; ' + c + ' = ' + num,
            'Denominadores: ' + b + ' &middot; ' + d + ' = ' + den,
            'Simplifico entre ' + F.mcd(num, den) + ': <b>' + F.fracSimp(num, den) + '</b>'];
        } else if (t === 'cociente') {
          a = r.entero(1, 9); b = r.entero(2, 12); c = r.entero(1, 9); d = r.entero(2, 12);
          num = a * d; den = b * c;
          enun = 'Divide y simplifica: ' + fr(a, b) + ' &divide; ' + fr(c, d);
          pistas = ['Dividir es multiplicar por el reciproco: invierte la segunda fraccion.',
            fr(a, b) + ' &middot; ' + fr(d, c) + ' = ' + fr(num, den) + '.'];
          sol = ['Invierto la segunda: ' + fr(a, b) + ' &middot; ' + fr(d, c),
            'Multiplico: ' + fr(num, den),
            'Simplifico: <b>' + F.fracSimp(num, den) + '</b>'];
        } else {
          b = r.elige([2, 3, 4, 6]); d = r.elige([3, 4, 5, 6]);
          var f = r.elige([2, 4, 8, 12]);
          a = r.entero(1, b + 3); c = r.entero(1, d + 3);
          var g = r.entero(1, f);
          var mm = F.mcm(F.mcm(b, d), f);
          num = a * (mm / b) + c * (mm / d) - g * (mm / f);
          den = mm;
          enun = 'Resuelve y simplifica: ' + fr(a, b) + ' + ' + fr(c, d) + ' &minus; ' + fr(g, f);
          pistas = ['Busca el m.c.m. de los tres denominadores de una vez.',
            'm.c.m.(' + b + ', ' + d + ', ' + f + ') = ' + mm + '.'];
          sol = ['m.c.m. = ' + mm,
            'Convierto todo: ' + fr(a * (mm / b), mm) + ' + ' + fr(c * (mm / d), mm) + ' &minus; ' + fr(g * (mm / f), mm),
            'Opero: ' + fr(num, den),
            'Simplifico: <b>' + F.fracSimp(num, den) + '</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['combinada', 'Jerarquia de operaciones'],
          ['compleja', 'Fraccion compleja'],
          ['mixtas', 'Numeros mixtos']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'combinada') {
          a = r.entero(1, 7); b = r.elige([2, 3, 4, 6]);
          c = r.entero(1, 7); d = r.elige([2, 3, 5, 6]);
          var e = r.entero(1, 5), h = r.elige([2, 3, 4]);
          var pn = c * e, pd = d * h;                 // producto de la derecha
          var mm2 = F.mcm(b, pd);
          num = a * (mm2 / b) + pn * (mm2 / pd);
          den = mm2;
          enun = 'Resuelve y simplifica: ' + fr(a, b) + ' + ' + fr(c, d) + ' &middot; ' + fr(e, h);
          pistas = ['Jerarquia: primero el producto, luego la suma.',
            fr(c, d) + ' &middot; ' + fr(e, h) + ' = ' + F.fracSimp(pn, pd) + '.'];
          sol = ['Producto primero: ' + fr(c, d) + ' &middot; ' + fr(e, h) + ' = ' + fr(pn, pd) + ' = ' + F.fracSimp(pn, pd),
            'Ahora la suma con m.c.m. = ' + mm2 + ': ' + fr(a * (mm2 / b), mm2) + ' + ' + fr(pn * (mm2 / pd), mm2),
            'Resultado: ' + fr(num, den) + ' = <b>' + F.fracSimp(num, den) + '</b>'];
        } else {
          a = r.entero(1, 6); b = r.elige([2, 3, 4, 5]);
          c = r.entero(1, 6); d = r.elige([2, 3, 4, 5]);
          var e2 = r.entero(1, 6), h2 = r.elige([2, 3, 4, 5]);
          var m1 = F.mcm(b, d);
          var sn = a * (m1 / b) + c * (m1 / d), sd = m1;   // numerador de la fraccion compleja
          num = sn * h2; den = sd * e2;
          enun = 'Resuelve y simplifica: ' + F.frac(fr(a, b) + ' + ' + fr(c, d), fr(e2, h2));
          pistas = ['Resuelve primero la suma de arriba y luego divide entre la fraccion de abajo.',
            'Arriba: ' + fr(a, b) + ' + ' + fr(c, d) + ' = ' + F.fracSimp(sn, sd) + '. Dividir entre ' + fr(e2, h2) + ' es multiplicar por ' + fr(h2, e2) + '.'];
          sol = ['Numerador: ' + fr(a, b) + ' + ' + fr(c, d) + ' = ' + fr(sn, sd),
            'Divido: ' + fr(sn, sd) + ' &divide; ' + fr(e2, h2) + ' = ' + fr(sn, sd) + ' &middot; ' + fr(h2, e2),
            'Multiplico: ' + fr(num, den),
            'Simplifico: <b>' + F.fracSimp(num, den) + '</b>'];
        }
      }

      s = F.simplifica(num, den);
      return {
        enunciado: enun,
        respuesta: R.fraccion(s[0], s[1]),
        pistas: pistas,
        solucion: sol
      };
    }
  });
})();
