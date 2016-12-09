<?php 

namespace Pse\Controladores;

use Pse\Modelos\Prestamos as prestamos;

class PrestamosCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=prestamos::all()->toJson();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun prestamo registrado en el sistema";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarId($request , $response, $args)
	{
		$user=prestamos::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun prestamo registrado con ese ID";
		}
		$response->getBody()->write($respuesta);
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = prestamos::create([
			'salida' => $parsedBody->salida,
			'entrada' => $parsedBody->entrada,
			'id_usuario' => $parsedBody->id_usuario,
			'id_actividad' => $parsedBody->id_actividad,
			'cantidad_personas' => $parsedBody->cantidad_personas,
			'condiciones' => $parsedBody->condiciones,
			'novedades' => $parsedBody->novedades
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
		$user=prestamos::where('id','=',$args['id'])->limit(1)->update([
			'salida' => $parsedBody->salida,
			'entrada' => $parsedBody->entrada,
			'id_usuario' => $parsedBody->id_usuario,
			'id_actividad' => $parsedBody->id_actividad,
			'cantidad_personas' => $parsedBody->cantidad_personas,
			'condiciones' => $parsedBody->condiciones,
			'novedades' => $parsedBody->novedades
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
		$user=prestamos::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta="Se ha eliminado exitosamente el prestamo";
		}else{
			$respuesta="No se ha podido eliminar el prestamo";
		}	
		$response->getBody()->write($respuesta);
	}
}