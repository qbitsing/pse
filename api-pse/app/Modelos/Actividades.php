<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Actividades extends Model
{
	protected $table = "actividades";
	protected $fillable = [
		'id',
		'nombre',
		'id_escenario'
	];

	public $timestamps = false;
}