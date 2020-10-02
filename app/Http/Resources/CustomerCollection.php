<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CustomerCollection extends ResourceCollection
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
                    'customerId' => $technician->customerId,
                    'name' => $technician->user->name,
                    'email' => $technician->user->email,
                    'phone' => $technician->user->phone,
                    'other_contact_numbers' => $technician->user->other_contact_numbers,
                    'address' => $technician->user->address,
                    'country' => ($technician->user->country != NULL)?$technician->user->country->name:'',
                    'division' => ($technician->user->division != NULL)?$technician->user->division->name:'',
                    'district' => ($technician->user->district != NULL)?$technician->user->district->name:'',
                    'upazila' => ($technician->user->upazila != NULL)?$technician->user->upazila->name:'',
                    'status' => $technician->status,
                ];
            }),
        ];
    }
}
