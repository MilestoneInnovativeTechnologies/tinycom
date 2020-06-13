<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Milestone\Tinycom\Model\User;

class ProfileController extends Controller
{
    public function update(Request $request){
        $email = $request->input('email'); if(!$email) return self::Error('Email cannot be empty');
        if(Auth::user()->email !== $email && User::where('email',$email)->exists()) return self::Error('Email already registered for another user. Please try with another one.');
        $user = User::find(Auth::id()); $user->update($request->only(['name','email','phone']));
        if($request->filled('password')) $user->update($request->only('password'));
        return self::Data($user,'Profile Updated Successfully!!');
    }
}
