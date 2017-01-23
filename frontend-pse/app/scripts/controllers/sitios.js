'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:SitiosCtrl
 * @description
 * # SitiosCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
  .controller('SitiosCtrl', function ($scope , $timeout) {
  	$scope.panelAnimate='';
  		$scope.pageAnimate=''; 	
  		$timeout(function () {
  			 $scope.pageAnimate='pageAnimate';
  			 $scope.panelAnimate='panelAnimate';
  		},100);
  });
