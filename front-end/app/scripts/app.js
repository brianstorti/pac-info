'use strict';

angular.module('pacApp', [
    'vegaModule'
  ])
  .constant('emptyDataChart', {
    full: { table: [] },
    empty: { table: [] }
  })
  .constant('chartHeight',  110)
  .factory('apiUrl', function(){
    return function(path){
      var baseUrl = 'http://pac-info.herokuapp.com/ventures',
          mockUrl = 'http://localhost:9000/mock-api';

      return baseUrl + path;
    };
  })
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
          var pathDefault = path === '/' || path === '';

          iElement.removeClass('active');
          iElement.addClass( (route.search(path) >= 0 && !pathDefault)?'active':'');
          iElement.addClass( (isDefault && pathDefault)?'active':'');

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
