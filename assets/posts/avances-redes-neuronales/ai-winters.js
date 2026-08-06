/* =============================================================
   ai-winters.js — línea de tiempo interactiva 1969–2012
   Dos inviernos (bandas grises) y dos renacimientos (bandas
   de acento). 11 hitos clicables con panel descriptivo.
   Dependencias: ninguna. Vanilla JS + SVG.
   ============================================================= */
(function () {
  var root = document.getElementById('viz-winters');
  if (!root) return;

  var stage = root.querySelector('.viz-stage');
  var panel = root.querySelector('.tl-panel');
  if (!stage || !panel) return;

  var events = [
    {
      year: 1969,
      label: 'Minsky & Papert',
      short: 'Perceptrons',
      title: 'Minsky & Papert — Perceptrons (1969)',
      body: 'El libro demuestra rigurosamente que un perceptrón de una sola capa no puede computar funciones como XOR. La comunidad lo interpreta como una sentencia de muerte para las redes neuronales. DARPA retira financiamiento; los laboratorios cierran.'
    },
    {
      year: 1974,
      label: 'Werbos',
      short: 'Backprop (tesis)',
      title: 'Paul Werbos — Backpropagation (1974)',
      body: 'Werbos describe el algoritmo de backpropagation en su tesis doctoral en Harvard. Nadie le presta atención: el campo está congelado y la comunidad de control automático no lee IA.'
    },
    {
      year: 1982,
      label: 'Hopfield',
      short: 'Redes de energía',
      title: 'John Hopfield — redes asociativas con energía (1982)',
      body: 'Hopfield reformula las redes neuronales como sistemas físicos con una función de energía. Los mínimos locales almacenan memorias. Devuelve legitimidad teórica al campo y abre aplicaciones en optimización.'
    },
    {
      year: 1986,
      label: 'Rumelhart et al.',
      short: 'Backprop (Nature)',
      title: 'Rumelhart, Hinton & Williams — Backpropagation en Nature (1986)',
      body: 'Publican "Learning representations by back-propagating errors" en Nature. Demuestran que las capas ocultas aprenden representaciones internas. Termina el primer invierno: el campo vuelve a vivir.'
    },
    {
      year: 1989,
      label: 'LeCun',
      short: 'CNN para dígitos',
      title: 'Yann LeCun — CNN para reconocimiento de dígitos (1989)',
      body: 'LeCun aplica backpropagation a redes convolucionales para leer códigos postales. Usa capas con pesos compartidos y pooling. Es el ancestro directo de AlexNet.'
    },
    {
      year: 1995,
      label: 'Vapnik',
      short: 'SVM con kernels',
      title: 'SVMs con kernels se popularizan (1995)',
      body: 'Las Support Vector Machines con trucos de kernel ofrecen optimización convexa, garantías teóricas y menos hiperparámetros. La comunidad de machine learning las adopta masivamente. Las redes neuronales pierden protagonismo.'
    },
    {
      year: 1997,
      label: 'Hochreiter & S.',
      short: 'LSTM',
      title: 'Hochreiter & Schmidhuber — LSTM (1997)',
      body: 'Proponen Long Short-Term Memory: celdas con puertas que permiten a las redes recurrentes recordar dependencias largas sin vanishing gradient. Se convertirá en el estándar de NLP una década después.'
    },
    {
      year: 1998,
      label: 'LeCun',
      short: 'LeNet-5',
      title: 'LeCun et al. — LeNet-5 (1998)',
      body: 'LeNet-5 lee cheques bancarios con 7 capas convolucionales y 60K parámetros. Funciona en producción, pero la comunidad prefiere SVMs. LeCun sigue refinando CNNs casi solo.'
    },
    {
      year: 2006,
      label: 'Hinton',
      short: 'Deep Belief Nets',
      title: 'Hinton — Deep Belief Networks y CUDA (2006)',
      body: 'Hinton propone pre-entrenamiento capa a capa con RBMs para inicializar redes profundas. NVIDIA lanza CUDA el mismo año, permitiendo cálculo masivo en GPUs. Empieza el renacimiento moderno.'
    },
    {
      year: 2009,
      label: 'Fei-Fei Li',
      short: 'ImageNet',
      title: 'Fei-Fei Li — ImageNet (2009)',
      body: '14 millones de imágenes etiquetadas a mano por anotadores de Mechanical Turk. El dataset que hará posible la demostración definitiva del deep learning tres años después.'
    },
    {
      year: 2012,
      label: 'Krizhevsky et al.',
      short: 'AlexNet',
      title: 'AlexNet gana ImageNet (2012)',
      body: 'Error top-5 de 15.3% contra 26.2% del segundo lugar. Usa ReLU, dropout, data augmentation y dos GPUs. El impacto es sísmico: en meses, laboratorios enteros vuelven a redes neuronales.'
    }
  ];

  var zones = [
    { y1: 1969, y2: 1980, cls: 'winter',      label: '1er Invierno' },
    { y1: 1980, y2: 1989, cls: 'renaissance',  label: '1er Renacimiento' },
    { y1: 1990, y2: 2005, cls: 'winter',       label: '2do Invierno' },
    { y1: 2006, y2: 2012, cls: 'renaissance',  label: 'Renacimiento moderno' }
  ];

  var W = 960, H = 200;
  var padL = 50, padR = 40;
  var axisY = 120;
  var yMin = 1966, yMax = 2015;
  var xOf = function (y) { return padL + (y - yMin) * (W - padL - padR) / (yMax - yMin); };

  var svgNS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Línea de tiempo de inviernos y renacimientos 1969–2012');

  // Zone bands
  var zoneColors = {
    winter:     { fill: 'rgba(100,120,150,0.10)', stroke: 'rgba(100,120,150,0.25)' },
    renaissance:{ fill: 'rgba(92,184,255,0.06)',   stroke: 'rgba(92,184,255,0.18)' }
  };

  zones.forEach(function (z) {
    var x1 = xOf(z.y1), x2 = xOf(z.y2);
    var rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('x', x1);
    rect.setAttribute('y', 10);
    rect.setAttribute('width', x2 - x1);
    rect.setAttribute('height', H - 30);
    rect.setAttribute('rx', 6);
    rect.setAttribute('fill', zoneColors[z.cls].fill);
    rect.setAttribute('stroke', zoneColors[z.cls].stroke);
    rect.setAttribute('stroke-width', '1');
    svg.appendChild(rect);

    var lbl = document.createElementNS(svgNS, 'text');
    lbl.setAttribute('x', (x1 + x2) / 2);
    lbl.setAttribute('y', 24);
    lbl.setAttribute('text-anchor', 'middle');
    lbl.setAttribute('fill', z.cls === 'winter' ? 'rgba(160,175,195,0.55)' : 'rgba(92,184,255,0.4)');
    lbl.setAttribute('font-size', '10');
    lbl.setAttribute('font-family', 'SFMono-Regular, Menlo, monospace');
    lbl.textContent = z.label;
    svg.appendChild(lbl);
  });

  // Axis
  var axis = document.createElementNS(svgNS, 'line');
  axis.setAttribute('x1', padL - 10);
  axis.setAttribute('x2', W - padR + 10);
  axis.setAttribute('y1', axisY);
  axis.setAttribute('y2', axisY);
  axis.setAttribute('stroke', '#3a4049');
  axis.setAttribute('stroke-width', '2');
  svg.appendChild(axis);

  // Decade ticks
  for (var y = 1970; y <= 2010; y += 10) {
    var tx = xOf(y);
    var tick = document.createElementNS(svgNS, 'line');
    tick.setAttribute('x1', tx);
    tick.setAttribute('x2', tx);
    tick.setAttribute('y1', axisY - 4);
    tick.setAttribute('y2', axisY + 4);
    tick.setAttribute('stroke', '#3a4049');
    tick.setAttribute('stroke-width', '1');
    svg.appendChild(tick);

    var tl = document.createElementNS(svgNS, 'text');
    tl.setAttribute('x', tx);
    tl.setAttribute('y', axisY + 20);
    tl.setAttribute('text-anchor', 'middle');
    tl.setAttribute('fill', '#6b7480');
    tl.setAttribute('font-size', '11');
    tl.setAttribute('font-family', 'SFMono-Regular, Menlo, monospace');
    tl.textContent = String(y);
    svg.appendChild(tl);
  }

  // Events
  var active = null;

  events.forEach(function (e, idx) {
    var g = document.createElementNS(svgNS, 'g');
    g.setAttribute('class', 'tl-event');
    g.setAttribute('tabindex', '0');
    g.setAttribute('cursor', 'pointer');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', e.year + ' — ' + e.label);

    var x = xOf(e.year);
    var above = idx % 2 === 0;
    var labelY = above ? axisY - 40 : axisY + 48;
    var tickY1 = above ? axisY - 6 : axisY + 6;
    var tickY2 = above ? axisY - 28 : axisY + 28;

    var stem = document.createElementNS(svgNS, 'line');
    stem.setAttribute('x1', x);
    stem.setAttribute('x2', x);
    stem.setAttribute('y1', tickY1);
    stem.setAttribute('y2', tickY2);
    stem.setAttribute('stroke', '#5cb8ff');
    stem.setAttribute('stroke-width', '1.5');
    g.appendChild(stem);

    var dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('cx', x);
    dot.setAttribute('cy', axisY);
    dot.setAttribute('r', 5);
    dot.setAttribute('fill', '#1a1d21');
    dot.setAttribute('stroke', '#5cb8ff');
    dot.setAttribute('stroke-width', '2');
    g.appendChild(dot);

    var yearLbl = document.createElementNS(svgNS, 'text');
    yearLbl.setAttribute('x', x);
    yearLbl.setAttribute('y', labelY);
    yearLbl.setAttribute('text-anchor', 'middle');
    yearLbl.setAttribute('fill', '#5cb8ff');
    yearLbl.setAttribute('font-size', '11');
    yearLbl.setAttribute('font-family', 'SFMono-Regular, Menlo, monospace');
    yearLbl.setAttribute('font-weight', '600');
    yearLbl.textContent = e.year;
    g.appendChild(yearLbl);

    var name = document.createElementNS(svgNS, 'text');
    name.setAttribute('x', x);
    name.setAttribute('y', labelY + (above ? -13 : 13));
    name.setAttribute('text-anchor', 'middle');
    name.setAttribute('fill', '#d5d9de');
    name.setAttribute('font-size', '9');
    name.setAttribute('font-family', 'SFMono-Regular, Menlo, monospace');
    name.textContent = e.short;
    g.appendChild(name);

    var activate = function () {
      if (active) active.querySelector('circle').setAttribute('fill', '#1a1d21');
      dot.setAttribute('fill', '#5cb8ff');
      active = g;
      panel.innerHTML = '<h4>' + e.year + ' — ' + e.title + '</h4><p>' + e.body + '</p>';
    };

    g.addEventListener('click', activate);
    g.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); activate(); }
    });

    svg.appendChild(g);
  });

  stage.appendChild(svg);

  // Activate first event by default
  var first = svg.querySelectorAll('.tl-event')[0];
  if (first) first.dispatchEvent(new Event('click'));
})();
