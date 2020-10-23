<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'customer_type_id' => 'required',
            'name' => 'required|min:3',
            'email' => 'bail|nullable|email|unique:users,email,'.$this->request->get('old_user_id'),
            'phone' => 'bail|required|numeric|digits:11|unique:users,phone,'.$this->request->get('old_user_id'),
            'customerId' => 'bail|required|string|unique:customers,customerId,'.$this->request->get('old_customer_id'),
            'country_id' => 'required',
            'division_id' => 'required',
            'district_id' => 'required',
            'address' => 'bail|required|string|min:4',

            'product_name' => 'required|min:3',
            'product_code' => 'bail|required|unique:products,code,'.$this->request->get('old_product_id'),

            'purchase_capacity' => 'required',
            'purchase_price' => 'bail|required|numeric',
            'date_of_purchase' => 'required|date|before_or_equal:today',
            'last_date_of_warranty' => 'required|date|after_or_equal:purchase_date',
            'next_service_date' => 'nullable|date|after:date_of_purchase',
        ];
    }
}
