'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:ActividadesCtrl
 * @description
 * # ActividadesCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
  .controller('ActividadesCtrl', function ($state, $scope, ApiPse,SesionUsuario,$timeout) {
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
  		ApiPse.getResource("Actividades/Crear",$scope.Register)
		.then(function(data){
			if(data.data.Estado==1){
				
			}
		},function(data){
			console.log(data);
		});
  	}
  	function listarSitios(){
		ApiPse.getResource("Sitios/ListarDisponible")
		.then(function(data){
			if(data.data.Estado==1){
				$scope.sitios = data.data.Datos;
			}
		},function(data){
			console.log(data);
		});
	}
	listarSitios();
  });
