/* Modo prepa - Humanidades: filosofia, etica, logica y argumentacion
   (los 40 reactivos del area en la version de practica) */
(function () {
  'use strict';
  var P = EJ.prepa;

  /* lecturas de los multirreactivos (misma posicion = mismo texto) */
  var ARG = [
    'Para empezar, los conejos son animales muy inteligentes y aprenden con facilidad a ser aseados. Por si no fuera suficiente, su alimentación es muy económica. Lo más importante, no ladran ni hacen ruidos fuertes. ¿Cómo podremos negar, entonces, que los conejos son las mejores mascotas?',
    'En primer lugar, la bicicleta no contamina. Además, hacer ejercicio diario mejora la salud. Sobre todo, en la ciudad se evita el tráfico. Por lo tanto, la bicicleta es el mejor medio de transporte para ir a la escuela.'
  ];

  P.temaBanco({
    id: 'prepa-filosofia',
    grupo: 'Humanidades',
    nombre: 'Filosofia',
    descripcion: 'Saberes (mito, ciencia, filosofia), caracteristicas y disciplinas de la filosofia, metafisica y metodos filosoficos. Reactivos 1 a 8 del area.',
    etiquetas: ['filosofia', 'mito', 'metafisica', 'hermeneutica'],
    items: [
      { s: 'tipoSaber', n: 'Tipos de saber', v: [
        { p: 'Identifique el área de estudio a la que pertenece el siguiente problema:<br><i>El conocimiento humano no puede ser medido ni determinado; es un error suponer que la verdad reside en leyes invariables y cuantificables. El conocimiento surge de las cualidades de la especie y de la ideología de su época.</i>',
          b: 'Filosófico', m: ['Científico', 'Mitológico', 'Teológico'] },
        { p: 'Identifique el tipo de saber del siguiente texto:<br><i>El dios del maíz entregó a los hombres su cuerpo hecho de mazorca para que pudieran vivir, y por eso cada año se le ofrecen las primeras cosechas.</i>',
          b: 'Mitológico', m: ['Científico', 'Filosófico', 'Técnico'] },
        { p: 'Identifique el tipo de saber del siguiente texto:<br><i>Se midió la temperatura de ebullición del agua en distintas altitudes y se comprobó que disminuye conforme baja la presión atmosférica.</i>',
          b: 'Científico', m: ['Filosófico', 'Mitológico', 'Teológico'] }
      ] },
      { s: 'mitoCiencia', n: 'Mito, ciencia y filosofia', v: [
        { c: 'La ___ es un conjunto de relatos fabulosos que intentan explicar el origen del universo y de los seres que lo habitan. La ___, por su parte, estudia la naturaleza con base en la observación y la experimentación.',
          b: ['mitología', 'ciencia'], m: [['historia', 'metafísica'], ['ciencia', 'religión'], ['filosofía', 'historia'], ['religión', 'mitología']] },
        { c: 'La ___ busca explicar la realidad mediante la razón y la argumentación, mientras que la ___ la explica a partir de la fe y la revelación divina.',
          b: ['filosofía', 'teología'], m: [['ciencia', 'mitología'], ['teología', 'filosofía'], ['historia', 'ciencia'], ['mitología', 'ciencia']] }
      ] },
      { s: 'vision', n: 'Vision de la filosofia', v: [
        { p: 'Identifique el tipo de visión que caracteriza a la filosofía en la siguiente descripción:<br><i>Lo bueno se vincula al juicio; éste surge de la ideología y de las circunstancias sociales, naturales o metafísicas del ser humano, que deben verse en conjunto.</i>',
          b: 'Totalizadora', m: ['Científica', 'Determinista', 'Teológica'] },
        { p: 'La filosofía no se conforma con respuestas superficiales y busca las causas últimas de las cosas. Esta característica se conoce como:',
          b: 'radicalidad', m: ['universalidad', 'racionalidad', 'empirismo'] }
      ] },
      { s: 'caracteristicas', n: 'Caracteristicas de la filosofia', v: [
        { p: 'Cuando se busca explicar de manera integral la totalidad de lo que existe, nos referimos a la:', b: 'universalidad', m: ['fundamentalidad', 'racionalidad', 'radicalidad'] },
        { p: 'Cuando la filosofía fundamenta sus explicaciones en argumentos lógicos y no en la fe o la tradición, hablamos de su:', b: 'racionalidad', m: ['universalidad', 'radicalidad', 'totalidad'] }
      ] },
      { s: 'metafisica', n: 'Objeto de la metafisica', v: [
        { p: 'Identifique dos objetos de estudio de la metafísica en el caso:<br><i>El origen de todas las cosas debe ser el mismo que las aleja de la extinción total; el cosmos parece haberse dispuesto casi por azar.</i>',
          b: 'Ser y existir', m: ['Razón y origen', 'Reflexión y Dios', 'Verdad y saber'] },
        { p: 'La rama de la filosofía que estudia el ser en cuanto ser (lo que es y existe) es la:', b: 'ontología', m: ['estética', 'lógica', 'epistemología'] }
      ] },
      { s: 'disciplinas', n: 'Disciplinas filosoficas', v: [
        { p: 'Las siguientes son disciplinas de la filosofía, excepto:', b: 'utopía', m: ['estética', 'lógica', 'ontología', 'epistemología'] },
        { rel: 'Relacione la disciplina filosófica con su objeto de estudio.', cols: ['Disciplina', 'Estudia'],
          pares: [['Ética', 'La moral y los actos humanos'], ['Estética', 'La belleza y el arte'], ['Lógica', 'Las reglas del razonamiento correcto'],
            ['Epistemología', 'El conocimiento científico'], ['Ontología', 'El ser en cuanto ser']] }
      ] },
      { s: 'metodos', n: 'Metodos filosoficos', v: [
        { p: 'Sergio interpreta los textos religiosos de forma literal; Agustín dice que, para comprenderlos, hay que considerar sus circunstancias históricas y culturales. ¿En qué método filosófico se basa Agustín?',
          b: 'Hermenéutico', m: ['Dialéctico', 'Empírico', 'Fenomenológico'] },
        { p: 'El método que avanza por la confrontación de una tesis con su antítesis para llegar a una síntesis es el:', b: 'dialéctico', m: ['hermenéutico', 'fenomenológico', 'mayéutico'] },
        { p: 'El método de Sócrates, que por medio de preguntas ayuda al interlocutor a descubrir la verdad por sí mismo, es la:', b: 'mayéutica', m: ['dialéctica hegeliana', 'hermenéutica', 'fenomenología'] }
      ] },
      { s: 'corrientes', n: 'Corrientes filosoficas', v: [
        { p: 'La corriente que sostiene que la realidad que percibimos depende de las ideas y de la conciencia del sujeto se conoce como:', b: 'idealismo', m: ['materialismo', 'empirismo', 'positivismo'] },
        { p: 'La corriente que afirma que todo conocimiento proviene de la experiencia sensible es el:', b: 'empirismo', m: ['racionalismo', 'idealismo', 'existencialismo'] },
        { p: 'La corriente que afirma que la razón es la fuente principal del conocimiento (Descartes) es el:', b: 'racionalismo', m: ['empirismo', 'materialismo', 'pragmatismo'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-etica',
    grupo: 'Humanidades',
    nombre: 'Etica',
    descripcion: 'Reflexion etica, corrientes eticas, bioetica, libertad y determinismo, conciencia, utopia y derechos. Reactivos 9 a 25 del area.',
    etiquetas: ['etica', 'moral', 'utilitarismo', 'estoicismo', 'determinismo', 'utopia', 'derechos'],
    items: [
      { s: 'reflexionEtica', n: 'Reflexion etica', v: [
        { lista: '¿Cuáles de las siguientes son características de una reflexión ética?',
          si: ['Los actos humanos se vuelven objeto del pensamiento', 'Se caracteriza por su generalidad', 'Produce conceptos'],
          no: ['Es una reflexión relativa a cada persona', 'Son leyes o normas obligatorias', 'Se basa en la fe'] }
      ] },
      { s: 'disciplinaEtica', n: 'Que estudia la etica', v: [
        { p: 'Seleccione la disciplina filosófica que estudia los fundamentos de las normas que rigen las relaciones entre los seres humanos.', b: 'Ética', m: ['Estética', 'Lógica', 'Metafísica'] },
        { c: 'La ___ es el conjunto de normas y costumbres de una sociedad, mientras que la ___ es la reflexión filosófica sobre esas normas.',
          b: ['moral', 'ética'], m: [['ética', 'moral'], ['ley', 'política'], ['moral', 'religión']] }
      ] },
      { s: 'ethos', n: 'Ethos', v: [
        { p: '¿Cuál es el significado del concepto griego <i>ethos</i>?', b: 'Hábito y costumbre', m: ['Justicia', 'Lo bueno y lo bello', 'Razón'] },
        { p: 'La palabra latina <i>mos, moris</i>, de la que viene "moral", significa:', b: 'costumbre', m: ['ley', 'virtud', 'felicidad'] }
      ] },
      { s: 'aristoteles', n: 'Etica de Aristoteles', v: [
        { p: 'Las siguientes frases expresan el pensamiento de Aristóteles sobre el bien, excepto:', b: 'nada es bueno si no me es propio',
          m: ['cada ser será bueno si cumple con el fin que le es propio', 'el fin o el bien propio del ser humano es la felicidad', 'la virtud es el justo medio entre el exceso y el defecto'] },
        { p: 'Para Aristóteles, la valentía es el justo medio entre:', b: 'la cobardía y la temeridad', m: ['la avaricia y el derroche', 'la tristeza y la alegría', 'la humildad y la soberbia'] }
      ] },
      { s: 'utilitarismo', n: 'Corrientes eticas', v: [
        { p: 'Un tranvía sin control va hacia cinco personas atadas a la vía; si se acciona un botón, cambiará a otra vía donde hay una persona. ¿Qué corriente ética, que busca el mayor bien para el mayor número, da bases para resolverlo?',
          b: 'Utilitarismo', m: ['Contractualismo', 'Estoicismo', 'Hedonismo'] },
        { p: 'La corriente ética que considera que el placer es el bien supremo y que debe buscarse evitando el dolor es el:', b: 'hedonismo', m: ['estoicismo', 'utilitarismo', 'contractualismo'] },
        { p: 'Kant afirma que debemos actuar de modo que nuestra regla de acción pueda volverse ley universal. Esto se conoce como:', b: 'imperativo categórico', m: ['imperativo hipotético', 'justo medio', 'principio de utilidad'] }
      ] },
      { s: 'estoicismo', n: 'Estoicismo', v: [
        { p: 'Las siguientes ideas se explican desde el estoicismo, excepto:', b: 'la felicidad del hombre radica en el placer de sus experiencias',
          m: ['no debemos ser esclavos de nuestros deseos', 'lo que se presenta puede ser una oportunidad para superar obstáculos', 'hay que aceptar con serenidad lo que no depende de nosotros'] }
      ] },
      { s: 'ataraxia', n: 'Ataraxia', v: [
        { p: 'Las siguientes son características de la ataraxia, excepto:', b: 'culpabilidad', m: ['ausencia de perturbación', 'búsqueda de la felicidad', 'serenidad'] },
        { p: 'Para Epicuro, el estado de tranquilidad del alma, libre de perturbaciones, se llama:', b: 'ataraxia', m: ['apatía', 'eudaimonía', 'catarsis'] }
      ] },
      { s: 'antropocentrismo', n: 'Antropocentrismo', v: [
        { p: 'Identifique el enunciado que hace referencia al antropocentrismo.', b: 'El mundo natural existe para beneficio de los seres humanos',
          m: ['El ser humano es parte de la totalidad del sistema', 'Todos los seres vivos tienen un valor propio, independiente de su utilidad', 'Los seres humanos tienen la obligación moral de proteger el ambiente'] }
      ] },
      { s: 'biocentrismo', n: 'Criterios bioeticos', v: [
        { p: 'Sergio defiende prohibir los espectáculos con animales porque son seres sintientes que merecen respeto. ¿A qué criterio ético corresponde su postura?',
          b: 'Biocentrismo', m: ['Antropocentrismo', 'Ecocentrismo', 'Teocentrismo'] },
        { p: 'Lucía sostiene que lo valioso es el ecosistema completo (ríos, bosques, especies) y no sólo cada ser vivo por separado. ¿A qué criterio corresponde?',
          b: 'Ecocentrismo', m: ['Biocentrismo', 'Antropocentrismo', 'Teocentrismo'] }
      ] },
      { s: 'libertad', n: 'Determinismo y libertad', v: [
        { p: 'Edson cree que le va mal por la posición de los astros; Edwin responde que se debe a las decisiones que ha tomado. ¿A qué noción ética corresponde la discusión?',
          b: 'Determinismo y libertad', m: ['Autonomía y heteronomía', 'Capitalismo y socialismo', 'Marxismo y leninismo'] },
        { p: 'Ana cumple el reglamento sólo por miedo al castigo; Rosa lo cumple porque está convencida de que es correcto. ¿Qué nociones éticas ilustran?',
          b: 'Heteronomía y autonomía', m: ['Determinismo y libertad', 'Utopía y distopía', 'Hedonismo y estoicismo'] }
      ] },
      { s: 'determinismo', n: 'Determinismo', v: [
        { p: 'Los seguidores de esta doctrina indican que todos los sucesos, incluidos los pensamientos y las decisiones morales, están regidos por causas previas.', b: 'Determinismo', m: ['Autonomía', 'Conciencia', 'Libertad'] },
        { p: 'La capacidad de una persona de darse a sí misma sus propias normas morales se llama:', b: 'autonomía', m: ['heteronomía', 'determinismo', 'alienación'] }
      ] },
      { s: 'conciencia', n: 'Tipos de conciencia', v: [
        { rel: 'Relacione cada concepto con el ejemplo que le corresponde.', cols: ['Concepto', 'Ejemplo'],
          pares: [['Conciencia', 'Tener presente que en mi colonia están aumentando los asaltos'],
            ['Autoconciencia', 'Tener presente que los asaltos también me pueden pasar a mí'],
            ['Conciencia social', 'Tener presente que los asaltos son una consecuencia del desempleo'],
            ['Conciencia política', 'Tener presente que los asaltos pueden disminuir si mejoran las políticas laborales']] }
      ] },
      { s: 'equidad', n: 'Conflictos de derechos', v: [
        { p: 'En una comunidad se debate instalar cámaras de vigilancia para mejorar la seguridad, pero algunos vecinos dicen que invaden su privacidad. ¿Qué medida resuelve mejor el conflicto entre ambos derechos?',
          b: 'Establecer reglas estrictas de acceso y uso de las imágenes grabadas', m: ['Limitar las cámaras sólo a zonas de alta criminalidad', 'Prohibir por completo las cámaras en lugares públicos', 'Instalar cámaras en todas las casas'] }
      ] },
      { s: 'utopia', n: 'Proyecto utopico', v: [
        { p: 'Una comunidad establece un proyecto en el que todos trabajan y se ayudan, no hay propiedad privada y todos tienen acceso a educación, salud y vivienda. Se basa en un proyecto:',
          b: 'utópico', m: ['distópico', 'totalitario', 'liberal'] },
        { p: 'Una novela describe una sociedad futura vigilada todo el tiempo, sin libertad y controlada por un gobierno opresor. Es un ejemplo de:',
          b: 'distopía', m: ['utopía', 'humanismo', 'democracia'] }
      ] },
      { s: 'pensamientoUtopico', n: 'Pensamiento utopico', v: [
        { c: 'El pensamiento utópico es una forma de reflexión sobre la vida ___, cuya característica principal es que el ser humano, mediante el uso de la ___, puede alcanzar una organización social perfecta.',
          b: ['política', 'razón'], m: [['económica', 'emoción'], ['religiosa', 'fe'], ['cultural', 'tradición']] },
        { p: '¿Quién escribió <i>Utopía</i> (1516), obra que dio nombre a este tipo de pensamiento?', b: 'Tomás Moro', m: ['Platón', 'Karl Marx', 'Tomás Campanella'] }
      ] },
      { s: 'consuetudinario', n: 'Derechos humanos y usos y costumbres', v: [
        { p: '¿Cuál de los siguientes ejemplos plantea una tensión entre derechos humanos y derechos consuetudinarios (usos y costumbres)?',
          b: 'Una comunidad que, por tradición, no permite votar a las mujeres en la asamblea', m: ['La explotación laboral infantil de una marca trasnacional', 'La producción de ganado en una comunidad agrícola', 'El cobro de impuestos federales'] }
      ] },
      { s: 'derechoConsuetudinario', n: 'Derecho consuetudinario', v: [
        { p: '¿Cuál de las siguientes situaciones tiene que ver con los derechos consuetudinarios de los pueblos originarios?',
          b: 'Determinar si un grupo étnico puede recibir educación en su lengua materna', m: ['Evaluar la situación económica de una comunidad', 'Documentar la biodiversidad de un área natural protegida', 'Explicar las leyes de tránsito de una ciudad'] },
        { p: 'El derecho consuetudinario se basa principalmente en:', b: 'las costumbres y tradiciones de una comunidad', m: ['las leyes escritas por el Congreso', 'los tratados internacionales', 'las decisiones de los jueces federales'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-logica',
    grupo: 'Humanidades',
    nombre: 'Logica y argumentacion',
    descripcion: 'Premisas y conclusion, condicionales, leyes logicas, reglas de inferencia, conectivas, validez y falacias. Reactivos 26 a 35 del area.',
    etiquetas: ['logica', 'premisa', 'modus ponens', 'falacia', 'silogismo'],
    items: [
      { s: 'premisas', n: 'Premisas (multirreactivo)', v: [
        { lec: ARG[0], p: 'Los siguientes enunciados son premisas del razonamiento anterior, excepto:', b: 'los conejos son las mejores mascotas',
          m: ['los conejos son animales muy inteligentes', 'su alimentación es muy económica', 'los conejos no ladran'], ex: '"Los conejos son las mejores mascotas" es la conclusión.' },
        { lec: ARG[1], p: 'Los siguientes enunciados son premisas del razonamiento anterior, excepto:', b: 'la bicicleta es el mejor medio de transporte para ir a la escuela',
          m: ['la bicicleta no contamina', 'hacer ejercicio diario mejora la salud', 'en la ciudad se evita el tráfico'], ex: 'Lo que viene después de "por lo tanto" es la conclusión.' }
      ] },
      { s: 'conector', n: 'Conector de conclusion (multirreactivo)', v: [
        { lec: ARG[0], p: '¿Cuál es el conector que indica la conclusión del razonamiento anterior?', b: 'Entonces', m: ['Lo más importante', 'Para empezar', 'Por si no fuera suficiente'] },
        { lec: ARG[1], p: '¿Cuál es el conector que indica la conclusión del razonamiento anterior?', b: 'Por lo tanto', m: ['En primer lugar', 'Además', 'Sobre todo'] }
      ] },
      { s: 'condicional', n: 'Condicional y bicondicional', v: [
        { p: 'Los papás de Mateo le dijeron: "Si lavas los trastes, vas al cine". Él los lavó, pero no lo dejaron ir porque reprobó Física. Mateo dice que no cumplieron. ¿Quién tiene razón?',
          b: 'Sus papás, porque "si lavas los trastes vas al cine" no implica que lavar trastes sea la única condición',
          m: ['Mateo, porque "si lavas los trastes vas al cine" implica que lavar trastes es la única condición', 'Sus papás, porque "si y sólo si" no implica una condición necesaria y suficiente', 'Mateo, porque una condicional siempre es falsa'] }
      ] },
      { s: 'adicion', n: 'Leyes logicas', v: [
        { p: 'Justina acepta que "Naucalpan es más violento que Chimalhuacán". Daniel dice que entonces también es verdad "Naucalpan es más violento que Chimalhuacán o mi uniforme es morado". Justina dice que es falso porque su uniforme es gris. ¿Quién tiene razón?',
          b: 'Daniel, porque está aplicando la ley de la adición', m: ['Justina, porque una de las proposiciones es falsa', 'Justina, porque se basa en la experiencia', 'Daniel, porque está aplicando la disyunción exclusiva'],
          ex: 'Una disyunción (o) es verdadera si al menos una de sus partes es verdadera.' }
      ] },
      { s: 'modusPonens', n: 'Reglas de inferencia', v: [
        { p: '¿Qué regla de inferencia se usa?<br>Premisa 1. p<br>Premisa 2. p &rarr; q<br>Conclusión. Por lo tanto, q', b: 'Modus ponens', m: ['Modus tollens', 'Silogismo disyuntivo', 'Silogismo hipotético'] },
        { p: '¿Qué regla de inferencia se usa?<br>Premisa 1. p &rarr; q<br>Premisa 2. q &rarr; r<br>Conclusión. Por lo tanto, p &rarr; r', b: 'Silogismo hipotético', m: ['Modus ponens', 'Modus tollens', 'Silogismo disyuntivo'] }
      ] },
      { s: 'modusTollens', n: 'Reglas de inferencia en palabras', v: [
        { p: '¿Qué regla de inferencia se usa?<br>Premisa 1. Si tienes sed, entonces tomas agua.<br>Premisa 2. No tomas agua.<br>Conclusión. Por lo tanto, no tienes sed.', b: 'Modus tollens', m: ['Modus ponens', 'Silogismo disyuntivo', 'Silogismo hipotético'] },
        { p: '¿Qué regla de inferencia se usa?<br>Premisa 1. Voy al cine o voy al parque.<br>Premisa 2. No voy al cine.<br>Conclusión. Por lo tanto, voy al parque.', b: 'Silogismo disyuntivo', m: ['Modus ponens', 'Modus tollens', 'Silogismo hipotético'] }
      ] },
      { s: 'conectivas', n: 'Valor de verdad', v: [
        { p: 'En el enunciado "Fui al banco, pero no tenía dinero", el "pero" funciona como una conjunción. ¿Cuándo es verdadera?', b: 'Cuando las dos proposiciones son verdaderas',
          m: ['Cuando la primera es verdadera y la segunda falsa', 'Cuando la primera es falsa y la segunda verdadera', 'Cuando las dos son falsas'] },
        { p: 'Una condicional (p &rarr; q) es falsa únicamente cuando:', b: 'p es verdadera y q es falsa', m: ['p es falsa y q es verdadera', 'ambas son falsas', 'ambas son verdaderas'] }
      ] },
      { s: 'validez', n: 'Validez de un argumento', v: [
        { p: 'Determine si el argumento es válido:<br>Todas las ardillas comen bellotas. Alvin es una ardilla. Por lo tanto, Alvin come bellotas.',
          b: 'Es válido porque la conclusión se sigue necesariamente de las premisas', m: ['Es inválido porque no sigue el silogismo hipotético', 'Es válido porque todas las premisas son verdaderas', 'Es inválido porque no sigue el silogismo disyuntivo'] },
        { p: 'Determine si el argumento es válido:<br>Todos los perros son mamíferos. Mi gato es mamífero. Por lo tanto, mi gato es perro.',
          b: 'Es inválido porque la conclusión no se sigue de las premisas', m: ['Es válido porque las premisas son verdaderas', 'Es válido porque sigue el modus ponens', 'Es inválido porque tiene sólo dos premisas'] }
      ] },
      { s: 'falacias', n: 'Falacias', v: [
        { p: 'Al plantear que sólo hay dos soluciones posibles a una situación cuando evidentemente hay más, ¿de qué falacia se trata?', b: 'Del falso dilema', m: ['Circular', 'Generalización apresurada', 'Populista'] },
        { p: '"Dos turistas extranjeros fueron groseros conmigo; todos los extranjeros son groseros". ¿Qué falacia es?', b: 'Generalización apresurada', m: ['Falso dilema', 'Ad hominem', 'Petición de principio'] },
        { p: '"No le creas a su propuesta sobre el reciclaje; él ni siquiera terminó la escuela". ¿Qué falacia es?', b: 'Ad hominem', m: ['Falso dilema', 'Ad populum', 'Generalización apresurada'] }
      ] },
      { s: 'peticionPrincipio', n: 'Peticion de principio', v: [
        { p: 'Descubra en qué consiste la petición de principio del razonamiento:<br><i>La libertad de expresión es benéfica para la democracia, pues es útil para la comunidad que todo el pueblo pueda manifestar sus opiniones.</i>',
          b: 'La premisa ya establece lo que dice la conclusión', m: ['Se apoya en la intimidación o la fuerza de un cargo', 'La premisa es políticamente correcta y persuasiva', 'Es probable que produzca sociedades plurales'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-pensamiento',
    grupo: 'Humanidades',
    nombre: 'Pensamiento en Mexico y Latinoamerica',
    descripcion: 'Modernidad y posmodernidad, positivismo en Mexico, alienacion, Habermas y filosofia de la liberacion. Reactivos 36 a 40 del area.',
    etiquetas: ['posmodernidad', 'positivismo', 'alienacion', 'habermas', 'liberacion'],
    items: [
      { s: 'posmodernidad', n: 'Modernidad y posmodernidad', v: [
        { p: 'México accedió a la modernidad en el siglo XX con obras públicas, tecnología y una gran confianza en la razón y la ciencia; sin embargo, el país vive pobreza, violencia e injusticia, y la modernidad no llega a todos. ¿Cómo se designa este estado de la cultura?',
          b: 'Posmodernidad', m: ['Comunismo y capitalismo', 'Renacimiento e Ilustración', 'Socialismo utópico'] }
      ] },
      { s: 'positivismo', n: 'Positivismo en Mexico', v: [
        { p: 'Una interpretación de la historia de México dice: la Colonia fue la etapa teológica, la Independencia la metafísica y la estabilidad del Porfiriato la etapa científica e industrial. ¿Qué corriente es?',
          b: 'Positivismo', m: ['Empirismo', 'Racionalismo', 'Vitalismo'] },
        { p: '¿Quién introdujo el positivismo en la educación mexicana con la Escuela Nacional Preparatoria (1867)?', b: 'Gabino Barreda', m: ['José Vasconcelos', 'Justo Sierra', 'Antonio Caso'] }
      ] },
      { s: 'alienacion', n: 'Alienacion', v: [
        { p: 'Las siguientes son características de la alienación, excepto:', b: 'autonomía', m: ['aislamiento', 'anomia', 'impotencia'] },
        { p: 'Para Marx, el trabajador que no se reconoce en lo que produce porque el producto pertenece a otro vive un proceso de:', b: 'alienación', m: ['emancipación', 'autonomía', 'ataraxia'] }
      ] },
      { s: 'habermas', n: 'Accion comunicativa', v: [
        { p: 'De acuerdo con la teoría de la acción comunicativa de Jürgen Habermas, ¿qué implicación ético-moral tiene un argumento?', b: 'La búsqueda de un consenso racional entre los interlocutores',
          m: ['La imposición de una verdad objetiva mediante la fuerza', 'La subordinación de la ética al poder político', 'La aceptación pasiva de normas sociales sin reflexión'] }
      ] },
      { s: 'liberacion', n: 'Filosofia de la liberacion', v: [
        { p: '¿Cuál opción plantea una implicación ético-política de la filosofía de la liberación (Enrique Dussel)?', b: 'La necesidad de luchar contra la opresión de los pueblos excluidos y por una distribución justa de la riqueza',
          m: ['Mantener la estructura socioeconómica actual para preservar la estabilidad', 'Proteger sobre todo la libertad de mercado', 'Promover una sociedad meritocrática basada sólo en el esfuerzo individual'] }
      ] }
    ]
  });
})();
