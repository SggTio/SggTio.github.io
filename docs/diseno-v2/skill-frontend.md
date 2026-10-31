# Skill `santajaro-frontend` frente al diseño v2 · cambios propuestos

**Propuesta, no aplicada.** La skill vive en `docs/skills/santajaro-frontend/` de la copia
principal, sin commitear (trabajo de Santiago): esta rama no la contiene ni la toca. Revisada
en solo lectura el 2026-10-31 (versión 1.0.0). Los números de línea son los de esa versión.
Contexto: `README.md` de esta carpeta.

---

## `references/identidad.md`

### Fuentes de verdad (l. 9–14): cinco rutas ya no existen o cambiaron de papel

| Hoy dice | Proponer |
|---|---|
| Tokens y temas: `_sass/_variables.scss` | `_sass/_tokens.scss` (tokens y temas). Los nombres viejos son alias en `_sass/_compat.scss`, solo para CSS heredado. |
| Acentos y composición por género: `_sass/_custom.scss` | Acento: `_sass/_v2-esqueleto.scss` (`body.section-*`). Voz por sección y género: `_includes/voz.html` + `_sass/_v2-articulo.scss`. Ajustes por área: `_sass/_ajustes-*.scss`. |
| Anchura general: `_sass/_layout.scss` | `.contenedor` en `_sass/_v2-esqueleto.scss`; medidas por voz, columna de margen y pliegues en `_sass/_v2-articulo.scss`. |
| Jerarquía tipográfica: `_sass/_type.scss` | `_type.scss` sigue, pero solo con la tipografía neutral; las clases del sistema (`.titulo-mates`, `.meta`, `.rotulo`…) están en `_sass/_tokens.scss` y las voces en `_sass/_v2-articulo.scss`. |
| Navegación: `_sass/_masthead.scss` y `_layouts/default.html` | `_sass/_v2-esqueleto.scss` y `_layouts/default.html`. |
| Componentes: `_sass/_componentes.scss` e `_includes/` | Igual, añadiendo que `_componentes.scss` está sobrescrito desde los `_v2-*` y `_ajustes-*`, y dos fuentes nuevas: `docs/diseno-v2/README.md` (cómo se aplica) y `docs/diseno-v2/sistema/` (el sistema de referencia; sus previews traen datos inventados). |

### Patrones que se conservan (l. 21–27)

| Hoy dice | Proponer |
|---|---|
| «Tipografía de sistema y ritmo editorial sobrio.» | «Tipografía del sistema v2, autoalojada: Literata (voz de lectura), IBM Plex Sans (voz técnica), IBM Plex Mono (fechas, meta, rótulos, código) y Silkscreen (solo guiños píxel). Ritmo editorial sobrio.» |
| «Columna general de `45rem`; `layout-wide` de `62rem`; notas de `52rem`; cuentos de `36rem`; poemas con cuerpo interior cercano a `38rem`.» | «Contenedor de 1120px. La medida la fija la voz: 66ch Mates, 58ch Escritos, Sobre mí y ensayos, 72ch voz técnica (Proyectos, Notas, resto), con una columna de margen de 17rem que se pliega al texto por debajo de 1040/1090/1140px según la voz. Figuras en `encolumna`, `ancho` (texto + margen) o `completo` (1056px). `layout-wide` ya no cambia anchos.» |
| «Navegación principal visible y tarjetas de proyectos con título descriptivo.» | «Navegación principal visible. Listas, no tarjetas: índices, archivo y proyectos son listas tipográficas (`ul.lista`, `ul.lista.proyectos`) cuyo único enlace es un título descriptivo.» |
| «Artículos técnicos, notas, cuentos y poemas conservan composiciones distintas.» | «Tres voces (`voz-mates`, `voz-escritos`, `voz-tecnica`) en el `article.articulo`; el acento lo pone `body.section-*`. Una nota con `genero: ensayo` se lee en la voz de Escritos.» |
| «Tema oscuro por defecto y tema claro elegido por el lector.» | Igual, más: «sin atributo = oscuro, `data-theme="light"` = claro; en Sass `:root:not([data-theme="light"])` y `:root[data-theme="light"]`.» |

Añadir: «Guiños píxel solo en índice, ficha, tiles y listas de Sobre mí/Notas. Un cursor
parpadeante por pantalla como máximo (4 ciclos y fijo; quieto con `prefers-reduced-motion`).»

### Tres funciones del color (l. 32–45)

- Punto 1, hoy «usa `--accent-azulgris`, `--accent-crema` y `--accent-verde` según la sección»:
  proponer «usa `--acento`, que hereda el acento de la sección (Mates azulgris; Escritos, Notas y
  Sobre mí crema; Proyectos verde; el resto azulgris). Los acentos con nombre son `--azulgris`,
  `--crema`, `--verde`; los `--accent-*` son alias de compatibilidad, no para CSS nuevo. El acento
  es señal (H2, nav activa, hover, selección, foco), nunca relleno.»
- Añadir: «`--acento` y `--accent-color` viven en `body`, no en `<html>`. No definas
  `--accent-color` en `:root`: las visualizaciones de avances dependen de no encontrarlo ahí.»
- Añadir: «Sobre el lienzo oscuro fijo de las visualizaciones (`.viz-stage`), el texto usa
  `--lienzo-tinta`, `--lienzo-tinta-tenue` y `--lienzo-azulgris`; fuera de él, tokens del tema.»
- «No añadas tonos para resolver contraste sin aprobación» se mantiene. Los `--lienzo-*` no son
  tonos nuevos: repiten valores del tema oscuro.
- Añadir: «La desaturación del tema oscuro solo va en fotos decorativas (`.foto-decorativa`),
  nunca en figuras de datos ni médicas.»

---

## `references/componentes.md`

- **Movimiento (l. 42–45)**, hoy «Una animación empieza por acción del lector»: choca con
  `_includes/figura.html` (un `.mp4`/`.webm` sale como bucle sin sonido que arranca solo, con
  controles y quieto con reduced-motion, como pide el componente Figura) y con el cursor de D5.
  Proponer: «Una animación explicativa empieza por acción del lector. Excepciones: los bucles
  cortos tipo gif de `figura.html` (sin sonido, con controles, quietos con
  `prefers-reduced-motion`) y el cursor de bloque.» **Pendiente de Santiago** (README §13.2): si
  decide lo contrario, se cambia `figura.html`, no la skill.
- **Contrato común (l. 33–35)**, tras «Usa selectores relativos a la raíz del componente»: añadir
  «lee las variables CSS con `getComputedStyle` de esa raíz, no de `document.documentElement`
  (así hereda `--acento`), y redibuja al observar `data-theme` en `<html>`. Los oyentes de foco
  van en un contenedor HTML o en el documento, nunca en un SVG (Chromium lo vuelve enfocable
  entero).»
- **Visualización de datos (l. 58–63)**: añadir «Los colores de interfaz salen de los tokens; el
  texto sobre `.viz-stage` usa `--lienzo-*`. Rótulos en `var(--font-sans)`, cifras y ejes en
  `var(--font-mono)`; nada de pilas SFMono ni pesos que el sitio no trae (Plex Sans 400/500/600,
  cursiva solo 400; Plex Mono 400/500).»
- **Medios matemáticos (l. 65–70)**: añadir la integración v2: imágenes y vídeos con
  `_includes/figura.html` (`src`, `alt` obligatorio, `pie`, `numero`, `ancho` = `encolumna` |
  `ancho` | `completo`, `poster`, `controles`, `ancho_px`/`alto_px`); ecuaciones numeradas con
  `_includes/ecuacion.html`; visualizaciones interactivas a ancho `ancho`; `decorativa=true`
  nunca en figuras de datos ni médicas.

---

## Fuera de esos dos archivos

- `SKILL.md` l. 86–87, «Prefiere controles HTML nativos, no inicies movimiento automáticamente»:
  la misma contradicción del movimiento; se resuelve con la misma decisión.
- `SKILL.md` l. 77, «Conserva los tokens existentes»: sigue valiendo, con los nombres v2.
- `references/evaluacion.md` y `references/matematica-visible.md` no citan parciales, tokens ni
  anchos retirados.
