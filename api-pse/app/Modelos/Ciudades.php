<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Ciudades extends Model
{
	protected $table = "ciudad";
	protected $fillable = [
		'id',
		'nombre',
		'id_departamento'
	];

	public $timestamps = false;
	public $incrementing = false;

	public function Departamento(){
		return $this->belongsTo(Departamentos::class , 'id_departamento');
	}

	public function Sucursal(){
		return $this->hasMany(Sucursales::class , 'id_sucursal');
	}
}