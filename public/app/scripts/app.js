'use strict';

angular.module('pacApp', [
    'ngCookies',
    'ngSanitize',
    'vegaModule'
  ])
  .constant('chartHeight',  110)
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
