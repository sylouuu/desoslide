$(function() {

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

    var setEffect = function(effect) {

        $('#demo1_thumbs').desoSlide({
            main: {
                container: '#demo1_main_image',
                cssClass: 'img-responsive'
            },
            effects: {
                provider: $('#effect_provider').val(),
                name: $('#effect_name').val()
            },
            caption: false
        });
    };

    $('#effect_provider').on('change', function() {
        changeProvider($(this).val());
    });

    $('#effect_name').on('change', function() {
        setEffect($(this).val());
    });



    changeProvider('animate');
    setEffect('fade');

});