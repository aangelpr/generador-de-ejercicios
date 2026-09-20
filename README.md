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

### Sin subir nada, solo en tu casa

Sirve si la computadora está prendida y el celular está en la misma WiFi:

```bash
python -m http.server 8777
```

Busca la IP de la computadora (en Windows: `ipconfig`, la línea *Dirección IPv4*, algo
como `192.168.1.70`) y en el celular abre `http://192.168.1.70:8777`. Ojo: así no se
puede instalar como app ni funciona sin internet, porque eso necesita `https`.

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

Ahora mismo hay entrenamiento guiado en:

| Tema | Qué te enseña paso a paso |
|---|---|
| Leyes de los signos | Multiplicación: primero el signo, luego los números |
| Leyes de los exponentes | Producto de potencias de la misma base |
| Reglas para fracciones | Suma y resta: m.c.m., conversión, operar y simplificar |
| Binomios | Binomio al cuadrado: los tres términos uno por uno |
| Trinomios | Factorizar x² + bx + c buscando los dos números |
| Polinomios | **División sintética** (bajar, multiplicar, sumar) y factor común |
| Teorema de Pitágoras | Cuadrados, suma y raíz |
| Reglas de derivación | Derivar un polinomio término por término |

Los demás temas siguen teniendo el apartado **Cómo se resuelve** con la regla y
un ejemplo resuelto. El modo guiado se irá ampliando a más subtemas.

### Práctica mixta

El primer botón de la lista, **Práctica mixta**, mezcla ejercicios de varios temas al
azar, como en un examen. Puedes limitarlos a un grupo (solo Cálculo, solo Álgebra…) con
los botones de *Salen de:*. Cada ejercicio dice de qué tema y subtema salió, y el
progreso se guarda en el tema que le corresponde.

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
