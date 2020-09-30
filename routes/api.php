<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['namespace' => 'Api\v1', 'prefix' => 'v1', 'middleware' => 'auth:sanctum'], function () {
    Route::ApiResource('products', 'ProductController');
    Route::ApiResource('admin-users', 'AdminUserController');
    Route::ApiResource('technicians', 'ServiceMenController');
    Route::get('countries', 'AddressController@getCountry')->name('countries.index');
    Route::get('divisions/{country_id}', 'AddressController@getDivision')->name('divisions.index');
    Route::get('districts/{division_id}', 'AddressController@getDistrict')->name('districts.index');
    Route::get('upazilas/{district_id}', 'AddressController@getUpazila')->name('upazilas.index');
    Route::get('post-offices/{upazila_id}', 'AddressController@getPostOffice')->name('post-offices.index');
});
