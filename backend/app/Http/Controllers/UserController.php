<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * USER REGISTER
     */
    public static function userRegister(Request $request) {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if ( $user ) {
            return ["status" => 301, "message" => "user already exists.",];
        }
        else {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();
        }
    
        $user = User::where('email', $request->email)->first();
    
        if (! $user ) {
            return ["status" => 301, "message" => "user does not exist.",];
        }
        if (! Hash::check($request->password, $user->password)) {
            return ["status" => 403, "message" => "check your password.",];
        }
    
        $token = $user->createToken('main')->plainTextToken;
    
        return ["status" => 200, "message" => "user created.", "user" => $user, "token" => $token,];
    
    }
    
    /**
     * USER LOGIN
     */
    public static function userLogin(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if (! $user ) {
            return response()->json(["status" => 301, "message" => "user does not exist.",], 301);
        }
        if (! Hash::check($request->password, $user->password)) {
            return response()->json(["status" => 403, "message" => "check your password.",], 403);
        }
    
        $token = $user->createToken('main')->plainTextToken;
    
        return response()->json(["status" => 200, "message" => "logged in.", "user" => $user, "token" => $token,],200) ;
    
    }

    /**
     * USER LOGOUT
     */
    public static function userLogout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return ["status" => 200, "message" => "logged out.",];
    }
    /**
     * USER INFOS
     */

    public static function userInfos(Request $request){
        return ["user" => $request->user(),];
    }
}
