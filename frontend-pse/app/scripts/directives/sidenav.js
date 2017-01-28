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
			controller: function($scope, SesionUsuario,$state){
				$scope.Usuario=SesionUsuario.ObtenerSesion();
				$scope.nombres= $scope.Usuario.nombres;
				$scope.apellidos= $scope.Usuario.apellidos;
				$scope.correo= $scope.Usuario.correo;

				if ($scope.ClickMenu != 'gn-open-all') {
					angular.element('.main-view').css('margin-left', '48px');
				}
				$scope.CerrarSesion=function(){
					SesionUsuario.CerrarSesion();
					$state.go('Login');
				}
				$scope.menu= function(){
					if(typeof window.orientation !== 'undefined'){
				        $scope.ClickMenu = '';
						angular.element('.main-view').css('margin-left', '48px');
				    }				    
				}
				$scope.sidenav = function (){
					console.log('entro');
					if ($scope.ClickMenu == 'gn-open-all') {
						$scope.ClickMenu = '';
						angular.element('.main-view').css('margin-left', '48px');
						angular.element('.usuario').css('display', 'none');
					}else{
						$scope.ClickMenu= 'gn-open-all';
						angular.element('.main-view').css('margin-left', '250px');
						angular.element('.usuario').css('display', 'block');
					}					
				}
			}
		};

	});
