# Guía de visualizaciones — Un Santajaro

Fecha: 2026-08-16
Manual operativo. Se consulta cada vez que se hace una figura nueva.

Nace de la ingeniería inversa de dos cosas que ya funcionan en el sitio: los
cinco paneles de `fundamentos-redes-neuronales` y la charla de laplacianos.
Casi nada aquí es invención: es lo que esas dos páginas ya hacen, escrito.

---

## 1. Los cinco tipos

**Regla de decisión: usa siempre el número más bajo que resuelva el problema.**
Cada escalón cuesta más de construir, más de mantener y más de cargar.

### T1 · Figura estática

Un SVG generado por un script. Sin tiempo, sin interacción.

**Cuándo.** Un diagrama, una comparación lado a lado, un esquema, una curva.
La inmensa mayoría de las figuras deberían ser esto.

**Cuándo no.** Si el lector necesita cambiar algo para entenderlo.

    scripts/figuras/<slug>/<nombre>.py     ← la fuente de verdad
    assets/<coleccion>/<slug>/<nombre>.svg ← la salida

### T2 · Figura por pasos

Un SVG con capas y un control anterior/siguiente que revela etapas. Sin
cómputo: los pasos están dibujados de antemano.

**Cuándo.** Una construcción geométrica, una derivación, un algoritmo con
etapas discretas y nombrables.

**Cuándo no.** Si las etapas son continuas — eso es un mando, T3 o T4.

    scripts/figuras/<slug>/<nombre>.py     ← genera el SVG con grupos por paso
    assets/<coleccion>/<slug>/<nombre>.svg
    assets/<coleccion>/<slug>/<nombre>.js  ← solo muestra y oculta grupos

### T3 · Explorable, cálculo en el navegador

SVG o canvas más un mando. El navegador recalcula al mover.

**Cuándo.** La matemática es barata: aritmética, una red de tres capas, un
perceptrón, iterar sobre unos cientos de celdas. Es lo que hacen los cinco
paneles de `fundamentos`, y ninguno pasa de 400 líneas.

**Cuándo no.** Autovalores, homología persistente, cualquier cosa que pida una
librería numérica. Eso es T4.

    assets/<coleccion>/<slug>/<nombre>.js  ← todo vive aquí, sin datos

### T4 · Explorable, datos precalculados

La matemática cara se hace en Python, se exporta a JSON, y el navegador solo
dibuja. Es el patrón de la charla de laplacianos.

**Cuándo.** Cuando el cómputo no cabe en el navegador o tarda demasiado.
**Y siempre en las charlas**, aunque T3 bastara: una exposición no debe
depender de que el portátil del ponente calcule algo en directo.

    scripts/figuras/<slug>/<nombre>.py     ← calcula y exporta
    assets/<coleccion>/<slug>/<nombre>.json
    assets/<coleccion>/<slug>/<nombre>.js  ← lee el JSON y anima

### T5 · Animación renderizada

Vídeo o Manim. **Debe ser rara y hay que justificarla caso por caso.**

**Lo que cuesta:** peso en el repositorio, no se adapta al tema, no se puede
interactuar, el texto no es accesible, y no se puede regenerar desde el sitio.

**Cuándo.** Solo si la explicación necesita movimiento narrado y T1–T4 no
sirven. Antes de elegirla, escribe por qué las otras cuatro no bastan.

**Nunca GIF.** No se adapta al tema, pesa más que un vídeo y no es accesible.

---

## 2. Contrato de datos para T4

El JSON es el intermediario entre el script y el navegador. Su forma está
fijada para que cualquier figura se pueda regenerar y para que la etiqueta de
honestidad **no se pueda olvidar**: vive dentro del dato.

```json
{
  "meta": {
    "id": "viz-difusion",
    "script": "scripts/figuras/laplacianos/difusion.py",
    "generado": "2026-08-16",
    "entrada": "sintetica",
    "computo": "precalculado",
    "nota": "16×16, dos pozos"
  },
  "estatico": {
    "N": 16,
    "image": [0.04, 0.047, "…"]
  },
  "fotogramas": [
    { "t": 0, "lam": 0.0384, "campo": ["…"] },
    { "t": 1, "lam": 0.1121, "campo": ["…"] }
  ]
}
```

**`meta` es obligatorio y completo.** Sin `script` el dato no es reproducible;
sin `entrada` y `computo` la figura no se puede publicar.

**`estatico`** guarda lo que no cambia entre fotogramas. No lo repitas dentro
de cada uno: es la diferencia entre 90 KB y 900 KB.

**`fotogramas`** es un array; el índice del mando **es** el índice del array.
El navegador no interpola ni calcula: indexa.

### Reglas de tamaño

- **Redondea en el script**, a tres o cuatro decimales. Un `float64` completo
  por celda multiplica el peso por cinco sin añadir información visible.
- **Hasta unos 150 KB**, incrusta el JSON en la página con
  `<script type="application/json">`. Es lo que hace la charla, con 69 y 97 KB,
  y evita una petición de red.
- **Por encima**, archivo aparte y `fetch`, con un estado de carga visible.

### El script manda

El `.py` es la fuente de verdad. Si el JSON y el script discrepan, el script
gana y el JSON se regenera. Cada script empieza con tres líneas de comentario:
qué figura genera, dónde la escribe, cómo se ejecuta.

---

## 3. Componentes

Extraídos de lo que la charla ya hace, con los nombres del repositorio.

| Include | Para qué |
|---|---|
| `figura.html` | El contenedor: `<figure>`, punto de montaje, pie y etiqueta de honestidad |
| `figura-datos.html` | Incrusta un JSON de T4 como `<script type="application/json">` |
| `figura-mando.html` | Un deslizador etiquetado, `<input type="range">` nativo |
| `figura-pasos.html` | Anterior / siguiente con contador, para T2 |
| `figura-reproducir.html` | Reproducir / pausar. **Nunca arranca solo** |

Los controles emiten el marcado; el JS de cada figura los cablea. Así el
aspecto y la accesibilidad se arreglan en un sitio.

### La etiqueta de honestidad

Es obligatoria y son **dos campos**, no uno. La charla los mezclaba en una
sola frase y eso obligaba a interpretar qué abarcaba «datos reales».

| Campo | Valores |
|---|---|
| `entrada` | `real` · `sintetica` · `esquematica` |
| `computo` | `calculado` · `precalculado` · `ilustrado` |

Se renderiza junto al pie, en letra pequeña:

    entrada sintética 16×16 · cómputo precalculado

Y se acompaña de la salvedad cuando la haya. El mejor ejemplo está en la
propia charla: **«sintético pero se estanca sobre imágenes reales»** declara
el dato *y* el límite de lo que demuestra, en seis palabras. Cópiese ese tono.

`ilustrado` significa dibujado a mano para explicar. Es legítimo, y por eso
tiene nombre: lo que no es legítimo es no decirlo.

---

## 4. Reglas transversales

Obligatorias para toda figura, de T1 a T5.

### Tema claro y oscuro

Usa las variables del sitio: `--accent-color`, `--surface`, `--body-color`,
`--text-quiet`, `--border-color`. En SVG, `stroke="currentColor"` resuelve la
mayoría de los casos.

**Trampa del canvas.** Un canvas **no hereda CSS**. Si escribes
`ctx.fillStyle = '#95c9a0'`, esa figura se queda oscura para siempre. Lee el
color y vuelve a dibujar al cambiar de tema:

```js
const css = n => getComputedStyle(document.documentElement)
                   .getPropertyValue(n).trim();
new MutationObserver(dibujar)
  .observe(document.documentElement, { attributes: true,
                                       attributeFilter: ['data-theme'] });
```

**Nunca un fondo blanco incrustado en la figura.** Es lo que recorta un
rectángulo blanco en mitad de una página oscura.

### Movimiento

Respeta `prefers-reduced-motion: reduce`. **Cero autoplay**: el movimiento se
pide con un botón. La charla ya lo cumple; es el listón.

### Teclado

`<input type="range">` y `<button>` nativos siempre que se pueda. Salen gratis
el foco, las flechas y el lector de pantalla. Un div con `onclick` no.

### Descripción textual

Di **qué muestra**, no «visualización 3». Va en el pie y en el `alt` si hay
imagen. Alguien que no pueda ver la figura debe llevarse la idea.

### Degradación

Si el JavaScript falla o tarda, queda una figura estática o un mensaje.
**Nunca un hueco mudo.** El texto del artículo no espera a la figura.

### Móvil

Sin desplazamiento horizontal. Los mandos, del tamaño de un dedo. Si la figura
no cabe, que se reduzca o se apile — no que se salga.

---

## 5. Plantillas

### T1 y T2 — el script

```python
"""Genera <qué figura>.
Escribe en assets/<coleccion>/<slug>/<nombre>.svg
Ejecutar: python scripts/figuras/<slug>/<nombre>.py
"""
# Los colores salen de currentColor o de variables CSS: no fijar tonos aquí.
```

### T3 — el navegador calcula

```js
/* <nombre>.js — <qué hace>
   Tipo T3: todo el cálculo ocurre aquí. Sin dependencias. */
(function () {
  const root = document.getElementById('viz-<id>');
  if (!root) return;                    // el contenedor manda
  const stage = root.querySelector('.viz-stage');
  if (!stage) return;

  const css = n => getComputedStyle(document.documentElement)
                     .getPropertyValue(n).trim();

  function dibujar() { /* … */ }

  // Redibuja al cambiar de tema.
  new MutationObserver(dibujar).observe(document.documentElement,
    { attributes: true, attributeFilter: ['data-theme'] });

  dibujar();
})();
```

### T4 — el navegador solo dibuja

```js
/* <nombre>.js — <qué hace>
   Tipo T4: los datos vienen de <nombre>.json, generado por
   scripts/figuras/<slug>/<nombre>.py. Aquí no se calcula matemática. */
(function () {
  const root = document.getElementById('viz-<id>');
  if (!root) return;
  const crudo = document.getElementById('<id>-datos');
  if (!crudo) return;                   // sin datos, no hay figura
  const D = JSON.parse(crudo.textContent);

  const mando = root.querySelector('input[type=range]');
  mando.max = D.fotogramas.length - 1;
  mando.addEventListener('input', () => pintar(D.fotogramas[mando.value]));

  function pintar(f) { /* solo dibuja: nada de cuentas */ }

  pintar(D.fotogramas[0]);
})();
```

---

## 6. Antes de publicar una figura

- [ ] ¿Es el tipo más bajo que resuelve el problema?
- [ ] ¿Tiene etiqueta de honestidad, con entrada **y** cómputo?
- [ ] Si es T4, ¿existe el script que genera el JSON y está en `meta.script`?
- [ ] ¿Se ve bien en claro y en oscuro?
- [ ] ¿Se puede usar solo con el teclado?
- [ ] ¿El pie dice qué muestra, no cómo se llama?
- [ ] ¿Qué se ve si el JavaScript no carga?
- [ ] ¿Cabe en un móvil sin desplazamiento horizontal?

---

## Apéndice · Lo que ya existe, y de qué tipo es

Inventario al 2026-08-16, para no reinventar.

| Dónde | Qué | Tipo |
|---|---|---|
| `fundamentos-redes-neuronales` | línea de tiempo, McCulloch-Pitts, NAND de Turing, perceptrón, MLP con XOR | **T3**, 1.371 líneas de JS, funcionando |
| `avances-redes-neuronales` | inviernos de la IA | **T3**, funcionando |
| `avances-redes-neuronales` | backpropagation, convolución, convergencia de 2012 | **pendientes** |
| `charlas/laplacianos_tumores` | doce SVG y diez canvas | **T4**, con 166 KB de JSON incrustado |
| Fichas de proyecto | 33 declaradas en el campo `visualizaciones` | **pendientes**, sin clasificar |

**Deuda conocida.** Los dos JSON de la charla no tienen script que los genere:
se produjeron una vez y el código no se conservó. Las autofunciones que
muestran sí se calcularon de verdad —la etiqueta «datos reales, no
ilustrativos» es correcta— pero hoy el dato no es reproducible. Cualquier
figura T4 nueva sí debe traer su script.

**La charla no tiene tema claro.** Define su propia paleta cerrada y no lee las
variables del sitio. Si algún día se integra, sus diez canvas se quedarían
oscuros sobre fondo claro. Es el caso que motiva la trampa del canvas de §4.
