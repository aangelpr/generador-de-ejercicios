/* Modo prepa - Humanidades: filosofia, etica, logica y argumentacion
   (los 40 reactivos del area en la version de practica) */
(function () {
  'use strict';
  var P = EJ.prepa;

  /* lecturas de los multirreactivos (misma posicion = mismo texto) */
  var ARG = [
    'Para empezar, los conejos son animales muy inteligentes y aprenden con facilidad a ser aseados. Por si no fuera suficiente, su alimentación es muy económica. Lo más importante, no ladran ni hacen ruidos fuertes. ¿Cómo podremos negar, entonces, que los conejos son las mejores mascotas?',
    'En primer lugar, la bicicleta no contamina. Además, hacer ejercicio diario mejora la salud. Sobre todo, en la ciudad se evita el tráfico. Por lo tanto, la bicicleta es el mejor medio de transporte para ir a la escuela.',
    'Primero, leer amplía el vocabulario. También, la lectura mejora la concentración. Más aún, los libros nos permiten conocer otras épocas y lugares. En conclusión, todos los jóvenes deberían leer al menos un libro al mes.',
    'En primer término, los alimentos ultraprocesados tienen mucha azúcar y sal. Asimismo, su consumo frecuente se relaciona con la obesidad. Por si fuera poco, suelen costar más que la fruta de temporada. Así que conviene sustituirlos por alimentos naturales en el refrigerio escolar.'
  ];

  /* ================= temario de la guia (2. Humanidades) =================
     Preguntas armadas al azar con los temas de la guia "Temas fundamentales y
     bibliografia": ramas y metodos de la filosofia, teorias eticas, virtudes,
     derechos, logica proposicional, reglas de inferencia y falacias. */

  /* "a que grupo pertenece": la respuesta es el grupo del ejemplo */
  function clasifica(r, grupos, pregunta, extra) {
    var nombres = Object.keys(grupos), g = r.elige(nombres), ej = r.elige(grupos[g]);
    return { p: pregunta(ej), b: g, m: nombres.filter(function (x) { return x !== g; }).concat(extra || []) };
  }
  function cita(t) { return '<br><i>' + t + '</i>'; }

  /* ---------- 2.1 Filosofia ---------- */
  var SABERES = {
    'Mitológico': ['Los antiguos griegos creían que los rayos los lanzaba Zeus cuando se enojaba con los hombres.',
      'Según una leyenda mexica, el Sol y la Luna nacieron cuando dos dioses se arrojaron a una hoguera en Teotihuacan.',
      'Para los mayas, los primeros seres humanos fueron hechos de masa de maíz por los dioses.'],
    'Científico': ['Al comparar plantas que crecieron con luz y otras en la oscuridad, se comprobó que la falta de luz detiene su crecimiento.',
      'Se planteó la hipótesis de que el ejercicio baja la presión arterial y se probó midiendo a 200 voluntarios durante seis meses.'],
    'Filosófico': ['¿Podemos estar seguros de que lo que percibimos con los sentidos es real, o todo podría ser un sueño?',
      '¿Qué es la verdad y cómo podemos saber que hemos llegado a ella?', '¿Tiene sentido la vida humana si todos vamos a morir?']
  };
  function qSaber(r) {
    var q = clasifica(r, SABERES, function (ej) { return 'Identifique el tipo de saber del siguiente texto:' + cita(ej); }, ['Técnico']);
    q.ex = 'El mito explica con relatos fantásticos y seres sobrenaturales; la ciencia, con observación, experimentación e hipótesis que se prueban; la filosofía, con la razón y la reflexión crítica.';
    return q;
  }
  var RASGOS_FILOSOFIA = {
    'Crítica': 'Cuestiona todo, incluso lo que parece obvio, para llegar a la verdad',
    'Reflexiva': 'Invita a pensar con calma sobre el conocimiento, la moral o la existencia',
    'Universal': 'Se interesa por cuestiones que afectan a todos los seres humanos, como el sentido de la vida o la justicia',
    'Sistemática': 'Organiza sus ideas de manera lógica y coherente',
    'Racional': 'Fundamenta sus explicaciones en argumentos y no en la fe o la tradición',
    'Radical': 'No se conforma con respuestas superficiales: busca las causas últimas'
  };
  function qRasgoFilosofia(r) {
    var k = r.elige(Object.keys(RASGOS_FILOSOFIA));
    return { p: '¿Qué característica de la filosofía se describe?' + cita(RASGOS_FILOSOFIA[k] + '.'), b: k,
      m: Object.keys(RASGOS_FILOSOFIA).filter(function (x) { return x !== k; }) };
  }
  var RAMAS = {
    'Metafísica': ['¿Por qué existe algo en lugar de nada?', '¿Qué significa existir?'],
    'Epistemología': ['¿Cómo sabemos lo que sabemos?', '¿Cuáles son los límites del conocimiento humano?'],
    'Lógica': ['¿Cómo distinguimos un argumento válido de uno que no lo es?', '¿Qué reglas debe seguir un razonamiento para no caer en contradicciones?'],
    'Ética': ['¿Es correcto mentir para ayudar a un amigo?', '¿Qué hace que una acción sea buena o mala?'],
    'Estética': ['¿Qué hace que una obra de arte sea bella?', '¿Por qué nos conmueve una canción?']
  };
  function qRama(r) {
    var q = clasifica(r, RAMAS, function (ej) { return '¿A qué rama de la filosofía corresponde la pregunta?' + cita(ej); });
    q.ex = 'Metafísica: el ser y la existencia. Epistemología: el conocimiento y la verdad. Lógica: el razonamiento correcto. Ética: el bien y el mal. Estética: la belleza y el arte.';
    return q;
  }
  var METODOS = {
    'Mayéutico': ['Una maestra no da la respuesta: hace preguntas a sus alumnos hasta que ellos mismos descubren la idea'],
    'Dialéctico': ['Se plantea una idea (tesis), se le opone una contraria (antítesis) y se busca una síntesis que supere a ambas'],
    'Hermenéutico': ['Un historiador interpreta una carta del siglo XVI tomando en cuenta el contexto en que se escribió'],
    'Fenomenológico': ['Se describe la experiencia de escuchar música tal como se vive, sin prejuicios ni explicaciones científicas'],
    'Escolástico': ['Un monje medieval usa argumentos lógicos para explicar racionalmente las verdades de la fe'],
    'Cartesiano': ['Se pone en duda todo lo que no sea completamente cierto hasta encontrar una verdad indudable'],
    'Empirista': ['Se afirma que la mente al nacer es una hoja en blanco y que todo conocimiento llega por los sentidos'],
    'Lógico': ['Se aplican reglas para obtener conclusiones válidas a partir de premisas verdaderas']
  };
  function qMetodo(r) {
    var q = clasifica(r, METODOS, function (ej) { return '¿Qué método filosófico se aplica?' + cita(ej + '.'); });
    q.ex = 'Mayéutico (Sócrates): preguntar. Dialéctico: tesis, antítesis y síntesis. Hermenéutico: interpretar textos. Fenomenológico: describir la experiencia. Escolástico: fe y razón. Cartesiano: duda metódica. Empirista: experiencia. Lógico: reglas del razonamiento.';
    return q;
  }

  /* ---------- 2.2 Etica ---------- */
  var TEORIAS = {
    'Utilitarismo': ['Un hospital usa su presupuesto en vacunas que salvarán a miles, en lugar de un tratamiento costoso para un solo paciente',
      'Lo correcto es lo que produce el mayor bien para el mayor número de personas'],
    'Ética formal (Kant)': ['Mario devuelve la cartera que encontró, no por la recompensa, sino porque cree que es su deber',
      'Lo importante no son las consecuencias de las acciones, sino la intención con la que se actúa'],
    'Hedonismo': ['Para Laura, lo bueno es lo que produce placer y evita el dolor, entendido como tranquilidad del alma',
      'Epicuro afirma que el bien está en el placer y en una vida sin sufrimientos innecesarios'],
    'Estoicismo': ['Tras perder la final, Iván acepta con serenidad un resultado que no dependía de él y se concentra en entrenar',
      'La virtud consiste en controlar las pasiones y aceptar con serenidad lo que no podemos cambiar'],
    'Contractualismo': ['Los vecinos acuerdan reglas de convivencia que todos se comprometen a respetar',
      'La moral surge de un acuerdo o contrato social entre las personas'],
    'Eudemonismo': ['Para Pedro, una vida buena es la que se vive con virtud y equilibrio para alcanzar la felicidad',
      'El fin último de las acciones humanas es la felicidad, como sostenía Aristóteles'],
    'Multiculturalismo': ['Una escuela organiza actividades para que alumnos de distintas culturas convivan y respeten sus tradiciones',
      'Hay que promover el respeto y la convivencia entre distintas culturas'],
    'Existencialismo': ['Ana sostiene que nadie más puede decidir el sentido de su vida y que debe responder por sus elecciones',
      'La ética se centra en la libertad y en la responsabilidad individual']
  };
  function qTeoriaEtica(r) {
    var q = clasifica(r, TEORIAS, function (ej) { return '¿Qué teoría ética corresponde a lo siguiente?' + cita(ej + '.'); }, ['Vitalismo']);
    q.ex = 'Utilitarismo: mayor bien para el mayor número. Ética formal: la intención. Hedonismo: el placer. Estoicismo: dominar las pasiones. Contractualismo: el contrato social. Eudemonismo: la felicidad. Multiculturalismo: respeto entre culturas. Existencialismo: libertad y responsabilidad.';
    return q;
  }
  var VIRTUDES = [['valentía', 'la cobardía', 'la temeridad'], ['generosidad', 'la avaricia', 'el derroche'], ['moderación', 'la insensibilidad', 'el desenfreno'],
    ['veracidad', 'la falsa modestia', 'la jactancia']];
  function qJustoMedio(r) {
    var v = r.elige(VIRTUDES);
    function par(x) { return x[1] + ' (defecto) y ' + x[2] + ' (exceso)'; }
    return { p: 'Para Aristóteles, la virtud es el justo medio entre dos vicios. ¿Entre qué vicios está la ' + v[0] + '?', b: par(v),
      m: VIRTUDES.filter(function (x) { return x !== v; }).map(par).concat([v[2] + ' (defecto) y ' + v[1] + ' (exceso)']),
      ex: 'Valentía: entre cobardía y temeridad. Generosidad: entre avaricia y derroche. Moderación: entre insensibilidad y desenfreno. Veracidad: entre falsa modestia y jactancia.' };
  }
  function qEticaMoral(r) {
    var q = clasifica(r, { 'Ética': ['Proviene del griego ethos, que significa costumbre, hábito o carácter', 'Es la disciplina filosófica que estudia la moral',
        'Abre preguntas sobre el bien y el mal que han acompañado al ser humano en su historia'],
      'Moral': ['Proviene del latín moralis, que significa costumbre', 'Es el conjunto de reglas, normas y principios que rigen el comportamiento de las personas en la sociedad',
        'No existe comunidad sin ella, pues todo grupo humano tiene reglas para convivir'] },
      function (ej) { return '¿A qué concepto corresponde la siguiente descripción?' + cita(ej + '.'); }, ['Estética', 'Lógica']);
    q.ex = 'La moral son las normas que rigen la conducta en una sociedad; la ética es la reflexión filosófica que estudia esa moral.';
    return q;
  }
  function qEnfoqueVida(r) {
    var q = clasifica(r, { 'Antropocentrismo': ['El entorno está al servicio de los intereses del ser humano', 'Talar un bosque es correcto si sirve para construir viviendas'],
      'Biocentrismo': ['Todos los seres vivos merecen respeto y tienen derecho a existir y desarrollarse', 'Un animal tiene valor por sí mismo, aunque no le sea útil a las personas'] },
      function (ej) { return '¿Qué enfoque ético expresa el siguiente enunciado?' + cita(ej + '.'); }, ['Hedonismo', 'Determinismo']);
    q.ex = 'Antropocentrismo: el ser humano es el centro y el entorno está a su servicio. Biocentrismo: todo ser vivo merece respeto.';
    return q;
  }
  function qNormas(r) {
    var q = clasifica(r, { 'Heteronomía': ['Ana cumple el reglamento sólo por miedo a que la castiguen', 'Luis no tira basura en la calle únicamente porque hay una cámara que lo vigila'],
      'Autonomía': ['Rosa cumple el reglamento porque está convencida de que es correcto', 'Sofía decide no copiar en el examen, aunque nadie la vería, porque cree que es injusto'] },
      function (ej) { return '¿Qué noción ética ilustra la situación?' + cita(ej + '.'); }, ['Determinismo', 'Hedonismo']);
    q.ex = 'Autonomía: la persona se da a sí misma sus normas. Heteronomía: sigue normas impuestas desde fuera, por miedo, premio o presión.';
    return q;
  }
  function qDerecho(r) {
    var q = clasifica(r, { 'Derecho individual': ['la libertad de expresión', 'la propiedad personal', 'la autodeterminación de cada persona'],
      'Derecho colectivo': ['la seguridad pública', 'la salud de la población', 'la educación para todos', 'el bienestar general'] },
      function (ej) { return '¿Qué tipo de derecho es ' + ej + '?'; }, ['Derecho consuetudinario', 'Obligación moral']);
    q.ex = 'Los derechos individuales protegen a cada persona de abusos del poder o de las mayorías; los colectivos buscan condiciones dignas para todos los miembros de la sociedad.';
    return q;
  }

  /* ---------- 2.4 Logica ---------- */
  function evalua(f, p, q) {
    return { '¬p': !p, '¬q': !q, 'p ∧ q': p && q, 'p ∨ q': p || q, 'p → q': !p || q, 'q → p': !q || p, 'p ↔ q': p === q,
      '¬p ∧ q': !p && q, 'p ∧ ¬q': p && !q, '¬p ∨ ¬q': !p || !q, '¬(p ∨ q)': !(p || q), '¬p → q': p || q }[f];
  }
  var FORMULAS = ['¬p', '¬q', 'p ∧ q', 'p ∨ q', 'p → q', 'q → p', 'p ↔ q', '¬p ∧ q', 'p ∧ ¬q', '¬p ∨ ¬q', '¬(p ∨ q)', '¬p → q'];
  function qValorVerdad(r) {
    var p = r.bool(), q = r.bool(), verdad = r.bool();
    var buenas = FORMULAS.filter(function (f) { return evalua(f, p, q) === verdad; }), malas = FORMULAS.filter(function (f) { return evalua(f, p, q) !== verdad; });
    var b = r.elige(buenas);
    return { p: 'Si p es ' + (p ? 'verdadera' : 'falsa') + ' y q es ' + (q ? 'verdadera' : 'falsa') + ', ¿cuál de las siguientes proposiciones es ' + (verdad ? 'verdadera' : 'falsa') + '?',
      b: b, m: r.muestra(malas, Math.min(5, malas.length)),
      ex: 'Con p = ' + (p ? 'V' : 'F') + ' y q = ' + (q ? 'V' : 'F') + ': ' + FORMULAS.map(function (f) { return f + ' es ' + (evalua(f, p, q) ? 'V' : 'F'); }).join('; ') +
        '. Recuerda: la conjunción sólo es V si ambas lo son; la disyunción, si al menos una; la condicional sólo es F cuando p es V y q es F; la bicondicional, cuando tienen el mismo valor.' };
  }
  var PROPS = [['estudio', 'no estudio'], ['apruebo el examen', 'no apruebo el examen'], ['llueve', 'no llueve'], ['la calle se moja', 'la calle no se moja'],
    ['hace calor', 'no hace calor'], ['voy a la alberca', 'no voy a la alberca'], ['ahorro', 'no ahorro'], ['compro una bicicleta', 'no compro una bicicleta'],
    ['hay corriente eléctrica', 'no hay corriente eléctrica'], ['el foco enciende', 'el foco no enciende']];
  var CADENAS = [['estudio', 'apruebo el examen', 'me dan una beca'], ['llueve', 'la calle se moja', 'el piso se pone resbaloso'],
    ['hay corriente eléctrica', 'el foco enciende', 'hay luz en el cuarto'], ['ahorro', 'compro una bicicleta', 'llego más rápido a la escuela']];
  function mayus(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  function qReglaPalabras(r) {
    var par = r.muestra(PROPS.filter(function (_, i) { return i % 2 === 0; }), 1)[0], i = PROPS.indexOf(par), A = PROPS[i], B = PROPS[i + 1];
    var ch = r.elige(CADENAS), regla = r.elige(['Modus ponens', 'Modus tollens', 'Silogismo hipotético', 'Silogismo disyuntivo', 'Simplificación', 'Adición', 'Conjunción']);
    var pr;
    if (regla === 'Modus ponens') pr = ['Si ' + A[0] + ', entonces ' + B[0] + '.', mayus(A[0]) + '.', mayus(B[0]) + '.'];
    else if (regla === 'Modus tollens') pr = ['Si ' + A[0] + ', entonces ' + B[0] + '.', mayus(B[1]) + '.', mayus(A[1]) + '.'];
    else if (regla === 'Silogismo hipotético') pr = ['Si ' + ch[0] + ', entonces ' + ch[1] + '.', 'Si ' + ch[1] + ', entonces ' + ch[2] + '.', 'Si ' + ch[0] + ', entonces ' + ch[2] + '.'];
    else if (regla === 'Silogismo disyuntivo') pr = [mayus(A[0]) + ' o ' + B[0] + '.', mayus(A[1]) + '.', mayus(B[0]) + '.'];
    else if (regla === 'Simplificación') pr = [mayus(A[0]) + ' y ' + B[0] + '.', mayus(A[0]) + '.'];
    else if (regla === 'Adición') pr = [mayus(A[0]) + '.', mayus(A[0]) + ' o ' + B[0] + '.'];
    else pr = [mayus(A[0]) + '.', mayus(B[0]) + '.', mayus(A[0]) + ' y ' + B[0] + '.'];
    var txt = pr.slice(0, -1).map(function (x, k) { return 'Premisa ' + (k + 1) + '. ' + x; }).join('<br>') + '<br>Conclusión. Por lo tanto, ' + pr[pr.length - 1].charAt(0).toLowerCase() + pr[pr.length - 1].slice(1);
    return { p: '¿Qué regla de inferencia se usa?<br>' + txt,
      b: regla, m: ['Modus ponens', 'Modus tollens', 'Silogismo hipotético', 'Silogismo disyuntivo', 'Simplificación', 'Adición', 'Conjunción'].filter(function (x) { return x !== regla; }),
      ex: 'Modus ponens: si p entonces q; p; luego q. Modus tollens: si p entonces q; no q; luego no p. Silogismo hipotético: encadena dos condicionales. Silogismo disyuntivo: p o q; no p; luego q. Simplificación: de "p y q" sale p. Adición: de p sale "p o q". Conjunción: de p y de q sale "p y q".' };
  }
  function qReglaSimbolos(r) {
    var R2 = { 'Modus ponens': ['p → q', 'p', 'q'], 'Modus tollens': ['p → q', '¬q', '¬p'], 'Silogismo hipotético': ['p → q', 'q → r', 'p → r'],
      'Silogismo disyuntivo': ['p ∨ q', '¬p', 'q'], 'Simplificación': ['p ∧ q', 'p'], 'Adición': ['p', 'p ∨ q'], 'Conjunción': ['p', 'q', 'p ∧ q'] };
    var k = r.elige(Object.keys(R2)), f = R2[k];
    var txt = f.slice(0, -1).map(function (x, i) { return 'Premisa ' + (i + 1) + '. ' + x; }).join('<br>') + '<br>Conclusión. ∴ ' + f[f.length - 1];
    return { p: '¿Qué regla de inferencia se usa?<br>' + txt, b: k, m: Object.keys(R2).filter(function (x) { return x !== k; }) };
  }
  function qLeyesLogicas(r) {
    var L = [['¬(p ∧ q)', '¬p ∨ ¬q', ['¬p ∧ ¬q', 'p ∨ q', '¬p ∨ q', 'p ∧ ¬q'], 'Ley de De Morgan'],
      ['¬(p ∨ q)', '¬p ∧ ¬q', ['¬p ∨ ¬q', 'p ∧ q', '¬p ∨ q', 'p ∨ ¬q'], 'Ley de De Morgan'],
      ['p → q', '¬q → ¬p', ['q → p', '¬p → ¬q', 'p ∧ ¬q', '¬p ∧ q'], 'Contraposición'],
      ['¬¬p', 'p', ['¬p', 'p ∧ ¬p', 'p ∨ ¬p', '¬p ∨ q'], 'Doble negación'],
      ['p ∧ q', 'q ∧ p', ['p ∨ q', '¬p ∧ q', 'p → q', 'q → p'], 'Conmutatividad'],
      ['p → q', '¬p ∨ q', ['p ∨ ¬q', '¬p ∧ q', 'p ∧ q', '¬q ∨ ¬p'], 'Definición de la condicional']];
    var l = r.elige(L);
    return { p: '¿Con cuál de las siguientes proposiciones es equivalente <b>' + l[0] + '</b>?', b: l[1], m: l[2],
      ex: l[3] + ': ' + l[0] + ' equivale a ' + l[1] + '. Puedes comprobarlo con una tabla de verdad: tienen el mismo valor en todos los casos.' };
  }
  function qCasoCondicional(r) {
    var c = r.elige([['estudias', 'no estudias', 'apruebas', 'no apruebas'], ['llueve', 'no llueve', 'llevo paraguas', 'no llevo paraguas'],
      ['terminas la tarea', 'no terminas la tarea', 'sales a jugar', 'no sales a jugar']]);
    var bi = r.bool(0.35);
    var prop = bi ? '«' + mayus(c[2]) + ' si y sólo si ' + c[0] + '»' : '«Si ' + c[0] + ', entonces ' + c[2] + '»';
    var casos = [mayus(c[0]) + ' y ' + c[2], mayus(c[0]) + ' y ' + c[3], mayus(c[1]) + ' y ' + c[2], mayus(c[1]) + ' y ' + c[3]];
    if (!bi) return { p: 'Considere la proposición ' + prop + '. ¿En cuál de los siguientes casos es FALSA?', b: casos[1], m: [casos[0], casos[2], casos[3]],
      ex: 'Una condicional sólo es falsa cuando el antecedente es verdadero y el consecuente es falso. Si el antecedente es falso, la condicional es verdadera.' };
    return { p: 'Considere la proposición ' + prop + '. ¿En cuál de los siguientes casos es VERDADERA?', b: r.bool() ? casos[0] : casos[3],
      m: [casos[1], casos[2], 'En ninguno de estos casos'],
      ex: 'Una bicondicional es verdadera cuando las dos partes tienen el mismo valor: las dos verdaderas o las dos falsas.' };
  }
  var ARGUMENTOS = {
    'Deductivo': ['Todos los metales conducen la electricidad; el cobre es un metal; por lo tanto, el cobre conduce la electricidad.',
      'Todos los mamíferos tienen pulmones; las ballenas son mamíferos; por lo tanto, las ballenas tienen pulmones.'],
    'Inductivo': ['El primer cisne que vi era blanco, el segundo también y el tercero también; por lo tanto, todos los cisnes son blancos.',
      'Las últimas diez veces que comí camarones me dio alergia; seguramente siempre me dará alergia comerlos.'],
    'Analógico': ['Marte, como la Tierra, tiene atmósfera y agua congelada; como en la Tierra hay vida, en Marte también pudo haberla.',
      'Este libro es del mismo autor y del mismo género que el que me encantó; por lo tanto, también me va a gustar.'],
    'Abductivo': ['El pasto amaneció mojado; la mejor explicación es que llovió durante la noche.',
      'La computadora no enciende y el cable está suelto; lo más probable es que no le llegue corriente.']
  };
  function qTipoArgumento(r) {
    var q = clasifica(r, ARGUMENTOS, function (ej) { return '¿Qué tipo de argumento es el siguiente?' + cita(ej); });
    q.ex = 'Deductivo: de lo general a un caso particular (la conclusión es necesaria). Inductivo: de varios casos a una generalización probable. Analógico: por semejanza entre dos casos. Abductivo: la mejor explicación de un hecho.';
    return q;
  }
  var FALACIAS = {
    'Ad populum (apelación a la mayoría)': ['Este celular debe ser el mejor, porque es el que más gente compra.', 'Todos mis amigos lo hacen, así que no puede estar mal.'],
    'Ad ignorantiam (apelación a la ignorancia)': ['Nadie ha demostrado que los fantasmas no existen; por lo tanto, existen.', 'Como no se ha probado que ese remedio sea dañino, debe ser seguro.'],
    'Ad verecundiam (apelación a la autoridad)': ['Este shampoo es el mejor porque lo recomienda un futbolista famoso.', 'Debe ser cierto: lo dijo un actor muy conocido en la televisión.'],
    'Ad misericordiam (apelación a la piedad)': ['Profesor, apruébeme, porque si repruebo mis papás se pondrán muy tristes.', 'No me pueden multar: soy una persona humilde que ha sufrido mucho.'],
    'Ad baculum (apelación a la fuerza)': ['Si no votas por mi candidato, puedes perder tu empleo.', 'Más te vale estar de acuerdo conmigo si quieres seguir en el equipo.'],
    'Ad hominem (contra la persona)': ['No le creas su propuesta sobre el reciclaje: ni siquiera terminó la escuela.', 'Su opinión sobre economía no vale nada; es demasiado joven.'],
    'Petición de principio (petitio principii)': ['El chocolate es delicioso porque tiene un sabor muy rico.', 'Este libro dice la verdad porque así lo afirma el propio libro.'],
    'Hombre de paja': ['Ana propone usar menos el auto y Luis responde: "Ana quiere que dejemos de trabajar y vivamos sin transporte".',
      '"Hay que dar más tiempo de recreo." "O sea que no quieres que estudiemos nunca."']
  };
  function qFalacia(r) {
    var q = clasifica(r, FALACIAS, function (ej) { return '¿Qué falacia se comete en el siguiente razonamiento?' + cita(ej); });
    q.ex = 'Ad populum: "lo hace la mayoría". Ad ignorantiam: "no se ha probado lo contrario". Ad verecundiam: autoridad que no es experta. Ad misericordiam: provocar lástima. Ad baculum: amenaza. Ad hominem: atacar a la persona. Petición de principio: la conclusión ya está en la premisa. Hombre de paja: deformar lo que dijo el otro.';
    return q;
  }
  function qCualCircular(r) {
    var circ = FALACIAS['Petición de principio (petitio principii)'];
    var otras = [];
    Object.keys(FALACIAS).forEach(function (k) { if (k.indexOf('Petición') !== 0) otras = otras.concat(FALACIAS[k]); });
    return { p: '¿En cuál de los siguientes razonamientos se comete una petición de principio (la conclusión ya está supuesta en la premisa)?',
      b: r.elige(circ), m: r.muestra(otras, 5), ex: 'En la petición de principio se da por probado lo mismo que se quiere demostrar: el argumento da vueltas en círculo.' };
  }

  /* ---------- 2.5 Problemas filosoficos ---------- */
  function qSer(r) {
    var q = clasifica(r, { 'La historicidad del ser': ['En la antigüedad las personas definían su ser por su relación con los dioses; hoy lo entendemos por la ciencia y la cultura',
        'Nuestra forma de entender quiénes somos cambia según la época en que vivimos'],
      'La experiencia estética': ['Contemplar un atardecer nos hace reflexionar sobre lo que significa existir', 'Escuchar una canción que nos emociona nos conecta con nuestro ser más profundo'],
      'La dialéctica del ser': ['Entendemos la alegría porque hemos conocido la tristeza', 'Reconocemos lo que es ser libres porque sabemos lo que es sentirse limitados'] },
      function (ej) { return '¿Qué concepto sobre el sentido de la vida se ilustra?' + cita(ej + '.'); }, ['La alienación', 'El determinismo']);
    q.ex = 'Historicidad: el ser cambia con el tiempo y la historia. Experiencia estética: la belleza nos conecta con lo que somos. Dialéctica: el ser se define por sus opuestos y por el cambio.';
    return q;
  }
  function qEtapaComte(r) {
    var E = { 'Teológica': 'Las personas explicaban el mundo por medio de mitos y religiones', 'Metafísica': 'Se buscaban explicaciones filosóficas más abstractas',
      'Positiva': 'La ciencia se convierte en la principal guía para comprender y transformar la realidad' };
    var k = r.elige(Object.keys(E));
    return { p: 'Según Auguste Comte, la historia humana pasa por tres etapas. ¿A cuál corresponde la descripción?' + cita(E[k] + '.'), b: 'Etapa ' + k.toLowerCase(),
      m: Object.keys(E).filter(function (x) { return x !== k; }).map(function (x) { return 'Etapa ' + x.toLowerCase(); }).concat(['Etapa dialéctica']),
      ex: 'Comte: etapa teológica (mitos y religión), metafísica (explicaciones abstractas) y positiva (la ciencia).' };
  }
  function qObjetivacion(r) {
    var q = clasifica(r, { 'Objetivación': ['Un gerente trata a sus empleados como si fueran máquinas que sólo deben producir', 'Una empresa ve a sus clientes únicamente como números para vender más'],
      'Alienación': ['Un obrero arma piezas todo el día sin saber para qué sirven y siente que su trabajo no tiene sentido', 'Lucía siente que su vida la deciden otros y ya no se reconoce en lo que hace'] },
      function (ej) { return '¿Qué problema de la existencia se describe?' + cita(ej + '.'); }, ['Acción comunicativa', 'Ataraxia']);
    q.ex = 'La objetivación reduce a las personas a simples herramientas; la alienación es la desconexión con lo que hacemos o somos. Ambas nos alejan de una existencia auténtica.';
    return q;
  }
  function qHabermas(r) {
    var q = clasifica(r, { 'La acción comunicativa': ['En una junta de vecinos todos opinan, se escuchan y llegan a un acuerdo que beneficia a todos',
        'Un grupo de amigos organiza una fiesta dialogando abiertamente hasta llegar a decisiones que convienen a todos'],
      'La ética del discurso': ['En una discusión escolar, nadie impone su punto de vista y todos tienen derecho a expresar sus ideas y a ser escuchados sin prejuicios',
        'En un debate familiar se respeta que cada quien hable en igualdad y se busca el entendimiento mutuo'] },
      function (ej) { return '¿Qué idea de Jürgen Habermas se aplica en la situación?' + cita(ej + '.'); }, ['La alienación', 'El imperativo categórico']);
    q.ex = 'Ética del discurso: dialogar en igualdad, con derecho a hablar y ser escuchado. Acción comunicativa: comunicarse para entenderse y construir acuerdos con razones y respeto.';
    return q;
  }

  P.temaBanco({
    id: 'prepa-filosofia',
    grupo: 'Humanidades',
    nombre: 'Filosofia',
    descripcion: 'Saberes (mito, ciencia, filosofia), caracteristicas y disciplinas de la filosofia, metafisica y metodos filosoficos. Reactivos 1 a 8 del area.',
    etiquetas: ['filosofia', 'mito', 'metafisica', 'hermeneutica'],
    niveles: {
      facil: ['tipoSaber', 'mitoCiencia'],
      medio: ['vision', 'caracteristicas', 'disciplinas', 'corrientes'],
      dificil: ['metafisica', 'metodos']
    },
    items: [
      { s: 'tipoSaber', n: 'Tipos de saber', v: [
        { p: 'Identifique el área de estudio a la que pertenece el siguiente problema:<br><i>El conocimiento humano no puede ser medido ni determinado; es un error suponer que la verdad reside en leyes invariables y cuantificables. El conocimiento surge de las cualidades de la especie y de la ideología de su época.</i>',
          b: 'Filosófico', m: ['Científico', 'Mitológico', 'Teológico'] },
        { p: 'Identifique el tipo de saber del siguiente texto:<br><i>El dios del maíz entregó a los hombres su cuerpo hecho de mazorca para que pudieran vivir, y por eso cada año se le ofrecen las primeras cosechas.</i>',
          b: 'Mitológico', m: ['Científico', 'Filosófico', 'Técnico'] },
        { p: 'Identifique el tipo de saber del siguiente texto:<br><i>Se midió la temperatura de ebullición del agua en distintas altitudes y se comprobó que disminuye conforme baja la presión atmosférica.</i>',
          b: 'Científico', m: ['Filosófico', 'Mitológico', 'Teológico'] },
        qSaber, qSaber, qSaber
      ] },
      { s: 'mitoCiencia', n: 'Mito, ciencia y filosofia', v: [
        { c: 'La ___ es un conjunto de relatos fabulosos que intentan explicar el origen del universo y de los seres que lo habitan. La ___, por su parte, estudia la naturaleza con base en la observación y la experimentación.',
          b: ['mitología', 'ciencia'], m: [['historia', 'metafísica'], ['ciencia', 'religión'], ['filosofía', 'historia'], ['religión', 'mitología']] },
        { c: 'La ___ busca explicar la realidad mediante la razón y la argumentación, mientras que la ___ la explica a partir de la fe y la revelación divina.',
          b: ['filosofía', 'teología'], m: [['ciencia', 'mitología'], ['teología', 'filosofía'], ['historia', 'ciencia'], ['mitología', 'ciencia']] },
        { rel: 'Relacione cada forma de saber con su característica.', cols: ['Saber', 'Característica'],
          pares: [['Mito', 'Explica el origen del universo y del ser humano con relatos fantásticos y seres sobrenaturales'],
            ['Filosofía', 'Busca la verdad mediante la razón y la reflexión crítica'],
            ['Ciencia', 'Describe el mundo de manera objetiva con observación, experimentación e hipótesis que se prueban'],
            ['Teología', 'Explica la realidad a partir de la fe y la revelación divina']],
          extra: ['Se basa en lo que la mayoría cree, sin comprobarlo'] },
        { p: 'El paso del pensamiento mítico al filosófico se dio cuando los fenómenos empezaron a explicarse por medio de:', b: 'la razón y de causas naturales (causa y efecto)',
          m: ['la voluntad de los dioses', 'los relatos de los ancianos', 'la revelación divina', 'la inspiración de los poetas'] },
        { lista: 'Del siguiente listado, identifique los factores que contribuyeron al surgimiento de la filosofía en la antigua Grecia.',
          si: ['La intensa vida política', 'El comercio con otros pueblos', 'La observación de los fenómenos naturales', 'El deseo de dar explicaciones racionales'],
          no: ['La invención de la imprenta', 'La conquista de América', 'El descubrimiento de la electricidad'] }
      ] },
      { s: 'vision', n: 'Vision de la filosofia', v: [
        { p: 'Identifique el tipo de visión que caracteriza a la filosofía en la siguiente descripción:<br><i>Lo bueno se vincula al juicio; éste surge de la ideología y de las circunstancias sociales, naturales o metafísicas del ser humano, que deben verse en conjunto.</i>',
          b: 'Totalizadora', m: ['Científica', 'Determinista', 'Teológica'] },
        { p: 'La filosofía no se conforma con respuestas superficiales y busca las causas últimas de las cosas. Esta característica se conoce como:',
          b: 'radicalidad', m: ['universalidad', 'racionalidad', 'empirismo'] },
        { p: 'La filosofía se centra en el estudio de cuestiones fundamentales. ¿Cuál de los siguientes grupos de temas le corresponde?', b: 'La existencia, el conocimiento, la verdad, la moral, la mente y el lenguaje',
          m: ['Las reacciones químicas, los átomos y las moléculas', 'Las leyes de la física y el movimiento de los planetas', 'Los precios, la oferta y la demanda', 'Los relatos de dioses y héroes'] }
      ] },
      { s: 'caracteristicas', n: 'Caracteristicas de la filosofia', v: [
        { p: 'Cuando se busca explicar de manera integral la totalidad de lo que existe, nos referimos a la:', b: 'universalidad', m: ['fundamentalidad', 'racionalidad', 'radicalidad'] },
        { p: 'Cuando la filosofía fundamenta sus explicaciones en argumentos lógicos y no en la fe o la tradición, hablamos de su:', b: 'racionalidad', m: ['universalidad', 'radicalidad', 'totalidad'] },
        qRasgoFilosofia, qRasgoFilosofia, qRasgoFilosofia
      ] },
      { s: 'metafisica', n: 'Objeto de la metafisica', v: [
        { p: 'Identifique dos objetos de estudio de la metafísica en el caso:<br><i>El origen de todas las cosas debe ser el mismo que las aleja de la extinción total; el cosmos parece haberse dispuesto casi por azar.</i>',
          b: 'Ser y existir', m: ['Razón y origen', 'Reflexión y Dios', 'Verdad y saber'] },
        { p: 'La rama de la filosofía que estudia el ser en cuanto ser (lo que es y existe) es la:', b: 'ontología', m: ['estética', 'lógica', 'epistemología'] },
        { p: '¿Qué rama de la filosofía trata de entender qué es el ser, qué significa existir y cuál es la naturaleza de todo lo que existe?', b: 'Metafísica',
          m: ['Epistemología', 'Lógica', 'Ética', 'Estética'] },
        { p: '¿Cuál de las siguientes preguntas es propia de la metafísica?', b: '¿Por qué existe algo en lugar de nada?',
          m: ['¿Cómo sé si un argumento es válido?', '¿Qué hace bella a una obra de arte?', '¿Es correcto mentir para ayudar a un amigo?', '¿Cuáles son los límites del conocimiento humano?'] }
      ] },
      { s: 'disciplinas', n: 'Disciplinas filosoficas', v: [
        { p: 'Las siguientes son disciplinas de la filosofía, excepto:', b: 'utopía', m: ['estética', 'lógica', 'ontología', 'epistemología'] },
        { rel: 'Relacione la disciplina filosófica con su objeto de estudio.', cols: ['Disciplina', 'Estudia'],
          pares: [['Ética', 'La moral y los actos humanos'], ['Estética', 'La belleza y el arte'], ['Lógica', 'Las reglas del razonamiento correcto'],
            ['Epistemología', 'El conocimiento científico'], ['Ontología', 'El ser en cuanto ser']] },
        qRama, qRama, qRama
      ] },
      { s: 'metodos', n: 'Metodos filosoficos', v: [
        { p: 'Sergio interpreta los textos religiosos de forma literal; Agustín dice que, para comprenderlos, hay que considerar sus circunstancias históricas y culturales. ¿En qué método filosófico se basa Agustín?',
          b: 'Hermenéutico', m: ['Dialéctico', 'Empírico', 'Fenomenológico'] },
        { p: 'El método que avanza por la confrontación de una tesis con su antítesis para llegar a una síntesis es el:', b: 'dialéctico', m: ['hermenéutico', 'fenomenológico', 'mayéutico'] },
        { p: 'El método de Sócrates, que por medio de preguntas ayuda al interlocutor a descubrir la verdad por sí mismo, es la:', b: 'mayéutica', m: ['dialéctica hegeliana', 'hermenéutica', 'fenomenología'] },
        qMetodo, qMetodo, qMetodo,
        { p: '¿Quién creó el método que parte de la duda metódica: dudar de todo lo que no sea completamente cierto?', b: 'René Descartes',
          m: ['Sócrates', 'Santo Tomás de Aquino', 'John Locke', 'Georg Hegel'] },
        { p: '¿Qué filósofos afirmaban que la mente al nacer es como una hoja en blanco que se llena con lo que percibimos por los sentidos (empirismo)?', b: 'John Locke y David Hume',
          m: ['René Descartes y Gottfried Leibniz', 'Platón y Sócrates', 'Santo Tomás y San Agustín', 'Hegel y Marx'] }
      ] },
      { s: 'corrientes', n: 'Corrientes filosoficas', v: [
        { p: 'La corriente que sostiene que la realidad que percibimos depende de las ideas y de la conciencia del sujeto se conoce como:', b: 'idealismo', m: ['materialismo', 'empirismo', 'positivismo'] },
        { p: 'La corriente que afirma que todo conocimiento proviene de la experiencia sensible es el:', b: 'empirismo', m: ['racionalismo', 'idealismo', 'existencialismo'] },
        { p: 'La corriente que afirma que la razón es la fuente principal del conocimiento (Descartes) es el:', b: 'racionalismo', m: ['empirismo', 'materialismo', 'pragmatismo'] },
        { rel: 'Relacione cada corriente filosófica con su idea principal.', cols: ['Corriente', 'Idea principal'],
          pares: [['Idealismo', 'La realidad depende de las ideas y de la conciencia del sujeto'], ['Materialismo', 'Todo lo que existe es materia; la conciencia es un producto de ella'],
            ['Empirismo', 'Todo conocimiento proviene de la experiencia sensible'], ['Racionalismo', 'La razón es la fuente principal del conocimiento'],
            ['Existencialismo', 'El ser humano es libre y responsable de dar sentido a su propia vida'], ['Positivismo', 'Sólo vale el conocimiento basado en hechos observables y comprobables']] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-etica',
    grupo: 'Humanidades',
    nombre: 'Etica',
    descripcion: 'Reflexion etica, corrientes eticas, bioetica, libertad y determinismo, conciencia, utopia y derechos. Reactivos 9 a 25 del area.',
    etiquetas: ['etica', 'moral', 'utilitarismo', 'estoicismo', 'determinismo', 'utopia', 'derechos'],
    niveles: {
      facil: ['disciplinaEtica', 'ethos', 'antropocentrismo', 'determinismo', 'utopia'],
      medio: ['aristoteles', 'utilitarismo', 'ataraxia', 'biocentrismo', 'libertad', 'pensamientoUtopico', 'derechoConsuetudinario'],
      dificil: ['reflexionEtica', 'estoicismo', 'conciencia', 'equidad', 'consuetudinario']
    },
    items: [
      { s: 'reflexionEtica', n: 'Reflexion etica', v: [
        { lista: '¿Cuáles de las siguientes son características de una reflexión ética?',
          si: ['Los actos humanos se vuelven objeto del pensamiento', 'Se caracteriza por su generalidad', 'Produce conceptos'],
          no: ['Es una reflexión relativa a cada persona', 'Son leyes o normas obligatorias', 'Se basa en la fe'] },
        { p: 'Como ciencia normativa, la ética se enfoca principalmente en:', b: 'los valores, la conciencia y la libertad para tomar decisiones responsables',
          m: ['las leyes de la naturaleza y la materia', 'las reglas para razonar sin contradicciones', 'la belleza de las obras de arte', 'la historia de las religiones'] },
        { p: 'Según la guía, ¿cuál es el propósito de la ética?', b: 'Fomentar la responsabilidad moral y guiar hacia el bien individual y colectivo',
          m: ['Imponer leyes que todos deben obedecer', 'Describir cómo funciona el universo', 'Demostrar teoremas matemáticos', 'Explicar el origen de los mitos'] }
      ] },
      { s: 'disciplinaEtica', n: 'Que estudia la etica', v: [
        { p: 'Seleccione la disciplina filosófica que estudia los fundamentos de las normas que rigen las relaciones entre los seres humanos.', b: 'Ética', m: ['Estética', 'Lógica', 'Metafísica'] },
        { c: 'La ___ es el conjunto de normas y costumbres de una sociedad, mientras que la ___ es la reflexión filosófica sobre esas normas.',
          b: ['moral', 'ética'], m: [['ética', 'moral'], ['ley', 'política'], ['moral', 'religión']] },
        qEticaMoral, qEticaMoral, qEticaMoral
      ] },
      { s: 'ethos', n: 'Ethos', v: [
        { p: '¿Cuál es el significado del concepto griego <i>ethos</i>?', b: 'Hábito y costumbre', m: ['Justicia', 'Lo bueno y lo bello', 'Razón'] },
        { p: 'La palabra latina <i>mos, moris</i>, de la que viene "moral", significa:', b: 'costumbre', m: ['ley', 'virtud', 'felicidad'] },
        { rel: 'Relacione cada concepto de la ética de Aristóteles con su significado.', cols: ['Concepto', 'Significado'],
          pares: [['Eudaimonía', 'Felicidad o florecimiento humano, el fin último de la vida'], ['Areté', 'Virtud entendida como excelencia para cumplir la función propia del ser humano'],
            ['Aghatós', 'Lo bueno o lo virtuoso'], ['Ethos', 'Carácter que se forma con la práctica constante de acciones virtuosas']],
          extra: ['Tranquilidad del alma libre de perturbaciones'] },
        { p: 'Según la guía, el ethos de una persona:', b: 'se forma con la práctica constante de acciones virtuosas, influido por la sociedad y la educación',
          m: ['es algo con lo que se nace y ya no cambia', 'depende sólo de la herencia genética', 'lo impone el Estado por medio de leyes', 'es igual en todas las culturas'] }
      ] },
      { s: 'aristoteles', n: 'Etica de Aristoteles', v: [
        { p: 'Las siguientes frases expresan el pensamiento de Aristóteles sobre el bien, excepto:', b: 'nada es bueno si no me es propio',
          m: ['cada ser será bueno si cumple con el fin que le es propio', 'el fin o el bien propio del ser humano es la felicidad', 'la virtud es el justo medio entre el exceso y el defecto'] },
        { p: 'Para Aristóteles, la valentía es el justo medio entre:', b: 'la cobardía y la temeridad', m: ['la avaricia y el derroche', 'la tristeza y la alegría', 'la humildad y la soberbia'] },
        qJustoMedio, qJustoMedio,
        { p: 'Para Aristóteles, todas las acciones humanas se orientan a un fin último, el bien supremo, que es:', b: 'la felicidad (eudaimonía)',
          m: ['el placer', 'la riqueza', 'el poder político', 'la fama'] }
      ] },
      { s: 'utilitarismo', n: 'Corrientes eticas', v: [
        { p: 'Un tranvía sin control va hacia cinco personas atadas a la vía; si se acciona un botón, cambiará a otra vía donde hay una persona. ¿Qué corriente ética, que busca el mayor bien para el mayor número, da bases para resolverlo?',
          b: 'Utilitarismo', m: ['Contractualismo', 'Estoicismo', 'Hedonismo'] },
        { p: 'La corriente ética que considera que el placer es el bien supremo y que debe buscarse evitando el dolor es el:', b: 'hedonismo', m: ['estoicismo', 'utilitarismo', 'contractualismo'] },
        { p: 'Kant afirma que debemos actuar de modo que nuestra regla de acción pueda volverse ley universal. Esto se conoce como:', b: 'imperativo categórico', m: ['imperativo hipotético', 'justo medio', 'principio de utilidad'] },
        qTeoriaEtica, qTeoriaEtica, qTeoriaEtica, qTeoriaEtica
      ] },
      { s: 'estoicismo', n: 'Estoicismo', v: [
        { p: 'Las siguientes ideas se explican desde el estoicismo, excepto:', b: 'la felicidad del hombre radica en el placer de sus experiencias',
          m: ['no debemos ser esclavos de nuestros deseos', 'lo que se presenta puede ser una oportunidad para superar obstáculos', 'hay que aceptar con serenidad lo que no depende de nosotros'] },
        { p: 'El estoicismo enseña que la virtud consiste en:', b: 'controlar las pasiones y aceptar con serenidad lo que no podemos cambiar',
          m: ['buscar el mayor placer posible', 'producir el mayor bien para el mayor número', 'respetar un contrato social', 'actuar por la intención y no por las consecuencias'] },
        { lista: 'Del siguiente listado, identifique las ideas propias del estoicismo.', si: ['Aceptar lo que no depende de nosotros', 'Controlar las pasiones', 'Vivir conforme a la razón'],
          no: ['El placer es el bien supremo', 'Lo correcto es lo que beneficia a la mayoría', 'La moral nace de un contrato social'] }
      ] },
      { s: 'ataraxia', n: 'Ataraxia', v: [
        { p: 'Las siguientes son características de la ataraxia, excepto:', b: 'culpabilidad', m: ['ausencia de perturbación', 'búsqueda de la felicidad', 'serenidad'] },
        { p: 'Para Epicuro, el estado de tranquilidad del alma, libre de perturbaciones, se llama:', b: 'ataraxia', m: ['apatía', 'eudaimonía', 'catarsis'] },
        { p: '¿Qué filósofo hedonista afirmaba que el placer no es sólo disfrutar de cosas materiales, sino alcanzar la tranquilidad del alma?', b: 'Epicuro',
          m: ['Aristóteles', 'Immanuel Kant', 'Séneca', 'John Stuart Mill'] }
      ] },
      { s: 'antropocentrismo', n: 'Antropocentrismo', v: [
        { p: 'Identifique el enunciado que hace referencia al antropocentrismo.', b: 'El mundo natural existe para beneficio de los seres humanos',
          m: ['El ser humano es parte de la totalidad del sistema', 'Todos los seres vivos tienen un valor propio, independiente de su utilidad', 'Los seres humanos tienen la obligación moral de proteger el ambiente'] },
        qEnfoqueVida, qEnfoqueVida
      ] },
      { s: 'biocentrismo', n: 'Criterios bioeticos', v: [
        { p: 'Sergio defiende prohibir los espectáculos con animales porque son seres sintientes que merecen respeto. ¿A qué criterio ético corresponde su postura?',
          b: 'Biocentrismo', m: ['Antropocentrismo', 'Ecocentrismo', 'Teocentrismo'] },
        { p: 'Lucía sostiene que lo valioso es el ecosistema completo (ríos, bosques, especies) y no sólo cada ser vivo por separado. ¿A qué criterio corresponde?',
          b: 'Ecocentrismo', m: ['Biocentrismo', 'Antropocentrismo', 'Teocentrismo'] },
        qEnfoqueVida,
        { p: 'Según la guía, ¿cuál es el desafío ético frente a los derechos de otros seres vivos?', b: 'Satisfacer las necesidades humanas respetando a otros seres vivos y preservando el ambiente',
          m: ['Usar la naturaleza sin límites para producir más', 'Prohibir cualquier uso de los recursos naturales', 'Dejar las decisiones sólo a las empresas', 'Proteger únicamente a los animales domésticos'] }
      ] },
      { s: 'libertad', n: 'Determinismo y libertad', v: [
        { p: 'Edson cree que le va mal por la posición de los astros; Edwin responde que se debe a las decisiones que ha tomado. ¿A qué noción ética corresponde la discusión?',
          b: 'Determinismo y libertad', m: ['Autonomía y heteronomía', 'Capitalismo y socialismo', 'Marxismo y leninismo'] },
        { p: 'Ana cumple el reglamento sólo por miedo al castigo; Rosa lo cumple porque está convencida de que es correcto. ¿Qué nociones éticas ilustran?',
          b: 'Heteronomía y autonomía', m: ['Determinismo y libertad', 'Utopía y distopía', 'Hedonismo y estoicismo'] },
        { rel: 'Relacione cada concepto con su significado.', cols: ['Concepto', 'Significado'],
          pares: [['Autonomía', 'Capacidad de darse uno mismo sus propias normas'], ['Heteronomía', 'Seguir normas impuestas desde fuera, por miedo o presión'],
            ['Determinismo', 'Todo lo que ocurre, incluso nuestras decisiones, está regido por causas previas'], ['Responsabilidad', 'Capacidad de responder por nuestras decisiones']],
          extra: ['Búsqueda del placer y huida del dolor'] },
        { p: 'Para los antiguos griegos, la libertad consistía en:', b: 'no pertenecer a otro y ser soberano de uno mismo y de sus actos',
          m: ['tener muchas riquezas', 'obedecer siempre a los dioses', 'hacer lo que decida la mayoría', 'no tener ninguna responsabilidad'] }
      ] },
      { s: 'determinismo', n: 'Determinismo', v: [
        { p: 'Los seguidores de esta doctrina indican que todos los sucesos, incluidos los pensamientos y las decisiones morales, están regidos por causas previas.', b: 'Determinismo', m: ['Autonomía', 'Conciencia', 'Libertad'] },
        { p: 'La capacidad de una persona de darse a sí misma sus propias normas morales se llama:', b: 'autonomía', m: ['heteronomía', 'determinismo', 'alienación'] },
        qNormas, qNormas,
        { p: 'Según la guía, ¿por qué la libertad es esencial en la ética?', b: 'Porque sin libertad no tendría sentido hablar de moralidad ni de responsabilidad',
          m: ['Porque permite hacer cualquier cosa sin consecuencias', 'Porque la ley la exige', 'Porque sólo los filósofos son libres', 'Porque el destino ya está escrito'] }
      ] },
      { s: 'conciencia', n: 'Tipos de conciencia', v: [
        { rel: 'Relacione cada concepto con el ejemplo que le corresponde.', cols: ['Concepto', 'Ejemplo'],
          pares: [['Conciencia', 'Tener presente que en mi colonia están aumentando los asaltos'],
            ['Autoconciencia', 'Tener presente que los asaltos también me pueden pasar a mí'],
            ['Conciencia social', 'Tener presente que los asaltos son una consecuencia del desempleo'],
            ['Conciencia política', 'Tener presente que los asaltos pueden disminuir si mejoran las políticas laborales']] },
        { rel: 'Relacione cada tipo de conciencia con su definición.', cols: ['Conciencia', 'Definición'],
          pares: [['Autoconciencia', 'Reconocer el propio papel y la propia responsabilidad en la sociedad'],
            ['Conciencia social', 'Empatía y compromiso con las necesidades y los derechos de los otros'],
            ['Conciencia política', 'Comprender las relaciones de poder y participar de forma crítica en las decisiones colectivas']],
          extra: ['Aceptar sin reflexión las normas de la mayoría'] }
      ] },
      { s: 'equidad', n: 'Conflictos de derechos', v: [
        { p: 'En una comunidad se debate instalar cámaras de vigilancia para mejorar la seguridad, pero algunos vecinos dicen que invaden su privacidad. ¿Qué medida resuelve mejor el conflicto entre ambos derechos?',
          b: 'Establecer reglas estrictas de acceso y uso de las imágenes grabadas', m: ['Limitar las cámaras sólo a zonas de alta criminalidad', 'Prohibir por completo las cámaras en lugares públicos', 'Instalar cámaras en todas las casas'] },
        qDerecho, qDerecho,
        { p: '¿Cuándo entran en tensión los derechos individuales y los colectivos?', b: 'Cuando una libertad individual afecta a los demás o cuando las normas del bien común limitan demasiado la autonomía personal',
          m: ['Nunca, porque siempre coinciden', 'Sólo cuando hay elecciones', 'Sólo en los países sin constitución', 'Cuando una persona cambia de domicilio'] }
      ] },
      { s: 'utopia', n: 'Proyecto utopico', v: [
        { p: 'Una comunidad establece un proyecto en el que todos trabajan y se ayudan, no hay propiedad privada y todos tienen acceso a educación, salud y vivienda. Se basa en un proyecto:',
          b: 'utópico', m: ['distópico', 'totalitario', 'liberal'] },
        { p: 'Una novela describe una sociedad futura vigilada todo el tiempo, sin libertad y controlada por un gobierno opresor. Es un ejemplo de:',
          b: 'distopía', m: ['utopía', 'humanismo', 'democracia'] },
        { p: 'Según la guía, la utopía no es un sueño inalcanzable, sino:', b: 'una guía que orienta las acciones hacia un orden más justo, solidario y digno',
          m: ['una sociedad que ya existe en algún país', 'un plan económico del gobierno', 'una forma de evadir la realidad', 'una ley que todos deben cumplir'] }
      ] },
      { s: 'pensamientoUtopico', n: 'Pensamiento utopico', v: [
        { c: 'El pensamiento utópico es una forma de reflexión sobre la vida ___, cuya característica principal es que el ser humano, mediante el uso de la ___, puede alcanzar una organización social perfecta.',
          b: ['política', 'razón'], m: [['económica', 'emoción'], ['religiosa', 'fe'], ['cultural', 'tradición']] },
        { p: '¿Quién escribió <i>Utopía</i> (1516), obra que dio nombre a este tipo de pensamiento?', b: 'Tomás Moro', m: ['Platón', 'Karl Marx', 'Tomás Campanella'] },
        { p: '¿Qué obra de Tommaso Campanella describe una sociedad ideal?', b: '<i>La ciudad del Sol</i>', m: ['<i>Utopía</i>', '<i>La República</i>', '<i>El príncipe</i>', '<i>Leviatán</i>'] },
        { p: 'En <i>La República</i>, Platón describe una sociedad ideal gobernada por:', b: 'los filósofos', m: ['los comerciantes', 'los guerreros', 'los sacerdotes', 'el pueblo en asamblea'] }
      ] },
      { s: 'consuetudinario', n: 'Derechos humanos y usos y costumbres', v: [
        { p: '¿Cuál de los siguientes ejemplos plantea una tensión entre derechos humanos y derechos consuetudinarios (usos y costumbres)?',
          b: 'Una comunidad que, por tradición, no permite votar a las mujeres en la asamblea', m: ['La explotación laboral infantil de una marca trasnacional', 'La producción de ganado en una comunidad agrícola', 'El cobro de impuestos federales'] },
        { p: 'Los derechos humanos son universales. Esto significa que:', b: 'se aplican a todas las personas en cualquier parte del mundo',
          m: ['sólo valen en el país donde se nace', 'dependen de la religión de cada persona', 'se pueden vender o transferir', 'sólo los tienen los mayores de edad'] },
        { p: 'Los derechos humanos están conectados entre sí. Esto significa que:', b: 'no se pueden separar, porque el respeto de unos afecta a los otros',
          m: ['cada derecho se puede cumplir sin tomar en cuenta los demás', 'sólo se respetan si hay internet', 'el gobierno elige cuáles respetar', 'sólo protegen a las personas de un mismo país'] }
      ] },
      { s: 'derechoConsuetudinario', n: 'Derecho consuetudinario', v: [
        { p: '¿Cuál de las siguientes situaciones tiene que ver con los derechos consuetudinarios de los pueblos originarios?',
          b: 'Determinar si un grupo étnico puede recibir educación en su lengua materna', m: ['Evaluar la situación económica de una comunidad', 'Documentar la biodiversidad de un área natural protegida', 'Explicar las leyes de tránsito de una ciudad'] },
        { p: 'El derecho consuetudinario se basa principalmente en:', b: 'las costumbres y tradiciones de una comunidad', m: ['las leyes escritas por el Congreso', 'los tratados internacionales', 'las decisiones de los jueces federales'] },
        { p: 'El derecho consuetudinario surge cuando:', b: 'no hay leyes escritas y la comunidad sigue costumbres y reglas que todos aceptan',
          m: ['el Congreso aprueba una nueva ley', 'un juez dicta sentencia', 'se firma un tratado internacional', 'el presidente publica un decreto'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-logica',
    grupo: 'Humanidades',
    nombre: 'Logica y argumentacion',
    descripcion: 'Premisas y conclusion, condicionales, leyes logicas, reglas de inferencia, conectivas, validez y falacias. Reactivos 26 a 35 del area.',
    etiquetas: ['logica', 'premisa', 'modus ponens', 'falacia', 'silogismo'],
    niveles: {
      facil: ['premisas', 'conector', 'falacias'],
      medio: ['modusPonens', 'modusTollens', 'conectivas', 'validez'],
      dificil: ['condicional', 'adicion', 'peticionPrincipio']
    },
    items: [
      { s: 'premisas', n: 'Premisas (multirreactivo)', v: [
        { lec: ARG[0], p: 'Los siguientes enunciados son premisas del razonamiento anterior, excepto:', b: 'los conejos son las mejores mascotas',
          m: ['los conejos son animales muy inteligentes', 'su alimentación es muy económica', 'los conejos no ladran'], ex: '"Los conejos son las mejores mascotas" es la conclusión.' },
        { lec: ARG[1], p: 'Los siguientes enunciados son premisas del razonamiento anterior, excepto:', b: 'la bicicleta es el mejor medio de transporte para ir a la escuela',
          m: ['la bicicleta no contamina', 'hacer ejercicio diario mejora la salud', 'en la ciudad se evita el tráfico'], ex: 'Lo que viene después de "por lo tanto" es la conclusión.' },
        { lec: ARG[2], p: '¿Cuál es la conclusión del razonamiento anterior?', b: 'todos los jóvenes deberían leer al menos un libro al mes',
          m: ['leer amplía el vocabulario', 'la lectura mejora la concentración', 'los libros nos permiten conocer otras épocas y lugares'], ex: 'Lo que viene después de "en conclusión" es la conclusión; lo demás son premisas que la apoyan.' },
        { lec: ARG[3], p: 'Los siguientes enunciados son premisas del razonamiento anterior, excepto:', b: 'conviene sustituirlos por alimentos naturales en el refrigerio escolar',
          m: ['los ultraprocesados tienen mucha azúcar y sal', 'su consumo frecuente se relaciona con la obesidad', 'suelen costar más que la fruta de temporada'], ex: '"Así que" introduce la conclusión.' }
      ] },
      { s: 'conector', n: 'Conector de conclusion (multirreactivo)', v: [
        { lec: ARG[0], p: '¿Cuál es el conector que indica la conclusión del razonamiento anterior?', b: 'Entonces', m: ['Lo más importante', 'Para empezar', 'Por si no fuera suficiente'] },
        { lec: ARG[1], p: '¿Cuál es el conector que indica la conclusión del razonamiento anterior?', b: 'Por lo tanto', m: ['En primer lugar', 'Además', 'Sobre todo'] },
        { lec: ARG[2], p: '¿Cuál es el conector que indica la conclusión del razonamiento anterior?', b: 'En conclusión', m: ['Primero', 'También', 'Más aún'] },
        { lec: ARG[3], p: '¿Cuál es el conector que indica la conclusión del razonamiento anterior?', b: 'Así que', m: ['En primer término', 'Asimismo', 'Por si fuera poco'] }
      ] },
      { s: 'condicional', n: 'Condicional y bicondicional', v: [
        { p: 'Los papás de Mateo le dijeron: "Si lavas los trastes, vas al cine". Él los lavó, pero no lo dejaron ir porque reprobó Física. Mateo dice que no cumplieron. ¿Quién tiene razón?',
          b: 'Sus papás, porque "si lavas los trastes vas al cine" no implica que lavar trastes sea la única condición',
          m: ['Mateo, porque "si lavas los trastes vas al cine" implica que lavar trastes es la única condición', 'Sus papás, porque "si y sólo si" no implica una condición necesaria y suficiente', 'Mateo, porque una condicional siempre es falsa'] },
        qCasoCondicional, qCasoCondicional, qCasoCondicional
      ] },
      { s: 'adicion', n: 'Leyes logicas', v: [
        { p: 'Justina acepta que "Naucalpan es más violento que Chimalhuacán". Daniel dice que entonces también es verdad "Naucalpan es más violento que Chimalhuacán o mi uniforme es morado". Justina dice que es falso porque su uniforme es gris. ¿Quién tiene razón?',
          b: 'Daniel, porque está aplicando la ley de la adición', m: ['Justina, porque una de las proposiciones es falsa', 'Justina, porque se basa en la experiencia', 'Daniel, porque está aplicando la disyunción exclusiva'],
          ex: 'Una disyunción (o) es verdadera si al menos una de sus partes es verdadera.' },
        qLeyesLogicas, qLeyesLogicas, qLeyesLogicas
      ] },
      { s: 'modusPonens', n: 'Reglas de inferencia', v: [
        { p: '¿Qué regla de inferencia se usa?<br>Premisa 1. p<br>Premisa 2. p &rarr; q<br>Conclusión. Por lo tanto, q', b: 'Modus ponens', m: ['Modus tollens', 'Silogismo disyuntivo', 'Silogismo hipotético'] },
        { p: '¿Qué regla de inferencia se usa?<br>Premisa 1. p &rarr; q<br>Premisa 2. q &rarr; r<br>Conclusión. Por lo tanto, p &rarr; r', b: 'Silogismo hipotético', m: ['Modus ponens', 'Modus tollens', 'Silogismo disyuntivo'] },
        qReglaSimbolos, qReglaSimbolos, qReglaSimbolos,
        { rel: 'Relacione cada regla de la deducción natural con su uso.', cols: ['Regla', 'Uso'],
          pares: [['Regla de la conjunción', 'Unir dos proposiciones que son verdaderas al mismo tiempo'], ['Regla de la disyunción', 'Cuando al menos una proposición es verdadera'],
            ['Regla de la negación', 'Indicar que una proposición no es verdadera'], ['Regla de la condicional', 'Expresar que si pasa una cosa, entonces pasa otra'],
            ['Regla del bicondicional', 'Decir que dos proposiciones dependen una de la otra']] }
      ] },
      { s: 'modusTollens', n: 'Reglas de inferencia en palabras', v: [
        { p: '¿Qué regla de inferencia se usa?<br>Premisa 1. Si tienes sed, entonces tomas agua.<br>Premisa 2. No tomas agua.<br>Conclusión. Por lo tanto, no tienes sed.', b: 'Modus tollens', m: ['Modus ponens', 'Silogismo disyuntivo', 'Silogismo hipotético'] },
        { p: '¿Qué regla de inferencia se usa?<br>Premisa 1. Voy al cine o voy al parque.<br>Premisa 2. No voy al cine.<br>Conclusión. Por lo tanto, voy al parque.', b: 'Silogismo disyuntivo', m: ['Modus ponens', 'Modus tollens', 'Silogismo hipotético'] },
        qReglaPalabras, qReglaPalabras, qReglaPalabras, qReglaPalabras
      ] },
      { s: 'conectivas', n: 'Valor de verdad', v: [
        { p: 'En el enunciado "Fui al banco, pero no tenía dinero", el "pero" funciona como una conjunción. ¿Cuándo es verdadera?', b: 'Cuando las dos proposiciones son verdaderas',
          m: ['Cuando la primera es verdadera y la segunda falsa', 'Cuando la primera es falsa y la segunda verdadera', 'Cuando las dos son falsas'] },
        { p: 'Una condicional (p &rarr; q) es falsa únicamente cuando:', b: 'p es verdadera y q es falsa', m: ['p es falsa y q es verdadera', 'ambas son falsas', 'ambas son verdaderas'] },
        qValorVerdad, qValorVerdad, qValorVerdad,
        { rel: 'Relacione cada conectivo lógico con su símbolo.', cols: ['Conectivo', 'Símbolo'],
          pares: [['Negación', '¬'], ['Conjunción', '∧'], ['Disyunción', '∨'], ['Condicional', '→'], ['Bicondicional', '↔']] },
        { p: 'La disyunción (p ∨ q) es verdadera cuando:', b: 'al menos una de las proposiciones es verdadera',
          m: ['las dos proposiciones son verdaderas únicamente', 'las dos proposiciones son falsas', 'p es verdadera y q es falsa únicamente', 'tienen distinto valor de verdad'] }
      ] },
      { s: 'validez', n: 'Validez de un argumento', v: [
        { p: 'Determine si el argumento es válido:<br>Todas las ardillas comen bellotas. Alvin es una ardilla. Por lo tanto, Alvin come bellotas.',
          b: 'Es válido porque la conclusión se sigue necesariamente de las premisas', m: ['Es inválido porque no sigue el silogismo hipotético', 'Es válido porque todas las premisas son verdaderas', 'Es inválido porque no sigue el silogismo disyuntivo'] },
        { p: 'Determine si el argumento es válido:<br>Todos los perros son mamíferos. Mi gato es mamífero. Por lo tanto, mi gato es perro.',
          b: 'Es inválido porque la conclusión no se sigue de las premisas', m: ['Es válido porque las premisas son verdaderas', 'Es válido porque sigue el modus ponens', 'Es inválido porque tiene sólo dos premisas'] },
        { p: 'Analice el argumento:<br>Premisa 1. Todos los reptiles son de sangre caliente.<br>Premisa 2. Los lagartos son reptiles.<br>Conclusión. Por lo tanto, los lagartos son de sangre caliente.<br>En realidad, los reptiles son de sangre fría. ¿Qué se puede afirmar del argumento?',
          b: 'Es válido, porque la conclusión se sigue de las premisas, aunque una premisa sea falsa',
          m: ['Es inválido, porque una de sus premisas es falsa', 'Es válido, porque todas sus proposiciones son verdaderas', 'Es inválido, porque tiene solamente dos premisas'],
          ex: 'La validez depende de la estructura: la conclusión se sigue de las premisas. Un argumento puede ser válido pero no verdadero.' },
        qTipoArgumento, qTipoArgumento, qTipoArgumento,
        { p: 'Según la guía, una proposición es un enunciado que afirma o niega algo de un sujeto y se compone de:', b: 'sujeto + verbo (ser) + predicado',
          m: ['premisa + conclusión', 'tesis + antítesis + síntesis', 'pregunta + respuesta', 'causa + efecto'] }
      ] },
      { s: 'falacias', n: 'Falacias', v: [
        { p: 'Al plantear que sólo hay dos soluciones posibles a una situación cuando evidentemente hay más, ¿de qué falacia se trata?', b: 'Del falso dilema', m: ['Circular', 'Generalización apresurada', 'Populista'] },
        { p: '"Dos turistas extranjeros fueron groseros conmigo; todos los extranjeros son groseros". ¿Qué falacia es?', b: 'Generalización apresurada', m: ['Falso dilema', 'Ad hominem', 'Petición de principio'] },
        { p: '"No le creas a su propuesta sobre el reciclaje; él ni siquiera terminó la escuela". ¿Qué falacia es?', b: 'Ad hominem', m: ['Falso dilema', 'Ad populum', 'Generalización apresurada'] },
        qFalacia, qFalacia, qFalacia, qFalacia,
        { p: 'Una falacia es un razonamiento que:', b: 'parece válido, pero tiene un error lógico entre las premisas y la conclusión',
          m: ['siempre tiene premisas falsas', 'es válido y verdadero a la vez', 'no tiene conclusión', 'sólo se usa en matemáticas'] }
      ] },
      { s: 'peticionPrincipio', n: 'Peticion de principio', v: [
        { p: 'Descubra en qué consiste la petición de principio del razonamiento:<br><i>La libertad de expresión es benéfica para la democracia, pues es útil para la comunidad que todo el pueblo pueda manifestar sus opiniones.</i>',
          b: 'La premisa ya establece lo que dice la conclusión', m: ['Se apoya en la intimidación o la fuerza de un cargo', 'La premisa es políticamente correcta y persuasiva', 'Es probable que produzca sociedades plurales'] },
        qCualCircular, qCualCircular
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-pensamiento',
    grupo: 'Humanidades',
    nombre: 'Pensamiento en Mexico y Latinoamerica',
    descripcion: 'Modernidad y posmodernidad, positivismo en Mexico, alienacion, Habermas y filosofia de la liberacion. Reactivos 36 a 40 del area.',
    etiquetas: ['posmodernidad', 'positivismo', 'alienacion', 'habermas', 'liberacion'],
    niveles: {
      facil: ['alienacion'],
      medio: ['posmodernidad', 'positivismo'],
      dificil: ['habermas', 'liberacion']
    },
    items: [
      { s: 'posmodernidad', n: 'Sentido de la vida y posmodernidad', v: [
        { p: 'México accedió a la modernidad en el siglo XX con obras públicas, tecnología y una gran confianza en la razón y la ciencia; sin embargo, el país vive pobreza, violencia e injusticia, y la modernidad no llega a todos. ¿Cómo se designa este estado de la cultura?',
          b: 'Posmodernidad', m: ['Comunismo y capitalismo', 'Renacimiento e Ilustración', 'Socialismo utópico'] },
        qSer, qSer, qSer
      ] },
      { s: 'positivismo', n: 'Positivismo en Mexico', v: [
        { p: 'Una interpretación de la historia de México dice: la Colonia fue la etapa teológica, la Independencia la metafísica y la estabilidad del Porfiriato la etapa científica e industrial. ¿Qué corriente es?',
          b: 'Positivismo', m: ['Empirismo', 'Racionalismo', 'Vitalismo'] },
        { p: '¿Quién introdujo el positivismo en la educación mexicana con la Escuela Nacional Preparatoria (1867)?', b: 'Gabino Barreda', m: ['José Vasconcelos', 'Justo Sierra', 'Antonio Caso'] },
        qEtapaComte, qEtapaComte,
        { orden: 'Ordene las tres etapas de la historia humana según Auguste Comte.', pasos: ['Teológica', 'Metafísica', 'Positiva'] },
        { p: '¿Quién impulsó el positivismo en el siglo XIX?', b: 'Auguste Comte', m: ['Karl Marx', 'Jürgen Habermas', 'Enrique Dussel', 'René Descartes'] },
        { p: 'Para el positivismo, el conocimiento humano debe basarse en:', b: 'hechos observables y comprobables', m: ['la fe y la revelación', 'los mitos y las tradiciones', 'la intuición personal', 'la autoridad de los gobernantes'] }
      ] },
      { s: 'alienacion', n: 'Alienacion', v: [
        { p: 'Las siguientes son características de la alienación, excepto:', b: 'autonomía', m: ['aislamiento', 'anomia', 'impotencia'] },
        { p: 'Para Marx, el trabajador que no se reconoce en lo que produce porque el producto pertenece a otro vive un proceso de:', b: 'alienación', m: ['emancipación', 'autonomía', 'ataraxia'] },
        qObjetivacion, qObjetivacion,
        { p: 'El existencialismo sostiene que:', b: 'somos libres para dar sentido a nuestra vida y responsables de nuestras decisiones',
          m: ['todo está determinado por el destino', 'el placer es el bien supremo', 'sólo vale el conocimiento científico', 'la moral nace de un contrato social'] }
      ] },
      { s: 'habermas', n: 'Accion comunicativa', v: [
        { p: 'De acuerdo con la teoría de la acción comunicativa de Jürgen Habermas, ¿qué implicación ético-moral tiene un argumento?', b: 'La búsqueda de un consenso racional entre los interlocutores',
          m: ['La imposición de una verdad objetiva mediante la fuerza', 'La subordinación de la ética al poder político', 'La aceptación pasiva de normas sociales sin reflexión'] },
        qHabermas, qHabermas
      ] },
      { s: 'liberacion', n: 'Filosofia de la liberacion', v: [
        { p: '¿Cuál opción plantea una implicación ético-política de la filosofía de la liberación (Enrique Dussel)?', b: 'La necesidad de luchar contra la opresión de los pueblos excluidos y por una distribución justa de la riqueza',
          m: ['Mantener la estructura socioeconómica actual para preservar la estabilidad', 'Proteger sobre todo la libertad de mercado', 'Promover una sociedad meritocrática basada sólo en el esfuerzo individual'] },
        { p: 'La decolonización busca:', b: 'desmantelar las formas de dominación que dejó el colonialismo y valorar los saberes, lenguas y tradiciones de los pueblos marginados',
          m: ['volver a las formas de gobierno de la Colonia', 'imponer una sola cultura en todo el país', 'eliminar las lenguas indígenas', 'proteger sólo a las grandes empresas'] },
        { p: '¿Qué pensador desarrolló la filosofía de la liberación?', b: 'Enrique Dussel', m: ['Jürgen Habermas', 'Auguste Comte', 'Gabino Barreda', 'Jean-Paul Sartre'] }
      ] }
    ]
  });
})();
