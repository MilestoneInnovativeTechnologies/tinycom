<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Milestone\Tinycom\Model\User;

class ClientController extends Controller
{
    public static $Type = 'client';

    public function create(Request $request){
        $data = $request->only(['name','email','phone','password']);
        $data['type'] = self::$Type; $data['password'] = Hash::make($data['password']);
        if(User::where('email',$data['email'])->exists()) return self::Error('Email already registered for another user, Please try with another email.');
        if(!$data['name'] || empty($data['name'])) return self::Error('Name cannot set as empty, Please provide a name!!');
        return self::Data(User::create($data),'Client added successfully..');
    }

    public function update(Request $request){
        if(!$request->input('id')) return self::Error('No required information to update client');
        $data = $request->only(['name','email','phone']);
        if($request->filled('password')) $data['password'] = Hash::make($request->input('password'));
        $user = User::find($request->input('id'));
        if(!$data['email'] || ($data['email'] !== $user->email && User::where('email',$data['email'])->exists())) return self::Error('Email is either empty or have already assigned to another user. Please try again!!');
        if(!$data['name'] || empty($data['name'])) return self::Error('Name cannot set as empty, Please provide a name!!');
        $user->update($data);
        return self::Data($user,'Client updated successfully..');
    }

    public function fetch(Request $request){
        return self::Data(User::where('type',self::$Type)->get());
    }

    public function companies(Request $request){
        return self::Data($request->filled('client')
            ? User::find($request->input('client'))->Companies
            : []);
    }
}
