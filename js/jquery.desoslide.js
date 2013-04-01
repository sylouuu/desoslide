/*
jQuery: desoSlide plugin v1.1 - jquery.desoslide.js
Copyright - 2013 - S.V.
This source code is under the GNU General Public License
contact@chez-syl.fr
*/
(function($) {
    $.fn.desoSlide = function(options) {
	
		// default values
		var defaults = {
			autoStart: false,
			imgFirst: 0,
			interval: 3000,
			imgClicked: false,
			hideControl: false,
			playBtnLabel: 'Play',
			stopBtnLabel: 'Stop'
		};
        
		// extend options
		var p = $.extend(defaults, options); 
		
		// *****************
		// [BEGIN] variables
		// *****************
		
		var $desoSlide = this;
		var $mainImgInfo = $('#desoSlide_mainImageInfo');
		var $main = $('#desoSlide_mainImage');
		var $mainImg = $('img', $main);
		var $caption = $('#desoSlide_caption');
		var $control = $('#desoSlide_control');
		var $thumbs = $('.desoSlide_thumbs', $desoSlide);
		var ms = (p.interval < 1500) ? 1500 : p.interval;
		var imgToswitchImg = p.imgFirst;
		var timer;
		
		// *****************
		// [END] variables
		// *****************
		
		
		function createMarkup() {
		
			if(!p.hideControl) {
				$desoSlide.prepend('<div id="desoSlide_control"></div>');
			}

			$desoSlide.prepend('<div id="desoSlide_mainImageInfo"><div id="desoSlide_mainImage"></div><div id="desoSlide_caption"></div></div>');
			
		};
		
		createMarkup();
		
		
		// custom the caption
		$caption.css({
			'opacity': 0.5,
			'border-radius': '5px'
		});
		
		// display the default image
		var href = $('li:eq('+imgToswitchImg+') a', $thumbs).attr('href');
		var alt = $('li:eq('+imgToswitchImg+') a', $thumbs).children('img').attr('alt');
		var info = $('li:eq('+imgToswitchImg+') a', $thumbs).children('img').data('info');

		console.log(href +' '+ alt +' '+ info);
		console.log($main);
		
		// create the main image tag
		$('<img />', {
			'src': href,
			'alt': alt,
			'data-info': info
		}).appendTo($main);

		// add the timer
		$('<a>', {
			'id': 'desoSlide_timer',
			'href': '#',
			'data-behaviour': 'play',
			'html': p.playBtnLabel
		}).appendTo($control);
		
		// auto
		if(p.autoStart) {
			$('#desoSlide_timer').data('behaviour', 'stop').html(p.stopBtnLabel);
			switchImg();
		} else {
			imgToswitchImg++;
		}

		calculate(info);

		// ***********************
		// [BEGIN] events handlers
		// ***********************
		
		// hover for caption
		$mainImgInfo.on({
			mouseover: function() {
				$caption.fadeIn();
			},
			mouseleave: function() {
				$caption.fadeOut();
			}
		}, $desoSlide);
		
		// hover on thumbs
		$('li img', $thumbs).on({
			mouseover: function() {
				$(this).animate({
					opacity: 0.5
				}, 'normal');
			},
			mouseout: function() {
				$(this).animate({
					opacity: 1
				}, 'normal');
			}
		});
		
		// thumb click
		$('li a', $thumbs).on('click', function() {
			if(!p.autoStart) {
				var $this = $(this);
				
				// new image
				var href = $this.attr('href');
				var alt = $this.children('img').attr('alt');
				var info = $this.children('img').data('info');			
				
				// call the displayer
				displayImg(href, alt, info);
			}
			return false;
		});
		
		// play/stop
		$desoSlide.on('click', '#desoSlide_timer', function() {
			var bh = $(this).data('behaviour');
			if(bh == 'stop') {
				$(this).data('behaviour', 'play').html(p.playBtnLabel);
				p.autoStart = false;
				clearTimeout(timer);
			} else {
				$(this).data('behaviour', 'stop').html(p.stopBtnLabel);
				p.autoStart = true;
				switchImg();
			}
			return false;
		});
		
		// callback on click
		$('#desoSlide_mainImage img').on('click', function() {
			if(p.imgClicked) {
				p.imgClicked($(this).attr('alt'));
			}
		});
		
		// ***********************
		// [END] events handlers
		// ***********************
		
	   	// *****************
		// [BEGIN] functions
		// *****************
		
		// calculate de new text position
		function calculate(info) {
			var $mainImg = $('#desoSlide_mainImage img');

			var width = 0;
			var height = 0;
			// main image position
			var pos = $main.position();
			// main image height
			$main.height($mainImg.height());
			var h = $mainImg.height();
			var w = $mainImg.width();
				console.log($caption.css());
		
			// calculate new width with padding-left
			var paddingLeft = $caption.css('padding-left').replace('px', '');
			width = w - paddingLeft;

			// calculate new height with padding-top
			var paddingTop = $caption.css('padding-top').replace('px', '');
			height = $caption.height();
			
			// calculate top & left
			var top = pos.top + (parseInt(h) - parseInt($caption.height()) - paddingTop);
			var left = pos.left;
			
			// update the caption
			$caption.css({
				'left': left +'px',
				'top': top +'px',
				'width': width +'px',
				'height': height +'px'
			});

			$caption.text(info);
		}

		// switch image
		function switchImg() {
			var imgCount = $('li a', $thumbs).length;
			
			// count reset 
			if(imgToswitchImg == imgCount || imgToswitchImg > imgCount-1) {
				imgToswitchImg = 0;
			}
		
			// new image
			var href = $('li:eq('+imgToswitchImg+') a', $thumbs).attr('href');
			var alt = $('li:eq('+imgToswitchImg+') a', $thumbs).children('img').attr('alt');
			var info = $('li:eq('+imgToswitchImg+') a', $thumbs).children('img').data('info');

			// call the displayer
			displayImg(href, alt, info);
		}
		
		// display the new image
		function displayImg(href, alt, info) {
			$('#desoSlide_mainImage img').fadeOut('slow', function() {
				$(this).attr({
					'src': href,
					'alt': alt,
					'data-info': info
				}).fadeIn('slow', function() {
					calculate(info);
				});
			});
						
			// next image
			imgToswitchImg++;
			
			// start the loop
			if(p.autoStart) {
				timer = setTimeout(function() {
					switchImg();
				}, ms);
			}
		}
		
	   	// *****************
		// [END] functions
		// *****************
	   
		return this;
    };
})(jQuery);