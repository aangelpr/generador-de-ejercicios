/* Tipos de funcion */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  var G = EJ.guia.armar;

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
    var pasosT = [
      { pregunta: 'Lo primero que se prueba siempre son las DIFERENCIAS.<br>Calcula ' + vals[1] + ' &minus; (' + vals[0] + ')',
        resp: R.numero(vals[1] - vals[0], { dec: 2 }),
        pista: 'Resta el segundo valor menos el primero.', despues: '' },
      { pregunta: 'La siguiente diferencia: ' + vals[2] + ' &minus; (' + vals[1] + ')',
        resp: R.numero(vals[2] - vals[1], { dec: 2 }),
        pista: 'Mismo procedimiento con el siguiente par.',
        despues: 'Las diferencias van ' + (vals[1] - vals[0]) + ', ' + (vals[2] - vals[1]) + ', ' + (vals[3] - vals[2]) + '.' },
      { pregunta: '&iquest;Son constantes esas diferencias?',
        resp: R.opcion(['Si, todas valen lo mismo', 'No, van cambiando'], tipo === 0 ? 0 : 1),
        pista: tipo === 0 ? 'Suma siempre la misma cantidad: eso es una linea recta.'
          : 'No coinciden, asi que no es lineal. Toca seguir investigando.',
        despues: tipo === 0 ? 'Diferencias constantes = funcion LINEAL, y esa diferencia es la pendiente.'
          : 'Hay dos caminos mas: mirar la diferencia de las diferencias, o probar dividiendo.' }
    ];
    if (tipo !== 0) {
      pasosT.push({
        pregunta: 'Ahora probamos DIVIDIENDO: ' + vals[1] + ' &divide; (' + vals[0] + ') (2 decimales)',
        resp: R.numero(vals[1] / vals[0], { dec: 2, tol: 0.01 }),
        pista: 'Si al restar no salia constante, quiza al dividir si.',
        despues: 'Y el siguiente cociente es ' + F.n(vals[2] / vals[1], 2) + '.'
      });
      pasosT.push({
        pregunta: '&iquest;Son constantes los cocientes?',
        resp: R.opcion(['Si, siempre se multiplica por lo mismo', 'No, tampoco'], tipo === 2 ? 0 : 1),
        pista: tipo === 2 ? 'Cada valor es el anterior multiplicado por ' + base + ': crecimiento exponencial.'
          : 'Tampoco. Entonces hay que mirar la diferencia DE LAS diferencias: ' +
            ((vals[2] - vals[1]) - (vals[1] - vals[0])) + ', ' + ((vals[3] - vals[2]) - (vals[2] - vals[1])) + ', que si es constante.',
        despues: tipo === 2 ? 'Cociente constante = EXPONENCIAL.'
          : 'Segunda diferencia constante = CUADRATICA.'
      });
    }
    pasosT.push({
      pregunta: 'Entonces, &iquest;que tipo de funcion es?',
      resp: R.opcion(['Lineal', 'Cuadratica', 'Exponencial'], tipo),
      pista: 'Diferencias constantes: lineal. Segundas diferencias constantes: cuadratica. Cocientes constantes: exponencial.',
      despues: ''
    });
    return {
      guia: G({
        intro: 'Hay que identificar el tipo de funcion viendo solo una <b>tabla de valores</b>.<br>' +
          'Cada familia deja una huella distinta: la lineal <b>suma</b> siempre lo mismo, la exponencial <b>multiplica</b> ' +
          'siempre por lo mismo, y la cuadratica no hace ninguna de las dos, pero sus diferencias crecen de forma regular. ' +
          'Se prueba en ese orden.',
        pasos: pasosT,
        final: 'Es una funcion <b>' + ['lineal', 'cuadratica', 'exponencial'][tipo] + '</b>',
        receta: ['Primero restar valores consecutivos',
          'Diferencias constantes: LINEAL',
          'Si no, restar otra vez: segunda diferencia constante = CUADRATICA',
          'Si no, dividir: cociente constante = EXPONENCIAL',
          'Sumar siempre lo mismo es lineal; multiplicar siempre por lo mismo es exponencial']
      }),
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
      guia: G({
        intro: 'Con f(x) = <b>' + P.texto([a, b]) + '</b> y g(x) = <b>' + P.texto([c, d]) + '</b> hay que calcular ' +
          'f(g(' + x0 + ')) y g(f(' + x0 + ')).<br>' +
          'Una composicion se resuelve <b>de adentro hacia afuera</b>, como quitar capas. ' +
          'Y ojo, que el orden importa: f(g(x)) y g(f(x)) casi nunca dan lo mismo.',
        pasos: [
          { pregunta: 'En f(g(' + x0 + ')), &iquest;por donde se empieza?',
            resp: R.opcion(['Por el parentesis de adentro, g(' + x0 + ')',
              'Por la funcion de afuera, f'], 0),
            pista: 'Igual que en cualquier expresion con parentesis: primero lo de mas adentro. ' +
              'No se puede aplicar f hasta saber que numero le vas a meter.',
            despues: '' },
          { pregunta: 'Calcula g(' + x0 + ') = ' + c + '(' + x0 + ') ' + (d < 0 ? '&minus; ' + (-d) : '+ ' + d),
            resp: R.numero(gx, { dec: 2 }),
            pista: 'Multiplica y luego suma.',
            despues: 'g(' + x0 + ') = ' + gx + '. Ese numero es el que entra ahora en f.' },
          { pregunta: 'Ahora aplica f a ese resultado: f(' + gx + ') = ' + a + '(' + gx + ') ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b),
            resp: R.numero(fgx, { dec: 2 }),
            pista: 'Sustituye ' + gx + ' en la f.',
            despues: 'Ya tenemos f(g(' + x0 + ')) = ' + fgx + '.' },
          { pregunta: 'Ahora al reves. Empieza por dentro otra vez: f(' + x0 + ')',
            resp: R.numero(a * x0 + b, { dec: 2 }),
            pista: a + '(' + x0 + ') ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b) + '.',
            despues: '' },
          { pregunta: 'Y aplicale g: g(' + (a * x0 + b) + ')',
            resp: R.numero(gfx, { dec: 2 }),
            pista: c + '(' + (a * x0 + b) + ') ' + (d < 0 ? '&minus; ' + (-d) : '+ ' + d) + '.',
            despues: '' },
          { pregunta: 'Comparando ' + fgx + ' con ' + gfx + ': &iquest;importa el orden de la composicion?',
            resp: R.opcion(['Si, dan resultados distintos', 'No, da igual el orden'], fgx === gfx ? 1 : 0),
            pista: fgx === gfx ? 'En este caso concreto coincidieron, pero es casualidad: en general NO da lo mismo.'
              : 'Salieron ' + fgx + ' y ' + gfx + ': distintos. La composicion no es conmutativa.',
            despues: 'Por eso siempre hay que leer con cuidado cual va adentro y cual afuera.' },
          { pregunta: 'Escribe las dos respuestas.',
            resp: R.varios([
              { etiqueta: 'f(g(' + x0 + '))', resp: R.numero(fgx, { dec: 2 }) },
              { etiqueta: 'g(f(' + x0 + '))', resp: R.numero(gfx, { dec: 2 }) }
            ]),
            pista: fgx + ' y ' + gfx + '.',
            despues: '' }
        ],
        final: 'f(g(' + x0 + ')) = <b>' + fgx + '</b> y g(f(' + x0 + ')) = <b>' + gfx + '</b>',
        receta: ['Resolver de adentro hacia afuera',
          'El resultado de la funcion interior es la entrada de la exterior',
          'El orden importa: f(g(x)) no es g(f(x))',
          'Conviene anotar el resultado intermedio']
      }),
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
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
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
        var otras = r.muestra(pool.filter(function (o) { return o.t !== m.t; }), 3)
          .map(function (o) { return o.por; });
        var desc = r.baraja([m.por].concat(otras));
        guiaDelPaso = EJ.guia.tipoFuncion(texto, desc, desc.indexOf(m.por), TIPOS, m.t);
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
          guiaDelPaso = G({
            intro: 'Hay que encontrar la inversa de <b>f(x) = ' + P.texto([a, b]) + '</b>.<br>' +
              'La inversa es la funcion que DESHACE lo que hizo f. Si f multiplica por ' + a + ' y suma ' + b + ', ' +
              'la inversa tiene que restar ' + b + ' y dividir entre ' + a + ', en ese orden. ' +
              'El metodo mecanico para encontrarla es: escribir y = f(x), intercambiar x con y, y despejar.',
            pasos: [
              { pregunta: '&iquest;Cual es el primer paso del metodo?',
                resp: R.opcion(['Escribir y = f(x) e intercambiar la x con la y',
                  'Cambiarle el signo a todos los terminos'], 0),
                pista: 'Invertir una funcion es intercambiar los papeles de entrada y salida. Por eso se intercambian las letras.',
                despues: 'Queda x = ' + a + 'y ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b) + ', y ahora se despeja la y.' },
              { pregunta: 'Pasa el ' + b + ' al otro lado. &iquest;Que queda a la izquierda?',
                resp: R.expresion('x-(' + b + ')', { mostrar: 'x ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b) }),
                pista: 'Cambia de signo al cruzar el igual: queda x ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b) + ' = ' + a + 'y.',
                despues: 'Se deshacen las operaciones en orden inverso: primero la suma, luego la multiplicacion.' },
              { pregunta: 'Ahora divide entre ' + a + ' y escribe la inversa en terminos de x.',
                resp: R.expresion('(x-(' + b + '))/(' + a + ')', {
                  mostrar: F.frac('x ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b), a) }),
                pista: 'Es ' + F.frac('x ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b), a) + '. Ojo: TODO el numerador se divide, por eso va el parentesis.',
                despues: '' },
              { pregunta: '&iquest;Como se comprueba que una inversa esta bien?',
                resp: R.opcion(['Componiendolas: f(f&#8315;&sup1;(x)) tiene que dar x',
                  'No se puede comprobar'], 0),
                pista: 'Si una deshace a la otra, aplicar las dos seguidas te deja donde empezaste.',
                despues: 'Tambien sirve de comprobacion visual: las graficas de f y su inversa son espejos respecto a la recta y = x.' }
            ],
            final: 'f&#8315;&sup1;(x) = <b>' + F.frac('x ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b), a) + '</b>',
            receta: ['La inversa deshace lo que hizo la funcion',
              'Escribir y = f(x) e intercambiar x con y',
              'Despejar la y, deshaciendo las operaciones en orden inverso',
              'Comprobar componiendo: debe salir x',
              'Sus graficas son espejos respecto a y = x']
          });
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
          guiaDelPaso = G({
            intro: 'Con f(x) = <b>' + P.texto([a, b]) + '</b> y g(x) = <b>' + P.texto([c, d]) + '</b> hay que encontrar <b>f(g(x))</b>.<br>' +
              'A diferencia de evaluar en un numero, aqui el resultado es otra FUNCION. ' +
              'La idea es la misma: donde f dice "x", se escribe toda la g completa.',
            pasos: [
              { pregunta: '&iquest;Que significa f(g(x))?',
                resp: R.opcion(['Meter toda la funcion g dentro de la x de f',
                  'Multiplicar f por g'], 0),
                pista: 'Componer no es multiplicar. La g se convierte en la entrada de la f.',
                despues: 'Queda f(g(x)) = ' + a + '(' + P.texto([c, d]) + ') ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b) + '. Fijate en los PARENTESIS: sin ellos sale mal.' },
              { pregunta: 'Distribuye el ' + a + ' dentro del parentesis.<br>&iquest;Que queda?',
                resp: R.expresion(P.expr(P.escala([c, d], a)), { mostrar: P.texto(P.escala([c, d], a)) }),
                pista: 'Multiplica ' + a + ' por cada termino: queda ' + P.texto(P.escala([c, d], a)) + '.',
                despues: 'Este es el paso donde mas se falla: multiplicar solo el primer termino y olvidar el segundo.' },
              { pregunta: 'Ahora suma el ' + b + ' que quedaba fuera y escribe el resultado final.',
                resp: R.expresion(P.expr(comp), { mostrar: P.texto(comp) }),
                pista: 'Junta los terminos independientes: queda ' + P.texto(comp) + '.',
                despues: 'Comprobacion: si evaluas esta funcion en un numero, debe dar lo mismo que hacer g primero y f despues.' }
            ],
            final: '(f &#8728; g)(x) = <b>' + P.texto(comp) + '</b>',
            receta: ['Componer no es multiplicar',
              'Sustituir toda la g en el lugar de la x de f',
              'Poner PARENTESIS al sustituir',
              'Distribuir y reducir terminos semejantes',
              'Comprobar evaluando en un numero cualquiera']
          });
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
          guiaDelPaso = G({
            intro: 'Hay que decidir si <b>f(x) = ' + cs.f + '</b> es inyectiva en todos los reales.<br>' +
              'Inyectiva (o "uno a uno") significa que <b>nunca repite valores</b>: dos x distintas no pueden dar la misma y. ' +
              'Importa porque solo las funciones inyectivas tienen inversa.',
            pasos: [
              { pregunta: '&iquest;En que consiste la prueba de la recta horizontal?',
                resp: R.opcion(['Si alguna recta horizontal corta la grafica dos veces, no es inyectiva',
                  'Si la grafica corta el eje x dos veces, no es inyectiva'], 0),
                pista: 'Una recta horizontal es "todos los puntos con la misma y". Si toca la curva dos veces, ' +
                  'hay dos x distintas con la misma imagen, que es justo lo que no puede pasar.',
                despues: 'Cortar el eje x varias veces no tiene nada que ver: eso solo son los ceros.' },
              { pregunta: 'Para esta funcion, &iquest;existen dos valores distintos de x con la misma imagen?',
                resp: R.opcion(['Si existen', 'No, cada x da un valor distinto'], cs.iny ? 1 : 0),
                pista: 'Aqui ' + cs.por + '.',
                despues: cs.iny ? 'Al ser siempre creciente (o siempre decreciente), nunca puede volver a pasar por la misma altura.'
                  : 'Basta con encontrar un solo par repetido para descartarla.' },
              { pregunta: 'Entonces, &iquest;es inyectiva?',
                resp: R.opcion(['Si es inyectiva', 'No es inyectiva'], cs.iny ? 0 : 1),
                pista: cs.iny ? 'No repite valores en ningun punto.' : 'Repite valores, asi que no lo es.',
                despues: cs.iny ? 'Y por eso tiene inversa en todos los reales.'
                  : 'Por eso no tiene inversa... a menos que le recortes el dominio a un solo lado.' }
            ],
            final: '<b>' + (cs.iny ? 'Si' : 'No') + '</b> es inyectiva',
            receta: ['Inyectiva = nunca repite valores de y',
              'Prueba de la recta horizontal',
              'Rectas y cubicas suelen serlo; parabolas y valor absoluto no',
              'Las que suben y bajan repiten valores',
              'Solo las inyectivas tienen inversa']
          });
          enun = '&iquest;La funcion f(x) = ' + cs.f + ' es inyectiva (uno a uno) en todos los reales?';
          resp = R.opcion(['Si es inyectiva', 'No es inyectiva'], cs.iny ? 0 : 1);
          pistas = ['Prueba de la recta horizontal: si alguna recta horizontal corta la grafica dos veces, no es inyectiva.',
            'Pregunta clave: &iquest;hay dos valores distintos de x con la misma imagen?'];
          sol = ['Aplico la prueba de la recta horizontal',
            'Aqui ' + cs.por,
            'Por lo tanto <b>' + (cs.iny ? 'si' : 'no') + '</b> es inyectiva'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
