<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Usuarios extends Model
{
	protected $table = "usuarios";
	protected $fillable = [
		'id',
		'tipo_doc',
		'nombres',
		'apellidos',
		'telefono',
		'direccion',
		'correo',
		'contrasena',
		'estado',
		'id_empresa',
		'rol'
	];

	public $timestamps = false;
	public $incrementing = false;
}