<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Milestone\Tinycom\Model\Customer;
use Milestone\Tinycom\Model\Item;
use Milestone\Tinycom\Model\Source;

class SourceController extends Controller
{

    public function create(Request $request){
        $uuid = null; $title = $request->get('title'); $description = $request->get('description'); $expire = time() + intval($request->get('expire')); $hits = $orders = $expire_hits = 0; $active = 'Y';
        $customers = $request->get('customers',[]);
        $items = Arr::only($request->input('item'),$request->input('items',[]));
        $categories = $request->get('categories',[]);
        if(!empty($categories)){
            $category_ids = $categories;
            $categories = Arr::only($request->input('category'),$category_ids);
            $c_items = Item::without('media')->with(['Categories'])
                ->whereHas('Categories',function($Q)use($category_ids){ $Q->whereIn('id',$category_ids); })
                ->get()
                ->mapWithKeys(function($item)use($categories){
                    $item_price = floatval($item->price); $category = Arr::get($item->Categories,"0.id"); $percentage = floatval($categories[$category]);
                    $price = floatval(((100 - $percentage)/100) * $item_price);
                    return [$item->id => $price];
                })->toArray();
            $items = $items + $c_items;
        }
        $items = json_encode($items); $categories = json_encode($categories); $customers = json_encode($customers);
        $source = Source::create(compact('items','customers','categories','title','description','hits','expire_hits','orders','expire','uuid','active'));
        if($request->hasFile('image')) $source->addMediaFromRequest('image')->toMediaCollection('sources');
        return $source;
    }

    public function visit(Request $request, $uuid){
        session()->forget([Source::$SessionName,Source::$SessionSourceCustomers,Source::$SessionSourceItems,Source::$SessionSourceLogin]);
        $source = Source::where(['uuid' => $uuid,'active' => 'Y'])->with('media')->first();
        if($source && !$source->expired){
            session()->put(Source::$SessionName,$uuid);
            $s_customers = $source->customers;
            if(!$s_customers || empty($s_customers)){
                session()->put(Source::$SessionSourceLogin,false);
                session()->put(Source::$SessionSourceItems,$source->items);
                session()->put(Source::$SessionSourceCustomers,[]);
            } else {
                session()->put(Source::$SessionSourceLogin,true);
                $r_customer = $request->cookie(Customer::$CookieName);
                if($r_customer){
                    session()->put(Source::$SessionSourceItems,in_array($r_customer,$s_customers) ? $source->items : []);
                }
            }
        }
        return view('TinyCOM::source')->with('source',$source);
    }

    public function hit($uuid){
        $source = Source::where('uuid',$uuid)->first();
        if($source) $source->increment($source->expire > time() ? 'hits' : 'expire_hits');
        return 1;
    }

    public static function GetSourceItems($customer){
        $items = []; $uuid = null;
        if (session()->has(Source::$SessionName)) {
            $uuid = session()->get(Source::$SessionName);
            if(session()->get(Source::$SessionSourceLogin) && !$customer) return compact('uuid','items');

            $source = Source::where(['uuid' => $uuid, 'active' => 'Y'])->first();
            if(!$source || $source->expired) return compact('uuid','items');

            $customers = $source->customers;
            if(!$customers || empty($customers)) $items = $source->items;
            else {
                if($customer && in_array($customer,$customers)) $items = $source->items;
                else $items = [];
            }
            return compact('uuid','items');
        } else return compact('uuid','items');
    }

    public static function ordered(){
        $uuid = session()->get(Source::$SessionName) ?? null;
        if($uuid) Source::where('uuid',$uuid)->first()->increment('orders');
        self::removeSessions();
    }

    public static function removeSessions(){
        session()->forget([Source::$SessionName,Source::$SessionSourceLogin,Source::$SessionSourceCustomers,Source::$SessionSourceItems]);
    }

    public function fetch(Request $request){
        $customer = $request->cookie(Customer::$CookieName);
        return self::GetSourceItems($customer);
    }
}
