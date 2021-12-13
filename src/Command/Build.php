<?php

namespace Milestone\Tinycom\Command;

use Illuminate\Console\Command;

class Build extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'build {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This will copy vendor/app css/js file names and files from dist/spa (which generated once quasar build) to milestone assets folder';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        exec('xcopy "dist/spa/js" "milestone/tinycom/assets/js" /ECIQRY');
        exec('xcopy "dist/spa/css" "milestone/tinycom/assets/css" /ECIQRY');
        exec('xcopy "dist/spa/fonts" "milestone/tinycom/assets/fonts" /ECIQRY');

        $json = [];
        preg_match_all('/(link href|script src)=(css|js)\/(vendor|app).(.{8}).(css|js)/',file_get_contents(base_path("dist\spa\index.html")),$matches);
        foreach ($matches[5] as $idx => $ext){
            if(!array_key_exists($ext,$json)) $json[$ext] = [];
            if(!array_key_exists($matches[3][$idx],$json[$ext])) $json[$ext][$matches[3][$idx]] = "";
            $json[$ext][$matches[3][$idx]] = $matches[4][$idx];
        }
        $name = $this->argument('name');
        file_put_contents(base_path('milestone\tinycom\assets\\'.$name.'.json'),json_encode($json));
    }
}
