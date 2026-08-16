/* =============================================================
   backprop-explorer.js — explorador de backpropagation

   Tipo T3 (docs/guia-visualizaciones.md): todo el cálculo ocurre
   en el navegador. Sin dependencias, sin datos externos.

   Entrada: esquemática (XOR, AND, OR son conjuntos de juguete).
   Cómputo: calculado en vivo, no precalculado.

   Red densa 2 → [ocultas] → 1. Activación configurable en las
   capas ocultas; la salida siempre es sigmoide, porque el
   problema es de clasificación binaria.
   ============================================================= */
(function () {
  var root = document.getElementById('viz-backprop');
  if (!root) return;

  var stage = root.querySelector('.viz-stage');
  var controls = root.querySelector('.viz-controls');
  var readout = root.querySelector('.viz-readout');
  if (!stage || !controls || !readout) return;

  var NS = 'http://www.w3.org/2000/svg';
  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function css(name, fallback) {
    var v = getComputedStyle(document.documentElement)
              .getPropertyValue(name).trim();
    return v || fallback;
  }

  /* ---------- conjuntos de juguete ---------- */
  var DATOS = {
    XOR: [[0,0,0], [0,1,1], [1,0,1], [1,1,0]],
    AND: [[0,0,0], [0,1,0], [1,0,0], [1,1,1]],
    OR:  [[0,0,0], [0,1,1], [1,0,1], [1,1,1]]
  };

  /* ---------- activaciones ---------- */
  var ACT = {
    sigmoide: {
      f: function (z) { return 1 / (1 + Math.exp(-z)); },
      d: function (z) { var s = 1 / (1 + Math.exp(-z)); return s * (1 - s); }
    },
    tanh: {
      f: function (z) { return Math.tanh(z); },
      d: function (z) { var t = Math.tanh(z); return 1 - t * t; }
    },
    ReLU: {
      f: function (z) { return z > 0 ? z : 0; },
      d: function (z) { return z > 0 ? 1 : 0; }
    }
  };
  var sig = ACT.sigmoide;

  /* ---------- estado ---------- */
  var cfg = { datos: 'XOR', act: 'sigmoide', capas: 1, neuronas: 3, lr: 0.5 };
  var red = null, epoca = 0, historia = [], corriendo = null, sel = null;

  /* Generador reproducible: «reiniciar» siempre da la misma red,
     para que el lector pueda repetir lo que vio. */
  var semilla = 42;
  function rnd() {
    semilla = (semilla * 1103515245 + 12345) & 0x7fffffff;
    return semilla / 0x7fffffff;
  }

  function construir() {
    semilla = 42;
    var tam = [2];
    for (var i = 0; i < cfg.capas; i++) tam.push(cfg.neuronas);
    tam.push(1);

    var W = [], B = [];
    for (var l = 0; l < tam.length - 1; l++) {
      var m = [], b = [];
      for (var j = 0; j < tam[l + 1]; j++) {
        var fila = [];
        for (var k = 0; k < tam[l]; k++) fila.push((rnd() * 2 - 1) * 1.2);
        m.push(fila);
        b.push((rnd() * 2 - 1) * 0.4);
      }
      W.push(m); B.push(b);
    }
    red = { tam: tam, W: W, B: B, A: [], Z: [] };
    epoca = 0; historia = []; sel = null;
  }

  function adelante(x) {
    var a = x.slice(), A = [a.slice()], Z = [null];
    for (var l = 0; l < red.W.length; l++) {
      var ultima = (l === red.W.length - 1);
      var fn = ultima ? sig : ACT[cfg.act];
      var z = [], na = [];
      for (var j = 0; j < red.W[l].length; j++) {
        var s = red.B[l][j];
        for (var k = 0; k < a.length; k++) s += red.W[l][j][k] * a[k];
        z.push(s); na.push(fn.f(s));
      }
      Z.push(z); A.push(na); a = na;
    }
    red.A = A; red.Z = Z;
    return a[0];
  }

  /* Una época = forward + backward sobre los cuatro ejemplos,
     acumulando el gradiente, y una sola actualización. */
  function epocaCompleta() {
    var muestras = DATOS[cfg.datos];
    var gW = [], gB = [], l, j, k;
    for (l = 0; l < red.W.length; l++) {
      gW.push(red.W[l].map(function (f) { return f.map(function () { return 0; }); }));
      gB.push(red.B[l].map(function () { return 0; }));
    }

    var err = 0;
    for (var s = 0; s < muestras.length; s++) {
      var x = [muestras[s][0], muestras[s][1]], y = muestras[s][2];
      var yhat = adelante(x);
      err += 0.5 * (yhat - y) * (yhat - y);

      var L = red.W.length;
      var delta = [(yhat - y) * sig.d(red.Z[L][0])];

      for (l = L - 1; l >= 0; l--) {
        for (j = 0; j < red.W[l].length; j++) {
          gB[l][j] += delta[j];
          for (k = 0; k < red.W[l][j].length; k++) gW[l][j][k] += delta[j] * red.A[l][k];
        }
        if (l > 0) {
          var prev = [];
          for (k = 0; k < red.tam[l]; k++) {
            var acc = 0;
            for (j = 0; j < red.W[l].length; j++) acc += red.W[l][j][k] * delta[j];
            prev.push(acc * ACT[cfg.act].d(red.Z[l][k]));
          }
          delta = prev;
        }
      }
    }

    var n = muestras.length;
    for (l = 0; l < red.W.length; l++) {
      for (j = 0; j < red.W[l].length; j++) {
        red.B[l][j] -= cfg.lr * gB[l][j] / n;
        for (k = 0; k < red.W[l][j].length; k++) red.W[l][j][k] -= cfg.lr * gW[l][j][k] / n;
      }
    }

    epoca++;
    historia.push(err / n);
    if (historia.length > 400) historia.shift();
  }

  /* ---------- dibujo ---------- */
  function el(t, at) {
    var e = document.createElementNS(NS, t);
    for (var k in at) if (at.hasOwnProperty(k)) e.setAttribute(k, at[k]);
    return e;
  }

  function dibujar() {
    var acento = css('--accent-color', '#e5d6c7');
    var tenue = css('--post-text-soft', '#9ba3ad');
    var borde = css('--post-border', '#2b3036');

    stage.textContent = '';
    var W = 620, H = 300, svg = el('svg', {
      viewBox: '0 0 ' + W + ' ' + H, width: '100%',
      role: 'img',
      'aria-label': 'Diagrama de la red: ' + red.tam.join(' a ') +
                    ' neuronas. Las líneas gruesas son pesos grandes; ' +
                    'las claras, positivos; las oscuras, negativos.'
    });
    svg.style.maxWidth = '100%';

    var margen = 46, ancho = W - margen * 2;
    var pos = [];
    for (var l = 0; l < red.tam.length; l++) {
      var x = margen + (ancho * l) / (red.tam.length - 1), col = [];
      for (var j = 0; j < red.tam[l]; j++) {
        col.push({ x: x, y: H / 2 + (j - (red.tam[l] - 1) / 2) * 56 });
      }
      pos.push(col);
    }

    // conexiones
    for (l = 0; l < red.W.length; l++) {
      for (var j2 = 0; j2 < red.W[l].length; j2++) {
        for (var k = 0; k < red.W[l][j2].length; k++) {
          var w = red.W[l][j2][k];
          var linea = el('line', {
            x1: pos[l][k].x, y1: pos[l][k].y,
            x2: pos[l + 1][j2].x, y2: pos[l + 1][j2].y,
            stroke: w >= 0 ? acento : tenue,
            'stroke-width': Math.min(5, 0.4 + Math.abs(w) * 1.4),
            'stroke-opacity': 0.75,
            tabindex: '0', role: 'button',
            'aria-label': 'Peso de capa ' + l + ', neurona ' + k + ' a ' + j2 +
                          ': ' + w.toFixed(4)
          });
          linea.style.cursor = 'pointer';
          (function (ll, jj, kk) {
            function pick() { sel = { tipo: 'peso', l: ll, j: jj, k: kk }; pintarLectura(); }
            linea.addEventListener('click', pick);
            linea.addEventListener('keydown', function (e) {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); }
            });
          })(l, j2, k);
          svg.appendChild(linea);
        }
      }
    }

    // neuronas
    adelante([DATOS[cfg.datos][0][0], DATOS[cfg.datos][0][1]]);
    for (l = 0; l < red.tam.length; l++) {
      for (var j3 = 0; j3 < red.tam[l]; j3++) {
        var a = red.A[l] ? red.A[l][j3] : 0;
        var c = el('circle', {
          cx: pos[l][j3].x, cy: pos[l][j3].y, r: 15,
          fill: css('--post-bg-card', '#1a1d21'),
          stroke: acento, 'stroke-width': 1.4 + Math.abs(a) * 2,
          tabindex: '0', role: 'button',
          'aria-label': 'Neurona capa ' + l + ' número ' + j3 +
                        ', activación ' + a.toFixed(4)
        });
        c.style.cursor = 'pointer';
        (function (ll, jj) {
          function pick() { sel = { tipo: 'neurona', l: ll, j: jj }; pintarLectura(); }
          c.addEventListener('click', pick);
          c.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); }
          });
        })(l, j3);
        svg.appendChild(c);

        var t = el('text', {
          x: pos[l][j3].x, y: pos[l][j3].y + 4,
          'text-anchor': 'middle', 'font-size': '10',
          fill: tenue, 'pointer-events': 'none'
        });
        t.textContent = a.toFixed(2);
        svg.appendChild(t);
      }
      var et = el('text', {
        x: pos[l][0].x, y: 22, 'text-anchor': 'middle',
        'font-size': '11', fill: tenue
      });
      et.textContent = l === 0 ? 'entrada'
                     : (l === red.tam.length - 1 ? 'salida' : 'oculta ' + l);
      svg.appendChild(et);
    }

    // curva de pérdida
    if (historia.length > 1) {
      var gh = 70, gy = H - gh - 6, max = Math.max.apply(null, historia) || 1;
      svg.appendChild(el('line', {
        x1: margen, y1: H - 6, x2: W - margen, y2: H - 6,
        stroke: borde, 'stroke-width': 1
      }));
      var pts = historia.map(function (v, i) {
        var x = margen + (ancho * i) / Math.max(1, historia.length - 1);
        return x.toFixed(1) + ',' + (gy + gh - (v / max) * gh).toFixed(1);
      }).join(' ');
      svg.appendChild(el('polyline', {
        points: pts, fill: 'none', stroke: acento, 'stroke-width': 1.6
      }));
      var lt = el('text', {
        x: margen, y: gy - 4, 'font-size': '10', fill: tenue
      });
      lt.textContent = 'error · ' + historia[historia.length - 1].toFixed(4);
      svg.appendChild(lt);
    }

    stage.appendChild(svg);
    pintarLectura();
  }

  function pintarLectura() {
    var muestras = DATOS[cfg.datos];
    var filas = muestras.map(function (m) {
      var y = adelante([m[0], m[1]]);
      var ok = (y > 0.5 ? 1 : 0) === m[2];
      return '(' + m[0] + ', ' + m[1] + ') → ' + y.toFixed(3) +
             '  esperado ' + m[2] + (ok ? '  ✓' : '  ✗');
    }).join('\n');

    var det = '';
    if (sel && sel.tipo === 'peso') {
      det = 'peso capa ' + sel.l + ': neurona ' + sel.k + ' → ' + sel.j +
            ' = ' + red.W[sel.l][sel.j][sel.k].toFixed(6);
    } else if (sel && sel.tipo === 'neurona') {
      adelante([muestras[0][0], muestras[0][1]]);
      det = 'neurona capa ' + sel.l + ' nº ' + sel.j +
            ' · activación con la entrada (' + muestras[0][0] + ', ' + muestras[0][1] +
            ') = ' + red.A[sel.l][sel.j].toFixed(6) +
            (sel.l > 0 ? '  ·  sesgo = ' + red.B[sel.l - 1][sel.j].toFixed(6) : '');
    } else {
      det = 'Pulsa o tabula hasta una neurona o una conexión para ver su valor exacto.';
    }

    readout.textContent = '';
    var p1 = document.createElement('p');
    p1.className = 'small';
    p1.textContent = 'época ' + epoca +
      (historia.length ? '  ·  error ' + historia[historia.length - 1].toFixed(5) : '');
    var pre = document.createElement('pre');
    pre.className = 'small';
    pre.style.margin = '.4rem 0';
    pre.textContent = filas;
    var p2 = document.createElement('p');
    p2.className = 'small muted';
    p2.textContent = det;
    var p3 = document.createElement('p');
    p3.className = 'small muted';
    p3.textContent = 'Entrada esquemática (conjunto de juguete de cuatro puntos) · ' +
                     'cómputo calculado en vivo en el navegador.';
    readout.appendChild(p1);
    readout.appendChild(pre);
    readout.appendChild(p2);
    readout.appendChild(p3);
  }

  /* ---------- mandos ---------- */
  function sel_(etiqueta, opciones, valor, onchange) {
    var w = document.createElement('label');
    w.className = 'small';
    w.style.marginRight = '.9rem';
    w.appendChild(document.createTextNode(etiqueta + ' '));
    var s = document.createElement('select');
    opciones.forEach(function (o) {
      var op = document.createElement('option');
      op.value = o; op.textContent = o;
      if (o === valor) op.selected = true;
      s.appendChild(op);
    });
    s.addEventListener('change', function () { onchange(s.value); });
    w.appendChild(s);
    return w;
  }

  function btn(texto, fn) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn';
    b.textContent = texto;
    b.addEventListener('click', fn);
    return b;
  }

  function montarMandos() {
    controls.textContent = '';

    controls.appendChild(sel_('conjunto', ['XOR', 'AND', 'OR'], cfg.datos, function (v) {
      cfg.datos = v; parar(); construir(); dibujar();
    }));
    controls.appendChild(sel_('activación', ['sigmoide', 'tanh', 'ReLU'], cfg.act, function (v) {
      cfg.act = v; parar(); construir(); dibujar();
    }));
    controls.appendChild(sel_('capas ocultas', ['1', '2'], String(cfg.capas), function (v) {
      cfg.capas = +v; parar(); construir(); dibujar();
    }));
    controls.appendChild(sel_('neuronas', ['2', '3', '4', '5'], String(cfg.neuronas), function (v) {
      cfg.neuronas = +v; parar(); construir(); dibujar();
    }));

    var fila = document.createElement('div');
    fila.className = 'btn-row';
    fila.style.marginTop = '.6rem';

    fila.appendChild(btn('paso', function () { epocaCompleta(); dibujar(); }));
    fila.appendChild(btn('× 100', function () {
      for (var i = 0; i < 100; i++) epocaCompleta();
      dibujar();
    }));

    var auto = btn('entrenar', function () {
      if (corriendo) { parar(); auto.textContent = 'entrenar'; return; }
      auto.textContent = 'pausar';
      corriendo = setInterval(function () {
        for (var i = 0; i < 10; i++) epocaCompleta();
        dibujar();
        if (epoca > 6000) { parar(); auto.textContent = 'entrenar'; }
      }, reduce ? 220 : 60);
    });
    fila.appendChild(auto);

    fila.appendChild(btn('reiniciar', function () {
      parar(); auto.textContent = 'entrenar'; construir(); dibujar();
    }));
    controls.appendChild(fila);
  }

  function parar() {
    if (corriendo) { clearInterval(corriendo); corriendo = null; }
  }

  /* Redibuja al cambiar de tema: el SVG lee los colores de las
     variables CSS, y esas cambian con data-theme. */
  new MutationObserver(function () { dibujar(); })
    .observe(document.documentElement,
             { attributes: true, attributeFilter: ['data-theme'] });

  construir();
  montarMandos();
  dibujar();
})();
