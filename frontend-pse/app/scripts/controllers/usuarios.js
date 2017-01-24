'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:UsuariosCtrl
 * @description
 * # UsuariosCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
.controller('UsuariosCtrl', function ($scope, ApiPse, SesionUsuario, $timeout , Tabla , Estados) {
	$scope.PanelTitulo = "Registro de usuarios";
	$scope.BotonTitulo = "Registrar Usuario";
	$scope.cargando = false;
	$scope.Estados = Estados;
	$scope.Register={};
	$scope.Usuario=SesionUsuario.ObtenerSesion();
	$scope.panelAnimate='';
	$scope.pageAnimate='';
	$timeout(function () {
		$scope.pageAnimate='pageAnimate';
		$scope.panelAnimate='panelAnimate';
	},100);
	var casillaDeBotones = '<div>';
	casillaDeBotones+='<a tablabotones="{{row.entity.estado}},Toggle" ng-click="grid.appScope.Toggle(row.entity.id)"></a>';
	casillaDeBotones+='<a tablabotones="{{row.entity.estado}},Editar" ng-click="grid.appScope.Editar(row.entity.id)"></a>';
	casillaDeBotones+='<a tablabotones="{{row.entity.estado}},Detalles" ng-click="grid.appScope.Detalles(row.entity.id)"></a>';
	casillaDeBotones+='<a tablabotones="{{row.entity.estado}},Borrar" ng-click="grid.appScope.Borrar(row.entity.id)"></a>';
	casillaDeBotones+='</div>';
	$scope.gridOptions = {
		columnDefs: [
			{ 
				field: 'nombres'
				 
			},
			{ 
				field: 'apellidos'
				 
			},
			{ 
				name: 'Documento',
				field: 'id'
				 
			},
			{ 
				field: 'rol'
				 
			},
			{ 
				field: 'estado', 
				cellTemplate : '<div>{{grid.appScope.Estados[row.entity.estado]}}</div>'
				 
			},
			{ 
				name: 'Opciones', 
				enableFiltering: false, 
				cellTemplate : casillaDeBotones
			}

	    ]
	}
	$scope.Toggle = function(id) {
		var obj = $scope.Identifiar(id);
	}
	$scope.Editar = function(id) {
		var obj = $scope.Identifiar(id);
		$scope.Register = obj;
		$scope.PanelTitulo = "Editar usuario";
		$scope.BotonTitulo = "Guardar Cambios";

	}
	$scope.Detalles = function(id) {
		var obj = $scope.Identifiar(id);
	}
	$scope.Borrar = function(id) {
		var obj = $scope.Identifiar(id);
	}
	angular.extend($scope.gridOptions , Tabla);
	$scope.Registrar=function(){
		var ruta = "Usuarios/Crear";
		if($scope.BotonTitulo == "Guardar Cambios"){
			ruta = "Usuarios/Actualizar/"+$scope.Register.id;
		}
		$scope.cargando = true;
		if($scope.Usuario.rol == "Administrador")
			$scope.Register.id_empresa = $scope.Usuario.id_empresa;
		ApiPse
		.getResource(ruta,$scope.Register)
		.then(function(data){
				if(data.data.Estado==1){
					$scope.PanelTitulo = "Registro de usuarios";
					$scope.BotonTitulo = "Registrar Usuario"
					if(ruta == "Usuarios/Crear"){
						$scope.Usuario.push($scope.Register);
						$scope.Register={};
					}else{
						$scope.Usuarios[$scope.Register.index] = $scope.Register;
						$scope.Register={};
					}
				}
				$scope.cargando = false;
			},function(data){
				$scope.Register={};
				$scope.cargando = false;
			}
		);
	}
	$scope.CancelarEditar = function(){
		$scope.PanelTitulo = "Registro de usuarios";
		$scope.BotonTitulo = "Registrar Usuario";
		$scope.Register = {};
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
		var ruta;
		if($scope.Usuario.rol == "Administrador")
			ruta = 'Usuarios/ListarEmpresa/'+$scope.Usuario.id_empresa;
		else if($scope.Usuario.rol == "Super Administrador")
			ruta = 'Usuarios/Listar';
		ApiPse
		.getResource(ruta)
		.then(function(data){
			if(data.data.Estado==1){
				$scope.Usuarios=data.data.Datos;
				$scope.gridOptions.data = $scope.Usuarios;
			}
		},function(data){
			
		});
	}
	$scope.Identifiar = function(_id){
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
				obj.tipo_doc = ele.tipo_doc.toString();

			}
		});

		return obj;
	}
	ListarEmpresa();
	ListarUsuarios();
});
