'use strict';

angular.module('pacApp')
  .factory('PacService', ['apiUrl','$http', function(apiUrl, $http){

		var PacService = function(transformObjectFunction, resetObjectFunction){
			this.transformObjectFunction = transformObjectFunction || angular.noop;
			this.resetObjectFunction = resetObjectFunction || angular.noop;
		};

		PacService.prototype.get = function(path){
			var that = this;
			return $http.get(apiUrl(path), {
				cache: true,
				transformResponse: function(data){ return that.transformResponse(data); }
			});
		};

		PacService.prototype.transformResponse = function(responseData){
			var resetTable = [],
					responseTable = angular.fromJson(responseData),
					that = this;

			angular.forEach(responseTable, function(responseEachObject){
				that.transformObjectFunction(responseEachObject, responseTable.indexOf(responseEachObject));

				var resetObj = angular.copy(responseEachObject);
				that.resetObjectFunction(resetObj);
				this.push(resetObj);
			}, resetTable);

			return {
				empty: { table: resetTable },
				full: { table: responseTable }
			};
		};

		return PacService;

	}])
	.factory('apiUrl', function(){
    return function(path){
      var baseUrl = 'http://pac-info.herokuapp.com/ventures',
          mockUrl = 'http://localhost:9000/mock-api';

      return mockUrl + path + '.json';
    };
  })
  .factory('chartSize',  function(){
    return function(element) {
      return {
        width: parseInt(element.css('width').replace('px',''),10),
        height: 130
      };
    };
  });

