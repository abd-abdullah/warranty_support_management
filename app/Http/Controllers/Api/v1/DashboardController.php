<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\CustomerService;
use App\Models\Product;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

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

        //bar chart data   
        $sales = Sale::whereDate( 'date_of_purchase', '>=', Carbon::now()->subDays(29) )
        ->groupBy( 'date' )
        ->orderBy( 'date' )
        ->get( [
            DB::raw( 'DATE_FORMAT( date_of_purchase, "%d") as date' ),
            DB::raw( 'COUNT( * ) as "count"' )
        ])->pluck( 'count', 'date' );
       
        $services = CustomerService::whereDate( 'service_time', '>=', Carbon::now()->subDays(29) )
        ->groupBy( 'date' )
        ->orderBy( 'date' )
        ->get( [
            DB::raw( 'DATE_FORMAT( service_time, "%d") as date' ),
            DB::raw( 'COUNT( * ) as "count"' )
        ])->pluck( 'count', 'date' );

        $braChartData['sale'] = [];
        $braChartData['service'] = [];
        $previousDate = Carbon::now()->subDays(30);
        foreach( range( 29, 0 ) AS $i ) {
            $date = $previousDate->addDay()->format('d');
            $saleValue = (isset($sales[$date])?$sales[$date]:0);
            $serviceValue = (isset($services[$date])?$services[$date]:0);
            
            $braChartData['sale'][$date] =  $saleValue;
            $braChartData['service'][$date] =  $serviceValue;
        }

        $data['bar_labels'] = array_keys($braChartData['sale']);
        $data['bar_sale_data'] = array_values($braChartData['sale']);
        $data['bar_service_data'] = array_values($braChartData['service']);
        //end bar

        //Line chart data
        $saleMonthly = Sale::wheredate( 'date_of_purchase', '>=', Carbon::now()->subYear()->firstOfMonth() )
        ->groupBy( 'date' )
        ->orderBy( 'date' )
        ->get( [
            DB::raw( 'DATE_FORMAT( date_of_purchase, "%b") as date' ),
            DB::raw( 'COUNT( * ) as "count"' )
        ])->pluck( 'count', 'date' );

        $serviceMonthly = CustomerService::whereDate( 'service_time', '>=', Carbon::now()->subYear()->firstOfMonth() )
        ->groupBy( 'date' )
        ->orderBy( 'date' )
        ->get( [
            DB::raw( 'DATE_FORMAT( service_time, "%b") as date' ),
            DB::raw( 'COUNT( * ) as "count"' )
        ])->pluck( 'count', 'date' );

        $lineChartData['sale'] = [];
        $lineChartData['service'] = [];
        $previousDate = Carbon::now()->subYear();
        foreach( range( 11, 0 ) AS $i ) {
            $date = $previousDate->addMonth()->format('M');
            $saleValue = (isset($saleMonthly[$date])?$saleMonthly[$date]:0);
            $serviceValue = (isset($serviceMonthly[$date])?$serviceMonthly[$date]:0);
            
            $lineChartData['sale'][$date] =  $saleValue;
            $lineChartData['service'][$date] =  $serviceValue;
        }

        $data['line_labels'] = array_keys($lineChartData['sale']);
        $data['line_sale_data'] = array_values($lineChartData['sale']);
        $data['line_service_data'] = array_values($lineChartData['service']);

        return $data;
    }
}
