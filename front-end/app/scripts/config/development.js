'use strict';

angular.module('pacApp')
	.factory('apiUrl', function(){
    return function(path){
      return 'http://localhost:9000/mock-api' + path + '.json';
    };
  });