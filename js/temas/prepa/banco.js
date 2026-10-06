/* Modo prepa: bancos de preguntas de conceptos.

   Las areas que no son de calculo (humanidades, comunicacion, ciencias
   sociales, biologia, quimica, las capacitaciones...) se escriben como una
   lista de preguntas. Cada subtema corresponde a un reactivo de la version de
   practica y trae varias VARIANTES; cada vez sale una, con los incisos y las
   filas revueltos, en el mismo formato del cuadernillo.

   Formatos de una variante (se reconoce por sus campos):

   - directa:   {p: 'pregunta', b: 'correcta', m: ['mala', ...]}
   - complete:  {c: 'texto con ___', b: ['x', 'y'], m: [['x2', 'y2'], ...]}
   - relacione: {rel: 'instruccion', cols: ['Concepto', 'Descripcion'],
                 pares: [['izq', 'der'], ...], extra: ['der de mas'], n: 4}
                 Si una fila lleva varias respuestas: ['izq', ['der1', 'der2']]
   - lista:     {lista: 'Del siguiente listado, identifique...', si: [...], no: [...]}
                 Se responde con los numeros: "1, 3, 5".
   - orden:     {orden: 'pregunta', pasos: ['primero', 'segundo', ...]}

   Campos opcionales en todas: lec (texto de lectura que va arriba),
   ex (explicacion para la solucion), pista.

   Una variante tambien puede ser una funcion (r) que devuelve una variante:
   sirve para preguntas con datos al azar (nomina, contabilidad...). Si `b` y
   `m` son numeros, los incisos se ordenan de menor a mayor. Con `fmt` se
   decide como se imprimen (por ejemplo, como dinero). */
(function () {
  'use strict';
  var P = EJ.prepa;

  function numerada(lista) {
    return '<div class="lista-num">' + lista.map(function (t, i) { return (i + 1) + '. ' + t; }).join('<br>') + '</div>';
  }
  function secuencia(l) { return l.join(', '); }

  function pistasDe(v, generica) {
    var p = [];
    if (v.pista) p.push(v.pista);
    p.push(generica);
    return p;
  }

  function directa(r, v) {
    return P.ejercicio(v.p, P.opciones(r, v.b, r.muestra(v.m, Math.min(v.m.length, 5)), v.fmt ? { fmt: v.fmt } : null),
      pistasDe(v, 'Descarta primero los incisos que sabes que no son; luego compara los que quedan con la pregunta.'),
      [v.ex || '', 'Respuesta correcta: <b>' + (v.fmt ? v.fmt(v.b) : v.b) + '</b>'].filter(Boolean));
  }

  function complete(r, v) {
    return P.complete(r, v.c, v.b, r.muestra(v.m, Math.min(v.m.length, 5)),
      pistasDe(v, 'Prueba cada inciso leyendo el texto completo: todas las palabras deben tener sentido en su hueco.'),
      v.ex ? [v.ex] : []);
  }

  function relacione(r, v) {
    var n = Math.min(v.n || 4, v.pares.length);
    var elegidos = v.pares.length > n ? r.muestra(v.pares, n) : v.pares.slice();
    var agrupado = Array.isArray(elegidos[0][1]);
    var der = [];
    elegidos.forEach(function (p) { der = der.concat(agrupado ? p[1] : [p[1]]); });
    var extras = (v.extra || []).slice();
    /* las filas que no salieron sirven de distractor en la columna derecha */
    v.pares.forEach(function (p) { if (elegidos.indexOf(p) === -1 && !agrupado) extras.push(p[1]); });
    if (extras.length) der = der.concat(r.muestra(extras, Math.min(extras.length, agrupado ? 1 : 1)));
    der = r.baraja(der);
    var izq = r.baraja(elegidos);
    var pares = izq.map(function (p) {
      return agrupado ? p[1].map(function (d) { return der.indexOf(d); }) : der.indexOf(p[1]);
    });
    return P.relacione(r, v.rel, v.cols || ['Concepto', 'Descripci&oacute;n'],
      izq.map(function (p) { return p[0]; }), der, pares,
      pistasDe(v, 'Empieza por la pareja de la que estes mas seguro y descarta los incisos que no la tienen.'),
      v.ex ? [v.ex] : []);
  }

  function lista(r, v) {
    var k = Math.min(v.k || 3, v.si.length);
    var si = r.muestra(v.si, k);
    var no = r.muestra(v.no, Math.min(v.no.length, Math.max(2, (v.total || 5) - k)));
    var items = r.baraja(si.concat(no));
    var bien = items.map(function (t, i) { return si.indexOf(t) !== -1 ? i + 1 : 0; }).filter(Boolean);
    var malas = [], intentos = 0, nums = items.map(function (_, i) { return i + 1; });
    while (malas.length < 6 && intentos < 100) {
      intentos++;
      var c = r.muestra(nums, k).sort(function (a, b) { return a - b; });
      if (c.join() !== bien.join() && malas.indexOf(secuencia(c)) === -1) malas.push(secuencia(c));
    }
    return P.ejercicio(v.lista + numerada(items), P.opciones(r, secuencia(bien), malas),
      pistasDe(v, 'Marca con una palomita los que estas seguro que si van y busca el inciso que los tenga todos.'),
      [v.ex || '', 'Correctos: ' + bien.map(function (i) { return i + '. ' + items[i - 1]; }).join('; ')].filter(Boolean));
  }

  function orden(r, v) {
    var pasos = v.pasos;
    var items = r.baraja(pasos);
    var bien = pasos.map(function (p) { return items.indexOf(p) + 1; });
    var malas = [], intentos = 0;
    while (malas.length < 6 && intentos < 100) {
      intentos++;
      var c = r.baraja(bien);
      if (c.join() !== bien.join() && malas.indexOf(secuencia(c)) === -1) malas.push(secuencia(c));
    }
    return P.ejercicio(v.orden + numerada(items), P.opciones(r, secuencia(bien), malas),
      pistasDe(v, 'Piensa cual va primero y cual va al final; con eso casi siempre queda un solo inciso.'),
      [v.ex || '', 'Orden correcto: ' + pasos.join(' &rarr; ')].filter(Boolean));
  }

  P.generarVariante = function (r, v) {
    var e;
    if (v.rel) e = relacione(r, v);
    else if (v.c) e = complete(r, v);
    else if (v.lista) e = lista(r, v);
    else if (v.orden) e = orden(r, v);
    else e = directa(r, v);
    if (v.lec) e.enunciado = P.lectura(v.lec) + e.enunciado;
    return e;
  };

  /* Registra un tema hecho de un banco.
     def: {id, grupo, nombre, descripcion, etiquetas, formulario,
           items: [{s: 'id', n: 'Nombre visible', v: [variantes]}],
           niveles: {facil: ['id', ...], medio: [...], dificil: [...]}}
     Cada subtema debe aparecer en exactamente un nivel. */
  P.temaBanco = function (def) {
    var porId = {}, nivelDe = {};
    def.items.forEach(function (it) { porId[it.s] = it; });
    Object.keys(def.niveles || {}).forEach(function (n) {
      def.niveles[n].forEach(function (s) {
        if (!porId[s]) throw new Error('Nivel para un subtema que no existe: ' + def.id + '|' + s);
        if (nivelDe[s]) throw new Error('Subtema con dos niveles: ' + def.id + '|' + s);
        nivelDe[s] = n;
      });
    });
    var lista = def.items.map(function (it) {
      if (!nivelDe[it.s]) throw new Error('Subtema sin nivel: ' + def.id + '|' + it.s);
      return [it.s, it.n, nivelDe[it.s]];
    });
    EJ.tema({
      id: def.id,
      materia: 'prepa',
      grupo: def.grupo,
      nombre: def.nombre,
      descripcion: def.descripcion,
      etiquetas: def.etiquetas || [],
      formulario: def.formulario || '',
      dificultades: P.registrarSubtemas(def.id, lista),
      generar: function (dif, r) {
        var s = P.subtemaDe(r, dif, def.id, lista);
        var it = porId[s];
        /* la variante sale primero: en un multirreactivo, misma semilla = misma lectura */
        var v = r.elige(it.v);
        /* una variante tambien puede ser una funcion (r) -> variante, para datos al azar */
        if (typeof v === 'function') v = v(r);
        return P.generarVariante(r, v);
      }
    });
  };
})();
