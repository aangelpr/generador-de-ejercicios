/* Leyes de los signos */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function p(x) { return x < 0 ? '(' + x + ')' : String(x); }

  /* Subtemas agregados aparte del bloque principal. */
  var extra = {};

  extra.valorAbsoluto = function (r) {
    var a = r.enteroNoCero(-15, 15), b = r.enteroNoCero(-12, 12), c = r.enteroNoCero(-9, 9);
    var val = Math.abs(a) + Math.abs(b) - Math.abs(c);
    return {
      enunciado: 'Calcula: |' + a + '| + |' + b + '| &minus; |' + c + '|',
      respuesta: R.numero(val, { dec: 0 }),
      pistas: ['El valor absoluto es la distancia al cero: siempre sale positivo.',
        '|' + a + '| = ' + Math.abs(a) + ', |' + b + '| = ' + Math.abs(b) + ', |' + c + '| = ' + Math.abs(c) + '.'],
      solucion: ['Quito los signos dentro de las barras: ' + Math.abs(a) + ' + ' + Math.abs(b) + ' &minus; ' + Math.abs(c),
        'Opero de izquierda a derecha',
        'Resultado: <b>' + val + '</b>']
    };
  };

  extra.potenciaSigno = function (r) {
    var base = r.entero(2, 5), n = r.entero(2, 4);
    var conParentesis = r.bool();
    var val = conParentesis ? Math.pow(-base, n) : -Math.pow(base, n);
    return {
      enunciado: 'Calcula: ' + (conParentesis ? '(&minus;' + base + ')' + F.sup(n) : '&minus;' + base + F.sup(n)),
      respuesta: R.numero(val, { dec: 0 }),
      pistas: [
        'Ojo con el parentesis: en (&minus;a)<sup>n</sup> el signo tambien se eleva; en &minus;a<sup>n</sup> el signo se queda afuera.',
        conParentesis ? 'Aqui la base es &minus;' + base + ' y el exponente ' + n + ' es ' + (n % 2 === 0 ? 'par' : 'impar') + '.'
          : 'Aqui primero se calcula ' + base + F.sup(n) + ' = ' + Math.pow(base, n) + ' y al final se le pone el menos.'
      ],
      solucion: conParentesis
        ? ['La base completa es (&minus;' + base + ')',
          'Exponente ' + n + ' (' + (n % 2 === 0 ? 'par' : 'impar') + ') &rArr; resultado ' + (val > 0 ? 'positivo' : 'negativo'),
          'Resultado: <b>' + val + '</b>']
        : ['Sin parentesis, el exponente solo afecta al ' + base,
          base + F.sup(n) + ' = ' + Math.pow(base, n),
          'El signo menos queda afuera: <b>' + val + '</b>']
    };
  };

  extra.fraccionesSigno = function (r) {
    var a = r.enteroNoCero(-9, 9), b = r.entero(2, 9);
    var c = r.enteroNoCero(-9, 9), d = r.entero(2, 9);
    var num = a * c, den = b * d;
    var s = F.simplifica(num, den);
    function fr(x, y) { return x < 0 ? '(&minus;' + F.frac(-x, y) + ')' : F.frac(x, y); }
    return {
      enunciado: 'Multiplica y simplifica: ' + fr(a, b) + ' &middot; ' + fr(c, d),
      respuesta: R.fraccion(s[0], s[1]),
      pistas: ['Primero decide el signo del resultado con la regla de los signos; despues multiplica.',
        'Signos ' + (a < 0 ? '&minus;' : '+') + ' y ' + (c < 0 ? '&minus;' : '+') + ' dan ' + (num < 0 ? 'negativo' : 'positivo') + '.'],
      solucion: ['Signo del resultado: ' + (num < 0 ? 'negativo' : 'positivo'),
        'Numeradores: ' + a + ' &middot; ' + c + ' = ' + num + '; denominadores: ' + b + ' &middot; ' + d + ' = ' + den,
        'Simplifico: <b>' + F.fracSimp(num, den) + '</b>']
    };
  };

  EJ.tema({
    id: 'leyes-signos',
    materia: 'matematicas',
    grupo: 'Aritmetica y algebra basica',
    nombre: 'Leyes de los signos',
    descripcion: 'Suma, resta, multiplicacion y division con numeros positivos y negativos.',
    formulario: '(+)(+) = + &nbsp; (&minus;)(&minus;) = + &nbsp; (+)(&minus;) = &minus; &nbsp; (&minus;)(+) = &minus;<br>' +
      'Restar es sumar el opuesto: a &minus; (&minus;b) = a + b. Una potencia de base negativa es positiva si el exponente es par.',

    generar: function (dif, r) {
      var a, b, c, d, val, enun, pistas, sol;

      if (dif === 'facil') {
        var tipo = r.subtema([
          ['suma', 'Suma y resta'],
          ['producto', 'Multiplicacion'],
          ['cociente', 'Division'],
          ['valorAbsoluto', 'Valor absoluto']
        ]);
        if (extra[tipo]) return extra[tipo](r, dif);
        if (tipo === 'producto') {
          a = r.enteroNoCero(-12, 12); b = r.enteroNoCero(-12, 12);
          val = a * b;
          enun = 'Calcula: ' + p(a) + ' &middot; ' + p(b);
          pistas = [
            'Signos iguales dan resultado positivo; signos distintos dan resultado negativo.',
            'Multiplica los valores absolutos: ' + Math.abs(a) + ' &middot; ' + Math.abs(b) + ' = ' + Math.abs(val) + '. Solo falta decidir el signo.'
          ];
          sol = [
            'Los signos son ' + (a < 0 ? 'negativo' : 'positivo') + ' y ' + (b < 0 ? 'negativo' : 'positivo') + ', asi que el resultado es ' + (val < 0 ? 'negativo' : 'positivo') + '.',
            Math.abs(a) + ' &middot; ' + Math.abs(b) + ' = ' + Math.abs(val),
            'Resultado: <b>' + val + '</b>'
          ];
        } else if (tipo === 'suma') {
          a = r.enteroNoCero(-20, 20); b = r.enteroNoCero(-20, 20);
          var op = r.elige(['+', '-']);
          val = op === '+' ? a + b : a - b;
          enun = 'Calcula: ' + a + ' ' + op + ' ' + p(b);
          pistas = [
            op === '-' ? 'Restar un numero es sumar su opuesto: a &minus; (&minus;b) = a + b.' : 'Si los signos son iguales se suman y se conserva el signo; si son distintos se restan y manda el de mayor valor absoluto.',
            'Queda ' + a + ' ' + (op === '-' ? (b < 0 ? '+ ' + Math.abs(b) : '- ' + b) : (b < 0 ? '- ' + Math.abs(b) : '+ ' + b)) + '.'
          ];
          sol = [
            op === '-' ? 'Cambio la resta por suma del opuesto: ' + a + ' &minus; ' + p(b) + ' = ' + a + ' ' + (b < 0 ? '+ ' + Math.abs(b) : '&minus; ' + b) : 'Sumo directamente.',
            'Resultado: <b>' + val + '</b>'
          ];
        } else {
          b = r.enteroNoCero(-9, 9);
          var q = r.enteroNoCero(-9, 9);
          a = b * q;
          val = q;
          enun = 'Calcula: ' + p(a) + ' &divide; ' + p(b);
          pistas = [
            'La division sigue la misma regla de signos que la multiplicacion.',
            Math.abs(a) + ' &divide; ' + Math.abs(b) + ' = ' + Math.abs(q) + '. Falta el signo.'
          ];
          sol = [
            'Signos ' + (a < 0 ? '&minus;' : '+') + ' y ' + (b < 0 ? '&minus;' : '+') + ' dan ' + (val < 0 ? 'negativo' : 'positivo') + '.',
            'Resultado: <b>' + val + '</b>'
          ];
        }
      } else if (dif === 'medio') {
        var tipo2 = r.subtema([
          ['triple', 'Varios factores'],
          ['mixta', 'Jerarquia de operaciones'],
          ['cocienteProd', 'Producto entre division'],
          ['potenciaSigno', 'Potencias de negativos']
        ]);
        if (extra[tipo2]) return extra[tipo2](r, dif);
        if (tipo2 === 'triple') {
          a = r.enteroNoCero(-8, 8); b = r.enteroNoCero(-8, 8); c = r.enteroNoCero(-6, 6);
          val = a * b * c;
          enun = 'Calcula: ' + p(a) + ' &middot; ' + p(b) + ' &middot; ' + p(c);
          var negs = [a, b, c].filter(function (x) { return x < 0; }).length;
          pistas = [
            'Cuenta cuantos factores negativos hay: si son pares el resultado es positivo, si son impares es negativo.',
            'Hay ' + negs + ' factor(es) negativo(s), asi que el signo es ' + (negs % 2 === 0 ? 'positivo' : 'negativo') + '.'
          ];
          sol = [
            'Producto de los valores absolutos: ' + Math.abs(a) + ' &middot; ' + Math.abs(b) + ' &middot; ' + Math.abs(c) + ' = ' + Math.abs(val),
            negs + ' negativos &rarr; signo ' + (negs % 2 === 0 ? 'positivo' : 'negativo'),
            'Resultado: <b>' + val + '</b>'
          ];
        } else if (tipo2 === 'mixta') {
          a = r.enteroNoCero(-15, 15); b = r.enteroNoCero(-10, 10); c = r.enteroNoCero(-9, 9); d = r.enteroNoCero(-6, 6);
          val = a - b + c * d;
          enun = 'Calcula: ' + a + ' &minus; ' + p(b) + ' + ' + p(c) + ' &middot; ' + p(d);
          pistas = [
            'Primero la multiplicacion, despues las sumas y restas (jerarquia de operaciones).',
            p(c) + ' &middot; ' + p(d) + ' = ' + (c * d) + '.'
          ];
          sol = [
            'Multiplico primero: ' + p(c) + ' &middot; ' + p(d) + ' = ' + (c * d),
            'Queda ' + a + ' &minus; ' + p(b) + ' + ' + p(c * d) + ' = ' + (a - b) + ' + ' + p(c * d),
            'Resultado: <b>' + val + '</b>'
          ];
        } else {
          c = r.enteroNoCero(-6, 6);
          a = r.enteroNoCero(-9, 9); b = r.enteroNoCero(-9, 9);
          var prod = a * b;
          var den = r.elige([c, -c]);
          while (prod % den !== 0) { b = r.enteroNoCero(-9, 9); prod = a * b; }
          val = prod / den;
          enun = 'Calcula: ' + F.frac(p(a) + ' &middot; ' + p(b), p(den));
          pistas = [
            'Resuelve primero el numerador con la regla de los signos.',
            'Numerador: ' + p(a) + ' &middot; ' + p(b) + ' = ' + prod + '.'
          ];
          sol = [
            'Numerador: ' + p(a) + ' &middot; ' + p(b) + ' = ' + prod,
            prod + ' &divide; ' + p(den) + ' = ' + val,
            'Resultado: <b>' + val + '</b>'
          ];
        }
      } else {
        var tipo3 = r.subtema([
          ['anidado', 'Parentesis anidados'],
          ['potencias', 'Potencias y division'],
          ['fraccionesSigno', 'Fracciones con signo']
        ]);
        if (extra[tipo3]) return extra[tipo3](r, dif);
        if (tipo3 === 'potencias') {
          a = r.enteroNoCero(-4, -2); b = r.enteroNoCero(2, 4);
          var n = r.entero(2, 3), m = r.entero(2, 3);
          c = r.elige([-2, -3, 2, 3]);
          var num = Math.pow(a, n) * Math.pow(-b, m);
          val = num / c;
          var i = 0;
          while (Math.abs(val - Math.round(val)) > 1e-9 && i < 30) {
            c = r.elige([-2, -3, 2, 3, -4, 4]);
            val = num / c; i++;
          }
          if (Math.abs(val - Math.round(val)) > 1e-9) { c = 1; val = num; }
          enun = 'Calcula: ' + F.frac('(' + a + ')' + F.sup(n) + ' &middot; (' + (-b) + ')' + F.sup(m), p(c));
          pistas = [
            'Una base negativa elevada a exponente par da positivo; a exponente impar, negativo.',
            '(' + a + ')' + F.sup(n) + ' = ' + Math.pow(a, n) + ' y (' + (-b) + ')' + F.sup(m) + ' = ' + Math.pow(-b, m) + '.'
          ];
          sol = [
            '(' + a + ')' + F.sup(n) + ' = ' + Math.pow(a, n) + ' (exponente ' + (n % 2 === 0 ? 'par' : 'impar') + ')',
            '(' + (-b) + ')' + F.sup(m) + ' = ' + Math.pow(-b, m) + ' (exponente ' + (m % 2 === 0 ? 'par' : 'impar') + ')',
            'Numerador: ' + Math.pow(a, n) + ' &middot; ' + Math.pow(-b, m) + ' = ' + num,
            num + ' &divide; ' + p(c) + ' = <b>' + val + '</b>'
          ];
        } else {
          a = r.enteroNoCero(-12, 12); b = r.enteroNoCero(-9, 9);
          c = r.enteroNoCero(-9, 9); d = r.enteroNoCero(-5, 5);
          var e = r.enteroNoCero(-5, 5);
          var dentro = b - c;
          var corchete = a - dentro;
          val = -corchete + d * e;
          enun = 'Calcula: &minus;[ ' + a + ' &minus; ( ' + b + ' &minus; ' + p(c) + ' ) ] + ' + p(d) + ' &middot; ' + p(e);
          pistas = [
            'Empieza por el parentesis mas interno y ve saliendo.',
            '( ' + b + ' &minus; ' + p(c) + ' ) = ' + dentro + ', asi que el corchete queda [ ' + a + ' &minus; ' + p(dentro) + ' ].'
          ];
          sol = [
            'Parentesis interno: ' + b + ' &minus; ' + p(c) + ' = ' + dentro,
            'Corchete: ' + a + ' &minus; ' + p(dentro) + ' = ' + corchete,
            'El signo menos de fuera cambia el corchete: &minus;(' + corchete + ') = ' + (-corchete),
            'Producto: ' + p(d) + ' &middot; ' + p(e) + ' = ' + (d * e),
            'Suma final: ' + (-corchete) + ' + ' + p(d * e) + ' = <b>' + val + '</b>'
          ];
        }
      }

      return {
        enunciado: enun,
        respuesta: R.numero(val, { dec: 0 }),
        pistas: pistas,
        solucion: sol
      };
    }
  });
})();
