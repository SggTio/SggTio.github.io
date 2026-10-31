# GuinosPixel

El catálogo de guiños 8 bits del sitio: cuatro primitivas, y una regla sobre dónde aparecen. El sitio no es un sitio 8 bits; los guiños viven en los lugares que hacen de índice, de ficha y de puerta, y en ningún otro.

**Las primitivas.** (1) Rótulos en Silkscreen (`rotulo-pixel`, `numero-pixel`, `marcador-pixel`): el índice «En esta entrada», la ficha de personaje, los tiles del mosaico y la numeración del índice de Proyectos. (2) Viñetas y marcadores de 5×5 píxeles (`px-vineta`, `px-abierta`): listas `ul.pixel` en Sobre mí y Notas, y el marcador de las hojas desplegables. (3) Iconos de 8×8 píxeles (`px-sigma`, `px-marca`, `px-pluma`, `px-caja`): solo en los tiles de sección del mosaico. (4) La regla punteada `regla-pixel` (puntos de 2px cada 6px) y las barras de atributos: la regla sustituye a `regla` en índice, ficha y tiles; las barras solo en la ficha. A esto se suma el cursor de bloque `cursor` que parpadea tras los rótulos «En esta entrada», «Últimas» y «Ahora», y que se detiene con `prefers-reduced-motion`.

**Cómo se dibujan.** Todo se construye sobre el `pixel` del sitio (2px): las formas son un cuadrado de 2px con `box-shadow` en `currentColor`, así toman el acento de la sección, funcionan en los dos temas y no cargan imágenes. Los iconos grandes usan `px-grande` (3px por píxel, 24px). Silkscreen se sirve autoalojada como las otras fuentes (Google Fonts solo en estas vistas previas); su tamaño de rótulo es 11px.

**Dónde no.** Nunca en el cuerpo de texto, en los títulos, en la navegación, en el código ni en Escritos (la voz susurrada no lleva guiños). Nunca scanlines, fondos de rejilla, sprites ni sonidos. Nunca más de un cursor parpadeando por pantalla.
