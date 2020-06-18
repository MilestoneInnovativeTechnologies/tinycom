<?php

namespace Milestone\Tinycom\Model;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Milestone\Tinycom\Mail\NewCompany;

class Company extends Model
{
    protected static function booted(){
        static::saved(function(){ Cache::forget(config('tinycom.cache_key')); Cache::rememberForever(config('tinycom.cache_key'),function(){ return Company::all()->map(function($company){ return $company->makeVisible('database','database_username','database_password','code'); })->keyBy->domain->toArray(); }); });
        static::created(function($company){ Mail::to(config('tinycom.new_company_inform_mail'))->send(new NewCompany($company->id)); });
        if(Auth::check() && in_array(Auth::user()->type,['client','referrer'])){
            static::addGlobalScope('own', function (Builder $builder) {
                $field = Auth::user()->type === 'referrer' ? 'referrer' : 'user'; $value = Auth::id();
                $builder->where(function($Q)use($field,$value){ $Q->where($field,$value); });
            });
        }
    }

    public static $LogoImageCache = CODE . '_LOGO';
    public static $LogoStoreDiskName = 'logo';

    protected $guarded = [];
    protected $hidden = ['password','database_password','database_username','code','database'];

    public function setCodeAttribute(){
        $this->attributes['code'] = self::getCode();
    }

    public static function getCode(){
        $stt = time();
        $A = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        $Y = $A[(date('Y',$stt) - 2020)%count($A)];
        $D = $A[(date('z',$stt)%count($A))];
        $H = $A[date('G',$stt)];
        $PRE = $Y.$D.$H; $LEN = 3;
        $LC = Company::withoutGlobalScopes()->where('code',"REGEXP","^" . $PRE . "[0-9]{" . $LEN . "}$")->max('code');
        $next = ($LC) ? intval(mb_substr($LC,strlen($PRE)))+1 : 1;
        return $PRE . sprintf("%0" . $LEN . "d", $next);
    }

    public function User(){ return $this->belongsTo(User::class,'user','id'); }
    public function Referrer(){ return $this->belongsTo(User::class,'referrer','id'); }
    public function Subscriptions(){ return $this->hasMany(Subscription::class,'company','id'); }
    public function Orders(){ return $this->hasMany(Order::class,'company','id'); }
    public function Editions(){ return $this->belongsToMany(Edition::class,'subscriptions','company','edition')->wherePivot('status','Current'); }
    public function Payments(){ return $this->hasManyThrough(Payment::class,Order::class,'company','order'); }
}
