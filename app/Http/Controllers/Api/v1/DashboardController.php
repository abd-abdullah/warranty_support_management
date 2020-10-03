<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\CustomerService;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke(){
        $month = date('m');
        $data['month'] = date('F Y');
        $data['product'] = Product::count();
        $data['customer'] = Customer::count();
        $data['purchase'] = Sale::count();
        $data['service'] = CustomerService::count();

        $data['product_monthly'] = Product::whereMonth('created_at', $month)->count();
        $data['customer_monthly'] = Customer::whereMonth('created_at', $month)->count();
        $data['purchase_monthly'] = Sale::whereMonth('date_of_purchase', $month)->count();
        $data['service_monthly'] = CustomerService::whereMonth('service_time', $month)->count();
        return $data;
    }
}
