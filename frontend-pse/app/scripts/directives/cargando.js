'use strict';

/**
 * @ngdoc directive
 * @name frontendPseApp.directive:cargando
 * @description
 * # cargando
 */
angular.module('frontendPseApp')
  .directive('cargando', function () {
    return {
      templateUrl: 'views/directives/cargando.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
