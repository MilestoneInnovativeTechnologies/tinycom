<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Milestone\Tinycom\Model\Cart;
use Milestone\Tinycom\Model\CartItem;
use Milestone\Tinycom\Model\Customer;
use Milestone\Tinycom\Model\Source;

class CartController extends Controller
{

    public static function GetCreateCart($customer = null,$source = null){
        Cart::where('time','<',time() - Cart::$DBExpire)->where(['status' => 'New'])->delete();
        $source_id = $source ? Arr::get(Source::where('uuid',$source)->first(),'id') : null;

        $has = session()->has(Cart::$SessionName);
        if($has) {
            $cartArray = session()->get(Cart::$SessionName);
            if($customer) $cartArray['customer'] = $customer;
            if($source) $cartArray['source'] = $source;
            self::SessionStoreCart($cartArray);
            return $cartArray;
        }

        $cart = Cart::where(['customer' => $customer,'status' => 'New'])->first();

        if(!$cart){
            $cart = Cart::create(['uuid' => null, 'customer' => $customer, 'source' => $source_id, 'time' => time()]);
            $cart->load('Items');
        } else {
            $cart->time = time();
            $cart->source = $source_id;
            if($customer) $cart->customer = $customer;
            $cart->save();
        }
        $cartArray = $cart->toArray(); $cartArray['source'] = $source; self::SessionStoreCart($cartArray);

        return $cartArray;
    }

    public static function SessionStoreCart($cart){
        session()->put(Cart::$SessionName,$cart);
    }

    public function sync(Request $request){
        $cart = self::GetCreateCart();
        $cart['items'] = $request->get('items'); $cart['amount'] = count($cart['items']) ? array_sum(array_column($cart['items'],'amount')) : 0;
        self::SessionStoreCart($cart); self::cache($cart); CustomerController::live($request->cookie(Customer::$CookieName));
        return $cart;
    }

    public static function cache($cart){
        $cache_carts = Cache::get(Cart::$CacheName,[]);
        if(!array_key_exists($cart['uuid'],$cache_carts)) $cache_carts[$cart['uuid']] = $cart;
        $time = time(); $cache_carts[$cart['uuid']]['time'] = $time;
        $expire = Cart::$CacheExpire; $last = $time - $expire;
        $carts = array_filter($cache_carts,function($cart)use($time,$last){
            return $cart['time'] > $last;
        });
        Cache::put('carts',$carts);
    }

    public function order(Request $request){
        $uuid = $request->get('uuid'); $items = $request->get('items'); $customer = $request->cookie(Customer::$CookieName); $source = session()->get(Source::$SessionName);
        if(!$uuid || !$items || empty($items)) return ['error' => true, 'message' => 'No items or cart found in request!!'];
        $Cart = Cart::where('uuid',$uuid)->first(); if(!$Cart) return ['error' => true, 'message' => 'No cart exists !!'];
        $cart_items = []; $price = 0; $quantity = 1; $total = 0;
        foreach($items as $item){
            extract($item); $price = floatval($price); $quantity = floatval($quantity); $amount = $price * $quantity;
            $cart_items[] = new CartItem(compact('item','quantity','price','amount'));
            $total += floatval($amount);
        }
        $Cart->Items()->saveMany($cart_items);
        if($customer && !$Cart->customer) $Cart->customer = $customer;
        if($source && !$Cart->source) $Cart->source = Arr::get(Source::where('uuid',$source)->first(),'id');
        $Cart->status = 'Ordered'; $Cart->amount = $total; $Cart->time = time(); $Cart->save();
        self::removeCart($uuid); SourceController::ordered();
        return ['error' => false, 'message' => 'Order Placed successfully..'];
    }

    private static function removeCart($uuid){
        Cart::where(['customer' => request()->cookie(Customer::$CookieName),'status' => 'New'])->delete();
        session()->put(Cart::$SessionName,null); session()->forget(Cart::$SessionName);
        $carts = Cache::get('carts',[]);
        if(!empty($carts)){
            $expire = Cart::$CacheExpire; $time = time();
            $carts = array_filter($carts,function($cart)use($time,$expire,$uuid){
                return ($time - $cart['time']) <= $expire && $uuid !== $cart['uuid'];
            });
        }
        Cache::put('carts',$carts);
    }

    public function confirm(Request $request){
        $id = $request->input('id');
        $Cart = Cart::find($id); if(!$Cart) return ['error' => true, 'message' => 'Order not found'];
        if($Cart->status !== 'Ordered') return ['error' => true, 'message' => 'This is not an order'];
        $Cart->status = 'Confirmed'; $Cart->time = time(); $Cart->confirmed_at = date('Y-m-d H:i:s');
        $Cart->save(); return ['error' => false, 'message' => 'Successfully marked as confirmed', 'cart' => $Cart];
    }

    public function cancel(Request $request){
        $id = $request->input('id');
        $Cart = Cart::find($id); if(!$Cart) return ['error' => true, 'message' => 'Order not found'];
        if($Cart->status != 'Ordered') return ['error' => true, 'message' => 'This is not an order'];
        $Cart->status = 'Cancelled'; $Cart->reason = $request->input('reason'); $Cart->time = time();
        $Cart->save(); return ['error' => false, 'message' => 'Successfully marked as cancelled', 'cart' => $Cart];
    }

    public function bill($uuid){
        $bill = Cart::with(['Customer','Items.Item'])->whereNotIn('status',['New','Ordered','Cancelled'])->where('uuid',$uuid)->first();
        if(!$bill) return 'No bill exists'; return view('TinyCOM::bill')->with('bill',$bill);
    }

    public function online(){
        return Cache::get(Cart::$CacheName);
    }

}
