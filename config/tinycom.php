<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Name
    |--------------------------------------------------------------------------
    |
    | Name the application
    | Ex: Tiny COM
    |
    */

    'name' => 'TinyCOM',

    /*
    |--------------------------------------------------------------------------
    | Caption
    |--------------------------------------------------------------------------
    |
    | Caption for the application
    | Ex: Tiny eCommerce portal for all
    |
    */

    'caption' => 'Tiny eCommerce portal for all',

    /*
    |--------------------------------------------------------------------------
    | Administrator Email
    |--------------------------------------------------------------------------
    |
    | Login email of administrator.
    | Here the admin logged in to view details of all companies and their expire
    | date, setup pending companies etc.
    | This email can be changed from admin portal.
    |
    */

    'email' => 'admin@admin.admin',

    /*
    |--------------------------------------------------------------------------
    | Administrator Password
    |--------------------------------------------------------------------------
    |
    | Login password of administrator.
    | This is just initial password only, this can be changed from admin portal.
    |
    */

    'password' => 'admin',

    /*
    |--------------------------------------------------------------------------
    | Domain Name
    |--------------------------------------------------------------------------
    |
    | The domain name to which the site is hosted.
    | The primary domain url. Ex: tinycom.in
    |
    */

    'domain' => 'tinycom.in',

    /*
    |--------------------------------------------------------------------------
    | Index
    |--------------------------------------------------------------------------
    |
    | The default index page of the website when the primary domain accessed.
    | It should be a laravel blade template available under resources/view folder.
    | If no any index page designed, leave as null to make the vendor's page get displayed
    |
    */

    'index' => null,

    /*
    |--------------------------------------------------------------------------
    | Domains
    |--------------------------------------------------------------------------
    |
    | Array of domain names available to create tinycom sub domain
    | All the sub domain should point to same folder where tiny com installed
    |
    */

    'domains' => ['tinycom.in','tinycom.xyz'],

    /*
    |--------------------------------------------------------------------------
    | Database Prefix
    |--------------------------------------------------------------------------
    |
    | Some hostings required a prefix for creating database
    | Mention that prefix here.
    | If not required, leave a empty string;
    |
    */

    'database_prefix' => 'mileston_',

    /*
    |--------------------------------------------------------------------------
    | Database Username Prefix
    |--------------------------------------------------------------------------
    |
    | Some hosting providers prefix some common text to database username
    | Mention it here
    |
    */

    'database_username_prefix' => 'mileston_',

    /*
    |--------------------------------------------------------------------------
    | Database Username
    |--------------------------------------------------------------------------
    |
    | If every database need the same user, then mention it here.
    | If empty, then same user with name same as database will be created!!
    | If have prefix defined, that will be prefixed to username.
    |
    |
    */

    'database_username' => 'tinycom',

    /*
    |--------------------------------------------------------------------------
    | Database Password
    |--------------------------------------------------------------------------
    |
    | Database Password.
    | Right now no impact on changing this, as same password string
    | of username is used
    |
    */

    'database_password' => 'mileston_tinycom',

    /*
    |--------------------------------------------------------------------------
    | Initial Edition Name
    |--------------------------------------------------------------------------
    |
    | The edition name which should be enabled by default for all new companies.
    |
    */

    'initial_edition' => 'Smart',

    /*
    |--------------------------------------------------------------------------
    | Free subscription Expire Days
    |--------------------------------------------------------------------------
    |
    | The no. of days that the free subscriptions valid!!
    | Ex: 14
    |
    */

    'free_subscription_expire' => 14,

    /*
    |--------------------------------------------------------------------------
    | Payment Gateway (Razor Pay)
    |--------------------------------------------------------------------------
    |
    | Payment Gateway - Razor pay API Key and API Secret
    |
    */

    'payment_gateway_api_key' => 'rzp_test_tWPB1cR7pPgniB',
    'payment_gateway_api_secret' => 'DfxwCvGUy64N3vY1iWdO3Dbz',

    /*
    |--------------------------------------------------------------------------
    | Payment Capture Web hook
    |--------------------------------------------------------------------------
    |
    | Payments done through gateway should fire web hooks
    | Mention details here
    |
    */

    'webhook' => [
        'path'                  =>  'webhook/razorpay/invoice/paid', // the path where to receive the web hook event
        'secret'                =>  'metalic', // the secret given at gateway for the web hook
        'signature_header'      =>  'x-razorpay-signature', // the header to fetch the signature for verifying the web hook request
        'request_id_header'     =>  'x-razorpay-event-id', // the id to be fetched in order to avoid duplicate web hook request
    ],

    /*
    |--------------------------------------------------------------------------
    | Login View
    |--------------------------------------------------------------------------
    |
    | Name the view to display login form or any in place of login.
    | If none leave blank to use default login view.
    | Ex: TinyCOM::company_login
    |
    */

    'login_view' => 'TinyCOM::enter',

    /*
    |--------------------------------------------------------------------------
    | Cache Key
    |--------------------------------------------------------------------------
    |
    | Companies are get stored in cache for performance.
    | The key to which companies stored mention here.
    | Ex: TinyCOMCompanies
    |
    */

    'cache_key' => 'TinyCOMCompanies',

    /*
    |--------------------------------------------------------------------------
    | Mailing From Address
    |--------------------------------------------------------------------------
    |
    | The from address for mails that are fired from this application
    | Ex: info@tinycom.in
    |
    */

    'mail_from_address' => 'no-reply@tinycom.in',

    /*
    |--------------------------------------------------------------------------
    | New Company Setup - inform mail
    |--------------------------------------------------------------------------
    |
    | For setting up company in hosting, like subdomain, database, the new
    | company info need to be mailed to concern authorities. Drop the email
    | address of such person
    |
    */

    'new_company_inform_mail' => 'tinycom@milestoneit.net',

    /*
    |--------------------------------------------------------------------------
    | Tenures => Tenure Units, Currency Multipliers
    |--------------------------------------------------------------------------
    |
    | Subscription tenures
    | Ex: ['Day','Week','Month','Year']
    | These above values are only supported
    |
    | Tenure units are numbers which will multiply with tenure period and currency multiplier to get amount in defined currency
    | Ex: tenure_unit for Month = 1, Year = 10
    | currency_multiplier for INR = 500
    | then for 1 Month amount = 500 * 1
    | then for 1 Year amount = 500 * 10
    |
    */

    'tenures' => ['Month' => 1,'Year' => 10],
    'currency_multipliers' => ['INR' => 500, 'AED' => 25, 'QAR' => 25, 'SAR' => 25, 'USD' => 10, 'EUR' => 10],

    /*
    |--------------------------------------------------------------------------
    | Default Currency
    |--------------------------------------------------------------------------
    |
    | Set default currency
    | Ex: INR
    |
    */

    'currency' => 'INR',


    /*
    |--------------------------------------------------------------------------
    | Contact Details
    |--------------------------------------------------------------------------
    |
    | This details will be published in mails or any other channels where customers
    | needed to get them.
    | Ex: 790 22 555 00
    |
    */

    'contact_address_1' => 'Wisma Pam, Ovungal Bazar, Chavakkad',
    'contact_address_2' => 'Thrissur, Kerala - 680506',
    'contact_numbers' => '(+91) 790 22 555 00, 790 24 555 00',
    'contact_email' => 'info@milestoneit.net',


];