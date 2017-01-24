'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:SitiosCtrl
 * @description
 * # SitiosCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
  .controller('SitiosCtrl', function ($state, $scope, ApiPse, SesionUsuario, $timeout, Tabla) {
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
	        { field: 'nombre'},
	        { field: 'ciudad'},
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
	  		ApiPse.getResource('Sitios/Crear',$scope.Register)
	  		.then(
	  			function(data){
	  				$scope.cargando = false;
	  				if(data.data.Estado==1){
	  					for (var i = 0; i < $scope.ciudades.length; i++) {
							if($scope.ciudades[i].id==parseInt($scope.Register.id_ciudad)){
								$scope.Register.ciudad=$scope.ciudades[i].nombre;
							}
						}
						$scope.Register.id=data.data.Datos.id;
						$scope.sitios.push($scope.Register);
						$scope.Register={};
	  				}
	  			},function(data){

	  		});
	  	}
	  	function listarsitios(){
	  		ApiPse.getResource("Sitios/ListarDisponible/"+$scope.Usuario.id_empresa)
			.then(function(data){
				if(data.data.Estado==1){
					$scope.sitios=data.data.Datos;
          			$scope.gridOptions.data = $scope.sitios;
				}else{
					$scope.sitios=[];
					$scope.gridOptions.data = $scope.sitios;
					alert(data.data.Datos);
				}
			},function(data){

			});
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
		listarDepartamentos();
		ListarCiudades();
		listarsitios();
  });
