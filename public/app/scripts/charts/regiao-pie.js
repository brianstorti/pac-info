'use strict';

angular.module('pacApp')
	.factory('regiaoPieSpec', [function(){
		return function() {

			return {
				'width': 100,
				'height': 100,
				'padding': { 'top': 10, 'left': 10, 'bottom': 10, 'right': 10 },
				'data': [{
					'name': 'table',
					'transform': [
						{'type': 'facet', 'keys': ['data.estado']},
						{'type': 'stats', 'value': 'data.y'}
						// {'type': 'pie', 'value': 'sum'}
					]
				}],
				'scales':
				[
					{
						'name': 'x',
						'type': 'ordinal',
						'range': 'width',
						'zero': false,
						'domain': {'data': 'table', 'field': 'data.estado'}
					},
					{
						'name': 'y',
						'type': 'linear',
						'range': 'height',
						'round': true,
						'nice': true,
						'domain': {'data': 'table', 'field': 'sum'}
					},
					{
			      'name': 'color',
			      'type': 'ordinal',
			      'range': 'category10'
			    }
				],
				'axes': [
					{'type': 'y', 'scale': 'x'},
					{'type': 'x', 'scale': 'y'}
				],
				'marks': [
	        {
	          'type': 'area',
	          'properties': {
	            'enter': {
	              'interpolate': {'value': 'monotone'},
	              'x': {'scale': 'x', 'field': 'data.x'},
	              'y': {'scale': 'y', 'field': 'y'},
	              'y2': {'scale': 'y', 'field': 'y2'},
	              'fill': {'scale': 'color', 'field': 'data.c'}
	            },
	            'update': {
	              'fillOpacity': {'value': 1}
	            },
	            'hover': {
	              'fillOpacity': {'value': 0.5}
	            }
	          }
	        }
	      ]
			};
		};
	}]);