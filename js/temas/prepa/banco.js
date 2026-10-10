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

  /* ---------- otras formas de preguntar lo mismo ----------
     El examen no repite las preguntas de la guia: pregunta los mismos temas
     de otra manera. De una variante se saca una pregunta equivalente en otro
     formato:
       - Relacione -> pregunta directa ("Teoria: X. Que descripcion le
                      corresponde?") o al reves ("Descripcion: ... A que
                      teoria corresponde?")
       - Complete con varios huecos -> uno de un solo hueco
       - Ordene    -> que va despues de un paso (o que va primero o al final)
       - Listado   -> cual si forma parte, o "todas excepto"
     Devuelve null si la variante no se presta. */
  function minus(t) { return t.charAt(0).toLowerCase() + t.slice(1); }
  function columnas(v) { return v.cols || ['Concepto', 'Descripci&oacute;n']; }

  function relDirecta(r, v) {
    var cols = columnas(v), p = r.elige(v.pares);
    var otras = v.pares.filter(function (q) { return q !== p; }).map(function (q) { return q[1]; }).concat(v.extra || []);
    var pide = /^estudia$/i.test(cols[1]) ? '&iquest;Qu&eacute; estudia?'
      : '&iquest;Qu&eacute; ' + minus(cols[1]) + ' le ' + (/s$/.test(cols[1]) ? 'corresponden' : 'corresponde') + '?';
    return { p: '<b>' + cols[0] + ':</b> ' + p[0] + '<br>' + pide, b: p[1], m: r.muestra(otras, Math.min(otras.length, 5)) };
  }

  function relInversa(r, v) {
    if (v.pares.length < 4) return relDirecta(r, v);
    var cols = columnas(v), p = r.elige(v.pares);
    var otras = v.pares.filter(function (q) { return q !== p; }).map(function (q) { return q[0]; });
    return { p: '<b>' + cols[1] + ':</b> ' + p[1] + '<br>&iquest;A qu&eacute; ' + minus(cols[0]) + ' corresponde?',
      b: p[0], m: r.muestra(otras, Math.min(otras.length, 5)) };
  }

  function unHueco(r, v) {
    var lugares = r.baraja(v.b.map(function (_, i) { return i; }));
    for (var n = 0; n < lugares.length; n++) {
      var j = lugares[n], malas = [];
      v.m.forEach(function (c) { if (c[j] !== v.b[j] && malas.indexOf(c[j]) === -1) malas.push(c[j]); });
      if (malas.length < 3) continue;
      var k = 0;
      var texto = v.c.replace(/___/g, function () { var i = k++; return i === j ? '___' : v.b[i]; });
      return { c: texto, b: [v.b[j]], m: malas.map(function (x) { return [x]; }) };
    }
    return null;
  }

  function queSigue(r, v) {
    var pasos = v.pasos, n = pasos.length;
    var tipo = n >= 5 ? r.entero(0, 2) : r.entero(1, 2);
    var arriba = '<div class="lectura">' + v.orden + '</div>Si se ordena correctamente, ';
    if (tipo === 0) {
      var i = r.entero(0, n - 2);
      return { p: arriba + '&iquest;qu&eacute; va inmediatamente despu&eacute;s de <b>' + pasos[i] + '</b>?', b: pasos[i + 1],
        m: pasos.filter(function (_, k) { return k !== i && k !== i + 1; }) };
    }
    var primero = tipo === 1;
    return { p: arriba + '&iquest;qu&eacute; va ' + (primero ? 'en primer lugar' : 'al final') + '?',
      b: primero ? pasos[0] : pasos[n - 1], m: primero ? pasos.slice(1) : pasos.slice(0, n - 1) };
  }

  function unoDelListado(r, v) {
    var tema = v.lista.replace(/^Del siguiente listado,\s*/i, '').replace(/^(identifique|seleccione)\s+/i, '')
      .replace(/^&iquest;|^¿/, '').replace(/^Cu(&aacute;|á)les de las siguientes son\s+/i, '').replace(/[.?]\s*$/, '');
    tema = minus(tema);
    var de = (' de ' + tema).replace(/ de el /, ' del ');
    if (v.si.length >= 3 && r.bool()) {
      return { p: 'Todas las siguientes opciones forman parte' + de + ', excepto:', b: r.elige(v.no), m: r.muestra(v.si, 3) };
    }
    return { p: '&iquest;Cu&aacute;l de las siguientes opciones forma parte' + de + '?', b: r.elige(v.si), m: r.muestra(v.no, Math.min(v.no.length, 5)) };
  }

  function otraForma(r, v) {
    var formas = [];
    if (v.rel && v.pares.length >= 4 && !Array.isArray(v.pares[0][1])) formas.push(relDirecta, relInversa);
    if (v.c && v.b.length >= 2) formas.push(unHueco);
    if (v.orden && v.pasos.length >= 4) formas.push(queSigue);
    if (v.lista && v.si.length >= 1 && v.no.length >= 3) formas.push(unoDelListado);
    if (!formas.length) return null;
    var o = r.elige(formas)(r, v);
    if (!o) return null;
    /* hacen falta tres distractores distintos de la respuesta */
    if (o.p) {
      var distintos = o.m.filter(function (x, i) { return x !== o.b && o.m.indexOf(x) === i; });
      if (distintos.length < 3) return null;
      o.m = distintos;
    }
    if (v.lec) o.lec = v.lec;
    if (v.ex) o.ex = v.ex;
    if (v.pista) o.pista = v.pista;
    return o;
  }
  P.otraForma = otraForma;

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
        /* casi la mitad de las veces, el mismo contenido preguntado de otra forma */
        if (r.bool(0.45)) v = otraForma(r, v) || v;
        return P.generarVariante(r, v);
      }
    });
  };
})();
