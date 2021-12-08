<?php

namespace Milestone\Tinycom;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Milestone\Tinycom\Model\Subscription;

class TinycomServiceProvider extends ServiceProvider
{

    private static $root = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR;
    private static $configKeys = ['filesystems.disks','tinycom'];

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $host = request()->getHost(); $parts = self::getDomainParts($host);
        define('ACCESSING',($parts['own']) ? 'VENDOR' : 'CLIENT');
        define('HOST',$host); define('DOMAIN',$parts['domain']); define('SUB',$parts['sub']);
        $this->mergeConfigs();
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadMigrations(strtolower(ACCESSING));
        if(app()->runningInConsole()){
            $this->publishConfig();
            $this->publishAssets();
        } else {
            $this->loadViews();
            $this->loadRoutes('web',strtolower(ACCESSING));
            self::subscriptionsRearrange();
        }
    }


    private static function getRoot($folder = null,$file = null){
        $path = ($folder ? ("$folder" . DIRECTORY_SEPARATOR) : "") . ($file ? "$file" : '');
        return self::$root . $path;
    }
    private function publishConfig(){ $this->publishes([self::getRoot('config','tinycom.php') => config_path('tinycom.php')]); }
    private function mergeConfigs(){ foreach (self::$configKeys as $key) $this->mergeConfigFrom(self::getRoot('config',"$key.php"),$key); }
    private function loadMigrations($access){ $this->loadMigrationsFrom(self::getRoot('migrations' . DIRECTORY_SEPARATOR . $access)); }
    private function loadViews(){ $this->loadViewsFrom(self::getRoot('views'), 'TinyCOM'); }
    private function loadRoutes(...$files){ foreach ($files as $filename) $this->loadRoutesFrom(self::getRoot('routes', ($filename . '.php'))); }
    private function publishAssets(){ $this->publishes([self::getRoot('assets') => public_path('/')]); }

    private static function getDomainParts($host){
        $domains = config('tinycom.domains',[]); $domain = $sub = '';
        if(empty($domains) || in_array($host,$domains)) return ['domain' => $host, 'sub' => '', 'own' => true]; $own = false;
        $parts = explode(".",$host); $loop = count($parts);
        while(--$loop >= 0){
            $sub = implode(".",array_slice($parts,0,$loop)); $domain = implode(".",array_slice($parts,$loop));
            if(in_array($domain,$domains)) break;
        }
        return compact('domain','sub','own');
    }

    private static function subscriptionsRearrange(){
        if(empty(config('tinycom.name'))) return;
        $lastUpdated = Carbon::parse(Cache::get(Subscription::$CacheSubscriptionCheckDate, Carbon::yesterday()->toDateTimeString()));
        if ($lastUpdated->lessThan(now()->startOfDay())) {
            $subscriptions = Subscription::where('end', '<', now()->startOfDay()->toDateTimeString())->where('status', 'Current');
            if ($subscriptions->exists())
                $subscriptions->get()->each(function ($subscription) {
                    $subscription->status = 'Expired';
                    $subscription->save();
                });
            $subscriptions = Subscription::where('start', '<', now()->endOfDay()->toDateTimeString())->where('status', 'Upcoming');
            if ($subscriptions->exists())
                $subscriptions->get()->each(function ($subscription) {
                    $subscription->status = 'Current';
                    $subscription->save();
                });
            Cache::put(Subscription::$CacheSubscriptionCheckDate, now()->toDateTimeString());
            DB::disconnect();
        }
    }
}
