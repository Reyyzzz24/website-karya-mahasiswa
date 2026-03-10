<?php

namespace App\Filament\Resources\StudentProjects\Pages;

use App\Filament\Resources\StudentProjects\StudentProjectResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListStudentProjects extends ListRecords
{
    protected static string $resource = StudentProjectResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
