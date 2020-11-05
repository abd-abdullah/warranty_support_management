<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceMenResource extends JsonResource
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
            'salary' => $this->salary,
            'date_of_join' => Carbon::parse($this->joining_date)->format('Y-m-d'),
            'other_contact_numbers' => $this->other_contact_numbers,
            'country_id' => $this->country_id,
            'division_id' => $this->division_id,
            'district_id' => $this->district_id,
            'upazila_id' => $this->upazila_id,
            'zone_id' => $this->zone_id,
            'address' => $this->address,
            'photo' => $this->photo,
            'photo_path' => url('/'.$this->photo),
            'status' => $this->status,
        ];
    }
}
