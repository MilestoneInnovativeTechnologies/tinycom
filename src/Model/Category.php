<?php

namespace Milestone\Tinycom\Model;

use Spatie\MediaLibrary\Models\Media;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Category extends Model implements HasMedia
{
    use HasMediaTrait;
    protected $hidden = ['created_at','updated_at'];
    protected $with = ['media'];

    public function Items(){
        return $this->belongsToMany(Item::class,'category_items','category','item');
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('categories')
            ->singleFile()
            ->registerMediaConversions(function(Media $media){
                $this->addMediaConversion('thumbnail')->width(128)->height(128)->sharpen(10)->performOnCollections('categories');
                $this->addMediaConversion('detail')->width(256)->height(256)->sharpen(10)->performOnCollections('categories');
            });
    }

}
