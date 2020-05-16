<?php

namespace Milestone\Tinycom\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class TinyCOMDomain
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
        $hosts = explode('.',request()->getHost()); array_pop($hosts); $domain = implode('.',$hosts);
        if(!defined('DOMAIN')) define('DOMAIN',$domain);
        return $next($request);
    }
}
