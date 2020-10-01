<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminUserCollection;
use App\Http\Resources\AdminUserResource;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
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
        $adminUsers = User::query();
        if ($request->input('sort_by') && $request->input('sort_by') != "" && $request->input('sort_order') && $request->input('sort_order') != "") {
            $adminUsers->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $adminUsers->orderBy('id', 'DESC');
        }

        if ($request->input('query') && $request->input('query') != "") {
            $adminUsers->where('name', 'like', "%{$request->input('query')}%");
            $adminUsers->orWhere('email', 'like', "%{$request->input('query')}%");
            $adminUsers->orWhere('phone', 'like', "%{$request->input('query')}%");
        }

        $adminUsers->where('user_type', 'admin');

        return new AdminUserCollection($adminUsers->paginate($limit));
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
            'password' => 'nullable|string|min:8',
        ]);
        $data = $request->all();
        $data['user_type'] = 'admin';
        $data['created_by'] = auth()->id();
        $data['email_verified_at'] = now();
        if($request->password !== NULL){
            $data['password'] = bcrypt($request->password);
        }
        else{
            $data['password'] = bcrypt($request->phone);
        }
        return User::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $admin_user
     * @return \Illuminate\Http\Response
     */
    public function show(User $admin_user)
    {
        return new AdminUserResource($admin_user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $admin_user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $admin_user)
    {
        $request->validate([
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users,email.'.$admin_user->id,
            'phone' => 'required|numeric|digits:11|unique:users,phone.'.$admin_user->id,
            'password' => 'nullable|string|min:8',
        ]);

        $data = $request->except('password');
        return $admin_user->update($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $admin_user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $admin_user)
    {
        $admin_user->delete();
    }
}
