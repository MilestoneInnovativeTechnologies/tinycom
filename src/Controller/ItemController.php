<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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

    public function sync(){
        $db_item_time = Carbon::parse(Cache::get(Item::$UpdatedCacheName,now()->toDateTimeString())); $given_time = Carbon::parse(session()->get(Item::$LastGivenSession));
        CustomerController::live(); if($db_item_time->greaterThan($given_time)){
            $items = Item::where('updated_at','>',$given_time)->get();
            session()->put(Item::$LastGivenSession,now()->toDateTimeString());
            return $items ?? [];
        }
        return [];
    }

    public function create(Request $request){
        $create = $request->only(['name','description','status','price','selling','stock']);
        foreach(['price','selling','stock'] as $key) $create[$key] = (isset($create[$key]) && !empty($create[$key])) ?  $create[$key] : 0;
        $item = Item::create($create); $item->Categories()->attach($request->input('category'));
        if($request->hasFile('image')){ $item->addMediaFromRequest('image')->toMediaCollection('items'); }
        $item->load(['Categories','media']); return $item;
    }

    public function fetch(Request $request){
        return Item::with(['media','Categories'])->find($request->input('id'));
    }
}
