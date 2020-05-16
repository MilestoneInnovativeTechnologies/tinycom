<?php

namespace Milestone\Tinycom\Model;

class Customer extends Model
{

    public static $CookieName = DOMAIN . '_' . 'TinyCOM_Customer';
    public static $CacheForLive = DOMAIN . '_' . 'TinyCOM_Customer_Live';
    public static $LiveTime = 120;

    protected $guarded = [];

    public function Carts(){
        return $this->hasMany(Cart::class,'customer','id');
    }
}
