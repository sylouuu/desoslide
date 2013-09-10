$(function() {

	/* Thumbs container tests */

	var thumbs_container_test1, thumbs_container_test2;

	$('#invisible_thumbs').desoSlide({
		main: {
			container: '#no_thumbs'
		},
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			thumbs_container_test1 = result;
		}
	});

	$('#no_thumbs').desoSlide({
		main: {
			container: '#main_image'
		},
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			thumbs_container_test2 = result;
		}
	});

	test('The "thumbs" container', function() {

		ok(thumbs_container_test1 == 'error', 'doesn\'t exist: error expected');
		ok(thumbs_container_test2 == 'error', 'exists but has no child: error expected');

	});

	/* Main container tests */

	var main_container_test1, main_container_test2;

	$('#alt_thumbs').desoSlide({
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			main_container_test1 = result;
		}
	});

	$('#alt_thumbs').desoSlide({
		main: {
			container: '#no_container'
		},
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			main_container_test2 = result;
		}
	});

	test('The "main" container option', function() {

		ok(main_container_test1 == 'error', 'isn\'t specified: error expected');
		ok(main_container_test2 == 'error', 'is specified, but the selector doesn\'t exist: error expected');

	});

	/* "First" tests */

	var first_test1, first_test2;

	$('#alt_thumbs').desoSlide({
		main: {
			container: '#main_image'
		},
		first: 4,
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			first_test1 = result;
		}
	});

	$('#alt_thumbs').desoSlide({
		main: {
			container: '#main_image'
		},
		first: 3,
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			first_test2 = result;
		}
	});

	test('The "first" option', function() {

		ok(first_test1 == 'error', 'has a wrong value: error expected');
		ok(first_test2 == 'success', 'has an accepted value: success expected');

	});

	/* "Overlay" tests */

	var overlay_test1, overlay_test2;

	$('#alt_thumbs').desoSlide({
		main: {
			container: '#main_image'
		},
		overlay: 'fail',
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			overlay_test1 = result;
		}
	});

	$('#alt_thumbs').desoSlide({
		main: {
			container: '#main_image'
		},
		overlay: 'always',
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			overlay_test2 = result;
		}
	});

	test('The "overlay" option', function() {

		ok(overlay_test1 == 'error', 'has a wrong value: error expected');
		ok(overlay_test2 == 'success', 'has an accepted value: success expected');

	});

	/* "Insertion" tests */

	var insertion_test1, insertion_test2;

	$('#alt_thumbs').desoSlide({
		main: {
			container: '#main_image',
			insertion: 'fail'
		},
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			insertion_test1 = result;
		}
	});

	$('#alt_thumbs').desoSlide({
		main: {
			container: '#main_image',
			insertion: 'prepend'
		},
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			insertion_test2 = result;
		}
	});

	test('The "insertion" option', function() {

		ok(insertion_test1 == 'error', 'has a wrong value: error expected');
		ok(insertion_test2 == 'success', 'has an accepted value: success expected');

	});

	/* "Effect" tests */

	var effect_test1, effect_test2;

	$('#alt_thumbs').desoSlide({
		main: {
			container: '#main_image'
		},
		effect: 'test',
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			effect_test1 = result;
		}
	});

	$('#alt_thumbs').desoSlide({
		main: {
			container: '#main_image'
		},
		effect: 'rotate',
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			effect_test2 = result;
		}
	});

	test('The "effect" option', function() {

		ok(effect_test1 == 'error', 'has a bad value: error expected');
		ok(effect_test2 == 'success', 'has an accepted value: success expected');

	});

	/* "alt" attribute tests */

	var alt_test1, alt_test2;

	$('#no_alt_thumbs').desoSlide({
		main: {
			container: '#main_image'
		},
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			alt_test1 = result;
		}
	});

	$('#alt_thumbs').desoSlide({
		main: {
			container: '#main_image'
		},
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			alt_test2 = result;
		}
	});

	test('The "alt" attribute', function() {

		ok(alt_test1 == 'warning', 'isn\'t specified: warning expected');
		ok(alt_test2 == 'success', 'is specified: success expected');

	});

	/* "data-caption" attribute tests */

	var data_caption_test1, data_caption_test2;

	$('#alt_thumbs').desoSlide({
		main: {
			container: '#main_image'
		},
		caption: true,
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			data_caption_test1 = result;
		}
	});

	$('#alt_caption_thumbs').desoSlide({
		main: {
			container: '#main_image'
		},
		caption: true,
		log: {
			errors: false,
			warnings: false
		},
		result: function(result) {
			data_caption_test2 = result;
		}
	});

	test('The "data-caption" attribute', function() {

		ok(data_caption_test1 == 'warning', 'isn\'t specified: warning expected');
		ok(data_caption_test2 == 'success', 'is specified: success expected');

	});

});
