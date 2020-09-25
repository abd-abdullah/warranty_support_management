<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'id' =>$this->id,
            'name' =>$this->name,
            'code' =>$this->code,
            'created_by' =>$this->user->name,
            'user_id' =>$this->created_by,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
