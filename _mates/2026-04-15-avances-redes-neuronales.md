---
layout: post
title: "Avances de las redes neuronales: del invierno al amanecer del deep learning"
date: 2026-04-15
section: mates
subsection: redes-neuronales
math: true
wide: true
description: "Segunda entrega de la serie: qué pasó entre 1969 y 2010. Los dos inviernos de la IA, el redescubrimiento de backpropagation, las primeras CNNs y RNNs, y la convergencia de datos, GPUs y algoritmos que preparó el despertar del deep learning."
tags:
  - historia de la ia
  - invierno de la ia
  - backpropagation
  - cnn
  - rnn
  - big data
  - gpu
extra_css:
  - /assets/posts/avances-redes-neuronales/post.css
---

<div class="post-meta-chips">
  <span>historia de la ia</span>
  <span>invierno de la ia</span>
  <span>backpropagation</span>
  <span>cnn</span>
  <span>rnn</span>
  <span>big data</span>
  <span>gpu</span>
</div>

<p class="lead">
En el <a href="{{ '/mates/2026-04-14-fundamentos-redes-neuronales/' | relative_url }}">primer artículo</a> dejamos la historia en 1958, con Frank Rosenblatt y su perceptrón prometiendo máquinas que aprenderían a leer, a ver y a conversar. Pero en 1969 un libro demoledor — <em>Perceptrons</em>, de Minsky y Papert — dejó al campo sin aire. Durante una década, las redes neuronales dejaron de existir como programa de investigación serio. Y sin embargo, cuarenta años después, en 2012, una red convolucional ganó ImageNet por un margen tan grande que el mundo entero cambió de marcha.
</p>

Este artículo es el puente entre esos dos momentos. Vamos a mirar de cerca **los dos inviernos de la IA**, el **redescubrimiento de backpropagation** (en 1986, el algoritmo que había estado ahí desde 1974 sin que nadie le prestara atención), las arquitecturas que aparecieron cuando el campo volvió a respirar — **CNNs** para visión, **RNNs** y **LSTMs** para secuencias — y la convergencia perfecta de los 2000: datos, GPUs y algoritmos madurando al mismo tiempo. Nos detenemos justo antes de AlexNet (2012). Ese salto definitivo queda para el tercer post.

El post tiene **cuatro visualizaciones interactivas**. La línea de tiempo de inviernos y renacimientos es la que ordena la narrativa; el **explorador de backpropagation** es el corazón técnico del artículo y merece que le dediques tiempo. Las otras dos son anclas visuales para convoluciones y convergencia.

---

## 1. Los dos inviernos: cuando la IA dejó de ser IA

La historia de la inteligencia artificial tiene un patrón que se repite: una promesa desmedida, una ola de financiamiento, un golpe a la realidad y un invierno. El primer invierno lo disparó un libro; el segundo se gestó desde adentro, por éxitos insuficientes y una mejor herramienta de la competencia. Entender cómo terminaron los dos inviernos es entender de dónde viene el deep learning moderno — no apareció de la nada, apareció cuando tres cosas — datos, cómputo y algoritmos — finalmente se dieron cita.

<div id="viz-winters" class="viz">
  <h3 class="viz-title">Visualización 1 · inviernos y renacimientos (1969–2012)</h3>
  <p class="viz-sub">Click sobre cualquier hito para leer su contexto. Las bandas marcan los dos inviernos (gris) y los dos renacimientos (acento).</p>
  <div class="viz-stage"></div>
  <div class="tl-panel"></div>
</div>

### 1.1 El primer invierno (1969–1980): el libro que congeló el campo

En 1969, Marvin Minsky y Seymour Papert publicaron *Perceptrons*. Eran, los dos, figuras dominantes del MIT, y el libro era matemáticamente impecable. Demostraban, con rigor, varios teoremas sobre lo que un perceptrón de **una sola capa** no puede computar. El más famoso: la función XOR, que vos ya viste en el primer post. Otros, más sutiles, tenían que ver con paridad y conectividad en imágenes.

Lo que los teoremas **no** decían era "las redes neuronales no sirven". Lo que decían era: *esta variante particular del perceptrón, con una sola capa de pesos ajustables, no puede hacer estas cosas concretas*. Pero el libro se leyó — y se citó — como si hubiera cerrado el capítulo entero. DARPA retiró financiamiento. Varios laboratorios de redes neuronales cerraron. Los papers dejaron de aparecer. Una generación entera cambió de tema: los sistemas expertos basados en reglas explícitas tomaron el relevo como "la IA que sí funciona".

Durante esos diez años faltó **una cosa precisa**: un algoritmo para entrenar redes con capas ocultas. Sin eso no se podía construir XOR, ni nada más rico. La idea de backpropagation ya existía — Paul Werbos la había descrito en su tesis de 1974 —, pero nadie la estaba leyendo.

### 1.2 El primer renacimiento (1980–1989): Hopfield, Rumelhart y Nature

A principios de los ochenta, dos cosas descongelaron el campo a la vez.

La primera fue **John Hopfield**. En 1982, Hopfield — un físico — publicó un paper que reformulaba las redes neuronales como sistemas físicos con una **función de energía**. En su modelo, una red con conexiones simétricas entre neuronas binarias definía un paisaje de energía, y la red "caía" a un mínimo local. Los mínimos locales podían programarse para que fueran memorias que la red recordaba al presentarle una versión ruidosa. Hopfield mostró, además, que su red podía atacar problemas de optimización como el viajante de comercio (TSP): bastaba codificar el costo como una función de energía y dejar que la red relajara. Fue un empujón enorme: de golpe las redes neuronales dejaban de ser juguetes curiosos y se convertían en objetos con anclaje físico, teoría propia, y aplicaciones concretas.

La segunda fue el **paper de 1986** de David Rumelhart, Geoffrey Hinton y Ronald Williams — *Learning representations by back-propagating errors* — publicado en *Nature*. No inventaron backpropagation (Werbos lo había hecho en 1974; Linnainmaa algo parecido en 1970), pero sí le dieron exposición, aplicaciones concretas y, sobre todo, **la demostración de que las capas ocultas aprenden representaciones internas útiles**. Su experimento más célebre entrenó una red 8-2-8 para detectar si un patrón binario era simétrico. Con sólo dos neuronas ocultas — dos bits de información, cuatro estados posibles — la red descubrió por sí sola que lo relevante eran los dos ejes de simetría. Nadie le había dicho que mirara ejes; la red los encontró porque eran la representación más compacta que reducía el error.

Ese fue el mensaje filosófico. Backpropagation no era solo una receta para ajustar pesos: era una demostración de que **las redes profundas aprenden jerarquías de conceptos**, de lo simple a lo abstracto. Era el principio del deep learning, veinticinco años antes de que alguien lo llamara así.

### 1.3 El segundo invierno (1990–2005): éxitos que no alcanzaron

Paradójicamente, el resurgimiento causó su propio colapso. El segundo invierno fue más silencioso que el primero — no hubo un libro que lo disparara —, pero fue igual de largo. Cuatro fuerzas convergieron:

1. **Las promesas superaron a los resultados.** En los ochenta se prometían robots inteligentes, traducción automática fluida, visión por computadora. Lo que había eran redes pequeñas, entrenadas con miles de ejemplos, resolviendo problemas de juguete. La brecha entre la promesa y la realidad rompió la paciencia de los financiadores.
2. **El vanishing gradient**. Backpropagation funcionaba bien en redes de 2 o 3 capas, pero en cuanto se intentaba algo más profundo los gradientes se apagaban exponencialmente al propagarse hacia atrás. Las capas inferiores dejaban de aprender. El problema no tenía nombre todavía, pero todo el mundo lo sufría.
3. **Overfitting sin herramientas**. No había dropout, ni batch normalization, ni arquitecturas residuales. Con pocos datos y muchos parámetros, las redes memorizaban.
4. **La aparición de las SVMs**. Vladimir Vapnik y colaboradores popularizaron las *Support Vector Machines* con kernels, que resolvían muchos problemas con garantías teóricas duras, optimización convexa (sin mínimos locales) y menos hiperparámetros. Para el investigador promedio, una SVM era una mejor apuesta: más robusta, más predecible, más publicable.

El resultado fue un éxodo silencioso. Desde 1995 hasta 2006, las redes neuronales fueron reducidas a nichos pequeños — Yann LeCun trabajando en CNNs en Bell Labs y AT&T, Schmidhuber y Hochreiter en LSTMs en Múnich, Hinton, Bengio y algunos otros sosteniendo el programa contra viento y marea. Para todo lo demás, SVMs y random forests dominaron la primera década del siglo.

### 1.4 El renacimiento moderno (2006–2011): la convergencia perfecta

En 2006, Geoffrey Hinton publicó *A Fast Learning Algorithm for Deep Belief Nets* y empezó a hablar de **deep learning**. Proponía entrenar redes profundas **capa por capa**, primero como autoencoders no supervisados, y sólo después afinarlas con backpropagation. Esa estrategia hacía que el vanishing gradient fuera manejable, y — crucialmente — devolvía la idea de que *sí se podía* entrenar redes profundas. Hinton ganó visibilidad, y otros laboratorios empezaron a volver.

Lo que terminó de cerrar el círculo fue el **hardware**. NVIDIA había liberado CUDA en 2006, convirtiendo las GPUs — pensadas para videojuegos — en máquinas de cálculo matricial masivamente paralelo. Y eso era exactamente lo que una red neuronal necesita: millones de multiplicaciones de matrices. Entrenamientos que antes tomaban semanas pasaron a tomar días; experimentos que tomaban días pasaron a tomar horas. Sumá **ImageNet** (Fei-Fei Li, 2009), un dataset con 14 millones de imágenes etiquetadas a mano, y tenés los tres ingredientes en la mesa: datos, cómputo y algoritmos.

El disparo final — AlexNet en 2012 — lo dejamos para el próximo post. Lo que importa acá es el patrón: las redes neuronales no "volvieron" porque alguien tuviera una idea genial. Volvieron porque tres curvas exponenciales distintas se cruzaron en el mismo momento.

---

## 2. Backpropagation: el algoritmo que descongeló el invierno

Si hay un concepto que hay que dominar de esta era, es **backpropagation**. Es la razón técnica por la cual el primer invierno terminó. Es el mecanismo por el cual las redes profundas aprenden. Y, sorprendentemente, la idea matemática es tan simple que cabe en una servilleta: **regla de la cadena, aplicada con cuidado, desde la salida hacia la entrada**.

<div class="two-col">
  <div class="col">
    <h3>La analogía: rastrear responsabilidades</h3>

    <p>Imaginá que cocinaste un plato y salió mal. El sabor final es incorrecto. ¿Cuál ingrediente cambió? Podés ir hacia atrás: el caldo tenía demasiada sal, y al caldo le pusiste una cucharada de más. Entonces la próxima vez ponés menos. Pero si el error estaba en el adobo, y el adobo usaba un ingrediente concreto — tenés que ir más atrás todavía.</p>

    <p>Backpropagation es exactamente eso. El error está en la salida. Querés saber <em>qué peso de qué capa ajustar</em>. Y para eso, recorrés la red al revés: empezás por la salida, calculás su error, luego preguntás a cada neurona oculta <em>cuánto contribuiste al error de la siguiente capa</em>, ponderado por el peso de la conexión. Ese es el <strong>delta</strong> de cada neurona. Con los deltas en mano, el gradiente de cada peso es una multiplicación simple.</p>

    <blockquote>Si cometiste un error en un examen, preguntás primero qué pregunta fallaste más, después qué tema de estudio alimentaba esa pregunta, después qué subtema. La responsabilidad baja desde lo agregado hacia lo específico. Backpropagation hace esto, pero con derivadas parciales.</blockquote>

    <p>La innovación filosófica no fue solo la receta matemática. Fue mostrar que <strong>las capas ocultas aprenden representaciones internas</strong> — no memorizan, <em>comprimen</em> — y que esas representaciones son las que hacen posible la generalización.</p>
  </div>

  <div class="col">
    <h3>La matemática, capa por capa</h3>

    <p><strong>Forward pass.</strong> Para cada neurona $j$ en cualquier capa:</p>

    $$x_j = \sum_i y_i\, w_{ji} + b_j, \qquad y_j = \sigma(x_j) = \frac{1}{1 + e^{-x_j}}$$

    <p>donde $y_i$ son las activaciones de la capa previa, $w_{ji}$ los pesos, $b_j$ el bias. Al final, la red produce una salida $\hat{y}$.</p>

    <p><strong>Función de costo.</strong> Error cuadrático sobre $C$ ejemplos y $m$ salidas:</p>

    $$E = \tfrac{1}{2}\sum_{c=1}^{C}\sum_{j=1}^{m} (y_{j,c} - d_{j,c})^2$$

    <p><strong>Backward pass.</strong> Para cada neurona de salida, el delta es el error local:</p>

    $$\delta_j = (y_j - d_j)\,\sigma'(x_j)$$

    <p>Para una neurona oculta, el delta se calcula desde los deltas de la capa que alimenta, usando la regla de la cadena:</p>

    $$\delta_i = \sigma'(x_i)\sum_j w_{ji}\,\delta_j$$

    <p><strong>Gradiente y actualización.</strong> Una vez que todos los deltas están, el gradiente de cualquier peso es un producto, y el peso se actualiza por descenso de gradiente con tasa $\varepsilon$:</p>

    $$\frac{\partial E}{\partial w_{ji}} = \delta_j\, y_i, \qquad w_{ji} \leftarrow w_{ji} - \varepsilon\,\delta_j\, y_i$$

    <p>Rumelhart et al. agregaron <strong>momentum</strong> para acelerar la convergencia: $\Delta w(t) = -\varepsilon\,\partial E/\partial w + \alpha\,\Delta w(t-1)$, con $\alpha \approx 0.9$.</p>
  </div>
</div>

### 2.1 Un ejemplo numérico de principio a fin: red 2-2-1

Nada fija mejor la intuición que hacer la cuenta. Vamos con una red minúscula: dos entradas, dos neuronas ocultas, una salida. Pesos iniciales elegidos a mano para que los números queden prolijos. Ignoramos biases por brevedad.

**Arquitectura y pesos**:
- Capa entrada→oculta: $w_{1,1}=0.5,\ w_{1,2}=-0.3,\ w_{2,1}=0.2,\ w_{2,2}=0.4$
- Capa oculta→salida: $w_{\text{out},1}=0.6,\ w_{\text{out},2}=-0.2$
- Entrada: $x_1=1.0,\ x_2=0.5$. Target: $d=1.0$. Tasa: $\varepsilon = 0.5$.

**Forward pass**.
$$x^{(h)}_1 = 1.0\cdot 0.5 + 0.5\cdot 0.2 = 0.6,\quad h_1 = \sigma(0.6) = 0.6456$$
$$x^{(h)}_2 = 1.0\cdot(-0.3) + 0.5\cdot 0.4 = -0.1,\quad h_2 = \sigma(-0.1) = 0.4750$$
$$x^{(o)} = 0.6456\cdot 0.6 + 0.4750\cdot(-0.2) = 0.2923,\quad \hat{y} = \sigma(0.2923) = 0.5724$$

**Error**: $E = \tfrac{1}{2}(0.5724 - 1.0)^2 = 0.0915$. La red dice 0.57 pero debería decir 1.0.

**Backward pass**. Primero el delta de salida, con $\sigma'(x) = \sigma(x)(1-\sigma(x))$:
$$\delta_{\text{out}} = (0.5724 - 1.0)\cdot 0.5724\cdot(1 - 0.5724) = -0.4276 \cdot 0.2448 = -0.1048$$

Luego los deltas ocultos, propagando hacia atrás:
$$\delta_1 = 0.2288 \cdot (0.6 \cdot -0.1048) = -0.0144$$
$$\delta_2 = 0.2494 \cdot (-0.2 \cdot -0.1048) = +0.0052$$

**Gradientes y actualización** en la capa oculta→salida:
$$\frac{\partial E}{\partial w_{\text{out},1}} = -0.1048 \cdot 0.6456 = -0.0676 \;\Rightarrow\; w_{\text{out},1} \leftarrow 0.6 + 0.0338 = 0.6338$$
$$\frac{\partial E}{\partial w_{\text{out},2}} = -0.1048 \cdot 0.4750 = -0.0498 \;\Rightarrow\; w_{\text{out},2} \leftarrow -0.2 + 0.0249 = -0.1751$$

Y análogamente para los cuatro pesos entrada→oculta. Una sola iteración bajó el error. Repetí miles de veces con miles de ejemplos y la red converge.

### 2.2 Explorador de backpropagation

Esta es la visualización más importante del post. Una red configurable — podés elegir número de capas ocultas y neuronas por capa —, podés cambiar la **función de activación** (sigmoide, ReLU, tanh), elegir entre los datasets **XOR**, **AND**, **OR**, y correr el entrenamiento **paso a paso** o **automático**. Click sobre cualquier neurona o conexión para ver su valor exacto. El panel de abajo grafica la pérdida época a época.

<div id="viz-backprop" class="viz">
  <h3 class="viz-title">Visualización 2 · explorador de backpropagation</h3>
  <p class="viz-sub">Configurá la arquitectura, elegí un dataset y mirá la red aprender. Cada botón de <strong>paso</strong> hace una iteración completa forward+backward+update.</p>
  <div class="viz-stage"></div>
  <div class="viz-controls"></div>
  <div class="viz-readout"></div>
</div>

### 2.3 Código Python: backpropagation desde cero

```python
import numpy as np

class SimpleNetwork:
    def __init__(self, layer_sizes, learning_rate=0.5):
        self.learning_rate = learning_rate
        self.layer_sizes = layer_sizes
        self.num_layers = len(layer_sizes)
        self.weights = []
        self.biases = []
        for i in range(self.num_layers - 1):
            w = np.random.randn(layer_sizes[i], layer_sizes[i+1]) * 0.5
            b = np.random.randn(layer_sizes[i+1]) * 0.1
            self.weights.append(w)
            self.biases.append(b)

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

    def sigmoid_derivative(self, output):
        return output * (1 - output)

    def forward(self, x):
        activations = [x]
        for layer_idx in range(self.num_layers - 1):
            net = np.dot(activations[-1], self.weights[layer_idx]) + self.biases[layer_idx]
            activations.append(self.sigmoid(net))
        return activations

    def backward(self, activations, target):
        deltas = [None] * self.num_layers
        output = activations[-1]
        deltas[-1] = (output - target) * self.sigmoid_derivative(output)
        for layer_idx in range(self.num_layers - 2, 0, -1):
            deltas[layer_idx] = (
                np.dot(deltas[layer_idx + 1], self.weights[layer_idx].T) *
                self.sigmoid_derivative(activations[layer_idx])
            )
        for layer_idx in range(self.num_layers - 1):
            gradient = np.outer(activations[layer_idx], deltas[layer_idx + 1])
            self.weights[layer_idx] -= self.learning_rate * gradient
            self.biases[layer_idx]  -= self.learning_rate * deltas[layer_idx + 1]

    def train(self, X, y, epochs=2000):
        errors = []
        for epoch in range(epochs):
            epoch_error = 0
            for i in range(len(X)):
                activations = self.forward(X[i])
                epoch_error += 0.5 * np.sum((activations[-1] - y[i]) ** 2)
                self.backward(activations, y[i])
            errors.append(epoch_error / len(X))
        return np.array(errors)

# XOR: el problema que había matado al perceptrón
X_xor = np.array([[0,0],[0,1],[1,0],[1,1]])
y_xor = np.array([[0],  [1],  [1],  [0]])

net = SimpleNetwork([2, 4, 1], learning_rate=0.5)
errors = net.train(X_xor, y_xor, epochs=2000)

for x in X_xor:
    print(x, "->", net.forward(x)[-1])
```

Este código es, literalmente, el fin del primer invierno de la IA. En menos de 60 líneas resuelve el problema que en 1969 parecía imposible.

---

## 3. Arquitecturas especializadas: CNNs para imágenes, RNNs para secuencias

Con backpropagation funcionando, los investigadores empezaron a diseñar **arquitecturas** más que redes genéricas. La idea: si sabés algo sobre la estructura del problema — que los píxeles cercanos están relacionados, que el tiempo fluye en un orden — codificalo en la arquitectura, y no dejes que la red lo descubra por sí misma a partir de datos. Dos familias aparecieron en ese espíritu: las redes convolucionales para visión, y las redes recurrentes para secuencias.

<div class="two-col">
  <div class="col">
    <h3>CNNs: compartir pesos para ver</h3>

    <p>Una imagen tiene una estructura muy particular. Los píxeles cercanos suelen pertenecer al mismo objeto. Un borde o una textura se puede encontrar en cualquier parte de la imagen — si una red aprendió a detectar una línea diagonal en la esquina superior, debería poder reconocerla en la esquina inferior sin aprender de cero.</p>

    <p>Esas dos observaciones dan la receta de una <strong>capa convolucional</strong>: un pequeño filtro — por ejemplo $3\times 3$ — se <em>desliza</em> por toda la imagen y produce una nueva imagen donde cada píxel es el resultado de aplicar el filtro a esa región. Los pesos del filtro se comparten en todas las posiciones. Esto da dos ventajas enormes:</p>

    <ul>
      <li><strong>Invariancia traslacional.</strong> Lo que la red aprende funciona en cualquier parte de la imagen.</li>
      <li><strong>Muchos menos parámetros.</strong> Un MLP que conecte todos los píxeles de una imagen de 224×224 a una capa oculta de 1000 neuronas tiene ~50 millones de pesos. Una capa convolucional con 32 filtros de 3×3 tiene menos de 300.</li>
    </ul>

    <p>La primera CNN exitosa fue <strong>LeNet-5</strong> (Yann LeCun, 1998), usada para leer números escritos a mano en cheques bancarios. Tenía 7 capas y unos 60.000 parámetros. Durante el segundo invierno fue una rareza: todos los demás usaban SVMs con features hechas a mano. LeCun, obstinado, siguió refinando su arquitectura. Catorce años después, AlexNet probaría que tenía razón.</p>
  </div>

  <div class="col">
    <h3>RNNs y LSTM: neuronas con memoria</h3>

    <p>Para secuencias — texto, audio, series de tiempo — el problema es diferente. El orden importa, y el contexto se extiende hacia atrás. Una red <strong>recurrente</strong> (RNN) procesa la secuencia un elemento a la vez y mantiene un <strong>estado oculto</strong> que se actualiza en cada paso:</p>

    $$h_t = \sigma(W_x x_t + W_h h_{t-1} + b)$$

    <p>Ese estado oculto es, en principio, una memoria que recuerda lo que la red vio antes. En la práctica, entrenar una RNN con backpropagation sobre secuencias largas revive el <strong>vanishing gradient</strong>: al propagar el error hacia atrás muchos pasos, los gradientes mueren. La RNN "olvida" dependencias más allá de unos pocos pasos.</p>

    <p>La solución llegó en 1997 con <strong>LSTM</strong> (Hochreiter &amp; Schmidhuber). La idea: agregar una <em>celda de memoria</em> protegida por tres puertas multiplicativas.</p>

    <ul>
      <li><strong>Forget gate</strong>: decide qué olvidar del estado anterior.</li>
      <li><strong>Input gate</strong>: decide qué información nueva guardar.</li>
      <li><strong>Output gate</strong>: decide qué parte de la memoria exponer.</li>
    </ul>

    <p>La celda se mantiene relativamente estable a lo largo del tiempo — los gradientes fluyen por ella casi sin atenuarse. Eso hizo posibles redes recurrentes que aprenden dependencias de cientos de pasos.</p>

    <p>LSTM fue durante una década el caballo de batalla del NLP. Machine translation en 2014, reconocimiento de voz, modelos de lenguaje: todo pasó por LSTM antes de que los Transformers tomaran el relevo en 2017.</p>
  </div>
</div>

### 3.1 Convolución en vivo

La operación central de una CNN — convolucionar una imagen con un filtro pequeño — es muy visual y muy fácil de intuir. Esta visualización te permite mover el filtro sobre la imagen y ver, píxel a píxel, cómo se construye la salida. Trae seis filtros preparados: identidad, bordes, realce, desenfoque y los dos Sobel.

<div id="viz-convolution" class="viz">
  <h3 class="viz-title">Visualización 3 · convolución, píxel a píxel</h3>
  <p class="viz-sub">Una imagen sintética de 10×10, un filtro 3×3 y la salida calculándose en tiempo real. Mueve la ventana, elige un filtro, y abajo verás los nueve productos que dan ese píxel.</p>
  <div class="viz-stage"></div>
  <div class="viz-controls"></div>
</div>

---

## 4. Big Data, GPUs, algoritmos: por qué todo pasó a la vez

El detalle que todo el mundo pasa por alto cuando cuenta la historia del deep learning es este: **ninguna idea nueva** hizo despertar al campo en 2006. Backpropagation ya existía desde 1986 (y desde 1974 si contás a Werbos). LSTM era de 1997. Las CNNs eran de 1998. *Todo ya estaba inventado*. Lo que faltaba no era algoritmo: eran los otros dos lados del triángulo.

**Datos.** Una red con muchos parámetros necesita muchos ejemplos, o se sobreajusta. En los ochenta, un dataset "grande" tenía miles de ejemplos. Con miles no alcanzaba. Y entonces vino Internet, y con Internet: ImageNet (14 millones de imágenes etiquetadas), YouTube, Wikipedia, los logs de millones de búsquedas. Fei-Fei Li tardó dos años en reclutar anotadores de Amazon Mechanical Turk para armar ImageNet. Fue un trabajo logístico descomunal — pero cambió todo lo que vino después.

**Cómputo.** El segundo ingrediente. Entrenar una CNN de 60 millones de parámetros sobre 1.2 millones de imágenes en una CPU tomaba meses. Pero una red neuronal es, en el fondo, multiplicaciones de matrices — y NVIDIA venía diseñando hardware para eso desde los noventa, con un propósito completamente distinto: gráficos 3D para videojuegos. Cuando NVIDIA lanzó CUDA en 2006, de golpe se podía usar una GPU para cálculo genérico. Las GPUs eran 10, 100, 1000 veces más rápidas que las CPUs para el trabajo concreto de una red neuronal. Entrenar AlexNet llevó 5–6 días en dos GTX 580, en vez de los meses que hubiera tomado en un clúster de CPUs.

**Algoritmos refinados.** El tercer ingrediente, más sutil. Durante los 2000 fueron apareciendo mejoras específicas que, sumadas, hacían viable entrenar redes de verdad profundas: ReLU en lugar de sigmoide (gradientes más gruesos), inicialización cuidadosa de pesos (Xavier, He), dropout como regularización, batch normalization, Adam como optimizador. Ninguna de estas cosas es revolucionaria por sí sola; son ingeniería. Pero sin ellas, las dos otras piezas no alcanzan.

<div id="viz-convergence" class="viz">
  <h3 class="viz-title">Visualización 4 · la convergencia perfecta</h3>
  <p class="viz-sub">Los tres ingredientes —algoritmos, cómputo y datos— y la fecha en que cada uno estuvo disponible. Mueve el año y mira cuántos había. Las franjas son esquemáticas; los hitos, fechas citadas en este mismo artículo.</p>
  <div class="viz-stage"></div>
  <div class="viz-controls"></div>
</div>

### 4.1 Hardware en una tabla

| Tecnología | Año clave | Speedup típico | Aplicación principal |
|---|---|---|---|
| CPU (Intel Xeon) | 1990s | 1x (baseline) | Investigación inicial |
| GPU (NVIDIA GTX) | 2006+ | 10–100x | Entrenamiento de DL en laboratorios |
| GPU (Tesla) | 2010+ | 100–1000x | Datacenters, cloud |
| TPU (Google) | 2016+ | >1000x | Inferencia y entrenamiento a escala |
| FPGA / ASIC | 2015+ | variable | Inferencia en edge, dispositivos móviles |

La lección es simple: **GPU fue el factor crítico**. Antes, entrenar AlexNet hubiera tomado meses en CPUs. Con GPUs, tomaba días. Eso cambió el ritmo al que se podía iterar, y cuando el ritmo de iteración se acelera, las ideas empiezan a ganarle a los obstáculos.

---

## 5. Cierre: el puente hacia AlexNet

Terminamos el post a las puertas de 2012. Todo está en su lugar: backpropagation entendido, CNNs y RNNs diseñadas, GPUs disponibles, ImageNet publicado, un puñado de laboratorios creyendo contra todo pronóstico que esto va a funcionar. En septiembre de 2012, Alex Krizhevsky, Ilya Sutskever y Geoffrey Hinton publican los resultados de AlexNet: error top-5 en ImageNet de 15.3%, contra el 26.2% del segundo lugar. No es una mejora incremental; es una ruptura.

Ese es el tema del **próximo post**. En él vamos a mirar por dentro a AlexNet, cómo usó ReLU, dropout, data augmentation y GPUs de una forma que nadie había combinado antes. Vamos a seguir la evolución hacia VGG, Inception, ResNet — cada una agregando una idea específica (más profundidad, módulos paralelos, skip connections) que permitió ir más abajo sin que todo se derrumbara. Y vamos a hablar del estallido: cómo, en 3 años, el deep learning pasó de nicho a dominar visión por computadora, reconocimiento de voz, traducción automática, y eventualmente — con los Transformers — modelos de lenguaje generativos.

Lo que hay que llevarse de este post es la idea de **convergencia**. El deep learning no fue una revolución algorítmica. Fue un conjunto de ideas viejas que, cuando se encontraron con suficientes datos y suficiente cómputo, reventaron al mismo tiempo. Los inviernos no fueron errores; fueron compases de espera para que los otros ingredientes alcanzaran al algoritmo. La próxima vez que una tecnología parezca estancada, vale la pena preguntar cuál de los tres lados del triángulo le falta — porque probablemente el progreso está ahí, esperando una curva exponencial más.

---

### Lecturas recomendadas

- **Minsky, M. L., & Papert, S. A. (1969).** *Perceptrons: An Introduction to Computational Geometry.* MIT Press. — el libro que inició el primer invierno.
- **Hopfield, J. J. (1982).** *Neural networks and physical systems with emergent collective computational abilities.* PNAS, 79(8), 2554–2558.
- **Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986).** *Learning representations by back-propagating errors.* Nature, 323(6088), 533–536.
- **LeCun, Y., Bottou, L., Bengio, Y., & Haffner, P. (1998).** *Gradient-based learning applied to document recognition.* Proceedings of the IEEE, 86(11), 2278–2324. — el paper de LeNet-5.
- **Hochreiter, S., & Schmidhuber, J. (1997).** *Long short-term memory.* Neural Computation, 9(8), 1735–1780.
- **Hinton, G. E., Osindero, S., & Teh, Y.-W. (2006).** *A fast learning algorithm for deep belief nets.* Neural Computation, 18(7), 1527–1554.
- **Deng, J. et al. (2009).** *ImageNet: A large-scale hierarchical image database.* CVPR.

<script src="{{ '/assets/posts/avances-redes-neuronales/ai-winters.js' | relative_url }}"></script>
<script src="{{ '/assets/posts/avances-redes-neuronales/backprop-explorer.js' | relative_url }}"></script>
<script src="{{ '/assets/posts/avances-redes-neuronales/convolution-playground.js' | relative_url }}"></script>
<script src="{{ '/assets/posts/avances-redes-neuronales/convergence-dashboard.js' | relative_url }}"></script>
