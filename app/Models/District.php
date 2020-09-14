<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    protected $table = 'districts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
    	'division_id',
        'name',
        'created_at',
        'updated_at'
    ];

    public function upazila(){
    	return $this->hasMany(Upazila::class);
    }
}
