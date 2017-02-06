'use strict';

/**
 * @ngdoc service
 * @name frontendPseApp.CasillaBotones
 * @description
 * # CasillaBotones
 * Constant in the frontendPseApp.
 */
angular.module('frontendPseApp')
	.constant('CasillaBotones', {
		Toggle : '<a ng-click="grid.appScope.Toggle(row.entity.id)" class="{{grid.appScope.Estados.Clases[row.entity.estado]}}">{{grid.appScope.Estados.Contenidos[row.entity.estado]}}</a>',
		Editar : '<a ng-click="grid.appScope.Editar(row.entity.id)" class="{{grid.appScope.Estados.Clases[2]}}">Editar</a>',
		Detalles : '<a ng-click="grid.appScope.Detalles(row.entity.id)" class="{{grid.appScope.Estados.Clases[3]}}">Detalles</a>',
		Borrar : '<a ng-click="grid.appScope.Borrar(row.entity.id)" class="{{grid.appScope.Estados.Clases[4]}}">Borrar</a>'
	});
