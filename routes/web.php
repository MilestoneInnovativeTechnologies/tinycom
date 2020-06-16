<?php

use Illuminate\Support\Facades\Route;

Route::group([

    'namespace'     => 'Milestone\\Tinycom\\Controller',

],function(){

    Route::post(config('tinycom.webhook.path'),'PaymentController@ProcessPayment')->name('tinycom.webhook.path');

    Route::group([

        'middleware'    =>  ['web'],

    ],function(){

        Route::get('/',function(){ return view(!empty(config('tinycom.index')) ? config('tinycom.index') : 'TinyCOM::index'); })->name('index');

        Route::post('register','LoginController@register')->name('register');

        Route::match(['post','get'],'login','LoginController@login')->name('login');
        Route::get('logout',function (){ Auth::logout(); return redirect()->route('index'); })->name('logout');

    });

});