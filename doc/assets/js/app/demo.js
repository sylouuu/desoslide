$(function() {

    // Demo
    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------

    $('a.back-to-top').on('click', function(e) {
        e.preventDefault();

        $('html, body').stop().animate({
            scrollTop: $('html, body').offset().top
        }, 1000);
    });

    // Syntax highlighting
    // ----------------------------------------------------------------------------------------------------------

    var syntaxHighlight = function() {
        $('pre code').each(function(i, e) {
            hljs.highlightBlock(e);
        });
    };

    syntaxHighlight();

    // Demo 1
    // ----------------------------------------------------------------------------------------------------------

    var $demo1_image = $('#slideshow1'), $effect_provider = $('#effect_provider'), $effect_name = $('#effect_name');

    $demo1_image.desoSlide({
        thumbs: $('ul.slideshow1_thumbs li > a'),
        // events: {
        //     'onThumbClick': function() {
        //         console.log('onThumbClick');
        //     },
        //     'onImageShow': function() {
        //         console.log('onImageShow');
        //     },
        //     'onImageShown': function() {
        //         console.log('onImageShown');
        //     },
        //     'onImageHide': function() {
        //         console.log('onImageHide');
        //     },
        //     'onImageHidden': function() {
        //         console.log('onImageHidden');
        //     },
        //     'onImageClick': function() {
        //         console.log('onImageClick');
        //     },
        //     'onPrev': function() {
        //         console.log('onPrev');
        //     },
        //     'onPause': function() {
        //         console.log('onPause');
        //     },
        //     'onPlay': function() {
        //         console.log('onPlay');
        //     },
        //     'onNext': function() {
        //         console.log('onNext');
        //     },
        //     'onError': function() {
        //         console.log('onError');
        //     },
        //     'onWarning': function() {
        //         console.log('onWarning');
        //     },
        //     'onSuccess': function() {
        //         console.log('onSuccess');
        //     }
        // }
    });

    // Available effects by provider
    var effects = {
        animate: ['fade', 'sideFade', 'sideFadeBig', 'flip', 'light', 'roll', 'rotate'],
        magic: ['foolish', 'swash', 'tin', 'puff', 'twister']
    };

    // Change provider
    var changeProvider = function(provider) {
        var tmp = '';

        $.each(effects[provider], function(i, item) {
            tmp += '<option value="'+ item +'">'+ item +'</option>';
        });

        $effect_name.html(tmp);
    };

    // Set effect
    var setEffect = function(provider, effect) {
        // Pausing
        $demo1_image.desoSlide('pause');

        // Applying asked effect
        $demo1_image.desoSlide('setEffect', { provider: $effect_provider.val(), name: $effect_name.val() });

        // Playing
        $demo1_image.desoSlide('play');

        var code = "$('#slideshow').desoSlide({\n";
        code += "    thumbs: $('ul.slideshow_thumbs li > a'),\n";
        code += "    effect: {\n";
        code += "        provider: '"+ $effect_provider.val() +"',\n";
        code += "        name: '"+ $effect_name.val() +"'\n";
        code += "    }\n";
        code += "});";

        $('#html_code1').html('&lt;link rel="stylesheet" href="path/to/'+ $effect_provider.val() +'.min.css"&gt;');
        $('#js_code1').html(code);

        syntaxHighlight();
    };

    // On change effect provider
    $effect_provider.on('change', function() {
        changeProvider($(this).val());

        setEffect();
    });

    // On change effect name
    $effect_name.on('change', function() {
        setEffect();
    });

    // Default loaded provider
    changeProvider('animate');

    // $demo1_image.on({
    //     'thumbClick.desoslide': function() {
    //         console.log('thumbClick.desoslide');
    //     },
    //     'imageShow.desoslide': function() {
    //         console.log('imageShow.desoslide');
    //     },
    //     'imageShown.desoslide': function() {
    //         console.log('imageShown.desoslide');
    //     },
    //     'imageHide.desoslide': function() {
    //         console.log('imageHide.desoslide');
    //     },
    //     'imageHidden.desoslide': function() {
    //         console.log('imageHidden.desoslide');
    //     },
    //     'imageClick.desoslide': function() {
    //         console.log('imageClick.desoslide');
    //     },
    //     'prev.desoslide': function() {
    //         console.log('prev.desoslide');
    //     },
    //     'pause.desoslide': function() {
    //         console.log('pause.desoslide');
    //     },
    //     'play.desoslide': function() {
    //         console.log('play.desoslide');
    //     },
    //     'next.desoslide': function() {
    //         console.log('next.desoslide');
    //     },
    //     'error.desoslide': function() {
    //         console.log('error.desoslide');
    //     },
    //     'warning.desoslide': function() {
    //         console.log('warning.desoslide');
    //     },
    //     'success.desoslide': function() {
    //         console.log('success.desoslide');
    //     }
    // });

    // Demo 2
    // ----------------------------------------------------------------------------------------------------------

    $('#slideshow2').desoSlide({
        thumbs: $('#slideshow2_thumbs li > a'),
        first: 2
    });

    // Demo 3
    // ----------------------------------------------------------------------------------------------------------

    $('#slideshow3').desoSlide({
        thumbs: $('#slideshow3_thumbs li > a'),
        auto: {
            start: true
        },
        first: 1,
        interval: 6000
    });

    // Demo 4
    // ----------------------------------------------------------------------------------------------------------

    $('#slideshow4').desoSlide({
        thumbs: $('#slideshow4_thumbs li > a'),
        overlay: 'hover',
        controls: {
            show: false,
            keys: true
        }
    });

    // Demo 5
    // ----------------------------------------------------------------------------------------------------------

    $('#slideshow5').desoSlide({
        thumbs: $('#slideshow5_thumbs li > a'),
        auto: {
            start: true
        },
        overlay: 'none'
    });

});