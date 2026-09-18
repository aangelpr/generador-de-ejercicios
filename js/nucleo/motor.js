/* Motor: crea ejercicios, cuenta intentos, entrega pistas y revela la respuesta
   cuando se agotan los intentos configurados. */
(function (global) {
  'use strict';
  var EJ = global.EJ = global.EJ || {};

  var historial = {};   // ultimos enunciados por tema, para no repetir seguido

  function recuerda(temaId, enunciado) {
    if (!historial[temaId]) historial[temaId] = [];
    historial[temaId].push(enunciado);
    if (historial[temaId].length > 6) historial[temaId].shift();
  }
  function repetido(temaId, enunciado) {
    return (historial[temaId] || []).indexOf(enunciado) !== -1;
  }

  function valido(ej) {
    return ej && ej.enunciado && ej.respuesta && typeof ej.respuesta.verificar === 'function';
  }

  var motor = {
    /* Crea un ejercicio nuevo. Si se pasa `semilla` el ejercicio es reproducible.
       `subtema` fuerza un subtema concreto; si se omite, sale al azar. */
    nuevo: function (temaId, dificultad, semilla, subtema) {
      var tema = EJ.buscarTema(temaId);
      if (!tema) throw new Error('No existe el tema ' + temaId);
      if (tema.dificultades.indexOf(dificultad) === -1) dificultad = tema.dificultades[0];

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
        if (semilla === undefined || semilla === null) {
          if (repetido(temaId, candidato.enunciado) && i < 12) continue;
        }
        ej = candidato;
        elegido = r.elegido || null;
      }
      if (!ej) throw error || new Error('No se pudo generar el ejercicio');
      recuerda(temaId, ej.enunciado);

      var nombreSub = '';
      (r.ofrecidos || []).forEach(function (s) { if (s.id === elegido) nombreSub = s.nombre; });

      return {
        temaId: temaId,
        tema: tema,
        dificultad: dificultad,
        semilla: usada,
        subtema: elegido,
        subtemaNombre: nombreSub,
        ej: ej,
        intentos: 0,
        pistasDadas: [],
        terminado: false,
        correcto: false,
        revelado: false
      };
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
