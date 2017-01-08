'use strict';

/**
 * @ngdoc directive
 * @name frontendPseApp.directive:sidenav
 * @description
 * # sidenav
 */
angular.module('frontendPseApp')
	.directive('sidenav', function () {
		return {
			templateUrl: 'views/directives/sidenav.html',
			restrict: 'E',
			link: function(scope, element, attrs) {
				
			},
			controller: function($scope){
				$scope.arrow = 'left';
				$scope.classMenu = 'mostrar';

				$scope.mostrarNav = function(){
					if($scope.arrow == 'right'){
						$scope.arrow = 'left';
						$scope.classMenu = 'mostrar';
					}else{
						$scope.arrow = 'right';
						$scope.classMenu = '';
					}
				}
			}
		};
	});
