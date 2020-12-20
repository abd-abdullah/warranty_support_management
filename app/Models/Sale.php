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
        'customer_type_id',
        'customerId',
        'name',
        'email',
        'phone',
        'other_contact_numbers',
        'country_id',
        'division_id',
        'district_id',
        'upazila_id',
        'zone_id',
        'address',
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
        'invoice',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at'
    ];
    
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

    
    public function setEmailAttribute($value) {
        if ( empty($value) ) {
            $this->attributes['email'] = NULL;
        } else {
            $this->attributes['email'] = $value;
        }
    }

    public function customer_type(){
    	return $this->belongsTo(CustomerType::class);
    }
    
    public function country(){
    	return $this->belongsTo(Country::class);
    }
    
    public function division(){
    	return $this->belongsTo(Division::class);
    }

    public function district(){
    	return $this->belongsTo(District::class);
    }

    public function upazila(){
    	return $this->belongsTo(Upazila::class);
    }
   
    public function zone(){
    	return $this->belongsTo(Zone::class);
    }
   
    public function customer(){
    	return $this->belongsTo(Customer::class, 'customer_id');
    }
    
}
