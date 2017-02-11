'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:ItemsCtrl
 * @description
 * # ItemsCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
.controller('ItemsCtrl', function ($scope , $uibModal ,ApiPse, SesionUsuario, $state, $timeout, Tabla,
		Estados , CasillaBotones) {
	$scope.Estados = Estados;
	$scope.PanelTitulo = "Registro de Equipos";
	$scope.BotonTitulo = "Registrar Equipo";
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
	var casillaDeBotones = '<div>';
	casillaDeBotones+=CasillaBotones.Toggle;
	casillaDeBotones+=CasillaBotones.Editar;
	casillaDeBotones+=CasillaBotones.Borrar;
	casillaDeBotones+='</div>';
	var casillaDeBotonesDates = '<div>';
	casillaDeBotonesDates+=CasillaBotones.Editar;
	casillaDeBotonesDates+=CasillaBotones.Borrar;
	casillaDeBotonesDates+='</div>';
    $scope.gridOptions = {
		columnDefs: [
			{ 
				field: 'herramienta',
				width: '20%', minWidth: 170
			},
			{ 
				field: 'modelo',
				width: '20%', minWidth: 170
			},
			{ 
				field: 'codigo_unico',
				width: '20%', minWidth: 170
			},
			{ 
				field: 'estado', 
				cellTemplate : '<div>{{grid.appScope.Estados.Estados[row.entity.estado]}}</div>',
				width: '20%', minWidth: 170
			},
			{ 
				name: 'Opciones', 
				enableFiltering: false, 
				cellTemplate : casillaDeBotones,
				width: '20%', minWidth: 170
			}
		]
    }
    $scope.gridDates = {
		columnDefs: [
			{ 
				field: 'id',
				width: '33.99%', minWidth: 170
			},
			{ 
				field: 'nombre',
				width: '33.99%', minWidth: 170
			},
			{ 
				name: 'Opciones', 
				enableFiltering: false, 
				cellTemplate : casillaDeBotonesDates,
				width: '33.99%', minWidth: 170
			}
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
					for (var i = 0; i < $scope.Register.cantidad; i++) {
						var obj = {
							id : data.data.Datos[i].id,
							herramienta : $scope.Register.herramienta,
							modelo : $scope.Register.modelo,
							codigo_unico : data.data.Datos[i].codigo
						};
						$scope.items.push(obj);
					}
					$scope.Register.id=data.data.Datos.id;
					
					$scope.Register={};
				}else{
					alert(data.data.Datos);
				}
			},function(data){
			}
		);
	}
	$scope.Editar = function(id) {
		var obj = $scope.Identifiar(id);
		$scope.Register = obj;
		$scope.PanelTitulo = "Editar Equipo";
		$scope.BotonTitulo = "Guardar Cambios";
	}
	$scope.Borrar = function(id) {
		$scope.cargando = true;
		var obj = $scope.Identifiar(id);
		
		// var ruta = "Herramientas/Eliminar/"+obj.id;
		// ApiPse.getResource(ruta)
		// .then(function(data){
		// 	if(data.data.Estado == 1){
		// 		$scope.Herramientas.splice(obj.index , 1);
		// 	}
		// 	$scope.cargando = false;
		// },function(data){
		// 	$scope.cargando = false;
		// 	console.log(data);
		// });
	}
	$scope.Toggle = function(){
		var obj = $scope.Identifiar(id);
	}
	$scope.CancelarEditar = function(){
		$scope.PanelTitulo = "Registro de Equipos";
		$scope.BotonTitulo = "Registrar Equipo";
		$scope.Herramienta = {};
	}
	$scope.Identifiar = function(_id){
		var obj = {};
		$scope.items.forEach(function(ele , index){
			if(ele.id == _id){
				obj.index = index;
				obj.id = ele.id;
				obj.modelo = ele.modelo;
				obj.estado = ele.estado;
				obj.codigo_unico = ele.codigo_unico;
				obj.id_herramienta = ''+ele.id_herramienta;
			}
		});
		console.log(obj);
		return obj;
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
.controller('CrearHerramientaCtrl' , function($scope , Scope, $uibModal,ApiPse , Estados){
	$scope.Estados = Estados;
	$scope.PanelTitulo = "Registro de Herramientas";
	$scope.BotonTitulo = "Registrar Herramienta";
	$scope.cargandodos=false;
	$scope.gridDates=Scope.gridDates;
	$scope.Herramientas = $scope.gridDates.data;
	$scope.RegisterHerramienta=function(){
		$scope.cargandodos=true;
		var ruta = "Herramientas/Crear";
		if($scope.BotonTitulo == "Guardar Cambios"){
			ruta = "Herramientas/Actualizar/"+$scope.Herramienta.id;
		}
		$scope.Herramienta.id_empresa=Scope.Usuario.id_empresa;
		ApiPse.getResource(ruta,$scope.Herramienta)
		.then(
			function(data){
				if(data.data.Estado==1){
					if(ruta == "Herramientas/Crear"){
						$scope.Herramienta.id=data.data.Datos.id;
						$scope.Herramienta.estado=1;
						Scope.herramientas.push($scope.Herramienta);
					}else{
						Scope.herramientas[$scope.Herramienta.index] = $scope.Herramienta;
						$scope.PanelTitulo = "Registro de Herramientas";
						$scope.BotonTitulo = "Registrar Herramienta";
					}
					$scope.Herramienta = {};
				}
				$scope.cargandodos = false;
			},function(data){
				console.log(data);
				$scope.cargando = false;
			}
		);
	}

	$scope.Editar = function(id) {
		var obj = $scope.Identifiar(id);
		$scope.Herramienta = obj;
		$scope.PanelTitulo = "Editar Herramienta";
		$scope.BotonTitulo = "Guardar Cambios";
	}
	$scope.Borrar = function(id) {
		$scope.cargando = true;
		var obj = $scope.Identifiar(id);
		var ruta = "Herramientas/Eliminar/"+obj.id;
		ApiPse.getResource(ruta)
		.then(function(data){
			if(data.data.Estado == 1){
				$scope.Herramientas.splice(obj.index , 1);
			}
			$scope.cargando = false;
		},function(data){
			$scope.cargando = false;
			console.log(data);
		});
	}
	$scope.CancelarEditar = function(){
		$scope.PanelTitulo = "Registro de Herramientas";
		$scope.BotonTitulo = "Registrar Herramienta";
		$scope.Herramienta = {};
	}
	$scope.Identifiar = function(_id){
		var obj = {};
		$scope.Herramientas.forEach(function(ele , index){
			if(ele.id == _id){
				obj.index = index;
				obj.id = ele.id;
				obj.nombre = ele.nombre;
			}
		});
		return obj;
	}
	$scope.cerrar=function(){
		Scope.cerrarModal();
	}
});
