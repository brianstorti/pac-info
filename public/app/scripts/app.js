'use strict';

angular.module('pacApp', [
    'ngCookies',
    'ngSanitize',
    'vegaModule'
  ])
  .constant('chartHeight',  110)
  .directive('onSlide', [function () {
    return {
      restrict: 'A',
      scope: {
        next: '&next',
        prev: '&prev'
      },
      link: function (scope, iElement) {
        iElement.on('slide.bs.carousel', function(e){
          scope.$apply( (e.direction === 'left') ? scope.next : scope.prev);
        });
      }
    };
  }])
  .factory('measureElement',  function(){
    return function(element) {
      return {
        width: parseInt(element.css('width').replace('px',''),10)
      };
    };
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
