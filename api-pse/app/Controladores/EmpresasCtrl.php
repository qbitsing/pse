<?php 

namespace Pse\Controladores;

use Pse\Modelos\Empresas as empresas;
use Pse\Modelos\Ciudades as ciudades;
use Pse\Modelos\Departamentos as departamentos;

class EmpresasCtrl extends Controlador
{
	public function Listar($request , $response )
	{
		$user=empresas::where('estado','=',1)->get();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>"No hay ninguna empresa registrada en el sistema"
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function ListarDepartamentos($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$result=departamentos::where('id_pais','=','170')->orderBy('nombre')->get();
		if($result!="[]"){
			$respuesta = [
				'Estado' => 1,
				'Datos' => $result
			];
		}else{
			$respuesta = [
				'Estado' => 0,
				'Datos' => 'No hay ningun departamento registrado en este pais'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}
	
	public function ListarCiudades($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$result=ciudades::all();
		if($result!="[]"){
			$respuesta = [
				'Estado' => 1,
				'Datos' => $result
			];
		}else{
			$respuesta = [
				'Estado' => 0,
				'Datos' => 'No hay ninguna ciudad registrada'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function ListarId($request , $response, $args)
	{
		$user=empresas::where('id','=',$args['id'])->get();
		if($user!="[]"){
			$respuesta=[
				'Estado'=>1,
				'Datos'=>$user
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>"No hay ninguna empresa registrada con ese ID"
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$query=empresas::where('id','=',$parsedBody->id)->count();
		if($query>0){
			$respuesta=[
				'Estado'=>0,
				'Datos'=>"Ya existe una empresa registrada con ese Nit"
			];
		}else{
			$user = empresas::create([
				'id' => $parsedBody->id,
				'nombre' => $parsedBody->nombre,
				'direccion' => $parsedBody->direccion,
				'telefono' => $parsedBody->telefono,
				'ciudad' => $parsedBody->ciudad
			]);
			if ($user) {
				$respuesta=[
					'Estado'=>1,
					'Datos'=>"Registro completo"
				];
			}
			else{
				$respuesta=[
					'Estado'=>0,
					'Datos'=>"No se ha podido completar el registro"
				];
			}
		}
		$response->getBody()->write(json_encode($respuesta));
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
		$response->getBody()->write($respuesta);
	}

	public function Eliminar($request , $response , $args)
	{
		$user=empresas::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta=[
				'Estado'=>1,
				'Datos'=>"Se ha eliminado exitosamente la empresa"
			];
		}else{
			$respuesta=[
				'Estado'=>0,
				'Datos'=>"No se ha podido eliminar la empresa"
			];
		}	
		$response->getBody()->write($respuesta);
	}
}