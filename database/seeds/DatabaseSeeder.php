<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(AddressSeeder::class);
        factory(App\Models\User::class, 50)->create();
        factory(App\Models\Product::class, 50)->create();
    }
}
