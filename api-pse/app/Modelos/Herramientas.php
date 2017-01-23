<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Herramientas extends Model
{
	protected $table = "herramientas";
	protected $fillable = [
		'id',
		'nombre',
		'id_empresa',
		'estado'
	];

	public $timestamps = false;
	public $incrementing = false;
}