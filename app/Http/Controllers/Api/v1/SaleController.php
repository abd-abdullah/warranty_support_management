<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaleRequest;
use App\Http\Resources\SaleCollection;
use App\Http\Resources\SaleResource;
use Exception;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use App\Models\User;
use Carbon\Carbon;
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
        $sales->join('customers', 'customers.id', '=', 'sales.customer_id');
        $sales->join('users', 'users.id', '=', 'customers.user_id');
        $sales->join('products', 'products.id', '=', 'sales.product_id');
         
        if ($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != "") {
            $sales->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $sales->orderByRaw("CONVERT(SUBSTRING_INDEX(customers.customerId,'-',-1),SIGNED) desc");
        }

        if ($request->input('query') && $request->input('query') != "") {
            $sales->where('users.name', 'like', "%{$request->input('query')}%");
            $sales->orWhere('users.email', 'like', "%{$request->input('query')}%");
            $sales->orWhere('users.phone', 'like', "%{$request->input('query')}%");
            $sales->orWhere('customers.customerId', 'like', "%{$request->input('query')}%");
            $sales->orWhere('products.name', 'like', "%{$request->input('query')}%");
            $sales->orWhere('products.code', 'like', "%{$request->input('query')}%");
            $sales->orWhere('purchase_from', 'like', "%{$request->input('query')}%");
            $sales->orWhere('invoice', 'like', "%{$request->input('query')}%");
        }

        $sales->with('customer');
        $select = [
            'products.name as product_name',
            'products.code as product_code',
            'sales.*',
        ];
        $sales->groupBy('sales.id');
        $sales->select($select);
        return new SaleCollection($sales->paginate($limit));
    }
    
    /**
     * Display a listing of the resource for dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexDashboard(Request $request)
    {
        $limit = (($request->per_page != NULL) ? $request->per_page : 10);
        $limit = (($limit == -1) ? 9999999 : $limit);
        $sales = Sale::query();
        $sales->join('customers', 'customers.id', '=', 'sales.customer_id');
        $sales->join('users', 'users.id', '=', 'customers.user_id');
        $sales->join('products', 'products.id', '=', 'sales.product_id');
         
        if ($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != "") {
            $sales->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $sales->orderBy('sales.next_service_date', 'ASC');
        }

        if ($request->input('query') && $request->input('query') != "") {
            $sales->where('users.name', 'like', "%{$request->input('query')}%");
            $sales->orWhere('users.email', 'like', "%{$request->input('query')}%");
            $sales->orWhere('users.phone', 'like', "%{$request->input('query')}%");
            $sales->orWhere('customers.customerId', 'like', "%{$request->input('query')}%");
            $sales->orWhere('products.name', 'like', "%{$request->input('query')}%");
            $sales->orWhere('products.code', 'like', "%{$request->input('query')}%");
            $sales->orWhere('purchase_from', 'like', "%{$request->input('query')}%");
            $sales->orWhere('invoice', 'like', "%{$request->input('query')}%");
        }
        
        if($request->input('division_id') && $request->input('division_id') != "null"){
            $sales->where('users.division_id', $request->division_id);
        }
        if($request->input('district_id') && $request->input('district_id') != "null"){
            $sales->where('users.district_id', $request->district_id);
        }
        
        if($request->input('upazila_id') && $request->input('upazila_id') != "null"){
            $sales->where('users.upazila_id', $request->upazila_id);
        }
       
        if($request->input('zone_id') && $request->input('zone_id') != "null"){
            $sales->where('users.zone_id', $request->zone_id);
        }

        if($request->input('from_date') && $request->from_date != 'null'){
            $sales->whereDate('sales.next_service_date', '>=', Carbon::parse($request->from_date));
        }
        
        if($request->input('to_date') && $request->to_date != 'null'){
            $sales->whereDate('sales.next_service_date', '<=', Carbon::parse($request->to_date));
        }

        $sales->with('customer');
        $select = [
            'products.name as product_name',
            'products.code as product_code',
            'sales.*',
        ];
        
        $sales->groupBy('sales.id');
        $sales->select($select);
        return new SaleCollection($sales->paginate($limit));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SaleRequest $request)
    {
        $product_id = $request->old_product_id;
        $customer_id = $request->old_customer_id;
        
        try{
            \DB::beginTransaction();
            if($customer_id == NULL || $customer_id == ''){
                $userData = $request->only( 'name','customerId','email','password','phone','other_contact_numbers','country_id','division_id','district_id','upazila_id', 'zone_id','address');
                $userData['user_type'] = 'customer';
                $userData['created_by'] = auth()->id();
                $userData['status'] = 0;
                $userData['email_verified_at'] = now();
                $userData['password'] = bcrypt($request->email);
                $user = User::create($userData);
                $customer = Customer::create(['user_id' => $user->id, 'customerId' => $request->customerId, 'customer_type_id' => $request->customer_type_id]);
                $customer_id = $customer->id;
            }
            if($product_id == NULL || $product_id == ''){
                $productData = [
                    'name' => $request->product_name,
                    'code' => $request->product_code,
                    'created_by' => auth()->id()
                ];
                $product = Product::create($productData);
                $product_id = $product->id;
            }

            $purchaseData = [
                'customer_id' => $customer_id,
                'product_id' => $product_id,
                'capacity' => $request->purchase_capacity,
                'price' => $request->purchase_price,
                'purchase_from' => $request->purchase_from,
                'date_of_purchase' => dateFormat($request->date_of_purchase),
                'date_of_installation' => dateFormat($request->date_of_installation),
                'last_date_of_warranty' => dateFormat($request->last_date_of_warranty),
                'next_service_date' => ($request->next_service_date != NULL)?(dateFormat($request->next_service_date)):(Carbon::parse($request->date_of_installation)->addMonth(3)),
                'invoice' => $request->invoice,
                'created_by' => auth()->id()
            ];
            Sale::create($purchaseData);
            
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
        return new SaleResource($sale);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function showWarranty($id)
    {
        return Sale::whereId($id)->with(['customer.user.country', 'customer.user.district', 'customer.user.division', 'customer.user.upazila', 'product'])->first();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function update(SaleRequest $request, Sale $sale)
    {
        $product_id = $request->old_product_id;
        $customer_id = $request->old_customer_id;

        try{
            \DB::beginTransaction();
            if($customer_id == NULL || $customer_id == ''){
                $userData = $request->only('name','customerId','email','password','phone','other_contact_numbers','country_id','division_id','district_id','upazila_id', 'zone_id','address');
                $userData['user_type'] = 'customer';
                $userData['created_by'] = auth()->id();
                $userData['email_verified_at'] = now();
                $userData['password'] = bcrypt($request->email);
                $user = User::create($userData);
                $customer = Customer::create(['user_id' => $user->id, 'customerId' => $request->customerId, 'customer_type_id' => $request->customer_type_id]);
                $customer_id = $customer->id;
            }
            if($product_id == NULL || $product_id == ''){
                $productData = [
                    'name' => $request->product_name,
                    'code' => $request->product_code,
                    'created_by' => auth()->id()
                ];
                $product = Product::create($productData);
                $product_id = $product->id;
            }

            $purchaseData = [
                'customer_id' => $customer_id,
                'product_id' => $product_id,
                'capacity' => $request->purchase_capacity,
                'price' => $request->purchase_price,
                'purchase_from' => $request->purchase_from,
                'date_of_purchase' => dateFormat($request->date_of_purchase),
                'date_of_installation' => dateFormat($request->date_of_installation),
                'last_date_of_warranty' => Carbon::parse($request->last_date_of_warranty)->format('Y-m-d'),
                'next_service_date' => ($request->next_service_date != NULL)?(Carbon::parse($request->next_service_date)->format('Y-m-d')):(Carbon::parse($request->date_of_installation)->addMonth(3)),
                'invoice' => $request->invoice,
                'updated_by' => auth()->id()
            ];
            $sale->update($purchaseData);
            
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
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sale $sale)
    {
        $sale->delete();
    }
}
