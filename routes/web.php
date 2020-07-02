<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Milestone\Tinycom\Model\Company;
use Milestone\Tinycom\Model\Subscription;

Route::group([

    'namespace'     => 'Milestone\\Tinycom\\Controller',

],function(){

    Route::post(config('tinycom.webhook.path'),'PaymentController@ProcessPayment')->name('tinycom.webhook.path');
    Route::get('cache/reset',function(){
        Cache::forget(config('tinycom.cache_key')); Cache::forget(config('tinycom.subscription_cache_key'));
        Cache::rememberForever(config('tinycom.cache_key'),function(){
            return Company::all()->map(function($company){ return $company->makeVisible('database','database_username','database_password','code'); })->keyBy->domain->toArray();
        });
        Cache::rememberForever(config('tinycom.subscription_cache_key'),function(){
            return Subscription::with(['Company' => function($Q){ $Q->select('id','domain'); },'Edition' => function($Q){ $Q->select('id','name'); }])
                ->select('start','end','company','id','status','edition')
                ->whereIn('status',['Current','Upcoming'])
                ->orWhere(function($Q){
                    $Q->where('status','Expired')
                        ->where('end','>',now()->subDays(config('tinycom.free_subscription_expire'))->toDateTimeString());
                })
                ->get()
                ->groupBy(function($sub){ return $sub->Company->domain; })
                ->toArray();
        });

    });

    Route::group([

        'middleware'    =>  ['web'],

    ],function(){

        Route::get('/',function(){ return view(!empty(config('tinycom.index')) ? config('tinycom.index') : 'TinyCOM::index'); })->name('index');

        Route::post('register','LoginController@register')->name('register');

        Route::match(['post','get'],'login','LoginController@login')->name('login');
        Route::get('logout',function (){ Auth::logout(); return redirect()->route('index'); })->name('logout');

    });

});
