<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerTypCollection;
use App\Http\Resources\CustomerTypeResource;
use App\Models\CustomerType;
use Exception;
use Illuminate\Http\Request;

class CustomerTypeController extends Controller
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
        $customerType = CustomerType::query();
        if ($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != "") {
            $customerType->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $customerType->orderBy('id', 'DESC');
        }

        if ($request->input('query') && $request->input('query') != "") {
            $customerType->where('name', 'like', "%{$request->input('query')}%");
        }

        return new CustomerTypCollection($customerType->paginate($limit));
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
            'name' => 'required|unique:customer_types',
        ]);
        $data = $request->all();
        try{
            \DB::beginTransaction();
            CustomerType::create($data);
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
     * @param  \App\Models\CustomerType  $customerType
     * @return \Illuminate\Http\Response
     */
    public function show(CustomerType $customerType)
    {
        return new CustomerTypeResource($customerType);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CustomerType  $customerType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CustomerType $customerType)
    {
        $request->validate([
            'name' => 'required|unique:customer_types,name,'.$customerType->id,
        ]);
        $data = $request->all();
        try{
            \DB::beginTransaction();
            $customerType->update($data);
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
     * @param  \App\Models\CustomerType  $customerType
     * @return \Illuminate\Http\Response
     */
    public function destroy(CustomerType $customerType)
    {
        $customerType->delete();
    }

    /**
     * get customer list for fropdown
     *
     * @return \Illuminate\Http\Response
    */
    public function getCustomerType()
    {
        return CustomerType::all();
    }
}
