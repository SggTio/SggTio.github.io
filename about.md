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
      <p>Soy Santiago y soy matemático. Me gustan sobre todo las ecuaciones diferenciales, la topología algebraica y la geometría diferencial, tanto por sus preguntas teóricas como por sus aplicaciones computacionales. Vivo de construir software y hacer matemáticas. En mi tiempo libre me gusta leer, jugar ajedrez y escribir, en ese orden.</p>

      <p>Hice una maestría en métodos matemáticos aplicados a imágenes y otra en ciencias de la computación y sistemas. Ahora soy estudiante de doctorado en matemáticas en Ciudad de México.</p>
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
      <h2 id="matematicas">Matemáticas que me interesan mucho</h2>

      <ul>
        <li>Investigo aplicaciones de operadores geométricos, como los laplacianos, en problemas de imágenes médicas. En particular, estudio su uso en la segmentación de gliomas y meningiomas, pero también me interesan mucho las posibilidades computacionales de estos operadores. Este fue el tema de uno de mis trabajos de maestría.</li>
        <li>Investigo la geometría riemanniana y sus interacciones con otras estructuras, como los corchetes de Poisson, para estudiar distintos tipos de variedades. En particular, me interesan los problemas que buscan cerrar la brecha en el cálculo de la cohomología de Poisson y extender la cohomología L² a variedades. También quiero estudiar foliaciones riemannianas singulares cuando la foliación está inducida por una estructura geométrica, como una estructura de Poisson.</li>
        <li>Me interesan también los problemas de cambios de fase que involucran las ecuaciones de Allen–Cahn, Cahn–Hilliard y modelos relacionados, así como sus conexiones con la geometría, los fluidos y la biofísica del cáncer. Este es, en particular, el tema de mi estudio doctoral, junto con las interacciones entre estos cambios de fase y operadores de carácter global, como los operadores fraccionarios, y la relación de todo ello con problemas de tipo Yamabe.</li>
      </ul>

      <p>Trabajar con matemáticas aplicadas me ha llevado a profundizar en C/C++, CGAL y análisis numérico. Implementar matemáticas en código me ha ayudado a entenderlas mejor.</p>
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
