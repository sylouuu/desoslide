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
			displayWarnings: true,
			displayErrors: true
		};

		// extend options
		var p = $.extend(defaults, options); 
		
		// *****************
		// [BEGIN] Variables
		// *****************

		return_value = this;
		var $thumbsContainer = this;
		var $thumbs = $('li', $thumbsContainer);
		var thumbsCount = $thumbs.length;
		var currentImg = p.imgFirst;
		var $overlay = $('.desoSlide_overlay', $(p.mainImage));
		var captionInfo;

		// *****************
		// [END] Variables
		// *****************
		
		var obj = {
		
			// *****************
			// [BEGIN] Checks
			// *****************
			
			checks: function() {
				// if the container does not exist
				if($thumbsContainer.length == 0) {
					obj.displayError($thumbsContainer.selector +' doesn\'t exist.');
					return false;
				}
				
				// mainImage param checks
				if(!p.mainImage) {
					obj.displayError('You must specify the "mainImage" param. Check out the documentation.');
					return false;
				} else {
					// if the container does not exist
					if($(p.mainImage).length == 0) {
						obj.displayError($(p.mainImage).selector +' doesn\'t exist.');
						return false;
					}
				}
				
				// displayCaption param checker
				if(p.displayCaption != 'always' && p.displayCaption != 'hover') {
					obj.displayError('Bad value for the "displayCaption" param. Check out the documentation.');
					return false;
				}
			},
			
			// *****************
			// [BEGIN] Checks
			// *****************
			
			// *****************
			// [BEGIN] Creating
			// *****************
			
			creating: function() {
				// creating the main image
				if(currentImg < thumbsCount) {
					// data
					src = $('a', $thumbs).eq(currentImg).attr('href');
					alt = $('img', $thumbs).eq(currentImg).attr('alt');
					captionInfo = $('img', $thumbs).eq(currentImg).data('caption');
					// console.log($('img', $(p.mainImage)).selector +' : '+ captionInfo);
					
					// captions checks
					if(!p.disableCaption && (typeof captionInfo === 'undefined' || captionInfo == '')) {
						obj.displayWarning('The captions are enabled and the data-caption attribute is missing on a thumb. Add it or disable captions. Check out the documention.');
						return false;
					}
					
					// W3C check
					if(typeof alt === 'undefined' || alt == '') {
						obj.displayWarning('The alt attribute is missing on a thumb, it\'s mandatory on <img> tags.');
						return false;
					}
					
					// the img tag
					$img = $('<img>', {
						'src'			: src,
						'alt'			: alt,
						'data-caption'	: captionInfo
					});
					
					$wrapper = $('<div>', {
						'class': 'desoSlide_wrapper'
					});
					
					// DOM insertion
					switch(p.insertion) {
						case 'prepend':
							$img.prependTo($(p.mainImage)).wrap($wrapper);
						break;
						case 'append':
							$img.appendTo($(p.mainImage)).wrap($wrapper);
						break;
						case 'replace':
							$(p.mainImage).html($img).wrapInner($wrapper);
						break;
						default:
							obj.displayError('Bad value for the "insertion" param. Check out the documentation.');
							return false;
						break;
					}

					if(!p.disableCaption) {
						$('img', $(p.mainImage)).one('load', function() {
							obj.calculateCaptionPosition(captionInfo);
						}).each(function() {
							if(this.complete) $(this).load();
						});
					}
				} else {
					if(thumbsCount == 0) {
						obj.displayError('You must have at least 1 thumbnail.');
						return false;
					} else {
						obj.displayError('The "imgFirst" param must be between 0 and '+ (thumbsCount - 1) +'.');
						return false;
					}
				}
			},
			
			// *****************
			// [END] Creating
			// *****************
			
			// ***********************
			// [BEGIN] Events handlers
			// ***********************

			events: function() {
				
				// clicking on thumbnail
				$('a', $thumbs).on('click', function(e) {
					e.preventDefault();
					var $this = $(this);
					
					// if the clicked image is not already displayed
					if($this.parent('li').index() !== currentImg) {
						// hiding the caption
						$overlay.animate({ opacity: 0 });
						
						// call the displayer
						obj.displayImg($this.attr('href'), $('img', $this).attr('alt'), $('img', $this).data('caption'));
						
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
							$overlay.stop().animate({
								opacity: 0.7
							}, 400);
						},
						mouseleave: function() {
							$overlay.stop().animate({
								opacity: 0
							}, 400);
						}
					});
				}
				
				// new caption position when resizing
				$(window).resize(function() {
					if(!p.disableCaption && return_value) {
						obj.calculateCaptionPosition(captionInfo);
					}
				});
				
			},
			
			// ***********************
			// [END] Events handlers
			// ***********************

			// *****************
			// [BEGIN] Functions
			// *****************
			
			// adjust the caption position
			calculateCaptionPosition: function(info) {
				var width = 0;
				var height = 0;
				
				// main image position
				var pos = $('img', $(p.mainImage)).position();
				
				// main image height
				var w = $('img', $(p.mainImage)).width();
				var h = $('img', $(p.mainImage)).height();
				

				if($('.desoSlide_overlay', $(p.mainImage)).length == 0) {
					$('<div>', {
					'class': 'desoSlide_overlay'
					}).appendTo($('.desoSlide_wrapper', $(p.mainImage)));
				}
				
				$overlay = $('.desoSlide_overlay', $(p.mainImage));

				// overwrite the caption
				$overlay.html(info);
				
				// calculate new width with padding-left
				var paddingLeft = parseInt($overlay.css('padding-left').replace('px', ''));
				var paddingRight = parseInt($overlay.css('padding-right').replace('px', ''));
				width = w - (paddingLeft + paddingRight);

				// calculate new height with padding-top
				var paddingTop = parseInt($overlay.css('padding-top').replace('px', ''));
				var paddingBottom = parseInt($overlay.css('padding-bottom').replace('px', ''));

				// calculate top & left
				var top = pos.top + (parseInt(h) - parseInt($overlay.height()) - (paddingTop + paddingBottom));
				var left = pos.left;
				
				// console.log($(p.mainImage).selector +' '+ width +' '+ left +' '+ top);
				
				// update the caption
				$overlay.css({
					'left': left +'px',
					'top': top +'px',
					'width': width +'px'
				});
				
				if(p.displayCaption == 'always') {
					$overlay.animate({
						opacity: 0.7
					});
				}
			
			},
			
			// displaying the new image
			displayImg: function(href, alt, info) {
				var self = this;
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
								obj.calculateCaptionPosition(info);
							}					
						});
					});
				})
			},
			
			// displaying warning message in the console
			displayWarning: function(msg) {
				// if warnings are enable
				if(p.displayWarnings && typeof console !== 'undefined') {
					console.warn('desoSlide: '+ msg);
				}
				return_value = false;
			},	
			
			// displaying error message in the console
			displayError: function(msg) {
				if(p.displayErrors && typeof console !== 'undefined') {
					console.error('desoSlide: '+ msg);
				}
				return_value = false;
			}
			
			// *****************
			// [END] Functions
			// *****************
			
		};
		
		// initializing
		obj.checks();
		obj.creating();
		obj.events();

		return return_value;
    };
})(jQuery);