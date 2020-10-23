<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CustomerTypCollection extends ResourceCollection
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
            'data' => $this->collection->transform(function($product){
                return[
                    'id' =>$product->id,
                    'name' =>$product->name,
                    'created_at' => $product->created_at->format('Y-m-d H:i:s'),
                ];
            }),
        ];
    }
}
