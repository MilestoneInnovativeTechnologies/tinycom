<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Support\Arr;
use Milestone\Tinycom\Model\Cart;
use Milestone\Tinycom\Model\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Milestone\Tinycom\Model\Address;
use Milestone\Tinycom\Model\Company;
use Milestone\Tinycom\Model\Customer;
use Milestone\Tinycom\Model\Subscription;

class SetupController extends Controller
{

    public function setup(Request $request){

        $token = $request->query('token');
        $company = $password = $done = null;
        $referer = $request->header('referer'); extract(json_decode(base64_decode($token),true));
        if(!$referer || !$company || !$password || !$done) return 'Token failed';
        $redirect = $done . '/' . $token;
        try {
            if(Schema::hasTable('users'))
                return '<html><head><script>window.onload = function(){ setTimeout(() => location.href="'.$redirect.'",2000); }</script></head><body>Setup already done!!</body></html>';
        } catch(\Exception $e){
            return '<html><head></head><body>No Database found, or user not assigned to database</body></html>';
        }
        Artisan::call('migrate:fresh');
        $created_at = $updated_at = now()->toDateTimeString();
        $name = 'admin'; $password = Hash::make($password);
        DB::table('users')->insert(compact('name','password','created_at','updated_at'));
        return redirect($redirect);
    }

    public function done($token){
        $data = json_decode(base64_decode($token),true);
        $company = Company::find($data['company']);
        $company->Subscriptions()->save(new Subscription(['edition' => 1, 'status' => 'Current', 'start' => now()->startOfDay()->toDateTimeString(), 'end' => now()->addDays(config('tinycom.free_subscription_expire'))->endOfDay()->toDateTimeString()]));
        $company->update(['setup' => 'Y']);
        return '<html><head><script>window.onload = function(){ window.close(); }</script></head><body></body></html>';
    }

    public function update(Request $request){
      switch($request->input('update')){
        case 'V2':
//          Address::where(['default' => 'Y'])->with(['Customer'])->get()->each(function($Address){ $Address->Customer->address = $Address->address; $Address->push(); });
//          Artisan::call('migrate:rollback');
          Artisan::call('migrate');
          Customer::all()->each(function($customer){
            $customer->Address()->save(new Address(['title' => 'default', 'address' => $customer->address, 'default' => 'Y'])); $customer->update(['address' => null]);
            Cart::where('customer',$customer->id)->update(['address' => Arr::get(Address::where(['default' => 'Y','customer' => $customer->id])->first(),'id')]);
          });
          Group::create(['name' => 'All','customers' => Customer::pluck('id')->toArray()]);
          return redirect()->route('home');
          break;
        default:
          dd('NO UPDATE');
      }
    }

}
