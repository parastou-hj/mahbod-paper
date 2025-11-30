
 $(document).ready(function() {
    const headerMoving=()=>{
     let lastScrollTop = 0;
     let isHeaderVisible = true;
     const $header = $('header');
     const $mainHeader = $('.header-container');
     const $downHeader = $('.header-down');
     const $headerRow = $('.header-top');
     const rowHeight = $headerRow.outerHeight();
     const downHeaderHeight = $downHeader.outerHeight();
     const mainHeaderHeight = $mainHeader.outerHeight();
 
    
     const totalHeight = rowHeight + downHeaderHeight ;
    //  $mainHeader.css('height', totalHeight);
    //  $('body').css('padding-top', totalHeight);
     if (window.innerWidth > 990) {
      
         $(window).scroll(function() {
         const currentScroll = $(this).scrollTop();
             if (currentScroll > 100) {
                 if (currentScroll > lastScrollTop && isHeaderVisible) {
                     $mainHeader.addClass('header-hidden');
                     $downHeader.addClass('header-up-lg');
                    //  $header.height(downHeaderHeight);
                     isHeaderVisible = false;
                     
                 }
                
             } else   {
                 $mainHeader.removeClass('header-hidden');
                 $downHeader.removeClass('header-up-lg');
                 isHeaderVisible = true;
             }
             
             lastScrollTop = currentScroll;
         });
        
     }else if( window,innerWidth <= 992){
         $(window).scroll(function() {
             const currentScroll = $(this).scrollTop();
             if (currentScroll > 100) {
                 if (currentScroll > lastScrollTop && isHeaderVisible) {
                     $downHeader.addClass('header-hidden');
                    //  $mainHeader.css('height', rowHeight);
                    //  $('body').css('padding-top', rowHeight);
                     isHeaderVisible = false;
                 }
                
             } else {
                 $downHeader.removeClass('header-hidden');
                //  $mainHeader.css('height', totalHeight);
                //  $('body').css('padding-top', totalHeight);
 
                 isHeaderVisible = true;
             }
             
             lastScrollTop = currentScroll;
         });
         
         let resizeTimer;
         
     }
    }
    headerMoving();
    $(window).resize(headerMoving);
     
 });


 //slider
   $(".slider-owl").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        rtl: true,
        nav: false,
        dots: false
    });


     //most-sale
  $(document).ready(function(){
            $('.most-sale-owl').owlCarousel({
                rtl: true, 
                loop: true, 
                nav:true,
                dots: true, 
                 autoplay: true,
                autoplayTimeout: 4000,
                autoplayHoverPause: true,
                smartSpeed: 1000,
              navText: [ "<i class='fa fa-chevron-right'></i>","<i class='fa fa-chevron-left'></i>"],
                responsive:{
                    0:{
                        items:1.5
                    },
                    600:{
                        items:2.5 
                    },
                     800:{
                        items:3 
                    },
                      991:{
                        items:4 
                    },
                    1200:{
                        items:4
                    }
                }
            });
        });