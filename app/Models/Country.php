<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $table = 'countries';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
    	'name',
        'code',
        'created_at',
        'updated_at'
    ];

    public function division(){
    	return $this->hasMany(Division::class);
    }
}
