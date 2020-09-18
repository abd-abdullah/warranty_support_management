<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Models\Product;
use Facade\FlareClient\Http\Response;
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
        $limit = (($request->per_page != NULL)?$request->per_page:10);
        $limit = (($limit == -1)?9999999:$limit);
        $products = Product::query();
        if($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != ""){
            $products->orderBy($request->input('sort_by'), $request->input('sort_order'));
        }
        else{
            $products->orderBy('id', 'DESC');
        }

        if($request->input('query') && $request->input('query') != ""){
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
