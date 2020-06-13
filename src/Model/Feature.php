<?php

namespace Milestone\Tinycom\Model;

use Milestone\Tinycom\Cast\Json;

class Feature extends Model
{
    protected $casts = ['attributes' => Json::class];
}
