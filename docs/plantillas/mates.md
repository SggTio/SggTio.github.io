---
# PLANTILLA · artículo de Mates (layout post, voz de Mates)
# Cópiala a _mates/AAAA-MM-DD-slug.md (ej.: _mates/2026-11-02-laplacianos.md).
# La URL sale del nombre del archivo: /mates/AAAA-MM-DD-slug/.
# Obligatorios: title, date, description, tags; math: true si hay fórmulas.
# En las rutas de abajo, SLUG es el nombre del archivo sin fecha ni .md y
# NOMBRE el de cada figura o script. Lee el comentario bajo el front matter.
layout: post
section: mates
title: "TODO(santiago): título del artículo"
date: 2026-01-01        # TODO(santiago): fecha de publicación, la misma del nombre del archivo
description: "TODO(santiago): una frase para las listas, el feed y los buscadores (160 caracteres como mucho)."
tags:                   # en minúscula; salen en la línea de meta y en /etiquetas/
  - "TODO(santiago): etiqueta"
math: true              # carga MathJax: hace falta para fórmulas y para ecuacion.html
# subsection: redes-neuronales  # grupo en /mates/: redes-neuronales | geometria-computacional | charlas.
#                               # Sin subsection la entrada sale al final, en «Otras notas».
# extra_css:                    # hoja propia de la entrada (opcional: el lienzo ya lo pone el sitio)
#   - /assets/posts/SLUG/post.css

# ---- Borrador -------------------------------------------------------------
# Mientras quede un TODO(santiago) en el archivo, deja estas dos líneas:
draft: true             # fuera de /mates/, «Últimas», el feed y /etiquetas/; en local, aviso «Borrador»
published: false        # Jekyll no genera la página: nada de esto llega a producción.
                        # Para verla en local: bundle exec jekyll serve --unpublished
# Para publicar, borra las dos. No confundir con:
# listar: false         # página publicada en su URL pero fuera de toda lista (solo marcadores, D10)

# ---- Del modelo de contenido: opcionales, hoy ningún layout los pinta ------
# nivel: intermedio     # divulgativo | intermedio | tecnico (default de la colección: intermedio)
# prerrequisitos: []    # slugs de _data/notacion.yml o de otros posts
# bibliografia: []      # claves de _data/bibliografia.yml
---
{%- comment -%}
  ARTÍCULO DE MATES · cómo se arma (layout _layouts/post.html)
  (Este comentario no lleva líneas en blanco a propósito: si las llevara,
  Jekyll avisaría «Excerpt modified» en cada build.)
  · El layout pone el título, la línea de meta (fecha · mates · etiquetas ·
    minutos de lectura) y, si hay dos ## o más, el índice «En esta entrada»
    al margen. Tú escribes el cuerpo, de arriba abajo:
    1. UN párrafo de entrada, con la línea {: .lead} justo debajo (se ve
       grande y en crema). Solo uno.
    2. Secciones ## numeradas a mano: «## 1. …», «## 2. …». El índice se
       genera de ellas y quita el número (el CSS numera 01, 02…). Un ## sin
       número («## Cierre») entra tal cual. Los ### van en cursiva y no
       entran en el índice.
    3. Dentro de cada sección, los bloques de los ejemplos de abajo que
       hagan falta. Borra los que no uses, con su comentario.
  · Tres capas (CLAUDE.md §3): Capa 0 la idea (entrada, sección 1, una
    figura); Capa 1 el desarrollo (definiciones, ecuaciones numeradas,
    ejemplos trabajados); Capa 2 lo plegado (capa2.html: demostraciones,
    derivaciones, código entero).
  · Margen (NotaMargen): como máximo UNA nota por párrafo, en su propia
    línea, justo DESPUÉS de su párrafo y con una línea en blanco antes y
    después. «Idea clave», una o dos por artículo. El pie de una figura en
    columna y el número de una ecuación también van al margen: deja al
    menos un párrafo entre ellos y la nota anterior, o bajarán hasta donde
    acabe. Por debajo de 1090px de ventana todo lo del margen vuelve al
    texto tras su párrafo; nunca se pierde.
  · Fórmulas: en línea entre signos de dólar sencillos, en display entre
    dobles (párrafo propio). Las numeradas, con ecuacion.html.
  · Rigor (CLAUDE.md §2): cada afirmación matemática, con una referencia de
    _data/bibliografia.yml, una demostración o código que la verifique; si
    no, se presenta como intuición, conjetura o analogía. Cifras, solo las
    que existan.
  · Las etiquetas van en `tags`, no como chips en el cuerpo (D11).
{%- endcomment -%}
TODO(santiago): el párrafo de entrada, uno solo: la pregunta o la escena que abre el artículo.
{: .lead}

TODO(santiago): uno o dos párrafos que sitúen al lector: de qué va el artículo y qué se lleva si lo lee entero.

## 1. TODO(santiago): título de la primera sección (Capa 0, la idea)

TODO(santiago): el párrafo del que sale la idea clave.

{% comment %} Nota «Idea clave» al margen, tras su párrafo: la única con regla de color; una o dos por artículo. {% endcomment %}
{% capture idea %}TODO(santiago): la idea clave, en una o dos frases.{% endcapture %}
{% include margen.html tipo="idea" cuerpo=idea %}

TODO(santiago): el párrafo siguiente.

{% comment %}
  Figura en columna (ancho del texto); el pie va al margen con «Figura N». Toda
  figura matemática sale de un script en scripts/figuras/SLUG/ (CLAUDE.md §3);
  SVG mejor que PNG. alt obligatorio: sin él el build se detiene a propósito.
{% endcomment %}
{% include figura.html src="/assets/posts/SLUG/NOMBRE.svg" alt="TODO(santiago): qué muestra la figura, no «figura 1»" pie="TODO(santiago): pie de una o dos líneas." numero="1" %}

TODO(santiago): el párrafo que comenta la figura.

## 2. TODO(santiago): título de la segunda sección (Capa 1, el desarrollo)

TODO(santiago): el párrafo que introduce la definición.

{% comment %}
  Entorno: definicion, teorema, proposicion, observacion o demostracion
  (_includes/entornos/). numero, titulo e id son opcionales; el id sirve
  para citarlo con un enlace a #def-….
{% endcomment %}
{% capture definicion %}TODO(santiago): el enunciado preciso.{% endcapture %}
{% include entornos/definicion.html numero="1" titulo="TODO(santiago): nombre" cuerpo=definicion %}

TODO(santiago): el párrafo que lleva a la ecuación.

{% comment %}
  Ecuación numerada: número y etiqueta (dos o tres palabras) al margen. TeX
  sin delimitadores. Si es larga o lleva comillas dobles, con capture; si es
  más ancha que el texto, añade ancho=true. Detalles en _includes/ecuacion.html.
{% endcomment %}
{% include ecuacion.html tex="\text{TODO(santiago): la ecuación en TeX}" numero="1" etiqueta="TODO(santiago): etiqueta" %}

TODO(santiago): el párrafo que explica la ecuación, término a término.

TODO(santiago): el párrafo del que sale la analogía.

{% comment %} Analogía al margen, en cursiva. Es una analogía, no una definición: dilo así. {% endcomment %}
{% capture analogia %}TODO(santiago): la analogía.{% endcapture %}
{% include margen.html tipo="analogia" cuerpo=analogia %}

TODO(santiago): el párrafo siguiente.

{% comment %} Figura «ancho» (texto + margen): gráficas con detalle, gifs como .mp4 o .webm, vídeo. El pie va debajo. {% endcomment %}
{% include figura.html src="/assets/posts/SLUG/NOMBRE.svg" alt="TODO(santiago): qué muestra la figura" pie="TODO(santiago): pie." numero="2" ancho="ancho" %}

## 3. TODO(santiago): título de la sección con la visualización

TODO(santiago): el párrafo que presenta la visualización y qué mirar en ella.

{% comment %}
  Visualización interactiva (.viz): ocupa texto + margen. Su script la busca
  por el id (viz-NOMBRE) y dibuja en .viz-stage (lienzo oscuro en los dos
  temas), los mandos en .viz-controls y las lecturas en .viz-readout. Si
  redibuja al cambiar de tema, que observe el atributo data-theme de <html>
  con un MutationObserver, como los scripts de
  assets/posts/avances-redes-neuronales/. Qué tipo de visualización elegir y
  dónde va cada archivo: docs/guia-visualizaciones.md.

  El lienzo (fondo oscuro, borde, relleno, el SVG al 100 % del ancho) y la
  fila de mandos los pone el sitio (_sass/_ajustes-mates.scss); al imprimir,
  el lienzo sale con su fondo. Una hoja propia (extra_css) solo hace falta
  para cambiarlos: cualquier regla suya gana a la base del sitio.
{% endcomment %}
<div id="viz-NOMBRE" class="viz">
  <h3 class="viz-title">Visualización 1 · TODO(santiago): nombre</h3>
  <p class="viz-sub">TODO(santiago): cómo se usa, en una línea.</p>
  <div class="viz-stage"></div>
  <div class="viz-controls"></div>
  <div class="viz-readout"></div>
</div>

TODO(santiago): el párrafo que saca la conclusión de la visualización.

## 4. TODO(santiago): título de la cuarta sección

TODO(santiago): el párrafo que presenta el panel.

{% comment %} Figura «completo» (1056px): rompe la columna a propósito, para un mapa, un campo o un panel de varias gráficas. Pie debajo. {% endcomment %}
{% include figura.html src="/assets/posts/SLUG/NOMBRE.svg" alt="TODO(santiago): qué muestra el panel" pie="TODO(santiago): pie." numero="3" ancho="completo" %}

TODO(santiago): el párrafo que cierra la sección.

{% comment %}
  Capa 2, plegada: lo que el lector puede saltarse y aun así llevarse algo
  completo. Admite Markdown, fórmulas y entornos; MathJax compone las
  fórmulas al abrir el bloque y todo se despliega al imprimir.
{% endcomment %}
{% capture detalle %}
TODO(santiago): la demostración, la derivación o el código completo.
{% endcapture %}
{% include capa2.html titulo="TODO(santiago): qué hay dentro" cuerpo=detalle %}

## Cierre

TODO(santiago): el cierre: qué queda, qué viene después.

{% comment %} Un script por visualización, al final del cuerpo. Borra la línea si no hay .viz. {% endcomment %}
<script src="{{ '/assets/posts/SLUG/NOMBRE.js' | relative_url }}"></script>
