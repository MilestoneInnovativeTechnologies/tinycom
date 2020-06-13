<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user')->index()->nullable();
            $table->unsignedBigInteger('referrer')->index()->nullable();
            $table->char('code',6)->index()->unique();
            $table->string('company',64)->index()->nullable();
            $table->string('domain',128)->index()->nullable();
            $table->string('password',32)->nullable();
            $table->string('database',128)->nullable();
            $table->string('database_username',128)->nullable();
            $table->string('database_password',128)->nullable();
            $table->enum('setup',['Y','N'])->default('N');
            $table->enum('active',['Y','N'])->default('Y');
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
        Schema::dropIfExists('companies');
    }
}
