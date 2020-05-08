<?php

namespace Milestone\Tinycom\Model;

class CategoryItem extends Model
{
    public function Item(){
        return $this->belongsTo(Item::class,'item','id');
    }
    public function Category(){
        return $this->belongsTo(Category::class,'category','id');
    }
}
