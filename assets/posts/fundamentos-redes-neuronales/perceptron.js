/* =============================================================
   perceptron.js — Perceptrón de Rosenblatt interactivo
   Plano 2D. Haz click para añadir puntos; shift+click para
   añadirlos como clase 0. El botón "Entrenar" corre la regla
   de aprendizaje y anima la frontera de decisión.
   ============================================================= */
(function () {
  const root = document.getElementById('viz-perceptron');
  if (!root) return;

  const stage = root.querySelector('.viz-stage');
  const readout = root.querySelector('.viz-readout');
  if (!stage || !readout) return;

  const svgNS = 'http://www.w3.org/2000/svg';
  const W = 520, H = 420;
  const pad = 30;
  const xMin = -6, xMax = 6, yMin = -6, yMax = 6;

  const toPx = (x, y) => [
    pad + (x - xMin) * (W - 2 * pad) / (xMax - xMin),
    H - pad - (y - yMin) * (H - 2 * pad) / (yMax - yMin)
  ];
  const toWorld = (px, py) => [
    xMin + (px - pad) * (xMax - xMin) / (W - 2 * pad),
    yMin + (H - pad - py) * (yMax - yMin) / (H - 2 * pad)
  ];

  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('cursor', 'crosshair');

  // Ejes
  const axisG = document.createElementNS(svgNS, 'g');
  const [ox, oy0] = toPx(0, yMin);
  const [ox1, oy1] = toPx(0, yMax);
  const [ax0, ay] = toPx(xMin, 0);
  const [ax1, ay1] = toPx(xMax, 0);
  const vAxis = document.createElementNS(svgNS, 'line');
  vAxis.setAttribute('x1', ox); vAxis.setAttribute('y1', oy0);
  vAxis.setAttribute('x2', ox1); vAxis.setAttribute('y2', oy1);
  vAxis.setAttribute('stroke', '#2b3036'); vAxis.setAttribute('stroke-width', '1');
  const hAxis = document.createElementNS(svgNS, 'line');
  hAxis.setAttribute('x1', ax0); hAxis.setAttribute('y1', ay);
  hAxis.setAttribute('x2', ax1); hAxis.setAttribute('y2', ay1);
  hAxis.setAttribute('stroke', '#2b3036'); hAxis.setAttribute('stroke-width', '1');
  axisG.appendChild(vAxis); axisG.appendChild(hAxis);

  // Cuadrícula ligera
  for (let i = xMin + 1; i <= xMax - 1; i++) {
    if (i === 0) continue;
    const [gx1, gy1] = toPx(i, yMin);
    const [gx2, gy2] = toPx(i, yMax);
    const l = document.createElementNS(svgNS, 'line');
    l.setAttribute('x1', gx1); l.setAttribute('y1', gy1);
    l.setAttribute('x2', gx2); l.setAttribute('y2', gy2);
    l.setAttribute('stroke', '#1c2026'); l.setAttribute('stroke-width', '1');
    axisG.appendChild(l);
  }
  for (let j = yMin + 1; j <= yMax - 1; j++) {
    if (j === 0) continue;
    const [gx1, gy1] = toPx(xMin, j);
    const [gx2, gy2] = toPx(xMax, j);
    const l = document.createElementNS(svgNS, 'line');
    l.setAttribute('x1', gx1); l.setAttribute('y1', gy1);
    l.setAttribute('x2', gx2); l.setAttribute('y2', gy2);
    l.setAttribute('stroke', '#1c2026'); l.setAttribute('stroke-width', '1');
    axisG.appendChild(l);
  }
  svg.appendChild(axisG);

  // Frontera de decisión (dibujada como línea)
  const boundary = document.createElementNS(svgNS, 'line');
  boundary.setAttribute('stroke', '#5cb8ff');
  boundary.setAttribute('stroke-width', '2.5');
  boundary.setAttribute('stroke-linecap', 'round');
  svg.appendChild(boundary);

  // Sombras de clases (semi-plano)
  const shadePos = document.createElementNS(svgNS, 'polygon');
  shadePos.setAttribute('fill', 'rgba(92, 184, 255, 0.08)');
  svg.appendChild(shadePos);
  const shadeNeg = document.createElementNS(svgNS, 'polygon');
  shadeNeg.setAttribute('fill', 'rgba(255, 107, 107, 0.06)');
  svg.appendChild(shadeNeg);

  // Puntos
  const pointsG = document.createElementNS(svgNS, 'g');
  svg.appendChild(pointsG);

  // Estado
  const state = {
    points: [],
    w: [0.1, -0.1],
    b: 0,
    lr: 0.1,
    epoch: 0,
    errors: 0,
    converged: false,
    animId: null
  };

  function seed() {
    state.points = [];
    const rand = (m, s) => m + (Math.random() - 0.5) * s;
    for (let i = 0; i < 12; i++) state.points.push({ x: rand(2.5, 3), y: rand(2.5, 3), label: 1 });
    for (let i = 0; i < 12; i++) state.points.push({ x: rand(-2.5, 3), y: rand(-2.5, 3), label: 0 });
  }
  seed();

  function predict(p) {
    const s = state.w[0] * p.x + state.w[1] * p.y + state.b;
    return s >= 0 ? 1 : 0;
  }

  function trainStep() {
    // Una pasada completa por los puntos
    let errs = 0;
    for (const p of state.points) {
      const y = predict(p);
      const err = p.label - y;
      if (err !== 0) {
        state.w[0] += state.lr * err * p.x;
        state.w[1] += state.lr * err * p.y;
        state.b    += state.lr * err;
        errs++;
      }
    }
    state.epoch++;
    state.errors = errs;
    if (errs === 0) state.converged = true;
  }

  function drawBoundary() {
    // w1*x + w2*y + b = 0  →  y = -(w1*x + b)/w2
    if (Math.abs(state.w[1]) < 1e-6) {
      if (Math.abs(state.w[0]) < 1e-6) {
        boundary.setAttribute('x1', 0); boundary.setAttribute('y1', 0);
        boundary.setAttribute('x2', 0); boundary.setAttribute('y2', 0);
        shadePos.setAttribute('points', '');
        shadeNeg.setAttribute('points', '');
        return;
      }
      // Línea vertical
      const xv = -state.b / state.w[0];
      const [bx1, by1] = toPx(xv, yMin);
      const [bx2, by2] = toPx(xv, yMax);
      boundary.setAttribute('x1', bx1); boundary.setAttribute('y1', by1);
      boundary.setAttribute('x2', bx2); boundary.setAttribute('y2', by2);
      return;
    }
    const y1 = -(state.w[0] * xMin + state.b) / state.w[1];
    const y2 = -(state.w[0] * xMax + state.b) / state.w[1];
    const [bx1, by1] = toPx(xMin, y1);
    const [bx2, by2] = toPx(xMax, y2);
    boundary.setAttribute('x1', bx1); boundary.setAttribute('y1', by1);
    boundary.setAttribute('x2', bx2); boundary.setAttribute('y2', by2);

    // Sombrea el semi-plano positivo
    const corners = [[xMin, yMin], [xMax, yMin], [xMax, yMax], [xMin, yMax]];
    const pos = [], neg = [];
    const edgePts = [[xMin, y1], [xMax, y2]];
    // Polígonos sencillos: construimos con bordes + esquinas adecuadas
    for (const [cx, cy] of corners) {
      const s = state.w[0] * cx + state.w[1] * cy + state.b;
      if (s >= 0) pos.push([cx, cy]); else neg.push([cx, cy]);
    }
    pos.push(...edgePts); neg.push(...edgePts);
    const center = arr => {
      const n = arr.length;
      const cx = arr.reduce((a, p) => a + p[0], 0) / n;
      const cy = arr.reduce((a, p) => a + p[1], 0) / n;
      return [cx, cy];
    };
    const sortByAngle = arr => {
      if (arr.length < 3) return arr;
      const [cx, cy] = center(arr);
      return arr.slice().sort((a, b) => Math.atan2(a[1] - cy, a[0] - cx) - Math.atan2(b[1] - cy, b[0] - cx));
    };
    const toStr = arr => sortByAngle(arr).map(([x, y]) => toPx(x, y).join(',')).join(' ');
    shadePos.setAttribute('points', toStr(pos));
    shadeNeg.setAttribute('points', toStr(neg));
  }

  function drawPoints() {
    while (pointsG.firstChild) pointsG.removeChild(pointsG.firstChild);
    for (const p of state.points) {
      const [px, py] = toPx(p.x, p.y);
      const c = document.createElementNS(svgNS, 'circle');
      c.setAttribute('cx', px); c.setAttribute('cy', py); c.setAttribute('r', 6);
      c.setAttribute('fill', p.label === 1 ? '#5cb8ff' : '#ff6b6b');
      c.setAttribute('stroke', '#0f1216');
      c.setAttribute('stroke-width', '2');
      // Marca si está mal clasificado
      if (predict(p) !== p.label) {
        c.setAttribute('stroke', '#ffd166');
        c.setAttribute('stroke-width', '2.5');
      }
      pointsG.appendChild(c);
    }
  }

  function drawReadout() {
    readout.innerHTML = `
      <span class="k">w₁</span><span class="v">${state.w[0].toFixed(3)}</span>
      <span class="k">w₂</span><span class="v">${state.w[1].toFixed(3)}</span>
      <span class="k">sesgo (b)</span><span class="v">${state.b.toFixed(3)}</span>
      <span class="k">tasa η</span><span class="v">${state.lr.toFixed(2)}</span>
      <span class="k">época</span><span class="v">${state.epoch}</span>
      <span class="k">errores</span><span class="v">${state.errors}</span>
      <span class="k">estado</span><span class="v">${state.converged ? 'convergido' : 'entrenando…'}</span>
    `;
  }

  function draw() { drawBoundary(); drawPoints(); drawReadout(); }

  // Click para añadir punto
  svg.addEventListener('click', (ev) => {
    const rect = svg.getBoundingClientRect();
    const scaleX = W / rect.width, scaleY = H / rect.height;
    const px = (ev.clientX - rect.left) * scaleX;
    const py = (ev.clientY - rect.top) * scaleY;
    const [x, y] = toWorld(px, py);
    const label = ev.shiftKey ? 0 : 1;
    state.points.push({ x, y, label });
    state.converged = false;
    draw();
  });

  stage.appendChild(svg);

  // Controles
  const controls = root.querySelector('.viz-controls');
  controls.innerHTML = '';

  const lrWrap = document.createElement('label');
  lrWrap.innerHTML = '<span>η</span>';
  const lrInput = document.createElement('input');
  lrInput.type = 'range'; lrInput.min = '0.01'; lrInput.max = '0.5'; lrInput.step = '0.01';
  lrInput.value = state.lr;
  const lrVal = document.createElement('span');
  lrVal.className = 'value'; lrVal.textContent = state.lr;
  lrInput.addEventListener('input', () => {
    state.lr = Number(lrInput.value); lrVal.textContent = lrInput.value; drawReadout();
  });
  lrWrap.appendChild(lrInput); lrWrap.appendChild(lrVal);
  controls.appendChild(lrWrap);

  const btnRow = document.createElement('div');
  btnRow.className = 'btn-row';

  const bStep = document.createElement('button');
  bStep.className = 'btn'; bStep.textContent = '1 época';
  bStep.addEventListener('click', () => { trainStep(); draw(); });

  const bRun = document.createElement('button');
  bRun.className = 'btn'; bRun.textContent = 'Entrenar';
  bRun.addEventListener('click', () => {
    if (state.animId) return;
    state.converged = false;
    let count = 0;
    state.animId = setInterval(() => {
      trainStep(); draw();
      count++;
      if (state.converged || count > 60) {
        clearInterval(state.animId);
        state.animId = null;
      }
    }, 120);
  });

  const bNewData = document.createElement('button');
  bNewData.className = 'btn btn-ghost'; bNewData.textContent = 'Nuevos datos';
  bNewData.addEventListener('click', () => {
    if (state.animId) { clearInterval(state.animId); state.animId = null; }
    seed();
    state.w = [0.1, -0.1]; state.b = 0;
    state.epoch = 0; state.errors = 0; state.converged = false;
    draw();
  });

  const bReset = document.createElement('button');
  bReset.className = 'btn btn-ghost'; bReset.textContent = 'Reset pesos';
  bReset.addEventListener('click', () => {
    if (state.animId) { clearInterval(state.animId); state.animId = null; }
    state.w = [0.1, -0.1]; state.b = 0;
    state.epoch = 0; state.errors = 0; state.converged = false;
    draw();
  });

  btnRow.appendChild(bStep);
  btnRow.appendChild(bRun);
  btnRow.appendChild(bNewData);
  btnRow.appendChild(bReset);
  controls.appendChild(btnRow);

  const hint = document.createElement('div');
  hint.className = 'small muted';
  hint.style.width = '100%';
  hint.style.marginTop = '.25rem';
  hint.textContent = 'Click: añade punto azul · Shift+Click: añade punto rojo';
  controls.appendChild(hint);

  draw();
})();
