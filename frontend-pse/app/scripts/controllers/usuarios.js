'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:UsuariosCtrl
 * @description
 * # UsuariosCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
.controller('UsuariosCtrl', function ($scope, ApiPse, SesionUsuario, $timeout , Tabla) {
	$scope.cargando = false;
	$scope.Register={};
	$scope.Usuario=SesionUsuario.ObtenerSesion();
	$scope.panelAnimate='';
	$scope.pageAnimate='';
	$scope.Saludar = function(){
		alert('Saludando ...');
	} 
	$timeout(function () {
		$scope.pageAnimate='pageAnimate';
		$scope.panelAnimate='panelAnimate';
	},100);
	var casillaDeBotones = '<div>';
	casillaDeBotones+='<a tabla-botones="{{row.entity.id}},{{row.entity.estado}},Detalles"></a>';
	casillaDeBotones+='</div>';
	$scope.gridOptions = {
		columnDefs: [
			{ field: 'nombres'},
			{ name: 'Documento' ,field: 'id' },
			{ field: 'correo'},
			{ field: 'telefono'},
			{ name: 'Opciones', enableFiltering: false, cellTemplate : casillaDeBotones}

	    ]
	}
	angular.extend($scope.gridOptions , Tabla);
	$scope.Registrar=function(){
		$scope.cargando = true;
		if($scope.Usuario.rol == "Administrador")
			$scope.Register.id_empresa = $scope.Usuario.id_empresa;
		ApiPse
		.getResource('Usuarios/Crear',$scope.Register)
		.then(function(data){
				$scope.cargando = false;
				if(data.data.Estado==1){
					$scope.Register={};
				}
			},function(data){
				$scope.cargando = false;
				$scope.Register={};
			}
		);
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
		ApiPse
		.getResource('Usuarios/ListarEmpresa/'+$scope.Usuario.id_empresa)
		.then(function(data){
			if(data.data.Estado==1){
				$scope.Usuarios=data.data.Datos;
				$scope.gridOptions.data = $scope.Usuarios;
			}
		},function(data){
			
		});
	}
	ListarEmpresa();
	ListarUsuarios();
});
