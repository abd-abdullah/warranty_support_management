<?php
/**
 *	@author Md. Abdullah
 *	@since 2020-10-30
 *	@abstract To send SMS with gsms -> dianahost
 */
namespace App\Helpers;

use Carbon\Carbon;

class SmsAPI
{
	private $APIToken;
	function __construct()
	{
		$this->APIToken = env('SMSAPI_TOKEN', false);
	}

	private function sendSMSFlash($to, $message, $type, $scheduledDateTime = NULL) {
		$scheduledDateTime = ($scheduledDateTime == NULL)?Carbon::now()->toDateTimeString():$scheduledDateTime;
		if(!$this->APIToken){
			return false;
		}

		$url = env('SMSAPI_URL', 'http://gsms.pw/smsapi');
		$data = [
			'api_key' => $this->APIToken,
			'type' => $type,
			'senderid' => env('SENDER_ID'),
			'contacts' => $to,
			'msg' => $message,
			'scheduledDateTime' => $scheduledDateTime,
		];

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$response = curl_exec($ch);
		curl_close($ch);
		return $response;
	}

	public function send($to, $message, $type = 'flash', $scheduledDateTime = NULL){
		dd($message);
		if(env("SEND_SMS",false)){
			return $this->sendSMSFlash(implode('+', $to), $message, $type, $scheduledDateTime);
		}
	}
}
?>