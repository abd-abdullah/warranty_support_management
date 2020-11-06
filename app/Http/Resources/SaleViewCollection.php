<?php

namespace App\Http\Resources;

use App\Models\CustomerService;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SaleViewCollection extends ResourceCollection
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
                    'product_name' => $sale->product->name,
                    'product_code' => $sale->product->code,
                    'price' => $sale->price,
                    'date_of_purchase' => dateFormat($sale->date_of_purchase),
                    'date_of_installation' => dateFormat($sale->date_of_installation),
                    'last_date_of_warranty' => dateFormat($sale->last_date_of_warranty),
                    'purchase_from' => $sale->purchase_from,
                    'next_service_time' => dateFormat($sale->next_service_date),
                ];
            }),
        ];
    }
}
