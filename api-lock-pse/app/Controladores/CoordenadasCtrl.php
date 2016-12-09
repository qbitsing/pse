<?php 

namespace Pse\Controladores;

use Pse\Modelos\Coordenadas as coordenadas;

class CoordenadasCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=coordenadas::all()->toJson();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningunas coordenadas en el sistema";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarUsuario($request , $response, $args)
	{
		$user=coordenadas::where('id_usuario','=',$args['id_usuario'])->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningunas coordenadas con ese usuario";
		}
		$response->getBody()->write($respuesta);
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = coordenadas::create([
			'id_usuario' => $parsedBody->id_usuario,
			'latitud' => $parsedBody->latitud,
			'longitud' => $parsedBody->longitud
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
		$user=coordenadas::where('id_usuario','=',$args['id_usuario'])->limit(1)->update([
			'latitud' => $parsedBody->latitud,
			'longitud' => $parsedBody->longitud
			]
		);
		if ($user>0) {
			$respuesta="Coordenadas actualizadas correctamente";
		}else{
			$respuesta="No se pudo actualizar";
		}	
		$response->getBody()->write($respuesta);
	}

	public function Eliminar($request , $response , $args)
	{
		$user=coordenadas::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta="Se han eliminado exitosamente las coordenadas";
		}else{
			$respuesta="No se han podido eliminar las coordenadas";
		}	
		$response->getBody()->write($respuesta);
	}
}