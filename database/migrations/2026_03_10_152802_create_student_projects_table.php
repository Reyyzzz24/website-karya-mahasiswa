<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('project_url')->nullable();
            $table->string('journal_url')->nullable();
            $table->string('student_name');
            $table->string('nim')->unique();
            $table->string('supervisor_1');
            $table->string('supervisor_2')->nullable();
            $table->string('academic_advisor');
            $table->string('project_image')->nullable();

            // Menambahkan kolom deleted_at
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_projects');
    }
};
