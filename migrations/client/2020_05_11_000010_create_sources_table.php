<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sources', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->index();
            $table->string('customers',1024)->nullable();
            $table->string('items',1024)->nullable();
            $table->string('bundles',1024)->nullable();
            $table->string('categories',1024)->nullable();
            $table->string('title',256)->nullable();
            $table->string('description',1024)->nullable();
            $table->unsignedInteger('expire')->index()->default(0);
            $table->enum('active',['Y','N'])->default('Y');
            $table->unsignedSmallInteger('hits')->default(0);
            $table->unsignedSmallInteger('expire_hits')->default(0);
            $table->unsignedSmallInteger('orders')->default(0);
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
        Schema::dropIfExists('sources');
    }
}
