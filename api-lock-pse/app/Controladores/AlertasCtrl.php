<?php 

namespace Pse\Controladores;

use Pse\Modelos\Alertas as alertas;

class AlertasCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=alertas::all()->toJson();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ninguna alerta";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarId($request , $response, $args)
	{
		$user=alertas::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ninguna alerta con ese Id";
		}
		$response->getBody()->write($respuesta);
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
			$respuesta="Registro completo";
		}
		else{
			$respuesta="No se ha podido completar el registro";
		}
		$response->getBody()->write($respuesta);
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
			$respuesta="Actualizada correctamente";
		}else{
			$respuesta="No se pudo actualizar";
		}	
		$response->getBody()->write($respuesta);
	}

	public function Eliminar($request , $response , $args)
	{
		$user=alertas::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta="Se ha eliminado exitosamente";
		}else{
			$respuesta="No se ha podido eliminar";
		}	
		$response->getBody()->write($respuesta);
	}
}