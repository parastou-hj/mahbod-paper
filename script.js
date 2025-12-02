$(document).ready(function() {
    // Sticky Header functionality
    const headerBottom = $('.header-bottom');
    const headerContainer = $('.header-container');

    
    // ایجاد placeholder برای جلوگیری از جهش محتوا
    const placeholder = $('<div class="sticky-placeholder"></div>');
    headerContainer.after(placeholder);
    
    let isSticky = false;
    
    // محاسبه offset برای شروع sticky
    function getHeaderBottomOffset() {
        const headerTop = $('.header-top');
        const headerMiddle = $('.header-middle');
      
        
        let offset = 0;
        if (headerTop.length) offset += headerTop.outerHeight();
        if (headerMiddle.length) offset += headerMiddle.outerHeight();
        
        return offset;
    }
    
    function handleScroll() {
        const scrollTop = $(window).scrollTop();
        const headerBottomOffset = getHeaderBottomOffset();
        
        if (scrollTop >= headerBottomOffset) {
            // اگر sticky نیست، sticky کن
            if (!isSticky) {
                headerBottom.addClass('sticky');
                placeholder.addClass('active').height(headerBottom.outerHeight());
                isSticky = true;
       

            }
        } else {
            // اگر به بالای صفحه برگشته، sticky را بردار
            if (isSticky) {
                headerBottom.removeClass('sticky');
                placeholder.removeClass('active');
                isSticky = false;
            
            }
        }
    }
    
    // Event listener با performance optimization
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    $(window).on('scroll', requestTick);
    
    // بررسی اولیه در صورت لود شدن صفحه در وسط
    handleScroll();
    
    // مدیریت resize برای responsive بودن
    $(window).on('resize', function() {
        if (isSticky) {
            placeholder.height(headerBottom.outerHeight());
        }
    });
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
    nav: false,
    dots: false,
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

        // Map highlight on brand hover
document.addEventListener('DOMContentLoaded', function() {
    const brandItems = document.querySelectorAll('.brand-item[data-country]');
    const mapPoints = document.querySelectorAll('.map-point[data-country]');

    if (!brandItems.length || !mapPoints.length) return;

    const clearActive = () => {
        mapPoints.forEach(point => point.classList.remove('active'));
    };

    brandItems.forEach(item => {
        const target = item.getAttribute('data-country');
        item.addEventListener('mouseenter', () => {
            clearActive();
            const activePoint = document.querySelector(`.map-point[data-country="${target}"]`);
            if (activePoint) {
                activePoint.classList.add('active');
            }
        });

        item.addEventListener('mouseleave', clearActive);
    });
});