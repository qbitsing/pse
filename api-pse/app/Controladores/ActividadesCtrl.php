<?php 

namespace Pse\Controladores;

use Pse\Modelos\Actividades as actividades;

class ActividadesCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=actividades::all()->toJson();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ninguna actividad registrada";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarId($request , $response, $args)
	{
		$user=actividades::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ninguna actividad con ese Id";
		}
		$response->getBody()->write($respuesta);
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = actividades::create([
			'nombre' => $parsedBody->nombre,
			'id_escenario' => $parsedBody->id_escenario
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
		$user=actividades::where('id','=',$args['id'])->limit(1)->update([
			'nombre' => $parsedBody->nombre,
			'id_escenario' => $parsedBody->id_escenario
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
		$user=actividades::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta="Se ha eliminado exitosamente";
		}else{
			$respuesta="No se ha podido eliminar";
		}	
		$response->getBody()->write($respuesta);
	}
}