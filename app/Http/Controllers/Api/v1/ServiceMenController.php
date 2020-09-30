<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceMenCollection;
use App\Http\Resources\ServiceMenResource;
use App\Models\ServiceMan;
use App\Models\User;
use Illuminate\Http\Request;

class ServiceMenController extends Controller
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
        $technicians = ServiceMan::query();
        $technicians->join('users', 'service_men.user_id', '=', 'users.id');
        if ($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != "") {
            $technicians->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $technicians->orderBy('users.id', 'DESC');
        }

        if ($request->input('query') && $request->input('query') != "") {
            $technicians->where('name', 'like', "%{$request->input('query')}%");
            $technicians->orWhere('email', 'like', "%{$request->input('query')}%");
            $technicians->orWhere('phone', 'like', "%{$request->input('query')}%");
        }
        $technicians->select('users.*', 'service_men.id', 'service_men.joining_date', 'service_men.salary');
        return new ServiceMenCollection($technicians->paginate($limit));
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
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $technician = ServiceMan::where('service_men.id', $id)->join('users', 'service_men.user_id', '=', 'users.id')->first();
        return new ServiceMenResource($technician);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ServiceMan  $technician
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ServiceMan $technician)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ServiceMan  $technician
     * @return \Illuminate\Http\Response
     */
    public function destroy(ServiceMan $technician)
    {
        //
    }
}
