'use strict';

angular.module('pacApp')
	.factory('evolucaoSpec', ['chartHeight', 'measureElement', function(chartHeight, measureElement){
		return function(element) {
			return {
				'width': measureElement(element).width,
				'height': chartHeight,
				'padding': { 'top': 10, 'left': -10, 'bottom': 30, 'right':20 },
				'data': [{ 'name': 'table' }],
				'scales': [
					{
						'name': 'x',
						'type': 'ordinal',
						'points': true,
						'padding': 1.5,
						'range': 'width',
						'domain': {'data': 'table', 'field': 'data.x'}
					},
					{
						'name': 'y',
						'type': 'linear',
						'range': 'height',
						'nice': true,
						'zero': true,
						'domain': {'data': 'table', 'field': 'data.y'}
					}
				],
				'axes': [
					{
						'type': 'x',
						'scale': 'x',
						'grid': true,
						'properties': {
							'axis': {
								'strokeWidth': { 'value': 0 }
							},
							'grid': {
								'stroke': { 'value': 'white' }
							},
							'majorTicks': { 'strokeWidth': {'value': 0} },
							'labels': {
								'fill': { 'value': 'white' },
								'fontSize': { 'value': 14 }
							}
						}
					},
					{
						'type': 'y',
						'scale': 'y',
						'offset': -40,
						'ticks': 3,
						'orient': 'right',
						'properties': {
							'axis': {
								'stroke': { 'value': 'white' },
								'strokeWidth': { 'value': 0 }
							},
							'majorTicks': { 'strokeWidth': {'value': 0} },
							'labels': {
								'fill': { 'value': 'white' },
								'fontSize': { 'value': 14 }
							}
						}
					}
				],
				'marks': [
					{
						'type': 'area',
						'from': { 'data': 'table' },
						'properties': {
							'enter': {
								'interpolate': {'value': 'monotone'},
								'x': {'scale': 'x', 'field': 'data.x'},
								'y': {'scale': 'y', 'field': 'data.y'},
								'y2': {'scale': 'y', 'value': 0},
								'fill': {'value': 'white'},
								'fillOpacity': {'value': 0.3}
							},
							'update': {
								'interpolate': {'value': 'monotone'},
								'x': {'scale': 'x', 'field': 'data.x'},
								'y': {'scale': 'y', 'field': 'data.y'},
								'y2': {'scale': 'y', 'value': 0},
							}
						}
					},
					{
						'type': 'symbol',
						'from': { 'data': 'table' },
						'properties': {
							'enter': {
								'shape': {'value': 'circle'},
								'size': {'value': 50},
								'x': {'scale': 'x', 'field': 'data.x'},
								'y': {'scale': 'y', 'field': 'data.y'},
								'y2': {'scale': 'y', 'value': 0},
								'fill': {'value': 'white'}
							},
							'update': {
			          'x': {'scale': 'x', 'field': 'data.x'},
			          'y': {'scale': 'y', 'field': 'data.y'},
			          'y2': {'scale': 'y', 'value': 0}
			        },
						}
					},
					{
						'type': 'line',
						'from': { 'data': 'table' },
						'properties': {
							'enter': {
								'interpolate': {'value': 'monotone'},
								'x': {'scale': 'x', 'field': 'data.x'},
								'y': {'scale': 'y', 'field': 'data.y'},
								'y2': {'scale': 'y', 'value': 0},
								'stroke': {'value': 'white'},
								'strokeWidth': {'value': 2 }
							},
							'update': {
			          'x': {'scale': 'x', 'field': 'data.x'},
			          'y': {'scale': 'y', 'field': 'data.y'},
			          'y2': {'scale': 'y', 'value': 0}
			        }
						}
					}
				]
			};
		};
	}]);