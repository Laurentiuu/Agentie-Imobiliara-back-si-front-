<?php

namespace App\Http\Controllers;

use App\Models\Dto;
use Illuminate\Http\Request;
use App\Models\Appointment;
use Carbon\Carbon;

class AppointmentController extends Controller
{
    public function storeAppointment()
    {
        $app = new Appointment();
        $app->date = request('date');
        $app->idPlace = request('idPlace');
        $app->save();
    }

    public function getAppointments(Request $request)
    {
        $apps = Appointment::where('idPlace', $request->idPlace)->get();

        $mytime = Carbon::now();
        $numberOfDays = $mytime->daysInMonth;
        $day = $mytime->day;
        $month = $mytime->month;
        $arr = array_fill(0, $numberOfDays, 0);
        foreach ($apps as $app) {
            $createdAt = Carbon::parse($app->date);
            $arr[($createdAt->day)-1] = $arr[($createdAt->day)-1] + 1;
        }
        $response = array_fill(0, $numberOfDays, null);

        for ($i = 0; $i < $numberOfDays; $i++) {
            $dto = new Dto();
            $dto->argument = $i+1;
            $dto->value = $arr[$i];
            $response[$i]=$dto;
        }
        error_log(json_encode($response));
        return json_encode($response);
    }


    public function getAllAppointments(Request $request)
    {
        $apps = Appointment::where('idPlace', $request->idPlace)->get();
        return $apps;
    }

}
