<?php

namespace Milestone\Tinycom\Controller;

use Illuminate\Http\Request;
use Milestone\Tinycom\Model\Edition;

class EditionController extends Controller
{

    public function fetch(Request $request){
        return self::Data(Edition::all());
    }

}
