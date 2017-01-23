<?php 

namespace Pse\Controladores;

use Pse\Modelos\Usuarios as users;


class UsuariosCtrl extends Controlador
{
	
	public function Listar($request , $response )
	{
		$user=users::all()->toJson();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun usuario registrado";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarEmpresa($request , $response , $args){
		$parsedBody = json_decode($request->getBody()->getContents());
		$users = users::where('id_empresa' , '=' , $args['empresa'])
		->where('id' , '!=' , $parsedBody->userAction)->get();
		if($users!="[]"){
			$respuesta=[
				"Estado" => 1,
				"Datos" => $users
			];
		}else{
			$respuesta=[
				"Estado" => 0,
				"Datos" => 'No hay ningun usuarios registrado en la empresa'
			];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function ListarDisponible($request , $response, $args)
	{
		$user=users::where('estado','=','1')->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun usuario disponible";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarNoDisponible($request , $response, $args)
	{
		$user=users::where('estado','=','0')->get();
		if($user!="[]"){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun usuario eliminado";
		}
		$response->getBody()->write($respuesta);
	}

	public function ListarId($request , $response, $args)
	{
		$user=users::find($args['id']);
		if($user){
			$respuesta=$user;
		}else{
			$respuesta="No hay ningun usuario registrado con ese ID";
		}
		$response->getBody()->write($respuesta);
	}

	public function Login($request , $response)
	{
		
		$parsedBody = json_decode($request->getBody()->getContents());

		$user=users::where('correo','=',$parsedBody->correo)->get();
		if($user!="[]"){
			$r= $user;
			if(password_verify($parsedBody->contrasenaa, $r[0]->contrasena)){
				$respuesta=[
					"Estado" => 1,
					"Mensaje" => "Bienvenido señor@ : ".$r[0]->nombres,
					"user" => $r[0]
				];
			}else{
				$respuesta=[
					"Estado"=>0,
					"Datos"=>"Datos Incorrectos"
				];
			}
		}else{
			$respuesta=[
					"Estado"=>0,
					"Datos"=>"Datos Incorrectos"
				];
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function ActualizarPss($request , $response, $args)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user=users::find($args['id']);
		if($user){
			$respuesta=$user;
			if(password_verify($parsedBody->contrasena_anterior, $respuesta['contrasena']))
			{
				$contrasena_hash = password_hash($parsedBody->contrasena, PASSWORD_DEFAULT);
				$update=users::where('id','=',$args['id'])->limit(1)->update([
									'contrasena' => $contrasena_hash
									]);
				if ($update>0) {
					$respuesta="Contraseña actualizada correctamente";
				}else{
					$respuesta="No se pudo actualizar la contraseña";
				}	
			}else{
				$respuesta="Las contraseñas no coinciden";
			}
		}else{
			$respuesta="No hay ningun usuario registrado con ese ID";
		}
		$response->getBody()->write($respuesta);
	}

	public function Create($request , $response)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$query=users::where('id','=',$parsedBody->id)->count();
		if($query>0){
			$respuesta=[
				'Estado'=>0,
				'Datos'=>"Ya existe un Usuario registrado con ese documento"
			];
		}else{
			$pss=$this->GenerarPss();
			/*  A partir de este momento se reliza la operacion de crear un usuario   */
			$contrasena_hash = password_hash($pss , PASSWORD_DEFAULT);
			$user = users::create([
				'id' => $parsedBody->id,
				'tipo_doc' => $parsedBody->tipo_doc,
				'nombres' => $parsedBody->nombres,
				'apellidos' => $parsedBody->apellidos,
				'telefono' => $parsedBody->telefono,
				'direccion' => $parsedBody->direccion,
				'correo' => $parsedBody->correo,
				'id_empresa' => $parsedBody->id_empresa,
				'contrasena' => $contrasena_hash
			]);
			if ($user) {
				if(EmailCtrl::enviarEmail($parsedBody->correo,$parsedBody->nombres,$pss,null,$parsedBody->id)){
					$Datos = 'Registro completo, la contraseña ha sido enviada al correo ingresado';
				}else{
					$Datos="No se ha podido enviar el correo";
				}
				$respuesta=[
					"Estado"=>1,
					"Datos"=>$Datos
				];
			}
			else{
				$respuesta=[
					"Estado"=>0,
					"Datos"=>"No se ha podido completar el registro"
				];
			}
		}
		$response->getBody()->write(json_encode($respuesta));
	}

	public function Actualizar($request , $response , $args)
	{
		$parsedBody = json_decode($request->getBody()->getContents());
		$user=users::where('id','=',$args['id'])->limit(1)->update([
			'nombres' => $parsedBody->nombres,
			'apellidos' => $parsedBody->apellidos,
			'telefono' => $parsedBody->telefono,
			'direccion' => $parsedBody->direccion,
			'correo' => $parsedBody->correo
			//'id_sucursal' => $parsedBody->id_sucursal
			]
		);
		if ($user>0) {
			$respuesta=[
				"Estado"=>1,
				"Datos"=>"Actualizado correctamente"
			];
		}else{
			$respuesta=[
				"Estado"=>0,
				"Datos"=>"No se pudo actualizar"
			];
		}	
		$response->getBody()->write($respuesta);
	}

	public function Eliminar($request , $response , $args)
	{
		$user=users::where('id','=',$args['id'])->delete();
		if ($user>0) {
			$respuesta="Se ha eliminado exitosamente";
		}else{
			$respuesta="No se ha podido eliminar";
		}	
		$response->getBody()->write($respuesta);
	}

	public function EnviarCodigo($request , $response){
		$parsedBody = json_decode($request->getBody()->getContents());
		$user=users::where('correo','=',$parsedBody->Email)->limit(1)->get();
		if($user!="[]"){
			$codigo=$this->GenerarCodigo();
			$update=users::where('id','=',$user[0]->id)->limit(1)->update([
				'codigo_temporal'=>$codigo
			]);
			if($update>0){
				if(mail($parsedBody->Email, 'Codigo de verificación', 'Hola señor@ '.$user[0]->nombres.', su petición de restablecimiento de contraseña ha sido atendida, para continuar por favor digite el siguiente codigo de verificación en la aplicación:'.$codigo,'From: support@proyecto.com')){
					$respuesta=json_encode([
						"Estado" => 1,
						"Mensaje" => "El codigo de recuperación ha sido enviado a su correo señor@ ".$user[0]->nombres,
						"id"=>$user[0]->id
					]);
				}else{
					$respuesta=json_encode([
						"Estado" => 0,
						"Mensaje" => "El correo no se ha enviado"
					]);
				}
			}
		}else{
			$respuesta=json_encode([
				"Estado" => 0,
				"Mensaje" => "El correo ingresado no es valido"
			]);
		}
		$response->getBody()->write($respuesta);
	}
	public function ValidarCodigo($request , $response){
		$parsedBody = json_decode($request->getBody()->getContents());
		$user=users::where('id','=',$parsedBody->Id)->limit(1)->get();
		if ($user!="[]") {
			if ($parsedBody->Codigo==$user[0]->codigo_temporal) {
				$respuesta=json_encode([
								"Estado" => 1,
								"Mensaje" => "El codigo de verificación es correcto"
							]);
			}else{
				$respuesta=json_encode([
								"Estado" => 0,
								"Mensaje" => "El codigo de verificación es incorrecto"
							]);
			}
		}else{
			$respuesta="";
		}
		$response->getBody()->write($respuesta);
	}

	public function RecuperarPss($request , $response){
		$parsedBody = json_decode($request->getBody()->getContents());
		$contrasena=password_hash($parsedBody->contrasena , PASSWORD_DEFAULT);
		$user=users::where('id','=',$parsedBody->id)->limit(1)->update([
			'contrasena'=>$contrasena
		]);
		if($user>0){
			$respuesta=json_encode([
				"Estado" => 1,
				"Mensaje" => "Su contraseña ha sido actualizada"
			]);
		}else{
			$respuesta=json_encode([
				"Estado" => 0,
				"Mensaje" => "No se ha podido completar la recuperación de la contraseña"
			]);
		}
		$response->getBody()->write($respuesta);
	}

	public function GenerarToken(){
		/*  Esta funcion genera y retorna una cadena de 40 caracteres de manera aleatoria   */
		$caracteres =[
		"0","1","2","3","4","5","6","7","8","9","q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","!","#","$","%","&","(",")","*","+","-","/","?","@"
		];
		$token = "";

		for ($i=0; $i <40 ; $i++) {
			$max_value  = count($caracteres)-1;
			$min_value = 0;
			$index = rand($max_value , $min_value); 
			$token .= $caracteres[$index];
		}

		return $token;
	}

	public function GenerarPss(){
		/*  Esta funcion genera y retorna una cadena de 40 caracteres de manera aleatoria   */
		$caracteres =[
		"0","1","2","3","4","5","6","7","8","9"
		];
		$codigo = "";

		for ($i=0; $i <5 ; $i++) {
			$max_value  = count($caracteres)-1;
			$min_value = 0;
			$index = rand($max_value , $min_value); 
			$codigo .= $caracteres[$index];
		}

		return $codigo;
	}

	public function GenerarCodigo(){
		/*  Esta funcion genera y retorna una cadena de 40 caracteres de manera aleatoria   */
		$caracteres =[
		"0","1","2","3","4","5","6","7","8","9"
		];
		$codigo = "";

		for ($i=0; $i <5 ; $i++) {
			$max_value  = count($caracteres)-1;
			$min_value = 0;
			$index = rand($max_value , $min_value); 
			$codigo .= $caracteres[$index];
		}

		return $codigo;
	}


}
