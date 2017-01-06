'use strict';

/**
 * @ngdoc directive
 * @name frontendPseApp.directive:nav
 * @description
 * # nav
 */
angular.module('frontendPseApp')
  .directive('navegacionLogin', function () {
    return {
      templateUrl: 'views/directives/nav.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
