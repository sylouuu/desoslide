(function ($, window, document, undefined) {

    'use strict';

    var plugin_name = 'desoSlide',
        // Default options
        defaults    = {
            // An anchors (`<a>`) collection
            thumbs: null,

            // What event to capture on thumbnail ('click', 'mouseover')
            thumbEvent: 'click',

            // Image class(es)
            imageClass: 'img-responsive',

            auto: {
                // Pre-loading images
                load: true,

                // Auto-starting slideshow
                start: false
            },

            // Index of the first image to show
            first: 0,

            // Interval between each images
            interval: 3000,

            effect: {
                // Effect provider ('animate', 'magic')
                provider: 'animate',

                // Transition effect
                // 'animate': 'bounce', 'fade', 'flipX', 'flipY', 'fun', 'light', 'roll', 'rotate', 'rotateBig', 'sideFade', 'sideFadeBig', 'slide', 'random'
                // 'magic': 'foolish', 'perspective', 'puff', 'swap', 'swash', 'tin', 'twister', 'random'
                name: 'fade'
            },

            // How to show overlay ('always', 'hover', 'none')
            overlay: 'always',

            controls: {
                // Shows the player controls (prev/pause/play/next)
                show: true,

                // Able to control by using the keyboard shortcuts (left/space/right)
                keys: false
            },

            events: {
                // On thumb click
                onThumbClick: null,

                // On thumb click
                onThumbMouseOver: null,

                // On image show
                onImageShow: null,

                // On image shown
                onImageShown: null,

                // On image hide
                onImageHide: null,

                // On image hidden
                onImageHidden: null,

                // On image click
                onImageClick: null,

                // On previous
                onPrev: null,

                // On pause
                onPause: null,

                // On play
                onPlay: null,

                // On next
                onNext: null,

                // On error
                onError: null,

                // On warning
                onWarning: null,

                // On success
                onSuccess: null
            }
        };

    // The actual plugin constructor
    function Plugin (element, options) {
        this.elem = element;

        // Extending options
        this.options = $.extend(true, {}, defaults, options);

        this._defaults  = defaults;
        this._name      = plugin_name;
        this._namespace = plugin_name.toLowerCase();

        // Properties
        this.props = {
            thumbs: [],

            effect: {
                provider: null,
                name: null,

                list: {
                    animate: {
                        css: 'animated',

                        bounce: {
                            in: 'bounceInLeft',
                            out: 'bounceOutRight'
                        },
                        fade: {
                            in: 'fadeIn', // Default
                            out: 'fadeOut'
                        },
                        flipX: {
                            in: 'flipInX',
                            out: 'flipOutX'
                        },
                        flipY: {
                            in: 'flipInY',
                            out: 'flipOutY'
                        },
                        fun: {
                            in: 'rubberBand',
                            out: 'hinge'
                        },
                        light: {
                            in: 'lightSpeedIn',
                            out: 'lightSpeedOut'
                        },
                        roll: {
                            in: 'rollIn',
                            out: 'rollOut'
                        },
                        rotate: {
                            in: 'rotateIn',
                            out: 'rotateOut'
                        },
                        rotateBig: {
                            in: 'rotateInDownLeft',
                            out: 'rotateOutUpRight'
                        },
                        sideFade: {
                            in: 'fadeInLeft',
                            out: 'fadeOutRight'
                        },
                        sideFadeBig: {
                            in: 'fadeInLeftBig',
                            out: 'fadeOutRightBig'
                        },
                        slide: {
                            in: 'slideInLeft',
                            out: 'slideOutRight'
                        }
                    },
                    magic: {
                        css: 'magictime',

                        foolish: {
                            in: 'foolishIn',
                            out: 'foolishOut'
                        },
                        perspective: {
                            in: 'perspectiveLeftRetourn',
                            out: 'perspectiveLeft'
                        },
                        puff: {
                            in: 'puffIn',
                            out: 'puffOut'
                        },
                        swap: {
                            in: 'swap',
                            out: 'magic'
                        },
                        swash: {
                            in: 'swashIn',
                            out: 'swashOut'
                        },
                        tin: {
                            in: 'tinLeftIn',
                            out: 'tinRightOut'
                        },
                        twister: {
                            in: 'twisterInDown',
                            out: 'holeOut'
                        }
                    }
                }
            },

            img: {
                $elem: null,
                $overlay: null,
                to_show: this.options.first,
                timer: null
            },

            controls: {
                $wrapper: null
            },

            is_transition_supported: false,
            plugin_status: null
        };

        // Start the work
        this._init();
    }

    Plugin.prototype = {

        /**
         * Initialize the plugin
         * @private
         */
        _init: function () {
            var self = this;

            // Thumbs checks
            if (this.options.thumbs === null) {
                this._errorHandler('error', 'The `thumbs` option doesn\'t exist.');
            } else {
                if ($(this.options.thumbs).length === 0) {
                    this._errorHandler('error', 'The `thumbs` selector (' + $(this.options.thumbs).selector + ') doesn\'t exist.');
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
            $(this.options.thumbs).each(function (i, item) {
                // Has `href`
                if ($(item).attr('href') !== undefined) {
                    // Has `img` child
                    if ($(item).find('img').length) {
                        // Building thumbs array
                        self.props.thumbs.push({
                            src: $(item).attr('href'),
                            alt: $(item).find('img').attr('alt') || null,
                            caption_title: $(item).find('img').data(self._namespace + '-caption-title') || null,
                            caption_link: $(item).find('img').data(self._namespace + '-caption-link') || null
                        });

                        if ($(item).find('img').attr('alt') === undefined) {
                            self._errorHandler('warning', 'The `alt` attribute is missing on the ' + i + '-indexed thumb, it\'s mandatory on <img> tags.');
                        }

                        $(item).attr('data-' + self._namespace + '-index', i);
                    } else {
                        self._errorHandler('error', 'Your link on the ' + i + '-indexed thumb must have an `<img>` tag as a child.');
                    }
                } else {
                    self._errorHandler('error', 'The `href` attribute is missing on the ' + i + '-indexed thumb, it\'s mandatory on `<a>` tags.');
                }
            });

            // `first` check
            if (this.options.first >= this.props.thumbs.length) {
                this._errorHandler('error', 'The `first` option must be between 0 and ' + (this.props.thumbs.length - 1) + '. Default value is used.');

                // Default value
                this.options.first     = this._defaults.first;
                this.props.img.to_show = this._defaults.first;
            }

            // Detect CSS3 transition support
            self.props.is_transition_supported = self._supportsTransitions();

            // Preload the target images
            self._preloading();

            // Add the wrapper
            self._wrapper();

            if (self.props.is_transition_supported === true) {
                // Set the effect
                self.setEffect(self.options.effect);
            }

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
         * @returns {*|HTMLElement}
         */
        rebuild: function () {
            this._init();

            return $(this.elem);
        },

        /**
         * Get thumbs data
         * @param index
         * @returns {*}
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
         * @param effect
         * @returns {{provider: null, name: null}}
         */
        setEffect: function (effect) {
            var response = {
                provider: null,
                name: null
            };

            if (effect !== undefined && effect.provider !== null && effect.name !== null) {
                if (!this.props.effect.list.hasOwnProperty(effect.provider)) {
                    // No effect, instant transition
                    if (effect === 'none') {
                        response.name = 'none';
                    } else {
                        response.provider = this._defaults.effect.provider;
                        response.name     = this._defaults.effect.name;

                        this._errorHandler('error', 'Incorrect value for the `effect.provider` option. Default value is used.');
                    }
                } else {
                    // Random effect asked for a specific provider
                    if (effect.name === 'random') {
                        // Get a random effect
                        response.provider = effect.provider;
                        response.name     = this._getRandomEffect(effect.provider);
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

            this.props.effect.provider = response.provider;
            this.props.effect.name     = response.name;

            return response;
        },

        /**
         * Check that the slideshow is currently started
         * @returns {boolean|*}
         */
        isPlaying: function () {
            return this.options.auto.start;
        },

        /**
         * Pause
         * @returns {*|HTMLElement}
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

                    this._triggerEvent('pause');
                }
            }

            return $(this.elem);
        },

        /**
         * Play
         * @returns {*|HTMLElement}
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

                this._triggerEvent('play');
            }

            return $(this.elem);
        },

        /**
         * Go to the previous slide
         * @param from_script
         * @returns {*|HTMLElement}
         */
        goPrev: function (from_script) {
            if ($(this.options.thumbs).length > 1) {
                var self = this;

                if (!from_script && this.options.auto.start === true) {
                    // Pausing
                    this.pause();
                }

                this._hideOverlay();

                // Decrementing index
                this.props.img.to_show--;

                if (this.props.img.to_show < 0) {
                    // Taking the last index
                    this.props.img.to_show = $(this.options.thumbs).length - 1;
                }

                this._hideImage(function () {
                    self._showImage();
                });

                this._triggerEvent('prev');
            }

            return $(this.elem);
        },

        /**
         * Go to the next slide
         * @param from_script
         * @returns {*|HTMLElement}
         */
        goNext: function (from_script) {
            if ($(this.options.thumbs).length > 1) {
                var self = this;

                if (!from_script && this.options.auto.start === true) {
                    // Pausing
                    this.pause();
                }

                this._hideOverlay();

                // Incrementing index
                this.props.img.to_show++;

                if (this.props.img.to_show >= $(this.options.thumbs).length) {
                    // Taking the first index
                    this.props.img.to_show = 0;
                }

                this._hideImage(function () {
                    self._showImage();
                });

                this._triggerEvent('next');
            }

            return $(this.elem);
        },

        /**
         * Go to a specific slide
         * @param index
         * @returns {*|HTMLElement}
         */
        goTo: function (index) {
            if ($(this.options.thumbs).length > 1 && this._isThumbExists(index) === true) {
                var self = this;

                if (this.options.auto.start === true) {
                    // Pausing
                    this.pause();
                }

                if (index !== this.props.img.to_show) {
                    this._stopAnimation();

                    this._hideOverlay();

                    self.props.img.to_show = index;

                    this._hideImage(function () {
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
         * Is the browser supports CSS3 transition
         * @returns {boolean}
         * @private
         */
        _supportsTransitions: function () {
            var b = document.body || document.documentElement,
                s = b.style,
                p = 'transition',
                v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'],
                i = 0;

            if (typeof s[p] === 'string') {
                return true;
            }

            p = p.charAt(0).toUpperCase() + p.substr(1);

            for (i; i < v.length; i++) {
                if (typeof s[v[i] + p] === 'string') {
                    return true;
                }
            }

            return false;
        },

        /**
         * Is thumb exists
         * @param index
         * @returns {*}
         * @private
         */
        _isThumbExists: function (index) {
            var response;

            if (typeof index === 'number') {
                if (this.props.thumbs[index] !== undefined) {
                    response = true;
                } else {
                    this._errorHandler('error', 'The ' + index + '-indexed thumb doesn\'t exist.');

                    response = false;
                }
            }

            return response;
        },

        /**
         * Pre-loads images
         * @private
         */
        _preloading: function () {
            if (this.options.auto.load === true) {
                // Looping thumbs
                $.each(this.props.thumbs, function (i, item) {
                    $('<img>', {
                        src: item.src,
                        alt: item.alt
                    }).hide().appendTo('body');
                });
            }
        },

        /**
         * Add wrapper
         * @private
         */
        _wrapper: function () {
            var $img = $('<img>').attr('alt', this._name).addClass(this.options.imageClass);

            $(this.elem).html($img).wrapInner($('<div>', {
                class: this._namespace + '-wrapper'
            }));

            this.props.img.$elem = $(this.elem).find('img:first');
        },

        /**
         * Remove the effect classes
         * @private
         */
        _clearEffectClass: function () {
            var self = this, key, key2;

            if (this.props.img.$elem.attr('class') !== undefined) {
                // Retrieve CSS classes
                var classes = this.props.img.$elem.attr('class').split(/\s+/);

                // Remove the namespace class and the in/out
                for (key in self.props.effect.list) {
                    if (self.props.effect.list.hasOwnProperty(key)) {
                        for (key2 in self.props.effect.list[key]) {
                            if (self.props.effect.list[key].hasOwnProperty(key2)) {
                                if (classes.indexOf(self.props.effect.list[key][key2]) !== -1) {
                                    this.props.img.$elem.removeClass(self.props.effect.list[key][key2]);
                                }

                                if (self.props.effect.list[key][key2].in) {
                                    if (classes.indexOf(self.props.effect.list[key][key2].in) !== -1) {
                                        this.props.img.$elem.removeClass(self.props.effect.list[key][key2].in);
                                    }
                                }

                                if (self.props.effect.list[key][key2].out) {
                                    if (classes.indexOf(self.props.effect.list[key][key2].out) !== -1) {
                                        this.props.img.$elem.removeClass(self.props.effect.list[key][key2].out);
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
         * @param provider
         * @returns {*}
         * @private
         */
        _getRandomEffect: function (provider) {
            var random, count = 0, prop;

            for (prop in this.props.effect.list[provider]) {
                if (this.props.effect.list[provider].hasOwnProperty(prop) && prop !== 'css') {
                    if (Math.random() < 1 / ++count) {
                        random = prop;
                    }
                }
            }

            return random;
        },

        /**
         * Has effect
         * @returns {boolean}
         * @private
         */
        _hasEffect: function () {
            return (this.props.effect.provider === null && this.props.effect.name === 'none') ? false : true;
        },

        /**
         * Shows an image
         * @private
         */
        _showImage: function () {
            var self = this;

            if (this.props.plugin_status === null) {
                // Success
                this._errorHandler();
            }

            this._triggerEvent('imageShow');

            this.props.img.$elem
                .attr('src', this.props.thumbs[this.props.img.to_show].src)
                .attr('alt', this.props.thumbs[this.props.img.to_show].alt)

                // Image loaded
                .one('load', function () {
                    // No effect
                    if (self._hasEffect() === false) {
                        // Showing image
                        $(this).css('opacity', 1);

                        // Adding overlay
                        self._overlay();

                        self._triggerEvent('imageShown');
                    } else {
                        if (self.props.is_transition_supported === true) {
                            // Showing
                            $(this)
                            // Removing the `out` class
                                .removeClass(self.props.effect.list[self.props.effect.provider].css + ' ' + self.props.effect.list[self.props.effect.provider][self.props.effect.name].out)

                                // Adding the `in` class
                                .addClass(self.props.effect.list[self.props.effect.provider].css + ' ' + self.props.effect.list[self.props.effect.provider][self.props.effect.name].in)

                                // Animation done
                                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                                    // Adding overlay
                                    self._overlay();

                                    self._triggerEvent('imageShown');
                                });
                        } else {
                            // Fallback CSS3
                            $(this)
                                .css('opacity', 0)
                                .animate({
                                    opacity: 1
                                }, 1000, function () {
                                    // Adding overlay
                                    self._overlay();

                                    self._triggerEvent('imageShown');
                                });
                        }
                    }

                    // Starting the loop
                    if (self.options.auto.start === true) {
                        self.props.img.timer = setTimeout(function () {
                            self.goNext(true);
                        }, (self.options.interval < 1500) ? 1500 : self.options.interval);
                    }
                });
        },

        /**
         * Hides an image
         * @param callback
         * @private
         */
        _hideImage: function (callback) {
            var self = this;

            this._triggerEvent('imageHide');

            // No effect
            if (this._hasEffect() === false) {
                this.props.img.$elem.css('opacity', 0);

                self._triggerEvent('imageHidden');

                if (callback) {
                    callback();
                }
            } else {

                if (self.props.is_transition_supported === true) {
                    this._clearEffectClass();

                    // Hiding the old one
                    this.props.img.$elem
                    // Removing the `in` class
                        .removeClass(this.props.effect.list[this.props.effect.provider].css + ' ' + this.props.effect.list[this.props.effect.provider][this.props.effect.name].in)

                        // Adding the `out` class
                        .addClass(this.props.effect.list[this.props.effect.provider].css + ' ' + this.props.effect.list[this.props.effect.provider][this.props.effect.name].out)

                        // Animation done
                        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            self._triggerEvent('imageHidden');

                            if (callback) {
                                callback();
                            }
                        });
                } else {
                    // Fallback CSS3
                    this.props.img.$elem.animate({
                        opacity: 0
                    }, 1000, function () {
                        self._triggerEvent('imageHidden');

                        if (callback) {
                            callback();
                        }
                    });
                }

            }
        },

        /**
         * Add overlay
         * @private
         */
        _overlay: function () {
            // Overlay needed
            if (this.options.overlay !== 'none') {
                var pos, top, left, border, width_plus_border, height_plus_border, paddingTop, paddingBottom, paddingLeft, paddingRight, overlayHeight;

                // Image positions
                pos = this.props.img.$elem.position();

                // Image border
                border = parseInt(this.props.img.$elem.css('border-left-width'), 10);

                // Image height dimensions
                width_plus_border  = this.props.img.$elem.width() + (border * 2);
                height_plus_border = this.props.img.$elem.height();

                // Add overlay if not exists
                if ($(this.elem).find('.' + this._namespace + '-overlay').length === 0) {
                    $('<div>', {
                        class: this._namespace + '-overlay'
                    }).appendTo($(this.elem).find('.' + this._namespace + '-wrapper'));
                }

                this.props.img.$overlay = $(this.elem).find('.' + this._namespace + '-overlay');

                // Calculate new height with paddings
                paddingTop    = parseInt(this.props.img.$overlay.css('padding-top'), 10);
                paddingBottom = parseInt(this.props.img.$overlay.css('padding-bottom'), 10);
                paddingLeft   = parseInt(this.props.img.$overlay.css('padding-left'), 10);
                paddingRight  = parseInt(this.props.img.$overlay.css('padding-right'), 10);

                overlayHeight = parseInt(this.props.img.$overlay.css('height'), 10) - (paddingLeft + paddingRight);
                overlayHeight = (parseInt(height_plus_border, 10) - overlayHeight - (paddingTop + paddingBottom));

                top  = pos.top + overlayHeight + (border * 2);
                left = pos.left;

                // Update the overlay position
                this.props.img.$overlay.css({
                    left: left + 'px',
                    top: top + 'px',
                    width: width_plus_border + 'px',
                    borderBottomLeftRadius: this.props.img.$elem.css('border-radius'),
                    borderBottomRightRadius: this.props.img.$elem.css('border-radius')
                });

                // Showing the overlay if needed
                if (this.options.overlay === 'always') {
                    this.props.img.$overlay.animate({
                        opacity: 0.7
                    }, (this._hasEffect() === true) ? 500 : 0);
                }

                this._caption();

                if (this.options.controls.show === true && this.props.thumbs.length > 1) {
                    this._controls();
                }
            }
        },

        /**
         * Hides the overlay
         * @private
         */
        _hideOverlay: function () {
            if (this.props.img.$overlay !== null) {
                this.props.img.$overlay.animate({
                    opacity: 0
                }, (this._hasEffect() === true) ? 500 : 0);
            }
        },

        /**
         * Add controls
         * @private
         */
        _controls: function () {
            var $prev, $pause, $play, $next, $controls;

            // Removing the existing controls wrapper
            $(this.elem).find('.' + this._namespace + '-controls-wrapper').remove();

            // Controls buttons
            $prev  = '<a class="' + this._namespace + '-controls prev" href="#prev"></a>';
            $pause = '<a class="' + this._namespace + '-controls pause" href="#pause"></a>';
            $play  = '<a class="' + this._namespace + '-controls play" href="#play"></a>';
            $next  = '<a class="' + this._namespace + '-controls next" href="#next"></a>';

            // Controls wrapper
            $controls = $('<div>', {
                class: this._namespace + '-controls-wrapper'
            }).append($prev + $pause + $play + $next);

            // Adding the controls wrapper
            if (this.props.img.$overlay.find('a:first').length > 0) {
                $controls.appendTo(this.props.img.$overlay.find('a:first'));
            } else {
                $controls.appendTo(this.props.img.$overlay);
            }

            this.props.controls.$wrapper = $(this.elem).find('.' + this._namespace + '-controls-wrapper');

            if (this.props.controls.$wrapper.length) {
                // Showing the right button
                if (this.options.auto.start === true) {
                    this.props.controls.$wrapper.find('a[href="#play"]').hide().parent().find('a[href="#pause"]').show();
                } else {
                    this.props.controls.$wrapper.find('a[href="#pause"]').hide().parent().find('a[href="#play"]').show();
                }
            }
        },

        /**
         * Caption management
         * @private
         */
        _caption: function () {
            if (this.props.thumbs[this.props.img.to_show].caption_title !== null) {
                var anchor, anchor_exists, href_exists, $link, $clone, $parent;

                this.props.img.$overlay.html('<span class="' + this._namespace + '-caption-title">' + this.props.thumbs[this.props.img.to_show].caption_title + '</span>');

                anchor_exists = (this.props.img.$overlay.find('a:first').length > 0) ? true : false;
                href_exists   = (this.props.thumbs[this.props.img.to_show].caption_link !== null) ? true : false;

                // Anchor tag
                anchor = '<a href="' + this.props.thumbs[this.props.img.to_show].caption_link + '" target="_blank"></a>';

                if (anchor_exists === true && href_exists === true) {
                    // Updating the href
                    this.props.img.$overlay.find('a:first').attr('href', this.props.thumbs[this.props.img.to_show].caption_link);
                } else {
                    // Anchor already exists but no caption title to show
                    if (anchor_exists === true && href_exists === false) {
                        $link   = this.props.img.$overlay.find('a:first');
                        $clone  = $link.children().clone();
                        $parent = $link.parent();

                        $link.remove();
                        $clone.appendTo($parent);

                        // Removing existing caption title
                        this.props.img.$overlay.find('span:first').empty();
                    } else {
                        if (anchor_exists === false && href_exists === true) {
                            // Wrapping the caption
                            $(this.elem).find('.' + this._namespace + '-overlay span:first').wrap(anchor);
                        }
                    }
                }
            }
        },

        /**
         * Stop the current animation
         * @private
         */
        _stopAnimation: function () {
            $(this.elem).stop();
        },

        /**
         * Triggers an event
         * @param event_name
         * @private
         */
        _triggerEvent: function (event_name) {
            // Trigger event
            $(this.elem).triggerHandler(event_name + '.' + this._namespace);

            var capitalize_first = event_name.charAt(0).toUpperCase() + event_name.slice(1);

            // Option event
            if (this.options.events['on' + capitalize_first]) {
                this.options.events['on' + capitalize_first](this.props.img.$elem);
            }
        },

        /**
         * Events management
         * @private
         */
        _events: function () {
            var self = this;

            if (['click', 'mouseover'].indexOf(this.options.thumbEvent) !== -1) {
                // Interacting with thumbnail
                $(this.options.thumbs).on('click', function (e) {
                    e.preventDefault();

                    if (self.options.thumbEvent === 'click') {
                        self.goTo($(this).data(self._namespace + '-index'));

                        self._triggerEvent('thumbClick');
                    }
                });

                // Interacting with thumbnail
                $(this.options.thumbs).on('mouseover', function (e) {
                    e.preventDefault();

                    if (self.options.thumbEvent === 'mouseover') {
                        self.goTo($(this).data(self._namespace + '-index'));

                        self._triggerEvent('thumbMouseOver');
                    }
                });
            }

            // Click on image
            this.props.img.$elem.on('click', function (e) {
                e.preventDefault();

                self._triggerEvent('imageClick');
            });

            // Click on control
            $(this.elem).on('click', '.' + this._namespace + '-controls-wrapper a', $(this.elem), function (e) {
                e.preventDefault();

                switch ($(this).attr('href')) {
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
            $(this.elem).find('.' + this._namespace + '-wrapper').on({
                mouseover: function () {
                    if (self.options.overlay === 'hover' && self.props.img.$overlay !== null) {
                        self.props.img.$overlay.stop().animate({
                            opacity: 0.7
                        }, 400);
                    }
                },
                mouseleave: function () {
                    if (self.options.overlay === 'hover' && self.props.img.$overlay !== null) {
                        self.props.img.$overlay.stop().animate({
                            opacity: 0
                        }, 400);
                    }
                }
            });

            if (this.options.controls.keys === true) {
                // Keys binder
                $(document).on('keydown', function (e) {
                    switch (e.which) {
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

            var delay = (function () {
                var timer = 0;
                return function (callback, ms) {
                    clearTimeout(timer);
                    timer = setTimeout(callback, ms);
                };
            }());

            // New overlay position when resizing
            if (this.options.overlay !== 'none') {
                $(window).bind('resize', function () {
                    delay(function () {
                        self._overlay();
                    }, 100);
                });
            }
        },

        /**
         * Error handler
         * @param type
         * @param msg
         * @private
         */
        _errorHandler: function (type, msg) {
            switch (type) {
                case 'error':
                    if (console !== undefined) {
                        console.error(this._name + ': ' + msg + ' Check out the documentation.');
                    }

                    this._triggerEvent('error');

                    this.props.plugin_status = type;
                    break;
                case 'warning':
                    if (console !== undefined) {
                        console.warn(this._name + ': ' + msg);
                    }

                    this._triggerEvent('warning');

                    this.props.plugin_status = type;
                    break;
                default:
                    this._triggerEvent('success');

                    this.props.plugin_status = type;
                    break;
            }
        }
    };

    $.fn[plugin_name] = function (options) {
        var args = arguments, instance, response;

        if (options === undefined || typeof options === 'object') {
            // Create a plugin instance for each selected element
            response = this.each(function () {
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
            response = this.each(function () {
                instance = $.data(this, 'plugin_' + plugin_name);

                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });
        }

        return response;
    };

}(jQuery, window, document));
