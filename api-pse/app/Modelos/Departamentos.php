<?php 

namespace Pse\Modelos;

use Illuminate\Database\Eloquent\Model;


class Departamentos extends Model
{
	protected $table = "departamento";
	protected $fillable = [
		'id',
		'nombre',
		'id_pais'
	];
	public $timestamps = false;
	public $incrementing = false;

	public function Ciudades(){
		return $this->hasMany(Ciudades::class , 'id_departamento');
	}
}