(function ($) {
    "use strict";

    /*----------------------------- Site Loader & Popup --------------------*/
    $(window).on("load", function () {
        $("#ms-overlay").fadeOut("slow");
    });

    /*--------------------- Skill progress (in about section) --------------------*/
    var forEach = function (array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]);
        }
    };

    var a = 0;
    var b = 0;
    var oTop = 0;
    var progress = $('#about');
    $(window).scroll(function () {
        if (progress.length) {
            var oTop = progress.offset().top - window.innerHeight;
            if (b == 0 && $(window).scrollTop() > oTop) {

                var max = -219.99078369140625;
                forEach(document.querySelectorAll('.progress'), function (index, value) {
                    var percent = value.getAttribute('data-progress');
                    value.querySelector('.fill').setAttribute('style', 'stroke-dashoffset: ' + ((100 - percent) / 100) * max);
                    value.querySelector('.value').innerHTML = percent + '%';
                });

                b = 1;
            }
        }
    });

    /*----------------------------- Sidebar js | Toggle Icon OnClick Open sidebar  -----------------------------------*/
    $(".ms-sidebar-toggle").on("click", function () {
        $(".ms-sidebar-overlay").fadeIn();
        $(".ms-sidebar").addClass("ms-open");
    });

    $(".close-sidebar, .nav-link.ms-nav").on("click", function () {
        $(".ms-sidebar").removeClass("ms-open");
        $(".ms-sidebar-overlay").fadeOut();
    });

    $(".ms-sidebar-overlay").on("click", function () {
        $(".ms-sidebar").removeClass("ms-open");
        $(".ms-sidebar-overlay").fadeOut();
    });

    /*-------------------- Potfolio for Mixit up --------------------*/
    var portfolioContent = $('.portfolio-content');
    portfolioContent.mixItUp();

    /*--------------------- Replace all SVG images with inline SVG -------------------------------- */
    $(document).ready(function () {
        $('img.svg_img[src$=".svg"]').each(function () {
            var $img = $(this);
            var imgURL = $img.attr('src');
            var attributes = $img.prop("attributes");

            $.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');

                // Remove any invalid XML tags
                $svg = $svg.removeAttr('xmlns:a');

                // Loop through IMG attributes and apply on SVG
                $.each(attributes, function () {
                    $svg.attr(this.name, this.value);
                });

                // Replace IMG with SVG
                $img.replaceWith($svg);
            }, 'xml');
        });
    });

    /*--------------------- on click to scroll next section -------------------------------- */
    $(document).ready(function () {
        $('.scroll-next').on("click", function (e) {

            var targetHref = $(this).attr('data-scroll');

            $('html, body').animate({
                scrollTop: $('#' + targetHref).offset().top
            }, 100);

            e.preventDefault();
        });
    });

    /*--------------------- Scroll icon on hover mouse animation  -------------------------------- */
    $('.menu').mousemove(function (e) {

        var i = $(".circle"),
            s = e.pageX - i.offset().left,
            o = e.pageY - i.offset().top;

        TweenMax.to($('.circle'), .3, {
            x: (s - i.width() / 2) / i.width() * 50,
            y: (o - i.height() / 2) / i.height() * 50,
            scale: 1.2,
            ease: Power2.easeOut
        })

        TweenMax.to($('.text'), .3, {
            x: (s - i.width() / 2) / i.width() * 80,
            y: (o - i.height() / 2) / i.height() * 80,
            ease: Power2.easeOut
        })

    });

    $('.menu').mouseleave(function (e) {

        var i = $(".circle"),
            s = e.pageX - i.offset().left,
            o = e.pageY - i.offset().top;
        TweenMax.to($('.circle'), .3, {
            x: 0,
            y: 0,
            scale: 1,
            ease: Power2.easeOut
        })

        TweenMax.to($('.text'), .3, {
            x: 0,
            y: 0,
            ease: Power2.easeOut
        })

    });

    /*--------------------- Image tilt animation -------------------------------- */
    $(".ms-card").tilt({
        maxTilt: 15,
        perspective: 1400,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        speed: 1200,
        glare: true,
        maxGlare: 0.2,
        scale: 1.04
    });

    /*--------------------- Blog Slider ---------------------- */
    $('.news-carousel').slick({
        dots: false,
        infinite: true,
        arrows: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1367,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 0,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    /*----------------------------- Client Slider -------------------------------- */
    $('#ms-client-slider').slick({
        rows: 1,
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 2,
                }
            }
        ]
    });

    /*--------------------- On click menu scroll section to section -------------------------------- */
    // Cache selectors
    var lastId,
        topMenu = $("#top-menu, header"),
        topMenuHeight = topMenu.outerHeight() + 0,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });

    /* Back to top */
    $(document).ready(function(){"use strict";
	
		//Scroll back to top
		
		var progressPath = document.querySelector('.progress-wrap path');
		var pathLength = progressPath.getTotalLength();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
		var updateProgress = function () {
			var scroll = $(window).scrollTop();
			var height = $(document).height() - $(window).height();
			var progress = pathLength - (scroll * pathLength / height);
			progressPath.style.strokeDashoffset = progress;
		}
		updateProgress();
		$(window).scroll(updateProgress);	
		var offset = 50;
		var duration = 550;
		jQuery(window).on('scroll', function() {
			if (jQuery(this).scrollTop() > offset) {
				jQuery('.progress-wrap').addClass('active-progress');
			} else {
				jQuery('.progress-wrap').removeClass('active-progress');
			}
		});				
		jQuery('.progress-wrap').on('click', function(event) {
			event.preventDefault();
			jQuery('html, body').animate({scrollTop: 0}, duration);
			return false;
		})
	});

    /*----------------------------- Direct chat --------------------------------*/
  $(document).ready(function () {

    //click event on a tag
    $('.ms-list').on("click", function () {

        var number = $(this).attr("data-number");
        var message = $(this).attr("data-message");

        //checking for device type
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // redirect link for mobile WhatsApp chat awc
            window.open('https://wa.me/' + number + '/?text=' + message, '-blank');
        }
        else {
            // redirect link for WhatsApp chat in website
            window.open('https://web.WhatsApp.com/send?phone=' + number + '&text=' + message, '-blank');
        }
    })

    // chat widget open/close duration
    $('ms-style1').launchBtn({ openDuration: 400, closeDuration: 300 });
  });

  // chat panel open/close function
  $.fn.launchBtn = function (options) {
      var mainBtn, panel, clicks, settings, launchPanelAnim, closePanelAnim, openPanel, boxClick;

      mainBtn = $(".ms-button");
      panel = $(".ms-panel");
      clicks = 0;

      //default settings
      settings = $.extend({
          openDuration: 600,
          closeDuration: 200,
          rotate: true
      }, options);

      //Open panel animation
      launchPanelAnim = function () {
          panel.animate({
              opacity: "toggle",
              height: "toggle"
          }, settings.openDuration);
      };

      //Close panel animation
      closePanelAnim = function () {
          panel.animate({
              opacity: "hide",
              height: "hide"
          }, settings.closeDuration);
      };

      //Open panel and rotate icon
      openPanel = function (e) {
          if (clicks === 0) {
              if (settings.rotate) {
                  $(this).removeClass('rotateBackward').toggleClass('rotateForward');
              }

              launchPanelAnim();
              clicks++;
          } else {
              if (settings.rotate) {
                  $(this).removeClass('rotateForward').toggleClass('rotateBackward');
              }

              closePanelAnim();
              clicks--;
          }
          e.preventDefault();
          return false;
      };

      //Allow clicking in panel
      boxClick = function (e) {
          e.stopPropagation();
      };

      //Main button click
      mainBtn.on('click', openPanel);

      //Prevent closing panel when clicking inside
      panel.click(boxClick);

      //Click away closes panel when clicked in document
      $(document).click(function () {
          closePanelAnim();
          if (clicks === 1) {
              mainBtn.removeClass('rotateForward').toggleClass('rotateBackward');
          }
          clicks = 0;
      });
  };
  
})(jQuery);
