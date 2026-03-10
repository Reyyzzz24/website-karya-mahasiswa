<?php

namespace App\Filament\Resources\StudentProjects\Pages;

use App\Filament\Resources\StudentProjects\StudentProjectResource;
use Filament\Resources\Pages\CreateRecord;

class CreateStudentProject extends CreateRecord
{
    protected static string $resource = StudentProjectResource::class;
}
