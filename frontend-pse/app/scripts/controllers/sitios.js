'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:SitiosCtrl
 * @description
 * # SitiosCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
  .controller('SitiosCtrl', function ($state, $scope, ApiPse, SesionUsuario, $timeout, Tabla,
  		Estados , CasillaBotones, $uibModal) {
  		$scope.PanelTitulo = "Registro de sitios";
		$scope.BotonTitulo = "Registrar sitios";
  		$scope.cargando = false;
  		$scope.Estados = Estados;
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
	        	field: 'nombre',
	        	width: '25%', minWidth: 170
	        },
	        { 
	        	field: 'ciudad',
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
	  		var ruta = "Sitios/Crear";
			if($scope.BotonTitulo == "Guardar Cambios"){
				ruta = "Sitios/Actualizar/"+$scope.Register.id;
			}
	  		$scope.Register.id_empresa=$scope.Usuario.id_empresa;
	  		ApiPse.getResource(ruta,$scope.Register)
	  		.then(function(data){
	  			$scope.cargando = false;
				if(data.data.Estado==1){
					for (var i = 0; i < $scope.ciudades.length; i++) {
						if($scope.ciudades[i].id==parseInt($scope.Register.id_ciudad)){
							$scope.Register.ciudad=$scope.ciudades[i].nombre;
						}
					}
					$scope.Register.id=data.data.Datos.id;
					$scope.PanelTitulo = "Registro de usuarios";
					$scope.BotonTitulo = "Registrar Sitio"
					if(ruta == "Sitios/Crear"){
						$scope.sitios.push($scope.Register);
						$scope.Register={};
					}else{
						$scope.sitios[$scope.Register.index] = $scope.Register;
						$scope.Register={};
					}
	  			}
				alert(data.data.Datos);
	  		},function(data){
				console.log(data);
				$scope.cargando=false;
			}
			);
	  	}
	  	$scope.Editar = function(id) {
			var obj = $scope.Identifiar(id);
			$scope.Register = obj;
			$scope.PanelTitulo = "Editar Sitio";
			$scope.BotonTitulo = "Guardar Cambios";
		}
		$scope.Borrar = function(id) {
			$scope.cargando = true;
			var obj = $scope.Identifiar(id);
			ApiPse.getResource("Sitios/Eliminar/"+obj.id)
			.then(function(data){
				$scope.cargando = false;
				if(data.data.Estado == 1){
					$scope.sitios.splice(obj.index , 1);
				}
				alert(data.data.Datos);
			},function(data){
				$scope.cargando = false;
				console.log(data);
			});
		}
		$scope.Identifiar = function(_id){
			var obj = {};
			$scope.sitios.forEach(function(ele , index){
				if(ele.id == _id){
					obj.index = index;
					obj.id = ele.id;
					obj.nombre = ele.nombre;
					obj.id_ciudad = ele.id_ciudad;
					obj.id_departamento = ele.id_departamento;
				}
			});
			return obj;
		}
		$scope.CancelarEditar = function(){
			$scope.PanelTitulo = "Registro de sitios";
			$scope.BotonTitulo = "Registrar sitios";
			$scope.Register = {};
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
				}
			},function(data){

			});
	  	}
  		function listarDepartamentos(){
			ApiPse.getResource("Empresas/ListarDepartamentos")
			.then(function(data){
				ListarCiudades();
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
				listarsitios();
				if(data.data.Estado==1){
					$scope.ciudades = data.data.Datos;
				}
			},function(data){

			});
		}
		listarDepartamentos();
  });
