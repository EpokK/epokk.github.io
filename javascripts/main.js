myApp = angular.module("myApp", []);
myApp.controller("myCtrl", function($scope){
	var countNgIncludLoaded = 0;
	$scope.articles = [];
	$scope.articles.push({url: 'articles/9.html', title: "Quiche a la ratatouille"});
	$scope.articles.push({url: 'articles/8.html', title: "Yoh man !"});
	$scope.articles.push({url: 'articles/7.html', title: "Pates a la Carbonara"});
	$scope.articles.push({url: 'articles/6.html', title: "Input like Gmail contact"});
	$scope.articles.push({url: 'articles/5.html', title: "Tarte aux mirabelles"});
	$scope.articles.push({url: 'articles/4.html', title: "Ractive.js : Alternative a AngularJS"});
	$scope.articles.push({url: 'articles/3.html', title: "Quelques directives Angular"});
	$scope.articles.push({url: 'articles/2.html', title: "Ma configuration pour Sublime Text"});
	$scope.articles.push({url: 'articles/1.html', title: "Le BOLD c'est la vie"});

	$scope.$on('$includeContentLoaded', function(event) {
		countNgIncludLoaded++;
		if(countNgIncludLoaded == $scope.articles.length) {
			$('pre code').each(function(i, e) { hljs.highlightBlock(e); });
		}
	});
});

myApp.directive('ngBlur', function() {
	return function( scope, elem, attrs ) {
		elem.bind('blur', function() {
			scope.$apply(attrs.ngBlur);
		});
	};
});