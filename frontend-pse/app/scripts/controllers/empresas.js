'use strict';
/**
 * @ngdoc function
 * @name frontendPseApp.controller:EmpresasCtrl
 * @description
 * # EmpresasCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
.controller('EmpresasCtrl', function ($scope, SesionUsuario, ApiPse, $state, $timeout, Tabla ,
		Estados , CasillaBotones, $uibModal) {
	$scope.Usuario=SesionUsuario.ObtenerSesion();
	if($scope.Usuario.rol!="Super Administrador"){
		$state.go('Home');
	}
	$scope.PanelTitulo = "Registro de empresas";
	$scope.BotonTitulo = "Registrar empresa";
	$scope.cargando = false; 
	$scope.Estados = Estados;
	$scope.panelAnimate='';
	$scope.pageAnimate='';
	var modalInstance=null; 	
	$timeout(function () {
		$scope.pageAnimate='pageAnimate';
		$scope.panelAnimate='panelAnimate';
	},100);
	var casillaDeBotones = '<div>';
	casillaDeBotones+=CasillaBotones.Toggle;
	casillaDeBotones+=CasillaBotones.Editar;
	casillaDeBotones+=CasillaBotones.Detalles;
	casillaDeBotones+=CasillaBotones.Borrar;
	casillaDeBotones +='</div>';
	$scope.gridOptions = {
		columnDefs: [
			{ 
				name:'NIT', 
				field: 'id'
			},
			{ 
				field: 'nombre'
			},
			{ 
				field: 'direccion'
			},
			{ 
				field: 'telefono'
			},
			{ 
				field: 'estado',
				cellTemplate : '<div>{{grid.appScope.Estados.Estados[row.entity.estado]}}</div>'
			},
			{ 
				name: 'Opciones', 
				enableFiltering: false, 
				cellTemplate : casillaDeBotones
			}
		]
	}
	angular.extend($scope.gridOptions , Tabla);
	$scope.Registrar=function(){
		$scope.cargando = true;
		ApiPse.getResource('Empresas/Crear',$scope.Register)
		.then(function(data){
			$scope.empresas.push($scope.Register);
			$scope.Register = {};
			$scope.cargando = false;
		},function(data){
			$scope.cargando = false;
		});
	}
	$scope.Editar = function(id) {
		var obj = $scope.Identifiar(id);
		$scope.Register = obj;
		$scope.PanelTitulo = "Editar empresa";
		$scope.BotonTitulo = "Guardar Cambios";
	}
	$scope.Borrar = function(id) {
		$scope.cargando = true;
		var obj = $scope.Identifiar(id);
		var ruta = "Empresas/Eliminar/"+obj.id;
		ApiPse.getResource(ruta)
		.then(function(data){
			if(data.data.Estado == 1){
				$scope.empresas.splice(obj.index , 1);
			}
			$scope.cargando = false;
		},function(data){
			$scope.cargando = false;
			console.log(data);
		});
	}
	$scope.Toggle = function(id) {
		$scope.cargando = true;
		var obj = $scope.Identifiar(id);
		if(obj.estado == 1){
			obj.estado = 0;
		}else{
			obj.estado = 1;
		}
		var ruta = "Empresas/Actualizar/"+obj.id;
		ApiPse.getResource(ruta , obj)
		.then(function(data){
			if(data.data.Estado == 1){
				$scope.empresas[obj.index] = obj;
			}
			$scope.cargando = false;
		},function(data){
			$scope.cargando = false;
			console.log(data);
		});
		console.log(obj);
	}
	$scope.Detalles = function(id) {
		$scope.obj = $scope.Identifiar(id);
		modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'myModalContent.html',
			controller: 'DetalleEmpresaModalCtrl',
			resolve: {
				Scope : function(){
					return $scope;
				}
		    }
		});
	}
	$scope.cerrarModal = function(){
		modalInstance.close();
	}
	$scope.CancelarEditar = function(){
		$scope.PanelTitulo = "Registro de empresas";
		$scope.BotonTitulo = "Registrar empresa";
		$scope.Register = {};
	}
	$scope.Identifiar = function(_id){
		var obj = {};
		$scope.empresas.forEach(function(ele , index){
			if(ele.id == _id){
				obj.index = index;
				obj.id = ele.id;
				obj.nombre = ele.nombre;
				obj.telefono = ele.telefono;
				obj.direccion = ele.direccion;
				obj.id_departamento = ele.id_departamento;
				obj.ciudad = ele.ciudad;
				obj.estado = ele.estado;
			}
		});
		return obj;
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
	function listarEmpresas(){
		ApiPse.getResource("Empresas/ListarDisponible")
		.then(function(data){
			if(data.data.Estado==1){
				$scope.empresas=data.data.Datos;
				console.log(data);
				$scope.gridOptions.data = $scope.empresas;
			}
		},function(data){
			console.log(data);
		});
	}
	listarDepartamentos();
	ListarCiudades();
	listarEmpresas();
})
.controller('DetalleEmpresaModalCtrl', function ($scope ,Scope) {
	$scope.Detalle=Scope.obj;
	console.log($scope.Detalle);
	$scope.Cerrar=function(){
		Scope.cerrarModal();
	}

});
