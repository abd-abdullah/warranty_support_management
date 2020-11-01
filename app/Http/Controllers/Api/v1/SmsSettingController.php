<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\SmsSetting;
use Illuminate\Http\Request;

class SmsSettingController extends Controller
{
    
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SmsSetting  $smsSetting
     * @return \Illuminate\Http\Response
     */
    public function show(SmsSetting $smsSetting)
    {
        return $smsSetting; 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SmsSetting  $smsSetting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SmsSetting $smsSetting)
    {
        $request->validate(['message_type' => 'required', 'name' => 'required', 'message' => 'required']);
        $smsSetting->update(['message_type' => $request->message_type, 'name' => $request->name, 'message' => $request->message]);
    }

    public function sendSms(Request $request){
        if(!empty($request->phone) && $request->text != NULL){
            $sms = new \App\Helpers\SmsAPI;
            $type = ($request->type == 1)?'text':'unicode';
            $sendSms = $sms->send($request->phone, $request->text, $type);
            if (strpos($sendSms, 'SMS SUBMITTED:') === false) {
                return false;
            }
            return true;
        }
        else{
            return false;
        }
    }
}
