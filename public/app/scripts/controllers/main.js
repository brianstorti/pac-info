'use strict';

angular.module('pacApp')
	.controller('MainCtrl',[
		'$scope',
		'estagioSpec',
		'evolucaoSpec',
		'distribuicaoSpec',
		function ($scope, estagioSpec, evolucaoSpec, distribuicaoSpec) {

			$scope.evolucao = {
				spec: evolucaoSpec,
				data: {
					table: [
						{ 'x': '2007', 'y': 10 },
						{ 'x': '2008', 'y': 50 },
						{ 'x': '2009', 'y': 52 },
						{ 'x': '2010', 'y': 60 },
						{ 'x': '2011', 'y': 74 },
						{ 'x': '2012', 'y': 90 },
						{ 'x': '2013', 'y': 110 }
					]
				}
			};

			$scope.distribuicao = {
				spec: distribuicaoSpec,
				data: {
					table: [
						{ 'x': 'Portos', 'y': 40 },
						{ 'x': 'Rodovias', 'y': 100 },
						{ 'x': 'Ferrovias', 'y': 80 },
						{ 'x': 'Hidrovias', 'y': 60 },
						{ 'x': 'Aeroportos', 'y': 15 }
					]
				}
			};

			$scope.estagios = {
				spec: estagioSpec,
				data: {
					table: [
            { 'color':'#A085C6','estagio': 'Em Licitação', 'total': 120 },
            { 'color':'#EB585C','estagio': 'Ação Preparatória', 'total': 310 },
            { 'color':'#FF8FB4','estagio': 'A Celecionar', 'total': 450 },
            { 'color':'#68D286','estagio': 'A Contratar', 'total': 890 },
            { 'color':'#FDD26D','estagio': 'Concluído', 'total': 1902 },
            { 'color':'#1DA1CD','estagio': 'Em Andamento', 'total': 2000 }
          ]
				}
			};

		}
	]);
