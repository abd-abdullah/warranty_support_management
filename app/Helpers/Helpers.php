<?php

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

?>