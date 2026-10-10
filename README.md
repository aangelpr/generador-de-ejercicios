# Generador de ejercicios

Generador de ejercicios de práctica con dificultad seleccionable, pistas progresivas y
solución paso a paso después de varios intentos fallidos.

Ahora mismo trae **31 temas de matemáticas con 351 subtemas**, pero está armado para
crecer a cualquier materia (ciencias, historia, nomenclatura química, etc.) sin tocar
el motor.

**En línea:** <https://aangelpr.github.io/generador-de-ejercicios/>

## Cómo abrirlo

Haz doble clic en `index.html`. No necesita internet, ni instalación, ni compilar nada.

Si tu navegador bloquea algo (pasa en algunas configuraciones al abrir archivos locales),
levanta un servidor pequeño desde esta carpeta y entra a <http://localhost:8777>:

```bash
python -m http.server 8777
```

## Ponerlo en línea y usarlo en el celular

La app es 100% estática (puros archivos, sin servidor ni base de datos), así que se
puede publicar gratis en cualquier lado. Sube **el contenido** de esta carpeta (no la
carpeta), de modo que `index.html` quede en la raíz del sitio.

### Ya está publicada en GitHub Pages

- **Página:** <https://aangelpr.github.io/generador-de-ejercicios/>
- **Repositorio:** <https://github.com/aangelpr/generador-de-ejercicios>

Para subir cambios después de editar algo:

```bash
git add -A
git commit -m "lo que cambiaste"
git push
```

En un minuto la página se actualiza sola. **Importante:** si cambiaste archivos de la
app (no solo el README), súbele el número de versión a la primera línea de `sw.js`
(`generador-ejercicios-v2` → `v3`) antes del commit; si no, los celulares que ya la
tienen instalada seguirán usando la copia guardada.

### Otra opción — Netlify Drop

1. Entra a <https://app.netlify.com/drop>.
2. Arrastra la carpeta completa a la página.
3. Te da la dirección al instante. Crea la cuenta gratuita cuando te lo pida para que
   el sitio no se borre, y desde ahí puedes arrastrar la carpeta otra vez para
   actualizarlo.

### Instalarlo como app en el celular

Abre la página en el celular y:

- **Android / Chrome:** menú ⋮ → *Instalar aplicación* (o *Agregar a pantalla principal*).
- **iPhone / Safari:** botón compartir → *Agregar a inicio*.

Queda con su icono en la pantalla de inicio, abre en pantalla completa sin la barra del
navegador y **funciona sin internet**: la primera vez que entras se guarda todo en el
celular, y después puedes practicar en el camión, en la escuela o donde sea.

El progreso (aciertos, rachas) se guarda en cada dispositivo por separado: lo que hagas
en el celular no se mezcla con lo de la computadora.

## Cómo se usa

1. Elige un tema en la lista de la izquierda (o usa el buscador).
2. Elige la dificultad: **Fácil**, **Medio** o **Difícil**.
3. Elige el **subtema** si quieres practicar algo específico (por ejemplo, solo
   "Factor común" dentro de Polinomios), o déjalo en **Mezcla** para que salgan
   revueltos. Cada ejercicio trae una etiqueta arriba diciendo de qué subtema es.
4. Si no sabes por dónde empezar, abre **Cómo se resuelve**: te muestra la regla que
   aplica, un **ejemplo resuelto paso a paso** de ese mismo subtema (con otros números,
   nunca el ejercicio que tienes enfrente) y las fórmulas del tema. No gasta intentos.
   Con *Otro ejemplo* te genera otro cuantas veces quieras.
   Debajo de la pregunta está el recuadro **Procedimiento**, una hoja de borrador para
   hacer tus cuentas: en *Escribir* tecleas, y en *Dibujar* escribes con el dedo sobre
   una cuadrícula (con *Deshacer* y *Borrar todo*). No se califica. En los exámenes y
   simulacros cada pregunta tiene su propia hoja: lo escrito se guarda con el examen, y
   lo dibujado se conserva mientras la app siga abierta.
5. Escribe tu respuesta y presiona **Comprobar** (o Enter). Debajo de la casilla verás
   en vivo cómo se interpreta lo que escribiste: si tecleas `x^2` te lo muestra como x²,
   así confirmas que el `^` quedó donde querías.
6. Cada vez que fallas aparece una pista nueva. Al agotar los intentos (3 por defecto)
   se muestra la respuesta con el procedimiento completo.
7. Si un ejercicio se te complica y prefieres otro, usa **Saltar / otro ejercicio**:
   no cuenta como error ni afecta tu racha. **Ctrl + Enter** hace lo mismo.

### Entrenamiento paso a paso

En los temas marcados con **paso a paso** en la lista aparece el botón
**Enséñame paso a paso**. Ahí no se pide el resultado final: el programa te va
preguntando *una operación a la vez* ("multiplica este por este, ¿cuánto da?"),
te dice si está bien, y va llenando el tablero delante de ti. Al terminar te
resume *la receta* que acabas de aprender.

Si te atoras en un paso hay **Dame una pista** y **No sé, enséñame este paso**
(te lo resuelve y sigues con el siguiente). Sirve con cualquier dificultad: si
la que tienes puesta no lo tiene, el botón te lleva a la que sí.

El paso a paso son **guiones escritos a mano**: cada pregunta explica el porqué,
la pista avisa del error típico y al acertar te dice qué acaba de pasar. Al
final te resume la receta del método.

Se probó generarlos automáticamente a partir de la solución de cada ejercicio,
pero esa solución está escrita como recordatorio para quien ya intentó, no como
clase desde cero, y se entendía mal. El código quedó ahí por si acaso
(`EJ.guia.usarAutomaticas = true`), pero está apagado a propósito.

Cada micro-paso puede llevar, todos opcionales:

- `seccion` — el paso grande al que pertenece (`Paso 3: dividir cada término`).
  Se pinta como encabezado sobre la pregunta y agrupa el desarrollo.
- `rotulo` — etiqueta corta del paso.
- `queHacemos` y `paraQue` — los dos desplegables que se abren con un botón.
  Van cerrados por defecto para no tapar la pregunta, pero si los abres se
  quedan abiertos en los pasos siguientes (y entre sesiones).
- `queda` — **el resultado parcial después de ese paso**. Se pinta grande en
  una caja "Llevamos", y es lo que hace que el ejercicio se sienta como que
  avanza: ves la respuesta armándose (`6` → `6x²` → `6x²(2x²)` →
  `6x²(2x² + 3x)` → `6x²(2x² + 3x − 4)`).

**Dos reglas al escribir un guion:**

1. **Cada resultado lo saca quien estudia, no se enseña.** Si hace falta
   dividir `12x⁴ ÷ 6x²`, eso es una pregunta.
2. **Pero la pregunta es la operación completa**, no sus pedacitos. Se
   pregunta `12x⁴ ÷ 6x² = ?` (respuesta `2x²`), no `12 ÷ 6` y luego
   `x⁴ ÷ x²` por separado. Eso último aburre sin enseñar nada; los pedacitos
   van en la pista, por si se atora.

`rotulo` corto. La bitácora de lo ya resuelto
antepone ese rótulo en negrita, para que al mirar hacia arriba se lea como una
solución escrita a mano (`Doble producto: -12x`) y no como una lista de números
sueltos. Es opcional: los pasos sin `rotulo` se ven como siempre.

**Temas ya completos** (todos sus subtemas): todo el bloque de aritmética y
álgebra (signos, exponentes, fracciones, proporciones, sucesiones, progresiones,
monomios, binomios, trinomios y polinomios), toda la geometría y trigonometría
(polígonos, Tales, Pitágoras, ley de senos y ley de cosenos) y toda la geometría
analítica (coordenadas, cónicas y excentricidad) y todas las funciones
(elementos de función, paridad, tipos de función y logaritmos), más límites y
reglas de derivación y puntos críticos: 259 de 317 subtemas. En los demás temas el paso a paso
está en un subtema representativo; el resto sigue con **Cómo se resuelve** (la
regla y un ejemplo resuelto) mientras se les escribe el guion.

### Modo prepa

En el selector de materia de arriba está **Modo prepa**: las **10 áreas** de la
*versión de práctica* (`Version_práctica.pdf`), con su mismo formato y datos o
variantes nuevas cada vez.

| Área | Reactivos | Tiempo |
|---|---|---|
| Matemáticas | 40 | 60 min |
| Humanidades | 40 | 40 min |
| Ciencias experimentales (biología, geografía, química y física) | 60 | 60 min |
| Comunicación (incluye inglés) | 32 | 40 min |
| Ciencias sociales | 40 | 40 min |
| Introducción al trabajo | 20 | 20 min |
| Recursos humanos | 40 | 40 min |
| Contabilidad | 40 | 40 min |
| Informática | 40 | 40 min |
| Turismo | 40 | 40 min |

- Cada reactivo de la guía es un **subtema**, y los temas de cada área siguen el
  orden del cuadernillo.
- **Por dificultad:** cada subtema está clasificado como **Fácil** (recordar un dato
  o reconocer un concepto, cuentas de un paso), **Medio** (relacionar datos o aplicar
  una fórmula) o **Difícil** (varios pasos, análisis o incisos muy parecidos). Al
  practicar un tema eliges el nivel y salen sólo sus subtemas; en total son 134
  fáciles, 160 medios y 98 difíciles.
- Cuatro incisos A), B), C) y D). Los números (y las fracciones) van de menor a
  mayor, como en el cuadernillo: antes de ordenar se sortea en qué letra queda la
  respuesta y se escogen los distractores para que caiga ahí (antes, por ejemplo, la
  respuesta de progresión aritmética siempre era la más grande). El texto va
  revuelto: el cuadernillo no siempre lo ordena (casi la mitad de sus preguntas de
  texto no van en orden alfabético) y, en orden alfabético, la misma pregunta dejaba
  la respuesta siempre en la misma letra. Así la letra correcta no se puede adivinar.
- Los mismos tipos de pregunta: directa, **"Complete correctamente el siguiente
  texto"**, **"Relacione..."** (con respuestas tipo `1c, 2a, 3b` o `1ac, 2bd`),
  **"Del siguiente listado, identifique..."** (`1, 3, 5`), **"Ordene..."**, la línea
  **"Considere..."** con la fórmula, código con números de línea y
  **multirreactivos** (un texto que sirve para varias preguntas seguidas).
- **Las fórmulas y los datos que da la versión de práctica.** En los temas donde el
  cuadernillo pone una línea "Considere..." (progresiones, π = 3.14, valores de seno
  y coseno, coordenadas polares, logaritmos, desviación estándar, probabilidad de
  sucesos independientes y binomial, números de oxidación, R = 0.0821, g = 9.81,
  densidad del agua e índice de refracción), toda pregunta con cálculo la trae,
  también las formas nuevas de preguntar. Las preguntas de conceptos (en qué
  cuadrante está un punto, qué propiedad es, qué ley explica algo) van sin ella.
- Lo que se calcula (matemáticas, física, nómina, contabilidad, costos de hotel)
  sale con números nuevos; lo de conceptos sale de un banco con varias variantes
  por reactivo, con filas e incisos revueltos.
- **Varias formas de preguntar lo mismo.** El examen no repite las preguntas de la
  guía: pregunta los mismos temas de otra manera. Por eso cada subtema de
  matemáticas y física tiene varios *enfoques* (296 en total para 58 subtemas): la
  pregunta de la guía y otras que piden lo mismo desde otro lado. Por ejemplo, en
  razones trigonométricas: el valor de una expresión (como en la guía), problemas de
  escaleras, sombras, rampas o drones con seno, coseno y tangente, leer la razón en
  un triángulo dibujado, sacar una razón a partir de otra y encontrar un ángulo. En
  geometría hay dibujos de paralelas cortadas por una transversal, del teorema de
  Tales y de triángulos rectángulos.
- En los bancos de conceptos, casi la mitad de las veces el mismo contenido se
  pregunta en otro formato: un *Relacione* se vuelve pregunta directa (o al revés),
  un *Complete* de varios huecos queda de uno solo, de un *Ordene* se pregunta qué
  paso va después de otro y de un *listado* cuál sí forma parte (o "todas excepto").
- **Todo el temario de la guía de estudio** (*Temas fundamentales y bibliografía*),
  no sólo lo que trae el cuadernillo. En matemáticas, ciencias experimentales,
  humanidades, comunicación, ciencias sociales e introducción al trabajo cada
  subtema también pregunta los temas de la guía que el cuadernillo no usa:
  - Álgebra: conjuntos numéricos, propiedades de los reales, leyes de los
    exponentes, notación científica, suma de polinomios, productos notables, suma y
    diferencia de cubos, factorización por agrupación y binomio de Newton.
  - Geometría: nombres y diagonales de polígonos, criterios de congruencia, áreas y
    perímetros (rombo, trapecio, paralelogramo, polígono regular, círculo).
  - Analítica: fórmula general y discriminante.
  - Estadística: probabilidad con los datos de la tabla, podio (permutaciones) y
    unión de sucesos.
  - Física: tiro vertical, procesos termodinámicos (isobárico, isocórico,
    isotérmico, adiabático), buenos y malos conductores del calor y entropía.
  - Humanidades (de 73 a 180 variantes, 62 armadas al azar): tipos de saber, rasgos
    y ramas de la filosofía, los ocho métodos filosóficos, corrientes, ética y moral,
    eudaimonía, areté y el justo medio de Aristóteles, teorías éticas (utilitarismo,
    ética formal, hedonismo, estoicismo, contractualismo, multiculturalismo,
    existencialismo), autonomía y heteronomía, derechos individuales y colectivos,
    tipos de conciencia, utopías, derechos humanos; en lógica, valor de verdad con
    los conectivos, casos en que una condicional o bicondicional es falsa o
    verdadera, leyes lógicas (De Morgan, contraposición), siete reglas de inferencia
    con letras y con palabras, tipos de argumento (deductivo, inductivo, analógico,
    abductivo), validez frente a verdad y las ocho falacias de la guía; además, el
    sentido de la vida, las etapas de Comte, objetivación y alienación, Habermas y
    la filosofía de la liberación. El multirreactivo de argumentación tiene cuatro
    textos.
  - Comunicación (de 73 a 180 variantes, 82 armadas al azar): elementos y cinco
    tipos de barreras de la comunicación, intenciones comunicativas (convencer frente
    a persuadir), sentido denotativo y connotativo, ideas principales, oraciones por
    la actitud del hablante, por su predicado y compuestas, ortografía con las reglas
    de c, s, z, b y v, acentuación, tilde diacrítica, tipos de coma, sinónimos,
    antónimos y homófonos; tipos de texto, textos expositivos y periodísticos, hechos,
    opiniones y suposiciones, publicidad y propaganda, narrador, trama, mito, leyenda
    y fábula, subgéneros dramáticos y líricos, figuras retóricas; técnicas, etapas y
    tipos de investigación, citas; en inglés, Wh-questions, modales, presente,
    pasado (con verbos irregulares) y futuro. El multirreactivo de lectura en inglés
    tiene cuatro textos.
  - Biología (de 38 a 104 variantes, 36 con datos al azar): Redi, Pasteur, panspermia
    y síntesis abiótica, biomoléculas orgánicas e inorgánicas, monosacáridos,
    disacáridos y polisacáridos, taxonomía y nomenclatura binomial, teoría celular,
    procariotas y eucariotas, comunicación celular, fases de la fotosíntesis, ciclo
    celular, mitosis y meiosis (cromosomas de las células hijas), cuadros de Punnett,
    leyes de Mendel, teorías y evidencias de la evolución, adaptaciones, crecimiento y
    densidad de poblaciones, relaciones interespecíficas (con amensalismo), la regla
    del 10% de la energía y los ciclos biogeoquímicos.
  - Geografía (de 23 a 66 variantes, 17 con datos al azar): planetas rocosos y
    gaseosos, mapas y proyecciones, SIG y GPS, intemperismo, erosión y sismos, tipos
    de recursos, fenómenos meteorológicos, hidrológicos y geológicos, riesgos del
    CENAPRED, sectores económicos, grupos y letras de Köppen, elementos y factores del
    clima, IDH, densidad de población y tasa de natalidad, migración y territorio de
    México.
  - Química (de 39 a 102 variantes, 38 con datos al azar): protones, neutrones y
    electrones de átomos e iones, modelos atómicos, historia de la tabla periódica,
    configuración electrónica, metales, no metales y gases nobles, regla del
    octeto, agentes oxidante y reductor, números de oxidación, pares
    ácido-base conjugados, ácidos y bases de Lewis, neutralización, pH = −log[H⁺],
    enlaces por ejemplos y por electronegatividad, gas ideal (presión, volumen y
    moles), masa molecular, alcanos y grupos funcionales.
  - Ciencias sociales (de 59 a 272 variantes, 85 armadas al azar): campos del
    conocimiento, objeto de las nueve disciplinas sociales y casos para elegir la
    disciplina, enfoques cuantitativo y cualitativo, positivismo, materialismo
    histórico y estructural-funcionalismo; Estado y gobierno, formas de gobierno,
    democracia representativa, directa y participativa, artículos 39, 40 y 41,
    división de poderes, instituciones, socialización, valores y obligaciones
    ciudadanas; superáreas y periodos de Mesoamérica, culturas, fuentes y cronología
    de la Conquista, instituciones del virreinato, Reformas Borbónicas, castas, etapas
    de la Independencia, proyectos de nación, conflictos del siglo XIX, guerra con
    Estados Unidos, Leyes de Reforma, Segundo Imperio y República Restaurada;
    Porfiriato, huelgas, planes y personajes de la Revolución, artículos de 1917,
    Maximato, cardenismo, Segunda Guerra Mundial, modelos económicos, hechos por
    sexenio de 1940 a 2018, Guerra Sucia, reformas electorales y pueblos originarios;
    demografía, salud, becas, empleo e informalidad, brecha de género (con cuentas),
    coeficiente de Gini, ingreso frente a riqueza (patrimonio neto), regiones
    económicas, PIB por sectores, PIB per cápita y tratados comerciales.
  - Introducción al trabajo (de 37 a 125 variantes, 62 armadas al azar):
    características personales, sectores (con el cuaternario), metas a corto,
    mediano y largo plazo, fuentes y medios de reclutamiento, currículum, carta de
    presentación y solicitud de empleo, tipos de entrevista, RFC, NSS, AFORE y CURP,
    modalidades de contratación y tipos de contrato, tipos de trabajador, vacaciones
    de la reforma de 2023 (hasta el décimo año), prima vacacional, jornadas por
    horario, salario diario, aguinaldo y PTU con cantidades, exceptuados de la PTU,
    obligaciones y prohibiciones de la Ley Federal del Trabajo, maternidad y
    lactancia, y suspensión, rescisión y terminación.

**Simulacro tipo examen** (botón en la lista): un simulacro por área con las mismas
preguntas y el mismo tiempo de la guía. Por defecto las preguntas van **de fácil a
difícil**; con *Orden de las preguntas: Como en la guía* salen en el orden del
cuadernillo. Corre un reloj, puedes saltar entre preguntas y marcarlas, y al
acabarse el tiempo se entrega solo. Las preguntas de un multirreactivo hablan del
mismo texto o de los mismos datos.

Cómo está hecho:

- `js/temas/prepa/comun.js` arma los incisos y los formatos del cuadernillo.
  `P.enfoque(r, lista, ...)` escoge una de varias funciones (las formas de preguntar
  un subtema) y `P.miniGrafica(f, op)` dibuja gráficas chicas para incisos.
- En matemáticas y física cada archivo tiene un mapa `ENFOQUES` (subtema → lista de
  funciones). En estadística primero se arma el contexto del multirreactivo y luego
  se escoge el enfoque, para que todas las preguntas sigan hablando de los mismos
  datos.
- Si cambian los generadores, sube `VERSION_PREGUNTAS` en `js/nucleo/examen.js`: un
  examen a medias de otra versión ya no se reconstruiría igual y se descarta.
- `js/temas/prepa/banco.js` convierte una lista de preguntas en un tema. Cada
  variante es un objeto (`{p, b, m}`, `{c, b, m}`, `{rel, pares}`, `{lista, si, no}`,
  `{orden, pasos}`) o una función `(r) => variante` para preguntas con datos al azar.
  Una variante numérica puede traer `fmt` (cómo se imprime) y `op` con opciones de
  `P.opciones`, por ejemplo `{conSigno: true, rango: [-4, 8]}` para números de
  oxidación (los valores inventados no salen del rango).
- El nivel de cada subtema va en el mismo tema: en los bancos, con
  `niveles: {facil: [...], medio: [...], dificil: [...]}`; en matemáticas y física,
  como tercer dato de cada subtema (`['grado', 'Grado de un polinomio', 'facil']`).
- `js/temas/prepa/simulacros.js` arma los simulacros; los reactivos que comparten
  `g` (grupo) reciben la misma semilla.

### Ruta en orden y modo aleatorio

Los dos primeros botones de la lista están en todas las materias:

- **Ruta en orden**: recorre los temas de lo más básico a lo más avanzado, en el
  orden de la lista (en Matemáticas empieza en ley de signos, en Física en MRU y MUA).
  Cada tema va de Fácil a Medio a Difícil, y con **3 aciertos** se pasa solo al
  siguiente paso. Arriba se ve en qué paso vas y cuántos aciertos llevas; puedes
  saltar un paso, empezar de nuevo o abrir *Ver la ruta completa* y tocar cualquier
  nivel para ir ahí. El avance se guarda por materia.
- **Modo aleatorio** (antes *Práctica mixta*): mezcla ejercicios de varios temas al
  azar. Eliges el nivel o **Revuelta** (la dificultad también sale al azar) y, con
  los botones de *Salen de:*, puedes limitarlo a un grupo (solo Cálculo, solo
  Álgebra…). Cada ejercicio dice de qué tema y subtema salió, y el progreso se guarda
  en el tema que le corresponde.

### Armar un examen

El botón **Armar un examen** sirve para juntar varios temas y
calificarte sobre todos a la vez.

1. Toca los temas de la lista y se van agregando. **La selección se guarda**, así que
   puedes ir sumando temas conforme avanzas en el curso: la próxima vez siguen ahí.
2. Ajusta el **total de ejercicios** (20 por defecto). Se reparte parejo entre los temas
   elegidos, y si quieres darle más peso a alguno usas el `−` / `+` de su etiqueta.
3. **Empezar el examen.**

A diferencia de la práctica, aquí **no se dice si acertaste** hasta que entregas.
Puedes moverte libremente entre las preguntas, marcar las dudosas para volver a ellas y
dejar alguna en blanco. Lo que llevas contestado se guarda solo: si cierras la pestaña a
media prueba, al volver te ofrece continuarla.

La dificultad va **de menos a más**: dentro de cada tema se reparten las preguntas entre
fácil, medio y difícil (más o menos 40 / 35 / 25), y el examen se ordena de las fáciles a
las difíciles intercalando los temas, para que no salgan cinco seguidas de lo mismo.

Al entregar sale la calificación, el desglose por tema con barras, una sugerencia de
dónde conviene practicar y la revisión pregunta por pregunta con la solución completa.
Los exámenes terminados quedan en un historial corto (los últimos diez).

El examen **no cuenta** para las estadísticas de práctica: evaluarte no es lo mismo que
entrenar, y mezclarlos distorsionaría los porcentajes por tema.

En **Ajustes** puedes cambiar cuántos intentos quieres antes de ver la respuesta,
apagar las pistas y borrar tu progreso. El progreso (aciertos, racha, aciertos al primer
intento) se guarda solo en tu navegador.

### Cómo escribir las respuestas

- Exponentes con `^`: `x^2`, `3x^4`.
- Multiplicación con `*` o sin nada: `3x`, `2*(x+1)`, `(x+2)(x-3)`.
- Fracciones con `/`: `3/4`. También se acepta el decimal exacto.
- Raíces: `sqrt(8)`. Funciones: `sen`, `cos`, `tan`, `ln`, `log` (base 10), `exp`.
- En las integrales indefinidas no hace falta escribir `+ C`.
- No importa la forma: `x^2+2x+1` y `(x+1)^2` se aceptan igual, porque el programa
  compara los valores de las dos expresiones, no el texto.

## Estructura

```
index.html                 ← une todo y lista los temas
manifest.webmanifest       ← datos para instalarla como app en el celular
sw.js                      ← hace que funcione sin internet
icono-192.png / icono-512.png
css/estilos.css
js/nucleo/                 ← el motor (no se toca al agregar temas)
   aleatorio.js            generador con semilla (ejercicios reproducibles)
   formato.js              fracciones, exponentes, polinomios, figuras SVG
   expresion.js            interprete que compara respuestas algebraicas
   poli.js                 operaciones con polinomios
   respuestas.js           tipos de respuesta y su verificacion
   registro.js             registro de materias y temas
   almacen.js              configuracion y progreso (localStorage)
   motor.js                intentos, pistas y revelado de la solucion
   guia.js                 guiones del entrenamiento paso a paso
   examen.js               armado, calificacion e historial de examenes
js/temas/materias.js       ← materias disponibles
js/temas/matematicas/*.js  ← un archivo por tema
js/app.js                  ← interfaz
```

## Agregar un tema nuevo

1. Crea `js/temas/<materia>/<mi-tema>.js`.
2. Enlázalo en `index.html` con un `<script src="...">`.
3. Eso es todo: aparece solo en la lista, con su grupo y sus dificultades.

Plantilla mínima:

```js
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  EJ.tema({
    id: 'mi-tema',                       // único
    materia: 'matematicas',
    grupo: 'Algebra',                    // encabezado en la barra lateral
    nombre: 'Nombre visible del tema',
    descripcion: 'Una línea que explica qué se practica.',
    formulario: 'Fórmulas del tema (HTML, opcional).',

    generar: function (dif, r) {         // dif: 'facil' | 'medio' | 'dificil'
      var a = r.entero(2, 9);            // r = generador aleatorio con semilla
      var b = r.enteroNoCero(-9, 9);

      return {
        enunciado: 'Calcula ' + a + ' + ' + b,
        respuesta: R.numero(a + b),
        pistas: ['Primera pista', 'Segunda pista'],
        solucion: ['Paso 1', 'Paso 2', 'Resultado: <b>' + (a + b) + '</b>'],
        metodo: 'Opcional: la regla general, para el apartado "Como se resuelve". ' +
                'Si no la pones se usa la primera pista.'
      };
    }
  });
})();
```

### Subtemas

Para que un tema tenga subtemas seleccionables, lo único que hay que hacer es empezar
`generar` con `r.subtema([...])`, pasando parejas de `[id, 'Nombre visible']`:

```js
generar: function (dif, r) {
  var caso;
  if (dif === 'facil') {
    caso = r.subtema([
      ['suma', 'Suma y resta'],
      ['grado', 'Grado y coeficientes']
    ]);
  } else {
    caso = r.subtema([
      ['division', 'Division larga'],
      ['sintetica', 'Division sintetica']
    ]);
  }
  return casos[caso](r, dif);   // cada subtema es su propia funcion
}
```

La interfaz descubre sola los subtemas de cada dificultad (genera un ejercicio de prueba
y mira qué lista recibió), los pinta como botones y respeta el que elija el usuario.
No hay que declararlos en ningún otro lado. Reglas:

- Llama a `r.subtema(...)` **una sola vez** por ejercicio, al principio de `generar`.
  Para variar cosas internas usa `r.elige(...)`.
- Un mismo `id` puede aparecer en varias dificultades (sale más difícil según el nivel).
- El archivo `js/temas/matematicas/polinomios.js` es el modelo a copiar: cada subtema es
  una función independiente dentro de un objeto `casos`.

### Tipos de respuesta disponibles

| Tipo | Para qué sirve | Ejemplo |
|---|---|---|
| `R.numero(v, {tol, dec, unidad})` | un número (acepta `3/4`, `sqrt(2)`, decimales) | `R.numero(12)` |
| `R.fraccion(a, b)` | fracciones; acepta cualquier forma equivalente | `R.fraccion(3, 4)` |
| `R.expresion(txt, {vars, masConstante})` | álgebra; compara por valor, no por texto | `R.expresion('x^2+1')` |
| `R.factorizada(txt)` | igual, pero exige que esté escrita como producto | `R.factorizada('(x+2)*(x-3)')` |
| `R.texto(v, {alternativas})` | palabras; ignora mayúsculas y acentos | `R.texto('hexagono')` |
| `R.opcion(opciones, correcta)` | opción múltiple | `R.opcion(['Par','Impar'], 0)` |
| `R.lista(valores)` | varios valores sin importar el orden | `R.lista([-3, 5])` |
| `R.par(x, y)` | un punto o pareja ordenada | `R.par(2, -1)` |
| `R.varios([{etiqueta, resp}])` | varias preguntas en un mismo ejercicio | ver `estadistica.js` |

`tol` es la tolerancia **absoluta** aceptada. Si el enunciado pide redondear a 2
decimales, `tol: 0.01` está bien; si la respuesta es exacta, no pongas `tol`.

### Ayudas del generador aleatorio (`r`)

`r.entero(a, b)`, `r.enteroNoCero(a, b)`, `r.enteroExcepto(a, b, [x])`, `r.real(a, b)`,
`r.elige(lista)`, `r.muestra(lista, n)`, `r.baraja(lista)`, `r.bool(p)`, `r.signo()`,
`r.enterosDistintos(a, b, n)`.

### Ayudas de formato (`EJ.fmt`) y polinomios (`EJ.poli`)

`F.frac(a, b)`, `F.sup(n)`, `F.poli([1,-2,3])` → `x² - 2x + 3`, `F.raizSimp(12)` → `2√3`,
`F.svg(...)` para figuras. `EJ.poli` suma, multiplica, deriva, integra y divide
polinomios guardados como arreglo de coeficientes en orden descendente.

### Agregar entrenamiento paso a paso

Los guiones del modo guiado viven en `js/nucleo/guia.js`, uno por familia de
ejercicio. Un tema solo tiene que devolver `guia` junto al ejercicio:

```js
return {
  enunciado: ...,
  respuesta: ...,
  pistas: [...],
  solucion: [...],
  guia: EJ.guia.sintetica(coeficientes, a)   // <- una linea
};
```

Y un guion se ve asi:

```js
guia.loQueSea = function (a, b) {
  return {
    intro: 'Lo que se plantea antes de empezar',
    tablero: function (hechos) { return '<pre class="tablero">...</pre>'; },  // opcional
    pasos: [
      {
        pregunta: '¿Cuanto es ' + a + ' · ' + b + '?',
        resp: R.numero(a * b),          // se revisa igual que cualquier respuesta
        pista: 'Lo que le dices si falla',
        despues: 'Lo que le explicas cuando acierta'
      }
    ],
    final: 'El resultado completo',
    receta: ['Paso 1', 'Paso 2', 'Paso 3']
  };
};
```

La interfaz descubre sola que subtemas tienen guia y pinta el boton solo ahi.

## Agregar una materia nueva (ciencias, historia, ...)

1. Registra la materia en `js/temas/materias.js` (ya están puestas Ciencias e Historia,
   solo les faltan temas).
2. Crea la carpeta `js/temas/<materia>/` y ahí sus temas, igual que arriba.

Para temas de memorizar (fechas, nomenclatura, definiciones) lo natural es una lista de
fichas y dejar que el generador escoja una al azar, preguntando en los dos sentidos:

```js
var FICHAS = [
  { a: 'NaCl', b: 'cloruro de sodio' },
  { a: 'H2SO4', b: 'acido sulfurico' }
];

generar: function (dif, r) {
  var f = r.elige(FICHAS);
  var alReves = r.bool();
  return {
    enunciado: alReves ? '¿Cuál es la fórmula del ' + f.b + '?' : '¿Cómo se llama ' + f.a + '?',
    respuesta: R.texto(alReves ? f.a : f.b),
    pistas: ['Empieza con "' + (alReves ? f.a : f.b).substring(0, 2) + '..."'],
    solucion: [f.a + ' = ' + f.b]
  };
}
```

La dificultad puede usarse para elegir entre respuesta abierta (difícil) y opción
múltiple con distractores sacados de las otras fichas (fácil), usando `R.opcion`.

## Temas incluidos

### Matemáticas

**Aritmética y álgebra básica:** leyes de los signos · leyes de los exponentes ·
reglas para fracciones · proporciones y variación lineal
**Sucesiones y series:** sucesiones · progresiones aritméticas y geométricas
**Álgebra:** monomios · binomios · trinomios · polinomios (operaciones generales)
**Geometría y trigonometría:** nombres de polígonos · teorema de Tales ·
teorema de Pitágoras · ley de senos · ley de cosenos
**Geometría analítica:** coordenadas rectangulares y polares · secciones cónicas ·
excentricidad
**Funciones:** elementos de función, crecientes y decrecientes · funciones pares e
impares · tipos de función · propiedades de logaritmos y aplicaciones
**Cálculo:** límites · reglas de derivación · puntos críticos · teoremas fundamentales
del cálculo · integración por partes · fórmula de sustitución
**Probabilidad y estadística:** estadística (elementos y medidas) · probabilidad y
teoría de conjuntos · distribución binomial

### Física

21 temas, con el mismo formato que matemáticas (paso a paso incluido).

**Cinemática:** MRU y MUA · caída libre y tiro vertical

**Dinámica:** las tres leyes de Newton (inercia, F = ma, acción y reacción)

**Gravitación:** las tres leyes de Kepler (órbitas, áreas, períodos)

**Energía:** ley de conservación de la energía

**Termodinámica:** las cuatro leyes (ley cero, ΔU = Q − W, entropía y rendimiento,
cero absoluto)

**Gases:** ley de Boyle · ley de Charles · ley de Gay-Lussac

**Elasticidad y fluidos:** ley de Hooke · principio de Pascal · principio de Arquímedes

**Electromagnetismo y óptica:** ley de Ohm · ley de Snell
