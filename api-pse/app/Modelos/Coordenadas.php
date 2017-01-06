<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Coordenadas extends Model
{
	protected $table = "coordenadas";
	protected $fillable = [
		'id_usuario',
		'latitud',
		'longitud'
	];

	public $timestamps = false;
	public $incrementing = false;
}