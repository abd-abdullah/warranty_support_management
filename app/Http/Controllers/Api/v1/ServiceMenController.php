<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceMenCollection;
use App\Http\Resources\ServiceMenResource;
use App\Models\ServiceMan;
use App\Models\User;
use Carbon\Carbon;
use Exception;
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
        $technicians->join('users', 'users.id', '=', 'service_men.id');
        if ($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != "") {
            $technicians->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $technicians->orderBy('service_men.id', 'DESC');
        }

        if ($request->input('query') && $request->input('query') != "") {
            $query = $request->input('query');
            $technicians->where('name', 'like', "%{$query}%");
            $technicians->orWhere('email', 'like', "%{$query}%");
            $technicians->orWhere('phone', 'like', "%{$query}%");
        }
        $technicians->with('user');
        $technicians->select('service_men.*');
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
        $request->validate([
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'phone' => 'required|numeric|digits:11|unique:users',
            'joining_date' => 'required|date|before_or_equal:today',
            'password' => 'nullable|string|min:8',
            'country_id' => 'required',
            'division_id' => 'required',
            'district_id' => 'required',
            'zone_id' => 'required',
            'address' => 'required|string|min:4',
        ]);

        $data = $request->all();
        $data['user_type'] = 'service_men';
        $data['created_by'] = auth()->id();
        $data['joining_date'] = Carbon::parse($request->joining_date)->format('Y-m-d');
        $data['email_verified_at'] = now();
        $data['status'] = 0;
        if($request->password !== NULL){
            $data['password'] = bcrypt($request->password);
        }
        else{
            $data['password'] = bcrypt($request->phone);
        }

        try{
            \DB::beginTransaction();
            $user = User::create($data);
            ServiceMan::create(['user_id' => $user->id, 'joining_date' => $data['joining_date']]);
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
        $request->validate([
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users,email,'.$technician->user_id,
            'phone' => 'required|numeric|digits:11|unique:users,phone,'.$technician->user_id,
            'joining_date' => 'required|date|before_or_equal:today',
            'password' => 'nullable|string|min:8',
            'country_id' => 'required',
            'division_id' => 'required',
            'district_id' => 'required',
            'zone_id' => 'required',
            'address' => 'required|string|min:4',
        ]);
   
        $data = $request->except(['password', 'joining_date']);

        try{
            \DB::beginTransaction();
            $technician->user()->update($data);
            $joining_date = Carbon::parse($request->joining_date)->format('Y-m-d');
            $technician->update(['joining_date' => $joining_date]);
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
     * @param  \App\Models\ServiceMan  $technician
     * @return \Illuminate\Http\Response
     */
    public function destroy(ServiceMan $technician)
    {
        $technician->delete();
    }

     /**
     * get technician list for fropdown
     *
     * @return \Illuminate\Http\Response
    */
    public function getTechnician()
    {
        $technicians = ServiceMan::get();
        
        return new ServiceMenCollection($technicians);
    }
}
