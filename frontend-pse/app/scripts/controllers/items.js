'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:ItemsCtrl
 * @description
 * # ItemsCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
<<<<<<< HEAD
.controller('ItemsCtrl', function ($scope , $uibModal , SesionUsuario , $state ,$timeout) {
	var modal = null;
	/*if(SesionUsuario.ObtenerSesion().rol == "Super Administrador")
		$state.go('Home');*/
	$scope.panelAnimate='';
    $scope.pageAnimate='';  
    $timeout(function () {
         $scope.pageAnimate='pageAnimate';
         $scope.panelAnimate='panelAnimate';
      },100);
	console.log(SesionUsuario.ObtenerSesion());

=======
.controller('ItemsCtrl', function ($scope , $uibModal , SesionUsuario,$timeout) {
	var modal = null;

	$scope.panelAnimate='';
  	$scope.pageAnimate='';  
	$timeout(function () {
		$scope.pageAnimate='pageAnimate';
		$scope.panelAnimate='panelAnimate';
	},100);
	console.log(SesionUsuario.ObtenerSesion());
>>>>>>> d0e272368f56880495f04cd89240641d4614dd41
	$scope.AbrirModal = function(){
		modal = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'myModalContent.html',
			controller: 'CrearHerramientaCtrl',
			resolve: {
				Scope : function(){
					return $scope;
				}
		    }
		});

	}
})
.controller('CrearHerramientaCtrl' , function($scope , Scope){

});
