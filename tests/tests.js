$(window).load(function() {

	// *****************
	// [BEGIN] Scenario 1 & 2
	// *****************
	
	describe('The mainImage param', function() {
		it('isn\'t specified: trigger an error', function() {
			$('#scenario1_thumbs').desoSlide({
				displayErrors: false,
				displayWarnings: false,
				result: function(result) {
					expect(result).toEqual('error');
				}
			});
		});
		it('is specified, but the selector doesn\'t exist: trigger an error', function() {
			$('#scenario2_thumbs').desoSlide({
				mainImage: '#scenario2',
				displayErrors: false,
				displayWarnings: false,
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
		it('doesn\'t exists: trigger an error', function() {
			$('#scenario3_thumbs').desoSlide({
				mainImage: '#scenario3',
				displayWarnings: false,
				displayErrors: false,
				result: function(result) {
					expect(result).toEqual('error');
				}
			});
		});
		it('but has no child: trigger an error', function() {
			$('#scenario4_thumbs').desoSlide({
				mainImage: '#scenario4',
				displayWarnings: false,
				displayErrors: false,
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

	describe('The firstImg param', function() {
		it('has a bad value: trigger an error', function() {
			$('#scenario5_thumbs').desoSlide({
				mainImage: '#scenario5',
				enableCaption: false,
				firstImg: 4,
				displayWarnings: false,
				displayErrors: false,
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

	describe('The displayCaption param', function() {
		it('has a bad value: trigger an error', function() {
			$('#scenario5_thumbs').desoSlide({
				mainImage: '#scenario5',
				displayCaption: 'fail',
				displayWarnings: false,
				displayErrors: false,
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
	
	describe('The insertion param', function() {
		it('has a bad value: trigger an error', function() {
			$('#scenario5_thumbs').desoSlide({
				mainImage: '#scenario5',
				insertion: 'fail',
				displayWarnings: false,
				displayErrors: false,
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
		it('isn\'t specified: trigger a warning', function() {
			$('#scenario5_thumbs').desoSlide({
				mainImage: '#scenario5',
				displayWarnings: false,
				displayErrors: false,
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
		it('isn\'t specified: trigger a warning', function() {
			$('#scenario9_thumbs').desoSlide({
				mainImage: '#scenario9',
				displayWarnings: false,
				displayErrors: false,
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
	// [BEGIN] Scenario 10
	// *****************
	
	describe('The slider is well generated, without caption', function() {
		it('triggers a success', function() {
			$('#scenario10_thumbs').desoSlide({
				mainImage: '#scenario10',
				enableCaption: false,
				displayWarnings: false,
				displayErrors: false,
				result: function(result) {
					expect(result).toEqual('success');
				}
			});
		});
	});
	
	// *****************
	// [END] Scenario 9
	// *****************
	
	// *****************
	// [BEGIN] Scenario 11
	// *****************
	
	describe('The slider is well generated, with caption', function() {
		it('triggers a success', function() {
			$('#scenario11_thumbs').desoSlide({
				mainImage: '#scenario11',
				displayWarnings: false,
				displayErrors: false,
				result: function(result) {
					expect(result).toEqual('success');
				}
			});
		});
	});
	
	// *****************
	// [END] Scenario 9
	// *****************
	
});