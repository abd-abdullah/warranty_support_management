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
        $request->validate([
            'phone' => 'required|array',
            'text' => 'required|string',
            'type' => 'required',
            'excel_file' => 'bail|nullable|mimes:xlsx,xls',
            'extra_numbers' => 'bail|nullable',
        ]);
        
        $data = $request->all();
        $extra_numbers = array_map('trim', preg_split('@,@', $request->extra_numbers, NULL, PREG_SPLIT_NO_EMPTY));
        $data['phone'] = array_merge($data['phone'], $extra_numbers);
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($request->excel_file->getPathName());
        $worksheet = $spreadsheet->getActiveSheet()->toArray();
        $worksheetData = array_map(function($value) { return '880'.$value; }, $worksheet[0]);
        $data['phone'] = array_merge($data['phone'], $worksheetData);
        
        $sms = new \App\Helpers\SmsAPI;
        $type = ($data['type'] == 1)?'text':'unicode';
        $sendSms = $sms->send($data['phone'], $data['text'], $type);
        if (strpos($sendSms, 'SMS SUBMITTED:') === false) {
            return false;
        }
        return true;
    }
}
