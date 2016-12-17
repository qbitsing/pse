<?php 

require __DIR__ . '/../vendor/autoload.php';

$app = new \Slim\App([
	'settings' =>[
		'displayErrorDetails' => true,
		'db' => [
			'driver' => 'mysql',
			'host' => 'localhost',
			'database'=> 'pse',
			'username' => 'root',
			'password' => '',
			'charset' => 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix' => ''
		]
	]

]);

$container = $app->getContainer();

$capsule = new \Illuminate\Database\Capsule\Manager;
$capsule->addConnection($container['settings']['db']);

$capsule->setAsGlobal();
$capsule->bootEloquent();

$container['db'] = function($container) use ($capsule){
	return $capsule;
};

$container['UsuariosCtrl'] = function ($container)
{
	return new Pse\Controladores\UsuariosCtrl($container);
};
$container['ActividadesCtrl'] = function ($container)
{
	return new Pse\Controladores\ActividadesCtrl($container);
};
$container['AlertasCtrl'] = function ($container)
{
	return new Pse\Controladores\AlertasCtrl($container);
};
$container['ClientesCtrl'] = function ($container)
{
	return new Pse\Controladores\ClientesCtrl($container);
};
$container['ClientesPrestamosCtrl'] = function ($container)
{
	return new Pse\Controladores\ClientesPrestamosCtrl($container);
};
$container['CoordenadasCtrl'] = function ($container)
{
	return new Pse\Controladores\CoordenadasCtrl($container);
};
$container['DetallesPrestamosCtrl'] = function ($container)
{
	return new Pse\Controladores\DetallesPrestamosCtrl($container);
};
$container['DocumentosCtrl'] = function ($container)
{
	return new Pse\Controladores\DocumentosCtrl($container);
};
$container['EmpresasCtrl'] = function ($container)
{
	return new Pse\Controladores\EmpresasCtrl($container);
};
$container['EscenariosCtrl'] = function ($container)
{
	return new Pse\Controladores\EscenariosCtrl($container);
};
$container['HerramientasCtrl'] = function ($container)
{
	return new Pse\Controladores\HerramientasCtrl($container);
};
$container['ItemsCtrl'] = function ($container)
{
	return new Pse\Controladores\ItemsCtrl($container);
};
$container['MantenimientosCtrl'] = function ($container)
{
	return new Pse\Controladores\MantenimientosCtrl($container);
};
$container['PrestamosCtrl'] = function ($container)
{
	return new Pse\Controladores\PrestamosCtrl($container);
};
$container['SalidasCtrl'] = function ($container)
{
	return new Pse\Controladores\SalidasCtrl($container);
};
$container['TurnosCtrl'] = function ($container)
{
	return new Pse\Controladores\TurnosCtrl($container);
};
require __DIR__ . '/../app/routes.php';