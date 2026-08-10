---
title: "Pipeline modular de limpieza y segmentación clásica"
description: "Catorce módulos de Python para que un proyecto de imágenes médicas no acabe siendo un notebook de cuatrocientas celdas que solo corre en una máquina."
area: ciencias-computacionales
dominio: ["Imágenes médicas", "Software y señales"]
tipo: software
estado: terminado
anio: 2026
destacado: true
autoria: "Santiago Gil Gallego (limpieza y arquitectura) · un compañero de equipo se encargó del registro"
nota_autoria: "TODO(santiago): nombre del compañero de equipo, si quiere aparecer."
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

aprendizajes: |
  La separación entre paquete y notebook es lo que hace que un proyecto de
  curso sobreviva al curso.

proximos_pasos: |
  TODO(santiago): ¿se publica como repositorio abierto?

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
