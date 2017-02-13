'use strict';

/**
 * @ngdoc function
 * @name frontendPseApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the frontendPseApp
 */
angular.module('frontendPseApp')
  .controller('HomeCtrl', function ($scope , $uibModal ,ApiPse, SesionUsuario, $state, $timeout) {
    $scope.contador=0;
    $scope.cambio=false;
    $scope.cargando=false;
    $scope.panelAnimate='';
    $scope.pageAnimate=''; 
  	$scope.Usuario = SesionUsuario.ObtenerSesion();
    $scope.myCroppedImage='';
    $scope.MiUsuario={};
    $timeout(function () {
      $scope.pageAnimate='pageAnimate';
      $scope.panelAnimate='panelAnimate';
    },100);
    ApiPse
    .getResource('Images/Profile/'+$scope.Usuario.id)
    .then(function(data){
      if(data.data){
        $scope.myImage='data:image/png;base64,'+data.data;
        $scope.Imagen=$scope.myImage;
      }
    },function(data){
    });
	var handleFileSelect=function(evt) {
        angular.element(document.querySelector('#inputval')).text( $(this).val());
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
          $scope.$apply(function($scope){
            $scope.contador=4;
            $scope.cambiar();
            $scope.myImage=evt.target.result;
          });
        };
          reader.readAsDataURL(file);
      };
      angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

      $scope.cambiar=function(act){
        if(act==1){
          $scope.contador=1;
        }else if(act==2){
          $scope.contador++;
        }
        if($scope.contador>3){
          $scope.cambio=true;
        }
      }

      $scope.ImageUpdate=function(){
        if($scope.cambio){
            $scope.cargando=true;
            $scope.MiUsuario.myImage=$scope.myCroppedImage;
            $scope.MiUsuario.Image=$scope.myImage;
            ApiPse
            .getResource('Usuarios/ActualizarImagen/'+$scope.Usuario.id , $scope.MiUsuario)
            .then(function(data){
              $scope.cargando=false;
              if(data.data.Estado == 1){
                var imagen=document.getElementsByClassName('dash-profile');
                var atributo=imagen[0].getAttribute('src');
                var src='';
                if(atributo=='http://Api-pse/Images/Avatar/'+$scope.Usuario.id){
                  src='http://Api-pse/Images/Recarga/'+$scope.Usuario.id;
                }else if(atributo=='http://Api-pse/Images/Recarga/'+$scope.Usuario.id){
                  src='http://Api-pse/Images/Avatar/'+$scope.Usuario.id;
                }
                imagen[0].setAttribute('src',src);
                UserUpdate();
              }else{
                alert(data.data.Datos);
              }
            },function(data){
              $scope.cargando=false;
            });
        }else{
            UserUpdate();
        }
    }

    function UserUpdate(){
        if(JSON.stringify($scope.Usuario)!=JSON.stringify(SesionUsuario.ObtenerSesion())){
            $scope.cargando=true;
            ApiPse
            .getResource('Usuarios/ActualizarDatos' , $scope.Usuario)
            .then(function(data){
              $scope.cargando=false;
              if(data.data.Estado == 1){
                SesionUsuario.ActualizarSesion($scope.Usuario);
              }else{
                console.log(data.data.Datos);
              }
            },function(data){
              $scope.cargando=false;
            });
        }
    }
  });
