'use strict';

angular.module('pacApp')
	.directive('pacEvolucaoInvestimentos', ['vega', 'chartHeight', function (vega, chartHeight) {
		return {
			replace: true,
			restrict: 'A',
			link: function (scope, iElement) {
				var view,
						width,
						height = chartHeight;

				function drawChart(){

					width = parseInt(iElement.css('width').replace('px',''),10);

					var data = {
						table: [
							{ 'x': '2007', 'y': 10 },
							{ 'x': '2008', 'y': 50 },
							{ 'x': '2009', 'y': 52 },
							{ 'x': '2010', 'y': 60 },
							{ 'x': '2011', 'y': 74 },
							{ 'x': '2012', 'y': 90 },
							{ 'x': '2013', 'y': 110 }
						]
					};

					var spec = {
						'width': width,
						'height': height,
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
									}
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
									}
								}
							}
						]
					};

					vega.parse.spec(spec, function(chart){
						view = chart({el: iElement[0], data: data}).update();
					});

				}

				drawChart();
				angular.element(window).on('resize', drawChart);
			}
		};
	}]);
