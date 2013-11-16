'use strict';

angular.module('pacApp')
	.factory('porRegiaoSpec', ['chartHeight', 'measureElement', function(chartHeight, measureElement){
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
						'domain': { 'data': 'table', 'field': 'data._id' }
					},
					{
						'name': 'y',
						'range': 'height',
						'nice': true,
						'domain': { 'data': 'table', 'field': 'data.val_2011_2014' },
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
								'x': {'scale': 'x', 'field': 'data._id', 'offset': 15},
								'y': { 'scale': 'y', 'field': 'data.val_2011_2014', 'offset': 5 },
								'y2': { 'scale': 'y', 'value': 0 },
								'fill': {'value': '#fff'},
								'width': {'scale': 'x', 'band': true, 'offset': -30},
							},
							'update': {
								'x': {'scale': 'x', 'field': 'data._id', 'offset': 15},
								'y': { 'scale': 'y', 'field': 'data.val_2011_2014', 'offset': 5 },
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
								'y': {'scale': 'y', 'field': 'data.val_2011_2014'},
								'fill': {'value': '#fff'},
								'text': {'field': 'data.label'},
								'fontSize': { 'value': 14 }
							},
							'update': {
								'x': {'scale': 'x', 'field': 'data._id'},
								'y': {'scale': 'y', 'field': 'data.val_2011_2014'},
								'text': {'field': 'data.label'},
							}
						}
					}
				]
			};
		};
	}])
	.service('porRegiaoChart',[
		'API_URL',
		'$http',
		'porRegiaoSpec',
		'emptyDataChart',
		function(API_URL, $http, evolucaoSpec, emptyDataChart){
			var that = this;

			this.spec = evolucaoSpec;
			this.data = emptyDataChart;

			this.clearResponseElement = function(responseElement){
				var clearObj = angular.copy(responseElement);
				clearObj['val_2011_2014'] = '';
				return clearObj;
			};

			this.transformResponse = function(investimentosPorTipo){
				var emptyData = [];

				for (var i = 0; i < investimentosPorTipo.length; i++) {
					emptyData.push( that.clearResponseElement(investimentosPorTipo[i]) );
				}

				return {
					full: { table: investimentosPorTipo },
					empty: { table: emptyData }
				};
			};

			this.carregarCategoria = function(categoria, regiao){
				var url = API_URL + [categoria, 'by_region', regiao].join('/');
				$http.get(url).success(function(data){ that.data = that.transformResponse(data); });
			};
		}
	]);