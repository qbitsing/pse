<?php 

namespace Pse\Controladores;

use Pse\Modelos\Escenarios as escenarios;

class EscenariosCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=escenarios::all();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No hay ningun escenario registrado en el sistema'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}
	public function ListarDisponible($request , $response ,$args)
	{
		$user=escenarios::where('estado','=',1)->where('id_empresa','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No hay ningun escenario registrado en el sistema'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function ListarId($request , $response, $args)
	{
		$user=escenarios::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun escenario registrado con ese ID";
		}
		$response->getBody()->write($respuesta);
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = escenarios::create([
			'nombre' => $parsedBody->nombre,
			'ciudad' => $parsedBody->id_ciudad
		]);
		if ($user) {
			$respuesta=[
				'Estado'=>1,
				'Datos'=>'Registro completo'
			];
		}
		else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No se ha podido completar el registro'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function Actualizar($request , $response , $args)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user=escenarios::where('id','=',$args['id'])->limit(1)->update([
			'nombre' => $parsedBody->nombre,
			'ciudad' => $parsedBody->ciudad
			]
		);
		if ($user>0) {
			$respuesta="Información actualizada correctamente";
		}else{
			$respuesta="No se pudo actualizar la información";
		}	
		$response->getBody()->write($respuesta);
	}

	public function Eliminar($request , $response , $args)
	{
		$user=escenarios::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta="Se ha eliminado exitosamente el escenario";
		}else{
			$respuesta="No se ha podido eliminar el escenario";
		}	
		$response->getBody()->write($respuesta);
	}
}