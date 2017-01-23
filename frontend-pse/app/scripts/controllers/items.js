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
=======

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


>>>>>>> b96606cca577eb45239f95b6013221d77bb51875
.controller('ItemsCtrl', function ($scope , $uibModal , SesionUsuario,$timeout) {
	var modal = null;
	$scope.panelAnimate='';
  	$scope.pageAnimate='';  
	$timeout(function () {
		$scope.pageAnimate='pageAnimate';
		$scope.panelAnimate='panelAnimate';
	},100);
<<<<<<< HEAD
	if(SesionUsuario.ObtenerSesion().rol == "Super Administrador")
		$state.go('Home');
=======
	console.log(SesionUsuario.ObtenerSesion());

>>>>>>> b96606cca577eb45239f95b6013221d77bb51875
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
