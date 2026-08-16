/* =============================================================
   convolution-playground.js — convolución, píxel a píxel

   Tipo T3 (docs/guia-visualizaciones.md): todo se calcula en el
   navegador. Sin dependencias, sin datos externos.

   Entrada: esquemática (imagen sintética 10×10, construida aquí).
   Cómputo: calculado en vivo.

   Imagen 10×10 → filtro 3×3 → salida 8×8 (sin relleno). El panel
   de lectura desglosa los nueve productos de la posición elegida,
   que es lo que hace visible la operación.
   ============================================================= */
(function () {
  var root = document.getElementById('viz-convolution');
  if (!root) return;

  var stage = root.querySelector('.viz-stage');
  var controls = root.querySelector('.viz-controls');
  if (!stage || !controls) return;

  var NS = 'http://www.w3.org/2000/svg';
  var N = 10, K = 3, M = N - K + 1;   // 10 → 8

  function css(n, f) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    return v || f;
  }

  /* ---------- imagen sintética ----------
     Un rectángulo brillante y una diagonal: dos clases de borde,
     uno recto y otro inclinado, para que los filtros tengan algo
     que encontrar. */
  var IMG = (function () {
    var a = [];
    for (var y = 0; y < N; y++) {
      for (var x = 0; x < N; x++) {
        var v = 0.08;
        if (x >= 1 && x <= 4 && y >= 2 && y <= 6) v = 0.92;   // rectángulo
        if (Math.abs((x - 4) - (y - 2)) < 1 && x >= 5) v = 0.75;  // diagonal
        a.push(v);
      }
    }
    return a;
  })();

  var FILTROS = {
    'identidad':  [0,0,0, 0,1,0, 0,0,0],
    'bordes':     [-1,-1,-1, -1,8,-1, -1,-1,-1],
    'realce':     [0,-1,0, -1,5,-1, 0,-1,0],
    'desenfoque': [1/9,1/9,1/9, 1/9,1/9,1/9, 1/9,1/9,1/9],
    'Sobel ↕':    [-1,-2,-1, 0,0,0, 1,2,1],
    'Sobel ↔':    [-1,0,1, -2,0,2, -1,0,1]
  };

  var estado = { filtro: 'bordes', pos: 0 };   // pos = índice en la salida 8×8

  function salida() {
    var out = [];
    var k = FILTROS[estado.filtro];
    for (var oy = 0; oy < M; oy++) {
      for (var ox = 0; ox < M; ox++) {
        var s = 0;
        for (var dy = 0; dy < K; dy++) {
          for (var dx = 0; dx < K; dx++) {
            s += IMG[(oy + dy) * N + (ox + dx)] * k[dy * K + dx];
          }
        }
        out.push(s);
      }
    }
    return out;
  }

  function el(t, at) {
    var e = document.createElementNS(NS, t);
    for (var a in at) if (at.hasOwnProperty(a)) e.setAttribute(a, at[a]);
    return e;
  }

  function gris(v) {
    var c = Math.max(0, Math.min(1, v));
    var g = Math.round(18 + c * 220);
    return 'rgb(' + g + ',' + g + ',' + g + ')';
  }

  function rejilla(svg, x0, y0, lado, cols, valores, norm, onPick, resaltar) {
    for (var i = 0; i < valores.length; i++) {
      var cx = i % cols, cy = Math.floor(i / cols);
      var v = norm ? norm(valores[i]) : valores[i];
      var r = el('rect', {
        x: x0 + cx * lado, y: y0 + cy * lado,
        width: lado - 1, height: lado - 1,
        fill: gris(v), stroke: 'rgba(255,255,255,.06)', 'stroke-width': .5
      });
      if (onPick) {
        r.style.cursor = 'pointer';
        r.setAttribute('tabindex', '0');
        r.setAttribute('role', 'button');
        r.setAttribute('aria-label', 'Salida fila ' + (cy + 1) + ', columna ' + (cx + 1) +
                                     ': ' + valores[i].toFixed(3));
        (function (idx) {
          r.addEventListener('click', function () { estado.pos = idx; dibujar(); });
          r.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); estado.pos = idx; dibujar(); }
          });
        })(i);
      }
      svg.appendChild(r);
    }
    if (resaltar) {
      svg.appendChild(el('rect', {
        x: x0 + resaltar.x * lado - 1, y: y0 + resaltar.y * lado - 1,
        width: lado * resaltar.w + 1, height: lado * resaltar.h + 1,
        fill: 'none', stroke: css('--accent-color', '#e5d6c7'), 'stroke-width': 2
      }));
    }
  }

  function texto(svg, x, y, s, tam) {
    var t = el('text', {
      x: x, y: y, 'font-size': tam || 11,
      fill: css('--post-text-soft', '#9ba3ad')
    });
    t.textContent = s;
    svg.appendChild(t);
  }

  function dibujar() {
    var out = salida();
    var k = FILTROS[estado.filtro];
    var ox = estado.pos % M, oy = Math.floor(estado.pos / M);

    var mn = Math.min.apply(null, out), mx = Math.max.apply(null, out);
    var rango = (mx - mn) || 1;
    var norm = function (v) { return (v - mn) / rango; };

    stage.textContent = '';
    var W = 620, H = 250;
    var svg = el('svg', {
      viewBox: '0 0 ' + W + ' ' + H, width: '100%', role: 'img',
      'aria-label': 'Convolución de una imagen sintética de 10 por 10 con un filtro ' +
                    estado.filtro + ' de 3 por 3, produciendo una salida de 8 por 8. ' +
                    'La ventana resaltada está en la fila ' + (oy + 1) +
                    ', columna ' + (ox + 1) + '.'
    });
    svg.style.maxWidth = '100%';

    var lado = 20;
    texto(svg, 20, 22, 'imagen 10×10');
    rejilla(svg, 20, 32, lado, N, IMG, null, null, { x: ox, y: oy, w: K, h: K });

    texto(svg, 250, 22, 'filtro 3×3 · ' + estado.filtro);
    for (var i = 0; i < 9; i++) {
      var cx = i % 3, cy = Math.floor(i / 3);
      svg.appendChild(el('rect', {
        x: 250 + cx * 34, y: 32 + cy * 34, width: 33, height: 33,
        fill: 'none', stroke: css('--post-border', '#2b3036')
      }));
      var t = el('text', {
        x: 250 + cx * 34 + 16, y: 32 + cy * 34 + 21,
        'text-anchor': 'middle', 'font-size': 11,
        fill: css('--accent-color', '#e5d6c7')
      });
      t.textContent = Math.abs(k[i]) < 0.001 ? '0'
                    : (Math.abs(k[i] - 1 / 9) < 1e-9 ? '⅑' : String(+k[i].toFixed(2)));
      svg.appendChild(t);
    }

    texto(svg, 400, 22, 'salida 8×8');
    rejilla(svg, 400, 32, lado, M, out, norm, true,
            { x: ox, y: oy, w: 1, h: 1 });

    // el desglose: los nueve productos de la posición elegida
    var y0 = 210, partes = [], suma = 0;
    for (var dy = 0; dy < K; dy++) {
      for (var dx = 0; dx < K; dx++) {
        var pix = IMG[(oy + dy) * N + (ox + dx)], peso = k[dy * K + dx];
        suma += pix * peso;
        if (Math.abs(peso) > 0.001) {
          partes.push(pix.toFixed(2) + '·' + (+peso.toFixed(2)));
        }
      }
    }
    texto(svg, 20, y0, 'posición (' + (oy + 1) + ', ' + (ox + 1) + ')   ' +
                       partes.slice(0, 5).join('  +  ') + (partes.length > 5 ? '  + …' : ''), 11);
    var res = el('text', {
      x: 20, y: y0 + 18, 'font-size': 12,
      fill: css('--accent-color', '#e5d6c7')
    });
    res.textContent = '= ' + suma.toFixed(3);
    svg.appendChild(res);

    texto(svg, 20, H - 4,
      'Entrada esquemática (imagen sintética 10×10) · cómputo calculado en vivo.', 10);

    stage.appendChild(svg);
    if (rango) { /* nada: rango solo se usa para normalizar */ }
    sincronizarMando();
  }

  var mando = null;
  function sincronizarMando() {
    if (mando && +mando.value !== estado.pos) mando.value = estado.pos;
  }

  function montar() {
    controls.textContent = '';

    var lf = document.createElement('label');
    lf.appendChild(document.createTextNode('filtro '));
    var s = document.createElement('select');
    Object.keys(FILTROS).forEach(function (n) {
      var o = document.createElement('option');
      o.value = n; o.textContent = n;
      if (n === estado.filtro) o.selected = true;
      s.appendChild(o);
    });
    s.addEventListener('change', function () { estado.filtro = s.value; dibujar(); });
    lf.appendChild(s);
    controls.appendChild(lf);

    var lp = document.createElement('label');
    lp.appendChild(document.createTextNode('posición '));
    mando = document.createElement('input');
    mando.type = 'range'; mando.min = '0'; mando.max = String(M * M - 1);
    mando.value = String(estado.pos);
    mando.setAttribute('aria-label', 'Mover la ventana del filtro sobre la imagen');
    mando.addEventListener('input', function () { estado.pos = +mando.value; dibujar(); });
    lp.appendChild(mando);
    controls.appendChild(lp);

    var b = document.createElement('button');
    b.type = 'button'; b.className = 'btn'; b.textContent = 'recorrer';
    var timer = null;
    b.addEventListener('click', function () {
      if (timer) { clearInterval(timer); timer = null; b.textContent = 'recorrer'; return; }
      b.textContent = 'parar';
      timer = setInterval(function () {
        estado.pos = (estado.pos + 1) % (M * M);
        dibujar();
      }, 140);
    });
    controls.appendChild(b);
  }

  new MutationObserver(function () { dibujar(); })
    .observe(document.documentElement,
             { attributes: true, attributeFilter: ['data-theme'] });

  montar();
  dibujar();
})();
