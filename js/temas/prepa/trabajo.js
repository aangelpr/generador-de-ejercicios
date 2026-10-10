/* Modo prepa - Introduccion al trabajo (20 reactivos) y la capacitacion de
   Recursos humanos (40 reactivos): Ley Federal del Trabajo, administracion,
   reclutamiento, nomina y seguridad e higiene.

   Criterios de la Ley Federal del Trabajo que se usan en las cuentas:
   - salario diario = salario mensual / 30
   - vacaciones (reforma 2023): 1 año 12 dias, 2 años 14, 3 años 16, 4 años 18,
     5 años 20; del sexto al decimo año, 22
   - prima vacacional: 25% del salario de los dias de vacaciones
   - aguinaldo: 15 dias de salario, proporcional a los dias trabajados (/365)
   - horas extra: las primeras 9 de la semana se pagan al doble
   - PTU: 10% de las utilidades */
(function () {
  'use strict';
  var P = EJ.prepa, F = EJ.fmt;

  /* $2,989.73 */
  function pesos(v) {
    var s = (Math.round(v * 100) / 100).toFixed(2).split('.');
    return '$' + s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + s[1];
  }
  /* $2,990 (cantidades enteras) */
  function miles(v) { return '$' + String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  var VAC = { 1: 12, 2: 14, 3: 16, 4: 18, 5: 20 };

  /* tabla mensual del ISR (Anexo 8, RMF 2025): limite inferior, cuota fija, % */
  var ISR = [[0.01, 0, 1.92], [746.05, 14.32, 6.40], [6332.06, 371.83, 10.88], [11128.02, 893.63, 16.00], [12935.83, 1182.88, 17.92], [15487.72, 1640.18, 21.36]];
  function isr(base) {
    var fila = ISR[0];
    ISR.forEach(function (f) { if (base >= f[0]) fila = f; });
    return { fila: fila, valor: fila[1] + (base - fila[0]) * fila[2] / 100 };
  }
  function tablaISR() {
    var h = '<table class="tabla"><tr><th>Límite inferior</th><th>Límite superior</th><th>Cuota fija</th><th>% sobre excedente</th></tr>';
    for (var i = 1; i < ISR.length - 1; i++) {
      h += '<tr><td>' + pesos(ISR[i][0]) + '</td><td>' + pesos(ISR[i + 1][0] - 0.01) + '</td><td>' + pesos(ISR[i][1]) + '</td><td>' + ISR[i][2].toFixed(2) + '%</td></tr>';
    }
    return h + '</table><small>Tarifa mensual del ISR (fragmento).</small><br>';
  }

  var NOMBRES = ['Alfredo', 'Norma', 'Jesús', 'Emilia', 'Roberto', 'Luis', 'Patricia', 'Andrea', 'Mario', 'Karla'];

  /* ================= temario de la guia (10. Introduccion al trabajo) =================
     Preguntas armadas al azar con los temas de la guia "Temas fundamentales y
     bibliografia" y la Ley Federal del Trabajo. */

  /* "a que grupo pertenece": la respuesta es el grupo del ejemplo */
  function clasifica(r, grupos, pregunta, extra) {
    var nombres = Object.keys(grupos), g = r.elige(nombres), ej = r.elige(grupos[g]);
    return { p: pregunta(ej), b: g, m: nombres.filter(function (x) { return x !== g; }).concat(extra || []) };
  }
  function cita(t) { return '<br><i>' + t + '</i>'; }

  function qCaracteristica(r) {
    var q = clasifica(r, {
      'Fortaleza': ['Soy perseverante: no me rindo hasta terminar lo que empiezo', 'Soy honesto y responsable, y eso me ayuda a lograr mis metas'],
      'Habilidad': ['Sé usar una hoja de cálculo para organizar datos', 'Puedo reparar aparatos eléctricos sencillos'],
      'Necesidad': ['Requiero un horario flexible para seguir estudiando', 'Necesito un trabajo cerca de casa para cuidar a mi abuela'],
      'Actitud': ['Llego a cada clase con buena disposición para aprender', 'Recibo las críticas con buena disposición para mejorar'],
      'Área de oportunidad': ['Me cuesta hablar en público y quiero mejorar en eso', 'Suelo dejar las tareas para el último momento y debo corregirlo'] },
      function (ej) { return '¿Qué característica personal describe la frase?' + cita('"' + ej + '."'); });
    q.ex = 'Fortalezas: aspectos positivos que ayudan a lograr metas. Habilidades: capacidades para hacer una tarea. Necesidades: lo que requerimos para estar bien. Actitudes: disposición ante las situaciones. Áreas de oportunidad: lo que podemos mejorar.';
    return q;
  }
  function qSector(r) {
    var q = clasifica(r, {
      'Primario': ['la pesca', 'la agricultura', 'la ganadería', 'la minería'],
      'Secundario': ['una fábrica de automóviles', 'una empresa de construcción', 'una planta que embotella refrescos'],
      'Terciario': ['el comercio', 'el transporte de pasajeros', 'un hotel', 'un banco'],
      'Cuaternario': ['un laboratorio de biotecnología', 'un centro de investigación científica', 'el desarrollo de inteligencia artificial'] },
      function (ej) { return '¿A qué sector económico pertenece ' + ej + '?'; });
    q.ex = 'Primario: extrae recursos naturales. Secundario: transforma materias primas. Terciario: ofrece servicios. Cuaternario: investigación y conocimiento.';
    return q;
  }
  function qPlazo(r) {
    var q = clasifica(r, {
      'Corto plazo': ['Aprobar el examen de la próxima semana', 'Terminar este mes el curso de computación'],
      'Mediano plazo': ['Terminar una carrera técnica en tres años', 'Ahorrar en dos años para comprar una motocicleta'],
      'Largo plazo': ['Tener mi propia empresa en quince años', 'Comprar una casa dentro de veinte años'] },
      function (ej) { return 'En un plan de vida, ¿qué tipo de meta es la siguiente?' + cita(ej + '.'); }, ['Meta imposible']);
    q.ex = 'El plan de vida organiza metas a corto, mediano y largo plazo; deben ser realistas y flexibles, e indicar los recursos para lograrlas.';
    return q;
  }
  function qFuente(r) {
    var q = clasifica(r, {
      'Fuente interna': ['Promover a un empleado de la misma empresa a un puesto vacante', 'Pedir a los trabajadores que recomienden a alguien del mismo departamento para un ascenso'],
      'Fuente externa': ['Una bolsa de trabajo universitaria', 'Una agencia de colocación de personal'],
      'Medio de reclutamiento': ['Un anuncio en una plataforma de empleo por internet', 'Un cartel con la vacante en la entrada de la empresa'] },
      function (ej) { return 'En el reclutamiento, ¿qué es lo siguiente?' + cita(ej + '.'); }, ['Prueba psicométrica']);
    q.ex = 'Las fuentes son el origen de los candidatos: internas (promociones dentro de la empresa) o externas (bolsas de trabajo, agencias). Los medios son las herramientas para atraerlos (anuncios, plataformas).';
    return q;
  }
  function qDocumento(r) {
    var q = clasifica(r, {
      'Currículum vitae': ['Sintetiza la trayectoria académica y profesional del candidato'],
      'Carta de presentación': ['Personaliza la postulación y destaca la motivación del candidato para el puesto'],
      'Solicitud de empleo': ['Formato de la empresa que estandariza la información de todos los candidatos para compararlos'] },
      function (ej) { return '¿Qué documento para la búsqueda de empleo se describe?' + cita(ej + '.'); }, ['Contrato colectivo', 'Recibo de nómina']);
    q.ex = 'Currículum: trayectoria. Carta de presentación: motivación e idoneidad. Solicitud de empleo: formato que estandariza los datos para compararlos.';
    return q;
  }
  function qEntrevista(r) {
    var q = clasifica(r, {
      'De estrés': ['El entrevistador interrumpe y presiona al candidato para ver cómo reacciona bajo tensión'],
      'Grupal': ['Se entrevista a seis candidatos al mismo tiempo y se observa cómo interactúan'],
      'Por competencias': ['Se pide al candidato que cuente una situación real en la que resolvió un conflicto en su trabajo anterior'],
      'De juego de roles': ['El candidato debe actuar como vendedor frente a un cliente simulado'],
      'Estructurada': ['A todos los candidatos se les hacen las mismas preguntas, en el mismo orden'] },
      function (ej) { return '¿Qué tipo de entrevista de trabajo se describe?' + cita(ej + '.'); });
    q.ex = 'Entre los tipos de entrevista están las cerradas, abiertas, por competencias, de estrés, estructuradas, grupales y de juego de roles; las pruebas psicométricas las complementan.';
    return q;
  }
  function qTramite(r) {
    var T = [['¿Ante qué institución te identifica el RFC para cumplir tus obligaciones fiscales?', 'El SAT', ['El IMSS', 'Una AFORE', 'El INE', 'El INFONAVIT']],
      ['¿En qué institución te registra el Número de Seguridad Social (NSS) para recibir servicios médicos y prestaciones?', 'El IMSS', ['El SAT', 'Una AFORE', 'El INE', 'La SEP']],
      ['¿Qué administra una AFORE?', 'Las aportaciones destinadas al retiro del trabajador', ['Los impuestos del trabajador', 'Las consultas médicas del trabajador', 'El registro de los votantes', 'Los créditos escolares']],
      ['¿Qué trámite identifica a una persona ante el SAT para pagar impuestos?', 'El RFC', ['El NSS', 'La AFORE', 'La credencial para votar', 'El acta de nacimiento']]];
    var t = r.elige(T);
    return { p: t[0], b: t[1], m: t[2], ex: 'RFC: ante el SAT (obligaciones fiscales). NSS: ante el IMSS (servicios médicos y prestaciones). AFORE: administra el ahorro para el retiro.' };
  }
  function qClave(r) {
    var q = clasifica(r, {
      'CURP': ['Clave de 18 caracteres que identifica a cada persona que reside en México', 'Se pide para inscribirse en la escuela o para tramitar un pasaporte'],
      'RFC': ['Clave con la que el SAT identifica a quien paga impuestos', 'Se necesita para emitir o recibir facturas'],
      'NSS': ['Número con el que el IMSS registra al trabajador', 'Permite recibir atención médica y prestaciones de la seguridad social'] },
      function (ej) { return '¿A qué clave o registro se refiere la descripción?' + cita(ej + '.'); }, ['Credencial para votar']);
    q.ex = 'CURP: identidad de cada persona. RFC: obligaciones fiscales ante el SAT. NSS: seguridad social ante el IMSS.';
    return q;
  }
  function qModalidad(r) {
    var q = clasifica(r, {
      'Por obra determinada': ['Contratan a un albañil para construir una barda y la relación termina al acabarla'],
      'Por temporada': ['Una tienda contrata vendedores sólo para la temporada navideña de cada año'],
      'Por capacitación inicial': ['Un recién egresado entra a trabajar para recibir formación y adquirir experiencia práctica'],
      'Por tiempo indeterminado': ['El contrato no tiene fecha de terminación y dura mientras exista el trabajo'],
      'Por tiempo determinado': ['Contratan a una persona por seis meses para cubrir una incapacidad'],
      'Periodo de prueba': ['Durante un plazo se evalúa si el trabajador tiene las competencias para el puesto antes de formalizar el contrato'] },
      function (ej) { return '¿Qué modalidad de contratación se describe?' + cita(ej + '.'); });
    q.ex = 'Tiempo indeterminado: sin fecha de fin. Tiempo determinado: un plazo. Obra determinada: termina con la obra. Temporada: ciertas épocas del año. Capacitación inicial: formación. Periodo de prueba: evaluar antes de formalizar.';
    return q;
  }
  function qContrato(r) {
    var q = clasifica(r, {
      'Contrato individual': ['Una persona se compromete a trabajar para otra a cambio de un salario'],
      'Contrato colectivo': ['Uno o varios sindicatos y uno o varios patrones fijan las condiciones de trabajo de uno o más centros de trabajo'],
      'Contrato ley': ['Sindicatos y varios patrones fijan las condiciones de trabajo de toda una rama industrial, con validez obligatoria en uno o más estados'] },
      function (ej) { return '¿Qué tipo de contrato de trabajo se describe?' + cita(ej + '.'); }, ['Contrato de compraventa', 'Contrato de arrendamiento']);
    q.ex = 'Individual: trabajador y patrón. Colectivo: sindicato(s) y patrón(es) de uno o más centros de trabajo. Contrato ley: sindicatos y patrones de toda una rama industrial.';
    return q;
  }
  function qTipoTrabajador(r) {
    var q = clasifica(r, {
      'De confianza': ['Un gerente dirige y vigila el trabajo de todo un departamento', 'Una supervisora general inspecciona y fiscaliza el trabajo de los demás'],
      'De base (planta)': ['Un empleado ocupa un puesto permanente, contratado por tiempo indeterminado'],
      'Eventual': ['Contratan a una persona por tres meses para cubrir a una trabajadora con incapacidad'],
      'De temporada': ['Un joven trabaja sólo en la cosecha de cada año', 'Una vendedora trabaja únicamente en la temporada navideña'],
      'A destajo': ['Un costurero cobra según el número de prendas que termina'] },
      function (ej) { return '¿Qué tipo de trabajador se describe?' + cita(ej + '.'); });
    q.ex = 'De confianza: dirección, inspección, vigilancia y fiscalización. De base: puesto permanente. Eventual: por un tiempo. De temporada: ciertas épocas del año. A destajo: se le paga por pieza o unidad de obra.';
    return q;
  }
  function qVacaciones(r) {
    var anios = r.entero(1, 10), dias = anios <= 5 ? 10 + 2 * anios : 22;
    return { p: 'Según la Ley Federal del Trabajo (reforma de 2023), ¿cuántos días de vacaciones le corresponden a una persona que cumplió ' + anios + (anios === 1 ? ' año' : ' años') + ' de servicio?',
      b: dias, m: [12, 14, 16, 18, 20, 22, 24, 6, 15].filter(function (x) { return x !== dias; }), fmt: function (v) { return v + ' días'; }, op: { rango: [6, 30] },
      ex: 'Desde 2023: 12 días el primer año y 2 más por cada año hasta 20 días a los 5 años; a partir del sexto año, 2 días más por cada cinco años (22 días del sexto al décimo).' };
  }
  function qJornadaHoras(r) {
    var J = [['diurna', 8], ['nocturna', 7], ['mixta', 7.5]], j = r.elige(J);
    return { p: '¿Cuál es la duración máxima legal de la jornada ' + j[0] + ' según la Ley Federal del Trabajo?', b: j[1],
      m: [6, 6.5, 7, 7.5, 8, 9, 10].filter(function (x) { return x !== j[1]; }), fmt: function (v) { return F.n(v) + ' horas'; }, op: { rango: [5, 12] },
      ex: 'Diurna (de 6:00 a 20:00): 8 horas. Nocturna (de 20:00 a 6:00): 7 horas. Mixta (con no más de tres horas y media nocturnas): 7.5 horas.' };
  }
  function qJornadaTipo(r) {
    var q = clasifica(r, {
      'Diurna': ['Una cajera trabaja de 8:00 a 16:00', 'Un albañil trabaja de 7:00 a 15:00'],
      'Nocturna': ['Un vigilante trabaja de 22:00 a 5:00', 'Una enfermera trabaja de 21:00 a 4:00'],
      'Mixta': ['Un mesero trabaja de 15:00 a 22:30', 'Un cocinero trabaja de 14:30 a 22:00'] },
      function (ej) { return '¿Qué tipo de jornada tiene la persona?' + cita(ej + '.'); }, ['Jornada continua de 12 horas']);
    q.ex = 'Diurna: entre las 6:00 y las 20:00. Nocturna: entre las 20:00 y las 6:00. Mixta: combina ambas, con no más de tres horas y media nocturnas.';
    return q;
  }
  function qSalarioDiario(r) {
    var d = r.entero(25, 90) * 10, mensual = d * 30;
    return { p: 'Una persona gana ' + pesos(mensual) + ' al mes. Con el criterio de la Ley Federal del Trabajo (mes de 30 días), ¿cuál es su salario diario?',
      b: d, m: [mensual / 31, mensual / 28, mensual / 15, mensual / 7], fmt: pesos,
      ex: 'Salario diario = salario mensual &divide; 30 = ' + pesos(mensual) + ' &divide; 30 = ' + pesos(d) + '.' };
  }
  function qAguinaldoMinimo(r) {
    var d = r.entero(25, 70) * 10;
    return { p: 'Una persona gana ' + miles(d) + ' diarios y trabajó todo el año. ¿Cuánto debe recibir, como mínimo, de aguinaldo?', b: 15 * d,
      m: [12 * d, 30 * d, 10 * d, 20 * d, 7 * d], fmt: miles,
      ex: 'El aguinaldo mínimo equivale a 15 días de salario: 15 &times; ' + miles(d) + ' = ' + miles(15 * d) + '.' };
  }
  function qPTU(r) {
    var u = r.entero(5, 90) * 10000;
    return { p: 'Una empresa obtuvo utilidades por ' + miles(u) + ' en el año. ¿Cuánto debe repartir entre sus trabajadores como PTU?',
      b: u * 0.1, m: [u * 0.15, u * 0.05, u * 0.2, u * 0.01], fmt: miles,
      ex: 'La participación de los trabajadores en las utilidades (PTU) es el 10% de las utilidades: 10% de ' + miles(u) + ' = ' + miles(u * 0.1) + '.' };
  }
  var LFT = {
    'Obligación del patrón': ['Pagar los salarios en el lugar y la fecha convenidos', 'Proporcionar los útiles e instrumentos necesarios para el trabajo', 'Inscribir a los trabajadores en el IMSS'],
    'Obligación del trabajador': ['Ejecutar el trabajo con la intensidad, cuidado y esmero apropiados', 'Observar las medidas de seguridad e higiene', 'Avisar al patrón cuando no pueda asistir al trabajo'],
    'Prohibición del patrón': ['Negarse a contratar a alguien por su edad, sexo o religión', 'Exigir dinero a los trabajadores para darles el empleo', 'Hacer propaganda política o religiosa dentro del centro de trabajo'],
    'Prohibición del trabajador': ['Presentarse al trabajo en estado de embriaguez', 'Faltar al trabajo sin causa justificada ni permiso', 'Sustraer herramientas o materiales de la empresa']
  };
  /* el ejemplo sale de las obligaciones o de las prohibiciones; los incisos son los cuatro grupos */
  function lftDe(tipo) {
    return function (r) {
      var grupos = {};
      Object.keys(LFT).forEach(function (k) { if (k.indexOf(tipo) === 0) grupos[k] = LFT[k]; });
      var q = clasifica(r, grupos, function (ej) { return 'Según la Ley Federal del Trabajo, ¿qué es lo siguiente?' + cita(ej + '.'); },
        Object.keys(LFT).filter(function (k) { return !grupos[k]; }));
      q.ex = 'Los derechos, obligaciones y prohibiciones de patrones y trabajadores buscan un ambiente de respeto y el cumplimiento de la relación laboral.';
      return q;
    };
  }
  var qObligacion = lftDe('Obligación'), qProhibicion = lftDe('Prohibición');
  function qTerminacion(r) {
    var q = clasifica(r, {
      'Suspensión': ['Un trabajador tiene una enfermedad contagiosa y deja de trabajar temporalmente sin perder su empleo', 'Una trabajadora es detenida y queda en prisión preventiva'],
      'Rescisión': ['El patrón despide a un trabajador porque robó herramientas de la empresa', 'Una trabajadora deja el empleo porque el patrón no le paga su salario'],
      'Terminación': ['El trabajador y el patrón acuerdan terminar la relación laboral', 'El contrato por obra determinada concluye al acabar la obra'] },
      function (ej) { return '¿Qué figura de la Ley Federal del Trabajo se presenta?' + cita(ej + '.'); }, ['Renovación', 'Promoción']);
    q.ex = 'Suspensión: las obligaciones se interrumpen temporalmente sin responsabilidad. Rescisión: termina por incumplimiento de una de las partes. Terminación: concluye por acuerdo o por conveniencia.';
    return q;
  }
  function qRescision(r) {
    var q = clasifica(r, {
      'Sin responsabilidad para el patrón': ['El trabajador tiene más de tres faltas en un periodo de 30 días sin permiso ni causa justificada',
        'El trabajador revela secretos de fabricación de la empresa', 'El trabajador se presenta en estado de embriaguez'],
      'Sin responsabilidad para el trabajador': ['El patrón reduce el salario del trabajador', 'El patrón no paga el salario en la fecha convenida', 'El patrón insulta o maltrata al trabajador'] },
      function (ej) { return '¿Qué tipo de rescisión de la relación de trabajo procede en el caso?' + cita(ej + '.'); }, ['Suspensión temporal', 'Terminación por mutuo consentimiento']);
    q.ex = 'Si el trabajador incumple (faltas, revelar secretos, embriaguez), el patrón puede rescindir sin responsabilidad. Si el patrón incumple (reducir o no pagar el salario, malos tratos), el trabajador puede rescindir sin responsabilidad.';
    return q;
  }

  P.temaBanco({
    id: 'prepa-introTrabajo',
    grupo: 'Introduccion al trabajo',
    nombre: 'Introduccion al trabajo',
    descripcion: 'Destrezas, sectores, plan de vida, reclutamiento, documentos, tipos de contratacion y trabajador, y derechos y obligaciones de la Ley Federal del Trabajo. Los 20 reactivos del area.',
    etiquetas: ['ley federal del trabajo', 'aguinaldo', 'vacaciones', 'curp', 'nss', 'ptu', 'contrato'],
    formulario: 'Jornada diurna: 8 h, nocturna: 7 h, mixta: 7.5 h &nbsp;&middot;&nbsp; Aguinaldo: 15 días mínimo &nbsp;&middot;&nbsp; PTU: 10% de las utilidades<br>' +
      'Vacaciones: 1 año 12 días, 2 años 14, 3 años 16, 4 años 18, 5 años 20; del sexto al décimo año, 22 &nbsp;&middot;&nbsp; Salario diario = mensual / 30',
    niveles: {
      facil: ['destreza', 'sectores', 'curriculum', 'curp', 'tipoTrabajador', 'jornada', 'aguinaldo', 'obligaciones'],
      medio: ['planVida', 'fuentes', 'nss', 'contratacion', 'vacaciones', 'salario', 'prohibiciones'],
      dificil: ['pruebas', 'ptu', 'exceptuados', 'suspension', 'rescision']
    },
    items: [
      { s: 'destreza', n: 'Destrezas y caracteristicas personales', v: [
        { p: 'Las destrezas son habilidades específicas para realizar una actividad. ¿Cuál opción describe una destreza deportiva?', b: 'Ejecutar movimientos precisos como driblar un balón',
          m: ['Desarrollar fuerza muscular con pesas', 'Tener una mentalidad competitiva', 'Tener una excelente condición física'] },
        { p: '¿Cuál de las siguientes es una destreza de un carpintero?', b: 'Cortar y ensamblar piezas de madera con precisión', m: ['Tener buena salud', 'Ser puntual', 'Querer ganar más dinero'] },
        qCaracteristica, qCaracteristica, qCaracteristica,
        { p: 'Los aspectos personales que podemos mejorar para fortalecer nuestro desarrollo personal y profesional se llaman:', b: 'áreas de oportunidad',
          m: ['fortalezas', 'habilidades', 'necesidades'] },
        { p: '¿Cuál de las siguientes es una destreza manual?', b: 'Soldar dos piezas de metal con precisión', m: ['Ser optimista', 'Tener buena memoria para las fechas', 'Querer estudiar una carrera'] }
      ] },
      { s: 'sectores', n: 'Sectores economicos', v: [
        { p: '¿Cuál opción describe una característica del sector de servicios?', b: 'Proveer transporte, educación, turismo y comercio',
          m: ['Realizar actividades como la pesca, la minería y la agricultura', 'Transformar materias primas en productos terminados', 'Diseñar productos en laboratorios especializados'] },
        { p: 'La transformación de materias primas en productos terminados corresponde al sector:', b: 'secundario', m: ['primario', 'terciario', 'cuaternario'] },
        qSector, qSector, qSector,
        { p: 'Conocer los sectores económicos ayuda a una persona que busca empleo a:', b: 'vincular sus intereses y habilidades con las necesidades reales del mercado laboral',
          m: ['evitar pagar impuestos', 'saber cuánto ganará en su primer empleo', 'no necesitar un plan de vida'] }
      ] },
      { s: 'planVida', n: 'Plan de vida ocupacional', v: [
        { p: '¿Qué característica tiene la estructura de un plan de vida ocupacional?', b: 'Diseñar estrategias para equilibrar actividades laborales, personales y recreativas',
          m: ['Concentrarse sólo en obtener experiencia en empresas de prestigio', 'Fijar únicamente la carrera universitaria', 'Priorizar sólo el ahorro y la inversión'] },
        qPlazo, qPlazo, qPlazo,
        { p: 'Las metas de un plan de vida deben ser:', b: 'realistas y flexibles, para adaptarse a los factores externos',
          m: ['rígidas, para no cambiarlas nunca', 'imposibles, para motivarse más', 'las mismas que las de los amigos'] },
        { p: 'Además de las metas a corto, mediano y largo plazo, un plan de vida debe definir:', b: 'los recursos necesarios para alcanzarlas',
          m: ['el salario exacto que se ganará', 'los nombres de los futuros jefes', 'la fecha de jubilación de los padres'] },
        { orden: 'Ordene los pasos para elaborar un plan de vida.',
          pasos: ['Reconocer mis características personales', 'Definir mis metas a corto, mediano y largo plazo', 'Identificar los recursos necesarios para lograrlas',
            'Llevar a cabo las acciones planeadas', 'Evaluar los avances y ajustar el plan'] }
      ] },
      { s: 'fuentes', n: 'Fuentes de reclutamiento', v: [
        { p: 'Es el lugar de origen donde se encuentran los recursos humanos que necesita una empresa para cubrir sus vacantes:', b: 'Fuentes de reclutamiento', m: ['Bolsa de trabajo', 'Medios de reclutamiento', 'Medios digitales'] },
        { p: 'Los anuncios en periódicos, carteles y redes sociales que usa una empresa para dar a conocer una vacante son:', b: 'medios de reclutamiento', m: ['fuentes de reclutamiento', 'pruebas psicométricas', 'contratos'] },
        qFuente, qFuente, qFuente,
        { p: 'Saber distinguir entre fuentes y medios de reclutamiento le sirve a quien busca su primer empleo para:', b: 'identificar los canales más apropiados según su perfil y el sector al que aspira',
          m: ['saltarse la entrevista de trabajo', 'evitar llenar la solicitud de empleo', 'conocer el sueldo de los demás candidatos'] }
      ] },
      { s: 'curriculum', n: 'Documentos para el empleo', v: [
        { p: '¿Qué documento reúne los estudios, méritos, cargos y experiencia laboral de una persona?', b: 'Currículum vitae', m: ['Carta de presentación', 'Carta de recomendación', 'Solicitud de empleo'] },
        { p: '¿Qué documento escribe una persona que conoce tu trabajo para avalar tu desempeño ante otra empresa?', b: 'Carta de recomendación', m: ['Currículum vitae', 'Carta de presentación', 'Contrato'] },
        qDocumento, qDocumento, qDocumento,
        { lista: 'Del siguiente listado, identifique la información que debe incluir un currículum vitae.',
          si: ['Formación académica', 'Experiencia laboral', 'Idiomas y certificaciones', 'Datos de contacto'],
          no: ['Religión que se profesa', 'Preferencias políticas', 'Contraseñas de redes sociales', 'Estado de cuenta bancario'] }
      ] },
      { s: 'pruebas', n: 'Entrevistas y pruebas de seleccion', v: [
        { p: 'Un candidato tuvo puntajes altos en razonamiento verbal y matemático, pero su desempeño laboral no lo refleja. ¿Qué prueba adicional puede explicar la diferencia?', b: 'De personalidad', m: ['De habilidad', 'De inteligencia', 'De interés'] },
        { p: '¿Qué prueba mide la capacidad de razonamiento y aprendizaje de un candidato?', b: 'De inteligencia', m: ['De personalidad', 'De interés', 'Médica'] },
        qEntrevista, qEntrevista, qEntrevista,
        { p: 'Las pruebas psicométricas complementan la entrevista porque:', b: 'dan una visión de los rasgos cognitivos, conocimientos, habilidades y personalidad del candidato',
          m: ['sustituyen el contrato de trabajo', 'sirven para calcular el salario', 'sólo miden la estatura y el peso'] }
      ] },
      { s: 'nss', n: 'Tramites y seguridad social', v: [
        { p: '¿Qué función tiene el Número de Seguridad Social (NSS)?', b: 'Inscribir a los trabajadores al sistema de pensiones y servicios de salud',
          m: ['Emitir permisos laborales', 'Obtener sólo créditos hipotecarios', 'Registrar a los empleados sólo en la nómina'] },
        qTramite, qTramite, qTramite,
        { rel: 'Relacione cada trámite laboral con su función.', cols: ['Trámite', 'Función'],
          pares: [['RFC', 'Identifica a la persona ante el SAT para cumplir sus obligaciones fiscales'], ['NSS', 'Registra al trabajador en el IMSS para recibir servicios médicos y prestaciones'],
            ['AFORE', 'Administra las aportaciones para el retiro del trabajador'], ['CURP', 'Clave única que identifica a cada persona que reside en México']],
          extra: ['Permite votar en las elecciones'] }
      ] },
      { s: 'curp', n: 'CURP y RFC', v: [
        { p: 'Código alfanumérico único de identidad que permite registrar de forma individual a todas las personas que residen en México:', b: 'CURP', m: ['Credencial para votar', 'Número de Seguridad Social', 'RFC'] },
        { p: 'Clave con la que el SAT identifica a las personas que pagan impuestos:', b: 'RFC', m: ['CURP', 'NSS', 'INE'] },
        { p: 'Una persona empezará su primer empleo formal. ¿Qué registros necesita para que la identifiquen ante el SAT y el IMSS?', b: 'El RFC y el Número de Seguridad Social',
          m: ['La CURP y la credencial de la biblioteca', 'El acta de matrimonio y el pasaporte', 'La licencia de conducir y la cartilla de vacunación'] },
        qClave, qClave, qClave
      ] },
      { s: 'contratacion', n: 'Tipos de contratacion', v: [
        { p: 'Alfonsina fue contratada para impartir un curso de cuatro meses y cobra por el servicio profesional. ¿Qué tipo de contratación es?', b: 'Honorarios', m: ['Sindicalizado', 'Subempleo', 'Subcontratación'] },
        { p: 'Una empresa contrata a otra para que le preste personal de limpieza. ¿Qué tipo de contratación es?', b: 'Subcontratación', m: ['Honorarios', 'Sindicalizado', 'Por obra determinada'] },
        qModalidad, qModalidad, qModalidad, qContrato, qContrato
      ] },
      { s: 'tipoTrabajador', n: 'Tipos de trabajador', v: [
        { p: 'Alejandro es estudiante y sólo trabaja durante las vacaciones. Es un trabajador:', b: 'de temporada', m: ['a destajo', 'de confianza', 'de base'] },
        { p: 'Ana cobra según el número de piezas que cose al día. Es una trabajadora:', b: 'a destajo', m: ['de temporada', 'de confianza', 'de base'] },
        { p: 'Según la Ley Federal del Trabajo, quienes realizan funciones de dirección, inspección, vigilancia y fiscalización de carácter general son trabajadores:', b: 'de confianza',
          m: ['de temporada', 'a destajo', 'eventuales'] },
        qTipoTrabajador, qTipoTrabajador, qTipoTrabajador
      ] },
      { s: 'vacaciones', n: 'Vacaciones', v: [
        { p: 'Javier cumplió 3 años en la empresa. ¿Cuántos días de vacaciones le corresponden según la Ley Federal del Trabajo?', b: 16, m: [10, 12, 14, 18], fmt: function (v) { return v + ' días'; } },
        { p: 'Lucía cumplió su primer año de trabajo. ¿Cuántos días de vacaciones le corresponden según la Ley Federal del Trabajo?', b: 12, m: [6, 10, 14, 15], fmt: function (v) { return v + ' días'; } },
        { p: 'Marcos cumplió 5 años en la empresa. ¿Cuántos días de vacaciones le corresponden según la Ley Federal del Trabajo?', b: 20, m: [14, 16, 18, 22], fmt: function (v) { return v + ' días'; } },
        qVacaciones, qVacaciones, qVacaciones, qVacaciones,
        { p: '¿Qué porcentaje mínimo del salario de los días de vacaciones se paga como prima vacacional?', b: 25, m: [10, 15, 20, 30, 50],
          fmt: function (v) { return v + '%'; } },
        { p: 'Según la Ley Federal del Trabajo, ¿cuándo tiene derecho una persona trabajadora a disfrutar de vacaciones pagadas?', b: 'Al cumplir un año de servicios',
          m: ['Desde el primer día de trabajo', 'Al cumplir cinco años de servicios', 'Sólo si trabaja en el gobierno'] }
      ] },
      { s: 'jornada', n: 'Jornada de trabajo', v: [
        qJornadaHoras, qJornadaHoras, qJornadaHoras, qJornadaTipo, qJornadaTipo, qJornadaTipo,
        { p: 'La jornada diurna es la que se realiza:', b: 'Entre las 6:00 y las 20:00 horas',
          m: ['Entre las 8:00 y las 18:00 horas', 'Entre las 20:00 y las 6:00 horas', 'Entre las 7:00 y las 15:00 horas', 'Entre las 9:00 y las 21:00 horas'] },
        { p: 'En la jornada mixta, la parte nocturna debe ser menor de:', b: 3.5, m: [1, 2, 2.5, 3, 4, 4.5],
          fmt: function (v) { return F.n(v) + ' horas'; } }
      ] },
      { s: 'salario', n: 'Tipos de salario', v: [
        { p: 'Remuneración que se integra por el pago en efectivo por cuota diaria más las demás prestaciones que recibe el trabajador:', b: 'Salario diario integrado', m: ['Salario nominal', 'Salario profesional', 'Salario mínimo'] },
        { p: 'La cantidad de dinero que se le paga al trabajador, sin considerar lo que puede comprar con ella, es el salario:', b: 'nominal', m: ['real', 'integrado', 'mínimo'] },
        { p: 'El salario real es:', b: 'la cantidad de bienes y servicios que se pueden comprar con el salario',
          m: ['la cantidad de dinero que aparece en el recibo de nómina', 'el salario mínimo fijado por la ley', 'el salario más las horas extra'] },
        { p: 'La cantidad menor que debe recibir en efectivo una persona trabajadora por los servicios prestados en una jornada se llama:', b: 'salario mínimo',
          m: ['salario integrado', 'salario profesional', 'salario real'] },
        qSalarioDiario, qSalarioDiario
      ] },
      { s: 'aguinaldo', n: 'Aguinaldo', v: [
        { p: 'De acuerdo con la Ley Federal del Trabajo, ¿cuántos días de salario debe recibir como mínimo un trabajador por concepto de aguinaldo anual?', b: 15, m: [10, 12, 14, 20, 25, 30],
          fmt: function (v) { return v + ' días'; } },
        { p: '¿Antes de qué fecha debe pagarse el aguinaldo?', b: '20 de diciembre', m: ['1 de diciembre', '10 de diciembre', '15 de diciembre', '24 de diciembre', '25 de diciembre', '31 de diciembre'] },
        qAguinaldoMinimo, qAguinaldoMinimo, qAguinaldoMinimo,
        { p: 'Una persona que no trabajó el año completo, ¿tiene derecho a aguinaldo?', b: 'Sí, a la parte proporcional al tiempo que trabajó',
          m: ['No, sólo se paga a quien trabaja todo el año', 'Sí, pero sólo si lo pide por escrito', 'Sólo si tiene más de cinco años en la empresa'] }
      ] },
      { s: 'ptu', n: 'Reparto de utilidades', v: [
        { p: '¿Qué afirmación describe correctamente la PTU (participación de los trabajadores en las utilidades)?', b: 'Corresponde al 10% de las utilidades y se reparte dentro de los 60 días siguientes a la declaración anual',
          m: ['Corresponde al 15% de las utilidades y se paga antes de 90 días', 'Corresponde al 5% y se paga antes de 30 días', 'Sólo la reciben empresas con más de 100 trabajadores'] },
        qPTU, qPTU, qPTU,
        { p: '¿Dentro de cuántos días siguientes a la declaración anual del impuesto debe pagarse la PTU?', b: 60, m: [15, 30, 45, 90, 120],
          fmt: function (v) { return v + ' días'; } },
        { p: 'El reparto de utilidades es:', b: 'el derecho de los trabajadores a participar en las ganancias que obtiene la empresa',
          m: ['un préstamo que la empresa da a sus trabajadores', 'un impuesto que el trabajador paga al SAT', 'el pago de las horas extra'] }
      ] },
      { s: 'exceptuados', n: 'Exceptuados de la PTU', v: [
        { p: 'Según la Ley Federal del Trabajo, ¿qué trabajadores NO participan en el reparto de utilidades?', b: 'Los directores, administradores y gerentes generales',
          m: ['Los contratados por menos de tres meses', 'Los de empresas con menos de 50 empleados', 'Los trabajadores sindicalizados'] },
        { p: '¿Qué trabajadores participan en el reparto de utilidades sólo si trabajaron al menos 60 días durante el año?', b: 'Los eventuales',
          m: ['Los directores generales', 'Los socios de la empresa', 'Los trabajadores del hogar'] },
        { p: 'Según la Ley Federal del Trabajo, ¿cuál de los siguientes trabajadores SÍ participa en el reparto de utilidades?', b: 'Un obrero de planta de la línea de producción',
          m: ['El director general de la empresa', 'Un trabajador del hogar', 'Un trabajador eventual que laboró 20 días en el año'] },
        { p: 'Durante su primer año de funcionamiento, las empresas de nueva creación:', b: 'están exentas de repartir utilidades',
          m: ['deben repartir el doble de utilidades', 'deben repartir el 10% de sus ventas', 'sólo reparten utilidades a los gerentes'] }
      ] },
      { s: 'obligaciones', n: 'Derechos y obligaciones', v: [
        { p: 'Cumplir con las disposiciones de las normas de trabajo es una obligación del:', b: 'patrón', m: ['sindicato', 'socio', 'cliente'] },
        { p: 'Ejecutar el trabajo con la intensidad, cuidado y esmero apropiados es una obligación del:', b: 'trabajador', m: ['patrón', 'sindicato', 'gobierno'] },
        qObligacion, qObligacion, qObligacion,
        { p: 'Según la Ley Federal del Trabajo, en el periodo de lactancia las madres trabajadoras tienen derecho a:', b: 'dos reposos por día, de media hora cada uno, para alimentar a sus hijos',
          m: ['salir dos horas antes todos los días durante un año', 'una semana de vacaciones extra al mes', 'faltar sin goce de sueldo cuando lo decidan'] },
        { p: 'Según la Ley Federal del Trabajo, ¿cuántas semanas de descanso por maternidad tiene una trabajadora (antes y después del parto)?', b: 12, m: [4, 6, 8, 16, 18],
          fmt: function (v) { return v + ' semanas'; } }
      ] },
      { s: 'prohibiciones', n: 'Prohibiciones', v: [
        { p: 'Una empresa obliga a todos sus trabajadores a asistir a una misa por su aniversario. Este acto se considera dentro de las:', b: 'prohibiciones de los patrones',
          m: ['obligaciones de los trabajadores', 'prohibiciones de los trabajadores', 'obligaciones de los patrones'] },
        { p: 'Presentarse al trabajo en estado de embriaguez está dentro de las:', b: 'prohibiciones de los trabajadores', m: ['obligaciones de los patrones', 'prohibiciones de los patrones', 'obligaciones de los trabajadores'] },
        qProhibicion, qProhibicion, qProhibicion,
        { p: 'Un patrón le pide a un aspirante $2,000 para darle el empleo. Según la Ley Federal del Trabajo, esto es:', b: 'una prohibición para los patrones',
          m: ['una obligación del trabajador', 'un derecho del patrón', 'una prestación de ley'] }
      ] },
      { s: 'suspension', n: 'Suspension, rescision y terminacion', v: [
        { p: '¿Qué distingue la suspensión de la relación de trabajo de la rescisión?', b: 'La suspensión la interrumpe temporalmente; la rescisión la termina de forma definitiva',
          m: ['La suspensión es por acuerdo mutuo y la rescisión es siempre una sanción', 'Ambas tienen los mismos efectos', 'La suspensión sólo se aplica por revelar secretos'] },
        qTerminacion, qTerminacion, qTerminacion,
        { lista: 'Del siguiente listado, identifique las causas de suspensión temporal de la relación de trabajo.',
          si: ['La enfermedad contagiosa del trabajador', 'La incapacidad temporal por un accidente que no es riesgo de trabajo', 'La prisión preventiva del trabajador seguida de sentencia absolutoria', 'El arresto del trabajador'],
          no: ['El robo de herramientas de la empresa', 'El mutuo consentimiento de las partes', 'La muerte del trabajador', 'La terminación de la obra'] }
      ] },
      { s: 'rescision', n: 'Causas de rescision', v: [
        { p: '¿Cuál de las siguientes es una causa de rescisión con efecto sancionatorio hacia el trabajador?', b: 'Falta de honradez', m: ['Incapacidad física', 'Muerte del trabajador', 'Prisión preventiva'] },
        { p: '¿Cuál de las siguientes es una causa de terminación de la relación de trabajo, sin culpa del trabajador?', b: 'La muerte del trabajador', m: ['Falta de honradez', 'Faltar más de tres días en un mes sin permiso', 'Revelar secretos de la empresa'] },
        qRescision, qRescision, qRescision,
        { p: 'La rescisión de la relación de trabajo ocurre cuando:', b: 'una de las partes incumple sus obligaciones',
          m: ['ambas partes acuerdan terminarla', 'el trabajador se enferma temporalmente', 'termina la temporada de trabajo'] }
      ] }
    ]
  });

  /* ---------- Recursos humanos: preguntas de nomina con datos al azar ---------- */
  function aguinaldoProp(r) {
    var q = r.elige(NOMBRES), dias = r.entero(120, 340), mensual = r.entero(25, 90) * 200;
    var diario = mensual / 30, v = diario * 15 * dias / 365;
    return { p: 'Si ' + q + ' lleva trabajando ' + dias + ' días en su empresa con un sueldo mensual de ' + pesos(mensual) + ', ¿cuánto le pagarán de aguinaldo?',
      b: v, m: [diario * 15, mensual * dias / 365 / 2.5, (mensual / 31) * 15 * dias / 365, diario * 12 * dias / 365], fmt: pesos,
      ex: 'Salario diario = ' + pesos(mensual) + ' / 30 = ' + pesos(diario) + '; aguinaldo = 15 × ' + pesos(diario) + ' × ' + dias + ' / 365 = ' + pesos(v) };
  }
  function primaVac(r) {
    var anios = r.entero(1, 4), mensual = r.entero(30, 90) * 200, diario = mensual / 30, dv = VAC[anios];
    var v = diario * dv * 0.25;
    return { p: '¿Cuánto pagará de prima vacacional una empresa que otorga las prestaciones mínimas de ley a un empleado con sueldo mensual de ' + pesos(mensual) + ' y ' + anios + (anios === 1 ? ' año cumplido' : ' años cumplidos') + '?',
      b: v, m: [diario * dv, (mensual / 31) * dv * 0.25, diario * dv * 0.5, mensual * 0.25], fmt: pesos,
      ex: 'Le tocan ' + dv + ' días de vacaciones; prima = 25% × ' + dv + ' × ' + pesos(diario) + ' = ' + pesos(v) };
  }
  function horasExtra(r) {
    var q = r.elige(NOMBRES), mensual = r.entero(30, 90) * 200, h = r.entero(2, 9);
    var hora = mensual / 30 / 8, v = hora * h * 2;
    return { p: q + ' tiene una jornada diurna de 8 horas y un sueldo mensual de ' + pesos(mensual) + '. Si esta semana trabajó ' + h + ' horas extra, ¿cuánto le pagarán por ellas?',
      b: v, m: [hora * h, hora * h * 3, (mensual / 31 / 8) * h * 2, (mensual / 31 / 8) * h], fmt: pesos,
      ex: 'Hora normal = ' + pesos(mensual) + ' / 30 / 8 = ' + pesos(hora) + '; las primeras 9 horas extra se pagan al doble: ' + h + ' × 2 × ' + pesos(hora) + ' = ' + pesos(v) };
  }
  function cuotaSindical(r) {
    var q = r.elige(NOMBRES), mensual = r.entero(30, 90) * 200, pct = r.elige([1, 2, 3, 4]), v = mensual * pct / 100 / 2;
    return { p: q + ' gana ' + pesos(mensual) + ' al mes y el sindicato le descuenta ' + pct + '% de cuota sindical. ¿Cuánto se le descuenta por quincena?',
      b: v, m: [v * 2, mensual / 31 * 15 * pct / 100, v / 2, mensual * pct / 100 / 31 * 7], fmt: pesos,
      ex: pct + '% de ' + pesos(mensual) + ' = ' + pesos(v * 2) + ' al mes; por quincena, la mitad: ' + pesos(v) };
  }
  function faltaSemana(r) {
    var q = r.elige(NOMBRES), d = r.entero(25, 60) * 10, v = d * 7 - d - d / 6;
    return { p: q + ' gana ' + pesos(d) + ' diarios. Si faltó un día sin justificar, ¿cuánto recibirá esa semana? (Se descuenta el día y la parte proporcional del séptimo día.)',
      b: v, m: [d * 7, d * 6, d * 5, d * 7 - d / 6], fmt: pesos,
      ex: 'Semana completa: 7 × ' + pesos(d) + ' = ' + pesos(7 * d) + '; menos el día (' + pesos(d) + ') y 1/6 del séptimo día (' + pesos(d / 6) + ') = ' + pesos(v) };
  }
  function isrMensual(r) {
    var q = r.elige(NOMBRES), mensual = r.entero(35, 64) * 200, t = isr(mensual);
    var exced = mensual - t.fila[0];
    return { p: tablaISR() + 'Si ' + q + ' gana ' + pesos(mensual) + ' mensuales, ¿cuánto le retendrán de ISR?',
      b: t.valor, m: [exced * t.fila[2] / 100, t.fila[1], mensual * t.fila[2] / 100, t.fila[1] + mensual * t.fila[2] / 100], fmt: pesos,
      ex: 'Excedente: ' + pesos(mensual) + ' − ' + pesos(t.fila[0]) + ' = ' + pesos(exced) + '; × ' + t.fila[2] + '% = ' + pesos(exced * t.fila[2] / 100) + '; más la cuota fija ' + pesos(t.fila[1]) + ' = ' + pesos(t.valor) };
  }
  function netoMensual(r) {
    var q = r.elige(NOMBRES), d = r.entero(250, 420), mensual = d * 30, t = isr(mensual), neto = mensual - t.valor;
    return { p: tablaISR() + 'Identifique la percepción neta mensual de ' + q + ' si percibe ' + pesos(d) + ' de salario diario (considere 30 días y sólo la retención del ISR).',
      b: neto, m: [mensual, t.valor, mensual - t.fila[1], mensual - (mensual - t.fila[0]) * t.fila[2] / 100], fmt: pesos,
      ex: 'Mensual: ' + pesos(mensual) + '; ISR: ' + pesos(t.valor) + '; neto = ' + pesos(neto) };
  }

  P.temaBanco({
    id: 'prepa-rhAdministracion',
    grupo: 'Recursos humanos',
    nombre: 'Administracion',
    descripcion: 'Escuelas de la administracion, planeacion, principios de Fayol, proceso administrativo, areas funcionales y manuales. Reactivos 1 a 14 de la capacitacion.',
    etiquetas: ['taylor', 'fayol', 'proceso administrativo', 'planeacion', 'manuales'],
    niveles: {
      facil: ['escuelas', 'importancia', 'areaFuncional', 'areaRH', 'gestion'],
      medio: ['humanista', 'planeacion', 'principios', 'proceso', 'etapas', 'manuales'],
      dificil: ['globalizacion', 'etapaAjuste', 'manualProc']
    },
    items: [
      { s: 'escuelas', n: 'Escuelas de la administracion', v: [
        { p: '¿Quién es el precursor de la administración científica?', b: 'Frederick W. Taylor', m: ['Elton Mayo', 'Max Weber', 'William Ouchi'] },
        { p: '¿Quién es considerado el padre de la teoría clásica de la administración y propuso 14 principios?', b: 'Henri Fayol', m: ['Frederick W. Taylor', 'Elton Mayo', 'Max Weber'] },
        { p: '¿Quién desarrolló el modelo burocrático de la administración?', b: 'Max Weber', m: ['Henri Fayol', 'Elton Mayo', 'Frederick W. Taylor'] }
      ] },
      { s: 'humanista', n: 'Escuela humanista', v: [
        { p: '¿Qué escuela parte del supuesto de adaptar la administración a las necesidades del personal?', b: 'Humanista (relaciones humanas)', m: ['Estructuralista', 'Científica', 'Sistémica'] },
        { p: 'Los experimentos de Hawthorne, de Elton Mayo, dieron origen a la escuela:', b: 'de las relaciones humanas', m: ['científica', 'clásica', 'burocrática'] }
      ] },
      { s: 'planeacion', n: 'Tipos de planeacion', v: [
        { p: 'Si una empresa considera su misión y visión para tener éxito en el mercado durante años, ¿a qué tipo de planeación se refiere?', b: 'Estratégica', m: ['Administrativa', 'Operativa', 'Táctica'] },
        { p: 'La planeación de las actividades diarias de cada puesto, a corto plazo, es la planeación:', b: 'operativa', m: ['estratégica', 'táctica', 'corporativa'] }
      ] },
      { s: 'principios', n: 'Principios administrativos', v: [
        { rel: 'Relacione cada principio administrativo de Fayol con su particularidad.', cols: ['Principio', 'Particularidad'],
          pares: [['División del trabajo', 'La especialización aumenta la experiencia y las habilidades'], ['Disciplina', 'Respetar los acuerdos y reglas de la organización'],
            ['Unidad de mando', 'Cada trabajador debe tener un solo jefe'], ['Equidad', 'Trato justo y amable a todo el personal'], ['Iniciativa', 'Permitir que el personal proponga y realice planes']], n: 3 }
      ] },
      { s: 'importancia', n: 'Importancia de la administracion', v: [
        { p: 'Para que toda empresa, e incluso las tareas de la vida cotidiana, tengan buenos resultados, se debe tener una buena:', b: 'administración', m: ['contabilidad', 'paciencia', 'tolerancia'] }
      ] },
      { s: 'globalizacion', n: 'Administracion y globalizacion', v: [
        { p: 'Identifique la oración que señala la importancia de la administración en la globalización económica.', b: 'Una empresa es competitiva al tener personal capacitado que la lleve a cruzar fronteras',
          m: ['Libre comercio de bienes y menores costos de producción', 'Crecimiento del mercado por los tratados comerciales', 'Las empresas invierten en sistemas de información'] }
      ] },
      { s: 'proceso', n: 'Proceso administrativo', v: [
        { p: '¿Qué es el proceso administrativo?', b: 'La secuencia de fases o etapas para administrar una organización', m: ['Un plan con objetivos en mente', 'La evaluación del futuro de un programa', 'La contabilidad de la empresa'] },
        { orden: 'Ordene las etapas del proceso administrativo.', pasos: ['Planeación', 'Organización', 'Dirección', 'Control'] }
      ] },
      { s: 'etapas', n: 'Etapas del proceso administrativo', v: [
        { rel: 'Relacione cada etapa del proceso administrativo con su característica.', cols: ['Etapa', 'Característica'],
          pares: [['Control', 'Se miden y comparan los resultados con los objetivos para mejorar'], ['Dirección', 'Con liderazgo y motivación se logra que todos se involucren'],
            ['Organización', 'Se coordinan las actividades y se asignan funciones a las personas'], ['Planeación', 'Se fijan objetivos y se deciden las acciones a futuro']] }
      ] },
      { s: 'areaFuncional', n: 'Areas funcionales', v: [
        { p: 'Para lograr sus metas, una empresa divide sus actividades en secciones especializadas llamadas:', b: 'áreas funcionales', m: ['capacitaciones', 'informática', 'producción'] }
      ] },
      { s: 'areaRH', n: 'Area de recursos humanos', v: [
        { p: '¿Qué área funcional de la empresa recluta y capacita al personal nuevo?', b: 'Recursos humanos', m: ['Finanzas', 'Mercadotecnia', 'Producción'] },
        { p: '¿Qué área funcional se encarga de la publicidad, las ventas y el estudio del mercado?', b: 'Mercadotecnia', m: ['Recursos humanos', 'Finanzas', 'Producción'] }
      ] },
      { s: 'etapaAjuste', n: 'Aplicacion del proceso', v: [
        { p: 'Una empresa quiere aumentar 20% su producción y necesita más materia prima. ¿En qué etapa del proceso administrativo debe hacer ajustes?', b: 'Planeación', m: ['Control', 'Dirección', 'Organización'] },
        { p: 'Un gerente revisa a fin de mes si se cumplió la meta de ventas y corrige lo que falló. ¿En qué etapa está?', b: 'Control', m: ['Planeación', 'Organización', 'Dirección'] }
      ] },
      { s: 'manuales', n: 'Manuales administrativos', v: [
        { p: '¿Qué tipo de manual muestra la estructura de la empresa, sus políticas y las funciones de cada integrante?', b: 'De organización', m: ['De bienvenida', 'De procedimientos', 'Técnico'] },
        { p: '¿Qué tipo de manual describe paso a paso cómo se realiza cada actividad, con diagramas de flujo?', b: 'De procedimientos', m: ['De bienvenida', 'De organización', 'De políticas'] }
      ] },
      { s: 'manualProc', n: 'Contenido de los manuales', v: [
        { p: 'Un manual contiene el nombre de la empresa, normas de operación, objetivo, gráficas de Gantt y la descripción de cada proceso. ¿Qué tipo de manual es?', b: 'De procedimientos', m: ['De bienvenida', 'Departamental', 'De organización'] },
        { p: 'Un manual que da a conocer al nuevo empleado la historia de la empresa, su misión, visión y prestaciones es el manual:', b: 'de bienvenida', m: ['de procedimientos', 'de organización', 'técnico'] }
      ] },
      { s: 'gestion', n: 'Gestion de personal', v: [
        { orden: 'Ordene los pasos de la gestión de personal en una empresa.', pasos: ['Reclutamiento', 'Selección', 'Contratación', 'Inducción'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-rhReclutamiento',
    grupo: 'Recursos humanos',
    nombre: 'Reclutamiento y seleccion',
    descripcion: 'Conceptos de reclutamiento, analisis y requisicion de puestos, tipos de reclutamiento y entrevista, examen medico, contratos e induccion. Reactivos 15 a 22 de la capacitacion.',
    etiquetas: ['reclutamiento', 'seleccion', 'entrevista', 'contrato', 'induccion'],
    niveles: {
      facil: ['definicion', 'interno', 'examenMedico', 'induccion'],
      medio: ['conceptos', 'entrevista', 'contratos'],
      dificil: ['requisicion']
    },
    items: [
      { s: 'conceptos', n: 'Conceptos de reclutamiento', v: [
        { rel: 'Relacione cada concepto del proceso de reclutamiento con su definición.', cols: ['Concepto', 'Definición'],
          pares: [['Puesto', 'Espacio donde se realiza una actividad laboral'], ['Plaza', 'Puesto que no tiene titular'], ['Candidato', 'Persona que aspira a ocupar un puesto'],
            ['Perfil del puesto', 'Aptitudes, cualidades y capacidades que requiere el puesto'], ['Reclutamiento', 'Técnicas para atraer candidatos capaces de ocupar un cargo']] }
      ] },
      { s: 'definicion', n: 'Reclutamiento y seleccion', v: [
        { c: 'Al proceso de ___ se le define como el conjunto de tareas que tienen como finalidad ___ personal calificado para ocupar un puesto.',
          b: ['reclutamiento', 'atraer'], m: [['reclutamiento', 'contratar'], ['selección', 'atraer'], ['selección', 'contratar']] },
        { c: 'La ___ consiste en ___ entre los candidatos al más adecuado para el puesto.',
          b: ['selección', 'elegir'], m: [['inducción', 'elegir'], ['selección', 'atraer'], ['reclutamiento', 'capacitar']] }
      ] },
      { s: 'requisicion', n: 'Analisis de puestos', v: [
        { rel: 'Relacione cada concepto con su definición.', cols: ['Concepto', 'Definición'],
          pares: [['Proceso de reclutamiento', 'Inicia con la petición del área donde surge la vacante y termina al elegir al candidato'],
            ['Requisición de personal', 'Documento con el que se pide reemplazar a un trabajador'],
            ['Descripción del puesto', 'Herramienta para conocer con precisión las particularidades del puesto'],
            ['Análisis de puestos', 'Establece con precisión tareas, requisitos, responsabilidades y condiciones del puesto']],
          extra: ['Inventario de personal que ya labora en la organización'] }
      ] },
      { s: 'interno', n: 'Tipos de reclutamiento', v: [
        { p: '¿Qué tipo de reclutamiento usa transferencias, promociones o planes de carrera del personal que ya trabaja en la empresa?', b: 'Interno', m: ['Externo', 'En línea', 'Por agencia'] },
        { p: 'Cuando una empresa busca candidatos en universidades, bolsas de trabajo y anuncios, el reclutamiento es:', b: 'externo', m: ['interno', 'mixto por promoción', 'por transferencia'] }
      ] },
      { s: 'entrevista', n: 'Tipos de entrevista', v: [
        { p: '¿Qué tipo de entrevista sigue un patrón fijo de preguntas para comparar a los candidatos?', b: 'Dirigida (estructurada)', m: ['Mixta', 'No dirigida', 'De tensión'] },
        { p: '¿Qué tipo de entrevista deja que el candidato hable libremente, sin un guion fijo?', b: 'No dirigida', m: ['Dirigida', 'De tensión', 'Grupal'] }
      ] },
      { s: 'examenMedico', n: 'Evaluaciones de seleccion', v: [
        { p: 'Tiene como finalidad evaluar la salud física y mental de los candidatos para saber si tienen algún impedimento para el puesto:', b: 'Examen médico', m: ['Estudio socioeconómico', 'Prueba psicométrica', 'Prueba situacional'] },
        { p: 'Visitar el domicilio del candidato para conocer su entorno familiar y económico corresponde al:', b: 'estudio socioeconómico', m: ['examen médico', 'examen de conocimientos', 'periodo de prueba'] }
      ] },
      { s: 'contratos', n: 'Tipos de contrato', v: [
        { p: '¿Qué tipo de contrato se usa para actividades que se repiten sólo en ciertas épocas del año?', b: 'Por temporada', m: ['Indeterminado', 'Periodo de prueba', 'Por capacitación inicial'] },
        { p: 'El contrato que no tiene fecha de terminación es el:', b: 'por tiempo indeterminado', m: ['por obra determinada', 'por temporada', 'de capacitación inicial'] }
      ] },
      { s: 'induccion', n: 'Induccion', v: [
        { p: 'Proceso en el que al empleado de nuevo ingreso se le explican la misión, visión, valores, horarios y prestaciones de la empresa:', b: 'Inducción', m: ['Capacitación', 'Entrevista', 'Selección'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-rhNomina',
    grupo: 'Recursos humanos',
    nombre: 'Nomina',
    descripcion: 'Salario base de cotizacion, aguinaldo, prima vacacional, horas extra, ISR, percepcion neta, descuentos y Ley del Seguro Social. Reactivos 23 a 33 de la capacitacion.',
    etiquetas: ['nomina', 'aguinaldo', 'prima vacacional', 'horas extra', 'isr', 'imss'],
    formulario: 'Salario diario = mensual / 30 &nbsp;&middot;&nbsp; Aguinaldo = 15 días &times; diario &times; días trabajados / 365<br>' +
      'Prima vacacional = 25% &times; días de vacaciones &times; diario &nbsp;&middot;&nbsp; Horas extra (primeras 9 a la semana) = 2 &times; hora normal<br>' +
      'ISR = cuota fija + (ingreso &minus; límite inferior) &times; %',
    niveles: {
      facil: ['sbc', 'sindical', 'lss'],
      medio: ['sbc2', 'aguinaldo', 'prima', 'extra1', 'extra2'],
      dificil: ['isr', 'neto', 'falta']
    },
    items: [
      { s: 'sbc', n: 'Salario base de cotizacion', v: [
        { p: 'El salario base de cotización se integra con los pagos en efectivo por cuota diaria, gratificaciones y percepciones. ¿En qué ley se establece?', b: 'Ley del Seguro Social', m: ['Ley del Impuesto sobre la Renta', 'Ley del INFONAVIT', 'Ley Federal del Trabajo'] }
      ] },
      { s: 'sbc2', n: 'Integracion del salario', v: [
        { p: '¿Qué prestaciones se suman al salario diario para obtener el salario diario integrado?', b: 'Las partes proporcionales de aguinaldo y prima vacacional, entre otras', m: ['Sólo las horas extra', 'Los descuentos del ISR', 'Las cuotas sindicales'] }
      ] },
      { s: 'aguinaldo', n: 'Aguinaldo proporcional', v: [aguinaldoProp] },
      { s: 'prima', n: 'Prima vacacional', v: [primaVac] },
      { s: 'extra1', n: 'Horas extra', v: [horasExtra] },
      { s: 'extra2', n: 'Horas extra (otro caso)', v: [horasExtra] },
      { s: 'isr', n: 'Retencion de ISR', v: [isrMensual] },
      { s: 'neto', n: 'Percepcion neta', v: [netoMensual] },
      { s: 'falta', n: 'Descuento por falta', v: [faltaSemana] },
      { s: 'sindical', n: 'Cuota sindical', v: [cuotaSindical] },
      { s: 'lss', n: 'Ley del Seguro Social', v: [
        { p: '¿Qué ley establece que se debe garantizar el derecho a la salud, la asistencia médica, la protección de los medios de subsistencia y los servicios sociales para el bienestar?', b: 'Ley del Seguro Social', m: ['Ley del INFONAVIT', 'Ley del ISR', 'Ley Federal del Trabajo'] },
        { p: '¿Qué institución otorga créditos a los trabajadores para comprar vivienda?', b: 'INFONAVIT', m: ['IMSS', 'SAT', 'STPS'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-rhSeguridad',
    grupo: 'Recursos humanos',
    nombre: 'Seguridad e higiene',
    descripcion: 'Seguridad e higiene laboral, NOM, factores de riesgo, equipo de proteccion y prevencion. Reactivos 34 a 40 de la capacitacion.',
    etiquetas: ['seguridad', 'higiene', 'riesgos', 'nom', 'epp'],
    niveles: {
      facil: ['higiene', 'seguridad', 'epp'],
      medio: ['nom', 'riesgos', 'programa'],
      dificil: ['ergonomia']
    },
    items: [
      { s: 'higiene', n: 'Higiene laboral', v: [
        { p: '¿Qué disciplina busca prevenir enfermedades de trabajo identificando y controlando los factores de riesgo del ambiente laboral?', b: 'Higiene laboral', m: ['Salud pública', 'Seguridad laboral', 'Mercadotecnia'] }
      ] },
      { s: 'seguridad', n: 'Seguridad laboral', v: [
        { p: 'Conjunto de reglas y medidas para prevenir accidentes y proteger la integridad física del trabajador:', b: 'Seguridad laboral', m: ['Higiene laboral', 'Salud pública', 'Capacitación'] }
      ] },
      { s: 'nom', n: 'Normas Oficiales Mexicanas', v: [
        { p: 'Categoría de las Normas Oficiales Mexicanas de la STPS cuyo propósito es prevenir enfermedades por las actividades laborales:', b: 'Salud', m: ['Específicas', 'Organización', 'Producto'] },
        { p: 'Las Normas Oficiales Mexicanas sobre seguridad e higiene en el trabajo las emite la:', b: 'Secretaría del Trabajo y Previsión Social (STPS)', m: ['Secretaría de Economía', 'Secretaría de Educación Pública', 'Secretaría de Hacienda'] }
      ] },
      { s: 'riesgos', n: 'Factores de riesgo', v: [
        { p: 'Saúl aplana el asfalto con una compactadora manual que vibra todo el día. ¿A qué factor de riesgo se expone?', b: 'Físico', m: ['Biológico', 'Ergonómico', 'Químico'] },
        { p: 'Una enfermera que maneja muestras de sangre se expone a un riesgo:', b: 'biológico', m: ['físico', 'químico', 'ergonómico'] },
        { p: 'Un capturista que pasa 8 horas sentado en una silla sin respaldo adecuado se expone a un riesgo:', b: 'ergonómico', m: ['biológico', 'químico', 'físico'] }
      ] },
      { s: 'epp', n: 'Equipo de proteccion', v: [
        { p: 'Juan trabaja en una obra y no usa el casco ni el arnés que le asignaron porque le resultan incómodos. ¿Qué omisión está cometiendo?', b: 'No usar el equipo de protección personal', m: ['Adoptar una mala postura', 'No asistir a las capacitaciones', 'Trabajar a un ritmo inadecuado'] }
      ] },
      { s: 'programa', n: 'Programas de prevencion', v: [
        { p: '¿Qué programa identifica los riesgos laborales que afectan la salud del personal y aplica medidas preventivas?', b: 'De prevención de riesgos laborales', m: ['De capacitación técnica', 'De manejo de herramientas', 'De inducción'] }
      ] },
      { s: 'ergonomia', n: 'Medidas ergonomicas', v: [
        { p: 'Francisco es cajero, pasa casi toda la jornada de pie y ya tiene molestias en las piernas. ¿Qué medida ayudaría más a su salud en el trabajo?', b: 'Poner un banco para sentarse a intervalos periódicos', m: ['Acudir a un centro deportivo', 'Cambiarse de departamento', 'Trabajar más horas extra'] }
      ] }
    ]
  });
})();
