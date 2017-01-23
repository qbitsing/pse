<?php 

namespace Pse\Controladores;

use Pse\Modelos\Actividades as actividades;

class ActividadesCtrl extends Controlador
{
	public function ListarDisponible($request , $response,$args )
	{
		$user=actividades::join('escenarios','actividades.id_escenario','=','escenarios.id')->select('actividades.*','escenarios.nombre as sitio')->where( 'actividades.estado' , '=' , 1 )->where('actividades.id_empresa','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No hay ninguna actividad registrada'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}
	public function ListarNoDisponible($request , $response ,$args)
	{
		$user=actividades::join('escenarios','actividades.id_escenario','=','escenarios.id')->select('actividades.*','escenarios.nombre as sitio')->where( 'actividades.estado' , '=' , 0 )->where('actividades.id_empresa','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No hay ninguna actividad registrada'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function ListarId($request , $response, $args)
	{
		$user=actividades::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No hay ninguna actividad registrada con ese ID'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = actividades::create([
			'nombre' => $parsedBody->nombre,
			'id_escenario' => $parsedBody->id_escenario
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
		$user=actividades::where('id','=',$args['id'])->limit(1)->update([
			'nombre' => $parsedBody->nombre,
			'id_escenario' => $parsedBody->id_escenario
			]
		);
		if ($user>0) {
			$respuesta=[
				'Estado'=>1,
				'Datos'=>'Actualizada correctamente'
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No se pudo actualizar'
			];
		}	
		$response->getBody()->write(json_encode($respuesta));
	}

	public function Eliminar($request , $response , $args)
	{
		$user=actividades::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta=[
				'Estado'=>1,
				'Datos'=>'Se ha eliminado exitosamente la actividad'
			];
			$respuesta="Se ha eliminado exitosamente";
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>'No se ha podido eliminar'
			];
		}	
		$response->getBody()->write(json_encode($respuesta));
	}
}