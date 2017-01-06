'use strict';

angular.module('frontendPseApp')
  .controller('LoginCtrl', function ($scope, $state , ApiPse,
	SesionUsuario , $uibModal ){
  	/*if(SesionUsuario.ObtenerUsuario() != null){
		$state.go('Home');
	}*/
	$scope.userLogin = function () {
		ApiPse
			.getResource('Usuarios/Login' , $scope.login)
			.then(function(data){
				$scope.cargando=false;
				if(data.data.Estado == 1){
					SesionUsuario.CrearSesion(data.data.user);
					$state.go('Home');
				}else{
					$scope.login.contrasenaa = "";
					console.log(data);
					/*modalInstance = $uibModal.open({
						animation: true,
						ariaLabelledBy: 'modal-title',
						ariaDescribedBy: 'modal-body',
						templateUrl: 'myModalContent.html',
						controller: 'ErrorVerificacionCtrl',
						size: 'sm',
						resolve: {
							Scope : function(){
								return data.data.Mensaje;
							}
					    }
					});*/
				}
			},function(data){
			});
	}
  });
