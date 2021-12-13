**Development Setup**

Install Laravel<br />
`laravel new TinyCOM`<br />

Move to installed directory<br />
`cd TinyCOM`<br />

Create and move to directory milestone<br />
`mkdir milestone` `cd milestone`<br />

Clone TinyCOM from github<br />
`git clone https://github.com/MilestoneInnovativeTechnologies/tinycom.git` <br />

Back to root directory<br />
`cd ..`<br /><br />

Install TinyCOM required packages<br />
`composer require doctrine/dbal laravel/ui spatie/laravel-medialibrary guzzlehttp/guzzle razorpay/razorpay`<br />

Add an entry<br />
`"Milestone\\Tinycom\\": "milestone/tinycom/src"`<br />
to autoload -> psr-4 in composer.json

Add an entry<br />
`Milestone\Tinycom\TinycomServiceProvider::class,`<br />
to config -> app -> providers

Refresh composer autoload<br />
`composer dump-autoload`

Add database params in .env file<br />
Add mail details in .env (ex: mailtrap.io)<br />

Migrate databases<br />
`php artisan migrate`

Publish config & assets<br />
`php artisan vendor:publish`<br />
_(TinycomServiceProvider)_

Change domain, domains, database_prefix, database_username_prefix, database_username
in config/tinycom.php

**Index page will be start displaying if every process so far is perfect!!!**
<br /><br />

**Development Prerequisite**<br />
**cross-env** is required to run laravel watch<br />
**Quasar** in required for developing public,admin interfaces.<br /><br />
Check for quasar existence<br />
`quasar --version`<br />
If installed, the current version will be displayed, If it hasn't installed, install using<br />
`npm install -g @quasar/cli`
Similarly, check for _cross-env_ in cmd , If it hasn't installed, install using<br />
`npm install -g cross-env`

copy and replace asset compile related files from milestone\tinycom\resources\asset<br />
`copy milestone\tinycom\resources\asset\*.* /Y`

Add a line to .env file for developing
`DEV=1`<br />
once in production, remove line or make `DEV=0`<br />

`npm install`

While in development, run following commands<br />
`npm run watch` for developing COMPANY,REFERRER,CLIENT portals<br />
`npm run watch:public` for developing end users interface<br />
`npm run watch:admin` for developing client's admin portal<br />

For production (build)<br />
`npm run build` for building COMPANY,REFERRER,CLIENT portals all at once<br />
`npm run build:public` for End User's interface<br />
`npm run build:admin` for client's admin interface<br />

**Notes**
1. The compiled assets are automatically copied to package assets folder as ready to deploy..
2. While in development, the latest assets are always copied to public folder for real time experience..
3. End User's interface and Client's admin interfaces are developed with quasar..
