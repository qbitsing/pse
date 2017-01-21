'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:EmpresasCtrl
 * @description
 * # EmpresasCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
  .controller('EmpresasCtrl', function ($scope, SesionUsuario, ApiPse, $state) {
  	$scope.Usuario=SesionUsuario.ObtenerSesion();
  	if($scope.Usuario.rol!="Super Administrador"){
  		$state.go('Home');
  	}
  	$scope.Registrar=function(){
  		ApiPse.getResource('Empresas/Crear',$scope.Register)
  		.then(
  			function(data){
  				console.log(data.data);
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
