$(function() {

    // Gulp
    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------

    // Demo 1
    // ----------------------------------------------------------------------------------------------------------

    $('#demo1_image').desoSlide({
        thumbs: $('#demo1_thumbs_list1, #demo1_thumbs_list2').find('li > a')
    });

    var effects = {
        animate: ['fade', 'sideFade', 'sideFadeBig', 'flip', 'light', 'roll', 'rotate'],
        magic: ['foolish', 'swash', 'tin', 'puff', 'twister']
    };

    var changeProvider = function(provider) {
        var tmp = '';

        $.each(effects[provider], function(i, item) {
            tmp += '<option value="'+ item +'">'+ item +'</option>';
        });

        $('#effect_name').html(tmp);
    };

    var setEffect = function(provider, effect) {
        $('#demo1_image').desoSlide('pause');

        $('#demo1_image').desoSlide('setEffect', { provider: $('#effect_provider').val(), name: $('#effect_name').val() });

        $('#demo1_image').desoSlide('play');

        var code = "$('#demo1_image').desoSlide({\n";
        code += "    thumbs: $('#demo1_thumbs_list1, #demo1_thumbs_list2').find('li > a'),\n";
        code += "    effect: {\n";
        code += "        provider: '"+ $('#effect_provider').val() +"',\n";
        code += "        name: '"+ $('#effect_name').val() +"'\n";
        code += "    }\n";
        code += "});";

        $('#code1').html(code);
    };


    $('#effect_provider').on('change', function() {
        changeProvider($(this).val());

        setEffect();
    });

    $('#effect_name').on('change', function() {
        setEffect();
    });

    changeProvider('animate');

    // Demo 2
    // ----------------------------------------------------------------------------------------------------------

    $('#demo2_image').desoSlide({
        thumbs: $('#demo2_thumbs li > a'),
        auto: {
            start: true
        },
        first: 1,
        effect: {
            provider: 'magic',
            name: 'tin'
        }
    });

    // Demo 3
    // ----------------------------------------------------------------------------------------------------------

    $('#demo3_image').desoSlide({
        thumbs: $('#demo3_thumbs li > a'),
        effect: {
            provider: 'animate',
            name: 'flip'
        },
        overlay: 'hover',
        controls: {
            show: false,
            keys: true
        }
    });

    // Demo 4
    // ----------------------------------------------------------------------------------------------------------

    $('#demo4_image').desoSlide({
        thumbs: $('#demo4_thumbs li > a'),
        auto: {
            start: true
        },
        effect: {
            provider: 'magic',
            name: 'twister'
        },
        overlay: 'none'
    });

});