<?php

namespace App\Filament\Resources\Activities\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ActivityForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('location')
                    ->required(),
                DateTimePicker::make('event_date')
                    ->required(),
                FileUpload::make('photo')
                    ->image()
                    ->required()
                     ->disk('public')
                    ->directory('activities-photos')
                    ->visibility('public'),
                TextInput::make('video_url')
                    ->url()
                    ->default(null),
            ]);
    }
}
