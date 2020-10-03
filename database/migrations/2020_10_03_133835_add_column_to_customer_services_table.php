<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnToCustomerServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('customer_services', function (Blueprint $table) {
            $table->decimal('due', 8,2)->nullable()->after('total_paid');
            $table->tinyInteger('is_discontinue')->default(0)->after('cost');
            $table->tinyInteger('status')->default(0)->after('is_discontinue');
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
            $table->dropColumn('due');
            $table->dropColumn('is_continue');
            $table->dropColumn('status');
        });
    }
}
