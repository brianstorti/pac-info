'use strict';

angular.module('pacApp')
	.factory('porRegiaoSpec', ['chartHeight', 'measureElement', function(chartHeight, measureElement){
		return function(element) {
			var width = measureElement(element).width;
			return {
				'width': width,
				'height': chartHeight,
				'padding': { 'top': 10, 'left': 0, 'bottom': 30, 'right': 0 },
				'data': [
					{
						'name': 'table',
						'transform': [{'type': 'pie', 'value': 'data.val_2011_2014'}]
					}
				],
				'scales':
        [
          {
            'name': 'r',
            'type': 'sqrt',
            'domain': {'data': 'table', 'field': 'data.val_2011_2014'},
            'range': [130, 180]
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
            'type': 'arc',
            'from': { 'data': 'table' },
            'properties': {
              'enter': {
                'x': {'group': 'width', 'mult': 0.7},
                'y': {'group': 'height', 'mult': 0.5},
                'startAngle': {'field': 'startAngle'},
                'endAngle': {'field': 'endAngle'},
                'innerRadius': {'value': 40},
                'outerRadius': {'value': 100},
                'fill': {'field': 'data.color'},
                'stroke': {'value': 'white'},
                'strokeWidth': {'value': 2}
              },
              'update': {
                'x': {'group': 'width', 'mult': 0.7},
                'y': {'group': 'height', 'mult': 0.5},
                'startAngle': {'field': 'startAngle'},
                'endAngle': {'field': 'endAngle'},
                'innerRadius': {'value': 40},
                'outerRadius': {'value': 100}
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
				var url = API_URL + [categoria, 'by_region', regiao + '.json'].join('/');
				$http.get(url).success(function(data){ that.data = that.transformResponse(data); });
			};
		}
	]);