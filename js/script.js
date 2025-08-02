document.addEventListener("DOMContentLoaded", function () {
    // menu
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.promo-menu');
    const menuLink = document.querySelectorAll('.promo-menu__link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('promo-menu_active');
    });

    menuLink.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('hamburger_active');
            menu.classList.remove('promo-menu_active')
        });
    });

    // accordion
    const colls = document.querySelectorAll('.program__btn');
    const items = document.querySelectorAll('.program__item');
    const titles = document.querySelectorAll('.program__title');

    colls.forEach((btn, i) => {
        btn.addEventListener('click', function () {
            this.classList.toggle('program__btn_active');
            let content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.paddingTop = 0;
                content.style.marginBottom = 0;
                items[i].style.cssText = 'background-color: #ffffff; border-radius: none; padding-top: 0;';
                if (i > 0) {
                    items[i - 1].style.borderBottom = '';
                }
                titles[i].style.cssText = '';
            } else {
                content.style.maxHeight = content.scrollHeight + 20 + 'px';
                content.style.paddingTop = 20 + 'px';
                content.style.marginBottom = 20 + 'px';
                items[i].style.cssText = 'background-color: #e6eff7; border-radius: 33px; padding-top: 20px';
                if (i > 0) {
                    items[i - 1].style.borderBottom = 'none';
                }

                titles[i].style.cssText = 'color: #1187ca; font-weight: 700; padding-bottom: 10px; border-bottom: 2px solid #ffffff;';
            }
        });
    });

    // slider
    const slider = document.querySelector('.carousel__slider');
    const images = document.querySelectorAll('.carousel__slider-line img');
    const sliderLine = document.querySelector('.carousel__slider-line');
    let count = 0;
    let width;

    function init() {
        console.log('resize');
        width = document.querySelector('.carousel__slider').offsetWidth;
        console.log(width);
        sliderLine.style.maxWidth = (width - 88) * images.length + 'px';
        images.forEach(item => {
            item.style.maxWidth = width + 'px';
            item.style.height = 'auto';
        });
        rollSlider();
    }

    init();
    window.addEventListener('resize', init);

    document.querySelector('.carousel__next').addEventListener('click', () => {
        count++;
        if (count >= images.length) {
            count = 0;
        }
        rollSlider();
    });

    document.querySelector('.carousel__prev').addEventListener('click', function () {
        count--;
        if (count < 0) {
            count = images.length - 1;
        }
        rollSlider();
    });

    function rollSlider() {
        sliderLine.style.transform = `translate(-${count * width}px)`;

    }

    let startX = 0;
    let endX = 0;

    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
    }

    function handleTouchMove(e) {
        endX = e.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (window.innerWidth > 815) return; // свайп работает только на мобильных

        const distance = endX - startX;

        const threshold = 50;

        if (distance > threshold) {
            count--;
            if (count < 0) count = images.length - 1;
            rollSlider();
        } else if (distance < -threshold) {
            count++;
            if (count >= images.length) count = 0;
            rollSlider();
        }

        startX = 0;
        endX = 0;
    }

    slider.addEventListener('touchstart', handleTouchStart, false);
    slider.addEventListener('touchmove', handleTouchMove, false);
    slider.addEventListener('touchend', handleTouchEnd, false);
    // Слежение за скроллом
    const pageUp = document.querySelector(".pageup");
    window.addEventListener("scroll", function () {
        if (window.scrollY >= 1200) {
            pageUp.style.display = "block";
        } else {
            pageUp.style.display = "none";
        }
    });

    // Плавная прокрутка вверх при клике
    pageUp.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    const menuLinks = document.querySelectorAll('a[href^="#"]');

    menuLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            // Отключаем стандартное поведение перехода по ссылке
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

});

