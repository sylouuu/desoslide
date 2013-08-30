/*
Version 1.0.3
jQuery: desoSlide plugin - jquery.desoslide.js
Copyright - 2013 - https://github.com/sylouuu/desoslide
This source code is under the MIT License
*/
(function($) {
    $.fn.desoSlide = function(options) {

		/* Default values */
		var defaults = {
			mainImage: false, /* Main image selector */
			mainImageClass: 'img-responsive', /* Main image class */
			insertion: 'append', /* Wrapper insertion type */
			autoLoad: true, /* Preloading images */
			autoStart: false, /* Autostarting diaporama */
			firstImg: 0, /* Index of the first image to show */
			enableCaption: true, /* Show caption: data-caption required */
			displayCaption: 'always', /* Type of show (caption) 'always' or 'hover' */
			enableControls: true, /* Able to control (prev/pause/play/next) */
			enableControlsKeys: true, /* Able to control the slider by using the keyboard shortcuts (left/up/down/right/space) */
			interval: 3000, /* Interval between each image */
			displayWarnings: true, /* Show warnings in console */
			displayErrors: true, /* Show errors in console */
			callback: false /* The slider result ("success", "error" or "warning") */
		};

		/* Extend options */
		var p = $.extend(defaults, options);

		// *****************
		// [BEGIN] Variables
		// *****************

		var delay = (function(){
			var timer = 0;
			return function(callback, ms){
				clearTimeout (timer);
				timer = setTimeout(callback, ms);
			};
		})();

		var $thumbsContainer = this,
		$thumbs = $('li', $thumbsContainer),
		thumbsCount = $thumbs.length,
		currentImg = p.firstImg,
		imgToShow,
		$overlay = $('.desoSlide-overlay', $(p.mainImage)),
		ms = (p.interval < 1500) ? 1500 : p.interval,
		timer = false, aExists, hrefExists,
		src, alt, caption, href,
		$controlsWrapper;

		// *****************
		// [END] Variables
		// *****************

		var app = {

			// *****************
			// [BEGIN] Checks
			// *****************

			checks: function() {
				/* If the container does not exist */
				if($thumbsContainer.length == 0) {
					app.resultHandler('error', $thumbsContainer.selector +' doesn\'t exist.');
				}

				/* mainImage param checks */
				if(!p.mainImage) {
					app.resultHandler('error', 'You must specify the "mainImage" param. Check out the documentation.');
				} else {
					/* iIf the container does not exist */
					if($(p.mainImage).length == 0) {
						app.resultHandler('error', $(p.mainImage).selector +' doesn\'t exist.');
					}
				}

				/* displayCaption param checker */
				if(p.displayCaption != 'always' && p.displayCaption != 'hover') {
					app.resultHandler('error', 'Bad value for the "displayCaption" param. Check out the documentation.');
				}

				if(currentImg >= thumbsCount) {
					if(thumbsCount == 0) {
						app.resultHandler('error', 'You must have at least 1 thumbnail.');
					} else {
						app.resultHandler('error', 'The "firstImg" param must be between 0 and '+ (thumbsCount - 1) +'.');
					}
				}
			},

			checkData: function() {
				/* Captions checks */
				if(p.enableCaption && (typeof caption === 'undefined' || caption == '')) {
					app.resultHandler('warning', 'The captions are enabled and the data-caption attribute is missing on a thumb. Add it or disable captions. Check out the documention.');
				}

				/* W3C check */
				if(typeof alt === 'undefined' || alt == '') {
					app.resultHandler('warning', 'The alt attribute is missing on a thumb, it\'s mandatory on <img> tags.');
				}
			},

			// *****************
			// [END] Checks
			// *****************

			// *****************
			// [BEGIN] Init
			// *****************

			init: function() {

				/* Auto load images */
				if(p.autoLoad) {
					$('a', $thumbs).each(function(i, item) {
						$('<img>', {
							src: item.href,
							alt: ''
						}).hide().appendTo('body');
					});
				}

				app.addWrapper();
			},

			// *****************
			// [END] Init
			// *****************

			// *****************
			// [BEGIN] Functions
			// *****************

			/* Adding the wrapper */
			addWrapper: function() {
				/* The wrapper tag */
				var $wrapper = $('<div>', {
					'class': 'desoSlide-wrapper'
				});

				/* The img tag */
				var $img = $('<img>').addClass(p.mainImageClass).css('opacity', 0);
				// var $img = $('<img>').addClass(p.mainImageClass).hide();

				/* DOM insertion */
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
						app.resultHandler('error', 'Bad value for the "insertion" param. Check out the documentation.');
					break;
				}

				app.displayImg();
			},

			/* Making the out image effect */
			outEffect: function() {
				/* Hiding the old one */
				$('img', $(p.mainImage)).removeClass('animated fadeInRight').addClass('animated fadeOutLeft');

				/* Showing the new one */
				setTimeout(function() {
					app.displayImg();
				}, 500);
			},

			/* Displaying the new image */
			displayImg: function() {
				/* Callback */
				app.resultHandler();

				imgToShow = 0;

				/* Count reset */
				if(currentImg < 0){
					currentImg = thumbsCount - 1;
				}

				/* Count reset */
				if(currentImg >= thumbsCount) {
					currentImg = 0;
				}

				/* Next image */
				imgToShow = currentImg;

				/* Data */
				src 	= $('a', $thumbs).eq(imgToShow).attr('href');
				alt 	= $('img', $thumbs).eq(imgToShow).attr('alt');
				caption = $('img', $thumbs).eq(imgToShow).data('caption');
				href 	= $('img', $thumbs).eq(imgToShow).data('href');

				/* Checking the data */
				app.checkData();

				$('img', $(p.mainImage)).attr({
					'src': src,
					'alt': alt,
					'data-caption': caption
				}).one('load', function() {

					/* Showing */
					$(this).removeClass('animated fadeOutLeft').addClass('animated fadeInRight');

					/* Adding overlay */
					setTimeout(function() {
						app.addOverlay();
					}, 500);

					/* Starting the loop */
					if(p.autoStart) {
						currentImg++;

						timer = setTimeout(function() {
							app.outEffect();
						}, ms);
					}
				});
			},

			/* Adjusting the caption position */
			addOverlay: function() {
				if(p.enableCaption || p.enableControls) {
					var width = 0;
					var height = 0;

					/* Main image position */
					var pos = $('img', $(p.mainImage)).position();
					var border = parseInt($('img', $(p.mainImage)).css('border-left-width'), 10);

					/* Main image height */
					var w = $('img', $(p.mainImage)).width() + border;
					var h = $('img', $(p.mainImage)).height() + border;

					if($('.desoSlide-overlay', $(p.mainImage)).length == 0) {
						$('<div>', {
						'class': 'desoSlide-overlay'
						}).appendTo($('.desoSlide-wrapper', $(p.mainImage)));
					}

					$overlay = $('.desoSlide-overlay', $(p.mainImage));

					width = w;

					/* Calculate new height with paddings */
					var paddingTop = parseInt($overlay.css('padding-top').replace('px', ''), 10);
					var paddingBottom = parseInt($overlay.css('padding-bottom').replace('px', ''), 10);
					var paddingLeft = parseInt($overlay.css('padding-left').replace('px', ''), 10);
					var paddingRight = parseInt($overlay.css('padding-right').replace('px', ''), 10);

					var overlayHeight = parseInt($overlay.css('height').replace('px', ''), 10) - (paddingLeft + paddingRight);
					overlayHeight = (parseInt(h, 10) - overlayHeight - (paddingTop + paddingBottom));

					var top = pos.top + overlayHeight;
					var left = pos.left;

					/* Update the caption */
					$overlay.css({
						'left': left +'px',
						'top': top +'px',
						'width': width +'px'
					});

					/* Showing the overlay if needed */
					if(p.displayCaption == 'always') {
						$overlay.animate({
							opacity: 0.7
						}, 500);
					}

					/* Add caption */
					if(p.enableCaption) {
						app.updateCaption();
					}

					app.addLink();
				} else {
					app.addLink();
				}

			},

			/* Updating the caption */
			updateCaption: function() {
				$overlay.html(caption);
			},

			/* Adding the link on the main image & caption */
			addLink: function() {
				aExists = ($('a.desoslide-link', $(p.mainImage)).length > 0) ? true : false;
				hrefExists = (typeof href !== 'undefined' && href != '') ? true : false;

				/* The link tag */
				var $a = $('<a>', {
					'class':	'desoslide-link',
					'href'		: href,
					'target'	: '_blank'
				});

				if(aExists && hrefExists) {
					/* Update the href */
					$('img', $(p.mainImage)).parent('a').attr('href', href);
				} else if(aExists && !hrefExists) {
					/* Replace the <a> tag with this content */
					var content = $('a.desoslide-link', $(p.mainImage)).contents();
					$('a.desoslide-link', $(p.mainImage)).replaceWith(content);
				} else if(!aExists && hrefExists) {
					/* Adding the link tag */
					var content = $('.desoSlide-wrapper', $(p.mainImage)).contents();
					$a.appendTo($('.desoSlide-wrapper', $(p.mainImage))).html(content);
				}

				/* Add controls */
				if(p.enableControls) {
					app.addControls();
				}

			},

			/* Add controls */
			addControls: function() {
				$('.desoSlide-controls-wrapper', $(p.mainImage)).remove();

				/* Controls buttons */
				var $prev	= '<a href="#prev"><span class="desoSlide-controls prev"></span></a>';
				var $pause	= '<a href="#pause"><span class="desoSlide-controls pause"></span></a>';
				var $play	= '<a href="#play"><span class="desoSlide-controls play"></span></a>';
				var $next	= '<a href="#next"><span class="desoSlide-controls next"></span></a>';

				/* The wrapper */
				var $controls = $('<div>', {
					'class': 'desoSlide-controls-wrapper'
				}).append($prev + $pause + $play + $next);

				/* Dynamic positioning */
				$controls.css({
					'width': $overlay.css('width'),
					'left': $overlay.css('left')
				});

				/* Adding the controls wrapper */
				if($('a.desoslide-link', $(p.mainImage)).length > 0) {
					$controls.appendTo($('a.desoslide-link', $(p.mainImage)));
				} else {
					$controls.appendTo($('.desoSlide-wrapper', $(p.mainImage)));
				}

				$controlsWrapper = $('.desoSlide-controls-wrapper', $(p.mainImage));

				if(p.autoStart) {
					$('a[href="#play"]', $controlsWrapper).hide().parent().find('a[href="#pause"]').show();
				} else {
					$('a[href="#pause"]', $controlsWrapper).hide().parent().find('a[href="#play"]').show();
				}
			},

			pause: function() {
				if(p.autoStart && timer) {
					p.autoStart = false;

					clearTimeout(timer);
					currentImg--;

					$('a[href="#pause"]', $controlsWrapper).hide().parent().find('a[href="#play"]').show();
				}
			},

			play: function() {
				if(!p.autoStart) {
					p.autoStart = true;

					if(imgToShow == currentImg) {
						currentImg++;
					}

					app.outEffect();

					$('a[href="#play"]', $controlsWrapper).hide().parent().find('a[href="#pause"]').show();
				}
			},

			resultHandler: function(type, msg) {
				switch(type) {
					case 'error':
						if(p.displayErrors && typeof console !== 'undefined') {
							console.error('desoSlide: '+ msg);
						}

						if(p.callback) {
							p.callback('error');
						}
					break;
					case 'warning':
						if(p.displayWarnings && typeof console !== 'undefined') {
							console.warn('desoSlide: '+ msg);
						}

						if(p.callback) {
							p.callback('warning');
						}
					break;
					default:
						if(p.callback) {
							p.callback('success');
						}
					break;
				}
			},

			// *****************
			// [END] Functions
			// *****************

			// ***********************
			// [BEGIN] Events handlers
			// ***********************

			events: function() {

				/* Clicking on thumbnail */
				$('a', $thumbs).on('click', function(e) {
					e.preventDefault();
					var $this = $(this);

					/* If the clicked image is not already displayed */
					if($this.parent('li').index() !== currentImg) {
						/* Hiding the caption */
						$overlay.animate({ opacity: 0 });

						/* Set the current image index */
						currentImg = $this.parent('li').index();

						/* Call the displayer */
						app.outEffect();

						app.pause();
					}
				});

				/* Hover on thumb */
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

				/* Hover on caption */
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

				if(p.enableControls && p.enableControlsKeys) {
					/* Keys binder */
					$(document).on('keydown', function(e){
						switch(e.which) {
							case 37: /* Left arrow */
								$(p.mainImage).trigger('prev.desoslide');
							break;
							case 39: /* Right arrow */
								$(p.mainImage).trigger('next.desoslide');
							break;
							case 32: /* Space */
								e.preventDefault();
								(!p.autoStart) ? $(p.mainImage).trigger('play.desoslide') : $(p.mainImage).trigger('pause.desoslide');
							break;
						}
					});
				}

				/* Click on control */
				$(p.mainImage).on('click', '.desoSlide-controls-wrapper a', $(p.mainImage), function(e) {
					e.preventDefault();

					switch($(this).attr('href')) {
						case '#prev':
							$(p.mainImage).trigger('prev.desoslide');
						break;
						case '#pause':
							$(p.mainImage).trigger('pause.desoslide');
						break;
						case '#play':
							$(p.mainImage).trigger('play.desoslide');
						break;
						case '#next':
							$(p.mainImage).trigger('next.desoslide');
						break;
					}
				});

				/* On prev */
				$(p.mainImage).on('prev.desoslide', function() {
					app.pause();
					currentImg--;
					app.outEffect();
				});

				/* On pause */
				$(p.mainImage).on('pause.desoslide', function() {
					app.pause();
				});

				/* On play */
				$(p.mainImage).on('play.desoslide', function() {
					app.play();
				});

				/* On next */
				$(p.mainImage).on('next.desoslide', function() {
					app.pause();
					currentImg++;
					app.outEffect();
				});

				/* New caption position when resizing */
				$(window).bind('resize', function() {
					if(p.enableCaption && app.resultHandler.selector == $thumbsContainer.selector) {
						delay(function(){
							app.addOverlay();
						}, 100);
					}
				});

			},

			// ***********************
			// [END] Events handlers
			// ***********************

		};

		/* All images are loaded */
		$(window).load(function() {
			/* Initializing */
			app.checks();
			app.init();
			app.events();
		});

		return this;

    };
})(jQuery);
