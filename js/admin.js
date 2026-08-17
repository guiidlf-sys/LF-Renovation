document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     Navigation: sidebar + pill tabs both drive the same
     "page" switcher (data-page attribute on .page sections).
     ========================================================= */
  const pages = document.querySelectorAll('.page');
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a[data-page]');
  const pillTabs = document.querySelectorAll('.pill-tab[data-page]');

  function goToPage(pageId) {
    pages.forEach((p) => p.classList.toggle('active', p.dataset.page === pageId));
    sidebarLinks.forEach((l) => l.classList.toggle('active', l.dataset.page === pageId));
    pillTabs.forEach((t) => t.classList.toggle('active', t.dataset.page === pageId));
    window.scrollTo(0, 0);
    closeMobileSidebar();
  }

  [...sidebarLinks, ...pillTabs].forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      goToPage(el.dataset.page);
    });
  });

  document.querySelectorAll('[data-goto]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      goToPage(el.dataset.goto);
    });
  });

  /* =========================================================
     Mobile sidebar drawer
     ========================================================= */
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebarBackdrop = document.querySelector('.sidebar-backdrop');

  function closeMobileSidebar() {
    sidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('open');
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.add('open');
      sidebarBackdrop.classList.add('open');
    });
  }
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeMobileSidebar);

  /* =========================================================
     Generic dropdown handling (notifications, period select)
     ========================================================= */
  function setupDropdown(triggerSel, panelSel) {
    const trigger = document.querySelector(triggerSel);
    const panel = document.querySelector(panelSel);
    if (!trigger || !panel) return;
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('open');
    });
    panel.addEventListener('click', (e) => e.stopPropagation());
  }

  setupDropdown('#notif-btn', '#notif-panel');
  setupDropdown('#period-btn', '#period-menu');

  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-panel.open, .period-menu.open').forEach((p) => p.classList.remove('open'));
  });

  /* Period menu updates the revenue stat value */
  const revenueByPeriod = { '1m': '2 450,75 €', '6m': '12 304,11 €', '1a': '28 950,40 €' };
  document.querySelectorAll('#period-menu button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.getElementById('period-label').textContent = btn.dataset.label;
      document.getElementById('revenue-value').textContent = revenueByPeriod[btn.dataset.period];
      document.getElementById('period-menu').classList.remove('open');
    });
  });

  /* =========================================================
     Devis list filter pills (Récents / Acceptés / En attente)
     ========================================================= */
  document.querySelectorAll('.devis-filters').forEach((group) => {
    const rows = document.querySelectorAll(group.dataset.target);
    group.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        rows.forEach((row) => {
          const match = filter === 'all' || row.dataset.status === filter;
          row.style.display = match ? '' : 'none';
        });
      });
    });
  });

  /* =========================================================
     Gallery filter (Tous / Intérieur / Extérieur)
     ========================================================= */
  const galleryCards = document.querySelectorAll('.gallery-card');
  document.querySelectorAll('.gallery-filters button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gallery-filters button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  /* =========================================================
     Devis form
     ========================================================= */
  const form = document.getElementById('devis-form');
  const successBox = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      successBox.classList.add('visible');
      form.reset();
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* =========================================================
     Assistant search bar (simple keyword matcher, no backend)
     ========================================================= */
  const faq = [
    { kw: ['devis', 'prix', 'tarif', 'combien', 'coût', 'cout'], page: 'devis', answer: 'Le devis est gratuit et sans engagement, réponse sous 48h. Je vous ouvre la page Devis.' },
    { kw: ['terrasse', 'jardin', 'clôture', 'cloture', 'façade', 'facade', 'toiture', 'extérieur', 'exterieur'], page: 'services', answer: 'Vous trouverez tous les services extérieurs (terrasse, façade, toiture, clôtures) sur la page Services.' },
    { kw: ['peinture', 'sol', 'carrelage', 'salle de bain', 'cuisine', 'intérieur', 'interieur'], page: 'services', answer: 'Peinture, sols, salle de bain, cuisine... tous les services intérieurs sont listés sur la page Services.' },
    { kw: ['photo', 'réalisation', 'realisation', 'chantier', 'avant', 'après', 'apres'], page: 'realisations', answer: "Direction la page Réalisations pour voir les derniers chantiers." },
    { kw: ['avis', 'client', 'témoignage', 'temoignage'], page: 'avis', answer: "Voici ce qu'en pensent mes clients." },
    { kw: ['contact', 'téléphone', 'telephone', 'appel', 'email', 'mail'], page: 'devis', answer: 'Mes coordonnées sont sur la page Devis, juste à droite du formulaire.' },
  ];

  const assistantForm = document.getElementById('assistant-form');
  const assistantInput = document.getElementById('assistant-input');
  const assistantAnswer = document.getElementById('assistant-answer');

  if (assistantForm) {
    assistantForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = assistantInput.value.trim().toLowerCase();
      if (!q) return;
      const match = faq.find((f) => f.kw.some((k) => q.includes(k)));
      if (match) {
        assistantAnswer.innerHTML = match.answer + ' <a href="#" data-goto="' + match.page + '">Ouvrir →</a>';
      } else {
        assistantAnswer.innerHTML = "Je transmets votre question, je vous réponds sous 48h. Pour aller plus vite, passez par la page <a href=\"#\" data-goto=\"devis\">Devis</a>.";
      }
      assistantAnswer.classList.add('visible');
      assistantAnswer.querySelectorAll('[data-goto]').forEach((el) => {
        el.addEventListener('click', (ev) => {
          ev.preventDefault();
          goToPage(el.dataset.goto);
        });
      });
    });
  }

  /* =========================================================
     Revenue chart (hand-built SVG line chart + tooltip)
     ========================================================= */
  const chartSvg = document.getElementById('revenue-chart');
  const chartTooltip = document.getElementById('chart-tooltip');
  const chartMonths = document.getElementById('chart-months');
  const rangePills = document.querySelectorAll('.range-pills button');

  const datasets = {
    '1s': {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      values: [900, 1200, 1100, 1400, 1300, 1650, 1800],
      maxY: 2000,
      defaultIndex: 5,
    },
    '1m': {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      values: [5200, 6100, 5800, 7800],
      maxY: 8000,
      defaultIndex: 2,
    },
    '6m': {
      labels: ['Jul', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
      values: [4600, 5800, 6400, 7100, 6600, 7800],
      maxY: 8000,
      defaultIndex: 4,
    },
    '1a': {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
      values: [6200, 5400, 4700, 5100, 4300, 3250, 4600, 5800, 6400, 7100, 6600, 7800],
      maxY: 8000,
      defaultIndex: 5,
    },
  };

  const W = 800;
  const H = 220;
  const PAD = 14;

  function pointsFor(values, maxY) {
    const n = values.length;
    return values.map((v, i) => {
      const x = n === 1 ? W / 2 : (i / (n - 1)) * (W - PAD * 2) + PAD;
      const y = H - PAD - (v / maxY) * (H - PAD * 2);
      return { x, y, v };
    });
  }

  function smoothPath(points) {
    if (points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const mx = (p0.x + p1.x) / 2;
      d += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  }

  let currentRange = '1a';
  let currentPoints = [];

  function renderChart(range) {
    currentRange = range;
    const ds = datasets[range];
    currentPoints = pointsFor(ds.values, ds.maxY);
    const pathD = smoothPath(currentPoints);

    const gridLines = [0, 0.25, 0.5, 0.75, 1].map((f) => {
      const y = PAD + f * (H - PAD * 2);
      return `<line x1="${PAD}" y1="${y}" x2="${W - PAD}" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
    }).join('');

    chartSvg.innerHTML = `
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#b48ee0"/>
          <stop offset="100%" stop-color="#f0a8cf"/>
        </linearGradient>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f0a8cf" stop-opacity="0.22"/>
          <stop offset="100%" stop-color="#f0a8cf" stop-opacity="0"/>
        </linearGradient>
      </defs>
      ${gridLines}
      <path d="${pathD} L ${currentPoints[currentPoints.length - 1].x} ${H - PAD} L ${currentPoints[0].x} ${H - PAD} Z" fill="url(#areaGrad)" stroke="none"/>
      <path d="${pathD}" fill="none" stroke="url(#lineGrad)" stroke-width="3" stroke-linecap="round"/>
      <g id="chart-hover-layer"></g>
    `;

    chartMonths.innerHTML = ds.labels.map((l) => `<span>${l}</span>`).join('');

    showTooltipAt(ds.defaultIndex);
  }

  function showTooltipAt(index) {
    const ds = datasets[currentRange];
    const pt = currentPoints[index];
    if (!pt) return;

    const hoverLayer = document.getElementById('chart-hover-layer');
    hoverLayer.innerHTML = `
      <line x1="${pt.x}" y1="${pt.y}" x2="${pt.x}" y2="${H - PAD}" stroke="rgba(240,168,207,0.4)" stroke-width="1" stroke-dasharray="3 4"/>
      <circle cx="${pt.x}" cy="${pt.y}" r="5" fill="#f0a8cf" stroke="#150e1b" stroke-width="2"/>
    `;

    const prevVal = index > 0 ? ds.values[index - 1] : ds.values[index];
    const pct = prevVal ? (((ds.values[index] - prevVal) / prevVal) * 100).toFixed(1) : '0.0';
    const isPositive = pct >= 0;
    const pctSign = isPositive ? '+' : '';

    chartTooltip.style.left = (pt.x / W) * 100 + '%';
    chartTooltip.style.top = (pt.y / H) * 100 + '%';
    chartTooltip.innerHTML = `
      <div class="d">${ds.labels[index]} ${currentRange === '1a' || currentRange === '6m' ? '2025' : ''}</div>
      <div class="v">${ds.values[index].toLocaleString('fr-FR')} €</div>
      <div class="g${isPositive ? '' : ' negative'}">${pctSign}${pct}%</div>
    `;
    chartTooltip.classList.add('visible');
  }

  if (chartSvg) {
    chartSvg.addEventListener('mousemove', (e) => {
      const rect = chartSvg.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / rect.width) * W;
      let nearest = 0;
      let minDist = Infinity;
      currentPoints.forEach((p, i) => {
        const dist = Math.abs(p.x - relX);
        if (dist < minDist) { minDist = dist; nearest = i; }
      });
      showTooltipAt(nearest);
    });

    chartSvg.addEventListener('mouseleave', () => {
      showTooltipAt(datasets[currentRange].defaultIndex);
    });

    rangePills.forEach((btn) => {
      btn.addEventListener('click', () => {
        rangePills.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderChart(btn.dataset.range);
      });
    });

    renderChart('1a');
  }
});
