$(document).ready(function () {

    $('.skills-slider').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        speed: 700,
        infinite: true,
        arrows: false,
        dots: false,
        pauseOnHover: true,

        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 5
                }
            },
              {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });


    /* Active item */
    $('.skills-slider').on(
        'click',
        '.skill-item',
        function () {

            $('.skill-item').removeClass('active');

            $(this).addClass('active');

        }
    );

});


window.addEventListener("scroll", function () {
    const header = document.getElementById("header");

    if (window.scrollY > 50) {
        header.classList.add("abc");
    } else {
        header.classList.remove("abc");
    }
});

//  nav responsive
$('.hamburger').click(function () {
    $('.mobile-menus').toggleClass('open');
    $('.menu-overlay').toggleClass('show');
    $('body').toggleClass('no-scroll');
});

function closeMenu() {
    $('.mobile-menus').removeClass('open');
    $('.menu-overlay').removeClass('show');
    $('body').removeClass('no-scroll');
}

$('.menu-overlay').click(closeMenu);

$(document).click(function (e) {
    if (!$(e.target).closest('.mobile-menus, .hamburger').length) {
        closeMenu();
    }
});



//  sticky header
$(window).on("scroll", function () {
    if ($(".main-header").length) {
        var headerScrollPos = 130;
        var stricky = $(".main-header");
        if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("sticky-fixed");
        } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("sticky-fixed");
        }
    }
});


// portfolio filter
$(".portfolio-filter-btn").on("click", function () {
    var filter = $(this).data("filter");

    $(".portfolio-filter-btn").removeClass("active");
    $(this).addClass("active");

    $(".portfolio-card").each(function () {
        var category = $(this).data("category");
        if (filter === "all" || category === filter) {
            $(this).removeClass("is-hidden");
        } else {
            $(this).addClass("is-hidden");
        }
    });
});
