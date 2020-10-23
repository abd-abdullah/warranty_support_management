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
            'data' => $this->collection->transform(function($customer){
                return[
                    'id' => $customer->id,
                    'customer_type_id' => $customer->customer_type_id,
                    'customer_type' => $customer->customer_type->name,
                    'customerId' => $customer->customerId,
                    'name' => $customer->user->name,
                    'email' => $customer->user->email,
                    'phone' => $customer->user->phone,
                    'other_contact_numbers' => $customer->user->other_contact_numbers,
                    'address' => $customer->user->address,
                    'country' => ($customer->user->country != NULL)?$customer->user->country->name:'',
                    'division' => ($customer->user->division != NULL)?$customer->user->division->name:'',
                    'district' => ($customer->user->district != NULL)?$customer->user->district->name:'',
                    'upazila' => ($customer->user->upazila != NULL)?$customer->user->upazila->name:'',
                    'status' => $customer->status,
                ];
            }),
        ];
    }
}
