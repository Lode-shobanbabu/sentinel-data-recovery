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

});