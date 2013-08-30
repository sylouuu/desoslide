// [BEGIN] documentation demo
$(function() {

	$('#go_to_step1').on('click', function() {
		$('ul.nav-tabs a:first').tab('show');
	});

	$('#wizard_thumbs').desoSlide({
		displayCaption: 'always',
		mainImage: '#wizard_mainImage'
	});

	$('#ex1_thumbs').desoSlide({
		autoStart: true,
		enableCaption: false,
		enableControlsKeys: false,
		firstImg: 1,
		mainImage: '#ex1_mainImage'
	});

	$('#ex2_thumbs').desoSlide({
		displayCaption: 'hover',
		enableControls: false,
		mainImage: '#ex2_mainImage'
	});

});
// [END] documentation demo