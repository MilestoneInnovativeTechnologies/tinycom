<?php

namespace Milestone\Tinycom\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class TinyCOMClientAuth
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
        if(!Auth::check() || Auth::user()->type !== 'client') return redirect()->route('login');
        return $next($request);
    }
}
