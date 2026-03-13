<?php

namespace App\Filament\Resources\StudentProjects\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use App\Models\StudentProject;

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
                    ->required()
                    ->live(onBlur: true) // Mengecek saat user pindah fokus dari inputan
                    ->helperText(function ($state, $component) {
                        if (blank($state)) return null;

                        // Cek apakah NIM sudah ada di database
                        $exists = StudentProject::where('nim', $state)
                            ->where('id', '!=', $component->getRecord()?->id) // Abaikan jika ini record yang sedang diedit
                            ->exists();

                        if ($exists) {
                            // Mengembalikan pesan peringatan dalam bentuk HTML
                            return new \Illuminate\Support\HtmlString(
                                '<span class="text-amber-600 font-medium">⚠️ Peringatan: NIM ini sudah terdaftar di sistem.</span>'
                            );
                        }

                        return null;
                    }),
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
