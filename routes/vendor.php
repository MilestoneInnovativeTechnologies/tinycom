<?php

use Illuminate\Support\Facades\Route;
use Milestone\Tinycom\Middleware\TinyCOMCompanyAuth;
use Milestone\Tinycom\Middleware\TinyCOMClientAuth;
use Milestone\Tinycom\Middleware\TinyCOMReferrerAuth;
use Illuminate\Http\Request;

Route::group([

    'middleware'    =>  ['web'],
    'namespace'     => 'Milestone\\Tinycom\\Controller',

],function() {

    Route::group([
        'prefix'        =>  'company',
        'middleware'    =>  [TinyCOMCompanyAuth::class]
    ],function (){
        Route::view('/','TinyCOM::company')->name('company');
        Route::get('setup/done/{token?}','SetupController@done')->name('setup');
        Route::group(['prefix' => 'server'],function (){
            Route::post('{item}/{action}',function($item,$action,Request $request){
                $controller = '\\Milestone\\Tinycom\\Controller\\' . ucfirst($item) . 'Controller';
                $method = $action;
                return call_user_func([new $controller,$method],$request);
            });
        });
    });

    Route::group([
        'prefix'        =>  'client',
        'middleware'    =>  [TinyCOMClientAuth::class]
    ],function (){
        Route::view('/','TinyCOM::client')->name('client');
        Route::group(['prefix' => 'server'],function (){
            Route::post('{item}/{action}',function($item,$action,Request $request){
                $controller = '\\Milestone\\Tinycom\\Controller\\' . ucfirst($item) . 'Controller';
                $method = $action;
                return call_user_func([new $controller,$method],$request);
            });
        });
    });

    Route::group([
        'prefix'        =>  'referrer',
        'middleware'    =>  [TinyCOMReferrerAuth::class]
    ],function (){
        Route::view('/','TinyCOM::referrer')->name('referrer');
        Route::group(['prefix' => 'server'],function (){
            Route::post('{item}/{action}',function($item,$action,Request $request){
                $controller = '\\Milestone\\Tinycom\\Controller\\' . ucfirst($item) . 'Controller';
                $method = $action;
                return call_user_func([new $controller,$method],$request);
            });
        });
    });

});

