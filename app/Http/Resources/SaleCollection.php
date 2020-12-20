<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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
            'data' => $this->collection->transform(function($sale){
                return[
                    'id' => $sale->id,
                    'name' => $sale->name,
                    'email' => $sale->email,
                    'phone' => $sale->phone,
                    'address' => $sale->address,
                    'country' => ($sale->country != NULL)?$sale->country->name:'',
                    'division' => ($sale->division != NULL)?$sale->division->name:'',
                    'district' => ($sale->district != NULL)?$sale->district->name:'',
                    'upazila' => ($sale->upazila != NULL)?$sale->upazila->name:'',
                    'zone' => ($sale->zone != NULL)?$sale->zone->name:'',

                    'createdBy' => $sale->createdBy->name,
                    'customer_type_id' => $sale->customer_type_id,
                    'customer_type' => ($sale->customer_type != NULL)?$sale->customer_type->name:'',
                    'customerId' => $sale->customerId,
                    'product_name' => $sale->product_name,
                    'product_code' => $sale->product_code,
                    'price' => $sale->price,
                    'date_of_purchase' => Carbon::parse($sale->date_of_purchase)->format('Y-m-d'),
                    'date_of_installation' => Carbon::parse($sale->date_of_installation)->format('Y-m-d'),
                    'last_date_of_warranty' => Carbon::parse($sale->last_date_of_warranty)->format('Y-m-d'),
                    'purchase_from' => $sale->purchase_from,
                    'next_service_time' => Carbon::parse($sale->next_service_date)->format('Y-m-d'),
                    'invoice' => $sale->invoice,
                ];
            }),
        ];
    }
}
