'use strict';

/**
 * @ngdoc directive
 * @name frontendPseApp.directive:tablaBotones
 * @description
 * # tablaBotones
 */
angular.module('frontendPseApp')
	.directive('tablaBotones', function () {
		return {
			templateUrl: 'views/directives/tablabotones.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				var data = JSON.parse(attrs.data);

				scope.texto = attrs.text;
			},
			controller : function($scope){
				$scope.texto = '';
			}
		};
	});
