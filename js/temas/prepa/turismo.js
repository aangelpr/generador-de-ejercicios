/* Modo prepa - Turismo (capacitacion, 40 reactivos): hospedaje, cocina,
   restaurante y bar, y caja */
(function () {
  'use strict';
  var P = EJ.prepa;

  function pesos(v) {
    var s = (Math.round(v * 100) / 100).toFixed(2).split('.');
    return '$' + s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + s[1];
  }
  var HUESPED = ['la familia Melgarejo', 'el señor Ramírez', 'la señora Mena', 'la familia Torres', 'el grupo de la empresa Dulce Vita'];

  /* ---------- preguntas con datos al azar ---------- */
  function estancia(r) {
    var tarifa = r.entero(12, 60) * 100, noches = r.entero(2, 5);
    var base = tarifa * noches, total = base * 1.19;
    return { p: 'Emilio, de reservaciones, recibe una llamada para apartar una habitación de ' + pesos(tarifa) + ' por noche (sin impuestos) durante ' + noches +
        ' noches. Debe aplicar 16% de IVA y 3% de impuesto sobre hospedaje (ISH). ¿Cuál será el costo total de la estancia?',
      b: total, m: [base, base * 1.16, tarifa * 1.19, tarifa * (noches + 1) * 1.19], fmt: pesos,
      ex: pesos(tarifa) + ' × ' + noches + ' noches = ' + pesos(base) + '; más 16% + 3% = 19%: ' + pesos(base) + ' × 1.19 = ' + pesos(total) };
  }
  function estanciaPropina(r) {
    var tarifa = r.entero(8, 30) * 50, noches = r.entero(2, 4), q = r.elige(HUESPED);
    var base = tarifa * noches, total = base * 1.29;
    return { p: 'Se registró una reservación para ' + q + ' por ' + noches + ' noches en una habitación twin de ' + pesos(tarifa) +
        ' por noche (tarifa rack). Calcule el costo total incluyendo 16% de IVA, 3% de ISH y 10% de propina.',
      b: total, m: [base, base * 1.16, base * 1.19, tarifa * (noches + 1) * 1.29], fmt: pesos,
      ex: pesos(base) + ' × (1 + 0.16 + 0.03 + 0.10) = ' + pesos(base) + ' × 1.29 = ' + pesos(total) };
  }
  function ajuste(r) {
    var tarifa = r.entero(20, 60) * 100, noches = r.entero(2, 5), pct = r.elige([10, 15, 20, 25, 30]);
    var v = tarifa * noches * pct / 100;
    return { p: 'El señor Ramírez se hospedó ' + noches + ' noches en una Junior Suite de ' + pesos(tarifa) + ' por noche (sin impuestos). Por ser cliente VIP le correspondía ' + pct +
        '% de descuento, pero no se aplicó. ¿Cuál es el monto del ajuste (sin impuestos) que se le debe descontar?',
      b: v, m: [tarifa * pct / 100, v * 1.16, tarifa * noches - v, v * 1.19], fmt: pesos,
      ex: pesos(tarifa) + ' × ' + noches + ' = ' + pesos(tarifa * noches) + '; ' + pct + '% = ' + pesos(v) };
  }
  function saldos(r) {
    /* cuatro habitaciones con consumos y abonos; el saldo puede ser deudor, acreedor o cero */
    var cuartos = [401, 405, 409, 411], filas = [];
    var tipos = r.baraja(['deudor', 'deudor', 'acreedor', 'cero']);
    tipos.forEach(function (t, i) {
      var cons = [r.entero(5, 30) * 50, r.entero(4, 20) * 50, r.entero(2, 12) * 50];
      var suma = cons[0] + cons[1] + cons[2];
      var abono = t === 'cero' ? suma : t === 'deudor' ? suma - r.entero(2, 30) * 50 : suma + r.entero(2, 40) * 50;
      var saldo = suma - abono;
      filas.push({ desc: 'Habitación ' + cuartos[i] + ': restaurante ' + pesos(cons[0]) + ', bar ' + pesos(cons[1]) + ', spa ' + pesos(cons[2]) + '; abona ' + pesos(abono),
        saldo: saldo === 0 ? 'Cuenta saldada' : pesos(Math.abs(saldo)) + (saldo > 0 ? ' deudor' : ' acreedor') });
    });
    return { rel: 'Relacione el saldo final con los cargos y abonos de cada habitación del grupo.', cols: ['Saldo', 'Cargos y abonos'],
      pares: filas.map(function (f) { return [f.saldo, f.desc]; }), ex: 'Saldo = cargos − abonos: si los cargos son mayores el saldo es deudor; si el abono es mayor, acreedor.' };
  }

  P.temaBanco({
    id: 'prepa-hospedaje',
    grupo: 'Turismo',
    nombre: 'Hospedaje',
    descripcion: 'Clasificacion hotelera, tipos de habitacion, planes de alojamiento, costo de la estancia, formas de pago, check in, concierge, botones, guarda de equipaje, objetos olvidados y limpieza. Reactivos 1 a 12 de la capacitacion.',
    etiquetas: ['hotel', 'habitacion', 'plan americano', 'check in', 'botones', 'ama de llaves'],
    formulario: 'Costo de la estancia = tarifa &times; noches &times; (1 + 0.16 IVA + 0.03 ISH) &nbsp;&middot;&nbsp; Con propina de 10%: &times; 1.29',
    niveles: {
      facil: ['estrellas', 'habitacion', 'pagos', 'concierge'],
      medio: ['planes', 'costo', 'checkIn', 'checkRoom', 'olvidados'],
      dificil: ['costoPropina', 'botones', 'limpieza']
    },
    items: [
      { s: 'estrellas', n: 'Clasificacion hotelera', v: [
        { p: '¿Qué institución otorga en México la clasificación de estrellas a los hoteles?', b: 'Secretaría de Turismo (SECTUR)', m: ['American Automobile Association (AAA)', 'Asociación Mexicana de Hoteles y Moteles', 'Organización Mundial del Turismo (OMT)'] }
      ] },
      { s: 'habitacion', n: 'Tipos de habitacion', v: [
        { c: 'La habitación tipo ___ incluye ___ camas individuales iguales.', b: ['twin', 'dos'], m: [['king size', 'dos'], ['twin', 'tres'], ['king size', 'tres']] },
        { c: 'La habitación ___ tiene una sola cama ___, la más grande de las medidas comunes.', b: ['king size', 'extragrande'], m: [['twin', 'extragrande'], ['sencilla', 'individual'], ['doble', 'individual']] }
      ] },
      { s: 'planes', n: 'Planes de alojamiento', v: [
        { rel: 'Relacione cada plan de alojamiento con su característica.', cols: ['Plan', 'Característica'],
          pares: [['Americano (AP)', 'Incluye los tres alimentos'], ['Continental (CP)', 'Incluye un desayuno ligero (café, pan, mantequilla y mermelada)'],
            ['Europeo (EP)', 'Sin alimentos, sólo la habitación'], ['Americano modificado (MAP)', 'Incluye dos alimentos']], n: 3 }
      ] },
      { s: 'costo', n: 'Costo de la estancia', v: [estancia] },
      { s: 'costoPropina', n: 'Costo con propina', v: [estanciaPropina] },
      { s: 'pagos', n: 'Formas de pago', v: [
        { rel: 'Relacione cada forma de pago con su característica.', cols: ['Forma de pago', 'Característica'],
          pares: [['Cupones', 'Documento que se cambia por descuentos o productos'], ['Efectivo', 'Billetes y monedas'], ['Transferencia bancaria', 'Envío de dinero de una cuenta bancaria a otra'],
            ['Tarjeta de crédito', 'El titular contrae una deuda con el banco que la emite'], ['Tarjeta de débito', 'Se paga con el dinero que el titular tiene en su cuenta']], n: 4 }
      ] },
      { s: 'checkIn', n: 'Check in', v: [
        { orden: 'Ordene el procedimiento del recepcionista para el check in.', pasos: ['Recibir al cliente con una sonrisa y darle la bienvenida', 'Ofrecer las habitaciones y preguntar si viene de una empresa o agencia para darle una tarifa especial',
          'Pedir que llene la tarjeta de registro y corroborar sus datos', 'Asignar la habitación, preguntar la forma de pago y dar a conocer el reglamento', 'Desearle una feliz estancia'] }
      ] },
      { s: 'concierge', n: 'Personal del hotel', v: [
        { p: 'Una huésped quiere visitar los atractivos turísticos de la ciudad y que le reserven un tour. ¿Quién es la persona especializada en ese servicio?', b: 'Concierge', m: ['Ama de llaves', 'Botones', 'Recepcionista'] },
        { p: '¿Quién es responsable de la limpieza y el orden de las habitaciones y áreas públicas del hotel?', b: 'Ama de llaves', m: ['Concierge', 'Botones', 'Capitán de meseros'] }
      ] },
      { s: 'botones', n: 'Cambio de habitacion', v: [
        { orden: 'Ordene los pasos del botones al hacer un cambio de habitación del huésped.', pasos: ['El recepcionista ordena el cambio al capitán de botones y entrega la llave nueva', 'El capitán de botones asigna a un botones',
          'En la habitación anterior, el botones hace una revisión general para que no se olvide nada', 'Se pide la llave anterior al huésped y se le traslada', 'En la nueva habitación se revisa todo y se acomoda el equipaje'] }
      ] },
      { s: 'checkRoom', n: 'Guarda de equipaje', v: [
        { orden: 'Ordene el proceso del servicio de guarda de equipaje (check room).', pasos: ['El capitán de botones saluda al huésped', 'Se le indica si el servicio es gratuito o tiene costo',
          'El capitán llena la forma de equipaje y explica las políticas de resguardo', 'El huésped recibe su comprobante de equipaje'] }
      ] },
      { s: 'olvidados', n: 'Objetos olvidados', v: [
        { orden: 'Ordene los pasos del control de objetos olvidados.', pasos: ['Llevar el objeto a la oficina de ama de llaves', 'Registrarlo en la libreta: fecha, hora, objeto, lugar y quién lo encontró',
          'Etiquetar el objeto con sus datos', 'Entregarlo al huésped, que firma de recibido con fecha y hora'] }
      ] },
      { s: 'limpieza', n: 'Limpieza de habitacion', v: [
        { orden: 'Ordene los pasos de la limpieza de una habitación de salida (vacía y sucia).', pasos: ['Tocar la puerta', 'Dejar la puerta abierta y ventilar el cuarto', 'Apagar luces y aparatos, contar la ropa y revisar daños',
          'Revisar si hay objetos olvidados y destender las camas', 'Sacar la ropa sucia y la basura, y meter la ropa limpia'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-cocina',
    grupo: 'Turismo',
    nombre: 'Cocina',
    descripcion: 'Equipo de cocina, condimentos, terminos culinarios, metodos de coccion, higiene, cortes, fondos y salsas madre. Reactivos 13 a 20 de la capacitacion.',
    etiquetas: ['cocina', 'cortes', 'fondos', 'salsas madre', 'coccion'],
    niveles: {
      facil: ['condimento', 'lechuga', 'fondos'],
      medio: ['equipoMayor', 'terminos', 'coccion'],
      dificil: ['cortes', 'salsas']
    },
    items: [
      { s: 'equipoMayor', n: 'Equipo mayor de cocina', v: [
        { lista: 'Del siguiente listado, identifique el equipo mayor de cocina.', si: ['Horno', 'Plancha', 'Salamandra', 'Estufa', 'Freidora'], no: ['Batidor de globo', 'Cuchillo', 'Pala', 'Colador', 'Tabla de picar'] }
      ] },
      { s: 'condimento', n: 'Condimentos', v: [
        { p: '¿Qué es un condimento?', b: 'Sustancia que se usa para realzar el sabor natural de los alimentos', m: ['Atado de laurel, tomillo y perejil', 'Nombre de las plantas de hoja verde', 'Mezcla de yema y crema para espesar'] }
      ] },
      { s: 'terminos', n: 'Terminos culinarios', v: [
        { rel: 'Relacione cada término culinario con su definición.', cols: ['Término', 'Definición'],
          pares: [['Bouquet garni', 'Atado de hierbas aromáticas para caldos y fondos'], ['Ligazón', 'Mezcla de yema de huevo y crema para espesar'], ['Marinar', 'Poner un alimento en un líquido aromatizado'],
            ['Reducir', 'Hervir un líquido para que se concentre'], ['Deshuesar', 'Quitar los huesos de la carne']], n: 4 }
      ] },
      { s: 'coccion', n: 'Metodos de coccion', v: [
        { lista: 'Seleccione las técnicas de cocción en medio seco.', si: ['Asado al horno', 'Asado a la plancha', 'Gratinado', 'A la parrilla'], no: ['Salteado en aceite', 'Hervido', 'Escalfado', 'Al vapor'] },
        { lista: 'Seleccione las técnicas de cocción en medio húmedo.', si: ['Hervido', 'Escalfado', 'Al vapor'], no: ['Asado al horno', 'Gratinado', 'A la parrilla', 'Asado a la plancha'] }
      ] },
      { s: 'lechuga', n: 'Desinfeccion de verduras', v: [
        { orden: 'Ordene el procedimiento para desinfectar una lechuga.', pasos: ['Quitar las hojas sucias y lavar hoja por hoja bajo el chorro de agua', 'Preparar la solución desinfectante en agua',
          'Sumergir las hojas de 2 a 4 minutos y enjuagar', 'Cortar en porciones y guardar'] }
      ] },
      { s: 'cortes', n: 'Cortes de verdura', v: [
        { rel: 'Relacione cada tipo de corte con su característica.', cols: ['Corte', 'Característica'],
          pares: [['Brunoise', 'Dados de 1 a 2 mm de lado'], ['Macedonia', 'Dados de 4 a 5 mm de lado'], ['Chips', 'Tajadas de 2 mm'], ['Paja', 'Tiras de 2 mm de ancho y 5 cm de largo'],
            ['Bastón', 'Tiras de 6 a 7 cm de largo por 1 cm de ancho'], ['Juliana', 'Tiras muy finas, de 1 mm, a lo largo']], n: 4 }
      ] },
      { s: 'fondos', n: 'Fondos', v: [
        { p: 'Los huesos y retazos de pollo, sin dorar, son la base del fondo:', b: 'blanco (claro)', m: ['de vegetales', 'fumet', 'oscuro'] },
        { p: 'Las espinas y cabezas de pescado son la base del:', b: 'fumet', m: ['fondo oscuro', 'fondo blanco', 'consomé de res'] },
        { p: 'Los huesos de res dorados en el horno son la base del fondo:', b: 'oscuro', m: ['blanco', 'fumet', 'de vegetales'] }
      ] },
      { s: 'salsas', n: 'Salsas madre', v: [
        { p: '¿Qué salsa madre se prepara con fondo claro y roux?', b: 'Velouté', m: ['Bechamel', 'Española', 'Holandesa'] },
        { p: '¿Qué salsa madre se prepara con leche y roux?', b: 'Bechamel', m: ['Velouté', 'Española', 'Holandesa'] },
        { p: '¿Qué salsa madre se prepara emulsionando yemas de huevo con mantequilla clarificada?', b: 'Holandesa', m: ['Bechamel', 'Velouté', 'Española'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-restaurante',
    grupo: 'Turismo',
    nombre: 'Restaurante y bar',
    descripcion: 'Terminos de restaurante, equipo de servicio, tipos de servicio y montaje, stock, reservaciones, recepcion del comensal, carta y menu, charoleo, cristaleria, equipo de bar y bebidas. Reactivos 21 a 35 de la capacitacion.',
    etiquetas: ['restaurante', 'montaje', 'servicio', 'bar', 'cristaleria', 'bebidas'],
    niveles: {
      facil: ['coffeeBreak', 'montajeMesa', 'recepcionComensal', 'menu', 'charoleo', 'bebidasSin'],
      medio: ['terminosRest', 'tipoServicio', 'montaje', 'stock', 'reservacion', 'cristaleria', 'bebidasAlcohol'],
      dificil: ['equipoServicio', 'equipoBar']
    },
    items: [
      { s: 'terminosRest', n: 'Terminos de restaurante', v: [
        { rel: 'Relacione los términos de restaurante con su definición.', cols: ['Término', 'Definición'],
          pares: [['Aforo', 'Capacidad de un salón'], ['Comensal', 'Cliente de un restaurante'], ['Escamochar', 'Quitar los restos de comida de los platos'],
            ['Garnitura', 'Adorno de un platillo o bebida'], ['Muertos', 'Equipo sucio que se retira de la mesa']], n: 4 }
      ] },
      { s: 'equipoServicio', n: 'Equipo de servicio', v: [
        { rel: 'Relacione cada equipo de servicio con su clasificación.', cols: ['Equipo', 'Clasificación'],
          pares: [['Plato trinche', 'Loza'], ['Copa de vino', 'Cristalería'], ['Tenedor para pescado', 'Plaqué (cubertería)'], ['Mantel', 'Blancos'], ['Chafing dish', 'Equipo auxiliar']], n: 4 }
      ] },
      { s: 'tipoServicio', n: 'Tipos de servicio', v: [
        { p: 'Tipo de servicio en el que los platillos salen ya emplatados desde la cocina y se sirven al comensal:', b: 'Americano', m: ['Francés', 'Ruso (gueridón)', 'Buffet'] },
        { p: 'Tipo de servicio en el que el mesero termina de preparar o trincha el platillo en un carrito (gueridón) frente al comensal:', b: 'Ruso (gueridón)', m: ['Americano', 'Buffet', 'Emplatado'] },
        { p: 'Tipo de servicio en el que los comensales se sirven solos de una mesa con varios platillos:', b: 'Buffet', m: ['Americano', 'Francés', 'Ruso'] }
      ] },
      { s: 'montaje', n: 'Montaje de eventos', v: [
        { p: 'Un chef hará una demostración en vivo para 24 invitados que deben ver de frente su estación y poder hacerle preguntas. ¿Qué montaje es el adecuado?', b: 'En "U"', m: ['En "E"', 'En "I"', 'En "T"'] },
        { p: 'Para una conferencia con 300 asistentes que sólo escucharán al ponente, sin mesas, el montaje adecuado es:', b: 'tipo auditorio', m: ['en "U"', 'imperial', 'tipo banquete'] }
      ] },
      { s: 'coffeeBreak', n: 'Servicios para eventos', v: [
        { p: 'En una reunión de trabajo se hará un descanso a la mitad de la sesión. ¿Qué servicio es el adecuado?', b: 'Coffee break', m: ['Brunch', 'Coctel', 'Banquete'] },
        { p: 'Comida que combina desayuno y almuerzo, servida a media mañana:', b: 'Brunch', m: ['Coffee break', 'Coctel', 'Cena de gala'] }
      ] },
      { s: 'stock', n: 'Stock de servicio', v: [
        { orden: 'Ordene la preparación del stock de servicio en el piso de ventas.', pasos: ['Revisar los artículos disponibles', 'Revisar que se tenga la cantidad requerida', 'Lavar y llenar convoyes y salseras', 'Distribuir el stock en las mesas'] }
      ] },
      { s: 'montajeMesa', n: 'Montaje de mesa', v: [
        { p: 'Una mesa tiene mantel individual, servilleta de papel, cuchillo y tenedor, cuchara cafetera, taza con plato (terno de café), azucarera y vaso para agua. ¿A qué montaje corresponde?', b: 'Desayuno', m: ['Cena', 'Comida', 'Formal'] }
      ] },
      { s: 'reservacion', n: 'Reservacion en restaurante', v: [
        { orden: 'Ordene el proceso de reservación por teléfono para un restaurante.', pasos: ['Contestar dando el nombre del restaurante y del empleado', 'Pedir nombre, fecha, hora y número de personas',
          'Verificar la disponibilidad y sugerir menús o especiales', 'Confirmar repitiendo los datos clave', 'Despedirse amablemente'] }
      ] },
      { s: 'recepcionComensal', n: 'Recepcion del comensal', v: [
        { orden: 'Ordene los pasos para la recepción del comensal en un restaurante.', pasos: ['La hostess da la bienvenida, verifica la reservación y lleva al cliente a su mesa', 'Se entrega la carta o menú',
          'El mesero toma la orden en la comanda', 'El mesero sirve los platillos y pregunta si se necesita algo más', 'El mesero entrega la cuenta cuando el comensal la pide'] }
      ] },
      { s: 'menu', n: 'Carta y menu', v: [
        { p: 'Es la selección de platillos para una comida, desayuno o cena, organizada por tiempos:', b: 'Menú', m: ['Carta', 'Catálogo', 'Recetario'] },
        { p: 'Es la lista completa de platillos y bebidas que ofrece un restaurante, con sus precios, de la que el cliente elige libremente:', b: 'Carta', m: ['Menú', 'Comanda', 'Recetario'] }
      ] },
      { s: 'charoleo', n: 'Tecnicas de servicio', v: [
        { p: 'Técnica que usa el mesero para transportar platillos y equipo de la cocina a la mesa y viceversa:', b: 'Charoleo', m: ['Cuchareo', 'Descorche', 'Flambeo'] },
        { p: 'Técnica de servir porciones con cuchara y tenedor desde un platón al plato del comensal:', b: 'Cuchareo (pinza)', m: ['Charoleo', 'Flambeo', 'Descorche'] }
      ] },
      { s: 'cristaleria', n: 'Cristaleria', v: [
        { rel: 'Relacione cada bebida con la cristalería adecuada.', cols: ['Bebida', 'Cristalería'],
          pares: [['Champaña o mimosa', 'Copa flauta'], ['Whisky en las rocas', 'Vaso old fashioned'], ['Cuba o jaibol', 'Vaso highball (jaibolero)'], ['Cerveza de barril', 'Tarro'], ['Martini', 'Copa coctelera (martini)']], n: 3 }
      ] },
      { s: 'equipoBar', n: 'Equipo de bar', v: [
        { p: '¿Cuál es el equipo de bar que se usa para preparar bebidas?', b: 'Colador de gusano, jigger, vaso mezclador y cuchara bailarina', m: ['Cuchara de bar, olla bruja, macerador y convoy', 'Bambalina, exprimidor, rechaud y salamandra', 'Batidora, chalupa, hielera y campana'] }
      ] },
      { s: 'bebidasAlcohol', n: 'Bebidas con alcohol', v: [
        { rel: 'Relacione cada tipo de bebida con alcohol con su característica.', cols: ['Bebida', 'Característica'],
          pares: [['Destilados', 'Se obtienen por destilación de un fermentado; tienen alta graduación (tequila, ron, whisky)'],
            ['Vinos', 'Se elaboran fermentando uvas; se equilibran taninos, acidez y alcohol para maridar'],
            ['Cervezas', 'Se elaboran con cebada malteada, lúpulo, agua y levadura; tienen espuma']],
          extra: ['Son digestivos dulces que se sirven siempre calientes'] }
      ] },
      { s: 'bebidasSin', n: 'Bebidas sin alcohol', v: [
        { rel: 'Relacione cada bebida sin alcohol con su característica.', cols: ['Bebida', 'Característica'],
          pares: [['Batidos', 'Bebidas espesas y cremosas de una base líquida con frutas'], ['Zumos', 'Líquido extraído de frutas o verduras'],
            ['Tisanas', 'Infusiones de hierbas, flores o frutas en agua caliente'], ['Refrescos', 'Bebidas carbonatadas y endulzadas']], n: 3 }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-caja',
    grupo: 'Turismo',
    nombre: 'Caja de restaurante y recepcion',
    descripcion: 'Conceptos de caja, procedimientos del cajero de restaurante y de recepcion, ajustes y saldos de huespedes. Reactivos 36 a 40 de la capacitacion.',
    etiquetas: ['caja', 'cargo', 'abono', 'ish', 'divisa', 'saldo'],
    niveles: {
      facil: ['ajuste'],
      medio: ['conceptosCaja', 'cajeroRecep'],
      dificil: ['cajeroRest', 'saldos']
    },
    items: [
      { s: 'conceptosCaja', n: 'Conceptos de caja', v: [
        { rel: 'Relacione cada concepto de caja con su definición.', cols: ['Concepto', 'Definición'],
          pares: [['Cargo', 'Registro de un consumo que aumenta lo que debe el huésped'], ['Abono', 'Pago que disminuye el saldo de la cuenta del huésped'], ['Divisa', 'Moneda extranjera'],
            ['ISH', 'Impuesto que se cobra por el servicio de hospedaje'], ['Ajuste', 'Corrección de errores u omisiones en el estado de cuenta'], ['Fondo fijo de caja', 'Efectivo que se entrega al cajero para iniciar su turno']], n: 4 }
      ] },
      { s: 'cajeroRest', n: 'Cajero de restaurante', v: [
        { orden: 'Ordene los pasos del cajero de restaurante durante su jornada.', pasos: ['Recibir la gaveta y el fondo fijo de caja', 'Revisar la bitácora y los pendientes del turno anterior',
          'Verificar en el sistema las cuentas abiertas', 'Emitir los cheques de consumo que pide el mesero', 'Cobrar las cuentas según la forma de pago', 'Elaborar la factura si el cliente la pide'] }
      ] },
      { s: 'cajeroRecep', n: 'Cajero de recepcion', v: [
        { orden: 'Ordene los pasos del cajero de recepción durante su turno.', pasos: ['Recibir el fondo fijo y revisar la bitácora', 'Verificar las cuentas pendientes de registrar en los estados de cuenta',
          'Atender a los huéspedes que liquidan su estancia', 'Hacer el corte de caja con el jefe de área', 'El jefe de cajeros elabora el sobre de concentración y lo guarda'] }
      ] },
      { s: 'ajuste', n: 'Ajuste por descuento', v: [ajuste] },
      { s: 'saldos', n: 'Saldos de huespedes', v: [saldos] }
    ]
  });
})();
