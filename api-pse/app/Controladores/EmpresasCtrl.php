<?php 

namespace Pse\Controladores;

use Pse\Modelos\Empresas as empresas;

class EmpresasCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=empresas::all()->toJson();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ninguna empresa registrada en el sistema";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarId($request , $response, $args)
	{
		$user=empresas::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ninguna empresa registrada con ese ID";
		}
		$response->getBody()->write($respuesta);
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = empresas::create([
			'id' => $parsedBody->id,
			'nombre' => $parsedBody->nombre,
			'direccion' => $parsedBody->direccion,
			'telefono' => $parsedBody->telefono,
			'ciudad' => $parsedBody->ciudad
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
		$user=empresas::where('id','=',$args['id'])->limit(1)->update([
			'nombre' => $parsedBody->nombre,
			'direccion' => $parsedBody->direccion,
			'telefono' => $parsedBody->telefono,
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
		$user=empresas::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta="Se ha eliminado exitosamente la empresa";
		}else{
			$respuesta="No se ha podido eliminar la empresa";
		}	
		$response->getBody()->write($respuesta);
	}
}