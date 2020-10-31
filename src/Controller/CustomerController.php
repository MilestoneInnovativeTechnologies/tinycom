<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Cookie;
use Milestone\Tinycom\Model\Address;
use Milestone\Tinycom\Model\Cart;
use Milestone\Tinycom\Model\Customer;
use Milestone\Tinycom\Model\Group;
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

        $customer = Customer::with('Address')->find($customer->id); self::queueCookie($customer->id); self::live($customer->id);
        return $customer;
    }

    public function registerUser(Request $request, $live = true){
        $customer = new Customer;
        if($request->get('phone')) $customer->phone = $request->get('phone');
        $customer->name = $request->filled('name') ? $request->get('name') : $request->get('phone');
        $customer->address = $request->get('address',null);
        if($live) $customer->live = time(); $customer->save(); return $customer;
    }

    public function create(Request $request){
        return $this->registerUser($request,false);
    }

    public function adminUpdate(Request $request){
        Customer::where('id',$request->id)->update($request->only(['phone','name','address']));
        return Customer::with(['Address'])->find($request->id);
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
        self::live_off(\request()->cookie(Customer::$CookieName));
        return redirect()->route('home');
    }

    public function update(Request $request){
        $id = $request->cookie(Customer::$CookieName);
        $customer = Customer::with('Address')->find($id); $phone = $request->get('phone');
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

    public static function live_off($customer){
        $live_customers = Cache::get(Customer::$CacheForLive,[]);
        if(isset($live_customers[$customer])) unset($live_customers[$customer]);
        $time = time(); $expired = $time - Customer::$LiveTime;
        $live_customers = array_filter($live_customers,function($time)use($expired){ return $time > $expired; });
        Cache::put(Customer::$CacheForLive,$live_customers);
    }

    public static function online(){
        return Cache::get(Customer::$CacheForLive);
    }

    public function fetch(Request $request){
        $customer = $request->input('id');
        return Customer::with(['Address'])->find($customer);
    }

    public function address(Request $request,$customer = null){
      $customer = $customer ?: $request->cookie(Customer::$CookieName);
      if(!$customer) return null;
      $fields = ['title','address','location'];
      if($request->filled('id')){
        $id = $request->input('id');
        Address::where(['id' => $id,'customer' => $customer])->update($request->only($fields));
        if($request->filled('default') && $request->input('default') === 'Y'){
          Address::where('customer',$customer)->update(['default' => 'N']);
          Address::where(['id' => $id])->update(['default' => 'Y']);
        }
      } else Customer::find($customer)->Address()->save(new Address($request->only($fields)));
      return Customer::with(['Address'])->find($customer);
    }

    public function adminCustomer(Request $request){
      if($request->isNotFilled('customer')) return null;
      return $this->address($request,$request->input('customer'));
    }

    public function group(Request $request){
      $fields = $request->only(['name','customers']);
      $fields['customers'] = (array_key_exists('customers',$fields) && !empty($fields['customers'])) ? array_map('intval',explode(',',$fields['customers'])) : [];
      if($request->filled('id')){
        $id = $request->input('id');
        Group::where(['id' => $id])->update($fields);
      } else return Group::create(['name' => $request->input('name'), 'customers' => []]);
      return Group::find($request->input('id'));
    }

    public function groups(Request $request){
      $customer = intval($request->input('customer')); $groups = $request->input('groups');
      $groups =  $groups ? array_map('intval',explode(',',$groups)) : [];
      $init = Arr::get(Group::latest('updated_at')->first(),'updated_at');
      Group::all()->each(function($Group)use($customer,$groups){
        $customers = $Group->customers; $group = $Group->id;
        if(in_array($customer,$customers) && !in_array($group,$groups)) { $Group->customers = array_diff($customers,[$customer]); $Group->save(); }
        elseif(!in_array($customer,$customers) && in_array($group,$groups))  { array_push($customers,$customer); $Group->customers = $customers; $Group->save(); }
      });
      return Group::where('updated_at','>',$init)->get();
    }

}
