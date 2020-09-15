<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomerServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_services', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('sale_id');
            $table->dateTime('service_time');
            $table->text('service_for')->nullable();
            $table->dateTime('next_service_time')->nullable();
            $table->text('remarks')->nullable();
            $table->decimal('service_charge', 8,2)->nullable();
            $table->decimal('total_paid', 8,2)->nullable();
            $table->decimal('cost', 8,2)->nullable();
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('done_by');
            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('customer_id')->references('id')->on('customers');
            $table->foreign('sale_id')->references('id')->on('sales');
            $table->foreign('done_by')->references('id')->on('service_men');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customer_services');
    }
}
