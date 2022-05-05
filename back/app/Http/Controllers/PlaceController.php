<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Place;

class PlaceController extends Controller
{
    public function createPlace(){

        request()->validate([
            'description' => 'required',
            'type' => 'required',
            'rentSale' => 'required',
            'price' => 'required',
        ]);

//        error_log (request());

        return Place::create([
            'description' => request('description'),
            'type' => request('type'),
            'rentSale' => request('rentSale'),
            'price' => request('price'),
            'image' => request('image'),
        ]);
    }

    public function vanzariCase(){
        return Place::where(['rentSale'=>'Sale', 'type'=>'House'])->get();
    }

    public function vanzariApartamente(){
        return Place::where(['rentSale'=>'Sale', 'type'=>'Apartment'])->get();
    }

    public function vanzariGarsoniere(){
        return Place::where(['rentSale'=>'Sale', 'type'=>'Single Room'])->get();
    }

    public function inchirieriCase(){
        return Place::where(['rentSale'=>'Rent', 'type'=>'House'])->get();
    }

    public function inchirieriApartamente(){
        return Place::where(['rentSale'=>'Rent', 'type'=>'Apartment'])->get();
    }

    public function inchirieriGarsoniere(){
        return Place::where(['rentSale'=>'Rent', 'type'=>'Single Room'])->get();
    }
}
