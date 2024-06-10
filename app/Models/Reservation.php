<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'user_id',
        'check_in',
        'check_out',
        'guests',
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
