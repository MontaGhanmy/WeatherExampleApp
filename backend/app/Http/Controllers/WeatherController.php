<?php

namespace App\Http\Controllers;

use App\Bookmark;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Mail;

class WeatherController extends Controller
{
    //
    private static function getCityData($city){

        /**
         * CHECK CACHE
         */
        if ($data = Redis::get($city)) {
            return json_decode($data);
        }
        
        /**
         * CALL WEATHER API
         */
        $wapikey = '1ea751d5a7cae7e9515a4619a5890694';
    
        $curl = curl_init();
    
        curl_setopt_array($curl, array(
        CURLOPT_URL => 'http://api.openweathermap.org/data/2.5/weather?q='.$city.'&units=metric&appid='.$wapikey,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        ));
    
        $response = curl_exec($curl);
    
        curl_close($curl);
    
        Redis::set($city, $response, 'EX', 3600);
        
        return json_decode($response);
    }

    private static function ipToCity($myip){
        /**
         * IP GEO API
         */
        $myapikey = 'c989c0ed09f733b778360472c7c8ed87';
        // GET THE USER CITY
    
        $curl = curl_init();
    
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'http://api.ipstack.com/'.$myip.'?access_key='.$myapikey.'&format=1',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
        ));
    
        $response = json_decode(curl_exec($curl));
        $city = $response->city;
        curl_close($curl);
        return $city;
    }

    /**
     * GET MY WEATHER
     */
    public static function getMyWeather(Request $request){
        $myip = '160.156.129.96';
        $city = WeatherController::ipToCity($myip);
        $data = WeatherController::getCityData($city);

        return response()->json($data);
    }

    /**
     * GET WEATHER LIST
     */
    public static function getAllWeather(Request $request){
        $top_cities = ["Paris","Rome","Beijing","Toronto","Mexico"];
        $bookmarks_all = Bookmark::where('user_id', $request->user()->id)->get();
        $bookmarks = array();
        foreach($bookmarks_all as $bookmark)
            array_push($bookmarks, $bookmark->city_name);
        $data = array();
        foreach($top_cities as $city) {
            $new_data = WeatherController::getCityData($city);
            if(in_array($city, $bookmarks)){
                $new_data->bookmarked = 1;
            } else {
                $new_data->bookmarked = 0;
            }
            array_push($data, $new_data);
        }
        return response()->json($data);
    }

    public static function shareWeather(Request $request){
        $weather_data = WeatherController::getCityData($request->city_name);
        $data = array("weather_data"=>$weather_data);
        $email = $request->email;
        Mail::send('mail', $data, function($message) use($email) {
            $message->to($email, 'Recepient')->subject
               ('Shared weather');
            $message->from('from.email@example.com','from');
         });
        return response()->json($data);
    }
}
