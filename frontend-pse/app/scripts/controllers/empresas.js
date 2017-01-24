'use strict';
/**
 * @ngdoc function
 * @name frontendPseApp.controller:EmpresasCtrl
 * @description
 * # EmpresasCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
  .controller('EmpresasCtrl', function ($scope, SesionUsuario, ApiPse, $state, $timeout, Tabla) {
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
        { field: 'direccion'},
        { field: 'telefono'},
        { name: 'Opciones', enableFiltering: false, cellTemplate : casillaDeBotones}

        ]
    }
    angular.extend($scope.gridOptions , Tabla);
  	$scope.Usuario=SesionUsuario.ObtenerSesion();
  	if($scope.Usuario.rol!="Super Administrador"){
  		$state.go('Home');
  	}
  	$scope.Registrar=function(){
      $scope.cargando = true;
  		ApiPse.getResource('Empresas/Crear',$scope.Register)
  		.then(
  			function(data){
          $scope.cargando = false;
          $scope.empresas.push($scope.Register);
  				console.log(data.data);
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
    function listarEmpresas(){
      ApiPse.getResource("Empresas/ListarDisponible")
      .then(function(data){
        if(data.data.Estado==1){
          $scope.empresas=data.data.Datos;
          $scope.gridOptions.data = $scope.empresas;
        }
      },function(data){
        console.log(data);
      });
    }
		listarDepartamentos();
		ListarCiudades();
    listarEmpresas();
  });
