<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'customer_type' => $this->customer_type->name,
            'customerId' => $this->customerId,
            'other_contact_numbers' => $this->other_contact_numbers,
            'country' => $this->country->name,
            'division' => $this->division->name,
            'district' => $this->district->name,
            'upazila' => ($this->upazila != NULL)?$this->upazila->nam:'',
            'zone' => $this->zone->name,
            'address' => $this->address,
            'createdBy' => $this->createdBy->name,
            'customerId' => $this->customerId,
            'product_name' => $this->product->name,
            'product_code' => $this->product->code,
            'purchase_price' => $this->price,
            'purchase_capacity' => $this->capacity,
            'date_of_purchase' => Carbon::parse($this->date_of_purchase)->format('Y-m-d'),
            'last_date_of_warranty' => Carbon::parse($this->last_date_of_warranty)->format('Y-m-d'),
            'next_service_date' => Carbon::parse($this->next_service_date)->format('Y-m-d'),
            'date_of_installation' => Carbon::parse($this->date_of_installation)->format('Y-m-d'),
            'purchase_from' => $this->purchase_from,
            'product_id' => $this->product_id,
            'invoice' => $this->invoice,
            'services' => new CustomerServiceViewCollection($this->customer_services),
        ];
    }
}
