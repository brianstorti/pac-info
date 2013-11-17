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
						'domain': {'data': 'table', 'field': 'data._id.data_balanco'},
						'reverse': true
					},
					{
						'name': 'y',
						'type': 'linear',
						'range': 'height',
						'nice': true,
						'zero': true,
						'domain': {'data': 'table', 'field': 'data.valor_total'}
					},
					{
						'name': 'yLabel',
						'type': 'ordinal',
						'range': 'height',
						'nice': true,
						'zero': true,
						'domain': {'data': 'table', 'field': 'data.label'}
					}
				],
				'axes': [
					{
						'type': 'x',
						'scale': 'x',
						'grid': true,
						'properties': {
							'axis': {
								'strokeWidth': { 'value': 0 },
								'stroke': { 'value': 'white' }
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
							'majorTicks': { 'stroke': {'value': 'white'} },
							'labels': {
								'fill': { 'value': 'white' },
								'fontSize': { 'value': 14 },
								'baseline': {'value': 'middle'}
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
								'x': {'scale': 'x', 'field': 'data._id.data_balanco'},
								'y': {'scale': 'y', 'field': 'data.valor_total'},
								'y2': {'scale': 'y', 'value': 0},
								'fill': {'value': 'white'},
								'fillOpacity': {'value': 0.3}
							},
							'update': {
								'interpolate': {'value': 'monotone'},
								'x': {'scale': 'x', 'field': 'data._id.data_balanco'},
								'y': {'scale': 'y', 'field': 'data.valor_total'},
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
								'x': {'scale': 'x', 'field': 'data._id.data_balanco'},
								'y': {'scale': 'y', 'field': 'data.valor_total'},
								'y2': {'scale': 'y', 'value': 0},
								'fill': {'value': 'white'}
							},
							'update': {
			          'x': {'scale': 'x', 'field': 'data._id.data_balanco'},
			          'y': {'scale': 'y', 'field': 'data.valor_total'},
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
								'x': {'scale': 'x', 'field': 'data._id.data_balanco'},
								'y': {'scale': 'y', 'field': 'data.valor_total'},
								'y2': {'scale': 'y', 'value': 0},
								'stroke': {'value': 'white'},
								'strokeWidth': {'value': 2 }
							},
							'update': {
			          'x': {'scale': 'x', 'field': 'data._id.data_balanco'},
			          'y': {'scale': 'y', 'field': 'data.valor_total'},
			          'y2': {'scale': 'y', 'value': 0}
			        }
						}
					}
				]
			};
		};
	}])
	.service('evolucaoChart', ['API_URL','$http','evolucaoSpec', 'emptyDataChart', function(API_URL, $http, evolucaoSpec, emptyDataChart){
		var that = this;

		this.spec = evolucaoSpec;
		this.data = emptyDataChart;

		this.transformResponseElement = function(responseElement){
			responseElement._id['data_balanco'] = responseElement._id['data_balanco'].substring(3);
		};

		this.clearResponseElement = function(responseElement){
			var clearObj = angular.copy(responseElement);
			clearObj.valor_total = '';
			return clearObj;
		};

		this.transformResponse = function(investimentosPorData){
			var emptyData = [];

			for (var i = 0; i < investimentosPorData.length; i++) {
				that.transformResponseElement(investimentosPorData[i]);
				emptyData.push( that.clearResponseElement(investimentosPorData[i]) );
			}

			return {
				full: { table: investimentosPorData },
				empty: { table: emptyData }
			};
		};

		this.carregarCategoria = function(categoria){
			var url = API_URL + categoria;
			$http.get(url).success(function(data){ that.data = that.transformResponse(data); });
		};

	}]);