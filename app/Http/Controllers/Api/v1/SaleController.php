<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaleRequest;
use App\Http\Resources\CustomerCollection;
use App\Http\Resources\CustomerViewResource;
use App\Http\Resources\SaleCollection;
use App\Http\Resources\SaleResource;
use Exception;
use App\Models\Product;
use App\Models\Sale;
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
        $sales->join('products', 'products.id', '=', 'sales.product_id');
         
        if ($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != "") {
            $sales->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $sales->orderByRaw("ABS(CONVERT(SUBSTRING_INDEX(customerId,'C',-1),SIGNED)) desc");
        }

        if ($request->input('query') && $request->input('query') != "") {
            $sales->where(function($query) use ($request) {
                $query->where('sales.name', 'like', "%{$request->input('query')}%");
                $query->orWhere('phone', 'like', "%{$request->input('query')}%");
                $query->orWhere('customerId', 'like', "%{$request->input('query')}%");
                $query->orWhere('invoice', 'like', "%{$request->input('query')}%");
            });
        }

        $select = [
            'products.name as product_name',
            'products.code as product_code',
            'sales.*',
        ];

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
        $sales->join('products', 'products.id', '=', 'sales.product_id');
         
        if ($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != "") {
            $sales->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $sales->orderBy('sales.next_service_date', 'ASC');
        }

        if ($request->input('query') && $request->input('query') != "") {
            $sales->where(function($query) use ($request) {
                $query->where('sales.name', 'like', "%{$request->input('query')}%");
                $query->orWhere('phone', 'like', "%{$request->input('query')}%");
                $query->orWhere('customerId', 'like', "%{$request->input('query')}%");
                $query->orWhere('invoice', 'like', "%{$request->input('query')}%");
            });
        }
        
        if($request->input('division_id') && $request->input('division_id') != "null"){
            $sales->where('division_id', $request->division_id);
        }
        if($request->input('district_id') && $request->input('district_id') != "null"){
            $sales->where('district_id', $request->district_id);
        }
        
        if($request->input('upazila_id') && $request->input('upazila_id') != "null"){
            $sales->where('upazila_id', $request->upazila_id);
        }
       
        if($request->input('zone_id') && $request->input('zone_id') != "null"){
            $sales->where('zone_id', $request->zone_id);
        }

        if($request->input('from_date') && $request->from_date != 'null'){
            $sales->whereDate('sales.next_service_date', '>=', Carbon::parse($request->from_date));
        }
        
        if($request->input('to_date') && $request->to_date != 'null'){
            $sales->whereDate('sales.next_service_date', '<=', Carbon::parse($request->to_date));
        }
       
        if($request->input('is_service_taking') && $request->is_service_taking == 1){
            $sales->join('customer_services', 'customer_services.sale_id', '=', 'sales.id');
        }
       
        if($request->input('is_service_taking') && $request->is_service_taking == 2){
            $sales->join('customer_services', 'customer_services.sale_id', '=', 'sales.id', 'left')->where('customer_services.id', null);
        }

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
        
        try{
            \DB::beginTransaction();
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
                'customer_type_id' => $request->customer_type_id,
                'name' => $request->name,
                'customerId' => $request->customerId,
                'email' => $request->email,
                'phone' => $request->phone,
                'other_contact_numbers' => $request->other_contact_numbers,
                'country_id' => $request->country_id,
                'division_id' => $request->division_id,
                'district_id' => $request->district_id,
                'upazila_id' => $request->upazila_id,
                'zone_id' => $request->zone_id,
                'address' => $request->address,
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
     * get customer list for fropdown
     *
     * @return \Illuminate\Http\Response
     */
    public function getCustomer()
    {
        $customers = Sale::select(['id', 'name', 'phone', 'customerId'])->get();
        return $customers;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function showWarranty($id)
    {
        return Sale::whereId($id)->with(['country', 'district', 'division', 'upazila', 'product'])->first();
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

        try{
            \DB::beginTransaction();
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
                'customer_type_id' => $request->customer_type_id,
                'name' => $request->name,
                'customerId' => $request->customerId,
                'email' => $request->email,
                'phone' => $request->phone,
                'other_contact_numbers' => $request->other_contact_numbers,
                'country_id' => $request->country_id,
                'division_id' => $request->division_id,
                'district_id' => $request->district_id,
                'upazila_id' => $request->upazila_id,
                'zone_id' => $request->zone_id,
                'address' => $request->address,
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

    /**
     * Display the specified resource.
     *
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function SingleView($id)
    {
        $sale = Sale::whereId($id)->with('product')->with('customer_services')->first();
        return new CustomerViewResource($sale);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function customer(Request $request)
    {
        $limit = (($request->per_page != NULL) ? $request->per_page : 10);
        $limit = (($limit == -1) ? 9999999 : $limit);
        $sales = Sale::query();
        $sales->join('products', 'products.id', '=', 'sales.product_id');
        $sales->join('customer_types', 'customer_types.id', '=', 'sales.customer_type_id', 'left');
        $sales->join('countries', 'countries.id', '=', 'sales.country_id', 'left');
        $sales->join('divisions', 'divisions.id', '=', 'sales.division_id', 'left');
        $sales->join('districts', 'districts.id', '=', 'sales.district_id', 'left');
        $sales->join('upazilas', 'upazilas.id', '=', 'sales.upazila_id', 'left');
        $sales->join('zones', 'zones.id', '=', 'sales.zone_id', 'left');
         
        if ($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != "") {
            $sales->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $sales->orderByRaw("ABS(CONVERT(SUBSTRING_INDEX(customerId,'C',-1),SIGNED)) desc");
        }

        if ($request->input('query') && $request->input('query') != "") {
            $sales->where(function($query) use ($request) {
                $query->where('sales.name', 'like', "%{$request->input('query')}%");
                $query->orWhere('phone', 'like', "%{$request->input('query')}%");
                $query->orWhere('customerId', 'like', "%{$request->input('query')}%");
                $query->orWhere('zones.name', 'like', "%{$request->input('query')}%");
            });
        }

        $select = [
            'products.name as product_name',
            'products.code as product_code',
            'customer_types.name as customer_type',
            'countries.name as country',
            'divisions.name as division',
            'districts.name as district',
            'upazilas.name as upazila',
            'zones.name as zone',
            'sales.id',
            'sales.customerId',
            'sales.name',
            'sales.phone',
            'sales.address',
        ];
        
        $sales->select($select);
        return new CustomerCollection($sales->paginate($limit));
    }
}
