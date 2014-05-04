/*!
* Version 2.0.0-rc1
* jQuery: desoSlide plugin
* Copyright - 2014 - https://github.com/sylouuu/desoslide
* This source code is under the MIT License
*/

/*jslint browser: true, nomen: true, devel: true, plusplus: true, unparam: true, vars: true, white: true*/
/*global $, jQuery*/
(function($, window, document, undefined) {

    'use strict';

    var plugin_name = 'desoSlide',
    // Default options
    defaults = {
        thumbs:             null,               // Any selector with `<a>` as a target
        imageClass:         'img-responsive',   // Image class(es)
        auto: {
            load:           true,               // Preloading images
            start:          false               // Autostarting slideshow
        },
        first:              0,                  // Index of the first image to show
        interval:           3000,               // Interval between each images
        effect: {
            provider:       'animate',          // Effect provider ('animate', 'magic')
            name:           'fade'              // Transition effect ('fade', 'sideFade', 'sideFadeBig', 'flip', 'light', 'roll', 'rotate', 'foolish', 'swash', 'tin', 'puff', 'twister', 'random')
        },
        overlay:            'always',           // How to show overlay ('always', 'hover', 'none')
        controls: {
            show:           true,               // Shows the player controls (prev/pause/play/next)
            keys:           false               // Able to control by using the keyboard shortcuts (left/space/right)
        },
        events: {
            onThumbClick:   null,               // On thumb click
            onImageShow:    null,               // On image show
            onImageShown:   null,               // On image shown
            onImageHide:    null,               // On image hide
            onImageHidden:  null,               // On image hidden
            onImageClick:   null,               // On image click
            onPrev:         null,               // On previous
            onPause:        null,               // On pause
            onPlay:         null,               // On play
            onNext:         null,               // On next
            onError:        null,               // On error
            onWarning:      null,               // On warning
            onSuccess:      null                // On success
        }
    };

    // The actual plugin constructor
    function Plugin (element, options) {
        this.elem = element;

        // Extending options
        this.options    = $.extend(true, {}, defaults, options);

        this._defaults  = defaults;
        this._name      = plugin_name;
        this._namespace = plugin_name.toLowerCase();

        // Properties
        this.props = {
            thumbs: [],

            effect: {
                provider:   null,
                name:       null,

                list: {
                    animate: {
                        css: 'animated',

                        fade: {
                            in:   'fadeIn', // Default
                            out:  'fadeOut'
                        },
                        sideFade: {
                            in:   'fadeInLeft',
                            out:  'fadeOutRight'
                        },
                        sideFadeBig: {
                            in:   'fadeInLeftBig',
                            out:  'fadeOutRightBig'
                        },
                        flip: {
                            in:   'flipInX',
                            out:  'flipOutX'
                        },
                        light: {
                            in:   'lightSpeedIn',
                            out:  'lightSpeedOut'
                        },
                        roll: {
                            in:   'rollIn',
                            out:  'rollOut'
                        },
                        rotate: {
                            in:   'rotateIn',
                            out:  'rotateOut'
                        }
                    },
                    magic: {
                        css: 'magictime',

                        foolish: {
                            in:   'foolishIn',
                            out:  'foolishOut'
                        },
                        swash: {
                            in:   'swashIn',
                            out:  'swashOut'
                        },
                        tin: {
                            in:   'tinLeftIn',
                            out:  'tinRightOut'
                        },
                        puff: {
                            in:   'puffIn',
                            out:  'puffOut'
                        },
                        twister: {
                            in:   'twisterInDown',
                            out:  'holeOut'
                        }
                    }
                }
            },

            img: {
                $overlay:   null,
                to_show:    this.options.first,
                timer:      null
            },

            controls: {
                $wrapper:   null
            },

            plugin_status:  null
        };

        // Start the work
        this._init();
    }

    Plugin.prototype = {

        /**
        * Initialize the plugin
        */
        _init: function () {
            var self = this;

            // Thumbs checks
            if (this.options.thumbs === null) {
                this._errorHandler('error', 'The `thumbs` option doesn\'t exist.');
            } else {
                if ($(this.options.thumbs).length === 0) {
                    this._errorHandler('error', 'The `thumbs` selector ('+ $(this.options.thumbs).selector +') doesn\'t exist.');
                }
            }

            // Overlay check
            var overlay_values = ['always', 'hover', 'none'];

            if (overlay_values.indexOf(this.options.overlay) === -1) {
                this._errorHandler('error', 'Incorrect value for the `overlay` option. Default value is used.');

                // Default value
                this.options.overlay = this._defaults.overlay;
            }

            // Looping thumbs anchors
            $(this.options.thumbs).each(function(i, item) {
                // Has `href`
                if ($(item).attr('href') !== undefined) {
                    // Has `img` child
                    if ($(item).find('img').length) {
                        // Building thumbs array
                        self.props.thumbs.push({
                            src:            $(item).attr('href'),
                            alt:            $(item).find('img').attr('alt') || null,
                            caption_title:  $(item).find('img').data(self._namespace +'-caption-title') || null,
                            caption_link:   $(item).find('img').data(self._namespace +'-caption-link')  || null
                        });

                        if ($(item).find('img').attr('alt') === undefined) {
                            self._errorHandler('warning', 'The `alt` attribute is missing on the '+ i +'-indexed thumb, it\'s mandatory on <img> tags.');
                        }

                        $(item).attr('data-'+ self._namespace +'-index', i);
                    } else {
                        self._errorHandler('error', 'Your link on the '+ i +'-indexed thumb must have an <img> tag as a child.');
                    }
                } else {
                    self._errorHandler('error', 'The `href` attribute is missing on the '+ i +'-indexed thumb, it\'s mandatory on <a> tags.');
                }
            });

            // `first` check
            if (this.options.first >= this.props.thumbs.length) {
                this._errorHandler('error', 'The `first` option must be between 0 and '+ (this.props.thumbs.length - 1) +'. Default value is used.');

                // Default value
                this.options.first      = this._defaults.first;
                this.props.img.to_show  = this._defaults.first;
            }

            // Preload the target images
            self._imagesLoading();

            // Add the wrapper
            self._addWrapper();

            // Set the effect
            self.setEffect({
                provider:   self.options.effect.provider,
                name:       self.options.effect.name
            });

            if (this.props.thumbs[this.props.img.to_show] !== undefined) {
                // Show the first image
                self._showImage();
            }

            // Set the events
            self._events();
        },

        // Public methods
        // ----------------------------------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------------------------------

        /**
        * Rebuild
        *
        * @return object $(this.elem)
        */
        rebuild: function () {
            this.init();

            return $(this.elem);
        },

        /**
        * Get thumbs data
        *
        * @param number index
        * @return object|null response
        */
        getThumbs: function (index) {
            var response;
            if (index !== undefined) {
                if (this._isThumbExists(index) === true) {
                    response = this.props.thumbs[index];
                } else {
                    response = null;
                }
            } else {
                response = this.props.thumbs;
            }

            return response;
        },

        /**
        * Set the effect
        *
        * @param object effect
        * @return object response
        */
        setEffect: function (effect) {
            var response = {
                provider:   null,
                name:       null
            };

            if (effect !== undefined && effect.provider !== null && effect.name !== null) {
                if (!this.props.effect.list.hasOwnProperty(effect.provider)) {
                    response.provider = this._defaults.effect.provider;
                    response.name     = this._defaults.effect.name;

                    this._errorHandler('error', 'Incorrect value for the `effect.provider` option. Default value is used.');
                } else {
                    // Random effect asked for a specific provider
                    if (effect.name === 'random') {
                        // Get a random effect
                        response.provider = effect.provider;
                        response.name     = this.getRandomEffect(effect.provider);
                    } else {
                        if (!this.props.effect.list[effect.provider].hasOwnProperty(effect.name)) {
                            response.provider = this._defaults.effect.provider;
                            response.name     = this._defaults.effect.name;

                            this._errorHandler('error', 'Incorrect value for the `effect.name` option. Default value is used.');
                        } else {
                            response.provider = effect.provider;
                            response.name     = effect.name;
                        }
                    }
                }
            } else {
                response.provider = this._defaults.effect.provider;
                response.name     = this._defaults.effect.name;

                this._errorHandler('error', 'Incorrect values for `effect.provider` and `effect.name` option. Default value is used.');
            }

            this.props.effect.provider  = response.provider;
            this.props.effect.name      = response.name;

            return response;
        },

        /**
        * Pause
        *
        * @return object $(this.elem)
        */
        pause: function () {
            if ($(this.options.thumbs).length > 1) {
                if (this.options.auto.start === true && this.props.img.timer) {
                    this.options.auto.start = false;

                    this._stopAnimation();

                    clearTimeout(this.props.img.timer);

                    if (this.props.controls.$wrapper) {
                        this.props.controls.$wrapper.find('a[href="#pause"]').hide().parent().find('a[href="#play"]').show();
                    }

                    // Callback
                    if (this.options.events.onPause) {
                        this.options.events.onPause();
                    }
                }

                // Trigger event
                $(this.elem).trigger('pause.'+ this._namespace);
            }

            return $(this.elem);
        },

        /**
        * Play
        *
        * @return object $(this.elem)
        */
        play: function () {
            if ($(this.options.thumbs).length > 1) {
                if (this.options.auto.start === false) {
                    this.options.auto.start = true;

                    this.goNext(true);

                    if (this.props.controls.$wrapper) {
                        this.props.controls.$wrapper.find('a[href="#play"]').hide().parent().find('a[href="#pause"]').show();
                    }
                }

                // Callback
                if (this.options.events.onPlay) {
                    this.options.events.onPlay();
                }

                // Trigger event
                $(this.elem).trigger('play.'+ this._namespace);
            }

            return $(this.elem);
        },

        /**
        * Previous
        *
        * @param bool from_script
        * @return object $(this.elem)
        */
        goPrev: function (from_script) {
            if ($(this.options.thumbs).length > 1) {
                var self = this;

                if (!from_script && this.options.auto.start === true) {
                    // Pausing
                    this.pause();
                }

                // Decrementing index
                this.props.img.to_show--;

                if (this.props.img.to_show < 0){
                    // Taking the last index
                    this.props.img.to_show = $(this.options.thumbs).length - 1;
                }

                this._hideImage(function() {
                    self._showImage();
                });

                // Callback
                if (this.options.events.onPrev) {
                    this.options.events.onPrev();
                }

                // Trigger event
                $(this.elem).trigger('prev.'+ this._namespace);
            }

            return $(this.elem);
        },

        /**
        * Next
        *
        * @param bool from_script
        * @return object $(this.elem)
        */
        goNext: function (from_script) {
            if ($(this.options.thumbs).length > 1) {
                var self = this;

                if (!from_script && this.options.auto.start === true) {
                    // Pausing
                    this.pause();
                }

                // Incrementing index
                this.props.img.to_show++;

                if (this.props.img.to_show >= $(this.options.thumbs).length) {
                    // Taking the first index
                    this.props.img.to_show = 0;
                }

                this._hideImage(function() {
                    self._showImage();
                });

                // Callback
                if (this.options.events.onNext) {
                    this.options.events.onNext();
                }

                // Trigger event
                $(this.elem).trigger('next.'+ this._namespace);
            }

            return $(this.elem);
        },

        /**
        * Go to a specific index
        *
        * @param number index
        * @return object $(this.elem)
        */
        goTo: function (index) {
            if ($(this.options.thumbs).length > 1 && this._isThumbExists(index) === true) {
                var self = this;

                if (this.options.auto.start === true) {
                    this.pause();
                }

                if (index !== this.props.img.to_show) {
                    this._stopAnimation();

                    // Hiding the overlay
                    if (this.props.img.$overlay !== null) {
                        this.props.img.$overlay.animate({ opacity: 0 });
                    }

                    self.props.img.to_show = index;

                    this._hideImage(function() {
                        self._showImage();
                    });
                }
            }

            return $(this.elem);
        },

        // Private methods
        // ----------------------------------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------------------------------

        /**
        * Is thumb exists
        *
        * @param number index
        * @return bool response
        */
        _isThumbExists: function (index) {
            var response;

            if (typeof index === 'number') {
                if (this.props.thumbs[index] !== undefined) {
                    response = true;
                } else {
                    this._errorHandler('error', 'The '+ index +'-indexed thumb doesn\'t exist.');

                    response = false;
                }
            }

            return response;
        },

        /**
        * Load images
        */
        _imagesLoading: function () {
            if (this.options.auto.load === true) {

                $.each(this.props.thumbs, function(i, item) {
                    $('<img>', {
                        src: item.src,
                        alt: item.alt
                    }).hide().appendTo('body');
                });
            }
        },

        /**
        * Add wrapper
        */
        _addWrapper: function () {
            var $img = $('<img>').attr('alt', this._name).addClass(this.options.imageClass).css('opacity', 0);

            $(this.elem).html($img).wrapInner($('<div>', {
                'class': this._namespace +'-wrapper'
            }));
        },

        /**
        * Remove the effect classes
        */
        _clearEffectClass: function () {
            var self = this, key, key2;

            if ($(this.elem).find('img:first').attr('class') !== undefined) {
                // Retrieve CSS classes
                var classes = $(this.elem).find('img:first').attr('class').split(/\s+/);

                // Remove the namespace class an the in/out
                for (key in self.props.effect.list) {
                    if (self.props.effect.list.hasOwnProperty(key)) {
                        for (key2 in self.props.effect.list[key]) {
                            if (self.props.effect.list[key].hasOwnProperty(key2)) {
                                if (classes.indexOf(self.props.effect.list[key][key2]) !== -1) {
                                    $(this.elem).find('img:first').removeClass(self.props.effect.list[key][key2]);
                                }

                                if (self.props.effect.list[key][key2].in) {
                                    if (classes.indexOf(self.props.effect.list[key][key2].in) !== -1) {
                                        $(this.elem).find('img:first').removeClass(self.props.effect.list[key][key2].in);
                                    }
                                }

                                if (self.props.effect.list[key][key2].out) {
                                    if (classes.indexOf(self.props.effect.list[key][key2].out) !== -1) {
                                        $(this.elem).find('img:first').removeClass(self.props.effect.list[key][key2].out);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },

        /**
        * Get a random effect for a specific provider
        *
        * @param string provider
        * @return strin random
        */
        getRandomEffect: function (provider) {
            var random, count = 0, prop;

            for(prop in this.props.effect.list[provider]) {
                if (this.props.effect.list[provider].hasOwnProperty(prop) && prop !== 'css') {
                    if (Math.random() < 1 / ++count) {
                        random = prop;
                    }
                }
            }

            return random;
        },

        /**
        * Show image
        */
        _showImage: function () {
            var self = this;

            if (this.props.plugin_status === null) {
                // Success
                this._errorHandler();
            }

            if (self.options.events.onImageShow) {
                self.options.events.onImageShow($(self.elem).find('img:first'));
            }

            $(this.elem).find('img:first')
                .attr('src', this.props.thumbs[this.props.img.to_show].src)
                .attr('alt', this.props.thumbs[this.props.img.to_show].alt)

                // Image loaded
                .one('load', function() {

                    // Showing
                    $(this)
                        // Removing the `out` class
                        .removeClass(self.props.effect.list[self.props.effect.provider].css +' '+ self.props.effect.list[self.props.effect.provider][self.props.effect.name].out)

                        // Adding the `in` class
                        .addClass(self.props.effect.list[self.props.effect.provider].css +' '+ self.props.effect.list[self.props.effect.provider][self.props.effect.name].in)

                        // Animation done
                        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                            // Adding overlay
                            self._addOverlay();

                            if (self.options.events.onImageShown) {
                                self.options.events.onImageShown($(self.elem).find('img:first'));
                            }
                        });

                    // Starting the loop
                    if (self.options.auto.start === true) {
                        self.props.img.timer = setTimeout(function() {
                            self.goNext(true);
                        }, (self.options.interval < 1500) ? 1500 : self.options.interval);
                    }
                });
        },

        /**
        * Hide image
        *
        * @param function callback
        */
        _hideImage: function (callback) {
            var self = this;

            this._clearEffectClass();

            if (self.options.events.onImageHide) {
                self.options.events.onImageHide($(self.elem).find('img:first'));
            }

            /**
            * Hiding the old one
            */
            $(this.elem).find('img:first')
                // Removing the `in` class
                .removeClass(this.props.effect.list[this.props.effect.provider].css +' '+ this.props.effect.list[this.props.effect.provider][this.props.effect.name].in)

                // Adding the `out` class
                .addClass(this.props.effect.list[this.props.effect.provider].css +' '+ this.props.effect.list[this.props.effect.provider][this.props.effect.name].out)

                // Animation done
                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    if (self.options.events.onImageHidden) {
                        self.options.events.onImageHidden($(self.elem).find('img:first'));
                    }

                    if (callback) {
                        callback();
                    }
                });
        },

        /**
        * Add overlay
        */
        _addOverlay: function () {
            // Overlay needed
            if (this.options.overlay !== 'none') {
                // Main image position
                var pos = $(this.elem).find('img').position();
                var border = parseInt($(this.elem).find('img').css('border-left-width'), 10);

                // Main image height
                var width_plus_border = $(this.elem).find('img').width() + border;
                var height_plus_border = $(this.elem).find('img').height() + border;

                if ($(this.elem).find('.'+ this._namespace +'-overlay').length === 0) {
                    $('<div>', {
                        'class': this._namespace +'-overlay'
                    }).appendTo($(this.elem).find('.'+ this._namespace +'-wrapper'));
                }

                this.props.img.$overlay = $(this.elem).find('.'+ this._namespace +'-overlay');

                // Calculate new height with paddings
                var
                    paddingTop      = parseInt(this.props.img.$overlay.css('padding-top').replace('px', ''), 10),
                    paddingBottom   = parseInt(this.props.img.$overlay.css('padding-bottom').replace('px', ''), 10),
                    paddingLeft     = parseInt(this.props.img.$overlay.css('padding-left').replace('px', ''), 10),
                    paddingRight    = parseInt(this.props.img.$overlay.css('padding-right').replace('px', ''), 10);

                var overlayHeight = parseInt(this.props.img.$overlay.css('height').replace('px', ''), 10) - (paddingLeft + paddingRight);
                overlayHeight = (parseInt(height_plus_border, 10) - overlayHeight - (paddingTop + paddingBottom));

                var
                    top = pos.top + overlayHeight,
                    left = pos.left;

                // Update the overlay position
                this.props.img.$overlay.css({
                    'left':  left +'px',
                    'top':   top +'px',
                    'width': width_plus_border +'px'
                });

                // Showing the overlay if needed
                if (this.options.overlay === 'always') {
                    this.props.img.$overlay.animate({
                        opacity: 0.7
                    }, 500);
                }

                this._captionManagement();

                if (this.options.controls.show === true) {
                    this._addControls();
                }
            }
        },

        /**
        * Add controls
        */
        _addControls: function () {
            // Removing the existing controls wrapper
            $(this.elem).find('.'+ this._namespace +'-controls-wrapper').remove();

            // Controls buttons
            var
                $prev   = '<a class="'+ this._namespace +'-controls prev" href="#prev"></a>',
                $pause  = '<a class="'+ this._namespace +'-controls pause" href="#pause"></a>',
                $play   = '<a class="'+ this._namespace +'-controls play" href="#play"></a>',
                $next   = '<a class="'+ this._namespace +'-controls next" href="#next"></a>';

            // Controls wrapper
            var $controls = $('<div>', {
                'class': this._namespace +'-controls-wrapper'
            }).append($prev + $pause + $play + $next);

            // Adding the controls wrapper
            if (this.props.img.$overlay.find('a:first').length > 0) {
                $controls.appendTo(this.props.img.$overlay.find('a:first'));
            } else {
                $controls.appendTo(this.props.img.$overlay);
            }

            this.props.controls.$wrapper = $(this.elem).find('.'+ this._namespace +'-controls-wrapper');

            if (this.props.controls.$wrapper.length) {
                // Showing the right button
                if (this.options.auto.start) {
                    this.props.controls.$wrapper.find('a[href="#play"]').hide().parent().find('a[href="#pause"]').show();
                } else {
                    this.props.controls.$wrapper.find('a[href="#pause"]').hide().parent().find('a[href="#play"]').show();
                }
            }
        },

        /**
        * Caption management
        */
        _captionManagement: function () {
            if (this.props.thumbs[this.props.img.to_show].caption_title !== null) {
                this.props.img.$overlay.html('<span class="'+ this._namespace +'-caption-title">'+ this.props.thumbs[this.props.img.to_show].caption_title +'</span>');

                var anchor_exists   = (this.props.img.$overlay.find('a:first').length > 0) ? true : false;
                var href_exists     = (this.props.thumbs[this.props.img.to_show].caption_link !== null) ? true : false;

                // Anchor tag
                var anchor = '<a href="'+ this.props.thumbs[this.props.img.to_show].caption_link +'" target="_blank"></a>';

                if (anchor_exists === true && href_exists === true) {
                    // Updating the href
                    this.props.img.$overlay.find('a:first').attr('href', this.props.thumbs[this.props.img.to_show].caption_link);
                } else {
                    // Anchor already exists but no caption title to show
                    if (anchor_exists === true && href_exists === false) {
                        var
                            $link = this.props.img.$overlay.find('a:first'),
                            $clone = $link.children().clone(),
                            $parent = $link.parent();

                            $link.remove();
                            $clone.appendTo($parent);

                            // Removing existing caption title
                            this.props.img.$overlay.find('span:first').empty();
                    } else {
                        if (anchor_exists === false && href_exists === true) {
                            // Wrapping the caption
                            $(this.elem).find('.'+ this._namespace +'-overlay span:first').wrap(anchor);
                        }
                    }
                }
            }
        },

        /**
        * Stop the current animation
        */
        _stopAnimation: function () {
            $(this.elem).stop();
        },

        /**
        * Events management
        */
        _events: function () {
            var self = this;

            // Clicking on thumbnail
            $(this.options.thumbs).on('click', function(e) {
                e.preventDefault();

                self.goTo($(this).data(self._namespace +'-index'));

                // Callback
                if (self.options.events.onThumbClick) {
                    self.options.events.onThumbClick();
                }
            });

            // Click on image
            $(this.elem).find('img:first').on('click', function(e) {
                e.preventDefault();

                // Callback
                if (self.options.events.onImageClick) {
                    self.options.events.onImageClick();
                }
            });

            // Click on control
            $(this.elem).on('click', '.'+ this._namespace  +'-controls-wrapper a', $(this.elem), function(e) {
                e.preventDefault();

                switch($(this).attr('href')) {
                    case '#prev':
                        self.goPrev();
                    break;
                    case '#pause':
                        self.pause();
                    break;
                    case '#play':
                        self.play();
                    break;
                    case '#next':
                        self.goNext();
                    break;
                }
            });

            // Hover on overlay
            $(this.elem).find('.'+ this._namespace +'-wrapper').on({
                mouseover: function() {
                    if (self.options.overlay === 'hover' && self.props.img.$overlay !== null) {
                        self.props.img.$overlay.stop().animate({
                            opacity: 0.7
                        }, 400);
                    }
                },
                mouseleave: function() {
                    if (self.options.overlay === 'hover' && self.props.img.$overlay !== null) {
                        self.props.img.$overlay.stop().animate({
                            opacity: 0
                        }, 400);
                    }
                }
            });

            if (this.options.controls.keys === true) {
                // Keys binder
                $(document).on('keydown', function(e) {
                    switch(e.which) {
                        case 37: // Left arrow
                            self.goPrev();
                        break;
                        case 39: // Right arrow
                            self.goNext();
                        break;
                        case 32: // Space
                            e.preventDefault();

                            if (self.options.auto.start === true) {
                                self.pause();
                            } else {
                                self.play();
                            }
                        break;
                    }
                });
            }

            var delay = (function() {
                var timer = 0;
                return function(callback, ms){
                    clearTimeout(timer);
                    timer = setTimeout(callback, ms);
                };
            }());

            // New overlay position when resizing
            if (this.options.overlay !== 'none') {
                $(window).bind('resize', function() {
                    delay(function() {
                        self._addOverlay();
                    }, 100);
                });
            }
        },

        /**
        * Error handler
        *
        * @param string type
        * @param string msg
        */
        _errorHandler: function(type, msg) {
            switch(type) {
                case 'error':
                    if (console !== undefined) {
                        console.error(this._name +': '+ msg +' Check out the documentation.');
                    }

                    if (this.options.events.onError) {
                        this.options.events.onError();
                    }

                    this.props.plugin_status = type;
                break;
                case 'warning':
                    if (console !== undefined) {
                        console.warn(this._name +': '+ msg);
                    }

                    if (this.options.events.onWarning) {
                        this.options.events.onWarning();
                    }

                    this.props.plugin_status = type;
                break;
                default:
                    if (this.options.events.onSuccess) {
                        this.options.events.onSuccess();
                    }

                    this.props.plugin_status = type;
                break;
            }
        }
    };

    $.fn[plugin_name] = function (options) {
        var args = arguments, instance, response;

        if (options === undefined || typeof options === 'object') {
            // Create a plugin instance for each selected element
            response = this.each(function() {
                if (!$.data(this, 'plugin_' + plugin_name)) {
                    $.data(this, 'plugin_' + plugin_name, new Plugin(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_') {
            // Break the chainability and call a public method
            instance = $.data(this[0], 'plugin_' + plugin_name);

            if (instance[options] !== undefined) {
                response = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
            }
        } else {
            // Invoke the speficied method on each selected element and preserve the chainability
            response = this.each(function() {
                instance = $.data(this, 'plugin_' + plugin_name);

                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });
        }

        return response;
    };

}(jQuery, window, document));
