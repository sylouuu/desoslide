$(function() {

    'use strict';

    // Thumbs tests
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    var thumbs_test1, thumbs_test2;

    $('#image_test1').desoSlide({
        events: {
            onError: function() {
                thumbs_test1 = 'error';
            }
        }
    });

    $('#image_test2').desoSlide({
        thumbs: $('#no_thumbs').find('a'),
        events: {
            onError: function() {
                thumbs_test2 = 'error';
            }
        }
    });

    test('`thumbs`', function() {

        ok(thumbs_test1 === 'error', 'option doesn\'t exist: error expected');
        ok(thumbs_test2 === 'error', 'selector doesn\'t exist: error expected');

    });

    // "Overlay" tests
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    var overlay_test1, overlay_test2;

    $('#image_test3').desoSlide({
        thumbs: $('#alt_thumbs').find('li > a'),
        overlay: 'fail',
        events: {
            onError: function() {
                overlay_test1 = 'error';
            }
        }
    });

    $('#image_test4').desoSlide({
        thumbs: $('#alt_thumbs').find('li > a'),
        overlay: 'always',
        events: {
            onSuccess: function() {
                overlay_test2 = 'success';
            }
        }
    });

    test('`overlay` option', function() {

        ok(overlay_test1 === 'error', 'has a wrong value: error expected');
        ok(overlay_test2 === 'success', 'has an accepted value: success expected');

    });

    // "alt" attribute tests
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    var alt_test1, alt_test2;

    $('#image_test5').desoSlide({
        thumbs: $('#no_alt_thumbs').find('li > a'),
        events: {
            onWarning: function() {
                alt_test1 = 'warning';
            }
        }
    });

    $('#image_test6').desoSlide({
        thumbs: $('#alt_thumbs').find('li > a'),
        events: {
            onSuccess: function() {
                alt_test2 = 'success';
            }
        }
    });

    test('`alt` attribute', function() {

        ok(alt_test1 === 'warning', 'isn\'t specified: warning expected');
        ok(alt_test2 === 'success', 'is specified: success expected');

    });

    // "First" tests
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    var first_test1, first_test2;

    $('#image_test7').desoSlide({
        thumbs: $('#alt_thumbs').find('li > a'),
        first: 4,
        events: {
            onError: function() {
                first_test1 = 'error';
            }
        }
    });

    $('#image_test8').desoSlide({
        thumbs: $('#alt_thumbs').find('li > a'),
        first: 1,
        events: {
            onSuccess: function() {
                first_test2 = 'success';
            }
        }
    });

    test('`first` option', function() {

        ok(first_test1 === 'error', 'has a wrong value: error expected');
        ok(first_test2 === 'success', 'has an accepted value: success expected');

    });

    // "Effect" tests
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    var effect_test1, effect_test2, effect_test3;

    $('#image_test9').desoSlide({
        thumbs: $('#alt_thumbs').find('li > a'),
        effect: {
            provider: 'fail',
            name: 'fade'
        },
        events: {
            onError: function() {
                effect_test1 = 'error';
            }
        }
    });

    $('#image_test10').desoSlide({
        thumbs: $('#alt_thumbs').find('li > a'),
        effect: {
            provider: 'magic',
            name: 'fail'
        },
        events: {
            onError: function() {
                effect_test2 = 'error';
            }
        }
    });

    $('#image_test11').desoSlide({
        thumbs: $('#alt_thumbs').find('li > a'),
        effect: {
            provider: 'animate',
            name: 'rotate'
        },
        events: {
            onSuccess: function() {
                effect_test3 = 'success';
            }
        }
    });

    test('`effect` option', function() {

        ok(effect_test1 === 'error', 'has a bad `provider` value: error expected');
        ok(effect_test2 === 'error', 'has a bad `name` value: success expected');
        ok(effect_test3 === 'success', 'has an accepted value: success expected');

    });

    // Public methods
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    // getThumbs()
    // -------------------------------------------------------------------------

    var get_thumbs_test1, get_thumbs_test2, get_thumbs_test3;

    get_thumbs_test1 = $('#image_test4').desoSlide('getThumbs');
    get_thumbs_test2 = $('#image_test4').desoSlide('getThumbs', 1);
    get_thumbs_test3 = $('#image_test4').desoSlide('getThumbs', 10);

    test('getThumbs method', function() {

        ok(get_thumbs_test1.length === 2, 'the thumbs object has a size of 2');
        ok(get_thumbs_test2.alt === 'Flower', 'the wanted thumb has been retrieved successfully');
        ok(get_thumbs_test3 === null, 'returns `null`');

    });

    // setEffect()
    // -------------------------------------------------------------------------

    var set_effect_test1, set_effect_test2, set_effect_test3, set_effect_test4, set_effect_test5, set_effect_test6, set_effect_test7;

    set_effect_test1 = $('#image_test4').desoSlide('setEffect', { provider: 'animate', name: 'random' });
    set_effect_test2 = $('#image_test4').desoSlide('setEffect', { provider: 'magic', name: 'random' });
    set_effect_test3 = $('#image_test4').desoSlide('setEffect', { provider: 'magic', name: 'puff' });
    set_effect_test4 = $('#image_test4').desoSlide('setEffect', { provider: 'fail', name: 'puff' });
    set_effect_test5 = $('#image_test4').desoSlide('setEffect', { provider: 'animate', name: 'fail' });
    set_effect_test6 = $('#image_test4').desoSlide('setEffect');
    set_effect_test7 = $('#image_test4').desoSlide('setEffect', {});

    test('setEffect method', function() {

        ok(set_effect_test1.provider === 'animate' && typeof set_effect_test1.name === 'string', 'has an accepted provider and a random effect');
        ok(set_effect_test2.provider === 'magic' && typeof set_effect_test2.name === 'string', 'has an accepted provider and a random effect');
        ok(set_effect_test3.provider === 'magic' && set_effect_test3.name === 'puff', 'has an accepted provider and effect');
        ok(set_effect_test4.provider === 'animate' && set_effect_test4.name === 'fade', 'has a bad provider: default provider and effect used');
        ok(set_effect_test5.provider === 'animate' && set_effect_test5.name === 'fade', 'has a bad effect: default provider and effect used');
        ok(set_effect_test6.provider === 'animate' && set_effect_test6.name === 'fade', 'has a bad parameter: default provider and effect used');
        ok(set_effect_test7.provider === 'animate' && set_effect_test7.name === 'fade', 'has a bad parameter: default provider and effect used');

    });

    // player
    // -------------------------------------------------------------------------

    var player_test1, player_test2, player_test3;

    $('#image_test12').desoSlide({
        thumbs: $('#alt_thumbs').find('li > a'),
        events: {
            onPrev: function() {
                player_test1 = 'ok';
            },
            onPlay: function() {
                player_test2 = 'ok';
            },
            onNext: function() {
                player_test3 = 'ok';
            }
        }
    });

    $('#image_test12').desoSlide('goPrev');
    $('#image_test12').desoSlide('play');
    $('#image_test12').desoSlide('goNext');

    test('player methods', function() {

        ok(player_test1 === 'ok', 'prev');
        ok(player_test2 === 'ok', 'play');
        ok(player_test3 === 'ok', 'next');

    });

});
