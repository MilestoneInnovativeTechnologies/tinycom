<?php

namespace Milestone\Tinycom\Model;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Category extends Model implements HasMedia
{
    use InteractsWithMedia;
    protected $hidden = ['created_at','updated_at'];
    protected $with = ['media'];
    protected $guarded = [];

    public function Items(){
        return $this->belongsToMany(Item::class,'category_items','category','item');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('categories')
            ->singleFile()
            ->registerMediaConversions(function(Media $media){
                $this->addMediaConversion('thumbnail')->width(128)->height(128)->sharpen(10);
                $this->addMediaConversion('detail')->width(256)->height(256)->sharpen(10);
            });
    }

}
