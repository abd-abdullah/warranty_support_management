<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeDoneByColumnInCustomerServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('customer_services', function (Blueprint $table) {
            $table->unsignedBigInteger('done_by')->nullable()->change();
            $table->dateTime('service_time')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('customer_services', function (Blueprint $table) {
            $table->unsignedBigInteger('done_by')->change();
            $table->dateTime('service_time')->change();
        });
    }
}
