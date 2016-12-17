<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Mantenimientos extends Model
{
	protected $table = "mantenimiento";
	protected $fillable = [
		'id',
		'id_item',
		'ingreso',
		'salida ',
		'estado'
	];

	public $timestamps = false;
	public $incrementing = false;
}