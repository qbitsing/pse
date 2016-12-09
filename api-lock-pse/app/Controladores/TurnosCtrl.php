<?php 

namespace Pse\Controladores;

use Pse\Modelos\Turnos as turnos;

class SalidasCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=turnos::all()->toJson();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun turno registrado en el sistema";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarId($request , $response, $args)
	{
		$user=turnos::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun turno registrado en el sistema con ese ID";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarTurno($request , $response, $args)
	{
		$user=turnos::where('estado','=',1)->limit(1)->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay turnos disponibles en el momento";
		}
		$response->getBody()->write($respuesta);
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = turnos::create([
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

	public function ActualizarEstado($request , $response , $args)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user=turnos::where('id_usuario','=',$args['id_usuario'])->limit(1)->update([
			'estado' => $parsedBody->estado
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
		$user=turnos::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta="Se ha eliminado exitosamente el turno";
		}else{
			$respuesta="No se ha podido eliminar el turno";
		}	
		$response->getBody()->write($respuesta);
	}
	public function CerrarTurnos($request , $response , $args)
	{
		$user=turnos::all()->truncate();
		if ($user>0) {
			$respuesta="Cierre realizado";
		}else{
			$respuesta="No se ha podido eliminar el turno";
		}	
		$response->getBody()->write($respuesta);
	}
}