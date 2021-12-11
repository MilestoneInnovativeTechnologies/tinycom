Development Setup

Install Laravel
	laravel new TinyCOM
Move to installed directory
	cd TinyCOM
Create and move to directory milestone
	mkdir milestone
	cd milestone
Clone TinyCOM https://github.com/MilestoneInnovativeTechnologies/tinycom.git
	git clone https://github.com/MilestoneInnovativeTechnologies/tinycom.git
Back to root directory
    cd ..



Install TinyCOM required packages
    composer require doctrine/dbal laravel/ui spatie/laravel-medialibrary guzzlehttp/guzzle razorpay/razorpay

Add an entry
"Milestone\\Tinycom\\": "milestone/tinycom/src"
to autoload -> psr-4 in composer.json

Add an entry
Milestone\Tinycom\TinycomServiceProvider::class,
to config -> app -> providers

Refresh composer autoload
    composer dump-autoload

Add database params in .env file
Add mail details in .env (ex: mailtrap.io)

Migrate databases
php artisan migrate

Publish config & assets
    php artisan vendor:publish
    (TinycomServiceProvider)

Change domain, domains, database_prefix, database_username_prefix, database_username
in config/tinycom.php

Index page will be start displaying if every process so far is perfect!!!


Prerequisite
cross-env is required to run laravel watch
Quasar in required for developing public,admin interfaces.
Check for quasar existence
    quasar --version
If installed, the current version will be displayed
If it hasn't installed, install using
    npm install -g @quasar/cli
Similarly, check for cross-env in cmd
If it hasn't installed, install using
    npm install -g cross-env

copy and replace asset compile related files from milestone\tinycom\resources\asset
    copy milestone\tinycom\resources\asset\*.* /Y

Add a line to .env file for developing
DEV=1
once in production, remove line or make dev=0

npm install

While in development, run following commands
```npm run watch``` for developing COMPANY,REFERRER,CLIENT portals
```npm run watch:public``` for developing end users interface
```npm run watch:admin``` for developing client's admin portal

For production (build)
```npm run build``` for building COMPANY,REFERRER,CLIENT portals all at once
```npm run build:public``` for End User's interface
```npm run watch:admin``` for client's admin interface

The compiled assets are automatically copied to package assets folder as ready to deploy..
While in development, latest assets are always copied to public folder for real time experience..

End User's interface and Client's admin interfaces are developed with quasar..
