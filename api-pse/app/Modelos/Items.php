<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Items extends Model
{
	protected $table = "items";
	protected $fillable = [
		'id',
		'id_herramienta',
		'modelo',
		'codigo_unico',
		'id_empresa',
		'estado'
	];

	public $timestamps = false;
}