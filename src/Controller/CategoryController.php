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
}
