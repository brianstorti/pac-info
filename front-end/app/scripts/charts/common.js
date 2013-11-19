'use strict';

angular.module('pacApp')

  .factory('PacService', ['apiUrl','$http', function(apiUrl, $http){

		var PacService = function(transformObjectFunction, resetObjectFunction){
			this.transformObjectFunction = transformObjectFunction || angular.noop;
			this.resetObjectFunction = resetObjectFunction || angular.noop;
		};

		PacService.prototype.get = function(path){
			var that = this,
				promise = $http.get(apiUrl(path), {
					cache: true,
					transformResponse: function(data){ return that.transformResponse(data); }
				});

			NProgress.start();
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
  });

