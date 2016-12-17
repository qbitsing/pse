<?php 

namespace Pse\Controladores;

use Pse\Modelos\DetallesPrestamos as detallesprestamos;

class DetallesPrestamosCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=detallesprestamos::all()->toJson();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ninguna combinación";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarItem($request , $response, $args)
	{
		$user=detallesprestamos::where('id_item','=',$args['id_item'])->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun prestamo para ese item";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarPrestamo($request , $response, $args)
	{
		$user=detallesprestamos::where('id_prestamo','=',$args['id_prestamo'])->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun item para ese prestamo";
		}
		$response->getBody()->write($respuesta);
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user = detallesprestamos::create([
			'id_item' => $parsedBody->id_item,
			'id_prestamo' => $parsedBody->id_prestamo
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
		$user=detallesprestamos::where('id','=',$args['id'])->limit(1)->update([
			'id_item' => $parsedBody->id_item,
			'id_prestamo' => $parsedBody->id_prestamo
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
		$user=detallesprestamos::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta="Se ha eliminado exitosamente";
		}else{
			$respuesta="No se ha podido eliminar";
		}	
		$response->getBody()->write($respuesta);
	}
}