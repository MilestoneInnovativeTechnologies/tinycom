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

    private function ImportCategoryNames($categories){
        $categories = is_array($categories) ? $categories : array_map('trim',explode("\n",$categories));
        $insert = array_diff($categories,Category::pluck('name')->toArray());
        if(!empty($insert)){
            $created_at = $updated_at = now()->toDateTimeString();
            $records = array_map(function($name)use($created_at,$updated_at){ return compact('name','created_at','updated_at'); },$insert);
            Category::insert($records);
        }
    }

    private function ImportCategories($categories){
        if(!$categories) return;
        $names = Category::pluck('name')->toArray();
        $categories = array_map('trim',explode("\n",$categories));
        $category_images = []; $created_at = $updated_at = now()->toDateTimeString();
        $inserts = array_filter(array_map(function($line) use(&$category_images,$names,$created_at,$updated_at){
            list($name,$description,$image) = array_pad(explode("\t",$line),3,null);
            $category_images[$name] = $image;
            return (in_array($name,$names)) ? null : compact('name','description','created_at','updated_at');
        },$categories));
        if(!empty($inserts)) Category::insert($inserts);
        if(!empty($category_images)){
            $categories = Category::pluck('id','name');
            foreach ($category_images as $category => $image)
                if(isset($categories[$category]) && $image) Category::find($categories[$category])->addMediaFromUrl($image)->toMediaCollection('categories');
        }

    }

    private function ImportItems($items){
        $categories = Category::pluck('id','name')->toArray(); $new_categories = []; $new_category_items = [];
        $created_at = $updated_at = now()->toDateTimeString(); $relation = []; $item_image = [];
        $item_names = Item::pluck('name')->toArray();
        $items = array_filter(array_map(function($line) use($categories,$item_names,$created_at,$updated_at,&$relation,&$new_categories,&$new_category_items,&$item_image) {
            list($name,$categoryName,$price,$selling,$stock,$imageLink) = array_map('trim',array_pad(explode("\t",$line),6,null));
            if(in_array($name,$item_names)) return (($item_image[$name] = $imageLink) && false); $price = number_format(floatval($price),2,'.',''); $selling = number_format(floatval($selling),2,'.',''); $stock = number_format(floatval($stock),2,'.','');
            if(isset($categories[$categoryName])) {
                $category = $categories[$categoryName];
                if(!isset($relation[$category])) $relation[$category] = [];
                $relation[$category][] = $name;
            } else {
                if(!in_array($categoryName,$new_categories)) { $new_categories[] = $categoryName; $new_category_items[$categoryName] = []; }
                $new_category_items[$categoryName][] = $name;
            }
            $item_image[$name] = $imageLink;
            return compact('name','price','selling','stock','created_at','updated_at');
        },explode("\n",$items)));
        if(!empty($new_categories)) {
            $this->ImportCategoryNames($new_categories);
            $newCategories = Category::whereIn('name',$new_categories)->pluck('id','name')->toArray();
            foreach ($new_categories as $category){
                $id = $newCategories[$category];
                if(!isset($relation[$id])) $relation[$id] = [];
                $relation[$id] = $new_category_items[$category];
            }
        }
        if(!empty($items)) Item::insert($items);
        $items = Item::pluck('id','name')->toArray(); $records = [];
        if(!empty($relation)){
            $category_items = DB::table('category_items')->get()->map(function($ci){ return $ci->category . '-' . $ci->item; })->toArray();
            foreach ($relation as $category => $itemnames){
                foreach ($itemnames as $itemname) {
                    $item = $items[$itemname];
                    if(!in_array($category . '-' .$item,$category_items)){
                        $records[] = compact('category','item');
                        $category_items[] = $category . '-' .$item;
                    }
                }
            }
            DB::table('category_items')->insert($records);
        }
        if(!empty($item_image)) foreach ($item_image as $item_name => $image_link){
            set_time_limit(15);
            if(isset($items[$item_name]) && $image_link){
                Item::find($items[$item_name])->addMediaFromUrl($image_link)->toMediaCollection('items');
                usleep(10000);
            }
        }
    }
}
