<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Milestone\Tinycom\Model\Order;
use Milestone\Tinycom\Model\Payment;
use Razorpay\Api\Api;

class RazorPayController extends Controller
{
    private $api = null;

    public function __construct() {
        $this->api = new Api(config('tinycom.payment_gateway_api_key'),config('tinycom.payment_gateway_api_secret'));
    }

    public function newOrder($receipt,$description,$line_items,$customer,$notes){
        $type = 'invoice'; $view_less = 1; $reminder_enable = false; $sms_notify = 0; $email_notify = 0; $currency = config('tinycom.currency');
        $create = compact('type','view_less','line_items','description','customer','receipt','sms_notify','email_notify','notes');
        return $this->api->invoice->create($create);
    }

    public function notify($invoice,$medium){
        return $this->api->invoice->fetch($invoice)->notifyBy($medium);
    }

    public function cancel($invoice){
        $invoice = $this->api->invoice->fetch($invoice);
        if($invoice->status === 'issued') $invoice->cancel();
    }

    public function ProcessPayment(Request $request){
        $webhookBody = $request->getContent();
        $webhookSignature = $request->header(config('tinycom.webhook.signature_header'));
        $webhookSecret = config('tinycom.webhook.secret');
        $this->api->utility->verifyWebhookSignature($webhookBody, $webhookSignature, $webhookSecret);

        $requestId = $request->header(config('tinycom.webhook.request_id_header')); if(Payment::where('request_id',$requestId)->exists()) return self::webHookReturn();
        $content = json_decode($webhookBody,true); if($content['event'] !== 'invoice.paid') return self::webHookReturn();

        $create = ['request_id' => $requestId,'request' => $webhookBody,'date' => now()->toDateTimeString()];
        $create['reference'] = Arr::get($content,'payload.payment.entity.id');
        $create['order_reference'] = $order_ref = Arr::get($content,'payload.invoice.entity.id');
        $receipt = Arr::get($content,'payload.invoice.entity.receipt');
        if(Order::where('id',$receipt)->exists()) $create['order'] = $receipt;
        else if (Order::where('reference',$order_ref)->exists()) $create['order'] = Arr::get(Order::where('reference',$order_ref)->first(),'id');
        else if (Order::where('reference',$receipt)->exists()) $create['order'] = Arr::get(Order::where('reference',$receipt)->first(),'id');
        else return self::webHookReturn();
        $create['amount'] = intval(Arr::get($content,'payload.payment.entity.amount'))/100;
        $payment = new Payment($create); $payment->save();
        return self::webHookReturn();
    }

    public static function webHookReturn(){
        return response('',200);
    }

}
