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
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users,email,'.$this->request->get('old_user_id'),
            'phone' => 'required|numeric|digits:11|unique:users,phone,'.$this->request->get('old_user_id'),
            'customerId' => 'required|string|unique:customers,customerId,'.$this->request->get('old_customer_id'),
            'address' => 'required|string|min:4',

            'product_name' => 'required|min:3',
            'product_code' => 'required|unique:products,code,'.$this->request->get('old_product_id'),

            'purchase_capacity' => 'required',
            'purchase_price' => 'bail|nullable|numeric',
            'date_of_purchase' => 'required|date|before_or_equal:today',
            'last_date_of_warranty' => 'required|date|after_or_equal:purchase_date',
        ];
    }
}
