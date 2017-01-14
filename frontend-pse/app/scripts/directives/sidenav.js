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
				angular.element('.contenedor-principal').addClass('angosto');

				$scope.mostrarNav = function(){
					if($scope.arrow == 'right'){
						$scope.arrow = 'left';
						$scope.classMenu = 'mostrar';
						angular.element('.contenedor-principal').removeClass('ancho');
						angular.element('.contenedor-principal').addClass('angosto');
					}else{
						$scope.arrow = 'right';
						$scope.classMenu = '';
						angular.element('.contenedor-principal').removeClass('angosto');
						angular.element('.contenedor-principal').addClass('ancho');
					}
				}
				$scope.sidenav = function (){
					if ($scope.ClickMenu == 'gn-menu-wrapper gn-open-all') {
						$scope.ClickMenu = '';
					}else{
						$scope.ClickMenu= 'gn-menu-wrapper gn-open-all';
					}
					
				}
			}
		};

	});
