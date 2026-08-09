# Contenido pendiente

Fecha: 2026-08-07
Origen: Fase 5 — sección de proyectos.

Lo que falta y **solo Santiago puede aportar**. Nada de esto se inventa
(CLAUDE.md §2). Cada hueco existe en las fichas como `TODO(santiago)`.

---

## Decisiones ya tomadas — no volver a preguntarlas

| Decisión | Valor | Consecuencia |
|---|---|---|
| **Repositorios** | Ninguno se publica como repositorio | Ninguna ficha lleva `enlaces.repo`. No es un hueco pendiente |
| **Cifras** | Ninguna ficha publica números | Las mediciones viven en los papers y los informes |
| **Coautores** | Permiso concedido | Aparecen en la cabecera de su ficha, no en pie de nota |
| **Áreas** | `matematicas`, `ciencias-computacionales`, `ia` | Los dominios de aplicación van en `dominio` |
| **Destacados** | Cinco | tda-segunet, brats-clasico, brats-pipeline, interpolacion-contornos, cnn-distribution-shift |
| **Estado de publicación** | Las once nacen con `draft: true` y `published: false` | No se generan en producción. Para verlas: `jekyll serve --unpublished` |

---

## Bloqueante para publicar cualquier ficha

**Ninguna ficha se publica mientras tenga un `TODO(santiago)` visible.** El
mecanismo `published: false` lo garantiza hoy; al quitarlo, hay que haber
resuelto los huecos de esa ficha.

---

## Por proyecto

### tda-segunet

- [ ] **Los cuatro cuadrantes están vacíos.** La tabla existe pero no hay
      contenido para las celdas. Qué va en «topología algebraica sin redes»,
      «con redes», y lo mismo para geometría diferencial.
- [ ] Estado actual del roadmap de 9 pasos y qué cuadrantes siguen pendientes.
- [ ] ¿El paper A (MICCAI) es citable o está en preparación?
- [ ] Confirmar las cifras retiradas contra la última corrida, para el paper.
- [ ] Figura de portada.

### brats-clasico

- [ ] Estado del envío a SIPAIM 2026.
- [ ] Qué figuras son publicables.
- [ ] Estado de generación de figuras y consolidación de reportes.
- [ ] **Decisión pendiente:** si el artículo se acepta, ¿se añaden las cifras a
      la ficha o se deja el enlace al paper? Hoy la ficha dice «en revisión».

### paisaje-tda-dg

- [ ] **Verificación bibliográfica completa antes de publicar.** Este material
      salió de búsquedas. Ver la sección de referencias retenidas, abajo.
- [ ] Decidir formato: página interactiva, serie de posts, o ambas.

### brats-pipeline

- [ ] Nombre del compañero de equipo que hizo el registro, si quiere aparecer.
- [ ] Listado completo de los catorce módulos. Hoy hay cinco identificados.
- [ ] ¿Se publica como repositorio abierto? *(La decisión global dice que no;
      confirmar si este es excepción.)*

### interpolacion-contornos

- [ ] **Qué parte hizo Santiago exactamente.** La ficha lo pide en la cabecera
      y hoy lleva un TODO visible. Es lo más urgente de esta ficha: el proyecto
      es de Abel Albuez Sanchez y la atribución debe ser precisa.
- [ ] Dónde alojar el visor 3D de unos 20 MB. Probablemente no en el
      repositorio del sitio.

### cnn-distribution-shift

- [ ] El artículo IEEE existe en LaTeX: decidir si se publica y dónde.

### denoising-mri

- [ ] **Por qué es interesante** — la ficha no tiene esa sección.
- [ ] **Limitaciones** — tampoco.
- [ ] **Qué falta** — tampoco.
- [ ] Referencia completa de Ali (2018), verificada contra la fuente primaria.
- [ ] Imagen de portada.

### serie-redes-neuronales

- [ ] Publicar el post 02. Está escrito y commiteado, sin publicar, y le faltan
      tres visualizaciones.
- [ ] Decidir si la serie continúa hacia el territorio de la tesis.

### charla-laplacianos

- [ ] **Dónde se presentó, ante qué audiencia y con qué duración.** Sin esto la
      ficha se queda en una línea.
- [ ] ¿Hay diapositivas o grabación enlazables?

### geometria-computacional-fundamentos

- [ ] Destino final: ficha de proyecto, serie de notas en Escritos, o ambas.

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

También pendientes: Ali (2018) en `denoising-mri`, y Bauer–Lesnick (2015) en
`tda-segunet`.

**Verificada y ya en `_data/bibliografia.yml`:** Raya y Udupa (1990),
doi:10.1109/42.52980.

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
| La estabilidad de Bauer–Lesnick acota el cambio del código de barras ante perturbaciones | tda-segunet | `viz-estabilidad` |

---

## Visualizaciones planificadas

**33 en total**, declaradas en el campo `visualizaciones` de cada ficha, con
qué muestra y qué enseña cada una. Se construyen en una fase posterior.

| Proyecto | Pendientes |
|---|---|
| tda-segunet | 7 |
| brats-clasico | 4 |
| interpolacion-contornos | 4 |
| cnn-distribution-shift | 3 |
| denoising-mri | 3 |
| geometria-computacional-fundamentos | 3 |
| paisaje-tda-dg | 3 |
| serie-redes-neuronales | 3 |
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
- **Construir las 33 visualizaciones.**
