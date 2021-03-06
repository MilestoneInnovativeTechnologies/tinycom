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
        $item = Item::find($id); $item->update($request->only($update));
        if($request->hasFile('image')){ $item->addMediaFromRequest('image')->toMediaCollection('items'); }
        if($request->has('categories')) {
            $categories = $request->input('categories',[]);
            $item->Categories()->sync($categories);
        }
        return Item::with(['media' => function($Q){ $Q->select(['model_id','id','file_name']); },'Categories'])->find($id);
    }

    public function sync(){
        $db_item_time = Carbon::parse(Cache::get(Item::$UpdatedCacheName,now()->toDateTimeString())); $given_time = Carbon::parse(session()->get(Item::$LastGivenSession));
        CustomerController::live(); if($db_item_time->greaterThan($given_time)){
            $items = Item::with(['media' => function($Q){ $Q->select(['model_id','id','file_name']); }])->where('updated_at','>',$given_time)->get();
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
        $item->load(['Categories','media' => function($Q){ $Q->select(['model_id','id','file_name']); }]); return $item;
    }

    public function stock(Request $request){
        if($request->filled('stock')) Item::query()->update(['stock' => $request->input('stock')]);
        return $request->input('stock');
    }

    public function fetch(Request $request){
        return Item::with(['media' => function($Q){ $Q->select(['model_id','id','file_name']); },'Categories'])->find($request->input('id'));
    }
}
