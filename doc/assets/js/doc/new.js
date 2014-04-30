$(window).load(function() {

    $('#demo').desoSlide({
        thumbs: $('#thumbs_list1, #thumbs_list2').find('li > a'),
        // thumbs: $('#thumbs_list1').find('li:first > a'),
        caption: true,
        overlay: 'always',
        auto: {
            start: false
        },
        controls: {
            enable: true
        },
        effect: {
            provider: 'magic',
            name: 'puff'
        },
        first: 0,
        events: {
            onThumbClick: function() {
                // console.log('thumbClick');
            },
            onImageShown: function($img) {
                // console.log($img.selector +' shown');
            },
            onImageHidden: function($img) {
                // console.log($img.selector +' hidden');
            },
            onImageClick: function() {
                // console.log('imageClick');
            },
            onPrev: function() {
                console.log('prev');
            },
            onPause: function() {
                console.log('pause');
            },
            onPlay: function() {
                console.log('play');
            },
            onNext: function() {
                console.log('next');
            },
            onComplete: function(result) {
                console.log(result);
            }
        }
    });

    $('#demo').desoSlide('setEffect', { provider: 'magic', name: 'random' });

    var thumbs = $('#demo').desoSlide('getThumbs');

    $('a[href="#test_pause"]').on('click', function(e) {
        e.preventDefault();

        $('#demo').desoSlide('pause');
    });

    $('a[href="#test_play"]').on('click', function(e) {
        e.preventDefault();

        $('#demo').desoSlide('play');
    });

    $('a[href="#test_prev"]').on('click', function(e) {
        e.preventDefault();

        $('#demo').desoSlide('goPrev');
    });

    $('a[href="#test_next"]').on('click', function(e) {
        e.preventDefault();

        $('#demo').desoSlide('goNext');
    });

    $('a[href="#test_goto"]').on('click', function(e) {
        e.preventDefault();

        $('#demo').desoSlide('goTo', 2);
    });

    $('a[href="#test_tin"]').on('click', function(e) {
        e.preventDefault();

        $('#demo').desoSlide('setEffect', { provider: 'magic', name: 'random' });
    });

    $('#demo').on('next.desoslide', function() {
        // console.log('next.desoslide');
    });


});