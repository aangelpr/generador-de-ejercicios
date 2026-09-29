/* Modo prepa: aritmetica (porcentajes, fracciones, proporciones, MCM y MCD) */
(function () {
  'use strict';
  var F = EJ.fmt, P = EJ.prepa;

  var NOMBRES = ['Ana', 'Luis', 'Sofia', 'Diego', 'Mariana', 'Jorge', 'Valeria', 'Carlos', 'Fernanda', 'Emilio'];
  var COSAS = ['una mochila', 'unos tenis', 'una chamarra', 'un reloj', 'unos audifonos', 'una bicicleta'];

  var casos = {};

  /* ---------- facil ---------- */

  casos.porcentaje = function (r) {
    var p = r.elige([5, 10, 15, 20, 25, 30, 35, 40, 45, 60, 75]);
    var n = r.elige([40, 60, 80, 120, 140, 160, 180, 200, 240, 320, 360, 480]);
    var alumnos = r.bool();
    var v = p * n / 100;
    var resp = P.opciones(r, v, [n * p / 10, p, n - v, v * 10, n / p]);
    var enun = alumnos
      ? 'En una secundaria hay ' + n + ' alumnos de tercero y el ' + p + '% quiere entrar al bachillerato tecnologico. &iquest;Cuantos alumnos son?'
      : '&iquest;Cuanto es el ' + p + '% de ' + n + '?';
    return P.ejercicio(enun, resp,
      ['El ' + p + '% significa ' + p + ' de cada 100: multiplica por ' + p + ' y divide entre 100.',
        'Tambien sirve: ' + p + '% = ' + F.n(p / 100) + ', y luego ' + F.n(p / 100) + ' &times; ' + n + '.'],
      [p + '% de ' + n + ' = ' + n + ' &times; ' + p + ' / 100',
        '= ' + (n * p) + ' / 100 = <b>' + F.n(v) + '</b>']);
  };

  casos.fraccionCantidad = function (r) {
    var den = r.elige([3, 4, 5, 6, 8]);
    var num = r.entero(1, den - 1);
    while (F.mcd(num, den) !== 1) num = r.entero(1, den - 1);
    var total = den * r.entero(4, 30) * 5;
    var quien = r.elige(NOMBRES);
    var gasto = total * num / den;
    var queda = total - gasto;
    var resp = P.opciones(r, queda, [gasto, total / den, total * den / num, total - total / den], { antes: '$' });
    return P.ejercicio(
      quien + ' tenia $' + total + ' y se gasto ' + F.frac(num, den) + ' de su dinero en utiles. &iquest;Cuanto dinero le quedo?',
      resp,
      ['Primero calcula cuanto es ' + F.frac(num, den) + ' de ' + total + ': divide entre ' + den + ' y multiplica por ' + num + '.',
        'Ojo: la pregunta es cuanto le QUEDO, no cuanto gasto.'],
      [F.frac(1, den) + ' de ' + total + ' = ' + total + ' &divide; ' + den + ' = ' + (total / den),
        'Gasto: ' + F.frac(num, den) + ' = ' + num + ' &times; ' + (total / den) + ' = $' + gasto,
        'Le quedo: ' + total + ' &minus; ' + gasto + ' = <b>$' + queda + '</b>']);
  };

  casos.jerarquia = function (r) {
    var a = r.entero(2, 9), b = r.entero(2, 6), c = r.entero(2, 6), d = r.entero(1, 9), e = r.entero(2, 4);
    var forma = r.entero(0, 2), enun, v, errores, sol;
    if (forma === 0) {
      /* a + b * c - d */
      v = a + b * c - d;
      errores = [(a + b) * c - d, a + b * (c - d), (a + b) * (c - d)];
      enun = a + ' + ' + b + ' &times; ' + c + ' &minus; ' + d;
      sol = ['Primero la multiplicacion: ' + b + ' &times; ' + c + ' = ' + (b * c),
        'Luego de izquierda a derecha: ' + a + ' + ' + (b * c) + ' &minus; ' + d + ' = <b>' + v + '</b>'];
    } else if (forma === 1) {
      /* a + b^e - c*d */
      v = a + Math.pow(b, e) - c * d;
      errores = [a + b * e - c * d, (a + Math.pow(b, e) - c) * d, a + Math.pow(b, e) - c + d];
      enun = a + ' + ' + b + F.sup(e) + ' &minus; ' + c + ' &times; ' + d;
      sol = ['Primero la potencia: ' + b + F.sup(e) + ' = ' + Math.pow(b, e),
        'Luego la multiplicacion: ' + c + ' &times; ' + d + ' = ' + (c * d),
        'Al final sumas y restas: ' + a + ' + ' + Math.pow(b, e) + ' &minus; ' + (c * d) + ' = <b>' + v + '</b>'];
    } else {
      /* (a + b) * c - d * e */
      v = (a + b) * c - d * e;
      errores = [a + b * c - d * e, ((a + b) * c - d) * e, (a + b) * (c - d) * e];
      enun = '(' + a + ' + ' + b + ') &times; ' + c + ' &minus; ' + d + ' &times; ' + e;
      sol = ['Primero el parentesis: ' + a + ' + ' + b + ' = ' + (a + b),
        'Luego las multiplicaciones: ' + (a + b) + ' &times; ' + c + ' = ' + ((a + b) * c) + ' y ' + d + ' &times; ' + e + ' = ' + (d * e),
        'Al final: ' + ((a + b) * c) + ' &minus; ' + (d * e) + ' = <b>' + v + '</b>'];
    }
    return P.ejercicio('&iquest;Cual es el resultado de la operacion?<br><span class="expr">' + enun + '</span>',
      P.opciones(r, v, errores),
      ['Orden: parentesis, potencias, multiplicaciones y divisiones, y al final sumas y restas.',
        'No hagas las operaciones de izquierda a derecha sin mas: la multiplicacion va antes que la suma.'],
      sol);
  };

  casos.reglaDirecta = function (r) {
    var cosa = r.elige([
      { txt: 'cuadernos', precio: r.entero(12, 35) },
      { txt: 'kilos de tortilla', precio: r.entero(18, 28) },
      { txt: 'boletos del metro', precio: 5 },
      { txt: 'plumas', precio: r.entero(6, 15) }
    ]);
    var n1 = r.entero(3, 8), n2 = r.entero(9, 20);
    var c1 = n1 * cosa.precio, c2 = n2 * cosa.precio;
    var resp = P.opciones(r, c2, [c1 + (n2 - n1), c1 * n2, n2 * n1, c1 + n2], { antes: '$' });
    return P.ejercicio(
      'Si ' + n1 + ' ' + cosa.txt + ' cuestan $' + c1 + ', &iquest;cuanto cuestan ' + n2 + '?',
      resp,
      ['Es proporcional: a mas ' + cosa.txt + ', mas dinero. Busca cuanto cuesta uno.',
        'Uno cuesta ' + c1 + ' &divide; ' + n1 + ' = $' + cosa.precio + '.'],
      ['Precio de uno: ' + c1 + ' &divide; ' + n1 + ' = $' + cosa.precio,
        n2 + ' &times; ' + cosa.precio + ' = <b>$' + c2 + '</b>',
        'Con regla de tres: x = ' + c1 + ' &times; ' + n2 + ' / ' + n1 + ' = ' + c2]);
  };

  /* ---------- medio ---------- */

  casos.descuento = function (r) {
    var p = r.elige([10, 15, 20, 25, 30, 35, 40]);
    var precio = r.entero(6, 40) * 20;
    var cosa = r.elige(COSAS);
    var final = precio * (100 - p) / 100;
    var resp = P.opciones(r, final, [precio * p / 100, precio - p, precio * (100 + p) / 100, precio - p * 10], { antes: '$', fmt: P.pesos });
    return P.ejercicio(
      'En una tienda, ' + cosa + ' de $' + precio + ' tiene ' + p + '% de descuento. &iquest;Cuanto se paga?',
      resp,
      ['Calcula el ' + p + '% de ' + precio + ' y restaselo al precio.',
        'Atajo: si te descuentan el ' + p + '%, pagas el ' + (100 - p) + '%.'],
      ['Descuento: ' + p + '% de ' + precio + ' = $' + P.pesos(precio * p / 100),
        'Se paga: ' + precio + ' &minus; ' + P.pesos(precio * p / 100) + ' = <b>$' + P.pesos(final) + '</b>',
        'Atajo: ' + precio + ' &times; ' + F.n((100 - p) / 100) + ' = ' + P.pesos(final)]);
  };

  casos.aumento = function (r) {
    var p = r.elige([5, 8, 10, 12, 15, 16, 20, 25]);
    var precio = r.entero(5, 50) * 25;
    var iva = p === 16;
    var final = precio * (100 + p) / 100;
    var resp = P.opciones(r, final, [precio * p / 100, precio + p, precio * (100 - p) / 100, precio * p], { antes: '$', fmt: P.pesos });
    var enun = iva
      ? 'Un celular cuesta $' + precio + ' mas IVA (16%). &iquest;Cual es el precio total?'
      : 'El pasaje de una ruta costaba $' + precio + ' al mes y subio ' + p + '%. &iquest;Cuanto cuesta ahora?';
    return P.ejercicio(enun, resp,
      ['Calcula el ' + p + '% de ' + precio + ' y SUMASELO.',
        'Atajo: el precio nuevo es el ' + (100 + p) + '% del original: ' + precio + ' &times; ' + F.n((100 + p) / 100) + '.'],
      ['Aumento: ' + p + '% de ' + precio + ' = ' + P.pesos(precio * p / 100),
        'Total: ' + precio + ' + ' + P.pesos(precio * p / 100) + ' = <b>$' + P.pesos(final) + '</b>']);
  };

  casos.reglaInversa = function (r) {
    var t1, w1, w2;
    do {
      w1 = r.entero(2, 8); t1 = r.entero(3, 15); w2 = r.entero(2, 12);
    } while (w1 === w2 || (w1 * t1) % w2 !== 0);
    var t2 = w1 * t1 / w2;
    var resp = P.opciones(r, t2, [t1 * w2 / w1, t1 + (w1 - w2), t1 * w1 * w2, t1], { unidad: 'dias' });
    return P.ejercicio(
      w1 + ' albaniles construyen una barda en ' + t1 + ' dias. Trabajando al mismo ritmo, &iquest;en cuantos dias la construirian ' + w2 + ' albaniles?',
      resp,
      ['Cuidado: a MAS trabajadores, MENOS dias. Es proporcion inversa.',
        'Calcula el trabajo total en "dias-albanil": ' + w1 + ' &times; ' + t1 + ' = ' + (w1 * t1) + '.'],
      ['Proporcion inversa: el producto se mantiene',
        w1 + ' &times; ' + t1 + ' = ' + w2 + ' &times; x',
        'x = ' + (w1 * t1) + ' &divide; ' + w2 + ' = <b>' + t2 + ' dias</b>']);
  };

  casos.mcm = function (r) {
    var a, b, m;
    do {
      a = r.elige([4, 6, 8, 9, 10, 12, 15, 18, 20]);
      b = r.elige([6, 8, 10, 12, 14, 15, 16, 20, 24, 25, 30]);
      m = F.mcm(a, b);
    } while (a === b || m === a * b || m === a || m === b || m > 120);
    var hora = r.entero(6, 8);
    var resp = P.opciones(r, m, [a * b, a + b, F.mcd(a, b), Math.max(a, b) * 2], { unidad: 'minutos' });
    return P.ejercicio(
      'De una terminal sale un camion cada ' + a + ' minutos y un microbus cada ' + b + ' minutos. ' +
        'Si a las ' + hora + ':00 salieron juntos, &iquest;dentro de cuantos minutos vuelven a salir juntos por primera vez?',
      resp,
      ['Buscas un numero que sea multiplo de ' + a + ' y de ' + b + ' a la vez, el mas chico: el MCM.',
        'Multiplicar ' + a + ' &times; ' + b + ' da un multiplo comun, pero no el menor.'],
      ['Multiplos de ' + a + ': ' + [1, 2, 3, 4, 5, 6].map(function (k) { return a * k; }).join(', ') + ', ...',
        'Multiplos de ' + b + ': ' + [1, 2, 3, 4, 5].map(function (k) { return b * k; }).join(', ') + ', ...',
        'MCM(' + a + ', ' + b + ') = <b>' + m + ' minutos</b>']);
  };

  casos.mcd = function (r) {
    var g = r.elige([4, 5, 6, 8, 9, 10, 12, 15]);
    var p, q;
    do { p = r.entero(2, 9); q = r.entero(2, 9); } while (p === q || F.mcd(p, q) !== 1);
    var a = g * p, b = g * q;
    var resp = P.opciones(r, g, [F.mcm(a, b), g * 2 > Math.min(a, b) ? g + 1 : g * 2, Math.abs(a - b) === g ? g / 2 : Math.abs(a - b), p + q], { unidad: 'cm' });
    return P.ejercicio(
      'Se tienen dos listones de ' + a + ' cm y ' + b + ' cm. Se quieren cortar en pedazos iguales, lo mas largos posible, sin que sobre nada. ' +
        '&iquest;Cuanto debe medir cada pedazo?',
      resp,
      ['El largo del pedazo tiene que dividir exacto a ' + a + ' y a ' + b + ', y ser el mayor posible: el MCD.',
        'Descompon los dos numeros en factores primos y quedate con los comunes.'],
      ['Divisores comunes de ' + a + ' y ' + b + ': el mayor es ' + g,
        a + ' = ' + g + ' &times; ' + p + ' y ' + b + ' = ' + g + ' &times; ' + q,
        'Cada pedazo mide <b>' + g + ' cm</b> (salen ' + (p + q) + ' pedazos)']);
  };

  /* ---------- dificil ---------- */

  casos.descuentosSucesivos = function (r) {
    var p1 = r.elige([10, 20, 25, 30, 40, 50]), p2 = r.elige([10, 20, 25, 50]);
    var precio = r.entero(4, 30) * 100;
    var final = precio * (100 - p1) / 100 * (100 - p2) / 100;
    var sumado = precio * (100 - p1 - p2) / 100;
    var neto = 100 - (100 - p1) * (100 - p2) / 100;
    var resp = P.opciones(r, final, [sumado, precio * (100 - p1) / 100, precio - final, precio * (100 - p1 * p2 / 10) / 100], { antes: '$', fmt: P.pesos });
    return P.ejercicio(
      'Un televisor de $' + precio + ' tiene ' + p1 + '% de descuento y, al pagar de contado, te hacen otro ' + p2 + '% sobre el precio ya rebajado. ' +
        '&iquest;Cuanto pagas?',
      resp,
      ['Los descuentos NO se suman: el segundo se aplica sobre el precio que ya tiene el primero.',
        'Despues del primero pagas el ' + (100 - p1) + '%; despues del segundo, el ' + (100 - p2) + '% de eso.'],
      ['Primer descuento: ' + precio + ' &times; ' + F.n((100 - p1) / 100) + ' = $' + P.pesos(precio * (100 - p1) / 100),
        'Segundo: ' + P.pesos(precio * (100 - p1) / 100) + ' &times; ' + F.n((100 - p2) / 100) + ' = <b>$' + P.pesos(final) + '</b>',
        'El descuento total fue del ' + F.n(neto) + '%, no del ' + (p1 + p2) + '%']);
  };

  casos.porcentajeInverso = function (r) {
    var p = r.elige([10, 20, 25, 40, 50, 60, 75]);
    var original = r.entero(3, 40) * 40;
    var final = original * (100 - p) / 100;
    var cosa = r.elige(COSAS);
    var resp = P.opciones(r, original, [final * (100 + p) / 100, final + p, final * p / 100 + final, final / (p / 100)], { antes: '$', fmt: P.pesos });
    return P.ejercicio(
      'Con ' + p + '% de descuento, ' + cosa + ' quedo en $' + final + '. &iquest;Cual era su precio original?',
      resp,
      ['Error tipico: sumarle el ' + p + '% a $' + final + '. Ese ' + p + '% era del precio ORIGINAL, no del rebajado.',
        '$' + final + ' es el ' + (100 - p) + '% del precio original.'],
      [final + ' = ' + (100 - p) + '% del original = ' + F.n((100 - p) / 100) + ' &times; x',
        'x = ' + final + ' &divide; ' + F.n((100 - p) / 100) + ' = <b>$' + P.pesos(original) + '</b>',
        'Comprobacion: ' + p + '% de ' + original + ' = ' + P.pesos(original * p / 100) + ', y ' + original + ' &minus; ' + P.pesos(original * p / 100) + ' = ' + final]);
  };

  casos.fraccionResto = function (r) {
    var d1 = r.elige([3, 4, 5]), d2 = r.elige([2, 3, 4, 5]);
    var quien = r.elige(NOMBRES);
    var total = d1 * d2 * r.entero(3, 20) * 10;
    var g1 = total / d1;
    var resto = total - g1;
    var g2 = resto / d2;
    var queda = resto - g2;
    /* errores: sumar las dos fracciones, olvidar el segundo gasto, etc. */
    var resp = P.opciones(r, total, [queda / (1 - 1 / d1 - 1 / d2), queda * d1, queda + g2, queda * d2], { antes: '$', fmt: P.pesos });
    return P.ejercicio(
      quien + ' gasto ' + F.frac(1, d1) + ' de su dinero en un libro y despues ' + F.frac(1, d2) + ' de lo que le quedaba en comida. ' +
        'Si al final le quedaron $' + queda + ', &iquest;cuanto dinero tenia al principio?',
      resp,
      ['El segundo gasto es ' + F.frac(1, d2) + ' de lo que QUEDABA, no del total. No sumes las fracciones.',
        'Despues del libro le queda ' + F.frac(d1 - 1, d1) + ' del total; despues de la comida, ' + F.frac(d2 - 1, d2) + ' de eso.'],
      ['Le queda ' + F.frac(d1 - 1, d1) + ' &times; ' + F.frac(d2 - 1, d2) + ' = ' + F.fracSimp((d1 - 1) * (d2 - 1), d1 * d2) + ' del total',
        F.fracSimp((d1 - 1) * (d2 - 1), d1 * d2) + ' del total = $' + queda,
        'Total = ' + queda + ' &times; ' + F.fracSimp(d1 * d2, (d1 - 1) * (d2 - 1)) + ' = <b>$' + total + '</b>',
        'Comprobacion: libro $' + g1 + ', quedan $' + resto + '; comida $' + g2 + ', quedan $' + queda]);
  };

  casos.reglaCompuesta = function (r) {
    var o1, d1, h1, o2, d2, h2;
    do {
      o1 = r.entero(3, 8); d1 = r.entero(4, 12); h1 = r.elige([6, 8]);
      o2 = r.entero(3, 12); h2 = r.elige([4, 6, 8, 10]);
    } while (o1 === o2 || (o1 * d1 * h1) % (o2 * h2) !== 0);
    d2 = o1 * d1 * h1 / (o2 * h2);
    var resp = P.opciones(r, d2, [d1 * o2 * h2 / (o1 * h1), d1 * o1 / o2, d1 * h1 / h2, d1 * o2 / o1], { unidad: 'dias' });
    return P.ejercicio(
      o1 + ' obreros, trabajando ' + h1 + ' horas diarias, pintan una escuela en ' + d1 + ' dias. ' +
        '&iquest;En cuantos dias la pintarian ' + o2 + ' obreros trabajando ' + h2 + ' horas diarias?',
      resp,
      ['Las dos relaciones son inversas: mas obreros o mas horas al dia significa menos dias.',
        'El trabajo total en horas-obrero no cambia: ' + o1 + ' &times; ' + h1 + ' &times; ' + d1 + ' = ' + (o1 * h1 * d1) + '.'],
      ['Horas-obrero totales: ' + o1 + ' &times; ' + h1 + ' &times; ' + d1 + ' = ' + (o1 * h1 * d1),
        'Cada dia nuevo aporta ' + o2 + ' &times; ' + h2 + ' = ' + (o2 * h2) + ' horas-obrero',
        'Dias = ' + (o1 * h1 * d1) + ' &divide; ' + (o2 * h2) + ' = <b>' + d2 + ' dias</b>']);
  };

  EJ.tema({
    id: 'prepa-aritmetica',
    materia: 'prepa',
    grupo: 'Matematicas',
    nombre: 'Aritmetica y porcentajes',
    descripcion: 'Porcentajes, descuentos, fracciones de una cantidad, regla de tres, MCM y MCD en problemas.',
    etiquetas: ['porcentaje', 'descuento', 'regla de tres', 'mcm', 'mcd', 'fracciones'],
    formulario: 'p% de N = N &times; p / 100 &nbsp;&middot;&nbsp; Con p% de descuento pagas el (100 &minus; p)%<br>' +
      'Proporcion directa: a/b = c/x &nbsp;&middot;&nbsp; Inversa: a &times; b = c &times; x<br>' +
      'Jerarquia: ( ) &rarr; potencias &rarr; &times; &divide; &rarr; + &minus;',

    generar: function (dif, r) {
      var t;
      if (dif === 'facil') {
        t = r.subtema([
          ['porcentaje', 'Porcentaje de una cantidad'],
          ['fraccionCantidad', 'Fraccion de una cantidad'],
          ['jerarquia', 'Jerarquia de operaciones'],
          ['reglaDirecta', 'Regla de tres directa']
        ]);
      } else if (dif === 'medio') {
        t = r.subtema([
          ['descuento', 'Descuentos'],
          ['aumento', 'Aumentos e IVA'],
          ['reglaInversa', 'Regla de tres inversa'],
          ['mcm', 'Problemas de MCM'],
          ['mcd', 'Problemas de MCD']
        ]);
      } else {
        t = r.subtema([
          ['descuentosSucesivos', 'Descuentos sucesivos'],
          ['porcentajeInverso', 'Precio antes del descuento'],
          ['fraccionResto', 'Fraccion de lo que queda'],
          ['reglaCompuesta', 'Regla de tres compuesta']
        ]);
      }
      return casos[t](r, dif);
    }
  });
})();
