'use strict';

angular.module('pacApp')
	.directive('pacDistribuicaoInvestimentos', ['vega', 'chartHeight', function (vega, chartHeight) {
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
							{ 'x': 'Rodovias', 'y': 100 },
							{ 'x': 'Ferrovias', 'y': 80 },
							{ 'x': 'Hidrovias', 'y': 60 },
							{ 'x': 'Portos', 'y': 40 },
							{ 'x': 'Aeroportos', 'y': 15 }
						]
					};

					var spec = {
						'width': width,
						'height': height,
						'padding': { 'top': 10, 'left': 0, 'bottom': 30, 'right': 0 },
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
										'fontSize': { 'value': 13 },
										'fontWeight': { 'value': '200' },
										'align': { 'value': 'center'}
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
										'x': {'scale': 'x', 'field': 'data.x', 'offset': 15},
										'y': { 'scale': 'y', 'field': 'data.y'},
										'y2': { 'scale': 'y', 'value': 10 },
										'fill': {'value': '#fff'},
										'width': {'scale': 'x', 'band': true, 'offset': -30},
									}
								}
							},
							{
								'type': 'text',
								'from': { 'data': 'table' },
								'properties': {
									'enter': {
										'x': {'scale': 'x', 'field': 'data.x'},
										'y': { 'scale': 'y', 'value': -5 },
										'fill': {'value': '#fff'},
										'text': {'field': 'data.y'},
										'align': {'value': 'left'},
										'dx': {'value': (width/data.table.length), 'mult': 0.45},
										'fontSize': { 'value': 14 }
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
