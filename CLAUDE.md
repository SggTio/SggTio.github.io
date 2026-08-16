# Un Santajaro — reglas de trabajo

Este archivo lo lees **al inicio de cada sesión**. Sus reglas están por encima de
cualquier instrucción puntual que reciba después, salvo que Santiago diga
explícitamente "ignora la regla X de CLAUDE.md".

---

## 0. Protocolo de aprobación — LA REGLA MÁS IMPORTANTE

Antes de **crear, modificar o eliminar cualquier archivo**:

1. Presenta una tabla de intención:

   | Archivo | Acción | Por qué | Riesgo |
   |---|---|---|---|
   | `_config.yml` | modificar | corregir `description` | bajo |

2. Para archivos no triviales, muestra el contenido nuevo o el diff **antes** de escribirlo.
3. **DETENTE.** Espera aprobación explícita, ítem por ítem. "Sigue" o "ok" a secas
   no es aprobación de una tabla de 12 filas: pide que te diga cuáles sí y cuáles no.
4. Implementa **solo** lo aprobado. Nada más, aunque sea obvio o trivial.
5. Reporta lo hecho y **propón** el mensaje de commit. No commitees por tu cuenta.

**Nunca, bajo ninguna circunstancia:**

- `git push`
- `git commit` sin aprobación explícita del mensaje
- `git reset --hard`, `git checkout .`, `git clean` u otro comando que descarte trabajo
- eliminar archivos de contenido (posts, páginas, imágenes)
- tocar `CNAME` o la configuración de dominio

Si Santiago rechaza un ítem, **no lo reintroduzcas** en una fase posterior sin preguntar.
Si detectas riesgo de pérdida de contenido, credenciales o un cambio irreversible: **para y pregunta**, aunque ya tengas luz verde para la fase.

---

## 1. Identidad del sitio (no negociable)

- **Nombre:** Un Santajaro. No se cambia.
- **Autor:** Santiago Gil Gallego. Matemático computacional.
- **Idioma principal:** español. No implementes i18n completo si el repo no lo tiene.
- **Voz:** personal, curiosa, intelectualmente seria, sobria, ocasionalmente poética.
  Sin grandilocuencia. Sin lenguaje corporativo.
- **Paleta de colores, tipografía e identidad gráfica: se conservan.**
  Puedes ajustar espaciados, jerarquía tipográfica, grillas, tarjetas, navegación,
  legibilidad y accesibilidad. No puedes sustituir la estética por una corporativa,
  minimalista genérica o tipo LinkedIn.
- **Modo oscuro y responsive existentes: se preservan.**

### Frases protegidas

Estas tres frases son parte de la identidad. No se editan, no se reemplazan por
lenguaje profesional, no se mueven a un pie de página:

> "Estudié matemáticas, porque quiero ser poeta."
>
> "Quisiera ser psiquiatra de máquinas, para interpretar sus sueños."
>
> "Me sueño con una panadería."

### Principio narrativo

La estructura conceptual del sitio es: **Matemáticas → Software → Inteligencia artificial**.

Santiago no se presenta como una acumulación de tecnologías ni como "un ingeniero
que hace muchas cosas", sino como un matemático computacional que convierte ideas
matemáticas en investigación, software, experimentos y explicaciones.

---

## 2. Regla de rigor matemático

Toda afirmación matemática publicada en el sitio debe ser trazable a **una** de estas tres cosas:

- **(a)** una referencia real en `_data/bibliografia.yml`, con DOI o arXiv ID verificable;
- **(b)** una demostración escrita en el propio texto o en su apéndice;
- **(c)** código ejecutable en el repo que la verifique.

Si una afirmación no cumple ninguna, se marca explícitamente como intuición,
conjetura o analogía — o no se escribe.

### Prohibido inventar

Nunca inventes: referencias, DOIs, autores, años de publicación, teoremas,
atribuciones históricas, métricas, resultados experimentales, nombres de empresas,
cargos, fechas, titulaciones ni enlaces.

Cuando falte un dato: `TODO(santiago): <qué falta exactamente>`.
Los `TODO` no deben renderizarse en producción — filtra por `draft: true` o
por un condicional de entorno.

Si una referencia te resulta familiar pero no puedes verificarla, **no la escribas**.
Anótala en `docs/content-backlog.md` como pendiente de verificación.

---

## 3. Rigor y divulgación: el modelo de tres capas

Todo texto técnico se organiza en tres capas. Un lector debe poder abandonar al
final de cualquier capa y llevarse algo completo.

- **Capa 0 — La idea.** Gancho, motivación, analogía, una figura. Cero fórmulas
  más allá del mínimo. Si el lector solo lee esto, entiende *por qué* importa.
- **Capa 1 — El desarrollo.** Cuerpo principal. Definiciones precisas, teoremas
  enunciados y citados (no necesariamente demostrados), ejemplos numéricos
  trabajados paso a paso.
- **Capa 2 — Los detalles.** Colapsable o en apéndice. Demostraciones,
  derivaciones, casos borde, complejidad, código completo.

Front matter que soporta esto:

```yaml
nivel: divulgativo | intermedio | tecnico
prerrequisitos: [homologia-persistente, geometria-riemanniana]
```

La divulgación **no** es una versión diluida del contenido técnico: es la Capa 0.
El rigor no se logra quitando analogías, sino añadiendo Capa 2.

### Compatibilidad con la skill de divulgación

Santiago tiene una skill (`science-outreach-blog`) que genera posts con este front matter:

```yaml
layout: post
title: "..."
date: YYYY-MM-DD
categories: [...]
tags: [...]
math: true
```

El esquema de posts del sitio debe **aceptar esto sin fricción y extenderlo**,
nunca reemplazarlo. Los campos nuevos (`nivel`, `serie`, `prerrequisitos`,
`repositorio`, `bibliografia`) son todos opcionales con valores por defecto.

### Figuras

- SVG siempre que sea posible; PNG solo para volumetría real.
- Toda figura matemática se genera desde código en `scripts/figuras/`, no a mano.
  El script vive junto a la figura y se referencia en el post.
- `alt` obligatorio y descriptivo (no "figura 1": describe qué muestra).
- Las figuras deben ser legibles en modo claro y oscuro.

---

## 4. Restricciones técnicas

- **No cambies de framework.** Jekyll se queda. Refactorización incremental.
- **Build de GitHub Pages nativo = safe mode.** Solo plugins de la lista del gem
  `github-pages`. `jekyll-archives`, `jekyll-scholar` y `jekyll-assets`
  **no** están en esa lista. `jekyll-feed`, `jekyll-sitemap`, `jekyll-seo-tag`
  y `jekyll-redirect-from` **sí**.
- Antes de proponer cualquier plugin: **verifica** que esté en la lista blanca
  contra `https://pages.github.com/versions/`. Si no está, propón la alternativa
  sin plugin (Liquid puro) **y** la opción de migrar a GitHub Actions, con costos,
  como decisión separada que Santiago debe aprobar.
- **No rompas rutas existentes.** Usa `jekyll-redirect-from` para aliases.
  Inventaría toda URL viva antes de mover nada.
- **Conserva el mecanismo de despliegue actual** salvo decisión explícita en contrario.
- Verifica que el sitio siga construyendo después de cada fase.

---

## 5. Contenido: qué se puede tocar

- **Posts de prueba** (`file1`, `file2`, titulados "Un ensayo de prueba" /
  "otro ensayo de prueba", en `mates`, `notas` y `escritos`): son placeholders.
  Se pueden retirar, pero **propónlo como ítem aprobable aparte**, listando ruta
  exacta y la redirección correspondiente.
- **Posts reales** (`2026-04-14-fundamentos-redes-neuronales`,
  `charlas/laplacianos_tumores`): puedes proponer cambios de **front matter**
  para adaptarlos al esquema nuevo. **No edites el cuerpo** sin aprobación
  específica del contenido concreto.
- Ningún otro contenido se elimina. Migrar y reorganizar, sí; borrar, no.

---

## 6. Estilo prohibido

No uses nunca:

- barras de progreso de habilidades, porcentajes, estrellas, rankings de tecnologías
- "apasionado por la innovación", "experto multidisciplinario", "soluciones de clase
  mundial", "rockstar", "gurú", "líder visionario", "sinergia", "disruptivo"
- emojis decorativos en encabezados o navegación
- animaciones que no aporten información (respeta `prefers-reduced-motion`)
- texto de enlace no descriptivo ("click aquí", "leer más" suelto)

---

## 7. Accesibilidad — mínimos por fase

Cada fase que toque plantillas verifica antes de cerrar:

- HTML semántico (`<main>`, `<article>`, `<nav>`, `<section>`)
- jerarquía de encabezados ordenada, un solo `<h1>` por página
- contraste suficiente **sin cambiar la paleta** (ajusta pesos y tamaños, no tonos)
- navegación por teclado con foco visible
- `alt` en toda imagen
- sin desplazamiento horizontal en móvil
- fórmulas accesibles (MathJax con salida accesible activada)

---

## 8. Flujo de git

- Rama por fase: `restructure/<n>-<nombre>`
- Tag antes de empezar todo: `pre-restructure`
- Un commit por fase aprobada, con el mensaje que propusiste y Santiago aceptó
- Nunca `push`

---

## 9. Autoría y trabajo colaborativo

Varios de los trabajos de este sitio son colaborativos, y en al menos uno Santiago
no es el autor principal. Esto no se maneja con un pie de nota.

- **Por defecto no se nombra a nadie más que a Santiago.** El trabajo compartido se
  describe como trabajo de equipo. Un nombre propio solo aparece si Santiago confirma
  que esa persona quiere aparecer.
- No nombrar a nadie **no autoriza a apropiarse del trabajo**. Cuando Santiago no
  lideró un proyecto, la ficha lo dice en el encabezado y delimita cuál fue su
  contribución, aunque sea sin nombres. Si esa delimitación no está en el material,
  es `TODO(santiago)` — no la infieras ni la suavices.
- **Habla en plural del trabajo compartido**: "comparamos", "estudiamos", "miramos".
  Nunca primera persona del singular para describir lo que hizo un equipo.
- Los encabezados de plantilla van en impersonal —"Qué se hizo"— porque sirven igual
  para trabajo propio y compartido.
- Ningún proyecto con coautores se publica (`draft: false`) sin que Santiago confirme
  que tiene permiso. Si no hay confirmación, sigue en borrador.

## 10. Cifras, embargo y sobreventa

- **Toda cifra de este repositorio es provisional.** Las métricas provienen de corridas
  concretas que pueden estar superadas. No las redondees, no las reformules, no derives
  números nuevos a partir de ellas, no las conviertas en porcentajes ni en
  comparaciones que el material no hace. Si necesitas un número que no está, es
  `TODO(santiago)`.
- **Trabajo sin publicar.** Cualquier resultado asociado a un paper en revisión o en
  preparación no se publica sin decisión explícita de Santiago. Por defecto: método,
  motivación y limitaciones sí; cifras no.
- **No promuevas el alcance de un resultado.** Sintético es sintético; un experimento
  no es un hallazgo clínico; un ejemplo de juguete no es una validación. Si el material
  de origen dice "dataset sintético", el texto publicado dice "dataset sintético".
- **No sobrevendas la matemática.** Si un método se reduce por construcción a algo más
  simple de lo que su nombre sugiere, el texto lo dice. Un revisor que abra el código
  debe encontrar exactamente lo que la página prometía.
- **Ninguna referencia bibliográfica se publica sin verificación contra la fuente
  primaria**, con DOI o arXiv ID. Esto incluye las referencias que vengan en material
  que Santiago te entregue: el material de origen no es verificación.
