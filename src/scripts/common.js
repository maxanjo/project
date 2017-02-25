$(document).ready(function(){
// Mobile Menu
  var bar = function(){
    $('.menu-mobile').slideToggle();
    $(this).toggleClass("close-bt-hamburguer");
  };

  $('.bar-mobile').bind("click", bar);

  $('.menu-mobile a').click(function(){
    $(this).siblings('ul').slideToggle();
  });

  // Мобильное меню arrows:
  $('.menu-mobile a').siblings('ul').each(function(){
    $(this).siblings('a').addClass('arrow-mobile');
  });
  $('.menu-mobile a').click(function(){
    $(this).toggleClass('arrow-mobile');
    $(this).toggleClass('arrow-mobile-a');
  })

  // Главная навигация arrows:

  $('.navigation .second-nav a').siblings('ul').each(function(){
    $(this).siblings('a').addClass('arrow');
  });

// Active Class Function 
function classActive(){
  $(this).siblings('.active').removeClass('active');
  $(this).addClass('active');
}
$('.active-button').bind('click', classActive);

// ACTIVE MENU

  var $myMenu = $('#menu'),
      $myItems = $('a[href^="#"]', $myMenu),
      $myAnchors,
      $lastHref,
      $wTop,
      $topFixed = true,
      $menuHeight = ($topFixed) ? $myMenu.outerHeight() : 0,
      setActive = function($href){
        if($href !== $lastHref){
          $myMenu.find('li').removeClass('active')
          .find('a[href="'+$href+'"]').parent().addClass('active');
          $lastHref = $href;
          if(history.pushState) {
            history.pushState(null, null, $href);
          }
          else {
            window.location.hash = $href;
          }
        }
      }

  if(window.location.hash){
    $href = window.location.hash;
    setActive($href);
  }

  $myAnchors = $myItems.map(function(){
    $href = $(this).attr('href');
    if($href != "#"){
      return $href;
    }
  });
  
  $(window).scroll(function(){
    $wTop = $(this).scrollTop() + $menuHeight;
    if($wTop == (0 + $menuHeight)){
       setActive("#");
    }
    else {
      $.each($myAnchors, function($i, $v){
        $el = $($v);
        $eTop = $el.offset().top;
        $eBot = $eTop + $el.outerHeight();
        if($wTop >= $eTop && $wTop < $eBot){
          setActive($v);
          return false;
        }
        else if($myAnchors.size() == ($i + 1)){
          $myMenu.find('li').removeClass('active');
          $lastHref = "";
        }
      });
    }
  });
  
  $myItems.click(function(e){
    $href = $(this).attr('href');
    $eTop = ($href == "#") ? 0 : $($href).offset().top - $menuHeight;
    $('html, body').stop().animate({scrollTop: $eTop}, 400);
    e.preventDefault();
  });

// FIXING MENU

var $menu = $("#menu");
$(window).scroll(function(){
    if ( $(this).scrollTop() > 100 && $menu.hasClass("default") ){
        $menu.removeClass("default")
                           .addClass("fixed");
    } else if($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
        $menu.removeClass("fixed").addClass("default");
    }                                     
});

//REVOLUTION-SLIDER
  $('.fullwidthbanner').revolution(
  {
    delay:59000,
    startheight:800,
    disableProgressBar: 'off',
    spinner: 'spinner1',
    hideThumbs:200,
    stopAfterLoops:0, 
    minHeight: 500,
    spinner: 'spinner1',
    hideThumbs:200,
    stopAfterLoops:0, 
    navigationType:"bullet",
    navigationArrows: "verticalCentered",
    navigationStyle:"preview1",
    shadow:1,
    fullWidth:"on",
  }
);

// Плавный скролл

//  $("html").niceScroll({
     
// });
  // Каруселька
  // Documentation: http://www.owlcarousel.owlgraphic.com/docs/api-options.html
/* $("#owl-carousel").owlCarousel({
  items: 1, 
loop: true,
autoplay:true,
autoplayTimeout:3000,
autoplayHoverPause:true,
 });*/


// Аякс отправка формы 
 // Документация https://api.jquery.com/category/ajax/
 $("#callback").submit(function(){
  $.ajax({
type: "POST",
url: "mail.php",
data: $("#callback").serialize()
  }).done(function() {
    alert("Спасибо за заявку");
  });
  return false;
 });

// ScrollTo Планый скролл вверх
// Documentation: https://github.com/flesler/jquery.scrollTo
window.onscroll = function(){
  if(window.pageYOffset > 500){
    $('#scroll-top').css({'bottom': 0})
  }else{
    $('#scroll-top').css({'bottom': -40})
  }
};
$('#scroll-top').click(function(){
  $.scrollTo($('#slider'), 1000,{
   });
});
 // Плавный скролл меню
  $('#menu').localScroll(800);

// Parallax Бэкграунда
// Background must be fixed 
// *works only with ID
// Нет вертикального позиционирования бэкграунда..
$('#slider').parallax("50%", 0.5);

// Odometer Анимированный Счет
// Documetation:  http://github.hubspot.com/odometer/
 window.odometerOptions = {
  format: '(ddd).dd',
};
  setTimeout(function(){
    $('.odometer').html(423234234);
  }, 1000);

// Другой крутой Параллакс блоков jquery.parallax-scroll:
// https://github.com/alumbo/jquery.parallax-scroll
 

 // Waypoint
 // Documentation: http://imakewebthings.com/waypoints/guides/getting-started/
// And Easing Documentation: http://gsgd.co.uk/sandbox/jquery/easing/

 // $('#about img').css({'position': 'relative', 'right': '700px'});
 // $('#about').waypoint(function(){
 //    $('#about img').animate({'right': 0}, 1000, 'easeOutBounce');
 // },{offset: '70%'});


// EasyPieChart
  $('.chart').easyPieChart({
    scaleColor: "#ecf0f1",
    lineWidth: 20,
    lineCap: 'butt',
    barColor: '#1abc9c',
    trackColor: "#ecf0f1",
    size: 160,
    animate: 2000
  });


// CountDown
// Documentation and examples: http://hilios.github.io/jQuery.countdown/examples/basic-coupon-site.html
$('#clock').countdown('2020/10/10', function(event) {
   $(this).html(event.strftime('%D days %H:%M:%S'));
});

// Loader
$(window).on('load', function(){

  $('#loader').delay(2000).fadeOut('slow');
 
});


// Кроссбраузерность
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        ie: function(){
            return navigator.userAgent.match(/Trident/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

// Opera-mini
    if(isMobile.Opera()){
      // $('.cart, .search').css('display', 'none');
      // $('#menu').css({'display': 'table', 'padding-top': '16px'});
      // $('#menu ul').css({'display': 'table-cell', 'vertical-align': 'middle', 'padding-top': '15px'});
    };
 });
