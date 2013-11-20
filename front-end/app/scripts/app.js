'use strict';

angular.module('pacApp', ['vegaModule'])
	.factory('api', ['$location', function($location){

		return function(path){
			if($location.search().development == 'true'){
				return 'http://localhost:9000/mock-api' + path + '.json'
			} else {
				return 'http://pac-info.herokuapp.com/ventures' + path
			}
		};
	}])
	.factory('PacService', ['api','$http', function(api, $http){

		var PacService = function(transformObjectFunction, resetObjectFunction){
			this.transformObjectFunction = transformObjectFunction || angular.noop;
			this.resetObjectFunction = resetObjectFunction || angular.noop;
		};

		PacService.prototype.get = function(path){
			var that = this,
				promise = $http.get(api(path), {
					cache: true,
					transformRequest: NProgress.start,
					transformResponse: function(data){ return that.transformResponse(data); }
				});

			promise.then(NProgress.done, NProgress.done);

			return promise;
		};

		PacService.prototype.transformResponse = function(responseData){
			var resetTable = [],
					responseTable = angular.fromJson(responseData),
					that = this,
					total = responseTable.length;

			angular.forEach(responseTable, function(responseEachObject){
				var idx = responseTable.indexOf(responseEachObject);
				that.transformObjectFunction(responseEachObject, idx, total);

				var resetObj = angular.copy(responseEachObject);
				that.resetObjectFunction(resetObj, idx, total);
				this.push(resetObj);
			}, resetTable);

			return {
				empty: { table: resetTable },
				full: { table: responseTable }
			};
		};

		return PacService;

	}])
	.factory('chartSize',  function(){
		return function(element) {
			return {
				width: parseInt(element.css('width').replace('px',''),10),
				height: 200
			};
		};
	})
	.factory('compressNumber', [function () {
		var mil = 1000,
				milhao = mil * 1000,
				bilhao = milhao * 1000,
				trilhao = bilhao * 1000;

		return function(number){
			var value = number,
					label = 'Reais';

			if(number > trilhao) {
				label = 'Trilhões';
				value = number/trilhao;
			}
			else if(number > bilhao) {
				label = 'Bilhões';
				value = number/bilhao;
			}
			else if(number > milhao) {
				label = 'Milhões';
				value = number/milhao;
			}
			else if(number > mil) {
				label = 'Mil';
				value = number/mil;
			}

			return { value: value, label: label };
		};
	}])
	.run(function(){
		//never cycle the carousel
		delete($.fn.carousel.Constructor.DEFAULTS.interval);
	});

