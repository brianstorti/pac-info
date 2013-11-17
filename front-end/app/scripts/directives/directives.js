'use strict';

angular.module('pacApp')
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
  .directive('pacRandomColor', ['shuffle', function (shuffle) {
    return {
      restrict: 'A',
      link: function (scope, iElement) {
        var colors = shuffle(['#FBAD2F', '#68D286','#1DA1CD', '#EB585C', '#A085C6', '#FF8FB4', '#FDD26D']);
        iElement.css('color', colors[parseInt(Math.random()*colors.length, 10)]);
      }
    };
  }])
  .directive('navbarPrincipal', [function () {
    return {
      restrict: 'A',
      link: function (scope, iElement, iAttrs) {
        var baseTop = iElement.offset().top,
            top = baseTop,
            elementHeight = parseInt(iElement.css('height').replace('px',''),10);

        angular.element(window).scroll(function(){
          var windowTop = angular.element(window).scrollTop();

          if(windowTop > top){
            iElement.addClass('navbar-fixed-top');
            top = baseTop;
            angular.element('body').css('padding-top', elementHeight);
          } else {
            iElement.removeClass('navbar-fixed-top');
            top = iElement.offset().top;
            angular.element('body').css('padding-top', 0);
            baseTop = iElement.offset().top;
          }
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
  }]);