<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Milestone\Tinycom\Model\Company;
use Milestone\Tinycom\Model\Order;
use Milestone\Tinycom\Model\Payment;

class PaymentController extends Controller
{

    public function newOrder($receipt,$description,$line_items,$customer,$notes){ return (new RazorPayController())->newOrder($receipt,$description,$line_items,$customer,$notes); }
    public function notify($invoice,$medium){ return (new RazorPayController())->notify($invoice,$medium); }
    public function cancel($invoice){ return (new RazorPayController())->cancel($invoice); }
    public function ProcessPayment(Request $request){ return $request->getContent() ? (new RazorPayController())->ProcessPayment($request) : ''; }

    public function fetch(){
        if(Auth::user()->type === 'company') return self::Data(Payment::all());
        $companies = Company::pluck('id')->toArray(); $orders = Order::whereIn('company',$companies)->pluck('id')->toArray();
        return self::Data(Payment::whereIn('order',$orders)->get());
    }

    public function manual(Request $request){
        $data = $request->only(['order','order_reference','amount','attachment']); $data['date'] = now()->toDateTimeString();
        $payment = new Payment($data); $payment->save();
        return self::Data($payment->refresh(),'Payment added successfully!!');
    }

}
