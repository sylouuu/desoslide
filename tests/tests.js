$(function() {

	// *****************
	// [BEGIN] Scenario 1 & 2
	// *****************
	
	var scenario1 = $('#scenario1_thumbs').desoSlide({
		displayErrors: false
	});

	var scenario2 = $('#scenario2_thumbs').desoSlide({
		mainImage: '#scenario2',
		displayErrors: false
	});
	
	describe('The mainImage param', function() {
		it('isn\'t specified: trigger an error', function() {
			expect(scenario1).toBe(false);
		});
		it('is specified, but the selector doesn\'t exist: trigger an error', function() {
			expect(scenario2).toBe(false);
		});
	});
	
	// *****************
	// [END] Scenario 1 & 2
	// *****************

	// *****************
	// [BEGIN] Scenario 3 & 4
	// *****************

	var scenario3 = $('#scenario3_thumbs').desoSlide({
		mainImage: '#scenario3',
		displayErrors: false
	});
	
	var scenario4 = $('#scenario4_thumbs').desoSlide({
		mainImage: '#scenario4',
		displayErrors: false
	});
	
	describe('The thumbs container', function() {
		it('doesn\'t exists: trigger an error', function() {
			expect(scenario3).toBe(false);
		});
		it('but has no child: trigger an error', function() {
			expect(scenario4).toBe(false);
		});
	});
	
	// *****************
	// [END] Scenario 3 & 4
	// *****************
	
	// *****************
	// [BEGIN] Scenario 5
	// *****************
	
	var scenario5 = $('#scenario5_thumbs').desoSlide({
		mainImage: '#scenario5',
		enableCaption: false,
		imgFirst: 4,
		displayErrors: false
	});

	describe('The imgFirst param', function() {
		it('has a bad value: trigger an error', function() {
			expect(scenario5).toBe(false);
		});
	});
	
	// *****************
	// [END] Scenario 5
	// *****************
	
	// *****************
	// [BEGIN] Scenario 6
	// *****************
	
	var scenario6 = $('#scenario5_thumbs').desoSlide({
		mainImage: '#scenario5',
		displayCaption: 'fail',
		displayWarnings: false,
		displayErrors: false
	});

	describe('The displayCaption param', function() {
		it('has a bad value: trigger an error', function() {
			expect(scenario6).toBe(false);
		});
	});
	
	// *****************
	// [END] Scenario 6
	// *****************
	
	// *****************
	// [BEGIN] Scenario 7
	// *****************
	
	var scenario7 = $('#scenario5_thumbs').desoSlide({
		mainImage: '#scenario5',
		insertion: 'fail',
		enableCaption: false,
		displayWarnings: false,
		displayErrors: false
	});

	describe('The insertion param', function() {
		it('has a bad value: trigger an error', function() {
			expect(scenario7).toBe(false);
		});
	});
	
	// *****************
	// [END] Scenario 7
	// *****************
	
	// *****************
	// [BEGIN] Scenario 8
	// *****************
	
	var scenario8 = $('#scenario5_thumbs').desoSlide({
		mainImage: '#scenario5',
		displayWarnings: false
	});

	describe('The data-caption attribute', function() {
		it('isn\'t specified: trigger a warning', function() {
			expect(scenario8).toBe(false);
		});
	});
	
	// *****************
	// [END] Scenario 8
	// *****************
	
	// *****************
	// [BEGIN] Scenario 9
	// *****************
	
	var scenario9 = $('#scenario9_thumbs').desoSlide({
		mainImage: '#scenario9',
		displayWarnings: false
	});

	describe('The alt attribute', function() {
		it('isn\'t specified: trigger a warning', function() {
			expect(scenario9).toBe(false);
		});
	});
	
	// *****************
	// [END] Scenario 9
	// *****************
	
	// *****************
	// [BEGIN] Scenario 10
	// *****************
	
	var scenario10 = $('#scenario10_thumbs').desoSlide({
		mainImage: '#scenario10',
		enableCaption: false,
		displayWarnings: false,
		displayErrors: false
	});

	describe('The slider is well generated, without caption', function() {
		it('triggers a success', function() {
			expect(scenario10.selector).toEqual('#scenario10_thumbs');
		});
	});
	
	// *****************
	// [END] Scenario 9
	// *****************
	
	// *****************
	// [BEGIN] Scenario 11
	// *****************
	
	var scenario11 = $('#scenario11_thumbs').desoSlide({
		mainImage: '#scenario11',
		displayWarnings: false,
		displayErrors: false
	});

	describe('The slider is well generated, with caption', function() {
		it('triggers a success', function() {
			expect(scenario11.selector).toEqual('#scenario11_thumbs');
		});
	});
	
	// *****************
	// [END] Scenario 9
	// *****************
	

});

