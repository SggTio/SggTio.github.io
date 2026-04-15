---
layout: post
title: "Los cimientos de la inteligencia artificial: de la neurona lógica al MLP"
date: 2026-04-14
section: mates
subsection: redes-neuronales
math: true
wide: true
description: "Un viaje histórico y técnico desde Cajal hasta el perceptrón multicapa, con visualizaciones interactivas de McCulloch-Pitts, Turing, Rosenblatt y backpropagation."
extra_css:
  - /assets/posts/fundamentos-redes-neuronales/post.css
---

<div class="post-meta-chips">
  <span>historia de la ia</span>
  <span>redes neuronales</span>
  <span>mcculloch-pitts</span>
  <span>turing</span>
  <span>perceptrón</span>
  <span>mlp</span>
  <span>backpropagation</span>
</div>

<p class="lead">
Imaginemos que es 1943. La Segunda Guerra Mundial aún devasta Europa. En un mundo donde las computadoras ocupaban habitaciones completas y pesaban toneladas, dos matemáticos estadounidenses —Warren McCulloch, neurocientífico, y Walter Pitts, matemático— se sientan a escribir un artículo que cambiará para siempre cómo pensamos sobre la inteligencia, el cálculo y el cerebro. Aquella pregunta que se hicieron sigue resonando hoy: <em>¿puede algo mecánico, construido por el ser humano, pensar como el cerebro humano?</em>
</p>

Los quince años que siguieron fueron extraordinarios. Turing, padre de la informática teórica, reflexionó sobre máquinas que pueden *educarse a sí mismas*. Rosenblatt construyó la primera máquina de aprendizaje real, con engranajes zumbando y luces parpadeando. Y aquí estamos, ochenta años después, con sistemas de IA que escriben poesía, diagnostican enfermedades y traducen entre idiomas.

Este artículo es una inmersión en esos cimientos. No una historia superficial, sino un viaje técnico con ecuaciones, ejemplos numéricos paso a paso, código y **cinco visualizaciones interactivas** que podés manipular para ver las ideas operar por vos mismo.

---

## 1. Una línea de tiempo: del cerebro como red al primer aprendizaje

Antes de entrar en fórmulas, vale la pena situarse. Las ideas de McCulloch, Pitts, Turing y Rosenblatt no aparecen en el vacío. Son hijas de un siglo de neuroanatomía, de la crisis fundacional de las matemáticas, de la guerra y de las primeras computadoras electrónicas. Esta línea de tiempo recorre los cinco hitos que hacen falta para entender de dónde viene todo.

<div id="viz-timeline" class="viz">
  <h3 class="viz-title">Visualización 1 · línea de tiempo interactiva</h3>
  <p class="viz-sub">Click sobre cualquier hito para leer su contexto. Empieza con Cajal y termina con el perceptrón.</p>
  <div class="viz-stage"></div>
  <div class="tl-panel"></div>
</div>

La conclusión es simple: en 1943 ya había una *pregunta formal* sobre qué podía hacer una red de unidades simples. En 1948 ya había una *intuición clara* de que la clave no era programar inteligencia, sino programar aprendizaje. En 1958 había, por primera vez, *una máquina real* que aprendía por sí sola. El resto es historia — pero toda la arquitectura conceptual de la IA moderna ya estaba ahí.

---

## 2. Dos caminos paralelos: la neurona lógica y la máquina educable

Durante los años cuarenta, dos ideas avanzaron en paralelo sin saber del todo que iban a terminar fusionándose. McCulloch y Pitts preguntaban *¿cómo se puede computar con algo que se parezca a una neurona?* Turing, en cambio, preguntaba *¿cómo puede una máquina aprender de su propia experiencia?* Una mira al cerebro; la otra, al cachorro que castigamos y premiamos.

<div class="two-col">
  <div class="col">
    <h3>McCulloch &amp; Pitts (1943)</h3>

    <p>Una neurona es un <strong>procesador todo-o-nada</strong>. Recibe señales binarias por sus dendritas, las pondera por pesos sinápticos (excitadores o inhibidores), suma todo, y dispara un <code>1</code> si la suma alcanza un umbral; si no, emite un <code>0</code>.</p>

    $$
    y = \begin{cases}
    1 & \text{si } \sum_{i=1}^{n} x_i w_i \geq \theta \\
    0 & \text{si } \sum_{i=1}^{n} x_i w_i < \theta
    \end{cases}
    $$

    <p>Con pesos fijos y umbral apropiado se pueden construir todas las puertas lógicas: <strong>AND</strong> con $w_1 = w_2 = 1$, $\theta = 2$; <strong>OR</strong> con $\theta = 1$; <strong>NOT</strong> combinando una entrada constante (bias) y una conexión inhibitoria.</p>

    <p>McCulloch y Pitts demostraron algo enorme: <em>redes de estas neuronas son Turing-completas</em>. Pueden computar cualquier cosa computable — con suficientes unidades. Sin aprendizaje, sin plasticidad. Solo estructura.</p>
  </div>

  <div class="col">
    <h3>Turing (1948) — máquinas educables</h3>

    <p>Cinco años después, Turing escribió <em>Intelligent Machinery</em>, un ensayo que permaneció inédito durante años. La pregunta era distinta: ¿por qué tenemos que fijar los pesos a mano? ¿Qué pasa si la máquina los ajusta por sí misma?</p>

    <p>Turing propuso las <strong>máquinas A-type</strong> (redes aleatorias de puertas NAND) y <strong>B-type</strong> (lo mismo, pero con conexiones modificadoras educables). La idea central: <em>punishment &amp; reward</em>.</p>

    <blockquote>Cuando la máquina comete un error, interferimos para que sea menos probable que lo repita. Cuando acierta, reforzamos las conexiones que llevaron a esa salida.</blockquote>

    <p>En lenguaje moderno, Turing está describiendo <strong>aprendizaje por refuerzo</strong>, veinticinco años antes de que existiera el término. Y da un salto más: las <strong>máquinas P-type</strong> (placer-dolor) tienen entradas de recompensa y castigo, y ajustan sus acciones para maximizar placer y minimizar dolor. Es, literalmente, un agente de RL avant la lettre.</p>
  </div>
</div>

### 2.1 La neurona de McCulloch-Pitts, en vivo

Podés manipular los pesos y el umbral en esta visualización, encender y apagar las entradas, y ver la neurona disparar en tiempo real. Los presets cargan las configuraciones canónicas de AND, OR y NOT.

<div id="viz-mcp" class="viz">
  <h3 class="viz-title">Visualización 2 · neurona de McCulloch-Pitts</h3>
  <p class="viz-sub">Click sobre una entrada $x_i$ para alternar 0/1. Ajustá pesos y umbral con los deslizadores. Los presets cargan AND, OR, NOT.</p>
  <div class="viz-stage"></div>
  <div class="viz-controls"></div>
  <div class="viz-readout"></div>
</div>

#### Ejemplo numérico — la puerta AND

Con $w_1 = w_2 = 1$ y $\theta = 2$, recorramos la tabla de verdad:

| $x_1$ | $x_2$ | $x_1w_1 + x_2w_2$ | ¿$\geq \theta$? | $y$ |
|:---:|:---:|:---:|:---:|:---:|
| 0 | 0 | 0 | no | 0 |
| 0 | 1 | 1 | no | 0 |
| 1 | 0 | 1 | no | 0 |
| 1 | 1 | 2 | sí | 1 |

Funciona. Para OR bastan los mismos pesos con $\theta = 1$. Para NOT hay que aceptar una entrada constante (bias $=1$, peso $+1$) y otra inhibitoria (peso $-2$) con umbral $0.5$: cuando la entrada activa llega, la suma cae a $-1$ y la neurona se apaga.

#### Código Python

```python
import numpy as np

class McCullochPittsNeuron:
    def __init__(self, weights, threshold):
        self.weights = np.array(weights)
        self.threshold = threshold

    def forward(self, inputs):
        s = np.dot(self.weights, inputs)
        return 1 if s >= self.threshold else 0

and_neuron = McCullochPittsNeuron([1, 1], threshold=2)
or_neuron  = McCullochPittsNeuron([1, 1], threshold=1)
not_neuron = McCullochPittsNeuron([1, -2], threshold=0.5)  # [bias, x1]

for x1, x2 in [(0,0),(0,1),(1,0),(1,1)]:
    print(x1, x2, and_neuron.forward([x1, x2]), or_neuron.forward([x1, x2]))
```

El punto clave: **no hay aprendizaje**. Los pesos se fijan a mano, como quien cablea un circuito lógico. Para que la máquina se adapte hace falta algo más.

### 2.2 Turing educando una red NAND

Turing propuso una prueba conceptual demoledora: una red aleatoria de puertas NAND, lo suficientemente grande, puede computar casi cualquier cosa — si alguien se encarga de educarla. En las máquinas **B-type**, algunas conexiones llevan un "modificador" educable: un bit que la experiencia puede encender o apagar para reconfigurar la función que la red calcula.

La visualización siguiente es una versión mínima. Tres puertas NAND y un modificador $m$ en la conexión central. Hacé click en **Castigo** cuando la salida sea incorrecta, y el modificador se invertirá; probá con los cuatro casos de XOR y mirá cómo la red aprende a producir XOR *sin tocar un solo peso a mano*.

<div id="viz-turing" class="viz">
  <h3 class="viz-title">Visualización 3 · red NAND educable (Turing B-type)</h3>
  <p class="viz-sub">Alternar entradas y usar los botones de recompensa/castigo para ajustar el modificador. "Entrenar" recorre los cuatro casos de XOR automáticamente.</p>
  <div class="viz-stage"></div>
  <div class="viz-controls"></div>
  <div class="viz-readout"></div>
</div>

Es un ejemplo ridículamente pequeño, pero contiene la idea que Turing tenía en la cabeza en 1948: **una máquina suficientemente genérica más una señal externa de recompensa alcanza para hacer emerger comportamiento específico**. Lo que Turing no tenía — y tardaría otra década en aparecer — era una regla de aprendizaje explícita que se pudiera ejecutar sobre una máquina física real.

---

## 3. De la idea a la máquina: perceptrón y redes multicapa

Quince años después de McCulloch-Pitts y diez después de Turing, Frank Rosenblatt construyó algo que ninguno de ellos había construido: **una máquina física de aprendizaje**. No una simulación, no un diagrama. Una máquina real, con fotocélulas que captaban luz y potenciómetros motorizados que ajustaban los pesos en tiempo real.

### 3.1 Rosenblatt y el perceptrón (1958)

El perceptrón tenía tres capas de unidades. Las **S-points** (*sensory units*) eran 400 fotocélulas — una cuadrícula de $20 \times 20$ que cumplía el rol de una retina. Las **A-units** (*association units*) eran unidades intermedias que combinaban información de múltiples S-points; su cableado a menudo se elegía al azar. Las **R-units** (*response units*) producían la salida final: "es un perro" / "no es un perro".

**La innovación** estaba en las conexiones entre A-units y R-units: esos pesos eran **ajustables** — y se ajustaban automáticamente mediante una regla de aprendizaje.

La promesa fue épica. Rosenblatt declaró ante la prensa que el perceptrón "algún día podrá andar por las calles, conversar con la gente, entender la televisión, y quizás hasta comprender las leyes de la física". Era optimismo exagerado, como veremos, pero la tecnología subyacente era genuinamente revolucionaria.

#### La regla de aprendizaje del perceptrón

Este es el corazón de lo que Rosenblatt aportó. Una regla **incremental** que ajusta los pesos a cada error:

$$
w_i^{\text{nuevo}} = w_i^{\text{viejo}} + \eta \, (y_{\text{esperado}} - y_{\text{actual}}) \, x_i
$$

donde $\eta$ es la tasa de aprendizaje (típicamente $0.01$–$0.1$). En palabras: **si la salida fue correcta, no toques nada; si fue demasiado baja, empujá los pesos hacia arriba en la dirección de las entradas activas; si fue demasiado alta, hacé lo contrario**. Repetí hasta converger.

Rosenblatt demostró algo crucial, el **teorema de convergencia del perceptrón**: si los datos son **linealmente separables**, esta regla encuentra los pesos correctos en un número finito de pasos. No es un resultado estadístico; es una garantía dura.

#### Ejemplo numérico

Supongamos dos clases en el plano: puntos cerca de $(2,2)$ pertenecen a la clase $1$, puntos cerca de $(-1,-1)$ a la clase $0$. Con pesos iniciales $w_1 = 0.2$, $w_2 = 0.3$, bias $w_0 = 0.1$, tasa $\eta = 0.1$ y umbral $\theta = 0.5$:

- **P1** $= (1,1)$, clase $1$. Suma $= 0.1 + 0.2 + 0.3 = 0.6 \geq 0.5$ → sale $1$ ✓.
- **P2** $= (2,2)$, clase $1$. Suma $= 0.1 + 0.4 + 0.6 = 1.1$ → sale $1$ ✓.
- **P3** $= (0.5,0.5)$, clase $0$. Suma $= 0.1 + 0.1 + 0.15 = 0.35 < 0.5$ → sale $0$ ✓.
- **P4** $= (0,0)$, clase $0$. Suma $= 0.1$ → sale $0$ ✓.

Con estos pesos iniciales no hubo actualizaciones. Si en cambio P4 hubiera salido mal (output $1$ en lugar de $0$), el error sería $e = 0 - 1 = -1$ y los pesos se actualizarían como $w_0 \leftarrow 0.1 - 0.1 = 0$ y $w_1, w_2$ sin cambios (porque $x_1 = x_2 = 0$). El bias baja, haciendo que la neurona sea menos propensa a activarse en el origen.

#### Código Python

```python
import numpy as np

class Perceptron:
    def __init__(self, lr=0.01, epochs=100, threshold=0.5):
        self.lr = lr
        self.epochs = epochs
        self.threshold = threshold
        self.w = None
        self.b = None

    def fit(self, X, y):
        n, d = X.shape
        self.w = np.random.randn(d) * 0.01
        self.b = np.random.randn() * 0.01
        for epoch in range(self.epochs):
            errors = 0
            for i in range(n):
                s = np.dot(self.w, X[i]) + self.b
                out = 1 if s >= self.threshold else 0
                e = y[i] - out
                if e != 0:
                    self.w += self.lr * e * X[i]
                    self.b += self.lr * e
                    errors += 1
            if errors == 0:
                print(f"converged @ epoch {epoch+1}")
                return

    def predict(self, X):
        return (X @ self.w + self.b >= self.threshold).astype(int)
```

#### El perceptrón, en vivo

Esta visualización entrena un perceptrón sobre puntos que podés generar a mano. Hacé click en el plano para añadir puntos azules (clase $1$); usá **Shift+Click** para añadir puntos rojos (clase $0$). Luego presioná **Entrenar** y mirá cómo la frontera de decisión se mueve paso a paso hasta encontrar una recta que separa las dos nubes.

<div id="viz-perceptron" class="viz">
  <h3 class="viz-title">Visualización 4 · perceptrón de Rosenblatt</h3>
  <p class="viz-sub">Click: clase 1 (azul). Shift+Click: clase 0 (rojo). "1 época" hace una pasada; "Entrenar" ejecuta varias y anima la frontera.</p>
  <div class="viz-stage"></div>
  <div class="viz-controls"></div>
  <div class="viz-readout"></div>
</div>

#### El talón de Aquiles: XOR

Hay un detalle incómodo en todo esto. El perceptrón puede aprender cualquier función *linealmente separable* — pero la función XOR no lo es.

| $x_1$ | $x_2$ | XOR |
|:---:|:---:|:---:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Si dibujás estos cuatro puntos en un plano y tratás de separar los dos "1" de los dos "0" con una sola recta, no hay manera. Minsky y Papert demostraron esto con rigor en *Perceptrons* (1969) y, casi sin querer, iniciaron el primer invierno de la IA. Durante una década el campo casi dejó de existir.

Pero el diagnóstico tenía trampa. No es que las redes neuronales fueran débiles. Es que **un perceptrón de una capa** es débil. Si podés apilar varias, todo cambia.

### 3.2 El perceptrón multicapa (MLP): rompiendo la linealidad

Volvamos a XOR. El problema no es la regla de aprendizaje — es que una sola recta no alcanza. Pero mirá XOR con otros ojos: $(0,1)$ y $(1,0)$ dan $1$; $(0,0)$ y $(1,1)$ dan $0$. Lo que necesitamos es algo así como *"una entrada encendida y la otra no"*.

Eso se puede descomponer. Si entreno una neurona que responda a "$x_1$ pero no $x_2$" y otra que responda a "$x_2$ pero no $x_1$", entonces **la OR de esas dos neuronas intermedias me da XOR**. Dos cortes lineales arriba, uno OR debajo: dos capas. Un **perceptrón multicapa**.

#### La arquitectura 2-2-1

Vamos al caso más pequeño posible que todavía es interesante: dos entradas, dos neuronas ocultas, una salida. Esto es lo que la visualización más abajo entrena desde cero.

$$
\begin{aligned}
z^{(1)} &= W^{(1)} x + b^{(1)} &\qquad W^{(1)} \in \mathbb{R}^{2 \times 2},\ b^{(1)} \in \mathbb{R}^{2} \\
h       &= \sigma(z^{(1)}) \\
z^{(2)} &= W^{(2)} h + b^{(2)} &\qquad W^{(2)} \in \mathbb{R}^{1 \times 2},\ b^{(2)} \in \mathbb{R} \\
\hat{y} &= \sigma(z^{(2)})
\end{aligned}
$$

donde $\sigma(z) = 1/(1 + e^{-z})$ es la **sigmoide**. Usamos sigmoide en lugar del escalón de McCulloch-Pitts por una razón crucial: la sigmoide es *derivable en todas partes*, y eso habilita backpropagation.

#### Pasada hacia adelante: forward pass

Tomemos, como ejemplo, una inicialización concreta. Supongamos

$$
W^{(1)} = \begin{pmatrix} 2 & 2 \\ -2 & -2 \end{pmatrix},\quad
b^{(1)} = \begin{pmatrix} -1 \\ 3 \end{pmatrix},\quad
W^{(2)} = \begin{pmatrix} 3 & 3 \end{pmatrix},\quad
b^{(2)} = -4.5
$$

y apliquemos la red al caso $x = (1, 0)$ (XOR esperado: $1$):

$$
z^{(1)} = \begin{pmatrix} 2 \cdot 1 + 2 \cdot 0 - 1 \\ -2 \cdot 1 - 2 \cdot 0 + 3 \end{pmatrix}
= \begin{pmatrix} 1 \\ 1 \end{pmatrix}
\;\Longrightarrow\; h = \begin{pmatrix} \sigma(1) \\ \sigma(1) \end{pmatrix} \approx \begin{pmatrix} 0.731 \\ 0.731 \end{pmatrix}
$$

$$
z^{(2)} = 3 \cdot 0.731 + 3 \cdot 0.731 - 4.5 \approx -0.11
\;\Longrightarrow\; \hat{y} = \sigma(-0.11) \approx 0.472
$$

El objetivo es $1$ pero la red dice $0.472$. Error: nos faltan unos $0.528$ para llegar al objetivo. La pregunta es: **¿cómo ajustamos los pesos para reducir ese error?**

#### Backpropagation: el gradiente que viaja hacia atrás

Definamos la pérdida cuadrática $L = \tfrac{1}{2}(\hat{y} - y)^2$. Queremos calcular $\partial L / \partial w$ para cada peso $w$ de la red. La receta es aplicar la regla de la cadena de afuera hacia adentro:

$$
\frac{\partial L}{\partial \hat{y}} = (\hat{y} - y), \qquad
\frac{\partial \hat{y}}{\partial z^{(2)}} = \sigma'(z^{(2)}) = \hat{y}(1 - \hat{y})
$$

Llamamos $\delta^{(2)} = \partial L / \partial z^{(2)} = (\hat{y} - y)\, \hat{y}(1 - \hat{y})$. Entonces:

$$
\frac{\partial L}{\partial W^{(2)}_j} = \delta^{(2)} \, h_j, \qquad
\frac{\partial L}{\partial b^{(2)}} = \delta^{(2)}
$$

Para la capa oculta, el gradiente viaja hacia atrás a través de $W^{(2)}$:

$$
\delta^{(1)}_j = \left(W^{(2)}_j \, \delta^{(2)}\right) \cdot h_j(1 - h_j)
$$

$$
\frac{\partial L}{\partial W^{(1)}_{jk}} = \delta^{(1)}_j \, x_k, \qquad
\frac{\partial L}{\partial b^{(1)}_j} = \delta^{(1)}_j
$$

La regla de actualización, como en el perceptrón pero ahora sobre todos los pesos a la vez:

$$
w \leftarrow w - \eta \frac{\partial L}{\partial w}
$$

**Lo importante de esto no son las fórmulas en sí.** Lo importante es que una red con capas intermedias y activaciones no lineales permite calcular el gradiente de la pérdida *respecto a cualquier peso* de forma eficiente, reutilizando cómputos que ya hiciste en el forward pass. Ese es el truco central. Es, en esencia, derivada parcial aplicada con mucha contabilidad — pero funciona.

#### Código Python: un MLP mínimo

```python
import numpy as np

def sigmoid(z):     return 1 / (1 + np.exp(-z))
def sigmoid_d(a):   return a * (1 - a)  # σ' en términos de la salida

class SimpleMLP:
    def __init__(self, n_in=2, n_hidden=2, n_out=1, seed=0):
        rng = np.random.default_rng(seed)
        self.W1 = rng.standard_normal((n_hidden, n_in))
        self.b1 = np.zeros(n_hidden)
        self.W2 = rng.standard_normal((n_out, n_hidden))
        self.b2 = np.zeros(n_out)

    def forward(self, x):
        self.x = x
        self.z1 = self.W1 @ x + self.b1
        self.h  = sigmoid(self.z1)
        self.z2 = self.W2 @ self.h + self.b2
        self.y_hat = sigmoid(self.z2)
        return self.y_hat

    def backward(self, y, lr):
        # Gradiente de la pérdida 1/2 (y_hat - y)^2
        d2 = (self.y_hat - y) * sigmoid_d(self.y_hat)
        dW2 = np.outer(d2, self.h)
        db2 = d2
        d1 = (self.W2.T @ d2) * sigmoid_d(self.h)
        dW1 = np.outer(d1, self.x)
        db1 = d1
        # Actualización
        self.W2 -= lr * dW2
        self.b2 -= lr * db2
        self.W1 -= lr * dW1
        self.b1 -= lr * db1

# XOR
X = np.array([[0,0],[0,1],[1,0],[1,1]], dtype=float)
Y = np.array([[0],[1],[1],[0]],         dtype=float)

net = SimpleMLP(seed=1)
for epoch in range(5000):
    loss = 0
    for x, y in zip(X, Y):
        y_hat = net.forward(x)
        loss += 0.5 * float((y_hat - y) ** 2)
        net.backward(y, lr=2.0)
    if epoch % 1000 == 0:
        print(f"epoch {epoch:4d}  loss {loss:.4f}")

print("predicciones:", [float(net.forward(x)) for x in X])
```

Si corrés esto, la pérdida baja de $\sim 1$ a valores cercanos a $0$ en unos miles de pasos y las predicciones se acercan a $[0, 1, 1, 0]$. Exactamente XOR.

#### El MLP aprendiendo XOR, en vivo

Esta es la visualización más importante del post. Una red 2-2-1 inicializada al azar. Presioná **Entrenar** y mirá cómo los pesos se reorganizan, los valores de cada neurona cambian, y la **frontera de decisión** en el pequeño plano de la derecha se deforma hasta envolver la diagonal de XOR con dos curvas suaves. Ningún perceptrón de una sola capa podría hacer eso.

<div id="viz-mlp" class="viz">
  <h3 class="viz-title">Visualización 5 · MLP 2-2-1 aprendiendo XOR</h3>
  <p class="viz-sub">"1 época" hace un paso de backprop. "Entrenar" corre hasta converger. El plano de la derecha muestra la frontera aprendida sobre los cuatro puntos de XOR (azul = 1, rojo = 0).</p>
  <div class="viz-stage"></div>
  <div class="viz-controls"></div>
  <div class="viz-readout"></div>
</div>

#### Limitaciones (y por qué esto no es todo)

Este MLP mínimo aprende XOR, sí, pero no es un modelo completo del deep learning moderno. Faltan piezas:

- **No hay mini-batches, ni regularización, ni momentum.** Para datasets no triviales, hace falta mucha más contabilidad.
- **La sigmoide sufre de gradientes que se desvanecen en redes profundas.** Por eso las arquitecturas modernas usan ReLU o variantes.
- **Solo tiene una capa oculta.** Redes modernas apilan docenas o cientos, y cada capa aprende representaciones cada vez más abstractas. Sin esa jerarquía no hay visión por computadora ni modelos de lenguaje.
- **Convergencia no garantizada.** Con pesos iniciales malos, el optimizador puede quedarse atrapado en mínimos locales o mesetas donde el gradiente es casi cero.

Pero los huesos del asunto están todos acá: forward pass, función de pérdida, gradiente hacia atrás, descenso. Todo lo que vino después — convoluciones, atención, transformers — son ideas *nuevas* montadas sobre este esqueleto. El esqueleto no cambió.

#### Un poco de historia: el redescubrimiento de backprop

El algoritmo de retropropagación no apareció de golpe. Paul Werbos lo describió en su tesis doctoral de 1974 y casi nadie se dio cuenta. Pero la referencia canónica en la memoria del campo es el paper de Rumelhart, Hinton y Williams de 1986, *"Learning representations by back-propagating errors"*, que popularizó la idea y mostró que funcionaba en la práctica. Ese trabajo, sumado al aumento progresivo del poder de cómputo durante los ochenta y noventa, puso fin al primer invierno de la IA y plantó la semilla de lo que, dos décadas más tarde, llamaríamos *deep learning*.

---

## 4. Analogías para entender (sin ecuaciones)

Si llegaste hasta acá y las matemáticas te marearon, nada de lo anterior necesita realmente un título en ingeniería. Las ideas centrales se pueden traducir a cosas cotidianas. Estas son las analogías que más me han ayudado a explicarle todo esto a amigos que no son del ambiente.

<div class="analogy-grid">
  <div class="analogy">
    <h4>Una neurona es un portero con umbral</h4>
    <p>Pensá en un portero de boliche que tiene que decidir si te deja pasar. No mira una sola cosa: mira ropa, actitud, hora, lista. Cada cosa le importa distinto — algunas mucho, otras nada, algunas te restan. Suma todo y compara con su umbral mental. Si la suma pasa el umbral, abrís la puerta. Si no, a tu casa. Una neurona de McCulloch-Pitts es exactamente eso, pero con fotocélulas en lugar de ojos y números en lugar de intuición.</p>
  </div>

  <div class="analogy">
    <h4>Aprender es como enseñar a un perro</h4>
    <p>Turing lo vio primero: no tiene sentido programar inteligencia directamente. Es mucho más fácil diseñar un sistema simple capaz de aprender, y enseñarle. Los perros no vienen sabiendo dar la pata; aprenden porque cuando la dan reciben un premio, y cuando muerden el sofá reciben un castigo. Una máquina P-type de Turing funciona igual: entradas de recompensa y castigo, y un mecanismo interno que ajusta el comportamiento para maximizar lo primero.</p>
  </div>

  <div class="analogy">
    <h4>Los pesos son botones de ecualizador</h4>
    <p>Imaginá una mesa de mezcla con muchos botones: cada uno amplifica o suprime cierta frecuencia. Al principio los botones están en cualquier posición y el sonido es horrible. Pero tenés un oído experto (la señal de error) que te dice "más grave, menos agudo". Ajustás un poco cada botón, volvés a escuchar, ajustás otro poco. Después de mil iteraciones el sonido está perfecto. Eso es el perceptrón aprendiendo: sus pesos son los botones, y el error del oído es el gradiente que le dice hacia dónde girarlos.</p>
  </div>

  <div class="analogy">
    <h4>Varias capas son varios especialistas</h4>
    <p>Un solo experto casi nunca ve un problema complejo entero. Un radiólogo mira bordes y texturas; un oncólogo interpreta esos bordes como tumores; un oncólogo clínico decide qué hacer con el diagnóstico. Cada capa de una red profunda hace algo parecido: las primeras miran píxeles, las intermedias combinan bordes en formas, las profundas combinan formas en conceptos. Una sola capa — un perceptrón — es un único especialista mirando píxeles crudos. Por eso no puede con XOR. Dos capas son dos especialistas encadenados. Cien capas son cien — y ahí empieza a haber magia.</p>
  </div>
</div>

---

## Cierre: los cimientos en perspectiva

En quince años, de 1943 a 1958, cuatro contribuciones cambiaron el modo en que pensamos sobre la inteligencia y la computación:

1. **McCulloch y Pitts (1943)** mostraron que la lógica del cerebro puede capturarse en un modelo matemático simple.
2. **Turing (1948)** propuso que las máquinas no solo pueden computar: pueden *educarse a sí mismas* mediante castigo y recompensa.
3. **Turing (1950)** reemplazó la pregunta metafísica "¿piensan las máquinas?" por una prueba operacional — el Imitation Game — y propuso la máquina infantil como camino.
4. **Rosenblatt (1958)** construyó la **primera máquina de aprendizaje real**, demostrando que los pesos pueden ajustarse automáticamente a partir de los errores.

Cada uno construyó sobre los anteriores. Cada uno respondió a una pregunta que el anterior había dejado abierta. Hoy, cuando usamos redes neuronales profundas, aprendizaje por refuerzo, modelos de lenguaje grandes o IA generativa, estamos usando directa o indirectamente las intuiciones de estos cuatro pioneros — más el ingrediente que les faltaba a todos: backpropagation y suficiente cómputo para entrenar redes con millones de parámetros.

Los cimientos no son historia antigua. Son el ADN de lo que hoy llamamos IA. Y cuanto mejor los entiendas, menos mágico y más hermoso va a parecer todo lo que viene después.

---

### Lecturas recomendadas

- **McCulloch, W. S., & Pitts, W. (1943).** *A Logical Calculus of the Ideas Immanent in Nervous Activity.* Bulletin of Mathematical Biophysics, 5(4), 115–133.
- **Turing, A. M. (1948).** *Intelligent Machinery.* En *Collected Works of A.M. Turing*, 1992.
- **Turing, A. M. (1950).** *Computing Machinery and Intelligence.* Mind, 59(236), 433–460.
- **Rosenblatt, F. (1958).** *The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain.* Psychological Review, 65(6), 386–408.
- **Minsky, M. L., & Papert, S. A. (1969).** *Perceptrons: An Introduction to Computational Geometry.* MIT Press. — el libro que inició el invierno.
- **Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986).** *Learning representations by back-propagating errors.* Nature, 323(6088), 533–536.

<script src="{{ '/assets/posts/fundamentos-redes-neuronales/timeline.js' | relative_url }}"></script>
<script src="{{ '/assets/posts/fundamentos-redes-neuronales/mcculloch-pitts.js' | relative_url }}"></script>
<script src="{{ '/assets/posts/fundamentos-redes-neuronales/turing.js' | relative_url }}"></script>
<script src="{{ '/assets/posts/fundamentos-redes-neuronales/perceptron.js' | relative_url }}"></script>
<script src="{{ '/assets/posts/fundamentos-redes-neuronales/mlp.js' | relative_url }}"></script>
