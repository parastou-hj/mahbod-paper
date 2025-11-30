

$(document).ready(function() {
  const headerMoving = () => {
    let lastScrollTop = 0;
    let isHeaderVisible = true;
    const $mainHeader = $('.header-container');
    const $downHeader = $('.header-down');
    if (window.innerWidth > 990) {
      $(window).scroll(function() {
        const currentScroll = $(this).scrollTop();
        if (currentScroll > 100) {
          if (currentScroll > lastScrollTop && isHeaderVisible) {
            $mainHeader.addClass('header-hidden');
            $downHeader.addClass('header-up-lg');
            isHeaderVisible = false;
          }
        } else {
          $mainHeader.removeClass('header-hidden');
          $downHeader.removeClass('header-up-lg');
          isHeaderVisible = true;
        }

        lastScrollTop = currentScroll;
      });
    } else if (window.innerWidth <= 992) {
      $(window).scroll(function() {
        const currentScroll = $(this).scrollTop();
        if (currentScroll > 100) {
          if (currentScroll > lastScrollTop && isHeaderVisible) {
            $downHeader.addClass('header-hidden');
            isHeaderVisible = false;
          }
        } else {
          $downHeader.removeClass('header-hidden');
          isHeaderVisible = true;
        }

        lastScrollTop = currentScroll;
      });

     }

  };
 
  headerMoving();
  $(window).resize(headerMoving);

  const $navSearch = $('.nav-search');
  const $searchToggle = $('.search-toggle');
  const $searchInput = $('.search-box input');

  if ($navSearch.length) {
    $searchToggle.on('click', function(event) {
      event.preventDefault();
      $navSearch.toggleClass('open');
      if ($navSearch.hasClass('open')) {
        $searchInput.trigger('focus');
      }
    });
 

    $(document).on('click', function(event) {
      if (!$(event.target).closest('.nav-search').length) {
        $navSearch.removeClass('open');
      }
     });
  }
 
  const $slider = $('.slider-owl');
  if ($slider.length) {
    const triggerBannerAnimation = (event) => {
      const currentIndex = event && event.item && typeof event.item.index === 'number'
        ? event.item.index
        : 0;
      const $items = $slider.find('.owl-item .baner-item');
      $items.removeClass('is-animating');

      const $currentItem = $slider.find('.owl-item').eq(currentIndex).find('.baner-item');
      if ($currentItem.length) {
        void $currentItem[0].offsetWidth;
        $currentItem.addClass('is-animating');
      }
    };

    $slider.on('initialized.owl.carousel translated.owl.carousel', triggerBannerAnimation);
    $slider.owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      rtl: true,
      nav: false,
      dots: false
    });
  }

  $('.most-sale-owl').owlCarousel({
    rtl: true,
    loop: true,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 1000,
    navText: ["<i class='fa fa-chevron-right'></i>", "<i class='fa fa-chevron-left'></i>"],
    responsive: {
      0: {
        items: 1.5
      },
      600: {
        items: 2.5
      },
      800: {
        items: 3
      },
      991: {
        items: 4
      },
      1200: {
        items: 4
      }
    }
  });
});
 
