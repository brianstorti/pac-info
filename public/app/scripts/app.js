'use strict';

angular.module('pacApp', [
    'ngCookies',
    'ngSanitize',
    'vegaModule'
  ])
  .constant('chartHeight',  110)
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
