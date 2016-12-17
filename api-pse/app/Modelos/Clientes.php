<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Clientes extends Model
{
	protected $table = "clientes";
	protected $fillable = [
		'id',
		'nombre'
	];

	public $timestamps = false;
	public $incrementing = false;
}