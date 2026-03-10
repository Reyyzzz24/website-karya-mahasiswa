<?php

namespace App\Filament\Resources\HeroSections\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class HeroSectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                Textarea::make('subtitle')
                    ->default(null)
                    ->columnSpanFull(),
                FileUpload::make('image_path')
                    ->image()
                    ->required()
                    ->disk('public')
                    ->directory('hero-section-images')
                    ->visibility('public'),
                TextInput::make('cta_text')
                    ->default(null),
                TextInput::make('cta_link')
                    ->default(null),
                TextInput::make('position')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}
