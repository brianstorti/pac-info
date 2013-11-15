'use strict';

angular.module('vegaModule', [])
	.service('vega', function(){
		return window.vg;
	})
  .service('vegaBarSpec', function(){
    return {
      'width': 400,
      'height': 200,
      'padding': { 'top': 10, 'left': 30, 'bottom': 30, 'right': 10 },
      'data': [{ 'name': 'table' }],
      'scales': [
        {
          'name': 'x',
          'type': 'ordinal',
          'range': 'width',
          'domain': { 'data': 'table', 'field': 'data.x' }
        },
        {
          'name': 'y',
          'range': 'height',
          'nice': true,
          'domain': { 'data': 'table', 'field': 'data.y' }
        }
      ],
      'axes': [
        {
          'type': 'x',
          'scale': 'x',
          'properties': {
            'axis': { 'strokeWidth': { 'value': 0 } },
            'majorTicks': { 'strokeWidth': {'value': 0} },
            'labels': {
              'fill': { 'value': '#FFF' },
              'fontSize': { 'value': 14 },
              'align': { 'value': 'center'},
              'dx': { 'value': 0 }
            }
          }
        }
      ],
      'marks': [
        {
          'type': 'rect',
          'from': { 'data': 'table' },
          'properties': {
            'enter': {
              'x': {
                'scale': 'x',
                'field': 'data.x',
                'offset': 20
              },
              'width': { 'value': 60 },
              'y': {
                'scale': 'y',
                'field': 'data.y'
              },
              'y2': {
                'scale': 'y',
                'value': 0
              }
            },
            'update': {
              'fill': { 'value': '#FFF' }
            },
            'hover': {
              'fill': { 'value': '#FFF' }
            }
          }
        }
      ]
    };
  })
  .directive('vegaChart', ['vega', function (vega) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        spec: '=',
      },
      link: function (scope, iElement) {
        scope.$watch('spec', function(spec){
          if(!spec) { return; }

          vega.parse.spec(spec, function(chart){
            chart({el: iElement[0], data: scope.data.table}).update();
          });

        });
      }
    };
  }]);
