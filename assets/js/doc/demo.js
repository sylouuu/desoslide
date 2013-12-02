$(function() {

	/* First demo */
	$('#demo1_thumbs').desoSlide({
		main: {
			container: '#demo1_main_image',
			cssClass: 'img-responsive'
		},
		caption: true
	});

	/* Second demo */
	$('#demo2_thumbs').desoSlide({
		main: {
			container: '#demo2_main_image',
			cssClass: 'img-responsive'
		},
		auto: {
			start: true
		},
		first: 1,
		effect: 'sideFadeBig',
		controls: {
			keys: false
		}
	});

	/* Third demo */
	$('#demo3_thumbs').desoSlide({
		main: {
			container: '#demo3_main_image',
			cssClass: 'img-responsive'
		},
		effect: 'flip',
		overlay: 'hover',
		caption: true,
		controls: {
			enable: false,
			keys: false
		}
	});
});