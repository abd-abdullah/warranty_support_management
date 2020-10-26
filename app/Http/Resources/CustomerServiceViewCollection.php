<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CustomerServiceViewCollection extends ResourceCollection
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
                    'technician_name' => ($customerService->service_man != NULL)?$customerService->service_man->user->name:'',
                    'technician_phone' => ($customerService->service_man != NULL)?$customerService->service_man->user->phone:'',
                    'service_time' => Carbon::parse($customerService->service_time)->format('Y-m-d'),
                    'next_service_time' => Carbon::parse($customerService->next_service_time)->format('Y-m-d'),
                    'is_discontinue' => $customerService->is_discontinue,
                    'remarks' => $customerService->remarks,
                    'service_for' => $customerService->service_for,
                    'total_paid' => $customerService->total_paid,
                    'service_charge' => $customerService->service_charge,
                    'cost' => $customerService->cost,
                    'sale_id' => $customerService->sale_id,
                    'done_by' => $customerService->done_by,
                    'status' => $customerService->status,
                ];
            }),
        ];
    }
}
