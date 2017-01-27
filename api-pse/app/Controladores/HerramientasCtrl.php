<?php 

namespace Pse\Controladores;

use Pse\Modelos\Herramientas as herramientas;
use Pse\Modelos\Items as items;

class HerramientasCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=herramientas::all();
		if($user){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>"No hay ninguna herramienta registrada en el sistema"
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function ListarDisponible($request , $response ,$args)
	{
		$user=herramientas::where('estado','=',1)->where('id_empresa','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>"No hay ninguna herramienta registrada en el sistema"
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function ListarId($request , $response, $args)
	{
		$user=herramientas::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>"No hay ninguna herramienta registrada con ese ID"
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = herramientas::create([
			'nombre' => $parsedBody->nombre,
			'id_empresa'=>$parsedBody->id_empresa
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
				'Datos'=>"No se ha podido completar el registro"
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function Actualizar($request , $response , $args)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user=herramientas::where('id','=',$args['id'])->limit(1)->update([
			'nombre' => $parsedBody->nombre,
			'id_empresa'=>$parsedBody->id_empresa
			]
		);
		if ($user>0) {
			$respuesta=[
				'Estado'=>1,
				'Datos'=>"Información actualizada correctamente"
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>"No se pudo actualizar la información"
			];
		}	
		$response->getBody()->write(json_encode($respuesta));
	}

	public function Eliminar($request , $response , $args)
	{
		$user=herramientas::where('id','=',$args['id'])->update([
			'estado'=> 4
		]);
		if ($user>0) {
			$select=items::where('id_herramienta','=',$args['id'])->count();
			$items=items::where('id_herramienta','=',$args['id'])->update([
				'estado'=> 4
			]);
			if($items==$select){
				$respuesta=[
					"Estado"=>1,
					"Datos" => "Se ha eliminado exitosamente la herramienta"
				];
			}else{
				$respuesta=[
					"Estado"=>0,
					"Datos" => "No se ha podido eliminar la herramienta"
				];
			}
		}else{
			$respuesta=[
				"Estado"=>0,
				"Datos" => "No se ha podido eliminar la herramienta"
			];
		}	
		$response->getBody()->write(json_encode($respuesta));
	}
}