/* Funciones pares e impares */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  var TIPOS = ['Par (simetrica respecto al eje y)', 'Impar (simetrica respecto al origen)', 'Ni par ni impar'];

  var extra = {};

  extra.desdeTabla = function (r) {
    var tipo = r.entero(0, 2);
    var v1 = r.enteroNoCero(-9, 9), v2 = r.enteroNoCero(-9, 9);
    var f = {};
    if (tipo === 0) { f = { m2: v1, m1: v2, p1: v2, p2: v1 }; }        // par
    else if (tipo === 1) { f = { m2: -v1, m1: -v2, p1: v2, p2: v1 }; } // impar
    else { f = { m2: v1, m1: v2, p1: v2 + r.elige([1, -1, 2]), p2: v1 }; }
    var fila = function (k) { return '<td>' + f[k] + '</td>'; };
    return {
      enunciado: 'Con esta tabla de valores de f(x), clasifica la funcion:' +
        '<table class="tabla"><tr><th>x</th><td>&minus;2</td><td>&minus;1</td><td>1</td><td>2</td></tr>' +
        '<tr><th>f(x)</th>' + fila('m2') + fila('m1') + fila('p1') + fila('p2') + '</tr></table>',
      respuesta: R.opcion(TIPOS, tipo),
      pistas: ['Compara f(&minus;2) con f(2) y f(&minus;1) con f(1).',
        'Si son iguales es par; si son opuestos (mismo numero con signo cambiado) es impar.'],
      solucion: ['f(&minus;2) = ' + f.m2 + ' y f(2) = ' + f.p2,
        'f(&minus;1) = ' + f.m1 + ' y f(1) = ' + f.p1,
        tipo === 0 ? 'Los valores coinciden &rArr; f(&minus;x) = f(x): es <b>par</b>'
          : tipo === 1 ? 'Los valores son opuestos &rArr; f(&minus;x) = &minus;f(x): es <b>impar</b>'
            : 'No son ni iguales ni opuestos: <b>no es par ni impar</b>']
    };
  };

  EJ.tema({
    id: 'paridad',
    materia: 'matematicas',
    grupo: 'Funciones',
    nombre: 'Funciones pares e impares',
    descripcion: 'Clasificar funciones segun su simetria usando f(&minus;x).',
    formulario: 'Par: f(&minus;x) = f(x) (simetria respecto al eje y). Ejemplos: x&sup2;, cos x, |x|<br>' +
      'Impar: f(&minus;x) = &minus;f(x) (simetria respecto al origen). Ejemplos: x&sup3;, sen x, 1/x<br>' +
      'Si no cumple ninguna, no es par ni impar. par&middot;par = par, impar&middot;impar = par, par&middot;impar = impar.',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, idx, texto;

      if (dif === 'facil') {
        var casos = [
          { f: 'x&sup2;', t: 0, por: 'todos los exponentes son pares' },
          { f: 'x&sup3;', t: 1, por: 'el exponente es impar' },
          { f: 'x&sup4;', t: 0, por: 'todos los exponentes son pares' },
          { f: 'x&sup5;', t: 1, por: 'el exponente es impar' },
          { f: 'x&sup2; + 3', t: 0, por: 'solo hay potencias pares (la constante cuenta como x&#8304;)' },
          { f: 'x&sup3; &minus; x', t: 1, por: 'todos los exponentes son impares' },
          { f: 'x + 2', t: 2, por: 'mezcla un exponente impar con una constante' },
          { f: 'x&sup2; + x', t: 2, por: 'mezcla exponentes pares e impares' },
          { f: '|x|', t: 0, por: 'el valor absoluto ignora el signo' },
          { f: 'cos x', t: 0, por: 'cos(&minus;x) = cos x' },
          { f: 'sen x', t: 1, por: 'sen(&minus;x) = &minus;sen x' },
          { f: '1/x', t: 1, por: '1/(&minus;x) = &minus;(1/x)' }
        ];
        var tf = r.subtema([
          ['basicas', 'Funciones basicas'],
          ['desdeTabla', 'Desde una tabla de valores']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        var caso = r.elige(casos);
        enun = 'Clasifica la funcion f(x) = ' + caso.f;
        resp = R.opcion(TIPOS, caso.t);
        pistas = ['Calcula f(&minus;x) y comparalo con f(x) y con &minus;f(x).',
          'Pista rapida: ' + caso.por + '.'];
        sol = ['Sustituyo x por &minus;x en f(x) = ' + caso.f,
          caso.t === 0 ? 'Resulta f(&minus;x) = f(x), porque ' + caso.por : caso.t === 1 ? 'Resulta f(&minus;x) = &minus;f(x), porque ' + caso.por : 'f(&minus;x) no es igual a f(x) ni a &minus;f(x), porque ' + caso.por,
          'Es <b>' + TIPOS[caso.t].split(' (')[0].toLowerCase() + '</b>'];
      } else if (dif === 'medio') {
        var tm = r.subtema([
          ['polinomio', 'Polinomios'],
          ['desdeTabla', 'Desde una tabla de valores']
        ]);
        if (extra[tm]) return extra[tm](r, dif);
        var tipo = r.entero(0, 2);
        var coefs;
        if (tipo === 0) {        // solo potencias pares
          coefs = [r.enteroNoCero(-5, 5), 0, r.enteroNoCero(-7, 7), 0, r.enteroNoCero(-9, 9)];
        } else if (tipo === 1) { // solo potencias impares
          coefs = [r.enteroNoCero(-5, 5), 0, r.enteroNoCero(-7, 7), 0];
        } else {                 // mezcla
          coefs = [r.enteroNoCero(-5, 5), r.enteroNoCero(-4, 4), r.enteroNoCero(-7, 7), 0];
        }
        texto = P.texto(coefs);
        guiaDelPaso = EJ.guia.paridad(coefs, TIPOS);
        enun = 'Clasifica la funcion f(x) = ' + texto;
        resp = R.opcion(TIPOS, tipo);
        pistas = ['Fijate en los exponentes que aparecen realmente en la expresion.',
          'Si TODOS son pares la funcion es par; si TODOS son impares es impar; si hay de los dos, no es ni par ni impar.'];
        sol = ['Exponentes presentes: ' + coefs.map(function (c, i) { return c ? (coefs.length - 1 - i) : null; }).filter(function (x) { return x !== null; }).join(', '),
          tipo === 0 ? 'Todos son pares &rArr; f(&minus;x) = f(x)' : tipo === 1 ? 'Todos son impares &rArr; f(&minus;x) = &minus;f(x)' : 'Hay exponentes pares e impares mezclados',
          'Es <b>' + TIPOS[tipo].split(' (')[0].toLowerCase() + '</b>'];
      } else {
        var t2 = r.subtema([
          ['producto', 'Producto de funciones'],
          ['calcularFmenosX', 'Calcular f(&minus;x)'],
          ['trigonometrica', 'Con funciones trigonometricas'],
          ['desdeTabla', 'Desde una tabla de valores']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'producto') {
          var piezas = [
            { f: 'x&sup2;', p: 0 }, { f: 'x&sup3;', p: 1 }, { f: 'x&#8308;', p: 0 },
            { f: 'sen x', p: 1 }, { f: 'cos x', p: 0 }, { f: 'x', p: 1 }, { f: '|x|', p: 0 }
          ];
          var A = r.elige(piezas), B = r.elige(piezas);
          var resultado = (A.p + B.p) % 2 === 0 ? 0 : 1;
          enun = 'Clasifica la funcion f(x) = (' + A.f + ')(' + B.f + ')';
          resp = R.opcion(TIPOS, resultado);
          pistas = ['Clasifica cada factor por separado y usa las reglas del producto.',
            'par &middot; par = par, impar &middot; impar = par, par &middot; impar = impar.'];
          sol = [A.f + ' es ' + (A.p ? 'impar' : 'par') + ' y ' + B.f + ' es ' + (B.p ? 'impar' : 'par'),
            (A.p ? 'impar' : 'par') + ' &middot; ' + (B.p ? 'impar' : 'par') + ' = ' + (resultado ? 'impar' : 'par'),
            'Es <b>' + (resultado ? 'impar' : 'par') + '</b>'];
        } else if (t2 === 'calcularFmenosX') {
          var a = r.enteroNoCero(-5, 5), b = r.enteroNoCero(-6, 6), c = r.enteroNoCero(-7, 7);
          var f = [a, b, c, 0];   // ax^3 + bx^2 + cx
          enun = 'Si f(x) = ' + P.texto(f) + ', escribe f(&minus;x) simplificada.';
          resp = R.expresion('(' + (-a) + ')*x^3+(' + b + ')*x^2+(' + (-c) + ')*x', {
            mostrar: P.texto([-a, b, -c, 0])
          });
          pistas = ['Sustituye x por (&minus;x) y recuerda que (&minus;x)&sup2; = x&sup2; pero (&minus;x)&sup3; = &minus;x&sup3;.',
            'Los terminos de grado impar cambian de signo y los de grado par se quedan igual.'];
          sol = ['(&minus;x)&sup3; = &minus;x&sup3;, (&minus;x)&sup2; = x&sup2;, (&minus;x) = &minus;x',
            'f(&minus;x) = ' + a + '(&minus;x&sup3;) + ' + b + '(x&sup2;) + ' + c + '(&minus;x)',
            'f(&minus;x) = <b>' + P.texto([-a, b, -c, 0]) + '</b>',
            'Como no coincide con f(x) ni con &minus;f(x), la funcion no es par ni impar'];
        } else {
          var casos2 = [
            { f: 'x&sup2; sen x', t: 1 },
            { f: 'x cos x', t: 1 },
            { f: 'x sen x', t: 0 },
            { f: 'sen x cos x', t: 1 },
            { f: 'x&sup2; cos x', t: 0 },
            { f: 'x&sup3; sen x', t: 0 },
            { f: 'sen x + x', t: 1 },
            { f: 'cos x + x&sup2;', t: 0 },
            { f: 'sen x + 1', t: 2 },
            { f: 'cos x + x', t: 2 }
          ];
          var cs = r.elige(casos2);
          enun = 'Clasifica la funcion f(x) = ' + cs.f;
          resp = R.opcion(TIPOS, cs.t);
          pistas = ['Recuerda: sen es impar, cos es par, x<sup>n</sup> es par si n es par.',
            'En un producto se suman las paridades; en una suma, solo es par (o impar) si TODOS los sumandos lo son.'];
          sol = ['Analizo cada parte: sen x es impar, cos x es par, las potencias siguen su exponente',
            cs.t === 0 ? 'Todo junto cumple f(&minus;x) = f(x)' : cs.t === 1 ? 'Todo junto cumple f(&minus;x) = &minus;f(x)' : 'Se mezclan simetrias distintas, asi que no cumple ninguna de las dos condiciones',
            'Es <b>' + TIPOS[cs.t].split(' (')[0].toLowerCase() + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
