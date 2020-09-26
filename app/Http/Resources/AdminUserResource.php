<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AdminUserResource extends JsonResource
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
            'other_contact_numbers' => $this->other_contact_numbers,
            'division' => $this->division_id,
            'district' => $this->district_id,
            'upazila' => $this->upazila_id,
            'division' => ($this->division != NULL)?$this->division->name:NULL,
            'district' => ($this->district != NULL)?$this->district->name:NULL,
            'upazila' => ($this->upazila != NULL)?$this->upazila->name:NULL,
            'address' => $this->address,
            'photo' => $this->photo,
            'photo_path' => url('/'.$this->photo),
            'status' => $this->status,
        ];
    }
}
