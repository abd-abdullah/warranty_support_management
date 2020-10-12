<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'Api\v1', 'prefix' => 'v1', 'middleware' => 'auth:sanctum'], function () {
    Route::ApiResource('products', 'ProductController');
    Route::ApiResource('admin-users', 'AdminUserController');
    Route::ApiResource('technicians', 'ServiceMenController');
    Route::ApiResource('customers', 'CustomerController');
    Route::ApiResource('sales', 'SaleController');
    Route::ApiResource('customer-services', 'CustomerServiceController');

    Route::get('dashboard', 'DashboardController')->name('dashboard');
    Route::get('technicians-all', 'ServiceMenController@getTechnician')->name('technicians.technicians-all');
    Route::get('products-all', 'ProductController@getProduct')->name('products.products-all');
    Route::get('customers-all', 'CustomerController@getCustomer')->name('customer.customer-all');
    Route::get('countries', 'AddressController@getCountry')->name('countries.index');
    Route::get('divisions/{country_id}', 'AddressController@getDivision')->name('divisions.index');
    Route::get('districts/{division_id}', 'AddressController@getDistrict')->name('districts.index');
    Route::get('upazilas/{district_id}', 'AddressController@getUpazila')->name('upazilas.index');
    Route::get('post-offices/{upazila_id}', 'AddressController@getPostOffice')->name('post-offices.index');
});
