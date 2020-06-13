<?php

namespace Milestone\Tinycom\Model;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Milestone\Tinycom\Cast\Json;
use Milestone\Tinycom\Controller\OrderController;
use Milestone\Tinycom\Controller\SubscriptionController;

class Order extends Model
{

    protected $guarded = [];
    protected $casts = ['status_log' => Json::class, 'attributes' => Json::class];

    protected static function booted(){
        parent::booted();
        static::updated(function(Order $order){
            if($order->wasChanged('status')){
                $status_log = (array) $order->status_log;
                $status_log[time()] = $order->status;
                if($order->status === 'Paid'){
                    SubscriptionController::OrderPaid($order->id);
                    OrderController::OverrideCompanyNewSubscriptionOrders($order->company);
                }
//                Order::where('id',$order->id)->update(compact('status_log'));
                DB::table('orders')->where('id',$order->id)->update(['status_log' => json_encode($status_log)]);
            }
        });
    }

    public function Company(){ return $this->belongsTo(Company::class,'company','id'); }
    public function Subscription(){ return $this->hasOne(Subscription::class,'reference_order','id'); }
    public function Payment(){ return $this->hasOne(Payment::class,'order','id'); }
}
