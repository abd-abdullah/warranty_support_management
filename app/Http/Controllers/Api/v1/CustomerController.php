<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerCollection;
use App\Http\Resources\CustomerResource;
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
        $technicians = Customer::query();
        $technicians->join('users', 'users.id', '=', 'customers.id');
        if ($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != "") {
            $technicians->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $technicians->orderBy('customers.id', 'DESC');
        }

        if ($request->input('query') && $request->input('query') != "") {
            $query = $request->input('query');
            $technicians->where('name', 'like', "%{$query}%");
            $technicians->orWhere('email', 'like', "%{$query}%");
            $technicians->orWhere('phone', 'like', "%{$query}%");
            $technicians->orWhere('customerId', 'like', "%{$query}%");
        }

        $technicians->with('user');
        $technicians->select('customers.*');
        return new CustomerCollection($technicians->paginate($limit));
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
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'phone' => 'required|numeric|digits:11|unique:users',
            'customerId' => 'required|string|unique:customers,customerId',
            'password' => 'nullable|string|min:8',
        ]);

        $data = $request->all();
        $data['user_type'] = 'customer';
        $data['created_by'] = auth()->id();
        $data['email_verified_at'] = now();
        $data['password'] = bcrypt($request->email);

        try{
            \DB::beginTransaction();
            $user = User::create($data);
            Customer::create(['user_id' => $user->id, 'customerId' => $data['customerId']]);
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
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users,email,'.$customer->user_id,
            'phone' => 'required|numeric|digits:11|unique:users,phone,'.$customer->user_id,
            'customerId' => 'required|string|unique:customers,customerId'.$customer->id,
            'password' => 'nullable|string|min:8',
        ]);
   
        $data = $request->except(['customerId']);
        try{
            \DB::beginTransaction();
            $customer->user()->update($data);
            $customer->update(['customerId' => $request->customerId]);
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
}
