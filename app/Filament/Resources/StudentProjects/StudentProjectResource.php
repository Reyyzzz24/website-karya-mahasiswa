<?php

namespace App\Filament\Resources\StudentProjects;

use App\Filament\Resources\StudentProjects\Pages\CreateStudentProject;
use App\Filament\Resources\StudentProjects\Pages\EditStudentProject;
use App\Filament\Resources\StudentProjects\Pages\ListStudentProjects;
use App\Filament\Resources\StudentProjects\Schemas\StudentProjectForm;
use App\Filament\Resources\StudentProjects\Tables\StudentProjectsTable;
use App\Models\StudentProject;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class StudentProjectResource extends Resource
{
    protected static ?string $model = StudentProject::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return StudentProjectForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return StudentProjectsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListStudentProjects::route('/'),
            'create' => CreateStudentProject::route('/create'),
            'edit' => EditStudentProject::route('/{record}/edit'),
        ];
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
