<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\ServiceMan;
use Illuminate\Http\Request;

class ServiceMenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Models\ServiceMan  $serviceMan
     * @return \Illuminate\Http\Response
     */
    public function show(ServiceMan $serviceMan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ServiceMan  $serviceMan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ServiceMan $serviceMan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ServiceMan  $serviceMan
     * @return \Illuminate\Http\Response
     */
    public function destroy(ServiceMan $serviceMan)
    {
        //
    }
}
