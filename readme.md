 
1. Install laravel
1. Enter project folder
1. composer require milestone/tinycom
1. php artisan vendor:publish
1. Update .env file
    1.  Set APP_NAME
	1.  Set APP_URL
	1.  Set APP_DEBUG
	1.  Set DB Details
	1.  Add MEDIA_DISK=media
1. php artisan migrate
1. comment every routes in web.php

<hr>

For payment gateway, receipt (order id) should be unique. So in case there is a chance to conflict, try changing autoincrement number of orders table.

Set mail settings in env file

go through config file