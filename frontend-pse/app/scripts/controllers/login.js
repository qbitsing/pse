'use strict';

angular.module('frontendPseApp')
	.value('duScrollDuration', 700)
  	.value('duScrollOffset',50)
  	.value('duScrollActiveClass', 'active-login')
  	.controller('LoginCtrl', function ($scope, $state , ApiPse, SesionUsuario , $uibModal,$document){
	  	if(SesionUsuario.ObtenerSesion() != null){
			$state.go('Home');
		}
		$scope.userLogin = function () {
			$scope.cargando=true;
			ApiPse
				.getResource('Usuarios/Login' , $scope.login)
				.then(function(data){
					$scope.cargando=false;
					if(data.data.Estado == 1){
						SesionUsuario.CrearSesion(data.data.user);
						$state.go('Home');
					}else{
						$scope.login.contrasenaa = "";
						alert(data.data.Datos);
					}
				},function(data){
				});
		}
	    $scope.topLogin= function() {
	      $document.scrollToElementAnimated(angular.element(document.getElementById('Login')));
	    }

  });
