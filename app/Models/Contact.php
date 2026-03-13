<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use HasFactory, SoftDeletes; 

    /**
     * Atribut yang dapat diisi (Mass Assignable).
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'phone_number',
    ];
}