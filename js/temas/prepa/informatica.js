/* Modo prepa - Informatica (capacitacion, 40 reactivos): algoritmos y
   estructuras de control, PHP, bases de datos y SQL, Java y Android */
(function () {
  'use strict';
  var P = EJ.prepa, F = EJ.fmt;

  /* bloque de codigo con numeros de linea */
  function cod(lineas) {
    return '<pre class="codigo">' + lineas.map(function (l, i) {
      return '<span class="ln">' + (i + 1) + '</span> ' + F.escapaHtml(l);
    }).join('\n') + '</pre>';
  }

  P.temaBanco({
    id: 'prepa-algoritmos',
    grupo: 'Informatica',
    nombre: 'Algoritmos y programacion',
    descripcion: 'Constantes y variables, operadores, algoritmos, paradigmas, diagramas de flujo, pseudocodigo, estructuras de control, datos estructurados e IDE. Reactivos 1 a 12 de la capacitacion.',
    etiquetas: ['algoritmo', 'pseudocodigo', 'diagrama de flujo', 'estructura de control', 'variable'],
    niveles: {
      facil: ['constante', 'diagrama', 'pseudocodigo', 'secuencial', 'selectiva'],
      medio: ['operadores', 'decision', 'iterativa', 'estructurados'],
      dificil: ['algoritmo', 'paradigmas', 'ide']
    },
    items: [
      { s: 'constante', n: 'Constantes y variables', v: [
        { p: '¿Cómo se llama el dato que permanece sin cambios durante la ejecución de un programa?', b: 'Constante', m: ['Expresión', 'Relación', 'Variable'] },
        { p: '¿Cómo se llama el espacio de memoria cuyo valor puede cambiar durante la ejecución de un programa?', b: 'Variable', m: ['Constante', 'Comentario', 'Función'] }
      ] },
      { s: 'operadores', n: 'Operadores en PHP', v: [
        { p: 'En el siguiente código PHP, ¿en qué línea se usa un operador lógico?' + cod(['$x = 5;', '$y = 10;', '$r = ($y - $x == 5);', '$r = ($y > $x);', '$r = !($x == $y);']), b: '5', m: ['2', '3', '4'],
          ex: 'El signo ! (negación, NOT) es un operador lógico; == y > son relacionales.' },
        { p: 'En el siguiente código PHP, ¿en qué línea se usa un operador lógico?' + cod(['$a = 7;', '$b = 3;', '$c = $a * $b;', '$d = ($a > 2 && $b < 5);', '$e = $a % $b;']), b: '4', m: ['1', '3', '5'],
          ex: '&& (AND) es un operador lógico.' }
      ] },
      { s: 'algoritmo', n: 'Algoritmos', v: [
        { p: 'Un cliente llama porque le cortaron el internet. Si ya pagó, se restablece el servicio; si no, se rechaza su petición. ¿Qué algoritmo resuelve la situación?',
          b: 'Inicio; leer pedido; revisar estado de cuenta; si el pago está hecho, restablecer servicio; si no, rechazar; Fin',
          m: ['Inicio; leer pedido; si el pago está hecho, restablecer servicio; revisar estado de cuenta; si no, rechazar; Fin', 'Leer pedido; revisar estado de cuenta; si el pago está hecho, restablecer servicio; Fin', 'Inicio; restablecer servicio; revisar estado de cuenta; Fin'] },
        { p: 'Las características de un buen algoritmo son:', b: 'preciso, definido y finito', m: ['largo, complejo e infinito', 'rápido, gráfico y abierto', 'ambiguo, flexible y repetitivo'] }
      ] },
      { s: 'paradigmas', n: 'Paradigmas de programacion', v: [
        { p: 'Tipo de programación que concibe la computación como evaluación de funciones matemáticas y evita datos que cambian de valor (Erlang, Haskell):', b: 'Funcional', m: ['Lógica', 'Orientada a eventos', 'Orientada a objetos'] },
        { p: 'Paradigma que organiza el programa en clases y objetos con atributos y métodos (Java, C#):', b: 'Orientada a objetos', m: ['Funcional', 'Lógica', 'Estructurada'] }
      ] },
      { s: 'diagrama', n: 'Diagramas de flujo', v: [
        { p: 'En un diagrama de flujo, ¿qué símbolo representa una decisión (pregunta con respuesta sí/no)?', b: 'Rombo', m: ['Óvalo', 'Rectángulo', 'Paralelogramo'] },
        { p: 'En un diagrama de flujo, ¿qué símbolo representa el inicio o el fin?', b: 'Óvalo (terminal)', m: ['Rombo', 'Rectángulo', 'Paralelogramo'] },
        { p: 'En un diagrama de flujo, ¿qué símbolo representa la entrada o salida de datos?', b: 'Paralelogramo', m: ['Óvalo', 'Rombo', 'Rectángulo'] }
      ] },
      { s: 'decision', n: 'Condiciones', v: [
        { p: 'Un call center sólo debe llamar a clientes con adeudo mayor a $2,000. ¿Qué condición debe ir en el rombo de decisión?', b: 'adeudo > 2000', m: ['adeudo < 2000', 'adeudo = 2000', 'adeudo >= 0'] },
        { p: 'Un programa debe aprobar a los alumnos con calificación de 6 o más. ¿Qué condición debe usar?', b: 'calificacion >= 6', m: ['calificacion > 6', 'calificacion <= 6', 'calificacion = 6'] }
      ] },
      { s: 'pseudocodigo', n: 'Pseudocodigo', v: [
        { orden: 'Ordene los pasos del pseudocódigo para lavarse las manos.', pasos: ['Abrir el grifo', 'Mojar las manos', 'Colocar jabón', 'Frotar las manos', 'Enjuagar y cerrar el grifo'] },
        { orden: 'Ordene los pasos del algoritmo para calcular el promedio de tres calificaciones.', pasos: ['Inicio', 'Leer las tres calificaciones', 'Sumar las calificaciones', 'Dividir la suma entre 3', 'Mostrar el promedio'] }
      ] },
      { s: 'secuencial', n: 'Estructura secuencial', v: [
        { p: 'Un diagrama de flujo sólo tiene instrucciones una tras otra (leer dos números, sumarlos, mostrar el resultado), sin decisiones ni repeticiones. ¿Qué estructura de control usa?', b: 'Secuencial', m: ['Iterativa', 'Lógica', 'Selectiva'] }
      ] },
      { s: 'selectiva', n: 'Estructura selectiva', v: [
        { p: 'Un diagrama tiene un rombo con la pregunta "¿edad >= 18?": si es verdadero muestra "Mayor de edad" y si es falso "Menor de edad". ¿Qué estructura de control es?', b: 'Selectiva (condicional)', m: ['Iterativa', 'Múltiple', 'Secuencial'] }
      ] },
      { s: 'iterativa', n: 'Estructura iterativa', v: [
        { p: '¿Qué tipo de estructura de control se usa en esta sintaxis?' + cod(['Mientras <condición> hacer', '   <instrucción 1>', '   <instrucción 2>', 'Fin mientras']), b: 'Iterativa', m: ['Funcional', 'Lineal', 'Selectiva'] },
        { p: '¿Qué tipo de estructura de control se usa en esta sintaxis?' + cod(['Para i desde 1 hasta 10 hacer', '   Escribir i', 'Fin para']), b: 'Iterativa', m: ['Selectiva', 'Secuencial', 'Múltiple'] }
      ] },
      { s: 'estructurados', n: 'Datos estructurados', v: [
        { p: 'Conjunto de datos agrupados bajo un mismo nombre y relacionados de manera lógica (como un arreglo o un registro):', b: 'Datos estructurados', m: ['Datos lógicos', 'Datos reales', 'Datos simples'] }
      ] },
      { s: 'ide', n: 'Entorno de desarrollo', v: [
        { p: 'Las siguientes son ventajas de usar un IDE (entorno de desarrollo integrado), excepto:', b: 'Evita la sincronización del proyecto en la nube',
          m: ['Ayuda en la carga de librerías', 'Autocompleta y genera código', 'Compila o ejecuta el código desde la misma aplicación'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-php',
    grupo: 'Informatica',
    nombre: 'PHP y ciclo de vida del software',
    descripcion: 'Lectura de codigo PHP, asignacion de variables y etapas del ciclo de vida. Reactivos 13 a 15 de la capacitacion.',
    etiquetas: ['php', 'if', 'variables', 'ciclo de vida'],
    niveles: {
      facil: ['asignar'],
      medio: ['cicloVida'],
      dificil: ['salidaPHP']
    },
    items: [
      { s: 'salidaPHP', n: 'Salida de un programa', v: [
        { p: '¿Cuál es la salida del siguiente código?' + cod(['<?php', "if ($sexo == 'M') {", '    $saludo = "Bienvenida, ";', '} else {', '    $saludo = "Bienvenido, ";', '}', '$saludo = $saludo . $nombre;', 'print($saludo);', '?>']),
          b: 'Si $sexo es \'M\', imprime "Bienvenida, " y el nombre; si no, "Bienvenido, " y el nombre', m: ['Siempre "Bienvenida, nombre"', 'Siempre "Bienvenido, nombre"', 'Si $sexo es \'M\', imprime "Bienvenido"; si no, "Bienvenida"'] },
        { p: '¿Qué imprime el siguiente código?' + cod(['<?php', '$a = 4;', '$b = 3;', 'echo $a * $b + 2;', '?>']), b: '14', m: ['20', '9', '12'] }
      ] },
      { s: 'asignar', n: 'Asignacion de variables', v: [
        { p: 'Identifique la finalidad del código PHP:' + cod(['<?php', '$nombre = "Vianey";', '$edad = 16;', '$ciudad = "Colima";', '?>']), b: 'Asignar valores a variables', m: ['Declarar constantes', 'Definir funciones', 'Imprimir datos'] },
        { p: 'En PHP, ¿con qué símbolo empiezan los nombres de las variables?', b: '$', m: ['#', '@', '&'] }
      ] },
      { s: 'cicloVida', n: 'Ciclo de vida del software', v: [
        { p: '¿A qué etapa del ciclo de vida se refiere el texto?<br><i>Se pone en marcha el sistema y antes de entregarlo al cliente se hacen pruebas de componentes, de integración y de aceptación.</i>', b: 'Implementación', m: ['Diseño', 'Mantenimiento', 'Planificación'] },
        { p: '¿A qué etapa del ciclo de vida se refiere el texto?<br><i>Ya en uso, se corrigen errores que reportan los usuarios y se agregan pequeñas mejoras al sistema.</i>', b: 'Mantenimiento', m: ['Diseño', 'Implementación', 'Análisis'] },
        { p: '¿A qué etapa del ciclo de vida se refiere el texto?<br><i>Se entrevista al cliente para conocer qué necesita y se documentan los requerimientos del sistema.</i>', b: 'Análisis', m: ['Diseño', 'Implementación', 'Mantenimiento'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-bd',
    grupo: 'Informatica',
    nombre: 'Bases de datos y SQL',
    descripcion: 'Ciclo de vida de los datos, modelo entidad-relacion, normalizacion, diseño fisico, SGBD, SQL, operadores, diccionario de datos y consultas. Reactivos 16 a 29 de la capacitacion.',
    etiquetas: ['base de datos', 'sql', 'select', 'where', 'alter table', 'normalizacion'],
    niveles: {
      facil: ['sql', 'and', 'diccionario', 'update'],
      medio: ['entidadRelacion', 'fases', 'sgbd', 'orderBy', 'where', 'alterAdd'],
      dificil: ['cicloDatos', 'normalizacion', 'errorSintaxis', 'alterDrop']
    },
    items: [
      { s: 'cicloDatos', n: 'Ciclo de vida de los datos', v: [
        { p: 'Las siguientes son etapas del ciclo de vida de los datos, excepto:', b: 'registro de buenas prácticas', m: ['intercambio y uso de datos', 'publicación de datos', 'almacenamiento de datos'] }
      ] },
      { s: 'entidadRelacion', n: 'Modelo entidad-relacion', v: [
        { rel: 'Relacione cada término con su definición.', cols: ['Término', 'Definición'],
          pares: [['Relación', 'Asociación o vínculo entre entidades'], ['Entidad', 'Objeto, real o abstracto, del que se quiere guardar información'],
            ['Atributo', 'Característica o propiedad de una entidad que puede tomar distintos valores'], ['Llave primaria', 'Atributo que identifica de forma única cada registro']], n: 3 }
      ] },
      { s: 'normalizacion', n: 'Normalizacion', v: [
        { lista: 'Identifique los problemas de diseño de una base de datos que hacen necesario normalizarla.', k: 2,
          si: ['Redundancia', 'Inconsistencia de datos'], no: ['Complejidad visual', 'Heterogeneidad', 'Velocidad del procesador'] }
      ] },
      { s: 'fases', n: 'Fases del diseño', v: [
        { p: '¿En qué fase del diseño de una base de datos se determinan los índices y las vistas de una tabla?', b: 'Física', m: ['Conceptual', 'Lógica', 'Relacional'] },
        { p: '¿En qué fase del diseño se elabora el diagrama entidad-relación, sin pensar todavía en un gestor específico?', b: 'Conceptual', m: ['Física', 'Lógica', 'De implementación'] }
      ] },
      { s: 'sgbd', n: 'Sistema gestor de bases de datos', v: [
        { lista: 'Identifique las ventajas de usar un Sistema Gestor de Bases de Datos.', k: 2,
          si: ['Permite manejar grandes volúmenes de datos', 'Evita redundancias e inconsistencias'], no: ['Lo administra sólo personal externo', 'Elimina la necesidad de respaldos', 'Funciona sin computadora'] }
      ] },
      { s: 'sql', n: 'Lenguaje SQL', v: [
        { p: 'Lenguaje de consulta que se usa para manipular datos y para crear y modificar tablas de una base de datos:', b: 'SQL', m: ['FORTRAN', 'Java', 'PHP'] }
      ] },
      { s: 'and', n: 'Operadores logicos en consultas', v: [
        { p: 'Un empleado quiere consultar sólo los productos que son del área de lácteos Y que ya están caducados. ¿Qué operador debe usar?', b: 'AND', m: ['>=', '<>', 'OR'] },
        { p: 'Se quieren consultar los alumnos que sean de primero O de segundo semestre. ¿Qué operador se usa?', b: 'OR', m: ['AND', 'NOT', '<>'] }
      ] },
      { s: 'diccionario', n: 'Diccionario de datos', v: [
        { p: 'Documento que enlista los nombres, definiciones y características de cada campo de una base de datos:', b: 'Diccionario de datos', m: ['Cadena', 'Tabla', 'Tupla'] }
      ] },
      { s: 'update', n: 'Comandos SQL', v: [
        { p: '¿Qué comando SQL modifica los datos que ya existen en una tabla?', b: 'UPDATE', m: ['DELETE', 'INSERT', 'SELECT'] },
        { p: '¿Qué comando SQL agrega un registro nuevo a una tabla?', b: 'INSERT', m: ['UPDATE', 'DELETE', 'SELECT'] },
        { p: '¿Qué comando SQL borra registros de una tabla?', b: 'DELETE', m: ['UPDATE', 'INSERT', 'SELECT'] }
      ] },
      { s: 'orderBy', n: 'Lectura de consultas', v: [
        { p: '¿Cuál es la salida de la consulta?' + cod(['SELECT * FROM CIUDAD', 'ORDER BY Delegacion ASC, numhabitantes DESC;']),
          b: 'Todos los campos de CIUDAD, ordenados por Delegacion ascendente y luego por numhabitantes descendente',
          m: ['Sólo el campo Nombre, ordenado por Delegacion ascendente', 'Todos los campos, ordenados por numhabitantes ascendente', 'Sólo los campos Delegacion y numhabitantes, sin orden'] }
      ] },
      { s: 'where', n: 'Clausula WHERE', v: [
        { p: 'Complete la consulta que filtra los productos con precio mayor a 8500 y con existencias:' + cod(['SELECT * FROM Productos', '______ Precio > 8500 AND Stock > 0;']), b: 'WHERE', m: ['SET', 'ORDER BY', 'UPDATE'] }
      ] },
      { s: 'alterAdd', n: 'Agregar columnas', v: [
        { p: 'Un empleado quiere agregar la columna de fecha de caducidad a la tabla Productos. ¿Qué comando usa?', b: 'ALTER TABLE Productos ADD COLUMN', m: ['ALTER TABLE Productos DROP COLUMN', 'ERASE COLUMN ALTER TABLE Productos', 'DELETE COLUMN ALTER TABLE'] }
      ] },
      { s: 'errorSintaxis', n: 'Errores de sintaxis', v: [
        { p: 'La consulta busca a los alumnos de tercer semestre con nota menor a 6. ¿En qué línea hay un error de sintaxis?' + cod(['SELECT Nombre, Nota', 'FROM Estudiantes', "WHERE Semestre = 'Tercero', Nota < 6", 'ORDER BY Nota DESC;']),
          b: '3', m: ['1', '2', '4'], ex: 'Las condiciones se unen con AND, no con coma.' }
      ] },
      { s: 'alterDrop', n: 'Eliminar columnas', v: [
        { p: '¿Qué código elimina las columnas edad y direccion de la tabla empleados?', b: 'ALTER TABLE empleados DROP COLUMN edad, DROP COLUMN direccion;',
          m: ['DELETE TABLE empleados COLUMN edad, COLUMN direccion;', 'ALTER TABLE empleados DELETE COLUMN edad, DELETE COLUMN direccion;', 'ADD TABLE empleados DROP COLUMN edad, DROP COLUMN direccion;'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-java',
    grupo: 'Informatica',
    nombre: 'Java y Android',
    descripcion: 'Sintaxis de Java, programacion orientada a objetos, tipos de dato, operadores, estructuras de control, ciclos y componentes de Android. Reactivos 30 a 40 de la capacitacion.',
    etiquetas: ['java', 'poo', 'herencia', 'switch', 'do while', 'android'],
    niveles: {
      facil: ['llaves', 'tiposDato', 'aritmeticos', 'ifElse'],
      medio: ['poo', 'asignacion', 'switch', 'switchAndroid'],
      dificil: ['variable', 'doWhile', 'android']
    },
    items: [
      { s: 'llaves', n: 'Sintaxis de Java', v: [
        { p: '¿Qué símbolo se usa en Java para marcar el inicio y el fin de clases, métodos y bloques de sentencias?', b: '{ }', m: ['*', '||', '< >'] },
        { p: 'En Java, ¿con qué símbolo termina cada instrucción?', b: ';', m: [':', '.', ','] }
      ] },
      { s: 'poo', n: 'Programacion orientada a objetos', v: [
        { rel: 'Relacione el concepto de la programación orientada a objetos con su definición.', cols: ['Concepto', 'Definición'],
          pares: [['Encapsulamiento', 'Ocultar los datos de un objeto y permitir su acceso sólo mediante sus métodos'], ['Herencia', 'Definir una clase a partir de otra ya existente'],
            ['Polimorfismo', 'Un mismo método puede comportarse de forma distinta según el objeto'], ['Abstracción', 'Tomar sólo las características esenciales de un objeto']], n: 3 }
      ] },
      { s: 'tiposDato', n: 'Tipos de dato', v: [
        { rel: 'En un programa en Java que controla a los asistentes de un partido, relacione cada variable con su tipo de dato.', cols: ['Variable', 'Tipo de dato'],
          pares: [['Nombre', 'String'], ['Edad', 'int'], ['Costo del boleto', 'float'], ['¿Tiene boleto VIP?', 'boolean']], n: 3 }
      ] },
      { s: 'variable', n: 'Definicion de variables', v: [
        { p: 'En el siguiente código, ¿en qué línea se define una variable (atributo) que no es constante?' + cod(['public class Circulo {', '    private final double PI = 3.1415;', '    private double radio;', '    public double perimetro() {', '        return 2 * PI * radio;', '    }', '}']),
          b: '3', m: ['2', '5', '1'], ex: 'En la línea 2, final hace de PI una constante; la línea 3 define la variable radio.' }
      ] },
      { s: 'aritmeticos', n: 'Operadores aritmeticos', v: [
        { p: '¿Qué tipo de operadores se usan en el código?' + cod(['int i = 10;', 'int j = 3;', 'System.out.println(i + j);', 'System.out.println(i - j);', 'System.out.println(i * j);', 'System.out.println(i % j);']), b: 'Aritméticos', m: ['De asignación', 'Lógicos', 'Relacionales'] }
      ] },
      { s: 'ifElse', n: 'Estructura de seleccion', v: [
        { p: '¿Qué estructura de control se presenta?' + cod(['if (condicion1) {', '    bloque1', '} else if (condicion2) {', '    bloque2', '} else {', '    bloque3', '}']), b: 'Selección', m: ['Iterativa', 'Lógica', 'Secuencial'] }
      ] },
      { s: 'asignacion', n: 'Operadores de asignacion', v: [
        { p: '¿Qué tipo de operadores se usan en las líneas 3 y 5?' + cod(['int a = 5;', 'int b = 10;', 'a += b;', 'System.out.println(a);', 'a -= b;']), b: 'De asignación', m: ['Condicionales', 'Lógicos', 'Relacionales'] }
      ] },
      { s: 'switch', n: 'Estructura multiple', v: [
        { p: '¿Qué estructura de control usa el código?' + cod(['switch (opcion) {', '    case 1: System.out.println("Ver calificación"); break;', '    case 2: System.out.println("Registrar asistencia"); break;', '    default: System.out.println("Opción no válida");', '}']),
          b: 'Múltiple (switch)', m: ['For', 'Simple', 'While'] }
      ] },
      { s: 'doWhile', n: 'Ciclos', v: [
        { p: '¿Cuál es el resultado del código?' + cod(['int contador = 0;', 'do {', '    System.out.println("Contador: " + contador);', '    contador++;', '} while (contador < 5);']),
          b: 'Imprime los números del 0 al 4', m: ['Imprime los números del 0 al 5', 'Se ejecuta indefinidamente', 'No imprime nada'] },
        { p: '¿Cuántas veces se imprime "Hola"?' + cod(['for (int i = 1; i <= 3; i++) {', '    System.out.println("Hola");', '}']), b: '3', m: ['2', '4', '1'] }
      ] },
      { s: 'android', n: 'Componentes de Android', v: [
        { p: 'Una pantalla de Android muestra una lista desplazable de contactos dentro de un contenedor y, abajo, opciones circulares de las que sólo se puede elegir una. ¿Qué componentes son?', b: 'ListView, Layout y RadioButtons',
          m: ['ImageView, Button y TextView', 'CheckBox, ListView y RadioButtons', 'Layout, Button y TextView'] }
      ] },
      { s: 'switchAndroid', n: 'Controles de seleccion', v: [
        { p: 'Elemento de Android que permite activar o desactivar una configuración de forma independiente, deslizando un interruptor:', b: 'Switch', m: ['Checkbox', 'Etiqueta', 'RadioButton'] },
        { p: 'Elemento de Android para elegir UNA sola opción de un grupo (por ejemplo, el sexo en un formulario):', b: 'RadioButton', m: ['Checkbox', 'Switch', 'TextView'] }
      ] }
    ]
  });
})();
