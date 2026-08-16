/* =============================================================
   convergence-dashboard.js — la convergencia de 2012

   Tipo T3 (docs/guia-visualizaciones.md). Sin dependencias.

   Entrada: ESQUEMÁTICA. Cómputo: ILUSTRADO.
   Esto NO es un gráfico de datos. No hay series de tamaño de
   conjuntos, ni de FLOPs por dólar, ni de recuento de artículos:
   esas cifras no están en el repositorio y no se inventan.

   Lo que sí hay: los tres ingredientes que el texto defiende
   —algoritmos, cómputo y datos— dibujados como franjas de
   disponibilidad, cada una anclada a una fecha que el propio
   artículo afirma. La tesis del post es que ninguno bastaba solo
   y que en 2012 coincidieron los tres; esta figura muestra
   exactamente eso y nada más.

   Todos los hitos marcados están citados en el cuerpo del post.
   ============================================================= */
(function () {
  var root = document.getElementById('viz-convergence');
  if (!root) return;

  var stage = root.querySelector('.viz-stage');
  var controls = root.querySelector('.viz-controls');
  if (!stage || !controls) return;

  var NS = 'http://www.w3.org/2000/svg';
  var A0 = 1969, A1 = 2015;

  function css(n, f) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    return v || f;
  }

  /* Los tres lados del triángulo. `desde` es la fecha en que el
     artículo sitúa la pieza como disponible. */
  var PIEZAS = [
    {
      nombre: 'Algoritmos',
      desde: 1986,
      hito: 'Rumelhart, Hinton y Williams publican backpropagation en Nature',
      nota: 'La idea era de 1974 (Werbos). En 1986 se difunde y se demuestra ' +
            'que las capas ocultas aprenden representaciones.'
    },
    {
      nombre: 'Cómputo',
      desde: 2006,
      hito: 'NVIDIA lanza CUDA',
      nota: 'De golpe una GPU sirve para cálculo genérico. Entrenar deja de ' +
            'medirse en meses.'
    },
    {
      nombre: 'Datos',
      desde: 2009,
      hito: 'ImageNet (Deng et al.)',
      nota: 'Catorce millones de imágenes etiquetadas. Antes, un conjunto ' +
            '«grande» tenía miles de ejemplos.'
    }
  ];

  /* Hitos del eje. Todos aparecen en el cuerpo del artículo. */
  var HITOS = [
    { a: 1969, t: 'Perceptrons' },
    { a: 1982, t: 'Hopfield' },
    { a: 1986, t: 'backprop en Nature' },
    { a: 1997, t: 'LSTM' },
    { a: 1998, t: 'LeNet-5' },
    { a: 2006, t: 'CUDA · deep belief nets' },
    { a: 2009, t: 'ImageNet' },
    { a: 2012, t: 'AlexNet' }
  ];

  var anio = 1998;

  function el(t, at) {
    var e = document.createElementNS(NS, t);
    for (var k in at) if (at.hasOwnProperty(k)) e.setAttribute(k, at[k]);
    return e;
  }

  function dibujar() {
    var acento = css('--accent-color', '#e5d6c7');
    var tenue = css('--post-text-soft', '#9ba3ad');
    var borde = css('--post-border', '#2b3036');

    var W = 620, H = 260, ml = 92, mr = 18;
    var ancho = W - ml - mr;
    var x = function (a) { return ml + (ancho * (a - A0)) / (A1 - A0); };

    var listas = PIEZAS.filter(function (p) { return anio >= p.desde; }).length;

    stage.textContent = '';
    var svg = el('svg', {
      viewBox: '0 0 ' + W + ' ' + H, width: '100%', role: 'img',
      'aria-label': 'Tres franjas de disponibilidad — algoritmos desde 1986, ' +
                    'cómputo desde 2006, datos desde 2009 — sobre una línea de ' +
                    'tiempo de 1969 a 2015. En ' + anio + ' hay ' + listas +
                    ' de los tres ingredientes disponibles.'
    });
    svg.style.maxWidth = '100%';

    // franjas
    PIEZAS.forEach(function (p, i) {
      var y = 44 + i * 46, alto = 26;

      svg.appendChild(el('rect', {
        x: ml, y: y, width: ancho, height: alto,
        fill: 'none', stroke: borde, 'stroke-width': 1, rx: 3
      }));
      svg.appendChild(el('rect', {
        x: x(p.desde), y: y, width: x(A1) - x(p.desde), height: alto,
        fill: acento, 'fill-opacity': anio >= p.desde ? 0.5 : 0.18, rx: 3
      }));

      var et = el('text', {
        x: ml - 10, y: y + 17, 'text-anchor': 'end', 'font-size': 12,
        fill: anio >= p.desde ? acento : tenue
      });
      et.textContent = p.nombre;
      svg.appendChild(et);

      var ad = el('text', {
        x: x(p.desde) + 6, y: y + 17, 'font-size': 10, fill: css('--post-bg-card', '#1a1d21')
      });
      ad.textContent = p.desde;
      svg.appendChild(ad);
    });

    // eje y hitos
    var ye = 44 + PIEZAS.length * 46 + 6;
    svg.appendChild(el('line', {
      x1: ml, y1: ye, x2: W - mr, y2: ye, stroke: borde, 'stroke-width': 1
    }));
    HITOS.forEach(function (h, i) {
      svg.appendChild(el('line', {
        x1: x(h.a), y1: ye - 4, x2: x(h.a), y2: ye + 4, stroke: tenue, 'stroke-width': 1
      }));
      var t = el('text', {
        x: x(h.a), y: ye + (i % 2 ? 30 : 17), 'text-anchor': 'middle',
        'font-size': 9, fill: tenue
      });
      t.textContent = h.a;
      svg.appendChild(t);
    });

    // línea del año elegido
    svg.appendChild(el('line', {
      x1: x(anio), y1: 30, x2: x(anio), y2: ye, stroke: acento,
      'stroke-width': 2, 'stroke-dasharray': '4 3'
    }));
    var ta = el('text', {
      x: x(anio), y: 24, 'text-anchor': 'middle', 'font-size': 13, fill: acento
    });
    ta.textContent = anio;
    svg.appendChild(ta);

    // veredicto
    var v = el('text', { x: ml, y: H - 22, 'font-size': 12, fill: listas === 3 ? acento : tenue });
    v.textContent = listas === 3
      ? 'Los tres ingredientes, disponibles a la vez.'
      : listas + ' de 3 · falta ' +
        PIEZAS.filter(function (p) { return anio < p.desde; })
              .map(function (p) { return p.nombre.toLowerCase(); }).join(' y ');
    svg.appendChild(v);

    var hn = el('text', { x: ml, y: H - 6, 'font-size': 9, fill: tenue });
    hn.textContent = 'Franjas esquemáticas, no mediciones · los hitos son fechas citadas en el artículo.';
    svg.appendChild(hn);

    stage.appendChild(svg);
    pintarNota();
  }

  var nota = null;
  function pintarNota() {
    if (!nota) return;
    var activas = PIEZAS.filter(function (p) { return anio >= p.desde; });
    nota.textContent = '';
    if (!activas.length) {
      var p0 = document.createElement('p');
      p0.className = 'small muted';
      p0.textContent = 'En ' + anio + ' no había ninguno de los tres.';
      nota.appendChild(p0);
      return;
    }
    activas.forEach(function (p) {
      var d = document.createElement('p');
      d.className = 'small';
      d.style.margin = '.2rem 0';
      var b = document.createElement('strong');
      b.textContent = p.nombre + ' · ' + p.desde + ' — ' + p.hito + '. ';
      d.appendChild(b);
      d.appendChild(document.createTextNode(p.nota));
      nota.appendChild(d);
    });
  }

  function montar() {
    controls.textContent = '';

    var l = document.createElement('label');
    l.appendChild(document.createTextNode('año '));
    var r = document.createElement('input');
    r.type = 'range'; r.min = String(A0); r.max = String(A1); r.value = String(anio);
    r.setAttribute('aria-label', 'Elegir un año entre 1969 y 2015');
    r.addEventListener('input', function () { anio = +r.value; dibujar(); });
    l.appendChild(r);
    controls.appendChild(l);

    [1985, 1998, 2006, 2012].forEach(function (a) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'btn'; b.textContent = String(a);
      b.addEventListener('click', function () { anio = a; r.value = String(a); dibujar(); });
      controls.appendChild(b);
    });

    nota = document.createElement('div');
    nota.style.marginTop = '.6rem';
    controls.appendChild(nota);
  }

  new MutationObserver(function () { dibujar(); })
    .observe(document.documentElement,
             { attributes: true, attributeFilter: ['data-theme'] });

  montar();
  dibujar();
})();
