<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Cookie;
use Milestone\Tinycom\Model\Customer;
use Milestone\Tinycom\Model\Item;

class HomeController extends Controller
{

    public static $TinyCOMCookie = '_tc_auth';
    public static $PackKeys = ['CATEGORIES','ITEMS','BUNDLES','CATEGORY_ITEMS','SOURCE','USER','CART'];

    public function index(Request $request){
        Cookie::queue(self::$TinyCOMCookie,1);
        return view('TinyCOM::public');
    }

    public function pack(Request $request){
        $referrer = parse_url($request->header('referer'),PHP_URL_HOST); $referrers = array_keys(Cache::get(config('tinycom.cache_key',[])));

        if($request->cookie(self::$TinyCOMCookie) && in_array($referrer,$referrers)){
            $customer = $request->cookie(Customer::$CookieName);
            $source = SourceController::GetSourceItems($customer);
            $cart = CartController::GetCreateCart($customer,$source['uuid']);
            if($customer) $customer = Customer::find($customer);
            $category_items = \Milestone\Tinycom\Model\CategoryItem::all();
            $CATEGORIES = self::CATEGORIES();//json_encode(\Milestone\Tinycom\Model\Category::where('status','Y')->with(['media' => function($Q){ $Q->select(['model_id','id','file_name']); }])->get()->keyBy->id);
            $ITEMS = self::ITEMS();//json_encode(\Milestone\Tinycom\Model\Item::where('status','Y')->with(['media' => function($Q){ $Q->select(['model_id','id','file_name']); }])->get()->keyBy->id);
            $BUNDLES = self::BUNDLES();
            $CATEGORY_ITEMS = self::CATEGORY_ITEMS();//json_encode(\Milestone\Tinycom\Model\CategoryItem::all()->groupBy->category->mapWithKeys(function($Obj,$Cat){ return [$Cat => $Obj->map(function($obj){ return intval($obj->item); })]; }));
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

    private static function CATEGORIES(){
        $categories = \Milestone\Tinycom\Model\Category::where('status','Y')->with(['media' => function($Q){ $Q->select(['model_id','id','file_name']); }])->get();
        if($categories->isEmpty()) return '{}';
        return json_encode($categories->keyBy->id);
    }

    private static function ITEMS(){
        $items = \Milestone\Tinycom\Model\Item::where('status','Y')->with(['media' => function($Q){ $Q->select(['model_id','id','file_name']); }])->get();
        if($items->isEmpty()) return '{}';
        return json_encode($items->keyBy->id);
    }

    private static function BUNDLES(){
        return json_encode(\Milestone\Tinycom\Model\Bundle::with('Items')->get());
    }

    private static function CATEGORY_ITEMS(){
        $CategoryItems = \Milestone\Tinycom\Model\CategoryItem::all();
        if($CategoryItems->isEmpty()) return '{}';
        return json_encode(\Milestone\Tinycom\Model\CategoryItem::all()->groupBy->category->mapWithKeys(function($Obj,$Cat){ return [$Cat => $Obj->map(function($obj){ return intval($obj->item); })]; }));
    }
}
