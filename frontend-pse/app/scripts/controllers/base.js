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
  	if(SesionUsuario.ObtenerSesion() == null){
		$state.go('Login');
	}
  });
