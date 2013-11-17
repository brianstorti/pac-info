'use strict';

angular.module('vegaModule', [])
	.service('vega', function(){
		return window.vg;
	})
  .service('screen', ['$timeout',function ($timeout) {

    var trackedElements = [],
        tracksInfo = [];

    this.trackElement = function(element){
      var track = {
        onEnter: angular.noop,
        onLeave: angular.noop,
        onCenter: angular.noop,
        didEnter: false,
        didCenter: false,
        didLeave: false
      };

      trackedElements.push(element);
      tracksInfo.push(track);


      return {
        onEnter: function(callback){
          track.onEnter = callback;
        },
        onLeave: function(callback){
          track.onLeave = callback;
        },
        onCenter: function(callback){
          track.onCenter = callback;
        }
      };
    };

    function doScroll(){
      var windowTop = angular.element(window).scrollTop(),
          windowHeight = window.innerHeight;

      angular.forEach(trackedElements, function(element){
        var elementTop = angular.element(element).offset().top,
            trackInfo = tracksInfo[trackedElements.indexOf(element)],
            elementHeight = parseInt(angular.element(element).css('height').replace('px',''),10);

        if(windowTop + windowHeight > elementTop + elementHeight - elementHeight/3){
          if(!trackInfo.didEnter){
            trackInfo.didEnter = true;
            trackInfo.onEnter.call();
          }
        } else if ( trackInfo.didEnter ){
          trackInfo.didEnter = false;
          trackInfo.didCenter = false;
          trackInfo.onLeave.call();
        }

      });
    }
    angular.element(window).on('scroll', doScroll);
    $timeout(function(){
      doScroll();
    });

  }])
  .directive('vegaChart', ['vega', 'screen', 'chartSize', function (vega, screen, chartSize) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        spec: '=',
        duration: '@'
      },
      link: function (scope, iElement) {
        var view;
        scope.isInTheView = false;
        scope.animate = scope.animate || true;

        scope.$watch('data', drawChartReady);
        angular.element(window).on('resize', drawChartReady);

        screen.trackElement(iElement).onEnter(function(){
          scope.isInTheView = true;
          drawChartReady();
        });

        screen.trackElement(iElement).onLeave(function(){
          scope.isInTheView = false;
        });

        function drawChart() {
          var dataFull = scope.data.full,
              dataEmpty = scope.data.empty,
              width = chartSize(iElement).width,
              spec = scope.spec(iElement, dataFull, width, width < 300);


          if(!view){
            vega.parse.spec(spec, function(chart){
              view = chart({el: iElement[0], data: dataEmpty}).update();
              setTimeout(function(){
                view.data(scope.isInTheView ? dataFull : dataEmpty).update({duration: 1000});
              },500);
            });
          } else {
            view.width(spec.width)
              .data(dataFull)
              .update({duration: 1000});
          }
        }

        function drawChartReady() {
          var hasData = (scope.data && scope.data.full && scope.data.full.table && scope.data.full.table.length > 0);

          if(hasData){
            drawChart();
          }
        }

      }
    };
  }]);
