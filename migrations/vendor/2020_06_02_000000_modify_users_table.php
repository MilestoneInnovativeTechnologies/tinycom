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
            $table->string('name',48)->index()->change();
            $table->string('email',64)->nullable()->change();
            $table->string('phone',16)->nullable()->after('email');
            $table->enum('type',['company','referrer','client'])->default('client')->after('phone');
        });

        \Illuminate\Support\Facades\DB::table('users')->insert([
            'name' => 'Administrator', 'email' => config('tinycom.email'), 'type' => 'company',
            'password' => \Illuminate\Support\Facades\Hash::make(config('tinycom.password')),
            'created_at' => now()->toDateTimeString(), 'updated_at' => now()->toDateTimeString()
        ]);
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
            $table->dropColumn(['phone','type']);
        });
        \Illuminate\Support\Facades\DB::table('users')->where('name','Administrator')->delete();
    }
}
