/* Modo prepa: ayudas que comparten todos sus temas.

   Los ejercicios imitan la version de practica de la evaluacion: cuatro
   incisos A) B) C) D), una sola respuesta correcta, y los mismos formatos de
   pregunta que usa el cuadernillo:
     - pregunta directa ("Determine el volumen...")
     - "Complete correctamente el siguiente texto." con huecos _______
     - "Relacione..." con dos columnas y respuestas tipo "1c, 2a, 3b, 4d"
     - "Considere ..." cuando el cuadernillo da la formula
     - multirreactivo: un texto que sirve para varias preguntas seguidas

   Como en el cuadernillo, los incisos van ORDENADOS: los numeros de menor a
   mayor y el texto en orden alfabetico. Asi la letra correcta no da pistas y
   se ve igual que en el examen. Los incisos incorrectos salen de errores
   tipicos, no de numeros al azar. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var prepa = EJ.prepa = {};

  var LETRAS = 'ABCD';

  function plano(html) {
    return R.normaliza(String(html).replace(/<[^>]*>/g, ' ')
      .replace(/&([a-zA-Z])(acute|grave|tilde|uml|circ);/g, '$1')
      .replace(/&[a-z]+;/g, ' '));
  }

  /* Cuatro incisos: `correcta` mas tres de `errores`.
     - Los valores pueden ser numeros o texto (HTML).
     - Si faltan distractores (porque dos errores dan lo mismo), se completan
       con valores cercanos a la respuesta.
     op: {dec, unidad, antes, fmt, enteros, fijo}
       dec     decimales al imprimir numeros (2 por defecto)
       unidad  texto que va despues ("cm", "km/h")
       antes   texto que va antes ("$")
       fmt     funcion propia para imprimir cada valor
       enteros si los rellenos deben ser enteros (por defecto, si la
               respuesta es entera)
       fijo    imprime siempre `dec` decimales (8.00 en vez de 8)
       conSigno deja pasar distractores negativos aunque la respuesta sea positiva */
  prepa.opciones = function (r, correcta, errores, op) {
    op = op || {};
    var dec = op.dec === undefined ? 2 : op.dec;
    var imprime = op.fmt || function (v) {
      if (typeof v !== 'number') return String(v);
      return op.fijo ? prepa.num(v, dec) : F.n(v, dec);
    };
    function texto(v) { return (op.antes || '') + imprime(v) + (op.unidad ? ' ' + op.unidad : ''); }

    var bien = { v: correcta, t: texto(correcta) };
    var usados = [bien.t], malas = [];
    function agrega(v) {
      if (malas.length >= 3) return;
      /* nada de negativos (ni un "0" por redondeo) si la respuesta es positiva */
      if (typeof v === 'number' && (!isFinite(v) || (correcta > 0 && !op.conSigno && F.redondea(v, dec) <= 0))) return;
      var t = texto(v);
      if (usados.indexOf(t) !== -1) return;
      usados.push(t); malas.push({ v: v, t: t });
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

    var todos = [bien].concat(malas);
    var numericos = todos.every(function (x) { return typeof x.v === 'number'; });
    todos.sort(numericos
      ? function (a, b) { return a.v - b.v; }
      : function (a, b) { return plano(a.t).localeCompare(plano(b.t), 'es', { numeric: true }); });
    var indice = todos.indexOf(bien);
    return R.opcion(todos.map(function (x, i) {
      return '<b>' + LETRAS.charAt(i) + ')</b>&nbsp; ' + x.t;
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

  /* Numero con decimales fijos y espacio de miles, como en el cuadernillo:
     1800 -> "1 800.00" */
  prepa.num = function (v, dec) {
    dec = dec === undefined ? 2 : dec;
    var s = Math.abs(v).toFixed(dec);
    var partes = s.split('.');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return (v < 0 && Number(s) !== 0 ? '-' : '') + partes.join('.');
  };

  /* Dinero: $1,050 o $13.50 */
  prepa.pesos = function (v) {
    var red = Math.round(v * 100) / 100;
    var s = Math.round(red) === red ? String(red) : red.toFixed(2);
    var p = s.split('.');
    p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return '$' + p.join('.');
  };

  /* La linea "Considere ..." con la formula que da el cuadernillo. */
  prepa.considere = function (html) {
    return '<div class="considere">Considere ' + html + '</div>';
  };

  /* Texto de un multirreactivo: va arriba de cada una de sus preguntas. */
  prepa.lectura = function (html) {
    return '<div class="lectura"><div class="lectura-titulo">Lea el siguiente texto y conteste</div>' + html + '</div>';
  };

  /* ---------- "Complete correctamente el siguiente texto." ----------
     texto: con los huecos escritos como ___
     correcta: ['palabra 1', 'palabra 2']
     malas: lista de combinaciones incorrectas, cada una ['x', 'y'] */
  prepa.complete = function (r, texto, correcta, malas, pistas, solucion) {
    var une = function (l) { return l.join(' &ndash; '); };
    var enun = 'Complete correctamente el siguiente texto.<br><div class="lectura">' +
      texto.replace(/___/g, '<span class="hueco">_______</span>') + '</div>';
    var resp = prepa.opciones(r, une(correcta), malas.map(une));
    var lleno = texto, i = 0;
    lleno = lleno.replace(/___/g, function () { return '<b>' + correcta[i++] + '</b>'; });
    return prepa.ejercicio(enun, resp, pistas, (solucion || []).concat(['Texto completo: ' + lleno]));
  };

  /* ---------- "Relacione ..." ----------
     izq: [{t}] columna numerada (1, 2, 3...)
     der: [{t}] columna con letras (a, b, c...) -- puede tener de mas
     pares: para cada elemento de izq, el indice (o lista de indices) de der
     Las respuestas se escriben "1c, 2a, 3b, 4d" (o "1ac, 2bd" si son varios). */
  prepa.relacione = function (r, instruccion, titulos, izq, der, pares, pistas, solucion) {
    var letras = 'abcdefghij';
    function cadena(p) {
      return p.map(function (x, i) {
        var l = Array.isArray(x) ? x.slice().sort().map(function (k) { return letras.charAt(k); }).join('') : letras.charAt(x);
        return (i + 1) + l;
      }).join(', ');
    }
    var bien = cadena(pares);

    /* distractores: otras asignaciones creibles (permutaciones y cambios) */
    var malas = [], intentos = 0;
    var libres = der.map(function (_, k) { return k; });
    while (malas.length < 6 && intentos < 200) {
      intentos++;
      var p;
      if (Array.isArray(pares[0])) {
        /* grupos: se revuelven las letras entre los grupos conservando tamanos */
        var todas = r.baraja([].concat.apply([], pares));
        p = []; var k0 = 0;
        pares.forEach(function (g) { p.push(todas.slice(k0, k0 + g.length)); k0 += g.length; });
      } else {
        p = r.muestra(libres, pares.length);
      }
      var c = cadena(p);
      if (c !== bien && malas.indexOf(c) === -1) malas.push(c);
    }

    var tabla = '<table class="tabla relacione"><tr><th>' + titulos[0] + '</th><th>' + titulos[1] + '</th></tr>';
    var filas = Math.max(izq.length, der.length);
    for (var i = 0; i < filas; i++) {
      tabla += '<tr><td>' + (izq[i] ? (i + 1) + '. ' + izq[i] : '') + '</td><td>' +
        (der[i] ? letras.charAt(i) + '. ' + der[i] : '') + '</td></tr>';
    }
    tabla += '</table>';

    var resp = prepa.opciones(r, bien, malas);
    var detalle = pares.map(function (x, i) {
      var ks = Array.isArray(x) ? x : [x];
      return (i + 1) + '. ' + izq[i] + ' &rarr; ' + ks.map(function (k) { return letras.charAt(k) + '. ' + der[k]; }).join(' y ');
    });
    return prepa.ejercicio(instruccion + '<br>' + tabla, resp, pistas, detalle.concat(solucion || []));
  };

  /* Polinomio con signo bonito para enunciados: usa F.poli. */
  prepa.poli = function (c, v) { return F.poli(c, v).replace(/ - /g, ' &minus; '); };

  /* Negativos entre parentesis: 4 -> "4", -4 -> "(-4)" */
  prepa.np = function (k) { return k < 0 ? '(' + k + ')' : String(k); };

  /* ---------- niveles de dificultad ----------
     Cada reactivo de la guia (un subtema) tiene su nivel:
       facil   recordar un dato o reconocer un concepto; cuenta de un paso
       medio   relacionar varios datos o aplicar una formula
       dificil varios pasos, analisis o distractores muy parecidos
     Al practicar, cada nivel muestra solo sus subtemas (en el orden de la
     guia). El simulacro usa estos niveles para ir de facil a dificil. */
  var NIVELES = ['facil', 'medio', 'dificil'];
  prepa.orden = {};   // temaId -> [subtema, ...] en el orden de la guia
  prepa.nivel = {};   // 'temaId|subtema' -> 'facil' | 'medio' | 'dificil'

  /* lista: [[id, 'Nombre visible', nivel], ...]. Devuelve los niveles que
     tiene el tema, para EJ.tema({dificultades}). */
  prepa.registrarSubtemas = function (temaId, lista) {
    prepa.orden[temaId] = lista.map(function (x) { return x[0]; });
    lista.forEach(function (x) {
      if (NIVELES.indexOf(x[2]) === -1) throw new Error('Nivel invalido en ' + temaId + '|' + x[0]);
      prepa.nivel[temaId + '|' + x[0]] = x[2];
    });
    return NIVELES.filter(function (n) { return lista.some(function (x) { return x[2] === n; }); });
  };

  /* Elige el subtema: uno del nivel pedido. Si viene forzado (un examen o un
     simulacro que se reconstruye), manda el nivel de ese subtema. */
  prepa.subtemaDe = function (r, dif, temaId, lista) {
    var nivel = (r.forzado && prepa.nivel[temaId + '|' + r.forzado]) || dif;
    var deNivel = lista.filter(function (x) { return x[2] === nivel; });
    if (!deNivel.length) deNivel = lista;
    return r.subtema(deNivel.map(function (x) { return [x[0], x[1]]; }));
  };
})();
