<?php 

namespace Pse\Controladores;

use Pse\Modelos\Alertas as alertas;

class AlertasCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=alertas::all()->toJson();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No hay ninguna alerta'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function ListarId($request , $response, $args)
	{
		$user=alertas::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No hay ninguna alerta con ese Id'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = alertas::create([
			'mensaje' => $parsedBody->mensaje,
			'id_usuario' => $parsedBody->id_usuario,
			'id_prestamo' => $parsedBody->id_prestamo
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
		$user=alertas::where('id','=',$args['id'])->limit(1)->update([
			'mensaje' => $parsedBody->mensaje,
			'id_usuario' => $parsedBody->id_usuario,
			'id_prestamo' => $parsedBody->id_prestamo
			]
		);
		if ($user>0) {
			$respuesta=[
				'Estado'=>1,
				'Datos'=>'Actualizada correctamente'
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No se pudo actualizar'
			];
		}	
		$response->getBody()->write(json_encode($respuesta));
	}

	public function Eliminar($request , $response , $args)
	{
		$user=alertas::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta=[
				'Estado'=>1,
				'Datos'=>'Se ha eliminado exitosamente'
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No se ha podido eliminar'
			];
		}	
		$response->getBody()->write(json_encode($respuesta));
	}
}