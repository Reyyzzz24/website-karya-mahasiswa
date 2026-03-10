<?php

namespace App\Filament\Resources\Navbars\Pages;

use App\Filament\Resources\Navbars\NavbarResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListNavbars extends ListRecords
{
    protected static string $resource = NavbarResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
