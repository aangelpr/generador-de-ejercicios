/* Modo prepa - Contabilidad (capacitacion, 40 reactivos): fundamentos,
   cuentas y registro, estados financieros, caja y bancos, impuestos y nomina */
(function () {
  'use strict';
  var P = EJ.prepa;

  function pesos(v, dec) {
    var s = (Math.round(v * 100) / 100).toFixed(dec === 0 ? 0 : 2).split('.');
    return '$' + s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (s[1] ? '.' + s[1] : '');
  }
  function p0(v) { return pesos(v, 0); }
  function tabla(filas, enc) {
    var h = '<table class="tabla"><tr><th>' + enc.join('</th><th>') + '</th></tr>';
    filas.forEach(function (f) { h += '<tr><td>' + f.join('</td><td>') + '</td></tr>'; });
    return h + '</table>';
  }
  function cien(r, a, b) { return r.entero(a, b) * 50; }

  /* ---------- preguntas con datos al azar ---------- */
  function utilidad(r) {
    var v = cien(r, 2000, 5000), cv = cien(r, 600, 1500), ga = cien(r, 200, 600), gv = cien(r, 200, 700),
      pf = cien(r, 50, 300), gf = cien(r, 50, 250), op = cien(r, 50, 400), og = cien(r, 30, 150);
    var ub = v - cv, uo = ub - ga - gv, u = uo + pf - gf + op - og;
    var filas = r.baraja([['Ventas', p0(v)], ['Costo de ventas', p0(cv)], ['Gastos de administración', p0(ga)], ['Gastos de venta', p0(gv)],
      ['Productos financieros', p0(pf)], ['Gastos financieros', p0(gf)], ['Otros productos', p0(op)], ['Otros gastos', p0(og)]]);
    return { p: 'Con los siguientes datos, determine la utilidad del ejercicio (antes de impuestos).' + tabla(filas, ['Cuenta', 'Monto']),
      b: u, m: [ub, uo, u - 2 * (pf - gf), v - cv - ga - gv - gf - og, u + og], fmt: p0,
      ex: 'Utilidad bruta = ' + p0(v) + ' − ' + p0(cv) + ' = ' + p0(ub) + '; utilidad de operación = ' + p0(ub) + ' − ' + p0(ga + gv) + ' = ' + p0(uo) +
        '; + productos financieros − gastos financieros + otros productos − otros gastos = ' + p0(u) };
  }
  function comprasNetas(r) {
    var c = cien(r, 4000, 9000), g = cien(r, 200, 800), dev = cien(r, 100, 600), reb = cien(r, 100, 300), bon = cien(r, 50, 200), des = cien(r, 100, 400);
    var tot = c + g, net = tot - dev - reb - bon - des;
    var filas = r.baraja([['Ventas', p0(cien(r, 9000, 20000))], ['Inventario inicial', p0(cien(r, 3000, 6000))], ['Compras', p0(c)], ['Gastos de compra', p0(g)],
      ['Devoluciones sobre compras', p0(dev)], ['Rebajas sobre compras', p0(reb)], ['Bonificaciones sobre compras', p0(bon)], ['Descuentos sobre compras', p0(des)],
      ['Devoluciones sobre ventas', p0(cien(r, 100, 600))], ['Inventario final', p0(cien(r, 3000, 6000))]]);
    return { p: 'De acuerdo con la siguiente información, calcule las compras netas.' + tabla(filas, ['Cuenta', 'Saldo']),
      b: net, m: [c - dev - reb - bon - des, tot, net + 2 * g, c - dev], fmt: p0,
      ex: 'Compras totales = ' + p0(c) + ' + ' + p0(g) + ' = ' + p0(tot) + '; menos devoluciones, rebajas, bonificaciones y descuentos sobre compras (' + p0(dev + reb + bon + des) + ') = ' + p0(net) };
  }
  function asientoIVA(r) {
    var costo = r.entero(80, 300) * 1000, total = costo * 1.16, banco = r.entero(2, 6) * 10000;
    var doc = r.entero(5, 12) * 10000; if (banco + doc >= total) doc = Math.floor((total - banco) / 20000) * 10000;
    var prov = total - banco - doc, iva = costo * 0.16, ivaA = banco / 1.16 * 0.16, ivaP = iva - ivaA;
    function op(a, b) { return '1. ' + pesos(a) + ', 2. ' + pesos(b); }
    return { p: 'Determine las cantidades que faltan para completar el asiento (compra de mercancía más IVA, pagando una parte con cheque).' +
        tabla([['Almacén', pesos(costo), ''], ['IVA acreditable', '1. ______', ''], ['IVA por acreditar', '2. ______', ''], ['Bancos', '', pesos(banco)],
          ['Documentos por pagar', '', pesos(doc)], ['Proveedores', '', pesos(prov)]], ['Cuenta', 'Debe', 'Haber']),
      b: op(ivaA, ivaP), m: [op(banco * 0.16, iva - banco * 0.16), op(ivaP, ivaA), op(iva / 2, iva / 2), op(ivaA, iva)],
      ex: 'IVA total = 16% de ' + pesos(costo) + ' = ' + pesos(iva) + '. Lo pagado (bancos) ya incluye IVA: ' + pesos(banco) + ' / 1.16 × 0.16 = ' + pesos(ivaA) + ' es acreditable; el resto, ' + pesos(ivaP) + ', queda por acreditar.' };
  }
  function balanza(r) {
    var cuentas = [['Caja', 'D'], ['Bancos', 'D'], ['Almacén', 'D'], ['Clientes', 'D'], ['Equipo de oficina', 'D'], ['Proveedores', 'A'], ['Acreedores diversos', 'A'], ['Capital social', 'A']];
    var filas = [], md = 0, ma = 0, sd = 0, sa = 0;
    var deud = [], acre = [];
    cuentas.forEach(function (c) {
      var x = r.entero(1, 30) * 1000, y = c[1] === 'D' ? r.entero(0, 1) * r.entero(1, Math.max(1, x / 1000 - 1)) * 1000 : 0;
      deud.push([c[0], x, y]);
    });
    /* cuadra: suma de saldos deudores = suma de saldos acreedores */
    var totalD = 0;
    deud.filter(function (d, i) { return cuentas[i][1] === 'D'; }).forEach(function (d) { totalD += d[1] - d[2]; });
    var prov = r.entero(1, 5) * 1000, acr = r.entero(1, 5) * 1000, cap = totalD - prov - acr;
    if (cap <= 0) { cap = totalD; prov = 0; acr = 0; }
    var acreed = [['Proveedores', prov], ['Acreedores diversos', acr], ['Capital social', cap]];
    deud.forEach(function (d, i) {
      if (cuentas[i][1] !== 'D') return;
      md += d[1]; ma += d[2]; sd += d[1] - d[2];
      filas.push([d[0], p0(d[1]), d[2] ? p0(d[2]) : '', p0(d[1] - d[2]), '']);
    });
    acreed.forEach(function (a) {
      if (!a[1]) return;
      var cargo = a[0] === 'Capital social' ? 0 : r.entero(0, 1) * 1000;
      md += cargo; ma += a[1] + cargo; sa += a[1];
      filas.push([a[0], cargo ? p0(cargo) : '', p0(a[1] + cargo), '', p0(a[1])]);
    });
    function op(m, s) { return 'Movimientos ' + p0(m) + ', saldos ' + p0(s); }
    return { p: 'Con la siguiente balanza de comprobación, determine la suma de movimientos y la suma de saldos.' + tabla(filas, ['Cuenta', 'Mov. deudor', 'Mov. acreedor', 'Saldo deudor', 'Saldo acreedor']),
      b: op(md, sd), m: [op(md + ma, sd), op(md, sd + sa), op(md + sd, sd), op(sd, md), op(md - sd, sd), op(md, sd - 1000)],
      ex: 'Suma de movimientos: deudor ' + p0(md) + ' = acreedor ' + p0(ma) + '; suma de saldos: deudor ' + p0(sd) + ' = acreedor ' + p0(sa) + '. En una balanza correcta, cada par debe ser igual.' };
  }
  function ivaCargo(r) {
    var tras = cien(r, 800, 2000), acred = tras - cien(r, 20, 300), favor = cien(r, 5, 40), xt = cien(r, 100, 400), xa = cien(r, 100, 400);
    var v = tras - acred - favor;
    if (v <= 0) { favor = 50; v = tras - acred - favor; }
    var filas = r.baraja([['IVA acreditable del mes', p0(acred)], ['IVA por acreditar del mes', p0(xa)], ['IVA trasladado del mes', p0(tras)], ['IVA por trasladar del mes', p0(xt)],
      ['IVA a favor del mes anterior', p0(favor)]]);
    return { p: 'Con la siguiente información, determine el IVA a cargo del mes.' + tabla(filas, ['Concepto', 'Importe']),
      b: v, m: [tras - acred, tras - acred + favor, tras + xt - acred - xa - favor, tras + xt - acred - xa], fmt: p0,
      ex: 'IVA a cargo = IVA trasladado − IVA acreditable − saldo a favor anterior = ' + p0(tras) + ' − ' + p0(acred) + ' − ' + p0(favor) + ' = ' + p0(v) + '. El IVA "por trasladar" y "por acreditar" todavía no se cobra ni se paga.' };
  }

  P.temaBanco({
    id: 'prepa-contaFundamentos',
    grupo: 'Contabilidad',
    nombre: 'Fundamentos y empresa',
    descripcion: 'Origen de la contabilidad, leyes que la regulan, objetivo de la contabilidad financiera, tipos de empresa y recursos. Reactivos 1 a 6 de la capacitacion.',
    etiquetas: ['pacioli', 'codigo fiscal', 'empresa', 'recursos'],
    niveles: {
      facil: ['pacioli', 'empresas', 'recursos'],
      medio: ['objetivo', 'tipoEmpresa'],
      dificil: ['leyes']
    },
    items: [
      { s: 'pacioli', n: 'Origen de la contabilidad', v: [
        { p: '¿A quién se le considera el padre de la contabilidad?', b: 'Fray Luca Pacioli', m: ['Fray Luis de León', 'Frederick Taylor', 'Adam Smith'] },
        { p: 'Fray Luca Pacioli difundió en 1494 el método de registro conocido como:', b: 'partida doble', m: ['partida simple', 'inventarios perpetuos', 'balanza de comprobación'] }
      ] },
      { s: 'leyes', n: 'Leyes que regulan la contabilidad', v: [
        { rel: 'Relacione cada ley con su concepto.', cols: ['Ley', 'Concepto'],
          pares: [['Código Fiscal de la Federación', 'Establece que las personas físicas y morales deben contribuir a los gastos públicos'],
            ['Ley del Impuesto sobre la Renta', 'Grava los ingresos que perciben las personas y las empresas'],
            ['Código de Comercio', 'Regula los actos de quienes se dedican a actividades mercantiles'],
            ['Ley del Impuesto al Valor Agregado', 'Grava la venta de bienes y la prestación de servicios con una tasa general de 16%']] }
      ] },
      { s: 'objetivo', n: 'Contabilidad financiera', v: [
        { p: '¿Cuál es el principal objetivo de la contabilidad financiera?', b: 'Que las cuentas reflejen la imagen fiel de la situación de la empresa',
          m: ['Calcular el importe de las ventas de un periodo', 'Controlar sólo el dinero de la caja', 'Calcular el sueldo de los empleados'] }
      ] },
      { s: 'tipoEmpresa', n: 'Empresas por origen de capital', v: [
        { rel: 'Relacione el tipo de empresa con el origen de su capital.', cols: ['Tipo de empresa', 'Capital'],
          pares: [['Nacional', 'Los inversionistas son del mismo país donde opera'], ['Extranjera', 'Los inversionistas son de otro país y las utilidades regresan a su país de origen'],
            ['Multinacional', 'El capital pertenece a inversionistas de varios países'], ['Pública', 'El capital es propiedad del gobierno'], ['Privada', 'El capital pertenece a particulares']], n: 4 }
      ] },
      { s: 'empresas', n: 'Importancia de las empresas', v: [
        { p: 'Son fuente de ingresos para trabajadores, proveedores, gobierno y empresarios, promueven el desarrollo económico y fomentan la capacitación y la inversión:', b: 'Las empresas',
          m: ['Las asociaciones civiles', 'La estructura socioeconómica', 'Las inversiones tecnológicas'] }
      ] },
      { s: 'recursos', n: 'Recursos de la empresa', v: [
        { p: 'Son los instrumentos y sistemas que una empresa emplea para mejorar sus procesos de producción:', b: 'Recursos tecnológicos', m: ['Recursos financieros', 'Recursos humanos', 'Recursos materiales'] },
        { p: 'El dinero en efectivo, los créditos y las inversiones de una empresa son sus recursos:', b: 'financieros', m: ['tecnológicos', 'humanos', 'materiales'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-contaRegistro',
    grupo: 'Contabilidad',
    nombre: 'Cuentas y registro',
    descripcion: 'Cuentas, estado de resultados, asientos con IVA, compras netas, clasificacion de cuentas, partida doble, sistemas de inventario, documentos y registros. Reactivos 7 a 21 de la capacitacion.',
    etiquetas: ['cuentas', 'asiento', 'iva', 'compras netas', 'partida doble', 'peps', 'factura'],
    niveles: {
      facil: ['partidaDoble', 'notaCredito', 'factura', 'balanzaConcepto'],
      medio: ['cuentas', 'pasivo', 'nominales', 'analitico', 'valuacion', 'sistema', 'mayor'],
      dificil: ['utilidad', 'asientoVenta', 'comprasNetas', 'asientoIVA']
    },
    items: [
      { s: 'cuentas', n: 'Descripcion de cuentas', v: [
        { rel: 'Relacione las cuentas con su descripción.', cols: ['Cuenta', 'Descripción'],
          pares: [['Deudores diversos', 'Personas que nos deben por un concepto distinto a mercancías'], ['Rentas cobradas por anticipado', 'Cobros que recibimos antes de prestar el uso de un inmueble'],
            ['Clientes', 'Personas que nos deben por una venta a crédito'], ['Rentas pagadas por anticipado', 'Pagos que hacemos antes de usar un inmueble que no es nuestro'],
            ['Proveedores', 'Personas a quienes debemos por compras de mercancía a crédito']], n: 4 }
      ] },
      { s: 'utilidad', n: 'Utilidad del ejercicio', v: [utilidad] },
      { s: 'asientoVenta', n: 'Cuentas de un asiento de venta', v: [
        { p: 'En un asiento, la empresa recibe dinero en bancos, documentos por cobrar y queda a deber el cliente; en el haber se registran tres cuentas. ¿Cuáles son, si es una venta de mercancía más IVA cobrada en parte de contado?',
          b: 'Ventas, IVA trasladado e IVA por trasladar', m: ['Almacén, IVA acreditable e IVA por acreditar', 'Ventas, IVA acreditable e IVA por acreditar', 'Almacén, IVA trasladado e IVA por trasladar'] }
      ] },
      { s: 'comprasNetas', n: 'Compras netas', v: [comprasNetas] },
      { s: 'asientoIVA', n: 'Asiento de compra con IVA', v: [asientoIVA] },
      { s: 'pasivo', n: 'Cuentas de pasivo', v: [
        { p: 'Elija la opción que integra sólo cuentas de pasivo.', b: 'Proveedores, IVA por pagar, acreedores hipotecarios y acreedores diversos',
          m: ['Acreedores diversos, intereses pagados por anticipado y documentos por pagar', 'Proveedores, hipotecas, rentas pagadas por anticipado e IVA trasladado', 'Clientes, documentos por cobrar y bancos'] },
        { p: 'Elija la opción que integra sólo cuentas de activo.', b: 'Caja, bancos, clientes y mobiliario',
          m: ['Caja, proveedores y capital social', 'Clientes, acreedores diversos y bancos', 'Documentos por pagar, almacén y caja'] }
      ] },
      { s: 'nominales', n: 'Cuentas nominales y reales', v: [
        { p: '¿Cómo se llaman las cuentas temporales (ingresos y gastos) que se cierran al terminar el ejercicio contable?', b: 'Cuentas nominales (de resultados)', m: ['Cuentas de orden', 'Cuentas mixtas', 'Cuentas reales'] },
        { p: 'Las cuentas de activo, pasivo y capital, que permanecen de un ejercicio a otro, se llaman:', b: 'cuentas reales', m: ['cuentas nominales', 'cuentas de orden', 'cuentas temporales'] }
      ] },
      { s: 'partidaDoble', n: 'Partida doble', v: [
        { p: 'Es el sistema de registro más utilizado, en el que cada operación se registra dos veces, en el debe y en el haber:', b: 'Teoría de la partida doble', m: ['Balanza de comprobación', 'Balance general', 'Estado de resultados'] },
        { p: 'Según la partida doble, a todo cargo corresponde:', b: 'un abono por la misma cantidad', m: ['otro cargo', 'un saldo deudor', 'una depreciación'] }
      ] },
      { s: 'analitico', n: 'Procedimiento analitico', v: [
        { p: '¿Qué cuentas integran el procedimiento analítico o pormenorizado?', b: 'Inventarios, compras, gastos de compra, ventas y sus devoluciones, rebajas y descuentos',
          m: ['Mercancías, almacén, costo de ventas y ventas', 'Sólo almacén y costo de ventas', 'Caja, bancos y clientes'] }
      ] },
      { s: 'valuacion', n: 'Valuacion de inventarios', v: [
        { p: 'Los siguientes son métodos para valuar inventarios en el sistema de inventarios perpetuos, excepto:', b: 'analítico', m: ['costo promedio', 'PEPS', 'UEPS', 'costo identificado'] },
        { p: 'En el método PEPS, las primeras mercancías que salen son:', b: 'las primeras que entraron', m: ['las últimas que entraron', 'las de mayor precio', 'las de menor precio'] }
      ] },
      { s: 'sistema', n: 'Sistemas de registro de mercancias', v: [
        { p: 'Una empresa vende mercancía por $100,000 más IVA, se la pagan con cheque, y registra al mismo tiempo su costo de venta de $50,000. ¿Qué sistema usa?', b: 'De inventarios perpetuos', m: ['Analítico', 'Global', 'De compras'] }
      ] },
      { s: 'notaCredito', n: 'Documentos de compraventa', v: [
        { p: 'El Sr. González compró quince mesas y devolvió ocho dañadas. ¿Qué documento recibe por la devolución?', b: 'Nota de crédito', m: ['Factura de compra', 'Factura de venta', 'Recibo de caja'] },
        { p: 'Documento que acompaña a la mercancía al entregarla, para comprobar que se recibió:', b: 'Nota de remisión', m: ['Nota de crédito', 'Factura', 'Cheque'] }
      ] },
      { s: 'factura', n: 'Factura', v: [
        { p: 'Documento auténtico, verificable y único (CFDI) que ampara las operaciones de compra y venta:', b: 'Factura', m: ['Cheque', 'Nota de crédito', 'Nota de remisión'] }
      ] },
      { s: 'balanzaConcepto', n: 'Balanza de comprobacion', v: [
        { p: 'Es el instrumento contable que reúne todas las cuentas de una empresa con sus movimientos y saldos:', b: 'Balanza de comprobación', m: ['Estado de resultados', 'Póliza de diario', 'Libro de inventarios'] }
      ] },
      { s: 'mayor', n: 'Fuente de la balanza', v: [
        { p: '¿De dónde se obtiene la información para elaborar la balanza de comprobación?', b: 'De los esquemas de mayor', m: ['De las pólizas', 'Del registro de diario', 'De las tarjetas de almacén'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-contaEstados',
    grupo: 'Contabilidad',
    nombre: 'Balanza, ajustes y estados financieros',
    descripcion: 'Sumas de la balanza, ajustes, ecuacion contable, compras totales y estados financieros. Reactivos 22 a 27 de la capacitacion.',
    etiquetas: ['balanza', 'ajustes', 'activo', 'pasivo', 'capital', 'estado de resultados'],
    niveles: {
      facil: ['ajustes', 'ecuacion'],
      medio: ['ajusteIntereses', 'comprasTotales', 'dinamico'],
      dificil: ['sumasBalanza']
    },
    items: [
      { s: 'sumasBalanza', n: 'Sumas de la balanza', v: [balanza] },
      { s: 'ajusteIntereses', n: 'Asientos de ajuste', v: [
        { p: '¿Cuál es el asiento por los intereses que el banco abonó a nuestra cuenta en el mes?', b: 'Cargo a bancos y abono a productos financieros',
          m: ['Cargo a bancos y abono a gastos financieros', 'Cargo a gastos financieros y abono a bancos', 'Cargo a productos financieros y abono a bancos'] },
        { p: '¿Cuál es el asiento por la comisión que el banco nos cobró (más IVA)?', b: 'Cargo a gastos financieros e IVA acreditable, abono a bancos',
          m: ['Cargo a bancos y abono a productos financieros', 'Cargo a bancos y abono a gastos financieros', 'Cargo a productos financieros y abono a bancos'] }
      ] },
      { s: 'ajustes', n: 'Ajustes', v: [
        { p: 'Son aumentos y disminuciones que se hacen a las cuentas para que muestren saldos reales al cierre:', b: 'Ajustes', m: ['Amortizaciones', 'Depreciaciones', 'Estimaciones'] },
        { p: 'La pérdida de valor de un activo fijo (como el equipo de transporte) por el uso y el tiempo se registra como:', b: 'depreciación', m: ['amortización', 'plusvalía', 'ajuste por inflación'] }
      ] },
      { s: 'ecuacion', n: 'Ecuacion contable', v: [
        { p: '¿Cuál es la fórmula del estado de situación financiera en forma de cuenta?', b: 'Activo = Pasivo + Capital', m: ['Activo = Pasivo − Capital', 'Pasivo = Activo + Capital', 'Capital = Pasivo − Activo'] },
        { p: 'Si una empresa tiene activo por $500,000 y pasivo por $180,000, ¿cuánto es su capital?', b: 320000, m: [680000, 500000, 180000], fmt: p0 }
      ] },
      { s: 'comprasTotales', n: 'Compras totales', v: [
        { p: 'La suma de estos conceptos es lo que se conoce como compras totales:', b: 'Compras y gastos de compra', m: ['Inmuebles y gastos de compra', 'Inventarios y gastos de compra', 'Ventas brutas y gastos de compra'] },
        { p: 'Ventas totales menos devoluciones, rebajas y descuentos sobre ventas es igual a:', b: 'ventas netas', m: ['utilidad bruta', 'costo de ventas', 'compras netas'] }
      ] },
      { s: 'dinamico', n: 'Estados financieros', v: [
        { p: 'Se considera un estado financiero dinámico porque muestra los resultados de un periodo:', b: 'Estado de resultados', m: ['Balanza de comprobación', 'Estado de situación financiera', 'Hoja de ajustes'] },
        { p: 'Se considera un estado financiero estático porque muestra la situación de la empresa a una fecha determinada:', b: 'Estado de situación financiera (balance general)', m: ['Estado de resultados', 'Estado de flujo de efectivo', 'Hoja de ajustes'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-contaBancos',
    grupo: 'Contabilidad',
    nombre: 'Caja y bancos',
    descripcion: 'Fondo fijo de caja, reembolso y conciliacion bancaria. Reactivos 28 a 32 de la capacitacion.',
    etiquetas: ['fondo fijo', 'caja chica', 'conciliacion bancaria'],
    niveles: {
      facil: ['fondoFijo', 'finalidad'],
      medio: ['reembolso'],
      dificil: ['conciliacion', 'noCorrespondido']
    },
    items: [
      { s: 'reembolso', n: 'Reembolso de caja', v: [
        { p: 'Los siguientes documentos integran el reembolso del fondo fijo de caja, excepto:', b: 'la póliza de creación del fondo',
          m: ['la cédula de aplicación de gastos menores', 'la póliza de reembolso', 'los comprobantes de los gastos'] }
      ] },
      { s: 'fondoFijo', n: 'Fondo fijo de caja', v: [
        { p: '¿Cuál es el importe que fija la administración para pagar de inmediato gastos menores?', b: 'Fondo fijo de caja (caja chica)', m: ['Fondo variable', 'Inversión temporal', 'Inversión a plazos'] }
      ] },
      { s: 'conciliacion', n: 'Conciliacion bancaria', v: [
        { p: '¿Cuál es la fórmula de la conciliación bancaria partiendo del estado de cuenta del banco?', b: 'Saldo del banco + abonos no correspondidos − cargos no correspondidos = saldo deudor de nuestros libros',
          m: ['Saldo del banco + cargos no correspondidos − abonos no correspondidos = saldo de nuestros libros', 'Saldo de la empresa + cargos no correspondidos − abonos no correspondidos = saldo acreedor de bancos', 'Saldo del banco − todos los cheques = saldo de la empresa'] }
      ] },
      { s: 'noCorrespondido', n: 'Partidas en conciliacion', v: [
        { p: 'La empresa registró un depósito el último día del mes, pero el banco lo aplicó hasta el mes siguiente. Desde la empresa, este movimiento es un:', b: 'abono no correspondido por el banco', m: ['cargo no correspondido por el banco', 'cargo no correspondido por la empresa', 'error de la empresa'] },
        { p: 'El banco cobró una comisión que la empresa todavía no ha registrado en sus libros. Es un:', b: 'cargo del banco no correspondido por la empresa', m: ['abono del banco no correspondido', 'depósito en tránsito', 'cheque pendiente de cobro'] }
      ] },
      { s: 'finalidad', n: 'Finalidad de la conciliacion', v: [
        { p: '¿Cuál es la finalidad de la conciliación bancaria?', b: 'Comparar los registros de la empresa y del banco para encontrar diferencias, corregir errores y evitar pérdidas',
          m: ['Evitar que los empleados saquen efectivo', 'Resumir los movimientos del mes', 'Que el banco otorgue un préstamo'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-contaImpuestos',
    grupo: 'Contabilidad',
    nombre: 'Impuestos y nomina',
    descripcion: 'IVA trasladado y acreditable, IVA a cargo, ISR de salarios y de personas morales, prima vacacional y salario base de cotizacion. Reactivos 33 a 40 de la capacitacion.',
    etiquetas: ['iva', 'isr', 'nomina', 'prima vacacional'],
    formulario: 'IVA a cargo = IVA trasladado &minus; IVA acreditable &minus; saldo a favor anterior &nbsp;&middot;&nbsp; Tasa general del IVA: 16%<br>ISR = (ingreso &minus; límite inferior) &times; tasa + cuota fija &minus; subsidio &nbsp;&middot;&nbsp; ISR personas morales: 30%',
    niveles: {
      facil: ['ivaTrasladado', 'isrSalarios', 'primaVacacional', 'tipoNomina'],
      medio: ['isrMorales', 'sbc'],
      dificil: ['ivaCargo', 'conceptosISR']
    },
    items: [
      { s: 'ivaTrasladado', n: 'Tipos de IVA', v: [
        { p: 'Término con el que se registra el IVA que se cobra al vender mercancía de contado:', b: 'IVA trasladado', m: ['IVA acreditable', 'IVA por acreditar', 'IVA por trasladar'] },
        { p: 'Término con el que se registra el IVA que se paga al comprar mercancía de contado:', b: 'IVA acreditable', m: ['IVA trasladado', 'IVA por acreditar', 'IVA por trasladar'] },
        { p: 'Término con el que se registra el IVA de una venta a crédito que todavía no se cobra:', b: 'IVA por trasladar', m: ['IVA trasladado', 'IVA acreditable', 'IVA por acreditar'] }
      ] },
      { s: 'ivaCargo', n: 'IVA a cargo', v: [ivaCargo] },
      { s: 'isrSalarios', n: 'Impuesto de los salarios', v: [
        { p: '¿Qué impuesto debe pagar un trabajador por sus ingresos por sueldos y salarios?', b: 'Impuesto sobre la Renta', m: ['Impuesto al Valor Agregado', 'Impuesto Especial sobre Producción y Servicios', 'Impuesto predial'] }
      ] },
      { s: 'conceptosISR', n: 'Calculo del ISR', v: [
        { p: 'En el cálculo del ISR de un salario (artículo 96): a la base gravable se le resta el (1), el excedente se multiplica por la (2), se suma la (3) y al impuesto se le resta el (4). ¿Qué conceptos faltan?',
          b: '1. Límite inferior, 2. Tasa sobre el excedente, 3. Cuota fija, 4. Subsidio', m: ['1. Ingreso gravado, 2. Sueldo mensual, 3. Impuesto marginal, 4. Subsidio', '1. Límite inferior, 2. Límite superior, 3. Ingreso exento, 4. Cuota fija', '1. Salario, 2. Aguinaldo, 3. Horas extra, 4. Prima vacacional'] }
      ] },
      { s: 'isrMorales', n: 'ISR de personas morales', v: [
        { p: '¿Qué tasa se aplica al resultado fiscal de las personas morales, según el artículo 9 de la Ley del ISR?', b: '30%', m: ['10%', '16%', '25%'] },
        { p: '¿Cuál es la tasa general del IVA en México (fuera de la región fronteriza)?', b: '16%', m: ['8%', '10%', '30%'] }
      ] },
      { s: 'primaVacacional', n: 'Prima vacacional', v: [
        { p: 'María Fernanda cumplió cuatro años en su empresa. ¿Qué porcentaje mínimo de su salario de vacaciones debe pagarle su patrón como prima vacacional?', b: '25%', m: ['10%', '20%', '35%'] }
      ] },
      { s: 'tipoNomina', n: 'Tipos de nomina', v: [
        { p: 'Un recibo de pago indica un periodo del 1 al 15 del mes, con 15 días pagados. ¿Qué tipo de nómina es?', b: 'Quincenal', m: ['Extraordinaria', 'Mensual', 'Semanal'] },
        { p: 'Un recibo de pago indica un periodo del lunes 3 al domingo 9, con 7 días pagados. ¿Qué tipo de nómina es?', b: 'Semanal', m: ['Quincenal', 'Mensual', 'Extraordinaria'] }
      ] },
      { s: 'sbc', n: 'Salario base de cotizacion', v: [
        { p: 'Es el salario que se registra ante el IMSS y con el que se calculan las aportaciones de seguridad social, vivienda y AFORE:', b: 'Salario base de cotización', m: ['Salario diario', 'Salario nominal', 'Salario mínimo'] }
      ] }
    ]
  });
})();
