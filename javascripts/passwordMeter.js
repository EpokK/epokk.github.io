// 'use strict';

// myApp.directive('passwordMeter', function($timeout) {
//   return {
//     restrict: 'AE',
//     replace: true,
//     scope: {
//       password: '='
//     },
//     templateUrl: '../views/passwordMeter.html',
//     link: function link(scope, element, attrs) {
//       $(element).find('input').complexify({
//         minimumChars: 6,
//         strengthScaleFactor: 1
//       }, function(valid, complexity) {
//         scope.complexity = complexity;
//       });
//       scope.$watch('password', function() {
//         if(!scope.password) {
//           scope.complexity = 0;
//         }
//       });
//     }
//   };
// });