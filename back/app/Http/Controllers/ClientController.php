<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

use App\Models\User;


class ClientController extends Controller
{
    public function getAllCLients(){
        return Client::all();
    }

    public function createClient(){
        request()->validate([
            'nume' => 'required',
            'email' => 'required',
            'password' => 'required',
            'tip' => 'required',
        ]);

        return Client::create([
            'nume' => request('nume'),
            'email' => request('email'),
            'password' => request('password'),
            'tip' => request('tip'),
        ]);
    }

    public function updateClient(Request $request){
        error_log($request);
        $user = Client::find($request->id);
        $user->nume = $request->nume;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->fav = $request->fav;
        $user->save();
    }

    public function updateFavorites(Request $request){
        error_log($request);
        $user = Client::find($request->id);
        print($user);
        $user->fav = $request->fav;
        $user->save();
    }

}
