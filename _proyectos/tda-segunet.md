---
title: "Topología algebraica para segmentación de tumores"
description: "Enseñarle a una red a ver la forma, no solo el volumen: por qué una máscara con el agujero relleno puede tener una puntuación excelente, y qué matemáticas hacen falta para penalizarlo."
area: matematicas
dominio: ["Topología aplicada", "Imágenes médicas", "Aprendizaje profundo"]
tipo: investigacion
estado: activo
anio: 2026
destacado: true
autoria: "Santiago Gil Gallego (tesis de maestría, PUJ)"
math: true
tecnologias: [Python, TPU, GUDHI]

problema: |
  Una red de segmentación entrenada con Dice puede alcanzar un solapamiento
  excelente y aun así producir máscaras estructuralmente imposibles: rellenar
  un agujero que debía quedar abierto, partir una región conexa en dos, dejar
  componentes flotantes.

  Dice no penaliza nada de eso, porque mide **volumen compartido, no forma**.

  Una analogía: pesar una rosquilla y un disco macizo del mismo material y casi
  el mismo tamaño da resultados casi idénticos. La balanza no está estropeada —
  simplemente no es el instrumento que distingue una rosquilla de un disco.
  Dice es esa balanza.

motivacion: |
  Para un radiólogo, un anillo tumoral relleno y un anillo tumoral correcto no
  son «casi lo mismo»: son diagnósticos distintos.

  Hace falta un instrumento que mida forma. La topología algebraica lleva un
  siglo construyendo exactamente eso.

  ### Qué cuenta la topología

  La idea de partida es tosca a propósito: **de una figura, contar cuántas
  piezas separadas tiene y cuántos agujeros**. Esos dos números son los
  primeros números de Betti.

  <section class="two-col" markdown="1">

  #### $\beta_0$ · cuántas piezas

  Un archipiélago visto desde arriba: $\beta_0$ es cuántas islas hay. Si la
  red parte un tumor conexo en dos fragmentos, $\beta_0$ pasa de uno a dos, y
  eso es un error aunque el volumen coincida casi al milímetro.

  #### $\beta_1$ · cuántos agujeros

  Una rebanada de queso gruyer: $\beta_1$ es cuántos agujeros tiene. Si la red
  rellena el centro de un anillo tumoral, $\beta_1$ pasa de uno a cero.

  </section>

  Lo importante es que estos números **no cambian al estirar o deformar** la
  figura, solo al romperla o al pegarla. Por eso capturan forma y no tamaño:
  justo lo que a Dice se le escapa.

  ### El problema de la escala, y cómo se resuelve

  Contar agujeros en una imagen real tropieza enseguida: ¿un píxel aislado de
  ruido es una isla, o es ruido? ¿Un agujero de dos píxeles es un agujero?

  La **homología persistente** responde no eligiendo un umbral, sino
  recorriéndolos todos. La analogía habitual —y es una analogía, no una
  definición— es inundar un paisaje: se sube el nivel del agua poco a poco y se
  anota cuándo aparece cada isla y cuándo se funde con otra. Una isla que
  sobrevive a muchos niveles es una montaña de verdad; una que aparece y
  desaparece enseguida era una piedra.

  El registro de esos nacimientos y muertes es el **código de barras**. Las
  barras largas son estructura; las cortas, ruido. Y ahora sí hay una respuesta
  a «cuántos agujeros»: los que persisten.

contribucion: |
  El experimento compara **tres formas de darle información topológica a la
  red** —ninguna, en la entrada, y en el cuello de botella; esta última es
  contribución propia— **contra tres funciones de pérdida**: solo Dice, solo
  Betti, y las dos juntas. Ablación 3×3.

  Lo interesante está en el banco de pruebas, no en las capas.

  ### Un dataset diseñado para que la red falle

  Los datos son un **dataset sintético** de alta dificultad, construido a
  propósito para producir errores topológicos reales. El caso característico:
  un anillo de 2 px de grosor alrededor de un agujero central.

  Un modelo entrenado solo con Dice **tiende a rellenar ese agujero**, y lo
  hace por una razón económica, no por torpeza: el agujero es minúsculo
  comparado con el anillo, así que rellenarlo cuesta poquísimo Dice y elimina
  el riesgo de dejar sin marcar píxeles que sí eran tumor. Con esa función de
  pérdida, rellenar **es la jugada correcta**.

  Ese es el punto del dataset: no pillar a la red en un descuido, sino mostrar
  que el descuido está en lo que le pedimos.

enfoque_matematico: |
  ### De contar agujeros a derivar una pérdida

  Contar no basta: para entrenar hace falta una cantidad que se pueda derivar.
  Ahí entra la **Betti Matching Loss**.

  La idea: en vez de comparar volúmenes, se **emparejan** las estructuras de la
  predicción con las de la máscara verdadera —esta isla con aquella, este
  agujero con aquel— y se penaliza lo que no encuentra pareja o lo que aparece
  desplazado en el código de barras.

  ### Por qué la pérdida está bien planteada

  El fundamento de estabilidad viene del **emparejamiento inducido de
  Bauer–Lesnick**: perturbaciones pequeñas de la máscara producen cambios
  acotados en el código de barras.

  Esa propiedad no es un detalle técnico. Sin ella, mover un solo píxel podría
  reordenar el emparejamiento entero y dar un salto arbitrario en la pérdida —
  y una función que salta no se puede optimizar por descenso de gradiente. La
  estabilidad es lo que convierte «contar agujeros» en algo entrenable.

  TODO(santiago): verificar Bauer–Lesnick (2015) contra la fuente primaria y
  añadirla a `_data/bibliografia.yml` con su DOI antes de publicar.

  ### Dónde encaja esto en la tesis

  La taxonomía general son cuatro cuadrantes: topología algebraica y geometría
  diferencial, cada una con y sin redes neuronales.

  | | Sin redes neuronales | Con redes neuronales |
  |---|---|---|
  | **Topología algebraica** | · | · |
  | **Geometría diferencial** | · | · |

  TODO(santiago): qué va en cada celda.

enfoque_computacional: |
  Entrenamiento espacial en TPU v5e-1 sobre Colab; el cálculo de Betti corre en
  CPU por restricción de la librería. Esa asimetría condiciona el diseño del
  bucle de entrenamiento más de lo que parece.

  Python 3.12 sobre Windows, más una VM Ubuntu 22.04 de la universidad.

resultados: |
  Sobre un **dataset sintético** de alta dificultad — no sobre datos clínicos:

  - La Betti Matching Loss reduce de forma sustancial los errores topológicos,
    **sin sacrificar Dice**. No es un intercambio: es información que antes no
    se estaba usando.
  - La supervisión conjunta llega a eliminar los errores de $\beta_1$.
  - El beneficio está **estratificado**: aparece en los casos difíciles y
    extremos, no en los fáciles ni medios. Los promedios sin estratificar lo
    diluyen hasta hacerlo invisible.

  Sobre por qué la fusión en el cuello de botella funciona mejor, la
  explicación propuesta es la **separación de gradientes**: al no compartir
  parámetros el camino espacial y el topológico, desaparece el conflicto entre
  lo que pide Dice y lo que pide Betti.

  Resultados sobre datos sintéticos, no clínicos. Datos previstos: BraTS-MEN
  2023 (meningioma, Synapse syn51156910).

limitaciones: |
  Durante el desarrollo se detectaron cuatro problemas de diseño experimental
  que invalidaban conclusiones previas. Van aquí con el mismo peso que los
  resultados, porque son la parte más instructiva del proyecto:

  1. **Fuga de datos topológicos.** Las características topológicas de
     evaluación se calculaban desde el *ground truth* y no desde las
     predicciones. El modelo parecía acertar porque se le estaba enseñando la
     respuesta.
  2. **La pérdida topológica nunca se activó realmente.** Un interruptor de
     configuración en falso: todo el experimento medía otra cosa.
  3. **Sin evaluación estratificada**, los promedios mezclaban casos fáciles y
     difíciles, y escondían justo donde estaba el efecto.
  4. **Pereza modal.** El codificador espacial dominaba el aprendizaje y los
     canales topológicos quedaban ignorados: la información estaba ahí y la red
     no la usaba.

  Y la limitación de fondo: **los resultados son sobre datos sintéticos, no
  clínicos.**

proximos_pasos: |
  TODO(santiago): estado actual del roadmap de 9 pasos y qué cuadrantes siguen
  pendientes.

visualizaciones:
  - id: viz-anillo-relleno
    titulo: "El anillo que Dice prefiere rellenar"
    seccion: problema
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      El anillo de 2 px con su agujero central. Al lado, una predicción que lo
      rellena. Dos marcadores en vivo: el Dice apenas se mueve, $\beta_1$ pasa
      de uno a cero. Un deslizador para engordar el anillo y ver a partir de
      qué grosor deja de compensar rellenarlo.
    ensena: |
      La imagen central del proyecto entero: por qué un solapamiento excelente
      puede convivir con una máscara estructuralmente imposible.

  - id: viz-betti
    titulo: "Qué cuentan β₀ y β₁"
    seccion: motivacion
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Lienzo donde el lector dibuja formas con el ratón. Los dos números de
      Betti se actualizan en vivo: piezas y agujeros. Formas preparadas de un
      clic — disco, anillo, dos discos, ocho. Un botón de «deformar» que estira
      la figura sin romperla, para ver que los números no cambian.
    ensena: |
      Que los números de Betti se cuentan mirando, y que son invariantes por
      deformación. Es la intuición que sostiene todo lo demás.

  - id: viz-inundacion
    titulo: "Inundar el paisaje"
    seccion: motivacion
    tipo: animacion
    estado: pendiente
    que_muestra: |
      La analogía del texto, hecha animación: un relieve en escala de grises y
      el nivel del agua subiendo. Aparecen islas, se funden. Abajo, el código
      de barras dibujándose en tiempo real, cada barra naciendo y muriendo con
      su isla. Las barras largas se resaltan solas.
    ensena: |
      Qué es la persistencia y por qué resuelve el problema del umbral, sin
      escribir una sola definición formal.

  - id: viz-emparejamiento
    titulo: "Emparejar estructuras, no volúmenes"
    seccion: enfoque_matematico
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Dos máscaras lado a lado —verdad y predicción— con sus estructuras
      resaltadas y unidas por líneas de emparejamiento. Lo que queda sin pareja
      se marca en rojo. Al editar la predicción, el emparejamiento y la pérdida
      se recalculan.
    ensena: "Qué mide exactamente la Betti Matching Loss."

  - id: viz-estabilidad
    titulo: "Perturbar la máscara, mirar el código de barras"
    seccion: enfoque_matematico
    tipo: interactiva
    estado: pendiente
    que_muestra: |
      Una máscara con un control de ruido. Al perturbarla, el código de barras
      se mueve poco y de forma acotada. Es la propiedad de estabilidad de
      Bauer–Lesnick, mostrada en vez de citada.
    ensena: |
      Por qué la pérdida es entrenable. Convierte la afirmación de estabilidad
      en la opción (c) de CLAUDE.md §2, código que la verifica.

  - id: viz-estratificacion
    titulo: "Lo que el promedio esconde"
    seccion: resultados
    tipo: figura
    estado: pendiente
    que_muestra: |
      Distribución de errores por nivel de dificultad, con el promedio global
      marcado encima. Se ve cómo un beneficio concentrado en los casos
      extremos desaparece al promediar sobre todos. Sin cifras reales: es una
      figura didáctica sobre el efecto de no estratificar.
    ensena: "Por qué la evaluación estratificada no era un detalle."

  - id: viz-pereza-modal
    titulo: "Cuando la red ignora un canal entero"
    seccion: limitaciones
    tipo: figura
    estado: pendiente
    que_muestra: |
      Dos flujos de información entrando a la red, uno espacial y otro
      topológico, con el grosor de cada uno proporcional a cuánto contribuye
      al gradiente. Se ve el canal topológico adelgazar hasta casi desaparecer.
    ensena: "Qué es la pereza modal, que en texto suena abstracto."
---
