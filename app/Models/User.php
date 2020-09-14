<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use Notifiable, SoftDeletes;

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
        'division_id',
        'district_id',
        'upazila_id',
        'address',
        'password',
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

    public function division(){
    	return $this->belongsTo(Division::class);
    }

    public function district(){
    	return $this->belongsTo(Division::class);
    }

    public function upazila(){
    	return $this->belongsTo(Division::class);
    }
}
