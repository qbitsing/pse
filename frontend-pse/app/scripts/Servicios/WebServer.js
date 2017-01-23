angular.module('frontendPseApp')
.factory('ApiPse', function($http , SesionUsuario) {
	return{
		getResource: function(resource , data) {
			var URL = "http://Api-pse/"+resource;
			if(SesionUsuario.ObtenerSesion() != null){
				if(data != undefined)
					data.userAction = SesionUsuario.ObtenerSesion().id;
				else{
					data = {
						userAction : SesionUsuario.ObtenerSesion().id
					}
				}
			}
			
			var req = {
				method : 'POST',
				url : URL,
				headers : {
					'Content-Type' : undefined
				},
				data : data
			}
			return $http(req);	
		}
    };
});