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
                    'customer_id' => $sale->customer_id,
                    'name' => $sale->customer->user->name,
                    'email' => $sale->customer->user->email,
                    'phone' => $sale->customer->user->phone,
                    'address' => $sale->customer->user->address,
                    'country' => ($sale->customer->user->country != NULL)?$sale->customer->user->country->name:'',
                    'division' => ($sale->customer->user->division != NULL)?$sale->customer->user->division->name:'',
                    'district' => ($sale->customer->user->district != NULL)?$sale->customer->user->district->name:'',
                    'upazila' => ($sale->customer->user->upazila != NULL)?$sale->customer->user->upazila->name:'',

                    'customerId' => $sale->customer->customerId,
                    'product_name' => $sale->product_name,
                    'product_code' => $sale->product_code,
                    'price' => $sale->price,
                    'date_of_purchase' => Carbon::parse($sale->date_of_purchase)->format('Y-m-d'),
                    'last_date_of_warranty' => Carbon::parse($sale->last_date_of_warranty)->format('Y-m-d'),
                    'purchase_from' => $sale->purchase_from,
                    'next_service_time' => ($sale->customer_service != NULL)?Carbon::parse($sale->customer_service->next_service_time)->format('Y-m-d'):'',
                ];
            }),
        ];
    }
}
