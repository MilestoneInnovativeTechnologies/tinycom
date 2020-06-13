<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company')->index()->nullable();
            $table->unsignedBigInteger('edition')->index()->nullable();
            $table->dateTime('start')->index();
            $table->dateTime('end')->index();
            $table->unsignedBigInteger('order')->index()->nullable();
            $table->enum('active',['Y','N'])->default('Y');
            $table->enum('status',['Current','Upcoming','Expired','Cancelled'])->default('Upcoming');
            $table->string('status_log',512)->nullable();
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
        Schema::dropIfExists('subscriptions');
    }
}
