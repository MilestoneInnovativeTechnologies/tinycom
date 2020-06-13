<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->index();
            $table->unsignedBigInteger('customer')->index()->nullable();
            $table->decimal('amount',11,2)->default(0);
            $table->enum('status',['New','Ordered','Confirmed','Delivered','Cancelled'])->index()->default('New');
            $table->unsignedBigInteger('source')->index()->nullable();
            $table->unsignedInteger('time')->index()->default(0);
            $table->timestamp('confirmed_at')->nullable();
            $table->string('reason',512)->nullable();
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
        Schema::dropIfExists('carts');
    }
}
