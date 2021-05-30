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

// USER SIGNUP/LOGIN
Route::post('/register', 'UserController@userRegister');
Route::post('/login', 'UserController@userLogin');

Route::group(['middleware'=> 'auth:sanctum'], function (){
    
    // USER 
    Route::get('/user', 'UserController@userInfos');
    Route::post('/logout', 'UserController@userLogout');
    
    // GET WEATHER
    Route::get('weather/', 'WeatherController@getMyWeather');
    Route::get('weather/all/', 'WeatherController@getAllWeather');
    Route::post('share/', 'WeatherController@shareWeather');
    
    // BOOKMARK PLACE
    Route::post('bookmark/', 'BookmarkController@createBookmark');
    Route::delete('bookmark/', 'BookmarkController@deleteBookmark');
    
});
