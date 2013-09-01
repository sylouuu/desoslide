$(function() {

	/* Link to first tab */
	$('#go_to_step1').on('click', function() {
		$('ul.nav-tabs a:first').tab('show');
	});

	/* Wizard example */
	$('#wizard_thumbs').desoSlide({
		main: {
			container: '#wizard_mainImage',
			cssClass: 'img-responsive'
		},
		caption: true
	});

	/* First example */
	$('#ex1_thumbs').desoSlide({
		main: {
			container: '#ex1_mainImage',
			cssClass: 'img-responsive'
		},
		auto: {
			start: true
		},
		first: 1,
		effect: 'roll',
		controls: {
			keys: false
		}
	});

	/* Second example */
	$('#ex2_thumbs').desoSlide({
		main: {
			container: '#ex2_mainImage',
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