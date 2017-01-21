'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:ItemsCtrl
 * @description
 * # ItemsCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
.controller('ItemsCtrl', function ($scope , $uibModal , SesionUsuario,$timeout) {
	var modal = null;

	$scope.panelAnimate='';
      $scope.pageAnimate='';  
      $timeout(function () {
         $scope.pageAnimate='pageAnimate';
         $scope.panelAnimate='panelAnimate';
      },100);
	console.log(SesionUsuario.ObtenerSesion());
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
