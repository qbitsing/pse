'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:ItemsCtrl
 * @description
 * # ItemsCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
.controller('ItemsCtrl', function ($scope , $uibModal ,ApiPse, SesionUsuario, $state, $timeout, Tabla) {
	$scope.cargando = false;
	$scope.cargando2 = false;
	var modal = null;
	$scope.Usuario=SesionUsuario.ObtenerSesion();
	$scope.panelAnimate='';
  	$scope.pageAnimate='';  
	$timeout(function () {
		$scope.pageAnimate='pageAnimate';
		$scope.panelAnimate='panelAnimate';
	},100);
	var casillaDeBotones = '<div>' + 
    '<a type="button" class="btn btn-info btn-bordered btn-xs"'+
    ' ng-click="grid.appScope.Detalles(row.entity.id)">Detalles</a>'+
    '<a type="button" class="btn btn-info btn-bordered btn-xs"'+
    ' ng-click="grid.appScope.Editar(row.entity.id)">Editar</a>'+
    '<a type="button" class="btn btn-info btn-bordered btn-xs"'+
    ' ng-click="grid.appScope.Borrar(row.entity.id)">Borrar</a>'+
    '</div>';
    $scope.gridOptions = {
      columnDefs: [
        { field: 'id'},
        { field: 'herramienta'},
        { field: 'modelo'},
        { field: 'codigo_unico'},
        { name: 'Opciones', enableFiltering: false, cellTemplate : casillaDeBotones}
        ]
    }
    angular.extend($scope.gridOptions , Tabla);
	if(SesionUsuario.ObtenerSesion().rol == "Super Administrador"){
		$state.go('Home');
	}
	$scope.Registrar=function(){
		$scope.cargando = true;
		$scope.Register.id_empresa=$scope.Usuario.id_empresa;
		ApiPse.getResource('Items/Crear',$scope.Register)
		.then(
			function(data){
				$scope.cargando = false;
				if(data.data.Estado==1){
					for (var i = 0; i < $scope.herramientas.length; i++) {
						if($scope.herramientas[i].id==parseInt($scope.Register.id_herramienta)){
							$scope.Register.herramienta=$scope.herramientas[i].nombre;
						}
					}
					$scope.Register.id=data.data.Datos.id;
					$scope.items.push($scope.Register);
					$scope.Register={};
				}else{
					alert(data.data.Datos);
				}
			},function(data){
			}
		);
	}
	$scope.RegistrarHerramienta=function(Herramienta){
		$scope.cargando = true;
		Herramienta.id_empresa=$scope.Usuario.id_empresa;
		ApiPse.getResource('Herramientas/Crear',Herramienta)
		.then(
			function(data){
				$scope.cargando = false;
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
	function listarItems(){
		ApiPse.getResource('Items/ListarDisponible/'+$scope.Usuario.id_empresa)
		.then(
			function(data){
				if(data.data.Estado==1){
					$scope.items=data.data.Datos;
          			$scope.gridOptions.data = $scope.items;
				}else{
					$scope.items=[];
					$scope.gridOptions.data = $scope.items;
					alert(data.data.Datos);
				}
			},function(data){
			}
		);
	}
	function ListarHerramientas(){
		ApiPse.getResource('Herramientas/ListarDisponible/'+$scope.Usuario.id_empresa)
		.then(
			function(data){
				if(data.data.Estado==1){
					$scope.herramientas=data.data.Datos;
				}else{
					$scope.herramientas=[];
					alert(data.data.Datos);
				}
			},function(data){
			}
		);
	}

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
	listarItems();
})
.controller('CrearHerramientaCtrl' , function($scope , Scope, $uibModal,ApiPse){
	$scope.RegisterHerramienta=function(){
		Scope.RegistrarHerramienta($scope.Herramienta);
	}
	$scope.cerrar=function(){
		Scope.cerrarModal();
	}
});
