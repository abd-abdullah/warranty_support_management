<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;

class ProductController extends Controller
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
        $products = Product::query();
        if ($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != "") {
            $products->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $products->orderBy('id', 'DESC');
        }

        if ($request->input('query') && $request->input('query') != "") {
            $products->where('name', 'like', "%{$request->input('query')}%");
        }

        return new ProductCollection($products->paginate($limit));
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
            'code' => 'required|unique:products',
        ]);
        $data = $request->all();
        $data['created_by'] = auth()->id();
        try{
            \DB::beginTransaction();
            Product::create($data);
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
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|min:3',
            'code' => 'required|unique:products,code,'.$product->id,
        ]);
        $data = $request->all();
        try{
            \DB::beginTransaction();
            $product->update($data);
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
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
    }
}
