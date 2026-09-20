/* Interfaz del generador de ejercicios. */
(function () {
  'use strict';
  /* Sube esto junto con la version de sw.js. Se ve en Ajustes y sirve para
     saber de un vistazo si el celular ya tiene la version nueva. */
  var VERSION = 'v17 (20 sep 2026)';

  var cfg = EJ.almacen.config;
  var estado = null;
  var NOMBRES_DIF = { facil: 'Facil', medio: 'Medio', dificil: 'Dificil' };

  function $(id) { return document.getElementById(id); }

  function esCelular() { return window.matchMedia('(max-width: 860px)').matches; }

  /* En celular la lista de temas se esconde al elegir uno, para que el
     ejercicio quede hasta arriba sin tener que hacer scroll. */
  function cerrarListaEnCelular() {
    if (esCelular()) document.body.classList.add('temas-cerrados');
  }
  function alternarLista() {
    document.body.classList.toggle('temas-cerrados');
    if (!document.body.classList.contains('temas-cerrados')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  function crear(tag, clase, html) {
    var e = document.createElement(tag);
    if (clase) e.className = clase;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  /* ---------------- barra lateral ---------------- */
  function pintarMaterias() {
    var sel = $('materia');
    sel.innerHTML = '';
    EJ.materias().forEach(function (m) {
      var n = EJ.temas(m.id).length;
      var o = crear('option');
      o.value = m.id;
      o.textContent = m.nombre + (n ? ' (' + n + ')' : ' - proximamente');
      o.disabled = n === 0;
      sel.appendChild(o);
    });
    if (!EJ.temas(cfg.materia).length && EJ.materias().length) {
      var primera = EJ.materias().filter(function (m) { return EJ.temas(m.id).length; })[0];
      if (primera) cfg.materia = primera.id;
    }
    sel.value = cfg.materia;
  }

  function pintarTemas() {
    var cont = $('temas');
    var filtro = EJ.resp.normaliza($('buscar').value);
    cont.innerHTML = '';
    var hubo = false;

    /* practica mixta: ejercicios de varios temas revueltos */
    if (!filtro) {
      var bm = crear('button', 'tema-btn mixta' + (cfg.mezcla ? ' activo' : ''));
      bm.innerHTML = 'Practica mixta<small>Ejercicios de varios temas al azar</small>';
      bm.onclick = activarMezcla;
      cont.appendChild(bm);
    }

    EJ.gruposDe(cfg.materia).forEach(function (g) {
      var visibles = g.temas.filter(function (t) {
        if (!filtro) return true;
        return EJ.resp.normaliza(t.nombre + ' ' + t.descripcion + ' ' + t.etiquetas.join(' ')).indexOf(filtro) !== -1;
      });
      if (!visibles.length) return;
      hubo = true;
      cont.appendChild(crear('div', 'grupo-titulo', g.nombre));
      visibles.forEach(function (t) {
        var st = EJ.almacen.estadisticas(t.id);
        var b = crear('button', 'tema-btn' + (t.id === cfg.tema ? ' activo' : ''));
        var marca = dificultadesConGuia(t.id).length ? '<span class="marca-guia" title="Tiene entrenamiento paso a paso">paso a paso</span>' : '';
        b.innerHTML = t.nombre + marca + (st.vistos ? '<small>' + st.aciertos + '/' + st.vistos + ' correctos</small>' : '');
        b.onclick = function () { elegirTema(t.id); };
        cont.appendChild(b);
      });
    });
    if (!hubo) cont.appendChild(crear('div', 'vacio', 'Sin resultados.'));
  }

  /* ---------------- practica mixta ---------------- */
  function activarMezcla() {
    cfg.mezcla = true;
    cfg.guiado = false;          // la mezcla siempre es para resolver tu
    EJ.almacen.set('mezcla', true);
    pintarTemas();
    cerrarListaEnCelular();
    nuevoEjercicio();
  }

  /* Temas que entran en la mezcla: los del grupo elegido (o todos) que
     tengan la dificultad actual. */
  function temasDeLaMezcla() {
    var lista = EJ.temas(cfg.materia);
    if (cfg.mezclaGrupo) lista = lista.filter(function (t) { return t.grupo === cfg.mezclaGrupo; });
    var conDif = lista.filter(function (t) { return t.dificultades.indexOf(cfg.dificultad) !== -1; });
    return conDif.length ? conDif : lista;
  }

  function elegirTema(id) {
    cfg.mezcla = false;
    EJ.almacen.set('mezcla', false);
    cfg.tema = id;
    cfg.subtema = null;              // al cambiar de tema se vuelve a "Mezcla"
    EJ.almacen.set('tema', id);
    pintarTemas();
    cerrarListaEnCelular();
    var tema = EJ.buscarTema(id);
    if (tema.dificultades.indexOf(cfg.dificultad) === -1) {
      cfg.dificultad = tema.dificultades[0];
      EJ.almacen.set('dificultad', cfg.dificultad);
    }
    nuevoEjercicio();
  }

  /* Si el subtema elegido no existe en esta dificultad, se vuelve a "Mezcla". */
  function validarSubtema() {
    if (!cfg.subtema) return;
    var hay = EJ.subtemasDe(cfg.tema, cfg.dificultad).some(function (s) { return s.id === cfg.subtema; });
    if (!hay) cfg.subtema = null;
  }

  /* ---------------- ejercicio ---------------- */
  function nuevoEjercicio(semilla) {
    if (cfg.mezcla) {
      var pool = temasDeLaMezcla();
      if (!pool.length) return pintarVacio();
      var elegido = pool[Math.floor(Math.random() * pool.length)];
      try {
        estado = EJ.motor.nuevo(elegido.id, cfg.dificultad, semilla, null);
      } catch (e) {
        $('zona').innerHTML = '';
        $('zona').appendChild(crear('div', 'tarjeta', '<b>No se pudo generar el ejercicio.</b><br><small>' + e.message + '</small>'));
        return;
      }
      return pintarEjercicio();
    }
    if (!cfg.tema) return pintarVacio();
    validarSubtema();

    /* modo guiado: solo para subtemas que ya tienen entrenamiento paso a paso */
    if (cfg.guiado) {
      var guiado = null;
      try { guiado = EJ.motor.nuevoGuiado(cfg.tema, cfg.dificultad, cfg.subtema); } catch (e) { guiado = null; }
      if (guiado) {
        estado = guiado;
        estado.bitacora = [];
        return pintarGuiado();
      }
      cfg.guiado = false;          // este tema no lo tiene: se sigue en modo normal
      EJ.almacen.set('guiado', false);
    }

    try {
      estado = EJ.motor.nuevo(cfg.tema, cfg.dificultad, semilla, cfg.subtema);
    } catch (e) {
      $('zona').innerHTML = '';
      $('zona').appendChild(crear('div', 'tarjeta', '<b>No se pudo generar el ejercicio.</b><br><small>' + e.message + '</small>'));
      return;
    }
    pintarEjercicio();
  }

  function pintarVacio() {
    $('zona').innerHTML = '<div class="tarjeta vacio">Elige un tema de la lista para empezar.</div>';
  }

  /* En que dificultades de este tema hay entrenamiento guiado. */
  function dificultadesConGuia(temaId) {
    var tema = EJ.buscarTema(temaId);
    if (!tema) return [];
    return tema.dificultades.filter(function (d) {
      return EJ.motor.conGuia(temaId, d).length > 0;
    });
  }

  /* Los dos modos de estudio: resolver completo, o guiado paso a paso. */
  function selectorModo() {
    var fila = crear('div', 'modos');
    var conGuia = (!cfg.mezcla && cfg.tema) ? dificultadesConGuia(cfg.tema) : [];
    var aqui = conGuia.indexOf(cfg.dificultad) !== -1;

    var bNormal = crear('button', cfg.guiado ? '' : 'activo', 'Resolver yo');
    bNormal.onclick = function () { cambiarModo(false); };
    fila.appendChild(bNormal);

    var bGuiado = crear('button', cfg.guiado ? 'activo' : '', 'Ensename paso a paso');
    bGuiado.disabled = !conGuia.length;
    bGuiado.title = conGuia.length ? 'Te voy preguntando una operacion a la vez'
      : 'Este tema todavia no tiene entrenamiento guiado';
    bGuiado.onclick = function () {
      /* si esta dificultad no lo tiene, te lleva a la que si */
      if (!aqui && conGuia.length) {
        cfg.dificultad = conGuia[0];
        EJ.almacen.set('dificultad', cfg.dificultad);
        cfg.subtema = null;
      }
      cambiarModo(true);
    };
    fila.appendChild(bGuiado);

    if (!cfg.mezcla) {
      if (!conGuia.length) {
        fila.appendChild(crear('span', 'nota-modo', 'paso a paso: aun no disponible en este tema'));
      } else if (!aqui) {
        fila.appendChild(crear('span', 'nota-modo',
          'paso a paso disponible en ' + conGuia.map(function (d) { return (NOMBRES_DIF[d] || d).toLowerCase(); }).join(' y ')));
      }
    }
    return fila;
  }

  /* Tarjeta de arriba: tema, dificultad, subtemas y modo. La usan los dos modos. */
  function cabeceraTema() {
    var tema = estado.tema;
    var cab = crear('div', 'tarjeta');
    cab.appendChild(crear('h2', null, cfg.mezcla ? 'Practica mixta' : tema.nombre));
    cab.appendChild(crear('p', 'desc', cfg.mezcla
      ? 'Ejercicios de temas revueltos, como en un examen. Elige de que grupo quieres que salgan.'
      : tema.descripcion));
    var difs = crear('div', 'dificultades');
    tema.dificultades.forEach(function (d) {
      var b = crear('button', d === cfg.dificultad ? 'activo' : '', NOMBRES_DIF[d] || d);
      b.onclick = function () {
        cfg.dificultad = d; EJ.almacen.set('dificultad', d); nuevoEjercicio();
      };
      difs.appendChild(b);
    });
    cab.appendChild(difs);

    if (cfg.mezcla) {
      /* en la mezcla se elige el GRUPO del que salen los ejercicios */
      var filaG = crear('div', 'subtemas');
      filaG.appendChild(crear('span', 'etiqueta-sub', 'Salen de:'));
      var bTodos = crear('button', cfg.mezclaGrupo ? '' : 'activo', 'Todos los temas');
      bTodos.onclick = function () { cfg.mezclaGrupo = null; EJ.almacen.set('mezclaGrupo', null); nuevoEjercicio(); };
      filaG.appendChild(bTodos);
      EJ.gruposDe(cfg.materia).forEach(function (g) {
        var b = crear('button', g.nombre === cfg.mezclaGrupo ? 'activo' : '', g.nombre);
        b.onclick = function () { cfg.mezclaGrupo = g.nombre; EJ.almacen.set('mezclaGrupo', g.nombre); nuevoEjercicio(); };
        filaG.appendChild(b);
      });
      cab.appendChild(filaG);
    }

    /* subtemas disponibles en esta dificultad */
    var subs = cfg.mezcla ? [] : EJ.subtemasDe(tema.id, cfg.dificultad);
    if (subs.length > 1) {
      var fila = crear('div', 'subtemas');
      fila.appendChild(crear('span', 'etiqueta-sub', 'Subtema:'));
      var todos = crear('button', cfg.subtema ? '' : 'activo', 'Mezcla');
      todos.onclick = function () { cfg.subtema = null; EJ.almacen.set('subtema', null); nuevoEjercicio(); };
      fila.appendChild(todos);
      subs.forEach(function (s) {
        var b = crear('button', s.id === cfg.subtema ? 'activo' : '', s.nombre);
        b.onclick = function () { cfg.subtema = s.id; EJ.almacen.set('subtema', s.id); nuevoEjercicio(); };
        fila.appendChild(b);
      });
      cab.appendChild(fila);
    }
    if (tema.formulario) {
      var det = crear('details', 'formulario');
      det.innerHTML = '<summary>Formulario del tema</summary><div class="cuerpo">' + tema.formulario + '</div>';
      cab.appendChild(det);
    }
    cab.appendChild(selectorModo());
    return cab;
  }

  function pintarEjercicio() {
    var tema = estado.tema, ej = estado.ej;
    var zona = $('zona');
    zona.innerHTML = '';

    zona.appendChild(cabeceraTema());

    /* ejercicio */
    var card = crear('div', 'tarjeta');
    card.id = 'card-ejercicio';
    var etiqueta = cfg.mezcla
      ? tema.nombre + (estado.subtemaNombre ? ' &middot; ' + estado.subtemaNombre : '')
      : estado.subtemaNombre;
    if (etiqueta) card.appendChild(crear('div', 'insignia', etiqueta));
    card.appendChild(crear('div', 'enunciado', ej.enunciado));

    card.appendChild(pintarCampos(ej.respuesta));

    var ayuda = ej.respuesta.campos[0].ayuda || ej.respuesta.ayuda;
    if (ayuda) card.appendChild(crear('div', 'ayuda', ayuda));

    var bAprender = crear('button', 'aprender-btn', 'Como se resuelve');
    bAprender.onclick = function () { alternarAprender(bAprender); };
    card.appendChild(bAprender);
    card.appendChild(crear('div', 'caja-aprender'));

    var acciones = crear('div', 'acciones');
    var bComprobar = crear('button', 'primario', 'Comprobar');
    bComprobar.id = 'btn-comprobar';
    bComprobar.onclick = comprobar;
    acciones.appendChild(bComprobar);

    if ((ej.pistas || []).length) {
      var bPista = crear('button', '', 'Dame una pista');
      bPista.id = 'btn-pista';
      bPista.onclick = function () {
        var p = EJ.motor.pedirPista(estado);
        if (p) mostrarPista(p);
        else mostrarAviso('pista', 'Ya no quedan pistas para este ejercicio.');
        if (estado.pistasDadas.length >= (estado.ej.pistas || []).length) bPista.disabled = true;
      };
      acciones.appendChild(bPista);
    }

    var bVer = crear('button', '', 'Ver respuesta');
    bVer.id = 'btn-ver';
    bVer.onclick = function () { EJ.motor.revelar(estado, false); mostrarSolucion(false); actualizarEstadisticas(); pintarTemas(); };
    acciones.appendChild(bVer);

    var bNuevo = crear('button', 'fantasma', 'Saltar / otro ejercicio');
    bNuevo.id = 'btn-nuevo';
    bNuevo.onclick = function () { nuevoEjercicio(); };
    acciones.appendChild(bNuevo);

    card.appendChild(acciones);
    card.appendChild(crear('div', 'intentos', dibujarIntentos()));
    card.appendChild(crear('div', 'feedback'));
    zona.appendChild(card);

    actualizarEstadisticas();
    var primero = card.querySelector('input[type="text"]');
    if (primero) primero.focus();
  }

  /* Pinta las casillas de respuesta (sirve igual para el modo normal y para
     cada micro-paso del modo guiado). */
  function pintarCampos(respuesta) {
    var campos = crear('div', 'campos');
    respuesta.campos.forEach(function (c, i) {
      var cont = crear('div', 'campo' + (c.ancho === 'corto' ? ' corto' : ''));
      cont.id = 'campo-' + i;
      if (c.tipo === 'opcion') {
        cont.style.flexBasis = '100%';
        if (c.etiqueta) cont.appendChild(crear('label', null, c.etiqueta));
        var ops = crear('div', 'opciones');
        c.opciones.forEach(function (texto, j) {
          var lab = crear('label', 'opcion');
          lab.innerHTML = '<input type="radio" name="op-' + i + '" value="' + j + '"><span>' + texto + '</span>';
          lab.onclick = function () {
            Array.prototype.forEach.call(ops.children, function (x) { x.classList.remove('elegida'); });
            lab.classList.add('elegida');
          };
          ops.appendChild(lab);
        });
        cont.appendChild(ops);
      } else {
        cont.appendChild(crear('label', null, c.etiqueta + (c.unidad ? ' <span class="unidad">(' + c.unidad + ')</span>' : '')));
        var inp = document.createElement('input');
        inp.type = 'text';
        inp.autocomplete = 'off';
        inp.spellcheck = false;
        inp.autocapitalize = 'off';
        inp.id = 'entrada-' + i;
        inp.addEventListener('keydown', function (ev) {
          if (ev.key !== 'Enter') return;
          ev.preventDefault();
          if (estado.guiado) comprobarPaso();
          else if (estado.terminado) nuevoEjercicio();
          else comprobar();
        });
        cont.appendChild(inp);

        /* vista previa: al escribir x^2 se ve x con el 2 arriba */
        var previa = crear('div', 'previa');
        previa.id = 'previa-' + i;
        previa.hidden = true;
        cont.appendChild(previa);
        inp.addEventListener('input', function () {
          if (EJ.fmt.convieneVistaPrevia(inp.value)) {
            previa.innerHTML = '= ' + EJ.fmt.vistaPrevia(inp.value);
            previa.hidden = false;
          } else {
            previa.hidden = true;
          }
        });
      }
      campos.appendChild(cont);
    });
    return campos;
  }

  function dibujarIntentos() {
    var max = cfg.maxIntentos, usados = estado.intentos, html = '';
    for (var i = 0; i < max; i++) html += '<span class="punto' + (i < usados ? ' gastado' : '') + '"></span>';
    return html + '<span>' + Math.max(0, max - usados) + ' de ' + max + ' intentos restantes</span>';
  }

  function zonaFeedback() { return document.querySelector('#card-ejercicio .feedback'); }

  function mostrarAviso(clase, html) {
    var f = zonaFeedback();
    var d = crear('div', 'aviso ' + clase, html);
    f.appendChild(d);
    return d;
  }
  function mostrarPista(texto) { mostrarAviso('pista', '<b>Pista:</b> ' + texto); }

  function valores(respuesta) {
    return (respuesta || estado.ej.respuesta).campos.map(function (c, i) {
      if (c.tipo === 'opcion') {
        var m = document.querySelector('input[name="op-' + i + '"]:checked');
        return m ? m.value : '';
      }
      var inp = $('entrada-' + i);
      return inp ? inp.value : '';
    });
  }

  function comprobar() {
    if (!estado || estado.terminado) return;
    var vals = valores();
    if (vals.every(function (v) { return String(v).trim() === ''; })) {
      mostrarAviso('pista', 'Escribe una respuesta antes de comprobar.');
      return;
    }
    var res = EJ.motor.responder(estado, vals);
    document.querySelector('#card-ejercicio .intentos').innerHTML = dibujarIntentos();

    /* marca cada campo cuando hay varias sub-respuestas */
    if (res.detalle) {
      res.detalle.forEach(function (ok, i) {
        var c = $('campo-' + i);
        if (c) { c.classList.toggle('bien', ok); c.classList.toggle('mal', !ok); }
      });
    }

    if (res.correcto) {
      estado.ej.respuesta.campos.forEach(function (c, i) {
        var e = $('campo-' + i); if (e) { e.classList.add('bien'); e.classList.remove('mal'); }
      });
      mostrarAviso('ok', '<b>&iexcl;Correcto!</b> ' + (estado.intentos === 1 ? 'A la primera.' : 'Lo lograste en ' + estado.intentos + ' intentos.'));
      if (cfg.mostrarSolucion) mostrarSolucion(true);
      terminar();
    } else if (res.revelar) {
      mostrarAviso('mal', 'Se acabaron los intentos. Revisa la solucion con calma:');
      mostrarSolucion(false);
      terminar();
    } else {
      var msg = estado.ej.respuesta.mensaje ? estado.ej.respuesta.mensaje(vals) : null;
      mostrarAviso('mal', msg || ('Todavia no. Te quedan <b>' + res.restantes + '</b> ' + (res.restantes === 1 ? 'intento' : 'intentos') + '.'));
      if (res.pista) mostrarPista(res.pista);
      var card = $('card-ejercicio');
      card.classList.remove('sacude');
      void card.offsetWidth;
      card.classList.add('sacude');
      var primero = card.querySelector('input[type="text"]');
      if (primero) primero.select();
    }
    actualizarEstadisticas();
    pintarTemas();
  }

  /* ---------------- modo guiado (paso a paso) ---------------- */
  function pintarGuiado() {
    var g = estado.ej.guia;
    var zona = $('zona');
    zona.innerHTML = '';
    zona.appendChild(cabeceraTema());

    var card = crear('div', 'tarjeta guiado');
    card.id = 'card-ejercicio';
    if (estado.subtemaNombre) card.appendChild(crear('div', 'insignia', estado.subtemaNombre));
    if (g.intro) card.appendChild(crear('div', 'guia-intro', g.intro));
    if (g.tablero) card.appendChild(crear('div', 'tablero-caja', g.tablero(estado.paso)));

    /* lo que ya se resolvio */
    if (estado.bitacora && estado.bitacora.length) {
      var log = crear('ol', 'bitacora');
      estado.bitacora.forEach(function (t) { log.appendChild(crear('li', null, t)); });
      card.appendChild(log);
    }

    if (estado.terminado) {
      card.appendChild(crear('div', 'aviso ok', '<b>&iexcl;Listo!</b> Terminaste el ejercicio paso a paso.'));
      if (g.final) card.appendChild(crear('div', 'guia-final', g.final));
      if (g.receta && g.receta.length) {
        var rec = crear('div', 'receta');
        rec.appendChild(crear('div', 'rotulo', 'La receta que acabas de aprender'));
        var ol = crear('ol');
        g.receta.forEach(function (x) { ol.appendChild(crear('li', null, x)); });
        rec.appendChild(ol);
        card.appendChild(rec);
      }
      var acc = crear('div', 'acciones');
      var otro = crear('button', 'primario', 'Otro ejercicio guiado');
      otro.onclick = function () { nuevoEjercicio(); };
      acc.appendChild(otro);
      var salir = crear('button', 'fantasma', 'Practicar por mi cuenta');
      salir.onclick = function () { cambiarModo(false); };
      acc.appendChild(salir);
      card.appendChild(acc);
      zona.appendChild(card);
      actualizarEstadisticas();
      return;
    }

    var paso = g.pasos[estado.paso];
    card.appendChild(crear('div', 'paso-contador',
      'Paso ' + (estado.paso + 1) + ' de ' + g.pasos.length));
    card.appendChild(crear('div', 'paso-pregunta', paso.pregunta));

    /* pasos que solo explican: no se pregunta nada, solo se sigue */
    if (paso.soloTexto || !paso.resp) {
      var accT = crear('div', 'acciones');
      var seguir = crear('button', 'primario', 'Entendido, siguiente');
      seguir.onclick = function () {
        EJ.motor.avanzarPaso(estado);
        estado.bitacora.push('<span class="bien-marca">&#10003;</span> ' + paso.pregunta);
        pintarGuiado();
      };
      accT.appendChild(seguir);
      var otroT = crear('button', 'fantasma', 'Otro ejercicio');
      otroT.onclick = function () { nuevoEjercicio(); };
      accT.appendChild(otroT);
      card.appendChild(accT);
      card.appendChild(crear('div', 'feedback'));
      zona.appendChild(card);
      actualizarEstadisticas();
      return;
    }

    card.appendChild(pintarCampos(paso.resp));

    var acciones = crear('div', 'acciones');
    var bOk = crear('button', 'primario', 'Comprobar');
    bOk.id = 'btn-comprobar';
    bOk.onclick = comprobarPaso;
    acciones.appendChild(bOk);

    if (paso.pista) {
      var bP = crear('button', '', 'Dame una pista');
      bP.onclick = function () { mostrarPista(paso.pista); bP.disabled = true; };
      acciones.appendChild(bP);
    }

    var bSaltar = crear('button', 'fantasma', 'No se, ensename este paso');
    bSaltar.onclick = function () {
      var res = EJ.motor.saltarPaso(estado);
      estado.bitacora.push('<span class="mal-marca">&#10007;</span> ' + res.respuesta + (res.despues ? ' &mdash; ' + res.despues : ''));
      pintarGuiado();
    };
    acciones.appendChild(bSaltar);

    var bOtro = crear('button', 'fantasma', 'Otro ejercicio');
    bOtro.onclick = function () { nuevoEjercicio(); };
    acciones.appendChild(bOtro);

    card.appendChild(acciones);
    card.appendChild(crear('div', 'feedback'));
    zona.appendChild(card);

    actualizarEstadisticas();
    var primero = card.querySelector('input[type="text"]');
    if (primero) primero.focus();
  }

  function comprobarPaso() {
    if (!estado || estado.terminado) return;
    var paso = estado.ej.guia.pasos[estado.paso];
    var vals = valores(paso.resp);
    if (vals.every(function (v) { return String(v).trim() === ''; })) {
      mostrarAviso('pista', 'Escribe tu respuesta para este paso.');
      return;
    }
    var res = EJ.motor.responderPaso(estado, vals);
    if (res.correcto) {
      estado.bitacora.push('<span class="bien-marca">&#10003;</span> ' + paso.resp.mostrar() +
        (res.despues ? ' &mdash; ' + res.despues : ''));
      pintarGuiado();
      return;
    }
    mostrarAviso('mal', 'Todavia no. Intentalo otra vez.');
    if (res.pista) mostrarPista(res.pista);
    if (res.mostrarRespuesta) {
      mostrarAviso('pista', 'La respuesta de este paso es <b>' + res.respuestaDelPaso + '</b>. Escribela para seguir.');
    }
    var card = $('card-ejercicio');
    card.classList.remove('sacude');
    void card.offsetWidth;
    card.classList.add('sacude');
  }

  function cambiarModo(guiado) {
    cfg.guiado = !!guiado;
    EJ.almacen.set('guiado', cfg.guiado);
    nuevoEjercicio();
  }

  /* ---------------- apartado para aprender ---------------- */
  /* Muestra la regla que se aplica, un ejemplo YA RESUELTO del mismo subtema
     (con otros numeros) y las formulas del tema. No gasta intentos. */
  function alternarAprender(boton) {
    var caja = document.querySelector('#card-ejercicio .caja-aprender');
    if (caja.firstChild) {
      caja.innerHTML = '';
      boton.textContent = 'Como se resuelve';
      boton.classList.remove('abierto');
      return;
    }
    boton.textContent = 'Ocultar la explicacion';
    boton.classList.add('abierto');
    pintarAprender(caja);
  }

  function pintarAprender(caja) {
    caja.innerHTML = '';
    var panel = crear('div', 'aprender');
    panel.appendChild(crear('h3', null, estado.subtemaNombre || estado.tema.nombre));

    var regla = estado.ej.metodo || (estado.ej.pistas || [])[0];
    if (regla) {
      panel.appendChild(crear('div', 'rotulo', 'La regla'));
      panel.appendChild(crear('p', 'regla', regla));
    }

    var bloque = crear('div', 'ejemplo');
    try {
      var ejem = EJ.motor.ejemplo(estado.temaId, estado.dificultad, estado.subtema, estado.ej.enunciado);
      bloque.appendChild(crear('div', 'rotulo', 'Ejemplo resuelto'));
      bloque.appendChild(crear('div', 'enunciado', ejem.ej.enunciado));
      var pasos = crear('ol');
      (ejem.ej.solucion || []).forEach(function (p) { if (p) pasos.appendChild(crear('li', null, p)); });
      bloque.appendChild(pasos);
      bloque.appendChild(crear('div', 'respuesta-final', '<b>Respuesta:</b> ' + ejem.ej.respuesta.mostrar()));
      var otro = crear('button', 'fantasma', 'Otro ejemplo');
      otro.onclick = function () { pintarAprender(caja); };
      bloque.appendChild(otro);
    } catch (e) {
      bloque.appendChild(crear('div', 'ayuda', 'No se pudo armar un ejemplo de este subtema.'));
    }
    panel.appendChild(bloque);

    if (estado.tema.formulario) {
      var det = crear('details', 'formulario');
      det.innerHTML = '<summary>Formulas del tema</summary><div class="cuerpo">' + estado.tema.formulario + '</div>';
      panel.appendChild(det);
    }
    caja.appendChild(panel);
  }

  function mostrarSolucion(acertado) {
    var ej = estado.ej;
    var d = crear('div', 'solucion');
    d.innerHTML = '<h3>' + (acertado ? 'Como se resuelve' : 'Solucion paso a paso') + '</h3>';
    var ol = crear('ol');
    (ej.solucion || []).forEach(function (paso) {
      if (paso) ol.appendChild(crear('li', null, paso));
    });
    d.appendChild(ol);
    d.appendChild(crear('div', 'respuesta-final', '<b>Respuesta:</b> ' + ej.respuesta.mostrar()));
    if (ej.nota) d.appendChild(crear('div', 'ayuda', ej.nota));
    zonaFeedback().appendChild(d);
  }

  function terminar() {
    ['btn-comprobar', 'btn-pista', 'btn-ver'].forEach(function (id) {
      var b = $(id); if (b) b.disabled = true;
    });
    var bn = $('btn-nuevo');
    if (bn) { bn.className = 'primario'; bn.textContent = 'Siguiente ejercicio'; bn.focus(); }
  }

  function actualizarEstadisticas() {
    var p = EJ.almacen.progreso;
    var temaActual = estado ? estado.temaId : cfg.tema;
    var st = temaActual ? EJ.almacen.estadisticas(temaActual, cfg.dificultad) : { vistos: 0, aciertos: 0, alPrimero: 0 };
    $('estadisticas').innerHTML =
      '<div><b>' + st.aciertos + '/' + st.vistos + '</b>en este tema y nivel</div>' +
      '<div><b>' + st.alPrimero + '</b>al primer intento</div>' +
      '<div><b>' + p.racha + '</b>racha actual</div>' +
      '<div><b>' + p.mejorRacha + '</b>mejor racha</div>' +
      '<div><b>' + (p.total ? Math.round(100 * p.aciertos / p.total) : 0) + '%</b>acierto global</div>';
  }

  /* ---------------- configuracion ---------------- */
  function abrirConfig() {
    $('cfg-version').textContent = 'Version ' + VERSION;
    $('cfg-intentos').value = cfg.maxIntentos;
    $('cfg-pistas').checked = cfg.pistas;
    $('cfg-solucion').checked = cfg.mostrarSolucion;
    $('dlg-config').showModal();
  }

  function guardarConfig() {
    var n = parseInt($('cfg-intentos').value, 10);
    EJ.almacen.set('maxIntentos', isNaN(n) ? 3 : Math.min(10, Math.max(1, n)));
    EJ.almacen.set('pistas', $('cfg-pistas').checked);
    EJ.almacen.set('mostrarSolucion', $('cfg-solucion').checked);
    $('dlg-config').close();
    if (estado && !estado.terminado) {
      document.querySelector('#card-ejercicio .intentos').innerHTML = dibujarIntentos();
    }
  }

  /* ---------------- arranque ---------------- */
  function iniciar() {
    pintarMaterias();
    pintarTemas();
    actualizarEstadisticas();

    $('materia').onchange = function () {
      cfg.materia = this.value; EJ.almacen.set('materia', this.value);
      cfg.tema = null; pintarTemas(); pintarVacio();
    };
    $('buscar').oninput = pintarTemas;
    $('aleatorio').onclick = activarMezcla;
    $('btn-temas').onclick = alternarLista;
    $('btn-config').onclick = abrirConfig;
    $('cfg-guardar').onclick = guardarConfig;
    $('cfg-cerrar').onclick = function () { $('dlg-config').close(); };
    $('cfg-reiniciar').onclick = function () {
      if (confirm('Esto borra todo tu progreso guardado. Continuar?')) {
        EJ.almacen.reiniciar(); actualizarEstadisticas(); pintarTemas();
      }
    };

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.ctrlKey) { e.preventDefault(); nuevoEjercicio(); }
    });

    if (cfg.mezcla) activarMezcla();
    else if (cfg.tema && EJ.tienTema(cfg.tema)) elegirTema(cfg.tema);
    else pintarVacio();
  }

  document.addEventListener('DOMContentLoaded', iniciar);
})();
