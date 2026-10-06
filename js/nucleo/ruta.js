/* Ruta en orden: recorre los temas de una materia de lo mas basico a lo mas
   avanzado (en el orden de la lista: en Matematicas empieza en ley de
   signos) y, dentro de cada tema, de Facil a Medio a Dificil.

   Cada paso es un tema en un nivel. Con META aciertos se pasa solo al
   siguiente. El avance se guarda por materia en el navegador. */
(function (global) {
  'use strict';
  var EJ = global.EJ = global.EJ || {};

  var CLAVE = 'ejgen.ruta.v1';
  var META = 3;
  var NIVELES = ['facil', 'medio', 'dificil'];

  function leer() {
    try { var s = localStorage.getItem(CLAVE); return s ? JSON.parse(s) : {}; } catch (e) { return {}; }
  }
  function escribir(v) {
    try { localStorage.setItem(CLAVE, JSON.stringify(v)); } catch (e) { /* modo privado */ }
  }
  var datos = leer();

  /* Los pasos de una materia: [{temaId, nivel}] en orden. */
  function pasos(materiaId) {
    var out = [];
    EJ.temas(materiaId).forEach(function (t) {
      NIVELES.forEach(function (n) {
        if (t.dificultades.indexOf(n) !== -1) out.push({ temaId: t.id, nivel: n });
      });
    });
    return out;
  }

  /* Donde va el alumno: {paso, aciertos, total, actual: {temaId, nivel} | null} */
  function estado(materiaId) {
    var lista = pasos(materiaId);
    var d = datos[materiaId] || { paso: 0, aciertos: 0 };
    var paso = Math.max(0, Math.min(d.paso || 0, lista.length));
    return { paso: paso, aciertos: d.aciertos || 0, total: lista.length, meta: META, pasos: lista, actual: lista[paso] || null };
  }

  function guardar(materiaId, paso, aciertos) {
    datos[materiaId] = { paso: paso, aciertos: aciertos };
    escribir(datos);
  }

  /* Un acierto en el paso actual. Devuelve {avanzo, terminada}. */
  function acierto(materiaId) {
    var e = estado(materiaId);
    if (!e.actual) return { avanzo: false, terminada: true };
    var a = e.aciertos + 1;
    if (a >= META) {
      guardar(materiaId, e.paso + 1, 0);
      return { avanzo: true, terminada: e.paso + 1 >= e.total };
    }
    guardar(materiaId, e.paso, a);
    return { avanzo: false, terminada: false };
  }

  function irA(materiaId, paso) { guardar(materiaId, Math.max(0, paso), 0); }
  function reiniciar(materiaId) { guardar(materiaId, 0, 0); }

  EJ.ruta = {
    META: META,
    pasos: pasos,
    estado: estado,
    acierto: acierto,
    irA: irA,
    saltar: function (materiaId) { var e = estado(materiaId); irA(materiaId, Math.min(e.paso + 1, e.total)); },
    reiniciar: reiniciar
  };
})(window);
