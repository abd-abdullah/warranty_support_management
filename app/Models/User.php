<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens, SoftDeletes;

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'user_type',
        'email',
        'phone',
        'other_contact_numbers',
        'photo',
        'country_id',
        'division_id',
        'district_id',
        'upazila_id',
        'address',
        'password',
        'created_by',
        'status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

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
    
    public function createdBy(){
    	return $this->belongsTo(User::class, 'created_by');
    }
}
