<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Empresas extends Model
{
	protected $table = "empresas";
	protected $fillable = [
		'id',
		'nombre',
		'direccion',
		'telefono',
		'ciudad',
		'estado'
	];

	public $timestamps = false;
	public $incrementing = false;
}