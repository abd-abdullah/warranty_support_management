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
        'date_of_purchase',
        'price',
        'purchase_from',
        'last_date_of_warranty',
        'created_at',
        'updated_at'
    ];

    public function customer(){
    	return $this->belongsTo(Customer::class);
    }
    
    public function product(){
    	return $this->belongsTo(Product::class);
    }
}
