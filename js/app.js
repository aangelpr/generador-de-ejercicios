/* Interfaz del generador de ejercicios. */
(function () {
  'use strict';
  /* Sube esto junto con la version de sw.js. Se ve en Ajustes y sirve para
     saber de un vistazo si el celular ya tiene la version nueva. */
  var VERSION = 'v38 (26 sep 2026)';

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
  /* Las tarjetas entran con una animacion corta solo cuando cambia el
     ejercicio o la vista. En cada paso del guiado no: seria lento y molesto. */
  var relojEntrada = null;
  function animarEntrada() {
    var z = $('zona');
    z.classList.remove('entra');
    void z.offsetWidth;
    z.classList.add('entra');
    clearTimeout(relojEntrada);
    relojEntrada = setTimeout(function () { z.classList.remove('entra'); }, 600);
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

    /* practica mixta y examen */
    if (!filtro) {
      var bm = crear('button', 'tema-btn mixta' + (cfg.mezcla ? ' activo' : ''));
      bm.innerHTML = 'Practica mixta<small>Ejercicios de varios temas al azar</small>';
      bm.onclick = activarMezcla;
      cont.appendChild(bm);

      var nSel = EJ.examen.seleccion().temas.length;
      var bx = crear('button', 'tema-btn examen' + (enExamen() ? ' activo' : ''));
      bx.innerHTML = 'Armar un examen<small>' +
        (nSel ? nSel + (nSel === 1 ? ' tema elegido' : ' temas elegidos') : 'Junta varios temas y calificate') +
        '</small>';
      bx.onclick = abrirArmador;
      cont.appendChild(bx);
    }

    /* mientras armas el examen, tocar un tema lo agrega en vez de abrirlo.
       Y mientras lo estas contestando, la lista se bloquea: un toque
       distraido no puede tirar el examen a medias. */
    var armando = vistaExamen === 'armar';
    var bloqueada = vistaExamen === 'haciendo';
    var elegidos = armando
      ? EJ.examen.seleccion().temas.map(function (t) { return t.temaId; })
      : [];

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
        var dentro = elegidos.indexOf(t.id) !== -1;
        var b = crear('button', 'tema-btn' +
          (!armando && t.id === cfg.tema ? ' activo' : '') +
          (armando ? ' elegible' : '') + (dentro ? ' en-examen' : ''));
        if (armando) {
          b.innerHTML = '<span class="tic">' + (dentro ? '&check;' : '+') + '</span>' + t.nombre;
          b.title = dentro ? 'Quitar del examen' : 'Agregar al examen';
          b.onclick = function () { alternarTemaExamen(t.id); };
        } else if (bloqueada) {
          b.innerHTML = t.nombre;
          b.disabled = true;
          b.title = 'Estas contestando un examen';
        } else {
          var marca = dificultadesConGuia(t.id).length ? '<span class="marca-guia" title="Tiene entrenamiento paso a paso">paso a paso</span>' : '';
          b.innerHTML = t.nombre + marca + (st.vistos ? '<small>' + st.aciertos + '/' + st.vistos + ' correctos</small>' : '');
          b.onclick = function () { elegirTema(t.id); };
        }
        cont.appendChild(b);
      });
    });
    if (!hubo) cont.appendChild(crear('div', 'vacio', 'Sin resultados.'));
  }

  /* ---------------- practica mixta ---------------- */
  function activarMezcla() {
    vistaExamen = null; examen = null; nota = null;
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
    vistaExamen = null; examen = null; nota = null;
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
    animarEntrada();
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
        estado.queda = '';
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
    animarEntrada();
    $('zona').innerHTML =
      '<div class="tarjeta vacio vacio-inicio">' +
        '<div class="vacio-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M4 19V5a1 1 0 0 1 1-1h10l5 5v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"/><path d="M14 4v5h5M8 13h8M8 17h5"/></svg></div>' +
        '<h2>Elige un tema para empezar</h2>' +
        '<p>' + (esCelular() ? 'Abre la lista con el boton de menu de arriba' : 'Escoge uno de la lista de la izquierda') +
        ' o prueba la practica mixta para repasar varios temas a la vez.</p>' +
      '</div>';
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
    var seg = crear('div', 'segmento');
    fila.appendChild(seg);
    var conGuia = (!cfg.mezcla && cfg.tema) ? dificultadesConGuia(cfg.tema) : [];
    var aqui = conGuia.indexOf(cfg.dificultad) !== -1;

    var bNormal = crear('button', cfg.guiado ? '' : 'activo', 'Resolver yo');
    bNormal.onclick = function () { cambiarModo(false); };
    seg.appendChild(bNormal);

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
    seg.appendChild(bGuiado);

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
    /* dificultad y modo de estudio van en la misma fila */
    var controles = crear('div', 'controles');
    controles.appendChild(difs);
    controles.appendChild(selectorModo());
    cab.appendChild(controles);

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
          if (vistaExamen === 'haciendo') {
            if (examen.actual < examen.preguntas.length - 1) irAPregunta(examen.actual + 1);
            else guardarRespuestaActual();
          }
          else if (estado.guiado) comprobarPaso();
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

  /* La bitacora guarda lo que ya resolviste. Guardar solo el resultado no sirve
     de nada ("12", "-5", "3"): al mirar hacia arriba no se sabe de que era cada
     numero. Si el paso trae `rotulo`, se antepone y la lista se lee como una
     solucion escrita a mano: "Doble producto: -12x". */
  function rotulado(paso, valor) {
    return (paso && paso.rotulo ? '<b>' + paso.rotulo + ':</b> ' : '') + valor;
  }

  /* Los dos desplegables de cada paso. Si alguien los abre, se quedan abiertos
     en los pasos siguientes: es muy molesto tener que darle otra vez en cada
     pregunta. La preferencia se guarda entre sesiones. */
  var abierto = { queHacemos: false, paraQue: false };
  try {
    var guardadoPref = localStorage.getItem('ej-explica');
    if (guardadoPref) abierto = JSON.parse(guardadoPref);
  } catch (e) { /* sin localStorage se queda con los valores por defecto */ }

  function guardarPref() {
    try { localStorage.setItem('ej-explica', JSON.stringify(abierto)); } catch (e) { /* da igual */ }
  }

  /* Boton que muestra u oculta un bloque de explicacion. */
  function desplegable(clave, etiqueta, contenido, destino) {
    var caja = crear('div', 'explica');
    var bt = crear('button', 'explica-bt', etiqueta);
    var cuerpo = crear('div', 'explica-cuerpo', contenido);
    function pintar() {
      cuerpo.style.display = abierto[clave] ? 'block' : 'none';
      bt.classList.toggle('activo', abierto[clave]);
      bt.setAttribute('aria-expanded', abierto[clave] ? 'true' : 'false');
    }
    bt.onclick = function () { abierto[clave] = !abierto[clave]; guardarPref(); pintar(); };
    pintar();
    caja.appendChild(bt);
    caja.appendChild(cuerpo);
    destino.appendChild(caja);
  }

  /* Lo que se lleva armado hasta ahora. Es lo que hace que el ejercicio se
     sienta como que avanza: despues de cada respuesta correcta se ve el
     resultado parcial creciendo, no una lista de cuentas sueltas. */
  function cajaQueda(texto) {
    var caja = crear('div', 'queda');
    caja.appendChild(crear('div', 'rotulo', 'Llevamos'));
    caja.appendChild(crear('div', 'queda-valor', texto));
    return caja;
  }

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

    /* el resultado que llevamos armado */
    if (estado.queda) card.appendChild(cajaQueda(estado.queda));

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
    if (paso.seccion) card.appendChild(crear('div', 'paso-seccion', paso.seccion));
    card.appendChild(crear('div', 'paso-pregunta', paso.pregunta));

    if (paso.queHacemos || paso.paraQue) {
      var expl = crear('div', 'explica-fila');
      if (paso.queHacemos) desplegable('queHacemos', '&iquest;Que hacemos?', paso.queHacemos, expl);
      if (paso.paraQue) desplegable('paraQue', '&iquest;Para que?', paso.paraQue, expl);
      card.appendChild(expl);
    }

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
      estado.bitacora.push('<span class="mal-marca">&#10007;</span> ' + rotulado(paso, res.respuesta) +
        (res.despues ? ' &mdash; ' + res.despues : ''));
      if (paso.queda) estado.queda = paso.queda;
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
      estado.bitacora.push('<span class="bien-marca">&#10003;</span> ' + rotulado(paso, paso.resp.mostrar()) +
        (res.despues ? ' &mdash; ' + res.despues : ''));
      if (paso.queda) estado.queda = paso.queda;
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

  /* ================= EXAMEN =================
     Se arma juntando temas de la lista. A diferencia de la practica, aqui no
     se dice si acertaste hasta que entregas: primero contestas todo y luego
     se califica de una vez. */

  var examen = null;       // el examen que se esta haciendo o revisando
  var vistaExamen = null;  // 'armar' | 'haciendo' | 'resultado'
  var nota = null;

  function enExamen() { return vistaExamen !== null; }

  function salirDelExamen() {
    vistaExamen = null; examen = null; nota = null;
    pintarTemas();
    if (cfg.tema && EJ.tienTema(cfg.tema)) nuevoEjercicio();
    else pintarVacio();
  }

  function abrirArmador() {
    vistaExamen = 'armar';
    animarEntrada();
    cfg.mezcla = false;
    EJ.almacen.set('mezcla', false);
    pintarTemas();
    pintarArmador();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* Al tocar un tema de la lista mientras armas: lo agrega o lo quita. */
  function alternarTemaExamen(temaId) {
    var sel = EJ.examen.seleccion();
    var i = -1;
    sel.temas.forEach(function (t, k) { if (t.temaId === temaId) i = k; });
    if (i === -1) sel.temas.push({ temaId: temaId, cantidad: null });
    else sel.temas.splice(i, 1);
    EJ.examen.guardarSeleccion(sel);
    pintarTemas();
    pintarArmador();
  }

  function pintarArmador() {
    var sel = EJ.examen.seleccion();
    var plan = EJ.examen.reparto(sel);
    var zona = $('zona');
    zona.innerHTML = '';

    var card = crear('div', 'tarjeta examen-armador');
    card.appendChild(crear('h2', null, 'Armar un examen'));
    card.appendChild(crear('p', 'ayuda',
      'Elige los temas de la lista y se van juntando aqui. ' +
      'La seleccion se guarda, asi que puedes ir agregando temas conforme avances.'));

    /* examen a medias de otra vez */
    var curso = EJ.examen.leerCurso();
    if (curso && !curso.terminado) {
      var aviso = crear('div', 'aviso-examen');
      var hechas = curso.preguntas.filter(EJ.examen.contestada).length;
      aviso.appendChild(crear('div', null,
        '<b>Tienes un examen a medias:</b> ' + hechas + ' de ' + curso.preguntas.length + ' contestadas.'));
      var fila = crear('div', 'acciones');
      var seguir = crear('button', 'primario', 'Continuar ese examen');
      seguir.onclick = function () {
        examen = curso; vistaExamen = 'haciendo';
        pintarTemas(); cerrarListaEnCelular(); pintarExamen();
      };
      var tirar = crear('button', 'fantasma', 'Descartarlo');
      tirar.onclick = function () {
        if (!confirm('Se pierden las respuestas de ese examen. Continuar?')) return;
        EJ.examen.borrarCurso(); pintarArmador();
      };
      fila.appendChild(seguir); fila.appendChild(tirar);
      aviso.appendChild(fila);
      card.appendChild(aviso);
    }

    /* temas elegidos */
    card.appendChild(crear('div', 'rotulo', 'Temas del examen'));
    if (!sel.temas.length) {
      card.appendChild(crear('div', 'vacio',
        'Todavia no hay ninguno. Toca un tema de la lista para agregarlo.'));
    } else {
      var chips = crear('div', 'examen-chips');
      sel.temas.forEach(function (t) {
        var tema = EJ.buscarTema(t.temaId);
        var cuantos = 0;
        plan.forEach(function (p) { if (p.temaId === t.temaId) cuantos = p.cantidad; });

        var chip = crear('div', 'chip-tema');
        chip.appendChild(crear('span', 'chip-nombre', tema.nombre));

        var menos = crear('button', 'chip-mas', '&minus;');
        menos.title = 'Menos ejercicios de este tema';
        menos.onclick = function () { cambiarCantidad(t.temaId, Math.max(1, cuantos - 1)); };

        var num = crear('span', 'chip-num', String(cuantos));
        num.title = t.cantidad > 0 ? 'Cantidad fijada por ti' : 'Repartido automaticamente';
        if (t.cantidad > 0) num.classList.add('fijo');

        var mas = crear('button', 'chip-mas', '+');
        mas.title = 'Mas ejercicios de este tema';
        mas.onclick = function () { cambiarCantidad(t.temaId, cuantos + 1); };

        var quitar = crear('button', 'chip-x', '&times;');
        quitar.title = 'Quitar este tema';
        quitar.onclick = function () { alternarTemaExamen(t.temaId); };

        chip.appendChild(menos); chip.appendChild(num); chip.appendChild(mas);
        chip.appendChild(quitar);
        chips.appendChild(chip);
      });
      card.appendChild(chips);

      var hayFijos = sel.temas.some(function (t) { return t.cantidad > 0; });
      if (hayFijos) {
        var reset = crear('button', 'fantasma chico', 'Volver a repartir parejo');
        reset.onclick = function () {
          var s = EJ.examen.seleccion();
          s.temas.forEach(function (t) { t.cantidad = null; });
          EJ.examen.guardarSeleccion(s); pintarArmador();
        };
        card.appendChild(reset);
      }
    }

    /* total */
    if (sel.temas.length) {
      var filaTotal = crear('div', 'examen-total');
      filaTotal.appendChild(crear('label', null, 'Total de ejercicios'));
      var menosT = crear('button', 'chip-mas', '&minus;');
      menosT.onclick = function () { cambiarTotal(sel.total - 1); };
      var numT = crear('span', 'total-num', String(EJ.examen.totalReal(sel)));
      var masT = crear('button', 'chip-mas', '+');
      masT.onclick = function () { cambiarTotal(sel.total + 1); };
      filaTotal.appendChild(menosT); filaTotal.appendChild(numT); filaTotal.appendChild(masT);
      card.appendChild(filaTotal);
      card.appendChild(crear('div', 'ayuda',
        'Se reparte entre los ' + sel.temas.length + ' ' +
        (sel.temas.length === 1 ? 'tema' : 'temas') +
        '. La dificultad va de menos a mas: empieza con ejercicios faciles y va subiendo.'));

      var acc = crear('div', 'acciones');
      var empezar = crear('button', 'primario grande', 'Empezar el examen');
      empezar.onclick = empezarExamen;
      acc.appendChild(empezar);
      var vaciar = crear('button', 'fantasma', 'Quitar todos');
      vaciar.onclick = function () {
        if (!confirm('Quitar todos los temas del examen?')) return;
        EJ.examen.guardarSeleccion({ temas: [], total: sel.total });
        pintarTemas(); pintarArmador();
      };
      acc.appendChild(vaciar);
      card.appendChild(acc);
    }

    zona.appendChild(card);
    zona.appendChild(tarjetaHistorial());
  }

  function cambiarCantidad(temaId, n) {
    var sel = EJ.examen.seleccion();
    sel.temas.forEach(function (t) { if (t.temaId === temaId) t.cantidad = Math.max(1, n); });
    EJ.examen.guardarSeleccion(sel);
    pintarArmador();
  }

  function cambiarTotal(n) {
    var sel = EJ.examen.seleccion();
    sel.total = Math.min(EJ.examen.MAX_PREGUNTAS, Math.max(sel.temas.length || 1, n));
    EJ.examen.guardarSeleccion(sel);
    pintarArmador();
  }

  function tarjetaHistorial() {
    var h = EJ.examen.historial();
    var card = crear('div', 'tarjeta');
    card.appendChild(crear('div', 'rotulo', 'Examenes anteriores'));
    if (!h.length) {
      card.appendChild(crear('div', 'vacio', 'Todavia no has terminado ninguno.'));
      return card;
    }
    var ul = crear('ul', 'historial-examenes');
    h.forEach(function (x) {
      var f = new Date(x.fecha);
      var li = crear('li', null,
        '<b>' + x.aciertos + '/' + x.total + '</b> <span class="pct">' + x.porcentaje + '%</span>' +
        '<small>' + f.toLocaleDateString() + ' &middot; ' + x.temas.join(', ') + '</small>');
      ul.appendChild(li);
    });
    card.appendChild(ul);
    var b = crear('button', 'fantasma chico', 'Borrar historial');
    b.onclick = function () {
      if (!confirm('Borrar el historial de examenes?')) return;
      EJ.examen.borrarHistorial(); pintarArmador();
    };
    card.appendChild(b);
    return card;
  }

  function empezarExamen() {
    var sel = EJ.examen.seleccion();
    try {
      examen = EJ.examen.armar(sel);
    } catch (e) {
      alert('No se pudo armar el examen: ' + e.message);
      return;
    }
    EJ.examen.guardarCurso(examen);
    vistaExamen = 'haciendo';
    animarEntrada();
    pintarTemas();
    cerrarListaEnCelular();
    pintarExamen();
  }

  /* ---------------- hacer el examen ---------------- */

  function guardarRespuestaActual() {
    if (vistaExamen !== 'haciendo' || !examen || !estado) return;
    var q = examen.preguntas[examen.actual];
    q.dada = valores(estado.ej.respuesta);
    EJ.examen.guardarCurso(examen);
  }

  function irAPregunta(i) {
    guardarRespuestaActual();
    animarEntrada();
    examen.actual = Math.min(examen.preguntas.length - 1, Math.max(0, i));
    EJ.examen.guardarCurso(examen);
    pintarExamen();
  }

  /* Vuelve a poner lo que ya habias contestado al navegar hacia atras. */
  function rellenarCampos(respuesta, dada) {
    if (!dada) return;
    respuesta.campos.forEach(function (c, i) {
      if (c.tipo === 'opcion') {
        var m = document.querySelector('input[name="op-' + i + '"][value="' + dada[i] + '"]');
        if (!m) return;
        m.checked = true;
        var lab = m.parentNode;
        if (lab && lab.classList) lab.classList.add('elegida');
      } else {
        var inp = $('entrada-' + i);
        if (!inp) return;
        inp.value = dada[i] || '';
        if (inp.value) inp.dispatchEvent(new Event('input'));
      }
    });
  }

  function pintarExamen() {
    var q = examen.preguntas[examen.actual];
    var zona = $('zona');
    zona.innerHTML = '';

    try {
      estado = EJ.examen.ejercicioDe(q);
    } catch (e) {
      zona.appendChild(crear('div', 'tarjeta',
        '<b>Esta pregunta no se pudo reconstruir.</b><br><small>' + e.message + '</small>'));
      return;
    }

    var total = examen.preguntas.length;
    var contestadas = examen.preguntas.filter(EJ.examen.contestada).length;

    /* cabecera con el avance */
    var top = crear('div', 'tarjeta examen-top');
    var linea = crear('div', 'examen-linea');
    linea.appendChild(crear('div', 'examen-cuenta',
      'Pregunta <b>' + (examen.actual + 1) + '</b> de ' + total));
    linea.appendChild(crear('div', 'examen-hechas', contestadas + ' contestadas'));
    top.appendChild(linea);
    var barra = crear('div', 'barra-progreso');
    barra.appendChild(crear('div', 'relleno')).style.width =
      Math.round(100 * contestadas / total) + '%';
    top.appendChild(barra);
    zona.appendChild(top);

    /* la pregunta */
    var card = crear('div', 'tarjeta');
    card.id = 'card-ejercicio';
    card.appendChild(crear('div', 'insignia',
      q.temaNombre + (q.subtemaNombre ? ' &middot; ' + q.subtemaNombre : '') +
      ' <span class="nivel-tag">' + (NOMBRES_DIF[q.dificultad] || q.dificultad) + '</span>'));
    card.appendChild(crear('div', 'enunciado', estado.ej.enunciado));
    card.appendChild(pintarCampos(estado.ej.respuesta));

    var ayuda = estado.ej.respuesta.campos[0].ayuda || estado.ej.respuesta.ayuda;
    if (ayuda) card.appendChild(crear('div', 'ayuda', ayuda));

    var acc = crear('div', 'acciones');
    var ant = crear('button', null, 'Anterior');
    ant.disabled = examen.actual === 0;
    ant.onclick = function () { irAPregunta(examen.actual - 1); };
    acc.appendChild(ant);

    var sig = crear('button', 'primario', examen.actual === total - 1 ? 'Guardar' : 'Siguiente');
    sig.id = 'btn-sig-examen';
    sig.onclick = function () {
      if (examen.actual === total - 1) { guardarRespuestaActual(); pintarExamen(); }
      else irAPregunta(examen.actual + 1);
    };
    acc.appendChild(sig);

    var marcar = crear('button', q.marcada ? 'fantasma marcada' : 'fantasma',
      q.marcada ? 'Desmarcar' : 'Marcar para revisar');
    marcar.onclick = function () {
      guardarRespuestaActual();
      q.marcada = !q.marcada;
      EJ.examen.guardarCurso(examen);
      pintarExamen();
    };
    acc.appendChild(marcar);

    var saltar = crear('button', 'fantasma', 'Dejar en blanco');
    saltar.onclick = function () {
      examen.preguntas[examen.actual].dada = null;
      EJ.examen.guardarCurso(examen);
      if (examen.actual < total - 1) irAPregunta(examen.actual + 1);
      else pintarExamen();
    };
    acc.appendChild(saltar);
    card.appendChild(acc);
    zona.appendChild(card);

    rellenarCampos(estado.ej.respuesta, q.dada);

    /* navegador de preguntas */
    var navCard = crear('div', 'tarjeta');
    navCard.appendChild(crear('div', 'rotulo', 'Todas las preguntas'));
    var nav = crear('div', 'nav-preguntas');
    examen.preguntas.forEach(function (p, i) {
      var b = crear('button', 'nav-q' +
        (i === examen.actual ? ' aqui' : '') +
        (EJ.examen.contestada(p) ? ' hecha' : '') +
        (p.marcada ? ' marcada' : ''), String(i + 1));
      b.title = p.temaNombre;
      b.onclick = function () { irAPregunta(i); };
      nav.appendChild(b);
    });
    navCard.appendChild(nav);

    var accF = crear('div', 'acciones');
    var fin = crear('button', 'primario grande', 'Entregar y calificar');
    fin.onclick = terminarExamen;
    accF.appendChild(fin);
    var salir = crear('button', 'fantasma', 'Dejarlo para despues');
    salir.onclick = function () {
      guardarRespuestaActual();
      vistaExamen = 'armar'; pintarTemas(); pintarArmador();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    accF.appendChild(salir);
    navCard.appendChild(accF);
    zona.appendChild(navCard);

    var primero = card.querySelector('input[type="text"]');
    if (primero) primero.focus();
  }

  function terminarExamen() {
    guardarRespuestaActual();
    var blancos = examen.preguntas.filter(function (q) { return !EJ.examen.contestada(q); }).length;
    if (blancos && !confirm('Quedan ' + blancos + ' ' + (blancos === 1 ? 'pregunta' : 'preguntas') +
      ' sin contestar y se van a contar como error. Entregar de todos modos?')) return;

    nota = EJ.examen.calificar(examen);
    examen.terminado = true;
    EJ.examen.registrar(examen, nota);
    EJ.examen.borrarCurso();
    vistaExamen = 'resultado';
    animarEntrada();
    pintarTemas();
    pintarResultado();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------------- resultado ---------------- */

  function pintarResultado() {
    var zona = $('zona');
    zona.innerHTML = '';

    var card = crear('div', 'tarjeta resultado-examen');
    card.appendChild(crear('h2', null, 'Resultado del examen'));

    var caja = crear('div', 'nota-caja' +
      (nota.porcentaje >= 70 ? ' bien' : nota.porcentaje >= 50 ? ' regular' : ' mal'));
    caja.appendChild(crear('div', 'nota-grande', nota.aciertos + ' / ' + nota.total));
    caja.appendChild(crear('div', 'nota-pct', nota.porcentaje + '%'));
    card.appendChild(caja);

    if (nota.enBlanco) {
      card.appendChild(crear('div', 'ayuda',
        nota.enBlanco + ' ' + (nota.enBlanco === 1 ? 'pregunta se quedo' : 'preguntas se quedaron') +
        ' sin contestar.'));
    }

    card.appendChild(crear('div', 'rotulo', 'Por tema'));
    var lista = crear('div', 'por-tema');
    nota.porTema.slice().sort(function (a, b) {
      return (a.aciertos / a.total) - (b.aciertos / b.total);
    }).forEach(function (t) {
      var pct = Math.round(100 * t.aciertos / t.total);
      var fila = crear('div', 'tema-fila');
      fila.appendChild(crear('div', 'tema-nom', t.nombre));
      var barra = crear('div', 'tema-barra');
      var rell = crear('div', 'tema-rell' + (pct >= 70 ? ' bien' : pct >= 50 ? ' regular' : ' mal'));
      rell.style.width = pct + '%';
      barra.appendChild(rell);
      fila.appendChild(barra);
      fila.appendChild(crear('div', 'tema-num', t.aciertos + '/' + t.total));
      lista.appendChild(fila);
    });
    card.appendChild(lista);

    var flojos = nota.porTema.filter(function (t) { return t.aciertos / t.total < 0.7; });
    if (flojos.length) {
      card.appendChild(crear('div', 'sugerencia',
        '<b>Donde conviene practicar:</b> ' +
        flojos.map(function (t) { return t.nombre; }).join(', ') + '.'));
    }

    var acc = crear('div', 'acciones');
    var otra = crear('button', 'primario', 'Otro examen con los mismos temas');
    otra.onclick = empezarExamen;
    acc.appendChild(otra);
    var armar = crear('button', null, 'Cambiar los temas');
    armar.onclick = function () { vistaExamen = 'armar'; pintarTemas(); pintarArmador(); };
    acc.appendChild(armar);
    var fuera = crear('button', 'fantasma', 'Volver a practicar');
    fuera.onclick = salirDelExamen;
    acc.appendChild(fuera);
    card.appendChild(acc);
    zona.appendChild(card);

    /* revision pregunta por pregunta */
    var rev = crear('div', 'tarjeta');
    rev.appendChild(crear('div', 'rotulo', 'Revisa cada pregunta'));
    nota.detalle.forEach(function (d, i) {
      var det = crear('details', 'revision' + (d.ok ? ' ok' : ' fallo'));
      var tuya = d.enBlanco ? '<i>en blanco</i>'
        : d.q.dada.filter(function (v) { return String(v).trim() !== ''; }).join(', ');
      det.innerHTML =
        '<summary><span class="marca">' + (d.ok ? '&check;' : '&times;') + '</span>' +
        '<span class="num">' + (i + 1) + '.</span> ' + d.q.temaNombre +
        '<small>' + (d.ok ? 'Correcta' : 'Tu respuesta: ' + tuya) + '</small></summary>';
      var cuerpo = crear('div', 'cuerpo');
      if (d.estado) {
        cuerpo.appendChild(crear('div', 'enunciado', d.estado.ej.enunciado));
        var ol = crear('ol');
        (d.estado.ej.solucion || []).forEach(function (p) {
          if (p) ol.appendChild(crear('li', null, p));
        });
        cuerpo.appendChild(ol);
      }
      cuerpo.appendChild(crear('div', 'respuesta-final', '<b>Respuesta:</b> ' + d.correcta));
      det.appendChild(cuerpo);
      rev.appendChild(det);
    });
    zona.appendChild(rev);
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
      if (e.key === 'Enter' && e.ctrlKey && !enExamen()) { e.preventDefault(); nuevoEjercicio(); }
    });

    if (EJ.examen.leerCurso()) abrirArmador();
    else if (cfg.mezcla) activarMezcla();
    else if (cfg.tema && EJ.tienTema(cfg.tema)) elegirTema(cfg.tema);
    else pintarVacio();
  }

  document.addEventListener('DOMContentLoaded', iniciar);
})();
