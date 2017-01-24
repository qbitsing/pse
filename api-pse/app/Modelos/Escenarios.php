<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Escenarios extends Model
{
	protected $table = "escenarios";
	protected $fillable = [
		'id',
		'nombre',
		'id_ciudad',
		'id_empresa',
		'estado'
	];

	public $timestamps = false;
}