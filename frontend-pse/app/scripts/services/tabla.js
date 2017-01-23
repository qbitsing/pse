'use strict';

/**
 * @ngdoc service
 * @name frontendPseApp.Tabla
 * @description
 * # Tabla
 * Constant in the frontendPseApp.
 */
angular.module('frontendPseApp')
.constant('Tabla', {		
	enableSorting: true,
	modifierKeysToMultiSelectCells: true,
	enableFiltering: true,
	paginationPageSizes: [10, 20, 30, 40, 50, 100],
	paginationPageSize: 10,
});
