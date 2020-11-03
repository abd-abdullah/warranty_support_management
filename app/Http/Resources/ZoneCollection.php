<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ZoneCollection extends ResourceCollection
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
            'data' => $this->collection->transform(function($zone){
                return[
                    'id' =>$zone->id,
                    'name' =>$zone->name,
                    'created_at' => $zone->created_at->format('Y-m-d H:i:s'),
                ];
            }),
        ];
    }
}
