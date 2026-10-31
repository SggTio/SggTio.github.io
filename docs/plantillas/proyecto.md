---
# PLANTILLA · ficha de proyecto (layout proyecto, voz técnica, ficha al margen)
# Cópiala a _proyectos/slug.md → URL /proyectos/slug/ (sin fecha: el año va en anio).
# Obligatorios: title, description, autoria, estado, anio, area, tipo.
# La narración va en campos del front matter (Markdown), no en el cuerpo: cada
# campo vacío o ausente oculta su sección. En esos campos Liquid NO funciona:
# los enlaces internos, con la ruta tal cual: [texto](/mates/AAAA-MM-DD-slug/).
title: "TODO(santiago): título del proyecto"
description: "TODO(santiago): la frase de entrada (160 caracteres como mucho): bajo el título, en /proyectos/ y en los buscadores."
autoria: "TODO(santiago): quién hizo el proyecto (sale bajo el título; CLAUDE.md §9)"
# nota_autoria: "…"     # frase entera cuando hace falta delimitar quién hizo qué

# ---- Ficha del margen: solo sale lo que se escriba aquí (D7: sin repositorio) ----
estado: en-desarrollo   # idea | en-desarrollo | activo | terminado | archivado
anio:                   # TODO(santiago): año de inicio, en número. Ordena /proyectos/
# anio_fin:             # año de fin; sin él, el proyecto sigue en curso
area:                   # TODO(santiago): matematicas | ciencias-computacionales | ia. Sin área no sale en /proyectos/
tipo:                   # TODO(santiago): investigacion | software | experimento | visualizacion | infraestructura | divulgacion
dominio:                # texto legible, uno o varios: alimenta «Por dominio» en /proyectos/
  - "TODO(santiago): dominio"
tecnologias:            # texto legible; también salen en la fila de /proyectos/
  - "TODO(santiago): tecnología"
# enlaces:              # salen en la ficha con texto descriptivo. Nunca el repositorio (D7)
#   demo: https://…         # «Demostración interactiva»
#   publicacion: https://…  # «Publicación» (DOI)
#   paper: https://…        # «Artículo en arXiv»
# imagenes:             # portada bajo la ficha: la marcada principal, o la primera
#   - src: /assets/proyectos/SLUG/portada.svg
#     alt: "TODO(santiago): qué muestra la imagen"
#     caption: "…"      # opcional
#     principal: true
# math: true            # si algún campo lleva fórmulas

# ---- Narración: Capa 0, Capa 1 y Capa 2 (CLAUDE.md §3). Encabezados fijos e impersonales (D7) ----
resumen: |              # sin encabezado, tras la ficha: amplía la entrada (opcional)
  TODO(santiago): un párrafo que amplía la entrada.
problema: |             # → «El problema»
  TODO(santiago): qué problema existe en el mundo.
motivacion: |           # → «Por qué es interesante»
  TODO(santiago): por qué importa resolverlo.
contribucion: |         # → «Qué se hizo». En plural si el trabajo es compartido (CLAUDE.md §9)
  TODO(santiago): qué se hizo y, si es trabajo de equipo, cuál fue la parte de Santiago.
enfoque_matematico: |   # → Capa 2, desplegable «Las matemáticas que usa»
  TODO(santiago): las matemáticas que usa.
enfoque_computacional: |  # → Capa 2, desplegable «Cómo está implementado»
  TODO(santiago): cómo está implementado.
resultados: |           # → «Qué se obtuvo». Solo cifras que existan, tal cual; sintético es sintético (CLAUDE.md §10)
  TODO(santiago): qué se obtuvo.
limitaciones: |         # → «Limitaciones»
  TODO(santiago): qué no funciona o no se sabe.
aprendizajes: |         # → «Qué se aprendió»
  TODO(santiago): qué se aprendió.
proximos_pasos: |       # → «Qué falta»
  TODO(santiago): qué falta.

# ---- Plan visual: en local, un recuadro donde irá cada visualización; en producción, nada ----
visualizaciones:
  - id: viz-NOMBRE
    titulo: "TODO(santiago): nombre de la visualización"
    seccion: problema   # problema | motivacion | contribucion | enfoque_matematico | enfoque_computacional | resultados | limitaciones | aprendizajes | proximos_pasos
    tipo: figura        # interactiva | figura | animacion
    estado: pendiente   # pendiente | hecha (hecha: el recuadro desaparece)
    que_muestra: |
      TODO(santiago): qué se ve en ella.
    ensena: "TODO(santiago): qué debe entender el lector al verla, en una frase."

# ---- Publicación ------------------------------------------------------------
# La colección nace en borrador (_config.yml pone draft: true y published: false).
# Para verla en local: bundle exec jekyll serve --unpublished
# Para publicarla, sin ningún TODO(santiago) y, si tiene coautores, con su
# permiso confirmado (CLAUDE.md §9): draft: false y published: true.
draft: true
published: false
# destacado: false      # del modelo; hoy no lo pinta nada (la portada es el mosaico)
# bibliografia: []      # claves de _data/bibliografia.yml; hoy no se pinta
---
{%- comment -%}
  FICHA DE PROYECTO · cómo se arma (layout _layouts/proyecto.html)
  (Este comentario no lleva líneas en blanco a propósito: si las llevara,
  Jekyll avisaría «Excerpt modified» en cada build.)
  · Todo sale del front matter, en este orden: título · autoría · aviso de
    borrador (solo en local) · description como entrada · ficha al margen
    (estado, año, área, tipo, dominio, tecnologías, enlaces) · nota_autoria
    · portada · resumen · El problema · Por qué es interesante · Qué se hizo
    · Capa 2 plegada (Las matemáticas que usa · Cómo está implementado) ·
    Qué se obtuvo · Limitaciones · Qué se aprendió · Qué falta · y, al
    final, el cuerpo de este archivo.
  · Los campos narrativos son Markdown: párrafos, listas, ### y #### (no
    ##: los H2 los pone el layout), fórmulas con math: true, y columnas con
    <section class="two-col" markdown="1"> como en las fichas reales.
  · El cuerpo, debajo de este comentario, es libre: para lo que no encaje
    en el esquema. Si no hace falta, déjalo vacío.
{%- endcomment -%}
