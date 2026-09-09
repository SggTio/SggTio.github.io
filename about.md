---
layout: page
title: Sobre mí
title_seo: "Sobre mí — Santiago Gil Gallego"
description: "Santiago Gil Gallego: matemáticas, software libre, inteligencia artificial, lecturas y comunidad."
permalink: /sobre/
section: sobre
wide: true
---

<div class="about-page">
  <div class="about-intro">
    <div class="about-intro__text">
      <p>Soy Santiago Gil Gallego, matemático. Me gustan especialmente la topología algebraica y la geometría diferencial, tanto en sus preguntas teóricas como en sus posibilidades computacionales. Construyo software y soy más lector que escritor.</p>

      <p>Tengo estudios de posgrado en ingeniería y ciencias de la computación. Mi siguiente etapa de formación es un doctorado en matemáticas.</p>
    </div>

    <figure class="about-profile">
      <img src="{{ '/assets/profile.jpg' | relative_url }}"
           width="1201"
           height="1600"
           alt="Santiago Gil Gallego bebiendo de una taza de cerámica verde y blanca que le tapa media cara, mirando a la cámara">
    </figure>
  </div>

  <div class="about-pair">
    <section class="about-section" aria-labelledby="matematicas">
      <h2 id="matematicas">Matemáticas que estoy estudiando</h2>

      <ul>
        <li>Investigo aplicaciones de operadores geométricos, como los laplacianos, en problemas de imágenes médicas. En particular, estudio su uso en la segmentación de gliomas y meningiomas.</li>
        <li>Investigo la geometría riemanniana y sus interacciones con otras estructuras, como los corchetes de Poisson, para estudiar distintos tipos de variedades.</li>
        <li>Me interesan también los problemas de cambios de fase que involucran las ecuaciones de Allen–Cahn, Cahn–Hilliard y modelos relacionados, así como sus conexiones con la geometría, los fluidos y la biofísica del cáncer.</li>
      </ul>

      <p>Trabajar con imágenes y geometría computacional me ha llevado a profundizar en C/C++ y CGAL: implementar las matemáticas que estudio también forma parte de aprenderlas.</p>
    </section>

    <section class="about-section" aria-labelledby="software">
      <h2 id="software">Software que he construido</h2>

      <p>Trabajo entre la ciencia de datos y la ingeniería de aprendizaje automático, con énfasis en computación de alto desempeño y MLOps: el despliegue, mantenimiento y evaluación de modelos en entornos complejos.</p>

      <p>He ayudado a escalar infraestructuras de datos y a optimizar modelos de lenguaje pequeños para analizar documentos técnicos. También he desarrollado algoritmos para automatizar auditorías.</p>

      <p class="about-preprint">Soy coautor de un <a href="https://arxiv.org/abs/2608.11207">preprint sobre control de sistemas multiagente</a>. Mi aporte incluyó el diseño e implementación del control, el seguimiento probabilístico de estados, las restricciones de comportamiento, los experimentos y el desarrollo del código. Los resultados del trabajo proceden de simulaciones.</p>
    </section>
  </div>

  <p class="about-statement"><strong>Las matemáticas son para todos.</strong></p>

  <div class="about-pair">
    <section class="about-section" aria-labelledby="comunidad">
      <h2 id="comunidad">Software libre y comunidad</h2>

      <p>Defiendo el software libre y una IA abierta que podamos estudiar, modificar y auditar. Me importa que sus decisiones puedan explicarse y que la sociedad civil pueda examinar sus algoritmos, su infraestructura y sus datos.</p>

      <p>Para los usos públicos de la IA, defiendo infraestructura pública y datos abiertos cuando puedan compartirse sin vulnerar la privacidad.</p>

      <p>Quienes programamos también somos trabajadores, y necesitamos organizarnos. Participo en conversaciones sobre IA y política; quiero que este blog sea un espacio para divulgar, discutir y construir comunidad.</p>
    </section>

    <section class="about-section" aria-labelledby="lecturas">
      <h2 id="lecturas">Lecturas y escritos</h2>

      <p>Buena parte de lo que escribo nace de lo que leo: reseñas, notas y preguntas que quiero compartir. Me interesa conocer otras voces y conversar con ellas. Creo que toda voz merece ser escuchada.</p>

      <p>Aquí conviven esas lecturas con mis apuntes de matemáticas, experimentos y proyectos de software.</p>
    </section>
  </div>

  <nav class="about-links" aria-label="Enlaces de cierre de Sobre mí">
    <a href="{{ '/proyectos/' | relative_url }}"><strong>Explorar proyectos</strong></a>
    <span aria-hidden="true">·</span>
    <a href="{{ '/escritos/' | relative_url }}"><strong>Leer escritos</strong></a>
  </nav>
</div>
