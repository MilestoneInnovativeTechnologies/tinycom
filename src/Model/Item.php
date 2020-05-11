<?php

namespace Milestone\Tinycom\Model;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Item extends Model implements HasMedia
{
    use InteractsWithMedia;

    static public $UpdatedCacheName = 'item_last_updated';

    protected $with = ['media'];
    protected $hidden = ['created_at'];
    protected $guarded = [];

    protected static function booted(){
        static::saved(function ($item) { cache()->put(self::$UpdatedCacheName,now()->toDateTimeString()); });
    }

    public function Categories(){
        return $this->belongsToMany(Category::class,'category_items','item','category');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('items')
            ->singleFile()
            ->registerMediaConversions(function(Media $media){
                $this->addMediaConversion('thumbnail')->width(128)->height(128)->sharpen(10);
                $this->addMediaConversion('detail')->width(256)->height(256)->sharpen(10);
            });
    }
}
