app.directive('desoslide', function () {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).desoSlide(scope.$eval(attrs.options));
        }
    };
});
