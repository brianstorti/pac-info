'use strict';

angular.module('pacApp')
	.factory('apiUrl', function(){
    return function(path){
      return 'http://pac-info.herokuapp.com/ventures' + path;
    };
  });