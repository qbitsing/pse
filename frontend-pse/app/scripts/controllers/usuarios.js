'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:UsuariosCtrl
 * @description
 * # UsuariosCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
  .controller('UsuariosCtrl', function ($scope, ApiPse, SesionUsuario, $timeout) {
    $scope.Register={};
    $scope.Usuario=SesionUsuario.ObtenerSesion();

    $scope.panelAnimate='';
      $scope.pageAnimate='';  
      $timeout(function () {
         $scope.pageAnimate='pageAnimate';
         $scope.panelAnimate='panelAnimate';
      },100);

    $scope.Registrar=function(){
      ApiPse
      .getResource('Usuarios/Crear',$scope.Register)
      .then(
        function(data){
          if(data.data.Estado==1){
            $scope.empresas=data.data.Datos
          }
        }
        ,function(data){

      }
    );
    }
    function ListarEmpresa(){
      ApiPse
      .getResource('Empresas/Listar')
      .then(
        function(data){
          if(data.data.Estado==1){
            $scope.empresas=data.data.Datos;
          }
        }
        ,function(data){

      }
    );
    }
    ListarEmpresa();
    if($scope.Usuario.rol!='Super Administrador'){
      $scope.Register.id_empresa=$scope.Usuario.id_empresa;
    }
  });
