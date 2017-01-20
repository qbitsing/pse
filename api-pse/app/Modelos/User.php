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

	public function Empresa(){
		return $this->belongsTo(Empresas::class , 'id_empresa');
	}
}