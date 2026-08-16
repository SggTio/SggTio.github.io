---
title: "Mapa del terreno entre topología, geometría y aplicaciones"
description: "Cuatro revisiones sistemáticas convertidas en un mapa navegable de qué se está haciendo dónde, en la intersección entre topología algebraica, geometría diferencial y dominios aplicados."
area: matematicas
dominio: ["Geometría y topología"]
tipo: investigacion
estado: idea
anio: 2026
destacado: false
autoria: "Santiago Gil Gallego"
tecnologias: []

problema: |
  La literatura que cruza topología algebraica y geometría diferencial con
  dominios aplicados está dispersa entre comunidades que no se citan entre sí.

  No existe un mapa navegable de qué se está haciendo dónde.

motivacion: |
  El material ya existe: son cuatro revisiones sistemáticas encargadas como
  trabajo de fondo de la tesis.

  Convertirlo en un grafo navegable es una guía de campo que no existe en
  español, y es la clase de artefacto que demuestra que se ve el panorama
  completo, no solo el propio rincón.

contribucion: |
  Cuatro revisiones sistemáticas:

  **1 · Geometría diferencial moderna aplicada al análisis de forma de tumores
  cerebrales**, organizada por los cuatro cuadrantes. Cubre fundamentos de
  geometría diferencial discreta, geometría espectral, análisis basado en
  curvatura, geodésicas, espacios de formas, geometría conforme, superficies
  mínimas y transporte óptimo, con precedentes clínicos.

  Termina en catorce direcciones candidatas ordenadas por viabilidad para una
  tesis de maestría de tres a seis meses. Las tres primeras: distribuciones de
  curvatura, Shape-DNA y HKS, y laplaciano persistente. **El laplaciano
  persistente quedó identificado como la dirección de mayor apalancamiento**
  dado el trabajo previo en topología.

  **2 · Geometría diferencial en gráficos por computador y procesamiento de
  geometría**, excluyendo deliberadamente imágenes médicas y aprendizaje
  geométrico profundo. Diez áreas temáticas, entre ellas geometría diferencial
  discreta, cálculo exterior discreto, elementos finitos exteriores, los límites
  teóricos de los operadores de Laplace discretos, equivalencia conforme,
  integradores variacionales, varillas elásticas discretas, y transporte óptimo
  convolucional y semidiscreto.

  **3 · Mapa de nichos** en la intersección topología/geometría × dominios
  aplicados: doce clústeres, entre ellos SLAM, fluidos, membranas y anatomía
  computacional.

  **4 · Panorama de geómetras diferenciales activos** en geometría aplicada y
  computacional.

limitaciones: |
  **Ninguna referencia de este material se publica sin verificar.**

  Las cuatro revisiones salieron de búsquedas, y cada cita necesita
  comprobación contra la fuente primaria antes de aparecer en el sitio. Los
  resultados nombran autores concretos para casi todos los temas de la revisión
  2; esas atribuciones están retenidas en `docs/content-backlog.md` y no se
  publican aquí hasta tener DOI verificado, según la sección 2 de CLAUDE.md.

  Por eso esta ficha describe **los temas** que cubre cada revisión y no
  reproduce todavía su bibliografía.

visualizaciones:
  - id: viz-grafo-paisaje
    titulo: "El grafo navegable"
    seccion: contribucion
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      El artefacto central del proyecto: un grafo donde los nodos son métodos
      matemáticos y dominios de aplicación, y las aristas son trabajos que los
      conectan. Filtrable por comunidad. Al pinchar un nodo se ve qué se hace
      ahí y qué está sin explorar.
    ensena: |
      Dónde están los huecos. Un grafo hace visible la ausencia de aristas
      entre comunidades, que es justo el punto del proyecto.

  - id: viz-cuadrantes
    titulo: "Los cuatro cuadrantes"
    seccion: contribucion
    tipo: figura
    estado: pendiente
    que_muestra: |
      La rejilla 2×2 —topología algebraica y geometría diferencial, con y sin
      redes neuronales— con los trabajos revisados colocados en su celda. Es la
      taxonomía que organiza la tesis entera.
    ensena: "Cómo se ordena un campo disperso en cuatro casillas."

  - id: viz-viabilidad
    titulo: "Catorce direcciones, ordenadas por viabilidad"
    seccion: contribucion
    tipo: figura
    estado: pendiente
    que_muestra: |
      Las catorce direcciones candidatas situadas en dos ejes: esfuerzo
      estimado y apalancamiento sobre el trabajo previo. Se ve por qué el
      laplaciano persistente queda en la esquina buena.
    ensena: "Cómo se eligió la dirección de la tesis, y no fue por gusto."
---
