/* Generador aleatorio con semilla: mismo numero de semilla => mismo ejercicio.
   Sirve para poder repetir un ejercicio exacto (boton "repetir") y para depurar. */
(function (global) {
  'use strict';

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function Aleatorio(semilla) {
    this.semilla = (semilla === undefined ? (Date.now() ^ (Math.random() * 1e9)) : semilla) >>> 0;
    this._r = mulberry32(this.semilla);
  }

  Aleatorio.prototype.real = function (a, b) { return a + this._r() * (b - a); };

  Aleatorio.prototype.entero = function (a, b) { return Math.floor(a + this._r() * (b - a + 1)); };

  Aleatorio.prototype.enteroNoCero = function (a, b) {
    var v = 0, i = 0;
    do { v = this.entero(a, b); i++; } while (v === 0 && i < 50);
    return v === 0 ? (b > 0 ? 1 : -1) : v;
  };

  /* Entero en [a,b] que no este en la lista `fuera`. */
  Aleatorio.prototype.enteroExcepto = function (a, b, fuera) {
    var opciones = [];
    for (var v = a; v <= b; v++) if (fuera.indexOf(v) === -1) opciones.push(v);
    return opciones.length ? this.elige(opciones) : a;
  };

  Aleatorio.prototype.signo = function () { return this._r() < 0.5 ? -1 : 1; };

  Aleatorio.prototype.bool = function (p) { return this._r() < (p === undefined ? 0.5 : p); };

  Aleatorio.prototype.elige = function (lista) { return lista[Math.floor(this._r() * lista.length)]; };

  Aleatorio.prototype.baraja = function (lista) {
    var a = lista.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(this._r() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };

  /* n elementos distintos de la lista. */
  Aleatorio.prototype.muestra = function (lista, n) { return this.baraja(lista).slice(0, n); };

  /* Elige que SUBTEMA toca. `lista` son parejas [id, 'Nombre visible'].
     - Si el usuario pidio un subtema concreto y esta en la lista, sale ese.
     - Si no, sale uno al azar.
     Ademas deja anotado que subtemas ofrece el tema en esta dificultad, para
     que la interfaz pueda pintarlos sin tener que adivinarlos.
     Solo debe llamarse UNA vez por ejercicio (al principio de generar). */
  Aleatorio.prototype.subtema = function (lista) {
    var normal = lista.map(function (x) {
      return Array.isArray(x) ? { id: x[0], nombre: x[1] } : { id: x, nombre: x };
    });
    if (!this.ofrecidos) this.ofrecidos = normal;
    var ids = normal.map(function (x) { return x.id; });
    var elegido = (this.forzado && ids.indexOf(this.forzado) !== -1)
      ? this.forzado
      : this.elige(ids);
    this.elegido = elegido;
    return elegido;
  };

  /* n enteros distintos en [a,b]. */
  Aleatorio.prototype.enterosDistintos = function (a, b, n) {
    var pool = [];
    for (var v = a; v <= b; v++) pool.push(v);
    return this.muestra(pool, n);
  };

  global.EJ = global.EJ || {};
  global.EJ.Aleatorio = Aleatorio;
  global.EJ.aleatorio = function (semilla) { return new Aleatorio(semilla); };
})(window);
