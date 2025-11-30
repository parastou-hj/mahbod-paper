

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
   const $creativitySection = $('.creativity');
  if ($creativitySection.length) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            $(entry.target).addClass('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.6,
        rootMargin: '0px 0px -10% 0px'
      });

      observer.observe($creativitySection[0]);
    } else {
      $creativitySection.addClass('is-visible');
    }
  }
});
  
// Advanced Mega Menu with Touch Support
$(document).ready(function() {
    // Handle mobile touch for mega menu
    if (window.innerWidth <= 992) {
        $('.has-mega-advanced > .nav-link').on('click', function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('mobile-active');
        });
        
        $('.mega-list > li.has-submenu > a').on('click', function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('submenu-active');
        });
    }
    
    // Close mega menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.has-mega-advanced').length) {
            $('.has-mega-advanced').removeClass('mobile-active');
            $('.has-submenu').removeClass('submenu-active');
        }
    });
    
    // Add smooth scroll animation for submenu items
    $('.mega-submenu a').hover(
        function() {
            $(this).stop().animate({
                paddingRight: '22px'
            }, 200);
        },
        function() {
            $(this).stop().animate({
                paddingRight: '18px'
            }, 200);
        }
    );
});
 
// Video Control Functionality
$(document).ready(function() {
    const $video = $('.movie-video');
    const $control = $('.video-control');
    const $controlIcon = $('.video-control i');
    
    if ($video.length && $control.length) {
        // Toggle play/pause
        $control.on('click', function() {
            const video = $video[0];
            
            if (video.paused) {
                video.play();
                $video.removeClass('paused');
                $controlIcon.removeClass('fa-play').addClass('fa-pause');
            } else {
                video.pause();
                $video.addClass('paused');
                $controlIcon.removeClass('fa-pause').addClass('fa-play');
            }
        });
        
        // Optional: Pause on scroll out of view
        $(window).on('scroll', function() {
            const videoTop = $video.offset().top;
            const videoBottom = videoTop + $video.height();
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            
            // Check if video is in viewport
            if (scrollTop + windowHeight < videoTop || scrollTop > videoBottom) {
                // Video is out of view
                if (!$video[0].paused) {
                    $video[0].pause();
                    $video.addClass('paused');
                    $controlIcon.removeClass('fa-pause').addClass('fa-play');
                }
            }
        });
        
        // Ensure video is muted for autoplay
        $video[0].muted = true;
        
        // Handle video loading errors
        $video.on('error', function() {
            console.error('خطا در بارگذاری ویدیو');
            $('.movie-wrapper').append(
                '<div class="video-error">خطا در بارگذاری ویدیو</div>'
            );
        });
    }
});
