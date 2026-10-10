/* Modo prepa - Comunicacion: comunicacion y redaccion, tipos de texto y
   literatura, investigacion e ingles (los 32 reactivos del area) */
(function () {
  'use strict';
  var P = EJ.prepa;

  /* lecturas en ingles del multirreactivo final (misma posicion = mismo texto) */
  var READ = [
    'Every year we go to Florida. We like to go to the beach. My favorite beach is called Emerson Beach. It is very long, with soft sand and palm trees. It is very beautiful. I like to make sandcastles and watch the sailboats go by. Every morning we look for shells in the sand. This year I want to learn to surf. It is hard to surf, but so much fun! My sister is a good surfer and she says she can teach me.',
    'Last summer my family visited my grandparents in Oaxaca. Their house is small, with a big garden full of flowers. It is very colorful. My grandmother cooks mole every Sunday, and I help her. In the afternoons we walk to the market. This year I want to learn to make tortillas. It is difficult to make them round, but my grandmother says she can teach me.',
    'A rabbit always laughed at a turtle because she walked very slowly. One day, the turtle said: "Let\'s have a race." The rabbit ran very fast and soon he was far ahead, so he decided to sleep under a tree. The turtle walked slowly, but she never stopped. When the rabbit woke up, the turtle was crossing the finish line. The turtle won the race.',
    'My name is Daniel and I am a nurse. I work at a hospital in Monterrey from Monday to Friday. I wake up at six o\'clock every morning. At work, I help the doctors and I take care of the patients. On weekends, I play soccer with my friends. Next year, I am going to study English in Canada.'
  ];

  /* ================= temario de la guia (7. Comunicacion y 8. Ingles) =================
     Preguntas armadas al azar con los temas de la guia "Temas fundamentales y
     bibliografia". */

  /* "a que grupo pertenece": la respuesta es el grupo del ejemplo */
  function clasifica(r, grupos, pregunta, extra) {
    var nombres = Object.keys(grupos), g = r.elige(nombres), ej = r.elige(grupos[g]);
    return { p: pregunta(ej), b: g, m: nombres.filter(function (x) { return x !== g; }).concat(extra || []) };
  }
  function cita(t) { return '<br><i>' + t + '</i>'; }

  /* ---------- 7.1 Proceso y barreras de la comunicacion ---------- */
  var BARRERAS = {
    'Física': ['No se escucha bien la clase en línea por una mala conexión de internet', 'En una obra en construcción, el ruido de las máquinas impide oír las indicaciones'],
    'Psicológica': ['Luis está tan enojado que no quiere escuchar lo que le explica su hermano', 'Ana tiene prejuicios contra su compañero y no toma en serio nada de lo que dice'],
    'Semántica': ['El médico usa tecnicismos que el paciente no entiende', 'Un instructivo está lleno de palabras que el usuario no conoce'],
    'Fisiológica': ['Un abuelo con problemas de audición no escucha lo que le dicen sus nietos', 'Una persona con disfonía (sin voz) no logra que la escuchen en la junta'],
    'Cultural': ['Un gesto que en México es amistoso resulta ofensivo en otro país', 'Un turista y un vendedor no logran entenderse porque hablan idiomas distintos']
  };
  function qBarrera(r) {
    var q = clasifica(r, BARRERAS, function (ej) { return '¿Qué tipo de barrera de la comunicación se presenta?' + cita(ej + '.'); });
    q.ex = 'Físicas: ruido, fallas técnicas, distancia. Psicológicas: emociones y prejuicios. Semánticas: palabras confusas o desconocidas. Fisiológicas: problemas de audición, vista o habla. Culturales: idioma, costumbres o valores.';
    return q;
  }
  var ESCENAS = [
    { t: 'Una maestra explica la fotosíntesis a su grupo en el salón de clases.', e: { 'Emisor': 'la maestra', 'Receptor': 'el grupo', 'Mensaje': 'la explicación de la fotosíntesis', 'Código': 'el idioma español' } },
    { t: 'Luis le manda a su mamá un mensaje de WhatsApp para avisarle que llegará tarde.', e: { 'Emisor': 'Luis', 'Receptor': 'su mamá', 'Canal': 'el celular (la aplicación de mensajes)', 'Mensaje': 'el aviso de que llegará tarde' } },
    { t: 'Un locutor de radio informa a sus oyentes que mañana lloverá.', e: { 'Emisor': 'el locutor', 'Receptor': 'los oyentes', 'Canal': 'las ondas de radio', 'Mensaje': 'que mañana lloverá' } }
  ];
  function qElemento(r) {
    var es = r.elige(ESCENAS), k = r.elige(Object.keys(es.e));
    return { p: es.t + '<br>En esta situación, ¿qué elemento de la comunicación es <b>' + es.e[k] + '</b>?', b: k,
      m: ['Emisor', 'Receptor', 'Mensaje', 'Canal', 'Código', 'Contexto'].filter(function (x) { return x !== k; }),
      ex: 'Emisor: quien envía. Receptor: quien recibe. Mensaje: la información. Canal: el medio por el que viaja. Código: el sistema de signos (por ejemplo, el idioma).' };
  }

  /* ---------- 7.2 Intencion comunicativa y sentido ---------- */
  var INTENCIONES = {
    'Informar': ['Ayer por la tarde se registró un sismo de magnitud 5.2 con epicentro en Oaxaca; no se reportaron daños.', 'El museo abrirá sus puertas el próximo lunes de 10:00 a 17:00 horas.'],
    'Describir': ['La casa tenía paredes color mostaza, ventanas altas de madera oscura y un patio lleno de geranios rojos.', 'El ajolote es un anfibio de piel lisa, con una cola larga y unas branquias rosadas como plumas.'],
    'Narrar': ['Aquella noche, Pedro salió de su casa sin avisar; caminó hasta el río y ahí encontró una caja misteriosa.', 'Cuando el tren se detuvo, la niña bajó corriendo y abrazó a su abuelo, que la esperaba desde hacía horas.'],
    'Convencer': ['Usar casco reduce en 70% el riesgo de lesiones graves en la cabeza; por eso, debes usarlo siempre que andes en bicicleta.', 'Según el INEGI, quienes terminan la preparatoria ganan en promedio más que quienes no; vale la pena seguir estudiando.'],
    'Persuadir': ['¡No seas el único sin el nuevo celular! Todos tus amigos ya lo tienen.', '¡Si de verdad quieres a tu familia, compra este seguro hoy mismo!'],
    'Expresar emociones': ['¡Qué feliz me siento de volver a verte después de tantos años!', 'Me duele mucho que ya no estés aquí con nosotros.'],
    'Comprometerse': ['Te prometo que mañana te devuelvo tu libro sin falta.', 'Me comprometo a entregar el proyecto terminado el viernes.']
  };
  function qIntencion(r) {
    var q = clasifica(r, INTENCIONES, function (ej) { return 'Identifique la intención comunicativa del texto:' + cita(ej); });
    q.ex = 'Convencer usa datos, hechos y razones; persuadir usa sentimientos, engaños o falacias. Describir representa algo; narrar cuenta una historia; informar avisa de un hecho; expresar muestra emociones; comprometerse es prometer una acción.';
    return q;
  }
  var SENTIDO = {
    'Denotativo': ['El agua hierve a 100 °C al nivel del mar.', 'La Ciudad de México tiene más de nueve millones de habitantes.', 'El corazón humano late unas 70 veces por minuto.'],
    'Connotativo': ['Tus ojos son dos luceros que alumbran mis noches.', 'Esa ciudad es un monstruo que se traga a la gente.', 'Mi corazón se rompió en mil pedazos.']
  };
  function qSentido(r) {
    if (r.bool()) {
      var q = clasifica(r, SENTIDO, function (ej) { return '¿Qué tipo de lenguaje emplea el enunciado?' + cita(ej); }, ['Técnico', 'Coloquial']);
      q.ex = 'Denotativo: significado literal, comprobable por cualquiera. Connotativo: significado figurado, cercano a lo que siente u opina el autor.';
      return q;
    }
    var C = { 'Denotativo': ['Se enfoca en la realidad externa al autor y su información es fácil de comprobar', 'Se apoya en datos duros, como estadísticas o resultados de experimentos', 'Tiene un solo significado literal, al pie de la letra'],
      'Connotativo': ['Se enfoca en lo que opina, cree o siente el autor', 'Se apoya en ejemplos, comparaciones y analogías', 'Puede tener varias interpretaciones según el lector'] };
    var q2 = clasifica(r, C, function (ej) { return '¿A qué tipo de texto corresponde la característica?' + cita(ej + '.'); }, ['Instructivo', 'Coloquial']);
    q2.ex = 'Denotativo: objetivo, literal y comprobable. Connotativo: subjetivo, figurado y abierto a interpretaciones.';
    return q2;
  }

  /* ---------- 7.3 Ideas principales ---------- */
  var IDEAS = [
    { t: 'El ajolote es un anfibio que sólo vive de forma natural en los canales de Xochimilco. Puede regenerar sus patas, su cola y hasta partes de su corazón. Sin embargo, la contaminación del agua y las especies invasoras lo tienen en peligro de extinción.',
      b: 'El ajolote, un anfibio único de Xochimilco, está en peligro de extinción', m: ['El ajolote puede regenerar partes de su cuerpo', 'Los canales de Xochimilco están contaminados', 'Existen especies invasoras en los canales'] },
    { t: 'Dormir bien es fundamental para aprender. Mientras dormimos, el cerebro ordena lo que aprendimos durante el día. Quienes duermen menos de siete horas recuerdan menos información y se distraen con más facilidad.',
      b: 'Dormir bien es fundamental para aprender', m: ['El cerebro trabaja mientras dormimos', 'Hay que dormir exactamente siete horas', 'Las personas que duermen poco se distraen'] },
    { t: 'El maíz ha sido la base de la alimentación en México desde hace miles de años. Con él se preparan tortillas, tamales, atole y pozole. Fue tan importante para los pueblos mesoamericanos que aparece en muchos de sus mitos.',
      b: 'El maíz ha sido la base de la alimentación y la cultura de México', m: ['Con maíz se preparan tamales y atole', 'Los pueblos mesoamericanos tenían muchos mitos', 'El pozole es un platillo tradicional'] }
  ];
  function qIdea(r) {
    var x = r.elige(IDEAS);
    return { p: 'Lea el texto e identifique la idea principal:' + cita(x.t), b: x.b, m: x.m,
      ex: 'La idea principal es lo esencial que el autor quiere comunicar; las demás (detalles, ejemplos, datos) son ideas secundarias que la explican o la amplían.' };
  }

  /* ---------- 7.4 Gramatica ---------- */
  var ACTITUD = {
    'Enunciativa': ['El tren sale a las ocho de la mañana.', 'Mi hermana estudia en la universidad.'],
    'Interrogativa': ['¿A qué hora sale el tren?', '¿Dónde dejaste las llaves?'],
    'Exclamativa': ['¡Qué rápido pasa el tiempo!', '¡Ganamos el campeonato!'],
    'Desiderativa': ['Ojalá llegue a tiempo el tren.', 'Que tengas un buen viaje.'],
    'Dubitativa': ['Quizá el tren ya haya salido.', 'Tal vez llueva esta tarde.'],
    'Exhortativa': ['Por favor, cierra la puerta.', 'Guarden silencio en la biblioteca.']
  };
  var PREDICADO = {
    'Copulativa (atributiva)': ['Mi hermana es doctora.', 'El café está muy caliente.'],
    'Transitiva': ['Juan compró un libro.', 'La abuela preparó tamales.'],
    'Intransitiva': ['El bebé duerme.', 'Los niños corren en el parque.'],
    'Reflexiva': ['Ana se peina frente al espejo.', 'Me lavo las manos antes de comer.'],
    'Recíproca': ['Los novios se abrazaron.', 'Los vecinos se saludan cada mañana.'],
    'Pasiva': ['La carta fue escrita por Luis.', 'El puente fue construido en 1950.']
  };
  var COMPUESTAS = {
    'Yuxtapuesta': ['Llegué tarde; el tren ya se había ido.', 'Hace frío: ponte el suéter.'],
    'Coordinada': ['Estudié mucho y aprobé el examen.', 'Quería ir al cine, pero estaba lloviendo.'],
    'Subordinada': ['El libro que me prestaste es muy bueno.', 'Te llamo cuando llegue a casa.']
  };
  function qOracion(r) {
    var tipo = r.entero(0, 2), q;
    if (tipo === 0) {
      q = clasifica(r, ACTITUD, function (ej) { return 'Por la actitud del hablante, ¿qué tipo de oración es?' + cita(ej); });
      q.ex = 'Enunciativa: afirma o niega. Interrogativa: pregunta. Exclamativa: emoción. Desiderativa: deseo (ojalá). Dubitativa: duda (quizá, tal vez). Exhortativa: orden o ruego.';
    } else if (tipo === 1) {
      q = clasifica(r, PREDICADO, function (ej) { return 'Por la naturaleza de su predicado, ¿qué tipo de oración es?' + cita(ej); });
      q.ex = 'Copulativa: verbo ser o estar. Transitiva: el verbo lleva objeto directo. Intransitiva: no lo lleva. Reflexiva: el sujeto hace y recibe la acción. Recíproca: acción mutua. Pasiva: el sujeto recibe la acción (fue escrita por).';
    } else {
      q = clasifica(r, COMPUESTAS, function (ej) { return '¿Qué tipo de oración compuesta es?' + cita(ej); }, ['Simple']);
      q.ex = 'Yuxtapuestas: unidas sólo por un signo de puntuación. Coordinadas: unidas por un nexo y con el mismo valor (y, pero, o). Subordinadas: una depende de la otra (que, cuando, porque).';
    }
    return q;
  }
  /* [bien escrita, mal escrita, regla] */
  var GRAFIAS = [['conducir', 'condusir', 'Los verbos terminados en -ducir llevan c.'], ['paciencia', 'pasiencia', 'Las terminaciones -ancia, -encia llevan c.'],
    ['pececito', 'pesesito', 'Los diminutivos -cito, -ecito llevan c.'], ['agradecer', 'agradeser', 'Los verbos terminados en -cer llevan c (excepto toser, coser y ser).'],
    ['raíces', 'raíses', 'El plural de las palabras con z final termina en -ces.'], ['nicaragüense', 'nicaragüence', 'Los gentilicios en -ense llevan s.'],
    ['bellísima', 'bellícima', 'Los superlativos -ísimo, -ísima llevan s.'], ['maravilloso', 'maravillozo', 'Los adjetivos en -oso, -osa llevan s.'],
    ['adivinanza', 'adivinansa', 'Las terminaciones -anza y -azgo llevan z.'], ['belleza', 'bellesa', 'Los nombres abstractos en -eza llevan z.'],
    ['escribir', 'escrivir', 'Los verbos terminados en -bir llevan b (excepto hervir, servir y vivir).'], ['contribuir', 'contrivuir', 'Los verbos terminados en -buir llevan b.'],
    ['cantaba', 'cantava', 'El copretérito en -aba lleva b.'], ['biblioteca', 'viblioteca', 'Las palabras con biblio- (libro) llevan b.'],
    ['amabilidad', 'amavilidad', 'Las palabras terminadas en -bilidad llevan b.'], ['evitar', 'ebitar', 'Las palabras que empiezan con eva-, eve-, evi-, evo- llevan v.'],
    ['herbívoro', 'herbíboro', 'Las esdrújulas terminadas en -ívoro, -ívora llevan v (excepto víbora).'], ['volver', 'bolver', 'Los verbos terminados en -olver llevan v.'],
    ['estuvo', 'estubo', 'El pretérito de estar, andar y tener lleva v (estuvo, anduve, tuvo).'], ['vagabundo', 'vagavundo', 'Las palabras terminadas en -bundo, -bunda llevan b.']];
  function qGrafia(r) {
    var cuatro = r.muestra(GRAFIAS, 4), bien = r.bool();
    if (bien) {
      return { p: '¿Cuál de las siguientes palabras está escrita correctamente?', b: cuatro[0][0], m: cuatro.slice(1).map(function (g) { return g[1]; }),
        ex: cuatro[0][2] + ' Las otras se escriben ' + cuatro.slice(1).map(function (g) { return g[0]; }).join(', ') + '.' };
    }
    return { p: '¿Cuál de las siguientes palabras tiene un error de ortografía?', b: cuatro[0][1], m: cuatro.slice(1).map(function (g) { return g[0]; }),
      ex: 'Se escribe <b>' + cuatro[0][0] + '</b>. ' + cuatro[0][2] };
  }
  var ACENTOS = {
    'Aguda': ['camión', 'compás', 'colibrí', 'reloj', 'feliz', 'canción'],
    'Llana o grave': ['árbol', 'lápiz', 'mesa', 'examen', 'cárcel', 'azúcar'],
    'Esdrújula': ['México', 'rápido', 'música', 'pájaro', 'década'],
    'Sobresdrújula': ['cómetelo', 'dígaselo', 'cuéntamelo', 'llévatelo']
  };
  function qAcento(r) {
    var q = clasifica(r, ACENTOS, function (ej) { return 'Por la posición de su sílaba tónica, ¿cómo se clasifica la palabra <b>' + ej + '</b>?'; }, ['Monosílaba']);
    q.ex = 'Aguda: la última sílaba (lleva tilde si termina en n, s o vocal). Llana: la penúltima (lleva tilde si NO termina en n, s o vocal). Esdrújula: la antepenúltima (siempre lleva tilde). Sobresdrújula: antes de la antepenúltima (siempre lleva tilde).';
    return q;
  }
  var COMAS = {
    'Enumerativa': ['Compré manzanas, peras, uvas y plátanos.', 'En la mochila llevo cuadernos, lápices, colores y una regla.'],
    'Explicativa': ['Mi perro, que es muy juguetón, rompió el sillón.', 'El maestro, cansado de esperar, empezó la clase.'],
    'Vocativa': ['Carlos, ven a comer.', 'Escucha, María, lo que te voy a decir.'],
    'Elíptica': ['Mi hermano estudia medicina; yo, arquitectura.', 'Ana prefiere el té; Luis, el café.'],
    'Apositiva': ['Benito Juárez, el Benemérito de las Américas, nació en Oaxaca.', 'Frida Kahlo, la pintora mexicana, vivió en Coyoacán.'],
    'Conjuntiva': ['Debes estudiar más, es decir, dedicarle tiempo diario.', 'Hay que ahorrar agua, por ejemplo, cerrando la llave al lavarte los dientes.']
  };
  function qComa(r) {
    var q = clasifica(r, COMAS, function (ej) { return '¿Qué tipo de coma se usa en la oración?' + cita(ej); });
    q.ex = 'Enumerativa: separa elementos de una lista. Explicativa: encierra información adicional. Vocativa: separa el nombre de a quien se habla. Elíptica: sustituye un verbo ya dicho. Apositiva: encierra otro nombre del sujeto. Conjuntiva: acompaña frases como es decir, por ejemplo, o sea.';
    return q;
  }
  var PALABRAS = [['empezar', 'comenzar', 'terminar'], ['claro', 'evidente', 'oscuro'], ['rápido', 'veloz', 'lento'], ['alegre', 'contento', 'triste'],
    ['antiguo', 'viejo', 'moderno'], ['valiente', 'audaz', 'cobarde'], ['abundante', 'copioso', 'escaso'], ['generoso', 'dadivoso', 'tacaño'],
    ['enorme', 'gigantesco', 'diminuto'], ['fácil', 'sencillo', 'difícil']];
  function qSinonimo(r) {
    var x = r.elige(PALABRAS), sin = r.bool(), otras = r.muestra(PALABRAS.filter(function (y) { return y !== x; }), 2);
    return { p: '¿Cuál de las siguientes palabras es ' + (sin ? 'un sinónimo' : 'un antónimo') + ' de <b>' + x[0] + '</b>?', b: sin ? x[1] : x[2],
      m: [sin ? x[2] : x[1], otras[0][1], otras[1][2]],
      ex: 'Sinónimo: significado igual o muy parecido (' + x[0] + ' = ' + x[1] + '). Antónimo: significado contrario (' + x[0] + ' / ' + x[2] + ').' };
  }
  var HOMOFONOS = [
    { c: 'Antes de ___ el botón de la camisa, voy a poner a ___ las papas.', b: ['coser', 'cocer'], ex: 'Coser: unir con hilo. Cocer: preparar un alimento con calor.' },
    { c: 'Mis tíos se van a ___ en diciembre, después de la temporada de ___ venados.', b: ['casar', 'cazar'], ex: 'Casar: contraer matrimonio. Cazar: perseguir animales.' },
    { c: 'Desde la ___ de la montaña se ve una ___ profunda entre las rocas.', b: ['cima', 'sima'], ex: 'Cima: la parte más alta. Sima: hoyo muy profundo.' },
    { c: 'Cuando el agua ___, agrega la ___ de limón para el té.', b: ['hierva', 'hierba'], ex: 'Hierva: del verbo hervir. Hierba: planta pequeña.' },
    { c: 'Si ___ a la junta, conocerás los ___ que heredó tu abuelo.', b: ['vienes', 'bienes'], ex: 'Vienes: del verbo venir. Bienes: propiedades o cosas de valor.' },
    { c: 'Tiene un rostro muy ___ y casi no tiene ___ en los brazos.', b: ['bello', 'vello'], ex: 'Bello: hermoso. Vello: pelo corto y suave del cuerpo.' }
  ];
  function qHomofono(r) {
    var h = r.elige(HOMOFONOS);
    return { c: h.c, b: h.b, m: [[h.b[1], h.b[0]], [h.b[0], h.b[0]], [h.b[1], h.b[1]]], ex: h.ex + ' Son homófonos: suenan igual, pero se escriben distinto y significan otra cosa.' };
  }

  /* ---------- 7.5 a 7.7 Tipos de texto y literatura ---------- */
  var TIPOS_TEXTO = {
    'Narrativo': ['Aquella noche, la niña caminó sola hasta el bosque y encontró una cabaña con la luz encendida...', 'Cuando el capitán dio la orden, los marineros izaron las velas y partieron hacia la isla.'],
    'Descriptivo': ['El mercado es un laberinto de puestos de colores, con olor a cilantro y a pan recién hecho.', 'Mi abuela es bajita, de manos arrugadas y ojos color miel que siempre sonríen.'],
    'Argumentativo': ['Considero que la jornada escolar debería empezar más tarde, porque los adolescentes duermen menos de lo recomendado.', 'Es urgente prohibir los popotes de plástico: tardan siglos en degradarse y dañan a las tortugas marinas.'],
    'Expositivo': ['La fotosíntesis es el proceso por el cual las plantas transforman la luz, el agua y el dióxido de carbono en glucosa y oxígeno.', 'Los volcanes se forman cuando el magma del interior de la Tierra sale a la superficie por una grieta de la corteza.']
  };
  function qTipoTexto(r) {
    var q = clasifica(r, TIPOS_TEXTO, function (ej) { return '¿Qué tipo de texto es el fragmento?' + cita(ej); }, ['Instructivo']);
    q.ex = 'Narrativo: cuenta hechos con personajes en un tiempo. Descriptivo: "pintura verbal" de algo o alguien. Argumentativo: defiende una postura con razones. Expositivo: explica información de forma objetiva.';
    return q;
  }
  function qExpositivo(r) {
    var q = clasifica(r, { 'Nota informativa': ['Una nota del periódico sobre el sismo que ocurrió ayer en Guerrero', 'Una nota digital que informa la apertura de una nueva línea del metro'],
      'Texto didáctico': ['Un libro de texto de Biología de secundaria', 'Una guía de estudio con ejercicios para el examen'],
      'Texto de consulta': ['Un diccionario', 'Una enciclopedia'],
      'Texto de divulgación científica': ['Un artículo de revista que explica al público en general cómo funcionan las vacunas', 'Un video que cuenta a cualquier persona los nuevos descubrimientos sobre Marte'] },
      function (ej) { return '¿Qué tipo de texto expositivo es el siguiente?' + cita(ej + '.'); });
    q.ex = 'Nota informativa: hechos de actualidad. Didácticos: para enseñar en la escuela. De consulta: diccionarios, enciclopedias, códigos. Divulgación científica: lleva los avances de la ciencia al público en general.';
    return q;
  }
  function qHecho(r) {
    var q = clasifica(r, { 'Un hecho': ['La Ciudad de México está a 2 240 metros sobre el nivel del mar.', 'El Museo de Antropología abre de martes a domingo.', 'El 16 de septiembre de 1810 inició la Independencia de México.'],
      'Una opinión': ['La comida oaxaqueña es la más rica del país.', 'Ese partido fue el más aburrido de la temporada.', 'El reguetón es la peor música que existe.'],
      'Una suposición': ['Como el cielo está nublado, seguramente lloverá en la tarde.', 'Juan no contesta; tal vez se quedó dormido.', 'Si las luces están apagadas, quizá no hay nadie en casa.'] },
      function (ej) { return 'El enunciado corresponde a:' + cita(ej); }, ['Una cita textual']);
    q.ex = 'Hecho: se puede comprobar. Opinión: juicio o valoración personal. Suposición: se considera cierto algo a partir de indicios, sin comprobarlo.';
    return q;
  }
  function qPeriodistico(r) {
    var q = clasifica(r, { 'Editorial': ['Texto de opinión que expresa la postura del periódico sobre un tema y no lleva firma de un autor'],
      'Columna': ['Texto de opinión firmado que aparece con regularidad, con el mismo autor y un título fijo'],
      'Artículo de opinión': ['Texto firmado en el que un autor da su punto de vista sobre un tema de actualidad'],
      'Nota informativa': ['Texto que informa un hecho reciente de manera objetiva: qué, quién, cuándo, dónde y cómo'],
      'Reseña crítica': ['Texto que resume una película o un libro y además lo valora con argumentos'] },
      function (ej) { return '¿A qué texto periodístico corresponde la descripción?' + cita(ej + '.'); });
    q.ex = 'Opinión: editorial (postura del medio, sin firma), columna (autor fijo y periódica) y artículo (firmado, sobre la actualidad). Información: nota informativa. Valoración: reseña crítica.';
    return q;
  }
  function qPublicidad(r) {
    var q = clasifica(r, { 'Publicitario': ['"Tenis Rayo: corre más rápido que nunca. ¡Ahora con 30% de descuento!"', '"Pizza al 2x1 todos los martes en Pizzería Don Pepe."'],
      'Propagandístico': ['"La desigualdad es más violenta que cualquier protesta."', '"Vota por la planilla verde: juntos haremos una escuela mejor."', '"Cuida el agua: es de todos."'] },
      function (ej) { return '¿Qué tipo de texto es el siguiente?' + cita(ej); }, ['Periodístico', 'Ensayístico']);
    q.ex = 'La publicidad busca vender productos o servicios (ámbito comercial); la propaganda difunde ideas políticas, sociales o religiosas.';
    return q;
  }
  function qNarrador(r) {
    var q = clasifica(r, { 'Autodiegético': ['Aquel verano yo tenía doce años y descubrí que mi abuelo guardaba un secreto.', 'Nunca olvidaré el día en que perdí mi primer empleo: llegué tarde y mi jefe me esperaba en la puerta.'],
      'Homodiegético': ['Yo era el mejor amigo de Martín y vi cómo poco a poco se fue alejando de todos.', 'Mi vecina doña Rosa nunca salía de su casa; yo la espiaba desde mi ventana.'],
      'Heterodiegético': ['María caminaba sola por el bosque; no sabía que alguien la observaba desde los árboles.', 'El viejo pescador salió al mar antes del amanecer, como todos los días.'] },
      function (ej) { return 'Según su postura en la historia, ¿qué tipo de narrador tiene el fragmento?' + cita(ej); }, ['Omnisciente en segunda persona']);
    q.ex = 'Autodiegético: cuenta su propia historia. Homodiegético: es personaje, pero cuenta la historia de otro. Heterodiegético: cuenta desde fuera, sin ser personaje.';
    return q;
  }
  function qSubgeneroNarrativo(r) {
    var q = clasifica(r, { 'Mito': ['Al principio los dioses formaron al hombre con barro y después con madera, hasta que lo hicieron de masa de maíz.', 'Prometeo robó el fuego a los dioses para dárselo a los hombres y fue castigado por Zeus.'],
      'Leyenda': ['Dicen que en las noches, por los canales de Xochimilco, se escucha el llanto de una mujer que busca a sus hijos.', 'El guerrero Popocatépetl vela para siempre el sueño de la princesa Iztaccíhuatl, convertidos ambos en volcanes.'],
      'Fábula': ['La zorra, al no alcanzar las uvas, dijo: "No están maduras". Moraleja: quien no consigue algo, lo desprecia.', 'La hormiga trabajó todo el verano mientras la cigarra cantaba; en invierno, la cigarra no tenía qué comer.'] },
      function (ej) { return '¿A qué subgénero narrativo pertenece el fragmento?' + cita(ej); }, ['Novela', 'Crónica']);
    q.ex = 'Mito: relatos sagrados sobre el origen del mundo, los dioses o los seres humanos. Leyenda: hechos fantásticos en lugares y tiempos conocidos. Fábula: animales que actúan como humanos y dejan una moraleja.';
    return q;
  }
  function qTipoMito(r) {
    var M = { 'Cosmogónico': 'la creación del universo', 'Teogónico': 'el nacimiento y la función de los dioses', 'Antropogónico': 'la creación de los seres humanos' };
    var k = r.elige(Object.keys(M));
    return { p: 'Un mito que explica ' + M[k] + ' es un mito:', b: k.toLowerCase(), m: Object.keys(M).filter(function (x) { return x !== k; }).map(function (x) { return x.toLowerCase(); }).concat(['épico']),
      ex: 'Cosmogónicos: creación del universo. Teogónicos: nacimiento de los dioses. Antropogónicos: creación del ser humano.' };
  }
  function qSubgeneroDramatico(r) {
    var q = clasifica(r, { 'Tragedia': ['Obra en la que el destino de los personajes es fatal: al final mueren o son asesinados', 'El rey Edipo descubre que él mismo mató al antiguo rey y termina destrozado por su destino'],
      'Comedia': ['Obra con final feliz que hace reír por las situaciones chuscas que representa', 'Dos gemelos son confundidos por todo el pueblo y al final todo se aclara entre risas'],
      'Tragicomedia': ['Obra que combina elementos de la tragedia y de la comedia'],
      'Ópera': ['Obra de música teatral en la que la acción se canta con acompañamiento de una orquesta'] },
      function (ej) { return '¿Qué subgénero dramático se describe?' + cita(ej + '.'); }, ['Oda']);
    q.ex = 'Tragedia: destino fatal. Comedia: final feliz y humor. Tragicomedia: mezcla de ambas. Ópera: teatro cantado con orquesta.';
    return q;
  }
  var FIGURAS = {
    'Metáfora': ['Tus ojos son dos luceros.', 'La vida es un camino.'],
    'Comparación (símil)': ['Sus manos eran suaves como la seda.', 'Corre como el viento.'],
    'Hipérbole': ['Te he dicho un millón de veces que llegues temprano.', 'Lloró ríos de lágrimas.'],
    'Prosopopeya (personificación)': ['El viento cantaba entre los árboles.', 'La luna nos sonreía desde el cielo.'],
    'Aliteración': ['"Bajo el ala aleve del leve abanico" (Rubén Darío).', '"El ruido con que rueda la ronca tempestad" (José Zorrilla).'],
    'Pleonasmo': ['Lo vi con mis propios ojos.', 'Sube para arriba y no te tardes.']
  };
  function qFigura(r) {
    var q = clasifica(r, FIGURAS, function (ej) { return '¿Qué figura retórica se usa?' + cita(ej); });
    q.ex = 'Metáfora: identifica una cosa con otra sin "como". Comparación: usa "como". Hipérbole: exageración. Prosopopeya: da cualidades humanas a lo que no las tiene. Aliteración: repite sonidos. Pleonasmo: repite una idea para dar énfasis.';
    return q;
  }
  function qLirico(r) {
    var L = { 'Oda': 'Composición en estrofas iguales cuyo tono es la alabanza', 'Elegía': 'Composición relacionada con la tristeza, el lamento y el dolor',
      'Sátira': 'Composición que critica las costumbres o vicios de alguien para burlarse o moralizar',
      'Himno': 'Composición solemne en alabanza de personajes, cosas o sucesos extraordinarios' };
    var k = r.elige(Object.keys(L));
    return { p: '¿A qué subgénero lírico corresponde la descripción?' + cita(L[k] + '.'), b: k, m: Object.keys(L).filter(function (x) { return x !== k; }).concat(['Fábula']) };
  }

  /* ---------- 7.8 Investigacion ---------- */
  function qTecnica(r) {
    var q = clasifica(r, { 'Entrevista': ['Una reportera platica con un médico usando una lista de preguntas preparadas de antemano', 'Un estudiante conversa con un artesano para conocer cómo elabora sus piezas'],
      'Encuesta o cuestionario': ['Se aplican 10 preguntas cerradas a 300 estudiantes para conocer sus hábitos de lectura', 'Se manda un formulario digital a todos los vecinos para saber cuántos usan bicicleta'],
      'Revisión documental': ['Ana consulta libros, revistas y artículos de bases de datos confiables para su trabajo', 'Se revisan registros históricos del archivo municipal'],
      'Grupo focal': ['Un moderador reúne a ocho jóvenes para que discutan sobre el uso de redes sociales', 'Se invita a un grupo de madres de familia a conversar, guiadas por una moderadora, sobre la comida escolar'],
      'Observación': ['Un biólogo graba en video a unas aves para analizar después su comportamiento', 'Una investigadora pasa una hora en el patio anotando cómo juegan los niños, sin intervenir'] },
      function (ej) { return '¿Qué técnica de recopilación de información se usa?' + cita(ej + '.'); });
    q.ex = 'Observación: mirar y describir (directa o con videos y fotos). Entrevista: diálogo con una persona. Encuesta: preguntas a muchas personas. Revisión documental: consultar fuentes ya escritas. Grupo focal: discusión moderada en grupo.';
    return q;
  }
  function qTipoEntrevista(r) {
    var E = { 'Estructurada': 'todas las preguntas se definen de antemano y se hacen en el mismo orden', 'Semiestructurada': 'combina preguntas fijas con preguntas abiertas que surgen en la plática',
      'Libre': 'la conversación fluye sin un guion fijo' };
    var k = r.elige(Object.keys(E));
    return { p: '¿Qué tipo de entrevista es aquella en la que ' + E[k] + '?', b: k, m: Object.keys(E).filter(function (x) { return x !== k; }).concat(['Grupal', 'Documental']) };
  }
  var ETAPAS = ['Selección o asignación del tema', 'Búsqueda de información', 'Plan de trabajo', 'Acopio de la información (fichas de trabajo)',
    'Interpretación de la información', 'Redacción del escrito', 'Presentación del trabajo'];
  function qEtapas(r) {
    var idx = r.muestra([0, 1, 2, 3, 4, 5, 6], 5).sort(function (a, b) { return a - b; });
    return { orden: 'Ordene las siguientes etapas del proceso de investigación.', pasos: idx.map(function (i) { return ETAPAS[i]; }),
      ex: 'Etapas: ' + ETAPAS.join(', ') + '.' };
  }
  function qAlcance(r) {
    var q = clasifica(r, { 'Exploratoria': ['Se estudia por primera vez un tema del que casi no hay información, para tener una idea general', 'Se hace un primer acercamiento a los videojuegos de realidad virtual en la escuela para saber qué preguntas investigar después'],
      'Descriptiva': ['Se registra cuántos alumnos hay por grupo, su edad y su medio de transporte, sin buscar causas', 'Se detalla cómo es y dónde se encuentra cada mercado de la ciudad'],
      'Correlacional': ['Se analiza cómo se relacionan las horas de estudio y las calificaciones, sin modificar nada', 'Se mide si a mayor uso del celular corresponden menos horas de sueño'],
      'Explicativa': ['Se busca por qué aumentó la deserción escolar en la región', 'Se investiga qué causa la muerte de los peces en el lago'] },
      function (ej) { return 'Según su alcance, ¿qué tipo de investigación es?' + cita(ej + '.'); });
    q.ex = 'Exploratoria: tema poco estudiado. Descriptiva: ¿qué es? ¿cómo es? Correlacional: ¿cómo se relacionan X y Y? (no es causa y efecto). Explicativa: ¿por qué ocurre?';
    return q;
  }
  function qMetodoInvestigacion(r) {
    var q = clasifica(r, { 'Cuantitativo': ['Se mide el promedio de horas de sueño de 500 alumnos y se analiza con estadística', 'Se cuentan los autos que pasan por una avenida cada hora durante un mes'],
      'Cualitativo': ['Se entrevista a profundidad a cinco migrantes para entender por qué dejaron su país', 'Se observa cómo conviven las familias en una fiesta del pueblo para comprender sus tradiciones'] },
      function (ej) { return '¿Qué método de investigación se usa?' + cita(ej + '.'); }, ['Documental', 'Experimental']);
    q.ex = 'Cuantitativo: datos numéricos, objetivo y generalizable. Cualitativo: datos no numéricos, se centra en el "por qué", subjetivo y no generalizable.';
    return q;
  }
  function qCita(r) {
    var C = { 'Cita narrativa': 'Quintero (2020) plantea que la lectura diaria mejora la escritura.',
      'Cita parentética': 'La lectura diaria mejora la escritura (Quintero, 2020).' };
    var k = r.elige(Object.keys(C));
    return { p: '¿Qué tipo de cita es la siguiente?' + cita(C[k]), b: k, m: Object.keys(C).filter(function (x) { return x !== k; }).concat(['Nota al pie de página', 'Referencia bibliográfica']),
      ex: 'Narrativa: el autor forma parte de la oración y el año va entre paréntesis. Parentética: la idea va primero y el autor y el año van juntos entre paréntesis.' };
  }

  /* ---------- 8. Ingles ---------- */
  var WH = [['What', '___ is your name? &mdash; Ana.'], ['Where', '___ do you live? &mdash; In Puebla.'], ['When', '___ is your birthday? &mdash; In May.'],
    ['Who', '___ is that girl? &mdash; She is my cousin.'], ['Why', '___ are you sad? &mdash; Because I lost my phone.'], ['How', '___ do you go to school? &mdash; By bus.'],
    ['Which', '___ color do you prefer, red or blue? &mdash; Blue.']];
  function qWh(r) {
    var w = r.elige(WH);
    return { p: 'Choose the correct question word:<br><b>' + w[1] + '</b>', b: w[0], m: WH.filter(function (x) { return x !== w; }).map(function (x) { return x[0]; }),
      ex: 'What: qué. Where: dónde. When: cuándo. Who: quién. Why: por qué. How: cómo. Which: cuál (elegir entre opciones).' };
  }
  var MODALES = [['should', 'My advice: you ___ drink more water.', ['must', 'would', 'can']], ['must', 'It is the law: you ___ wear a seatbelt in the car.', ['should', 'would', 'can']],
    ['can', 'Look! My baby sister ___ walk now.', ['must', 'should', 'would']], ['would', 'If I won the lottery, I ___ buy a big house.', ['must', 'should', 'can']],
    ['must not', 'You ___ smoke in the hospital. It is forbidden.', ['should', 'would', 'can']]];
  function qModal(r) {
    var x = r.elige(MODALES);
    return { p: 'Choose the correct option:<br><b>' + x[1] + '</b>', b: x[0], m: x[2],
      ex: 'Should: consejo. Must: obligación (must not: prohibición). Can: habilidad o permiso. Would: situación imaginaria.' };
  }
  var SUJETOS = [['I', 'am', false], ['She', 'is', true], ['They', 'are', false], ['My brother', 'is', true], ['We', 'are', false]];
  var VERBOS = [['play', 'plays', 'playing', 'played', 'soccer'], ['watch', 'watches', 'watching', 'watched', 'TV'], ['study', 'studies', 'studying', 'studied', 'English'],
    ['cook', 'cooks', 'cooking', 'cooked', 'dinner'], ['read', 'reads', 'reading', 'read', 'a book']];
  function qPresente(r) {
    var s = r.elige(SUJETOS), v = r.elige(VERBOS), ahora = r.bool();
    var simple = s[2] ? v[1] : v[0], cont = s[1] + ' ' + v[2];
    var cuando = ahora ? r.elige(['right now', 'at the moment', 'now']) : r.elige(['every day', 'every weekend', 'on Mondays']);
    var b = ahora ? cont : simple;
    return { p: 'Choose the correct option:<br><b>' + s[0] + ' ___ ' + v[4] + ' ' + cuando + '.</b>', b: b,
      m: [ahora ? simple : cont, v[3], s[2] ? v[0] : v[1], v[2]].filter(function (x, i, a) { return x !== b && a.indexOf(x) === i; }),
      ex: ahora ? 'Con "' + cuando + '" la acción ocurre en este momento: presente continuo (am/is/are + -ing).'
        : 'Con "' + cuando + '" es una rutina: presente simple' + (s[2] ? ' (con she, he o it el verbo lleva -s o -es)' : '') + '.' };
  }
  /* [verbo, pasado, participio, tercera persona, complemento] */
  var IRREGULARES = [['see', 'saw', 'seen', 'sees', 'a cat in the park'], ['eat', 'ate', 'eaten', 'eats', 'fish'], ['go', 'went', 'gone', 'goes', 'to the beach'],
    ['buy', 'bought', 'bought', 'buys', 'a new phone'], ['write', 'wrote', 'written', 'writes', 'a letter'], ['make', 'made', 'made', 'makes', 'a cake'],
    ['take', 'took', 'taken', 'takes', 'many photos'], ['have', 'had', 'had', 'has', 'a party']];
  function qPasado(r) {
    if (r.bool()) {
      var v = r.elige(IRREGULARES), su = r.elige(['Sam', 'My parents', 'We', 'Laura']);
      return { p: 'Choose the correct option:<br><b>' + su + ' ___ ' + v[4] + ' yesterday.</b>', b: v[1],
        m: [v[0] + (v[0].slice(-1) === 'e' ? 'd' : 'ed'), v[2], v[3], 'was ' + v[0]].filter(function (x, i, a) { return x !== v[1] && a.indexOf(x) === i; }),
        ex: '"Yesterday" pide pasado simple. ' + v[0] + ' es irregular: ' + v[0] + ' &rarr; ' + v[1] + '.' };
    }
    var V2 = [['cook', 'was cooking', 'were cooking', 'cooked'], ['watch TV', 'was watching TV', 'were watching TV', 'watched TV'], ['study', 'was studying', 'were studying', 'studied']];
    var x = r.elige(V2), plural = r.bool(), suj = plural ? 'we' : 'I';
    var b = plural ? x[2] : x[1];
    return { p: 'Choose the correct option:<br><b>While ' + suj + ' ___, the phone rang.</b>', b: b,
      m: [plural ? x[1] : x[2], x[3], (plural ? 'are ' : 'am ') + x[1].split(' ').slice(1).join(' ')],
      ex: 'Una acción que estaba en progreso en el pasado (y fue interrumpida) va en pasado continuo: was/were + -ing.' };
  }
  /* sin distractores que tambien serian correctos (por ejemplo, "will" en un plan) */
  function qFuturo(r) {
    var F2 = [['am going to', 'I have bought the tickets. I ___ travel to Paris next month.', ['would', 'is going to', 'going', 'am will'], 'Plan ya hecho: be going to.'],
      ['will', 'It is cold in here. I think I ___ close the window.', ['is going to', 'going', 'am will', 'wills'], 'Decisión tomada en el momento: will.'],
      ['will', 'If it rains tomorrow, we ___ stay at home.', ['would', 'is going to', 'are will', 'going'], 'Primer condicional: if + presente, will + verbo.'],
      ['is going to', 'Look at those black clouds! It ___ rain.', ['would', 'are going to', 'will to', 'goes to'], 'Predicción con evidencia presente: be going to.']];
    var x = r.elige(F2);
    return { p: 'Choose the correct option:<br><b>' + x[1] + '</b>', b: x[0], m: x[2], ex: x[3] };
  }

  P.temaBanco({
    id: 'prepa-redaccion',
    grupo: 'Comunicacion',
    nombre: 'Comunicacion y redaccion',
    descripcion: 'Barreras e intencion comunicativa, lenguaje denotativo y connotativo, esquema de redaccion, idea principal, oraciones, ortografia, sinonimos y homofonos. Reactivos 1 a 9 del area.',
    etiquetas: ['barreras', 'intencion', 'connotativo', 'ortografia', 'homofonos', 'oracion'],
    niveles: {
      facil: ['barreras', 'intencion', 'lenguaje', 'sinonimos'],
      medio: ['esquemaRedaccion', 'ortografia', 'homofonos'],
      dificil: ['ideaPrincipal', 'oraciones']
    },
    items: [
      { s: 'barreras', n: 'Proceso y barreras de la comunicacion', v: [
        { p: 'En una fiesta, con la música a todo volumen, Carlos le preguntó la hora a Mario, y Mario respondió que estaba feliz y siguió bailando. ¿Qué tipo de barrera comunicativa se ejemplifica?',
          b: 'Física', m: ['Fisiológica', 'Lingüística', 'Psicológica'] },
        { p: 'Un turista que sólo habla japonés pide indicaciones a un vendedor que sólo habla español y no logran entenderse. ¿Qué barrera comunicativa se presenta?',
          b: 'Lingüística', m: ['Física', 'Fisiológica', 'Psicológica'] },
        { p: 'Luis está tan preocupado por un problema familiar que no pone atención a lo que le explica su maestra. ¿Qué barrera comunicativa se presenta?',
          b: 'Psicológica', m: ['Física', 'Fisiológica', 'Lingüística'] },
        { p: 'Una persona con disfonía (pérdida de la voz) no logra que la escuchen en una junta. ¿Qué barrera comunicativa se presenta?',
          b: 'Fisiológica', m: ['Física', 'Lingüística', 'Psicológica'] },
        qBarrera, qBarrera, qElemento, qElemento,
        { rel: 'Relacione cada elemento del proceso de comunicación con su definición.', cols: ['Elemento', 'Definición'],
          pares: [['Emisor', 'Quien envía el mensaje'], ['Mensaje', 'La información que se transmite'], ['Canal', 'El medio por el que viaja el mensaje'],
            ['Código', 'El sistema de signos con que se elabora y se interpreta el mensaje'], ['Receptor', 'Quien recibe el mensaje']] },
        { p: 'Para que la comunicación sea efectiva es necesario, entre otras cosas, que haya:', b: 'retroalimentación para confirmar que el mensaje se entendió',
          m: ['un mensaje largo y complicado', 'muchas palabras técnicas', 'ruido en el canal', 'un emisor que no escuche al receptor'] }
      ] },
      { s: 'intencion', n: 'Intencion comunicativa', v: [
        { p: 'Identifique la intención comunicativa del texto:<br><i>El vehículo explorador Curiosity tomó en Marte la imagen de una montaña nombrada en honor del astrobiólogo mexicano Rafael Navarro, quien ayudó a desarrollar un laboratorio para analizar la química de rocas y suelos.</i>',
          b: 'Informar', m: ['Describir', 'Narrar', 'Persuadir'] },
        { p: 'Identifique la intención comunicativa del texto:<br><i>¡No esperes más! Inscríbete hoy al taller de robótica y conviértete en el ingeniero del futuro. ¡Cupo limitado!</i>',
          b: 'Persuadir', m: ['Informar', 'Describir', 'Narrar'] },
        { p: 'Identifique la intención comunicativa del texto:<br><i>La casa tenía paredes color mostaza, ventanas altas de madera oscura y un patio lleno de macetas con geranios rojos.</i>',
          b: 'Describir', m: ['Informar', 'Narrar', 'Persuadir'] },
        qIntencion, qIntencion, qIntencion
      ] },
      { s: 'lenguaje', n: 'Lenguaje denotativo y connotativo', v: [
        { p: '¿Qué tipo de lenguaje emplea el enunciado?<br><i>La alfombra ahogaba en el silencio mis pasos.</i>', b: 'Connotativo', m: ['Coloquial', 'Denotativo', 'Técnico'] },
        { p: '¿Qué tipo de lenguaje emplea el enunciado?<br><i>El agua hierve a 100 °C al nivel del mar.</i>', b: 'Denotativo', m: ['Connotativo', 'Coloquial', 'Poético'] },
        { p: '¿Qué tipo de lenguaje emplea el enunciado?<br><i>Tus ojos son dos luceros que alumbran mis noches.</i>', b: 'Connotativo', m: ['Denotativo', 'Técnico', 'Científico'] },
        qSentido, qSentido, qSentido
      ] },
      { s: 'esquemaRedaccion', n: 'Esquema de redaccion', v: [
        { p: '¿Qué parte del esquema de redacción representa el fragmento?<br><i>Lograr una convivencia armónica en la escuela requiere que todos se comprometan con el respeto y el diálogo. Sólo así se podrá construir un ambiente propicio para el aprendizaje de todos.</i>',
          b: 'Conclusión con resumen y propuesta', m: ['Desarrollo con causa y consecuencia', 'Desarrollo con ejemplo concreto', 'Introducción con pregunta generadora'] },
        { p: '¿Qué parte del esquema de redacción representa el fragmento?<br><i>¿Alguna vez te has preguntado cuánta agua se desperdicia en tu casa cada día? En este texto revisaremos por qué cuidarla es urgente.</i>',
          b: 'Introducción con pregunta generadora', m: ['Conclusión con resumen y propuesta', 'Desarrollo con ejemplo concreto', 'Desarrollo con causa y consecuencia'] },
        { p: '¿Qué parte del esquema de redacción representa el fragmento?<br><i>Por ejemplo, en la escuela de mi colonia se instalaron bebederos y el consumo de botellas de plástico bajó a la mitad en un año.</i>',
          b: 'Desarrollo con ejemplo concreto', m: ['Introducción con pregunta generadora', 'Conclusión con resumen y propuesta', 'Desarrollo con causa y consecuencia'] },
        { rel: 'Relacione cada parte del esquema lógico de redacción con su función.', cols: ['Parte', 'Función'],
          pares: [['Introducción', 'Presenta el tema, el planteamiento general y los objetivos'], ['Desarrollo', 'Expone datos, hechos, argumentos, explicaciones y citas'],
            ['Conclusión', 'Sintetiza o concluye con base en la información anterior']], extra: ['Lista las fuentes consultadas al final del trabajo'] },
        { p: 'Según el esquema lógico de redacción, ¿en qué parte del texto se presentan datos, cifras, argumentos y citas textuales?', b: 'En el desarrollo',
          m: ['En la introducción', 'En la conclusión', 'En el título', 'En la bibliografía'] }
      ] },
      { s: 'ideaPrincipal', n: 'Idea principal', v: [
        { p: 'Lea el texto e identifique la idea principal:<br><i>El Martillo de las brujas es una obra que muestra el pensamiento del hombre medieval; en ella se señala que las mujeres relacionadas con la brujería eran estigmatizadas por la sociedad al grado de llevarlas a la muerte.</i><br>La idea primaria indica que el hombre medieval:',
          b: 'juzgaba y condenaba a las mujeres acusadas de hechicería', m: ['creía que las mujeres eran aliadas del demonio para hacer el mal', 'era intolerante con las mujeres que desafiaban las costumbres', 'culpaba a las mujeres de todos los males'] },
        { p: 'Lea el texto e identifique la idea principal:<br><i>Las abejas polinizan cerca de un tercio de los cultivos que comemos. Sin ellas, la producción de frutas y verduras caería drásticamente y los precios subirían.</i>',
          b: 'Las abejas son indispensables para la producción de alimentos', m: ['Las abejas producen miel', 'Los precios de las verduras suben cada año', 'Un tercio de los cultivos son frutas'] },
        qIdea, qIdea, qIdea,
        { p: 'En un texto, las ideas secundarias son las que:', b: 'complementan, refuerzan, explican o amplían la idea principal',
          m: ['contienen lo esencial que quiere comunicar el autor', 'siempre van al final del texto', 'contradicen la idea principal', 'no tienen relación con el tema'] }
      ] },
      { s: 'oraciones', n: 'Oraciones simples y compuestas', v: [
        { rel: 'Relacione cada tipo de oración con sus ejemplos.', cols: ['Tipo de oración', 'Ejemplo'],
          pares: [['Simple', ['Mario y María subieron al monte esta tarde sin descanso', 'El diputado hizo una campaña sucia y deficiente']],
            ['Compuesta', ['Ayer vino mi tío y pidió que lo visitáramos', 'Todos los días mi abuela rezaba para que lloviera']]] },
        { p: 'Una oración compuesta se caracteriza porque tiene:', b: 'dos o más verbos conjugados', m: ['un solo verbo conjugado', 'dos o más sujetos', 'dos o más adjetivos'] },
        qOracion, qOracion, qOracion, qOracion
      ] },
      { s: 'ortografia', n: 'Ortografia', v: [
        { c: 'Una tarde mi tía Lola limpia___a la ___entana de su casa; al dar un paso hacia atrás, trope___ó con una piedra y por poco se caía, sólo fue un ___usto.',
          b: ['b', 'v', 'z', 's'], m: [['b', 'b', 's', 's'], ['v', 'v', 's', 's'], ['v', 'b', 's', 'z'], ['v', 'v', 'z', 'z']], ex: 'Copretérito en -aba con b; ventana con v; tropezó con z; susto con s.' },
        { c: 'Ayer hu___o una fiesta en casa de mi ___ecina y todos se que___aron del ruido.',
          b: ['b', 'v', 'j'], m: [['v', 'b', 'g'], ['b', 'b', 'g'], ['v', 'v', 'j'], ['v', 'b', 'j']], ex: 'Hubo (del verbo haber) lleva b; vecina con v; quejaron con j.' },
        qGrafia, qGrafia, qGrafia, qAcento, qAcento, qComa, qComa,
        { c: 'Me pidió que te ___ este regalo y que lo acompañes con un ___ caliente.', b: ['dé', 'té'], m: [['de', 'te'], ['dé', 'te'], ['de', 'té']],
          ex: 'Tilde diacrítica: dé (del verbo dar) y té (la bebida) se distinguen de de (preposición) y te (pronombre).' }
      ] },
      { s: 'sinonimos', n: 'Sinonimos y antonimos', v: [
        { p: 'Seleccione el grupo de palabras que sean sinónimos entre sí.', b: 'Rápido, veloz, ágil', m: ['Alegre, triste, divertido', 'Fuerte, débil, robusto', 'Bello, hermoso, feo'] },
        { p: 'Seleccione el grupo de palabras que sean antónimos de "generoso".', b: 'Tacaño, avaro, mezquino', m: ['Dadivoso, espléndido, desprendido', 'Amable, cortés, atento', 'Alegre, feliz, contento'] },
        qSinonimo, qSinonimo, qSinonimo,
        { p: 'Las palabras homógrafas son las que:', b: 'se escriben igual, pero tienen significados distintos (vino, la bebida, y vino, del verbo venir)',
          m: ['suenan igual, pero se escriben distinto (votar y botar)', 'significan lo mismo (empezar y comenzar)', 'significan lo contrario (claro y oscuro)', 'vienen de otro idioma'] }
      ] },
      { s: 'homofonos', n: 'Homofonos', v: [
        { c: 'Si no quieres esos zapatos, los puedes ___ a la basura mañana, aprovechando que iremos a ___ para elegir al nuevo representante de la colonia.',
          b: ['botar', 'votar'], m: [['votar', 'botar'], ['botar', 'botar'], ['votar', 'votar']] },
        { c: 'Ya he ___ la tarea, así que ___ los papeles viejos a la basura.',
          b: ['hecho', 'echo'], m: [['echo', 'hecho'], ['hecho', 'hecho'], ['echo', 'echo']], ex: 'Hecho (del verbo hacer) lleva h; echo (del verbo echar, tirar) no.' },
        { c: 'Mi papá ___ que cambiar el ___ del lavabo porque goteaba.',
          b: ['tuvo', 'tubo'], m: [['tubo', 'tuvo'], ['tuvo', 'tuvo'], ['tubo', 'tubo']], ex: 'Tuvo (del verbo tener) con v; tubo (pieza hueca) con b.' },
        qHomofono, qHomofono, qHomofono
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-textos',
    grupo: 'Comunicacion',
    nombre: 'Tipos de texto y literatura',
    descripcion: 'Textos narrativo, expositivo, periodistico y publicitario; hechos y opiniones; generos literarios, mito, drama, tragedia, figuras retoricas y subgeneros liricos. Reactivos 10 a 21 del area.',
    etiquetas: ['narrativo', 'expositivo', 'nota informativa', 'mito', 'tragedia', 'oda', 'figuras retoricas'],
    niveles: {
      facil: ['tipoTexto', 'hechos', 'personajes', 'tragedia'],
      medio: ['expositivo', 'notaInformativa', 'propaganda', 'mito', 'figuras'],
      dificil: ['periodisticoOpinion', 'dramatico', 'lirica']
    },
    items: [
      { s: 'tipoTexto', n: 'Tipo de texto', v: [
        { p: '¿Qué tipo de texto es el fragmento?<br><i>¡Qué frío hacía! Nevaba y comenzaba a oscurecer; era la última noche del año. Por la calle pasaba una pobre niña descalza y con la cabeza descubierta...</i> (H. C. Andersen)',
          b: 'Narrativo', m: ['Argumentativo', 'Descriptivo', 'Expositivo'] },
        { p: '¿Qué tipo de texto es el fragmento?<br><i>Considero que la jornada escolar debería empezar más tarde, porque los adolescentes duermen menos de lo recomendado y eso afecta su rendimiento.</i>',
          b: 'Argumentativo', m: ['Narrativo', 'Descriptivo', 'Expositivo'] },
        qTipoTexto, qTipoTexto, qTipoTexto
      ] },
      { s: 'expositivo', n: 'Texto expositivo', v: [
        { p: 'El fragmento corresponde a un texto:<br><i>En Nueva York, 34% de las muertes por covid-19 son de latinos, aunque representan 29% de la población. "La gente pobre paga el precio más alto", concluyó el gobernador, alarmado por las cifras.</i>',
          b: 'expositivo', m: ['científico', 'descriptivo', 'histórico'] },
        { p: 'Un texto que explica de forma objetiva cómo funciona el sistema digestivo, con datos y definiciones, es un texto:', b: 'expositivo', m: ['narrativo', 'argumentativo', 'literario'] },
        qExpositivo, qExpositivo,
        { p: 'El propósito fundamental del texto expositivo es:', b: 'hacer comprender una información, un tema o un concepto',
          m: ['contar una historia con personajes', 'convencer al lector de una postura', 'expresar los sentimientos del autor', 'vender un producto'] }
      ] },
      { s: 'hechos', n: 'Hechos y opiniones', v: [
        { p: 'Los datos del fragmento corresponden a:<br><i>Mañana será inaugurada la exposición "Naturaleza muerta" en el Museo de Historia Natural de la Ciudad de México, a las 10:00 horas.</i>',
          b: 'hechos', m: ['argumentos', 'opiniones', 'suposiciones'] },
        { p: 'El enunciado corresponde a:<br><i>La nueva exposición del museo es la más aburrida que he visto en mi vida.</i>', b: 'una opinión', m: ['un hecho', 'un dato', 'una cita'] },
        qHecho, qHecho, qHecho
      ] },
      { s: 'notaInformativa', n: 'Subgeneros periodisticos', v: [
        { p: 'Identifique el subgénero del texto:<br><i>México, 12 de mayo de 2021. La Secretaría de Salud informó que las mujeres embarazadas serán incluidas de inmediato en la Estrategia Nacional de Vacunación, tras revisar las cifras más recientes.</i>',
          b: 'Nota informativa', m: ['De consulta', 'De divulgación científica', 'Didáctico'] },
        { p: 'El texto periodístico en el que el autor da su punto de vista personal sobre un tema de actualidad y lo firma es:', b: 'el artículo de opinión', m: ['la nota informativa', 'la entrevista', 'el reportaje'] },
        qPeriodistico, qPeriodistico, qPeriodistico
      ] },
      { s: 'propaganda', n: 'Propaganda y publicidad', v: [
        { p: 'Un cartel de una fundación de derechos humanos dice: "La desigualdad es más violenta que cualquier protesta". ¿Qué tipo de texto es?', b: 'Propagandístico', m: ['Ensayístico', 'Periodístico', 'Publicitario'],
          ex: 'La propaganda difunde ideas; la publicidad vende productos o servicios.' },
        { p: 'Un anuncio dice: "Tenis Rayo: corre más rápido que nunca. ¡Ahora con 30% de descuento!". ¿Qué tipo de texto es?', b: 'Publicitario', m: ['Propagandístico', 'Periodístico', 'Ensayístico'] },
        qPublicidad, qPublicidad
      ] },
      { s: 'periodisticoOpinion', n: 'Textos periodisticos', v: [
        { p: 'Un texto presenta la vida de un famoso cronista deportivo: fue futbolista, árbitro, entrenador y comentarista, fundó un periódico y murió en el año 2000. ¿Qué tipo de texto es?',
          b: 'Semblanza (texto biográfico)', m: ['Ensayo', 'Publicitario', 'Reseña crítica'] },
        { p: 'Un texto resume una película y además la valora, diciendo qué tan buena le pareció al autor y por qué. ¿Qué tipo de texto es?', b: 'Reseña crítica', m: ['Nota informativa', 'Semblanza', 'Instructivo'] },
        { p: 'Un texto en prosa en el que el autor analiza un tema con libertad, desde su punto de vista y con argumentos, es:', b: 'un ensayo',
          m: ['una nota informativa', 'un diccionario', 'una fábula', 'un instructivo'] },
        { lista: 'Del siguiente listado, identifique los textos argumentativos.', si: ['El editorial', 'El ensayo', 'La reseña crítica', 'La columna'],
          no: ['El diccionario', 'La nota informativa', 'El libro de texto', 'La enciclopedia'] }
      ] },
      { s: 'personajes', n: 'Elementos de la narracion', v: [
        { p: 'Lea el fragmento:<br><i>En una granja vivía un Gato muy perezoso que sólo dormía al sol. El Perro, la Gallina y el Burro trabajaban todo el día y lo criticaban, pero el granjero siempre consentía al Gato. Un día, el Gato atrapó al ratón que se comía el maíz desde hacía un año.</i><br>Todos son personajes de la narración, excepto:',
          b: 'el ratón del granjero vecino', m: ['el Gato', 'el Burro', 'la Gallina'] },
        { p: 'En una narración, la persona o voz que cuenta los hechos se llama:', b: 'narrador', m: ['autor', 'protagonista', 'lector'] },
        qNarrador, qNarrador,
        { rel: 'Relacione cada elemento del análisis narrativo con su definición.', cols: ['Elemento', 'Definición'],
          pares: [['Tema', 'La idea principal o valor que el autor quiere resaltar'], ['Argumento', 'Las acciones principales que realizan o padecen los personajes'],
            ['Trama', 'El orden de los sucesos y sus relaciones de causa'], ['Narrador', 'Quien toma la voz para contar la historia'],
            ['Ambiente', 'El entorno donde ocurren los hechos: lugar, clima, época']] },
        { orden: 'Ordene las partes de la trama de un relato, según la morfología de Propp.', pasos: ['Planteamiento', 'Nudo', 'Clímax', 'Desenlace'] },
        { p: 'En la red actancial de Greimas, el personaje que se opone al protagonista se llama:', b: 'opositor (antagonista)',
          m: ['ayudante', 'beneficiario', 'sujeto', 'narrador'] }
      ] },
      { s: 'mito', n: 'Subgeneros narrativos', v: [
        { p: '¿A qué subgénero pertenece el fragmento?<br><i>Al principio los dioses formaron al hombre con barro, pero se deshacía con el agua; después lo hicieron de madera, pero no tenía alma; al final lo formaron con masa de maíz, y ese hombre sí pudo hablar y adorarlos.</i>',
          b: 'Mito', m: ['Fábula', 'Leyenda', 'Minificción'] },
        { p: '¿A qué subgénero pertenece el fragmento?<br><i>Dicen que en las noches, por los canales de Xochimilco, se escucha el llanto de una mujer vestida de blanco que busca a sus hijos.</i>',
          b: 'Leyenda', m: ['Mito', 'Fábula', 'Novela'] },
        { p: '¿A qué subgénero pertenece el fragmento?<br><i>La zorra, al no alcanzar las uvas, dijo: "No están maduras". Moraleja: quien no consigue algo, lo desprecia.</i>',
          b: 'Fábula', m: ['Mito', 'Leyenda', 'Crónica'] },
        qSubgeneroNarrativo, qSubgeneroNarrativo, qTipoMito,
        { p: '¿Cuál de los siguientes autores es conocido por sus fábulas?', b: 'Esopo', m: ['Homero', 'Sófocles', 'Rubén Darío', 'Juan Rulfo'] }
      ] },
      { s: 'dramatico', n: 'Genero dramatico', v: [
        { lista: 'Del siguiente listado, identifique las características del género dramático.', k: 2,
          si: ['Acotaciones', 'Diálogos entre personajes', 'Actos y escenas'], no: ['Tesis', 'Narrador', 'Versos con rima obligatoria', 'Moraleja'] },
        { rel: 'Relacione cada elemento del teatro con su descripción.', cols: ['Elemento', 'Descripción'],
          pares: [['Acotaciones', 'Indicaciones del autor sobre gestos, movimientos y escenografía'], ['Parlamentos', 'Diálogos que dicen los personajes'],
            ['Escenario', 'Lugar y época donde ocurre la obra'], ['Dramaturgo', 'Autor de la obra de teatro'], ['Director', 'Coordina la puesta en escena']] },
        { p: 'El género dramático nació en Grecia, en los festivales en honor del dios:', b: 'Dionisio', m: ['Zeus', 'Apolo', 'Poseidón', 'Hermes'] }
      ] },
      { s: 'tragedia', n: 'Subgeneros dramaticos', v: [
        { p: 'En una obra griega, el rey Edipo investiga quién mató al antiguo rey y descubre que fue él mismo; al final, destrozado por su destino, se arranca los ojos. ¿A qué subgénero pertenece?',
          b: 'Tragedia', m: ['Comedia', 'Ópera', 'Zarzuela'] },
        { p: 'Una obra de teatro con personajes comunes, situaciones de enredo, humor y final feliz es una:', b: 'comedia', m: ['tragedia', 'oda', 'elegía'] },
        qSubgeneroDramatico, qSubgeneroDramatico
      ] },
      { s: 'figuras', n: 'Figuras retoricas', v: [
        { p: 'En los versos de Rubén Darío "Miraba como el alba pura; / sonreía como una flor", ¿a qué elemento del poema se refiere "sonreía como una flor"?', b: 'Figura retórica (símil)', m: ['Estrofa', 'Métrica', 'Rima'] },
        { rel: 'Relacione la figura retórica con su ejemplo.', cols: ['Figura', 'Ejemplo'],
          pares: [['Símil', 'Tus dientes son blancos como la nieve'], ['Metáfora', 'Las perlas de tu boca'], ['Hipérbole', 'Te he dicho un millón de veces'],
            ['Personificación', 'El viento cantaba entre los árboles'], ['Onomatopeya', 'El tic tac del reloj no me deja dormir']] },
        qFigura, qFigura, qFigura
      ] },
      { s: 'lirica', n: 'Subgeneros liricos', v: [
        { p: 'Un poema dedicado a alabar o exaltar algo o a alguien (por ejemplo, a la alegría o a una cebolla) es una:', b: 'Oda', m: ['Elegía', 'Himno', 'Sátira'] },
        { p: 'Un poema que expresa dolor por la muerte de un ser querido es una:', b: 'Elegía', m: ['Oda', 'Sátira', 'Himno'] },
        { p: 'Un poema que ridiculiza los vicios de una persona o de la sociedad para criticarlos es una:', b: 'Sátira', m: ['Oda', 'Elegía', 'Égloga'] },
        qLirico, qLirico,
        { c: 'En un poema, cada renglón se llama ___ y un conjunto de ellos forma una ___.', b: ['verso', 'estrofa'],
          m: [['estrofa', 'verso'], ['párrafo', 'estrofa'], ['verso', 'capítulo'], ['rima', 'métrica']] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-investigacion',
    grupo: 'Comunicacion',
    nombre: 'Investigacion',
    descripcion: 'Tecnicas de recopilacion, tipos de investigacion, citas y notas en trabajos academicos. Reactivos 22 a 24 del area.',
    etiquetas: ['observacion', 'correlacional', 'cita', 'nota al pie'],
    niveles: {
      facil: ['tecnicas'],
      medio: ['citas'],
      dificil: ['tipoInvestigacion']
    },
    items: [
      { s: 'tecnicas', n: 'Tecnicas de recopilacion', v: [
        { p: '¿Qué técnica se usa? Un investigador pasa una hora en un parque observando a los niños jugar, sin intervenir, para describir su comportamiento espontáneo.', b: 'Observación no participante',
          m: ['Grupo focal', 'Investigación documental', 'Observación participante'] },
        { p: '¿Qué técnica se usa? Una investigadora vive un mes en una comunidad, trabaja con ellos en el campo y anota cómo se organizan.', b: 'Observación participante',
          m: ['Observación no participante', 'Encuesta', 'Investigación documental'] },
        { p: '¿Qué técnica se usa? Se reúne a ocho jóvenes para que conversen, guiados por un moderador, sobre su uso de redes sociales.', b: 'Grupo focal',
          m: ['Encuesta', 'Observación no participante', 'Investigación documental'] },
        qTecnica, qTecnica, qTecnica, qTipoEntrevista, qEtapas
      ] },
      { s: 'tipoInvestigacion', n: 'Tipos de investigacion', v: [
        { p: 'Un investigador reúne el tiempo que los estudiantes dedican al estudio y sus calificaciones, y analiza cómo se relacionan ambas variables sin modificar nada. ¿Qué tipo de investigación es?',
          b: 'Correlacional', m: ['Experimental', 'Descriptiva', 'Exploratoria'] },
        { p: 'Se forman dos grupos de plantas: a uno se le pone fertilizante y al otro no, y se compara su crecimiento. ¿Qué tipo de investigación es?',
          b: 'Experimental', m: ['Correlacional', 'Descriptiva', 'Documental'] },
        { p: 'Se investiga por primera vez un tema del que casi no hay información, para tener una idea general. ¿Qué tipo de investigación es?',
          b: 'Exploratoria', m: ['Experimental', 'Correlacional', 'Explicativa'] },
        qAlcance, qAlcance, qAlcance, qMetodoInvestigacion, qMetodoInvestigacion
      ] },
      { s: 'citas', n: 'Citas y notas', v: [
        { c: 'En un trabajo académico, cuando se copian entre comillas las palabras exactas de un autor se hace ___, y la aclaración numerada que aparece abajo de la página se llama ___.',
          b: ['una cita textual', 'nota a pie de página'], m: [['un resumen', 'complemento informativo'], ['un comentario', 'referencia bibliográfica'], ['una paráfrasis', 'comentario breve']] },
        { p: 'Cuando se explican con palabras propias las ideas de un autor, citando la fuente, se hace una:', b: 'paráfrasis', m: ['cita textual', 'nota al pie', 'transcripción'] },
        qCita, qCita,
        { p: 'Cuando una cita textual tiene menos de 40 palabras:', b: 'se integra en el párrafo y se escribe entre comillas',
          m: ['se escribe en un párrafo aparte y en cursiva', 'se pone como nota al pie de página', 'se escribe con mayúsculas', 'no necesita el nombre del autor'] },
        { p: 'Las notas al pie de página se numeran con:', b: 'números arábigos en superíndice', m: ['números romanos entre paréntesis', 'letras mayúsculas', 'asteriscos y viñetas', 'el año de la publicación'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-ingles',
    grupo: 'Comunicacion',
    nombre: 'Ingles',
    descripcion: 'Wh-questions, verbos modales, presente simple y continuo, pasado simple y continuo, futuro y comprension de lectura. Reactivos 25 a 32 del area.',
    etiquetas: ['ingles', 'wh questions', 'modal', 'past', 'future', 'reading'],
    niveles: {
      facil: ['wh', 'ideaGeneral', 'vocabulario'],
      medio: ['presente', 'futuro', 'detalle'],
      dificil: ['modales', 'pasado']
    },
    items: [
      { s: 'wh', n: 'Wh-questions', v: [
        { c: 'Mark: Hi, I am Mark. ___ are you?<br>Lisa: I am Lisa. I am from Mexico. ___ are you from?<br>Mark: I am from Australia. ___ did you arrive?<br>Lisa: Yesterday, at midnight.<br>Mark: ___ did you arrive so late?<br>Lisa: Because I lost my flight.',
          b: ['Who', 'Where', 'When', 'Why'], m: [['What', 'When', 'Where', 'Why'], ['Who', 'Why', 'When', 'Where'], ['What', 'Where', 'When', 'Why'], ['How', 'Where', 'What', 'Why']] },
        { c: '___ is your favorite color? &mdash; Blue.<br>___ old are you? &mdash; I am sixteen.<br>___ is your backpack? &mdash; The black one.',
          b: ['What', 'How', 'Which'], m: [['Which', 'What', 'How'], ['How', 'What', 'Which'], ['What', 'Which', 'How']] },
        qWh, qWh, qWh
      ] },
      { s: 'modales', n: 'Verbos modales', v: [
        { c: 'Sara: Hi, teacher! ___ I go to the bathroom?<br>Teacher: You ___ go to the bathroom upstairs; the one on the first floor is closed. And you ___ be on time for class.<br>Sara: Yes, teacher. I ___ be on time.',
          b: ['Can', 'have to', 'must', 'should'], m: [['Should', 'have to', 'must', 'can'], ['Have to', 'can', 'should', 'must'], ['Must', 'should', 'can', 'have to']] },
        { p: 'Choose the correct option: "You ___ smoke in the hospital. It is forbidden."', b: 'must not', m: ['can', 'should', 'have to'] },
        qModal, qModal, qModal
      ] },
      { s: 'presente', n: 'Presente simple y continuo', v: [
        { c: 'George: You are in very good shape! What is your secret?<br>Paul: Well, I ___ to the gym three hours per week and I ___ every day. The gym is closed, so I am ___ at home these days.',
          b: ['go', 'run', 'working out'], m: [['goes', 'runs', 'working out'], ['going', 'running', 'work out'], ['go', 'running', 'work out']] },
        { c: 'My sister usually ___ to school by bus, but today she ___ her bike.',
          b: ['goes', 'is riding'], m: [['go', 'rides'], ['is going', 'ride'], ['goes', 'ride']] },
        qPresente, qPresente, qPresente
      ] },
      { s: 'pasado', n: 'Pasado simple y continuo', v: [
        { c: 'I ___ my father last Friday. He ___ a delicious soup when I ___. My father ___ me a little.',
          b: ['visited', 'was cooking', 'arrived', 'gave'], m: [['was visiting', 'was cooking', 'arrived', 'give'], ['were visiting', 'cook', 'arrives', 'give'], ['visited', 'cooks', 'were arriving', 'gave']] },
        { c: 'While we ___ TV, the lights ___ off.',
          b: ['were watching', 'went'], m: [['watched', 'were going'], ['are watching', 'go'], ['was watching', 'goes']] },
        qPasado, qPasado, qPasado
      ] },
      { s: 'futuro', n: 'Futuro y condicionales', v: [
        { rel: 'Relacione cada base con su complemento.', cols: ['Base', 'Complemento'],
          pares: [['My father will be angry', 'if I fail my exam'], ['I have the tickets for next weekend, I am', 'going to travel'],
            ['By 2050, gasoline cars', 'will disappear'], ['My father will be happy', 'if he wins the lottery']], extra: ['will fly'] },
        { p: 'Choose the correct option: "Look at those black clouds! It ___ rain."', b: 'is going to', m: ['will to', 'goes', 'is rain'] },
        qFuturo, qFuturo, qFuturo
      ] },
      { s: 'ideaGeneral', n: 'Lectura: idea general (multirreactivo)', v: [
        { lec: READ[0], p: 'Identifique la idea general del texto.', b: 'Nuestras vacaciones en la playa', m: ['El estado de Florida', 'Los pasatiempos de mi hermana', 'Cómo construir castillos de arena'] },
        { lec: READ[1], p: 'Identifique la idea general del texto.', b: 'Una visita a los abuelos', m: ['La historia de Oaxaca', 'Cómo preparar mole', 'El mercado de la ciudad'] },
        { lec: READ[2], p: 'Identifique la idea general del texto.', b: 'Una carrera que gana la tortuga por ser constante', m: ['Cómo duermen los conejos', 'La amistad entre dos animales', 'Las reglas de una competencia'] },
        { lec: READ[3], p: 'Identifique la idea general del texto.', b: 'La rutina y los planes de un enfermero', m: ['La historia de un hospital', 'Un partido de futbol entre amigos', 'Cómo aprender inglés en Canadá'] }
      ] },
      { s: 'vocabulario', n: 'Lectura: vocabulario (multirreactivo)', v: [
        { lec: READ[0], p: 'En el texto, ¿qué se describe con la palabra <i>beautiful</i>?', b: 'La playa', m: ['La arena', 'Los castillos', 'Las palmeras'] },
        { lec: READ[1], p: 'En el texto, ¿qué se describe con la palabra <i>colorful</i>?', b: 'El jardín de los abuelos', m: ['El mole', 'El mercado', 'Las tortillas'] },
        { lec: READ[2], p: '¿Qué significa la palabra <i>slowly</i> en el texto?', b: 'Despacio', m: ['Rápido', 'Siempre', 'Lejos'] },
        { lec: READ[3], p: '¿Qué significa <i>take care of</i> en el texto?', b: 'Cuidar de', m: ['Llevar el auto de', 'Llevar la cuenta de', 'Despertar a'] }
      ] },
      { s: 'detalle', n: 'Lectura: detalles (multirreactivo)', v: [
        { lec: READ[0], p: 'De acuerdo con el texto, ¿qué actividad es difícil?', b: 'Surfear', m: ['Buscar conchas', 'Ver los veleros', 'Hacer castillos de arena'] },
        { lec: READ[1], p: 'De acuerdo con el texto, ¿qué actividad es difícil?', b: 'Hacer tortillas redondas', m: ['Cocinar mole', 'Caminar al mercado', 'Cuidar las flores'] },
        { lec: READ[2], p: 'De acuerdo con el texto, ¿qué hizo el conejo (rabbit) cuando iba ganando?', b: 'Se durmió bajo un árbol', m: ['Ayudó a la tortuga', 'Corrió hasta la meta', 'Se burló del árbol'] },
        { lec: READ[3], p: 'De acuerdo con el texto, ¿qué va a hacer Daniel el próximo año?', b: 'Estudiar inglés en Canadá', m: ['Trabajar en Monterrey', 'Jugar futbol los fines de semana', 'Trabajar como doctor en Canadá'] }
      ] }
    ]
  });
})();
