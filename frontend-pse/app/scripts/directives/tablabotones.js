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
			restrict: 'A',
			link: function(scope, element, attrs) {
				console.log(attrs.tablaBotones.split(','));
			}
		};
	});
