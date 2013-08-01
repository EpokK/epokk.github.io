myApp = angular.module("myApp", []);
myApp.controller("myCtrl", function($scope){
	$scope.a1 = true;
	$scope.a2 = true;
	$scope.a3 = {
		show: true,
		gist: 1
	};
	$scope.a4 = {
		show: true
	};
	$scope.a5 = {
		show: true
	};
	$scope.a6 = {
		show: true,
		value: '',
		save: ''
	};
	$scope.a7 = {
		show: true
	};
});

myApp.directive('ngBlur', function() {
	return function( scope, elem, attrs ) {
		elem.bind('blur', function() {
			scope.$apply(attrs.ngBlur);
		});
	};
});