<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Milestone\Tinycom\Model\Customer;

class HomeController extends Controller
{

    public static $TinyCOMCookie = '_tc_auth';
    public static $PackKeys = ['CATEGORIES','ITEMS','BUNDLES','CATEGORY_ITEMS','ITEM_CATEGORIES','SOURCE','USER','CART'];

    public function index(Request $request){
        Cookie::queue(self::$TinyCOMCookie,1);
        return view('TinyCOM::home');
    }

    public function pack(Request $request){
        if(true || $request->cookie(self::$TinyCOMCookie) && strpos($request->header('referer'),'tinycom') !== false){
            $customer = $request->cookie(Customer::$CookieName);
            $source = SourceController::GetSourceItems($customer);
            $cart = CartController::GetCreateCart($customer,$source['uuid']);
            if($customer) $customer = Customer::find($customer);
            $category_items = \Milestone\Tinycom\Model\CategoryItem::all();
            $CATEGORIES = json_encode(\Milestone\Tinycom\Model\Category::all()->keyBy->id);
            $ITEMS = json_encode(\Milestone\Tinycom\Model\Item::all()->keyBy->id);
            $BUNDLES = json_encode(\Milestone\Tinycom\Model\Bundle::with('Items')->get());
            $CATEGORY_ITEMS = json_encode($category_items->groupBy->category->mapWithKeys(function($Obj,$Cat){ return [$Cat => $Obj->pluck('item')]; }));
            $ITEM_CATEGORIES = json_encode($category_items->groupBy->item->mapWithKeys(function($Obj,$Itm){ return [$Itm => $Obj->pluck('category')]; }));
            $SOURCE = json_encode($source ?? null);
            $USER = json_encode($customer ?? null);
            $CART = json_encode($cart ?? null);
            $content = 'const '; foreach (self::$PackKeys as $key) $content .= "$key = ${$key},"; $content .= '_Null = null;';
            return response($content,200,['Content-Type' => 'application/javascript']);
        } else {
            return response([],200,['Content-Type' => 'application/javascript']);
        }
    }
}
