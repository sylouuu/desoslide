$(function() {

    $('a.back-to-top').on('click', function(e) {
        e.preventDefault();

        $('html, body').stop().animate({
            scrollTop: $('html, body').offset().top
        }, 1000);
    });

    $('pre code').each(function(i, e) {
        hljs.highlightBlock(e);
    });

});
