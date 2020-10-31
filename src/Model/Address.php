<?php

namespace Milestone\Tinycom\Model;

class Address extends Model
{

  protected $guarded = [];
  protected $hidden = ['created_at','updated_at'];

  public function Customer(){ return $this->belongsTo(Customer::class, 'customer', 'id'); }

}
