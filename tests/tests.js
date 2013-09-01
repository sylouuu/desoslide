$(function() {

	// *****************
	// [BEGIN] Scenario 1 & 2
	// *****************

	describe('The main.container option', function() {
		it('isn\'t specified: error expected', function() {
			$('#scenario1_thumbs').desoSlide({
				log: {
					errors: false,
					warnings: false
				},
				result: function(result) {
					expect(result).toEqual('error');
				}
			});
		});
		it('is specified, but the selector doesn\'t exist: error expected', function() {
			$('#scenario2_thumbs').desoSlide({
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
			});
		});
	});

	// *****************
	// [END] Scenario 1 & 2
	// *****************

	// *****************
	// [BEGIN] Scenario 3 & 4
	// *****************

	describe('The thumbs container', function() {
		it('doesn\'t exist: error expected', function() {
			$('#scenario3_thumbs').desoSlide({
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
			});
		});
		it('exists but has no child: error expected', function() {
			$('#scenario4_thumbs').desoSlide({
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
			});
		});
	});

	// *****************
	// [END] Scenario 3 & 4
	// *****************

	// *****************
	// [BEGIN] Scenario 5
	// *****************

	describe('The "first" option', function() {
		it('has a bad value: error expected', function() {
			$('#scenario5_thumbs').desoSlide({
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
			});
		});
	});

	// *****************
	// [END] Scenario 5
	// *****************

	// *****************
	// [BEGIN] Scenario 6
	// *****************

	describe('The overlay option', function() {
		it('has a bad value: error expected', function() {
			$('#scenario5_thumbs').desoSlide({
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
			});
		});
	});

	// *****************
	// [END] Scenario 6
	// *****************

	// *****************
	// [BEGIN] Scenario 7
	// *****************

	describe('The main.insertion option', function() {
		it('has a bad value: error expected', function() {
			$('#scenario5_thumbs').desoSlide({
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
			});
		});
	});

	// *****************
	// [END] Scenario 7
	// *****************

	// *****************
	// [BEGIN] Scenario 8
	// *****************

	describe('The data-caption attribute', function() {
		it('isn\'t specified: warning expected', function() {
			$('#scenario5_thumbs').desoSlide({
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
			});
		});
	});

	// *****************
	// [END] Scenario 8
	// *****************

	// *****************
	// [BEGIN] Scenario 9
	// *****************

	describe('The alt attribute', function() {
		it('isn\'t specified: warning expected', function() {
			$('#scenario9_thumbs').desoSlide({
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
			});
		});
	});

	// *****************
	// [END] Scenario 9
	// *****************

	// *****************
	// [BEGIN] Scenario 10 & 11
	// *****************

	describe('The slider is well generated', function() {
		it('without caption: success expected', function() {
			$('#scenario10_thumbs').desoSlide({
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
			});
		});
		it('with caption: success expected', function() {
			$('#scenario11_thumbs').desoSlide({
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
			});
		});
	});

	// *****************
	// [END] Scenario 10 & 11
	// *****************

	// *****************
	// [BEGIN] Scenario 12
	// *****************

	describe('The effect option', function() {
		it('has a bad value: error expected', function() {
			$('#scenario10_thumbs').desoSlide({
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
			});
		});
	});

	// *****************
	// [END] Scenario 12
	// *****************

});
