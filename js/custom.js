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



// Smooth scroll for menu links
$('.navbar a, .mobile-menus a').on('click', function (e) {
    var target = $(this).attr('href');

    if (target && target.startsWith('#') && $(target).length) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $(target).offset().top - 100
        }, 700);

        closeMenu();
    }
});

// portfolio gallery lightbox
(function () {
    var $lightbox = $("#galleryLightbox");
    var $img = $("#galleryLightboxImg");
    var $title = $("#galleryLightboxTitle");
    var $counter = $("#galleryLightboxCounter");
    var gallery = [];
    var currentIndex = 0;

    // builds the gallery for ONE card only: uses data-gallery (JSON array of
    // image paths) when present on the card, otherwise falls back to just
    // that card's own thumbnail image.
    function buildGalleryForCard($card) {
        var title = $card.find(".portfolio-card-title").text().trim();
        var raw = $card.attr("data-gallery");
        var images = [];

        if (raw) {
            try {
                images = JSON.parse(raw);
            } catch (err) {
                images = [];
            }
        }

        if (!images.length) {
            var thumbSrc = $card.find(".portfolio-card-thumb img").attr("src");
            if (thumbSrc) images = [thumbSrc];
        }

        return images.map(function (src) {
            return { src: src, title: title };
        });
    }

    function showSlide(index) {
        if (!gallery.length) return;
        currentIndex = (index + gallery.length) % gallery.length;
        var item = gallery[currentIndex];
        $img.attr("src", item.src).attr("alt", item.title);
        $title.text(item.title);
        $counter.text(gallery.length > 1 ? (currentIndex + 1) + " / " + gallery.length : "");
        $lightbox.toggleClass("has-multiple", gallery.length > 1);
    }

    function openLightbox($card, startIndex) {
        gallery = buildGalleryForCard($card);
        if (!gallery.length) return;
        showSlide(startIndex || 0);
        $lightbox.addClass("is-active");
        $("body").css("overflow", "hidden");
    }

    function closeLightbox() {
        $lightbox.removeClass("is-active");
        $("body").css("overflow", "");
    }

    // open gallery when a portfolio thumbnail (or its link) is clicked —
    // only that card's own images are shown
    $(document).on("click", ".portfolio-card-thumb img, .portfolio-card-thumb .portfolio-card-link", function (e) {
        e.preventDefault();
        var $card = $(this).closest(".portfolio-card");
        openLightbox($card, 0);
    });

    $(document).on("click", ".gallery-lightbox-close, .gallery-lightbox-backdrop", closeLightbox);
    $(document).on("click", ".gallery-lightbox-next", function () { showSlide(currentIndex + 1); });
    $(document).on("click", ".gallery-lightbox-prev", function () { showSlide(currentIndex - 1); });

    $(document).on("keydown", function (e) {
        if (!$lightbox.hasClass("is-active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") showSlide(currentIndex + 1);
        if (e.key === "ArrowLeft") showSlide(currentIndex - 1);
    });
})();

$(".resumeBtn").click(function () {
    const link = document.createElement("a");
    link.href = "assets/Krutika-Resume.pdf";
    link.download = "Krutika-Patel-Resume.pdf";
    link.click();
});
