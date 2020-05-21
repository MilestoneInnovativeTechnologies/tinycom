<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Milestone\Tinycom\Model\Customer;
use Milestone\Tinycom\Model\Item;

class HomeController extends Controller
{

    public static $TinyCOMCookie = '_tc_auth';
    public static $PackKeys = ['CATEGORIES','ITEMS','BUNDLES','CATEGORY_ITEMS','SOURCE','USER','CART'];

    public function index(Request $request){
        Cookie::queue(self::$TinyCOMCookie,1);
        return view('TinyCOM::home');
    }

    public function pack(Request $request){
        if($request->cookie(self::$TinyCOMCookie) && strpos($request->header('referer'),'tinycom.in') !== false){
            $customer = $request->cookie(Customer::$CookieName);
            $source = SourceController::GetSourceItems($customer);
            $cart = CartController::GetCreateCart($customer,$source['uuid']);
            if($customer) $customer = Customer::find($customer);
            $category_items = \Milestone\Tinycom\Model\CategoryItem::all();
            $CATEGORIES = json_encode(\Milestone\Tinycom\Model\Category::where('status','Y')->with(['media' => function($Q){ $Q->select(['model_id','id','file_name']); }])->get()->keyBy->id);
            $ITEMS = json_encode(\Milestone\Tinycom\Model\Item::where('status','Y')->with(['media' => function($Q){ $Q->select(['model_id','id','file_name']); }])->get()->keyBy->id);
            $BUNDLES = json_encode(\Milestone\Tinycom\Model\Bundle::with('Items')->get());
            $CATEGORY_ITEMS = json_encode(\Milestone\Tinycom\Model\CategoryItem::all()->groupBy->category->mapWithKeys(function($Obj,$Cat){ return [$Cat => $Obj->map(function($obj){ return intval($obj->item); })]; }));
            $SOURCE = json_encode($source ?? null);
            $USER = json_encode($customer ?? null);
            $CART = json_encode($cart ?? null);
            $content = 'const '; foreach (self::$PackKeys as $key) $content .= "$key = ${$key},"; $content .= '_Null = null;';
            session()->put(Item::$LastGivenSession,now()->toDateTimeString());
            return response($content,200,['Content-Type' => 'application/javascript']);
        } else {
            return response([],200,['Content-Type' => 'application/javascript']);
        }
    }
}
