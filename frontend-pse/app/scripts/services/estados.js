'use strict';

/**
 * @ngdoc service
 * @name frontendPseApp.Estados
 * @description
 * # Estados
 * Constant in the frontendPseApp.
 */
angular.module('frontendPseApp')
	.constant('Estados', {
		Estados : ['Inactivo' , 'Activo'],
		Clases : [
			'btn btn-bordered btn-xs btn-success btn-bordered btn-xs',
			'btn btn-bordered btn-xs btn-warning btn-bordered btn-xs',
			'btn btn-bordered btn-xs btn-primary btn-bordered btn-xs',
			'btn btn-bordered btn-xs btn-info btn-bordered btn-xs',
			'btn btn-bordered btn-xs btn-danger btn-bordered btn-xs',
		],
		Contenidos : [
			'Activar',
			'Desactivar'
		]
	});
  	
