/* Polinomios: operaciones generales.
   Este archivo es el modelo de como se organiza un tema con varios subtemas:
   cada subtema es una funcion suelta y `generar` solo decide cual toca. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  function poliAleatorio(r, grado, min, max) {
    var p = [r.enteroNoCero(Math.max(min, -6), Math.max(1, max))];
    for (var i = 0; i < grado; i++) p.push(r.entero(min, max));
    return p;
  }
  function pr(p) { return '(' + P.texto(p) + ')'; }

  var casos = {};

  /* ---------- suma y resta ---------- */
  casos.suma = function (r, dif) {
    var g = dif === 'facil' ? r.entero(1, 2) : 3;
    var A = poliAleatorio(r, g, -8, 8);
    var B = poliAleatorio(r, r.entero(1, g), -8, 8);
    var esSuma = r.bool();
    var res = esSuma ? P.suma(A, B) : P.resta(A, B);
    return {
      enunciado: (esSuma ? 'Suma' : 'Resta') + ' los polinomios:<br>' + pr(A) + ' ' + (esSuma ? '+' : '&minus;') + ' ' + pr(B),
      respuesta: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
      pistas: [
        esSuma ? 'Junta los terminos que tienen la misma potencia de x.'
          : 'Al restar, el signo menos cambia TODOS los signos del segundo polinomio.',
        esSuma ? 'Ordena por grados y suma coeficiente con coeficiente.'
          : 'Reescribe como ' + pr(A) + ' + ' + pr(P.escala(B, -1)) + '.'
      ],
      solucion: [
        esSuma ? 'Sumo coeficientes del mismo grado' : 'Cambio los signos del segundo: ' + P.texto(P.escala(B, -1)),
        'Resultado: <b>' + P.texto(res) + '</b>'
      ]
    };
  };

  /* ---------- grado, coeficientes y ordenamiento ---------- */
  casos.grado = function (r) {
    var g = r.entero(3, 5);
    var p = poliAleatorio(r, g, -9, 9);
    while (p[p.length - 1] === 0) p[p.length - 1] = r.enteroNoCero(-9, 9);
    var desordenado = r.baraja(p.map(function (c, i) { return { c: c, e: p.length - 1 - i }; }))
      .filter(function (t) { return t.c !== 0; })
      .map(function (t) { return F.term(t.c, 'x', t.e); });
    return {
      enunciado: 'Del polinomio<br><span class="big">' + F.une(desordenado) + '</span><br>' +
        'indica su grado, su coeficiente principal y su termino independiente.',
      respuesta: R.varios([
        { etiqueta: 'Grado', resp: R.numero(g, { dec: 0 }) },
        { etiqueta: 'Coeficiente principal', resp: R.numero(p[0], { dec: 0 }) },
        { etiqueta: 'Termino independiente', resp: R.numero(p[p.length - 1], { dec: 0 }) }
      ]),
      pistas: [
        'El grado es el exponente mas grande que aparece; conviene ordenar de mayor a menor.',
        'Ordenado queda ' + P.texto(p) + '. El coeficiente principal acompana al termino de mayor grado y el independiente es el que no tiene x.'
      ],
      solucion: [
        'Ordeno de mayor a menor grado: ' + P.texto(p),
        'El exponente mayor es ' + g + ' &rArr; grado <b>' + g + '</b>',
        'Le acompana el coeficiente <b>' + p[0] + '</b>',
        'El termino sin x es <b>' + p[p.length - 1] + '</b>'
      ]
    };
  };

  /* ---------- valor numerico ---------- */
  casos.evaluar = function (r, dif) {
    var p = poliAleatorio(r, dif === 'facil' ? 2 : 3, -6, 6);
    var x0 = r.enteroNoCero(-4, 4);
    var res = P.evalua(p, x0);
    return {
      enunciado: 'Si P(x) = ' + P.texto(p) + ', calcula P(' + x0 + ').',
      respuesta: R.numero(res, { dec: 0 }),
      pistas: ['Sustituye x por ' + x0 + ' con cuidado de los signos en las potencias.',
        '(' + x0 + ')&sup2; = ' + (x0 * x0) + (p.length > 3 ? ' y (' + x0 + ')&sup3; = ' + Math.pow(x0, 3) : '') + '.'],
      solucion: [
        'Sustituyo cada x por (' + x0 + ')',
        'Calculo las potencias y multiplico por sus coeficientes',
        'P(' + x0 + ') = <b>' + res + '</b>'
      ]
    };
  };

  /* ---------- multiplicacion ---------- */
  casos.producto = function (r, dif) {
    var A = dif === 'dificil' ? poliAleatorio(r, 2, -5, 5) : [r.enteroNoCero(-4, 5), r.entero(-7, 7)];
    var B = poliAleatorio(r, 2, -6, 6);
    var res = P.multiplica(A, B);
    return {
      enunciado: 'Multiplica: ' + pr(A) + pr(B),
      respuesta: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
      pistas: ['Multiplica cada termino del primero por cada termino del segundo.',
        'Te salen ' + (A.length * B.length) + ' productos; luego reduce los semejantes.'],
      solucion: [
        'Aplico la propiedad distributiva termino a termino',
        F.term(A[0], 'x', A.length - 1) + ' &middot; ' + pr(B) + ' = ' + P.texto(P.multiplica([A[0]].concat(new Array(A.length - 1).fill(0)), B)),
        'Hago lo mismo con los demas terminos y sumo los semejantes',
        'Resultado: <b>' + P.texto(res) + '</b>'
      ]
    };
  };

  /* ---------- factor comun ---------- */
  casos.factorComun = function (r, dif) {
    var k = r.elige([2, 3, 4, 5, 6, -2, -3]);
    var m = dif === 'dificil' ? r.entero(1, 3) : r.entero(0, 2);
    var dentro = dif === 'dificil' ? poliAleatorio(r, 2, -7, 7) : [r.enteroNoCero(1, 6), r.enteroNoCero(-8, 8)];
    /* el polinomio visible es k*x^m*(dentro) */
    var expandido = P.multiplica(P.escala(dentro, k), [1].concat(new Array(m).fill(0)));
    var factorTxt = (k === 1 ? '' : k) + (m ? 'x' + (m > 1 ? F.sup(m) : '') : '');
    return {
      enunciado: 'Factoriza sacando el factor comun:<br><span class="big">' + P.texto(expandido) + '</span>',
      respuesta: R.factorizada('(' + k + ')*x^(' + m + ')*(' + P.expr(dentro) + ')', {
        mostrar: factorTxt + pr(dentro)
      }),
      guia: EJ.guia.factorComun(k, m, dentro),
      pistas: [
        'Busca que numero divide a TODOS los coeficientes y cual es la menor potencia de x que aparece en todos.',
        'El factor comun es ' + factorTxt + '. Divide cada termino entre el para saber que queda dentro del parentesis.'
      ],
      solucion: [
        'Maximo comun divisor de los coeficientes: ' + Math.abs(k),
        m ? 'La menor potencia de x presente en todos los terminos es x' + (m > 1 ? F.sup(m) : '') : 'No hay x en todos los terminos, asi que el factor comun es solo numerico',
        'Factor comun: ' + factorTxt,
        'Divido cada termino entre el factor comun: ' + P.texto(dentro),
        'Resultado: <b>' + factorTxt + pr(dentro) + '</b>'
      ]
    };
  };

  /* ---------- division entre un monomio ---------- */
  casos.entreMonomio = function (r) {
    var c = r.elige([2, 3, 4, 5]);
    var m = r.entero(1, 2);
    var q = poliAleatorio(r, 2, -6, 6);
    var dividendo = P.multiplica(P.escala(q, c), [1].concat(new Array(m).fill(0)));
    var divisor = F.term(c, 'x', m);
    return {
      enunciado: 'Divide: ' + F.frac(P.texto(dividendo), divisor),
      respuesta: R.expresion(P.expr(q), { mostrar: P.texto(q) }),
      pistas: ['Cuando el divisor es un solo monomio, se divide termino por termino.',
        'Para cada termino: divide el coeficiente entre ' + c + ' y resta ' + m + ' al exponente.'],
      solucion: [
        'Reparto la division entre cada termino del numerador',
        'Coeficientes divididos entre ' + c + ' y exponentes restados en ' + m,
        'Resultado: <b>' + P.texto(q) + '</b>'
      ]
    };
  };

  /* ---------- simplificar una expresion combinada ---------- */
  casos.combinada = function (r) {
    var A = poliAleatorio(r, 2, -6, 6);
    var B = poliAleatorio(r, 2, -6, 6);
    var k = r.elige([2, 3, -2]);
    var res = P.resta(A, P.escala(B, k));
    return {
      enunciado: 'Simplifica: ' + pr(A) + ' &minus; ' + k + pr(B),
      respuesta: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
      pistas: ['Primero multiplica el ' + k + ' por todo el segundo polinomio.',
        k + pr(B) + ' = ' + P.texto(P.escala(B, k)) + '. Ahora resta.'],
      solucion: [
        'Distribuyo: ' + k + pr(B) + ' = ' + P.texto(P.escala(B, k)),
        'Resto termino a termino (ojo con los signos)',
        'Resultado: <b>' + P.texto(res) + '</b>'
      ]
    };
  };

  /* ---------- division larga ---------- */
  casos.division = function (r) {
    var B = [1, r.enteroNoCero(-6, 6)];
    var Q = poliAleatorio(r, 2, -5, 5);
    var rem = r.enteroNoCero(-9, 9);
    var A = P.suma(P.multiplica(B, Q), [rem]);
    return {
      enunciado: 'Divide ' + P.texto(A) + ' entre ' + P.texto(B) + '.<br>Da el cociente y el residuo.',
      respuesta: R.varios([
        { etiqueta: 'Cociente', resp: R.expresion(P.expr(Q), { mostrar: P.texto(Q) }) },
        { etiqueta: 'Residuo', resp: R.numero(rem, { dec: 0 }) }
      ]),
      pistas: ['Divide el termino de mayor grado del dividendo entre el del divisor, multiplica, resta y repite.',
        'El primer termino del cociente es ' + F.term(Q[0], 'x', Q.length - 1) + '.'],
      solucion: [
        'Primer paso: ' + F.term(A[0], 'x', A.length - 1) + ' &divide; x = ' + F.term(Q[0], 'x', Q.length - 1),
        'Multiplico, resto y bajo el siguiente termino; repito hasta que el grado sea menor que el del divisor',
        'Cociente: <b>' + P.texto(Q) + '</b>',
        'Residuo: <b>' + rem + '</b>',
        'Comprobacion: ' + pr(B) + pr(Q) + ' + (' + rem + ') = ' + P.texto(A)
      ]
    };
  };

  /* ---------- division sintetica (Ruffini) ---------- */
  casos.sintetica = function (r) {
    var a = r.enteroNoCero(-4, 4);
    var Q = poliAleatorio(r, 2, -6, 6);
    var rem = r.entero(-9, 9);
    var A = P.suma(P.multiplica([1, -a], Q), [rem]);
    /* renglon de la division sintetica */
    var bajados = [A[0]], acumulado = A[0];
    for (var i = 1; i < A.length; i++) { acumulado = A[i] + acumulado * a; bajados.push(acumulado); }
    return {
      enunciado: 'Usa division sintetica para dividir<br><span class="big">' + P.texto(A) + '</span><br>entre (x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ').<br>Da el cociente y el residuo.',
      respuesta: R.varios([
        { etiqueta: 'Cociente', resp: R.expresion(P.expr(Q), { mostrar: P.texto(Q) }) },
        { etiqueta: 'Residuo', resp: R.numero(rem, { dec: 0 }) }
      ]),
      guia: EJ.guia.sintetica(A, a),
      pistas: [
        'Escribe solo los coeficientes ' + A.join(', ') + ' y usa como divisor el valor que anula al parentesis: x = ' + a + '.',
        'Baja el primer coeficiente, multiplicalo por ' + a + ', sumalo al siguiente y repite. El ultimo numero es el residuo.'
      ],
      solucion: [
        'Coeficientes del dividendo: ' + A.join(' | ') + ' &nbsp; y divisor x = ' + a,
        'Renglon de resultados: ' + bajados.join(' | '),
        'Los primeros numeros son el cociente (un grado menos): <b>' + P.texto(Q) + '</b>',
        'El ultimo es el residuo: <b>' + rem + '</b>'
      ]
    };
  };

  /* ---------- teorema del residuo ---------- */
  casos.residuo = function (r) {
    var p = poliAleatorio(r, 3, -7, 7);
    var a = r.enteroNoCero(-4, 4);
    var res = P.evalua(p, a);
    return {
      enunciado: 'Sin hacer la division, encuentra el residuo de dividir<br><span class="big">' + P.texto(p) + '</span><br>entre (x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ').',
      respuesta: R.numero(res, { dec: 0 }),
      pistas: ['Teorema del residuo: al dividir P(x) entre (x &minus; a), el residuo es P(a).',
        'Aqui a = ' + a + ', asi que solo hay que calcular P(' + a + ').'],
      solucion: [
        'El divisor (x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ') se anula en x = ' + a,
        'Por el teorema del residuo, el residuo es P(' + a + ')',
        'P(' + a + ') = <b>' + res + '</b>'
      ]
    };
  };

  /* ---------- teorema del factor ---------- */
  casos.factorTeorema = function (r) {
    var a = r.enteroNoCero(-4, 4);
    var esFactor = r.bool();
    var Q = poliAleatorio(r, 2, -5, 5);
    var p = P.multiplica([1, -a], Q);
    if (!esFactor) p = P.suma(p, [r.elige([1, -1, 2, -2, 3])]);
    var valor = P.evalua(p, a);
    return {
      enunciado: '&iquest;Es (x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ') un factor de<br><span class="big">' + P.texto(p) + '</span>?',
      respuesta: R.opcion(['Si es factor', 'No es factor'], esFactor ? 0 : 1),
      pistas: ['Teorema del factor: (x &minus; a) es factor de P(x) si y solo si P(a) = 0.',
        'Calcula P(' + a + ') y fijate si da cero.'],
      solucion: [
        'El divisor se anula en x = ' + a,
        'P(' + a + ') = ' + valor,
        valor === 0 ? 'Como da 0, <b>si</b> es factor (la division es exacta)' : 'Como no da 0 (residuo ' + valor + '), <b>no</b> es factor'
      ]
    };
  };

  /* ---------- factorizacion por agrupacion ---------- */
  casos.agrupacion = function (r) {
    var a = r.enteroNoCero(-6, 6);      // (x + a)
    var b = r.enteroNoCero(-7, 7);      // (x^2 + b)
    var p = P.multiplica([1, a], [1, 0, b]);   // x^3 + a x^2 + b x + ab
    return {
      enunciado: 'Factoriza agrupando terminos:<br><span class="big">' + P.texto(p) + '</span>',
      respuesta: R.factorizada('(x^2+(' + b + '))*(x+(' + a + '))', {
        mostrar: '(' + F.poli([1, 0, b], 'x') + ')(' + F.poli([1, a], 'x') + ')'
      }),
      pistas: [
        'Agrupa los dos primeros terminos y los dos ultimos, y saca factor comun en cada grupo.',
        'De x&sup3; ' + (a > 0 ? '+ ' + a : '&minus; ' + (-a)) + 'x&sup2; sale x&sup2;(x ' + (a > 0 ? '+ ' + a : '&minus; ' + (-a)) + '); del otro grupo debe salir el mismo parentesis.'
      ],
      solucion: [
        'Agrupo: (' + F.une([F.term(1, 'x', 3), F.term(a, 'x', 2)]) + ') + (' + F.une([F.term(b, 'x', 1), String(a * b)]) + ')',
        'Factor comun de cada grupo: x&sup2;(x ' + (a > 0 ? '+ ' + a : '&minus; ' + (-a)) + ') + ' + b + '(x ' + (a > 0 ? '+ ' + a : '&minus; ' + (-a)) + ')',
        'Ahora (x ' + (a > 0 ? '+ ' + a : '&minus; ' + (-a)) + ') es factor comun de todo',
        'Resultado: <b>(' + F.poli([1, 0, b], 'x') + ')(' + F.poli([1, a], 'x') + ')</b>'
      ]
    };
  };

  /* ---------- cuadrado de un trinomio ---------- */
  casos.cuadradoTrinomio = function (r) {
    var a = r.enteroNoCero(-4, 4), b = r.enteroNoCero(-5, 5), c = r.enteroNoCero(-5, 5);
    var tri = [a, b, c], res = P.potencia(tri, 2);
    return {
      enunciado: 'Desarrolla: ' + pr(tri) + '&sup2;',
      respuesta: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
      pistas: ['(a + b + c)&sup2; = a&sup2; + b&sup2; + c&sup2; + 2ab + 2ac + 2bc.',
        'Aqui a = ' + F.term(a, 'x', 2) + ', b = ' + F.term(b, 'x', 1) + ', c = ' + c + '.'],
      solucion: [
        'Cuadrados: ' + F.term(a * a, 'x', 4) + ', ' + F.term(b * b, 'x', 2) + ', ' + (c * c),
        'Dobles productos: 2ab = ' + F.term(2 * a * b, 'x', 3) + ', 2ac = ' + F.term(2 * a * c, 'x', 2) + ', 2bc = ' + F.term(2 * b * c, 'x', 1),
        'Sumo todo: <b>' + P.texto(res) + '</b>'
      ]
    };
  };

  EJ.tema({
    id: 'polinomios',
    materia: 'matematicas',
    grupo: 'Algebra',
    nombre: 'Polinomios (operaciones generales)',
    descripcion: 'Suma, resta, producto, division, factor comun, agrupacion, division sintetica y teoremas del residuo y del factor.',
    formulario: 'Se suman o restan solo terminos semejantes.<br>' +
      'Producto: propiedad distributiva termino a termino.<br>' +
      'Division: Dividendo = divisor &middot; cociente + residuo, con grado(residuo) &lt; grado(divisor).<br>' +
      'Teorema del residuo: el residuo de dividir P(x) entre (x &minus; a) es P(a).<br>' +
      'Teorema del factor: (x &minus; a) es factor de P(x) si P(a) = 0.',

    generar: function (dif, r) {
      var id;
      if (dif === 'facil') {
        id = r.subtema([
          ['suma', 'Suma y resta'],
          ['grado', 'Grado y coeficientes'],
          ['evaluar', 'Valor numerico'],
          ['factorComun', 'Factor comun']
        ]);
      } else if (dif === 'medio') {
        id = r.subtema([
          ['producto', 'Multiplicacion'],
          ['combinada', 'Simplificar expresion'],
          ['factorComun', 'Factor comun'],
          ['entreMonomio', 'Division entre monomio'],
          ['residuo', 'Teorema del residuo'],
          ['suma', 'Suma y resta']
        ]);
      } else {
        id = r.subtema([
          ['division', 'Division larga'],
          ['sintetica', 'Division sintetica'],
          ['agrupacion', 'Factorizar por agrupacion'],
          ['factorTeorema', 'Teorema del factor'],
          ['factorComun', 'Factor comun'],
          ['cuadradoTrinomio', 'Cuadrado de un trinomio'],
          ['producto', 'Multiplicacion']
        ]);
      }
      return casos[id](r, dif);
    }
  });
})();
