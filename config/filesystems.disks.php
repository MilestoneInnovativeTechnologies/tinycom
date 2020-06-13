<?php
    $host = \Illuminate\Support\Facades\Request::getScheme() . '://' . HOST ;
    return [

        'media' => [
            'driver' => 'local',
            'root' => public_path('uploads/media/' . HOST),
            'url' => $host . '/uploads/media/' . HOST,
            'visibility' => 'public',
        ],
        'payment' => [
            'driver' => 'local',
            'root' => public_path('uploads/payment/' . HOST),
            'url' => $host . '/uploads/payment/' . HOST,
            'visibility' => 'public',
        ],


    ];