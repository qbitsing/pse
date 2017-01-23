angular.module('frontendPseApp')
.factory('SesionUsuario', function(localStorageService ) {
	return {
		CrearSesion : function(user){
			localStorageService.set("SesionUsuario" , user);
		},
		ObtenerSesion : function(){
			return localStorageService.get("SesionUsuario");
		},
		CerrarSesion : function(){
			return localStorageService.remove("SesionUsuario");
		}
	};
});