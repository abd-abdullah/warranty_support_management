<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    protected $table = 'products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
    	'name',
        'code',
        'created_by',
        'created_at',
        'updated_at'
    ];

    public function user(){
    	return $this->belongsTo(User::class, 'created_by');
    }
}
