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
			controller: function($scope, SesionUsuario){
				$scope.Usuario=SesionUsuario.ObtenerSesion();
				if ($scope.ClickMenu != 'gn-open-all') {
					angular.element('.main-view').css('margin-left', '48px');
				}
				$scope.sidenav = function (){
					if ($scope.ClickMenu == 'gn-open-all') {
						$scope.ClickMenu = '';
						angular.element('.main-view').css('margin-left', '48px');
					}else{
						$scope.ClickMenu= 'gn-open-all';
						angular.element('.main-view').css('margin-left', '250px');
					}
					
				}
			}
		};

	});
