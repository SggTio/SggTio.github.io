---
layout: page
title: Sobre mí
title_seo: "Sobre mí — Santiago Gil Gallego"
description: "Santiago Gil Gallego, matemático computacional. Geometría, topología y aprendizaje automático; imágenes médicas; software basado en matemáticas."
permalink: /sobre/
section: sobre
---

<div class="about-profile">
  <img src="{{ '/assets/profile.jpg' | relative_url }}"
       alt="Santiago bebiendo de una taza de cerámica verde y blanca que le tapa media cara, mirando a la cámara">
</div>

<p class="frase-protegida">Estudié matemáticas, porque quiero ser poeta.</p>

<h2>Aspiraciones</h2>

<p class="frase-protegida">Quisiera ser psiquiatra de máquinas, para interpretar
sus sueños.</p>

<p>Leo mucho y escribo cuentos y poemas. Algunos acaban
<a href="{{ '/escritos/' | relative_url }}">publicados aquí</a>.</p>

<p class="frase-protegida">Me sueño con una panadería.</p>

<h2>Quién soy</h2>

<p>Soy matemático computacional y disfruto construir software basado en matemáticas.</p>

<p>Durante más de ocho años he aplicado matemáticas, inteligencia artificial e
ingeniería de software a problemas complejos. Mi trabajo se sitúa en la
intersección entre las matemáticas, la computación de alto desempeño y la
inteligencia artificial.</p>

<p>He trabajado en visión por computador, imágenes médicas, modelos de lenguaje
(LLMs), ingeniería de datos, MLOps e infraestructura en la nube. También
investigo geometría diferencial, análisis geométrico y topología aplicada como
herramientas para desarrollar métodos computacionales y modelos de aprendizaje
automático más sólidos e interpretables.</p>

<p>Soy matemático, tengo maestrías en ingeniería y ciencias. Me gusta estudiar
la geometría diferencial y la topología algebraica tanto en teoría como en
<a href="{{ '/proyectos/tda-segunet/' | relative_url }}">aplicaciones
computacionales a la medicina</a>.</p>

<p>Creo en el software de código abierto, la ciencia reproducible y el
desarrollo de sistemas de inteligencia artificial seguros, explicables y
confiables.</p>

<p>También leo, escribo cuentos y poemas, y sigo soñando con una panadería.</p>

<h2>En qué trabajo</h2>

<div class="two-col">
  <div>
    <h3>Geometría y topología, llevadas al cómputo</h3>
    <p>Números de Betti, homología persistente, laplacianos. No como teoría
    bonita, sino como instrumentos que miden algo que otros métodos no ven: la
    forma. Eso es
    <a href="{{ '/proyectos/tda-segunet/' | relative_url }}">la tesis</a>, y
    también <a href="{{ '/proyectos/charla-laplacianos/' | relative_url }}">una
    charla</a> y
    <a href="{{ '/proyectos/geometria-computacional-fundamentos/' | relative_url }}">los
    cuadernos</a> que la sostienen.</p>
  </div>

  <div>
    <h3>Imágenes médicas</h3>
    <p>Un tumor en una resonancia es un problema geométrico antes que
    estadístico, y los métodos clásicos se rompen de maneras que
    <a href="{{ '/proyectos/segmentacion-clasica-et/' | relative_url }}">se
    pueden caracterizar</a> en vez de lamentar.</p>
  </div>

  <div>
    <h3>Por qué fallan los modelos</h3>
    <p>Me interesa más eso que hacerlos ganar. A veces el problema no es la
    arquitectura sino
    <a href="{{ '/proyectos/cnn-distribution-shift/' | relative_url }}">los
    datos que le diste</a>. Y contar bien esas cosas también es trabajo:
    <a href="{{ '/proyectos/serie-redes-neuronales/' | relative_url }}">de dónde
    viene todo esto</a>, con visualizaciones para que se vea.</p>
  </div>

  <div>
    <h3>Lo que no está aquí</h3>
    <p>Ocho años de trabajo profesional han pasado además por ingeniería de
    datos, MLOps e infraestructura en la nube. Ese trabajo no está en este
    sitio: aquí recojo sobre todo lo matemático y lo investigativo, que es lo
    que puedo publicar entero.</p>
  </div>
</div>

<h2>Cómo trabajo</h2>

<div class="two-col">
  <div>
    <h3>Software de código abierto</h3>
    <p>Y ciencia reproducible: si un resultado no se puede volver a obtener, no
    es un resultado.</p>
  </div>

  <div>
    <h3>Sistemas de IA seguros y explicables</h3>
    <p>Confiables quiere decir que se sabe cuándo fallan, no que no fallen.</p>
  </div>

  <div>
    <h3>Nada que no se pueda comprobar</h3>
    <p>Si escribo aquí que algo es cierto en matemáticas, tiene que poder
    verificarse: o hay una referencia con su DOI, o está demostrado en el texto,
    o hay código en el repositorio que lo comprueba.</p>
  </div>

  <div>
    <h3>Y decirlo cuando no</h3>
    <p>Cuando no puedo hacer ninguna de las tres, lo digo: esto es una
    intuición, no un resultado.</p>
  </div>
</div>

<h2>Cómo pienso mi trabajo</h2>

<div class="tercet">
  <p>Investigo estructuras matemáticas.</p>
  <p>Las convierto en métodos computacionales.</p>
  <p>Construyo software para estudiarlas y aplicarlas.</p>
</div>

<h2>Contacto</h2>

{% include enlaces-sociales.html titulo="Contacto y perfiles" %}

{% if jekyll.environment != "production" %}
<div class="solo-desarrollo">
  <p><strong>Pendiente, visible solo en desarrollo:</strong></p>
  <ul>
    <li>TODO(santiago): crear un ORCID — es gratuito y toma minutos; pesa en una
        candidatura doctoral</li>
    <li>TODO(santiago): perfil de Google Scholar, solo si existe</li>
  </ul>
</div>
{% endif %}
