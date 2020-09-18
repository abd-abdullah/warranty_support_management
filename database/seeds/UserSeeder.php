<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
        	'name' => "Admin",
        	'user_type' => "admin",
	        'email' => 'admin@admin.com',
	        'email_verified_at' => now(),
	        'password' => Hash::make('secret'),
            'phone' => '01738868597',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
