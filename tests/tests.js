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

    test('The `thumbs`', function() {

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

    test('The `overlay` option', function() {

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

    test('The `alt` attribute', function() {

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

    test('The `first` option', function() {

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

    test('The `effect` option', function() {

        ok(effect_test1 === 'error', 'has a bad `provider` value: error expected');
        ok(effect_test2 === 'error', 'has a bad `name` value: success expected');
        ok(effect_test3 === 'success', 'has an accepted value: success expected');

    });

});
