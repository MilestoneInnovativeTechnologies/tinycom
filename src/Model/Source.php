<?php

namespace Milestone\Tinycom\Model;

use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Source extends Model implements HasMedia
{

    use InteractsWithMedia;

    public static $SessionName = CODE . '_Source';
    public static $SessionSourceItems = CODE . '_SourceItems';
    public static $SessionSourceCustomers = CODE . '_SourceCustomers';
    public static $SessionSourceLogin = CODE . '_SourceLoginRequired';
    public static $CreatedCacheName = CODE . '_' . 'source_last_created';

    protected $with = ['media'];
    protected $guarded = [];
    protected $appends = ['expired'];

    protected static function booted(){
        static::saved(function ($source) { cache()->put(self::$CreatedCacheName,now()->toDateTimeString()); });
    }

    public function setUuidAttribute(){
        $this->attributes['uuid'] = Str::uuid()->toString();
    }
    public function getUuidAttribute($value){
        return is_string($value) ? $value : $value->toString();
    }
    public function getCustomersAttribute($value){ return self::getAttr($value ?? []); }
    public function getItemsAttribute($value){ return self::getAttr($value ?? []); }
    public function getCategoriesAttribute($value){ return self::getAttr($value ?? []); }
    public function getExpiredAttribute(){ return time() > $this->expire; }

    private static function getAttr($value){ return is_string($value) ? json_decode($value,true) : $value; }


    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('sources')
            ->singleFile()
            /*->registerMediaConversions(function(Media $media){
                $this->addMediaConversion('thumbnail')->width(128)->height(128)->sharpen(10)->performOnCollections('sources');
                $this->addMediaConversion('detail')->width(256)->height(256)->sharpen(10)->performOnCollections('items');
            })*/;
    }

}
