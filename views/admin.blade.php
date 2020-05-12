<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}">

    <title>TinyCOM :: A Tiny eCommerce portal for local business and delivery.</title>
</head>
<body>
    <div id="application" class="">
        <nav class="navbar navbar-expand-lg navbar-light bg-info mb-2"><span><i @click.prevent="$router.go(-1)" class="d-lg-none fas fa-chevron-left"></i> Tiny COM</span></nav>
        <main class="">
            <div class="container-fluid">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </main>
        <nav class="navbar fixed-bottom navbar-light bg-light">
            <button @click.prevent="alterFAB()" class="btn btn-info main-fab-button text-white"><i class="fas fa-fingerprint"></i></button>
            <nav-actions></nav-actions>
        </nav>
        <div id="admin_bottom_spacer" style="">&nbsp;</div>
    </div>
    <script>
        @php $category_items = \Milestone\Tinycom\Model\CategoryItem::all(); $days7before = date('Y-m-d',strtotime('-7 days')).' 23:59:59' @endphp
        const CATEGORIES = @json(\Milestone\Tinycom\Model\Category::all()->keyBy->id), ITEMS = @json(\Milestone\Tinycom\Model\Item::all()->keyBy->id), BUNDLES = @json(\Milestone\Tinycom\Model\Bundle::with('Items')->get()), CATEGORY_ITEMS = @json($category_items->groupBy->category->mapWithKeys(function($Obj,$Cat){ return [$Cat => $Obj->pluck('item')]; })), ITEM_CATEGORIES = @json($category_items->groupBy->item->mapWithKeys(function($Obj,$Itm){ return [$Itm => $Obj->pluck('category')]; })), CUSTOMERS = @json(\Milestone\Tinycom\Model\Customer::all()), SOURCES = @json(\Milestone\Tinycom\Model\Source::where('expire','>',time() - 24*60*60)->get()), CARTS = @json(\Milestone\Tinycom\Model\Cart::with('Items')->where('created_at','>',$days7before)->get());
        const COMPANY = 'Tiny COM'; URL = { WHATSAPP:'https://api.whatsapp.com/send?phone=|phone|&text=|text|',SOURCE_LINK: '{{ route('source_link','|uuid|') }}',BILL_LINK: '{{ route('bill_link','|uuid|') }}',MEDIA: '{!! \Illuminate\Support\Facades\Storage::disk('media')->url('[id]/[file_name]') !!}' };
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

    <script src="{{ asset('js/admin.js') }}"></script>
</body>
</html>
