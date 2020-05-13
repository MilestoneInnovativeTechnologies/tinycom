<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta content="IE=Edge" http-equiv="X-UA-Compatible">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <title>Login</title>
</head>
<body style="height: 100vh; padding: 0px; margin: 0px;">
<div style="position: relative; top:50%; transform: translateY(-50%); text-align: center; font-family: monospace; width: 50vw; margin: auto">
    <form method="post">@csrf
        <input type="password" name="password" class="form-control text-center" placeholder="Password">
        <input type="submit" name="login" value="Login" class="text-center btn btn-block btn-info mt-2">
        <a href="/" class="mt-4 d-block">Browse Site</a>
    </form>
</div>
</body>
</html>