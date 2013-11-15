'use strict';

angular.module('pacApp')
	.directive('pacDistribuicaoInvestimentos', ['vega', function (vega) {
		return {
			replace: true,
			restrict: 'A',
			link: function (scope, iElement) {
				var view,
						width,
						height = 200;

				function drawChart(){

					width = parseInt(iElement.css('width').replace('px',''),10);

					var data = {
						table: [
							{ 'x': '1500 SP', 'y': 100 },
							{ 'x': '1500 RJ', 'y': 80 },
							{ 'x': '1500 MG', 'y': 60 },
							{ 'x': '1500 ES', 'y': 40 }
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
										'fontSize': { 'value': 14 },
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
										'x': {'scale': 'x', 'field': 'data.x', 'offset': 30},
										'y': { 'scale': 'y', 'field': 'data.y'},
										'y2': { 'scale': 'y', 'value': 0 },
										'fill': {'value': '#fff'},
										'width': {'scale': 'x', 'band': true, 'offset': -60},
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
