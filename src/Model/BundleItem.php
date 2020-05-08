<?php

namespace Milestone\Tinycom\Model;

class BundleItem extends Model
{
    public function Item(){
        return $this->belongsTo(Item::class,'item','id');
    }
}
