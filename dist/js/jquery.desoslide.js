/*!
* Version 1.2.1
* jQuery: desoSlide plugin - jquery.desoslide.js
* Copyright - 2013 - https://github.com/sylouuu/desoslide
* This source code is under the MIT License
*/
(function($) {
	$.fn.desoSlide = function(options) {

		/**
		* Default values
		*/
		var defaults = {
			main: {
				container: 	false, 		/* Container for the main image */
				cssClass: 	'', 		/* Main image class */
				insertion: 	'append'	/* Wrapper insertion type ("prepend", "append", "replace") */
			},
			auto: {
				load: 		true, 		/* Preloading images */
				start: 		false 		/* Autostarting diaporama */
			},
			first: 			0, 			/* Index of the first image to show */
			interval: 		3000, 		/* Interval between each image */
			effect:  		'fade',		/* Transition effect ("fade", "flip", "light", "roll", "rotate") */
			overlay: 		'always', 	/* How to show overlay ("always", "hover", "none") */
			caption: 		false, 		/* Show caption: data-desoslide-caption attribute required */
			controls: {
				enable: 	true, 		/* Able to control by clicking (prev/pause/play/next) */
				keys: 		true 		/* Able to control by using the keyboard shortcuts (left/right/space) */
			},
			log: {
				errors: 	true, 		/* Log errors in console */
				warnings: 	true 		/* Log warnings in console */
			},
			result: 		false 		/* The slider result ("success", "error", "warning") */
		};

		/**
		* Extend options
		*/
		var p = $.extend(true, defaults, options);

		/**
		* Delay
		*/
		var delay = (function() {
			var timer = 0;
			return function(callback, ms){
				clearTimeout(timer);
				timer = setTimeout(callback, ms);
			};
		})();

		/**
		* Working variables
		*/
		var
			$thumbsContainer = this,
			$thumbs = $('li', $thumbsContainer),
			thumbsCount = $thumbs.length,
			currentImg = p.first,
			imgToShow,
			$overlay = $('.desoSlide-overlay', $(p.main.container)),
			ms = (p.interval < 1500) ? 1500 : p.interval,
			timer = false, aExists, hrefExists,
			src, alt, caption, href,
			$controlsWrapper, effects,
			first_error = false;

		/**
		* Main object plugin
		*/
		var app = {

			/**
			* Function that checks the configuration
			*/
			checks: function() {
				/**
				* If the container does not exist
				*/
				if(!$thumbsContainer.length) {
					app.resultHandler('error', $thumbsContainer.selector +' doesn\'t exist.');
				}

				/**
				* main.container param checks
				*/
				if(!p.main.container) {
					app.resultHandler('error', 'You must specify the "main.container" param. Check out the documentation.');
				} else {
					/**
					* If the container does not exist
					*/
					if(!$(p.main.container).length) {
						app.resultHandler('error', $(p.main.container).selector +' doesn\'t exist.');
					}
				}

				/**
				* Accepted overlay values
				*/
				var overlay_values = ['always', 'hover', 'none'];

				/**
				* overlay param checker
				*/
				if(overlay_values.indexOf(p.overlay) === -1) {
					app.resultHandler('error', 'Bad value for the "overlay" param. Check out the documentation.');
				}

				if(currentImg >= thumbsCount) {
					if(thumbsCount === 0) {
						app.resultHandler('error', 'You must have at least 1 thumbnail.');
					} else {
						app.resultHandler('error', 'The "first" param must be between 0 and '+ (thumbsCount - 1) +'.');
					}
				}
			},

			/**
			* Function that checks the markup
			*/
			checkData: function() {
				/**
				* Captions checks
				*/
				if(p.caption && (typeof caption === 'undefined' || caption == '')) {
					app.resultHandler('warning', 'The captions are enabled and the data-desoslide-caption attribute is missing on a thumb. Add it or disable captions. Check out the documention.');
				}

				/**
				* W3C check
				*/
				if(typeof alt === 'undefined' || alt === '') {
					app.resultHandler('warning', 'The alt attribute is missing on a thumb, it\'s mandatory on <img> tags.');
				}
			},

			/**
			* Function that initiliazes the plugin
			*/
			init: function() {
				/**
				* Auto load images
				*/
				if(p.auto.load) {
					$('a', $thumbs).each(function(i, item) {
						$('<img>', {
							src: item.href,
							alt: ''
						}).hide().appendTo('body');
					});
				}

				app.effectHandler();

				app.addWrapper();
			},

			/**
			* Function that adds the wrapper
			*/
			addWrapper: function() {
				/**
				* The wrapper tag
				*/
				var $wrapper = $('<div>', {
					'class': 'desoSlide-wrapper'
				});

				/**
				* The img tag
				*/
				var $img = $('<img>').addClass(p.main.cssClass).css('opacity', 0);

				/**
				* DOM insertion
				*/
				switch(p.main.insertion) {
					case 'prepend':
						$img.prependTo($(p.main.container)).wrap($wrapper);
					break;
					case 'append':
						$img.appendTo($(p.main.container)).wrap($wrapper);
					break;
					case 'replace':
						$(p.main.container).html($img).wrapInner($wrapper);
					break;
					default:
						app.resultHandler('error', 'Bad value for the "insertion" param. Check out the documentation.');
					break;
				}

				app.displayImg();
			},

			/**
			* Function that handles the effect
			*/
			effectHandler: function() {
				/**
				* Available effects with in/out matches
				*/
				effects = {
					'fade': { /* Default */
						'in': 'fadeIn',
						'out': 'fadeOut'
					},
					'sideFade': {
						'in': 'fadeInLeft',
						'out': 'fadeOutRight'
					},
					'sideFadeBig': {
						'in': 'fadeInLeftBig',
						'out': 'fadeOutRightBig'
					},
					'flip': {
						'in': 'flipInX',
						'out': 'flipOutX'
					},
					'light': {
						'in': 'lightSpeedIn',
						'out': 'lightSpeedOut'
					},
					'roll': {
						'in': 'rollIn',
						'out': 'rollOut'
					},
					'rotate': {
						'in': 'rotateIn',
						'out': 'rotateOut'
					}
				};

				/**
				* Bad effect value
				*/
				if(!(p.effect in effects)) {
					var i = 0;
					$.each(effects, function(key, item) {
						if(i == 0) {
							p.effect = key; /* Get the default effect */
						}
						i++;
					});
					app.resultHandler('error', 'Bad value for the "effect" param. Default value is used. Check out the documentation.');
				}

			},

			/**
			* Function that makes the out image effect
			*/
			outEffect: function() {
				/**
				* Hiding the old one
				*/
				$('img', $(p.main.container)).removeClass('animated '+ effects[p.effect].in).addClass('animated '+ effects[p.effect].out);

				/**
				* Showing the new one
				*/
				setTimeout(function() {
					app.displayImg();
				}, 900);
			},

			/**
			* Function that displays the new image
			*/
			displayImg: function() {
				/**
				* Callback
				*/
				app.resultHandler();

				imgToShow = 0;

				/**
				* Count reset
				*/
				if(currentImg < 0){
					currentImg = thumbsCount - 1;
				}

				/**
				* Count reset
				*/
				if(currentImg >= thumbsCount) {
					currentImg = 0;
				}

				/**
				* Next image
				*/
				imgToShow = currentImg;

				/**
				* Data
				*/
				src 	= $('a', $thumbs).eq(imgToShow).attr('href');
				alt 	= $('img', $thumbs).eq(imgToShow).attr('alt');
				caption = $('img', $thumbs).eq(imgToShow).data('desoslide-caption');
				href 	= $('img', $thumbs).eq(imgToShow).data('desoslide-href');

				/**
				* Checking the data
				*/
				app.checkData();

				$('img', $(p.main.container)).attr({
					'src': src,
					'alt': alt,
					'data-desoslide-caption': caption
				}).one('load', function() {
					/**
					* Showing
					*/
					$(this).removeClass('animated '+ effects[p.effect].out).addClass('animated '+ effects[p.effect].in);

					/**
					* Adding overlay
					*/
					setTimeout(function() {
						app.addOverlay();
					}, 1200);

					/**
					* Starting the loop
					*/
					if(p.auto.start) {
						currentImg++;

						timer = setTimeout(function() {
							app.outEffect();
						}, ms);
					}
				});
			},

			/**
			* Function that adjusts the overlay position
			*/
			addOverlay: function() {
				if(p.overlay !== 'none') {
					if(p.caption || p.controls.enable) {
						var width = 0;
						var height = 0;

						/**
						* Main image position
						*/
						var pos = $('img', $(p.main.container)).position();
						var border = parseInt($('img', $(p.main.container)).css('border-left-width'), 10);

						/**
						* Main image height
						*/
						var w = $('img', $(p.main.container)).width() + border;
						var h = $('img', $(p.main.container)).height() + border;

						if($('.desoSlide-overlay', $(p.main.container)).length == 0) {
							$('<div>', {
								'class': 'desoSlide-overlay'
							}).appendTo($('.desoSlide-wrapper', $(p.main.container)));
						}

						$overlay = $('.desoSlide-overlay', $(p.main.container));

						width = w;

						/**
						* Calculate new height with paddings
						*/
						var paddingTop = parseInt($overlay.css('padding-top').replace('px', ''), 10);
						var paddingBottom = parseInt($overlay.css('padding-bottom').replace('px', ''), 10);
						var paddingLeft = parseInt($overlay.css('padding-left').replace('px', ''), 10);
						var paddingRight = parseInt($overlay.css('padding-right').replace('px', ''), 10);

						var overlayHeight = parseInt($overlay.css('height').replace('px', ''), 10) - (paddingLeft + paddingRight);
						overlayHeight = (parseInt(h, 10) - overlayHeight - (paddingTop + paddingBottom));

						var top = pos.top + overlayHeight;
						var left = pos.left;

						/**
						* Update the overlay position
						*/
						$overlay.css({
							'left': 	left +'px',
							'top': 		top +'px',
							'width': 	width +'px'
						});

						/**
						* Showing the overlay if needed
						*/
						if(p.overlay == 'always') {
							$overlay.animate({
								opacity: 0.7
							}, 500);
						}

						/**
						* Add caption
						*/
						if(p.caption) {
							app.updateCaption();
							app.addLink();
						}

					} else {
						app.addLink();
					}

					/**
					* Add controls
					*/
					if(p.controls.enable) {
						app.addControls();
					}
				}
			},

			/**
			* Function that updates the caption
			*/
			updateCaption: function() {
				$overlay.html(caption);
			},

			/**
			* Function that adds the link on the main image & caption
			*/
			addLink: function() {
				aExists = ($('a.desoslide-link', $(p.main.container)).length > 0) ? true : false;
				hrefExists = (typeof href !== 'undefined' && href != '') ? true : false;

				/**
				* The link tag
				*/
				var $a = $('<a>', {
					'class':	'desoslide-link',
					'href': 	href,
					'target': 	'_blank'
				});

				if(aExists && hrefExists) {
					/**
					* Updating the href
					*/
					$('a.desoslide-link', $(p.main.container)).attr('href', href);
				} else if(aExists && !hrefExists) {
					/**
					* Replacing the <a> tag with this content
					*/
					$('a.desoslide-link', $(p.main.container)).replaceWith($a);
				} else if(!aExists && hrefExists) {
					/**
					* Adding the link tag
					*/
					$('.desoSlide-wrapper', $(p.main.container)).append($a);
				}
			},

			/**
			* Function that adds the controls
			*/
			addControls: function() {
				$('.desoSlide-controls-wrapper', $(p.main.container)).remove();

				/**
				* Controls buttons
				*/
				var $prev	= '<a href="#prev"><span class="desoSlide-controls prev"></span></a>';
				var $pause	= '<a href="#pause"><span class="desoSlide-controls pause"></span></a>';
				var $play	= '<a href="#play"><span class="desoSlide-controls play"></span></a>';
				var $next	= '<a href="#next"><span class="desoSlide-controls next"></span></a>';

				/**
				* The wrapper
				*/
				var $controls = $('<div>', {
					'class': 'desoSlide-controls-wrapper'
				}).append($prev + $pause + $play + $next);

				/**
				* Dynamic positioning
				*/
				$controls.css({
					'width': $overlay.css('width'),
					'left': $overlay.css('left')
				});

				/**
				* Adding the controls wrapper
				*/
				if($('a.desoslide-link', $(p.main.container)).length > 0) {
					$controls.appendTo($('a.desoslide-link', $(p.main.container)));
				} else {
					$controls.appendTo($('.desoSlide-wrapper', $(p.main.container)));
				}

				$controlsWrapper = $('.desoSlide-controls-wrapper', $(p.main.container));

				/**
				* Triggering "play" if autostart
				*/
				if(p.auto.start) {
					$('a[href="#play"]', $controlsWrapper).hide().parent().find('a[href="#pause"]').show();
				} else {
					$('a[href="#pause"]', $controlsWrapper).hide().parent().find('a[href="#play"]').show();
				}
			},

			/**
			* Function that pauses the diaporama
			*/
			pause: function() {
				if(p.auto.start && timer) {
					p.auto.start = false;

					clearTimeout(timer);
					currentImg--;

					$('a[href="#pause"]', $controlsWrapper).hide().parent().find('a[href="#play"]').show();
				}
			},

			/**
			* Function that plays the diaporama
			*/
			play: function() {
				if(!p.auto.start) {
					p.auto.start = true;

					if(imgToShow == currentImg) {
						currentImg++;
					}

					app.outEffect();

					$('a[href="#play"]', $controlsWrapper).hide().parent().find('a[href="#pause"]').show();
				}
			},

			/**
			* Function that handles the plugin "result"
			*/
			resultHandler: function(type, msg) {
				/**
				* It's not the first error
				*/
				if(!first_error) {
					/**
					* Depending on the result
					*/
					switch(type) {
						case 'error':
							/**
							* Logging
							*/
							if(p.log.errors && typeof console !== 'undefined') {
								console.error('desoSlide: '+ msg);
							}

							if(p.result) {
								p.result('error');
							}

							first_error = type;
						break;
						case 'warning':
							/**
							* Logging
							*/
							if(p.log.warnings && typeof console !== 'undefined') {
								console.warn('desoSlide: '+ msg);
							}

							if(p.result) {
								p.result('warning');
							}
						break;
						default:
							if(p.result) {
								p.result('success');
							}
						break;
					}
				}
			},

			/**
			* Function that handles the plugin events
			*/
			events: function() {

				/**
				* Clicking on thumbnail
				*/
				$('a', $thumbs).on('click', function(e) {
					e.preventDefault();
					var $this = $(this);

					/**
					* If the clicked image is not already displayed
					*/
					if($this.parent('li').index() !== currentImg) {
						/**
						* Hiding the overlay
						*/
						$overlay.animate({ opacity: 0 });

						/**
						* Setting the current image index
						*/
						currentImg = $this.parent('li').index();

						/**
						* Calling the displayer
						*/
						app.outEffect();

						/**
						* Pausing
						*/
						app.pause();
					}
				});

				/**
				* Hover on thumb
				*/
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

				/**
				* Hover on overlay
				*/
				if(p.overlay === 'hover') {
					$(p.main.container).on({
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

				if(p.controls.enable && p.controls.keys) {
					/**
					* Keys binder
					*/
					$(document).on('keydown', function(e){
						switch(e.which) {
							case 37: /* Left arrow */
								$(p.main.container).trigger('prev.desoslide');
							break;
							case 39: /* Right arrow */
								$(p.main.container).trigger('next.desoslide');
							break;
							case 32: /* Space */
								e.preventDefault();
								(!p.auto.start) ? $(p.main.container).trigger('play.desoslide') : $(p.main.container).trigger('pause.desoslide');
							break;
						}
					});
				}

				/**
				* Click on control
				*/
				$(p.main.container).on('click', '.desoSlide-controls-wrapper a', $(p.main.container), function(e) {
					e.preventDefault();

					switch($(this).attr('href')) {
						case '#prev':
							$(p.main.container).trigger('prev.desoslide');
						break;
						case '#pause':
							$(p.main.container).trigger('pause.desoslide');
						break;
						case '#play':
							$(p.main.container).trigger('play.desoslide');
						break;
						case '#next':
							$(p.main.container).trigger('next.desoslide');
						break;
					}
				});

				/**
				* On previous
				*/
				$(p.main.container).on('prev.desoslide', function() {
					app.pause();
					currentImg--;
					app.outEffect();
				});

				/**
				* On pause
				*/
				$(p.main.container).on('pause.desoslide', function() {
					app.pause();
				});

				/**
				* On play
				*/
				$(p.main.container).on('play.desoslide', function() {
					app.play();
				});

				/**
				* On next
				*/
				$(p.main.container).on('next.desoslide', function() {
					app.pause();
					currentImg++;
					app.outEffect();
				});

				/**
				* New overlay position when resizing
				*/
				$(window).bind('resize', function() {
					if(p.caption && app.resultHandler.selector == $thumbsContainer.selector) {
						delay(function(){
							app.addOverlay();
						}, 100);
					}
				});
			}

		};

		/**
		* All images are loaded
		*/
		$(window).load(function() {
			/**
			* Initializing
			*/
			app.checks();
			app.init();
			app.events();
		});

		return this;

	};
})(jQuery);
