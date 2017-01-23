'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:SitiosCtrl
 * @description
 * # SitiosCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
  .controller('SitiosCtrl', function ($state, $scope, ApiPse, SesionUsuario, $timeout) {
  		$scope.panelAnimate='';
  		$scope.pageAnimate=''; 	
  		$timeout(function () {
  			 $scope.pageAnimate='pageAnimate';
  			 $scope.panelAnimate='panelAnimate';
  		},100);
  		$scope.Usuario=SesionUsuario.ObtenerSesion();
	  	if($scope.Usuario.rol=="Super Administrador"){
	  		$state.go('Home');
	  	}
	  	$scope.Registrar=function(){
	  		ApiPse.getResource('Sitios/Crear',$scope.Register)
	  		.then(
	  			function(data){
	  				if(data.data.Estado==1){

	  				}
	  			},function(data){

	  		});
	  	}
  		function listarDepartamentos(){
			ApiPse.getResource("Empresas/ListarDepartamentos")
			.then(function(data){
				if(data.data.Estado==1){
					$scope.departamentos = data.data.Datos;
				}
			},function(data){
				console.log(data);
			});
		}
		function ListarCiudades(){
			ApiPse.getResource("Empresas/ListarCiudades")
			.then(function(data){
				if(data.data.Estado==1){
					$scope.ciudades = data.data.Datos;
				}
			},function(data){

			});
		}
		listarDepartamentos();
		ListarCiudades();
  });
