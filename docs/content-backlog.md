# Contenido pendiente

Fecha: 2026-08-12
Origen: Fases 5 y 5.5 — sección de proyectos y aprobación de fichas.

Lo que falta y **solo Santiago puede aportar**. Nada de esto se inventa
(CLAUDE.md §2). Cada hueco existe en las fichas como `TODO(santiago)`.

---

## Decisiones ya tomadas — no volver a preguntarlas

| Decisión | Valor | Consecuencia |
|---|---|---|
| **Repositorios** | Ninguno se publica como repositorio | Ninguna ficha lleva `enlaces.repo`. No es un hueco pendiente |
| **Cifras** | Ninguna ficha publica números | Las mediciones viven en los papers y los informes |
| **Nombres de terceros** | Ninguno se publica | El trabajo compartido se describe como trabajo de equipo, en plural (CLAUDE.md §9) |
| **Áreas** | `matematicas`, `ciencias-computacionales`, `ia` | Los dominios de aplicación van en `dominio` |
| **Destacados** | Cuatro | tda-segunet, brats-clasico, brats-pipeline, cnn-distribution-shift |
| **Estado de publicación** | Las diez nacen con `draft: true` y `published: false` | No se generan en producción. Para verlas: `jekyll serve --unpublished` |
| **interpolacion-contornos** | Retirada | No se encontró en el repositorio del proyecto: cero rastro de CGAL, Delaunay, Voronoi, visor Plotly o presentación reveal.js en las tres ramas. Los trece fuentes C++ del repositorio son ejemplos de ITK |

---

## Estado de publicación

**Seis publicadas** · charla-laplacianos, cnn-distribution-shift,
geometria-computacional-fundamentos, segmentacion-clasica-et,
serie-redes-neuronales, tda-segunet.

**Cuatro en borrador**, por decisión de Santiago:

| Ficha | Por qué sigue oculta |
|---|---|
| `brats-clasico` | esperando el resultado de SIPAIM |
| `brats-pipeline` | falta el listado de los catorce módulos |
| `denoising-mri` | trabajo pequeño; no merece publicación por ahora |
| `paisaje-tda-dg` | es un panorama del estado del arte, no una publicación todavía |

**Al publicar `paisaje-tda-dg`**, restaurar en `charla-laplacianos` el enlace a
esa ficha: se retiró para no dejar un enlace roto en producción.

---

## Bloqueante para publicar cualquier ficha

**Ninguna ficha se publica mientras tenga un `TODO(santiago)` visible.** El
mecanismo `published: false` lo garantiza hoy; al quitarlo, hay que haber
resuelto los huecos de esa ficha.

---

## Por proyecto

**Nueve de diez no tienen ningún hueco bloqueante.** Lo que queda aquí es
material que enriquecería la ficha, no que impida publicarla — salvo donde se
diga lo contrario.

### brats-pipeline — BLOQUEADA

- [ ] **Listado completo de los catorce módulos.** Hoy la ficha nombra cinco y
      admite que faltan nueve. Es un TODO en medio del texto.

### tda-segunet

- [ ] ¿El paper A (MICCAI) es citable o está en preparación?
- [ ] Confirmar contra la última corrida las cifras que no se publican.
- [ ] Figura de portada.

### brats-clasico

- [ ] Estado del envío a SIPAIM 2026.
- [ ] **Decisión pendiente:** si el artículo se acepta, ¿se añaden las cifras a
      la ficha o se deja el enlace al paper? Hoy la ficha dice «en revisión».
- [ ] Qué figuras son publicables.

### paisaje-tda-dg

- [ ] **Verificación bibliográfica completa.** Ver las referencias retenidas
      más abajo. La ficha describe los temas sin nombrar autores.

### denoising-mri

- [ ] **Por qué es interesante** — la ficha no tiene esa sección.
- [ ] **Limitaciones** — tampoco.
- [ ] Referencia de Ali (2018): la mención se retiró del texto para poder
      publicar. Si aparece el DOI, se añade a `_data/bibliografia.yml` y se
      restaura la atribución.
- [ ] Imagen de portada.

### cnn-distribution-shift

- [ ] El artículo IEEE existe en LaTeX: decidir si se publica y dónde.

### serie-redes-neuronales

- [ ] Publicar el post 02. Está escrito y commiteado, sin publicar, y le faltan
      tres visualizaciones.

### charla-laplacianos · geometria-computacional-fundamentos

Sin huecos pendientes.

---

## Referencias retenidas — pendientes de verificación

Estas atribuciones aparecen en el material de `paisaje-tda-dg`, revisión 2.
**No se han publicado** porque el material salió de búsquedas y CLAUDE.md §2
prohíbe escribir una referencia que no se pueda verificar.

La ficha describe los temas sin nombrar autores. Al verificar cada una contra
su fuente primaria, se añade a `_data/bibliografia.yml` con DOI y se restaura
en el texto.

| Atribución | Tema |
|---|---|
| Bobenko–Suris | programa de geometría diferencial discreta |
| Wardetzky et al. | teorema de «no free lunch» sobre operadores de Laplace discretos |
| Springborn–Schröder–Pinkall | equivalencia conforme |
| Marsden–West | integradores variacionales |
| Bergou et al. | varillas elásticas discretas |
| Solomon et al. | transporte óptimo convolucional (Wasserstein) |
| Mérigot | transporte óptimo semidiscreto |

También pendiente: Ali (2018), retirada del texto de `denoising-mri`.

**Verificadas y ya en `_data/bibliografia.yml`:**
Raya y Udupa (1990), doi:10.1109/42.52980 ·
Bauer y Lesnick (2015), arXiv:1311.3681, comprobada el 2026-08-12.

---

## Deuda de rigor que las visualizaciones saldarían

CLAUDE.md §2 exige que toda afirmación matemática sea trazable a **(a)** una
referencia con DOI, **(b)** una demostración, o **(c)** código ejecutable que
la verifique.

Dos afirmaciones publicadas no cumplen hoy ninguna de las tres. Las
visualizaciones correspondientes las convertirían en la opción (c):

| Afirmación | Ficha | Visualización que la saldaría |
|---|---|---|
| El estimador de varianza de Wiener promedia las varianzas locales porque están infladas en la misma cantidad | denoising-mri | `viz-wiener-varianza` |
| La estabilidad de Bauer–Lesnick acota el cambio del código de barras ante perturbaciones | tda-segunet | ya trazable por (a): arXiv:1311.3681 |

---

## Visualizaciones planificadas

**32 en total**, declaradas en el campo `visualizaciones` de cada ficha, con
qué muestra y qué enseña cada una. Se construyen en una fase posterior.

| Proyecto | Pendientes |
|---|---|
| tda-segunet | 7 |
| brats-clasico | 4 |
| cnn-distribution-shift | 3 |
| denoising-mri | 3 |
| geometria-computacional-fundamentos | 3 |
| paisaje-tda-dg | 3 |
| serie-redes-neuronales | 3 |
| segmentacion-clasica-et | 3 |
| brats-pipeline | 2 |
| charla-laplacianos | 2 |

Tres de las de `serie-redes-neuronales` son las que faltan en el post 02 ya
escrito: `viz-backprop`, `viz-convolution` y `viz-convergence`. Sus contenedores
existen en el texto, marcados como pendientes.

---

## Fuera de la Fase 5

- **Migrar el build a GitHub Actions.** Decidido en la Fase 1, aplazado. Exige
  que Santiago cambie *Settings → Pages → Source* en GitHub.
- **Modo claro.** Decidido en la Fase 1. Los colores ya son variables; las
  variantes claras de los tres acentos están medidas en
  `docs/site-restructure-audit.md`.
- **Construir las 32 visualizaciones.**
