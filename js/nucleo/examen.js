/* Examen: juntas varios temas, dices cuantos ejercicios quieres y te arma una
   prueba completa. A diferencia de la practica, aqui NO se dice si acertaste
   hasta el final: primero contestas todo y luego se califica.

   Nada de esto se guarda como objeto vivo. De cada pregunta se guardan solo
   los datos para volver a generarla (tema, dificultad, subtema y semilla), asi
   que el examen sobrevive a cerrar la pestana y se puede reconstruir igual. */
(function (global) {
  'use strict';
  var EJ = global.EJ = global.EJ || {};

  var CLAVE_SEL = 'ejgen.examen.seleccion.v1';
  var CLAVE_CURSO = 'ejgen.examen.curso.v1';
  var CLAVE_HIST = 'ejgen.examen.historial.v1';

  var TOTAL_POR_DEFECTO = 20;
  var MAX_PREGUNTAS = 60;

  function leer(clave, alt) {
    try {
      var s = localStorage.getItem(clave);
      return s ? JSON.parse(s) : alt;
    } catch (e) { return alt; }
  }
  function escribir(clave, valor) {
    try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* modo privado */ }
  }
  function borrar(clave) {
    try { localStorage.removeItem(clave); } catch (e) { /* da igual */ }
  }

  /* ---------------- seleccion de temas ----------------
     Se guarda aparte del examen en curso: la idea es que la vayas armando poco
     a poco conforme avanzas en el curso, y siga ahi la proxima vez. */

  function seleccion() {
    var s = leer(CLAVE_SEL, null);
    if (!s || !s.temas) s = { temas: [], total: TOTAL_POR_DEFECTO };
    /* se caen los temas que ya no existen (por si se renombra alguno) */
    s.temas = s.temas.filter(function (t) { return !!EJ.buscarTema(t.temaId); });
    if (!s.total) s.total = TOTAL_POR_DEFECTO;
    return s;
  }
  function guardarSeleccion(s) { escribir(CLAVE_SEL, s); return s; }

  /* ---------------- reparto de cantidades ----------------
     `cantidad: null` quiere decir "reparte tu". Los temas con cantidad fija se
     respetan tal cual y el resto se reparte parejo entre los demas. */

  function reparto(sel) {
    var temas = sel.temas || [];
    if (!temas.length) return [];

    var fijos = temas.filter(function (t) { return t.cantidad > 0; });
    var libres = temas.filter(function (t) { return !(t.cantidad > 0); });
    var usado = fijos.reduce(function (a, t) { return a + t.cantidad; }, 0);
    var queda = Math.max(0, (sel.total || TOTAL_POR_DEFECTO) - usado);

    /* cada tema libre se lleva al menos uno, aunque el total se quede corto */
    var base = libres.length ? Math.floor(queda / libres.length) : 0;
    var sobra = libres.length ? queda - base * libres.length : 0;

    return temas.map(function (t) {
      var n;
      if (t.cantidad > 0) {
        n = t.cantidad;
      } else {
        var i = libres.indexOf(t);
        n = base + (i < sobra ? 1 : 0);
      }
      return { temaId: t.temaId, cantidad: Math.max(1, n) };
    });
  }

  /* Cuantas preguntas saldrian con la seleccion actual. */
  function totalReal(sel) {
    return reparto(sel).reduce(function (a, t) { return a + t.cantidad; }, 0);
  }

  /* ---------------- reparto de dificultad ----------------
     El examen empieza suave y va subiendo. Dentro de cada tema se reparte
     40% facil / 35% medio / 25% dificil sobre las dificultades que ese tema
     tenga de verdad. */

  var PESOS = { facil: 40, medio: 35, dificil: 25 };
  var ORDEN = ['facil', 'medio', 'dificil'];

  function dificultadesPara(tema, n) {
    var hay = ORDEN.filter(function (d) { return tema.dificultades.indexOf(d) !== -1; });
    if (!hay.length) hay = tema.dificultades.slice(0, 1);
    if (hay.length === 1) {
      return new Array(n).fill(hay[0]);
    }

    var sumaPesos = hay.reduce(function (a, d) { return a + (PESOS[d] || 1); }, 0);
    var cuenta = {}, restos = [], asignadas = 0;
    hay.forEach(function (d) {
      var exacto = n * (PESOS[d] || 1) / sumaPesos;
      cuenta[d] = Math.floor(exacto);
      restos.push({ d: d, resto: exacto - cuenta[d] });
      asignadas += cuenta[d];
    });
    /* Los redondeos hacia abajo dejan huecos. Se rellenan por MAYOR RESTO, que
       es el reparto proporcional de verdad; darselos siempre a la mas facil
       dejaba examenes con el 60% de preguntas faciles. En un empate gana la
       mas facil, para que una prueba de 2 no salga toda dificil. */
    restos.sort(function (a, b) {
      if (b.resto !== a.resto) return b.resto - a.resto;
      return ORDEN.indexOf(a.d) - ORDEN.indexOf(b.d);
    });
    var i = 0;
    while (asignadas < n) { cuenta[restos[i % restos.length].d]++; asignadas++; i++; }

    var lista = [];
    hay.forEach(function (d) { for (var k = 0; k < cuenta[d]; k++) lista.push(d); });
    return lista;
  }

  /* ---------------- armado ---------------- */

  function armar(sel) {
    var plan = reparto(sel);
    if (!plan.length) throw new Error('Agrega al menos un tema.');

    var preguntas = [];
    plan.forEach(function (p) {
      var tema = EJ.buscarTema(p.temaId);
      if (!tema) return;
      var difs = dificultadesPara(tema, p.cantidad);
      difs.forEach(function (d) {
        /* motor.nuevo ya evita repetir enunciados seguidos del mismo tema */
        var st;
        try { st = EJ.motor.nuevo(p.temaId, d, undefined, null); } catch (e) { return; }
        preguntas.push({
          temaId: p.temaId,
          temaNombre: tema.nombre,
          dificultad: st.dificultad,
          subtema: st.subtema || null,
          subtemaNombre: st.subtemaNombre || '',
          semilla: st.semilla,
          dada: null,      // lo que contesto el alumno
          marcada: false   // "volver a esta"
        });
      });
    });

    if (!preguntas.length) throw new Error('No se pudo generar ninguna pregunta.');
    ordenar(preguntas);
    if (preguntas.length > MAX_PREGUNTAS) preguntas = preguntas.slice(0, MAX_PREGUNTAS);

    return {
      creado: Date.now(),
      preguntas: preguntas,
      actual: 0,
      terminado: false,
      temas: plan.map(function (p) { return p.temaId; })
    };
  }

  /* De facil a dificil, y dentro de cada bloque se intercalan los temas para
     no encadenar cinco seguidas del mismo. */
  function ordenar(preguntas) {
    var bloques = {};
    preguntas.forEach(function (q) {
      (bloques[q.dificultad] = bloques[q.dificultad] || []).push(q);
    });
    var salida = [];
    ORDEN.forEach(function (d) {
      var bloque = bloques[d];
      if (!bloque) return;
      var porTema = {};
      bloque.forEach(function (q) { (porTema[q.temaId] = porTema[q.temaId] || []).push(q); });
      var colas = Object.keys(porTema).map(function (k) { return porTema[k]; });
      var vivo = true;
      while (vivo) {
        vivo = false;
        colas.forEach(function (c) { if (c.length) { salida.push(c.shift()); vivo = true; } });
      }
    });
    preguntas.length = 0;
    salida.forEach(function (q) { preguntas.push(q); });
  }

  /* Reconstruye el ejercicio de una pregunta. Es reproducible: misma semilla,
     mismo enunciado y misma respuesta. */
  function ejercicioDe(q) {
    return EJ.motor.nuevo(q.temaId, q.dificultad, q.semilla, q.subtema);
  }

  /* ---------------- calificacion ---------------- */

  function contestada(q) {
    return q.dada && q.dada.some(function (v) { return String(v).trim() !== ''; });
  }

  function calificar(ex) {
    var porTema = {}, aciertos = 0;
    var detalle = ex.preguntas.map(function (q) {
      var st, ok = false, correcta = '';
      try {
        st = ejercicioDe(q);
        correcta = st.ej.respuesta.mostrar ? st.ej.respuesta.mostrar() : '';
        ok = contestada(q) && !!st.ej.respuesta.verificar(q.dada);
      } catch (e) { ok = false; }
      if (ok) aciertos++;
      var t = porTema[q.temaId] || (porTema[q.temaId] = { nombre: q.temaNombre, total: 0, aciertos: 0 });
      t.total++;
      if (ok) t.aciertos++;
      return { q: q, ok: ok, correcta: correcta, estado: st, enBlanco: !contestada(q) };
    });

    var total = ex.preguntas.length;
    return {
      total: total,
      aciertos: aciertos,
      enBlanco: detalle.filter(function (d) { return d.enBlanco; }).length,
      porcentaje: total ? Math.round(1000 * aciertos / total) / 10 : 0,
      porTema: Object.keys(porTema).map(function (k) { return porTema[k]; }),
      detalle: detalle
    };
  }

  /* ---------------- persistencia del examen en curso ---------------- */

  function guardarCurso(ex) {
    if (!ex) return borrar(CLAVE_CURSO);
    escribir(CLAVE_CURSO, ex);
  }
  function leerCurso() {
    var ex = leer(CLAVE_CURSO, null);
    if (!ex || !ex.preguntas || !ex.preguntas.length) return null;
    /* si algun tema desaparecio, el examen ya no se puede reconstruir */
    var roto = ex.preguntas.some(function (q) { return !EJ.buscarTema(q.temaId); });
    return roto ? null : ex;
  }

  /* ---------------- historial ---------------- */

  function historial() { return leer(CLAVE_HIST, []); }

  function registrar(ex, nota) {
    var h = historial();
    h.unshift({
      fecha: Date.now(),
      total: nota.total,
      aciertos: nota.aciertos,
      porcentaje: nota.porcentaje,
      temas: nota.porTema.map(function (t) { return t.nombre; })
    });
    escribir(CLAVE_HIST, h.slice(0, 10));
  }

  function borrarHistorial() { borrar(CLAVE_HIST); }

  EJ.examen = {
    TOTAL_POR_DEFECTO: TOTAL_POR_DEFECTO,
    MAX_PREGUNTAS: MAX_PREGUNTAS,
    seleccion: seleccion,
    guardarSeleccion: guardarSeleccion,
    reparto: reparto,
    totalReal: totalReal,
    armar: armar,
    ejercicioDe: ejercicioDe,
    contestada: contestada,
    calificar: calificar,
    guardarCurso: guardarCurso,
    leerCurso: leerCurso,
    borrarCurso: function () { borrar(CLAVE_CURSO); },
    historial: historial,
    registrar: registrar,
    borrarHistorial: borrarHistorial
  };
})(window);
