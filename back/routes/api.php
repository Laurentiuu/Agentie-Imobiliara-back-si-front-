<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\PlaceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Client;
use App\Http\Controllers\ClientController;

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

Route::get('/getUsers',[ClientController::class, 'getAllCLients']);

Route::post('/createUser', [ClientController::class, 'createClient']);

Route::post('/updateUser', [ClientController::class, 'updateClient']);

Route::post('/updateFavorites', [ClientController::class, 'updateFavorites']);

Route::post('/createPlace', [PlaceController::class, 'createPlace']);

Route::get('/vanzariCase', [PlaceController::class, 'vanzariCase']);

Route::get('/vanzariApartamente', [PlaceController::class, 'vanzariApartamente']);

Route::get('/vanzariGarsoniere', [PlaceController::class, 'vanzariGarsoniere']);

Route::get('/inchirieriCase', [PlaceController::class, 'inchirieriCase']);

Route::get('/inchirieriApartamente', [PlaceController::class, 'inchirieriApartamente']);

Route::get('/inchirieriGarsoniere', [PlaceController::class, 'inchirieriGarsoniere']);

Route::post('/storeAppointment', [AppointmentController::class, 'storeAppointment']);

Route::post('/getAppointments', [AppointmentController::class, 'getAppointments']);

Route::post('/getAllAppointments', [AppointmentController::class, 'getAllAppointments']);


