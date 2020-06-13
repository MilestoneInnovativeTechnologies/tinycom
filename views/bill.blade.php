@php
    $amount = number_format($bill->Items->sum('amount'),2);
    $title = $bill->Customer->name . ', Your Order ' .($bill->status). '!!';
    $description = 'Your order of amount '.$amount.' with ' . ($COMPANY ?? 'Tiny COM') .' is ' .($bill->status). '. Follow the link to see the bill bil details';
    $url = request()->fullUrl();
@endphp<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta content="IE=Edge" http-equiv="X-UA-Compatible">

    <title>{{ $title }}</title>
    <meta name="title" content="{{ $title }}">
    <meta name="description" content="{{ $description }}">

    <meta property="og:type" content="website">
    <meta property="og:url" content="{!! $url !!}">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
{{--    <meta property="og:image" content="{!! image($source) !!}">--}}

    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{!! $url !!}">
    <meta property="twitter:title" content="{{ $title }}">
    <meta property="twitter:description" content="{{ $description }}">
{{--    <meta property="twitter:image" content="{!! image($source) !!}">--}}

    <meta name="application-name" content="Tiny COM">
    <meta name="language" content="en">
    <meta name="google" content="notranslate">
    <meta name="author" content="Milestone Innovative Technologies">
    <meta name="copyright" content="Milestone">
    <meta name="robots" content="follow, index">
    <meta name="HandheldFriendly" content="true">
    <meta name="referrer" content="origin">
{{--    <meta name="image" content="{!! image($source) !!}">--}}
    <meta name="original-source" content="{!! $url !!}">


    <link rel="stylesheet" href="/css/app.css">
    <link rel="stylesheet" href="/css/public.css">
    <title>Customer Bill</title>
</head>
<body class="pb-0">
<div id="application py-3">
    <main class="">
        <div class="container-fluid">
            <section class="bill-view py-3">
                <div class="card col-lg-3 m-lg-auto" @if($bill->status === 'Delivered') style="background: url('/images/delivered.png') no-repeat bottom right" @endif>
                    <div class="card-body px-0">
                        <h4 class="card-title text-center">{{ COMPANY ?? 'Tiny COM' }}</h4>
                        <hr>
                        <dl class="row m-0">
                            <dt class="col-3 p-0">Order # </dt><dd class="col-9 p-0">{{ $bill->uuid }}</dd>
                            <dt class="col-3 p-0">Date: </dt><dd class="col-9 p-0">{{ date('d/M/Y',strtotime($bill->confirmed_at)) }} <span class="float-right">{{ date('h:i A',strtotime($bill->confirmed_at)) }}</span></dd>
                            <dt class="col-3 p-0">Customer: </dt><dd class="col-9 p-0">{{ $bill->Customer->name }}<em class="text-right float-right" style="font-size: 0.8rem">{{ $bill->Customer->phone }}</em></dd>
                        </dl>
                        <table class="table table-sm mt-3">
                            <thead><tr><th>#</th><th>Item</th><th class="text-center">Qty</th><th class="text-right">Total</th></tr></thead>
                            @if($bill->Items && $bill->Items->isNotEmpty())<tbody>
                            @foreach($bill->Items as $item)
                            <tr>
                                <td>{{ $loop->iteration }}</td>
                                <td>{{ $item->Item->name }}<br>{{ $item->price }}</td>
                                <td class="text-center">{{ floatval($item->quantity) }}</td>
                                <td class="text-right">{{ $item->amount }}</td>
                            </tr>
                            @endforeach
                            @endif
                            </tbody>
                            <tfoot>
                            <tr><th colspan="4" class="text-right font-weight-bolder" style="font-size: 1.2rem"><i class="fas fa-rupee-sign"></i> {{ $amount }}</th></tr>
                            </tfoot>
                        </table>
                        <hr>
                        <p class="text-center" style="font-size: 1.5rem"><i class="fas fa-rupee-sign"></i> {{ $amount }}</p>
                        <hr>
                        @if($bill->status === 'Delivered' && floatval($bill->amount) !== floatval($amount))<p class="text-center" style="font-size: 0.8rem;">Paid {{ number_format($bill->amount,2) }}</p>@endif
                    </div>
                </div>
            </section>

        </div>
    </main>
</div>
</body>
</html>
