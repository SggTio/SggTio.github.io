/* =============================================================
   turing.js — red NAND B-type educable
   Dos entradas, tres puertas NAND y una conexión modificadora.
   El botón "Recompensa"/"Castigo" ajusta el modificador para
   mostrar cómo un B-type aprende por refuerzo.
   ============================================================= */
(function () {
  const root = document.getElementById('viz-turing');
  if (!root) return;
  const stage = root.querySelector('.viz-stage');
  const readout = root.querySelector('.viz-readout');
  if (!stage || !readout) return;

  const NAND = (a, b) => (a === 1 && b === 1) ? 0 : 1;

  // Arquitectura: dos entradas x1,x2.
  // G1 = NAND(x1, x2)
  // G2 = NAND(x1, G1)  pero con una "conexión modificadora" m ∈ {0,1}
  //      si m=0 la entrada se bloquea a 1 (identidad bajo NAND)
  // G3 = NAND(G2, x2)
  // Objetivo: aprender m tal que y = XOR(x1, x2).
  const state = {
    x1: 1, x2: 0,
    m: 1,             // parámetro modificador educable
    target: 'XOR',
    log: []
  };

  function compute() {
    const g1 = NAND(state.x1, state.x2);
    const g1_eff = state.m === 1 ? g1 : 1; // modificador apagado => '1' constante
    const g2 = NAND(state.x1, g1_eff);
    const g3 = NAND(g2, state.x2);
    return { g1, g1_eff, g2, g3 };
  }

  function targetFn(x1, x2) {
    // XOR
    return (x1 + x2) % 2;
  }

  const svgNS = 'http://www.w3.org/2000/svg';
  const W = 680, H = 260;
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  function mkNode(x, y, label, className = 'node') {
    const c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', 24);
    c.setAttribute('class', className);
    svg.appendChild(c);
    const t = document.createElementNS(svgNS, 'text');
    t.setAttribute('x', x); t.setAttribute('y', y - 3);
    t.setAttribute('class', 'node-label');
    t.textContent = label;
    svg.appendChild(t);
    const val = document.createElementNS(svgNS, 'text');
    val.setAttribute('x', x); val.setAttribute('y', y + 10);
    val.setAttribute('class', 'node-label');
    val.setAttribute('fill', '#5cb8ff');
    svg.appendChild(val);
    return { c, t, val };
  }

  function mkEdge(x1, y1, x2, y2) {
    const l = document.createElementNS(svgNS, 'line');
    l.setAttribute('x1', x1); l.setAttribute('y1', y1);
    l.setAttribute('x2', x2); l.setAttribute('y2', y2);
    l.setAttribute('class', 'edge');
    svg.appendChild(l);
    return l;
  }

  // Posiciones
  const X1 = { x: 70,  y: 60 };
  const X2 = { x: 70,  y: 200 };
  const G1 = { x: 260, y: 130 };
  const G2 = { x: 430, y: 80 };
  const G3 = { x: 580, y: 130 };

  // Aristas
  const e_x1_g1 = mkEdge(X1.x + 24, X1.y, G1.x - 24, G1.y);
  const e_x2_g1 = mkEdge(X2.x + 24, X2.y, G1.x - 24, G1.y);
  const e_x1_g2 = mkEdge(X1.x + 24, X1.y, G2.x - 24, G2.y);
  const e_g1_g2 = mkEdge(G1.x + 24, G1.y, G2.x - 24, G2.y);
  const e_g2_g3 = mkEdge(G2.x + 24, G2.y, G3.x - 24, G3.y);
  const e_x2_g3 = mkEdge(X2.x + 24, X2.y, G3.x - 24, G3.y);

  // Nodos
  const nX1 = mkNode(X1.x, X1.y, 'x₁');
  const nX2 = mkNode(X2.x, X2.y, 'x₂');
  const nG1 = mkNode(G1.x, G1.y, 'NAND');
  const nG2 = mkNode(G2.x, G2.y, 'NAND');
  const nG3 = mkNode(G3.x, G3.y, 'NAND');

  // Etiqueta del modificador m en la arista G1→G2
  const mLabel = document.createElementNS(svgNS, 'text');
  mLabel.setAttribute('x', (G1.x + G2.x) / 2);
  mLabel.setAttribute('y', (G1.y + G2.y) / 2 - 8);
  mLabel.setAttribute('class', 'edge-label');
  svg.appendChild(mLabel);

  stage.appendChild(svg);

  // Controles
  const controls = root.querySelector('.viz-controls');
  controls.innerHTML = '';

  const mkToggle = (label, getVal, onClick) => {
    const wrap = document.createElement('label');
    const name = document.createElement('span'); name.textContent = label;
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.type = 'button';
    btn.addEventListener('click', () => { onClick(); draw(); });
    wrap.appendChild(name); wrap.appendChild(btn);
    controls.appendChild(wrap);
    return { btn, update: () => btn.textContent = getVal() };
  };

  const tX1 = mkToggle('x₁', () => state.x1, () => { state.x1 = state.x1 ? 0 : 1; });
  const tX2 = mkToggle('x₂', () => state.x2, () => { state.x2 = state.x2 ? 0 : 1; });

  const btnRow = document.createElement('div');
  btnRow.className = 'btn-row';

  const bReward = document.createElement('button');
  bReward.className = 'btn';
  bReward.textContent = 'Recompensa';
  bReward.title = 'Refuerza el modificador si la salida es correcta';
  bReward.addEventListener('click', () => {
    const { g3 } = compute();
    const t = targetFn(state.x1, state.x2);
    if (g3 === t) {
      state.log.unshift(`✓ Correcto · m=${state.m} refuerza`);
    } else {
      state.log.unshift('· Recompensa ignorada (salida incorrecta)');
    }
    if (state.log.length > 4) state.log.pop();
    draw();
  });

  const bPunish = document.createElement('button');
  bPunish.className = 'btn';
  bPunish.textContent = 'Castigo';
  bPunish.title = 'Invierte el modificador si la salida es incorrecta';
  bPunish.addEventListener('click', () => {
    const { g3 } = compute();
    const t = targetFn(state.x1, state.x2);
    if (g3 !== t) {
      state.m = state.m ? 0 : 1;
      state.log.unshift(`✗ Error · m→${state.m}`);
    } else {
      state.log.unshift('· Castigo ignorado (salida ya correcta)');
    }
    if (state.log.length > 4) state.log.pop();
    draw();
  });

  const bAuto = document.createElement('button');
  bAuto.className = 'btn';
  bAuto.textContent = 'Entrenar (4 casos)';
  bAuto.addEventListener('click', () => {
    const cases = [[0, 0], [0, 1], [1, 0], [1, 1]];
    let step = 0;
    const id = setInterval(() => {
      if (step >= cases.length) { clearInterval(id); return; }
      state.x1 = cases[step][0]; state.x2 = cases[step][1];
      const { g3 } = compute();
      const t = targetFn(state.x1, state.x2);
      if (g3 !== t) {
        state.m = state.m ? 0 : 1;
        state.log.unshift(`(${state.x1},${state.x2}) ✗ → m=${state.m}`);
      } else {
        state.log.unshift(`(${state.x1},${state.x2}) ✓`);
      }
      if (state.log.length > 4) state.log.pop();
      draw();
      step++;
    }, 450);
  });

  const bReset = document.createElement('button');
  bReset.className = 'btn btn-ghost';
  bReset.textContent = 'Reset';
  bReset.addEventListener('click', () => {
    state.m = 1; state.log = []; draw();
  });

  btnRow.appendChild(bReward);
  btnRow.appendChild(bPunish);
  btnRow.appendChild(bAuto);
  btnRow.appendChild(bReset);
  controls.appendChild(btnRow);

  function setActive(node, v) {
    node.c.classList.toggle('active', v === 1);
    node.val.textContent = `=${v}`;
  }

  function draw() {
    const { g1, g1_eff, g2, g3 } = compute();
    const t = targetFn(state.x1, state.x2);

    setActive(nX1, state.x1);
    setActive(nX2, state.x2);
    setActive(nG1, g1);
    setActive(nG2, g2);
    setActive(nG3, g3);

    // Aristas activas
    [e_x1_g1, e_x2_g1, e_x1_g2, e_g1_g2, e_g2_g3, e_x2_g3].forEach(e => {
      e.classList.remove('pos', 'active');
    });
    if (state.x1 === 1) e_x1_g1.classList.add('active', 'pos');
    if (state.x2 === 1) e_x2_g1.classList.add('active', 'pos');
    if (state.x1 === 1) e_x1_g2.classList.add('active', 'pos');
    if (state.m === 1 && g1 === 1) e_g1_g2.classList.add('active', 'pos');
    if (g2 === 1) e_g2_g3.classList.add('active', 'pos');
    if (state.x2 === 1) e_x2_g3.classList.add('active', 'pos');

    // Línea cortada si el modificador está apagado
    e_g1_g2.setAttribute('stroke-dasharray', state.m === 0 ? '5 4' : '');

    mLabel.textContent = `m=${state.m}`;
    mLabel.setAttribute('fill', state.m === 1 ? '#5cb8ff' : '#ff6b6b');

    tX1.update(); tX2.update();

    const logHtml = state.log.length
      ? state.log.map(l => `<span class="k">·</span><span class="v">${l}</span>`).join('')
      : '<span class="k">·</span><span class="v">sin historial</span>';

    readout.innerHTML = `
      <span class="k">Entrada</span><span class="v">(${state.x1}, ${state.x2})</span>
      <span class="k">NAND₁</span><span class="v">${g1}</span>
      <span class="k">Modificador</span><span class="v">${state.m === 1 ? 'activo' : 'inhibido'}</span>
      <span class="k">NAND₂</span><span class="v">${g2}</span>
      <span class="k">Salida</span><span class="v">${g3} ${g3 === t ? '✓' : '✗'} (objetivo ${t})</span>
      <span class="k">Objetivo</span><span class="v">${state.target}</span>
      ${logHtml}
    `;
  }

  draw();
})();
