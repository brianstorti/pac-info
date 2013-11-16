'use strict';

angular.module('pacApp')

	.factory('pacService', ['$http',function($http){
		var PacService = function(baseUrl){
			this.data = undefined;
			this.status = undefined;

			this.loading = false;
			this.baseUrl = baseUrl;
		};

		PacService.prototype.get = function(){
			var that = this;

			this.loading = true;

			this.promise = $http({ method: 'GET', transformResponse: this.transformResponse,url: this.baseUrl + this.path.join('/')});

			this.promise.
				success(function(data, status){
					that.data = data;
					that.status = status;
					that.loading = false;
				}).
				error(function(data, status){
					that.data = data;
					that.status = status;
					that.loading = false;
				});

			return this.promise;
		};
		return PacService;
	}])

	.service('api', ['pacService',function(PacService){

		var prodUrl = 'http://pac-info.herokuapp.com/ventures/',
				baseUrl = 'http://127.0.0.1:9000/mock-api/',
				_evolucaoInvestimentos = new PacService(baseUrl),
				_distribuicaoInvestimentos = new PacService(baseUrl),
				_estagioInvestimentos = new PacService(baseUrl),
				_porRegiao = new PacService(baseUrl);


		_evolucaoInvestimentos.transformResponse = function(data) {
			var dataJson = JSON.parse(data), emptyData = [], dataJson = [];
			for (var i = dataJson.length - 1; i >= 0; i--) {

				dadosPorData[i]._id['data_balanco'] = dadosPorData[i]._id['data_balanco'].substring(3);
				emptyData =
			}

			return {
				full: fullData,
				empty: emptyData,
			};
		};

		return {
			evolucaoInvestimentos: _evolucaoInvestimentos,
			estagioInvestimentos: _estagioInvestimentos,
			distribuicaoInvestimentos: _distribuicaoInvestimentos,

			categoria: function(categoria){
				_evolucaoInvestimentos.path = [categoria];
				_estagioInvestimentos.path = [categoria, 'by_type'];
				_distribuicaoInvestimentos.path = [categoria, 'by_type'];
				_porRegiao.path = [categoria, 'by_region'];
				return this;
			},
			regiao: function(regiao){
				_porRegiao.path.push(regiao);
			}

		};
	}
]);