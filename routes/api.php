<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
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
    Route::get('customers/view/{id}', 'CustomerController@SingleView')->name('customers.singe-view');
    Route::ApiResource('customer-types', 'CustomerTypeController');
    Route::ApiResource('sales', 'SaleController');
    Route::ApiResource('zones', 'ZoneController');
    Route::get('sms-settings/{smsSetting}', 'SmsSettingController@show')->name('sms-settings.show');
    Route::put('sms-settings/{smsSetting}', 'SmsSettingController@update')->name('sms-settings.update');
    Route::put('sms-send', 'SmsSettingController@sendSms')->name('sms-settings.sms-send');
    Route::ApiResource('customer-services', 'CustomerServiceController');
    Route::post('customer-services/change', 'CustomerServiceController@changeDate')->name('customer-services.change');
    Route::put('customer-services/change/{customerService}', 'CustomerServiceController@changeDateUpdate')->name('customer-services.change-update');
    Route::get('sales-dashboard', 'SaleController@indexDashboard')->name('sales.indexDashboard');

    Route::get('dashboard', 'DashboardController')->name('dashboard');
    Route::get('technicians-all', 'ServiceMenController@getTechnician')->name('technicians.technicians-all');
    Route::get('technician/service-reports', 'ServiceMenController@serviceListReport')->name('tecnicians.service-reports');
    Route::get('products-all', 'ProductController@getProduct')->name('products.products-all');
    Route::get('customer-types-all', 'CustomerTypeController@getCustomerType')->name('customer-types.customer-type-all');
    Route::get('customers-all', 'CustomerController@getCustomer')->name('customer.customer-all');
    Route::get('countries', 'AddressController@getCountry')->name('countries.index');
    Route::get('divisions/{country_id}', 'AddressController@getDivision')->name('divisions.index');
    Route::get('districts/{division_id}', 'AddressController@getDistrict')->name('districts.index');
    Route::get('upazilas/{district_id}', 'AddressController@getUpazila')->name('upazilas.index');
    Route::get('zones-all', 'ZoneController@getZone')->name('zones-all.getAll');
    Route::get('post-offices/{upazila_id}', 'AddressController@getPostOffice')->name('post-offices.index');
    Route::put('update-profile', 'AdminUserController@updateProfile')->name('updateProfile');
    Route::get('showWarranty/{id}', 'SaleController@showWarranty')->name('showWarranty');
    Route::get('user', 'AdminUserController@profile')->name('show-profile');
});
