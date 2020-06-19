<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.25, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/company.css') }}">

    <title>{{ config('tinycom.name') }} - {{ config('tinycom.caption') }}</title>
</head>
<body>
    <div id="application" class="">
        <navbar></navbar>
        <main>
            <b-container fluid>
                <transition name="trans" mode="out-in"><keep-alive><router-view></router-view></keep-alive></transition>
            </b-container>
        </main>
    </div>
    <script>
        const APP = '{{ config('tinycom.name') }}', LOGOUT = '{!! route('logout') !!}', SETUP = '{!! route('setup') !!}', USER = @json(\Illuminate\Support\Facades\Auth::user()), DOMAINS = @json(config('tinycom.domains')), TENURES = @json(config('tinycom.tenures')), CURRENCY_MULTIPLIER = {{ config('tinycom.currency_multipliers')[config('tinycom.currency')] }};
    </script>
    <script src="{{ asset('js/company.js') }}"></script>
</body>
</html>
