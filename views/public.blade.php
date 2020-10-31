
<!DOCTYPE html>
<html>
<head>
  <title>{{ COMPANY }}</title>

  <meta charset=utf-8>
  <meta name=description content="A tiny eCommerce portal for small business. Fully offline!">
  <meta name=format-detection content="telephone=no">
  <meta name=msapplication-tap-highlight content=no>
  <meta name=viewport content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width">
  <meta name=apple-mobile-web-app-capable content=yes>
  <meta name=apple-mobile-web-app-status-bar-style content=default>
  <meta name=apple-mobile-web-app-title content=TinyCOM>
  <meta name=msapplication-TileColor content=#000000>

  <script src="{{ asset('pack') }}"></script>

  <base href="http://localhost:8080/">
{{--  <link href=css/vendor.9be85b89.css rel=stylesheet>--}}
{{--  <link href=css/app.0e433876.css rel=stylesheet>--}}

  <script> const COMPANY = '{{ COMPANY }}', MEDIA_URL = '{!! \Illuminate\Support\Facades\Storage::disk('media')->url('[id]/[file_name]') !!}', CSRF_TOKEN = '{{ csrf_token() }}'; function imageUrl(media){ return MEDIA_URL.replace(/\[(\w+)\]/g,(i,M) => media[M])} </script>

  @php $lDisk = \Milestone\Tinycom\Model\Company::$LogoStoreDiskName; $lCache = \Milestone\Tinycom\Model\Company::$LogoImageCache; $lFile = cache()->get($lCache,null); @endphp
  @if($lFile)
    <link rel="icon" id="link-icon" href="{!! \Storage::disk($lDisk)->url($lFile) !!}" />
    <link rel="shortcut icon" id="link-short-icon" href="{!! \Storage::disk($lDisk)->url($lFile) !!}" />
  @else
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

  <link rel=manifest href=manifest.json>
  <link rel=mask-icon href=icons/safari-pinned-tab.svg color=#027be3>
  <meta name=theme-color content=#027be3>
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
</head>
<body>
<div id="q-app"></div>
<script src="vendor.js"></script><script src="app.js"></script>
{{--<script src=js/vendor.3357b926.js></script>--}}
{{--<script src=js/app.3e637503.js></script>--}}

</body>
</html>
