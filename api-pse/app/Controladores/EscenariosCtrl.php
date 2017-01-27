<?php 

namespace Pse\Controladores;

use Pse\Modelos\Escenarios as escenarios;
use Pse\Modelos\Actividades as actividades;

class EscenariosCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=escenarios::all();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No hay ningun escenario registrado en el sistema'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}
	public function ListarDisponible($request , $response ,$args)
	{
		$user=escenarios::join('ciudad','escenarios.id_ciudad','=','ciudad.id')->select('escenarios.*','ciudad.nombre as ciudad')->where('escenarios.estado','=',1)->where('escenarios.id_empresa','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No hay ningun escenario registrado en el sistema'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function ListarId($request , $response, $args)
	{
		$user=escenarios::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun escenario registrado con ese ID";
		}
		$response->getBody()->write($respuesta);
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = escenarios::create([
			'nombre' => $parsedBody->nombre,
			'id_ciudad' => $parsedBody->id_ciudad,
			'id_empresa' =>$parsedBody->id_empresa
		]);
		if ($user) {
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}
		else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No se ha podido completar el registro'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function Actualizar($request , $response , $args)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user=escenarios::where('id','=',$args['id'])->limit(1)->update([
			'nombre' => $parsedBody->nombre,
			'id_ciudad' => $parsedBody->id_ciudad,
			'id_empresa' =>$parsedBody->id_empresa
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
		$user=escenarios::where('id','=',$args['id'])->update([
			'estado' => 4
		]);
		if ($user>0) {
			$actividades=actividades::where('id_escenario','=',$args['id'])->update([
				'estado'=> 4
			]);
			if($actividades>0){
				$respuesta=[
					"Estado"=>1,
					"Datos" => "Se ha eliminado exitosamente el escenario"
				];
			}
		}else{
			$respuesta=[
					"Estado"=>1,
					"Datos" => "No se ha podido eliminar el escenario"
				];
		}	
		$response->getBody()->write($respuesta);
	}
}