'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:ItemsCtrl
 * @description
 * # ItemsCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
.controller('ItemsCtrl', function ($scope , $uibModal , SesionUsuario, $state,$timeout) {
	var modal = null;
	$scope.panelAnimate='';
  	$scope.pageAnimate='';  
	$timeout(function () {
		$scope.pageAnimate='pageAnimate';
		$scope.panelAnimate='panelAnimate';
	},100);
	$scope.Registrar=function(){
		$scope.Register.id_empresa=SesionUsuario.ObtenerSesion().id_empresa;
		ApiPse.getResource('Items/Crear',$scope.Register)
		.then(
			function(data){
				if(data.data.Estado==1){
					alert(data.data.Datos);
				}else{
					alert(data.data.Datos);
				}
			},function(data){
			}
		);
	}
	$scope.RegistrarHerramienta=function(Herramienta){
		Herramienta.id_empresa=SesionUsuario.ObtenerSesion().id_empresa;
		ApiPse.getResource('Herramientas/Crear',Herramienta)
		.then(
			function(data){
				if(data.data.Estado==1){
					Herramienta.id=data.data.Datos.id;
					Herramienta.estado=1;
					$scope.herramientas.push(Herramienta);
					$scope.cerrarModal();
				}else{
					alert(data.data.Datos);
				}
			},function(data){
			}
		);
	}
	function ListarHerramientas(){
		ApiPse.getResource('Herramientas/ListarDisponible')
		.then(
			function(data){
				if(data.data.Estado==1){
					$scope.herramientas=data.data.Datos;
				}else{
					alert(data.data.Datos);
				}
			},function(data){
			}
		);
	}
	if(SesionUsuario.ObtenerSesion().rol == "Super Administrador")
		$state.go('Home');

	$scope.AbrirModal = function(){
		modal = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'myModalContent.html',
			controller: 'CrearHerramientaCtrl',
			resolve: {
				Scope : function(){
					return $scope;
				}
		    }
		});
	}
	$scope.cerrarModal = function(){
		$scope.Herramienta={};
		modal.close();
	}
	ListarHerramientas();
})
.controller('CrearHerramientaCtrl' , function($scope , Scope, $uibModal,ApiPse){
	$scope.RegisterHerramienta=function(){
		Scope.RegistrarHerramienta($scope.Herramienta);
	}
	$scope.cerrar=function(){
		Scope.cerrarModal();
	}
});
