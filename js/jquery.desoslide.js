/*
Version Alpha
jQuery: desoSlide plugin - jquery.desoslide.js
Copyright - 2013 - https://github.com/sylouuu/desoslide
This source code is under the MIT License
*/
(function($) {
    $.fn.desoSlide = function(options) {
	
		// default values
		var defaults = {
			mainImage: false,
			insertion: 'append',
			imgFirst: 0,
			disableCaption: false,
			displayCaption: 'always',
			displayWarning: true
		};

		// extend options
		var p = $.extend(defaults, options); 
		
		// *****************
		// [BEGIN] variables
		// *****************

		var $thumbsContainer = this;
		var $thumbs = $('li', $thumbsContainer);
		var thumbsCount = $thumbs.length;
		var currentImg = p.imgFirst;
		var src, alt, info;
		
		// *****************
		// [END] variables
		// *****************
		
		// mainImage param checks
		if(!p.mainImage) {
			displayError('You must specify the "mainImage" param. Check out the documentation.');
			return false;
		} else {
			// if the container does not exist
			if($(p.mainImage).length == 0) {
				displayError($(p.mainImage).selector +' doesn\'t exist.');
				return false;
			}
		}
		
		// if the container does not exist
		if($thumbsContainer.length == 0) {
			displayError($thumbsContainer.selector +' doesn\'t exist.');
			return false;
		}
		
		// displayCaption param checker
		if(p.displayCaption != 'always' && p.displayCaption != 'hover') {
			displayError('Bad value for the "displayCaption" param. Check out the documentation.');
			return false;
		}
		
		// creating the main image
		if(currentImg < thumbsCount) {
			// data
			src = $('a', $thumbs).eq(currentImg).attr('href');
			alt = $('img', $thumbs).eq(currentImg).attr('alt'),
			captionInfo = $('img', $thumbs).eq(currentImg).data('caption')
			
			// captions checks
			if(!p.disableCaption && captionInfo == '') {
				displayWarning('The captions are enabled and the data-caption attribute is missing on a thumb. Add it or disable captions. Check out the documention.');
			}
			
			// W3C check
			if(alt == '') {
				displayWarning('The alt attribute is missing on a thumb, it is mandatory on <img> tags.');
			}
			
			// the img tag
			$img = $('<img>', {
				'src'			: src,
				'alt'			: alt,
				'data-caption'	: captionInfo
			});
			
			// DOM insertion
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
					return false;
				break;
			}
		} else {
			displayError('The "imgFirst" param must be between 0 and '+ thumbsCount +'.');
			return false;
		}
		
		// ***********************
		// [BEGIN] events handlers
		// ***********************
		
		// create the caption
		if(!p.disableCaption) {
			$(p.mainImage +' img').one('load', function() {
				calculateCaptionPosition(captionInfo);
			});
		}
		
		// clicking on thumbnail
		$('a', $thumbs).on('click', function(e) {
			e.preventDefault();
			var $this = $(this);
			
			// if the clicked image is not already displayed
			if($this.parent('li').index() !== currentImg) {
				// hiding the caption
				$('.desoSlide_caption', $(p.mainImage)).animate({ opacity: 0 });
				
				// call the displayer
				displayImg($this.attr('href'), $('img', $this).attr('alt'), $('img', $this).data('caption'));
				
				// set the current image index
				currentImg = $this.parent('li').index();
			}
		});
		
		// hover on thumb
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
		
		// hover on caption
		if(p.displayCaption == 'hover') {
			$(p.mainImage).on({
				mouseover: function() {
					$('.desoSlide_caption', $(p.mainImage)).stop().animate({
						opacity: 0.5
					}, 400);
				},
				mouseleave: function() {
					$('.desoSlide_caption', $(p.mainImage)).stop().animate({
						opacity: 0
					}, 400);
				}
			});
		}
		
		// new caption position when resizing
		$(window).resize(function() {
			if(!p.disableCaption) {
				calculateCaptionPosition(captionInfo);
			}
		});
		
		// ***********************
		// [END] events handlers
		// ***********************

	   	// *****************
		// [BEGIN] functions
		// *****************

		// adjust the caption position
		function calculateCaptionPosition(info) {
			// console.log($(p.mainImage +' img').selector);
			var width = 0;
			var height = 0;
			
			// main image position
			var pos = $(p.mainImage +' img').position();
			
			// main image height
			var w = $(p.mainImage +' img').width();
			var h = $(p.mainImage +' img').height();
			
			$caption = $('<div>', {
				'class': 'desoSlide_caption'
			});
			
			if($('.desoSlide_caption', $(p.mainImage)).length == 0) {
				$caption.appendTo($(p.mainImage));
				// console.log('caption created ' +$img.selector);
			}
			
			// overwrite the caption
			$('.desoSlide_caption', $(p.mainImage)).html(info);
			
			// calculate new width with padding-left
			var paddingLeft = parseInt($('.desoSlide_caption', $(p.mainImage)).css('padding-left').replace('px', ''));
			var paddingRight = parseInt($('.desoSlide_caption', $(p.mainImage)).css('padding-right').replace('px', ''));
			width = w - (paddingLeft + paddingRight);

			// calculate new height with padding-top
			var paddingTop = parseInt($('.desoSlide_caption', $(p.mainImage)).css('padding-top').replace('px', ''));
			var paddingBottom = parseInt($('.desoSlide_caption', $(p.mainImage)).css('padding-bottom').replace('px', ''));

			// calculate top & left
			var top = pos.top + (parseInt(h) - parseInt($('.desoSlide_caption', $(p.mainImage)).height()) - (paddingTop + paddingBottom));
			var left = pos.left;
			
			// console.log($(p.mainImage).selector +' '+ width +' '+ left +' '+ top);
			
			// update the caption
			$('.desoSlide_caption', $(p.mainImage)).css({
				'left': left +'px',
				'top': top +'px',
				'width': width +'px'
			});
			
			if(p.displayCaption == 'always') {
				$('.desoSlide_caption', $(p.mainImage)).animate({
					opacity: 0.5
				});
			}
			
		}
		
		// displaying the new image
		function displayImg(href, alt, info) {
			$('img', $(p.mainImage)).stop().animate({
				opacity: 0
			}, 400, function() {
				$(this).attr({
					'src': href,
					'alt': alt,
					'data-caption': info
				}).load(function() {
					$(this).stop().animate({
						opacity: 1
					}, 400, function() {
						if(!p.disableCaption) {
							calculateCaptionPosition(info);
						}					
					});
				});
			})
		}
		
		// displaying warning message in the console
		function displayWarning(msg) {
			// if warnings are enable
			if(p.displayWarning && typeof console !== 'undefined') {
				console.warn('desoSlide: '+ msg);
			}
		}
		
		// displaying error message in the console
		function displayError(msg) {
			if(typeof console !== 'undefined') {
				console.error('desoSlide: '+ msg);
			}
		}
		
	   	// *****************
		// [END] functions
		// *****************
		return this;
    };
})(jQuery);