# Guía de rigor y divulgación — Un Santajaro

Fecha: 2026-08-06
Fase 2. Guía operativa de la sección 3 de CLAUDE.md.
Diseño: no implementa nada. La implementación es la Fase 3.

---

## 1. LAS TRES CAPAS EN MARKDOWN

Recordatorio de CLAUDE.md §3: un lector debe poder abandonar al final de
cualquier capa y llevarse algo completo.

### Capa 0 — La idea

**No lleva marcado especial.** Es el texto que va desde el título hasta el primer
`##`. Si necesita marcado para distinguirse, es que no está haciendo su trabajo.

Lo que sí lleva es una figura, y `nivel: divulgativo` en el front matter si el
post entero se queda en esta capa.

### Capa 1 — El desarrollo

El cuerpo normal del post. Sin marcado. Es el estado por defecto.

### Capa 2 — Los detalles

Colapsable, con `<details>` nativo:

```html
<details class="capa-2" markdown="1">
<summary>Demostración del teorema 2</summary>

Aquí va la demostración, en markdown normal.

</details>
```

**Por qué `<details>` y no un colapsable propio con JavaScript:**

- es navegable por teclado sin escribir una línea de JS;
- los lectores de pantalla lo anuncian como región expandible y comunican su
  estado, sin `aria-expanded` manual;
- funciona con JavaScript desactivado;
- respeta `prefers-reduced-motion` por defecto, porque no anima nada.

`markdown="1"` es obligatorio, igual que en las secciones `one-col` y `two-col`
que ya usa `plantilla-nota.md`. Sin él, kramdown no procesa el markdown de dentro.

### Impresión — el problema real

El contenido de un `<details>` cerrado **no se imprime**. Los navegadores lo
ocultan con `content-visibility`, y ninguna regla CSS de `display` lo revierte.
Alguien que imprima el post pierde toda la Capa 2 sin enterarse.

Tres soluciones, de mejor a peor:

1. **`::details-content` en el CSS de impresión.** Es la solución limpia y
   sin JavaScript. Pseudo-elemento reciente: soportado en navegadores basados en
   Chromium desde finales de 2024, **no** en Firefox ni Safari a la fecha de este
   documento. Se pone igual, como mejora progresiva.
2. **Un `beforeprint` que abra todos los `<details>`.** Cinco líneas de JS.
   Cubre los navegadores que no soportan lo anterior. Degrada bien: sin JS, se
   pierde la Capa 2 al imprimir, pero nada se rompe.
3. Aceptar la pérdida. No recomendada: un post técnico se imprime para leerlo
   despacio, que es exactamente cuando la Capa 2 importa.

**Propuesta: 1 + 2.**

### Aviso: MathJax dentro de un `<details>` cerrado

MathJax 3 con salida SVG compone las fórmulas al cargar la página. Un elemento
dentro de un `<details>` cerrado está en el DOM pero **sin dimensiones
calculables**, y las fórmulas pueden salir con tamaño incorrecto al desplegarlo.

No es teórico: es el fallo clásico de MathJax dentro de contenedores ocultos.

Mitigación a decidir en la Fase 3: recomponer al primer despliegue
(`MathJax.typesetPromise` sobre el contenido, una sola vez, al evento `toggle`).
Cuesta unas pocas líneas y elimina la clase entera de fallo.

**Debe verificarse con una fórmula real en Capa 2 antes de cerrar la Fase 3.**

---

## 2. BIBLIOGRAFÍA SIN `jekyll-scholar`

`jekyll-scholar` no está en la lista blanca de Pages (verificado en la Fase 1).
Aunque el build pase a Actions y podría instalarse, **no se usa**: aporta lectura
de BibTeX y estilos CSL, y aquí las referencias se escriben a mano en YAML. Sería
una dependencia grande para un problema pequeño.

### `_data/bibliografia.yml`

Diccionario indexado por clave de cita:

```yaml
lee2018:
  tipo: libro                # libro | articulo | preprint | capitulo | tesis | software | web
  autores: ["Lee, John M."]
  titulo: "Introduction to Riemannian Manifolds"
  anio: 2018
  editorial: "Springer"
  edicion: "2ª"
  doi: "10.1007/978-3-319-91755-9"
  url: null
  verificado: true

carlsson2009:
  tipo: articulo
  autores: ["Carlsson, Gunnar"]
  titulo: "Topology and data"
  publicacion: "Bulletin of the AMS"
  volumen: 46
  numero: 2
  paginas: "255–308"
  anio: 2009
  doi: "10.1090/S0273-0979-09-01249-X"
  verificado: true
```

**Campos obligatorios:** `tipo`, `autores`, `titulo`, `anio`, `verificado`.
**Al menos uno de:** `doi`, `arxiv`, `url`.

### La regla de verificación

`verificado: true` significa que Santiago abrió el DOI o el arXiv y confirmó
autores, título y año. No significa «me suena».

**Una referencia con `verificado: false` no se renderiza en producción.** Aparece
como `TODO(santiago): verificar <clave>` en desarrollo y se lista en
`docs/content-backlog.md`.

Esto implementa CLAUDE.md §2: *«Si una referencia te resulta familiar pero no
puedes verificarla, no la escribas.»* La estructura de datos hace cumplir la
regla en vez de confiar en la disciplina.

### Cómo se cita en el texto

El post declara sus referencias en el front matter, **en el orden en que quiere
numerarlas**:

```yaml
bibliografia: [lee2018, carlsson2009, edelsbrunner2010]
```

Y en el cuerpo:

```
… la homología persistente {% include cita.html key="carlsson2009" %} permite …
```

Renderiza `[2]`, enlazado a `#ref-carlsson2009`.

**Por qué la numeración viene del front matter y no del orden de aparición:**
Liquid no puede mantener estado entre includes de forma fiable, así que contar
apariciones sería frágil. Con el array del front matter, el número es
`índice + 1`: determinista, revisable de un vistazo, y bajo control del autor.

Si se cita una clave que no está en el array, el include lo marca visiblemente
como error en desarrollo en vez de fallar en silencio.

### Cómo se renderiza la lista

Al final del post:

```
{% include bibliografia.html %}
```

Recorre `page.bibliografia`, busca cada clave en `site.data.bibliografia` y
renderiza una lista numerada con `id="ref-<clave>"` en cada entrada, para que los
enlaces de las citas aterricen.

Formato de salida, sin estilo CSL, en español:

> [2] Carlsson, Gunnar (2009). *Topology and data*. Bulletin of the AMS, 46(2),
> 255–308. [doi:10.1090/S0273-0979-09-01249-X](https://doi.org/…)

El DOI siempre es enlace. El texto del enlace es el DOI, nunca «aquí» ni «enlace»
(CLAUDE.md §6).

### Las referencias son compartidas

`_data/bibliografia.yml` es **uno solo para todo el sitio**. Una referencia se
escribe una vez y la citan todos los posts, las líneas de investigación y el CV.
Corregir un año lo corrige en todas partes.

---

## 3. GLOSARIO DE NOTACIÓN

**El problema que resuelve:** en una serie de seis entregas, la misma letra debe
significar lo mismo en todas. Sin un lugar central, `M` es una variedad en la
entrega 1 y una matriz en la 4, y el lector que las lee seguidas se pierde.

### `_data/notacion.yml`

```yaml
variedad:
  simbolo: "M"
  latex: "\\mathcal{M}"
  significado: "Variedad riemanniana suave, compacta y sin borde."
  area: matematicas
  ver_tambien: [metrica, laplaciano]

laplaciano:
  simbolo: "Δ"
  latex: "\\Delta"
  significado: "Operador de Laplace-Beltrami sobre una variedad riemanniana."
  area: matematicas
  nota: "Signo: se adopta el laplaciano geométrico, positivo semidefinido."
  ver_tambien: [variedad]
```

El campo `nota` existe para las convenciones que causan más confusión que el
símbolo — el signo del laplaciano es el ejemplo canónico.

### Uso

En el cuerpo, para la primera aparición de un símbolo:

```
Sea {% include notacion.html key="variedad" %} una variedad …
```

Renderiza el símbolo con su significado accesible mediante `<abbr title="…">`,
que funciona con teclado y con lector de pantalla, y no depende de `hover`.

Al final de un post o de una serie:

```
{% include tabla-notacion.html claves=page.notacion %}
```

Tabla de dos columnas: símbolo y significado.

### Regla de la serie

Todas las entregas de una serie usan las mismas claves. Si una entrega necesita
redefinir un símbolo, **crea una clave nueva** en vez de reutilizar la existente
con otro significado. El fichero es la memoria compartida de la serie.

---

## 4. ENTORNOS MATEMÁTICOS

Cinco: `definicion`, `teorema`, `proposicion`, `demostracion`, `observacion`.

### Decisión pendiente: cómo se marcan

Un entorno matemático contiene markdown de varias líneas, y los includes de
Jekyll no envuelven bloques de markdown de forma natural. Hay dos formas, y
conviene elegir una antes de escribir código.

**Forma A — envoltorio HTML** (el idioma que ya usa este repositorio)

```html
<div class="entorno teorema" markdown="1" id="thm-gauss-bonnet" data-numero="2.1">
**Teorema 2.1 (Gauss-Bonnet).** Para una superficie compacta …
</div>
```

*A favor:* idéntico a las secciones `one-col` y `two-col` de `plantilla-nota.md`,
así que no hay una convención nueva que aprender. Mínima ceremonia. El número es
explícito y por tanto estable.
*En contra:* el número y el rótulo se escriben a mano.

**Forma B — include con `capture`**

```liquid
{% capture cuerpo %}
Para una superficie compacta …
{% endcapture %}
{% include teorema.html id="thm-gauss-bonnet" titulo="Gauss-Bonnet" cuerpo=cuerpo %}
```

*A favor:* numeración automática con `{% increment %}`, rótulo consistente,
un solo sitio donde cambiar el formato de todos los teoremas.
*En contra:* cuatro líneas de ceremonia por teorema. En un post con quince
enunciados, se nota.

**Recomendación: A para escribir, con B disponible.** El repositorio ya habla el
dialecto de A, y el número explícito es lo que hace posibles las referencias
cruzadas (ver abajo).

### Numeración

- **Manual y por secciones** (`2.1`, `2.2`, `3.1`), como en un texto matemático.
- Un contador por sección, no uno global: al insertar un teorema en la sección 2
  no hay que renumerar la 5.
- La numeración automática con `{% increment %}` **funciona**, pero cuenta en
  orden de renderizado y su valor no se puede consultar desde otro punto de la
  página. Sirve para mostrar, no para referenciar.

### Referencias cruzadas

```
… como vimos en {% include ref.html id="thm-gauss-bonnet" %} …
```

Renderiza `Teorema 2.1` enlazado a `#thm-gauss-bonnet`.

**Requiere `data-numero` explícito.** Es la razón de fondo para recomendar la
forma A: con numeración automática, una referencia hacia adelante no puede
conocer el número, porque aún no se ha renderizado.

Convención de identificadores: `thm-`, `def-`, `prop-`, `obs-`, `dem-`, seguido
de un slug descriptivo. `thm-gauss-bonnet`, no `thm-1`.

### Demostraciones y las capas

Una demostración larga es **Capa 2 por defecto**. Se envuelve en `<details>`:

```html
<details class="capa-2" markdown="1">
<summary>Demostración del teorema 2.1</summary>
<div class="entorno demostracion" markdown="1">
…
</div>
</details>
```

Una demostración corta e iluminadora puede quedarse en Capa 1. El criterio es si
aporta comprensión o solo certeza.

### Accesibilidad

- Los entornos usan `<div>`, no encabezados, para no romper la jerarquía de
  `<h1>`–`<h6>` (CLAUDE.md §7).
- El rótulo va en negrita dentro del párrafo, no como título de sección.
- El fin de demostración es `<span class="qed" aria-hidden="true">□</span>`:
  decorativo, oculto al lector de pantalla, que no gana nada oyendo «cuadrado».

---

## 5. FIGURAS

### Dónde vive cada cosa

    scripts/figuras/<slug-del-post>/<nombre>.py     ← el script
    assets/posts/<slug-del-post>/<nombre>.svg       ← la salida

El script vive junto al post que lo usa, no en un cajón común. Al archivar un
post, su carpeta de figuras se archiva con él.

Cada script empieza con un comentario de tres líneas: qué figura genera, dónde la
escribe, y cómo se ejecuta.

### Declaración y uso

En el front matter:

```yaml
figuras:
  - id: fig-toro
    src: /assets/posts/topologia-superficies/toro.svg
    alt: "un toro con su descomposición en celdas resaltada en dos colores"
    script: scripts/figuras/topologia-superficies/toro.py
    caption: "Descomposición celular del toro."
```

En el cuerpo:

```
{% include figura.html id="fig-toro" %}
```

Declararlas en el front matter permite verificar de una pasada que todas tienen
`alt` y `script`, sin recorrer el cuerpo del post.

### `alt`

Describe **qué muestra**, no qué es. `alt` no es el pie de foto.

- Mal: `"Figura 1"`, `"gráfico"`, `"diagrama del toro"`.
- Bien: `"un toro con su descomposición en celdas resaltada en dos colores"`.

Si la figura es puramente decorativa, `alt=""` y fuera del array `figuras`.
Ninguna figura matemática es decorativa.

### Legibilidad en los dos modos

Ahora que el sitio tendrá modo claro y oscuro (decisión de la Fase 1), toda
figura debe leerse en ambos. Por orden de preferencia:

1. **SVG que hereda el color del texto.** Trazos y textos con
   `stroke="currentColor"` / `fill="currentColor"`. Una sola figura, siempre
   correcta, sin CSS adicional. Es la razón principal para preferir SVG.
2. **SVG con variables CSS** para los colores que no pueden ser `currentColor`,
   definidas en el CSS del sitio y por tanto sujetas al tema.
3. **Dos archivos y `<picture>`** con `prefers-color-scheme`. Solo para PNG.
   Duplica el mantenimiento: última opción.

**Nunca** un fondo blanco incrustado en la figura: es el fallo que hace que un
diagrama recorte un rectángulo blanco en mitad de una página oscura.

PNG solo para volumetría real — cortes de resonancia, renders — donde el SVG no
tiene sentido (CLAUDE.md §3).

---

## 6. CHECKLIST DE PUBLICACIÓN DE UN POST TÉCNICO

### Rigor (CLAUDE.md §2)

- [ ] Cada afirmación matemática es trazable a **(a)** una referencia verificada,
      **(b)** una demostración en el texto, o **(c)** código del repositorio que
      la compruebe.
- [ ] Lo que no cumple ninguna de las tres está marcado explícitamente como
      intuición, conjetura o analogía.
- [ ] Toda entrada citada tiene `verificado: true` y DOI, arXiv o URL.
- [ ] Cero referencias «de memoria». Las dudosas están en el backlog, no en el post.
- [ ] Ningún dato inventado: métricas, fechas, atribuciones históricas, enlaces.
- [ ] Ningún `TODO(santiago)` se renderiza en producción.

### Estructura de capas (CLAUDE.md §3)

- [ ] La Capa 0 se sostiene sola: quien solo la lea entiende *por qué* importa.
- [ ] La Capa 1 define antes de usar y trabaja al menos un ejemplo numérico.
- [ ] La Capa 2 está en `<details>`, no borrada.
- [ ] `nivel` declarado y honesto.
- [ ] `prerrequisitos` declarados si los hay.

### Notación

- [ ] Cada símbolo nuevo se introduce con `notacion.html` en su primera aparición.
- [ ] Ningún símbolo contradice a `_data/notacion.yml`.
- [ ] Si el post pertenece a una serie, su notación coincide con la de las demás
      entregas.

### Figuras

- [ ] Toda figura tiene `alt` descriptivo, no «figura N».
- [ ] Toda figura matemática tiene su `script` en `scripts/figuras/`.
- [ ] Comprobada en modo claro **y** en modo oscuro.
- [ ] SVG salvo volumetría real.

### Accesibilidad (CLAUDE.md §7)

- [ ] Un solo `<h1>`; jerarquía de encabezados sin saltos.
- [ ] Los entornos matemáticos no usan encabezados.
- [ ] Navegable por teclado, con foco visible.
- [ ] Sin desplazamiento horizontal en móvil — atención a fórmulas largas y
      tablas anchas.
- [ ] MathJax con salida accesible activada.
- [ ] Texto de enlace descriptivo. Nunca «aquí» ni «leer más» suelto.

### Series y metadatos

- [ ] `serie` y `orden_en_serie` si corresponde.
- [ ] `area` y `genero` correctos.
- [ ] `description` de 160 caracteres o menos.
- [ ] `math: true` si hay fórmulas.
- [ ] Los enlaces a otras entregas de la serie funcionan.

### Antes de publicar

- [ ] El sitio construye sin errores.
- [ ] Verificador de enlaces en verde — incluidos los `<script>` y los `src` de
      assets. *Este paso habría evitado los tres scripts ausentes del §11 de la
      auditoría.*
- [ ] La Capa 2 se despliega y las fórmulas de dentro se ven bien.
- [ ] Impreso a PDF: no se pierde la Capa 2.

---

## Lo que esta guía NO decide

1. **Forma A o B para los entornos matemáticos.** Recomendada la A. Se decide
   al implementar, en la Fase 3.
2. **Mitigación de MathJax dentro de `<details>`.** Hay que verificarla con una
   fórmula real, no darla por buena.
3. **Formato exacto de la lista de referencias.** El propuesto es un estilo
   sobrio en español; si se prefiere APA, IEEE o AMS, se cambia en un solo
   include.
