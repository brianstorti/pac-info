'use strict';

angular.module('pacApp')
	.factory('shuffle', [function() {
		return function(o){
			for(var j, x, i = o.length; i; j = parseInt(Math.random() * i, 10), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		};
	}])
	.factory('estagioSpec', ['chartSize', function(chartSize){
		return function(element, data) {
			var estagios = [], colors = [];

			for (var i = 0;i < data.table.length; i++) {
				estagios.push(data.table[i]._id+' :  '+data.table[i].total);
				colors.push(data.table[i].color);
			}

			return {
				'width': chartSize(element).width,
				'height': 400,
				'padding': { 'top': 20, 'left': 10, 'bottom': 30, 'right': 10 },
				'data': [{
					'name': 'table',
					'transform': [{'type': 'pie', 'value': 'data.total'}]
				}],
				'scales':
				[
					{
						'name': 'r',
						'type': 'sqrt',
						'domain': {'data': 'table', 'field': 'data.total'},
						'range': [180, 180]
					},
					{
						'name': 'size',
						'type': 'ordinal',
						'sort': true,
						'domain': {'data': 'table', 'field': 'data.total'},
						'range': [100, 1000]
					},
					{
						'name': 'estagios',
						'type': 'ordinal',
						'sort': true,
						'domain': {'data': 'table', 'field': 'data.total'},
						'range': estagios
					},
					{
						'name': 'color',
						'type': 'ordinal',
						'sort': true,
						'domain': {'data': 'table', 'field': 'data.total'},
						'range': colors
					}
				],
				'legends': [{
					'size': 'size',
					'fill': 'color',
					'orient': 'left',
					'properties': {
						'title': {
							'fontSize': {'value': 16}
						},
						'symbols': {
							'stroke': {'value': 'transparent'},
							'shape': {'value': 'circle'}
						},
						'labels': {
							'fill': {'value': '#656567'},
							'fontSize': {'value': 16},
							'fontFamily': {'value': 'Helvetica'},
							'text': {'scale': 'estagios'}
						},
						'legend': {
							'padding': {'value': 10},
							'stroke': {'value': '#ccc'},
							'strokeWidth': {'value': 0},
							'x': {'value': 0},
							'y': {'value': 10}
						}
					}
				}],
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
								'innerRadius': {'value': 80},
								'outerRadius': {'scale': 'r', 'field': 'data.total'},
								'fill': {'field': 'data.color'},
								'stroke': {'value': 'white'},
								'strokeWidth': {'value': 2}
							},
							'update': {
								'x': {'group': 'width', 'mult': 0.7},
								'y': {'group': 'height', 'mult': 0.5},
								'startAngle': {'field': 'startAngle'},
								'endAngle': {'field': 'endAngle'},
								'innerRadius': {'value': 80},
								'outerRadius': {'scale': 'r', 'field': 'data.total'}
							}
						}
					}
				]
			};
		};
	}])
	.service('estagioChart',['PacService','estagioSpec', 'shuffle', function(PacService, estagioSpec, shuffle){
		var that = this,
				colors = shuffle(['#FBAD2F', '#68D286','#1DA1CD', '#EB585C', '#A085C6', '#FF8FB4', '#FDD26D']);

		this.spec = estagioSpec;

		var service = new PacService(
			function(responseElement, idx){
				responseElement.color = colors[idx % colors.length];
			},
			function(responseElement, idx){
				responseElement.total = 10;
			});

		this.carregarCategoria = function(categoria){
			service.get(categoria+'/by_status').success(function(data){ that.data = data; });
		};
	}]);