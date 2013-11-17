'use strict';

angular.module('pacApp')
	.factory('porRegiaoSpec', ['chartSize', function(chartSize){
		return function(element, data, opts) {

			return {
				'width': chartSize(element).width,
				'height': chartSize(element).height,
				'padding': { 'top': 20, 'left': 0, 'bottom': 30, 'right': 0 },
				'data': [{'name': 'table'}],
				'scales': [
					{
						'name': 'x',
						'type': 'ordinal',
						'points': true,
						'padding': 1,
						'range': 'width',
						'domain': { 'data': 'table', 'field': 'data._id' }
					},
					{
						'name': 'y',
						'range': 'height',
						'nice': true,
						'domain': { 'data': 'table', 'field': 'data.valor_total' },
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
								'angle': { 'value': 0 },
								'fontSize': { 'value': 12 },
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
								'fill': {'value': '#fff'},
								'x': {'scale': 'x', 'field': 'data._id', 'offset': 15},
								'y': { 'scale': 'y', 'field': 'data.valor_total'},
								'y2': { 'scale': 'y', 'value': 0 },
								'width': {'scale': 'x', 'band': true, 'offset': -30},
							},
							'update': {
								'x': {'scale': 'x', 'field': 'data._id', 'offset': 15},
								'y': { 'scale': 'y', 'field': 'data.valor_total'},
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
					}
				]
			};
		};
	}])
	.service('porRegiaoChart',['PacService','porRegiaoSpec',function(PacService, porRegiaoSpec){
			var that = this;

			this.spec = porRegiaoSpec;

			var service = new PacService(undefined,
				function(responseElement){
					responseElement.valor_total = '';
				});

			this.carregarCategoria = function(categoria, regiao){
				service.get(categoria+'/by_region/'+regiao).success(function(data){ that.data = data; });
			};
		}
	]);