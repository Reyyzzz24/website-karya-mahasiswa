<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // Import ini

class StudentProject extends Model
{
    use SoftDeletes; // Gunakan trait ini

    protected $fillable = [
        'title', 'description', 'project_url', 'journal_url', 
        'student_name', 'nim', 'supervisor_1', 'supervisor_2', 
        'academic_advisor', 'project_image'
    ];
}