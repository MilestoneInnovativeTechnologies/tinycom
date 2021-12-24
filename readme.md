 
1. Install laravel
2. Enter project folder
3. composer require milestone/tinycom
4. Update .env file
    1.  Set APP_NAME
    2.  Set APP_URL
    3.  Set APP_DEBUG
    4.  Set DB Details
    5.  Add MEDIA_DISK=media
    6.  Set mail settings in env file
5. php artisan migrate
6. comment every routes in web.php
7. php artisan vendor:publish

Go through tinycom config file

<hr>
Note:
For payment gateway, receipt (order id) should be unique. So in case there is a chance to conflict, try changing autoincrement number of orders table.



