<?php

namespace App\Filament\Resources\StudentProjects\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class StudentProjectForm
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
                TextInput::make('project_url')
                    ->url()
                    ->default(null),
                TextInput::make('journal_url')
                    ->url()
                    ->default(null),
                TextInput::make('student_name')
                    ->required(),
                TextInput::make('nim')
                    ->required(),
                TextInput::make('supervisor_1')
                    ->required(),
                TextInput::make('supervisor_2')
                    ->default(null),
                TextInput::make('academic_advisor')
                    ->required(),
                FileUpload::make('project_image')
                    ->image()
                    ->required()
                    ->disk('public')
                    ->directory('student-projects-images')
                    ->visibility('public'),
            ]);
    }
}
