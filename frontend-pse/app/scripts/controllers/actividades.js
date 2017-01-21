'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:ActividadesCtrl
 * @description
 * # ActividadesCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
  .controller('ActividadesCtrl', function ($scope,$timeout) {
  		$scope.panelAnimate='';
  		$scope.pageAnimate=''; 	
  		$timeout(function () {
  			 $scope.pageAnimate='pageAnimate';
  			 $scope.panelAnimate='panelAnimate';
  		},100);
  });
