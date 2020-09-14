<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Upazila extends Model
{
    protected $table = 'upazilas';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
    	'district_id',
        'name',
        'created_at',
        'updated_at'
    ];
}
