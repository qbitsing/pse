'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:UsuariosCtrl
 * @description
 * # UsuariosCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
.controller('UsuariosCtrl', function ($state, $scope, ApiPse, SesionUsuario, $timeout , Tabla , 
		Estados , CasillaBotones, $uibModal) {
	$scope.PanelTitulo = "Registro de usuarios";
	$scope.BotonTitulo = "Registrar Usuario";
	$scope.cargando = false;
	$scope.Estados = Estados;
	$scope.Register={};
	$scope.Usuario=SesionUsuario.ObtenerSesion();
	if($scope.Usuario.rol!="Administrador" && $scope.Usuario.rol!="Super Administrador"){
		$state.go('Home');
	}
	$scope.panelAnimate='';
	$scope.pageAnimate='';
	var modalInstance = null;
	$timeout(function () {
		$scope.pageAnimate='pageAnimate';
		$scope.panelAnimate='panelAnimate';
	},100);
	var casillaDeBotones = '<div>';
	casillaDeBotones+=CasillaBotones.Toggle;
	casillaDeBotones+=CasillaBotones.Editar;
	casillaDeBotones+=CasillaBotones.Detalles;
	casillaDeBotones+=CasillaBotones.Borrar;
	casillaDeBotones+='</div>';
	$scope.gridOptions = {
		columnDefs: [
			{ 
				field: 'nombres',
				width: '15%', minWidth: 170
			},
			{ 
				field: 'apellidos',
				width: '15%', minWidth: 170
			},
			{ 
				name: 'Documento',
				field: 'id',
				width: '15%', minWidth: 170
			},
			{ 
				field: 'rol',
				width: '15%', minWidth: 170
			},
			{ 
				field: 'estado', 
				cellTemplate : '<div>{{grid.appScope.Estados.Estados[row.entity.estado]}}</div>',
				width: '15%', minWidth: 170
			}

	    ]
	}
	if($scope.Usuario.rol == "Super Administrador"){
		$scope.gridOptions.columnDefs.push({
			field : 'empresa',
			cellTemplate : '<div>{{row.entity.empresa.nombre || "No posee"}}</div>',
			width: '15%', minWidth: 170
		});
	}

	$scope.gridOptions.columnDefs.push({ 
		name: 'Opciones', 
		enableFiltering: false, 
		cellTemplate : casillaDeBotones,
		width: '25%',minWidth: 250
	});

	angular.extend($scope.gridOptions , Tabla);
	$scope.Registrar=function(){
		var ruta = "Usuarios/Crear";
		if($scope.BotonTitulo == "Guardar Cambios"){
			ruta = "Usuarios/Actualizar/"+$scope.Register.id;
		}
		$scope.cargando = true;
		if($scope.Usuario.rol == "Administrador"){
			$scope.Register.id_empresa = $scope.Usuario.id_empresa;
		}
		ApiPse
		.getResource(ruta,$scope.Register)
		.then(function(data){
				if(data.data.Estado==1){
					$scope.PanelTitulo = "Registro de usuarios";
					$scope.BotonTitulo = "Registrar Usuario"
					if(ruta == "Usuarios/Crear"){
						$sope.Register.estado=1;
						$scope.Usuarios.push($scope.Register);
						$scope.Register={};
					}else{
						$scope.Usuarios[$scope.Register.index] = $scope.Register;
						$scope.Register={};
					}
					alert(data.data.Datos);
				}
				$scope.cargando = false;
			},function(data){
				$scope.Register={};
				$scope.cargando = false;
			}
		);
	}
	$scope.Editar = function(id) {
		var obj = $scope.Identificar(id);
		$scope.Register = obj;
		$scope.PanelTitulo = "Editar usuario";
		$scope.BotonTitulo = "Guardar Cambios";
	}
	$scope.Borrar = function(id) {
		$scope.cargando = true;
		var obj = $scope.Identificar(id);
		var ruta = "Usuarios/Eliminar/"+obj.id;
		ApiPse.getResource(ruta)
		.then(function(data){
			if(data.data.Estado == 1){
				$scope.Usuarios.splice(obj.index , 1);
			}
			$scope.cargando = false;
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
		var ruta = "Usuarios/Actualizar/"+obj.id;
		ApiPse.getResource(ruta , obj)
		.then(function(data){
			if(data.data.Estado == 1){
				$scope.Usuarios[obj.index] = obj;
			}
			$scope.cargando = false;
		},function(data){
			$scope.cargando = false;
			console.log(data);
		});
	}
	$scope.Detalles = function(id) {
		$scope.obj = $scope.Identificar(id);
		modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'myModalContent.html',
			controller: 'DetalleUsuarioModalCtrl',
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
		$scope.PanelTitulo = "Registro de usuarios";
		$scope.BotonTitulo = "Registrar Usuario";
		$scope.Register = {};
	}
	$scope.Identificar = function(_id){
		var obj = {};
		$scope.Usuarios.forEach(function(ele , index){
			if(ele.id == _id){
				obj.index = index;
				obj.id = ele.id;
				obj.rol = ele.rol;
				obj.nombres = ele.nombres;
				obj.apellidos = ele.apellidos;
				obj.telefono = ele.telefono;
				obj.direccion = ele.direccion;
				obj.correo = ele.correo;
				obj.estado = ele.estado;
				obj.id_empresa = ele.id_empresa;
				obj.empresa=ele.empresa;
				obj.tipo_doc = ele.tipo_doc.toString();

			}
		});
		return obj;
	}
	function ListarEmpresa(){
		ApiPse
		.getResource('Empresas/ListarDisponible')
		.then(function(data){
			if(data.data.Estado==1){
				$scope.empresas=data.data.Datos;
			}
		},function(data){
			
		});
	}
	function ListarUsuarios() {
		var ruta="";
		if($scope.Usuario.rol == "Administrador"){
			ruta = 'Usuarios/ListarEmpresa/'+$scope.Usuario.id_empresa;
		}else if($scope.Usuario.rol == "Super Administrador"){
			ruta = 'Usuarios/Listar';
		}
		ApiPse
		.getResource(ruta)
		.then(function(data){
			if(data.data.Estado==1){
				$scope.Usuarios=data.data.Datos;
				$scope.gridOptions.data = $scope.Usuarios;
			}else{
				$scope.Usuarios=[];
				$scope.gridOptions.data = $scope.Usuarios;
			}
		},function(data){
			$scope.Usuarios=[];
			$scope.gridOptions.data = $scope.Usuarios;
			console.log(data);
		});
	}
	ListarEmpresa();
	ListarUsuarios();
})
.controller('DetalleUsuarioModalCtrl', function ($scope ,Scope) {
	$scope.Detalle=Scope.obj;
	$scope.Cerrar=function(){
		Scope.cerrarModal();
	}

});
