<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ZoneCollection;
use App\Http\Resources\ZoneResource;
use App\Models\Zone;
use Exception;
use Illuminate\Http\Request;

class ZoneController extends Controller
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
        $zone = Zone::query();
        if ($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != "") {
            $zone->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $zone->orderBy('id', 'DESC');
        }

        if ($request->input('query') && $request->input('query') != "") {
            $zone->where('name', 'like', "%{$request->input('query')}%");
        }

        return new ZoneCollection($zone->paginate($limit));
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
            'name' => 'required|unique:zones',
        ]);
        $data = $request->all();
        try{
            \DB::beginTransaction();
            Zone::create($data);
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
     * @param  \App\Models\Zone  $zone
     * @return \Illuminate\Http\Response
     */
    public function show(Zone $zone)
    {
        return new ZoneResource($zone);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Zone  $zone
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Zone $zone)
    {
        $request->validate([
            'name' => 'required|unique:zones,name,'.$zone->id,
        ]);
        $data = $request->all();
        try{
            \DB::beginTransaction();
            $zone->update($data);
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
     * @param  \App\Models\Zone  $zone
     * @return \Illuminate\Http\Response
     */
    public function destroy(Zone $zone)
    {
        $zone->delete();
    }

    /**
     * get customer list for fropdown
     *
     * @return \Illuminate\Http\Response
    */
    public function getZone()
    {
        return Zone::all();
    }
}
