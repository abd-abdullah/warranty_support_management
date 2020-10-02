<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class SaleCollection extends ResourceCollection
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
            'data' => $this->collection->transform(function($adminUser){
                return[
                    'id' => $adminUser->id,
                    'name' => $adminUser->name,
                    'email' => $adminUser->email,
                    'phone' => $adminUser->phone,
                    'other_contact_numbers' => $adminUser->other_contact_numbers,
                    'address' => $adminUser->address,
                    'country' => ($adminUser->country != NULL)?$adminUser->country->name:'',
                    'division' => ($adminUser->division != NULL)?$adminUser->division->name:'',
                    'district' => ($adminUser->district != NULL)?$adminUser->district->name:'',
                    'upazila' => ($adminUser->upazila != NULL)?$adminUser->upazila->name:'',
                    'status' => $adminUser->status,
                ];
            }),
        ];
    }
}
