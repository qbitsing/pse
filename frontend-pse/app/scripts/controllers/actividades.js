'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:ActividadesCtrl
 * @description
 * # ActividadesCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
  .controller('ActividadesCtrl', function ($state, $scope, ApiPse,SesionUsuario,$timeout, Tabla) {
  	$scope.cargando = false;
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
			{ name: 'nombre'},
			{ field: 'sitio'},
			{ name: 'Opciones', enableFiltering: false, cellTemplate : casillaDeBotones}

	    ]
	}
	angular.extend($scope.gridOptions , Tabla);
  	$scope.Usuario=SesionUsuario.ObtenerSesion();
  	if($scope.Usuario.rol=="Super Administrador"){
  		$state.go('Home');
  	}
  	$scope.Registrar=function(){
  		$scope.cargando = true;
  		$scope.Register.id_empresa=$scope.Usuario.id_empresa;
  		ApiPse.getResource("Actividades/Crear",$scope.Register)
		.then(function(data){
			$scope.cargando = false;
			if(data.data.Estado==1){
				for (var i = 0; i < $scope.sitios.length; i++) {
					if($scope.sitios[i].id==parseInt($scope.Register.id_escenario)){
						$scope.Register.sitio=$scope.sitios[i].nombre;
					}
				}
				$scope.Register.id=data.data.Datos.id;
				$scope.actividades.push($scope.Register);
				$scope.Register={};
			}else{
				alert(data.data.Datos);
			}
		},function(data){
			console.log(data);
		});
  	}
  	function listarSitios(){
		ApiPse.getResource("Sitios/ListarDisponible/"+$scope.Usuario.id_empresa)
		.then(function(data){
			if(data.data.Estado==1){
				$scope.sitios = data.data.Datos;
			}
		},function(data){
			console.log(data);
		});
	}
	function listarActividades(){
		ApiPse.getResource("Actividades/ListarDisponible/"+$scope.Usuario.id_empresa)
		.then(function(data){
			if(data.data.Estado==1){
				$scope.actividades=data.data.Datos;
				$scope.gridOptions.data = $scope.actividades;
			}else{
				$scope.actividades=[];
				$scope.gridOptions.data = $scope.actividades;
				alert(data.data.Datos);
			}
		},function(data){
			console.log(data);
		});
	}
	listarSitios();
	listarActividades();
  });
