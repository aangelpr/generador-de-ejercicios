/* Modo prepa - Comunicacion: comunicacion y redaccion, tipos de texto y
   literatura, investigacion e ingles (los 32 reactivos del area) */
(function () {
  'use strict';
  var P = EJ.prepa;

  /* lecturas en ingles del multirreactivo final (misma posicion = mismo texto) */
  var READ = [
    'Every year we go to Florida. We like to go to the beach. My favorite beach is called Emerson Beach. It is very long, with soft sand and palm trees. It is very beautiful. I like to make sandcastles and watch the sailboats go by. Every morning we look for shells in the sand. This year I want to learn to surf. It is hard to surf, but so much fun! My sister is a good surfer and she says she can teach me.',
    'Last summer my family visited my grandparents in Oaxaca. Their house is small, with a big garden full of flowers. It is very colorful. My grandmother cooks mole every Sunday, and I help her. In the afternoons we walk to the market. This year I want to learn to make tortillas. It is difficult to make them round, but my grandmother says she can teach me.'
  ];

  P.temaBanco({
    id: 'prepa-redaccion',
    grupo: 'Comunicacion',
    nombre: 'Comunicacion y redaccion',
    descripcion: 'Barreras e intencion comunicativa, lenguaje denotativo y connotativo, esquema de redaccion, idea principal, oraciones, ortografia, sinonimos y homofonos. Reactivos 1 a 9 del area.',
    etiquetas: ['barreras', 'intencion', 'connotativo', 'ortografia', 'homofonos', 'oracion'],
    items: [
      { s: 'barreras', n: 'Barreras de la comunicacion', v: [
        { p: 'En una fiesta, con la música a todo volumen, Carlos le preguntó la hora a Mario, y Mario respondió que estaba feliz y siguió bailando. ¿Qué tipo de barrera comunicativa se ejemplifica?',
          b: 'Física', m: ['Fisiológica', 'Lingüística', 'Psicológica'] },
        { p: 'Un turista que sólo habla japonés pide indicaciones a un vendedor que sólo habla español y no logran entenderse. ¿Qué barrera comunicativa se presenta?',
          b: 'Lingüística', m: ['Física', 'Fisiológica', 'Psicológica'] },
        { p: 'Luis está tan preocupado por un problema familiar que no pone atención a lo que le explica su maestra. ¿Qué barrera comunicativa se presenta?',
          b: 'Psicológica', m: ['Física', 'Fisiológica', 'Lingüística'] },
        { p: 'Una persona con disfonía (pérdida de la voz) no logra que la escuchen en una junta. ¿Qué barrera comunicativa se presenta?',
          b: 'Fisiológica', m: ['Física', 'Lingüística', 'Psicológica'] }
      ] },
      { s: 'intencion', n: 'Intencion comunicativa', v: [
        { p: 'Identifique la intención comunicativa del texto:<br><i>El vehículo explorador Curiosity tomó en Marte la imagen de una montaña nombrada en honor del astrobiólogo mexicano Rafael Navarro, quien ayudó a desarrollar un laboratorio para analizar la química de rocas y suelos.</i>',
          b: 'Informar', m: ['Describir', 'Narrar', 'Persuadir'] },
        { p: 'Identifique la intención comunicativa del texto:<br><i>¡No esperes más! Inscríbete hoy al taller de robótica y conviértete en el ingeniero del futuro. ¡Cupo limitado!</i>',
          b: 'Persuadir', m: ['Informar', 'Describir', 'Narrar'] },
        { p: 'Identifique la intención comunicativa del texto:<br><i>La casa tenía paredes color mostaza, ventanas altas de madera oscura y un patio lleno de macetas con geranios rojos.</i>',
          b: 'Describir', m: ['Informar', 'Narrar', 'Persuadir'] }
      ] },
      { s: 'lenguaje', n: 'Lenguaje denotativo y connotativo', v: [
        { p: '¿Qué tipo de lenguaje emplea el enunciado?<br><i>La alfombra ahogaba en el silencio mis pasos.</i>', b: 'Connotativo', m: ['Coloquial', 'Denotativo', 'Técnico'] },
        { p: '¿Qué tipo de lenguaje emplea el enunciado?<br><i>El agua hierve a 100 °C al nivel del mar.</i>', b: 'Denotativo', m: ['Connotativo', 'Coloquial', 'Poético'] },
        { p: '¿Qué tipo de lenguaje emplea el enunciado?<br><i>Tus ojos son dos luceros que alumbran mis noches.</i>', b: 'Connotativo', m: ['Denotativo', 'Técnico', 'Científico'] }
      ] },
      { s: 'esquemaRedaccion', n: 'Esquema de redaccion', v: [
        { p: '¿Qué parte del esquema de redacción representa el fragmento?<br><i>Lograr una convivencia armónica en la escuela requiere que todos se comprometan con el respeto y el diálogo. Sólo así se podrá construir un ambiente propicio para el aprendizaje de todos.</i>',
          b: 'Conclusión con resumen y propuesta', m: ['Desarrollo con causa y consecuencia', 'Desarrollo con ejemplo concreto', 'Introducción con pregunta generadora'] },
        { p: '¿Qué parte del esquema de redacción representa el fragmento?<br><i>¿Alguna vez te has preguntado cuánta agua se desperdicia en tu casa cada día? En este texto revisaremos por qué cuidarla es urgente.</i>',
          b: 'Introducción con pregunta generadora', m: ['Conclusión con resumen y propuesta', 'Desarrollo con ejemplo concreto', 'Desarrollo con causa y consecuencia'] },
        { p: '¿Qué parte del esquema de redacción representa el fragmento?<br><i>Por ejemplo, en la escuela de mi colonia se instalaron bebederos y el consumo de botellas de plástico bajó a la mitad en un año.</i>',
          b: 'Desarrollo con ejemplo concreto', m: ['Introducción con pregunta generadora', 'Conclusión con resumen y propuesta', 'Desarrollo con causa y consecuencia'] }
      ] },
      { s: 'ideaPrincipal', n: 'Idea principal', v: [
        { p: 'Lea el texto e identifique la idea principal:<br><i>El Martillo de las brujas es una obra que muestra el pensamiento del hombre medieval; en ella se señala que las mujeres relacionadas con la brujería eran estigmatizadas por la sociedad al grado de llevarlas a la muerte.</i><br>La idea primaria indica que el hombre medieval:',
          b: 'juzgaba y condenaba a las mujeres acusadas de hechicería', m: ['creía que las mujeres eran aliadas del demonio para hacer el mal', 'era intolerante con las mujeres que desafiaban las costumbres', 'culpaba a las mujeres de todos los males'] },
        { p: 'Lea el texto e identifique la idea principal:<br><i>Las abejas polinizan cerca de un tercio de los cultivos que comemos. Sin ellas, la producción de frutas y verduras caería drásticamente y los precios subirían.</i>',
          b: 'Las abejas son indispensables para la producción de alimentos', m: ['Las abejas producen miel', 'Los precios de las verduras suben cada año', 'Un tercio de los cultivos son frutas'] }
      ] },
      { s: 'oraciones', n: 'Oraciones simples y compuestas', v: [
        { rel: 'Relacione cada tipo de oración con sus ejemplos.', cols: ['Tipo de oración', 'Ejemplo'],
          pares: [['Simple', ['Mario y María subieron al monte esta tarde sin descanso', 'El diputado hizo una campaña sucia y deficiente']],
            ['Compuesta', ['Ayer vino mi tío y pidió que lo visitáramos', 'Todos los días mi abuela rezaba para que lloviera']]] },
        { p: 'Una oración compuesta se caracteriza porque tiene:', b: 'dos o más verbos conjugados', m: ['un solo verbo conjugado', 'dos o más sujetos', 'dos o más adjetivos'] }
      ] },
      { s: 'ortografia', n: 'Ortografia', v: [
        { c: 'Una tarde mi tía Lola limpia___a la ___entana de su casa; al dar un paso hacia atrás, trope___ó con una piedra y por poco se caía, sólo fue un ___usto.',
          b: ['b', 'v', 'z', 's'], m: [['b', 'b', 's', 's'], ['v', 'v', 's', 's'], ['v', 'b', 's', 'z'], ['v', 'v', 'z', 'z']], ex: 'Copretérito en -aba con b; ventana con v; tropezó con z; susto con s.' },
        { c: 'Ayer hu___o una fiesta en casa de mi ___ecina y todos se que___aron del ruido.',
          b: ['b', 'v', 'j'], m: [['v', 'b', 'g'], ['b', 'b', 'g'], ['v', 'v', 'j'], ['v', 'b', 'j']], ex: 'Hubo (del verbo haber) lleva b; vecina con v; quejaron con j.' }
      ] },
      { s: 'sinonimos', n: 'Sinonimos y antonimos', v: [
        { p: 'Seleccione el grupo de palabras que sean sinónimos entre sí.', b: 'Rápido, veloz, ágil', m: ['Alegre, triste, divertido', 'Fuerte, débil, robusto', 'Bello, hermoso, feo'] },
        { p: 'Seleccione el grupo de palabras que sean antónimos de "generoso".', b: 'Tacaño, avaro, mezquino', m: ['Dadivoso, espléndido, desprendido', 'Amable, cortés, atento', 'Alegre, feliz, contento'] }
      ] },
      { s: 'homofonos', n: 'Homofonos', v: [
        { c: 'Si no quieres esos zapatos, los puedes ___ a la basura mañana, aprovechando que iremos a ___ para elegir al nuevo representante de la colonia.',
          b: ['botar', 'votar'], m: [['votar', 'botar'], ['botar', 'botar'], ['votar', 'votar']] },
        { c: 'Ya he ___ la tarea, así que ___ los papeles viejos a la basura.',
          b: ['hecho', 'echo'], m: [['echo', 'hecho'], ['hecho', 'hecho'], ['echo', 'echo']], ex: 'Hecho (del verbo hacer) lleva h; echo (del verbo echar, tirar) no.' },
        { c: 'Mi papá ___ que cambiar el ___ del lavabo porque goteaba.',
          b: ['tuvo', 'tubo'], m: [['tubo', 'tuvo'], ['tuvo', 'tuvo'], ['tubo', 'tubo']], ex: 'Tuvo (del verbo tener) con v; tubo (pieza hueca) con b.' }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-textos',
    grupo: 'Comunicacion',
    nombre: 'Tipos de texto y literatura',
    descripcion: 'Textos narrativo, expositivo, periodistico y publicitario; hechos y opiniones; generos literarios, mito, drama, tragedia, figuras retoricas y subgeneros liricos. Reactivos 10 a 21 del area.',
    etiquetas: ['narrativo', 'expositivo', 'nota informativa', 'mito', 'tragedia', 'oda', 'figuras retoricas'],
    items: [
      { s: 'tipoTexto', n: 'Tipo de texto', v: [
        { p: '¿Qué tipo de texto es el fragmento?<br><i>¡Qué frío hacía! Nevaba y comenzaba a oscurecer; era la última noche del año. Por la calle pasaba una pobre niña descalza y con la cabeza descubierta...</i> (H. C. Andersen)',
          b: 'Narrativo', m: ['Argumentativo', 'Descriptivo', 'Expositivo'] },
        { p: '¿Qué tipo de texto es el fragmento?<br><i>Considero que la jornada escolar debería empezar más tarde, porque los adolescentes duermen menos de lo recomendado y eso afecta su rendimiento.</i>',
          b: 'Argumentativo', m: ['Narrativo', 'Descriptivo', 'Expositivo'] }
      ] },
      { s: 'expositivo', n: 'Texto expositivo', v: [
        { p: 'El fragmento corresponde a un texto:<br><i>En Nueva York, 34% de las muertes por covid-19 son de latinos, aunque representan 29% de la población. "La gente pobre paga el precio más alto", concluyó el gobernador, alarmado por las cifras.</i>',
          b: 'expositivo', m: ['científico', 'descriptivo', 'histórico'] },
        { p: 'Un texto que explica de forma objetiva cómo funciona el sistema digestivo, con datos y definiciones, es un texto:', b: 'expositivo', m: ['narrativo', 'argumentativo', 'literario'] }
      ] },
      { s: 'hechos', n: 'Hechos y opiniones', v: [
        { p: 'Los datos del fragmento corresponden a:<br><i>Mañana será inaugurada la exposición "Naturaleza muerta" en el Museo de Historia Natural de la Ciudad de México, a las 10:00 horas.</i>',
          b: 'hechos', m: ['argumentos', 'opiniones', 'suposiciones'] },
        { p: 'El enunciado corresponde a:<br><i>La nueva exposición del museo es la más aburrida que he visto en mi vida.</i>', b: 'una opinión', m: ['un hecho', 'un dato', 'una cita'] }
      ] },
      { s: 'notaInformativa', n: 'Subgeneros periodisticos', v: [
        { p: 'Identifique el subgénero del texto:<br><i>México, 12 de mayo de 2021. La Secretaría de Salud informó que las mujeres embarazadas serán incluidas de inmediato en la Estrategia Nacional de Vacunación, tras revisar las cifras más recientes.</i>',
          b: 'Nota informativa', m: ['De consulta', 'De divulgación científica', 'Didáctico'] },
        { p: 'El texto periodístico en el que el autor da su punto de vista personal sobre un tema de actualidad y lo firma es:', b: 'el artículo de opinión', m: ['la nota informativa', 'la entrevista', 'el reportaje'] }
      ] },
      { s: 'propaganda', n: 'Propaganda y publicidad', v: [
        { p: 'Un cartel de una fundación de derechos humanos dice: "La desigualdad es más violenta que cualquier protesta". ¿Qué tipo de texto es?', b: 'Propagandístico', m: ['Ensayístico', 'Periodístico', 'Publicitario'],
          ex: 'La propaganda difunde ideas; la publicidad vende productos o servicios.' },
        { p: 'Un anuncio dice: "Tenis Rayo: corre más rápido que nunca. ¡Ahora con 30% de descuento!". ¿Qué tipo de texto es?', b: 'Publicitario', m: ['Propagandístico', 'Periodístico', 'Ensayístico'] }
      ] },
      { s: 'periodisticoOpinion', n: 'Textos periodisticos', v: [
        { p: 'Un texto presenta la vida de un famoso cronista deportivo: fue futbolista, árbitro, entrenador y comentarista, fundó un periódico y murió en el año 2000. ¿Qué tipo de texto es?',
          b: 'Semblanza (texto biográfico)', m: ['Ensayo', 'Publicitario', 'Reseña crítica'] },
        { p: 'Un texto resume una película y además la valora, diciendo qué tan buena le pareció al autor y por qué. ¿Qué tipo de texto es?', b: 'Reseña crítica', m: ['Nota informativa', 'Semblanza', 'Instructivo'] }
      ] },
      { s: 'personajes', n: 'Elementos de la narracion', v: [
        { p: 'Lea el fragmento:<br><i>En una granja vivía un Gato muy perezoso que sólo dormía al sol. El Perro, la Gallina y el Burro trabajaban todo el día y lo criticaban, pero el granjero siempre consentía al Gato. Un día, el Gato atrapó al ratón que se comía el maíz desde hacía un año.</i><br>Todos son personajes de la narración, excepto:',
          b: 'el ratón del granjero vecino', m: ['el Gato', 'el Burro', 'la Gallina'] },
        { p: 'En una narración, la persona o voz que cuenta los hechos se llama:', b: 'narrador', m: ['autor', 'protagonista', 'lector'] }
      ] },
      { s: 'mito', n: 'Subgeneros narrativos', v: [
        { p: '¿A qué subgénero pertenece el fragmento?<br><i>Al principio los dioses formaron al hombre con barro, pero se deshacía con el agua; después lo hicieron de madera, pero no tenía alma; al final lo formaron con masa de maíz, y ese hombre sí pudo hablar y adorarlos.</i>',
          b: 'Mito', m: ['Fábula', 'Leyenda', 'Minificción'] },
        { p: '¿A qué subgénero pertenece el fragmento?<br><i>Dicen que en las noches, por los canales de Xochimilco, se escucha el llanto de una mujer vestida de blanco que busca a sus hijos.</i>',
          b: 'Leyenda', m: ['Mito', 'Fábula', 'Novela'] },
        { p: '¿A qué subgénero pertenece el fragmento?<br><i>La zorra, al no alcanzar las uvas, dijo: "No están maduras". Moraleja: quien no consigue algo, lo desprecia.</i>',
          b: 'Fábula', m: ['Mito', 'Leyenda', 'Crónica'] }
      ] },
      { s: 'dramatico', n: 'Genero dramatico', v: [
        { lista: 'Del siguiente listado, identifique las características del género dramático.', k: 2,
          si: ['Acotaciones', 'Diálogos entre personajes', 'Actos y escenas'], no: ['Tesis', 'Narrador', 'Versos con rima obligatoria', 'Moraleja'] }
      ] },
      { s: 'tragedia', n: 'Subgeneros dramaticos', v: [
        { p: 'En una obra griega, el rey Edipo investiga quién mató al antiguo rey y descubre que fue él mismo; al final, destrozado por su destino, se arranca los ojos. ¿A qué subgénero pertenece?',
          b: 'Tragedia', m: ['Comedia', 'Ópera', 'Zarzuela'] },
        { p: 'Una obra de teatro con personajes comunes, situaciones de enredo, humor y final feliz es una:', b: 'comedia', m: ['tragedia', 'oda', 'elegía'] }
      ] },
      { s: 'figuras', n: 'Figuras retoricas', v: [
        { p: 'En los versos de Rubén Darío "Miraba como el alba pura; / sonreía como una flor", ¿a qué elemento del poema se refiere "sonreía como una flor"?', b: 'Figura retórica (símil)', m: ['Estrofa', 'Métrica', 'Rima'] },
        { rel: 'Relacione la figura retórica con su ejemplo.', cols: ['Figura', 'Ejemplo'],
          pares: [['Símil', 'Tus dientes son blancos como la nieve'], ['Metáfora', 'Las perlas de tu boca'], ['Hipérbole', 'Te he dicho un millón de veces'],
            ['Personificación', 'El viento cantaba entre los árboles'], ['Onomatopeya', 'El tic tac del reloj no me deja dormir']] }
      ] },
      { s: 'lirica', n: 'Subgeneros liricos', v: [
        { p: 'Un poema dedicado a alabar o exaltar algo o a alguien (por ejemplo, a la alegría o a una cebolla) es una:', b: 'Oda', m: ['Elegía', 'Himno', 'Sátira'] },
        { p: 'Un poema que expresa dolor por la muerte de un ser querido es una:', b: 'Elegía', m: ['Oda', 'Sátira', 'Himno'] },
        { p: 'Un poema que ridiculiza los vicios de una persona o de la sociedad para criticarlos es una:', b: 'Sátira', m: ['Oda', 'Elegía', 'Égloga'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-investigacion',
    grupo: 'Comunicacion',
    nombre: 'Investigacion',
    descripcion: 'Tecnicas de recopilacion, tipos de investigacion, citas y notas en trabajos academicos. Reactivos 22 a 24 del area.',
    etiquetas: ['observacion', 'correlacional', 'cita', 'nota al pie'],
    items: [
      { s: 'tecnicas', n: 'Tecnicas de recopilacion', v: [
        { p: '¿Qué técnica se usa? Un investigador pasa una hora en un parque observando a los niños jugar, sin intervenir, para describir su comportamiento espontáneo.', b: 'Observación no participante',
          m: ['Grupo focal', 'Investigación documental', 'Observación participante'] },
        { p: '¿Qué técnica se usa? Una investigadora vive un mes en una comunidad, trabaja con ellos en el campo y anota cómo se organizan.', b: 'Observación participante',
          m: ['Observación no participante', 'Encuesta', 'Investigación documental'] },
        { p: '¿Qué técnica se usa? Se reúne a ocho jóvenes para que conversen, guiados por un moderador, sobre su uso de redes sociales.', b: 'Grupo focal',
          m: ['Encuesta', 'Observación no participante', 'Investigación documental'] }
      ] },
      { s: 'tipoInvestigacion', n: 'Tipos de investigacion', v: [
        { p: 'Un investigador reúne el tiempo que los estudiantes dedican al estudio y sus calificaciones, y analiza cómo se relacionan ambas variables sin modificar nada. ¿Qué tipo de investigación es?',
          b: 'Correlacional', m: ['Experimental', 'Descriptiva', 'Exploratoria'] },
        { p: 'Se forman dos grupos de plantas: a uno se le pone fertilizante y al otro no, y se compara su crecimiento. ¿Qué tipo de investigación es?',
          b: 'Experimental', m: ['Correlacional', 'Descriptiva', 'Documental'] },
        { p: 'Se investiga por primera vez un tema del que casi no hay información, para tener una idea general. ¿Qué tipo de investigación es?',
          b: 'Exploratoria', m: ['Experimental', 'Correlacional', 'Explicativa'] }
      ] },
      { s: 'citas', n: 'Citas y notas', v: [
        { c: 'En un trabajo académico, cuando se copian entre comillas las palabras exactas de un autor se hace ___, y la aclaración numerada que aparece abajo de la página se llama ___.',
          b: ['una cita textual', 'nota a pie de página'], m: [['un resumen', 'complemento informativo'], ['un comentario', 'referencia bibliográfica'], ['una paráfrasis', 'comentario breve']] },
        { p: 'Cuando se explican con palabras propias las ideas de un autor, citando la fuente, se hace una:', b: 'paráfrasis', m: ['cita textual', 'nota al pie', 'transcripción'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-ingles',
    grupo: 'Comunicacion',
    nombre: 'Ingles',
    descripcion: 'Wh-questions, verbos modales, presente simple y continuo, pasado simple y continuo, futuro y comprension de lectura. Reactivos 25 a 32 del area.',
    etiquetas: ['ingles', 'wh questions', 'modal', 'past', 'future', 'reading'],
    items: [
      { s: 'wh', n: 'Wh-questions', v: [
        { c: 'Mark: Hi, I am Mark. ___ are you?<br>Lisa: I am Lisa. I am from Mexico. ___ are you from?<br>Mark: I am from Australia. ___ did you arrive?<br>Lisa: Yesterday, at midnight.<br>Mark: ___ did you arrive so late?<br>Lisa: Because I lost my flight.',
          b: ['Who', 'Where', 'When', 'Why'], m: [['What', 'When', 'Where', 'Why'], ['Who', 'Why', 'When', 'Where'], ['What', 'Where', 'When', 'Why'], ['How', 'Where', 'What', 'Why']] },
        { c: '___ is your favorite color? &mdash; Blue.<br>___ old are you? &mdash; I am sixteen.<br>___ is your backpack? &mdash; The black one.',
          b: ['What', 'How', 'Which'], m: [['Which', 'What', 'How'], ['How', 'What', 'Which'], ['What', 'Which', 'How']] }
      ] },
      { s: 'modales', n: 'Verbos modales', v: [
        { c: 'Sara: Hi, teacher! ___ I go to the bathroom?<br>Teacher: You ___ go to the bathroom upstairs; the one on the first floor is closed. And you ___ be on time for class.<br>Sara: Yes, teacher. I ___ be on time.',
          b: ['Can', 'have to', 'must', 'should'], m: [['Should', 'have to', 'must', 'can'], ['Have to', 'can', 'should', 'must'], ['Must', 'should', 'can', 'have to']] },
        { p: 'Choose the correct option: "You ___ smoke in the hospital. It is forbidden."', b: 'must not', m: ['can', 'should', 'have to'] }
      ] },
      { s: 'presente', n: 'Presente simple y continuo', v: [
        { c: 'George: You are in very good shape! What is your secret?<br>Paul: Well, I ___ to the gym three hours per week and I ___ every day. The gym is closed, so I am ___ at home these days.',
          b: ['go', 'run', 'working out'], m: [['goes', 'runs', 'working out'], ['going', 'running', 'work out'], ['go', 'running', 'work out']] },
        { c: 'My sister usually ___ to school by bus, but today she ___ her bike.',
          b: ['goes', 'is riding'], m: [['go', 'rides'], ['is going', 'ride'], ['goes', 'ride']] }
      ] },
      { s: 'pasado', n: 'Pasado simple y continuo', v: [
        { c: 'I ___ my father last Friday. He ___ a delicious soup when I ___. My father ___ me a little.',
          b: ['visited', 'was cooking', 'arrived', 'gave'], m: [['was visiting', 'was cooking', 'arrived', 'give'], ['were visiting', 'cook', 'arrives', 'give'], ['visited', 'cooks', 'were arriving', 'gave']] },
        { c: 'While we ___ TV, the lights ___ off.',
          b: ['were watching', 'went'], m: [['watched', 'were going'], ['are watching', 'go'], ['was watching', 'goes']] }
      ] },
      { s: 'futuro', n: 'Futuro y condicionales', v: [
        { rel: 'Relacione cada base con su complemento.', cols: ['Base', 'Complemento'],
          pares: [['My father will be angry', 'if I fail my exam'], ['I have the tickets for next weekend, I am', 'going to travel'],
            ['By 2050, gasoline cars', 'will disappear'], ['My father will be happy', 'if he wins the lottery']], extra: ['will fly'] },
        { p: 'Choose the correct option: "Look at those black clouds! It ___ rain."', b: 'is going to', m: ['will to', 'goes', 'is rain'] }
      ] },
      { s: 'ideaGeneral', n: 'Lectura: idea general (multirreactivo)', v: [
        { lec: READ[0], p: 'Identifique la idea general del texto.', b: 'Nuestras vacaciones en la playa', m: ['El estado de Florida', 'Los pasatiempos de mi hermana', 'Cómo construir castillos de arena'] },
        { lec: READ[1], p: 'Identifique la idea general del texto.', b: 'Una visita a los abuelos', m: ['La historia de Oaxaca', 'Cómo preparar mole', 'El mercado de la ciudad'] }
      ] },
      { s: 'vocabulario', n: 'Lectura: vocabulario (multirreactivo)', v: [
        { lec: READ[0], p: 'En el texto, ¿qué se describe con la palabra <i>beautiful</i>?', b: 'La playa', m: ['La arena', 'Los castillos', 'Las palmeras'] },
        { lec: READ[1], p: 'En el texto, ¿qué se describe con la palabra <i>colorful</i>?', b: 'El jardín de los abuelos', m: ['El mole', 'El mercado', 'Las tortillas'] }
      ] },
      { s: 'detalle', n: 'Lectura: detalles (multirreactivo)', v: [
        { lec: READ[0], p: 'De acuerdo con el texto, ¿qué actividad es difícil?', b: 'Surfear', m: ['Buscar conchas', 'Ver los veleros', 'Hacer castillos de arena'] },
        { lec: READ[1], p: 'De acuerdo con el texto, ¿qué actividad es difícil?', b: 'Hacer tortillas redondas', m: ['Cocinar mole', 'Caminar al mercado', 'Cuidar las flores'] }
      ] }
    ]
  });
})();
