$(document).ready(() => {

    let url = 'https://testologia.site/checkout';
    new WOW({animateClass: 'animate__animated', offset: 200, mobile: false}).init();

    const swiperFruits = new Swiper('.fruits-slider', {
        loop: true,                         //loop
        direction: "vertical",              //slide direction
        navigation: {                       //navigation(arrows)
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        slidesPerView: 3,
    })

    const swiperReviews = new Swiper('.reviews-slider', {


        breakpoints: {
            320: {
                loop: true,
                navigation: {                       //navigation(arrows)
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                slidesPerView: 1,
                spaceBetween: false,
                slidesPerGroup: 1,
               // autoHeight: true,
            },
            1131: {
                loop: true,                         //loop
                //direction: "",              //slide direction
                navigation: {                       //navigation(arrows)
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                slidesPerView: 2,
                slidesPerGroup: 2,
                //slidesOffsetBefore: 30,
                //slidesOffsetAfter: 100,
                spaceBetween: 30,
                autoHeight: true,
                //width: 982
            }

        }

    })


    $(function () {
        $("#accordion").accordion({heightStyle: "content"});
    });

    'use strict'
    let productOfTheDayBlock = document.getElementsByClassName('product-day')[0];
    let whyWeBlock = document.getElementsByClassName('why-we')[0];
    let ourFruitsBlock = document.getElementsByClassName('our-fruits')[0];
    let howToOrderBlock = document.getElementsByClassName('how-to-order')[0];
    let reviewsBlock = document.getElementsByClassName('reviews')[0];
    let header = document.getElementById('header');
    let upBtn = $('.up-button');

    $(window).scroll(() => {
        if ($(window).scrollTop() > 100) {
            upBtn.show().addClass(' animation-up-button-in');
        } else {
            upBtn.removeClass(' animation-up-button-in').hide();
        }
    })

    function scrollInto(link, block) {
        $(link).click((e) => {
            e.preventDefault();
            block.scrollIntoView({behavior: "smooth", inline: "start"});
        })
    }

    $('.popup-order__form__tel').mask('+7 (999) 999-99-99');
    scrollInto(upBtn, header);
    scrollInto('#productOfTheDay', productOfTheDayBlock);
    scrollInto('#whyWe', whyWeBlock);
    scrollInto('.ourFruits', ourFruitsBlock);
    scrollInto('#howToOrder', howToOrderBlock);
    scrollInto('#reviews', reviewsBlock);

    let productDayImages = $('.product-day__content__product-w-slider__slider__img');
    let productDayMainImage = $('.product-day__content__product-w-slider__product > img');
    productDayImages.click((e) => {
        let imgSrc = $(e.target).attr('src');
        productDayMainImage.attr('src', imgSrc).css('width', '383px');
    })

    let ourFruitsNav = $('.our-fruits__products-tabs__nav > a');
    let ourFruitsCards = $('.our-fruits__products-tabs__cards__card');
    ourFruitsNav.click((e) => {
        ourFruitsNav.removeClass('active');
        $(e.target).addClass('active');
        if ($(e.target).text() === 'Самые редкие') {
            ourFruitsCards.css('display', 'flex');
            for (let i = 0; i < ourFruitsCards.length; i++) {
                if ((ourFruitsCards.eq(i).children('.our-fruits__products-tabs__cards__card__title').text() === 'Ананас, Таиланд') ||
                    ourFruitsCards.eq(i).children('.our-fruits__products-tabs__cards__card__title').text() === 'Кокос, ЮАР') {
                    ourFruitsCards.eq(i).css('display', 'none');
                }
            }

        } else if ($(e.target).text() === 'Акции') {
            ourFruitsCards.css('display', 'flex');
            for (let i = 0; i < ourFruitsCards.length; i++) {
                if ((ourFruitsCards.eq(i).children('.our-fruits__products-tabs__cards__card__title').text() !== 'Манго, Вьетнам')) {
                    ourFruitsCards.eq(i).css('display', 'none');
                }
            }

        } else if ($(e.target).text() === 'Новинки') {
            ourFruitsCards.css('display', 'flex');
            for (let i = 0; i < ourFruitsCards.length; i++) {
                if ((ourFruitsCards.eq(i).children('.our-fruits__products-tabs__cards__card__title').text() !== 'Питахайя, Таиланд')) {
                    ourFruitsCards.eq(i).css('display', 'none');
                }
            }

        } else {
            for (let i = 0; i < ourFruitsCards.length; i++) {
                ourFruitsCards.eq(i).css('display', 'flex');
            }
        }
    })

    let popupOrder = $('.popup-order');
    let popupExit = $('.popup-order__exit');
    let orderBtn = $('.order-btn');
    let orderInput = $('.popup-order__form input');
    let orderSubmit = $('.order-submit');
    let popupBlock = $('.popup-order > .bg');

    let burger = $('#burger');
    let menu = $('.header__menu');
    let menuItems = $('.header__menu > ul  > li');

    burger.click(() => {
        menu.addClass('open');
    })
    menuItems.click(() => {
        menu.removeClass('open');
    })


    orderSubmit.click((e) => {
        let hasError = false;
        e.preventDefault();
        for (let i = 0; i < orderInput.length; i++) {
            if (!orderInput.eq(i).val()) {
                orderInput.eq(i).next().css('display', 'flex');
                hasError = true;
            }
        }
        if (!hasError) {
            $.ajax({
                method: 'POST',
                url: url,
                data: {
                    name: orderInput.eq(0).val(),
                    phone: orderInput.eq(1).val()
                },
                success: function (msg) {
                    if (($(msg).prop('success')) === 1) {
                        popupBlock.children(':not(.popup-order__success, .popup-order__exit)').hide();
                        popupBlock.children('.popup-order__success').show();

                    } else {
                        alert("Возникла ошибка при оформлении заказа");
                    }


                }

            })
        }
    })
    orderInput.keydown((e) => {
        $(e.target).next().hide();
    });


    orderBtn.click(() => {
        popupOrder.css('display', 'flex');


    })
    popupExit.click(() => {
        popupOrder.hide();
    })


})


