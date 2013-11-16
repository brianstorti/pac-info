'use strict';

angular.module('pacApp')
	.factory('distribuicaoSpec', ['chartHeight', 'measureElement', function(chartHeight, measureElement){
		return function(element, data, opts) {
			var width = measureElement(element).width;
			return {
				'width': width,
				'height': chartHeight,
				'padding': { 'top': 10, 'left': 0, 'bottom': 30, 'right': 0 },
				'data': [{'name': 'table'}],
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
						'domain': { 'data': 'table', 'field': 'data.y' },
						'domainMax': opts.domainMax || undefined
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
								'fontSize': { 'value': 13 },
								'fontWeight': { 'value': '200' },
								'align': { 'value': 'center'}
							}
						}
					}
				],
				'marks': [
					{
						'key': 'data.x',
						'type': 'rect',
						'from': { 'data': 'table' },
						'properties': {
							'enter': {
								'x': {'scale': 'x', 'field': 'data.x', 'offset': 15},
								'y': { 'scale': 'y', 'field': 'data.y', 'offset': 5 },
								'y2': { 'scale': 'y', 'value': 0 },
								'fill': {'value': '#fff'},
								'width': {'scale': 'x', 'band': true, 'offset': -30},
							},
							'update': {
								'x': {'scale': 'x', 'field': 'data.x', 'offset': 15},
								'y': { 'scale': 'y', 'field': 'data.y', 'offset': 5 },
								'y2': { 'scale': 'y', 'value': 0 },
								'width': {'scale': 'x', 'band': true, 'offset': -30}
							}
						}
					},
					{
						'type': 'text',
						'from': { 'data': 'table' },
						'properties': {
							'enter': {
								'x': {'scale': 'x', 'field': 'data.x'},
								'y': {'scale': 'y', 'field': 'data.y'},
								'fill': {'value': '#fff'},
								'text': {'field': 'data.y'},
								// 'dx': {'value': (width/data.table.length), 'mult': 0.45},
								'fontSize': { 'value': 14 }
							},
							'update': {
								'x': {'scale': 'x', 'field': 'data.x'},
								'y': {'scale': 'y', 'field': 'data.y'},
								// 'dx': {'value': (width/data.table.length), 'mult': 0.45},
								'text': {'field': 'data.y'},
							}
						}
					}
				]
			};
		};
	}]);