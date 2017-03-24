'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:BaseCtrl
 * @description
 * # BaseCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
  .controller('BaseCtrl', function ($state, $scope, SesionUsuario) {
  	$scope.$state= $state;
  	if(SesionUsuario.ObtenerSesion() == null){
		$state.go('Login');
	}
  });
