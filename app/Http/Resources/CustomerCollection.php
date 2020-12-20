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
            'data' => $this->collection->transform(function($sale){
                return[
                    'id' => $sale->id,
                    'customer_type' => $sale->customer_type,
                    'customerId' => $sale->customerId,
                    'product_name' => $sale->product_name,
                    'product_code' => $sale->product_code,
                    'name' => $sale->name,
                    'phone' => $sale->phone,
                    'address' => $sale->address,
                    'country' => $sale->country,
                    'division' => $sale->division,
                    'district' => $sale->district,
                    'upazila' => $sale->upazila,
                    'zone' => $sale->zone,
                    'status' => $sale->status,
                ];
            }),
        ];
    }
}
