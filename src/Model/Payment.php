<?php

namespace Milestone\Tinycom\Model;

use Milestone\Tinycom\Cast\PaymentAttachment;
use Milestone\Tinycom\Controller\OrderController;

class Payment extends Model
{

    protected $casts = ['attachment' => PaymentAttachment::class, 'request' => 'array'];
    protected $guarded = [];

    protected static function booted(){
        parent::booted();
        static::created(function(Payment $payment){
            OrderController::OrderPaid($payment->order);
        });
    }


    public function Subscription(){ return $this->hasOne(Subscription::class,'reference_payment','id'); }
    public function Order(){ return $this->belongsTo(Order::class,'order','id'); }
}
