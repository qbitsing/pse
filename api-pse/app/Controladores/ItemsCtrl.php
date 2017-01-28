<?php 

namespace Pse\Controladores;

use Pse\Modelos\Items as items;

class ItemsCtrl extends Controlador
{
	public function ListarDisponible($request , $response , $args)
	{
		$user=items::join('herramientas','items.id_herramienta','=','herramientas.id')->select('items.*','herramientas.nombre as herramienta')->where('items.estado','=',1)->where('items.id_empresa','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>"No hay ningun item registrado en el sistema"
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function ListarId($request , $response, $args)
	{
		$user=items::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>"No hay ningun item registrado con ese ID"
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function Create($request , $response)
	{
		$codigos=[];
		$contador=0;
		$parsedBody = json_decode($request->getBody()->getContents());
		$select=items::where('modelo','=',$parsedBody->modelo)->where('id_herramienta','!=',$parsedBody->id_herramienta)->where('id_empresa','=',$parsedBody->id_empresa)->count();
		if($select>0){
			$respuesta=[
				'Estado'=>0,
				'Datos'=>"El modelo ya esta asociada a otra herramienta"
			];
		}else{
			$id=items::where('modelo','=',$parsedBody->modelo)->where('id_empresa','=',$parsedBody->id_empresa)->orderBy('codigo_unico','desc')->get();
			$codigo=$id[0]->codigo_unico+1;
			while($contador<$parsedBody->cantidad){
				$result = items::create([
					'id_herramienta' => $parsedBody->id_herramienta,
					'modelo' => $parsedBody->modelo,
					'codigo_unico' => $codigo,
					'id_empresa'=>$parsedBody->id_empresa
				]);
				if ($result) {
					$codigos[$contador]=['id'=>$result['id'],'codigo'=>$codigo];	
					$contador++;
					$codigo++;
				}
			}
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$codigos
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function Actualizar($request , $response , $args)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user=items::where('id','=',$args['id'])->limit(1)->update([
			'id_herramienta' => $parsedBody->id_herramienta,
			'modelo' => $parsedBody->modelo,
			'codigo_unico' => $parsedBody->codigo_unico,
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
		$user=items::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta=[
				'Estado'=>1,
				'Datos'=>"Se ha eliminado exitosamente el item"
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>"No se ha podido eliminar el item"
			];
		}	
		$response->getBody()->write(json_encode($respuesta));
	}
}