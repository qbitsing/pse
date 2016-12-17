<?php 

namespace Pse\Controladores;

use Pse\Modelos\Documentos as documentos;

class DocumentosCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=documentos::all()->toJson();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun documento en el sistema";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarUsuario($request , $response, $args)
	{
		$user=documentos::where('id_usuario','=',$args['id_usuario'])->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun documento de ese usuario";
		}
		$response->getBody()->write($respuesta);
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = documentos::create([
			'nombre' => $parsedBody->nombre,
			'id_usuario' => $parsedBody->id_usuario,
			'ruta' => $parsedBody->ruta
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
		$user=documentos::where('id','=',$args['id'])->limit(1)->update([
			'nombre' => $parsedBody->nombre,
			'id_usuario' => $parsedBody->id_usuario,
			'ruta' => $parsedBody->ruta
			]
		);
		if ($user>0) {
			$respuesta="Documento actualizado correctamente";
		}else{
			$respuesta="No se pudo actualizar";
		}	
		$response->getBody()->write($respuesta);
	}

	public function Eliminar($request , $response , $args)
	{
		$user=documentos::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta="Se han eliminado exitosamente el documento";
		}else{
			$respuesta="No se ha podido eliminar el documento";
		}	
		$response->getBody()->write($respuesta);
	}
}