/* Motor: crea ejercicios, cuenta intentos, entrega pistas y revela la respuesta
   cuando se agotan los intentos configurados. */
(function (global) {
  'use strict';
  var EJ = global.EJ = global.EJ || {};

  var historial = {};   // ultimos enunciados por tema, para no repetir seguido
  var cacheGuia = {};   // que subtemas tienen entrenamiento guiado

  function recuerda(temaId, enunciado) {
    if (!historial[temaId]) historial[temaId] = [];
    historial[temaId].push(enunciado);
    if (historial[temaId].length > 6) historial[temaId].shift();
  }
  function repetido(temaId, enunciado) {
    return (historial[temaId] || []).indexOf(enunciado) !== -1;
  }

  /* El guion del ejercicio.

     Solo se usan los guiones ESCRITOS A MANO: explican el porque de cada paso,
     avisan del error tipico y llevan al alumno de la mano. Se probo derivarlos
     automaticamente de la solucion del ejercicio, pero esa solucion esta
     redactada como recordatorio para quien ya intento, no como clase desde
     cero, y el resultado se entendia mal.

     El guion automatico sigue disponible por si se quiere usar de emergencia:
     basta poner EJ.guia.usarAutomaticas = true. */
  function guiaDe(ej) {
    if (ej.guia && (ej.guia.pasos || []).length) return ej.guia;
    if (EJ.guia && EJ.guia.usarAutomaticas && EJ.guia.desdeSolucion) {
      try { return EJ.guia.desdeSolucion(ej); } catch (e) { return null; }
    }
    return null;
  }

  function valido(ej) {
    return ej && ej.enunciado && ej.respuesta && typeof ej.respuesta.verificar === 'function';
  }

  /* Genera un ejercicio sin envolverlo en un "estado".
     `evitarRepetido` sirve para no repetir lo mismo dos veces seguidas. */
  function generarCrudo(tema, dificultad, semilla, subtema, evitarRepetido) {
    var ej = null, usada = null, error = null, elegido = null, r = null;
    for (var i = 0; i < 25 && !ej; i++) {
      usada = semilla === undefined || semilla === null
        ? ((Date.now() + i * 7919 + Math.floor(Math.random() * 1e6)) >>> 0)
        : (semilla >>> 0);
      r = new EJ.Aleatorio(usada);
      r.forzado = subtema || null;
      var candidato;
      try { candidato = tema.generar(dificultad, r); } catch (e) { error = e; continue; }
      if (!valido(candidato)) { error = error || new Error('Ejercicio incompleto'); continue; }
      if (evitarRepetido && (semilla === undefined || semilla === null)) {
        if (repetido(tema.id, candidato.enunciado) && i < 12) continue;
      }
      ej = candidato;
      elegido = r.elegido || null;
    }
    if (!ej) throw error || new Error('No se pudo generar el ejercicio');

    var nombreSub = '';
    (r.ofrecidos || []).forEach(function (s) { if (s.id === elegido) nombreSub = s.nombre; });
    return { ej: ej, semilla: usada, subtema: elegido, subtemaNombre: nombreSub };
  }

  var motor = {
    /* Crea un ejercicio nuevo. Si se pasa `semilla` el ejercicio es reproducible.
       `subtema` fuerza un subtema concreto; si se omite, sale al azar. */
    nuevo: function (temaId, dificultad, semilla, subtema) {
      var tema = EJ.buscarTema(temaId);
      if (!tema) throw new Error('No existe el tema ' + temaId);
      if (tema.dificultades.indexOf(dificultad) === -1) dificultad = tema.dificultades[0];

      var hecho = generarCrudo(tema, dificultad, semilla, subtema, true);
      recuerda(temaId, hecho.ej.enunciado);

      return {
        temaId: temaId,
        tema: tema,
        dificultad: dificultad,
        semilla: hecho.semilla,
        subtema: hecho.subtema,
        subtemaNombre: hecho.subtemaNombre,
        ej: hecho.ej,
        intentos: 0,
        pistasDadas: [],
        terminado: false,
        correcto: false,
        revelado: false
      };
    },

    /* Un ejercicio YA RESUELTO del mismo subtema, para aprender el metodo.
       No cuenta para las estadisticas ni para el historial. */
    ejemplo: function (temaId, dificultad, subtema, evitarEnunciado) {
      var tema = EJ.buscarTema(temaId);
      if (!tema) throw new Error('No existe el tema ' + temaId);
      if (tema.dificultades.indexOf(dificultad) === -1) dificultad = tema.dificultades[0];

      var hecho = null, i;
      for (i = 0; i < 12; i++) {
        hecho = generarCrudo(tema, dificultad, null, subtema, false);
        if (hecho.ej.enunciado !== evitarEnunciado) return hecho;   // que no sea el mismo de la pantalla
      }
      /* Subtemas con muy pocas variantes: busco el ejemplo en otra dificultad
         para no acabar mostrando el mismo ejercicio que esta resolviendo. */
      var otras = tema.dificultades.filter(function (d) { return d !== dificultad; });
      for (var k = 0; k < otras.length; k++) {
        var hayAhi = EJ.subtemasDe(temaId, otras[k]).some(function (s) { return s.id === subtema; });
        if (!hayAhi) continue;
        for (i = 0; i < 8; i++) {
          var alterno = generarCrudo(tema, otras[k], null, subtema, false);
          if (alterno.ej.enunciado !== evitarEnunciado) return alterno;
        }
      }
      return hecho;
    },

    /* ---------------- modo guiado ---------------- */

    /* Que subtemas de este tema y dificultad tienen entrenamiento guiado. */
    conGuia: function (temaId, dificultad) {
      var clave = temaId + '|' + dificultad;
      if (cacheGuia[clave]) return cacheGuia[clave];
      var tema = EJ.buscarTema(temaId);
      var lista = [];
      if (tema) {
        EJ.subtemasDe(temaId, dificultad).forEach(function (s) {
          for (var i = 0; i < 3; i++) {
            try {
              var h = generarCrudo(tema, dificultad, 5000 + i * 313, s.id, false);
              if (guiaDe(h.ej)) { lista.push(s); return; }
            } catch (e) { /* sigue */ }
          }
        });
      }
      cacheGuia[clave] = lista;
      return lista;
    },

    /* Crea un ejercicio CON guia. Si el subtema pedido no tiene, busca otro
       que si tenga. Devuelve null si el tema no tiene ninguno todavia. */
    nuevoGuiado: function (temaId, dificultad, subtema) {
      var tema = EJ.buscarTema(temaId);
      if (!tema) throw new Error('No existe el tema ' + temaId);
      if (tema.dificultades.indexOf(dificultad) === -1) dificultad = tema.dificultades[0];

      var disponibles = motor.conGuia(temaId, dificultad);
      if (!disponibles.length) return null;

      var ids = disponibles.map(function (s) { return s.id; });
      var objetivo = (subtema && ids.indexOf(subtema) !== -1) ? subtema : null;
      var orden = objetivo ? [objetivo] : ids.slice().sort(function () { return Math.random() - 0.5; });

      for (var k = 0; k < orden.length; k++) {
        for (var i = 0; i < 15; i++) {
          var hecho;
          try { hecho = generarCrudo(tema, dificultad, null, orden[k], true); } catch (e) { continue; }
          var guion = guiaDe(hecho.ej);
          if (!guion) continue;
          hecho.ej.guia = guion;
          recuerda(temaId, hecho.ej.enunciado);
          return {
            temaId: temaId, tema: tema, dificultad: dificultad,
            semilla: hecho.semilla, subtema: hecho.subtema, subtemaNombre: hecho.subtemaNombre,
            ej: hecho.ej,
            guiado: true,
            paso: 0,
            intentosPaso: 0,
            errores: 0,
            terminado: false
          };
        }
      }
      return null;
    },

    /* Revisa la respuesta del micro-paso actual. */
    responderPaso: function (estado, valores) {
      if (estado.terminado) return { yaTerminado: true };
      var pasos = estado.ej.guia.pasos;
      var paso = pasos[estado.paso];
      var ok = false;
      try { ok = !!paso.resp.verificar(valores); } catch (e) { ok = false; }

      if (!ok) {
        estado.intentosPaso++;
        estado.errores++;
        return {
          correcto: false,
          pista: estado.intentosPaso >= 1 ? paso.pista : null,
          mostrarRespuesta: estado.intentosPaso >= 3,
          respuestaDelPaso: paso.resp.mostrar()
        };
      }

      estado.paso++;
      estado.intentosPaso = 0;
      var acabo = estado.paso >= pasos.length;
      if (acabo) {
        estado.terminado = true;
        EJ.almacen.registrar(estado.temaId, estado.dificultad, {
          correcto: true, intentos: 1 + estado.errores, revelado: false
        });
      }
      return { correcto: true, despues: paso.despues, terminado: acabo };
    },

    /* Pasos que solo explican: se avanza sin contestar nada. */
    avanzarPaso: function (estado) {
      var pasos = estado.ej.guia.pasos;
      estado.paso++;
      estado.intentosPaso = 0;
      if (estado.paso >= pasos.length) {
        estado.terminado = true;
        EJ.almacen.registrar(estado.temaId, estado.dificultad, {
          correcto: true, intentos: 1 + estado.errores, revelado: false
        });
      }
      return { terminado: estado.terminado };
    },

    /* Se rinde en este paso: se lo enseñamos y seguimos al siguiente. */
    saltarPaso: function (estado) {
      var pasos = estado.ej.guia.pasos;
      var paso = pasos[estado.paso];
      estado.errores++;
      estado.paso++;
      estado.intentosPaso = 0;
      if (estado.paso >= pasos.length) {
        estado.terminado = true;
        EJ.almacen.registrar(estado.temaId, estado.dificultad, {
          correcto: false, intentos: 1 + estado.errores, revelado: true
        });
      }
      return { respuesta: paso.resp.mostrar(), despues: paso.despues, terminado: estado.terminado };
    },

    /* Comprueba una respuesta. Devuelve que hacer en pantalla. */
    responder: function (estado, valores) {
      if (estado.terminado) return { yaTerminado: true };
      var cfg = EJ.almacen.config;
      var ok = false;
      try { ok = !!estado.ej.respuesta.verificar(valores); } catch (e) { ok = false; }
      estado.intentos++;

      var detalle = null;
      if (!ok && estado.ej.respuesta.detalle) {
        try { detalle = estado.ej.respuesta.detalle(valores); } catch (e) { detalle = null; }
      }

      if (ok) {
        estado.terminado = true;
        estado.correcto = true;
        EJ.almacen.registrar(estado.temaId, estado.dificultad, {
          correcto: true, intentos: estado.intentos, revelado: estado.revelado
        });
        return { correcto: true, intentos: estado.intentos };
      }

      var restantes = Math.max(0, cfg.maxIntentos - estado.intentos);
      var pista = null;
      if (restantes > 0 && cfg.pistas) {
        var lista = estado.ej.pistas || [];
        var idx = estado.pistasDadas.length;
        if (idx < lista.length) { pista = lista[idx]; estado.pistasDadas.push(pista); }
      }
      if (restantes === 0) {
        motor.revelar(estado, true);
        return { correcto: false, intentos: estado.intentos, restantes: 0, revelar: true, detalle: detalle };
      }
      return { correcto: false, intentos: estado.intentos, restantes: restantes, pista: pista, detalle: detalle };
    },

    /* Muestra la respuesta y la solucion paso a paso. */
    revelar: function (estado, porIntentos) {
      if (estado.revelado) return estado;
      estado.revelado = true;
      estado.terminado = true;
      estado.correcto = false;
      estado.porIntentos = !!porIntentos;
      EJ.almacen.registrar(estado.temaId, estado.dificultad, {
        correcto: false, intentos: estado.intentos, revelado: true
      });
      return estado;
    },

    /* Pista extra a peticion del usuario (sin gastar intento). */
    pedirPista: function (estado) {
      var lista = estado.ej.pistas || [];
      var idx = estado.pistasDadas.length;
      if (idx >= lista.length) return null;
      estado.pistasDadas.push(lista[idx]);
      return lista[idx];
    }
  };

  EJ.motor = motor;
})(window);
