/* Modo prepa - Fisica (la parte de fisica del area de ciencias experimentales:
   los reactivos 43 a 60 de la version de practica) */
(function () {
  'use strict';
  var F = EJ.fmt, P = EJ.prepa;

  var MS = 'm/s', MS2 = 'm/s' + F.sup(2);

  /* opciones numericas con decimales fijos, como en el cuadernillo */
  function num(r, v, malas, unidad, dec) {
    return P.opciones(r, v, malas, { unidad: unidad, fijo: true, dec: dec === undefined ? 2 : dec, enteros: false });
  }

  var casos = {};

  /* 43. Velocidad (MRU) */
  casos.velocidad = function (r) {
    var v = r.entero(2, 30), t = r.entero(2, 12), d = v * t;
    var cosa = r.elige(['una pelota', 'un ciclista', 'un carrito de juguete', 'un patinador']);
    return P.ejercicio('&iquest;Cu&aacute;l es la velocidad de ' + cosa + ' si despu&eacute;s de ' + P.num(t, 1) + ' s est&aacute; a ' + P.num(d, 1) + ' m de distancia?',
      num(r, v, [t / d * 10, d / (t + 1), d - t, v / 2], MS, 1),
      ['Velocidad = distancia / tiempo.', 'v = ' + d + ' / ' + t + '.'],
      ['v = d / t = ' + d + ' / ' + t + ' = <b>' + P.num(v, 1) + ' m/s</b>']);
  };

  /* 44. Aceleracion */
  casos.aceleracion = function (r) {
    var a = r.entero(1, 6), t = r.entero(2, 10), v0 = r.entero(2, 30), vf = v0 + a * t;
    var cosa = r.elige(['una motocicleta', 'un autom&oacute;vil', 'un tren']);
    return P.ejercicio('&iquest;Cu&aacute;l es la aceleraci&oacute;n de ' + cosa + ' que pasa de ' + v0 + ' m/s a ' + vf + ' m/s en ' + t + ' s?',
      num(r, a, [vf / t, (vf + v0) / t, v0 / t, a * 2], MS2, 0),
      ['Aceleracion = cambio de velocidad / tiempo.', 'a = (v<sub>f</sub> &minus; v<sub>0</sub>) / t: primero RESTA las velocidades.'],
      ['a = (' + vf + ' &minus; ' + v0 + ') / ' + t + ' = ' + (vf - v0) + ' / ' + t + ' = <b>' + a + ' m/s' + F.sup(2) + '</b>']);
  };

  /* 45. Fuerza neta con cambio de velocidad */
  casos.fuerzaNeta = function (r) {
    var m = r.elige([10, 20, 25, 40, 50, 60, 80]), a = r.entero(1, 6), t = r.entero(2, 8), v0 = r.entero(5, 20), vf = v0 + a * t;
    var f = m * a;
    return P.ejercicio('Un cuerpo de ' + m + ' kg pasa de ' + v0 + ' m/s a ' + vf + ' m/s en ' + t + ' s. &iquest;Cu&aacute;l es su fuerza neta?',
      num(r, f, [m * vf / t, m, m * (vf - v0), f / 2], 'N', 0),
      ['Primero la aceleracion: a = (v<sub>f</sub> &minus; v<sub>0</sub>)/t.', 'Luego la segunda ley de Newton: F = m &middot; a.'],
      ['a = (' + vf + ' &minus; ' + v0 + ') / ' + t + ' = ' + a + ' m/s' + F.sup(2), 'F = ' + m + ' &times; ' + a + ' = <b>' + f + ' N</b>']);
  };

  /* 46. Aceleracion con la segunda ley */
  casos.aceleracionNewton = function (r) {
    var m = r.elige([40, 50, 60, 75, 80, 90, 100]), a = r.entero(1, 9) / 10, fza = m * a;
    var quien = r.elige(['una persona', 'un carrito de supermercado', 'una caja']);
    return P.ejercicio('&iquest;Qu&eacute; aceleraci&oacute;n tendr&aacute; ' + quien + ' de ' + P.num(m, 1) + ' kg si recibe un empuje de ' + P.num(fza, 1) + ' N?',
      num(r, a, [m / fza, fza / 10, m * fza / 1000, a * 9.8], MS2, 1),
      ['Segunda ley de Newton: F = m &middot; a, asi que a = F / m.', 'Divide la fuerza entre la masa (no al reves).'],
      ['a = ' + F.n(fza) + ' / ' + m + ' = <b>' + P.num(a, 1) + ' m/s' + F.sup(2) + '</b>']);
  };

  /* 47. Masa a partir del peso */
  casos.masaPeso = function (r) {
    var w = r.entero(3, 40) * 50, m = w / 9.81;
    var bien = P.num(m) + ' kg';
    var malas = [P.num(w / 9.81 / 9.81 * 3) + ' N', P.num(w / 9) + ' N', P.num(w * 9.81 / 100) + ' kg', P.num(w / 10) + ' N', P.num(m * 2) + ' kg'];
    return P.ejercicio('&iquest;Cu&aacute;l es la masa de un cuerpo cuyo peso es de ' + P.num(w) + ' N?' + P.considere('g = 9.81 m/s' + F.sup(2) + '.'),
      P.opciones(r, bien, malas),
      ['Peso = masa &times; gravedad (W = mg), asi que m = W / g.', 'La masa se mide en kilogramos, no en newtons: fijate en la unidad.'],
      ['m = ' + P.num(w) + ' / 9.81 = <b>' + bien + '</b>']);
  };

  /* 48. Leyes de Kepler */
  casos.kepler = function (r) {
    var leyes = [
      { t: 'los planetas siguen trayectorias el&iacute;pticas en las que el Sol se encuentra en uno de sus focos', b: 'las &oacute;rbitas' },
      { t: 'la l&iacute;nea que une al Sol con un planeta barre &aacute;reas iguales en tiempos iguales', b: 'las &aacute;reas' },
      { t: 'el cuadrado del periodo de un planeta es proporcional al cubo de su distancia media al Sol', b: 'los periodos' }
    ];
    var l = r.elige(leyes);
    var todas = ['las &aacute;reas', 'las &oacute;rbitas', 'los periodos', 'los sistemas', 'la gravitaci&oacute;n universal'];
    return P.ejercicio('Cuando decimos que ' + l.t + ', nos referimos a la ley de:',
      P.opciones(r, l.b, todas.filter(function (x) { return x !== l.b; })),
      ['1a ley (de las orbitas): las orbitas son elipses. 2a (de las areas): areas iguales en tiempos iguales.', '3a (de los periodos): T' + F.sup(2) + ' es proporcional a a' + F.sup(3) + '.'],
      ['Es la ley de <b>' + l.b + '</b>']);
  };

  /* 49. Formas de transferencia de calor */
  casos.calor = function (r) {
    var c = r.elige([
      { t: 'Al interior de un cuerpo s&oacute;lido, la &uacute;nica forma de transferencia de calor es por:', b: 'conducci&oacute;n' },
      { t: 'En los l&iacute;quidos y gases, el calor se transfiere principalmente por el movimiento del propio fluido, es decir, por:', b: 'convecci&oacute;n' },
      { t: 'El calor del Sol llega a la Tierra a trav&eacute;s del vac&iacute;o por:', b: 'radiaci&oacute;n' }
    ]);
    var todas = ['conducci&oacute;n', 'convecci&oacute;n', 'propagaci&oacute;n', 'radiaci&oacute;n'];
    return P.ejercicio(c.t, P.opciones(r, c.b, todas.filter(function (x) { return x !== c.b; })),
      ['Conduccion: de particula a particula (solidos). Conveccion: el fluido se mueve. Radiacion: ondas, aun en el vacio.', '"Propagacion" no es una de las tres formas.'],
      ['Respuesta: <b>' + c.b + '</b>']);
  };

  /* 50. Temperatura y calor (completar texto) */
  casos.temperaturaCalor = function (r) {
    var bien = ['temperatura', 'calor'];
    var malas = [['entrop&iacute;a', 'calor espec&iacute;fico'], ['dilataci&oacute;n t&eacute;rmica', 'calor'], ['entalp&iacute;a', 'calor espec&iacute;fico'], ['calor', 'temperatura']];
    return P.complete(r, 'La ___ indica qu&eacute; tan caliente o fr&iacute;a est&aacute; una sustancia con respecto a un cuerpo que se toma como patr&oacute;n. ' +
      'El ___ es energ&iacute;a en tr&aacute;nsito y siempre fluye de los cuerpos de mayor temperatura a los de menor temperatura.', bien, malas,
      ['La temperatura se MIDE con un termometro; el calor es energia que PASA de un cuerpo a otro.', 'No los confundas: un cuerpo no "tiene" calor, tiene temperatura.'], []);
  };

  /* 51. Tipos de sistemas termodinamicos (completar texto) */
  casos.sistemas = function (r) {
    var s = r.elige([
      { t: 'En un sistema ___ no existe intercambio de materia ni de ___ con otro sistema.', b: ['aislado', 'energ&iacute;a'],
        m: [['abierto', 'energ&iacute;a'], ['abierto', 'temperatura'], ['aislado', 'temperatura'], ['cerrado', 'energ&iacute;a']] },
      { t: 'En un sistema ___ s&oacute;lo se intercambia ___ con el entorno, pero no materia.', b: ['cerrado', 'energ&iacute;a'],
        m: [['abierto', 'energ&iacute;a'], ['aislado', 'materia'], ['cerrado', 'temperatura'], ['aislado', 'energ&iacute;a']] },
      { t: 'En un sistema ___ se intercambia tanto ___ como energ&iacute;a con el entorno.', b: ['abierto', 'materia'],
        m: [['cerrado', 'materia'], ['aislado', 'temperatura'], ['abierto', 'presi&oacute;n'], ['cerrado', 'calor']] }
    ]);
    return P.complete(r, s.t, s.b, s.m,
      ['Abierto: entra y sale materia y energia. Cerrado: solo energia. Aislado: nada.', 'Piensa en una olla destapada, una olla tapada y un termo.'], []);
  };

  /* 52. Leyes de la termodinamica */
  casos.leyesTermo = function (r) {
    var l = r.elige([
      { t: 'En un proceso termodin&aacute;mico, el calor absorbido o cedido por un sistema siempre ser&aacute; igual a la suma del trabajo realizado y el cambio de energ&iacute;a interna.', b: 'Primera' },
      { t: 'Si dos cuerpos est&aacute;n cada uno en equilibrio t&eacute;rmico con un tercero, entonces est&aacute;n en equilibrio t&eacute;rmico entre s&iacute;.', b: 'Cero' },
      { t: 'El calor fluye de manera espont&aacute;nea del cuerpo caliente al fr&iacute;o y nunca al rev&eacute;s; la entrop&iacute;a del universo siempre aumenta.', b: 'Segunda' },
      { t: 'Es imposible alcanzar el cero absoluto de temperatura en un n&uacute;mero finito de pasos.', b: 'Tercera' }
    ]);
    return P.ejercicio('&iquest;A qu&eacute; ley de la termodin&aacute;mica se refiere el siguiente enunciado?<br><div class="lectura">' + l.t + '</div>',
      P.opciones(r, l.b, ['Cero', 'Primera', 'Segunda', 'Tercera'].filter(function (x) { return x !== l.b; })),
      ['Cero: equilibrio termico. Primera: conservacion de la energia (Q = W + &Delta;U).', 'Segunda: entropia y direccion del calor. Tercera: el cero absoluto.'],
      ['Es la ley <b>' + l.b + '</b>']);
  };

  /* 53. Ley de Charles */
  casos.charles = function (r) {
    var V1, T1, V2, T2;
    do { V1 = r.entero(2, 9) * 100; T1 = r.entero(5, 8) * 50; V2 = r.entero(2, 9) * 100; T2 = T1 * V2 / V1; }
    while (V1 === V2 || T2 !== Math.round(T2));
    var gas = r.elige(['helio', 'nitr&oacute;geno', 'arg&oacute;n', 'ox&iacute;geno']);
    return P.ejercicio('Una muestra de ' + gas + ' ocupa ' + V1 + ' ml a ' + T1 + ' K. &iquest;A qu&eacute; temperatura ocupar&aacute; ' + V2 + ' ml si la presi&oacute;n no cambia?',
      num(r, T2, [T1 * V1 / V2, T1 + (V2 - V1), V2 - V1 + T1 / 2, T1], 'K', 0),
      ['Con presion constante es la ley de Charles: V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub>.', 'Si el volumen crece, la temperatura tambien (es directa).'],
      ['T<sub>2</sub> = T<sub>1</sub> &middot; V<sub>2</sub> / V<sub>1</sub> = ' + T1 + ' &times; ' + V2 + ' / ' + V1 + ' = <b>' + T2 + ' K</b>']);
  };

  /* 54. Ley de Boyle */
  casos.boyle = function (r) {
    var V1 = r.entero(10, 40) * 5, P1 = r.entero(2, 9), dp = r.entero(1, 5), P2 = P1 + dp;
    var V2 = P1 * V1 / P2;
    return P.ejercicio('Un gas ocupa un volumen de ' + P.num(V1, 1) + ' cm' + F.sup(3) + ' a una presi&oacute;n de ' + P.num(P1, 1) + ' atm. ' +
      '&iquest;Cu&aacute;l ser&aacute; el volumen si la presi&oacute;n aumenta ' + P.num(dp, 1) + ' atm m&aacute;s y la temperatura no cambia?',
      num(r, V2, [P1 * V1 / dp, V1 * P2 / P1, V1 - dp * 10, dp * V1 / P2], 'cm' + F.sup(3), 1),
      ['Con temperatura constante es la ley de Boyle: P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>.', 'La presion nueva es ' + P1 + ' + ' + dp + ' = ' + P2 + ' atm, no ' + dp + ' atm.'],
      ['P<sub>2</sub> = ' + P2 + ' atm', 'V<sub>2</sub> = ' + P1 + ' &times; ' + V1 + ' / ' + P2 + ' = <b>' + P.num(V2, 1) + ' cm' + F.sup(3) + '</b>']);
  };

  /* 55. Ley de Hooke */
  casos.hooke = function (r) {
    var m = r.entero(1, 12), x = r.entero(10, 90) / 100, k = m * 9.81 / x;
    return P.ejercicio('Si a un resorte se le cuelga una masa de ' + P.num(m) + ' kg, &eacute;ste se deforma ' + P.num(x) + ' m. Determine el valor de la constante k del resorte en N/m.' +
      P.considere('g = 9.81 m/s' + F.sup(2) + '.'),
      num(r, k, [m / x, m * 9.81 * x, x * 9.81 / m * 100, m * 9.81]),
      ['La fuerza que estira el resorte es el peso: F = mg.', 'Ley de Hooke: F = kx, asi que k = F / x.'],
      ['F = ' + m + ' &times; 9.81 = ' + P.num(m * 9.81) + ' N', 'k = ' + P.num(m * 9.81) + ' / ' + P.num(x) + ' = <b>' + P.num(k) + ' N/m</b>']);
  };

  /* 56. Principio de Pascal (prensa hidraulica) */
  casos.pascal = function (r) {
    var A1 = r.elige([5, 10, 20, 25]), mult = r.entero(4, 30), A2 = A1 * mult, F1 = r.entero(2, 20) * 10, F2 = F1 * mult;
    return P.ejercicio('En una prensa hidr&aacute;ulica, el &eacute;mbolo peque&ntilde;o tiene un &aacute;rea de ' + A1 + ' cm' + F.sup(2) + ' y el grande de ' + A2 +
      ' cm' + F.sup(2) + '. Si sobre el &eacute;mbolo peque&ntilde;o se aplica una fuerza de ' + F1 + ' N, &iquest;qu&eacute; fuerza se ejerce en el &eacute;mbolo grande?',
      P.opciones(r, F2, [F1 / mult, F1 + A2, F1 * A1, A2 * 2], { unidad: 'N', fmt: function (v) { return P.num(v, 0); } }),
      ['Principio de Pascal: F<sub>1</sub>/A<sub>1</sub> = F<sub>2</sub>/A<sub>2</sub>.', 'El embolo grande tiene ' + mult + ' veces el area, asi que recibe ' + mult + ' veces la fuerza.'],
      ['F<sub>2</sub> = ' + F1 + ' &times; ' + A2 + ' / ' + A1 + ' = <b>' + P.num(F2, 0) + ' N</b>']);
  };

  /* 57. Principio de Arquimedes */
  casos.arquimedes = function (r) {
    var V = r.entero(1, 30) / 10 * (r.bool() ? 1 : 10), E = 1000 * 9.81 * V;
    V = F.redondea(V, 2); E = 1000 * 9.81 * V;
    return P.ejercicio('Un cuerpo desplaza ' + P.num(V) + ' m' + F.sup(3) + ' de agua al sumergirse. &iquest;Cu&aacute;l es el empuje del agua sobre el cuerpo?' +
      P.considere('g = 9.81 m/s' + F.sup(2) + ' y &rho;<sub>agua</sub> = 1 000.00 kg/m' + F.sup(3) + '.'),
      num(r, E, [1000 * V, 9.81 * V, 1000 * 9.81 / V, E / 2], 'N'),
      ['Empuje = peso del agua desalojada: E = &rho; &middot; g &middot; V.', 'Multiplica los tres datos.'],
      ['E = 1000 &times; 9.81 &times; ' + F.n(V) + ' = <b>' + P.num(E) + ' N</b>']);
  };

  /* 58. Ley de Ohm: corriente */
  casos.ohmCorriente = function (r) {
    var V = r.elige([110, 120, 127, 220, 240]), I = r.elige([0.5, 1, 1.5, 2, 2.5, 4, 5]), R = V / I;
    if (R !== Math.round(R * 10) / 10) { V = 120; I = 2; R = 60; }
    return P.ejercicio('Un aparato el&eacute;ctrico tiene una resistencia de ' + P.num(R, 1) + ' &Omega; cuando est&aacute; funcionando. &iquest;Cu&aacute;l ser&aacute; la intensidad de corriente al conectarlo a ' + P.num(V, 1) + ' V?',
      num(r, I, [R / V, V * R / 100, V - R > 0 ? V - R : R - V, I * 2], 'A', 1),
      ['Ley de Ohm: V = I &middot; R, asi que I = V / R.', 'Divide el voltaje entre la resistencia.'],
      ['I = ' + V + ' / ' + F.n(R) + ' = <b>' + P.num(I, 1) + ' A</b>']);
  };

  /* 59. Ley de Ohm: voltaje */
  casos.ohmVoltaje = function (r) {
    var R = r.entero(1, 40) * 50, I = r.entero(1, 10) / 4, V = R * I;
    return P.ejercicio('Determine el voltaje en una resistencia de ' + P.num(R) + ' &Omega; si a trav&eacute;s de ella circula una corriente de ' + P.num(I) + ' A.',
      num(r, V, [R / I, I / R * 1000, R + I, V / 2], 'V'),
      ['Ley de Ohm: V = I &middot; R.', 'Multiplica la corriente por la resistencia.'],
      ['V = ' + P.num(I) + ' &times; ' + P.num(R) + ' = <b>' + P.num(V) + ' V</b>']);
  };

  /* 60. Ley de Snell */
  casos.snell = function (r) {
    var ang = r.elige([[30, 0.50], [40, 0.64], [45, 0.71], [53, 0.80], [60, 0.87], [70, 0.94]]);
    var n2 = r.elige([1.33, 1.5, 1.6]);
    var s2 = Math.round(ang[1] / n2 * 100) / 100;
    var a2 = Math.round(Math.asin(s2) * 180 / Math.PI * 10) / 10;
    var nCalc = ang[1] / s2;
    var medio = r.elige(['un vidrio', 'un bloque de acr&iacute;lico', 'un prisma de cuarzo']);
    return P.ejercicio('A ' + medio + ' se le hace llegar desde el aire un rayo de luz con un &aacute;ngulo de incidencia de ' + ang[0] + '&deg; y se refracta con un &aacute;ngulo de ' + a2 +
      '&deg;. &iquest;Cu&aacute;l es el &iacute;ndice de refracci&oacute;n del material?' +
      P.considere('n<sub>aire</sub> = 1, sen(' + ang[0] + '&deg;) = ' + ang[1].toFixed(2) + ' y sen(' + a2 + '&deg;) = ' + s2.toFixed(2) + '.'),
      num(r, nCalc, [s2 / ang[1], ang[1] * s2, ang[0] / a2 > 3 ? ang[1] + s2 : ang[0] / a2, ang[1] - s2 + 1]),
      ['Ley de Snell: n<sub>1</sub> sen &theta;<sub>1</sub> = n<sub>2</sub> sen &theta;<sub>2</sub>.', 'Despeja n<sub>2</sub> = sen &theta;<sub>1</sub> / sen &theta;<sub>2</sub> (porque n<sub>1</sub> = 1).'],
      ['n<sub>2</sub> = ' + ang[1].toFixed(2) + ' / ' + s2.toFixed(2) + ' = <b>' + P.num(nCalc) + '</b>']);
  };

  EJ.tema({
    id: 'prepa-fisica',
    materia: 'prepa',
    grupo: 'Ciencias experimentales',
    nombre: 'Fisica',
    descripcion: 'Movimiento, Newton, peso, Kepler, calor y termodinamica, gases, Hooke, Pascal, Arquimedes, Ohm y Snell. La parte de fisica del area de ciencias experimentales de la guia.',
    etiquetas: ['velocidad', 'aceleracion', 'newton', 'kepler', 'calor', 'termodinamica', 'boyle', 'charles', 'hooke', 'pascal', 'arquimedes', 'ohm', 'snell'],
    dificultades: ['medio'],
    formulario: 'v = d/t &nbsp;&middot;&nbsp; a = (v<sub>f</sub> &minus; v<sub>0</sub>)/t &nbsp;&middot;&nbsp; F = ma &nbsp;&middot;&nbsp; W = mg<br>' +
      'Boyle: P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub> &nbsp;&middot;&nbsp; Charles: V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub> &nbsp;&middot;&nbsp; Hooke: F = kx<br>' +
      'Pascal: F<sub>1</sub>/A<sub>1</sub> = F<sub>2</sub>/A<sub>2</sub> &nbsp;&middot;&nbsp; Arquimedes: E = &rho;gV &nbsp;&middot;&nbsp; Ohm: V = IR &nbsp;&middot;&nbsp; Snell: n<sub>1</sub>sen&theta;<sub>1</sub> = n<sub>2</sub>sen&theta;<sub>2</sub>',
    generar: function (dif, r) {
      var t = r.subtema([
        ['velocidad', 'Velocidad'],
        ['aceleracion', 'Aceleracion'],
        ['fuerzaNeta', 'Fuerza neta'],
        ['aceleracionNewton', 'Segunda ley de Newton'],
        ['masaPeso', 'Masa y peso'],
        ['kepler', 'Leyes de Kepler'],
        ['calor', 'Transferencia de calor'],
        ['temperaturaCalor', 'Temperatura y calor'],
        ['sistemas', 'Sistemas termodinamicos'],
        ['leyesTermo', 'Leyes de la termodinamica'],
        ['charles', 'Ley de Charles'],
        ['boyle', 'Ley de Boyle'],
        ['hooke', 'Ley de Hooke'],
        ['pascal', 'Principio de Pascal'],
        ['arquimedes', 'Principio de Arquimedes'],
        ['ohmCorriente', 'Ley de Ohm: corriente'],
        ['ohmVoltaje', 'Ley de Ohm: voltaje'],
        ['snell', 'Ley de Snell']
      ]);
      return casos[t](r);
    }
  });
})();
