---
layout: page
title: Banco de componentes
permalink: /desarrollo/
sitemap: false
robots: noindex, nofollow
section: desarrollo

# ---------------------------------------------------------------------------
#  DATOS DE EJEMPLO — solo para esta página
#
#  Son inventados a propósito y NO salen de aquí: no hay ningún archivo de
#  proyecto ni de investigación falso en el repositorio (CLAUDE.md §2).
#  Esta página no existe en producción.
# ---------------------------------------------------------------------------

ejemplo_proyecto:
  title: "Proyecto de ejemplo con nombre razonablemente largo"
  url: "/desarrollo/"
  description: "Una frase que explica de qué va el proyecto, del largo que suele tener una descripción real de las que caben en una tarjeta."
  resumen: "Este es el párrafo narrativo, más largo que la descripción. Aparece en la portada, donde hay sitio, y no en las tarjetas del índice."
  anio: 2024
  anio_fin: 2026
  estado: activo
  tipo: investigacion
  area: matematicas
  tecnologias: [Python, PyTorch, CGAL, "C++"]
  draft: true
  enlaces:
    repo: "https://github.com/SggTio"
    demo: "https://example.org"
    publicacion: "https://doi.org/10.0000/ejemplo"

ejemplo_linea:
  title: "Línea de investigación de ejemplo"
  url: "/desarrollo/"
  slug: ejemplo
  description: "Qué se investiga en esta línea, en una frase."
  estado: activo
  desde: 2024
  metodos: ["homología persistente", "laplacianos", "curvatura discreta"]
  draft: false
  preguntas_abiertas:
    - pregunta: "¿Una pregunta que sigue abierta?"
      estado: abierta
    - pregunta: "¿Una que ya tiene respuesta?"
      estado: respondida

ejemplo_eventos:
  - desde: 2024
    titulo: "Un evento en curso"
    subtitulo: "Institución"
    descripcion: "Una descripción **en markdown**, opcional."
  - desde: 2020
    hasta: 2023
    titulo: "Un evento terminado"
    subtitulo: "Otra organización"

ejemplo_etiquetas: [topología, "homología persistente", laplacianos, MRI]
---

{% if jekyll.environment == "production" %}

Esta página solo existe en desarrollo.

{% else %}

<p class="lead">
Los once componentes de la Fase 4, con datos de ejemplo. Esta página está
excluida del sitemap, marcada <code>noindex</code> y no se renderiza en
producción. Los datos de proyecto y de investigación son inventados y viven
solo en el front matter de este archivo.
</p>

{% include encabezado-seccion.html titulo="insignia-estado" descripcion="Parámetro: estado. Los cinco valores posibles." %}

<p>
{% include insignia-estado.html estado="idea" %}
{% include insignia-estado.html estado="en-desarrollo" %}
{% include insignia-estado.html estado="activo" %}
{% include insignia-estado.html estado="terminado" %}
{% include insignia-estado.html estado="archivado" %}
</p>

{% include encabezado-seccion.html titulo="aviso-borrador" descripcion="Parámetros: draft, nota. Invisible en producción." %}

{% include aviso-borrador.html draft=true %}
{% include aviso-borrador.html draft=true nota="Con nota propia: faltan los resultados y las fechas." %}

{% include encabezado-seccion.html titulo="lista-etiquetas" descripcion="Parámetros: etiquetas, enlazar, titulo. Arriba sin enlazar, abajo enlazada." %}

{% include lista-etiquetas.html etiquetas=page.ejemplo_etiquetas %}
{% include lista-etiquetas.html etiquetas=page.ejemplo_etiquetas enlazar=true %}

{% include encabezado-seccion.html titulo="encabezado-seccion" descripcion="Parámetros: titulo, descripcion, nivel, id. Es el que separa cada bloque de esta página." %}

{% include encabezado-seccion.html titulo="Sin descripción" %}

{% include encabezado-seccion.html titulo="tarjeta-post" descripcion="Parámetros: post, nivel_titulo, etiquetas, fecha. Con textos reales del sitio." %}

<div class="posts-grid">
  {% assign reales = site.mates | concat: site.notas | sort: 'date' | reverse %}
  {% for p in reales limit:3 %}
    {% include tarjeta-post.html post=p %}
  {% endfor %}
</div>

{% include encabezado-seccion.html titulo="tarjeta-proyecto" descripcion="Parámetros: proyecto, nivel_titulo, tecnologias. Con datos de ejemplo, marcada como borrador." %}

<div class="posts-grid">
  {% include tarjeta-proyecto.html proyecto=page.ejemplo_proyecto %}
  {% include tarjeta-proyecto.html proyecto=page.ejemplo_proyecto tecnologias=false %}
</div>

{% include encabezado-seccion.html titulo="meta-proyecto" descripcion="Parámetro: proyecto. Bloque de metadatos de la página de un proyecto." %}

{% include meta-proyecto.html proyecto=page.ejemplo_proyecto %}

{% include encabezado-seccion.html titulo="proyecto-destacado" descripcion="Parámetros: proyecto, invertir. Sin imagen aquí, porque no hay ninguna real que usar." %}

{% include proyecto-destacado.html proyecto=page.ejemplo_proyecto %}

{% include encabezado-seccion.html titulo="area-investigacion" descripcion="Parámetros: linea, nivel_titulo, preguntas, proyectos." %}

{% include area-investigacion.html linea=page.ejemplo_linea %}
{% include area-investigacion.html linea=page.ejemplo_linea preguntas=true proyectos=true %}

{% include encabezado-seccion.html titulo="linea-tiempo" descripcion="Parámetros: eventos, titulo. El segundo evento tiene fecha de fin; el primero no." %}

{% include linea-tiempo.html eventos=page.ejemplo_eventos titulo="Ejemplo de cronología" %}

{% include encabezado-seccion.html titulo="enlaces-sociales" descripcion="Parámetro: titulo. Lee de site.social, así que estos son tus datos reales." %}

{% include enlaces-sociales.html %}

{% include encabezado-seccion.html titulo="Secciones de una y dos columnas" descripcion="No son includes: son clases que se escriben en el markdown. Antes solo funcionaban en las notas; ahora sirven en cualquier página." %}

<section class="one-col" markdown="1">

Esta es una sección `one-col`: columna angosta y centrada dentro del ancho
normal. Sirve para bajar el ritmo, introducir una idea sola o rematar un
argumento sin que el ojo recorra líneas largas.

</section>

<section class="two-col" markdown="1">

### Columna izquierda

Dos bloques en paralelo. Útil para contrastar dos posturas, comparar dos
algoritmos, o poner ejemplo y contraejemplo uno al lado del otro.

### Columna derecha

En pantalla estrecha se apilan. A 45rem de contenedor cada columna da unos
cincuenta caracteres por línea: cómodo para bloques cortos, no para prosa larga.

</section>

{% include encabezado-seccion.html titulo="Entornos matemáticos (Fase 3)" descripcion="Aquí para poder revisarlos junto al resto." %}

{% capture c1 %}Un espacio localmente euclídeo, con fórmula $x^2 + y^2 = 1$.{% endcapture %}
{% include entornos/definicion.html numero="1.1" id="def-demo" cuerpo=c1 %}

{% capture c2 %}El enunciado del teorema, que puede ocupar varias líneas.{% endcapture %}
{% include entornos/teorema.html numero="2.1" titulo="Nombre del teorema" id="thm-demo" cuerpo=c2 %}

{% capture c3 %}Una observación al margen.{% endcapture %}
{% include entornos/observacion.html cuerpo=c3 %}

{% capture dem %}{% capture c4 %}Se sigue de la definición 1.1.{% endcapture %}{% include entornos/demostracion.html cuerpo=c4 %}{% endcapture %}
{% include capa2.html titulo="Demostración del teorema 2.1" cuerpo=dem %}

{% endif %}
