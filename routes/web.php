<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'domain'        => '{sub}.' . config('tinycom.domain'),
    'middleware'    =>  ['web',\Milestone\Tinycom\Middleware\TinyCOMCompany::class]
],function () {

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

        Route::get('setup','SetupController@setup');
        Route::get('s/{uuid}','SourceController@visit')->name('source_link');
        Route::get('b/{uuid}','CartController@bill')->name('bill_link');
        Route::get('pack','HomeController@pack');
        Route::view('r','TinyCOM::redirect')->name('redirect');
        Route::get('/','HomeController@index')->name('home');

        //DEBUGS
        Route::get('debug',function(){

            //        session()->forget('TinyCOM_Cart');
//        cache()->forget('carts');
            $caches = [
                \Milestone\Tinycom\Model\Cart::$CacheName,
                \Milestone\Tinycom\Model\Cart::$CacheOrders,
                \Milestone\Tinycom\Model\Cart::$CacheOrderLatest,
                \Milestone\Tinycom\Model\Customer::$CacheForLive,
                \Milestone\Tinycom\Model\Item::$UpdatedCacheName,
                \Milestone\Tinycom\Model\Source::$CreatedCacheName,
                config('tinycom.cache_key'),
            ];
            dump('Cache');
            foreach($caches as $cache) dump($cache, cache()->get($cache));
            dd('Session',session()->all(),'Cookie',request()->cookies->all());

        });

    });


    Route::match(['get','post'],'/admin/login',function(\Illuminate\Http\Request $request){
        \Illuminate\Support\Facades\Auth::logout();
        if($request->getMethod() !== 'POST') return view('TinyCOM::login');
        \Illuminate\Support\Facades\Auth::attempt(['name' => 'admin','password' => $request->input('password')]);
        return  redirect()->route('admin',['sub' => SUB]);
    })->middleware('web')->name('admin.login');

    Route::group([

        'namespace'     => 'Milestone\\Tinycom\\Controller',
        'prefix'        =>  'admin',
        'middleware'    =>  ['web',\Milestone\Tinycom\Middleware\TinyCOMAuth::class]

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

Route::group([

    'domain'        => config('tinycom.domain'),
    'namespace'     => 'Milestone\\Tinycom\\Controller',
    'middleware'    => 'web'

],function () {

    Route::get('/',function(){ return view(!empty(config('tinycom.index')) ? config('tinycom.index') : 'TinyCOM::index'); })->name('index');
    Route::post('register','CompanyController@register')->name('register');
    Route::match(['post','get'],'login','CompanyController@login')->name('company.login');
    Route::get('logout',function (){ \Illuminate\Support\Facades\Auth::logout(); return redirect()->route('index'); })->name('company.logout');
    Route::match(['get','post'],'portal','CompanyController@portal')->name('company.portal');
    Route::match(['get','post'],'admin','CompanyController@admin')->name('company.admin');

});

/*
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


Route::match(['get','post'],'/admin/login',function(\Illuminate\Http\Request $request){
    \Illuminate\Support\Facades\Auth::logout();
    if($request->getMethod() !== 'POST') return view('TinyCOM::login');
    \Illuminate\Support\Facades\Auth::attempt(['name' => 'admin','password' => $request->input('password')]);
    return  redirect()->route('admin');
})->middleware('web')->name('admin.login');

Route::group([

    'namespace'     => 'Milestone\\Tinycom\\Controller',
    'prefix'        =>  'admin',
    'middleware'    =>  ['web',\Milestone\Tinycom\Middleware\TinyCOMAuth::class]

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

*/