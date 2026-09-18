/* Tipos de funcion */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  var extra = {};

  extra.tabla = function (r) {
    var tipo = r.entero(0, 2);   // 0 lineal, 1 cuadratica, 2 exponencial
    var vals = [], i;
    var m = r.enteroNoCero(-5, 6), b = r.entero(-6, 6);
    var base = r.elige([2, 3]);
    /* ningun valor puede ser 0: al dividir para buscar el patron daria infinito */
    for (i = 1; i <= 4; i++) {
      if (tipo === 0) vals.push(m * i + b);
      else if (tipo === 1) vals.push(i * i + m);
      else vals.push(Math.pow(base, i));
    }
    while (vals.indexOf(0) !== -1) {
      vals = [];
      b = r.enteroNoCero(-6, 7); m = r.enteroNoCero(-5, 6);
      for (i = 1; i <= 4; i++) {
        if (tipo === 0) vals.push(m * i + b);
        else if (tipo === 1) vals.push(i * i + m);
        else vals.push(Math.pow(base, i));
      }
    }
    var pista = tipo === 0 ? 'Las diferencias son constantes.'
      : tipo === 1 ? 'Las primeras diferencias crecen de 2 en 2 (la segunda diferencia es constante).'
        : 'Cada valor es el anterior multiplicado por ' + base + '.';
    return {
      enunciado: 'Observa la tabla y di que tipo de funcion es:' +
        '<table class="tabla"><tr><th>x</th><td>1</td><td>2</td><td>3</td><td>4</td></tr>' +
        '<tr><th>y</th>' + vals.map(function (v) { return '<td>' + v + '</td>'; }).join('') + '</tr></table>',
      respuesta: R.opcion(['Lineal', 'Cuadratica', 'Exponencial'], tipo),
      pistas: ['Calcula las diferencias entre valores consecutivos; si no son constantes, prueba dividiendolos.',
        pista],
      solucion: ['Diferencias: ' + [vals[1] - vals[0], vals[2] - vals[1], vals[3] - vals[2]].join(', '),
        'Cocientes: ' + [F.n(vals[1] / vals[0], 2), F.n(vals[2] / vals[1], 2), F.n(vals[3] / vals[2], 2)].join(', '),
        pista,
        'Es una funcion <b>' + ['lineal', 'cuadratica', 'exponencial'][tipo] + '</b>']
    };
  };

  extra.evaluarCompuesta = function (r) {
    var a = r.enteroNoCero(-4, 4), b = r.entero(-6, 6);
    var c = r.enteroNoCero(-3, 3), d = r.entero(-5, 5);
    var x0 = r.enteroNoCero(-4, 4);
    var gx = c * x0 + d;
    var fgx = a * gx + b;
    var gfx = c * (a * x0 + b) + d;
    return {
      enunciado: 'Si f(x) = ' + P.texto([a, b]) + ' y g(x) = ' + P.texto([c, d]) + ',<br>' +
        'calcula f(g(' + x0 + ')) y g(f(' + x0 + ')).',
      respuesta: R.varios([
        { etiqueta: 'f(g(' + x0 + '))', resp: R.numero(fgx, { dec: 2 }) },
        { etiqueta: 'g(f(' + x0 + '))', resp: R.numero(gfx, { dec: 2 }) }
      ]),
      pistas: ['Se resuelve de adentro hacia afuera: primero el parentesis interior.',
        'g(' + x0 + ') = ' + gx + ' y f(' + x0 + ') = ' + (a * x0 + b) + '.'],
      solucion: ['g(' + x0 + ') = ' + c + '(' + x0 + ') ' + (d < 0 ? '&minus; ' + (-d) : '+ ' + d) + ' = ' + gx,
        'f(' + gx + ') = ' + a + '(' + gx + ') ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b) + ' = <b>' + fgx + '</b>',
        'f(' + x0 + ') = ' + (a * x0 + b) + ', y g(' + (a * x0 + b) + ') = <b>' + gfx + '</b>',
        'Fijate que el orden SI importa: los dos resultados no son iguales']
    };
  };

  EJ.tema({
    id: 'tipos-funcion',
    materia: 'matematicas',
    grupo: 'Funciones',
    nombre: 'Tipos de funcion',
    descripcion: 'Identificar funciones lineales, cuadraticas, exponenciales, logaritmicas, racionales y mas.',
    formulario: 'Constante: f(x) = k &nbsp;&middot;&nbsp; Lineal: mx + b &nbsp;&middot;&nbsp; Cuadratica: ax&sup2;+bx+c &nbsp;&middot;&nbsp; Cubica: ax&sup3;+&hellip;<br>' +
      'Racional: cociente de polinomios &nbsp;&middot;&nbsp; Radical: la variable va dentro de una raiz<br>' +
      'Exponencial: a<sup>x</sup> (la variable en el exponente) &nbsp;&middot;&nbsp; Logaritmica: log(x) &nbsp;&middot;&nbsp; Trigonometrica: sen, cos, tan<br>' +
      'Inyectiva: a valores distintos de x corresponden valores distintos de y (pasa la prueba de la recta horizontal).',

    generar: function (dif, r) {
      var enun, resp, pistas, sol, a, b;
      var TIPOS = ['Constante', 'Lineal', 'Cuadratica', 'Cubica', 'Racional', 'Radical', 'Exponencial', 'Logaritmica', 'Trigonometrica', 'Valor absoluto'];

      if (dif === 'facil' || dif === 'medio') {
        var muestras = [
          { f: function () { return String(r.enteroNoCero(-9, 9)); }, t: 0, por: 'no aparece la variable: la salida siempre es la misma' },
          { f: function () { return P.texto([r.enteroNoCero(-6, 6), r.entero(-9, 9)]); }, t: 1, por: 'el mayor exponente de x es 1' },
          { f: function () { return P.texto([r.enteroNoCero(-4, 4), r.entero(-6, 6), r.entero(-8, 8)]); }, t: 2, por: 'el mayor exponente de x es 2' },
          { f: function () { return P.texto([r.enteroNoCero(-3, 3), r.entero(-5, 5), r.entero(-5, 5), r.entero(-6, 6)]); }, t: 3, por: 'el mayor exponente de x es 3' },
          { f: function () { return F.frac(P.texto([r.enteroNoCero(-4, 4), r.entero(-6, 6)]), P.texto([1, r.enteroNoCero(-7, 7)])); }, t: 4, por: 'es un cociente de polinomios' },
          { f: function () { return '&radic;<span class="rad">' + P.texto([r.entero(1, 5), r.entero(-8, 8)]) + '</span>'; }, t: 5, por: 'la variable esta dentro de una raiz' },
          { f: function () { return r.entero(2, 7) + '<sup>x</sup>'; }, t: 6, por: 'la variable esta en el exponente' },
          { f: function () { return 'log<sub>' + r.entero(2, 9) + '</sub>(x ' + (r.bool() ? '+ ' : '&minus; ') + r.entero(1, 6) + ')'; }, t: 7, por: 'la variable esta dentro de un logaritmo' },
          { f: function () { return r.entero(2, 5) + ' ' + r.elige(['sen', 'cos', 'tan']) + '(' + r.entero(2, 4) + 'x)'; }, t: 8, por: 'usa una razon trigonometrica' },
          { f: function () { return '|' + P.texto([r.enteroNoCero(-4, 4), r.entero(-7, 7)]) + '|'; }, t: 9, por: 'la expresion esta dentro de un valor absoluto' }
        ];
        var tf = r.subtema([
          ['expresion', 'Identificar por su expresion'],
          ['tabla', 'Identificar por una tabla']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        var pool = dif === 'facil' ? muestras.slice(0, 7) : muestras;
        var m = r.elige(pool);
        var texto = m.f();
        enun = '&iquest;Que tipo de funcion es f(x) = ' + texto + '?';
        resp = R.opcion(TIPOS, m.t);
        pistas = ['Fijate en donde esta la variable: en la base, en el exponente, dentro de una raiz, en un denominador&hellip;',
          'En este caso ' + m.por + '.'];
        sol = ['Analizo la forma de la expresion',
          'Aqui ' + m.por,
          'Es una funcion <b>' + TIPOS[m.t].toLowerCase() + '</b>'];
      } else {
        var t2 = r.subtema([
          ['inversa', 'Funcion inversa'],
          ['composicion', 'Composicion de funciones'],
          ['evaluarCompuesta', 'Evaluar una composicion'],
          ['inyectiva', 'Funciones inyectivas']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'inversa') {
          a = r.enteroNoCero(-6, 6); b = r.entero(-9, 9);
          enun = 'Encuentra la funcion inversa de f(x) = ' + P.texto([a, b]) + '.<br>Escribela en terminos de x.';
          resp = R.expresion('(x-(' + b + '))/(' + a + ')', {
            mostrar: F.frac('x ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b), a)
          });
          pistas = ['Escribe y = ' + P.texto([a, b] ) + ', intercambia x con y y despeja.',
            'x = ' + a + 'y ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b) + ' &rArr; y = (x ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b) + ')/' + a + '.'];
          sol = ['y = ' + P.texto([a, b]),
            'Intercambio: x = ' + a + 'y ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b),
            'Despejo y: y = <b>' + F.frac('x ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b), a) + '</b>'];
        } else if (t2 === 'composicion') {
          a = r.enteroNoCero(-5, 5); b = r.entero(-7, 7);
          var c = r.enteroNoCero(-4, 4), d = r.entero(-6, 6);
          var comp = P.suma(P.escala([c, d], a), [b]); // f(g(x)) con f = ax+b, g = cx+d
          enun = 'Si f(x) = ' + P.texto([a, b]) + ' y g(x) = ' + P.texto([c, d]) + ',<br>encuentra (f &#8728; g)(x) = f(g(x)).';
          resp = R.expresion(P.expr(comp), { mostrar: P.texto(comp) });
          pistas = ['Sustituye toda la funcion g(x) en el lugar de la x de f.',
            'f(g(x)) = ' + a + '(' + P.texto([c, d]) + ') ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b) + '.'];
          sol = ['f(g(x)) = ' + a + '&middot;g(x) ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b),
            '= ' + a + '(' + P.texto([c, d]) + ') ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b),
            '= ' + P.texto(P.escala([c, d], a)) + ' ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b),
            'Resultado: <b>' + P.texto(comp) + '</b>'];
        } else {
          var casos = [
            { f: P.texto([r.enteroNoCero(-5, 5), r.entero(-8, 8)]), iny: true, por: 'es una recta no horizontal: nunca repite valores' },
            { f: P.texto([r.enteroNoCero(-3, 3), r.entero(-6, 6), r.entero(-7, 7)]), iny: false, por: 'es una parabola: toma el mismo valor a los dos lados del vertice' },
            { f: 'x&sup3; ' + (r.bool() ? '+ ' : '&minus; ') + r.entero(1, 9), iny: true, por: 'la cubica x&sup3; siempre crece' },
            { f: 'x&sup2;', iny: false, por: 'f(2) = f(&minus;2) = 4' },
            { f: r.entero(2, 6) + '<sup>x</sup>', iny: true, por: 'la exponencial siempre crece (o siempre decrece)' },
            { f: '|x ' + (r.bool() ? '+ ' : '&minus; ') + r.entero(1, 7) + '|', iny: false, por: 'el valor absoluto repite valores a ambos lados del vertice' }
          ];
          var cs = r.elige(casos);
          enun = '&iquest;La funcion f(x) = ' + cs.f + ' es inyectiva (uno a uno) en todos los reales?';
          resp = R.opcion(['Si es inyectiva', 'No es inyectiva'], cs.iny ? 0 : 1);
          pistas = ['Prueba de la recta horizontal: si alguna recta horizontal corta la grafica dos veces, no es inyectiva.',
            'Pregunta clave: &iquest;hay dos valores distintos de x con la misma imagen?'];
          sol = ['Aplico la prueba de la recta horizontal',
            'Aqui ' + cs.por,
            'Por lo tanto <b>' + (cs.iny ? 'si' : 'no') + '</b> es inyectiva'];
        }
      }

      return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
