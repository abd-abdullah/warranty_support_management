<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Product;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    $user = User::first();
    return [
        'name' => $faker->sentence(6,true),
        'code' => $faker->unique()->numberBetween(1000,9999),
        'created_by' => $user->id
    ];
});
