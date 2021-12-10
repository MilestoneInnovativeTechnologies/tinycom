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

Publish config & assets
    php artisan vendor:publish
    (TinycomServiceProvider)

Change domain, domains, database_prefix, database_username_prefix, database_username
in config/tinycom.php

Migrate databases
    php artisan migrate

Index page will be start displaying if every process so far is perfect!!!

Install node dependencies
    npm install vue jquery bootstrap@4.5.0 bootstrap-vue@2.15.0 vuex vue-router popper.js @fortawesome/fontawesome-free
    npm install --save-dev resolve-url-loader sass sass-loader@10 vue-loader vue-template-compiler

replace laravel webpack.mix.js with milestone\tinycom\webpack.mix.js

copy files from milestone\tinycom\resources\quasar to root directory
    copy milestone\tinycom\resources\quasar\*.*

Add a line to .env file for developing
    dev=1
once in production, remove line or make dev=0

npm install core-js @quasar/extras@1.0.0 quasar@1.0.0 vue-graph@0.8.7 cors
npm install --save-dev workbox-webpack-plugin @quasar/app@2.0.0
