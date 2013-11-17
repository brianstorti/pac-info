'use strict';

angular.module('vegaModule', [])
	.service('vega', function(){
		return window.vg;
	})
  .service('screen', [function () {

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

    angular.element(window).on('scroll', function scroll(){
      var windowTop = angular.element(window).scrollTop(),
          windowHeight = window.innerHeight;

      angular.forEach(trackedElements, function(element){
        var elementTop = angular.element(element).offset().top,
            trackInfo = tracksInfo[trackedElements.indexOf(element)],
            elementHeight = parseInt(angular.element(element).css('height').replace('px',''),10);

        if(windowTop + windowHeight > elementTop + elementHeight){
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
    });


    scroll();

  }])
  .directive('vegaChart', ['vega', 'screen', function (vega, screen) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        spec: '=',
        opts: '='
      },
      link: function (scope, iElement) {
        var view, isInTheView = false;
        scope.$watch('ready', drawChartReady);
        scope.$watch('data', drawChartReady);
        angular.element(window).on('resize', drawChartReady);
        angular.element(window).on('scroll', drawChartReady);

        screen.trackElement(iElement).onEnter(function(){
          isInTheView = true;
          drawChartReady();
        });

        screen.trackElement(iElement).onLeave(function(){
          isInTheView = false;
        });

        function drawChart() {
          var dataFull = scope.data.full || scope.data,
              dataEmpty = scope.data.empty || scope.data,
              opts = scope.opts || {};

          var spec = scope.spec(iElement, dataFull, opts);

          if(!view){
            vega.parse.spec(spec, function(chart){
              view = chart({el: iElement[0], data: dataEmpty}).update();
              setTimeout(function(){
                view.data(dataFull).update({duration: 1000});
              },500);
            });
          } else {
            view.width(spec.width)
              .data(dataFull)
              .update({duration: 1000});
          }
        }

        function drawChartReady() {
          var hasData = scope.data && scope.data.full && scope.data.full.table && scope.data.full.table.length > 0

          if(hasData && isInTheView){
            drawChart();
            angular.element(window).off('scroll', drawChartReady);
          }
        }

      }
    };
  }]);
