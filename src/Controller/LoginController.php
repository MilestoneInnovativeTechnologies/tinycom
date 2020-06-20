<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Milestone\Tinycom\Model\Company;
use Milestone\Tinycom\Model\User;

class LoginController extends Controller
{

    private static $login_view = 'TinyCOM::company_login';

    public function __construct(){
        if (!empty(config('tinycom.login_view'))) self::$login_view = config('tinycom.login_view');
    }

    public function login(Request $request){
        return ($request->getMethod() === 'POST')
            ? (
            (Auth::attempt($request->only('email','password')))
                ? redirect()->route(Auth::user()->type)
                : redirect()->back()->with(['error' => true, 'message' => 'User credential doesn\'t match. Try again', 'login' => true])
            )
            : view(self::$login_view);
    }

    private function changePassword($request){
        User::find(Auth::id())->update($request->only('password'));
        return ['notification' => true,'type' => 'warning','message' => 'Password updated successfully!!'];
    }

    private function getCreateUser($data){
        return User::create($data);
    }

    private function updateDetails(Request $request){
        Auth::user()->update($request->only(['name','email']));
        if($request->has('password') && $request->filled('password')) Auth::user()->update(['password' => Hash::make($request->input('password'))]);
        return ['notification' => true,'type' => 'warning','message' => 'Details modified successfully!!'];
    }

    public function register(Request $request){

        $email = $request->input('email'); if(User::where('email',$email)->exists()) return redirect()->route('login')->with(['error' => true, 'login' => false, 'message' => 'Email already exists. Try login to add companies!!']);

        $userCredentials = $request->only('name','email','password'); $User = $this->getCreateUser($userCredentials);

        $this->addUserCompany($User,$request);
        Auth::loginUsingId($User->id);
        return redirect()->route(Auth::user()->type);
    }

    private function addUserCompany($User,$request){
        $data = $request->only('company','password'); $sub = $request->input('sub');
        $data['domain'] = $sub . '.' . $request->input('domain'); $db = str_ireplace('.','_',$sub);
        $data['code'] = null; $data['database'] = config('tinycom.database_prefix') . $db;
        $username = config('tinycom.database_username');
        $data['database_username'] = config('tinycom.database_username_prefix') . (empty($username) ? $db : $username);
        $data['database_password'] = $data['database_username'];
        $User->Companies()->save(new Company($data));
    }

}
