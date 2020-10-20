$(document).ready(function() {

    //Main page
    var mainSlider = $('.slider__wrapper');
    var firstSlide = mainSlider.find('.slide').find("[data-animation-in]");

    mainSlider.owlCarousel({
        loop: true,
        margin: 40,
        autoplay: false,
        smartSpeed: 2000,
        slideBy: 1,
        nav: true,
        navText: ['<button class="slider__control slider__control--prev button">&#x25c0;&#xfe0e;</button>', '<button class="slider__control slider__control--next button">&#x25b6;&#xfe0e;</button>'],
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            1199: {
                items: 1,
                dots: false
            }
        }
    });

    function setAnimation(_elem, _InOut) {
        var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        _elem.each(function() {
            var $elem = $(this);
            var $animationType = 'animated ' + $elem.data('animation-' + _InOut);
            $elem.removeClass($animationType);

            $elem.addClass($animationType).one(animationEndEvent, function() {
                $elem.removeClass($animationType);
            });
        });
    };
    setAnimation(firstSlide, 'in');

    mainSlider.on('change.owl.carousel', function(event) {
        var $currentItem = $('.owl-item', mainSlider).eq(event.item.index);
        var $elemsToanim = $currentItem.find("[data-animation-out]");
        setAnimation($elemsToanim, 'out');
    });

    mainSlider.on('changed.owl.carousel', function(event) {
        var $currentItem = $('.owl-item', mainSlider).eq(event.item.index);
        var $elemsToanim = $currentItem.find("[data-animation-in]");
        setAnimation($elemsToanim, 'in');
    })

    $('.popular__collection-slider--first .popular__collection-wrapper').owlCarousel({
        loop: true,
        margin: 50,
        autoplay: false,
        smartSpeed: 1000,
        dots: true,
        items: 1,
        nav: true,
        navText: ['<button class="slider__control slider__control--prev button">&#x25c0;&#xfe0e;</button>', '<button class="slider__control slider__control--next button">&#x25b6;&#xfe0e;</button>'],
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            992: {
                dots: false
            }
        }
    });


    $('.popular__collection-slider--second .popular__collection-wrapper').owlCarousel({
        loop: true,
        margin: 50,
        autoplay: false,
        smartSpeed: 1000,
        dots: true,
        items: 1,
        nav: true,
        navText: ['<button class="slider__control slider__control--prev button">&#x25c0;&#xfe0e;</button>', '<button class="slider__control slider__control--next button">&#x25b6;&#xfe0e;</button>'],
        responsive: {
            0: {
                nav: false
            },
            992: {
                dots: false
            }
        }
    });

    $('.popular__collection-slider--third .popular__collection-wrapper').owlCarousel({
        loop: true,
        margin: 50,
        autoplay: false,
        smartSpeed: 1000,
        dots: true,
        items: 1,
        nav: true,
        navText: ['<button class="slider__control slider__control--prev button">&#x25c0;&#xfe0e;</button>', '<button class="slider__control slider__control--next button">&#x25b6;&#xfe0e;</button>'],
        responsive: {
            0: {
                nav: false
            },
            992: {
                dots: false
            }
        }
    });

    // Card
    var parentCarousel = $('.detail__slider-wrapper .detail__slider-parent .detail__slider');
    var childCarousel = $('.detail__slider-wrapper .detail__slider-child .detail__slider');
    var syncedSecondary = true;

    parentCarousel
        .owlCarousel({
            items: 1,
            smartSpeed: 800,
            dots: false,
            loop: false,
            nav: true,
            navText: ['<button class="slider__control slider__control--prev button">&#x25c0;&#xfe0e;</button>', '<button class="slider__control slider__control--next button">&#x25b6;&#xfe0e;</button>'],
            responsiveRefreshRate: 200,
            responsive: {
                0: {
                    dots: true
                },
                1199: {
                    dots: false
                }
            }
        })
        .on("changed.owl.carousel", syncPosition);

    childCarousel
        .on("initialized.owl.carousel", function() {
            childCarousel
                .find(".owl-item")
                .eq(0)
                .addClass("current");
        })
        .owlCarousel({
            items: 3,
            margin: 15,
            smartSpeed: 800,
            dots: false,
            slideBy: 4,
            responsiveRefreshRate: 100
        })
        .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }
        childCarousel
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = childCarousel.find(".owl-item.active").length - 1;
        var start = childCarousel
            .find(".owl-item.active")
            .first()
            .index();
        var end = childCarousel
            .find(".owl-item.active")
            .last()
            .index();

        if (current > end) {
            childCarousel.data("owl.carousel").to(current, 100, true);
        }
        if (current < start) {
            childCarousel.data("owl.carousel").to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            parentCarousel.data("owl.carousel").to(number, 100, true);
        }
    }

    childCarousel.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        parentCarousel.data("owl.carousel").to(number, 300, true);
    });


    // Cart
    $('.order__slider-wrapper .order__slider').owlCarousel({
        loop: true,
        margin: 40,
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 800,
        autoplayTimeout: 5000,
        dots: false,
        nav: true,
        navText: ['<button class="slider__control slider__control--prev button">&#x25c0;&#xfe0e;</button>', '<button class="slider__control slider__control--next button">&#x25b6;&#xfe0e;</button>'],
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true
            },
            576: {
                items: 2,
                dots: true
            },
            992: {
                items: 3,
                dots: true
            },
            1199: {
                items: 4,
                dots: false
            }
        }
    });

    // Compare 
    $('#compare').owlCarousel({
        loop: false,
        autoplay: false,
        smartSpeed: 1000,
        nav: true,
        navText: ['<button class="slider__control slider__control--prev button">&#x25c0;&#xfe0e;</button>', '<button class="slider__control slider__control--next button">&#x25b6;&#xfe0e;</button>'],
        responsive: {
            0: {
                items: 2,
                nav: false
            },
            768: {
                items: 3,
                nav: false
            },
            1199: {
                items: 4,
                dots: false
            }
        }
    });

    // Category-slider 
    $('#category-slider').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 1500,
        nav: true,
        navText: ['<button class="slider__control slider__control--prev button">&#x25c0;&#xfe0e;</button>', '<button class="slider__control slider__control--next button">&#x25b6;&#xfe0e;</button>'],
        items: 1,
        autoplayHoverPause: true,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                nav: false
            },
            768: {
                nav: false
            },
            1199: {
                dots: false
            }
        }
    });

    // document.querySelectorAll('#compare .compare__slide').forEach(function (btn) {
    //   btn.addEventListener('click', function () {
    //     btn.closest('.compare__slide').remove();
    //     addControls();
    //   })
    // });

    // var addControls = function () {
    //   if ($('#compare').find('.compare__slide').length < 5) {
    //     document.querySelectorAll('#compare-wrapper .slider__control').forEach(function (btn) {
    //       btn.style.display = "none";
    //     });
    //   } else {
    //     document.querySelectorAll('#compare-wrapper .slider__control').forEach(function (btn) {
    //       btn.style.display = "block";
    //     });
    //   }
    // };

    // addControls();
    // $('#compare').on('change.owl.carousel', addControls);
    // });
});