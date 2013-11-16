'use strict';

angular.module('pacApp')
	.factory('estagioSpec', ['measureElement', function(measureElement){
		return function(element, data) {
			var estagios = [], colors = [];

      for (var i = 0;i < data.table.length; i++) {
        estagios.push(data.table[i].estagio+' :  '+data.table[i].total);
        colors.push(data.table[i].color);
      }

			return {
        'width': measureElement(element).width,
        'height': 400,
        'padding': { 'top': 10, 'left': 10, 'bottom': 10, 'right': 10 },
        'data': [{
          'name': 'table',
          'transform': [{'type': 'pie', 'value': 'data.total'}]
        }],
        'scales':
        [
          {
            'name': 'r',
            'type': 'sqrt',
            'domain': {'data': 'table', 'field': 'data.total'},
            'range': [130, 180]
          },
          {
            'name': 'size',
            'type': 'linear',
            'sort': true,
            'domain': {'data': 'table', 'field': 'data.total'},
            'range': [100, 1000]
          },
          {
            'name': 'estagios',
            'type': 'ordinal',
            'sort': true,
            'domain': {'data': 'table', 'field': 'data.total'},
            'range': estagios
          },
          {
            'name': 'color',
            'type': 'ordinal',
            'sort': true,
            'domain': {'data': 'table', 'field': 'data.total'},
            'range': colors
          }
        ],
        'legends': [{
          'size': 'size',
          'fill': 'color',
          'orient': 'left',
          'properties': {
            'title': {
              'fontSize': {'value': 16}
            },
            'symbols': {
              'stroke': {'value': 'transparent'},
              'shape': {'value': 'square'}
            },
            'labels': {
              'fill': {'value': '#656567'},
              'fontSize': {'value': 16},
              'fontFamily': {'value': 'Helvetica'},
              'text': {'scale': 'estagios'}
            },
            'legend': {
              'padding': {'value': 10},
              'stroke': {'value': '#ccc'},
              'strokeWidth': {'value': 0},
              'x': {'value': 0},
              'y': {'value': 10}
            }
          }
        }],
        'marks': [
          {
            'type': 'arc',
            'from': { 'data': 'table' },
            'properties': {
              'enter': {
                'x': {'group': 'width', 'mult': 0.7},
                'y': {'group': 'height', 'mult': 0.5},
                'startAngle': {'field': 'startAngle'},
                'endAngle': {'field': 'endAngle'},
                'innerRadius': {'value': 80},
                'outerRadius': {'scale': 'r', 'field': 'data.total'},
                'fill': {'field': 'data.color'},
                'stroke': {'value': 'white'},
                'strokeWidth': {'value': 2}
              },
              'update': {
                'x': {'group': 'width', 'mult': 0.7},
                'y': {'group': 'height', 'mult': 0.5},
                'startAngle': {'field': 'startAngle'},
                'endAngle': {'field': 'endAngle'},
                'innerRadius': {'value': 80},
                'outerRadius': {'scale': 'r', 'field': 'data.total'}
              }
            }
          }
        ]
      };
		};
	}]);