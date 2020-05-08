<?php

namespace Milestone\Tinycom;

use Illuminate\Support\ServiceProvider;

class TinycomServiceProvider extends ServiceProvider
{

    private static $root = __DIR__ . '\\..\\';
    private static $configKeys = ['filesystems.disks'];

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
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
        } else {
            $this->loadViews();
            $this->loadRoutes();
        }
    }


    private static function getRoot($folder = null,$file = null){
        $path = ($folder ? "$folder\\" : "") . ($file ? "$file" : '');
        return self::$root . $path;
    }
    private function mergeConfigs(){ foreach (self::$configKeys as $key) $this->mergeConfigFrom(self::getRoot('config',"$key.php"),$key); }
    private function loadMigrations(){ $this->loadMigrationsFrom(self::getRoot('migrations')); }
    private function loadViews(){ $this->loadViewsFrom(self::getRoot('views'), 'TinyCOM'); }
    private function loadRoutes(){ $this->loadRoutesFrom(self::getRoot('routes','web.php')); }
}
