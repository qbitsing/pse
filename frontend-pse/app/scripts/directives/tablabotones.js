'use strict';

/**
 * @ngdoc directive
 * @name frontendPseApp.directive:tablaBotones
 * @description
 * # tablaBotones
 */
angular.module('frontendPseApp')
	.directive('tablabotones', function () {
		return {
			link: function postLink(scope, element, attrs) {
				var data = attrs.tablabotones.split(',');
				if(data[1] == "Toggle"){
					if(data[0] == "1"){
						$(element).text("Desactivar");
						$(element).addClass("btn btn-bordered btn-xs");
						$(element).addClass("btn-warning");
						$(element).addClass("btn-bordered");
						$(element).addClass("btn-xs");
					}
					else{
						$(element).text("Activar");
						$(element).addClass("btn btn-bordered btn-xs");
						$(element).addClass("btn-success");
						$(element).addClass("btn-bordered");
						$(element).addClass("btn-xs");
					}	
				}else{
					$(element).text(data[1]);
					$(element).addClass("btn btn-bordered btn-xs");
					$(element).addClass("btn-success");
					$(element).addClass("btn-bordered");
					$(element).addClass("btn-xs");
				}
			}
		};
	});
