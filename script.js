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
      
      // کنترل ویدیوها: توقف همه ویدیوها و پخش ویدیوی اسلاید فعال
      const $allVideos = $slider.find('.owl-item video');
      $allVideos.each(function() {
        this.pause();
        this.currentTime = 0;
      });
      
      const $currentVideo = $currentItem.find('video');
      if ($currentVideo.length && $currentVideo[0]) {
        // پخش ویدیوی اسلاید فعال
        $currentVideo[0].play().catch(function(error) {
          console.log('خطا در پخش ویدیو:', error);
        });
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
    
    // وقتی ویدیو تمام شد، دوباره از اول پخش شود
    $slider.find('video').each(function() {
      $(this).on('ended', function() {
        this.currentTime = 0;
        this.play().catch(function(error) {
          console.log('خطا در پخش مجدد ویدیو:', error);
        });
      });
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



$('.owl-brands').owlCarousel({
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
        items: 6
      }
    }
  });

  class CounterAnimation {
    constructor() {
        this.percentSection = document.querySelector('.percent-sec');
        this.hasAnimated = false;
        this.counterItems = this.percentSection ? this.percentSection.querySelectorAll('.percent-item span') : [];
        this.init();
    }
    
    init() {
        if (!this.percentSection || this.counterItems.length === 0) return;
        
        this.setupObserver();
        window.addEventListener('scroll', () => this.checkScroll());
    }
    
    setupObserver() {
        if (window.IntersectionObserver) {
            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -20% 0px',
                threshold: 0.3
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.hasAnimated) {
                        this.startAnimation();
                        this.hasAnimated = true;
                    }
                });
            }, observerOptions);
            
            observer.observe(this.percentSection);
        }
    }
    
    checkScroll() {
        if (this.hasAnimated || !this.percentSection) return;
        
        const rect = this.percentSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top <= windowHeight * 0.8 && rect.bottom >= windowHeight * 0.2) {
            this.startAnimation();
            this.hasAnimated = true;
        }
    }
    
    startAnimation() {
        Array.from(this.counterItems).forEach((item, index) => {
            setTimeout(() => {
                this.animateCounter(item);
            }, index * 200);
        });
    }
    
    animateCounter(element) {
        const fullText = element.textContent;
        const matches = fullText.match(/(\d+)([^0-9]*)/);
        
        if (!matches) return;
        
        const target = parseInt(matches[1]); 
        const suffix = matches[2] || '';
        
        const duration = 1500;
        const frameRate = 16;
        const totalFrames = duration / frameRate;
        
        let currentFrame = 0;
        let currentValue = 1; 
        
        const timer = setInterval(() => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const easedProgress = this.easeOutExpo(progress);
            currentValue = Math.round(1 + (easedProgress * (target - 1)));
            
            if (currentFrame >= totalFrames) {
                currentValue = target;
            }
            
            element.textContent = currentValue + suffix;
            
            if (currentFrame >= totalFrames) {
                clearInterval(timer);
                element.style.transition = 'transform 0.3s ease';
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 300);
            }
        }, frameRate);
    }
    
    easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new CounterAnimation();
});

// Additional CSS for body when mobile menu is open
const style = document.createElement('style');
style.textContent = `
    body.mobile-menu-open {
        overflow: hidden;
        position: fixed;
        width: 100%;
    }
`;
document.head.appendChild(style);


 // Mobile Menu Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuToggle =  document.querySelector('.hamburger-btn');
            const mobileSidebar = document.getElementById('mobileSidebar');
            const mobileOverlay = document.querySelector('.mobile-overlay');
            const mobileCloseBtn = document.getElementById('mobileCloseBtn');

            // Toggle mobile menu
            function toggleMobileMenu() {
                mobileMenuToggle.classList.toggle('active');
                mobileSidebar.classList.toggle('active');
                mobileOverlay.classList.toggle('active');
                document.body.style.overflow = mobileSidebar.classList.contains('active') ? 'hidden' : '';
            }

            // Close mobile menu
            function closeMobileMenu() {
                mobileMenuToggle.classList.remove('active');
                mobileSidebar.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }

            // Event listeners
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
            mobileCloseBtn.addEventListener('click', closeMobileMenu);
            mobileOverlay.addEventListener('click', closeMobileMenu);

            // Handle submenu toggles
            document.querySelectorAll('[data-submenu]').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const submenuId = this.getAttribute('data-submenu') + '-submenu';
                    const submenu = document.getElementById(submenuId);
                    const parentItem = this.closest('.mobile-nav-item');
                    
                    // Toggle submenu
                    parentItem.classList.toggle('active');
                    submenu.classList.toggle('active');
                });
            });

            // Handle megamenu toggles
            document.querySelectorAll('[data-megamenu]').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const megamenuId = this.getAttribute('data-megamenu') + '-megamenu';
                    const megamenu = document.getElementById(megamenuId);
                    const parentItem = this.closest('.mobile-nav-item');
                    
                    // Toggle megamenu
                    parentItem.classList.toggle('active');
                    megamenu.classList.toggle('active');
                });
            });

            // Handle category toggles in megamenu
            document.querySelectorAll('[data-category]').forEach(header => {
                header.addEventListener('click', function() {
                    const categoryId = this.getAttribute('data-category') + '-content';
                    const content = document.getElementById(categoryId);
                    const parentCategory = this.closest('.mobile-megamenu-category');
                    
                    // Toggle category content
                    parentCategory.classList.toggle('active');
                    content.classList.toggle('active');
                });
            });

            // Close menu when clicking on regular links
            document.querySelectorAll('.mobile-nav-link:not([data-submenu]):not([data-megamenu]), .mobile-submenu-link, .mobile-category-link').forEach(link => {
                link.addEventListener('click', function() {
                    closeMobileMenu();
                });
            });

            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 992) {
                    closeMobileMenu();
                }
            });

            // Prevent menu close when clicking inside sidebar
            mobileSidebar.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });