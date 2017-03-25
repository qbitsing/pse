'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:ActividadesCtrl
 * @description
 * # ActividadesCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
  .controller('ActividadesCtrl', function ($state, $scope, ApiPse,SesionUsuario,$timeout, Tabla,
  		Estados , CasillaBotones, $uibModal) {
  	$scope.Estados = Estados;
  	$scope.PanelTitulo = "Registro de actividades";
	$scope.BotonTitulo = "Registrar actividad";
  	$scope.cargando = false;
  	$scope.panelAnimate='';
	$scope.pageAnimate=''; 	
	$timeout(function () {
		 $scope.pageAnimate='pageAnimate';
		 $scope.panelAnimate='panelAnimate';
	},100);
	var casillaDeBotones = '<div>';
	casillaDeBotones+=CasillaBotones.Editar;
	casillaDeBotones+=CasillaBotones.Borrar;
	casillaDeBotones+='</div>';
	$scope.gridOptions = {
		columnDefs: [
			{ 
				field: 'id',
				width: '25%', minWidth: 170
			},
			{ 
				name: 'nombre',
				width: '25%', minWidth: 170
			},
			{ 
				field: 'sitio',
				width: '25%', minWidth: 170
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
  	$scope.Usuario=SesionUsuario.ObtenerSesion();
  	if($scope.Usuario.rol=="Super Administrador"){
  		$state.go('Home');
  	}
  	$scope.Registrar=function(){
  		$scope.cargando = true;
  		var ruta = "Actividades/Crear";
  		$scope.Register.id_empresa=$scope.Usuario.id_empresa;
  		if($scope.BotonTitulo == "Guardar Cambios"){
  			ruta = "Actividades/Actualizar/"+$scope.Register.id;
  		}
  		ApiPse.getResource(ruta,$scope.Register)
		.then(function(data){
			$scope.cargando = false;
			if(data.data.Estado==1){
				for (var i = 0; i < $scope.sitios.length; i++) {
					if($scope.sitios[i].id==parseInt($scope.Register.id_escenario)){
						$scope.Register.sitio=$scope.sitios[i].nombre;
					}
				}
				if(ruta == "Actividades/Crear"){
					$scope.Register.id=data.data.Datos.id;
					$scope.actividades.push($scope.Register);
				}else{
					$scope.actividades[$scope.Register.index] = $scope.Register;
				}
				$scope.PanelTitulo = "Registro de sitios";
				$scope.BotonTitulo = "Registrar sitios";
				$scope.Register={};
			}
			alert(data.data.Datos);
		},function(data){
			$scope.cargando = false;
			console.log(data);
		});
  	}
  	$scope.Editar = function(id) {
		var obj = $scope.Identificar(id);
		$scope.Register = obj;
		$scope.PanelTitulo = "Editar Sitio";
		$scope.BotonTitulo = "Guardar Cambios";
	}
	$scope.Borrar = function(id) {
		$scope.cargando = true;
		var obj = $scope.Identificar(id);
		var ruta = "Actividades/Eliminar/"+obj.id;
		ApiPse.getResource(ruta)
		.then(function(data){
			$scope.cargando = false;
			if(data.data.Estado == 1){
				$scope.actividades.splice(obj.index , 1);
			}
			alert(data.data.Datos);
		},function(data){
			$scope.cargando = false;
			console.log(data);
		});
	}
	$scope.Identificar = function(_id){
		var obj = {};
		$scope.actividades.forEach(function(ele , index){
			if(ele.id == _id){
				obj.index = index;
				obj.id = ele.id;
				obj.nombre = ele.nombre;
				obj.id_escenario = ""+ele.id_escenario;
			}
		});
		return obj;
	}
	$scope.CancelarEditar = function(){
		$scope.PanelTitulo = "Registro de sitios";
		$scope.BotonTitulo = "Registrar sitios";
		$scope.Register = {};
	}

  	function listarSitios(){
		ApiPse.getResource("Sitios/ListarDisponible/"+$scope.Usuario.id_empresa)
		.then(function(data){
			listarActividades();
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
			}
		},function(data){
			console.log(data);
		});
	}
	listarSitios();
  });
