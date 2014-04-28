/* APP */
var myApp = angular.module("myApp", ['ui', 'LocalStorageModule']);

/* ROUTES */

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/blog', {
			templateUrl: 'views/main.html',
			controller: 'MainCtrl'
		})
		.when('/cv', {
			templateUrl: 'views/cv.html',
			controller: 'CvCtrl'
		})
        .when('/todo', {
            templateUrl: 'views/todo.html',
            controller: 'TodoCtrl'
        })
        .when('/shop', {
            templateUrl: 'views/shop.html',
            controller: 'ShopCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/box', {
            templateUrl: 'views/box.html',
            controller: 'BoxCtrl'
        })
		.otherwise({
			redirectTo: '/blog'
		});
}]).run(['$rootScope', '$location', function($rootScope, $location){
    var path = function() {
        return $location.path();
    };

    $rootScope.$watch(path, function(newVal, oldVal){
        $rootScope.activetab = newVal;
    });
}]);

/* CONTROLLERS */

myApp.controller("MainCtrl", function($scope){
	var countNgIncludLoaded = 0;
	$scope.articles = [];
    $scope.articles.push({show:false, url: 'articles/21.md', title: "Je te quitte, Google Musique"});
    $scope.articles.push({show:false, url: 'articles/20.md', title: "Veloute de courge"});
    $scope.articles.push({show:false, url: 'articles/19.md', title: "Meteor"});
    $scope.articles.push({show:false, url: 'articles/18.html', title: "Tuto directive [PART2]"});
    $scope.articles.push({show:false, url: 'articles/17.md', title: "Plus c'est gros, plus c'est bon"});
	$scope.articles.push({show:false, url: 'articles/16.md', title: "La buche du pere Noel"});
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

    // $scope.$on('$viewContentLoaded', function() {
    //     if(param1 && param1 < $scope.articles.length) {
    //         $scope.showArticle($scope.articles[parseInt(param1) - 1]);
    //     }
    // });

	$scope.showArticle = function(article) {
		article.show =! article.show;
		article.url2 = article.url;
	};
});

myApp.controller("CvCtrl", function($scope, $timeout){
	var date = new Date();
    var birthday = new Date(1987, 12, 15);

	$scope.showExperience = true;
	$scope.showEducation = true;
	$scope.detail1 = false;
	$scope.detail2 = false;
	$scope.detail3 = false;
	$scope.age = Math.floor((date - birthday) / 31536000000);

	$scope.initCv = function() {
		// $('.tooltipTarget').tooltip();
		// $('.progress').tooltip();
		$('.popoverTarget').popover();
	};
});

myApp.controller("LoginCtrl", function($scope){

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

    $scope.removeTask = function(task) {
        var index = $scope.tasks.indexOf(task);
        if(index !== -1) {
            $scope.tasks.splice(index, 1);
        }
    };

    $scope.addTask = function() {
        $scope.tasks.push({
            title: $scope.newTask,
            done: false,
            date: new Date()
        });
        $scope.newTask = '';
    };

    $scope.onBlur = function(task) {
        var index = $scope.tasks.indexOf(task);
        if(index !== -1) {
            $scope.tasks[index].edit = false;
        }
    };
});

myApp.controller('ShopCtrl', function($scope) {
    $scope.articles = [
        {name: 'panda', price: 1.2, quantity: 1},
        {name: 'renard', price: 0.8, quantity: 1},
        {name: 'tigre', price: 1.0, quantity: 1},
        {name: 'tortue', price: 0.2, quantity: 4}
    ];

    $scope.removeArticle = function(article) {
        var index = $scope.articles.indexOf(article);
        if(index !== -1) {
            $scope.articles.splice(index, 1);
        }
    };

   $scope.totalArticle = function(article) {
        return Math.round(article.price * article.quantity * 10) / 10;
   };

    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.articles, function(article) {
            total += $scope.totalArticle(article);
        });
        return Math.round(total * 10) / 10;
    };

    $scope.quantity = function() {
        var total = 0;
        angular.forEach($scope.articles, function(article) {
            total += article.quantity;
        });
        return total;
    }
});

myApp.controller('BoxCtrl', function($scope) {

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

myApp.directive('passwordMeter', function($timeout) {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      password: '='
    },
    templateUrl: '../views/passwordMeter.html',
    link: function link(scope, element, attrs) {
      $('#password').complexify({
        minimumChars: 6,
        strengthScaleFactor: 1
      }, function(valid, complexity) {
        console.log(complexify);
        scope.complexity = complexity;
      });
      scope.$watch('password', function() {
        if(!scope.password) {
          scope.complexity = 0;
        }
      });
    }
  };
});