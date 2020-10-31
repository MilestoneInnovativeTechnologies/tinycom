<?php

namespace Milestone\Tinycom\Model;

class Customer extends Model
{

    public static $CookieName = CODE . '_Customer';
    public static $CacheForLive = CODE . '_' . '_Customer_Live';
    public static $LiveTime = 120;

    protected $guarded = [];

    public function Carts(){ return $this->hasMany(Cart::class,'customer','id'); }
    public function Address(){ return $this->hasMany(Address::class,'customer','id'); }

}
