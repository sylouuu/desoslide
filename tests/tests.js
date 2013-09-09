$(function() {

	// *****************
	// [BEGIN] Scenario 1 & 2
	// *****************

	test('The main.container option', function() {

		ok($('#scenario1_thumbs').desoSlide({
			log: {
				errors: false,
				warnings: false
			},
			result: function(result) {
				expect(result).toEqual('error');
			}
		}), 'isn\'t specified: error expected');

		ok($('#scenario2_thumbs').desoSlide({
			main: {
				container: '#scenario2'
			},
			log: {
				errors: false,
				warnings: false
			},
			result: function(result) {
				expect(result).toEqual('error');
			}
		}), 'is specified, but the selector doesn\'t exist: error expected');

	});

	// *****************
	// [END] Scenario 1 & 2
	// *****************


	// *****************
	// [BEGIN] Scenario 3 & 4
	// *****************

	test('The thumbs container', function() {

		ok($('#scenario3_thumbs').desoSlide({
			main: {
				container: '#scenario3'
			},
			log: {
				errors: false,
				warnings: false
			},
			result: function(result) {
				expect(result).toEqual('error');
			}
		}), 'doesn\'t exist: error expected');

		ok($('#scenario4_thumbs').desoSlide({
			main: {
				container: '#scenario4'
			},
			log: {
				errors: false,
				warnings: false
			},
			result: function(result) {
				expect(result).toEqual('error');
			}
		}), 'exists but has no child: error expected');

	});

	// *****************
	// [END] Scenario 3 & 4
	// *****************

	// *****************
	// [BEGIN] Scenario 5
	// *****************

	test('The "first" option', function() {

		ok($('#scenario5_thumbs').desoSlide({
			main: {
				container: '#scenario5'
			},
			caption: false,
			first: 4,
			log: {
				errors: false,
				warnings: false
			},
			result: function(result) {
				expect(result).toEqual('error');
			}
		}), 'has a bad value: error expected');

	});

	// *****************
	// [END] Scenario 5
	// *****************

	// *****************
	// [BEGIN] Scenario 6
	// *****************

	test('The overlay option', function() {

		ok($('#scenario5_thumbs').desoSlide({
			main: {
				container: '#scenario5'
			},
			overlay: 'fail',
			log: {
				errors: false,
				warnings: false
			},
			result: function(result) {
				expect(result).toEqual('error');
			}
		}), 'has a bad value: error expected');

	});

	// *****************
	// [END] Scenario 6
	// *****************

	// *****************
	// [BEGIN] Scenario 7
	// *****************

	test('The main.insertion option', function() {

		ok($('#scenario5_thumbs').desoSlide({
			main: {
				container: '#scenario5',
				insertion: 'fail'
			},
			log: {
				errors: false,
				warnings: false
			},
			result: function(result) {
				expect(result).toEqual('error');
			}
		}), 'has a bad value: error expected');

	});

	// *****************
	// [END] Scenario 7
	// *****************

	// *****************
	// [BEGIN] Scenario 8
	// *****************

	test('The data-caption attribute', function() {

		ok($('#scenario5_thumbs').desoSlide({
			main: {
				container: '#scenario5'
			},
			caption: true,
			log: {
				errors: false,
				warnings: false
			},
			result: function(result) {
				expect(result).toEqual('warning');
			}
		}), 'isn\'t specified: warning expected');

	});

	// *****************
	// [END] Scenario 8
	// *****************

	// *****************
	// [BEGIN] Scenario 9
	// *****************

	test('The alt attribute', function() {

		ok($('#scenario9_thumbs').desoSlide({
			main: {
				container: '#scenario9'
			},
			log: {
				errors: false,
				warnings: false
			},
			result: function(result) {
				expect(result).toEqual('warning');
			}
		}), 'isn\'t specified: warning expected');

	});

	// *****************
	// [END] Scenario 9
	// *****************

	// *****************
	// [BEGIN] Scenario 10 & 11
	// *****************

	test('The slider is well generated', function() {

		ok($('#scenario10_thumbs').desoSlide({
			main: {
				container: '#scenario10'
			},
			log: {
				errors: false,
				warnings: false
			},
			result: function(result) {
				expect(result).toEqual('success');
			}
		}), 'without caption: success expected');

		ok($('#scenario11_thumbs').desoSlide({
			main: {
				container: '#scenario11'
			},
			caption: true,
			log: {
				errors: false,
				warnings: false
			},
			result: function(result) {
				expect(result).toEqual('success');
			}
		}), 'with caption: success expected');

	});

	// *****************
	// [END] Scenario 10 & 11
	// *****************

	// *****************
	// [BEGIN] Scenario 12
	// *****************

	test('The effect option', function() {

		ok($('#scenario10_thumbs').desoSlide({
			main: {
				container: '#scenario10'
			},
			effect: 'test',
			log: {
				errors: false,
				warnings: false
			},
			result: function(result) {
				expect(result).toEqual('error');
			}
		}), 'has a bad value: error expected');

	});

	// *****************
	// [END] Scenario 12
	// *****************

});
