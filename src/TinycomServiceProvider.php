<?php

namespace Milestone\Tinycom;

use Illuminate\Support\ServiceProvider;

class TinycomServiceProvider extends ServiceProvider
{

    private static $root = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR;
    private static $configKeys = ['filesystems.disks'];

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $hosts = explode('.',request()->getHost()); array_pop($hosts); $domain = implode('.',$hosts);
        if(!defined('DOMAIN')) define('DOMAIN',$domain);
        $this->mergeConfigs();
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        if(app()->runningInConsole()){
            $this->loadMigrations();
            $this->publishAssets();
        } else {
            $this->loadViews();
            $this->loadRoutes();
        }
    }


    private static function getRoot($folder = null,$file = null){
        $path = ($folder ? ("$folder" . DIRECTORY_SEPARATOR) : "") . ($file ? "$file" : '');
        return self::$root . $path;
    }
    private function mergeConfigs(){ foreach (self::$configKeys as $key) $this->mergeConfigFrom(self::getRoot('config',"$key.php"),$key); }
    private function loadMigrations(){ $this->loadMigrationsFrom(self::getRoot('migrations')); }
    private function loadViews(){ $this->loadViewsFrom(self::getRoot('views'), 'TinyCOM'); }
    private function loadRoutes(){ $this->loadRoutesFrom(self::getRoot('routes','web.php')); }
    private function publishAssets(){ $this->publishes([self::getRoot('assets') => public_path('/')]); }
}
