<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SmsSetting extends Model
{
    use SoftDeletes;
    protected $table = 'sms_settings';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
    	'name',
    	'schedule_time',
        'message',
        'message_type',
        'is_everyweek',
        'status',
        'created_at',
        'updated_at'
    ];
}
