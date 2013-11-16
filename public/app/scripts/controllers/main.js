'use strict';

angular.module('pacApp')
	.controller('MainCtrl',[
		'$scope',
		'estagioSpec',
		'distribuicaoSpec',
		'estagioChart',
		'evolucaoChart',
		'distribuicaoChart',
		'$location',
		function ($scope, estagioSpec, distribuicaoSpec, estagioChart, evolucaoChart, distribuicaoChart, $location) {

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


			$scope.evolucao = evolucaoChart;

			$scope.distribuicao = distribuicaoChart;

			$scope.estagios = estagioChart;

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
			}

			$scope.porRegiao = {
				opts: { domainMax: 100 },
				spec: distribuicaoSpec,
				data: $scope.slides.current.data
			};

			$scope.$on('$locationChangeSuccess', function(){
				var categoriaApi = $location.path().replace('/', ''),
					categoriasMap = {
						'transportes': 'Transportes',
						'comunidade-cidada': 'Comunidade Cidadã',
						'habitacao': 'Habitação',
						'agua-e-luz-para-todos' : 'Água e Luz para todos',
						'cidade-melhor': 'Cidade Melhor',
						'energia': 'Energia',
					},
					categoriaNome = categoriasMap[categoriaApi];

				$scope.evolucao.carregarCategoria(categoriaApi);
				$scope.distribuicao.carregarCategoria(categoriaApi);
				$scope.estagios.carregarCategoria(categoriaApi);

				$scope.banner = {title: categoriaNome};

			});
		}


	]);
