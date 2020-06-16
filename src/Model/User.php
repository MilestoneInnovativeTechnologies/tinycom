<?php

namespace Milestone\Tinycom\Model;

use App\User as BaseUser;

class User extends BaseUser
{

    protected static $unguarded = true;

    protected $hidden = ['password','type'];

    //public function setPasswordAttribute($password){ $this->attributes['password'] = Hash::make($password); }

    public function Companies(){ return $this->hasMany(Company::class,'user','id'); }
    public function Companies2(){ return $this->hasMany(Company::class,'referrer','id'); }
}
