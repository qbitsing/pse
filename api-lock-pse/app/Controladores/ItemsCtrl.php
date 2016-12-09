<?php 

namespace Pse\Controladores;

use Pse\Modelos\Items as items;

class ItemsCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=items::all()->toJson();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun item registrado en el sistema";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarId($request , $response, $args)
	{
		$user=items::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun item registrado con ese ID";
		}
		$response->getBody()->write($respuesta);
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = items::create([
			'id_herramienta' => $parsedBody->id_herramienta,
			'modelo' => $parsedBody->modelo,
			'codigo_unico' => $parsedBody->codigo_unico
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
		$user=items::where('id','=',$args['id'])->limit(1)->update([
			'id_herramienta' => $parsedBody->id_herramienta,
			'modelo' => $parsedBody->modelo,
			'codigo_unico' => $parsedBody->codigo_unico
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
		$user=items::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta="Se ha eliminado exitosamente el item";
		}else{
			$respuesta="No se ha podido eliminar el item";
		}	
		$response->getBody()->write($respuesta);
	}
}