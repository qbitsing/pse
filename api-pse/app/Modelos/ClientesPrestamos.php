<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class ClientesPrestamos extends Model
{
	protected $table = "clientes_prestamos";
	protected $fillable = [
		'id',
		'id_cliente',
		'id_prestamo'
	];

	public $timestamps = false;
	public $incrementing = false;
}