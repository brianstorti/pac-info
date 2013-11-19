'use strict';

angular.module('pacApp')
	.controller('MainCtrl',[
		'$scope',
		'$q',
		'$location',
		'porRegiaoChart',
		'estagioChart',
		'evolucaoChart',
		'distribuicaoChart',
		function ($scope, $q, $location, porRegiaoChart, estagioChart, evolucaoChart, distribuicaoChart) {

			$scope.regioes = [
				{ name: 'Norte' },
				{ name: 'Nordeste' },
				{ name: 'Centro-Oeste' },
				{ name: 'Sudeste' },
				{ name: 'Sul' }
			];

			$scope.evolucao = evolucaoChart;

			$scope.distribuicao = distribuicaoChart;

			$scope.estagios = estagioChart;

			$scope.porRegiao = porRegiaoChart;

			$scope.slides = {
				list: $scope.regioes,
				current: $scope.regioes[0],
				next: function(){
					$scope.slides.move('right');
				},
				prev: function(){
					$scope.slides.move('left');
				},
				move: function(type) {
					var list = $scope.slides.list,
							current = $scope.slides.current,
							idxRight = list.indexOf(current) + 1,
							idxLeft = (list.indexOf(current) || list.length) - 1,
							idx = (type==='right')?idxRight:idxLeft;

					$scope.slides.current = list[idx % list.length];

					$scope.porRegiao.carregarCategoria($scope.banner.api, $scope.slides.current.name);
				}
			};

			$scope.banner = {title: '', api:'', loading:false};

			$scope.$on('$locationChangeSuccess', function(){
				var categoriaApi = $location.path() || '/transportes',
					categoriasMap = {
						'/transportes': 'Transportes',
						'/comunidade-cidada': 'Comunidade Cidadã',
						'/habitacao': 'Habitação',
						'/agua-e-luz-para-todos' : 'Água e Luz para todos',
						'/cidade-melhor': 'Cidade Melhor',
						'/energia': 'Energia',
					},
					categoriaNome = categoriasMap[categoriaApi];

				$scope.banner.loading = true;
				$q.all(
					$scope.evolucao.carregarCategoria(categoriaApi),
					$scope.distribuicao.carregarCategoria(categoriaApi),
					$scope.estagios.carregarCategoria(categoriaApi),
					$scope.porRegiao.carregarCategoria(categoriaApi, $scope.slides.current.name)
				).
				then(function (){
					$scope.banner = {title: categoriaNome, api:categoriaApi, loading:false};
				});

			});
		}


	]);
