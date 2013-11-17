'use strict';

angular.module('pacApp')
	.factory('distribuicaoSpec', ['chartSize', function(chartSize){
		return function(element, data, width, small) {
			var tiny = width < 400;
			small = width < 700;

			return {
				'width': chartSize(element).width,
				'height': chartSize(element).height,
				'padding': { 'top': 20, 'left': 0, 'bottom': (tiny? 70: small? 60 : 30), 'right': 0 },
				'data': [
					{
						'name': 'table',
						'transform': [
							{'type': 'truncate', 'value': 'data._id', 'output': 'name', 'limit': tiny ? 15 : small ? 30 : 60, 'position': 'middle'}
						]
					}
				],
				'scales': [
					{
						'name': 'x',
						'type': 'ordinal',
						'points': true,
						'padding': 1.5,
						'range': 'width',
						'domain': { 'data': 'table', 'field': 'data._id' }
					},
					{
						'name': 'names',
						'type': 'ordinal',
						'points': true,
						'padding': 1.5,
						'range': 'width',
						'domain': { 'data': 'table', 'field': 'name' }
					},
					{
						'name': 'y',
						'range': 'height',
						'nice': true,
						'domain': { 'data': 'table', 'field': 'data.valor_total' }
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
								'fill': { 'value': 'transparent' }
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
								'fill': {'value': '#fff'},
								'x': {'scale': 'x', 'field': 'data._id', 'offset': small ? 10:40},
								'y': { 'scale': 'y', 'field': 'data.valor_total'},
								'y2': { 'scale': 'y', 'value': -10 },
								'width': {'scale': 'x', 'band': true, 'offset': small ? -20: -80},
							},
							'update': {
								'x': {'scale': 'x', 'field': 'data._id', 'offset': small ? 10:40},
								'y': { 'scale': 'y', 'field': 'data.valor_total'},
								'y2': { 'scale': 'y', 'value': -10 },
								'width': {'scale': 'x', 'band': true, 'offset': small ? -20: -80},
							}
						},
					},
					{
						'type': 'text',
						'from': { 'data': 'table' },
						'properties': {
							'enter': {
								'x': {'scale': 'x', 'field': 'data._id'},
								'y': {'scale': 'y', 'field': 'data.valor_total', 'offset':-10},
								'fill': {'value': '#fff'},
								'text': {'field': 'data.label'},
								'align': {'value': 'center'},
								'fontSize': { 'value': 14 }
							},
							'update': {
								'x': {'scale': 'x', 'field': 'data._id'},
								'y': {'scale': 'y', 'field': 'data.valor_total', 'offset':-10},
								'text': {'field': 'data.label'},
							}
						}
					},
					{
						'type': 'text',
						'from': { 'data': 'table' },
						'properties': {
							'enter': {
								'x': {'scale': 'x', 'field': 'data._id'},
								'y': {'scale': 'y', 'value': 0},
								'dy': {'value': (tiny ? 10:20)},
								'text': {'field': 'name'},
								'fill': { 'value': '#FFF' },
								'angle': {'value': (small? 45:0)},
								'fontSize': { 'value': 12 },
								'fontWeight': { 'value': '200' },
								'align': { 'value': 'center'}
							},
							'update': {
								'x': {'scale': 'x', 'field': 'data._id'},
								'y': {'scale': 'y', 'value': 0},
								'dy': {'value': (tiny ? 30:20)},
								'dx': {'value': (tiny ? 20:0)},
								'text': {'field': 'name'}
							}
						}
					}
				]
			};
		};
	}])
	.service('distribuicaoChart',['PacService','distribuicaoSpec',function(PacService, distribuicaoSpec){
		var that = this, tipos = [];

		this.spec = distribuicaoSpec;

		var service = new PacService(
			function(responseElement){
				if( responseElement._id === 'Equipamentos - Estradas Vicinais' ){
					responseElement._id = 'Estradas';
				}

				tipos.push(responseElement._id);
			},
			function(responseElement){
				responseElement.valor_total = '';
			});

		this.carregarCategoria = function(categoria){
			tipos = [];
			service.get(categoria+'/by_type').success(function(data){
				that.data = data;
				that.data.tipos = tipos;
			});
		};
	}]);