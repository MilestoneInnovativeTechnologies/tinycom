<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEditionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('editions', function (Blueprint $table) {
            $table->id();
            $table->string('name',64)->index();
            $table->decimal('amount_multiplier')->default(1);
            $table->string('description',512)->nullable();
            $table->text('features')->nullable();
            $table->enum('active',['Y','N'])->default('Y');
            $table->timestamps();
        });

        (new \Milestone\Tinycom\Model\Edition(['name' => config('tinycom.initial_edition'),'amount_multiplier' => 1]))->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('editions');
    }
}
