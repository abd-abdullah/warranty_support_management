<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/migrate_data', function(){
    $list = [];
    $sales = \App\Models\Sale::with('customer.user')->get();
    foreach($sales as $sale){
        if($sale->customer != NULL){
            $existing = \App\Models\Sale::where('customerId', $sale->customer->customerId)->first();
            $data = [
                'customer_type_id' => $sale->customer->customer_type_id,
                'customerId' => ($existing == NULL)?$sale->customer->customerId:($sale->customer->customerId.'(update)'.$sale->id),
                'name' => $sale->customer->user->name,
                'email' => $sale->customer->user->email,
                'phone' => $sale->customer->user->phone,
                'other_contact_numbers' => $sale->customer->user->other_contact_numbers,
                'country_id' => $sale->customer->user->country_id,
                'division_id' => $sale->customer->user->division_id,
                'district_id' => $sale->customer->user->district_id,
                'upazila_id' => $sale->customer->user->upazila_id,
                'zone_id' => $sale->customer->user->zone_id,
                'address' => $sale->customer->user->address,
            ];
            $sale->update($data);
        }
        else{
            $sale->forcedelete();
        }

    }
    print_r($list);
});

Route::get('{path}','HomeController@allRequest')->where('path', '(.*)');
Auth::routes();


