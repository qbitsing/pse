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
	$scope.cargandodos = false;
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
    var casillaDeBotonesDates = '<div>'+
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
    $scope.gridDates = {
      columnDefs: [
        { field: 'id'},
        { field: 'nombre'},
        { name: 'Opciones', enableFiltering: false, cellTemplate : casillaDeBotonesDates}
        ]
    }
    angular.extend($scope.gridOptions , Tabla);
    angular.extend($scope.gridDates , Tabla);
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
					$scope.herras=data.data.Datos;
          			$scope.gridDates.data = $scope.herras;
				}else{
					$scope.herramientas=[];
					$scope.herras=[];
					$scope.gridDates.data = $scope.herras;
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
	$scope.cargandodos=false;
	$scope.gridDates=Scope.gridDates;
	
	$scope.RegisterHerramienta=function(){
		$scope.cargandodos=true;
		$scope.Herramienta.id_empresa=Scope.Usuario.id_empresa;
		ApiPse.getResource('Herramientas/Crear',$scope.Herramienta)
		.then(
			function(data){
				$scope.cargandodos = false;
				if(data.data.Estado==1){
					$scope.Herramienta.id=data.data.Datos.id;
					$scope.Herramienta.estado=1;
					Scope.herramientas.push($scope.Herramienta);
				}else{
					alert(data.data.Datos);
				}
			},function(data){
			}
		);
	}

	$scope.cerrar=function(){
		Scope.cerrarModal();
	}
});
