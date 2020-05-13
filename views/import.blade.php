<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="/css/app.css">

    <title>TinyCOM :: A Tiny eCommerce portal for local business and delivery.</title>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-info"><a class="navbar-brand" href="#">Tiny COM</a></nav>
    <main class="mt-3">
        <div class="container-fluid">
            <form class="my-3" action="" method="post">@csrf
                <div class="card">
                    <div class="card-header">Import Categories <input type="submit" name="submit" value="Import Categories" class="float-right btn btn-success btn-sm"></div>
                    <div class="card-body">
                        <p class="text-muted m-0">Name,Description,Image</p>
                        <textarea name="categories" class="form-control" rows="6"></textarea>
                    </div>
                </div>
            </form>
            <form class="my-3" method="post">@csrf
                <div class="card">
                    <div class="card-header">Import Items <input type="submit" name="submit" value="Import Items" class="float-right btn btn-success btn-sm"></div>
                    <div class="card-body">
                        <p class="text-muted m-0">name,categoryName,price,selling,stock,imageLink</p>
                        <textarea name="items" class="form-control" rows="6"></textarea>
                    </div>
                </div>
            </form>
        </div>
    </main>

</body>
</html>