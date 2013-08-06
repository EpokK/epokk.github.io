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
	$scope.a8 = {
		show: true
	};
	$scope.a9 = {
		show: true
	};
	$scope.articles = [];
	$scope.articles.push({url: 'articles/9.html', title: "Quiche a la ratatouille"});
	$scope.articles.push({url: 'articles/8.html', title: "Yoh man !"});
	$scope.articles.push({url: 'articles/7.html', title: "P&acirc;tes &agrave; la Carbonara"});
	$scope.articles.push({url: 'articles/6.html', title: "Input like Gmail contact"});
	$scope.articles.push({url: 'articles/5.html', title: "Tarte aux mirabelles"});
	$scope.articles.push({url: 'articles/4.html', title: "Ractive.js : Alternative &agrave; AngularJS"});
	$scope.articles.push({url: 'articles/3.html', title: "Quelques directives Angular"});
	$scope.articles.push({url: 'articles/2.html', title: "Ma configuration pour Sublime Text"});
	$scope.articles.push({url: 'articles/1.html', title: "Le BOLD c'est la vie"});
});

myApp.directive('ngBlur', function() {
	return function( scope, elem, attrs ) {
		elem.bind('blur', function() {
			scope.$apply(attrs.ngBlur);
		});
	};
});