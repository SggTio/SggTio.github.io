---
title: "Pipeline modular de limpieza y segmentación clásica"
description: "Catorce módulos de Python para que un proyecto de imágenes médicas no acabe siendo un notebook de cuatrocientas celdas que solo corre en una máquina."
area: ciencias-computacionales
dominio: ["Imágenes médicas", "Software y señales"]
tipo: software
estado: terminado
anio: 2026
destacado: true
autoria: "Santiago Gil Gallego"
tecnologias: [Python]

problema: |
  Los proyectos de imágenes médicas en curso tienden a acabar como un notebook
  de cuatrocientas celdas que solo corre en la máquina de quien lo escribió.

contribucion: |
  Un paquete de Python de catorce módulos, `brats_pipeline`, para el
  subconjunto demostrativo de BraTS-2024 GLI: limpieza de las cuatro
  modalidades, segmentación clásica y evaluación.

  La decisión de diseño central: **toda la lógica vive en el paquete y el
  notebook solo orquesta**, una celda por tarea. Así el resto del equipo parte
  de lo mismo y solo toca rutas.

enfoque_computacional: |
  Módulos identificados hasta ahora: `config.py`, `normalize.py`,
  `bias_field.py`, `denoise.py`, `clean_pipeline.py`.

  TODO(santiago): listar los catorce módulos completos.

resultados: |
  La mejor prueba de que la separación funcionó llegó de fuera: otro proyecto
  —el de
  [segmentación clásica del realce](/proyectos/segmentacion-clasica-et/),
  de un equipo de tres— **reutilizó el núcleo numérico de este paquete**.

  Se llevaron el denoising de Wiener adaptativo, la corrección de campo de
  sesgo, la normalización, las métricas de solapamiento, la umbralización de
  Otsu multinivel, el crecimiento de regiones, el watershed, la mezcla de
  gaussianas multimodal y los mosaicos de tres vistas.

  Y reescribieron entera la capa de entrada y salida, para leer desde ZIP en
  vez de desde disco. Los algoritmos se movieron sin tocarlos.

aprendizajes: |
  La separación entre paquete y notebook es lo que hace que un proyecto de
  curso sobreviva al curso.

  Y hay una separación más fina dentro del paquete que resultó ser la que de
  verdad importaba: **escribir la parte matemática como funciones puras**, que
  no saben de dónde vienen los datos ni a dónde van. Eso es lo que permitió que
  otro equipo cambiara toda la capa de lectura y se llevara los algoritmos
  intactos.

visualizaciones:
  - id: viz-arquitectura-pipeline
    titulo: "El grafo de módulos"
    seccion: enfoque_computacional
    tipo: figura
    estado: pendiente
    que_muestra: |
      Los catorce módulos como nodos, con las dependencias entre ellos y el
      flujo de datos de una modalidad cruda hasta la máscara evaluada. Se ve
      dónde entra el notebook y qué poco hace.
    ensena: "Qué significa «el notebook solo orquesta», dibujado."

  - id: viz-etapas-limpieza
    titulo: "Cada etapa de limpieza, sobre el mismo corte"
    seccion: contribucion
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Un corte sintético pasando por las etapas —normalización, corrección de
      campo de sesgo, denoising— con un control para avanzar y retroceder. Cada
      paso muestra qué cambió y por qué hacía falta.
    ensena: "Para qué sirve cada etapa de la limpieza, que en texto suena a lista."
---
