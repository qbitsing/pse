'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
  .controller('HomeCtrl', function ($scope , $uibModal ,ApiPse, SesionUsuario, $state, $timeout) {
  	$scope.Usuario = SesionUsuario.ObtenerSesion();
  	console.log($scope.Usuario);
  	$timeout(function () {
		$scope.pageAnimate='pageAnimate';
		$scope.panelAnimate='panelAnimate';
	},100);
	var handleFileSelect=function(evt) {
        angular.element(document.querySelector('#inputval')).text( $(this).val());
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
          $scope.$apply(function($scope){
              $scope.myImage=evt.target.result;
          });
        };
          reader.readAsDataURL(file);
      };
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
  });
