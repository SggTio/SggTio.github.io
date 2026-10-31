---
title: "Plantilla de nota"
date: 2026-01-01
description: "Descripción corta que aparece como subtítulo bajo el título de la nota."
listar: false
---

Una nota es un texto más largo y estructurado. El layout es algo más ancho que el de los escritos y soporta dos tipos de secciones dentro del markdown:

- `<section class="one-col" markdown="1">` para una columna angosta (ideal para intros, párrafos clave, remates).
- `<section class="two-col" markdown="1">` para dos columnas en paralelo (que colapsan a una en móvil).

El atributo `markdown="1"` es obligatorio: sin él, kramdown no procesa el markdown anidado dentro del bloque HTML y verías los asteriscos crudos.

<section class="one-col" markdown="1">

## Una sección en columna angosta

Este bloque es una columna angosta dentro del ancho mayor de la nota. Sirve para bajar el ritmo, introducir una idea sola, o rematar un argumento sin que el ojo tenga que recorrer líneas largas.

La tipografía es la misma que el resto, solo cambia el ancho.

</section>

<section class="two-col" markdown="1">

### Columna izquierda

Este bloque ocupa la mitad izquierda de la nota. En pantalla ancha, se ve en paralelo con la columna derecha. En móvil, se apila encima.

Podés meter listas, citas, *énfasis*, lo que quieras.

### Columna derecha

Este bloque ocupa la mitad derecha. Útil para contrastar dos posturas, mostrar ejemplo vs. contraejemplo, o simplemente romper el ritmo visual de una pared de texto.

> Una cita, por ejemplo.

</section>

Después de una sección de dos columnas, volvés al flujo normal de la nota (ancho completo, una columna).

<section class="one-col" markdown="1">

## Y otra sección angosta para cerrar

Se pueden mezclar libremente cuantas secciones `one-col` y `two-col` hagan falta. El markdown fuera de las secciones se renderiza con el ancho completo de la nota.

</section>

El cierre de la nota vuelve al ancho por defecto.
