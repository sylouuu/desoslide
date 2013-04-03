// syntax highlighting
hljs.initHighlightingOnLoad();

// [BEGIN] documentation demo
$(function() {

	// show the first wizard step
	$('#steps a:last').tab('show');
	
	
	$('#wizard_thumbs').desoSlide({
		mainImage: '#wizard_mainImage',
		displayCaption: 'always'
	});
	
	$('#ex1_thumbs').desoSlide({
		mainImage: '#ex1_mainImage',
		disableCaption: true
	});
	
	
	
});
// [END] documentation demo