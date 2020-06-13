<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date')->useCurrent();
            $table->string('reference',32)->index()->nullable();
            $table->string('order_reference',32)->index()->nullable();
            $table->unsignedBigInteger('order')->index()->nullable();
            $table->decimal('amount')->default(0);
            $table->string('attachment',256)->nullable();
            $table->string('request_id',32)->index()->nullable();
            $table->text('request')->nullable();
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
        Schema::dropIfExists('payments');
    }
}
