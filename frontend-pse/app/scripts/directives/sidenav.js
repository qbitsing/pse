'use strict';

/**
 * @ngdoc directive
 * @name frontendPseApp.directive:sidenav
 * @description
 * # sidenav
 */
angular.module('frontendPseApp')
	.directive('sidenav', function () {
		return {
			templateUrl: 'views/directives/sidenav.html',
			restrict: 'E',
			link: function(scope, element, attrs) {
				
			},
			controller: function($scope){
				$scope.sidenav = function (){
					if ($scope.ClickMenu == 'gn-open-all') {
						$scope.ClickMenu = '';
					}else{
						$scope.ClickMenu= 'gn-open-all';
					}
					
				}
			}
		};

	});
