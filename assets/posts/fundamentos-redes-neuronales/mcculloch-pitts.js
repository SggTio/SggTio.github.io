/* =============================================================
   mcculloch-pitts.js — neurona interactiva de McCulloch-Pitts
   Tres entradas binarias, pesos y umbral ajustables.
   Presets: AND, OR, NOT.
   ============================================================= */
(function () {
  const root = document.getElementById('viz-mcp');
  if (!root) return;

  const stage = root.querySelector('.viz-stage');
  const readout = root.querySelector('.viz-readout');
  if (!stage || !readout) return;

  const state = {
    x: [1, 0, 1],
    w: [1, 1, 1],
    theta: 2
  };

  const svgNS = 'http://www.w3.org/2000/svg';
  const W = 640, H = 280;
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  const inputsX = 100;
  const neuronX = 400;
  const outputX = 560;
  const neuronY = H / 2;
  const inputYs = [70, 140, 210];

  // Aristas
  const edges = [];
  for (let i = 0; i < 3; i++) {
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', inputsX + 22);
    line.setAttribute('y1', inputYs[i]);
    line.setAttribute('x2', neuronX - 32);
    line.setAttribute('y2', neuronY);
    line.setAttribute('class', 'edge');
    svg.appendChild(line);
    edges.push(line);

    const lbl = document.createElementNS(svgNS, 'text');
    const mx = (inputsX + 22 + neuronX - 32) / 2;
    const my = (inputYs[i] + neuronY) / 2 - 6;
    lbl.setAttribute('x', mx);
    lbl.setAttribute('y', my);
    lbl.setAttribute('class', 'edge-label');
    lbl.textContent = `w${i + 1}`;
    svg.appendChild(lbl);
    edges[i].lbl = lbl;
  }

  // Arista salida
  const outEdge = document.createElementNS(svgNS, 'line');
  outEdge.setAttribute('x1', neuronX + 32);
  outEdge.setAttribute('y1', neuronY);
  outEdge.setAttribute('x2', outputX - 22);
  outEdge.setAttribute('y2', neuronY);
  outEdge.setAttribute('class', 'edge');
  svg.appendChild(outEdge);

  // Nodos de entrada
  const inputNodes = [];
  const inputLabels = [];
  for (let i = 0; i < 3; i++) {
    const c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('cx', inputsX);
    c.setAttribute('cy', inputYs[i]);
    c.setAttribute('r', 22);
    c.setAttribute('class', 'node');
    c.setAttribute('cursor', 'pointer');
    c.addEventListener('click', () => { state.x[i] = state.x[i] ? 0 : 1; draw(); });
    svg.appendChild(c);
    inputNodes.push(c);

    const t = document.createElementNS(svgNS, 'text');
    t.setAttribute('x', inputsX);
    t.setAttribute('y', inputYs[i]);
    t.setAttribute('class', 'node-label');
    t.setAttribute('pointer-events', 'none');
    svg.appendChild(t);
    inputLabels.push(t);

    const name = document.createElementNS(svgNS, 'text');
    name.setAttribute('x', inputsX - 40);
    name.setAttribute('y', inputYs[i] + 4);
    name.setAttribute('class', 'edge-label');
    name.setAttribute('text-anchor', 'end');
    name.textContent = `x${i + 1}`;
    svg.appendChild(name);
  }

  // Cuerpo neurona
  const body = document.createElementNS(svgNS, 'circle');
  body.setAttribute('cx', neuronX);
  body.setAttribute('cy', neuronY);
  body.setAttribute('r', 32);
  body.setAttribute('class', 'node');
  svg.appendChild(body);

  const bodyLbl = document.createElementNS(svgNS, 'text');
  bodyLbl.setAttribute('x', neuronX);
  bodyLbl.setAttribute('y', neuronY - 4);
  bodyLbl.setAttribute('class', 'node-label');
  svg.appendChild(bodyLbl);

  const thetaLbl = document.createElementNS(svgNS, 'text');
  thetaLbl.setAttribute('x', neuronX);
  thetaLbl.setAttribute('y', neuronY + 10);
  thetaLbl.setAttribute('class', 'edge-label');
  svg.appendChild(thetaLbl);

  // Nodo salida
  const outNode = document.createElementNS(svgNS, 'circle');
  outNode.setAttribute('cx', outputX);
  outNode.setAttribute('cy', neuronY);
  outNode.setAttribute('r', 22);
  outNode.setAttribute('class', 'node');
  svg.appendChild(outNode);

  const outLbl = document.createElementNS(svgNS, 'text');
  outLbl.setAttribute('x', outputX);
  outLbl.setAttribute('y', neuronY);
  outLbl.setAttribute('class', 'node-label');
  svg.appendChild(outLbl);

  const yCaption = document.createElementNS(svgNS, 'text');
  yCaption.setAttribute('x', outputX + 28);
  yCaption.setAttribute('y', neuronY + 4);
  yCaption.setAttribute('class', 'edge-label');
  yCaption.setAttribute('text-anchor', 'start');
  yCaption.textContent = 'y';
  svg.appendChild(yCaption);

  stage.appendChild(svg);

  // Controles
  const controls = root.querySelector('.viz-controls');
  controls.innerHTML = '';

  const mkRange = (label, min, max, step, value, onInput) => {
    const wrap = document.createElement('label');
    const name = document.createElement('span');
    name.textContent = label;
    const input = document.createElement('input');
    input.type = 'range';
    input.min = min; input.max = max; input.step = step; input.value = value;
    const v = document.createElement('span');
    v.className = 'value';
    v.textContent = value;
    input.addEventListener('input', () => { v.textContent = input.value; onInput(Number(input.value)); });
    wrap.appendChild(name); wrap.appendChild(input); wrap.appendChild(v);
    controls.appendChild(wrap);
    return input;
  };

  mkRange('w₁', -2, 2, 0.5, state.w[0], v => { state.w[0] = v; draw(); });
  mkRange('w₂', -2, 2, 0.5, state.w[1], v => { state.w[1] = v; draw(); });
  mkRange('w₃', -2, 2, 0.5, state.w[2], v => { state.w[2] = v; draw(); });
  mkRange('θ', -2, 4, 0.5, state.theta, v => { state.theta = v; draw(); });

  const btnRow = document.createElement('div');
  btnRow.className = 'btn-row';

  const presets = [
    { name: 'AND', w: [1, 1, 0], t: 2, x: [1, 1, 0] },
    { name: 'OR',  w: [1, 1, 0], t: 1, x: [0, 1, 0] },
    { name: 'NOT', w: [1, -2, 0], t: 0.5, x: [1, 1, 0] } // x1=bias, x2=entrada
  ];

  presets.forEach(p => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = p.name;
    b.addEventListener('click', () => {
      state.w = p.w.slice();
      state.theta = p.t;
      state.x = p.x.slice();
      syncControls();
      draw();
    });
    btnRow.appendChild(b);
  });

  const reset = document.createElement('button');
  reset.className = 'btn btn-ghost';
  reset.textContent = 'Reset';
  reset.addEventListener('click', () => {
    state.w = [1, 1, 1]; state.theta = 2; state.x = [1, 0, 1];
    syncControls(); draw();
  });
  btnRow.appendChild(reset);
  controls.appendChild(btnRow);

  function syncControls() {
    const ranges = controls.querySelectorAll('input[type="range"]');
    const vals = controls.querySelectorAll('.value');
    [state.w[0], state.w[1], state.w[2], state.theta].forEach((v, i) => {
      if (ranges[i]) { ranges[i].value = v; vals[i].textContent = v; }
    });
  }

  function draw() {
    // Nodos entrada
    for (let i = 0; i < 3; i++) {
      inputNodes[i].classList.toggle('active', state.x[i] === 1);
      inputLabels[i].textContent = state.x[i];
    }
    // Aristas
    for (let i = 0; i < 3; i++) {
      edges[i].classList.remove('pos', 'neg', 'active');
      if (state.w[i] > 0) edges[i].classList.add('pos');
      else if (state.w[i] < 0) edges[i].classList.add('neg');
      if (state.x[i] === 1 && state.w[i] !== 0) edges[i].classList.add('active');
      edges[i].lbl.textContent = `w${i + 1}=${state.w[i]}`;
    }
    // Suma y salida
    const s = state.x[0] * state.w[0] + state.x[1] * state.w[1] + state.x[2] * state.w[2];
    const y = s >= state.theta ? 1 : 0;

    body.classList.toggle('active', y === 1);
    outNode.classList.toggle('active', y === 1);
    outEdge.classList.toggle('active', y === 1);
    outEdge.classList.toggle('pos', y === 1);

    bodyLbl.textContent = `Σ=${fmt(s)}`;
    thetaLbl.textContent = `θ=${fmt(state.theta)}`;
    outLbl.textContent = y;

    readout.innerHTML = `
      <span class="k">Entradas</span><span class="v">[${state.x.join(', ')}]</span>
      <span class="k">Pesos</span><span class="v">[${state.w.map(fmt).join(', ')}]</span>
      <span class="k">Suma ponderada</span><span class="v">${fmt(s)}</span>
      <span class="k">Umbral</span><span class="v">${fmt(state.theta)}</span>
      <span class="k">Salida</span><span class="v">${y === 1 ? '1  (dispara)' : '0  (no dispara)'}</span>
    `;
  }

  function fmt(n) {
    return Number.isInteger(n) ? String(n) : n.toFixed(1);
  }

  draw();
})();
