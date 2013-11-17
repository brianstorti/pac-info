'use strict';

angular.module('pacApp')
	.factory('porRegiaoSpec', ['chartSize', function(chartSize){
		return function(element, data, width, small) {

			return {
				'width': width,
				'height': chartSize(element).height,
				'padding': { 'top': small?30:20, 'left': 0, 'bottom': 30, 'right': small?10:0 },
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
								'width': {'scale': 'x', 'band': true, 'offset': small?-20:-30},
							},
							'update': {
								'x': {'scale': 'x', 'field': 'data._id', 'offset': 15},
								'y': { 'scale': 'y', 'field': 'data.valor_total'},
								'y2': { 'scale': 'y', 'value': 0 },
								'width': {'scale': 'x', 'band': true, 'offset': small?-20:-30}
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
								'align': {'value': (small?'left':'center')},
								'angle': {'value': (small? -45:0)},
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
			var that = this,
					total = 0,
					totalLabel = '',
					mil = 1000,
					milhao = mil * 1000,
					bilhao = milhao * 1000,
					trilhao = bilhao * 1000;

			this.spec = porRegiaoSpec;

			var service = new PacService(
				function(responseElement){
					total += responseElement.valor_total;
				},
				function(responseElement){
					responseElement.valor_total = '';
				});

			this.carregarCategoria = function(categoria, regiao){
				total = 0;
				service.get(categoria+'/by_region/'+regiao).success(function(data){
					that.data = data;

					if(total > trilhao) {
						that.data.totalLabel = 'Trilhões';
						that.data.total = total/trilhao;
					}
					else if(total > bilhao) {
						that.data.totalLabel = 'Bilhões';
						that.data.total = total/bilhao;
					}
					else if(total > milhao) {
						that.data.totalLabel = 'Milhões';
						that.data.total = total/milhao;
					}
					else if(total > mil) {
						that.data.totalLabel = 'Mil';
						that.data.total = total/mil;
					}
					else {
						that.data.totalLabel = 'Reais';
						that.data.total = total;
					}

					that.data.total = that.data.total.toFixed(0);


				});
			};
		}
	]);