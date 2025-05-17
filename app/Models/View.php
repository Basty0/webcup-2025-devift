<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    protected $fillable = ['user_id', 'theend_id', 'ip_address'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function theend()
    {
        return $this->belongsTo(Theend::class);
    }
}