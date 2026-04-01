$(function () {
    // --- Navbar Toggle ---
    const $hamburger = $('#hamburger');
    const $mobileMenu = $('#mobileMenu');

    $hamburger.on('click', function () {
        $hamburger.toggleClass('open');
        $mobileMenu.toggleClass('open');
    });

    $mobileMenu.find('a').on('click', function () {
        $hamburger.removeClass('open');
        $mobileMenu.removeClass('open');
    });

    // --- Swiper ---
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 }
        }
    });

    // --- Testimonial Carousel Logic ---
    const $track = $('#testimonial-track');
    const $dotsContainer = $('#dots-container');
    const $cards = $('.testimonial-card');
    let currentIndex = 0;

    function getVisibleCards() {
        if (window.innerWidth > 992) return 3;
        if (window.innerWidth > 600) return 2;
        return 1;
    }

    function createDots() {
        if (!$dotsContainer.length) return;
        $dotsContainer.empty();

        if (window.innerWidth > 600) {
            const visibleCards = getVisibleCards();
            const dotCount = Math.max(0, $cards.length - visibleCards + 1);

            for (let i = 0; i < dotCount; i++) {
                const $dot = $('<button></button>').addClass('nav-dot');
                if (i === currentIndex) $dot.addClass('active');

                $dot.on('click', function () {
                    currentIndex = i;
                    updateCarousel();
                });
                $dotsContainer.append($dot);
            }
        }
    }

    function updateCarousel() {
        if (!$track.length || $cards.length === 0) return;
        const gap = 24;
        const cardWidth = $cards.first().outerWidth() + gap;
        $track.css('transform', `translateX(-${currentIndex * cardWidth}px)`);

        $('.nav-dot').each(function (index) {
            $(this).toggleClass('active', index === currentIndex);
        });
    }

    // Auto-scroll every 4 seconds
    const scrollInterval = setInterval(() => {
        const visibleCards = getVisibleCards();
        if (currentIndex >= $cards.length - visibleCards) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateCarousel();
    }, 4000);

    // --- Process S-Curve Logic ---
    function drawProcessConnectors() {
        const svg = document.getElementById('svg-conn');
        const card = document.getElementById('tlcard');
        const grid = document.getElementById('grid');

        if (!svg || !card || !grid) return;

        const cardR = card.getBoundingClientRect();
        svg.innerHTML = '';

        if (window.innerWidth <= 900) return;

        function iconCenter(stepId) {
            const step = document.getElementById(stepId);
            if (!step) return { x: 0, y: 0, top: 0, bot: 0 };
            const icon = step.querySelector('.icon-box');
            const r = icon.getBoundingClientRect();
            return {
                x: r.left - cardR.left + r.width / 2,
                y: r.top - cardR.top + r.height / 2,
                top: r.top - cardR.top,
                bot: r.top - cardR.top + r.height
            };
        }

        const p = {
            s1: iconCenter('s1'), s2: iconCenter('s2'),
            s3: iconCenter('s3'), s4: iconCenter('s4'),
            s5: iconCenter('s5'), s6: iconCenter('s6')
        };

        const sw = 2.5; 
        const r = 30;   
        const col = '#1a1a1a';
        let pathHtml = '';

        // Vertical Lines
        pathHtml += `<line x1="${p.s1.x}" y1="${p.s1.bot}" x2="${p.s2.x}" y2="${p.s2.top}" stroke="${col}" stroke-width="${sw}"/>`;
        pathHtml += `<line x1="${p.s4.x}" y1="${p.s4.bot}" x2="${p.s3.x}" y2="${p.s3.top}" stroke="${col}" stroke-width="${sw}"/>`;
        pathHtml += `<line x1="${p.s5.x}" y1="${p.s5.bot}" x2="${p.s6.x}" y2="${p.s6.top}" stroke="${col}" stroke-width="${sw}"/>`;

        // Bridges
        const bridgeTopY = Math.min(p.s4.top, p.s5.top) - 50;
        const bridgeBotY = Math.max(p.s2.bot, p.s3.bot) + 50;

        pathHtml += `<path d="M ${p.s4.x} ${p.s4.top} L ${p.s4.x} ${bridgeTopY + r} Q ${p.s4.x} ${bridgeTopY} ${p.s4.x + r} ${bridgeTopY} L ${p.s5.x - r} ${bridgeTopY} Q ${p.s5.x} ${bridgeTopY} ${p.s5.x} ${bridgeTopY + r} L ${p.s5.x} ${p.s5.top}" fill="none" stroke="${col}" stroke-width="${sw}"/>`;
        pathHtml += `<path d="M ${p.s2.x} ${p.s2.bot} L ${p.s2.x} ${bridgeBotY - r} Q ${p.s2.x} ${bridgeBotY} ${p.s2.x + r} ${bridgeBotY} L ${p.s3.x - r} ${bridgeBotY} Q ${p.s3.x} ${bridgeBotY} ${p.s3.x} ${bridgeBotY - r} L ${p.s3.x} ${p.s3.bot}" fill="none" stroke="${col}" stroke-width="${sw}"/>`;

        svg.innerHTML = pathHtml;
    }

    // --- Unified Initialization & Event Listeners ---
    function initAll() {
        const visibleCards = getVisibleCards();
        if (currentIndex > $cards.length - visibleCards) currentIndex = 0;
        
        createDots();
        updateCarousel();
        drawProcessConnectors();
    }

    // Run on Load and Resize
    $(window).on('load resize', initAll);

    // Watch for internal layout shifts
    if (window.ResizeObserver) {
        const ro = new ResizeObserver(() => {
            // Use requestAnimationFrame to avoid "ResizeObserver loop limit exceeded"
            window.requestAnimationFrame(drawProcessConnectors);
        });
        const gridEl = document.getElementById('grid');
        if (gridEl) ro.observe(gridEl);
    }
    
    // Initial Trigger
    initAll();
});