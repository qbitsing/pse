<?php 

namespace Pse\Controladores;

use Pse\Modelos\Salidas as salidas;

class SalidasCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=salidas::all()->toJson();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ninguna herramienta dada de baja en el sistema";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarId($request , $response, $args)
	{
		$user=salidas::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun procedimiento de baja en el sistema con ese ID";
		}
		$response->getBody()->write($respuesta);
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = salidas::create([
			'id_item' => $parsedBody->id_item,
			'fecha' => $parsedBody->fecha,
			'id_usuario' => $parsedBody->id_usuario
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
		$user=salidas::where('id','=',$args['id'])->limit(1)->update([
			'id_item' => $parsedBody->id_item,
			'fecha' => $parsedBody->fecha,
			'id_usuario' => $parsedBody->id_usuario
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
		$user=salidas::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta="Se ha eliminado exitosamente la dada de baja";
		}else{
			$respuesta="No se ha podido eliminar la dada de baja";
		}	
		$response->getBody()->write($respuesta);
	}
}