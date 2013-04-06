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

		returnValue = this;
		var $thumbsContainer = this;
		var $thumbs = $('li', $thumbsContainer);
		var thumbsCount = $thumbs.length;
		var currentImg = p.imgFirst;
		var $overlay = $('.desoSlide_overlay', $(p.mainImage));
		var captionInfo;

		// *****************
		// [END] Variables
		// *****************
		
		var app = {
		
			// *****************
			// [BEGIN] Checks
			// *****************
			
			checks: function() {
				// if the container does not exist
				if($thumbsContainer.length == 0) {
					app.displayError($thumbsContainer.selector +' doesn\'t exist.');
				}
				
				// mainImage param checks
				if(!p.mainImage) {
					app.displayError('You must specify the "mainImage" param. Check out the documentation.');
				} else {
					// if the container does not exist
					if($(p.mainImage).length == 0) {
						app.displayError($(p.mainImage).selector +' doesn\'t exist.');
					}
				}
				
				// displayCaption param checker
				if(p.displayCaption != 'always' && p.displayCaption != 'hover') {
					app.displayError('Bad value for the "displayCaption" param. Check out the documentation.');
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
					href = $('img', $thumbs).eq(currentImg).data('href');
					// console.log($('img', $(p.mainImage)).selector +' : '+ captionInfo);
					
					// captions checks
					if(!p.disableCaption && (typeof captionInfo === 'undefined' || captionInfo == '')) {
						app.displayWarning('The captions are enabled and the data-caption attribute is missing on a thumb. Add it or disable captions. Check out the documention.');
					}
					
					// W3C check
					if(typeof alt === 'undefined' || alt == '') {
						app.displayWarning('The alt attribute is missing on a thumb, it\'s mandatory on <img> tags.');
					}
					
					// the img tag
					$img = $('<img>', {
						'src'			: src,
						'alt'			: alt,
						'data-caption'	: captionInfo
					});
					
					// the wrapper tag
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
							app.displayError('Bad value for the "insertion" param. Check out the documentation.');
						break;
					}

					
					if(!p.disableCaption) {
						$('img', $(p.mainImage)).one('load', function() {
							app.calculateCaptionPosition(captionInfo, href);
						}).each(function() {
							if(this.complete) $(this).load();
						});
					} else {
						app.addLink(href);
					}

				} else {
					if(thumbsCount == 0) {
						app.displayError('You must have at least 1 thumbnail.');
					} else {
						app.displayError('The "imgFirst" param must be between 0 and '+ (thumbsCount - 1) +'.');
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
						app.displayImg($this.attr('href'), $('img', $this).attr('alt'), $('img', $this).data('caption'), $('img', $this).data('href'));
						
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
					if(!p.disableCaption && returnValue.selector == $thumbsContainer.selector) {
						app.calculateCaptionPosition(captionInfo, href);
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
			calculateCaptionPosition: function(info, href) {
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
				
				app.addLink(href);
			
			},
			
			// displaying the new image
			displayImg: function(src, alt, info, href) {
				var self = this;
				$('img', $(p.mainImage)).stop().animate({
					opacity: 0
				}, 400, function() {
					$(this).attr({
						'src': src,
						'alt': alt,
						'data-caption': info
					}).load(function() {
						$(this).stop().animate({
							opacity: 1
						}, 400, function() {
							if(!p.disableCaption) {
								app.calculateCaptionPosition(info, href);
							}	else {
								app.addLink(href);
							}
						});
					});
				})
			},
			
			addLink: function(href) {
				var aExists = ($('a', $(p.mainImage)).length > 0) ? true : false;
				var hrefExists = (typeof href !== 'undefined' && href != '') ? true : false;

				// the <a> tag
				var $a = $('<a>', {
					'href'			: href,
					'target'		: '_blank'
				});
				
				if(aExists && hrefExists) {
					// update the href
					$('img', $(p.mainImage)).parent('a').attr('href', href);
				} else if(aExists && !hrefExists) {
					 // replace the <a> tag with this content
					var content = $('a', $(p.mainImage)).contents();
					$('a', $(p.mainImage)).replaceWith(content);
				} else if(!aExists && hrefExists) {
					// adding the <a> tag
					var content = $('.desoSlide_wrapper', $(p.mainImage)).contents();
					$a.appendTo($('.desoSlide_wrapper', $(p.mainImage))).html(content);
				}				
			},
			
			// displaying warning message in the console
			displayWarning: function(msg) {
				// if warnings are enable
				if(p.displayWarnings && typeof console !== 'undefined') {
					console.warn('desoSlide: '+ msg);
				}
				returnValue = false;
			},	
			
			// displaying error message in the console
			displayError: function(msg) {
				if(p.displayErrors && typeof console !== 'undefined') {
					console.error('desoSlide: '+ msg);
				}
				returnValue = false;
			}
			
			// *****************
			// [END] Functions
			// *****************
			
		};
		
		// initializing
		app.checks();
		app.creating();
		app.events();

		return returnValue;
    };
})(jQuery);