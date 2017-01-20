'use strict';

/**
 * @ngdoc overview
 * @name frontendPseApp
 * @description
 * # frontendPseApp
 *
 * Main module of the application.
 */
angular
  .module('frontendPseApp', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule',
    'perfect_scrollbar',
    'ui.grid',
    'ui.grid.pagination', 
    'ui.grid.cellNav',
  ])
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('lockPrinesApp')
      .setStorageType('sessionStorage')
      .setNotify(true, true)
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/Dashboard', '/Login');
    $urlRouterProvider.otherwise('/Login');
    $stateProvider
      .state('base', {
  	    abstract: true,
  	    url: '/Dashboard',
  	    templateUrl: 'views/pages/base.html',
        controller : 'BaseCtrl'
      })
      .state('Login', {
  	    url: '/Login',
  	    templateUrl: 'views/pages/login.html',
  	    controller: 'LoginCtrl'
      })
      .state('Home', {
        url: '/Home',
        parent: 'base',
        templateUrl: 'views/pages/home.html',
        controller: 'HomeCtrl'
      })
      .state('Usuarios' , {
        url: '/Usuarios',
        parent: 'base',
        templateUrl: 'views/pages/usuarios.html',
        controller: 'UsuariosCtrl'
      })
      .state('Empresas' , {
        url: '/Empresas',
        parent: 'base',
        templateUrl: 'views/pages/empresas.html',
        controller: 'EmpresasCtrl'
      });
  });
