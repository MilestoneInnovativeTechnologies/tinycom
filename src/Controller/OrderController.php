<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Milestone\Tinycom\Model\Order;

class OrderController extends Controller
{

    public function create(Request $request){
        $data = $request->only(['company','type','amount']); $data['date'] = now()->toDateTimeString(); $data['status'] = 'New'; $data['status_log'] = [time() => 'New'];
        $data['attributes'] = $request->all(); $data['attributes']['amount'] = floatval($data['amount']) * 100;
        if($data['type'] === 'Subscription'){
            $calculations = SubscriptionController::calculate($request->input('edition'),$request->input('unit'),$request->input('period'),$request->input('start'));
            $data['attributes']['end'] = $calculations['end'];
        }
        $order = new Order($data); $order->save();
        if($request->input('reference') && $request->input('link')){
            $reference = $request->input('reference');
            $link = $request->input('link');
        } else {
            $customer = $request->only(['name','email','contact']);
            $line_items = [['name' => $data['attributes']['item'],'amount' => $data['attributes']['amount'],'currency' => config('tinycom.currency')]];
            $ORDER = (new PaymentController())->newOrder($order->id,$data['attributes']['description'],$line_items,$customer,$data['attributes']);
            $reference = $ORDER['id']; $link = $ORDER['short_url'];
        }
        $order->update(compact('reference','link'));
        return self::Data($order,'New Order Created Successfully!!');
    }

    public function notify(Request $request){
        $invoice = Order::find($request->input('id'))->reference;
        return (new PaymentController())->notify($invoice,$request->input('medium'));
    }

    public function cancel(Request $request){
        $order = Order::find($request->input('id'));
        $order->status = 'Cancelled'; $order->save();
        (new PaymentController())->cancel($order->reference);
        return self::Data($order,'Order status marked as cancelled..');
    }

    public function fetch(Request $request){
        return self::Data(Order::whereIn('status',['New','Paid'])->get());
    }

    public static function OrderPaid($order_id){
        $order = Order::find($order_id);
        $order->status = 'Paid'; $order->save();
    }

    public static function OverrideCompanyNewSubscriptionOrders($company){
        $query = Order::where(['company' => $company, 'status' => 'New', 'type' => 'Subscription']);
        if($query->exists()) $query->get()->each(function($order){ $order->status = 'Overridden'; $order->save(); });
    }

}
