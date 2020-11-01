<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerCollection;
use App\Http\Resources\CustomerResource;
use App\Http\Resources\CustomerViewResource;
use App\Models\Customer;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class CustomerController extends Controller
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
        $customers = Customer::query();
        $customers->join('users', 'users.id', '=', 'customers.user_id');
        $customers->join('customer_types', 'customer_types.id', '=', 'customers.customer_type_id');
        if ($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != "") {
            $customers->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $customers->orderBy('customers.id', 'DESC');
        }

        if ($request->input('query') && $request->input('query') != "") {
            $query = $request->input('query');
            $customers->where(function($q) use ($query) {
                $q->where('users.name', 'like', "%{$query}%");
                $q->orWhere('customer_types.name', 'like', "%{$query}%");
                $q->orWhere('email', 'like', "%{$query}%");
                $q->orWhere('phone', 'like', "%{$query}%");
                $q->orWhere('customerId', 'like', "%{$query}%");
            });
        }

        if($request->input('division_id') && $request->input('division_id') != "null"){
            $customers->where('users.division_id', $request->division_id);
        }
        if($request->input('district_id') && $request->input('district_id') != "null"){
            $customers->where('users.district_id', $request->district_id);
        }
        if($request->input('upazila_id') && $request->input('upazila_id') != "null"){
            $customers->where('users.upazila_id', $request->upazila_id);
        }

        $customers->with('user');
        $customers->select('customers.*');
        return new CustomerCollection($customers->paginate($limit));
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
            'customer_type_id' => 'required',
            'name' => 'required|min:3',
            'email' => 'bail|nullable|email|unique:users,email',
            'phone' => 'required|numeric|digits:11|unique:users,phone',
            'customerId' => 'required|string|unique:customers,customerId',
            'country_id' => 'required',
            'division_id' => 'required',
            'district_id' => 'required',
            'password' => 'nullable|string|min:8',
            'address' => 'required|string|min:4',
        ]);

        $data = $request->all();
        $data['user_type'] = 'customer';
        $data['created_by'] = auth()->id();
        $data['email_verified_at'] = now();
        $data['password'] = bcrypt($request->email);
        $data['status'] = 0;

        try{
            \DB::beginTransaction();
            $user = User::create($data);
            Customer::create(['user_id' => $user->id, 'customer_type_id'=> $data['customer_type_id'], 'customerId' => $data['customerId']]);
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
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $customer = Customer::where('customers.id', $id)->join('users', 'customers.user_id', '=', 'users.id')->first();
        return new CustomerResource($customer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customer $customer)
    {
        $request->validate([
            'customer_type_id' => 'required',
            'name' => 'required|min:3',
            'email' => 'bail|nullable|email|unique:users,email,'.$customer->user_id,
            'phone' => 'required|numeric|digits:11|unique:users,phone,'.$customer->user_id,
            'customerId' => 'required|string|unique:customers,customerId,'.$customer->id,
            'country_id' => 'required',
            'division_id' => 'required',
            'district_id' => 'required',
            'password' => 'nullable|string|min:8',
            'address' => 'required|string|min:4',
        ]);
   
        $data = $request->except(['customerId', 'customer_type_id']);
        try{
            \DB::beginTransaction();
            $customer->user()->update($data);
            $customer->update(['customerId' => $request->customerId, 'customer_type_id'=> $request->customer_type_id]);
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
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();
    }
    
    /**
     * get customer list for fropdown
     *
     * @return \Illuminate\Http\Response
     */
    public function getCustomer()
    {
        $customers = Customer::get();
        
        return new CustomerCollection($customers);
    }

    /**
     * Display the specified resource.
     *
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function SingleView($id)
    {
        $customer = Customer::where('customers.id', $id)->with('user')->with('purchase.product')->with('purchase.customer_services')->first();
        return new CustomerViewResource($customer);
    }
}
