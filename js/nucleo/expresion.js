/* Mini interprete de expresiones matematicas.
   Sirve para comparar la respuesta del usuario con la correcta SIN exigir
   que esten escritas igual: x^2+2x+1 y (x+1)^2 se aceptan como equivalentes,
   porque se evaluan en varios puntos al azar y se comparan los valores.
   Acepta multiplicacion implicita (2x, 3(x+1), xy), ^, funciones y constantes. */
(function (global) {
  'use strict';
  var EJ = global.EJ = global.EJ || {};

  var FUNCIONES = {
    sin: Math.sin, sen: Math.sin, cos: Math.cos, tan: Math.tan,
    sec: function (x) { return 1 / Math.cos(x); },
    csc: function (x) { return 1 / Math.sin(x); },
    cot: function (x) { return 1 / Math.tan(x); },
    asin: Math.asin, arcsin: Math.asin, arcsen: Math.asin,
    acos: Math.acos, arccos: Math.acos,
    atan: Math.atan, arctan: Math.atan,
    sinh: Math.sinh, senh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
    ln: Math.log, log: function (x) { return Math.log(x) / Math.LN10; },
    log10: function (x) { return Math.log(x) / Math.LN10; },
    log2: function (x) { return Math.log(x) / Math.LN2; },
    exp: Math.exp, sqrt: Math.sqrt, raiz: Math.sqrt, abs: Math.abs
  };
  var CONSTANTES = { pi: Math.PI, 'π': Math.PI, e: Math.E, tau: 2 * Math.PI };

  /* ---------- tokenizador ---------- */
  function tokeniza(src, variables) {
    var s = String(src)
      .replace(/\s+/g, '')
      .replace(/−/g, '-')              // menos tipografico
      .replace(/[·×]/g, '*')      // punto medio y por
      .replace(/÷/g, '/')
      .replace(/\[/g, '(').replace(/\]/g, ')')
      .replace(/\{/g, '(').replace(/\}/g, ')')
      .replace(/√/g, 'sqrt')
      .replace(/²/g, '^2').replace(/³/g, '^3')
      .replace(/,(\d)/g, '.$1');            // coma decimal
    var t = [], i = 0;
    while (i < s.length) {
      var c = s[i];
      if (/[0-9.]/.test(c)) {
        var j = i;
        while (j < s.length && /[0-9.]/.test(s[j])) j++;
        /* notacion cientifica solo con signo explicito (1.5e-7), para no chocar
           con la constante e en cosas como 2e (que significa 2 por e) */
        if (/[eE]/.test(s[j] || '') && /[+-]/.test(s[j + 1] || '') && /[0-9]/.test(s[j + 2] || '')) {
          j += 2;
          while (j < s.length && /[0-9]/.test(s[j])) j++;
        }
        t.push({ t: 'num', v: parseFloat(s.slice(i, j)) });
        i = j;
      } else if (/[A-Za-zπ]/.test(c)) {
        var k = i;
        while (k < s.length && /[A-Za-zπ]/.test(s[k])) k++;
        t = t.concat(parteIdentificador(s.slice(i, k), variables));
        i = k;
      } else if ('+-*/^(),'.indexOf(c) !== -1) {
        t.push({ t: c });
        i++;
      } else {
        throw new Error('Caracter no valido: "' + c + '"');
      }
    }
    return t;
  }

  /* Parte una palabra como "2sinxcosx" -> sin, x, cos, x.
     Prioridad: funcion conocida > constante > variable declarada > letra suelta. */
  function parteIdentificador(palabra, variables) {
    var out = [], i = 0, low = palabra.toLowerCase();
    var candidatos = Object.keys(FUNCIONES).concat(Object.keys(CONSTANTES)).concat(variables || []);
    candidatos.sort(function (a, b) { return b.length - a.length; });
    while (i < low.length) {
      var encontrado = null;
      for (var c = 0; c < candidatos.length; c++) {
        var cand = String(candidatos[c]).toLowerCase();
        if (cand && low.substr(i, cand.length) === cand) { encontrado = candidatos[c]; break; }
      }
      if (!encontrado) encontrado = palabra[i];
      var key = String(encontrado).toLowerCase();
      if (FUNCIONES[key]) out.push({ t: 'fun', v: key });
      else if (CONSTANTES[key] !== undefined && (variables || []).indexOf(encontrado) === -1) out.push({ t: 'num', v: CONSTANTES[key] });
      else out.push({ t: 'var', v: encontrado });
      i += String(encontrado).length;
    }
    return out;
  }

  /* ---------- analizador sintactico ---------- */
  function analiza(tokens) {
    var p = 0;

    function mira() { return tokens[p]; }
    function come(tipo) {
      var tk = tokens[p];
      if (!tk || tk.t !== tipo) throw new Error('Se esperaba "' + tipo + '"');
      p++; return tk;
    }
    function iniciaFactor(tk) {
      return !!tk && (tk.t === 'num' || tk.t === 'var' || tk.t === 'fun' || tk.t === '(');
    }

    function expr() {
      var izq = termino();
      while (mira() && (mira().t === '+' || mira().t === '-')) {
        var op = tokens[p++].t;
        izq = { op: op, a: izq, b: termino() };
      }
      return izq;
    }

    function termino() {
      var izq = unario();
      while (true) {
        var tk = mira();
        if (tk && (tk.t === '*' || tk.t === '/')) {
          p++;
          izq = { op: tk.t, a: izq, b: unario() };
        } else if (iniciaFactor(tk)) {          // multiplicacion implicita: 2x, 3(x+1)
          izq = { op: '*', a: izq, b: unario() };
        } else break;
      }
      return izq;
    }

    function unario() {
      var tk = mira();
      if (tk && tk.t === '-') { p++; return { op: 'neg', a: unario() }; }
      if (tk && tk.t === '+') { p++; return unario(); }
      return potencia();
    }

    function potencia() {
      var base = primario();
      if (mira() && mira().t === '^') { p++; return { op: '^', a: base, b: unario() }; }
      return base;
    }

    function primario() {
      var tk = mira();
      if (!tk) throw new Error('Expresion incompleta');
      if (tk.t === 'num') { p++; return { op: 'num', v: tk.v }; }
      if (tk.t === 'var') { p++; return { op: 'var', v: tk.v }; }
      if (tk.t === '(') { p++; var e = expr(); come(')'); return e; }
      if (tk.t === 'fun') {
        p++;
        var arg;
        if (mira() && mira().t === '(') { p++; arg = expr(); come(')'); }
        else arg = potencia();            // sin x^2 => sin(x^2);  sin x cos x => sin(x)*cos(x)
        var nodo = { op: 'fun', v: tk.v, a: arg };
        if (mira() && mira().t === '^') { p++; return { op: '^', a: nodo, b: unario() }; }
        return nodo;
      }
      throw new Error('Simbolo inesperado');
    }

    var arbol = expr();
    if (p < tokens.length) throw new Error('Sobra texto al final');
    return arbol;
  }

  function evalua(nodo, env) {
    switch (nodo.op) {
      case 'num': return nodo.v;
      case 'var':
        if (env[nodo.v] !== undefined) return env[nodo.v];
        if (env[String(nodo.v).toLowerCase()] !== undefined) return env[String(nodo.v).toLowerCase()];
        return NaN;
      case 'neg': return -evalua(nodo.a, env);
      case '+': return evalua(nodo.a, env) + evalua(nodo.b, env);
      case '-': return evalua(nodo.a, env) - evalua(nodo.b, env);
      case '*': return evalua(nodo.a, env) * evalua(nodo.b, env);
      case '/': return evalua(nodo.a, env) / evalua(nodo.b, env);
      case '^': return Math.pow(evalua(nodo.a, env), evalua(nodo.b, env));
      case 'fun': return FUNCIONES[nodo.v](evalua(nodo.a, env));
    }
    return NaN;
  }

  function compila(texto, variables) {
    return analiza(tokeniza(texto, variables || []));
  }

  /* Valor numerico de una expresion sin variables ("3/4", "sqrt(2)", "2^5"). */
  function valor(texto) {
    try {
      var v = evalua(compila(texto, []), {});
      return typeof v === 'number' ? v : NaN;
    } catch (e) { return NaN; }
  }

  function valida(texto, variables) {
    try { compila(texto, variables || []); return true; } catch (e) { return false; }
  }

  function esFinito(x) { return typeof x === 'number' && isFinite(x); }

  /* Compara dos expresiones evaluandolas en puntos al azar.
     opciones: {vars, rango:[a,b], muestras, tol, masConstante} */
  function equivalentes(a, b, opciones) {
    opciones = opciones || {};
    var vars = opciones.vars || ['x'];
    /* `enteros` sirve para sucesiones: (-1)^n solo tiene sentido con n entero. */
    var rango = opciones.rango || (opciones.enteros ? [1, 14] : [0.37, 2.61]);
    var muestras = opciones.muestras || 16;
    var tol = opciones.tol || 1e-6;
    var A, B;
    try { A = compila(a, vars); B = compila(b, vars); } catch (e) { return false; }

    var r = new EJ.Aleatorio(20240917), validos = 0, datos = [];
    for (var i = 0; i < muestras * 4 && validos < muestras; i++) {
      var env = {};
      for (var v = 0; v < vars.length; v++) {
        env[vars[v]] = opciones.enteros ? r.entero(rango[0], rango[1]) : r.real(rango[0], rango[1]);
      }
      var va, vb;
      try { va = evalua(A, env); vb = evalua(B, env); } catch (e) { continue; }
      if (!esFinito(va) || !esFinito(vb)) continue;
      validos++;
      datos.push({ a: va, b: vb, d: va - vb });
    }
    if (validos < 4) return false;

    if (opciones.masConstante) {           // integrales indefinidas: acepta cualquier +C
      var base = datos[0].d;
      for (var k = 0; k < datos.length; k++) {
        var escK = 1 + Math.abs(base) + Math.abs(datos[k].a);
        if (Math.abs(datos[k].d - base) > tol * escK) return false;
      }
      return true;
    }
    for (var j = 0; j < datos.length; j++) {
      var esc = 1 + Math.abs(datos[j].a) + Math.abs(datos[j].b);
      if (Math.abs(datos[j].d) > tol * esc) return false;
    }
    return true;
  }

  EJ.expr = {
    compila: compila, evalua: evalua, valor: valor, valida: valida,
    equivalentes: equivalentes, funciones: FUNCIONES
  };
})(window);
