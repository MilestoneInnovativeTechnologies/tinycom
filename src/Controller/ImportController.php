<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Milestone\Tinycom\Model\Category;
use Milestone\Tinycom\Model\Item;

class ImportController extends Controller
{
    public function import(Request $request){
        if($request->getMethod() !== 'POST') return view('TinyCOM::import');
        if($request->get('categories')) $this->ImportCategories($request->get('categories'));
        if($request->get('items')) $this->ImportItems($request->get('items'));
        return redirect()->back();
    }

    private function ImportCategories($categories){
        $categories = is_array($categories) ? $categories : array_map('trim',explode("\n",$categories));
        $insert = array_diff($categories,Category::pluck('name')->toArray());
        if(!empty($insert)){
            $created_at = $updated_at = now()->toDateTimeString();
            $records = array_map(function($name)use($created_at,$updated_at){ return compact('name','created_at','updated_at'); },$insert);
            Category::insert($records);
        }
    }

    private function ImportItems($items){
        $categories = Category::pluck('id','name')->toArray(); $new_categories = []; $new_category_items = [];
        $created_at = $updated_at = now()->toDateTimeString(); $relation = [];
        $item_names = Item::pluck('name')->toArray();
        $items = array_filter(array_map(function($line) use($categories,$item_names,$created_at,$updated_at,&$relation,&$new_categories,&$new_category_items) {
            list($name,$categoryName,$price,$selling,$stock) = array_map('trim',explode("\t",$line));
            if(in_array($name,$item_names)) return false; $price = floatval($price); $selling = floatval($selling); $stock = floatval($stock);
            if(isset($categories[$categoryName])) {
                $category = $categories[$categoryName];
                if(!isset($relation[$category])) $relation[$category] = [];
                $relation[$category][] = $name;
            } else {
                if(!in_array($categoryName,$new_categories)) { $new_categories[] = $categoryName; $new_category_items[$categoryName] = []; }
                $new_category_items[$categoryName][] = $name;
            }
            return compact('name','price','selling','stock','created_at','updated_at');
        },explode("\n",$items)));
        if(!empty($new_categories)) {
            $this->ImportCategories($new_categories);
            $newCategories = Category::whereIn('name',$new_categories)->pluck('id','name')->toArray();
            foreach ($new_categories as $category){
                $id = $newCategories[$category];
                if(!isset($relation[$id])) $relation[$id] = [];
                $relation[$id] = $new_category_items[$category];
            }
        }
        Item::insert($items); $items = Item::pluck('id','name');
        $records = [];
        foreach ($relation as $category => $itemnames){
            foreach ($itemnames as $itemname) {
                $item = $items[$itemname];
                $records[] = compact('category','item');
            }
        }
        DB::table('category_items')->insert($records);
    }
}
