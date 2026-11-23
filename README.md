# Un Santajaro

Blog personal de Santiago Gil Gallego — matemáticas, computación, cuentos y poesía.

Construido con [Jekyll](https://jekyllrb.com). El aspecto sigue el sistema de diseño propio «Un Santajaro» v2 (tipografía Literata, IBM Plex Sans, IBM Plex Mono y Silkscreen, autoalojada); cómo está aplicado, en [docs/diseno-v2/](docs/diseno-v2/README.md). El código de partida fue una adaptación del tema [Dark Poole](https://github.com/chrisanthropic/dark-poole).

## Estructura

- `_mates/` — artículos de Mates y de Inteligencia artificial (la categoría la fija `section` en el front matter, no la carpeta: los de IA llevan `section: ia` y salen en `/ia/`)
- `_notas/` — notas, ideas y blog
- `_escritos/` — cuentos, poemas y otros escritos
- `_layouts/`, `_includes/`, `_sass/` — plantillas y estilos
- `assets/` — imágenes y recursos estáticos (no indexados por el blog)

## Desarrollo local

Requiere Ruby 3.x y Bundler.

```bash
bundle install
bundle exec jekyll serve --livereload
```

El sitio queda disponible en <http://localhost:4000>.

### Materiales de desarrollo (no se publican)

Los placeholders de las colecciones (`file1`, `file2`), las plantillas (`plantilla-*`), las fichas de `_proyectos/` en borrador, la página `/desarrollo/` y las propuestas llevan `published: false`: en producción Jekyll no genera su página y no entran al sitemap. Para previsualizarlos en local:

```bash
bundle exec jekyll serve --livereload --unpublished
```

`tests/` y `scripts/` están en `exclude` (`_config.yml`) y nunca se copian al sitio generado.

## Licencia

Código del tema bajo licencia MIT (ver [LICENSE.md](LICENSE.md)). Las fuentes de `assets/fonts/` están bajo la SIL Open Font License (cada familia con su `OFL-*.txt`). El contenido del blog pertenece a su autor.
