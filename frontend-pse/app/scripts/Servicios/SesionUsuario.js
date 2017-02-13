angular.module('frontendPseApp')
.factory('SesionUsuario', function(localStorageService ) {
	return {
		CrearSesion : function(user){
			localStorageService.set("SesionUsuario" , user);
		},
		ActualizarSesion : function(user){
			var sesion=localStorageService.get("SesionUsuario");
			sesion['nombres'] = user.nombres;
			sesion['apellidos'] = user.apellidos;
			sesion['telefono'] = user.telefono;
			sesion['direccion'] = user.direccion;
			sesion['correo'] = user.correo;
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