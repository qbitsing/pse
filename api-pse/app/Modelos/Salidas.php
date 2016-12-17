<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Salidas extends Model
{
	protected $table = "salidas";
	protected $fillable = [
		'id',
		'id_item',
		'fecha',
		'id_usuario'
	];

	public $timestamps = false;
	public $incrementing = false;
}