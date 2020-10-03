<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerService extends Model
{
    use SoftDeletes;
    protected $table = 'customer_services';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'customer_id',
        'sale_id',
        'service_time',
        'service_for',
        'next_service_time',
        'remarks',
        'service_charge',
        'total_paid',
        'due',
        'cost',
        'is_discontinue',
        'status',
        'created_by',
        'done_by',
        'created_at',
        'updated_at'
    ];

    public function customer(){
    	return $this->belongsTo(Customer::class);
    }
    
    public function sale(){
    	return $this->belongsTo(Sale::class);
    }
    
    public function createdBy(){
    	return $this->belongsTo(User::class, 'created_by');
    }
   
    public function service_man(){
    	return $this->belongsTo(ServiceMan::class, 'done_by');
    }
}
