<?php

namespace Milestone\Tinycom\Model;

class CartItem extends Model
{
    protected $guarded = [];

    protected static function booted(){
        static::created(function ($cart_item) {
            $id = $cart_item['item']; $quantity = $cart_item['quantity'];
            Item::find($id)->decrement('stock',$quantity);
        });
    }
    public function Item(){
        return $this->belongsTo(Item::class,'item','id');
    }
}
