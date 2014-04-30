$(function() {

    /* First demo */
    $('#demo1_image').desoSlide({
        thumbs: $('#demo1_thumbs').find('li > a'),
        caption: true
    });

    /* Second demo */
    $('#demo2_image').desoSlide({
        thumbs: $('#demo2_thumbs').find('li > a'),
        auto: {
            start: true
        },
        first: 1,
        effect: {
            provider: 'magic',
            name: 'tin'
        },
        controls: {
            keys: false
        }
    });

    /* Third demo */
    $('#demo3_image').desoSlide({
        thumbs: $('#demo3_thumbs').find('li > a'),
        effect: {
            provider: 'animate',
            name: 'flip'
        },
        overlay: 'hover',
        caption: true,
        controls: {
            enable: false,
            keys: false
        }
    });

    /* Fourth demo */
    $('#demo4_image').desoSlide({
        thumbs: $('#demo4_thumbs').find('li > a'),
        auto: {
            start: true
        },
        effect: {
            provider: 'animate',
            name: 'rotate'
        },
        overlay: 'none',
        controls: {
            enable: false,
            keys: false
        }
    });

});