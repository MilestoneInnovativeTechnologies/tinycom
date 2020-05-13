<?php

$hosts = explode('.',request()->getHost()); array_pop($hosts); $domain = implode('.',$hosts); $domain = $domain ? ('/' . $domain) : '';

    return [

        'media' => [
            'driver' => 'local',
            'root' => public_path('uploads/media' . $domain),
            'url' => env('APP_URL').'/uploads/media'.$domain,
            'visibility' => 'public',
        ]

    ];