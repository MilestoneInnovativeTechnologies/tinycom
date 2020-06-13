<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    <title>{{ config('tinycom.name') }} - {{ config('tinycom.caption') }}</title>
</head>
<body style="height: 100vh" class="d-flex justify-content-around align-items-center">

    <div class="mx-auto jumbotron text-uppercase text-center">
        <h3>-- 404 --</h3>
        <h1>Unauthorized access</h1>
        <p class="text-muted">It seems you have mistyped the web address..<br>Please check and try again..</p>
        <h5>-- OR VISIT --</h5>
        <p class="text-muted"><a href="http://{{ config('tinycom.domain') }}">{{ config('tinycom.domain') }} Home Page</a></p>
    </div>

</body>
</html>
