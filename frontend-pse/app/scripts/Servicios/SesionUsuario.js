angular.module('frontendPseApp')
.factory('SesionUsuario', function(localStorageService ) {
	return {
		CrearSesion : function(user){
			localStorageService.set("SesionUsuario" , user);
		},
		ActualizarSesion : function(user){
			var sesion=localStorageService.get("SesionUsuario");
			sesion[3] = user.nombres;
			sesion[4] = user.apellidos;
			sesion[5] = user.telefono;
			sesion[6] = user.direccion;
			sesion[7] = user.correo;
			localStorageService.set("SesionUsuario",sesion);
		},
		ObtenerSesion : function(){
			return localStorageService.get("SesionUsuario");
		},
		CerrarSesion : function(){
			return localStorageService.remove("SesionUsuario");
		}
	};
});