$(function () {

    // Navbar Toggle
    const $hamburger = $('#hamburger');
    const $mobileMenu = $('#mobileMenu');

    $hamburger.click(function () {
        $hamburger.toggleClass('open');
        $mobileMenu.toggleClass('open');
    });

    $mobileMenu.find('a').click(function () {
        $hamburger.removeClass('open');
        $mobileMenu.removeClass('open');
    });

    // Swiper
    var swiper = new Swiper(".mySwiper", {
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
        
        // Only create dots if NOT on mobile (width > 600px)
        if (window.innerWidth > 600) {
            const visibleCards = getVisibleCards();
            const dotCount = $cards.length - visibleCards + 1;

            for (let i = 0; i < dotCount; i++) {
                const $dot = $('<button></button>').addClass('nav-dot');
                if (i === currentIndex) $dot.addClass('active');
                
                $dot.on('click', function() {
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
        
        $('.nav-dot').each(function(index) {
            $(this).toggleClass('active', index === currentIndex);
        });
    }

    // Auto-scroll every 4 seconds
    setInterval(() => {
        const visibleCards = getVisibleCards();
        if (currentIndex >= $cards.length - visibleCards) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateCarousel();
    }, 4000);

    // Initial setup for Testimonials
    createDots();
    

    
    // --- Process Section S-curve Connector ---
    function drawProcessConnectors() {
        const svg = document.getElementById('ptSvg');
        const container = document.getElementById('ptCards');
        if (!svg || !container) return;
        if (window.innerWidth <= 768) { svg.innerHTML = ''; return; }

        const ids = ['ptc1', 'ptc2', 'ptc3', 'ptc4', 'ptc5'];
        const cardsArr = ids.map(id => document.getElementById(id));
        const baseRect = container.getBoundingClientRect();
        const segColors = ['#8b7fd4', '#8b7fd4', '#6ec6b8', '#e8d87a'];

        const anchors = cardsArr.map((card, i) => {
            if(!card) return null;
            const r = card.getBoundingClientRect();
            const x = r.left - baseRect.left + r.width / 2;
            const isTop = i % 2 === 0;
            const y = isTop ? r.top - baseRect.top + r.height : r.top - baseRect.top;
            return { x, y, isTop };
        }).filter(a => a !== null);

        svg.innerHTML = '';

        for (let i = 0; i < anchors.length - 1; i++) {
            const a = anchors[i], b = anchors[i + 1];
            const color = segColors[i];
            const midY = (a.y + b.y) / 2;
            const r = 22;
            let d;
            if (a.isTop && !b.isTop) {
                d = `M ${a.x} ${a.y} L ${a.x} ${midY - r} Q ${a.x} ${midY} ${a.x + r} ${midY} L ${b.x - r} ${midY} Q ${b.x} ${midY} ${b.x} ${midY + r} L ${b.x} ${b.y}`;
            } else {
                d = `M ${a.x} ${a.y} L ${a.x} ${midY + r} Q ${a.x} ${midY} ${a.x + r} ${midY} L ${b.x - r} ${midY} Q ${b.x} ${midY} ${b.x} ${midY - r} L ${b.x} ${b.y}`;
            }
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', d);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', color);
            path.setAttribute('stroke-width', '4');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            svg.appendChild(path);

            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot.setAttribute('cx', (a.x + b.x) / 2);
            dot.setAttribute('cy', midY);
            dot.setAttribute('r', '9');
            dot.setAttribute('fill', color);
            dot.setAttribute('stroke', 'rgba(255,255,255,0.3)');
            dot.setAttribute('stroke-width', '2');
            svg.appendChild(dot);
        }

        // Arrow at end
        if(anchors.length > 0) {
            const last = anchors[anchors.length - 1];
            const arrowY = last.y - 24;
            const arrowX = last.x + 36;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            line.setAttribute('d', `M ${last.x} ${last.y} L ${last.x} ${arrowY} L ${arrowX} ${arrowY}`);
            line.setAttribute('fill', 'none');
            line.setAttribute('stroke', '#e8d87a');
            line.setAttribute('stroke-width', '4');
            line.setAttribute('stroke-linecap', 'round');
            line.setAttribute('stroke-linejoin', 'round');
            svg.appendChild(line);

            const endDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            endDot.setAttribute('cx', last.x + 14); endDot.setAttribute('cy', arrowY);
            endDot.setAttribute('r', '9'); endDot.setAttribute('fill', '#e8d87a');
            endDot.setAttribute('stroke', 'rgba(255,255,255,0.3)'); endDot.setAttribute('stroke-width', '2');
            svg.appendChild(endDot);

            const ah = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            ah.setAttribute('points', `${arrowX} ${arrowY - 7} ${arrowX + 14} ${arrowY} ${arrowX} ${arrowY + 7}`);
            ah.setAttribute('fill', '#e8d87a');
            svg.appendChild(ah);
        }
    }

    // Combined Resize/Load handler for both sections
    $(window).on('load resize', function() {
        // Update Testimonials
        const visibleCards = getVisibleCards();
        if (currentIndex > $cards.length - visibleCards) {
            currentIndex = 0;
        }
        createDots();
        updateCarousel();

        // Update Process S-curve
        drawProcessConnectors();
    });

});