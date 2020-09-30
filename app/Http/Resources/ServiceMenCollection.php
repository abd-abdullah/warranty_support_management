<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ServiceMenCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection->transform(function($technician){
                return[
                    'id' => $technician->id,
                    'salary' => $technician->salary,
                    'date_of_join' => Carbon::parse($technician->joining_date)->format('Y-m-d'),
                    'name' => $technician->name,
                    'email' => $technician->email,
                    'phone' => $technician->phone,
                    'other_contact_numbers' => $technician->other_contact_numbers,
                    'address' => $technician->address,
                    'country' => ($technician->country != NULL)?$technician->country->name:'',
                    'division' => ($technician->division != NULL)?$technician->division->name:'',
                    'district' => ($technician->district != NULL)?$technician->district->name:'',
                    'upazila' => ($technician->upazila != NULL)?$technician->upazila->name:'',
                    'status' => $technician->status,
                ];
            }),
        ];
    }
}
