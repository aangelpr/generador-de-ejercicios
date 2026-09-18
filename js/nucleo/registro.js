/* Registro de materias y temas.
   Para agregar un tema nuevo basta con crear un archivo js/temas/<materia>/<tema>.js
   que llame a EJ.tema({...}) y enlazarlo en index.html. Nada mas hay que tocar. */
(function (global) {
  'use strict';
  var EJ = global.EJ = global.EJ || {};

  var materias = [];
  var temas = [];
  var porId = {};

  EJ.materia = function (def) {
    if (!def || !def.id) throw new Error('La materia necesita un id');
    materias.push({
      id: def.id,
      nombre: def.nombre || def.id,
      icono: def.icono || '',
      descripcion: def.descripcion || '',
      disponible: def.disponible !== false,
      orden: def.orden === undefined ? materias.length : def.orden
    });
    return def.id;
  };

  EJ.tema = function (def) {
    if (!def || !def.id) throw new Error('El tema necesita un id');
    if (typeof def.generar !== 'function') throw new Error('El tema "' + def.id + '" necesita generar()');
    if (porId[def.id]) throw new Error('Tema repetido: ' + def.id);
    var t = {
      id: def.id,
      materia: def.materia || 'matematicas',
      grupo: def.grupo || 'General',
      nombre: def.nombre || def.id,
      descripcion: def.descripcion || '',
      dificultades: def.dificultades || ['facil', 'medio', 'dificil'],
      etiquetas: def.etiquetas || [],
      formulario: def.formulario || '',   // recordatorio de formulas, opcional
      generar: def.generar
    };
    temas.push(t);
    porId[t.id] = t;
    return t;
  };

  EJ.materias = function () {
    return materias.slice().sort(function (a, b) { return a.orden - b.orden; });
  };

  EJ.temas = function (materiaId) {
    return temas.filter(function (t) { return !materiaId || t.materia === materiaId; });
  };

  EJ.tienTema = function (id) { return !!porId[id]; };
  EJ.buscarTema = function (id) { return porId[id] || null; };

  /* Que subtemas ofrece un tema en cierta dificultad.
     No hay que declararlos aparte: se averiguan generando un ejercicio de
     prueba y viendo que lista le paso el tema a r.subtema(). */
  var cacheSub = {};
  EJ.subtemasDe = function (temaId, dificultad) {
    var clave = temaId + '|' + dificultad;
    if (cacheSub[clave]) return cacheSub[clave];
    var t = porId[temaId];
    if (!t) return [];
    var encontrados = [];
    for (var i = 0; i < 6 && !encontrados.length; i++) {
      var r = new EJ.Aleatorio(1000 + i * 977);
      try { t.generar(dificultad, r); } catch (e) { /* da igual: solo queremos la lista */ }
      if (r.ofrecidos) encontrados = r.ofrecidos;
    }
    cacheSub[clave] = encontrados;
    return encontrados;
  };

  /* Temas agrupados y en el orden en que se registraron. */
  EJ.gruposDe = function (materiaId) {
    var grupos = [], indice = {};
    EJ.temas(materiaId).forEach(function (t) {
      if (!indice[t.grupo]) { indice[t.grupo] = { nombre: t.grupo, temas: [] }; grupos.push(indice[t.grupo]); }
      indice[t.grupo].temas.push(t);
    });
    return grupos;
  };
})(window);
