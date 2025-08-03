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
        Schema::create('stress_assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('session_id')->nullable()->comment('For anonymous users');
            $table->integer('work_pressure_score')->comment('Work pressure rating 1-5');
            $table->integer('sleep_quality_score')->comment('Sleep quality rating 1-5');
            $table->integer('emotional_state_score')->comment('Emotional state rating 1-5');
            $table->integer('physical_symptoms_score')->comment('Physical symptoms rating 1-5');
            $table->integer('total_score')->comment('Total stress score');
            $table->enum('stress_level', ['low', 'moderate', 'high', 'severe'])->comment('Calculated stress level');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('session_id');
            $table->index('stress_level');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stress_assessments');
    }
};