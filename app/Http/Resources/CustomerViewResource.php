<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerViewResource extends JsonResource
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
            'name' => $this->user->name,
            'email' => $this->user->email,
            'phone' => $this->user->phone,
            'customer_type' => $this->customer_type->name,
            'customerId' => $this->customerId,
            'other_contact_numbers' => $this->user->other_contact_numbers,
            'country' => $this->user->country->name,
            'division' => $this->user->division->name,
            'district' => $this->user->district->name,
            'upazila' => $this->user->upazila->name,
            'address' => $this->user->address,
            'purchase' => new SaleViewCollection($this->purchase),
            'services' => new CustomerServiceViewCollection($this->purchase->pluck('customer_services')->first()),
        ];
    }
}
