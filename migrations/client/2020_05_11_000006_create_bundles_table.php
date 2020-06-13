<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBundlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bundles', function (Blueprint $table) {
            $table->id();
            $table->string('name',64)->index();
            $table->string('description',128)->nullable();
            $table->decimal('price',11,2)->default(1);
            $table->decimal('selling',11,2)->default(1);
            $table->decimal('stock',11,2)->default(1);
            $table->enum('public',['Y','N'])->default('Y');
            $table->unsignedInteger('expire')->index()->default(0);
            $table->enum('status',['Y','N'])->default('Y');
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
        Schema::dropIfExists('bundles');
    }
}
