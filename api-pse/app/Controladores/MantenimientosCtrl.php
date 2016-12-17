<?php 

namespace Pse\Controladores;

use Pse\Modelos\Mantenimientos as mantenimientos;

class MantenimientosCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=mantenimientos::all()->toJson();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun movimiento de mantenimiento registrado en el sistema";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarId($request , $response, $args)
	{
		$user=mantenimientos::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun movimiento de mantenimiento registrado en el sistema con ese ID";
		}
		$response->getBody()->write($respuesta);
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = mantenimientos::create([
			'id_item' => $parsedBody->id_item,
			'ingreso' => $parsedBody->ingreso
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
		$user=mantenimientos::where('id','=',$args['id'])->limit(1)->update([
			'salida' => $parsedBody->salida,
			'estado'=>$parsedBody->estado
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
		$user=mantenimientos::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta="Se ha eliminado exitosamente el movimiento de mantenimiento";
		}else{
			$respuesta="No se ha podido eliminar el movimiento de mantenimiento";
		}	
		$response->getBody()->write($respuesta);
	}
}