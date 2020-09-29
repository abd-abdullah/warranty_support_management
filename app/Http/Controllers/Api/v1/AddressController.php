<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\District;
use App\Models\Division;
use App\Models\PostOffice;
use App\Models\Upazila;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function getCountry(){
        return Country::all();
    }
    public function getDivision($country_id){
        return Division::whereCountryId($country_id)->get();
    }
    public function getDistrict($division_id){
        return District::whereDivisionId($division_id)->get();
    }
    public function getUpazila($district_id){
        return Upazila::whereDistrictId($district_id)->get();
    }
    public function getPostOffice($upazila_id){
        return PostOffice::whereUpazilaId($upazila_id)->get();
    }
    
}
