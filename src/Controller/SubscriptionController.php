<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Milestone\Tinycom\Mail\ExpiredInfo;
use Milestone\Tinycom\Mail\ExpireInfo;
use Milestone\Tinycom\Model\Company;
use Milestone\Tinycom\Model\Edition;
use Milestone\Tinycom\Model\Order;
use Milestone\Tinycom\Model\Subscription;

class SubscriptionController extends Controller
{
    public function fetch(Request $request){
        return self::Data(Company::with(['Subscriptions' => function($Q){ $Q->with(['Edition' => function($q){ $q->select('id','name'); }]); }])->find($request->input('company'))->Subscriptions);
    }

    public function sendExpiringMail(Request $request){
        $subscription = Subscription::with('Company.User')->find($request->input('subscription'));
        $email = $subscription->Company->User->email;
        $status = Mail::to($email)->send(new ExpireInfo($subscription->id));
        return self::Data(compact('subscription','status'),'Expiring information mailed successfully!!');
    }

    public function sendExpiredMail(Request $request){
        $subscription = Subscription::with('Company.User')->find($request->input('subscription'));
        $email = $subscription->Company->User->email;
        $status = Mail::to($email)->send(new ExpiredInfo($subscription->id));
        return self::Data(compact('subscription','status'),'Expired notification mailed successfully!!');
    }

    public function next(Request $request){
        return Carbon::parse(Subscription::where('company',$request->input('company'))->where('active','Y')->max('end') ?? now()->subDay()->toDateString())->addDay()->toDateString();
    }

    public function calc(Request $request){
        $edition = $request->input('edition'); $start = $request->input('start'); $period = $request->input('period'); $unit = $request->input('unit');
        return self::calculate($edition,$unit,$period,$start);
    }

    public static function calculate($edition,$unit,$period,$start){
        $unit_multiplier = config('tinycom.tenures')[$unit]; $currency_multiplier = config('tinycom.currency_multipliers')[config('tinycom.currency')];
        $edition_multiplier = floatval(Arr::get(Cache::get(Edition::$EditionCacheName,[]),"$edition.amount_multiplier",1));
        $amount = $edition_multiplier * $period * $unit_multiplier * $currency_multiplier;
        $end = Carbon::parse($start)->addUnit($unit,intval($period))->toDateString();
        return compact('amount','end');
    }

    public static function OrderPaid($order_id){
        $order = Order::find($order_id); if(!$order || $order->type !== 'Subscription') return;
        $data = $order->attributes; $attrs = self::OrderAttrToSubscriptionAttr($data);
        $attrs['order'] = $order_id; (new Subscription($attrs))->save();
    }

    public static function OrderAttrToSubscriptionAttr($data){
        $attrs = Arr::only($data,['company','edition','start','end']);
        $attrs['start'] = Carbon::parse($attrs['start'])->startOfDay()->toDateTimeString();
        $attrs['end'] = Carbon::parse($attrs['end'])->endOfDay()->toDateTimeString();
        return $attrs;
    }

    public function all(){
        return self::Data(Company::with(['Subscriptions' => function($Q){
            $Q->with([
                'Edition' => function($q){ $q->select('id','name'); }
            ]);
        }])->get()->flatMap->Subscriptions->toArray());
    }

}
