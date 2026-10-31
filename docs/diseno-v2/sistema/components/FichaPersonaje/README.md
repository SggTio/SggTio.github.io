# FichaPersonaje

La ficha de personaje es el bloque de margen de Sobre mí y el guiño 8 bits más explícito del sitio: una hoja de personaje de videojuego con clase, nivel, atributos en barras de píxeles, inventario y un «Ahora» con cursor que parpadea. Es una broma seria: cada dato es verdadero y los atributos son una autoevaluación declarada, no una métrica.

**Qué provee el sitio:** los pares rótulo–valor (clase, nivel, ubicación si se quiere), los atributos con su valor de 0 a 10, el inventario como lista de herramientas, y la línea «Ahora». Un segundo bloque `Ahora` con el mismo componente (acento `verde`) puede ir debajo con lo que el autor está escribiendo, leyendo y jugando, con su fecha de actualización.

**Reglas.** Rótulos en `rotulo-pixel` (Silkscreen) en el acento; los valores en `margen-sans` `tinta-quieta`; el nivel en `marcador-pixel` (Silkscreen 700, 16px). La regla bajo el título es `regla-pixel` (puntos de 2px). Las barras son diez cuadrados de 8×8px (4 píxeles del sitio) separados por `pixel`, apagados en `regla` y encendidos en el acento; sin porcentajes ni números. El inventario va en `meta` separado por punto medio. Máximo seis atributos: más y deja de ser un guiño. Se pliega en móvil como cualquier nota de margen.

**No hacer:** no usar sprites, retratos pixelados ni sonidos; no colorear las barras con varios colores; no poner «HP/MP»; el acento de cada bloque es el de la sección o `verde` para «Ahora».
