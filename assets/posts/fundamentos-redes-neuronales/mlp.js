/* =============================================================
   mlp.js — MLP 2-2-1 aprendiendo XOR
   Forward pass animado + backprop + frontera de decisión 2D.
   Math puro en JS, sin dependencias.
   ============================================================= */
(function () {
  const root = document.getElementById('viz-mlp');
  if (!root) return;
  const stage = root.querySelector('.viz-stage');
  const readout = root.querySelector('.viz-readout');
  if (!stage || !readout) return;

  const svgNS = 'http://www.w3.org/2000/svg';

  // ---------- Red ----------
  const DATA = [
    { x: [0, 0], y: 0 },
    { x: [0, 1], y: 1 },
    { x: [1, 0], y: 1 },
    { x: [1, 1], y: 0 }
  ];

  const sigmoid = z => 1 / (1 + Math.exp(-z));
  const rand = () => (Math.random() * 2 - 1);

  function initNet() {
    return {
      W1: [[rand(), rand()], [rand(), rand()]],
      b1: [rand() * 0.1, rand() * 0.1],
      W2: [rand(), rand()],
      b2: rand() * 0.1
    };
  }

  function forward(net, x) {
    const z1 = [
      net.W1[0][0] * x[0] + net.W1[0][1] * x[1] + net.b1[0],
      net.W1[1][0] * x[0] + net.W1[1][1] * x[1] + net.b1[1]
    ];
    const h = [sigmoid(z1[0]), sigmoid(z1[1])];
    const z2 = net.W2[0] * h[0] + net.W2[1] * h[1] + net.b2;
    const y = sigmoid(z2);
    return { z1, h, z2, y };
  }

  function trainStep(net, lr) {
    // Un epoch completo con descenso de gradiente por lote
    let loss = 0;
    const grads = {
      W1: [[0, 0], [0, 0]],
      b1: [0, 0],
      W2: [0, 0],
      b2: 0
    };
    for (const d of DATA) {
      const { h, y } = forward(net, d.x);
      const e = y - d.y;
      loss += 0.5 * e * e;
      const dz2 = e * y * (1 - y);
      grads.W2[0] += dz2 * h[0];
      grads.W2[1] += dz2 * h[1];
      grads.b2    += dz2;
      const dh = [net.W2[0] * dz2, net.W2[1] * dz2];
      const dz1 = [dh[0] * h[0] * (1 - h[0]), dh[1] * h[1] * (1 - h[1])];
      grads.W1[0][0] += dz1[0] * d.x[0];
      grads.W1[0][1] += dz1[0] * d.x[1];
      grads.W1[1][0] += dz1[1] * d.x[0];
      grads.W1[1][1] += dz1[1] * d.x[1];
      grads.b1[0]    += dz1[0];
      grads.b1[1]    += dz1[1];
    }
    const n = DATA.length;
    net.W1[0][0] -= lr * grads.W1[0][0] / n;
    net.W1[0][1] -= lr * grads.W1[0][1] / n;
    net.W1[1][0] -= lr * grads.W1[1][0] / n;
    net.W1[1][1] -= lr * grads.W1[1][1] / n;
    net.b1[0]    -= lr * grads.b1[0] / n;
    net.b1[1]    -= lr * grads.b1[1] / n;
    net.W2[0]    -= lr * grads.W2[0] / n;
    net.W2[1]    -= lr * grads.W2[1] / n;
    net.b2       -= lr * grads.b2 / n;
    return loss / n;
  }

  // ---------- Estado ----------
  const state = {
    net: initNet(),
    lr: 3,
    epoch: 0,
    loss: NaN,
    sample: 1, // índice del ejemplo a visualizar
    animId: null
  };

  // ---------- SVG principal: red + plano ----------
  const W = 880, H = 360;
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  // Posiciones de nodos
  const inX = 80, hX = 320, oX = 540;
  const inY = [110, 230];
  const hY  = [110, 230];
  const oY  = 170;

  // Aristas W1
  const edgesW1 = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', inX + 28);
      line.setAttribute('y1', inY[j]);
      line.setAttribute('x2', hX - 28);
      line.setAttribute('y2', hY[i]);
      line.setAttribute('class', 'edge');
      svg.appendChild(line);

      const lbl = document.createElementNS(svgNS, 'text');
      const mx = (inX + 28 + hX - 28) / 2;
      const my = (inY[j] + hY[i]) / 2 - 4;
      lbl.setAttribute('x', mx);
      lbl.setAttribute('y', my);
      lbl.setAttribute('class', 'edge-label');
      svg.appendChild(lbl);

      edgesW1.push({ line, lbl, i, j });
    }
  }

  // Aristas W2
  const edgesW2 = [];
  for (let i = 0; i < 2; i++) {
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', hX + 28);
    line.setAttribute('y1', hY[i]);
    line.setAttribute('x2', oX - 28);
    line.setAttribute('y2', oY);
    line.setAttribute('class', 'edge');
    svg.appendChild(line);

    const lbl = document.createElementNS(svgNS, 'text');
    const mx = (hX + 28 + oX - 28) / 2;
    const my = (hY[i] + oY) / 2 - 4;
    lbl.setAttribute('x', mx);
    lbl.setAttribute('y', my);
    lbl.setAttribute('class', 'edge-label');
    svg.appendChild(lbl);

    edgesW2.push({ line, lbl, i });
  }

  // Función utilitaria
  function mkNode(x, y, label) {
    const c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', 26);
    c.setAttribute('class', 'node');
    svg.appendChild(c);

    const top = document.createElementNS(svgNS, 'text');
    top.setAttribute('x', x); top.setAttribute('y', y - 5);
    top.setAttribute('class', 'node-label');
    top.textContent = label;
    svg.appendChild(top);

    const val = document.createElementNS(svgNS, 'text');
    val.setAttribute('x', x); val.setAttribute('y', y + 10);
    val.setAttribute('class', 'node-label');
    val.setAttribute('fill', '#5cb8ff');
    svg.appendChild(val);
    return { c, val };
  }

  const nIn = [ mkNode(inX, inY[0], 'x₁'), mkNode(inX, inY[1], 'x₂') ];
  const nH  = [ mkNode(hX,  hY[0],  'h₁'), mkNode(hX,  hY[1],  'h₂') ];
  const nO  = mkNode(oX, oY, 'y');

  // Etiqueta del objetivo
  const targetLbl = document.createElementNS(svgNS, 'text');
  targetLbl.setAttribute('x', oX);
  targetLbl.setAttribute('y', oY + 52);
  targetLbl.setAttribute('class', 'edge-label');
  svg.appendChild(targetLbl);

  // ---------- Mini-plano de decisión 2D ----------
  const planeX0 = 660, planeY0 = 40, planeW = 200, planeH = 200;
  const planeGroup = document.createElementNS(svgNS, 'g');

  const planeBg = document.createElementNS(svgNS, 'rect');
  planeBg.setAttribute('x', planeX0);
  planeBg.setAttribute('y', planeY0);
  planeBg.setAttribute('width', planeW);
  planeBg.setAttribute('height', planeH);
  planeBg.setAttribute('fill', '#0a0c10');
  planeBg.setAttribute('stroke', '#2b3036');
  planeGroup.appendChild(planeBg);

  // Grid de celdas (más fino)
  const cells = [];
  const GRID = 20;
  const cellW = planeW / GRID, cellH = planeH / GRID;
  for (let i = 0; i < GRID; i++) {
    for (let j = 0; j < GRID; j++) {
      const r = document.createElementNS(svgNS, 'rect');
      r.setAttribute('x', planeX0 + i * cellW);
      r.setAttribute('y', planeY0 + j * cellH);
      r.setAttribute('width', cellW + 0.5);
      r.setAttribute('height', cellH + 0.5);
      planeGroup.appendChild(r);
      cells.push({ r, i, j });
    }
  }

  // Puntos XOR
  const dataDots = [];
  for (const d of DATA) {
    const cx = planeX0 + d.x[0] * planeW;
    const cy = planeY0 + (1 - d.x[1]) * planeH;
    const c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', 7);
    c.setAttribute('fill', d.y === 1 ? '#5cb8ff' : '#ff6b6b');
    c.setAttribute('stroke', '#0f1216'); c.setAttribute('stroke-width', '2');
    planeGroup.appendChild(c);
    dataDots.push({ c, d });
  }

  // Título del plano
  const planeTitle = document.createElementNS(svgNS, 'text');
  planeTitle.setAttribute('x', planeX0 + planeW / 2);
  planeTitle.setAttribute('y', planeY0 - 8);
  planeTitle.setAttribute('class', 'edge-label');
  planeTitle.setAttribute('font-size', '11');
  planeTitle.textContent = 'Frontera aprendida (XOR)';
  planeGroup.appendChild(planeTitle);

  svg.appendChild(planeGroup);
  stage.appendChild(svg);

  // ---------- Controles ----------
  const controls = root.querySelector('.viz-controls');
  controls.innerHTML = '';

  const sampleWrap = document.createElement('label');
  sampleWrap.innerHTML = '<span>Ejemplo</span>';
  const sampleSelect = document.createElement('select');
  sampleSelect.style.background = '#0f1216';
  sampleSelect.style.color = '#d5d9de';
  sampleSelect.style.border = '1px solid #2b3036';
  sampleSelect.style.borderRadius = '4px';
  sampleSelect.style.padding = '.2rem .35rem';
  sampleSelect.style.fontFamily = 'inherit';
  DATA.forEach((d, i) => {
    const o = document.createElement('option');
    o.value = i; o.textContent = `(${d.x.join(', ')}) → ${d.y}`;
    sampleSelect.appendChild(o);
  });
  sampleSelect.value = state.sample;
  sampleSelect.addEventListener('change', () => { state.sample = Number(sampleSelect.value); draw(); });
  sampleWrap.appendChild(sampleSelect);
  controls.appendChild(sampleWrap);

  const lrWrap = document.createElement('label');
  lrWrap.innerHTML = '<span>η</span>';
  const lrInput = document.createElement('input');
  lrInput.type = 'range'; lrInput.min = '0.1'; lrInput.max = '10'; lrInput.step = '0.1';
  lrInput.value = state.lr;
  const lrVal = document.createElement('span');
  lrVal.className = 'value'; lrVal.textContent = state.lr;
  lrInput.addEventListener('input', () => {
    state.lr = Number(lrInput.value); lrVal.textContent = lrInput.value;
  });
  lrWrap.appendChild(lrInput); lrWrap.appendChild(lrVal);
  controls.appendChild(lrWrap);

  const btnRow = document.createElement('div');
  btnRow.className = 'btn-row';

  const bStep = document.createElement('button');
  bStep.className = 'btn'; bStep.textContent = '1 época';
  bStep.addEventListener('click', () => {
    state.loss = trainStep(state.net, state.lr);
    state.epoch++;
    draw();
  });

  const bRun = document.createElement('button');
  bRun.className = 'btn'; bRun.textContent = 'Entrenar';
  bRun.addEventListener('click', () => {
    if (state.animId) return;
    let count = 0;
    state.animId = setInterval(() => {
      for (let k = 0; k < 50; k++) {
        state.loss = trainStep(state.net, state.lr);
        state.epoch++;
      }
      draw();
      count++;
      if (state.loss < 0.005 || count > 80) {
        clearInterval(state.animId);
        state.animId = null;
      }
    }, 40);
  });

  const bReset = document.createElement('button');
  bReset.className = 'btn btn-ghost'; bReset.textContent = 'Reset';
  bReset.addEventListener('click', () => {
    if (state.animId) { clearInterval(state.animId); state.animId = null; }
    state.net = initNet();
    state.epoch = 0; state.loss = NaN;
    draw();
  });

  btnRow.appendChild(bStep);
  btnRow.appendChild(bRun);
  btnRow.appendChild(bReset);
  controls.appendChild(btnRow);

  // ---------- Dibujo ----------
  function colorFromSigned(v, max = 3) {
    const t = Math.max(-1, Math.min(1, v / max));
    return t >= 0 ? 'pos' : 'neg';
  }

  function drawNet() {
    const d = DATA[state.sample];
    const { h, y } = forward(state.net, d.x);

    // Nodos
    nIn[0].val.textContent = d.x[0];
    nIn[1].val.textContent = d.x[1];
    nIn[0].c.classList.toggle('active', d.x[0] === 1);
    nIn[1].c.classList.toggle('active', d.x[1] === 1);

    nH[0].val.textContent = h[0].toFixed(2);
    nH[1].val.textContent = h[1].toFixed(2);
    nH[0].c.classList.toggle('active', h[0] > 0.5);
    nH[1].c.classList.toggle('active', h[1] > 0.5);

    nO.val.textContent = y.toFixed(2);
    nO.c.classList.toggle('active', y > 0.5);

    targetLbl.textContent = `objetivo = ${d.y}`;

    // Aristas W1
    edgesW1.forEach(({ line, lbl, i, j }) => {
      const w = state.net.W1[i][j];
      line.classList.remove('pos', 'neg', 'active');
      line.classList.add(colorFromSigned(w));
      line.setAttribute('stroke-width', Math.max(1, Math.min(5, Math.abs(w) * 1.3 + 1)));
      if (d.x[j] === 1) line.classList.add('active');
      lbl.textContent = w.toFixed(2);
    });

    // Aristas W2
    edgesW2.forEach(({ line, lbl, i }) => {
      const w = state.net.W2[i];
      line.classList.remove('pos', 'neg', 'active');
      line.classList.add(colorFromSigned(w));
      line.setAttribute('stroke-width', Math.max(1, Math.min(5, Math.abs(w) * 1.3 + 1)));
      if (h[i] > 0.5) line.classList.add('active');
      lbl.textContent = w.toFixed(2);
    });
  }

  function drawPlane() {
    for (const cell of cells) {
      const x = (cell.i + 0.5) / GRID;
      const yc = 1 - (cell.j + 0.5) / GRID;
      const { y: out } = forward(state.net, [x, yc]);
      // Mezclamos azul/rojo según out
      const r = Math.round(255 * (1 - out) * 0.35);
      const g = Math.round(255 * 0.08);
      const b = Math.round(255 * out * 0.45);
      cell.r.setAttribute('fill', `rgb(${r + 10}, ${g + 10}, ${b + 16})`);
    }
  }

  function drawReadout() {
    const d = DATA[state.sample];
    const { h, y, z1, z2 } = forward(state.net, d.x);
    readout.innerHTML = `
      <span class="k">Ejemplo</span><span class="v">(${d.x.join(', ')}) → ${d.y}</span>
      <span class="k">z₁</span><span class="v">[${z1.map(v => v.toFixed(2)).join(', ')}]</span>
      <span class="k">h = σ(z₁)</span><span class="v">[${h.map(v => v.toFixed(3)).join(', ')}]</span>
      <span class="k">z₂</span><span class="v">${z2.toFixed(3)}</span>
      <span class="k">ŷ = σ(z₂)</span><span class="v">${y.toFixed(3)}</span>
      <span class="k">pérdida (época)</span><span class="v">${Number.isNaN(state.loss) ? '—' : state.loss.toFixed(4)}</span>
      <span class="k">época</span><span class="v">${state.epoch}</span>
    `;
  }

  function draw() { drawNet(); drawPlane(); drawReadout(); }

  draw();
})();
