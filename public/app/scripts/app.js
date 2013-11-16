'use strict';

angular.module('pacApp', [
    'ngCookies',
    'ngSanitize',
    'vegaModule'
  ])
  .constant('emptyDataChart', {
    full: { table: [] },
    empty: { table: [] }
  })
  .constant('chartHeight',  110)
  .constant('API_URL',  'http://pac-info.herokuapp.com/ventures/')
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
  .directive('navLink', ['$location', function ($location) {
    return {
      restrict: 'A',
      link: function (scope, iElement, attrs) {
        var route = iElement.find('a').prop('href').replace('#', ''),
            locationChange = function(){ return $location.path(); },
            isDefault = angular.isDefined(attrs.navLinkDefault);

        scope.$watch(locationChange, function(path){
          iElement.removeClass('active');
          iElement.addClass( (route.search(path) >= 0 && path !== '/')?'active':'');
          iElement.addClass( (isDefault && path === '/')?'active':'');

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
  });
