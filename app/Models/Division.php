<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    protected $table = 'divisions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
    	'country_id',
        'name',
        'created_at',
        'updated_at'
    ];

    public function district(){
    	return $this->hasMany(District::class);
    }
}
