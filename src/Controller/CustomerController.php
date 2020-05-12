<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Cookie;
use Milestone\Tinycom\Model\Cart;
use Milestone\Tinycom\Model\Customer;
use Milestone\Tinycom\Model\Source;

class CustomerController extends Controller
{

    public function login(Request $request){
        $customer = Customer::where('phone',$request->get('phone'))->first();
        if(!$customer) $customer  = $this->registerUser($request,true);
        else $customer->update(['live' => time()]);

        if($customer->phone == $customer->name && $request->filled('name') && $request->get('name') != $customer->name) $this->updateCustomerName($customer,$request->get('name'));
        if($customer->name != $request->get('name')) $this->changeNameSuggestion($customer,$request->get('name'));

        $this->manageCart($request,$customer);
        $this->manageSource($request,$customer);

        $customer = Customer::find($customer->id); self::queueCookie($customer->id);
        return $customer;
    }

    public function registerUser(Request $request, $live = true){
        $customer = new Customer;
        if($request->get('phone')) $customer->phone = $request->get('phone');
        $customer->name = $request->filled('name') ? $request->get('name') : $request->get('phone');
        if($live) $customer->live = time(); $customer->save(); return $customer;
    }

    public function create(Request $request){
        return $this->registerUser($request,false);
    }

    public function adminUpdate(Request $request){
        Customer::where('id',$request->id)->update($request->only(['phone','name']));
        return Customer::find($request->id);
    }

    public function updateCustomerName($customer,$name){
        $customer->name = $name; $customer->save();
    }

    public function changeNameSuggestion($customer,$name){
        $customer->name_change = $name; $customer->save();
    }

    public function manageCart($request,$customer){
        if($request->cookie(Customer::$CookieName)) return session()->forget(Cart::$SessionName);

        $current_cart_id = session()->get(Cart::$SessionName)['id'];
        $cart = Cart::find($current_cart_id);
        $cart->update(['customer' => $customer->id,'time' => time()]);

        $cart = session()->get(Cart::$SessionName);
        $cart['customer'] = $customer->id;
        session()->put(Cart::$SessionName,$cart);

        $carts = Cache::get(Cart::$CacheName);
        if(array_key_exists($cart['uuid'],$carts)) {
            $carts[$cart['uuid']] = array_merge($carts[$cart['uuid']], ['customer' => $customer->id, 'time' => time()]);
            Cache::put(Cart::$CacheName, $carts);
        }
    }

    public function manageSource($request,$customer){
        if(session()->has(Source::$SessionName) && $uuid = session()->get(Source::$SessionName)){
            if(session()->get(Source::$SessionSourceLogin)){
                $source = Source::where(['uuid' => $uuid, 'active' => 'Y'])->first();
                if($source && !$source->expired){
                    session()->put(Source::$SessionSourceItems,(!$source->customers || empty($source->customers) || in_array($customer->id,$source->customers)) ? $source->items : []);
                } else {
                    session()->put(Source::$SessionSourceItems,[]);
                }
            }
        } else session()->forget(Source::$SessionName);
    }

    public static function queueCookie($customer){
        Cookie::queue(Cookie::make(Customer::$CookieName, $customer, 5*24*60));
    }

    public function logout(){
        Cookie::queue(Cookie::make(Customer::$CookieName, 0, -1));
        return redirect()->route('home');
    }

    public function update(Request $request){
        $id = $request->cookie(Customer::$CookieName);
        $customer = Customer::find($id); $phone = $request->get('phone');
        $customer_same_phone = Customer::where('phone',$phone)->where('id','!=',$customer->id)->exists();
        if($customer_same_phone) return 'Customer with same phone exists.';
        $customer->phone = $phone; $customer->name = $request->get('name'); $customer->live = time(); $customer->name_change = null;
        $customer->save(); return $customer;
    }

    public static function live($customer = null){
        $customer = $customer ?? \request()->cookie(Customer::$CookieName);
        $live_customers = Cache::get(Customer::$CacheForLive,[]);
        $time = time(); $expired = $time - Customer::$LiveTime;
        if($customer) $live_customers[$customer] = $time;
        $live_customers = array_filter($live_customers,function($time)use($expired){ return $time > $expired; });
        Cache::put(Customer::$CacheForLive,$live_customers);
    }

    public static function online(){
        return Cache::get(Customer::$CacheForLive);
    }

    public function fetch(Request $request){
        $customer = $request->input('id');
        return Customer::find($customer);
    }

}
