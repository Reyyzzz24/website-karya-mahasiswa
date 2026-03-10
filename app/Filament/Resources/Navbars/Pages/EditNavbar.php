<?php

namespace App\Filament\Resources\Navbars\Pages;

use App\Filament\Resources\Navbars\NavbarResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\EditRecord;

class EditNavbar extends EditRecord
{
    protected static string $resource = NavbarResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}
