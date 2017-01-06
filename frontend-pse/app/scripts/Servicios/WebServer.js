angular.module('frontendPseApp')
.factory('ApiPse', function($http , SesionUsuario) {
	return{
		getResource: function(resource , data) {
			var URL = "http://Api-pse/"+resource;
			if(data != undefined){
				/*if(SesionUsuario.ObtenerUsuario() != null){
					data.userAction = SesionUsuario.ObtenerUsuario().id;
				}*/
			}

			console.log(data);
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