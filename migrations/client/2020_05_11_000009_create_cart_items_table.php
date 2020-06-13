<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cart')->index();
            $table->unsignedBigInteger('item')->index()->nullable();
            $table->unsignedBigInteger('bundle')->index()->nullable();
            $table->decimal('price',11,2)->default(0);
            $table->decimal('quantity',11,2)->default(1);
            $table->decimal('amount',11,2)->index()->default(0);
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
        Schema::dropIfExists('cart_items');
    }
}
