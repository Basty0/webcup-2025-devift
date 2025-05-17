<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $fillable = ['label'];

    public function theends()
    {
        return $this->hasMany(Theend::class);
    }
}