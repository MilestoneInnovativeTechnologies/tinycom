<?php

namespace Milestone\Tinycom\Middleware;

use Closure;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;

class TinyCOMCompanyCodeDefine
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $domains = Cache::get(config('tinycom.cache_key'),[]);
        if(!array_key_exists(HOST,$domains)) return redirect()->route('unauthorized');

        if(!defined('COMPANY')) define('COMPANY',Arr::get($domains[HOST],'company'));
        if(!defined('CODE')) define('CODE',Arr::get($domains[HOST],'code'));

        $subscriptions = Cache::get(config('tinycom.subscription_cache_key'),[]);
        define('SUBSCRIPTIONS',Arr::get($subscriptions,HOST,[]));

        $settings['database.connections.' . CODE] = config('database.connections.' . config('database.default'));
        $details = array_combine(['database','username','password'],Arr::only($domains[HOST],['database','database_username','database_password']));
        foreach($details as $key => $value) $settings['database.connections.' . CODE . '.' . $key] = $value;
        config()->set($settings); config()->set('database.default',CODE);

        return $next($request);
    }
}
