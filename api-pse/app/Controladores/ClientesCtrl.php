<?php 

namespace Pse\Controladores;

use Pse\Modelos\Clientes as clientes;

class ClientesCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=clientes::all()->toJson();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No hay ningun cliente'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function ListarId($request , $response, $args)
	{
		$user=clientes::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
			
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No hay ningun cliente con ese Id'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = clientes::create([
			'id' => $parsedBody->id,
			'nombre' => $parsedBody->nombre
		]);
		if ($user) {
			$respuesta=[
				'Estado'=>1,
				'Datos'=>'Registro completo'
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
		$user=clientes::where('id','=',$args['id'])->limit(1)->update([
			'nombre' => $parsedBody->nombre
			]
		);
		if ($user>0) {
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$'Información actualizada correctamente'
			];
		}else{
			$respuesta=[
				'Estado'=>1,
				'Datos'=>'No se pudo actualizar'
			];
		}	
		$response->getBody()->write(json_encode($respuesta));
	}

	public function Eliminar($request , $response , $args)
	{
		$user=clientes::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
			$respuesta="Se ha eliminado exitosamente";
		}else{
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
			$respuesta="No se ha podido eliminar";
		}	
		$response->getBody()->write(json_encode($respuesta));
	}
}