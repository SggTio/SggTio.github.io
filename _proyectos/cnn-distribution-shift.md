---
title: "Cuando el problema no era la arquitectura"
description: "Siete modelos para clasificar resonancia cerebral en cuatro categorías, y el hallazgo de que la capacidad de la red nunca fue el cuello de botella."
area: ia
dominio: ["Imágenes médicas", "Aprendizaje automático"]
tipo: experimento
estado: terminado
anio: 2026
destacado: true
autoria: "Santiago Gil Gallego y Silvio Mauricio Morales"
tecnologias: [Python, TensorFlow, Keras]

problema: |
  Clasificar resonancia magnética cerebral en cuatro categorías —glioma,
  meningioma, tumor pituitario y sin tumor— con redes convolucionales
  entrenadas desde cero.

  La pregunta real no era maximizar una métrica, sino entender **qué limita el
  rendimiento cuando los datos son escasos**.

contribucion: |
  Dataset *Brain Tumor Classification (MRI)* de Kaggle, con su partición
  predefinida de entrenamiento y prueba.

  <section class="two-col" markdown="1">

  ### Cuatro modelos desde cero

  `AugCNN` apuesta por la aumentación como regularización principal, con una
  convolución por bloque.

  `RegCNN` va por regularización explícita —L2, *SpatialDropout*, *Dropout*—
  con dos convoluciones por bloque y sin aumentación.

  `DeepCNN_v2` introduce bloques residuales, *cosine decay* y *label
  smoothing*. `DeepCNN_v3` mantiene la arquitectura residual y sube la
  aumentación y las épocas.

  ### Tres preentrenados

  MobileNetV2, ResNet50 y VGG16, ajustados en dos fases: calentamiento con la
  base congelada a tasa de aprendizaje alta, y después ajuste fino del último
  bloque a tasa mucho más baja, con *BatchNorm* en modo inferencia.

  </section>

resultados: |
  Los preentrenados superaron con claridad a todos los modelos entrenados desde
  cero. Las cifras concretas viven en el informe; esta ficha cuenta qué se
  comparó y qué se encontró.

  **El hallazgo, que es el título de la ficha:** la capacidad arquitectónica no
  era el factor limitante. Los modelos residuales, más sofisticados, **no
  superaron** al `RegCNN`, que es más simple.

  El cuello de botella era otro: el tamaño reducido del conjunto, combinado con
  una **deriva de distribución documentada entre particiones** — la proporción
  de la clase «sin tumor» cambia de forma apreciable entre entrenamiento y
  prueba.

aprendizajes: |
  La sección más valiosa del proyecto. Tres errores diagnosticados durante el
  proceso, **cada uno de los cuales produjo resultados falsos antes de
  detectarse**:

  1. **Desalineación del conjunto de prueba**, que colapsaba todas las
     predicciones a una sola clase.
  2. **`EarlyStopping` restaurando un modelo poco entrenado**, por monitorear
     `val_loss` con *BatchNorm* en un dataset pequeño. Se cambió a
     `val_accuracy`.
  3. **Autenticación de Kaggle rota**, porque el nuevo formato de token ya no
     entrega un `kaggle.json` descargable.

  Correcciones adicionales: se bajó el *momentum* de *BatchNorm* para ganar
  estabilidad con pocos datos, y se reemplazó `class_weight` por
  `sample_weight` inyectado en el pipeline del dataset, por compatibilidad con
  etiquetas *one-hot* y entropía cruzada con *label smoothing*.

proximos_pasos: |
  La dirección de mejora no es escalar la red desde cero, sino incorporar
  *transfer learning* — que es justo lo que confirma la comparación.

visualizaciones:
  - id: viz-deriva-distribucion
    titulo: "La deriva entre particiones"
    seccion: resultados
    tipo: figura
    estado: pendiente
    que_muestra: |
      Las proporciones de las cuatro clases en entrenamiento y en prueba, una
      al lado de la otra. Se ve de un vistazo que la partición no es
      representativa. Figura didáctica sobre el efecto, sin reproducir las
      cifras del informe.
    ensena: |
      Que un dataset con partición predefinida puede traer el problema dentro,
      y que conviene mirarlo antes de culpar al modelo.

  - id: viz-capacidad-vs-datos
    titulo: "Más capacidad no es más rendimiento"
    seccion: resultados
    tipo: figura
    estado: pendiente
    que_muestra: |
      Curvas ilustrativas de rendimiento frente a capacidad del modelo, para
      dos tamaños de dataset. Se ve la meseta que aparece cuando los datos son
      el límite, y por qué añadir bloques residuales no la rompe.
    ensena: "Por qué el modelo más sofisticado no ganó."

  - id: viz-earlystopping
    titulo: "Cuando EarlyStopping te engaña"
    seccion: aprendizajes
    tipo: animacion
    estado: pendiente
    que_muestra: |
      Dos curvas de entrenamiento sintéticas: `val_loss` ruidosa por BatchNorm
      con pocos datos, y `val_accuracy` estable. Se marca el punto que elegiría
      cada criterio y se ve que uno restaura un modelo peor.
    ensena: "Un error de configuración que produce resultados falsos sin avisar."
---
