/* Configuracion y progreso guardados en el navegador (localStorage). */
(function (global) {
  'use strict';
  var EJ = global.EJ = global.EJ || {};

  var CLAVE_CFG = 'ejgen.config.v1';
  var CLAVE_PROG = 'ejgen.progreso.v1';

  var porDefecto = {
    materia: 'matematicas',
    tema: null,
    subtema: null,        // null = mezcla de todos los subtemas
    guiado: false,        // entrenamiento paso a paso
    mezcla: false,        // practica mixta: ejercicios de varios temas
    mezclaGrupo: null,    // null = de todos los grupos
    dificultad: 'facil',
    maxIntentos: 3,       // intentos fallidos antes de revelar la respuesta
    pistas: true,
    mostrarSolucion: true
  };

  function leer(clave, alt) {
    try {
      var s = localStorage.getItem(clave);
      return s ? JSON.parse(s) : alt;
    } catch (e) { return alt; }
  }
  function escribir(clave, valor) {
    try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* modo privado */ }
  }

  var config = Object.assign({}, porDefecto, leer(CLAVE_CFG, {}));
  var progreso = leer(CLAVE_PROG, { temas: {}, racha: 0, mejorRacha: 0, total: 0, aciertos: 0 });

  function guardarConfig() { escribir(CLAVE_CFG, config); }
  function guardarProgreso() { escribir(CLAVE_PROG, progreso); }

  function celda(temaId, dificultad) {
    if (!progreso.temas[temaId]) progreso.temas[temaId] = {};
    if (!progreso.temas[temaId][dificultad]) {
      progreso.temas[temaId][dificultad] = { vistos: 0, aciertos: 0, alPrimero: 0, revelados: 0, intentos: 0 };
    }
    return progreso.temas[temaId][dificultad];
  }

  EJ.almacen = {
    config: config,
    progreso: progreso,

    set: function (clave, valor) { config[clave] = valor; guardarConfig(); },

    /* Se llama una vez por ejercicio terminado. */
    registrar: function (temaId, dificultad, datos) {
      var c = celda(temaId, dificultad);
      c.vistos++;
      c.intentos += datos.intentos || 0;
      if (datos.correcto) {
        c.aciertos++;
        progreso.aciertos++;
        if (datos.intentos <= 1) c.alPrimero++;
        progreso.racha++;
        if (progreso.racha > progreso.mejorRacha) progreso.mejorRacha = progreso.racha;
      } else {
        progreso.racha = 0;
      }
      if (datos.revelado) c.revelados++;
      progreso.total++;
      guardarProgreso();
    },

    estadisticas: function (temaId, dificultad) {
      var t = progreso.temas[temaId];
      if (!t) return { vistos: 0, aciertos: 0, alPrimero: 0, revelados: 0, intentos: 0 };
      if (dificultad) return t[dificultad] || { vistos: 0, aciertos: 0, alPrimero: 0, revelados: 0, intentos: 0 };
      var suma = { vistos: 0, aciertos: 0, alPrimero: 0, revelados: 0, intentos: 0 };
      Object.keys(t).forEach(function (d) {
        Object.keys(suma).forEach(function (k) { suma[k] += t[d][k] || 0; });
      });
      return suma;
    },

    reiniciar: function () {
      progreso.temas = {}; progreso.racha = 0; progreso.mejorRacha = 0;
      progreso.total = 0; progreso.aciertos = 0;
      guardarProgreso();
    }
  };
})(window);
