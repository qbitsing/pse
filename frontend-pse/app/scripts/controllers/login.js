'use strict';

angular.module('frontendPseApp')
  .controller('LoginCtrl', function ($scope, $state , ApiPse,
	SesionUsuario , $uibModal ){
	$scope.userLogin = function () {
		$scope.cargando=true;
		ApiPse
			.getResource('Usuarios/Login' , $scope.login)
			.then(function(data){
				$scope.cargando=false;
				if(data.data.Estado == 1){
					//SesionUsuario.CrearSesion(data.data.user);
					$state.go('Home');
				}else{
					$scope.login.contrasenaa = "";
					alert(data.data.Datos);
				}
			},function(data){
			});
	}
  });
