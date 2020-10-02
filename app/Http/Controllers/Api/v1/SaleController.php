<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\SaleCollection;
use App\Http\Resources\SaleResource;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
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
        $sales = Sale::query();
        if ($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != "") {
            $sales->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $sales->orderBy('id', 'DESC');
        }

        if ($request->input('query') && $request->input('query') != "") {
            $sales->where('name', 'like', "%{$request->input('query')}%");
            $sales->orWhere('email', 'like', "%{$request->input('query')}%");
            $sales->orWhere('phone', 'like', "%{$request->input('query')}%");
        }

        return new SaleCollection($sales->paginate($limit));
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
            'password' => 'nullable|string|min:8',
        ]);
        $data = $request->all();
        $data['user_type'] = 'admin';
        $data['created_by'] = auth()->id();
        $data['email_verified_at'] = now();
        if($request->password !== NULL){
            $data['password'] = bcrypt($request->password);
        }
        else{
            $data['password'] = bcrypt($request->phone);
        }
        try{
            \DB::beginTransaction();
            User::create($data);
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
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function show(Sale $sale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sale $sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sale $sale)
    {
        //
    }
}
