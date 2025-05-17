<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['user_id', 'theend_id', 'content', 'is_anonymous'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function theend()
    {
        return $this->belongsTo(Theend::class);
    }
}