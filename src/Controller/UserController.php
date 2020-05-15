<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function password(Request $request){
        $password = $request->input('password');
        Auth::user()->password = Hash::make($password); Auth::user()->save();
    }
}
