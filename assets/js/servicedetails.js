$(function () {

  /* ══════════════════════════════════════
     REVIEW CAROUSEL + REVIEW VIDEO MODAL
  ══════════════════════════════════════ */
  (function () {
    const track    = document.getElementById('reviewTrack');
    const cards    = track ? track.querySelectorAll('.ss-review-card') : [];
    const dotsWrap = document.getElementById('reviewDots');
    const btnPrev  = document.getElementById('reviewPrev');
    const btnNext  = document.getElementById('reviewNext');
    const modal    = document.getElementById('videoModal');
    const iframe   = document.getElementById('modalIframe');
    const closeBtn = document.getElementById('modalClose');
    const backdrop = document.getElementById('modalBackdrop');

    if (!track || !cards.length) return;

    let current = 0;

    function getVisible() {
      if (window.innerWidth <= 580) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    }

    const total = cards.length;

    function buildDots() {
      dotsWrap.innerHTML = '';
      const pages = Math.ceil(total / getVisible());
      for (let i = 0; i < pages; i++) {
        const d = document.createElement('button');
        d.className = 'ss-reviews__dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Page ' + (i + 1));
        d.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(d);
      }
    }

    function goTo(page) {
      const vis   = getVisible();
      const pages = Math.ceil(total / vis);
      current     = Math.max(0, Math.min(page, pages - 1));

      const cardW  = cards[0].offsetWidth;
      const gap    = 24;
      const offset = current * vis * (cardW + gap);
      track.style.transform = `translateX(-${offset}px)`;

      dotsWrap.querySelectorAll('.ss-reviews__dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });

      btnPrev.disabled = current === 0;
      btnNext.disabled = current >= pages - 1;
    }

    btnPrev.addEventListener('click', () => goTo(current - 1));
    btnNext.addEventListener('click', () => goTo(current + 1));

    buildDots();
    goTo(0);
    window.addEventListener('resize', () => { buildDots(); goTo(0); });

    /* Touch / swipe */
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });

    /* Review modal open */
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const src = card.dataset.video + '?autoplay=1&rel=0';
        iframe.src = src;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    /* Review modal close */
    function closeReviewModal() {
      modal.classList.remove('open');
      iframe.src = '';
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeReviewModal);
    backdrop.addEventListener('click', closeReviewModal);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeReviewModal();
    });

  })();

  /* ══════════════════════════════════════
     TOUR VIDEO MODAL
  ══════════════════════════════════════ */
  (function () {
    const watchBtn = document.getElementById('watchTourBtn');
    const modal    = document.getElementById('tourModal');
    const backdrop = document.getElementById('tourBackdrop');
    const closeBtn = document.getElementById('tourClose');
    const iframe   = document.getElementById('tourIframe');

    if (!watchBtn || !modal) return;

    /* ── Replace YOUR_VIDEO_ID with your actual YouTube video ID ── */
    const VIDEO_URL = 'https://www.youtube.com/embed/YOUR_VIDEO_ID';

    function openModal() {
      iframe.src = VIDEO_URL + '?autoplay=1&rel=0';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('open');
      iframe.src = '';
      document.body.style.overflow = '';
    }

    watchBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

  })();


      const videoModal = document.getElementById('hddVideoModal');
        const videoFrame = document.getElementById('hddVideoFrame');

        const videoURL = "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1";

        videoModal.addEventListener('show.bs.modal', function () {
            videoFrame.src = videoURL;
        });

        videoModal.addEventListener('hidden.bs.modal', function () {
            videoFrame.src = "";
        });


  /* ══════════════════════════════════════
   HDD PROCESS VIDEO MODAL
══════════════════════════════════════ */
(function () {
  const playBtn  = document.getElementById('hddPlayBtn');
  const modal    = document.getElementById('hddModal');
  const backdrop = document.getElementById('hddBackdrop');
  const closeBtn = document.getElementById('hddModalClose');
  const iframe   = document.getElementById('hddIframe');

  if (!playBtn || !modal) return;

  /* ── Replace YOUR_VIDEO_ID with your actual YouTube video ID ── */
  const VIDEO_URL = 'https://www.youtube.com/embed/YOUR_VIDEO_ID';

  function openModal() {
    iframe.src = VIDEO_URL + '?autoplay=1&rel=0';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    iframe.src = '';
    document.body.style.overflow = '';
  }

  playBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
})();

});