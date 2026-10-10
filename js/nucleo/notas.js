/* Recuadro de procedimiento: un espacio debajo de la pregunta para hacer
   cuentas o anotaciones, escribiendo con el teclado o dibujando con el dedo.

   EJ.notas.caja({texto, dibujo, alEscribir(texto), alDibujar(dataURL)})
   devuelve el elemento listo para meter en la tarjeta. No califica nada:
   solo es la hoja de borrador de esa pregunta. */
(function (global) {
  'use strict';
  var EJ = global.EJ = global.EJ || {};

  var CLAVE_MODO = 'ejgen.notas.modo';
  function leerModo() { try { return localStorage.getItem(CLAVE_MODO) || 'escribir'; } catch (e) { return 'escribir'; } }
  function guardarModo(m) { try { localStorage.setItem(CLAVE_MODO, m); } catch (e) { /* modo privado */ } }

  function el(tag, clase, html) {
    var e = document.createElement(tag);
    if (clase) e.className = clase;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function caja(op) {
    op = op || {};
    var modo = leerModo();
    var raiz = el('div', 'notas');

    var cab = el('div', 'notas-cab');
    cab.appendChild(el('span', 'notas-titulo', 'Procedimiento'));
    var pestanas = el('div', 'notas-pestanas');
    var bEsc = el('button', null, 'Escribir');
    var bDib = el('button', null, 'Dibujar');
    bEsc.type = bDib.type = 'button';
    pestanas.appendChild(bEsc);
    pestanas.appendChild(bDib);
    cab.appendChild(pestanas);
    raiz.appendChild(cab);

    /* escribir */
    var area = el('textarea', 'notas-texto');
    area.rows = 3;
    area.placeholder = 'Haz aqui tus cuentas o anotaciones...';
    /* En el celular el teclado trabaja como en cualquier otra app: con
       sugerencias y, en iOS 18, "Resultados matematicos" (al escribir 28x30=
       ofrece 840). Con autocorrect apagado, iOS escondia esas sugerencias. En
       la computadora no se subrayan las cuentas como faltas de ortografia. */
    var tactil = !!(global.matchMedia && global.matchMedia('(pointer: coarse)').matches);
    area.setAttribute('autocapitalize', 'off');
    area.setAttribute('autocorrect', 'on');
    area.setAttribute('writingsuggestions', 'true');
    area.spellcheck = tactil;
    area.value = op.texto || '';
    function crecer() {
      area.style.height = 'auto';
      area.style.height = Math.min(Math.max(area.scrollHeight, 76), 420) + 'px';
    }
    area.addEventListener('input', function () {
      crecer();
      if (op.alEscribir) op.alEscribir(area.value);
    });
    raiz.appendChild(area);

    /* dibujar */
    var hoja = el('div', 'notas-hoja');
    var lienzo = el('canvas', 'notas-lienzo');
    hoja.appendChild(lienzo);
    var barra = el('div', 'notas-barra');
    var bDeshacer = el('button', null, 'Deshacer');
    var bBorrar = el('button', null, 'Borrar todo');
    bDeshacer.type = bBorrar.type = 'button';
    barra.appendChild(bDeshacer);
    barra.appendChild(bBorrar);
    hoja.appendChild(barra);
    raiz.appendChild(hoja);

    var ctx = lienzo.getContext('2d');
    var trazos = [];      // [[{x,y}...]] en pixeles CSS
    var fondo = null;     // imagen guardada de antes (si la hay)
    var listo = false;

    function colorTinta() {
      return getComputedStyle(raiz).getPropertyValue('--texto').trim() || '#141922';
    }
    function ajustar() {
      var ancho = hoja.clientWidth;
      if (!ancho) return false;
      var alto = Math.round(Math.max(220, Math.min(ancho * 0.75, 420)));
      var dpr = global.devicePixelRatio || 1;
      lienzo.style.height = alto + 'px';
      lienzo.width = Math.round(ancho * dpr);
      lienzo.height = Math.round(alto * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    }
    function trazar(t) {
      if (!t.length) return;
      ctx.beginPath();
      ctx.moveTo(t[0].x, t[0].y);
      if (t.length === 1) ctx.lineTo(t[0].x + 0.1, t[0].y + 0.1);
      for (var i = 1; i < t.length; i++) ctx.lineTo(t[i].x, t[i].y);
      ctx.stroke();
    }
    function redibujar() {
      var w = lienzo.width, h = lienzo.height;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.restore();
      if (fondo && fondo.complete) ctx.drawImage(fondo, 0, 0, lienzo.clientWidth, lienzo.clientHeight);
      ctx.strokeStyle = colorTinta();
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      trazos.forEach(trazar);
      bDeshacer.disabled = !trazos.length;
      bBorrar.disabled = !trazos.length && !fondo;
    }
    function preparar() {
      if (listo) return;
      if (!ajustar()) return;
      listo = true;
      if (op.dibujo) {
        fondo = new Image();
        fondo.onload = redibujar;
        fondo.src = op.dibujo;
      }
      redibujar();
    }
    function avisar() {
      if (!op.alDibujar) return;
      op.alDibujar(trazos.length || fondo ? lienzo.toDataURL('image/png') : null);
    }

    var actual = null;
    function punto(ev) {
      var r = lienzo.getBoundingClientRect();
      return { x: ev.clientX - r.left, y: ev.clientY - r.top };
    }
    lienzo.addEventListener('pointerdown', function (ev) {
      preparar();
      lienzo.setPointerCapture(ev.pointerId);
      actual = [punto(ev)];
      trazos.push(actual);
      redibujar();
      ev.preventDefault();
    });
    lienzo.addEventListener('pointermove', function (ev) {
      if (!actual) return;
      var p = punto(ev), u = actual[actual.length - 1];
      actual.push(p);
      ctx.beginPath();
      ctx.moveTo(u.x, u.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ev.preventDefault();
    });
    function soltar() {
      if (!actual) return;
      actual = null;
      bDeshacer.disabled = false;
      bBorrar.disabled = false;
      avisar();
    }
    lienzo.addEventListener('pointerup', soltar);
    lienzo.addEventListener('pointercancel', soltar);

    bDeshacer.onclick = function () { trazos.pop(); redibujar(); avisar(); };
    bBorrar.onclick = function () { trazos = []; fondo = null; redibujar(); avisar(); };

    function poner(m) {
      modo = m;
      guardarModo(m);
      bEsc.classList.toggle('activa', m === 'escribir');
      bDib.classList.toggle('activa', m === 'dibujar');
      area.hidden = m !== 'escribir';
      hoja.hidden = m !== 'dibujar';
      if (m === 'dibujar') preparar(); else crecer();
    }
    bEsc.onclick = function () { poner('escribir'); };
    bDib.onclick = function () { poner('dibujar'); };

    /* el tamaño real solo se sabe cuando ya esta en la pagina */
    setTimeout(function () { poner(modo); }, 0);
    return raiz;
  }

  EJ.notas = { caja: caja };
})(window);
