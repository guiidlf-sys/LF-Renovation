document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Header scroll state ---------- */
  const header = document.querySelector('.site-header');
  const backToTop = document.getElementById('back-to-top');

  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle && header) {
    navToggle.addEventListener('click', () => {
      header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(header.classList.contains('nav-open')));
    });

    document.querySelectorAll('.main-nav > a').forEach((link) => {
      link.addEventListener('click', () => header.classList.remove('nav-open'));
    });

    document.querySelectorAll('.nav-dropdown > a').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          trigger.parentElement.classList.toggle('open');
        }
      });
    });
  }

  /* ---------- Active nav link ---------- */
  const currentPage = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.main-nav a[href]').forEach((link) => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage) link.classList.add('active');
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------- Gallery filters ---------- */
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

  /* ---------- Generic form submit → success message ---------- */
  document.querySelectorAll('form[data-success-form]').forEach((form) => {
    const successBox = document.querySelector(form.dataset.successForm);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (successBox) {
        successBox.classList.add('visible');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
      document.querySelectorAll('.file-list').forEach((el) => { el.textContent = ''; });
    });
  });

  /* ---------- File drop preview (Demande de chantier) ---------- */
  document.querySelectorAll('.file-drop input[type="file"]').forEach((input) => {
    const list = input.closest('.file-drop').querySelector('.file-list');
    input.addEventListener('change', () => {
      if (!list) return;
      list.textContent = input.files.length
        ? `${input.files.length} fichier(s) sélectionné(s) : ${[...input.files].map((f) => f.name).join(', ')}`
        : '';
    });
  });

  /* ---------- Back to top ---------- */
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
