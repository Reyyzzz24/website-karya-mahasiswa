<?php

namespace App\Filament\Resources\Navbars\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Forms\Components\FileUpload;

class NavbarForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                TextInput::make('url')
                    ->required(),
                Select::make('parent_id')
                    ->relationship('parent', 'title')
                    ->searchable() // Biar bisa dicari kalau menu sudah banyak
                    ->preload()    // Memuat data di awal agar lebih cepat
                    ->default(null),
                TextInput::make('order_priority')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->required(),
                Select::make('target')
                    ->required()
                    ->options([
                        '_self'  => 'Buka di Tab Sama',
                        '_blank' => 'Buka di Tab Baru',
                    ])
                    ->default('_self'),
                FileUpload::make('icon')
                    ->label('Logo / Ikon')
                    ->image() 
                    ->disk('public')
                    ->directory('navbar-icons') 
                    ->visibility('public')
                    ->maxSize(1024)
                    ->nullable(),

            ]);
    }
}
