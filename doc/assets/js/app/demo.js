$(function() {

    /* First demo */
    $('#demo1_image').desoSlide({
        thumbs: $('#demo1_thumbs li > a')
    });

    /* Second demo */
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

    /* Third demo */
    $('#demo3_image').desoSlide({
        thumbs: $('#demo3_thumbs li > a'),
        effect: {
            provider: 'animate',
            name: 'flip'
        },
        overlay: 'hover',
        controls: {
            show: false
        }
    });

    /* Fourth demo */
    $('#demo4_image').desoSlide({
        thumbs: $('#demo4_thumbs li > a'),
        auto: {
            start: true
        },
        effect: {
            provider: 'magic',
            name: 'twister'
        },
        overlay: 'none',
        controls: {
            show: false
        }
    });

});