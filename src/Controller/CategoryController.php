<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Milestone\Tinycom\Model\Category;

class CategoryController extends Controller
{
    public function update(Request $request, $id){
        $update = ['name','description','status'];
        Category::where('id',$id)->update($request->only($update));
        if($request->hasFile('image')){ Category::find($id)->addMediaFromRequest('image')->toMediaCollection('categories'); }
        return Category::find($id);
    }

    public function create(Request $request){
        $create = $request->only(['name','description','status']);
        $category = Category::create($create);
        if($request->hasFile('image')){ $category->addMediaFromRequest('image')->toMediaCollection('categories'); }
        $category->load('media'); return $category;
    }
}
