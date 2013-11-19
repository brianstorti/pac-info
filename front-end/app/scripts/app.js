'use strict';

angular.module('pacApp', ['vegaModule'])
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

		NProgress.settings.template = '<div class="bar" role="bar"><div class="peg"></div></div><div class="bar-behind"></div>'
	});

