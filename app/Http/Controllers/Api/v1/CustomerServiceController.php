<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerServiceCollection;
use App\Models\CustomerService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Exception;

class CustomerServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $limit = (($request->per_page != NULL) ? $request->per_page : 10);
        $limit = (($limit == -1) ? 9999999 : $limit);
        $customerService = CustomerService::query();
        $customerService->join('customers', 'customers.id', '=', 'customer_services.customer_id');
        $customerService->join('users', 'users.id', '=', 'customers.user_id');
        $customerService->join('sales', 'sales.id', '=', 'customer_services.sale_id');
        $customerService->join('products', 'products.id', '=', 'sales.product_id');
        $customerService->join('service_men', 'service_men.id', '=', 'customer_services.done_by');
        $customerService->join('users as technicians', 'technicians.id', '=', 'service_men.user_id');
         
        if ($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != "") {
            $customerService->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $customerService->orderBy('id', 'DESC');
        }

        if ($request->input('query') && $request->input('query') != "") {
            $customerService->where('users.name', 'like', "%{$request->input('query')}%");
            $customerService->orWhere('users.email', 'like', "%{$request->input('query')}%");
            $customerService->orWhere('users.phone', 'like', "%{$request->input('query')}%");
            $sales->orWhere('customers.customerId', 'like', "%{$request->input('query')}%");
            $customerService->orWhere('products.name', 'like', "%{$request->input('query')}%");
            $customerService->orWhere('products.code', 'like', "%{$request->input('query')}%");
        }

        $customerService->with('customer.user')->with('service_man.user');
        $select = [
            'products.name as product_name',
            'products.code as product_code',
            'customer_services.*',
        ];
        $customerService->select($select);
        return new CustomerServiceCollection($customerService->paginate($limit));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'service_time' => 'required|date|before_or_equal:today',
            'next_service_time' => 'bail|nullable|date|after:service_time',
            'service_for' => 'required|string|min:10',
            'service_charge' => 'required|numeric|min:0',
            'total_paid' => 'required|numeric|min:0',
            'done_by' => 'required|numeric',
            'cost' => 'nullable|numeric|min:0',
            'remarks' => 'nullable|string|min:10',
        ]);
        $data = $request->all();
        $data['created_by'] = auth()->id();
        $data['is_dicontinue'] = ($request->is_continue === true)?0:1;
        $data['status'] = 1;
        $data['service_time'] = Carbon::parse($request->service_time)->format('Y-m-d');
        $data['next_service_time'] = ($request->next_service_time != NULL)?Carbon::parse($request->next_service_time)->format('Y-m-d'):NULL;
        $data['due'] = (int)$request->service_charge - (int)$request->total_paid;

        try{
            \DB::beginTransaction();
            CustomerService::create($data);
            \DB::commit();
        }
        catch(Exception $e){
            \DB::rollback();
            return response()->json( [
                'error' => ['db_error' => $e->getMessage()]
            ], 501);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CustomerService  $customerService
     * @return \Illuminate\Http\Response
     */
    public function show(CustomerService $customerService)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CustomerService  $customerService
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CustomerService $customerService)
    {
        $request->validate([
            'service_time' => 'required|date|before_or_equal:today',
            'next_service_time' => 'bail|nullable|date|after:service_time',
            'service_for' => 'required|string|min:10',
            'service_charge' => 'required|numeric|min:0',
            'total_paid' => 'required|numeric|min:0',
            'done_by' => 'required|numeric',
            'cost' => 'nullable|numeric|min:0',
            'remarks' => 'nullable|string|min:10',
        ]);
        $data = $request->all();
        $data['is_dicontinue'] = ($request->is_continue === true)?0:1;
        $data['service_time'] = Carbon::parse($request->service_time)->format('Y-m-d');
        $data['next_service_time'] = ($request->next_service_time != NULL)?Carbon::parse($request->next_service_time)->format('Y-m-d'):NULL;
        $data['due'] = (int)$request->service_charge - (int)$request->total_paid;

        try{
            \DB::beginTransaction();
            $customerService->update($data);
            \DB::commit();
        }
        catch(Exception $e){
            \DB::rollback();
            return response()->json( [
                'error' => ['db_error' => $e->getMessage()]
            ], 501);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CustomerService  $customerService
     * @return \Illuminate\Http\Response
     */
    public function destroy(CustomerService $customerService)
    {
        $customerService->delete();
    }
}
