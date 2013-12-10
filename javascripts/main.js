/* APP */
var myApp = angular.module("myApp", ['ui', 'LocalStorageModule']);

/* ROUTES */

myApp.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainCtrl'
		})
		.when('/cv', {
			templateUrl: 'views/cv.html',
			controller: 'CvCtrl'
		})
        .when('/quizz', {
            templateUrl: 'views/quizz.html',
            controller: 'QuizzCtrl'
        })
        .when('/todo', {
            templateUrl: 'views/todo.html',
            controller: 'TodoCtrl'
        })
		.otherwise({
			redirectTo: '/'
		});
});

/* CONTROLLERS */

myApp.controller("MainCtrl", function($scope){
	var countNgIncludLoaded = 0;

	$scope.articles = [];
	$scope.articles.push({show:false, url: 'articles/15.md', title: "Manges le carrosse de Cendrillon!"});
	$scope.articles.push({show:false, url: 'articles/14.html', title: "Tuto directive [PART1]"});
	$scope.articles.push({show:false, url: 'articles/13.md', title: "Mini-cakes moelleux et son coeur fondant"});
	$scope.articles.push({show:false, url: 'articles/12.md', title: "Soupe a la creme de poireaux"});
	$scope.articles.push({show:false, url: 'articles/11.md', title: "Moment.js"});
	// $scope.articles.push({show:false, url: 'articles/10.md', title: "Transclude tu connais ?"});
	$scope.articles.push({show:false, url: 'articles/9.html', title: "Quiche a la ratatouille"});
	$scope.articles.push({show:false, url: 'articles/8.html', title: "Yoh man !"});
	$scope.articles.push({show:false, url: 'articles/7.html', title: "Pates a la Carbonara"});
	$scope.articles.push({show:false, url: 'articles/6.html', title: "Input like Gmail contact"});
	$scope.articles.push({show:false, url: 'articles/5.html', title: "Tarte aux mirabelles"});
	$scope.articles.push({show:false, url: 'articles/4.html', title: "Ractive.js : Alternative a AngularJS"});
	$scope.articles.push({show:false, url: 'articles/3.html', title: "Quelques directives Angular"});
	$scope.articles.push({show:false, url: 'articles/2.html', title: "Ma configuration pour Sublime Text"});
	$scope.articles.push({show:false, url: 'articles/1.html', title: "Le BOLD c'est la vie"});

	$scope.$on('$includeContentLoaded', function() {
		countNgIncludLoaded++;
		if(countNgIncludLoaded == $scope.articles.length) {
			$('pre code').each(function(i, e) { hljs.highlightBlock(e); });
		}
	});

	$scope.showArticle = function(article) {
		article.show =! article.show;
		article.url2 = article.url;
	};
});

myApp.controller("CvCtrl", function($scope, $timeout){
	$scope.showExperience = true;
	$scope.showEducation = true;
	$scope.detail1 = false;
	$scope.detail2 = false;
	$scope.detail3 = false;

	$scope.initCv = function() {
		$('.tooltipTarget').tooltip();
		$('.progress').tooltip();
		$('.popoverTarget').popover();
	};
});

myApp.controller("TodoCtrl", function($scope, localStorageService) {
    $scope.tasks = localStorageService.get('localTasks');
    $scope.sort = 'title';

    if($scope.tasks === null) {
        $scope.tasks = [
            {
                title: 'Acheter du pain',
                done: false,
                favorite: true
            },
            {
                title: 'Poster une lettre',
                done: false
            }
        ];
    }

    $scope.$watch('tasks', function() {
        localStorageService.add('localTasks', $scope.tasks);
    }, true);

    $scope.dones = function() {
        var dones = 0;
        angular.forEach($scope.tasks, function(value){
            if(value.done) {
                dones++;
            }
        });
        return dones;
    };

    $scope.removeTask = function(index) {
        $scope.tasks.splice(index, 1);
    };

    $scope.addTask = function() {
        $scope.tasks.push({
            title: $scope.newTask,
            done: false,
            date: new Date()
        });
        $scope.newTask = '';
    };

    $scope.onBlur = function(index) {
        $scope.tasks[index].edit = false;
    };
});

myApp.controller("QuizzCtrl", function($scope) {
    $scope.highlight = function() {
        var codes = angular.element("pre code");
        angular.forEach(codes, function(value, key) {
            hljs.highlightBlock(value);
        });
    };
});

/* DIRECTIVES */

myApp.directive('ngBlur', function() {
	return function( scope, elem, attrs ) {
		elem.bind('blur', function() {
			scope.$apply(attrs.ngBlur);
		});
	};
});

myApp.directive('markdown', function () {
	var converter = new Showdown.converter();
	return {
		restrict: 'AE',
		link: function (scope, element, attrs) {
			if (attrs.btfMarkdown) {
				scope.$watch(attrs.btfMarkdown, function (newVal) {
					var html = converter.makeHtml(newVal);
					element.html(html);
				});
			} else {
				var html = converter.makeHtml(element.text());
				element.html(html);
			}
		}
	};
});