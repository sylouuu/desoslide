/*
jQuery: desoSlide plugin v1.1 - jquery.desoslide.js
Copyright - 2013 - S.V.
This source code is under the MIT License
contact@chez-syl.fr
*/
(function($) {
    $.fn.desoSlide = function(options) {
	
		// default values
		var defaults = {
			mainImage: false,
			insertion: 'append',
			imgFirst: 0,
			interval: 3000
		};
        
		// extend options
		var p = $.extend(defaults, options); 
		
		// *****************
		// [BEGIN] variables
		// *****************

		var $desoSlide = this;
		var $thumbs = $('li', $desoSlide);
		var thumbsCount = $thumbs.length;
		var imgKey = p.imgFirst;
		
		// *****************
		// [END] variables
		// *****************
	
		// creating the main image
		if(imgKey < thumbsCount) {
			var $img = $('<img>', {
				'src'		: $('a', $thumbs).eq(imgKey).attr('href'),
				'alt'		: $('img', $thumbs).eq(imgKey).attr('alt'),
				'data-info'	: $('img', $thumbs).eq(imgKey).data('info')
			});
			
			switch(p.insertion) {
				case 'prepend':
					$img.prependTo($(p.mainImage));
				break;
				case 'append':
					$img.appendTo($(p.mainImage));
				break;
				case 'replace':
					$(p.mainImage).html($img);
				break;
				default:
					displayError('Bad value for the "insertion" param. Check out the documentation.');
				break;
			}
			
		} else {
			displayError('The imgFirst param must be between 0 and '+ thumbsCount);
		}
		
		// ***********************
		// [BEGIN] events handlers
		// ***********************

		// clicking on thumbnail
		$('a', $thumbs).on('click', function(e) {
			e.preventDefault();
			var $this = $(this);
			
			// new image
			var href = $this.attr('href');
			var alt = $('img', $this).attr('alt');
			var info = $('img', $this).data('info');
			
			// call the displayer
			displayImg(href, alt, info);
		});
		
		// hover on thumbnail
		$('img', $thumbs).on({
			mouseover: function() {
				$(this).stop(true, true).animate({
					opacity: 0.7
				}, 'normal');
			},
			mouseout: function() {
				$(this).stop(true, true).animate({
					opacity: 1
				}, 'fast');
			}
		});
		
		// ***********************
		// [END] events handlers
		// ***********************

	   	// *****************
		// [BEGIN] functions
		// *****************

		// displaying the new image
		function displayImg(href, alt, info) {
			$(p.mainImage +' img').fadeOut('slow', function() {
				$(this).attr({
					'src': href,
					'alt': alt,
					'data-info': info
				}).fadeIn('slow', function() {
					// calculate(info);
				});
			});
						
			// next image
			imgKey++;
		}
		
		// displaying error message in the console
		function displayError(msg) {
			console.error('desoSlide: '+ msg);
		}
		
	   	// *****************
		// [END] functions
		// *****************

		return this;
    };
})(jQuery);