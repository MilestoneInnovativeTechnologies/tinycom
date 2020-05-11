<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Milestone\Tinycom\Model\Item;

class ItemController extends Controller
{

    public function update(Request $request, $id){
        $update = ['name','description','status','price','selling','stock'];
        Item::where('id',$id)->update($request->only($update));
        if($request->hasFile('image')){ Item::find($id)->addMediaFromRequest('image')->toMediaCollection('items'); }
        return Item::find($id);
    }

    public function sync(Request $request){
        $updated_at = strtotime($request->get('updated_at',now()->toDateTimeString()));
        $latest = strtotime(Cache::get(Item::$UpdatedCacheName,now()->toDateTimeString()));
        CustomerController::live();
        return ($latest > $updated_at) ? Item::where('updated_at','>',date('Y-m-d H:i:s',$updated_at))->get() : [];
    }

    public function create(Request $request){
        $create = $request->only(['name','description','status','price','selling','stock']);
        $item = Item::create($create); $item->Categories()->attach($request->input('category'));
        if($request->hasFile('image')){ $item->addMediaFromRequest('image')->toMediaCollection('items'); }
        $item->load(['Categories','media']); return $item;
    }
}
