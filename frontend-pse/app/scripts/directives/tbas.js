'use strict';

/**
 * @ngdoc directive
 * @name frontendPseApp.directive:tbas
 * @description
 * # tbas
 */
angular.module('frontendPseApp')
  .directive('tbas', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the tbas directive');
      }
    };
  });
