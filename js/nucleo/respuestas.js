/* Tipos de respuesta.
   Cada tipo sabe (1) que campos pintar en pantalla, (2) como decidir si lo que
   escribio el usuario es correcto y (3) como mostrar la respuesta correcta.
   Un tema solo usa EJ.resp.<tipo>(...) y se olvida del resto. */
(function (global) {
  'use strict';
  var EJ = global.EJ = global.EJ || {};
  var fmt = EJ.fmt;

  function normaliza(s) {
    return String(s === undefined || s === null ? '' : s)
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')   // quita acentos
      .replace(/[.;:!?]+$/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function partes(s) {
    return String(s || '').split(/[,;]| y /).map(function (x) { return x.trim(); })
      .filter(function (x) { return x !== ''; });
  }

  function base(obj) {
    obj.campos = obj.campos || [{ etiqueta: 'Respuesta', ayuda: obj.ayuda || '' }];
    return obj;
  }

  var resp = {};

  /* Numero. Acepta fracciones y expresiones: 3/4, 0.75, sqrt(2), 2^5, pi/3. */
  resp.numero = function (valor, op) {
    op = op || {};
    var tol = op.tol !== undefined ? op.tol : 1e-6;
    if (Math.abs(valor) < 1e-12) valor = 0;    // limpia la basura de punto flotante
    return base({
      tipo: 'numero',
      valor: valor,
      ayuda: op.ayuda || 'Puedes escribir fracciones (3/4), raices (sqrt(2)) o decimales.',
      campos: [{ etiqueta: op.etiqueta || 'Respuesta', unidad: op.unidad || '', ayuda: op.ayuda }],
      verificar: function (vals) {
        var v = EJ.expr.valor(vals[0]);
        if (!isFinite(v)) return false;
        /* `tol` es tolerancia ABSOLUTA (mas un margen minimo por el redondeo
           de la computadora); si fuera relativa, en respuestas grandes se
           aceptarian errores enormes. */
        return Math.abs(v - valor) <= Math.max(tol, Math.abs(valor) * 1e-9);
      },
      mostrar: function () { return fmt.n(valor, op.dec === undefined ? 4 : op.dec) + (op.unidad ? ' ' + op.unidad : ''); }
    });
  };

  /* Fraccion a/b (se acepta cualquier forma equivalente, incluido el decimal). */
  resp.fraccion = function (a, b, op) {
    op = op || {};
    var s = fmt.simplifica(a, b);
    var r = resp.numero(a / b, { tol: 1e-9, ayuda: op.ayuda || 'Escribe la fraccion como a/b (tambien vale el decimal exacto).' });
    r.tipo = 'fraccion';
    r.mostrar = function () { return fmt.fracSimp(s[0], s[1]) + (op.unidad ? ' ' + op.unidad : ''); };
    return r;
  };

  /* Expresion algebraica: se compara evaluando en varios puntos.
     op: {vars, masConstante, mostrar} */
  resp.expresion = function (texto, op) {
    op = op || {};
    var vars = op.vars || ['x'];
    return base({
      tipo: 'expresion',
      valor: texto,
      ayuda: op.ayuda || 'Usa ^ para exponentes (x^2) y * o nada para multiplicar (3x).',
      campos: [{ etiqueta: op.etiqueta || 'Respuesta', ayuda: op.ayuda }],
      verificar: function (vals) {
        if (!String(vals[0] || '').trim()) return false;
        return EJ.expr.equivalentes(vals[0], texto, {
          vars: vars, masConstante: !!op.masConstante, enteros: !!op.enteros,
          rango: op.rango, tol: op.tol
        });
      },
      mostrar: function () { return op.mostrar || texto; }
    });
  };

  /* Igual que `expresion`, pero ademas exige que este escrita como producto
     (si no, "factoriza x^2-9" se podria contestar con "x^2-9"). */
  function pareceFactorizada(s) {
    s = String(s || '').replace(/\s+/g, '');
    if (s.indexOf('(') === -1) return false;
    /* "(6x^3+9x^2)" es la misma expresion entre parentesis, no una factorizacion:
       si todo el texto es un unico parentesis, se quita y se vuelve a revisar. */
    if (s.charAt(0) === '(' && s.charAt(s.length - 1) === ')') {
      var prof0 = 0, envuelveTodo = true;
      for (var q = 0; q < s.length; q++) {
        if (s[q] === '(') prof0++;
        else if (s[q] === ')') { prof0--; if (prof0 === 0 && q < s.length - 1) { envuelveTodo = false; break; } }
      }
      if (envuelveTodo) return pareceFactorizada(s.slice(1, -1));
    }
    var prof = 0;
    for (var i = 0; i < s.length; i++) {
      var ch = s[i];
      if (ch === '(') prof++;
      else if (ch === ')') prof--;
      else if ((ch === '+' || ch === '-') && prof === 0) {
        var prev = s[i - 1];
        if (i === 0) continue;                       // signo inicial
        if ('(*/^+-'.indexOf(prev) !== -1) continue; // exponente negativo, etc.
        return false;                                // hay una suma suelta: no es un producto
      }
    }
    return true;
  }

  resp.factorizada = function (texto, op) {
    op = op || {};
    var r = resp.expresion(texto, op);
    var verificarBase = r.verificar;
    r.tipo = 'factorizada';
    r.ayuda = op.ayuda || 'Escribe el resultado como producto de factores, por ejemplo (x+2)(x-5).';
    r.campos[0].ayuda = r.ayuda;
    r.verificar = function (vals) {
      return pareceFactorizada(vals[0]) && verificarBase(vals);
    };
    r.mensaje = function (vals) {
      if (!pareceFactorizada(vals[0]) && verificarBase(vals)) {
        return 'La expresion es correcta, pero falta factorizarla: escribela como producto de factores.';
      }
      return null;
    };
    return r;
  };

  /* Texto libre con alternativas aceptadas. */
  resp.texto = function (valor, op) {
    op = op || {};
    var acepta = [valor].concat(op.alternativas || []).map(normaliza);
    return base({
      tipo: 'texto',
      valor: valor,
      ayuda: op.ayuda || 'No importan mayusculas ni acentos.',
      campos: [{ etiqueta: op.etiqueta || 'Respuesta', ayuda: op.ayuda }],
      verificar: function (vals) { return acepta.indexOf(normaliza(vals[0])) !== -1; },
      mostrar: function () { return valor; }
    });
  };

  /* Opcion multiple. `opciones` es un arreglo de HTML; `correcta` es el indice. */
  resp.opcion = function (opciones, correcta, op) {
    op = op || {};
    return base({
      tipo: 'opcion',
      valor: correcta,
      campos: [{ etiqueta: op.etiqueta || 'Elige una', tipo: 'opcion', opciones: opciones }],
      verificar: function (vals) { return String(vals[0]) === String(correcta); },
      mostrar: function () { return opciones[correcta]; }
    });
  };

  /* Varios valores sin importar el orden (raices, puntos criticos, moda...). */
  resp.lista = function (valores, op) {
    op = op || {};
    var tipo = op.tipoElemento || 'numero';
    var tol = op.tol !== undefined ? op.tol : 1e-6;
    return base({
      tipo: 'lista',
      valor: valores,
      ayuda: op.ayuda || 'Separa los valores con comas.',
      campos: [{ etiqueta: op.etiqueta || 'Respuesta', ayuda: op.ayuda }],
      verificar: function (vals) {
        var dados = partes(vals[0]);
        if (dados.length !== valores.length) return false;
        var libres = valores.slice();
        for (var i = 0; i < dados.length; i++) {
          var encontrado = -1;
          for (var j = 0; j < libres.length; j++) {
            var ok;
            if (tipo === 'expresion') ok = EJ.expr.equivalentes(dados[i], String(libres[j]), { vars: op.vars || ['x'] });
            else if (tipo === 'texto') ok = normaliza(dados[i]) === normaliza(libres[j]);
            else {
              var v = EJ.expr.valor(dados[i]);
              ok = isFinite(v) && Math.abs(v - libres[j]) <= Math.max(tol, Math.abs(libres[j]) * 1e-9);
            }
            if (ok) { encontrado = j; break; }
          }
          if (encontrado === -1) return false;
          libres.splice(encontrado, 1);
        }
        return true;
      },
      mostrar: function () {
        return valores.map(function (v) { return typeof v === 'number' ? fmt.n(v) : v; }).join(', ');
      }
    });
  };

  /* Par ordenado (x, y): dos casillas. */
  resp.par = function (x, y, op) {
    op = op || {};
    var tol = op.tol !== undefined ? op.tol : 1e-6;
    function ok(entrada, esperado) {
      var v = EJ.expr.valor(entrada);
      return isFinite(v) && Math.abs(v - esperado) <= Math.max(tol, Math.abs(esperado) * 1e-9);
    }
    return base({
      tipo: 'par',
      valor: [x, y],
      campos: [
        { etiqueta: op.etiquetas ? op.etiquetas[0] : 'x', ancho: 'corto' },
        { etiqueta: op.etiquetas ? op.etiquetas[1] : 'y', ancho: 'corto' }
      ],
      verificar: function (vals) { return ok(vals[0], x) && ok(vals[1], y); },
      mostrar: function () { return '(' + fmt.n(x, op.dec === undefined ? 4 : op.dec) + ', ' + fmt.n(y, op.dec === undefined ? 4 : op.dec) + ')'; }
    });
  };

  /* Varias sub-respuestas en un mismo ejercicio.
     items: [{etiqueta, resp}] */
  resp.varios = function (items) {
    var campos = items.map(function (it) {
      var c = it.resp.campos[0];
      return {
        etiqueta: it.etiqueta,
        ayuda: c.ayuda, tipo: c.tipo, opciones: c.opciones, unidad: c.unidad,
        ancho: items.length > 2 ? 'corto' : ''
      };
    });
    return {
      tipo: 'varios',
      campos: campos,
      items: items,
      verificar: function (vals) {
        for (var i = 0; i < items.length; i++) if (!items[i].resp.verificar([vals[i]])) return false;
        return true;
      },
      /* Cuales fallaron, para dar retroalimentacion por campo. */
      detalle: function (vals) {
        return items.map(function (it, i) { return it.resp.verificar([vals[i]]); });
      },
      mostrar: function () {
        return items.map(function (it) { return '<b>' + it.etiqueta + ':</b> ' + it.resp.mostrar(); }).join(' &nbsp;&middot;&nbsp; ');
      }
    };
  };

  resp.normaliza = normaliza;
  EJ.resp = resp;
})(window);
