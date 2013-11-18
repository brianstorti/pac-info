'use strict';

angular.module('pacApp')
	.factory('shuffle', [function() {
		return function(o){
			for(var j, x, i = o.length; i; j = parseInt(Math.random() * i, 10), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		};
	}])
	.factory('estagioSpec', [function(){
		return function(element, data, width, small) {
			small = width < 350;
			return {
				'width': width,
				'height': (small)?200:400,
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
						'range': (small)?[80, 100]:[130, 180]
					}
				],
				'marks': [
					{
						'type': 'arc',
						'from': { 'data': 'table' },
						'properties': {
							'enter': {
								'x': {'group': 'width', 'mult': 0.5},
								'y': {'group': 'height', 'mult': 0.5},
								'startAngle': {'field': 'startAngle'},
								'endAngle': {'field': 'endAngle'},
								'innerRadius': {'value': (small)?30:80},
								'outerRadius': {'scale': 'r', 'field': 'data.total'},
								'fill': {'field': 'data.color'},
								'stroke': {'value': 'white'},
								'strokeWidth': {'value': 2}
							},
							'update': {
								'x': {'group': 'width', 'mult': 0.5},
								'y': {'group': 'height', 'mult': 0.5},
								'startAngle': {'field': 'startAngle'},
								'endAngle': {'field': 'endAngle'},
								'innerRadius': {'value': (small)?30:80},
								'outerRadius': {'scale': 'r', 'field': 'data.total'}
							}
						}
					}
				]
			};
		};
	}])
	.factory('estagioLegendSpec', ['chartSize', function(chartSize){
		return function(element, data, width, small) {
			var estagios = [], colors = [];

			for (var i = 0;i < data.table.length; i++) {
				estagios.push(data.table[i]._id+' :  '+data.table[i].total);
				colors.push(data.table[i].color);
			}

			return {
				'width': width,
				'height': (small)?300:400,
				'padding': { 'top': 20, 'left': 10, 'bottom': 30, 'right': 30 },
				'data': [{
					'name': 'table',
				}],
				'scales':
				[
					{
						'name': 'r',
						'type': 'sqrt',
						'domain': {'data': 'table', 'field': 'data.total'},
						'range': [130, 180]
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
							'fontSize': {'value': (small)?13:16},
							'fontFamily': {'value': 'Helvetica'},
							'text': {'scale': 'estagios'}
						},
						'legend': {
							'padding': {'value': 10},
							'stroke': {'value': '#ccc'},
							'strokeWidth': {'value': 0},
							'x': {'x': 0},
							'y': {'value': (small)?0:70}
						}
					}
				}]
			};
		};
	}])
	.service('estagioChart',[
		'PacService',
		'estagioSpec',
		'estagioLegendSpec',
		'shuffle',
		function(PacService, estagioSpec, estagioLegendSpec, shuffle){

			var that = this,
					colors = shuffle(['#FBAD2F', '#68D286','#1DA1CD', '#EB585C', '#A085C6', '#FF8FB4', '#FDD26D']);

			this.spec = estagioSpec;
			this.legendSpec  = estagioLegendSpec;

			var service = new PacService(
				function(responseElement, idx){
					responseElement.color = colors[idx % colors.length];
				},
				function(responseElement, idx){
					responseElement.total = 10;
				});

			this.carregarCategoria = function(categoria){
				service.get(categoria+'/by_status').success(function(data){
					that.data = data;
					that.legendData = { full: data.full, empty: data.full };
				});
			};
		}]);