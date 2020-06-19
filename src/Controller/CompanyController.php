<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Milestone\Tinycom\Mail\SetupCompleted;
use Milestone\Tinycom\Model\Company;
use Milestone\Tinycom\Model\User;

class CompanyController extends Controller
{

    private function addCompany($request){
        $this->addUserCompany(User::find(Auth::id()),$request);
        return ['notification' => true,'type' => 'success','message' => 'Company added successfully!!'];
    }
    private function changePassword($request){
        User::find(Auth::id())->update($request->only('password'));
        return ['notification' => true,'type' => 'warning','message' => 'Password updated successfully!!'];
    }

    private function getCreateUser($data){
        return User::create($data);
    }

    public function admin(Request $request){
            if($request->getMethod() === 'POST') return back()->with($this->{ self::$actionMethods[$request->input('action')] }($request));
        return view(self::$admin_view);
    }

    private function updateDetails(Request $request){
        Auth::user()->update($request->only(['name','email']));
        if($request->has('password') && $request->filled('password')) Auth::user()->update(['password' => Hash::make($request->input('password'))]);
        return ['notification' => true,'type' => 'warning','message' => 'Details modified successfully!!'];
    }

    private function viewDetails(Request $request){
        return $request->only(['id','status']);
    }

    private function markSetupDone(Request $request){
        Company::find($request->input('id'))->update(['setup' => 'Y']);
        return ['id' => $request->input('id'),'notification' => true,'type' => 'success','message' => 'Marked as setup done!!'];
    }

    private function deleteCompany(Request $request){
        Company::find($request->input('id'))->delete();
        return ['notification' => true,'type' => 'warning','message' => 'Deletion success!!'];
    }

    public function create(Request $request){
        if(!$request->filled(['user','company','domain','password'])) return self::Error('Some of required fields are empty.. Please fill all mandatory fields!!');
        $data = $request->only(['user','referrer','company','domain','password']); $sub = $request->input('sub');
        if(Company::where('domain',$data['domain'])->exists()) return self::Error('Domain is already registered for another company. Please try with another domain!!');
        $data['code'] = null; $data['database'] = config('tinycom.database_prefix') . $sub;
        $username = config('tinycom.database_username');
        $data['database_username'] = config('tinycom.database_username_prefix') . (empty($username) ? $sub : $username);
        $data['database_password'] = $data['database_username']; $company = Company::create($data);
        return self::Data(Auth::user()->type === 'company' ? $company->fresh()->makeVisible(['password','database_password','database_username','database']) : $company->fresh(),'Company added successfully!!');
    }

    public function fetch(Request $request){
        $visible = Auth::user()->type === 'company';
        return self::Data($visible ? Company::all()->map(function($company){ return $company->makeVisible(['password','database_password','database_username','database']); }) : Company::all());
    }

    public function subscriptions(){
        return self::Data(Company::with(['Subscriptions' => function($Q){
            $Q->with(['Edition' => function($q){ $q->select('id','name'); }])
                ->whereIn('status',['Current','Upcoming'])
                ->orWhere(function($q1){
                    $q1->where('status','Expired');//->where('end','>=',now()->subDays(45));
                })
            ;
        }])->get()->flatMap->Subscriptions->toArray());
    }

    public function sendSetupMail(Request $request){
        $company = Company::with('User')->find($request->input('company')); $email = $company->User->email;
        $status = Mail::to($email)->send(new SetupCompleted($company->id));
        return self::Data(compact('company','status'),'Setup information mail queued successfully!!');
    }

    public function delete(Request $request){
        $company = $request->input('id');
        Company::where('setup','N')->where('id',$company)->delete();
        return self::Data($company,'Deleted successfully!');
    }

    public function referrer(Request $request){
        $company = $request->input('company'); $referrer = $request->input('referrer');
        if(!$company || !$referrer) return self::Error('Some of required fields are empty for changing referrer!!');
        Company::where('id',$company)->update(['referrer' => $referrer]);
        return self::Data(Company::find($company),'Referrer Changed successfully!!');
    }

    public function logo(Request $request){
        $disk = Company::$LogoStoreDiskName; $file = Cache::get(Company::$LogoImageCache,null);
        if($file) Storage::disk($disk)->delete($file);
        if($request->hasFile('image')){
            $hash = $request->image->hashName(); $file = Company::logoName($hash,HOST);
            $request->image->storeAs('/',$file,$disk);
            Cache::put(Company::$LogoImageCache,$file);
        }
        return Storage::disk($disk)->url(Cache::get(Company::$LogoImageCache));
    }

    public function companyLogo(Request $request){
        $company = $request->has('company') ? Company::find($request->input('company')) : null; if(!$company) return;
        $disk = Company::$LogoStoreDiskName; $cache = $company->domain . '.logo'; $file = Cache::get($cache,null);
        if($file) Storage::disk($disk)->delete($file);
        if($request->hasFile('image')){
            $hash = $request->image->hashName(); $file = Company::logoName($hash,$company->domain);
            $request->image->storeAs('/',$file,$disk);
            Cache::put($cache,$file);
        }
        return Storage::disk($disk)->url(Cache::get($cache));
    }

    public function update(Request $request){
        $company = $request->filled('id') ? Company::find($request->input('id')) : null;
        if(!$company) return self::Error('Company not found!!');
        if($request->filled('company')) $company->company = $request->input('company');
        if($company->setup === 'N' && $request->filled('domain')){ $domain = $request->input('domain');
            if(Company::where('domain',$domain)->where('id','!=',$company->id)->exists()) return self::Error('This domain is already in use, try choosing another!!');
            $company->domain = $domain;
            if($request->filled('sub')){
                $sub = $request->input('sub');
                $company->database = config('tinycom.database_prefix') . $sub;
                $username = config('tinycom.database_username');
                $company->database_username = config('tinycom.database_username_prefix') . (empty($username) ? $sub : $username);
                $company->database_password = $company->database_username;
            }
        }
        $company->save(); return self::Data($company->fresh());
    }

}
