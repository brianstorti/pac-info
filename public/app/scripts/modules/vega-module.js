'use strict';

angular.module('vegaModule', [])
	.service('vega', function(){
		return window.vg;
	})
  .directive('vegaChart', ['vega', function (vega) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        spec: '=',
        opts: '='
      },
      link: function (scope, iElement) {
        var view;

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

        scope.$watch('data', drawChart);
        angular.element(window).on('resize', drawChart);
      }
    };
  }]);
