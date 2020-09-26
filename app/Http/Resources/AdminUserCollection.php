<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class AdminUserCollection extends ResourceCollection
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
            'data' => $this->collection->transform(function($adminUser){
                return[
                    'id' => $adminUser->id,
                    'name' => $adminUser->name,
                    'email' => $adminUser->email,
                    'phone' => $adminUser->phone,
                    'other_contact_numbers' => $adminUser->other_contact_numbers,
                    'photo' => $adminUser->photo,
                    'photo_path' => url('/'.$adminUser->photo),
                    'status' => $adminUser->status,
                ];
            }),
        ];
    }
}
