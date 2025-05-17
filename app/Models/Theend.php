<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Theend extends Model
{
    protected $fillable = [
        'user_id',
        'slug',
        'title',
        'content',
        'is_public',
        'tone',
        'type_id',
        'image_url',
        'gif_url',
        'sound_url',
        'views',
        'is_draft'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function reactions()
    {
        return $this->hasMany(Reaction::class);
    }

    public function views()
    {
        return $this->hasMany(View::class);
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
    // generation de slug
    protected static function booted()
    {
        static::creating(function ($thetheend) {
            $thetheend->slug = Str::slug($thetheend->content) . '-' . Str::random(6);
        });
    }

    //nombre de vue
    public function getViewsCountAttribute()
    {
        return $this->views()->count();
    }

    //nombre de commentaire
    public function getCommentsCountAttribute()
    {
        return $this->comments()->count();
    }

    //nombre de reaction
    public function getReactionsCountAttribute()
    {
        return $this->reactions()->count();
    }

    //nombre de like
}