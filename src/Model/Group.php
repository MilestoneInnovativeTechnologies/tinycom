<?php

namespace Milestone\Tinycom\Model;

class Group extends Model
{

  protected $guarded = [];
  protected $hidden = ['created_at','updated_at'];

  protected $casts = [
    'customers' => 'json'
  ];
}
