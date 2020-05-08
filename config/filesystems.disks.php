<?php

    return [

        'media' => [
            'driver' => 'local',
            'root' => public_path('uploads/media'),
            'url' => env('APP_URL').'/uploads/media',
            'visibility' => 'public',
        ]

    ];