<?php

Route::group([
    'namespace'     => 'Milestone\\Tinycom\\Controller',
    'middleware'    =>  'web'
],function(){

    Route::group([
        'prefix'    =>  'user'
    ],function(){
        Route::post('login','CustomerController@login');
        Route::get('logout','CustomerController@logout');
        Route::post('update','CustomerController@update');
    });

    Route::group([
        'prefix'    =>  'cart'
    ],function(){
        Route::post('sync','CartController@sync');
        Route::post('order','CartController@order');
    });

    Route::group([
        'prefix'    =>  'item'
    ],function(){
        Route::post('sync','ItemController@sync');
    });

    Route::group([
        'prefix'    =>  'source'
    ],function(){
        Route::get('hit/{uuid}','SourceController@hit');
        Route::post('fetch','SourceController@fetch');
    });

    Route::get('s/{uuid}','SourceController@visit')->name('source_link');
    Route::get('b/{uuid}','CartController@bill')->name('bill_link');
    Route::get('pack','HomeController@pack');
    Route::view('r','TinyCOM::redirect')->name('redirect');
    Route::get('/','HomeController@index')->name('home');

    //DEBUGS
    Route::get('debug',function(){

        \Milestone\Tinycom\Controller\CartController::removeOrder(10);
        \Milestone\Tinycom\Controller\CartController::removeOrder(13);
        \Milestone\Tinycom\Controller\CartController::removeOrder(14);

//        session()->forget('TinyCOM_Cart');
//        cache()->forget('carts');
        $caches = [
            \Milestone\Tinycom\Model\Cart::$CacheName,
            \Milestone\Tinycom\Model\Cart::$CacheOrders,
            \Milestone\Tinycom\Model\Cart::$CacheOrderLatest,
            \Milestone\Tinycom\Model\Customer::$CacheForLive,
            \Milestone\Tinycom\Model\Item::$UpdatedCacheName,
            \Milestone\Tinycom\Model\Source::$CreatedCacheName
        ];
        dump('Cache');
        foreach($caches as $cache) dump($cache, cache()->get($cache));
        dd('Session',session()->all(),'Cookie',request()->cookies->all());

    });

});


Route::group([

    'namespace'     => 'Milestone\\Tinycom\\Controller',
    'prefix'        =>  'admin',
    'middleware'    =>  'web'

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
    });

    Route::group([
        'prefix'    =>  'category'
    ],function(){
        Route::post('create','CategoryController@create');
    });

    Route::group([
        'prefix'    =>  'api'
    ],function(){
        Route::post('category/{id}/update','CategoryController@update');
        Route::post('item/{id}/update','ItemController@update');
    });

});

