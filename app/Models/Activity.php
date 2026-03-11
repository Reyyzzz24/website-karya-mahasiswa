<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // Tambahkan ini
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Activity extends Model
{
    use HasFactory, SoftDeletes; // Gunakan trait ini

    protected $fillable = [
        'title', 
        'description', 
        'location', 
        'event_date', 
        'photo', 
        'video_url'
    ];
}