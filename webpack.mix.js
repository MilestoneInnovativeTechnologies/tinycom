const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const rPath = 'milestone/tinycom/resources/';
const aPath = 'milestone/tinycom/assets/';
const pubCss = [
    'item-display','categories','public','cart'
]
const admCss = [
    'admin'
]

function pubRCss(){ return pubCss.map(css => rPath+'css/'+css+'.css'); }
function admRCss(){ return admCss.map(css => rPath+'css/'+css+'.css'); }

mix
    .setPublicPath(aPath)
    // .js(rPath + 'js/public.js', 'js')
    // .js(rPath + 'js/admin.js', 'js')
    .js(rPath + 'js/company.js', 'js').vue()
    .js(rPath + 'js/client.js', 'js').vue()
    .js(rPath + 'js/referrer.js', 'js').vue()
    .sass(rPath + 'sass/app.scss', 'css')
    .sass(rPath + 'sass/company.scss', 'css')
    .sass(rPath + 'sass/client.scss', 'css')
    .sass(rPath + 'sass/referrer.scss', 'css')
    // .styles(pubRCss(), aPath + 'css/public.css')
    // .styles(admRCss(), aPath + 'css/admin.css')
    .copyDirectory(aPath,'public')
;
