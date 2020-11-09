<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sale extends Model
{
    use SoftDeletes;
    protected $table = 'sales';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'customer_id',
        'product_id',
        'product_capacity',
        'date_of_purchase',
        'date_of_installation',
        'price',
        'capacity',
        'purchase_from',
        'date_of_installation',
        'last_date_of_warranty',
        'next_service_date',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at'
    ];

    public function customer(){
    	return $this->belongsTo(Customer::class);
    }
    
    public function product(){
    	return $this->belongsTo(Product::class);
    }
   
    public function customer_services(){
    	return $this->hasMany(CustomerService::class)->orderBy('id', 'DESC');
    }

    public function customer_service()
    {
       return $this->hasOne(CustomerService::class)->latest();
    }

    public function createdBy()
    {
       return $this->belongsTo(User::class, 'created_by');
    }
}
