@php $assets = env('dev') === '1' ? [] : json_decode(file_get_contents(public_path('admin.json')),true) @endphp
    <!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

@forelse(\Illuminate\Support\Arr::get($assets,'css',[]) as $type => $name)
    <link href=css/{{$type}}.{{$name}}.css rel=stylesheet>
@empty
    <base href="http://localhost:8080/">
@endforelse

    @php $lDisk = \Milestone\Tinycom\Model\Company::$LogoStoreDiskName; $lCache = \Milestone\Tinycom\Model\Company::$LogoImageCache; $lFile = cache()->get($lCache,null); @endphp
    @if($lFile)
        <link rel="icon" id="link-icon" href="{!! \Storage::disk($lDisk)->url($lFile) !!}" />
        <link rel="shortcut icon" id="link-short-icon" href="{!! \Storage::disk($lDisk)->url($lFile) !!}" />
    @else
    <link rel="icon" id="link-icon" />
    <link rel="shortcut icon" id="link-short-icon" />
    <link rel=icon type=image/png sizes=128x128 href=icons/favicon-128x128.png>
    <link rel=icon type=image/png sizes=96x96 href=icons/favicon-96x96.png>
    <link rel=icon type=image/png sizes=32x32 href=icons/favicon-32x32.png>
    <link rel=icon type=image/png sizes=16x16 href=icons/favicon-16x16.png>
    <link rel=icon type=image/ico href=favicon.ico>
    <link rel=apple-touch-icon href=icons/apple-icon-120x120.png>
    <link rel=apple-touch-icon sizes=152x152 href=icons/apple-icon-152x152.png>
    <link rel=apple-touch-icon sizes=167x167 href=icons/apple-icon-167x167.png>
    <link rel=apple-touch-icon sizes=180x180 href=icons/apple-icon-180x180.png>
    <meta name=msapplication-TileImage content=icons/ms-icon-144x144.png>
    @endif


  <title>{{ COMPANY }}</title>
  <style type="text/css">
    body {
      --q-color-primary: #1976D2;
      --q-color-titlebar-bg: #1976D2;
      --q-color-titlebar-text: white;
      --q-color-salechip-bg: var(--q-color-positive);
      --q-color-salechip-text: white;
      --q-color-exclusivechip-bg: var(--q-color-warning);
      --q-color-exclusivechip-text: white;
    }
    .title_bar_bg { background: var(--q-color-titlebar-bg) !important; }
    .title_bar_text { color: var(--q-color-titlebar-text) !important; }
    .on_sale_chip { background: var(--q-color-salechip-bg) !important; color: var(--q-color-salechip-text) !important; }
    .exclusive_chip { background: var(--q-color-exclusivechip-bg) !important; color: var(--q-color-exclusivechip-text) !important; }
  </style>
  <script>
    @php $category_items = \Milestone\Tinycom\Model\CategoryItem::all(); $days7before = date('Y-m-d',strtotime('-7 days')).' 23:59:59'; session()->put(\Milestone\Tinycom\Model\Item::$LastGivenSession,now()->toDateTimeString()) @endphp
    const CATEGORIES = @json(\Milestone\Tinycom\Model\Category::with(['media' => function($Q){ $Q->select(['model_id','id','file_name']); }])->get()->keyBy->id), ITEMS = @json(\Milestone\Tinycom\Model\Item::with(['media' => function($Q){ $Q->select(['model_id','id','file_name']); }])->get()->keyBy->id), BUNDLES = @json(\Milestone\Tinycom\Model\Bundle::with('Items')->get()), CATEGORY_ITEMS = @json(\Milestone\Tinycom\Model\CategoryItem::all()->groupBy->category->mapWithKeys(function($Obj,$Cat){ return [$Cat => $Obj->pluck('item')]; })), ITEM_CATEGORIES = @json($category_items->groupBy->item->mapWithKeys(function($Obj,$Itm){ return [$Itm => $Obj->pluck('category')]; })), CUSTOMERS = @json(\Milestone\Tinycom\Model\Customer::with(['Address'])->get()), GROUPS = @json(\Milestone\Tinycom\Model\Group::all()), SOURCES = @json(\Milestone\Tinycom\Model\Source::with(['media'])->where('expire','>',time() - 24*60*60)->get()), CARTS = @json(\Milestone\Tinycom\Model\Cart::with('Items')->where('updated_at','>',$days7before)->get());
    const COMPANY = '{{ COMPANY }}', SUBSCRIPTIONS = @json(SUBSCRIPTIONS), CSRF_TOKEN = '{{ csrf_token() }}', LOGOUT = '{!! route("admin.login") !!}', URL = { WHATSAPP:'https://api.whatsapp.com/send?phone=|phone|&text=|text|',SOURCE_LINK: '{{ route('source_link',['uuid' => '|uuid|','sub' => SUB]) }}',BILL_LINK: '{{ route('bill_link',['uuid' => '|uuid|', 'sub' => SUB]) }}',MEDIA: '{!! \Illuminate\Support\Facades\Storage::disk('media')->url('[id]/[file_name]') !!}',LOGO: '{!! $lFile ? \Storage::disk($lDisk)->url($lFile) : '/favicon.ico' !!}' };
    function urlParse(item,data){ return URL[item].replace(/\|(\w+)\|/g,(f,m) => data[m] || '') + '?_=' + timeNow() }
    function timeNow(){ return parseInt(new Date().getTime()/1000) }
    function imageUrl(media){
        return URL.MEDIA.replace(/\[(\w+)\]/g,(i,M) => media[M])
    }
    function fromNow(secs){
        let now = timeNow(), seconds = Math.abs(parseInt(secs) - now); if(seconds < 60) return parseInt(seconds) + ' secs';
        let minutes = parseInt(seconds/60); if(minutes < 60) return parseInt(minutes) + ' minutes';
        let hours = parseInt(minutes/60); if(hours < 24) return parseInt(hours) + ' hours';
        return parseInt((hours/24)) + ' days';
    }
  </script>

</head>
<body>
  <div id="q-app"></div>
@forelse(\Illuminate\Support\Arr::get($assets,'js',[]) as $type => $name)
    <script src=js/{{$type}}.{{$name}}.js></script>
@empty
    <script src="vendor.js"></script>
    <script src="app.js"></script>
@endforelse
</body>
</html>
