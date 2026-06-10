/* js/graph.js — RPG parchment map, cottage core palette */

const RING_NODES = {
  experience: ['biotech-startup','lionstreet','braincorp','sdcounty','omcp','ibm'],
  project:    ['chainsense','sfic','ai-bias-project','computing-project','socalguess','env-impact'],
  writing:    ['accountability','rag-samd','nav-patent','bias-liability','protein-writing','computing-writing','ai-bias-reform'],
};

const RING_CONFIG = {
  experience: { ringIdx:0, shape:'squircle', label:'Experience' },
  project:    { ringIdx:1, shape:'circle',   label:'Projects'   },
  writing:    { ringIdx:2, shape:'diamond',  label:'Writing'    },
};

// All colours are warm ink/earth tones matching the cottage palette
const NODE_COLORS = {
  experience: '#4a6741', // moss green
  project:    '#6b4c2a', // bark brown
  writing:    '#3d5c35', // fern dark
};

const GRAPH_NODES = [
  // Experience
  { id:'biotech-startup',   label:'Biotech\nStartup',    sub:'Bay Area AI · RAG',           type:'experience', link:null },
  { id:'lionstreet',        label:'Lion\nStreet',        sub:'ML Product · Fintech',         type:'experience', link:null },
  { id:'braincorp',         label:'Brain Corp',          sub:'Robotics · Multi-agent',       type:'experience', link:null },
  { id:'sdcounty',          label:'SD County',           sub:'Policy & Operations',          type:'experience', link:null },
  { id:'omcp',              label:'UCSD OMCP',           sub:'PM · Triton Consulting',       type:'experience', link:null },
  { id:'ibm',               label:'IBM Watson',          sub:'Enterprise AI · 2026',         type:'experience', link:null },
  // Projects
  { id:'chainsense',        label:'ChainSense',          sub:'Blockchain Analytics',         type:'project',    link:'writing/chainsense-technical-report.html' },
  { id:'sfic',              label:'SFIC',                sub:'Options & Volatility',          type:'project',    link:null },
  { id:'ai-bias-project',   label:'AI Under\nthe Lens',  sub:'Bias, Ethics & Policy',        type:'project',    link:'https://wanhan05.github.io/CCE3_project3/', external:true },
  { id:'computing-project', label:'Computing\nInfra',    sub:'Accelerators & Optimization',  type:'project',    link:'writing/computing-infrastructure.html' },
  { id:'socalguess',        label:'SoCalGuessr',         sub:'Transfer Learning',            type:'project',    link:null },
  { id:'env-impact',        label:'Env. Impact',         sub:'Cloud Footprint',              type:'project',    link:null },
  // Writing
  { id:'accountability',    label:'Accountability\nGap', sub:'AI Handoffs & IP Law',         type:'writing',    link:'writing/ai-bias-ip-liability.html' },
  { id:'rag-samd',          label:'RAG &\nSaMD',         sub:'Regulatory Framework',         type:'writing',    link:null },
  { id:'nav-patent',        label:'Nav.\nPatents',       sub:'Robotics IP',                  type:'writing',    link:null },
  { id:'bias-liability',    label:'Bias &\nLiability',   sub:'Tort & Healthcare AI',         type:'writing',    link:'writing/ai-bias-ip-liability.html' },
  { id:'protein-writing',   label:'Protein\nEncoding',   sub:'AlphaFold & Sequences',        type:'writing',    link:'writing/computational-protein-encoding.html' },
  { id:'computing-writing', label:'Computing\n& Scale',  sub:'Accelerators & Scale',         type:'writing',    link:'writing/computing-infrastructure.html' },
  { id:'ai-bias-reform',    label:'Legal\nReform',       sub:'AI Bias Policy',               type:'writing',    link:'writing/ai-bias-legal-reform.html' },
];

const GRAPH_EDGES = [
  { source:'chainsense',        target:'computing-writing', label:'GPU optimization' },
  { source:'computing-project', target:'computing-writing', label:'project → writeup' },
  { source:'computing-project', target:'protein-writing',   label:'TPU cost' },
  { source:'computing-project', target:'env-impact',        label:'energy cost' },
  { source:'ai-bias-project',   target:'bias-liability',    label:'extends into law' },
  { source:'ai-bias-project',   target:'rag-samd',          label:'clinical AI' },
  { source:'socalguess',        target:'computing-writing', label:'transfer learning' },
  { source:'env-impact',        target:'bias-liability',    label:'ethics of scale' },
  { source:'sfic',              target:'chainsense',        label:'alpha signal' },
  { source:'lionstreet',        target:'chainsense',        label:'ML experience' },
  { source:'lionstreet',        target:'accountability',    label:'failed handoff' },
  { source:'braincorp',         target:'nav-patent',        label:'built → patent Qs' },
  { source:'braincorp',         target:'computing-project', label:'real-time systems' },
  { source:'biotech-startup',   target:'rag-samd',          label:'RAG in clinical' },
  { source:'biotech-startup',   target:'accountability',    label:'lawyers asked Qs' },
  { source:'ibm',               target:'accountability',    label:'enterprise AI' },
  { source:'ibm',               target:'computing-writing', label:'Watson infra' },
  { source:'sdcounty',          target:'rag-samd',          label:'gov AI' },
  { source:'omcp',              target:'accountability',    label:'client relationship' },
  { source:'accountability',    target:'rag-samd',          label:'SaMD liability' },
  { source:'accountability',    target:'nav-patent',        label:'IP at handoff' },
  { source:'accountability',    target:'bias-liability',    label:'tort framework' },
  { source:'bias-liability',    target:'ai-bias-reform',    label:'toward reform' },
  { source:'protein-writing',   target:'rag-samd',          label:'biomedical AI' },
  { source:'computing-writing', target:'env-impact',        label:'compute → env' },
];

const BASE_R = { project:24, writing:18, experience:20 };

function renderGraph() {}
function initGraph()   {}

function initHeroGraph() {
  const shell = document.querySelector('.hero-graph-shell');
  const svg   = document.getElementById('hero-graph');
  if (!svg || !shell) return;

  const W = shell.clientWidth;
  const H = shell.clientHeight || Math.min(W * 1.05, 680);
  svg.setAttribute('width', W);
  svg.setAttribute('height', H);
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  const cx = W / 2, cy = H / 2;
  const minDim = Math.min(cx, cy);
  const RADII  = [minDim * 0.87, minDim * 0.55, minDim * 0.23];

  const d3svg = d3.select(svg);

  /* ── Defs ─────────────────────────────────────────── */
  const defs = d3svg.append('defs');

  // Parchment grain filter
  const filt = defs.append('filter').attr('id','grain')
    .attr('x','-5%').attr('y','-5%').attr('width','110%').attr('height','110%');
  filt.append('feTurbulence')
    .attr('type','fractalNoise').attr('baseFrequency','0.9')
    .attr('numOctaves','4').attr('stitchTiles','stitch').attr('result','noise');
  filt.append('feColorMatrix').attr('type','saturate').attr('values','0').attr('in','noise').attr('result','gray');
  filt.append('feBlend').attr('in','SourceGraphic').attr('in2','gray').attr('mode','multiply').attr('result','blend');
  filt.append('feComposite').attr('in','blend').attr('in2','SourceGraphic').attr('operator','in');

  // Vignette
  const vig = defs.append('radialGradient').attr('id','vig')
    .attr('cx','50%').attr('cy','50%').attr('r','60%');
  vig.append('stop').attr('offset','55%').attr('stop-color','transparent');
  vig.append('stop').attr('offset','100%').attr('stop-color','rgba(107,76,42,0.22)');

  // Torn-edge clip
  defs.append('clipPath').attr('id','map-clip')
    .append('rect').attr('width',W).attr('height',H).attr('rx',14);

  // Arrow marker — ink style
  defs.append('marker').attr('id','ink-arrow')
    .attr('viewBox','0 0 10 10').attr('refX',28).attr('refY',5)
    .attr('markerWidth',5).attr('markerHeight',5).attr('orient','auto-start-reverse')
    .append('path').attr('d','M2 2L8 5L2 8').attr('fill','none')
    .attr('stroke','rgba(107,76,42,0.55)').attr('stroke-width',1.5).attr('stroke-linecap','round');

  /* ── Background ───────────────────────────────────── */
  const bg = d3svg.append('g').attr('clip-path','url(#map-clip)');

  // Aged parchment base
  bg.append('rect').attr('width',W).attr('height',H).attr('fill','#e8dfc8');

  // Subtle colour variation across the map (hand-painted feel)
  bg.append('ellipse')
    .attr('cx', W*0.3).attr('cy', H*0.35).attr('rx', W*0.45).attr('ry', H*0.35)
    .attr('fill','rgba(196,168,130,0.18)');
  bg.append('ellipse')
    .attr('cx', W*0.72).attr('cy', H*0.65).attr('rx', W*0.4).attr('ry', H*0.3)
    .attr('fill','rgba(139,170,126,0.1)');

  // Parchment grain
  bg.append('rect').attr('width',W).attr('height',H)
    .attr('fill','rgba(245,239,224,0.5)').attr('filter','url(#grain)');

  // Vignette
  bg.append('rect').attr('width',W).attr('height',H).attr('fill','url(#vig)');

  /* ── Map grid ─────────────────────────────────────── */
  const gridG = bg.append('g').attr('opacity',0.1);
  for (let x = 0; x < W; x += 45)
    gridG.append('line').attr('x1',x).attr('y1',0).attr('x2',x).attr('y2',H)
      .attr('stroke','#6b4c2a').attr('stroke-width',0.5);
  for (let y = 0; y < H; y += 45)
    gridG.append('line').attr('x1',0).attr('y1',y).attr('x2',W).attr('y2',y)
      .attr('stroke','#6b4c2a').attr('stroke-width',0.5);

  // Hand-drawn border
  bg.append('rect').attr('x',6).attr('y',6).attr('width',W-12).attr('height',H-12)
    .attr('fill','none').attr('stroke','rgba(107,76,42,0.35)').attr('stroke-width',1.5)
    .attr('rx',12).attr('stroke-dasharray','8 5');

  /* ── Compass rose ─────────────────────────────────── */
  const cr = d3svg.append('g').attr('transform',`translate(${W-52},52)`);
  cr.append('circle').attr('r',20).attr('fill','rgba(245,239,224,0.8)')
    .attr('stroke','rgba(107,76,42,0.4)').attr('stroke-width',1.2);
  // Tick marks
  for (let i=0; i<12; i++) {
    const a = i * Math.PI / 6;
    const r1 = i%3===0 ? 14 : 16, r2 = 20;
    cr.append('line')
      .attr('x1', Math.cos(a)*r1).attr('y1', Math.sin(a)*r1)
      .attr('x2', Math.cos(a)*r2).attr('y2', Math.sin(a)*r2)
      .attr('stroke','rgba(107,76,42,0.5)').attr('stroke-width', i%3===0 ? 1.2 : 0.7);
  }
  // Cardinal labels
  [['N',-Math.PI/2],['E',0],['S',Math.PI/2],['W',Math.PI]].forEach(([d,a]) => {
    cr.append('text').attr('x', Math.cos(a)*9).attr('y', Math.sin(a)*9+4)
      .attr('text-anchor','middle').attr('font-family','Playfair Display,Georgia,serif')
      .attr('font-size',8).attr('font-weight',600).attr('fill','#4a6741').text(d);
  });
  // N pointer
  cr.append('polygon').attr('points','0,-20 3,-8 -3,-8')
    .attr('fill','#4a6741').attr('opacity',0.8);
  cr.append('polygon').attr('points','0,20 3,8 -3,8')
    .attr('fill','rgba(107,76,42,0.5)').attr('opacity',0.8);

  /* ── Map title cartouche ──────────────────────────── */
  const cart = d3svg.append('g').attr('transform',`translate(52,${H-42})`);
  cart.append('rect').attr('x',-4).attr('y',-16).attr('width',110).attr('height',24)
    .attr('rx',4).attr('fill','rgba(245,239,224,0.85)')
    .attr('stroke','rgba(107,76,42,0.3)').attr('stroke-width',1);
  cart.append('text').attr('x',50).attr('y',2)
    .attr('text-anchor','middle').attr('font-family','Playfair Display,Georgia,serif')
    .attr('font-size',9).attr('font-style','italic').attr('fill','rgba(107,76,42,0.6)')
    .text('Wanhan · Knowledge Map');

  /* ── Compute positions ────────────────────────────── */
  const allNodes = [];
  const nodeById = {};

  Object.entries(RING_NODES).forEach(([type, ids]) => {
    const cfg = RING_CONFIG[type];
    const R   = RADII[cfg.ringIdx];
    const n   = ids.length;
    const offset = -Math.PI / 2;
    ids.forEach((id, i) => {
      const nd = GRAPH_NODES.find(x => x.id === id);
      if (!nd) return;
      const angle = offset + (2 * Math.PI * i) / n;
      const node  = { ...nd, type, shape: cfg.shape,
        nodeR: BASE_R[type] || 20, color: NODE_COLORS[type],
        x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
      allNodes.push(node);
      nodeById[id] = node;
    });
  });

  const resolvedEdges = GRAPH_EDGES
    .map(e => ({ ...e, source: nodeById[e.source], target: nodeById[e.target] }))
    .filter(e => e.source && e.target);

  /* ── Ring guides — terrain bands ─────────────────── */
  const ringG = d3svg.append('g');
  const ringStroke = ['#4a6741','#6b4c2a','#3d5c35'];
  const ringLabel  = ['Experience','Projects','Writing'];

  RADII.forEach((R, i) => {
    // Hatched terrain band
    if (i < RADII.length - 1) {
      ringG.append('circle').attr('cx',cx).attr('cy',cy).attr('r',R)
        .attr('fill','none')
        .attr('stroke', i===0 ? 'rgba(74,103,65,0.12)' : 'rgba(107,76,42,0.08)')
        .attr('stroke-width', RADII[i] - RADII[i+1]);
    }
    // Dashed ring border
    ringG.append('circle').attr('cx',cx).attr('cy',cy).attr('r',R)
      .attr('fill','none').attr('stroke', ringStroke[i])
      .attr('stroke-width',1.2).attr('stroke-dasharray','7 5')
      .attr('opacity',0.45);
    // Ring label at top-right of each ring
    const lx = cx + R * Math.cos(-Math.PI/6);
    const ly = cy + R * Math.sin(-Math.PI/6) - 10;
    ringG.append('text').attr('x',lx).attr('y',ly)
      .attr('text-anchor','middle')
      .attr('font-family','Playfair Display,Georgia,serif')
      .attr('font-size',8).attr('font-style','italic')
      .attr('fill', ringStroke[i]).attr('opacity',0.5)
      .text(ringLabel[i].toUpperCase());
  });

  /* ── Edges ────────────────────────────────────────── */
  const edgeG = d3svg.append('g');
  const edgeLabelG = d3svg.append('g');

  const edgeEls = edgeG.selectAll('path').data(resolvedEdges).join('path')
    .attr('fill','none')
    .attr('stroke','rgba(107,76,42,0.28)')
    .attr('stroke-width',1.2)
    .attr('stroke-dasharray','6 4')
    .attr('marker-end','url(#ink-arrow)')
    .attr('d', d => {
      const sx = d.source.x, sy = d.source.y;
      const tx = d.target.x, ty = d.target.y;
      const pull = 0.18;
      const cpx = (sx+tx)/2 + (cx-(sx+tx)/2)*pull;
      const cpy = (sy+ty)/2 + (cy-(sy+ty)/2)*pull;
      return `M${sx},${sy} Q${cpx},${cpy} ${tx},${ty}`;
    });

  const edgeLabelEls = edgeLabelG.selectAll('text').data(resolvedEdges).join('text')
    .attr('font-family','Crimson Pro,Georgia,serif')
    .attr('font-size',8).attr('font-style','italic')
    .attr('fill','rgba(107,76,42,0)')
    .attr('text-anchor','middle').attr('pointer-events','none')
    .text(d => d.label)
    .attr('x', d => (d.source.x+d.target.x)/2)
    .attr('y', d => (d.source.y+d.target.y)/2 - 5);

  /* ── Nodes ────────────────────────────────────────── */
  const nodeG  = d3svg.append('g');
  const nodeEls = nodeG.selectAll('g').data(allNodes).join('g')
    .attr('transform', d => `translate(${d.x},${d.y})`)
    .style('cursor', d => d.link ? 'pointer' : 'default')
    .on('click', (ev, d) => {
      if (!d.link) return;
      ev.stopPropagation();
      if (d.external) window.open(d.link,'_blank');
      else window.location.href = d.link;
    })
    .on('mouseenter', (ev, d) => highlightNode(d, ev))
    .on('mousemove',  (ev, d) => showTip(ev, d))
    .on('mouseleave', () => resetHighlight());

  // Draw map-marker shapes
  nodeEls.each(function(d) {
    const el  = d3.select(this);
    const r   = d.nodeR;
    const col = d.color;
    const shape = RING_CONFIG[d.type]?.shape || 'circle';

    // Soft drop shadow
    el.append('circle').attr('r', r+7).attr('cx',1.5).attr('cy',2)
      .attr('fill','rgba(107,76,42,0.1)');

    if (shape === 'circle') {
      // Location pin circle
      el.append('circle').attr('r',r)
        .attr('fill','#f5efe0').attr('stroke',col).attr('stroke-width',2);
      // Inner filled dot
      el.append('circle').attr('r',r*0.38).attr('fill',col).attr('opacity',0.85);
      // Tiny cross hair
      el.append('line').attr('x1',-r*0.55).attr('y1',0).attr('x2',r*0.55).attr('y2',0)
        .attr('stroke',col).attr('stroke-width',0.8).attr('opacity',0.35);
      el.append('line').attr('x1',0).attr('y1',-r*0.55).attr('x2',0).attr('y2',r*0.55)
        .attr('stroke',col).attr('stroke-width',0.8).attr('opacity',0.35);

    } else if (shape === 'diamond') {
      const s = r * 1.38;
      el.append('rect').attr('x',-s/2).attr('y',-s/2).attr('width',s).attr('height',s)
        .attr('rx',3).attr('transform','rotate(45)')
        .attr('fill','#f5efe0').attr('stroke',col).attr('stroke-width',2);
      // Inner diamond
      el.append('rect').attr('x',-s*0.22).attr('y',-s*0.22)
        .attr('width',s*0.44).attr('height',s*0.44)
        .attr('rx',2).attr('transform','rotate(45)')
        .attr('fill',col).attr('opacity',0.75);

    } else { // squircle — experience
      const s = r * 1.6;
      el.append('rect').attr('x',-s/2).attr('y',-s/2).attr('width',s).attr('height',s)
        .attr('rx',8).attr('fill','#f5efe0').attr('stroke',col).attr('stroke-width',2);
      el.append('rect').attr('x',-s*0.22).attr('y',-s*0.22)
        .attr('width',s*0.44).attr('height',s*0.44)
        .attr('rx',5).attr('fill',col).attr('opacity',0.75);
    }
  });

  // Labels — name banner below node
  nodeEls.each(function(d) {
    const el    = d3.select(this);
    const r     = d.nodeR;
    const col   = d.color;
    const lines = d.label.split('\n');
    const lh    = 10;
    const fs    = Math.min(9, r * 0.38);
    const bw    = Math.max(...lines.map(l => l.length * fs * 0.62)) + 14;
    const bh    = lines.length * lh + 6;
    const by    = r + 5;

    // Banner background
    el.append('rect').attr('x',-bw/2).attr('y',by).attr('width',bw).attr('height',bh)
      .attr('rx',4).attr('fill','rgba(245,239,224,0.92)')
      .attr('stroke', col+'66').attr('stroke-width',0.8);

    const text = el.append('text').attr('text-anchor','middle').attr('fill',col)
      .attr('font-family','Playfair Display,Georgia,serif')
      .attr('font-weight','600').attr('pointer-events','none');

    lines.forEach((line, i) => {
      text.append('tspan').attr('x',0)
        .attr('dy', i===0 ? by + lh + 1 : lh)
        .attr('font-size', fs).text(line);
    });
  });

  /* ── Interaction helpers ──────────────────────────── */
  function highlightNode(d, ev) {
    const connected = new Set(
      resolvedEdges.filter(e => e.source.id===d.id||e.target.id===d.id)
        .flatMap(e => [e.source.id,e.target.id])
    );
    connected.add(d.id);
    edgeEls
      .attr('stroke', e => e.source.id===d.id||e.target.id===d.id
        ? d.color : 'rgba(107,76,42,0.05)')
      .attr('stroke-width', e => e.source.id===d.id||e.target.id===d.id ? 2 : 0.5)
      .attr('stroke-dasharray', e => e.source.id===d.id||e.target.id===d.id ? 'none':'6 4')
      .attr('opacity', e => e.source.id===d.id||e.target.id===d.id ? 1 : 0.3);
    edgeLabelEls.attr('fill', e => e.source.id===d.id||e.target.id===d.id
      ? 'rgba(107,76,42,0.7)' : 'rgba(107,76,42,0)');
    nodeEls.style('opacity', n => connected.has(n.id) ? 1 : 0.15);
    const c = resolvedEdges.filter(e=>e.source.id===d.id||e.target.id===d.id).length;
    showTip(ev, d, c);
  }

  function resetHighlight() {
    edgeEls.attr('stroke','rgba(107,76,42,0.28)').attr('stroke-width',1.2)
      .attr('stroke-dasharray','6 4').attr('opacity',1);
    edgeLabelEls.attr('fill','rgba(107,76,42,0)');
    nodeEls.style('opacity',1);
    hideTip();
  }

  /* ── Tooltip ─────────────────────────────────────── */
  let tipEl = document.getElementById('graph-tooltip');
  if (!tipEl) {
    tipEl = document.createElement('div');
    tipEl.id = 'graph-tooltip';
    Object.assign(tipEl.style, {
      position:'fixed', pointerEvents:'none', opacity:'0',
      background:'#f5efe0', border:'1.5px solid rgba(107,76,42,0.4)',
      borderRadius:'12px', padding:'10px 14px',
      fontFamily:'Nunito,sans-serif', fontSize:'11px',
      maxWidth:'200px', zIndex:'9999',
      boxShadow:'3px 3px 0 rgba(196,168,130,0.6)',
      transition:'opacity 0.1s',
    });
    document.body.appendChild(tipEl);
  }

  function showTip(ev, d, connections) {
    const c = connections ?? resolvedEdges.filter(e=>e.source.id===d.id||e.target.id===d.id).length;
    tipEl.style.opacity = '1';
    tipEl.style.left = (ev.clientX+16)+'px';
    tipEl.style.top  = (ev.clientY-12)+'px';
    tipEl.innerHTML = `
      <div style="color:${d.color};font-weight:700;margin-bottom:3px;font-family:'Playfair Display',serif;font-style:italic">${d.label.replace('\n',' ')}</div>
      <div style="color:#5c4e38;font-size:10px;line-height:1.5;margin-bottom:4px;font-family:'Crimson Pro',serif;font-style:italic">${d.sub}</div>
      <div style="color:#8c7a5e;font-size:9px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700">${RING_CONFIG[d.type]?.label||d.type} · ${c} connection${c!==1?'s':''}</div>
      ${d.link?`<div style="color:${d.color};font-size:9px;margin-top:5px">click to open →</div>`:''}`;
  }
  function hideTip() { tipEl.style.opacity = '0'; }

  /* ── Touch double-tap ─────────────────────────────── */
  let lastId = null, lastT = 0;
  nodeEls.on('touchend', (ev, d) => {
    ev.preventDefault();
    const now = Date.now();
    if (lastId===d.id && now-lastT < 400) {
      lastId=null; lastT=0; hideTip(); resetHighlight();
      if (d.link) { if(d.external) window.open(d.link,'_blank'); else window.location.href=d.link; }
    } else {
      resetHighlight();
      const touch = ev.changedTouches[0];
      highlightNode(d, {clientX:touch.clientX, clientY:touch.clientY});
      lastId=d.id; lastT=now;
    }
  });

  /* ── Resize ───────────────────────────────────────── */
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      d3svg.selectAll('*').remove();
      const nW = shell.clientWidth;
      const nH = shell.clientHeight || Math.min(nW*1.05, 680);
      svg.setAttribute('width',nW); svg.setAttribute('height',nH);
      svg.setAttribute('viewBox',`0 0 ${nW} ${nH}`);
      initHeroGraph();
    }, 200);
  });
}
