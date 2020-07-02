<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/public.css') }}">

    <script src="{{ asset('pack') }}"></script>

    @php $lDisk = \Milestone\Tinycom\Model\Company::$LogoStoreDiskName; $lCache = \Milestone\Tinycom\Model\Company::$LogoImageCache; $lFile = cache()->get($lCache,null); @endphp
    @if($lFile)
        <link rel="icon" id="link-icon" href="{!! \Storage::disk($lDisk)->url($lFile) !!}" />
        <link rel="shortcut icon" id="link-short-icon" href="{!! \Storage::disk($lDisk)->url($lFile) !!}" />
    @else
        <link rel="icon" id="link-icon" href="/favicon.ico" type="image/x-icon"/>
        <link rel="shortcut icon" id="link-short-icon" href="/favicon.ico" type="image/x-icon" />
    @endif

    <title>{{ COMPANY }}</title>
</head>
<body class="pb-0">
    <div id="application">
        <section class="confirm-modal"><confirm-modal /></section>
        <nav class="navbar navbar-top navbar-expand-lg navbar-light bg-info fixed-top">
            <a class="navbar-brand"><i v-if="back" @click.prevent="$router.back()" class="d-lg-none fas fa-chevron-left"></i> @{{ header }}</a>
            <span class="navbar-text ml-auto"><navbar-user /></span>
        </nav>
        <div id="public_top_spacer" :class="topSpacer">&nbsp;</div>
        <main class="">
            <div class="container-fluid">
                <transition name="trans" mode="out-in"><keep-alive><router-view></router-view></keep-alive></transition>
            </div>
        </main>
        <div id="public_bottom_spacer" class="mt-3">&nbsp;</div>
        <nav class="navbar fixed-bottom navbar-light bg-primary">
            <div class="navbar-brand cart-items-count text-white"><i class="fas fa-cart-plus"></i> @{{ cartItems }}</div>
            <div class="navbar-brand cart-items-total text-white font-weight-bolder"><i class="fas fa-rupee-sign"></i> @{{ cartTotal }}</div>
            <button class="btn btn-info" type="button" @click="forward"><i class="fas fa-angle-double-right"></i></button>
        </nav>
    </div>
    <script> const COMPANY = '{{ COMPANY }}', MEDIA_URL = '{!! \Illuminate\Support\Facades\Storage::disk('media')->url('[id]/[file_name]') !!}'; function imageUrl(media){ return MEDIA_URL.replace(/\[(\w+)\]/g,(i,M) => media[M])} </script>
    <script defer src="{{ asset('js/public.js') }}"></script>
</body>
</html>
