<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerServiceRequest extends Model
{
    use SoftDeletes;
    protected $table = 'customer_service_requests';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'customer_id',
        'sale_id',
        'service_men_id',
        'details',
        'status',
        'created_by',
        'created_at',
        'updated_at'
    ];

    public function customer(){
    	return $this->belongsTo(Customer::class);
    }
    
    public function sale(){
    	return $this->belongsTo(Sale::class);
    }

    public function service_men(){
    	return $this->belongsTo(ServiceMan::class, 'service_men_id');
    }

    public function createdBy(){
    	return $this->belongsTo(User::class, 'created_by');
    }
}
