<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['email']);
            $table->string('name',32)->index()->change();
            $table->string('email')->nullable()->change();
        });
        \Illuminate\Support\Facades\DB::table('users')->updateOrInsert(['name' => 'admin'],['password' => \Illuminate\Support\Facades\Hash::make('admin'),'created_at' => now()->toDateTimeString(),'updated_at' => now()->toDateTimeString()]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['name']);
            $table->string('email')->unique()->change();
            $table->string('name')->change();
        });
        \Illuminate\Support\Facades\DB::table('users')->where('name','admin')->delete();
    }
}
