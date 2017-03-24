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
				field: 'id',
				width: '15%', minWidth: 170
			},
			{ 
				field: 'nombre',
				width: '15%', minWidth: 170
			},
			{ 
				field: 'direccion',
				width: '15%', minWidth: 170
			},
			{ 
				field: 'telefono',
				width: '15%', minWidth: 170
			},
			{ 
				field: 'estado',
				cellTemplate : '<div>{{grid.appScope.Estados.Estados[row.entity.estado]}}</div>',
				width: '15%', minWidth: 170
			},
			{ 
				name: 'Opciones', 
				enableFiltering: false, 
				cellTemplate : casillaDeBotones,
				width: '25%', minWidth: 170
			}
		]
	}
	angular.extend($scope.gridOptions , Tabla);
	$scope.Registrar=function(){
		var ruta = "Empresas/Crear";
		if($scope.BotonTitulo == "Guardar Cambios"){
			ruta = "Empresas/Actualizar/"+$scope.Register.id;
		}
		$scope.cargando = true;
		ApiPse.getResource(ruta,$scope.Register)
		.then(function(data){
			$scope.cargando = false;
			if(ruta == "Empresas/Crear"){
				$scope.empresas.push($scope.Register);
			}else{
				$scope.empresas[$scope.Register.index] = $scope.Register;
			}
			$scope.Register = {};
			alert(data.data.Datos);
		},function(data){
			$scope.cargando = false;
		});
	}
	$scope.Editar = function(id) {
		var obj = $scope.Identificar(id);
		$scope.Register = obj;
		$scope.PanelTitulo = "Editar empresa";
		$scope.BotonTitulo = "Guardar Cambios";
	}
	$scope.Borrar = function(id) {
		$scope.cargando = true;
		var obj = $scope.Identificar(id);
		var ruta = "Empresas/Eliminar/"+obj.id;
		ApiPse.getResource(ruta)
		.then(function(data){
			$scope.cargando = false;
			if(data.data.Estado == 1){
				$scope.empresas.splice(obj.index , 1);
			}
			alert(data.data.Datos);
		},function(data){
			$scope.cargando = false;
			console.log(data);
		});
	}
	$scope.Toggle = function(id) {
		$scope.cargando = true;
		var obj = $scope.Identificar(id);
		if(obj.estado == 1){
			obj.estado = 0;
		}else{
			obj.estado = 1;
		}
		var ruta = "Empresas/Actualizar/"+obj.id;
		ApiPse.getResource(ruta , obj)
		.then(function(data){
			$scope.cargando = false;
			if(data.data.Estado == 1){
				$scope.empresas[obj.index] = obj;
			}
		},function(data){
			$scope.cargando = false;
			console.log(data);
		});
	}
	$scope.Detalles = function(id) {
		$scope.obj = $scope.Identificar(id);
		$scope.departamentos.forEach(function(ele , index){
			if(ele.id == $scope.obj.id_departamento){
				$scope.obj.nombre_departamento = ele.nombre;
			}
		});
		$scope.ciudades.forEach(function(ele , index){
			if(ele.id == $scope.obj.ciudad){
				$scope.obj.nombre_ciudad = ele.nombre;
			}
		});
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
	$scope.Identificar = function(_id){
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
			}else{
				$scope.ciudades=[];
			}
			ListarCiudades();
		},function(data){
			console.log(data);
		});
	}
	function ListarCiudades(){
		ApiPse.getResource("Empresas/ListarCiudades")
		.then(function(data){
			if(data.data.Estado==1){
				$scope.ciudades = data.data.Datos;
			}else{
				$scope.ciudades=[];
			}
			listarEmpresas();
		},function(data){

		});
	}
	function listarEmpresas(){
		ApiPse.getResource("Empresas/ListarDisponible")
		.then(function(data){
			if(data.data.Estado==1){
				$scope.empresas=data.data.Datos;
				$scope.gridOptions.data = $scope.empresas;
			}else{
				$scope.empresas=[];
				$scope.gridOptions.data = $scope.empresas;
			}
		},function(data){
			$scope.empresas=[];
			$scope.gridOptions.data = $scope.empresas;
			console.log(data);
		});
	}
	listarDepartamentos();
})
.controller('DetalleEmpresaModalCtrl', function ($scope ,Scope) {
	$scope.Detalle=Scope.obj;
	$scope.Cerrar=function(){
		Scope.cerrarModal();
	}

});
