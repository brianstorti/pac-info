'use strict';

angular.module('pacApp')
	.controller('MainCtrl',[
		'$scope',
		'estagioSpec',
		'evolucaoSpec',
		'distribuicaoSpec',
		function ($scope, estagioSpec, evolucaoSpec, distribuicaoSpec) {

			var regioes = [
				{
					name: 'Norte',
					data: {
						full : {
							table: [
								{ 'estado':'', 'x': 'Portos', 'y': 40 },
								{ 'estado':'', 'x': 'Rodovias', 'y': 100 },
								{ 'estado':'', 'x': 'Ferrovias', 'y': 80 },
								{ 'estado':'', 'x': 'Hidrovias', 'y': 60 },
								{ 'estado':'', 'x': 'Aeroportos', 'y': 15 }
							]
						},
						empty : {
							table: [
								{ 'estado':'', 'x': 'Portos', 'y': '' },
								{ 'estado':'', 'x': 'Rodovias', 'y': '' },
								{ 'estado':'', 'x': 'Ferrovias', 'y': '' },
								{ 'estado':'', 'x': 'Hidrovias', 'y': '' },
								{ 'estado':'', 'x': 'Aeroportos', 'y': '' }
							]
						}
					}
				},
				{
					name: 'Nordeste',
					data: {
						full : {
							table: [
								{ 'estado': '', 'x': 'Portos', 'y': 10 },
								{ 'estado': '', 'x': 'Rodovias', 'y': 10 },
								{ 'estado': '', 'x': 'Ferrovias', 'y': 8 },
								{ 'estado': '', 'x': 'Hidrovias', 'y': 20 },
								{ 'estado': '', 'x': 'Aeroportos', 'y': 15 }
							]
						},
						empty : {
							table: [
								{ 'estado': '', 'x': 'Portos', 'y': '' },
								{ 'estado': '', 'x': 'Rodovias', 'y': '' },
								{ 'estado': '', 'x': 'Ferrovias', 'y': '' },
								{ 'estado': '', 'x': 'Hidrovias', 'y': '' },
								{ 'estado': '', 'x': 'Aeroportos', 'y': '' }
							]
						}
					}
				},
				{
					name: 'Centro-Oeste',
					data: {
						full : {
							table: [
								{ 'estado': '', 'x': 'Portos', 'y': 40 },
								{ 'estado': '', 'x': 'Rodovias', 'y': 100 },
								{ 'estado': '', 'x': 'Ferrovias', 'y': 80 },
								{ 'estado': '', 'x': 'Hidrovias', 'y': 60 },
								{ 'estado': '', 'x': 'Aeroportos', 'y': 15 }
							]
						},
						empty : {
							table: [
								{ 'estado': '', 'x': 'Portos', 'y': '' },
								{ 'estado': '', 'x': 'Rodovias', 'y': '' },
								{ 'estado': '', 'x': 'Ferrovias', 'y': '' },
								{ 'estado': '', 'x': 'Hidrovias', 'y': '' },
								{ 'estado': '', 'x': 'Aeroportos', 'y': '' }
							]
						}
					}
				},
				{
					name: 'Sudeste',
					data: {
						full : {
							table: [
								{ 'estado': 'SP', 'x': 'Portos', 'y': 400 },
								{ 'estado': 'SP', 'x': 'Rodovias', 'y': 1000 },
								{ 'estado': 'SP', 'x': 'Ferrovias', 'y': 800 },
								{ 'estado': 'SP', 'x': 'Hidrovias', 'y': 600 },
								{ 'estado': 'SP', 'x': 'Aeroportos', 'y': 150 },

								{ 'estado': 'RJ', 'x': 'Portos', 'y': 140 },
								{ 'estado': 'RJ', 'x': 'Rodovias', 'y': 1100 },
								{ 'estado': 'RJ', 'x': 'Ferrovias', 'y': 180 },
								{ 'estado': 'RJ', 'x': 'Hidrovias', 'y': 160 },
								{ 'estado': 'RJ', 'x': 'Aeroportos', 'y': 115 },

								{ 'estado': 'MG', 'x': 'Portos', 'y': 30 },
								{ 'estado': 'MG', 'x': 'Rodovias', 'y': 60 },
								{ 'estado': 'MG', 'x': 'Ferrovias', 'y': 90 },
								{ 'estado': 'MG', 'x': 'Hidrovias', 'y': 100 },
								{ 'estado': 'MG', 'x': 'Aeroportos', 'y': 50 },

								{ 'estado': 'ES', 'x': 'Portos', 'y': 20 },
								{ 'estado': 'ES', 'x': 'Rodovias', 'y': 10 },
								{ 'estado': 'ES', 'x': 'Ferrovias', 'y': 30 },
								{ 'estado': 'ES', 'x': 'Hidrovias', 'y': 10 },
								{ 'estado': 'ES', 'x': 'Aeroportos', 'y': 5 }
							]
						},
						empty : {
							table: [
								{ 'estado': '', 'x': 'Portos', 'y': '' },
								{ 'estado': '', 'x': 'Rodovias', 'y': '' },
								{ 'estado': '', 'x': 'Ferrovias', 'y': '' },
								{ 'estado': '', 'x': 'Hidrovias', 'y': '' },
								{ 'estado': '', 'x': 'Aeroportos', 'y': '' }
							]
						}
					}
				},
				{
					name: 'Sul',
					data: {
						full : {
							table: [
								{ 'estado': '', 'x': 'Portos', 'y': 40 },
								{ 'estado': '', 'x': 'Rodovias', 'y': 100 },
								{ 'estado': '', 'x': 'Ferrovias', 'y': 80 },
								{ 'estado': '', 'x': 'Hidrovias', 'y': 60 },
								{ 'estado': '', 'x': 'Aeroportos', 'y': 15 }
							]
						},
						empty : {
							table: [
								{ 'estado': '', 'x': 'Portos', 'y': '' },
								{ 'estado': '', 'x': 'Rodovias', 'y': '' },
								{ 'estado': '', 'x': 'Ferrovias', 'y': '' },
								{ 'estado': '', 'x': 'Hidrovias', 'y': '' },
								{ 'estado': '', 'x': 'Aeroportos', 'y': '' }
							]
						}
					}
				}
			];

			$scope.slides = {
				list: regioes,
				current: regioes[0],
				next: function(){
					var list = $scope.slides.list,
							current = $scope.slides.current,
							idx = list.indexOf(current) + 1;

					$scope.slides.current = list[idx % list.length];
					$scope.porRegiao.data = $scope.slides.current.data;
				},
				prev: function(){
					var list = $scope.slides.list,
							current = $scope.slides.current,
							idx = (list.indexOf(current) || list.length) - 1;

					$scope.slides.current = list[idx % list.length];
					$scope.porRegiao.data = $scope.slides.current.data;
				}
			};

			$scope.evolucao = {
				spec: evolucaoSpec,
				data: {
					full: {
						table: [
							{ 'x': '2007', 'y': 10 },
							{ 'x': '2008', 'y': 50 },
							{ 'x': '2009', 'y': 52 },
							{ 'x': '2010', 'y': 60 },
							{ 'x': '2011', 'y': 74 },
							{ 'x': '2012', 'y': 90 },
							{ 'x': '2013', 'y': 110 }
						]
					},
					empty: {
						table: [
							{ 'x': '2007', 'y': 0 },
							{ 'x': '2008', 'y': 0 },
							{ 'x': '2009', 'y': 0 },
							{ 'x': '2010', 'y': 0 },
							{ 'x': '2011', 'y': 0 },
							{ 'x': '2012', 'y': 0 },
							{ 'x': '2013', 'y': 0 }
						]
					}
				}
			};

			$scope.distribuicao = {
				spec: distribuicaoSpec,
				data: {
					full : {
						table: [
							{ 'x': 'Portos', 'y': 40 },
							{ 'x': 'Rodovias', 'y': 100 },
							{ 'x': 'Ferrovias', 'y': 80 },
							{ 'x': 'Hidrovias', 'y': 60 },
							{ 'x': 'Aeroportos', 'y': 15 }
						]
					},
					empty : {
						table: [
							{ 'x': 'Portos', 'y': '' },
							{ 'x': 'Rodovias', 'y': '' },
							{ 'x': 'Ferrovias', 'y': '' },
							{ 'x': 'Hidrovias', 'y': '' },
							{ 'x': 'Aeroportos', 'y': '' }
						]
					}
				}
			};

			$scope.estagios = {
				spec: estagioSpec,
				data: {
					full : {
						table: [
	            { 'color':'#A085C6','estagio': 'Em Licitação', 'total': 120 },
	            { 'color':'#EB585C','estagio': 'Ação Preparatória', 'total': 310 },
	            { 'color':'#FF8FB4','estagio': 'A Celecionar', 'total': 450 },
	            { 'color':'#68D286','estagio': 'A Contratar', 'total': 890 },
	            { 'color':'#FDD26D','estagio': 'Concluído', 'total': 1902 },
	            { 'color':'#1DA1CD','estagio': 'Em Andamento', 'total': 2000 }
	          ]
					},
					empty : {
						table: [
	            { 'color':'#A085C6','estagio': 'Em Licitação', 'total': 1 },
	            { 'color':'#EB585C','estagio': 'Ação Preparatória', 'total': 1 },
	            { 'color':'#FF8FB4','estagio': 'A Celecionar', 'total': 1 },
	            { 'color':'#68D286','estagio': 'A Contratar', 'total': 1 },
	            { 'color':'#FDD26D','estagio': 'Concluído', 'total': 1 },
	            { 'color':'#1DA1CD','estagio': 'Em Andamento', 'total': 1 }
	          ]
					}
				}
			};

			$scope.porRegiao = {
				opts: { domainMax: 100 },
				spec: distribuicaoSpec,
				data: $scope.slides.current.data
			};
		}
	]);
