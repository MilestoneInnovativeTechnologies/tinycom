<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company')->index()->nullable();
            $table->enum('type',['Subscription','Addon','Other'])->default('Subscription');
            $table->dateTime('date')->useCurrent();
            $table->decimal('amount')->default(0);
            $table->string('reference',32)->index()->nullable();
            $table->string('link','128')->nullable();
            $table->enum('status',['New','Paid','Cancelled','Overridden'])->default('New');
            $table->string('status_log',512)->nullable();
            $table->string('attributes',1024)->nullable();
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
        Schema::dropIfExists('orders');
    }
}
