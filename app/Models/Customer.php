<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes;
    protected $table = 'customers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
    	'user_id',
        'customerId',
        'created_at',
        'updated_at'
    ];

    public function user(){
    	return $this->belongsTo(User::class);
    }
    
    public function createdBy(){
    	return $this->belongsTo(User::class, 'created_by');
    }
}
