<?php

namespace App\Filament\Resources\StudentProjects\Pages;

use App\Filament\Resources\StudentProjects\StudentProjectResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\EditRecord;

class EditStudentProject extends EditRecord
{
    protected static string $resource = StudentProjectResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}
