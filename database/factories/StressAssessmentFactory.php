<?php

namespace Database\Factories;

use App\Models\StressAssessment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StressAssessment>
 */
class StressAssessmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\StressAssessment>
     */
    protected $model = StressAssessment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $workPressureScore = $this->faker->numberBetween(1, 5);
        $sleepQualityScore = $this->faker->numberBetween(1, 5);
        $emotionalStateScore = $this->faker->numberBetween(1, 5);
        $physicalSymptomsScore = $this->faker->numberBetween(1, 5);
        
        $totalScore = $workPressureScore + $sleepQualityScore + $emotionalStateScore + $physicalSymptomsScore;
        $stressLevel = StressAssessment::calculateStressLevel($totalScore);

        return [
            'user_id' => User::factory(),
            'session_id' => null,
            'work_pressure_score' => $workPressureScore,
            'sleep_quality_score' => $sleepQualityScore,
            'emotional_state_score' => $emotionalStateScore,
            'physical_symptoms_score' => $physicalSymptomsScore,
            'total_score' => $totalScore,
            'stress_level' => $stressLevel,
        ];
    }

    /**
     * Create an assessment for a guest user.
     */
    public function guest(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'user_id' => null,
                'session_id' => $this->faker->uuid(),
            ];
        });
    }

    /**
     * Create an assessment with low stress level.
     */
    public function lowStress(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'work_pressure_score' => $this->faker->numberBetween(1, 2),
                'sleep_quality_score' => $this->faker->numberBetween(1, 2),
                'emotional_state_score' => $this->faker->numberBetween(1, 2),
                'physical_symptoms_score' => $this->faker->numberBetween(1, 2),
                'total_score' => $this->faker->numberBetween(4, 8),
                'stress_level' => 'low',
            ];
        });
    }

    /**
     * Create an assessment with high stress level.
     */
    public function highStress(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'work_pressure_score' => $this->faker->numberBetween(4, 5),
                'sleep_quality_score' => $this->faker->numberBetween(4, 5),
                'emotional_state_score' => $this->faker->numberBetween(4, 5),
                'physical_symptoms_score' => $this->faker->numberBetween(4, 5),
                'total_score' => $this->faker->numberBetween(16, 20),
                'stress_level' => 'severe',
            ];
        });
    }
}