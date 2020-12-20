<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
            $table->unsignedBigInteger('customer_id')->nullable()->change();
            $table->unsignedBigInteger('customer_type_id')->nullable()->after('id');
            $table->string('customerId')->nullable()->unique()->after('customer_type_id');
            $table->string('name')->nullable()->after('customerId');
            $table->string('email')->nullable()->after('name');
            $table->string('phone')->nullable()->after('email');
            $table->string('other_contact_numbers')->nullable()->after('phone');
            
            $table->unsignedBigInteger('country_id')->nullable()->after('other_contact_numbers');
            $table->unsignedBigInteger('division_id')->nullable()->after('country_id');
            $table->unsignedBigInteger('district_id')->nullable()->after('division_id');
            $table->unsignedBigInteger('upazila_id')->nullable()->after('district_id');
            $table->unsignedBigInteger('zone_id')->nullable()->after('upazila_id');
            $table->text('address')->nullable()->after('zone_id');

            $table->foreign('country_id')->references('id')->on('countries');
            $table->foreign('division_id')->references('id')->on('divisions');
            $table->foreign('district_id')->references('id')->on('districts');
            $table->foreign('upazila_id')->references('id')->on('upazilas');
            $table->foreign('zone_id')->references('id')->on('zones');
            $table->foreign('customer_type_id')->references('id')->on('customer_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sales', function (Blueprint $table) {
            
            $table->unsignedBigInteger('customer_id')->change();
            $table->foreign('customer_id')->references('id')->on('customers');

            $table->dropForeign(['country_id']);
            $table->dropForeign(['division_id']);
            $table->dropForeign(['district_id']);
            $table->dropForeign(['upazila_id']);
            $table->dropForeign(['zone_id']);
            $table->dropForeign(['customer_type_id']);

            $table->dropColumn('customer_type_id');
            $table->dropColumn('customerId');
            $table->dropColumn('name');
            $table->dropColumn('email');
            $table->dropColumn('phone');
            $table->dropColumn('other_contact_numbers');
            $table->dropColumn('address');

            $table->dropColumn('country_id');
            $table->dropColumn('division_id');
            $table->dropColumn('district_id');
            $table->dropColumn('upazila_id');
            $table->dropColumn('zone_id');
        });
    }
}
