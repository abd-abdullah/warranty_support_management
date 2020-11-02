<?php

use App\Models\Sale;
use App\Models\SmsSetting;
use Carbon\Carbon;

if(!function_exists('look')){
	function look($array, $print_r = 1, $exit = 1){
		echo "<pre>";
		echo PHP_EOL."=========================".PHP_EOL;
		if($print_r == 1) print_r($array); else var_dump($array);
		echo PHP_EOL."=========================".PHP_EOL;
		echo "</pre>";

		if($exit)
			exit();
	}
}

if(!function_exists('dateFormat')){
	function dateFormat($date = NULL, $format = 'Y-m-d'){
        try{
            if($date == NULL){
                return Carbon::now()->format($format);
            }
            return Carbon::parse($date)->format($format);
        }
        catch(\Exception $e){
            return NULL;
        }
	}
}

if(!function_exists('scheduleSMS')){
	function scheduleSMS(){
		$sms = new \App\Helpers\SmsAPI;
		$getMessage = SmsSetting::find(1);
		$type = ($getMessage->type == 1)?'text':'unicode';

		//getting customers
		$sales = Sale::query();
        $sales->join('customers', 'customers.id', '=', 'sales.customer_id');
        $sales->join('users', 'users.id', '=', 'customers.user_id');
		$from = Carbon::now()->addDay();
		$to = $from->copy()->addDays(6);
		
        $sales->whereDate('sales.next_service_date', '>=', Carbon::parse($from));
		$sales->whereDate('sales.next_service_date', '<=', Carbon::parse($to));
		$phones = $sales->get('phone')->pluck('phone')->toArray();
		$sms->send($phones, $getMessage->message, $type);
	}
}

?>