<?php

namespace Milestone\Tinycom\Model;

use Illuminate\Support\Str;
use Milestone\Tinycom\Controller\CartController;

class Cart extends Model
{
    protected static function booted(){
        static::saved(function ($cart) {
            if($cart->wasChanged('status')){
                CartController::removeOrder($cart->id);
                if($cart->status === 'Cancelled'){
                    $items = $cart->Items->mapWithKeys(function($item){ return [ $item->item => $item->quantity ]; })->toArray();
                    Item::find(array_keys($items))->each(function($item)use($items){ $item->increment('stock',$items[$item->id] ?? 0); });
                }
                if($cart->status === 'Ordered'){ CartController::addOrder($cart->id); }
            }
        });
    }


    public static $SessionName = CODE . '_Cart';
    public static $CacheName = CODE . '_' . 'carts';
    public static $CacheOrders = CODE . '_' . 'orders';
    public static $CacheOrderLatest = CODE . '_' . 'latest_order';
    public static $CacheExpire = 3*60;
    public static $DBExpire = 2*24*60*60;

    protected $guarded = [];
    protected $with = ['Items'];

    public function Items(){
        return $this->hasMany(CartItem::class,'cart','id');
    }

    public function Source(){
        return $this->belongsTo(Source::class,'source','id');
    }

    public function Customer(){
        return $this->belongsTo(Customer::class,'customer','id');
    }

    public function setUuidAttribute(){
        $this->attributes['uuid'] = Str::uuid()->toString();
    }
    public function getUuidAttribute($value){
        return is_string($value) ? $value : $value->toString();
    }
}
