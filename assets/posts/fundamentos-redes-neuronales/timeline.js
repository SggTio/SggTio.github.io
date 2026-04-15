/* =============================================================
   timeline.js — línea de tiempo interactiva 1838–1958
   Cinco hitos clicables que revelan un panel descriptivo.
   Dependencias: ninguna. Vanilla JS + SVG.
   ============================================================= */
(function () {
  const root = document.getElementById('viz-timeline');
  if (!root) return;

  const stage = root.querySelector('.viz-stage');
  const panel = root.querySelector('.tl-panel');
  if (!stage || !panel) return;

  const events = [
    {
      year: 1838,
      label: 'Schleiden & Schwann',
      short: 'Teoría celular',
      title: 'La teoría celular (Schleiden, Schwann, Virchow)',
      body: 'Se postula que todo organismo está compuesto por células. Esta idea abrió la puerta a preguntarse si el tejido nervioso también estaba hecho de unidades discretas — o si era un continuo reticular como defendía Camillo Golgi.'
    },
    {
      year: 1888,
      label: 'Cajal',
      short: 'Doctrina neuronal',
      title: 'Santiago Ramón y Cajal — la doctrina neuronal',
      body: 'Usando la tinción de Golgi, Cajal demuestra que el sistema nervioso está formado por células individuales conectadas mediante contactos discretos, no por una red continua. La neurona queda establecida como la unidad anatómica y funcional del cerebro: la primera gran pista de que la inteligencia podría emerger de componentes simples interconectados.'
    },
    {
      year: 1943,
      label: 'McCulloch & Pitts',
      short: 'Neurona lógica',
      title: 'McCulloch y Pitts — "A Logical Calculus of the Ideas Immanent in Nervous Activity"',
      body: 'La primera formalización matemática de la neurona. Un modelo binario, todo-o-nada, con pesos fijos y umbral. Demuestran que redes de estas neuronas son Turing-completas: pueden computar cualquier función lógica. La neurona artificial nace como abstracción pura, sin aprendizaje.'
    },
    {
      year: 1948,
      label: 'Turing',
      short: 'Máquinas educables',
      title: 'Alan Turing — "Intelligent Machinery"',
      body: 'Turing propone máquinas desorganizadas (A-type y B-type) que pueden educarse mediante castigo y recompensa. Por primera vez aparece la idea de que las conexiones no deberían fijarse a mano: la máquina debe ajustarse por sí misma a partir de la experiencia. El ensayo permaneció inédito durante años.'
    },
    {
      year: 1950,
      label: 'Turing',
      short: 'Imitation Game',
      title: 'Alan Turing — "Computing Machinery and Intelligence"',
      body: '"¿Pueden pensar las máquinas?". Turing sustituye la pregunta metafísica por una prueba operacional — el Imitation Game — y defiende la idea de la máquina infantil: no programar inteligencia, sino programar la capacidad de aprender y dejar que la educación haga el resto.'
    },
    {
      year: 1958,
      label: 'Rosenblatt',
      short: 'Perceptrón',
      title: 'Frank Rosenblatt — el Perceptrón',
      body: 'La primera máquina de aprendizaje real. Con fotocélulas, resistencias variables y una regla de actualización incremental, el Perceptrón aprende automáticamente a clasificar patrones linealmente separables. Une la formalización de McCulloch-Pitts con el sueño de Turing: una neurona que ajusta sus propios pesos a partir de sus errores.'
    }
  ];

  const W = 900, H = 180;
  const padL = 60, padR = 60;
  const axisY = 110;
  const yMin = 1830, yMax = 1965;
  const xOf = y => padL + (y - yMin) * (W - padL - padR) / (yMax - yMin);

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Línea de tiempo 1830 a 1965');

  // Eje
  const axis = document.createElementNS(svgNS, 'line');
  axis.setAttribute('x1', padL - 10);
  axis.setAttribute('x2', W - padR + 10);
  axis.setAttribute('y1', axisY);
  axis.setAttribute('y2', axisY);
  axis.setAttribute('stroke', '#3a4049');
  axis.setAttribute('stroke-width', '2');
  svg.appendChild(axis);

  // Marcas de década
  for (let y = 1840; y <= 1960; y += 20) {
    const tick = document.createElementNS(svgNS, 'line');
    tick.setAttribute('x1', xOf(y));
    tick.setAttribute('x2', xOf(y));
    tick.setAttribute('y1', axisY - 4);
    tick.setAttribute('y2', axisY + 4);
    tick.setAttribute('stroke', '#3a4049');
    tick.setAttribute('stroke-width', '1');
    svg.appendChild(tick);

    const lbl = document.createElementNS(svgNS, 'text');
    lbl.setAttribute('x', xOf(y));
    lbl.setAttribute('y', axisY + 20);
    lbl.setAttribute('text-anchor', 'middle');
    lbl.setAttribute('fill', '#6b7480');
    lbl.setAttribute('font-size', '11');
    lbl.setAttribute('font-family', 'SFMono-Regular, Menlo, monospace');
    lbl.textContent = String(y);
    svg.appendChild(lbl);
  }

  // Hitos
  let active = null;

  events.forEach((e, idx) => {
    const g = document.createElementNS(svgNS, 'g');
    g.setAttribute('class', 'tl-event');
    g.setAttribute('tabindex', '0');
    g.setAttribute('cursor', 'pointer');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', `${e.year} — ${e.label}`);

    const x = xOf(e.year);
    // Alternamos arriba / abajo para evitar solapes de etiquetas
    const above = idx % 2 === 0;
    const labelY = above ? axisY - 38 : axisY + 50;
    const tickY1 = above ? axisY - 6 : axisY + 6;
    const tickY2 = above ? axisY - 26 : axisY + 26;

    const stem = document.createElementNS(svgNS, 'line');
    stem.setAttribute('x1', x);
    stem.setAttribute('x2', x);
    stem.setAttribute('y1', tickY1);
    stem.setAttribute('y2', tickY2);
    stem.setAttribute('stroke', '#5cb8ff');
    stem.setAttribute('stroke-width', '1.5');
    g.appendChild(stem);

    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('cx', x);
    dot.setAttribute('cy', axisY);
    dot.setAttribute('r', 6);
    dot.setAttribute('fill', '#1a1d21');
    dot.setAttribute('stroke', '#5cb8ff');
    dot.setAttribute('stroke-width', '2.5');
    g.appendChild(dot);

    const year = document.createElementNS(svgNS, 'text');
    year.setAttribute('x', x);
    year.setAttribute('y', labelY);
    year.setAttribute('text-anchor', 'middle');
    year.setAttribute('fill', '#5cb8ff');
    year.setAttribute('font-size', '12');
    year.setAttribute('font-family', 'SFMono-Regular, Menlo, monospace');
    year.setAttribute('font-weight', '600');
    year.textContent = e.year;
    g.appendChild(year);

    const name = document.createElementNS(svgNS, 'text');
    name.setAttribute('x', x);
    name.setAttribute('y', labelY + (above ? -14 : 14));
    name.setAttribute('text-anchor', 'middle');
    name.setAttribute('fill', '#d5d9de');
    name.setAttribute('font-size', '11');
    name.setAttribute('font-family', 'SFMono-Regular, Menlo, monospace');
    name.textContent = e.short;
    g.appendChild(name);

    const activate = () => {
      if (active) active.querySelector('circle').setAttribute('fill', '#1a1d21');
      dot.setAttribute('fill', '#5cb8ff');
      active = g;
      panel.innerHTML = `<h4>${e.year} — ${e.title}</h4><p>${e.body}</p>`;
    };

    g.addEventListener('click', activate);
    g.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); activate(); }
    });

    svg.appendChild(g);
  });

  stage.appendChild(svg);

  // Activa Cajal por defecto
  const first = svg.querySelectorAll('.tl-event')[1];
  if (first) first.dispatchEvent(new Event('click'));
})();
