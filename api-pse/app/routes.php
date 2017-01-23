<?php 

$app->get('/' , function($request , $response){

	$respuesta = [
		"mensaje" => "Por favor seleccione una peticion valida"
	];
	$response->getBody()->write(json_encode($respuesta));
});

$app->group('/Actividades' , function() use($app){
	$app->post('/Listar' , 'ActividadesCtrl:Listar');
	$app->post('/ListarId/{id}' , 'ActividadesCtrl:ListarId');
	$app->post('/Crear' , 'ActividadesCtrl:Create');
	$app->post('/Actualizar/{id}' , 'ActividadesCtrl:Actualizar');
	$app->post('/Eliminar/{id}' , 'ActividadesCtrl:Eliminar');
});
$app->group('/Alertas' , function() use($app){
	$app->post('/Listar' , 'AlertasCtrl:Listar');
	$app->post('/ListarId/{id}' , 'AlertasCtrl:ListarId');
	$app->post('/Crear' , 'AlertasCtrl:Create');
	$app->post('/Actualizar/{id}' , 'AlertasCtrl:Actualizar');
	$app->post('/Eliminar/{id}' , 'AlertasCtrl:Eliminar');
});
$app->group('/Clientes' , function() use($app){
	$app->post('/Listar' , 'ClientesCtrl:Listar');
	$app->post('/ListarId/{id}' , 'ClientesCtrl:ListarId');
	$app->post('/Crear' , 'ClientesCtrl:Create');
	$app->post('/Actualizar/{id}' , 'ClientesCtrl:Actualizar');
	$app->post('/Eliminar/{id}' , 'ClientesCtrl:Eliminar');
});
$app->group('/ClientePrestamos' , function() use($app){
	$app->post('/Listar' , 'ClientesPrestamosCtrl:Listar');
	$app->post('/ListarCliente/{id_cliente}' , 'ClientesPrestamosCtrl:ListarCliente');
	$app->post('/ListarPrestamo/{id_prestamo}' , 'ClientesPrestamosCtrl:ListarPrestamo');
	$app->post('/Crear' , 'ClientesPrestamosCtrl:Create');
	$app->post('/Actualizar/{id}' , 'ClientesPrestamosCtrl:Actualizar');
	$app->post('/Eliminar/{id}' , 'ClientesPrestamosCtrl:Eliminar');
});
$app->group('/Coordenadas' , function() use($app){
	$app->post('/Listar' , 'CoordenadasCtrl:Listar');
	$app->post('/ListarUsuario/{id_usuario}' , 'CoordenadasCtrl:ListarUsuario');
	$app->post('/Crear' , 'CoordenadasCtrl:Create');
	$app->post('/Actualizar/{id}' , 'CoordenadasCtrl:Actualizar');
	$app->post('/Eliminar/{id}' , 'CoordenadasCtrl:Eliminar');
});
$app->group('/DetallesPrestamos' , function() use($app){
	$app->post('/Listar' , 'DetallesPrestamosCtrl:Listar');
	$app->post('/ListarItem/{id_item}' , 'DetallesPrestamosCtrl:ListarItem');
	$app->post('/ListarPrestamo/{id_prestamo}' , 'DetallesPrestamosCtrl:ListarPrestamo');
	$app->post('/Crear' , 'DetallesPrestamosCtrl:Create');
	$app->post('/Actualizar/{id}' , 'DetallesPrestamosCtrl:Actualizar');
	$app->post('/Eliminar/{id}' , 'DetallesPrestamosCtrl:Eliminar');
});
$app->group('/Documentos' , function() use($app){
	$app->post('/Listar' , 'DocumentosCtrl:Listar');
	$app->post('/ListarUsuario/{id_usuario}' , 'DocumentosCtrl:ListarUsuario');
	$app->post('/Crear' , 'DocumentosCtrl:Create');
	$app->post('/Actualizar/{id}' , 'DocumentosCtrl:Actualizar');
	$app->post('/Eliminar/{id}' , 'DocumentosCtrl:Eliminar');
});
$app->group('/Empresas' , function() use($app){
	$app->post('/ListarDepartamentos' , 'EmpresasCtrl:ListarDepartamentos');
	$app->post('/ListarCiudades' , 'EmpresasCtrl:ListarCiudades');
	$app->post('/Listar' , 'EmpresasCtrl:Listar');
	$app->post('/ListarId/{id}' , 'EmpresasCtrl:ListarId');
	$app->post('/Crear' , 'EmpresasCtrl:Create');
	$app->post('/Actualizar/{id}' , 'EmpresasCtrl:Actualizar');
	$app->post('/Eliminar/{id}' , 'EmpresasCtrl:Eliminar');
});
$app->group('/Sitios' , function() use($app){
	$app->post('/Listar' , 'EscenariosCtrl:Listar');
	$app->post('/ListarDisponible' , 'EscenariosCtrl:ListarDisponible');
	$app->post('/ListarId/{id}' , 'EscenariosCtrl:ListarId');
	$app->post('/Crear' , 'EscenariosCtrl:Create');
	$app->post('/Actualizar/{id}' , 'EscenariosCtrl:Actualizar');
	$app->post('/Eliminar/{id}' , 'EscenariosCtrl:Eliminar');
});
$app->group('/Herramientas' , function() use($app){
	$app->post('/Listar' , 'HerramientasCtrl:Listar');
	$app->post('/ListarDisponible' , 'HerramientasCtrl:ListarDisponible');
	$app->post('/ListarId/{id}' , 'HerramientasCtrl:ListarId');
	$app->post('/Crear' , 'HerramientasCtrl:Create');
	$app->post('/Actualizar/{id}' , 'HerramientasCtrl:Actualizar');
	$app->post('/Eliminar/{id}' , 'HerramientasCtrl:Eliminar');
});
$app->group('/Items' , function() use($app){
	$app->post('/Listar' , 'ItemsCtrl:Listar');
	$app->post('/ListarId/{id}' , 'ItemsCtrl:ListarId');
	$app->post('/Crear' , 'ItemsCtrl:Create');
	$app->post('/Actualizar/{id}' , 'ItemsCtrl:Actualizar');
	$app->post('/Eliminar/{id}' , 'ItemsCtrl:Eliminar');
});
$app->group('/Mantenimientos' , function() use($app){
	$app->post('/Listar' , 'EmpresasCtrl:Listar');
	$app->post('/ListarId/{id}' , 'EmpresasCtrl:ListarId');
	$app->post('/Crear' , 'EmpresasCtrl:Create');
	$app->post('/Actualizar/{id}' , 'EmpresasCtrl:Actualizar');
	$app->post('/Eliminar/{id}' , 'EmpresasCtrl:Eliminar');
});
$app->group('/Prestamos' , function() use($app){
	$app->post('/Listar' , 'PrestamosCtrl:Listar');
	$app->post('/ListarId/{id}' , 'PrestamosCtrl:ListarId');
	$app->post('/Crear' , 'PrestamosCtrl:Create');
	$app->post('/Actualizar/{id}' , 'PrestamosCtrl:Actualizar');
	$app->post('/Eliminar/{id}' , 'PrestamosCtrl:Eliminar');
});
$app->group('/Salidas' , function() use($app){
	$app->post('/Listar' , 'SalidasCtrl:Listar');
	$app->post('/ListarId/{id}' , 'SalidasCtrl:ListarId');
	$app->post('/Crear' , 'SalidasCtrl:Create');
	$app->post('/Actualizar/{id}' , 'SalidasCtrl:Actualizar');
	$app->post('/Eliminar/{id}' , 'SalidasCtrl:Eliminar');
});
$app->group('/Turnos' , function() use($app){
	$app->post('/Listar' , 'TurnosCtrl:Listar');
	$app->post('/ListarId/{id}' , 'TurnosCtrl:ListarId');
	$app->post('/ListarTurno' , 'TurnosCtrl:ListarTurno');
	$app->post('/Crear' , 'TurnosCtrl:Create');
	$app->post('/Actualizar/{id}' , 'TurnosCtrl:ActualizarEstado');
	$app->post('/Eliminar/{id}' , 'TurnosCtrl:Eliminar');
	$app->post('/CerrarTurnos' , 'TurnosCtrl:CerrarTurnos');
});
$app->group('/Usuarios' , function() use($app){
	$app->get('/Listar' , 'UsuariosCtrl:Listar');
	$app->post('/ListarEmpresa/{empresa}' , 'UsuariosCtrl:ListarEmpresa');
	$app->post('/ListarId/{id}' , 'UsuariosCtrl:ListarId');
	$app->post('/ListarDisponible' , 'UsuariosCtrl:ListarDisponible');
	$app->post('/Login' , 'UsuariosCtrl:Login');
	$app->post('/Crear' , 'UsuariosCtrl:Create');
	$app->post('/ActualizarPss/{id}' , 'UsuariosCtrl:ActualizarPss');
	$app->post('/Actualizar/{id}' , 'UsuariosCtrl:Actualizar');
	$app->post('/Eliminar/{id}' , 'UsuariosCtrl:Eliminar');
	$app->post('/EnviarCodigo' , 'UsuariosCtrl:EnviarCodigo');
	$app->post('/ValidarCodigo' , 'UsuariosCtrl:ValidarCodigo');
	$app->post('/RecuperarPss' , 'UsuariosCtrl:RecuperarPss');
});