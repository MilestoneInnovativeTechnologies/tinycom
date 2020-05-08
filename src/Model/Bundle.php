<?php

namespace Milestone\Tinycom\Model;

class Bundle extends Model
{
    public function Items(){
        return $this->hasMany(BundleItem::class,'bundle','id');
    }
}
