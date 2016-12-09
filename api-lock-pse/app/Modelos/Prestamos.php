<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Prestamos extends Model
{
	protected $table = "prestamos";
	protected $fillable = [
		'id',
		'salida',
		'entrada',
		'id_usuario',
		'id_actividad',
		'cantidad_personas',
		'condiciones',
		'novedades'
	];

	public $timestamps = false;
	public $incrementing = false;
}