<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Alertas extends Model
{
	protected $table = "alertas";
	protected $fillable = [
		'id',
		'mensaje',
		'id_usuario',
		'id_prestamo'
	];

	public $timestamps = false;
	public $incrementing = false;
}