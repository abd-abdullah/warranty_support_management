<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class SaleResource extends JsonResource
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
            'purchase_price' => $this->price,
            'purchase_capacity' => $this->capacity,
            'date_of_purchase' => Carbon::parse($this->date_of_purchase)->format('Y-m-d'),
            'last_date_of_warranty' => Carbon::parse($this->last_date_of_warranty)->format('Y-m-d'),
            'purchase_from' => $this->purchase_from,
            'product_id' => $this->product_id,
            'customer_id' => $this->customer_id,
        ];
    }
}
