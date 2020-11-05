<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return[
            'id' => $this->id,
            'user_id' => $this->user_id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'salary' => $this->salary,
            'customer_type_id' => $this->customer_type_id,
            'customer_type' => $this->customer_type->name,
            'customerId' => $this->customerId,
            'other_contact_numbers' => $this->other_contact_numbers,
            'country_id' => $this->country_id,
            'division_id' => $this->division_id,
            'district_id' => $this->district_id,
            'upazila_id' => $this->upazila_id,
            'zone_id' => $this->zone_id,
            'address' => $this->address,
            'status' => $this->status,
        ];
    }
}
