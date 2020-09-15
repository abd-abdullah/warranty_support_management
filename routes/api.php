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

Route::middleware('auth:sanctum')->get('user', function (Request $request) {
    return $request->user();
});


Route::group(['prefix' => 'v1', 'middleware' => 'auth:sanctum'], function(){
    Route::ApiResource('products', 'ProductController');
});

Route::post('/login', function(Request $request){
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response([
            'email' => ['The provided credentials are incorrect.'],
        ], 404);
    }

    return $user->createToken('Test-Token')->plainTextToken;
});