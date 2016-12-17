<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Documentos extends Model
{
	protected $table = "documentos";
	protected $fillable = [
		'id',
		'nombre',
		'id_usuario',
		'ruta'
	];
	public $timestamps = false;
	public $incrementing = false;
}