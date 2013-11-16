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
      },
      link: function (scope, iElement) {
        var view;

        function drawChart() {
          var spec = scope.spec(iElement, scope.data);
          if(!view){
            vega.parse.spec(spec, function(chart){
              view = chart({el: iElement[0], data: scope.data}).update();
            });
          } else {
            view.width(spec.width)
              .data(scope.data)
              .update({duration: 1000});
          }
        }

        scope.$watch('data', drawChart);
        angular.element(window).on('resize', drawChart);
      }
    };
  }]);
