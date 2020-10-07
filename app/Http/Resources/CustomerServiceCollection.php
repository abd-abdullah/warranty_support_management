<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CustomerServiceCollection extends ResourceCollection
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
            'data' => $this->collection->transform(function($customerService){
                return[
                    'id' => $customerService->id,
                    'customer_id' => $customerService->customer_id,
                    'name' => $customerService->customer->user->name,
                    'email' => $customerService->customer->user->email,
                    'phone' => $customerService->customer->user->phone,
                    'address' => $customerService->customer->user->address,
                    'country' => ($customerService->customer->user->country != NULL)?$customerService->customer->user->country->name:'',
                    'division' => ($customerService->customer->user->division != NULL)?$customerService->customer->user->division->name:'',
                    'district' => ($customerService->customer->user->district != NULL)?$customerService->customer->user->district->name:'',
                    'upazila' => ($customerService->customer->user->upazila != NULL)?$customerService->customer->user->upazila->name:'',

                    'customerId' => $customerService->customer->customerId,
                    'product_name' => $customerService->product_name,
                    'product_code' => $customerService->product_code,
                    'technician_name' => $customerService->service_man->user->name,
                    'technician_phone' => $customerService->service_man->user->phone,
                    'service_time' => Carbon::parse($customerService->service_time)->format('Y-m-d'),
                    'next_service_time' => Carbon::parse($customerService->next_service_time)->format('Y-m-d'),
                    'is_discontinue' => $customerService->is_discontinue,
                    'remarks' => $customerService->remarks,
                    'service_for' => $customerService->service_for,
                    'total_paid' => $customerService->service_charge,
                    'service_charge' => $customerService->total_paid,
                    'cost' => $customerService->cost,
                    'cost' => $customerService->cost,
                ];
            }),
        ];
    }
}
