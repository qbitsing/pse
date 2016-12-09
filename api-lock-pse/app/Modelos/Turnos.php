<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Turnos extends Model
{
	protected $table = "turnos";
	protected $fillable = [
		'id',
		'id_usuario',
		'estado'
	];

	public $timestamps = false;
	public $incrementing = false;
}