<?php

use \Illuminate\Support\Facades\Route;
use \Illuminate\Http\Request;
use \Illuminate\Support\Facades\Auth;
use \Milestone\Tinycom\Middleware\TinyCOMCompanyCodeDefine;
use \Milestone\Tinycom\Middleware\TinyCOMClientAdminAuth;

Route::view('unauthorized','TinyCOM::unauthorized')->name('unauthorized');

Route::group([

    'middleware'    =>  ['web',TinyCOMCompanyCodeDefine::class],
    'namespace'     => 'Milestone\\Tinycom\\Controller',

],function(){

    Route::group(['prefix' => 'user'],function(){
        Route::post('login','CustomerController@login');
        Route::get('logout','CustomerController@logout');
        Route::post('update','CustomerController@update');
    });

    Route::group(['prefix' => 'cart'],function(){
        Route::post('sync','CartController@sync');
        Route::post('order','CartController@order');
    });

    Route::group(['prefix' => 'item' ],function(){
        Route::post('sync','ItemController@sync');
    });

    Route::group(['prefix' => 'source'],function(){
        Route::get('hit/{uuid}','SourceController@hit');
        Route::post('fetch','SourceController@fetch');
    });

    Route::get('s/{uuid}','SourceController@visit')->name('source_link');
    Route::get('b/{uuid}','CartController@bill')->name('bill_link');
    Route::get('setup','SetupController@setup');
    Route::get('pack','HomeController@pack');
    Route::view('r','TinyCOM::redirect')->name('redirect');
    Route::get('/','HomeController@index')->name('home');

    Route::match(['get','post'],'/admin/login',function(Request $request){
        Auth::logout(); if($request->getMethod() !== 'POST') return view('TinyCOM::login');
        Auth::attempt(['name' => 'admin','password' => $request->input('password')]);
        return redirect()->route('admin');
    })->name('admin.login');

    Route::group([

        'prefix'        =>  'admin',
        'middleware'    =>  [TinyCOMClientAdminAuth::class]

    ],function(){

        Route::view('/','TinyCOM::admin')->name('admin');
        Route::view('import','TinyCOM::import')->name('import');
        Route::post('import','ImportController@import');

        Route::post('live/customers','CustomerController@online');
        Route::post('live/carts','CartController@online');

        Route::group([
            'prefix'    =>  'source'
        ],function(){
            Route::post('create','SourceController@create');
            Route::post('list','SourceController@list');
            Route::post('extend','SourceController@extend');
        });

        Route::group([
            'prefix'    =>  'cart'
        ],function(){
            Route::post('fetch','CartController@fetch');
            Route::post('confirm','CartController@confirm');
            Route::post('cancel','CartController@cancel');
            Route::post('orders','CartController@orders');
            Route::post('delivered','CartController@delivered');
        });

        Route::group([
            'prefix'    =>  'item'
        ],function(){
            Route::post('create','ItemController@create');
            Route::post('fetch','ItemController@fetch');
            Route::post('stock','ItemController@stock');
        });

        Route::group([
            'prefix'    =>  'category'
        ],function(){
            Route::post('create','CategoryController@create');
        });

        Route::group([
            'prefix'    =>  'customer'
        ],function(){
            Route::post('fetch','CustomerController@fetch');
            Route::post('create','CustomerController@create');
            Route::post('update','CustomerController@adminUpdate');
        });

        Route::group([
            'prefix'    =>  'api'
        ],function(){
            Route::post('category/{id}/update','CategoryController@update');
            Route::post('item/{id}/update','ItemController@update');
            Route::post('password/update','UserController@password');
        });

    });

});

