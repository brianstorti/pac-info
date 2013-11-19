'use strict';

angular.module('pacApp')
	.factory('evolucaoSpec', ['chartSize', function(chartSize){
		return function(element, data, width, small) {
			small = width < 500;
			return {
				'width': width,
				'height': chartSize(element).height,
				'padding': { 'top': small?30:20, 'left': small?10:0, 'bottom': small?70:30, 'right': small?20:10 },
				'data': [
					{
						'name': 'table'
					}
				],
				'scales': [
					{
						'name': 'x',
						'type': 'ordinal',
						'points': true,
						'padding': 1,
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
			      'name': 'width',
			      'type': 'ordinal',
			      'range': 'width',
			      'points': true,
			      'domain': {'data': 'table', 'field': 'index'}
			    },
				],
				'axes': [
					{
						'type': 'x',
						'scale': 'x',
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
								'fontSize': { 'value': 14 },
								'angle': {'value': (small? 45:0)},
								'dy': {'value': (small? 20:0)},
								'dx': {'value': (small? 20:0)}
							}
						}
					}
				],
				'marks': [
					{
			      'type': 'text',
			      'from': {'data': 'table'},
			      'properties': {
			        'enter': {
			          'x': {'scale': 'x', 'field': 'data._id.data_balanco'},
			          'y': {'scale': 'y', 'field': 'data.valor_total'},
			          'baseline': {'value': 'bottom'},
			          'fill': {'value': '#fff'},
			          'text': {'field': ''},
			          'font': {'value': 'Helvetica Neue'},
			          'fontSize': {'value': 14},
			          'align': {'value': 'center'}
			        },
			        'update': {
			          'x': {'scale': 'x', 'field': 'data._id.data_balanco'},
			          'y': {'scale': 'y', 'field': 'data.valor_total'},
			          'text': {'field': 'data.label'},
			        }
			      }
					},
					{
			      'type': 'rect',
			      'from': {'data': 'table'},
			      'properties': {
							'enter': {
								'fill': {'value': '#fff'},
								'fillOpacity': {'value': 0.5},
								'x': {'scale': 'x', 'field': 'data._id.data_balanco'},
								'y': { 'scale': 'y', 'field': 'data.valor_total'},
								'y2': { 'value': 0 }
							},
							'update': {
								'x': {'scale': 'x', 'field': 'data._id.data_balanco'},
								'y': { 'scale': 'y', 'field': 'data.valor_total'},
								'y2': { 'scale': 'y', 'value': -10 },
								'width': {'value': 2},
							}
						}
					},
					{
			      'type': 'rect',
			      'from': {'data': 'table'},
			      'properties': {
							'update': {
								'fill': {'value': '#fff'},
								'x': {'scale': 'x', 'field': 'data._id.data_balanco', 'offset': 0},
								'y': { 'group': 'height' },
								'width': {'scale': 'width', 'field': 'index', 'mult': 0.835},
								'height': {'value': 2}
							}
						}
					},
					{
						'type': 'area',
						'from': {'data': 'table'},
						'properties': {
							'enter': {
								'interpolate': {'value': 'monotone'},
								'x': {'scale': 'x', 'field': 'data._id.data_balanco'},
								'y': {'scale': 'y', 'field': 'data.valor_total', 'offset':5},
								'y2': {'scale': 'y', 'value': 0},
								'fill': {'value': 'white'},
								'fillOpacity': {'value': 0.3}
							},
							'update': {
								'interpolate': {'value': 'monotone'},
								'x': {'scale': 'x', 'field': 'data._id.data_balanco'},
								'y': {'scale': 'y', 'field': 'data.valor_total', 'offset':5},
								'y2': {'scale': 'y', 'value': 0}
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
								'y': {'scale': 'y', 'field': 'data.valor_total', 'offset':5},
								'y2': {'scale': 'y', 'value': 0},
								'fill': {'value': 'white'}
							},
							'update': {
			          'x': {'scale': 'x', 'field': 'data._id.data_balanco'},
			          'y': {'scale': 'y', 'field': 'data.valor_total', 'offset':5},
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
			          'y': {'scale': 'y', 'field': 'data.valor_total', 'offset':5},
			          'y2': {'scale': 'y', 'value': 0}
			        }
						}
					}
				]
			};
		};
	}])
	.service('evolucaoChart',['PacService','evolucaoSpec', 'compressNumber', function(PacService, evolucaoSpec, compressNumber){
		var that = this;

		this.spec = evolucaoSpec;

		var service = new PacService(
			function(responseElement, idx){
				responseElement._id['data_balanco'] = responseElement._id['data_balanco'].substring(3);
			},
			function(responseElement){
				responseElement.valor_total = '';
				responseElement.label = '';
			});

		this.carregarCategoria = function(categoria){
			return service.get(categoria).success(function(data){
				var total = data.full.table[0].valor_total;
				var compressedNumber = compressNumber(total);

				that.data = data;
				that.data.total = compressedNumber.value.toFixed(0);
				that.data.totalLabel = compressedNumber.label;
			});
		};

	}]);