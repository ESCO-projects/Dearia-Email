import Parallax from 'parallax-js';
import '../../node_modules/fullpage.js/dist/jquery.fullpage';
import '../../node_modules/jquery-countdown/dist/jquery.countdown.min';
import '../../node_modules/svgxuse/svgxuse.min';
import '../../node_modules/magnific-popup/dist/jquery.magnific-popup';
import '../../node_modules/lightslider/dist/js/lightslider.min';
import '../../node_modules/jquery-mask-plugin/dist/jquery.mask.min';

let timelimeMod;

$(document).ready(() => {
  function animateMenu() {
    $('#fp-nav li').each((i, el) => {
      setTimeout(() => {
        $(el).addClass('return_elem');
      }, 100 * i);
    });
  }

  const scene = document.getElementById('parallax_scene');
  const parallaxInstance = new Parallax(scene);
  $('.wrapper').fullpage({
    scrollOverflow: true,
    paddingTop: '0',
    paddingBottom: '0',
    verticalCentered: true,
    navigation: true,
    navigationPosition: 'right',
    menu: '#m_menu',
    anchors: ['main', 'about', 'problems', 'how', 'get', 'action', 'gmap', 'contacts'],
    navigationTooltips: ['Главная', 'Кто мы', 'Проблемы и решения', 'Как это происходит', 'Что Вы получите', 'Время ограничено', 'Как добраться', 'Контакты'],
    showActiveTooltip: true,
    slidesNavigation: true,
    slidesNavPosition: 'bottom',
    controlArrows: false,
    scrollingSpeed: 400,
    fitToSectionDelay: 500,
    touchSensitivity: 17,
    recordHistory: false,
    normalScrollElements: '.timeline,.mfp-content,.mod_main,.mfp-wrap',
    fixedElements: '.js_move_to,.open_mob_menu',
    afterRender() {
      $('.js_timer').countdown('2017/10/28 00:00:00', (event) => {
        $('.cou_hours').html(event.strftime('%D'));
        $('.cou_min').html(event.strftime('%H'));
        $('.cou_sec').html(event.strftime('%M'));
      });
      setTimeout(() => { $('.preloader').fadeOut(300); }, 100);
      function timerFunc() {
        $.magnificPopup.open({ items: { src: '.timeline' },
          type: 'inline',
          fixedContentPos: true,
          closeBtnInside: false,
          showCloseBtn: false,
          fixedBgPos: true,
          preloader: false,
          midClick: true,
          mainClass: 'my-mfp-zoom-in',
          callbacks: {
            afterClose() {
              timelimeMod = setTimeout(timerFunc, 60000);
            }
          }
        }, 0);
      }
      $('.js_popup').magnificPopup({
        type: 'inline',
        overflowY: 'hidden',
        preloader: false,
        removalDelay: 300,
        showCloseBtn: false,
        fixedContentPos: true,
        fixedBgPos: true,
        mainClass: 'my-mfp-zoom-in',
        callbacks: {
          beforeOpen() {
            clearTimeout(timelimeMod);
          },
          afterClose() {
            timelimeMod = setTimeout(timerFunc, 60000);
          }
        }
      });
      timelimeMod = setTimeout(timerFunc, 30000);
    },
    onLeave(index, nextIndex, direction) {
      const leavingSection = $(this);
      if (index === 1 && direction === 'down') {
        $('.js_move_to').addClass('scroll_top_visible');
      } else if (index === 2 && direction == 'up') {
        $('.js_move_to').removeClass('scroll_top_visible');
      }
    },
    afterLoad(anchorLink, index) {
      const loadedSection = $(this);
      if (anchorLink === 'main') {
        $('.js_move_to').removeClass('scroll_top_visible');
        $('.head__logo, .head__wrap-scrol').addClass('return_elem');
        setTimeout(() => {
          $('.head__text-wrapper').addClass('return_elem');
        }, 400);
        setTimeout(() => {
          animateMenu();
        }, 800);
        setTimeout(() => {
          $('.parallax_container').addClass('return_elem');
        }, 1200);
      } // end if
      if (anchorLink === 'how') {

      } // end if
      if (anchorLink === 'get') {
        $('.get__icon').each((i, el) => {
          setTimeout(() => {
            $(el).addClass('return_elem animated bounceIn');
          }, 200 * i);
        });
      } // end if
      if (anchorLink === 'problems') {
        $('.problem__step').each((i, el) => {
          setTimeout(() => {
            $(el).addClass('return_elem animated bounceIn');
          }, 200 * i);
        });
      } // end if
      if (anchorLink === 'staff') {
        $('.staff__step').each((i, el) => {
          setTimeout(() => {
            $(el).addClass('return_elem animated bounceIn');
          }, 200 * i);
        });
      } // end if
      if (anchorLink === 'main' || 'about' || 'problems' || 'how' || 'get' || 'action' || 'gmap' || 'contacts') {
        animateMenu();
      } // end if
      if (anchorLink === 'about' || 'problems' || 'how' || 'get' || 'action' || 'gmap' || 'contacts') {

      } // end if
    }
  });/* END fullpage */

  $(document).on('click', '.js_next_slide', () => { $.fn.fullpage.moveSlideRight(); });
  $(document).on('click', '.js_prev_slide', () => { $.fn.fullpage.moveSlideLeft(); });
  $(document).on('click', '.js_move_down', () => { $.fn.fullpage.moveSectionDown(); });
  $(document).on('click', '.js_move_to', () => { $.fn.fullpage.moveTo('main'); });

  $('.js-prob_btn').click(() => { $('.js-hov_list').slideToggle(300); });
  $('.js_mob_open_list').click(() => {
    $('.js_mob_list').slideToggle(300);
    $('.icon-footer_arr').toggleClass('clicked');
  });

  $('.problem__mob-prob-list li').click(function() {
    const tab_id = $(this).attr('data-tab');
    $('.problem__mob-prob-list li').removeClass('bb');
    $('.problem__title h3').removeClass('current_tab');
    $('.problem__list').removeClass('current_tab');
    $('.problem__result--descr').removeClass('current_tab');
    $(this).addClass('bb');
    $(`.${tab_id}`).addClass('current_tab');
  });

  $('ul.js_tab_for li, .js_tab_for img').hover(function() {
    const tab_id = $(this).attr('data-tab');
    $('.problem__title h3').removeClass('current_tab');
    $('.problem__list').removeClass('current_tab');
    $('.problem__result--descr').removeClass('current_tab');
    $(this).addClass('current_tab');
    $(`.${tab_id}`).addClass('current_tab');
  });

  $('.js_close_mod').click(() => {
    $.magnificPopup.close();
  });

  const input = $('.js_input');
  input.focusin(function() {
    const tab_id = $(this).attr('data-input');
    $('.mod__fields label').removeClass('move_label');
    $(`.${tab_id}`).addClass('move_label');
  });

  input.focusout(function() {
    const tab_id = $(this).attr('data-input');
    $(`.${tab_id}`).removeClass('move_label');
  });

  const mySlider = $('.js_how_slider').lightSlider({
    auto: true,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed: 600,
    pause: 4000,
    adaptiveHeight: true,
    item: 1,
    slideMargin: 0,
    loop: true,
    controls: false,
    pager: false
  });

  /* START go to slide on hover */
  $('.js_num').click(function() {
    const slideNum = $(this).attr('data-slide');
    mySlider.goToSlide(+slideNum);
  });
    /* END go to slide on hover */

    /* START FOR ACTION SEND */
  $('.js_form').submit(function() { // Change
    const th = $(this);
    $.ajax({
      type: 'POST',
      url: 'rest.php',
      data: th.serialize()
    }).done(() => {
      window.location.replace('http://dearia.co.il/thanks.html');
    });
    return false;
  });
  /* END FOR ACTION SEND */

  /* SET MASK TO INPUT */
  $('.js_tel_mask').mask('000-0000000');

  /* FOCUS INPUT ON BLOCK CLICK */
  $('.js_focus_input').click(() => {
    $('.js_focus').focus();
  });

  $('.js_toggle_menu').click(() => {
    $('.menu_lines').toggleClass('active');
    $('.js_mobile_menu').toggleClass('toggle_mnu');
  });

    /* push in modal button value */
  $('a.js_value').click(function() {
    $('.form_id').val($(this).data('form'));
  });

  $('.js_close_popup').click(() => {
    $.magnificPopup.close();
  });

  $('.js_toggle_direction').click(function() {
    $('.js_toggle_panel').toggleClass('show_direct');
    $(this).toggleClass('toggle');
  });
});/* END ready(function() */

