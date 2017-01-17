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
<<<<<<< HEAD
				
=======
>>>>>>> c2dd85720278effe1ad9ed33c084fd4c739421e6
				$scope.sidenav = function (){
					if ($scope.ClickMenu == 'gn-open-all') {
						$scope.ClickMenu = '';
					}else{
						$scope.ClickMenu= 'gn-open-all';
					}
					
				}
				$scope.activate = function (){
					$scope.activate='activate';
				}
			}
		};

	});
