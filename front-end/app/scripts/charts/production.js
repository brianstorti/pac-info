'use strict';

angular.module('pacApp')
	.factory('api', function(){
    return function(path){
      return 'http://pac-info.herokuapp.com/ventures' + path;
    };
  });