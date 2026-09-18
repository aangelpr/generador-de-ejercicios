/* Propiedades de logaritmos y aplicaciones */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function logSub(b, arg) { return 'log<sub>' + b + '</sub>(' + arg + ')'; }

  var extra = {};

  extra.propiedadesBasicas = function (r) {
    var b1 = r.entero(2, 9), b2 = r.entero(2, 9), b3 = r.entero(2, 6), k = r.entero(2, 7);
    var val = 0 + 1 + k;
    return {
      enunciado: 'Calcula sin calculadora:<br><span class="big">' +
        logSub(b1, 1) + ' + ' + logSub(b2, b2) + ' + ' + logSub(b3, b3 + '<sup>' + k + '</sup>') + '</span>',
      respuesta: R.numero(val, { dec: 0 }),
      pistas: ['Tres propiedades: log<sub>b</sub>1 = 0, log<sub>b</sub>b = 1 y log<sub>b</sub>b<sup>k</sup> = k.',
        'Los valores son 0, 1 y ' + k + '.'],
      solucion: [logSub(b1, 1) + ' = 0 (porque ' + b1 + '<sup>0</sup> = 1)',
        logSub(b2, b2) + ' = 1',
        logSub(b3, b3 + '<sup>' + k + '</sup>') + ' = ' + k,
        'Suma: <b>' + val + '</b>']
    };
  };

  extra.expandir = function (r) {
    var p = r.entero(2, 5), q = r.entero(1, 4), s = r.entero(2, 4);
    return {
      enunciado: 'Expande usando las propiedades de los logaritmos:<br>' +
        '<span class="big">log ' + F.frac('x<sup>' + p + '</sup>y<sup>' + q + '</sup>', 'z<sup>' + s + '</sup>') + '</span><br>' +
        'El resultado tiene la forma A&middot;log x + B&middot;log y + C&middot;log z. Da A, B y C.',
      respuesta: R.varios([
        { etiqueta: 'A (coef. de log x)', resp: R.numero(p, { dec: 0 }) },
        { etiqueta: 'B (coef. de log y)', resp: R.numero(q, { dec: 0 }) },
        { etiqueta: 'C (coef. de log z)', resp: R.numero(-s, { dec: 0 }) }
      ]),
      pistas: ['Primero separa producto y cociente: log(AB/C) = log A + log B &minus; log C.',
        'Despues baja los exponentes como coeficientes: log(x<sup>n</sup>) = n log x. Cuidado con el signo del que va dividiendo.'],
      solucion: ['Separo: log(x<sup>' + p + '</sup>) + log(y<sup>' + q + '</sup>) &minus; log(z<sup>' + s + '</sup>)',
        'Bajo los exponentes: ' + p + ' log x + ' + q + ' log y &minus; ' + s + ' log z',
        'A = <b>' + p + '</b>, B = <b>' + q + '</b>, C = <b>' + (-s) + '</b> (negativo porque estaba dividiendo)']
    };
  };

  EJ.tema({
    id: 'logaritmos',
    materia: 'matematicas',
    grupo: 'Funciones',
    nombre: 'Propiedades de logaritmos y aplicaciones',
    descripcion: 'Definicion, propiedades del producto, cociente y potencia, cambio de base y ecuaciones.',
    formulario: 'log<sub>b</sub>(x) = y &hArr; b<sup>y</sup> = x<br>' +
      'log(AB) = log A + log B &nbsp;&middot;&nbsp; log(A/B) = log A &minus; log B &nbsp;&middot;&nbsp; log(A<sup>n</sup>) = n log A<br>' +
      'log<sub>b</sub>b = 1, log<sub>b</sub>1 = 0, cambio de base: log<sub>b</sub>x = ln x / ln b',

    generar: function (dif, r) {
      var enun, resp, pistas, sol, b, n, x, y;

      if (dif === 'facil') {
        var t = r.subtema([
          ['evaluar', 'Calcular un logaritmo'],
          ['aExponencial', 'De logaritmica a exponencial'],
          ['aLog', 'De exponencial a logaritmica'],
          ['propiedadesBasicas', 'Propiedades basicas']
        ]);
        if (extra[t]) return extra[t](r, dif);
        b = r.elige([2, 3, 4, 5, 10]);
        n = r.entero(1, 5);
        x = Math.pow(b, n);
        if (t === 'evaluar') {
          enun = 'Calcula: ' + logSub(b, x);
          resp = R.numero(n, { dec: 2 });
          pistas = ['Preguntate: &iquest;a que exponente hay que elevar ' + b + ' para obtener ' + x + '?',
            b + '<sup>?</sup> = ' + x];
          sol = [logSub(b, x) + ' = y significa ' + b + '<sup>y</sup> = ' + x,
            b + '<sup>' + n + '</sup> = ' + x,
            'Por lo tanto y = <b>' + n + '</b>'];
        } else if (t === 'aExponencial') {
          enun = 'Escribe en forma exponencial: ' + logSub(b, x) + ' = ' + n + '<br>&iquest;Cuanto vale la base elevada al resultado? Escribe el valor de ' + b + '<sup>' + n + '</sup>.';
          resp = R.numero(x, { dec: 2 });
          pistas = ['La definicion dice log<sub>b</sub>(x) = y &hArr; b<sup>y</sup> = x.',
            'Aqui b = ' + b + ' y y = ' + n + '.'];
          sol = ['Forma exponencial: ' + b + '<sup>' + n + '</sup> = x',
            b + '<sup>' + n + '</sup> = <b>' + x + '</b>'];
        } else {
          enun = 'Escribe en forma logaritmica: ' + b + '<sup>' + n + '</sup> = ' + x + '<br>&iquest;Cuanto vale ' + logSub(b, x) + '?';
          resp = R.numero(n, { dec: 2 });
          pistas = ['El exponente es siempre el resultado del logaritmo.',
            logSub(b, x) + ' = exponente al que elevamos ' + b + '.'];
          sol = [b + '<sup>' + n + '</sup> = ' + x + ' equivale a ' + logSub(b, x) + ' = ' + n,
            'Respuesta: <b>' + n + '</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['propiedades', 'Producto, cociente y potencia'],
          ['condensar', 'Condensar en un logaritmo'],
          ['expandir', 'Expandir un logaritmo'],
          ['ecuacion', 'Ecuacion logaritmica']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'propiedades') {
          b = r.elige([2, 3, 5, 10]);
          var A = r.entero(2, 9), B = r.entero(2, 9);
          var op = r.elige(['producto', 'cociente', 'potencia']);
          var la = Math.log(A) / Math.log(b), lb = Math.log(B) / Math.log(b);
          var valor, expresion, prop;
          if (op === 'producto') {
            valor = la + lb; expresion = logSub(b, A * B); prop = 'log(AB) = log A + log B';
            enun = 'Si ' + logSub(b, A) + ' = ' + F.n(la, 4) + ' y ' + logSub(b, B) + ' = ' + F.n(lb, 4) + ',<br>calcula ' + expresion + ' (4 decimales).';
          } else if (op === 'cociente') {
            valor = la - lb; expresion = logSub(b, A + '/' + B); prop = 'log(A/B) = log A &minus; log B';
            enun = 'Si ' + logSub(b, A) + ' = ' + F.n(la, 4) + ' y ' + logSub(b, B) + ' = ' + F.n(lb, 4) + ',<br>calcula ' + expresion + ' (4 decimales).';
          } else {
            n = r.entero(2, 5);
            valor = n * la; expresion = logSub(b, A + '<sup>' + n + '</sup>'); prop = 'log(A<sup>n</sup>) = n log A';
            enun = 'Si ' + logSub(b, A) + ' = ' + F.n(la, 4) + ',<br>calcula ' + expresion + ' (4 decimales).';
          }
          resp = R.numero(valor, { dec: 4, tol: 0.001 });
          pistas = ['Usa la propiedad ' + prop + '.',
            'No necesitas calculadora para el logaritmo: solo combina los valores dados.'];
          sol = ['Propiedad: ' + prop,
            'Sustituyo los valores dados',
            'Resultado: <b>' + F.n(valor, 4) + '</b>'];
        } else if (t2 === 'condensar') {
          var c1 = r.entero(2, 4), c2 = r.entero(1, 3);
          var X = r.entero(2, 6), Y = r.entero(2, 6);
          var res = Math.pow(X, c1) / Math.pow(Y, c2);
          enun = 'Condensa en un solo logaritmo y calcula su argumento:<br>' +
            '<span class="big">' + c1 + ' log(' + X + ') &minus; ' + c2 + ' log(' + Y + ')</span><br>' +
            '&iquest;Cual es el numero que queda dentro del logaritmo? (4 decimales)';
          resp = R.numero(res, { dec: 4, tol: 0.001 });
          pistas = ['Primero pasa los coeficientes como exponentes: n log A = log(A<sup>n</sup>).',
            'Queda log(' + Math.pow(X, c1) + ') &minus; log(' + Math.pow(Y, c2) + '), y una resta de logaritmos es un cociente.'];
          sol = [c1 + ' log ' + X + ' = log(' + X + '<sup>' + c1 + '</sup>) = log(' + Math.pow(X, c1) + ')',
            c2 + ' log ' + Y + ' = log(' + Math.pow(Y, c2) + ')',
            'Resta &rArr; cociente: log(' + Math.pow(X, c1) + '/' + Math.pow(Y, c2) + ')',
            'Argumento: <b>' + F.n(res, 4) + '</b>'];
        } else {
          b = r.elige([2, 3, 5, 10]);
          n = r.entero(1, 4);
          var k = r.entero(1, 9);
          var sol0 = (Math.pow(b, n) - k);
          enun = 'Resuelve la ecuacion: ' + logSub(b, 'x + ' + k) + ' = ' + n;
          resp = R.numero(sol0, { dec: 2 });
          pistas = ['Pasa a forma exponencial: si log<sub>b</sub>(algo) = n, entonces algo = b<sup>n</sup>.',
            'x + ' + k + ' = ' + b + '<sup>' + n + '</sup> = ' + Math.pow(b, n) + '.'];
          sol = ['Forma exponencial: x + ' + k + ' = ' + b + '<sup>' + n + '</sup>',
            'x + ' + k + ' = ' + Math.pow(b, n),
            'x = <b>' + sol0 + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['exponencial', 'Ecuacion exponencial'],
          ['cambioBase', 'Cambio de base'],
          ['interes', 'Interes compuesto'],
          ['pH', 'Aplicacion: pH'],
          ['expandir', 'Expandir un logaritmo']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'exponencial') {
          b = r.elige([2, 3, 5, 7]);
          var obj = r.entero(20, 900);
          var sol1 = Math.log(obj) / Math.log(b);
          enun = 'Resuelve para x (4 decimales): <span class="big">' + b + '<sup>x</sup> = ' + obj + '</span>';
          resp = R.numero(sol1, { dec: 4, tol: 0.001 });
          pistas = ['Aplica logaritmo a los dos lados y baja el exponente.',
            'x = log(' + obj + ') / log(' + b + ').'];
          sol = ['Aplico log a ambos lados: x&middot;log ' + b + ' = log ' + obj,
            'x = log(' + obj + ')/log(' + b + ') = ' + F.n(Math.log(obj) / Math.LN10, 4) + '/' + F.n(Math.log(b) / Math.LN10, 4),
            'x = <b>' + F.n(sol1, 4) + '</b>'];
        } else if (t3 === 'cambioBase') {
          b = r.elige([3, 5, 6, 7, 11]);
          var arg = r.entero(15, 400);
          var val = Math.log(arg) / Math.log(b);
          enun = 'Calcula ' + logSub(b, arg) + ' usando cambio de base (4 decimales).';
          resp = R.numero(val, { dec: 4, tol: 0.001 });
          pistas = ['log<sub>b</sub>x = ln x / ln b (tambien sirve con log base 10).',
            'ln ' + arg + ' = ' + F.n(Math.log(arg), 4) + ' y ln ' + b + ' = ' + F.n(Math.log(b), 4) + '.'];
          sol = ['log<sub>' + b + '</sub>(' + arg + ') = ln(' + arg + ') / ln(' + b + ')',
            '= ' + F.n(Math.log(arg), 4) + ' / ' + F.n(Math.log(b), 4),
            '= <b>' + F.n(val, 4) + '</b>'];
        } else if (t3 === 'interes') {
          var C = r.entero(5, 50) * 1000;
          var tasa = r.entero(3, 12);
          var meta = C * r.elige([2, 3]);
          var anios = Math.log(meta / C) / Math.log(1 + tasa / 100);
          enun = 'Se invierten $' + C + ' a una tasa de ' + tasa + '% anual compuesto.<br>' +
            '&iquest;En cuantos anios se llega a $' + meta + '? (4 decimales)';
          resp = R.numero(anios, { dec: 4, tol: 0.005 });
          pistas = ['El modelo es M = C(1 + i)<sup>t</sup>. Despeja t con logaritmos.',
            't = log(M/C) / log(1 + ' + (tasa / 100) + ') = log(' + (meta / C) + ')/log(' + F.n(1 + tasa / 100, 4) + ').'];
          sol = [meta + ' = ' + C + '(1 + ' + (tasa / 100) + ')<sup>t</sup>',
            (meta / C) + ' = ' + F.n(1 + tasa / 100, 4) + '<sup>t</sup>',
            't = log(' + (meta / C) + ')/log(' + F.n(1 + tasa / 100, 4) + ')',
            't = <b>' + F.n(anios, 4) + ' anios</b>'];
        } else {
          var expo = r.entero(2, 12);
          var mant = r.entero(11, 99) / 10;
          var conc = mant * Math.pow(10, -expo);
          var pH = -Math.log(conc) / Math.LN10;
          enun = 'El pH se define como pH = &minus;log[H<sup>+</sup>].<br>' +
            'Si la concentracion es [H<sup>+</sup>] = ' + mant + ' &times; 10<sup>&minus;' + expo + '</sup> mol/L, calcula el pH (4 decimales).';
          resp = R.numero(pH, { dec: 4, tol: 0.002 });
          pistas = ['Usa log(A &times; 10<sup>&minus;n</sup>) = log A &minus; n.',
            'log(' + mant + ') = ' + F.n(Math.log(mant) / Math.LN10, 4) + ', asi que pH = ' + expo + ' &minus; ' + F.n(Math.log(mant) / Math.LN10, 4) + '.'];
          sol = ['pH = &minus;log(' + mant + ' &times; 10<sup>&minus;' + expo + '</sup>)',
            'pH = &minus;[log(' + mant + ') &minus; ' + expo + '] = ' + expo + ' &minus; ' + F.n(Math.log(mant) / Math.LN10, 4),
            'pH = <b>' + F.n(pH, 4) + '</b>'];
        }
      }

      return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
