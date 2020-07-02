<?php

namespace Milestone\Tinycom\Model;

use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Milestone\Tinycom\Cast\Json;

class Subscription extends Model
{
    protected $guarded = [];
    public static $StatusActive = ['Current' => 'Y','Upcoming' => 'Y', 'Expired' => 'N', 'Cancelled' => 'N'];
    public static $CacheSubscriptionCheckDate = 'SubscriptionCheckDate';

    protected static function booted(){
        parent::booted();
        static::created(function(Subscription $subscription){
            $start = Carbon::parse($subscription->start)->startOfDay(); $status = ($start->greaterThan(now()->endOfDay())) ? 'Upcoming' : 'Current';
            $end = Carbon::parse($subscription->end)->endOfDay(); $status = ($end->lessThan(now()->startOfDay())) ? 'Expired' : $status;
            $status_log[time()] = $status; $active = self::$StatusActive[$status]; $status_log = json_encode($status_log);
            DB::table('subscriptions')->where('id',$subscription->id)->update(compact('status','status_log','active'));
        });
        static::updated(function(Subscription $subscription){
            if($subscription->wasChanged(['status'])){
                $status_log = Arr::get($subscription,'status_log',[]);
                $status_log[time()] = Arr::get($subscription,'status','Upcoming');
                $status_log = json_encode($status_log); $active = self::$StatusActive[Arr::get($subscription,'status','Upcoming')];
                DB::table('subscriptions')->where('id',$subscription->id)->update(compact('status_log','active'));
            }
        });
        static::saved(function(){
            Cache::forget(config('tinycom.subscription_cache_key'));
            Cache::rememberForever(config('tinycom.subscription_cache_key'),function(){
                return Subscription::with(['Company' => function($Q){ $Q->select('id','domain'); },'Edition' => function($Q){ $Q->select('id','name'); }])
                    ->select('start','end','company','id','status','edition')
                    ->whereIn('status',['Current','Upcoming'])
                    ->orWhere(function($Q){
                        $Q->where('status','Expired')
                            ->where('end','>',now()->subDays(config('tinycom.free_subscription_expire'))->toDateTimeString());
                    })
                    ->get()
                    ->groupBy(function($sub){ return $sub->Company->domain; })
                    ->toArray();
            });
        });
    }

    protected $casts = ['status_log' => Json::class];

    public function Edition(){ return $this->belongsTo(Edition::class,'edition','id'); }
    public function Company(){ return $this->belongsTo(Company::class,'company','id'); }
    public function Payment(){ return $this->belongsTo(Payment::class,'reference_payment','id'); }
    public function Order(){ return $this->belongsTo(Order::class,'reference_order','id'); }
}
