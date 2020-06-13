<?php

namespace Milestone\Tinycom\Model;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Milestone\Tinycom\Cast\Json;

class Edition extends Model
{
    protected $casts = ['features' => Json::class];
    public static $EditionCacheName = 'AppEditions';

    protected static function booted(){
        parent::booted();
        static::saved(function(){
            Cache::forget(self::$EditionCacheName);
            Cache::rememberForever(self::$EditionCacheName,function(){ return Edition::all()->mapWithKeys(function($edition){ return [$edition->id => Arr::only($edition,['name','amount_multiplier','active'])]; })->toArray(); });
        });
    }

    public function Subscriptions(){ return $this->hasMany(Subscription::class,'edition','id'); }
    public function Companies(){ return $this->belongsToMany(Company::class,'subscription','edition','company')->wherePivot('status','Current'); }
}
