<?php

namespace Milestone\Tinycom\Controller;

use App\Http\Controllers\Controller as BaseController;
use Illuminate\Http\Request;

class Controller extends BaseController
{

    public static function Error($message, $variant = 'danger', $error = true){
        return compact('error','message','variant');
    }

    public static function Data($data, $message = '', $variant = 'success', $error = false){
        return compact('error','message','variant','data');
    }

}
