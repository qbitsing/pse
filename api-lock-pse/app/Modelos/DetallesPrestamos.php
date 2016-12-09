<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class DetallesPrestamos extends Model
{
	protected $table = "detalle_prestamo";
	protected $fillable = [
		'id',
		'id_item',
		'id_prestamo'
	];

	public $timestamps = false;
	public $incrementing = false;
}