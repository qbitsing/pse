'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:UsuariosCtrl
 * @description
 * # UsuariosCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
  .controller('UsuariosCtrl', function ($scope, ApiPse, SesionUsuario) {
  	$scope.Registrar=function(){
  		console.log($scope.Register);
  		ApiPse
  		.getResource('Usuarios/Crear',$scope.Register)
  		.then(
  			function(data){
  				if(data.data.Estado==1){
  					$scope.empresas=data.data.Datos
  				}
  			}
  			,function(data){

			}
		);
  	}
  	function ListarEmpresa(){
  		ApiPse
  		.getResource('Empresas/Listar')
  		.then(
  			function(data){
  				if(data.data.Estado==1){
  					$scope.empresas=data.data.Datos
  				}
  			}
  			,function(data){

			}
		);
  	}
  	ListarEmpresa();
  });
