@php

$url = request()->fullUrl();
function get($source,$prop){
    if(!$source) return 'TinyCOM :: A Tiny eCommerce portal for local business and delivery.';
    return \Illuminate\Support\Arr::get($source,$prop);
}
function image($source){
    $Storage = \Illuminate\Support\Facades\Storage::disk('media');
    if(!$source || $source->media->isEmpty()) return '/images/SpecialOffer.png';
    $image = $source->media[0]; return $Storage->url($image->id . DIRECTORY_SEPARATOR . $image->file_name);
}

@endphp<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta content="IE=Edge" http-equiv="X-UA-Compatible">

    <title>{{ get($source,'title') }}</title>
    <meta name="title" content="{{ get($source,'title') }}">
    <meta name="description" content="{{ get($source,'description') }}">

    <meta property="og:type" content="website">
    <meta property="og:url" content="{!! $url !!}">
    <meta property="og:title" content="{{ get($source,'title') }}">
    <meta property="og:description" content="{{ get($source,'description') }}">
    <meta property="og:image" content="{!! image($source) !!}">

    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{!! $url !!}">
    <meta property="twitter:title" content="{{ get($source,'title') }}">
    <meta property="twitter:description" content="{{ get($source,'description') }}">
    <meta property="twitter:image" content="{!! image($source) !!}">

    <meta name="application-name" content="Tiny COM">
    <meta name="language" content="en">
    <meta name="google" content="notranslate">
    <meta name="author" content="Milestone Innovative Technologies">
    <meta name="copyright" content="Milestone">
    <meta name="robots" content="follow, index">
    <meta name="HandheldFriendly" content="true">
    <meta name="referrer" content="origin">
    <meta name="image" content="{!! image($source) !!}">
    <meta name="original-source" content="{!! $url !!}">

    <script>
        window.onload = function(){
            setTimeout(() => location.href = "/",4000);
            @if($source)
            if (window.XMLHttpRequest) { xmlhttp = new XMLHttpRequest(); } else { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
            xmlhttp.open("GET", "/source/hit/{{ $source->uuid }}", true);
            xmlhttp.send();
            @endif
        }
    </script>
</head>
<body style="height: 100vh; padding: 0px; margin: 0px;">
    <div style="position: relative; top:50%; transform: translateY(-100%); text-align: center; font-family: monospace">
        <img src="/images/checking.gif">
        <p>@if(!$source || $source->expired) <b>This source is expired or not active currently!</b> @else Identifying the source. @endif<br >You will be redirected to home page soon!!</p>
    </div>
</body>
</html>