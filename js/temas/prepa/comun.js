/* Modo prepa: ayudas que comparten todos sus temas.
   Los ejercicios son como los de un examen de admision a la prepa: problemas
   redactados y cuatro incisos (A, B, C, D). Los incisos incorrectos no son
   numeros al azar: salen de los errores que de verdad se cometen (olvidar un
   paso, confundir la formula, sumar en vez de restar...), asi que para
   descartarlos hay que resolver, no adivinar. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var prepa = EJ.prepa = {};

  var LETRAS = 'ABCD';

  /* Cuatro incisos: `correcta` mas tres de `errores`.
     - Los valores pueden ser numeros o texto (HTML).
     - Si faltan distractores (porque dos errores dan lo mismo), se completan
       con valores cercanos a la respuesta.
     op: {dec, unidad, antes, fmt, enteros}
       dec     decimales al imprimir numeros (2 por defecto)
       unidad  texto que va despues ("cm", "km/h")
       antes   texto que va antes ("$")
       fmt     funcion propia para imprimir cada valor
       enteros si los rellenos deben ser enteros (por defecto, si la
               respuesta es entera) */
  prepa.opciones = function (r, correcta, errores, op) {
    op = op || {};
    var dec = op.dec === undefined ? 2 : op.dec;
    var imprime = op.fmt || function (v) { return typeof v === 'number' ? F.n(v, dec) : String(v); };
    function texto(v) { return (op.antes || '') + imprime(v) + (op.unidad ? ' ' + op.unidad : ''); }

    var bien = texto(correcta);
    var usados = [bien], malas = [];
    function agrega(v) {
      if (malas.length >= 3) return;
      /* nada de negativos (ni un "0" por redondeo) si la respuesta es positiva */
      if (typeof v === 'number' && (!isFinite(v) || (correcta > 0 && F.redondea(v, dec) <= 0))) return;
      var t = texto(v);
      if (usados.indexOf(t) !== -1) return;
      usados.push(t); malas.push(t);
    }
    (errores || []).forEach(agrega);

    if (malas.length < 3 && typeof correcta === 'number') {
      var enteros = op.enteros === undefined ? Math.round(correcta) === correcta : op.enteros;
      var paso = Math.max(enteros ? 1 : Math.pow(10, -dec), Math.abs(correcta) * 0.1);
      if (enteros) paso = Math.max(1, Math.round(paso));
      var rellenos = [];
      for (var k = 1; k <= 6; k++) rellenos.push(correcta + k * paso, correcta - k * paso);
      r.baraja(rellenos).forEach(function (v) {
        agrega(enteros ? Math.round(v) : F.redondea(v, dec));
      });
    }

    var incisos = r.baraja([bien].concat(malas));
    var indice = incisos.indexOf(bien);
    return R.opcion(incisos.map(function (t, i) {
      return '<b>' + LETRAS.charAt(i) + ')</b>&nbsp; ' + t;
    }), indice, { sinMezclar: true, etiqueta: 'Elige la respuesta correcta' });
  };

  /* Letra del inciso correcto, para escribirla en la solucion. */
  prepa.letra = function (resp) { return LETRAS.charAt(resp.valor); };

  /* Arma el ejercicio y le agrega al final de la solucion cual inciso era. */
  prepa.ejercicio = function (enunciado, resp, pistas, solucion, extra) {
    var sol = solucion.slice();
    sol.push('Respuesta: inciso <b>' + prepa.letra(resp) + '</b>.');
    var e = { enunciado: enunciado, respuesta: resp, pistas: pistas, solucion: sol };
    if (extra) for (var k in extra) e[k] = extra[k];
    return e;
  };

  /* Dinero con dos decimales solo cuando hacen falta: $120, $85.50 */
  prepa.pesos = function (v) {
    var red = Math.round(v * 100) / 100;
    return Math.round(red) === red ? String(red) : red.toFixed(2);
  };
})();
