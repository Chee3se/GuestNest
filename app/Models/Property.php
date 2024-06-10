<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category_id',
        'price',
        'guests',
        'bedrooms',
        'beds',
        'baths',
        'address',
        'user_id',
    ];

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->with('user');
    }

    public function thumbnail()
    {
        return $this->hasOne(Image::class)->where('is_main', true);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
